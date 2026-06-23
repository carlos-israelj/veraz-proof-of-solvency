# Veraz - Contratos Soroban

Contratos inteligentes para el sistema de Proof of Solvency en Stellar.

## Arquitectura en 3 capas

```
┌─────────────────────────────────────┐
│  Capa 3: Registry (fusionada)      │
│  - Estado de atestaciones           │
│  - Consultas públicas (is_solvent)  │
└─────────────────────────────────────┘
           ↑
┌─────────────────────────────────────┐
│  Capa 2: Solvency Policy (✓ aquí)  │
│  - Lee reservas R vía SAC           │
│  - Verifica R ≥ L                   │
│  - Frescura + anti-replay           │
│  - Cross-contract a Capa 1          │
└─────────────────────────────────────┘
           ↑
┌─────────────────────────────────────┐
│  Capa 1: Verifier (reutilizado)    │
│  - Verificación UltraHonk pura      │
│  - De: rs-soroban-ultrahonk         │
│  - VK fija, solo criptografía       │
└─────────────────────────────────────┘
```

## Estructura

```
contracts/
├── solvency_policy/      # Capa 2+3 (implementado)
│   ├── src/
│   │   ├── lib.rs       # Contrato principal
│   │   └── test.rs      # Tests unitarios
│   └── Cargo.toml
└── verifier/            # Capa 1 (TODO: integrar de Nethermind)
```

## Requisitos

- Rust 1.74+
- `wasm32-unknown-unknown` target
- Stellar CLI (`stellar-cli`)

```bash
rustup target add wasm32-unknown-unknown
cargo install --locked stellar-cli
```

## Build

```bash
cd contracts/solvency_policy
cargo build --target wasm32-unknown-unknown --release
```

Optimizado:
```bash
stellar contract build
```

El WASM compilado estará en:
`target/wasm32-unknown-unknown/release/solvency_policy.wasm`

## Tests

```bash
cargo test
```

Los tests cubren:
- ✅ Constructor e inicialización
- ✅ Prevención de reinicialización
- ✅ Atestación solvente (R ≥ L)
- ✅ Detección de insolvencia (R < L)
- ✅ Rechazo de pruebas antiguas (stale)
- ✅ Protección anti-replay

## Deploy a Testnet

### 1. Configurar identidad

```bash
stellar keys generate issuer --network testnet
stellar keys address issuer
```

### 2. Fondear cuenta (friendbot)

```bash
stellar keys fund issuer --network testnet
```

### 3. Deploy del contrato

```bash
stellar contract deploy \
  --wasm target/wasm32-unknown-unknown/release/solvency_policy.wasm \
  --source issuer \
  --network testnet
```

Esto retorna el Contract ID (ej: `CBQHNAXSI55GX2GN6D67GK7BHVPSLJUGZQEU7WJ5LKR5PNUCGLIMAO4K`)

### 4. Inicializar con `__constructor`

```bash
stellar contract invoke \
  --id <CONTRACT_ID> \
  --source issuer \
  --network testnet \
  -- __constructor \
  --config '{
    "verifier": "<VERIFIER_CONTRACT_ID>",
    "reserve_sac": "<USDC_SAC_ADDRESS>",
    "reserve_accounts": ["<RESERVE_ACCOUNT_1>", "<RESERVE_ACCOUNT_2>"],
    "freshness_window": 100
  }'
```

### 5. Consultar configuración

```bash
stellar contract invoke \
  --id <CONTRACT_ID> \
  --network testnet \
  -- get_config
```

## Flujo de Atestación

### Emisor: Enviar prueba

```bash
stellar contract invoke \
  --id <CONTRACT_ID> \
  --source issuer \
  --network testnet \
  -- attest \
  --public_inputs <BYTES_HEX> \
  --proof <BYTES_HEX>
```

### Público: Consultar solvencia

```bash
stellar contract invoke \
  --id <CONTRACT_ID> \
  --network testnet \
  -- is_solvent
```

Retorna:
```json
{
  "solvent": true,
  "reserves": 1000000,
  "liabilities": 500000,
  "ledger_seq": 12345,
  "timestamp": 1700000000
}
```

## Seguridad

### Implementado
- ✅ Anti-reinicialización (`__constructor` una vez)
- ✅ Overflow checks (`checked_add`)
- ✅ Frescura de pruebas (ventana de ledgers)
- ✅ Anti-replay persistido (guard de `LastSeq`)
- ✅ TTL extendido para evitar archival
- ✅ Storage tipado (`DataKey` enum)

### Pendiente (Roadmap)
- ⏳ Integración con verifier UltraHonk real (Capa 1)
- ⏳ Verificación de control de cuentas de reserva (autorización)
- ⏳ Soporte multi-emisor (separar Capa 3 en Registry)
- ⏳ View keys para divulgación selectiva

## Modo MOCK

**IMPORTANTE**: El contrato actual acepta pruebas en modo MOCK para desarrollo.

En producción, la línea:
```rust
// let verifier = verifier::Client::new(&env, &cfg.verifier);
// if !verifier.verify_proof(&public_inputs, &proof) {
//     return Err(Error::InvalidProof);
// }
```

Debe descomentarse para verificar pruebas ZK reales.

## Integración con Frontend

El frontend (`src/lib/stellar.js`) ya está configurado para:
- Llamar a `attest()` con pruebas generadas
- Consultar `is_solvent()` por simulación (sin firmar)

Una vez deployado el contrato, actualiza el Contract ID en la UI.

## Referencias

- [Soroban Docs](https://soroban.stellar.org/docs)
- [rs-soroban-ultrahonk](https://github.com/Nethermind-io/rs-soroban-ultrahonk) - Verifier base
- [Specification](../docs/spec-implementacion-proof-of-solvency.md) - Diseño completo
