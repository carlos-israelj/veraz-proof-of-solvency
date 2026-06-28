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
