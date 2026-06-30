#![cfg(test)]

use super::*;
use crate::mock_verifier::MockVerifier;
use crate::mock_pool::{MockPool, MockPoolClient};
use soroban_sdk::{
    testutils::{Address as _, Ledger, LedgerInfo},
    token::StellarAssetClient,
    Address, Env,
};

fn setup_test_env() -> (Env, Address, Address, Address, Address, Address) {
    let env = Env::default();
    env.mock_all_auths();

    let admin = Address::generate(&env);
    let issuer = Address::generate(&env);
    let reserve_account = Address::generate(&env);

    // Register mock verifier contract
    let verifier_id = env.register(MockVerifier, ());
    let verifier = verifier_id.clone();

    // Crear SAC de reserva (ej: USDC)
    let sac_address = env.register_stellar_asset_contract_v2(admin.clone()).address();
    let asset_client = StellarAssetClient::new(&env, &sac_address);

    // Mint tokens a la cuenta de reserva
    asset_client.mint(&reserve_account, &1_000_000);

    (env, issuer, reserve_account, verifier, sac_address, admin)
}

#[test]
fn test_constructor() {
    let (env, _issuer, reserve_account, verifier, sac_address, _admin) = setup_test_env();

    let contract_id = env.register(SolvencyPolicy, ());
    let client = SolvencyPolicyClient::new(&env, &contract_id);

    let mut reserve_accounts = Vec::new(&env);
    reserve_accounts.push_back(reserve_account.clone());

    let config = Config {
        verifier: verifier.clone(),
        reserve_sac: sac_address.clone(),
        reserve_accounts,
        freshness_window: 100,
        aquarius_pools: Vec::new(&env), // No Aquarius pools for basic test
        defindex_vaults: Vec::new(&env), // No DeFindex vaults for basic test
    };

    client.initialize(&config);

    // Verificar que la configuración se guardó
    let stored_config = client.get_config();
    assert!(stored_config.is_some());
    assert_eq!(stored_config.unwrap().freshness_window, 100);
}

#[test]
#[should_panic(expected = "Error(Contract, #1)")] // AlreadyInitialized
fn test_constructor_prevents_reinitialization() {
    let (env, _issuer, reserve_account, verifier, sac_address, _admin) = setup_test_env();

    let contract_id = env.register(SolvencyPolicy, ());
    let client = SolvencyPolicyClient::new(&env, &contract_id);

    let mut reserve_accounts = Vec::new(&env);
    reserve_accounts.push_back(reserve_account.clone());

    let config = Config {
        verifier: verifier.clone(),
        reserve_sac: sac_address.clone(),
        reserve_accounts,
        freshness_window: 100,
        aquarius_pools: Vec::new(&env), // No Aquarius pools for basic test
        defindex_vaults: Vec::new(&env), // No DeFindex vaults for basic test
    };

    client.initialize(&config);
    client.initialize(&config); // Debe fallar
}

#[test]
fn test_attest_solvent() {
    let (env, _issuer, reserve_account, verifier, sac_address, _admin) = setup_test_env();

    let contract_id = env.register(SolvencyPolicy, ());
    let client = SolvencyPolicyClient::new(&env, &contract_id);

    let mut reserve_accounts = Vec::new(&env);
    reserve_accounts.push_back(reserve_account.clone());

    let config = Config {
        verifier,
        reserve_sac: sac_address,
        reserve_accounts,
        freshness_window: 100,
        aquarius_pools: Vec::new(&env), // No Aquarius pools for basic test
        defindex_vaults: Vec::new(&env), // No DeFindex vaults for basic test
    };

    client.initialize(&config);

    // Configurar ledger
    env.ledger().set(LedgerInfo {
        timestamp: 1000000,
        protocol_version: 22,
        sequence_number: 100,
        network_id: Default::default(),
        base_reserve: 10,
        min_temp_entry_ttl: 1,
        min_persistent_entry_ttl: 1,
        max_entry_ttl: 10000,
    });

    // Crear public_inputs: [root(32), L(32), ledger_seq(32)]
    // L = 500_000 (menor que las reservas de 1_000_000)
    // ledger_seq = 90 (dentro de la ventana)
    let mut public_inputs = Bytes::new(&env);

    // root (32 bytes - dummy)
    for _ in 0..32 {
        public_inputs.push_back(0);
    }

    // L = 500_000 (32 bytes, big-endian i128)
    for _ in 0..16 {
        public_inputs.push_back(0);
    }
    let l_bytes = 500_000i128.to_be_bytes();
    for b in l_bytes {
        public_inputs.push_back(b);
    }

    // ledger_seq = 90 (32 bytes, big-endian u32 en los últimos 4)
    for _ in 0..28 {
        public_inputs.push_back(0);
    }
    let seq_bytes = 90u32.to_be_bytes();
    for b in seq_bytes {
        public_inputs.push_back(b);
    }

    // proof (dummy - en MOCK mode acepta cualquier cosa)
    let proof = Bytes::new(&env);

    let result = client.attest(&public_inputs, &proof);
    assert_eq!(result, true);

    // Verificar atestación
    let att = client.is_solvent().unwrap();
    assert_eq!(att.solvent, true);
    assert_eq!(att.reserves, 1_000_000);
    assert_eq!(att.liabilities, 500_000);
    assert_eq!(att.ledger_seq, 90);
}

