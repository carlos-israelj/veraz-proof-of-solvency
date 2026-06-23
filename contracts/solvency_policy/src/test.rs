#![cfg(test)]

use super::*;
use soroban_sdk::{
    testutils::{Address as _, Ledger, LedgerInfo},
    token::{StellarAssetClient, TokenClient},
    Address, Env, String,
};

fn create_token_contract<'a>(env: &Env, admin: &Address) -> (TokenClient<'a>, Address) {
    let contract_id = env.register_stellar_asset_contract_v2(admin.clone());
    (
        TokenClient::new(env, &contract_id.address()),
        contract_id.address(),
    )
}

fn setup_test_env() -> (Env, Address, Address, Address, Address, Address) {
    let env = Env::default();
    env.mock_all_auths();

    let admin = Address::generate(&env);
    let issuer = Address::generate(&env);
    let reserve_account = Address::generate(&env);
    let verifier = Address::generate(&env); // Mock verifier

    // Crear SAC de reserva (ej: USDC)
    let (token_client, sac_address) = create_token_contract(&env, &admin);
    let asset_client = StellarAssetClient::new(&env, &sac_address);

    // Mint tokens a la cuenta de reserva
    asset_client.mint(&reserve_account, &1_000_000);

    (env, issuer, reserve_account, verifier, sac_address, admin)
}

#[test]
fn test_constructor() {
    let (env, _issuer, reserve_account, verifier, sac_address, _admin) = setup_test_env();

    let contract_id = env.register_contract(None, SolvencyPolicy);
    let client = SolvencyPolicyClient::new(&env, &contract_id);

    let mut reserve_accounts = Vec::new(&env);
    reserve_accounts.push_back(reserve_account.clone());

    let config = Config {
        verifier: verifier.clone(),
        reserve_sac: sac_address.clone(),
        reserve_accounts,
        freshness_window: 100,
    };

    client.__constructor(&config);

    // Verificar que la configuración se guardó
    let stored_config = client.get_config();
    assert!(stored_config.is_some());
    assert_eq!(stored_config.unwrap().freshness_window, 100);
}

#[test]
#[should_panic(expected = "Error(Contract, #1)")] // AlreadyInitialized
fn test_constructor_prevents_reinitialization() {
    let (env, _issuer, reserve_account, verifier, sac_address, _admin) = setup_test_env();

    let contract_id = env.register_contract(None, SolvencyPolicy);
    let client = SolvencyPolicyClient::new(&env, &contract_id);

    let mut reserve_accounts = Vec::new(&env);
    reserve_accounts.push_back(reserve_account.clone());

    let config = Config {
        verifier: verifier.clone(),
        reserve_sac: sac_address.clone(),
        reserve_accounts,
        freshness_window: 100,
    };

    client.__constructor(&config);
    client.__constructor(&config); // Debe fallar
}

#[test]
fn test_attest_solvent() {
    let (env, _issuer, reserve_account, verifier, sac_address, _admin) = setup_test_env();

    let contract_id = env.register_contract(None, SolvencyPolicy);
    let client = SolvencyPolicyClient::new(&env, &contract_id);

    let mut reserve_accounts = Vec::new(&env);
    reserve_accounts.push_back(reserve_account.clone());

    let config = Config {
        verifier,
        reserve_sac: sac_address,
        reserve_accounts,
        freshness_window: 100,
    };

    client.__constructor(&config);

    // Configurar ledger
    env.ledger().set(LedgerInfo {
        timestamp: 1000000,
        protocol_version: 20,
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

    let contract_id = env.register_contract(None, SolvencyPolicy);
    let client = SolvencyPolicyClient::new(&env, &contract_id);

    let mut reserve_accounts = Vec::new(&env);
    reserve_accounts.push_back(reserve_account.clone());

    let config = Config {
        verifier,
        reserve_sac: sac_address,
        reserve_accounts,
        freshness_window: 100,
    };

    client.__constructor(&config);

    env.ledger().set(LedgerInfo {
        timestamp: 1000000,
        protocol_version: 20,
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

    let contract_id = env.register_contract(None, SolvencyPolicy);
    let client = SolvencyPolicyClient::new(&env, &contract_id);

    let mut reserve_accounts = Vec::new(&env);
    reserve_accounts.push_back(reserve_account.clone());

    let config = Config {
        verifier,
        reserve_sac: sac_address,
        reserve_accounts,
        freshness_window: 10, // Ventana pequeña
    };

    client.__constructor(&config);

    env.ledger().set(LedgerInfo {
        timestamp: 1000000,
        protocol_version: 20,
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

    let contract_id = env.register_contract(None, SolvencyPolicy);
    let client = SolvencyPolicyClient::new(&env, &contract_id);

    let mut reserve_accounts = Vec::new(&env);
    reserve_accounts.push_back(reserve_account.clone());

    let config = Config {
        verifier,
        reserve_sac: sac_address,
        reserve_accounts,
        freshness_window: 100,
    };

    client.__constructor(&config);

    env.ledger().set(LedgerInfo {
        timestamp: 1000000,
        protocol_version: 20,
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
