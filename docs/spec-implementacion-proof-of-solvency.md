# Proof of Solvency — Spec de implementación

**Documento de implementación (código + arquitectura).** Complementa al documento "norte". Aquí bajamos a repo, contratos, circuito y el loop de pruebas.
Stack fijado: **Noir / UltraHonk** (circuitos) · **Soroban** (contratos, `soroban-sdk` 25.x) · **BN254** + **Poseidon2** (primitivas, vivas desde X-Ray / P25).

> **Verificación previa obligatoria** (la skill de ZK lo exige): antes de deployar, confirmar estado de CAP-0074 (BN254) y CAP-0075 (Poseidon) como `Implemented`, la versión de protocolo de la red, y el soporte en `soroban-sdk`. Evidencia actual: X-Ray (P25) los llevó a mainnet en enero 2026 y Yardstick (P26) sumó más funciones BN254. No es bloqueo; es checklist de deploy.

---

## 1. Layout del repo

Modelado sobre `rs-soroban-ultrahonk` (Nethermind), que reutilizamos como base del verificador.

```
proof-of-solvency/
├── circuits/
│   └── solvency/                 # circuito Noir (Merkle-sum-tree de pasivos)
│       ├── Nargo.toml
│       ├── Prover.toml
│       └── src/main.nr
├── contracts/
│   ├── verifier/                 # CAPA 1 — verificador UltraHonk (reusado de Nethermind)
│   ├── solvency_policy/          # CAPA 2 — nuestra lógica: lee reservas, R≥L, frescura
│   │   ├── Cargo.toml
│   │   └── src/{lib.rs, test.rs}
│   └── registry/                 # CAPA 3 — estado de atestaciones + consultas (MVP: fusionada en policy)
├── frontend/                     # dos pantallas: emisor (prover WASM) + público (badge)
├── scripts/                      # demo end-to-end (emitir USDX, fondear reservas, probar, verificar)
└── docs/                         # este spec + el documento "norte"
```

**Qué reusamos vs. qué construimos** (importa para el jurado y el SCF):
- *Reusado:* el verificador UltraHonk (Capa 1), la maquinaria Merkle Poseidon2 y patrones de range/lookup del repo de Nethermind, el SAC para leer reservas.
- *Construido en este hackathon:* el circuito de pasivos (Capa 1 de circuito), la Capa 2 (política de solvencia) y la Capa 3 (registro), más el frontend.

---

## 2. Arquitectura en tres capas

La skill de ZK recomienda separar **verificador / política / aplicación**. Lo adoptamos:

```mermaid
flowchart LR
  P[Prover off-chain<br/>Noir/UltraHonk] -->|prueba + public inputs| POL[Capa 2 — Solvency Policy]
  POL -->|cross-contract: verify_proof| VER[Capa 1 — Verifier<br/>UltraHonk, solo cripto]
  SAC[(SAC del activo de reserva)] -->|balance(cuenta), en vivo| POL
  POL -->|R ≥ L? + frescura? + anti-replay| REG[Capa 3 — Registry<br/>estado + consultas]
  REG --> Q[is_solvent → atestación]
```

- **Capa 1 (Verifier):** valida *solo* la prueba criptográfica. VK fija al deploy. No sabe nada de solvencia. Superficie de auditoría mínima.
- **Capa 2 (Policy):** la regla de negocio. Lee reservas en vivo, comprueba `R ≥ L`, frescura y anti-replay. Aquí vive la lógica de compliance.
- **Capa 3 (Registry):** guarda la atestación y la expone a consulta pública. En el MVP va fusionada con la Capa 2; se separa al escalar a multi-emisor.

---

## 3. Contrato — Capa 2 (Solvency Policy), esqueleto

