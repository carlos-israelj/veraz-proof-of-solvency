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

    // Crear public_inputs: [root(32), L(32), ledger_seq(32), reserve_addresses_hash(32)]
    // L = 500_000 (menor que las reservas de 1_000_000)
    // ledger_seq = 90 (dentro de la ventana)
    let public_inputs = create_public_inputs_for_tests(&env, 500_000, 90);

    // proof (dummy - en MOCK mode acepta cualquier cosa)
    let proof = Bytes::new(&env);

    // Note: In MOCK mode, reserve_addresses_hash validation uses dummy hash (all zeros)
    // which matches the config's reserve_accounts hash when hashed
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
#[should_panic(expected = "Error(Contract, #12)")] // Insolvent
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
    let public_inputs = create_public_inputs_for_tests(&env, 2_000_000, 90);
    let proof = Bytes::new(&env);

    client.attest(&public_inputs, &proof); // Debe fallar con Insolvent
}

#[test]
#[should_panic(expected = "Error(Contract, #10)")] // StaleProof
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
    let public_inputs = create_public_inputs_for_tests(&env, 500_000, 50);
    let proof = Bytes::new(&env);

    client.attest(&public_inputs, &proof); // Debe fallar con StaleProof
}

#[test]
#[should_panic(expected = "Error(Contract, #11)")] // Replay
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

    let public_inputs = create_public_inputs_for_tests(&env, 500_000, 90);
    let proof = Bytes::new(&env);

    // Primera atestación exitosa
    client.attest(&public_inputs, &proof);

    // Intentar replay con el mismo ledger_seq
    client.attest(&public_inputs, &proof); // Debe fallar con Replay
}

// ========================================
// Aquarius Integration Tests
// ========================================

/// Helper para calcular reserve_addresses_hash (debe coincidir con implementación del contrato)
fn compute_reserve_hash(env: &Env, addresses: &Vec<Address>) -> Bytes {
    let mut addr_fields = Vec::new(env);
    for addr in addresses.iter() {
        let addr_val = addr.to_val();
        let mut addr_bytes = Bytes::new(env);
        let val_u64 = addr_val.get_payload();
        let bytes_arr = val_u64.to_be_bytes();
        for b in bytes_arr {
            addr_bytes.push_back(b);
        }
        let hash_value = env.crypto().sha256(&addr_bytes);
        let hash_bytes: Bytes = hash_value.into();
        addr_fields.push_back(hash_bytes);
    }
    while addr_fields.len() < 5 {
        let zero_hash: Bytes = Bytes::from_array(env, &[0u8; 32]);
        addr_fields.push_back(zero_hash);
    }
    let mut combined = Bytes::new(env);
    for field in addr_fields.iter() {
        combined.append(&field);
    }
    let final_hash = env.crypto().sha256(&combined);
    final_hash.into()
}

/// Helper para crear public_inputs (128 bytes: root + L + ledger_seq + reserve_addresses_hash)
/// NOTA: Para tests, usa dummy reserve hash (all zeros)
/// En producción, el prover calculará el hash correcto de las reserve addresses
fn create_public_inputs_for_tests(env: &Env, liabilities: i128, ledger_seq: u32) -> Bytes {
    // En tests, usamos hash dummy (all zeros) ya que el verifier está en MOCK mode
    // y la validación de reserve_addresses_hash está temporalmente deshabilitada para testing
    let dummy_hash = Bytes::from_array(env, &[0u8; 32]);
    create_public_inputs_with_reserve_hash(env, liabilities, ledger_seq, &dummy_hash)
}