#[test]
#[should_panic(expected = "Error(Contract, #6)")] // Insolvent
fn test_attest_insolvent() {
    let (env, _issuer, reserve_account, verifier, sac_address, _admin) = setup_test_env();

    let contract_id = env.register(SolvencyPolicy, ());
    let client = SolvencyPolicyClient::new(&env, &contract_id);

    let mut reserve_accounts = Vec::new(&env);
    reserve_accounts.push_back(reserve_account.clone());

    let config = Config {
        verifier,
        reserve_sac: sac_address,
        reserve_accounts,
        freshness_window: 100,
        aquarius_pools: Vec::new(&env), // No Aquarius pools for basic test
        defindex_vaults: Vec::new(&env), // No DeFindex vaults for basic test
    };

    client.initialize(&config);

    env.ledger().set(LedgerInfo {
        timestamp: 1000000,
        protocol_version: 22,
        sequence_number: 100,
        network_id: Default::default(),
        base_reserve: 10,
        min_temp_entry_ttl: 1,
        min_persistent_entry_ttl: 1,
        max_entry_ttl: 10000,
    });

    // public_inputs con L = 2_000_000 (MAYOR que las reservas de 1_000_000)
    let mut public_inputs = Bytes::new(&env);

    for _ in 0..32 {
        public_inputs.push_back(0);
    }

    for _ in 0..16 {
        public_inputs.push_back(0);
    }
    let l_bytes = 2_000_000i128.to_be_bytes();
    for b in l_bytes {
        public_inputs.push_back(b);
    }

    for _ in 0..28 {
        public_inputs.push_back(0);
    }
    let seq_bytes = 90u32.to_be_bytes();
    for b in seq_bytes {
        public_inputs.push_back(b);
    }

    let proof = Bytes::new(&env);

    client.attest(&public_inputs, &proof); // Debe fallar con Insolvent
}

#[test]
#[should_panic(expected = "Error(Contract, #4)")] // StaleProof
fn test_attest_stale_proof() {
    let (env, _issuer, reserve_account, verifier, sac_address, _admin) = setup_test_env();

    let contract_id = env.register(SolvencyPolicy, ());
    let client = SolvencyPolicyClient::new(&env, &contract_id);

    let mut reserve_accounts = Vec::new(&env);
    reserve_accounts.push_back(reserve_account.clone());

    let config = Config {
        verifier,
        reserve_sac: sac_address,
        reserve_accounts,
        freshness_window: 10, // Ventana pequeña
        aquarius_pools: Vec::new(&env), // No Aquarius pools for basic test
        defindex_vaults: Vec::new(&env), // No DeFindex vaults for basic test
    };

    client.initialize(&config);

    env.ledger().set(LedgerInfo {
        timestamp: 1000000,
        protocol_version: 22,
        sequence_number: 100,
        network_id: Default::default(),
        base_reserve: 10,
        min_temp_entry_ttl: 1,
        min_persistent_entry_ttl: 1,
        max_entry_ttl: 10000,
    });

    // public_inputs con ledger_seq = 50 (más de 10 ledgers atrás)
    let mut public_inputs = Bytes::new(&env);

    for _ in 0..32 {
        public_inputs.push_back(0);
    }

    for _ in 0..16 {
        public_inputs.push_back(0);
    }
    let l_bytes = 500_000i128.to_be_bytes();
    for b in l_bytes {
        public_inputs.push_back(b);
    }

    for _ in 0..28 {
        public_inputs.push_back(0);
    }
    let seq_bytes = 50u32.to_be_bytes(); // Muy antiguo
    for b in seq_bytes {
        public_inputs.push_back(b);
    }

    let proof = Bytes::new(&env);

    client.attest(&public_inputs, &proof); // Debe fallar con StaleProof
}

