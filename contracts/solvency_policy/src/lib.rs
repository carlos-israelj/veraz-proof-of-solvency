#![no_std]

//! Solvency Policy Contract (Capa 2 + 3 fusionadas)
//!
//! Verifica pruebas de pasivos ZK y comprueba solvencia:
//!   Solvencia = Reservas (R) ≥ Pasivos (L)
//!
//! - Lee reservas EN VIVO desde el ledger vía SAC
//! - Verifica prueba ZK cross-contract (Capa 1)
//! - Persiste atestación pública (Capa 3)
//! - Implementa frescura + anti-replay

use soroban_sdk::{
    contract, contractimpl, contracttype, contracterror, contractmeta,
    token::TokenClient, Address, Bytes, Env, Vec, Symbol, IntoVal,
};

// Metadata del contrato
contractmeta!(
    key = "Description",
    val = "Proof of Solvency Policy - Verifies ZK proofs and attests issuer solvency"
);

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum Error {
    AlreadyInitialized = 1,
    NotInitialized = 2,
    InvalidProof = 3,
    StaleProof = 4,      // ledger_seq fuera de la ventana de frescura
    Replay = 5,          // ledger_seq <= último verificado
    Insolvent = 6,       // R < L
    BadPublicInputs = 7,
    Overflow = 8,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum DataKey {
    Config,
    LastSeq,
    Attestation,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Config {
    pub verifier: Address,              // Contrato verificador (Capa 1)
    pub reserve_sac: Address,           // SAC del activo de reserva (ej: USDC)
    pub reserve_accounts: Vec<Address>, // Cuentas de reserva del emisor
    pub freshness_window: u32,          // Máx. antigüedad en ledgers
    pub aquarius_pools: Vec<Address>,   // OPTIONAL: Aquarius AMM pool addresses (can be empty)
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Attestation {
    pub solvent: bool,
    pub reserves: i128,     // R (público on-chain de todos modos)
    pub liabilities: i128,  // L (extraído de public_inputs)
    pub ledger_seq: u32,    // Frescura del snapshot de pasivos
    pub timestamp: u64,
}

#[contract]
pub struct SolvencyPolicy;

#[contractimpl]
impl SolvencyPolicy {
    /// Inicializa la configuración del emisor.
    /// Solo puede llamarse una vez.
    pub fn initialize(env: Env, config: Config) -> Result<(), Error> {
        if env.storage().instance().has(&DataKey::Config) {
            return Err(Error::AlreadyInitialized);
        }

        env.storage().instance().set(&DataKey::Config, &config);
        env.storage().instance().set(&DataKey::LastSeq, &0u32);

        // Extender TTL para evitar archival
        env.storage().instance().extend_ttl(100, 518400); // ~30 días

        Ok(())
    }

    /// Verifica una prueba de pasivos y actualiza la atestación.
    ///
    /// # Flujo:
    /// 1. Parsear public_inputs → extraer L y ledger_seq
    /// 2. Validar frescura + anti-replay
    /// 3. Verificar prueba ZK (cross-contract a Capa 1)
    /// 4. Leer reservas R en vivo del ledger
    /// 5. Comprobar R ≥ L
    /// 6. Persistir atestación
    ///
    /// # Nota sobre verificación:
    /// En producción, llamaría al verifier (Capa 1) vía:
    ///   verifier::Client::new(&env, &cfg.verifier).verify_proof(&public_inputs, &proof)
    ///
    /// Para el MVP sin verifier desplegado, se SIMULA la verificación.
    /// TODO: Integrar con rs-soroban-ultrahonk cuando esté desplegado.
    pub fn attest(
        env: Env,
        public_inputs: Bytes,
        proof: Bytes,
    ) -> Result<bool, Error> {
        let cfg: Config = env
            .storage()
            .instance()
            .get(&DataKey::Config)
            .ok_or(Error::NotInitialized)?;

        // 1. Parsear public_inputs: [root (32), L (32), ledger_seq (32)]
        let (l_value, snap_seq) = Self::parse_public_inputs(&env, &public_inputs)?;

        // 2. Frescura + anti-replay (persistido)
        let current_seq = env.ledger().sequence();

        if current_seq.saturating_sub(snap_seq) > cfg.freshness_window {
            return Err(Error::StaleProof);
        }

        let last_seq: u32 = env.storage().instance().get(&DataKey::LastSeq).unwrap_or(0);
        if snap_seq <= last_seq {
            return Err(Error::Replay);
        }

        // 3. Verificación criptográfica (cross-contract a Capa 1)
        // Verifier deployado en testnet: CAU5ZPZSJSASGEDMKPBQHL26AFEMH3DQWWTG52Y77L5NWWSECBHJAFKA
        env.invoke_contract::<()>(
            &cfg.verifier,
            &Symbol::new(&env, "verify_proof"),
            (public_inputs.clone(), proof.clone()).into_val(&env),
        );

        // 4. Leer reservas EN VIVO desde el ledger (sin auth: balance es read-only)
        let token = TokenClient::new(&env, &cfg.reserve_sac);
        let mut reserves: i128 = 0;

        // 4a. Read reserves from regular accounts
        for acct in cfg.reserve_accounts.iter() {
            let balance = token.balance(&acct);
            reserves = reserves.checked_add(balance).ok_or(Error::Overflow)?;
        }

        // 4b. OPTIONAL: Read reserves from Aquarius AMM pools
        // If aquarius_pools is empty, this is skipped (no overhead)
        // Pool shares are queried for each reserve account (same accounts that hold direct reserves)
        if !cfg.aquarius_pools.is_empty() {
            for acct in cfg.reserve_accounts.iter() {
                let aquarius_reserves = aquarius::read_aquarius_reserves(
                    &env,
                    &cfg.aquarius_pools,
                    &acct,
                )?;
                reserves = reserves.checked_add(aquarius_reserves).ok_or(Error::Overflow)?;
            }
        }

        // 5. Solvencia: R ≥ L
        let solvent = reserves >= l_value;

        // 6. Persistir estado + anti-replay + evento
        env.storage().instance().set(&DataKey::LastSeq, &snap_seq);
        Self::write_attestation(&env, solvent, reserves, l_value, snap_seq);

        // Emitir evento
        env.events().publish(
            (Symbol::new(&env, "solvency"),),
            (solvent, snap_seq),
        );

        if !solvent {
            return Err(Error::Insolvent);
        }

        Ok(true)
    }

    /// Consulta pública del badge de solvencia (Capa 3).
    /// Lee por simulación sin firmar.
    pub fn is_solvent(env: Env) -> Option<Attestation> {
        env.storage().instance().get(&DataKey::Attestation)
    }

    /// Obtener configuración (útil para debugging)
    pub fn get_config(env: Env) -> Option<Config> {
        env.storage().instance().get(&DataKey::Config)
    }
}

// --- Helpers privados ---

impl SolvencyPolicy {
    fn write_attestation(
        env: &Env,
        solvent: bool,
        reserves: i128,
        liabilities: i128,
        ledger_seq: u32,
    ) {
        let att = Attestation {
            solvent,
            reserves,
            liabilities,
            ledger_seq,
            timestamp: env.ledger().timestamp(),
        };

        env.storage().instance().set(&DataKey::Attestation, &att);
        env.storage().instance().extend_ttl(100, 518400); // ~30 días
    }

    /// Parsea public_inputs: espera 96 bytes = [root, L, ledger_seq] (3 campos de 32 bytes)
    /// Retorna (L, ledger_seq)
    ///
    /// NOTA: Este parsing asume que los campos vienen como big-endian u128.
    /// En producción debe coincidir con el formato que emite bb.js (UltraHonk).
    fn parse_public_inputs(_env: &Env, pi: &Bytes) -> Result<(i128, u32), Error> {
        if pi.len() < 96 {
            return Err(Error::BadPublicInputs);
        }

        // root = bytes[0..32] (no lo usamos aquí, solo en el verifier)
        // L = bytes[32..64]
        // ledger_seq = bytes[64..96]

        let l_bytes = pi.slice(32..64);
        let seq_bytes = pi.slice(64..96);

        // Convertir bytes a i128 (big-endian)
        // Simplificación: tomamos los últimos 16 bytes para i128
        let mut l_arr = [0u8; 16];
        let mut seq_arr = [0u8; 16];

        for i in 0..16 {
            l_arr[i] = l_bytes.get(16 + i as u32).unwrap_or(0);
            seq_arr[i] = seq_bytes.get(16 + i as u32).unwrap_or(0);
        }

        let l_value = i128::from_be_bytes(l_arr);
        let seq_value = u32::from_be_bytes([
            seq_arr[12], seq_arr[13], seq_arr[14], seq_arr[15]
        ]);

        Ok((l_value, seq_value))
    }
}

mod aquarius;

#[cfg(test)]
mod mock_verifier;
#[cfg(test)]
mod mock_pool;
#[cfg(test)]
mod test;
