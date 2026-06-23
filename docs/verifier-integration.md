# Integración del Verifier (Capa 1)

## Estado Actual

El contrato `solvency_policy` (Capa 2) está implementado pero **en modo MOCK** para el verifier.

```rust
// MOCK: Para el MVP, aceptamos cualquier prueba si proof no está vacío
if proof.len() == 0 && public_inputs.len() > 0 {
    // Solo validamos que haya inputs públicos válidos
    // En producción esto NO es seguro - requiere verificación ZK real
}
```

## Objetivo: Integrar rs-soroban-ultrahonk

El verifier UltraHonk (Capa 1) se reutilizará del repo de Nethermind:
https://github.com/Nethermind-io/rs-soroban-ultrahonk

### Arquitectura

```
┌──────────────────────────────────────────┐
│  solvency_policy (Capa 2)                │
│                                          │
│  fn attest(...) {                        │
│    // 1. Parse inputs                    │
│    // 2. Freshness + anti-replay         │
│    // 3. Cross-contract call ────────┐   │
│    // 4. Read reserves               │   │
│    // 5. Check R >= L                │   │
│  }                                   │   │
└──────────────────────────────────────┼───┘
                                       │
                                       ▼
┌──────────────────────────────────────────┐
│  ultrahonk_verifier (Capa 1)             │
│                                          │
│  fn verify_proof(                        │
│    public_inputs: Bytes,                 │
│    proof: Bytes                          │
│  ) -> bool                               │
│                                          │
│  - VK fija al deploy                     │
│  - Solo verificación criptográfica       │
│  - BN254 + UltraHonk                     │
└──────────────────────────────────────────┘
```

## Pasos de Integración

### 1. Clonar y Build del Verifier

```bash
cd contracts
git clone https://github.com/Nethermind-io/rs-soroban-ultrahonk verifier
cd verifier
cargo build --target wasm32-unknown-unknown --release
```

### 2. Deploy del Verifier a Testnet

```bash
stellar contract deploy \
  --wasm target/wasm32-unknown-unknown/release/ultrahonk_verifier.wasm \
  --source issuer \
  --network testnet
```

Guarda el `VERIFIER_CONTRACT_ID`.

### 3. Generar Verification Key (VK)

La VK se genera desde el circuito compilado:

```bash
cd ../../circuits/solvency
nargo compile
bb write_vk -b ./target/solvency.json -o ./vk
```

### 4. Inicializar Verifier con VK

```bash
stellar contract invoke \
  --id <VERIFIER_CONTRACT_ID> \
  --source issuer \
  --network testnet \
  -- initialize \
  --vk <VK_BYTES_HEX>
```

### 5. Actualizar solvency_policy

Descomentar en `solvency_policy/src/lib.rs`:

```rust
// Importar el cliente del verifier
mod verifier {
    soroban_sdk::contractimport!(
        file = "../verifier/target/wasm32-unknown-unknown/release/ultrahonk_verifier.wasm"
    );
}

// En fn attest(), reemplazar el MOCK:
let verifier = verifier::Client::new(&env, &cfg.verifier);
if !verifier.verify_proof(&public_inputs, &proof) {
    return Err(Error::InvalidProof);
}
```

### 6. Rebuild y Redeploy

```bash
make build
stellar contract deploy \
  --wasm target/wasm32-unknown-unknown/release/solvency_policy.wasm \
  --source issuer \
  --network testnet
```

### 7. Constructor con Verifier Address

```bash
stellar contract invoke \
  --id <POLICY_CONTRACT_ID> \
  --source issuer \
  --network testnet \
  -- __constructor \
  --config '{
    "verifier": "<VERIFIER_CONTRACT_ID>",
    "reserve_sac": "<SAC_ADDRESS>",
    "reserve_accounts": ["<ACCOUNT>"],
    "freshness_window": 100
  }'
```

## Testing

Una vez integrado, los tests deben mockear el verifier o usar un contrato real:

```rust
#[test]
fn test_attest_with_real_verifier() {
    let env = Env::default();

    // Deploy verifier contract
    let verifier_id = env.register_contract_wasm(None, verifier::WASM);
    let verifier_client = verifier::Client::new(&env, &verifier_id);

    // Initialize with VK
    verifier_client.initialize(&vk_bytes);

    // Generate real proof with Noir
    let (proof, public_inputs) = generate_real_proof(...);

    // Test policy with real verification
    let policy_client = SolvencyPolicyClient::new(&env, &policy_id);
    assert!(policy_client.attest(&public_inputs, &proof));
}
```

## Formato de Public Inputs

El verifier espera `public_inputs` en formato UltraHonk:

```
public_inputs: Bytes = [
  root (32 bytes)          // Merkle root, BN254 field element
  L (32 bytes)             // Total liabilities, field element
  ledger_seq (32 bytes)    // Ledger sequence, field element
]
Total: 96 bytes
```

Generado por `bb.js`:
```javascript
const { proof, publicInputs } = await backend.generateProof(witness);
// publicInputs ya está en el formato correcto
```

## Verificación de Protocolo

Antes de deploy en mainnet, verificar:

```bash
stellar network container shared
stellar network container logs
```

Revisar:
- CAP-0074 (BN254) está activo
- CAP-0075 (Poseidon2) está activo
- Versión de protocolo ≥ 25 (X-Ray)

## Costos

Estimaciones de gas para verificación UltraHonk en Soroban:

- **verify_proof()**: ~2-3M instructions (según repo Nethermind)
- **Cross-contract call**: ~100K instructions overhead
- **SAC balance read**: ~50K instructions por cuenta
- **Total attest()**: ~2.5-3.5M instructions

Monitorear con:
```bash
stellar contract invoke ... --fee-bump <MAX_FEE>
```

## Troubleshooting

### Error: "Invalid proof"
- Verificar que VK coincida con el circuito compilado
- Verificar que public_inputs estén en orden correcto
- Revisar que el proof sea UltraHonk, no Plonk

### Error: "Out of gas"
- Aumentar fee: `--fee 1000000`
- Verificar que el proving backend sea UltraHonk (más eficiente que Plonk)

### Error: "Contract not found"
- Verificar que verifier_address sea correcto en Config
- Verificar que el verifier esté desplegado en la misma red

## Próximos Pasos

1. ✅ Solvency Policy implementado (modo MOCK)
2. ⏳ Clonar y deploy del verifier de Nethermind
3. ⏳ Compilar circuito Noir y generar VK
4. ⏳ Integrar cross-contract call real
5. ⏳ Test end-to-end con pruebas reales
6. ⏳ Benchmark de costos
7. ⏳ Auditoría de seguridad

## Referencias

- [rs-soroban-ultrahonk](https://github.com/Nethermind-io/rs-soroban-ultrahonk)
- [Barretenberg Docs](https://github.com/AztecProtocol/barretenberg)
- [Soroban Cross-Contract Calls](https://soroban.stellar.org/docs/how-to-guides/cross-contract-call)
- [CAP-0074: BN254](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0074.md)