#[test]
#[should_panic(expected = "Error(Contract, #5)")] // Replay
fn test_attest_replay() {
    let (env, _issuer, reserve_account, verifier, sac_address, _admin) = setup_test_env();

    let contract_id = env.register(SolvencyPolicy, ());
    let client = SolvencyPolicyClient::new(&env, &contract_id);

    let mut reserve_accounts = Vec::new(&env);
    reserve_accounts.push_back(reserve_account.clone());

    let config = Config {
        verifier,
        reserve_sac: sac_address,
        reserve_accounts,
        freshness_window: 100,
        aquarius_pools: Vec::new(&env), // No Aquarius pools for basic test
        defindex_vaults: Vec::new(&env), // No DeFindex vaults for basic test
    };

    client.initialize(&config);

    env.ledger().set(LedgerInfo {
        timestamp: 1000000,
        protocol_version: 22,
        sequence_number: 100,
        network_id: Default::default(),
        base_reserve: 10,
        min_temp_entry_ttl: 1,
        min_persistent_entry_ttl: 1,
        max_entry_ttl: 10000,
    });

    let mut public_inputs = Bytes::new(&env);

    for _ in 0..32 {
        public_inputs.push_back(0);
    }

    for _ in 0..16 {
        public_inputs.push_back(0);
    }
    let l_bytes = 500_000i128.to_be_bytes();
    for b in l_bytes {
        public_inputs.push_back(b);
    }

    for _ in 0..28 {
        public_inputs.push_back(0);
    }
    let seq_bytes = 90u32.to_be_bytes();
    for b in seq_bytes {
        public_inputs.push_back(b);
    }

    let proof = Bytes::new(&env);

    // Primera atestación exitosa
    client.attest(&public_inputs, &proof);

    // Intentar replay con el mismo ledger_seq
    client.attest(&public_inputs, &proof); // Debe fallar con Replay
}

// ========================================
// Aquarius Integration Tests
// ========================================

/// Helper para crear public_inputs
fn create_public_inputs(env: &Env, liabilities: i128, ledger_seq: u32) -> Bytes {
    let mut public_inputs = Bytes::new(env);

    // root (32 bytes - dummy)
    for _ in 0..32 {
        public_inputs.push_back(0);
    }

    // L (32 bytes, big-endian i128)
    for _ in 0..16 {
        public_inputs.push_back(0);
    }
    let l_bytes = liabilities.to_be_bytes();
    for b in l_bytes {
        public_inputs.push_back(b);
    }

    // ledger_seq (32 bytes, big-endian u32 en los últimos 4)
    for _ in 0..28 {
        public_inputs.push_back(0);
    }
    let seq_bytes = ledger_seq.to_be_bytes();
    for b in seq_bytes {
        public_inputs.push_back(b);
    }

    public_inputs
}