```rust
#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype, contracterror, contractevent,
    token::Client as TokenClient, Address, Bytes, Env, Vec,
};

// --- Cliente del verificador (Capa 1), importado de su WASM ---
mod verifier {
    soroban_sdk::contractimport!(
        file = "../verifier/target/wasm32v1-none/release/verifier.wasm"
    );
}

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq)]
#[repr(u32)]
pub enum Error {
    AlreadyInitialized = 1,
    InvalidProof       = 2,
    StaleProof         = 3,   // ledger_seq fuera de la ventana de frescura
    Replay             = 4,   // ledger_seq <= último verificado
    Insolvent          = 5,   // R < L
    BadPublicInputs    = 6,
}

#[contracttype]
#[derive(Clone)]
pub enum DataKey {
    Config,        // VerifierAddr, ReserveSac, ReserveAccounts, FreshnessWindow
    LastSeq,       // anti-replay: último ledger_seq verificado
    Attestation,   // estado público (Capa 3, fusionada)
}

#[contracttype]
#[derive(Clone)]
pub struct Config {
    pub verifier: Address,
    pub reserve_sac: Address,           // SAC del activo de reserva (p.ej. USDC)
    pub reserve_accounts: Vec<Address>, // cuentas de reserva del emisor
    pub freshness_window: u32,          // máx. antigüedad en ledgers
}

#[contracttype]
#[derive(Clone)]
pub struct Attestation {
    pub solvent: bool,
    pub reserves: i128,     // R (público on-chain de todos modos)
    pub ledger_seq: u32,    // frescura del snapshot de pasivos
    pub timestamp: u64,
}

#[contractevent(topics = ["solvency"])]
pub struct AttestationEvent {
    pub solvent: bool,
    pub ledger_seq: u32,
}

#[contract]
pub struct SolvencyPolicy;

#[contractimpl]
impl SolvencyPolicy {
    pub fn __constructor(env: Env, config: Config) {
        env.storage().instance().set(&DataKey::Config, &config);
        env.storage().instance().set(&DataKey::LastSeq, &0u32);
    }

    /// Verifica una prueba de pasivos y actualiza la atestación.
    /// public_inputs (campos): [merkle_root, total_liabilities (L), ledger_seq]
    pub fn attest(env: Env, public_inputs: Bytes, proof: Bytes) -> Result<bool, Error> {
        let cfg: Config = env.storage().instance().get(&DataKey::Config).unwrap();

        // 1. Extraer L y ledger_seq de los inputs públicos
        let (l_value, snap_seq) = parse_public_inputs(&env, &public_inputs)
            .ok_or(Error::BadPublicInputs)?;

        // 2. Frescura + anti-replay (la skill: persistir un guard, no solo ventana)
        let current = env.ledger().sequence();
        if current.saturating_sub(snap_seq) > cfg.freshness_window {
            return Err(Error::StaleProof);
        }
        let last: u32 = env.storage().instance().get(&DataKey::LastSeq).unwrap_or(0);
        if snap_seq <= last {
            return Err(Error::Replay);
        }

        // 3. Verificación criptográfica (cross-contract a la Capa 1)
        let v = verifier::Client::new(&env, &cfg.verifier);
        if !v.verify_proof(&public_inputs, &proof) {
            return Err(Error::InvalidProof);
        }

        // 4. Leer reservas EN VIVO desde el ledger (sin auth: balance es de solo lectura)
        let token = TokenClient::new(&env, &cfg.reserve_sac);
        let mut reserves: i128 = 0;
        for acct in cfg.reserve_accounts.iter() {
            reserves = reserves.checked_add(token.balance(&acct)).expect("overflow");
        }

        // 5. Solvencia
        let solvent = reserves >= l_value;
        if !solvent {
            // Aun en caso insolvente, registramos el resultado (el demo lo muestra)
            Self::write_attestation(&env, false, reserves, snap_seq);
            return Err(Error::Insolvent);
        }

        // 6. Persistir estado + anti-replay + evento
        env.storage().instance().set(&DataKey::LastSeq, &snap_seq);
        Self::write_attestation(&env, true, reserves, snap_seq);
        AttestationEvent { solvent: true, ledger_seq: snap_seq }.publish(&env);
        Ok(true)
    }

    /// Capa 3 (fusionada): consulta pública del badge.
    pub fn is_solvent(env: Env) -> Option<Attestation> {
        env.storage().instance().get(&DataKey::Attestation)
    }
}

impl SolvencyPolicy {
    fn write_attestation(env: &Env, solvent: bool, reserves: i128, ledger_seq: u32) {
        let att = Attestation { solvent, reserves, ledger_seq, timestamp: env.ledger().timestamp() };
        env.storage().instance().set(&DataKey::Attestation, &att);
        env.storage().instance().extend_ttl(100, 518400); // ~30 días
    }
}

// parse_public_inputs: extrae (L, ledger_seq) del blob de campos. Implementación según
// el layout que emita el toolchain de Noir/bb (campos BN254 big-endian de 32 bytes).
fn parse_public_inputs(_env: &Env, _pi: &Bytes) -> Option<(i128, u32)> { /* ... */ None }
```