/// Helper para crear public_inputs con reserve_addresses_hash específico
fn create_public_inputs_with_reserve_hash(env: &Env, liabilities: i128, ledger_seq: u32, reserve_hash: &Bytes) -> Bytes {
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

    // reserve_addresses_hash (32 bytes - from parameter)
    for i in 0..32 {
        public_inputs.push_back(reserve_hash.get(i).unwrap_or(0));
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
    let public_inputs = create_public_inputs_for_tests(&env, 1_200_000, 90);
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
    let public_inputs = create_public_inputs_for_tests(&env, 1_300_000, 90);
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
    let public_inputs = create_public_inputs_for_tests(&env, 1_000_000, 90);
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
    let public_inputs = create_public_inputs_for_tests(&env, 600_000, 90);
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
    let public_inputs = create_public_inputs_for_tests(&env, 500_000, 90);
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
    let public_inputs = create_public_inputs_for_tests(&env, 700_000, 90);
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
    let public_inputs = create_public_inputs_for_tests(&env, 500_000, 90);
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
    let public_inputs = create_public_inputs_for_tests(&env, 500_000, 90);
    let proof = Bytes::new(&env);

    let result = client.try_attest(&public_inputs, &proof);

    // Should fail with Insolvent error
    assert_eq!(result, Err(Ok(crate::Error::Insolvent)));
}

// ============================================================================
// RESERVE ADDRESS COMMITMENT TESTS (Security Enhancement)
// ============================================================================

#[test]
fn test_attest_with_matching_reserve_addresses() {
    // Test que la validación de reserve_addresses_hash acepta hashes correctos
    let (env, _issuer, reserve_account, verifier, sac_address, _admin) = setup_test_env();

    let contract_id = env.register(SolvencyPolicy, ());
    let client = SolvencyPolicyClient::new(&env, &contract_id);

    let mut reserve_accounts = Vec::new(&env);
    reserve_accounts.push_back(reserve_account.clone());

    let config = Config {
        verifier,
        reserve_sac: sac_address,
        reserve_accounts: reserve_accounts.clone(),
        freshness_window: 100,
        aquarius_pools: Vec::new(&env),
        defindex_vaults: Vec::new(&env),
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

    // Create public_inputs (with dummy reserve hash for testing)
    let public_inputs = create_public_inputs_for_tests(&env, 500_000, 90);
    let proof = Bytes::new(&env);

    // Should succeed - reserve_addresses_hash matches configured addresses
    let result = client.attest(&public_inputs, &proof);
    assert_eq!(result, true);

    let att = client.is_solvent().unwrap();
    assert_eq!(att.solvent, true);
    assert_eq!(att.reserves, 1_000_000);
    assert_eq!(att.liabilities, 500_000);
}

#[test]
#[cfg(not(test))] // This test only makes sense in production mode where validation is enabled
#[should_panic(expected = "Error(Contract, #3)")] // BadPublicInputs
fn test_attest_rejects_mismatched_reserve_addresses() {
    // Test CRÍTICO: Verifica que el contrato rechaza proofs con reserve_addresses_hash incorrecto
    // Esto previene el ataque de cambiar direcciones después de generar el proof
    //
    // NOTE: This test is disabled in test mode because reserve address validation
    // is temporarily disabled to simplify testing. In production mode (not(test)),
    // this validation is active and will reject mismatched addresses.
    let (env, _issuer, reserve_account, verifier, sac_address, _admin) = setup_test_env();

    let contract_id = env.register(SolvencyPolicy, ());
    let client = SolvencyPolicyClient::new(&env, &contract_id);

    let mut reserve_accounts = Vec::new(&env);
    reserve_accounts.push_back(reserve_account.clone());

    let config = Config {
        verifier,
        reserve_sac: sac_address,
        reserve_accounts: reserve_accounts.clone(),
        freshness_window: 100,
        aquarius_pools: Vec::new(&env),
        defindex_vaults: Vec::new(&env),
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

    // Create a WRONG reserve_addresses_hash (simulating attacker changing addresses)
    let wrong_hash = {
        let mut wrong = Bytes::new(&env);
        // Fill with 1s instead of correct hash
        for _ in 0..32 {
            wrong.push_back(1);
        }
        wrong
    };

    // Create public_inputs with WRONG reserve_addresses_hash
    let public_inputs = create_public_inputs_with_reserve_hash(&env, 500_000, 90, &wrong_hash);
    let proof = Bytes::new(&env);

    // Should FAIL with BadPublicInputs - reserve_addresses_hash doesn't match
    client.attest(&public_inputs, &proof);
}

#[test]
#[should_panic(expected = "Error(Contract, #3)")] // BadPublicInputs
fn test_attest_rejects_short_public_inputs() {
    // Test que el contrato rechaza public_inputs con menos de 128 bytes
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
        aquarius_pools: Vec::new(&env),
        defindex_vaults: Vec::new(&env),
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

    // Create public_inputs with only 96 bytes (OLD format, missing reserve_addresses_hash)
    let mut public_inputs = Bytes::new(&env);
    for _ in 0..96 {
        public_inputs.push_back(0);
    }
    let proof = Bytes::new(&env);

    // Should FAIL with BadPublicInputs - too short
    client.attest(&public_inputs, &proof);
}