#[test]
fn test_attest_with_single_aquarius_pool() {
    let (env, _issuer, reserve_account, verifier, sac_address, _admin) = setup_test_env();

    // Crear y configurar mock pool
    let pool_id = env.register(MockPool, ());
    let pool_client = MockPoolClient::new(&env, &pool_id);

    // Configure pool to return itself as share token (simplified for testing)
    pool_client.set_share_token(&pool_id);

    // El reserve_account tiene 300,000 pool shares en esta pool
    pool_client.set_balance(&reserve_account, &300_000);

    let contract_id = env.register(SolvencyPolicy, ());
    let client = SolvencyPolicyClient::new(&env, &contract_id);

    let mut reserve_accounts = Vec::new(&env);
    reserve_accounts.push_back(reserve_account.clone());

    let mut aquarius_pools = Vec::new(&env);
    aquarius_pools.push_back(pool_id.clone());

    let config = Config {
        verifier,
        reserve_sac: sac_address,
        reserve_accounts,
        freshness_window: 100,
        aquarius_pools, // Una pool configurada
        defindex_vaults: Vec::new(&env), // No DeFindex vaults in this test
    };

    client.initialize(&config);

    env.ledger().set(LedgerInfo {
        timestamp: 1000000,
        protocol_version: 22,
        sequence_number: 100,
        network_id: Default::default(),
        base_reserve: 10,
        min_temp_entry_ttl: 1,
        min_persistent_entry_ttl: 1,
        max_entry_ttl: 10000,
    });

    // L = 1_200_000 (menor que reservas directas 1_000_000 + pool shares 300_000)
    let public_inputs = create_public_inputs(&env, 1_200_000, 90);
    let proof = Bytes::new(&env);

    let result = client.attest(&public_inputs, &proof);
    assert_eq!(result, true);

    // Verificar atestación
    let att = client.is_solvent().unwrap();
    assert_eq!(att.solvent, true);
    assert_eq!(att.reserves, 1_300_000); // 1_000_000 directo + 300_000 pool shares
    assert_eq!(att.liabilities, 1_200_000);
}

#[test]
fn test_attest_with_multiple_aquarius_pools() {
    let (env, _issuer, reserve_account, verifier, sac_address, _admin) = setup_test_env();

    // Crear dos mock pools
    let pool1_id = env.register(MockPool, ());
    let pool1_client = MockPoolClient::new(&env, &pool1_id);
    pool1_client.set_share_token(&pool1_id);
    pool1_client.set_balance(&reserve_account, &200_000);

    let pool2_id = env.register(MockPool, ());
    let pool2_client = MockPoolClient::new(&env, &pool2_id);
    pool2_client.set_share_token(&pool2_id);
    pool2_client.set_balance(&reserve_account, &150_000);

    let contract_id = env.register(SolvencyPolicy, ());
    let client = SolvencyPolicyClient::new(&env, &contract_id);

    let mut reserve_accounts = Vec::new(&env);
    reserve_accounts.push_back(reserve_account.clone());

    let mut aquarius_pools = Vec::new(&env);
    aquarius_pools.push_back(pool1_id.clone());
    aquarius_pools.push_back(pool2_id.clone());

    let config = Config {
        verifier,
        reserve_sac: sac_address,
        reserve_accounts,
        freshness_window: 100,
        aquarius_pools, // Dos pools configuradas
        defindex_vaults: Vec::new(&env), // No DeFindex vaults in this test
    };

    client.initialize(&config);

    env.ledger().set(LedgerInfo {
        timestamp: 1000000,
        protocol_version: 22,
        sequence_number: 100,
        network_id: Default::default(),
        base_reserve: 10,
        min_temp_entry_ttl: 1,
        min_persistent_entry_ttl: 1,
        max_entry_ttl: 10000,
    });

    // L = 1_300_000 (menor que 1_000_000 directo + 200_000 pool1 + 150_000 pool2)
    let public_inputs = create_public_inputs(&env, 1_300_000, 90);
    let proof = Bytes::new(&env);

    let result = client.attest(&public_inputs, &proof);
    assert_eq!(result, true);

    // Verificar atestación
    let att = client.is_solvent().unwrap();
    assert_eq!(att.solvent, true);
    assert_eq!(att.reserves, 1_350_000); // 1_000_000 + 200_000 + 150_000
    assert_eq!(att.liabilities, 1_300_000);
}