Notas de seguridad aplicadas (de la skill de Soroban): `__constructor` evita reinicialización; `checked_add` contra overflow; `DataKey` tipado evita colisiones; `extend_ttl` evita archival; el verificador es una dirección fija de confianza (no se acepta uno arbitrario); anti-replay persistido.

---

## 4. Circuito Noir — pasivos (Merkle-sum-tree), esqueleto

```rust
use dep::poseidon::poseidon2::Poseidon2;

global TREE_DEPTH: u32 = 20;          // hasta 2^20 tenedores
global MAX_BALANCE_BITS: u32 = 120;   // cota para el range check (cabe en i128)

fn hash2(a: Field, b: Field) -> Field { Poseidon2::hash([a, b], 2) }

// Nodo del árbol de sumas: combina hashes y propaga la suma de los hijos.
fn node(l_hash: Field, l_sum: Field, r_hash: Field, r_sum: Field) -> (Field, Field) {
    let h = Poseidon2::hash([l_hash, l_sum, r_hash, r_sum], 4);
    (h, l_sum + r_sum)
}

pub fn main(
    // --- públicos ---
    root: pub Field,                 // raíz del árbol de sumas (compromiso al conjunto)
    total_liabilities: pub Field,    // L
    ledger_seq: pub Field,           // ata la prueba a un snapshot (frescura)
    // --- privados ---
    balances: [Field; 1 << TREE_DEPTH],
    salts: [Field; 1 << TREE_DEPTH],
) {
    let n = balances.len();
    let mut hashes = [0; 1 << TREE_DEPTH];
    let mut sums   = [0; 1 << TREE_DEPTH];

    // Hojas: range check de no-negatividad (clave anti dummy-user attack) + compromiso
    for i in 0..n {
        balances[i].assert_max_bit_size::<MAX_BALANCE_BITS>(); // 0 <= balance < 2^120
        hashes[i] = hash2(balances[i], salts[i]);
        sums[i] = balances[i];
    }

    // Construir el árbol de sumas hacia arriba
    let mut width = n;
    while width > 1 {
        for i in 0..(width / 2) {
            let (h, s) = node(hashes[2*i], sums[2*i], hashes[2*i+1], sums[2*i+1]);
            hashes[i] = h;
            sums[i] = s;
        }
        width = width / 2;
    }

    // Enlazar con los públicos
    assert(hashes[0] == root);
    assert(sums[0] == total_liabilities);

    // ledger_seq es público para atar la prueba a ese snapshot (lo consume el contrato).
    let _ = ledger_seq;
}
```

Hashing del árbol = **Poseidon2** (ZK-friendly, nativo en Stellar). Sistema de prueba = **UltraHonk** sobre **BN254** (`bb --oracle_hash keccak`, como en el repo de Nethermind). El range check de no-negatividad es la defensa explícita contra el dummy-user attack.

---

## 5. La frontera circuito ↔ contrato

| Valor | Público / Privado | Quién lo usa |
|---|---|---|
| `root` | público | ancla el conjunto; base de la inclusión por tenedor (roadmap) |
| `total_liabilities` (L) | público | el contrato comprueba `R ≥ L` |
| `ledger_seq` | público | el contrato comprueba frescura + anti-replay |
| `balances[]`, `salts[]` | privados | nunca salen del prover |