#[test]
fn test_attest_insolvent_without_pools_but_solvent_with_pools() {
    // Caso de uso CRÍTICO: Un issuer que sería insolvente sin pools
    // pero es solvente cuando se incluyen sus pool shares
    let env = Env::default();
    env.mock_all_auths();

    let admin = Address::generate(&env);
    let reserve_account = Address::generate(&env);

    // Register mock verifier
    let verifier_id = env.register(MockVerifier, ());
    let verifier = verifier_id.clone();

    // Crear SAC de reserva - SOLO 800,000 en reservas directas
    let sac_address = env.register_stellar_asset_contract_v2(admin.clone()).address();
    let asset_client = StellarAssetClient::new(&env, &sac_address);
    asset_client.mint(&reserve_account, &800_000); // MENOR que liabilities

    // Crear pool con 250,000 pool shares
    let pool_id = env.register(MockPool, ());
    let pool_client = MockPoolClient::new(&env, &pool_id);
    pool_client.set_share_token(&pool_id);
    pool_client.set_balance(&reserve_account, &250_000);

    let contract_id = env.register(SolvencyPolicy, ());
    let client = SolvencyPolicyClient::new(&env, &contract_id);

    let mut reserve_accounts = Vec::new(&env);
    reserve_accounts.push_back(reserve_account.clone());

    let mut aquarius_pools = Vec::new(&env);
    aquarius_pools.push_back(pool_id.clone());

    let config = Config {
        verifier,
        reserve_sac: sac_address,
        reserve_accounts,
        freshness_window: 100,
        aquarius_pools,
        defindex_vaults: Vec::new(&env), // No DeFindex vaults in this test
    };

    client.initialize(&config);

    env.ledger().set(LedgerInfo {
        timestamp: 1000000,
        protocol_version: 22,
        sequence_number: 100,
        network_id: Default::default(),
        base_reserve: 10,
        min_temp_entry_ttl: 1,
        min_persistent_entry_ttl: 1,
        max_entry_ttl: 10000,
    });

    // L = 1_000_000
    // Sin pools: 800_000 < 1_000_000 → INSOLVENTE ❌
    // Con pools: 800_000 + 250_000 = 1_050_000 > 1_000_000 → SOLVENTE ✅
    let public_inputs = create_public_inputs(&env, 1_000_000, 90);
    let proof = Bytes::new(&env);

    let result = client.attest(&public_inputs, &proof);
    assert_eq!(result, true);

    let att = client.is_solvent().unwrap();
    assert_eq!(att.solvent, true);
    assert_eq!(att.reserves, 1_050_000); // 800k directo + 250k pool shares
    assert_eq!(att.liabilities, 1_000_000);
}

// ============================================================================
// DEFINDEX INTEGRATION TESTS
// ============================================================================

#[test]
fn test_attest_with_single_defindex_vault() {
    // Test básico: SAC + 1 DeFindex vault
    // Demuestra que la integración DeFindex funciona correctamente
    let env = Env::default();
    env.mock_all_auths();

    let admin = Address::generate(&env);
    let reserve_account = Address::generate(&env);

    // Register mock verifier
    let verifier_id = env.register(crate::mock_verifier::MockVerifier, ());
    let verifier = verifier_id.clone();

    // SAC with 500k direct reserves
    let sac_address = env.register_stellar_asset_contract_v2(admin.clone()).address();
    let asset_client = StellarAssetClient::new(&env, &sac_address);
    asset_client.mint(&reserve_account, &500_000);

    // DeFindex vault with 200k value
    // Setup: User has 1,000 shares, vault has 10,000 total shares, 2,000,000 total assets
    // User's value = (1,000 * 2,000,000) / 10,000 = 200,000
    let vault_id = env.register(crate::mock_vault::MockVault, ());
    let vault_client = crate::mock_vault::MockVaultClient::new(&env, &vault_id);

    vault_client.set_balance(&reserve_account, &1_000);
    vault_client.set_total_supply(&10_000);
    vault_client.set_total_assets(&2_000_000);

    let contract_id = env.register(SolvencyPolicy, ());
    let client = SolvencyPolicyClient::new(&env, &contract_id);

    let mut reserve_accounts = Vec::new(&env);
    reserve_accounts.push_back(reserve_account.clone());

    let mut defindex_vaults = Vec::new(&env);
    defindex_vaults.push_back(vault_id.clone());

    let config = Config {
        verifier,
        reserve_sac: sac_address,
        reserve_accounts,
        freshness_window: 100,
        aquarius_pools: Vec::new(&env),
        defindex_vaults,
    };

    client.initialize(&config);

    env.ledger().set(LedgerInfo {
        timestamp: 1000000,
        protocol_version: 22,
        sequence_number: 100,
        network_id: Default::default(),
        base_reserve: 10,
        min_temp_entry_ttl: 1,
        min_persistent_entry_ttl: 1,
        max_entry_ttl: 10000,
    });

    // L = 600,000
    // SAC = 500,000
    // DeFindex = 200,000
    // Total = 700,000 > 600,000 ✅ SOLVENT
    let public_inputs = create_public_inputs(&env, 600_000, 90);
    let proof = Bytes::new(&env);

    let result = client.attest(&public_inputs, &proof);
    assert_eq!(result, true);

    let att = client.is_solvent().unwrap();
    assert_eq!(att.solvent, true);
    assert_eq!(att.sac_balance, 500_000);
    assert_eq!(att.aquarius_balance, 0); // No Aquarius pools
    assert_eq!(att.defindex_balance, 200_000);
    assert_eq!(att.reserves, 700_000);
    assert_eq!(att.liabilities, 600_000);
}

#[test]
fn test_attest_with_multiple_defindex_vaults() {
    // Test con múltiples vaults: SAC + 3 DeFindex vaults
    // Demuestra agregación multi-vault
    let env = Env::default();
    env.mock_all_auths();

    let admin = Address::generate(&env);
    let reserve_account = Address::generate(&env);

    let verifier_id = env.register(crate::mock_verifier::MockVerifier, ());
    let verifier = verifier_id.clone();

    // SAC with 300k
    let sac_address = env.register_stellar_asset_contract_v2(admin.clone()).address();
    let asset_client = StellarAssetClient::new(&env, &sac_address);
    asset_client.mint(&reserve_account, &300_000);

    // Vault 1: 100k value (500 shares / 5,000 total * 1,000,000 assets)
    let vault1_id = env.register(crate::mock_vault::MockVault, ());
    let vault1 = crate::mock_vault::MockVaultClient::new(&env, &vault1_id);
    vault1.set_balance(&reserve_account, &500);
    vault1.set_total_supply(&5_000);
    vault1.set_total_assets(&1_000_000);

    // Vault 2: 150k value (750 shares / 5,000 total * 1,000,000 assets)
    let vault2_id = env.register(crate::mock_vault::MockVault, ());
    let vault2 = crate::mock_vault::MockVaultClient::new(&env, &vault2_id);
    vault2.set_balance(&reserve_account, &750);
    vault2.set_total_supply(&5_000);
    vault2.set_total_assets(&1_000_000);

    // Vault 3: 50k value (1,000 shares / 20,000 total * 1,000,000 assets)
    let vault3_id = env.register(crate::mock_vault::MockVault, ());
    let vault3 = crate::mock_vault::MockVaultClient::new(&env, &vault3_id);
    vault3.set_balance(&reserve_account, &1_000);
    vault3.set_total_supply(&20_000);
    vault3.set_total_assets(&1_000_000);

    let contract_id = env.register(SolvencyPolicy, ());
    let client = SolvencyPolicyClient::new(&env, &contract_id);

    let mut reserve_accounts = Vec::new(&env);
    reserve_accounts.push_back(reserve_account.clone());

    let mut defindex_vaults = Vec::new(&env);
    defindex_vaults.push_back(vault1_id.clone());
    defindex_vaults.push_back(vault2_id.clone());
    defindex_vaults.push_back(vault3_id.clone());

    let config = Config {
        verifier,
        reserve_sac: sac_address,
        reserve_accounts,
        freshness_window: 100,
        aquarius_pools: Vec::new(&env),
        defindex_vaults,
    };

    client.initialize(&config);

    env.ledger().set(LedgerInfo {
        timestamp: 1000000,
        protocol_version: 22,
        sequence_number: 100,
        network_id: Default::default(),
        base_reserve: 10,
        min_temp_entry_ttl: 1,
        min_persistent_entry_ttl: 1,
        max_entry_ttl: 10000,
    });

    // L = 500,000
    // SAC = 300,000
    // DeFindex = 100k + 150k + 50k = 300,000
    // Total = 600,000 > 500,000 ✅ SOLVENT
    let public_inputs = create_public_inputs(&env, 500_000, 90);
    let proof = Bytes::new(&env);

    let result = client.attest(&public_inputs, &proof);
    assert_eq!(result, true);

    let att = client.is_solvent().unwrap();
    assert_eq!(att.solvent, true);
    assert_eq!(att.sac_balance, 300_000);
    assert_eq!(att.aquarius_balance, 0);
    assert_eq!(att.defindex_balance, 300_000); // 100k + 150k + 50k
    assert_eq!(att.reserves, 600_000);
}