`R` (reservas) **no** es input del circuito: lo lee el contrato en vivo del ledger. Eso mantiene las reservas siempre actuales y reduce el circuito a la parte que de verdad necesita privacidad (los pasivos).

---

## 6. Loop de build / test de punta a punta (testnet)

```bash
# 0. Toolchain
rustup target add wasm32v1-none
noirup -v 1.0.0-beta.9 && bbup -v 0.87.0
cargo install --locked stellar-cli

# 1. Emisor de juguete: emitir USDX y repartirlo a cuentas-tenedor (skill de Assets)
#    issuer crea el asset, holders crean trustline, issuer hace payment a cada holder.
#    Esos saldos son el libro de pasivos sintético.

# 2. Fondear las cuentas de reserva del emisor con USDC/XLM de testnet (friendbot + payment)

# 3. Desplegar el SAC del activo de reserva (para que el contrato pueda leer balance)
stellar contract asset deploy --asset USDC:G... --source issuer --network testnet

# 4. Construir circuito + generar prueba (sobre los tenedores y el ledger_seq actual)
nargo execute && bb prove ...   # produce proof + public_inputs

# 5. Desplegar verifier (Capa 1) y solvency_policy (Capa 2/3) con su constructor
stellar contract build
stellar contract deploy --wasm .../verifier.wasm ...
stellar contract deploy --wasm .../solvency_policy.wasm -- \
  --config '{ "verifier": "C...", "reserve_sac": "C...", "reserve_accounts": ["G..."], "freshness_window": 100 }'

# 6. Atestar: enviar la prueba al contrato → lee reservas, verifica, comprueba R ≥ L
stellar contract invoke --id C... -- attest --public_inputs ... --proof ...

# 7. Consultar el badge (pantalla pública)
stellar contract invoke --id C... -- is_solvent

# 8. DEMO del ZK como load-bearing: bajar la reserva por debajo de L, regenerar,
#    y mostrar que ahora devuelve Insolvent. Esa es la prueba de que no es decorativo.
```

Tests (skill de Soroban): unit con `Env::default()` + `env.ledger().set_sequence_number()` para frescura y `mock_all_auths`; caso negativo de prueba manipulada → `InvalidProof`; caso insolvente → `Insolvent`; replay → `Replay`. Snapshots de test commiteados.

---

## 7. La frontera de soundness (honestidad técnica)

El MVP prueba: *"existe un conjunto de saldos no-negativos, comprometido bajo `root`, que suma `L`, y `L ≤ R`."* Lo que **no** prueba por sí solo es que ese conjunto incluya a *todos* los tenedores — un emisor podría omitir tenedores para achicar `L`. Cerrar ese hueco es exactamente el rol de las **pruebas de inclusión por tenedor** (roadmap §9.2): cada tenedor verifica que su saldo entró bajo `root`. Por eso la inclusión no es adorno, es el complemento de soundness. Es el mismo límite que enfrentan las implementaciones serias (Binance) y se documenta abierto, no se esconde.

Otra frontera: leer `balance(cuenta)` prueba que la cuenta tiene `R`, no que el emisor la controla. MVP confía en las cuentas declaradas; se endurece exigiendo autorización de las cuentas de reserva (Tranche 2).

---

## 8. Mapa de seguridad (vulnerabilidades de la skill → defensa)

| Riesgo (skill Soroban) | Defensa en este diseño |
|---|---|
| Reinicialización | `__constructor` (corre una vez) |
| Overflow aritmético | `checked_add` en la suma de reservas |
| Llamada a contrato arbitrario | verifier es dirección fija de confianza (no parámetro) |
| Replay de prueba | guard persistido `LastSeq` + ventana de frescura |
| Colisión de storage | `DataKey` tipado |
| Archival de datos | `extend_ttl` en la atestación |
| Dummy-user / saldos negativos | range check de no-negatividad en el circuito |