#[test]
fn test_attest_with_aquarius_and_defindex_combined() {
    // Test CRÍTICO: Multi-venue completo (SAC + Aquarius + DeFindex)
    // Demuestra la ventaja competitiva clave de Veraz
    let env = Env::default();
    env.mock_all_auths();

    let admin = Address::generate(&env);
    let reserve_account = Address::generate(&env);

    let verifier_id = env.register(crate::mock_verifier::MockVerifier, ());
    let verifier = verifier_id.clone();

    // SAC: 400k cold wallet reserves
    let sac_address = env.register_stellar_asset_contract_v2(admin.clone()).address();
    let asset_client = StellarAssetClient::new(&env, &sac_address);
    asset_client.mint(&reserve_account, &400_000);

    // Aquarius pool: 200k in liquidity
    let pool_id = env.register(crate::mock_pool::MockPool, ());
    let pool_client = crate::mock_pool::MockPoolClient::new(&env, &pool_id);
    pool_client.set_share_token(&pool_id);
    pool_client.set_balance(&reserve_account, &200_000);

    // DeFindex vault: 150k in yield farming
    let vault_id = env.register(crate::mock_vault::MockVault, ());
    let vault_client = crate::mock_vault::MockVaultClient::new(&env, &vault_id);
    vault_client.set_balance(&reserve_account, &750);
    vault_client.set_total_supply(&5_000);
    vault_client.set_total_assets(&1_000_000); // 750/5000 * 1M = 150k

    let contract_id = env.register(SolvencyPolicy, ());
    let client = SolvencyPolicyClient::new(&env, &contract_id);

    let mut reserve_accounts = Vec::new(&env);
    reserve_accounts.push_back(reserve_account.clone());

    let mut aquarius_pools = Vec::new(&env);
    aquarius_pools.push_back(pool_id.clone());

    let mut defindex_vaults = Vec::new(&env);
    defindex_vaults.push_back(vault_id.clone());

    let config = Config {
        verifier,
        reserve_sac: sac_address,
        reserve_accounts,
        freshness_window: 100,
        aquarius_pools,
        defindex_vaults,
    };

    client.initialize(&config);

    env.ledger().set(LedgerInfo {
        timestamp: 1000000,
        protocol_version: 22,
        sequence_number: 100,
        network_id: Default::default(),
        base_reserve: 10,
        min_temp_entry_ttl: 1,
        min_persistent_entry_ttl: 1,
        max_entry_ttl: 10000,
    });

    // L = 700,000
    // SAC = 400,000 (cold wallets)
    // Aquarius = 200,000 (AMM liquidity)
    // DeFindex = 150,000 (yield vaults)
    // Total = 750,000 > 700,000 ✅ SOLVENT
    //
    // CLAVE: Sin multi-venue aggregation, solo vería 400k y sería INSOLVENTE
    // Con Veraz, ve los 750k reales ← VENTAJA COMPETITIVA
    let public_inputs = create_public_inputs(&env, 700_000, 90);
    let proof = Bytes::new(&env);

    let result = client.attest(&public_inputs, &proof);
    assert_eq!(result, true);

    let att = client.is_solvent().unwrap();
    assert_eq!(att.solvent, true);
    assert_eq!(att.sac_balance, 400_000);
    assert_eq!(att.aquarius_balance, 200_000);
    assert_eq!(att.defindex_balance, 150_000);
    assert_eq!(att.reserves, 750_000); // Multi-venue total
    assert_eq!(att.liabilities, 700_000);
}

#[test]
fn test_defindex_vault_with_zero_shares() {
    // Edge case: User has no shares in vault (should skip gracefully)
    let env = Env::default();
    env.mock_all_auths();

    let admin = Address::generate(&env);
    let reserve_account = Address::generate(&env);

    let verifier_id = env.register(crate::mock_verifier::MockVerifier, ());
    let verifier = verifier_id.clone();

    // SAC: 600k
    let sac_address = env.register_stellar_asset_contract_v2(admin.clone()).address();
    let asset_client = StellarAssetClient::new(&env, &sac_address);
    asset_client.mint(&reserve_account, &600_000);

    // DeFindex vault: User has 0 shares (not participating)
    let vault_id = env.register(crate::mock_vault::MockVault, ());
    let vault_client = crate::mock_vault::MockVaultClient::new(&env, &vault_id);
    vault_client.set_balance(&reserve_account, &0); // Zero shares
    vault_client.set_total_supply(&10_000);
    vault_client.set_total_assets(&1_000_000);

    let contract_id = env.register(SolvencyPolicy, ());
    let client = SolvencyPolicyClient::new(&env, &contract_id);

    let mut reserve_accounts = Vec::new(&env);
    reserve_accounts.push_back(reserve_account.clone());

    let mut defindex_vaults = Vec::new(&env);
    defindex_vaults.push_back(vault_id.clone());

    let config = Config {
        verifier,
        reserve_sac: sac_address,
        reserve_accounts,
        freshness_window: 100,
        aquarius_pools: Vec::new(&env),
        defindex_vaults,
    };

    client.initialize(&config);

    env.ledger().set(LedgerInfo {
        timestamp: 1000000,
        protocol_version: 22,
        sequence_number: 100,
        network_id: Default::default(),
        base_reserve: 10,
        min_temp_entry_ttl: 1,
        min_persistent_entry_ttl: 1,
        max_entry_ttl: 10000,
    });

    // L = 500,000
    // SAC = 600,000
    // DeFindex = 0 (user has no shares, skipped)
    // Total = 600,000 > 500,000 ✅ SOLVENT
    let public_inputs = create_public_inputs(&env, 500_000, 90);
    let proof = Bytes::new(&env);

    let result = client.attest(&public_inputs, &proof);
    assert_eq!(result, true);

    let att = client.is_solvent().unwrap();
    assert_eq!(att.solvent, true);
    assert_eq!(att.defindex_balance, 0); // Correctly skipped
    assert_eq!(att.reserves, 600_000);
}

#[test]
fn test_insolvent_even_with_defindex() {
    // Test: Incluso con DeFindex, si R < L → INSOLVENTE
    let env = Env::default();
    env.mock_all_auths();

    let admin = Address::generate(&env);
    let reserve_account = Address::generate(&env);

    let verifier_id = env.register(crate::mock_verifier::MockVerifier, ());
    let verifier = verifier_id.clone();

    // SAC: 300k
    let sac_address = env.register_stellar_asset_contract_v2(admin.clone()).address();
    let asset_client = StellarAssetClient::new(&env, &sac_address);
    asset_client.mint(&reserve_account, &300_000);

    // DeFindex: 100k
    let vault_id = env.register(crate::mock_vault::MockVault, ());
    let vault_client = crate::mock_vault::MockVaultClient::new(&env, &vault_id);
    vault_client.set_balance(&reserve_account, &1_000);
    vault_client.set_total_supply(&10_000);
    vault_client.set_total_assets(&1_000_000); // 1k/10k * 1M = 100k

    let contract_id = env.register(SolvencyPolicy, ());
    let client = SolvencyPolicyClient::new(&env, &contract_id);

    let mut reserve_accounts = Vec::new(&env);
    reserve_accounts.push_back(reserve_account.clone());

    let mut defindex_vaults = Vec::new(&env);
    defindex_vaults.push_back(vault_id.clone());

    let config = Config {
        verifier,
        reserve_sac: sac_address,
        reserve_accounts,
        freshness_window: 100,
        aquarius_pools: Vec::new(&env),
        defindex_vaults,
    };

    client.initialize(&config);

    env.ledger().set(LedgerInfo {
        timestamp: 1000000,
        protocol_version: 22,
        sequence_number: 100,
        network_id: Default::default(),
        base_reserve: 10,
        min_temp_entry_ttl: 1,
        min_persistent_entry_ttl: 1,
        max_entry_ttl: 10000,
    });

    // L = 500,000
    // SAC = 300,000
    // DeFindex = 100,000
    // Total = 400,000 < 500,000 ❌ INSOLVENTE
    let public_inputs = create_public_inputs(&env, 500_000, 90);
    let proof = Bytes::new(&env);

    let result = client.try_attest(&public_inputs, &proof);

    // Should fail with Insolvent error
    assert_eq!(result, Err(Ok(crate::Error::Insolvent)));
}
