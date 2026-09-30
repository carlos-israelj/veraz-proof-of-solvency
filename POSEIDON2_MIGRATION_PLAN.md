# Poseidon2 Migration Plan - Solución al Error #3

## 📋 Resumen Ejecutivo

**Problema Actual**: El contrato rechaza proofs válidos con `Error(Contract, #3)` debido a incompatibilidad de métodos hash:
- **Circuit (Noir)**: Usa `std::hash::pedersen_hash`
- **Contract (Soroban)**: Usa `env.crypto().sha256`
- **Frontend (JS)**: Usa `api.pedersenHash` (Barretenberg)

**Resultado**: Los 3 componentes calculan hashes diferentes del mismo input → validación falla siempre.

**Solución**: Migrar los 3 componentes a **Poseidon2**, el estándar oficial de Stellar para ZK (CAP-75).

---

## 🎯 ¿Por qué Poseidon2?

### ✅ Ventajas

1. **Nativo en Stellar (Protocol 25/26)**
   - CAP-75 define Poseidon2 como estándar oficial
   - Host function optimizada en Soroban (bajo costo de gas)
   - Usado en producción: Stellar Private Payments (Nethermind)

2. **Disponible en los 3 Componentes**
   | Componente | Soporte Poseidon2 | Método |
   |-----------|-------------------|--------|
   | Noir | ✅ Sí (std lib) | `std::hash::poseidon2::Poseidon2::hash()` |
   | Soroban | ✅ Sí (nativo) | `env.crypto_hazmat().poseidon2_permutation()` |
   | Barretenberg | ✅ Sí (bb.js) | `api.poseidon2Hash()` |

3. **Optimizado para ZK**
   - 2-4x más rápido que Pedersen en circuits
   - Menor constraint count = pruebas más rápidas
   - Diseñado específicamente para SNARKs

4. **Interoperabilidad**
   - Mismo hash en circuit, contract y frontend
   - Parámetros estandarizados: t=3 o t=4, d=5, rounds_f=8, rounds_p=56

### ❌ Alternativas Descartadas

**Opción A: Implementar Pedersen en Soroban**
- ❌ No hay primitivas nativas
- ❌ Costoso en gas (muchas operaciones de campo)
- ❌ Propenso a errores de implementación

**Opción B: Cambiar Circuit a SHA-256**
- ❌ SHA-256 es muy ineficiente en circuits ZK
- ❌ Miles de constraints adicionales
- ❌ Tiempos de prueba 10-100x más lentos

**Opción C: Deshabilitar validación**
- ❌ Elimina capa de seguridad importante
- ❌ Solo para testing, no producción

---

## 🏗️ Arquitectura de la Solución

### Ejemplo de Referencia: Stellar Private Payments

Nethermind resolvió este problema exacto en su sistema. Análisis del código:

**Circom Circuit** (`circuits/src/poseidon2/poseidon2_compress.circom`):
```circom
template PoseidonCompress() {
  signal input inputs[2];
  signal output out;
  component perm = Permutation(2);
  perm.inputs <== inputs;
  compression[i] <== perm.out[i] + inputs[i];  // P(x) + x
  compression[0] ==> out;
}
```

**Soroban Contract** (`contracts/soroban-utils/src/poseidon2.rs`):
```rust
use soroban_sdk::crypto::CryptoHazmat;

pub fn poseidon2_compress(env: &Env, left: U256, right: U256) -> U256 {
    let crypto_hazmat = env.crypto_hazmat();
    let out = crypto_hazmat.poseidon2_permutation(
        &vec![env, left.clone(), right.clone()],
        symbol_short!("BN254"),
        2,    // t: state size
        5,    // d: S-box degree
        8,    // rounds_f
        56,   // rounds_p
        &vec![env, U256::from_u32(env, 1u32), U256::from_u32(env, 2u32)], // diagonal
        &round_constants,
    );

    // Compression: out[0] + left (mod p)
    let out_0 = out.get(0).unwrap();
    let mut compressed = out_0.add(&left);
    if compressed >= bn256_mod {
        compressed = compressed.rem_euclid(&bn256_mod);
    }
    compressed
}
```

**Parámetros Clave**:
- BN254 field
- State size t=2 (compress mode) o t=3 (hash mode)
- S-box degree d=5
- Full rounds: 8
- Partial rounds: 56
- Compression: `out[0] + input[0]`

---

## 🔧 Implementación Detallada

### 1️⃣ Circuit (Noir) - `circuits/solvency/src/main.nr`

**ANTES** (línea ~75):
```noir
// OLD: Pedersen hash
let computed_hash = std::hash::pedersen_hash(reserve_addresses);
assert(computed_hash == reserve_addresses_hash);
```

**DESPUÉS**:
```noir
use std::hash::poseidon2;

// NEW: Poseidon2 hash
// Hash 5 field elements (reserve addresses) with default parameters
let computed_hash = poseidon2::Poseidon2::hash(reserve_addresses, reserve_addresses.len());
assert(computed_hash == reserve_addresses_hash);
```

**Dependencias** (Nargo.toml):
```toml
[dependencies]
# Poseidon2 is now in std library (Noir 1.0+)
# No external dependency needed
```

**Notas**:
- `std::hash::poseidon2` está en la librería estándar desde Noir 1.0.0
- Usa parámetros BN254 automáticamente: t=4, d=5, rounds_f=8, rounds_p=56
- Compatible con Barretenberg backend (UltraHonk)

---

### 2️⃣ Contract (Soroban) - `contracts/solvency_policy/Cargo.toml`

**Agregar dependencia**:
```toml
[dependencies]
soroban-sdk = { workspace = true }
soroban-poseidon = { git = "https://github.com/stellar/rs-soroban-poseidon", tag = "v0.1.0" }
```

**Alternativa**: Usar `soroban-utils` de Stellar Private Payments (incluye Poseidon2 helpers).

---

### 3️⃣ Contract (Soroban) - `contracts/solvency_policy/src/lib.rs`

**ANTES** (líneas ~290-335):
```rust
fn hash_reserve_addresses(env: &Env, addresses: &Vec<Address>) -> Bytes {
    // ... convert addresses to fields via SHA-256 ...
    let final_hash = env.crypto().sha256(&combined); // ❌ SHA-256
    final_hash.into()
}
```

**DESPUÉS (Opción A: Usando soroban-poseidon)**:
```rust
use soroban_poseidon::poseidon2_hash;
use soroban_sdk::crypto::bn254::Bn254Fr;

fn hash_reserve_addresses(env: &Env, addresses: &Vec<Address>) -> Bytes {
    const MAX_RESERVE_ACCOUNTS: usize = 5;
    const BN254_MODULUS: &str = "21888242871839275222246405745257275088548364400416034343698204186575808495617";

    let mut addr_fields = Vec::new(env);

    // Convert addresses to U256 field elements
    for addr in addresses.iter() {
        let addr_val = addr.to_val();
        let val_u64 = addr_val.get_payload();

        // Use SHA-256 to derive field element from address (same as before)
        let mut addr_bytes = Bytes::new(env);
        for b in val_u64.to_be_bytes() {
            addr_bytes.push_back(b);
        }
        let hash_value = env.crypto().sha256(&addr_bytes);

        // Convert hash to U256, reduce modulo BN254
        let mut field_value = U256::from_u32(env, 0);
        for byte in hash_value.iter() {
            field_value = field_value.mul(&U256::from_u32(env, 256));
            field_value = field_value.add(&U256::from_u32(env, byte.into()));
        }

        // Reduce mod p
        let bn254_mod = U256::from_be_hex(env, BN254_MODULUS);
        if field_value >= bn254_mod {
            field_value = field_value.rem_euclid(&bn254_mod);
        }

        addr_fields.push_back(field_value);
    }

    // Pad to MAX_RESERVE_ACCOUNTS with zeros
    while addr_fields.len() < MAX_RESERVE_ACCOUNTS {
        addr_fields.push_back(U256::from_u32(env, 0));
    }

    // ✅ NEW: Use Poseidon2 hash (matches circuit!)
    // poseidon2_hash expects Vec<U256>, returns U256
    let hash_result = poseidon2_hash::<4, Bn254Fr>(env, &addr_fields);

    // Convert U256 to Bytes (32 bytes)
    let hash_bytes = hash_result.to_be_bytes(env);
    hash_bytes
}
```

**DESPUÉS (Opción B: Usando soroban-utils estilo SPP)**:
```rust
use soroban_utils::poseidon2_compress;

fn hash_reserve_addresses(env: &Env, addresses: &Vec<Address>) -> Bytes {
    // ... mismo código de conversión a field elements ...

    // Hash secuencial con Poseidon2 compression
    let mut current_hash = addr_fields.get(0).unwrap_or(U256::from_u32(env, 0));
    for i in 1..addr_fields.len() {
        let next = addr_fields.get(i).unwrap();
        current_hash = poseidon2_compress(env, current_hash, next);
    }

    current_hash.to_be_bytes(env)
}
```

**Recomendación**: Usar Opción A (soroban-poseidon library) por simplicidad.

---

### 4️⃣ Frontend (JS) - `src/lib/stellar.js`

**ANTES** (líneas 177-241):
```javascript
// OLD: Pedersen hash
const hashResult = api.pedersenHash(frArray, 0);
```

**DESPUÉS**:
```javascript
export async function hashReserveAddresses(addresses) {
  const MAX_RESERVE_ACCOUNTS = 5;
  const BN254_MODULUS = 21888242871839275222246405745257275088548364400416034343698204186575808495617n;

  // Dynamically import Barretenberg
  const { BarretenbergSync, Fr } = await import("@aztec/bb.js");
  const api = await BarretenbergSync.initSingleton();

  // Convert addresses to field elements (same as before)
  const addrFields = [];
  for (const addr of addresses) {
    const encoder = new TextEncoder();
    const data = encoder.encode(addr);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    let fieldValue = 0n;
    for (const byte of hashArray) {
      fieldValue = (fieldValue << 8n) | BigInt(byte);
    }
    fieldValue = fieldValue % BN254_MODULUS;
    addrFields.push(fieldValue.toString());
  }

  // Pad to MAX_RESERVE_ACCOUNTS
  while (addrFields.length < MAX_RESERVE_ACCOUNTS) {
    addrFields.push("0");
  }

  // ✅ NEW: Use Poseidon2 hash (matches circuit + contract!)
  const frArray = addrFields.map(f => new Fr(BigInt(f)));
  const hashResult = api.poseidon2Hash(frArray);  // ← CAMBIO AQUÍ

  // Convert Fr.value (Uint8Array) to BigInt
  let hashBigInt = 0n;
  for (const byte of hashResult.value) {
    hashBigInt = (hashBigInt << 8n) | BigInt(byte);
  }

  return {
    reserveAddressesHash: hashBigInt.toString(),
    paddedAddresses: addrFields,
  };
}
```

**Verificar API de bb.js**:
- Barretenberg expone `poseidon2Hash(inputs: Fr[])` desde versión reciente
- Compatible con UltraHonk backend
- Usa mismos parámetros que Noir: BN254, t=variable según input length

---

## 🔄 Proceso de Migración

### Paso 1: Actualizar Circuit (10 min)

```bash
cd circuits/solvency
```

**Editar** `src/main.nr`:
```noir
// Línea 75: Cambiar pedersen_hash por poseidon2
use std::hash::poseidon2;

let computed_hash = poseidon2::Poseidon2::hash(reserve_addresses, reserve_addresses.len());
```

**Compilar**:
```bash
nargo compile
# Verify: target/solvency.json should be regenerated
```

**Generar Verification Key**:
```bash
bb write_vk -b target/solvency.json -o target/vk
# Output: target/vk file
```

**Verificar tamaño**: VK debería ser similar (~100-200 KB).

---

### Paso 2: Actualizar Contract (20 min)

**Agregar dependencia** (`contracts/solvency_policy/Cargo.toml`):
```toml
[dependencies]
soroban-poseidon = { git = "https://github.com/stellar/rs-soroban-poseidon", tag = "v0.1.0" }
```

**Editar** `src/lib.rs`:
- Importar: `use soroban_poseidon::poseidon2_hash;`
- Reemplazar función `hash_reserve_addresses` con implementación Poseidon2
- Mantener validación en líneas 127-131 (ahora funcionará)

**Rebuild**:
```bash
cd contracts/solvency_policy
stellar contract build --optimize
```

**Verificar WASM hash**:
```bash
sha256sum target/wasm32-unknown-unknown/release/solvency_policy.wasm
# Debe ser diferente al anterior (contiene Poseidon2)
```

---

### Paso 3: Actualizar Frontend (10 min)

**Editar** `src/lib/stellar.js`:
- Cambiar `api.pedersenHash` por `api.poseidon2Hash` en línea ~228

**Rebuild**:
```bash
npm run build
```

**Verificar**:
```bash
# Buscar en el bundle
grep -r "poseidon2Hash" dist/
# Debe aparecer en los archivos compilados
```

---

### Paso 4: Redeploy Contract (15 min)

**Deploy nuevo contrato**:
```bash
stellar contract deploy \
  --wasm contracts/solvency_policy/target/wasm32-unknown-unknown/release/solvency_policy.wasm \
  --network testnet \
  --source veraz-issuer
```

**Guardar Contract ID**: e.g., `CBFMOAIIJW44S6LQVBCV7ONSOHE2MFLMBBMBTLBASETUJWJAU7KSRS5Y`

**Inicializar**:
```bash
stellar contract invoke \
  --id NEW_CONTRACT_ID \
  --network testnet \
  --source veraz-issuer \
  -- initialize \
  --config '{
    "verifier": "CAU5ZPZSJSASGEDMKPBQHL26AFEMH3DQWWTG52Y77L5NWWSECBHJAFKA",
    "reserve_sac": "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC",
    "reserve_accounts": ["GCY4CQHYSGI2MKE24R6ASMSX6EN6VQDYQZIC2NG3FSLJML6ELPFQAPKT"],
    "freshness_window": 100,
    "aquarius_pools": [],
    "defindex_vaults": []
  }'
```

---

### Paso 5: Actualizar Frontend Config (5 min)

**Editar** `src/components/IssuerFlow.jsx`:
```javascript
const DEFAULT_CONTRACT = 'CBFMOAIIJW44S6LQVBCV7ONSOHE2MFLMBBMBTLBASETUJWJAU7KSRS5Y'; // ← NEW CONTRACT ID
```

**Editar** `deploy-config.json`:
```json
{
  "solvency_policy": "NEW_CONTRACT_ID",
  "note": "Redeployed with Poseidon2 hash (CAP-75 standard)"
}
```

**Commit y push**:
```bash
git add .
git commit -m "feat: migrate to Poseidon2 hash (Stellar standard CAP-75)"
git push origin main
# GitHub Actions auto-deploys frontend
```

---

### Paso 6: Testing E2E (15 min)

**Generar proof en frontend**:
1. Abrir https://veraz-pos.xyz/
2. Ir a "Issuer Flow"
3. Enter reserve addresses
4. Enter 8 balances (e.g., all 1000000)
5. Click "Generate Proof"

**Verificar en console**:
```javascript
// Debe mostrar:
"✅ Proof generated successfully"
"Public inputs: 128 bytes"
"Reserve addresses hash: 0x..." // ← NUEVO, calculado con Poseidon2
```

**Submit transaction**:
- Click "Submit Attestation"
- Freighter approve
- Wait for confirmation

**Verificar on-chain**:
```bash
stellar contract invoke \
  --id NEW_CONTRACT_ID \
  --network testnet \
  -- is_solvent
```

**Resultado esperado**:
```json
{
  "solvent": true,
  "reserves": 8000000,
  "liabilities": 8000000,
  "ledger_seq": 123456,
  "timestamp": 1234567890
}
```

---

## ✅ Checklist de Verificación

### Circuit
- [ ] `nargo.toml` no tiene dependencias externas (Poseidon2 en std)
- [ ] `main.nr` usa `std::hash::poseidon2::Poseidon2::hash()`
- [ ] `nargo compile` exitoso sin warnings
- [ ] `bb write_vk` genera VK nuevo
- [ ] Tamaño de VK similar al anterior (~100-200 KB)

### Contract
- [ ] `Cargo.toml` incluye `soroban-poseidon` dependency
- [ ] `lib.rs` importa `use soroban_poseidon::poseidon2_hash`
- [ ] Función `hash_reserve_addresses` reemplazada
- [ ] `stellar contract build --optimize` exitoso
- [ ] WASM hash cambiado vs versión anterior
- [ ] Contract deployed on testnet
- [ ] Contract initialized con config correcta

### Frontend
- [ ] `stellar.js` usa `api.poseidon2Hash()`
- [ ] `npm run build` exitoso
- [ ] Bundle contiene "poseidon2Hash" en dist/
- [ ] `IssuerFlow.jsx` actualizado con new contract ID
- [ ] `deploy-config.json` actualizado
- [ ] GitHub Actions deployment exitoso

### E2E Testing
- [ ] Proof generation funciona en browser
- [ ] Public inputs son 128 bytes
- [ ] Reserve addresses hash calculado correctamente
- [ ] Transaction submission exitosa
- [ ] Contract verification exitosa (no Error #3)
- [ ] `is_solvent()` retorna attestation válida
- [ ] Explorer muestra transaction exitosa

---

## ⏱️ Tiempo Total Estimado

| Fase | Tiempo |
|------|--------|
| 1. Circuit update | 10 min |
| 2. Contract update | 20 min |
| 3. Frontend update | 10 min |
| 4. Contract redeploy | 15 min |
| 5. Frontend config | 5 min |
| 6. E2E testing | 15 min |
| **TOTAL** | **~75 minutos** |

---

## 🔒 Seguridad y Validación

### Hash Consistency Check

Después de implementar, verificar que los 3 componentes calculan el MISMO hash:

**Test Script** (`test-poseidon2-consistency.js`):
```javascript
import { BarretenbergSync, Fr } from '@aztec/bb.js';

async function testConsistency() {
  const api = await BarretenbergSync.initSingleton();

  // Test inputs: 5 addresses as field elements
  const inputs = [
    "12345678901234567890",
    "98765432109876543210",
    "11111111111111111111",
    "22222222222222222222",
    "33333333333333333333"
  ];

  const frArray = inputs.map(x => new Fr(BigInt(x)));
  const hash = api.poseidon2Hash(frArray);

  let hashBigInt = 0n;
  for (const byte of hash.value) {
    hashBigInt = (hashBigInt << 8n) | BigInt(byte);
  }

  console.log("Poseidon2 hash:", hashBigInt.toString());
  // Compare with circuit output and contract output
}

testConsistency();
```

**Verificar**:
1. Frontend JS: `hashBigInt` value
2. Circuit Noir: Public input `reserve_addresses_hash`
3. Contract Soroban: `computed_reserve_hash` from contract call

**Todos deben ser IGUALES**.

---

## 📚 Referencias

### Stellar Protocol
- **CAP-75**: https://github.com/stellar/stellar-protocol/blob/master/core/cap-0075.md
- **Poseidon/Poseidon2 Docs**: https://developers.stellar.org/docs/build/apps/zk
- **Protocol 25 Announcement**: https://stellar.org/blog/developers/announcing-stellar-x-ray-protocol-25

### Implementaciones de Referencia
- **Stellar Private Payments**: https://github.com/NethermindEth/stellar-private-payments
  - Contract: `contracts/soroban-utils/src/poseidon2.rs`
  - Circuit: `circuits/src/poseidon2/`
- **rs-soroban-poseidon**: https://github.com/stellar/rs-soroban-poseidon
- **noir-lang/poseidon**: https://github.com/noir-lang/poseidon

### Documentación Técnica
- **Noir Poseidon2**: https://core.taceo.io/articles/poseidon2-for-noir/
- **Poseidon2 Paper**: https://eprint.iacr.org/2023/323.pdf
- **Barretenberg bb.js API**: https://github.com/AztecProtocol/aztec-packages/tree/master/barretenberg/ts

---

## 🎯 Próximos Pasos

Una vez completada la migración a Poseidon2:

1. **Documentar el cambio**:
   - Actualizar README.md con "Uses Poseidon2 (CAP-75)"
   - Agregar benchmarks de performance (antes/después)
   - Actualizar CLAUDE.md con nueva arquitectura

2. **Testing adicional**:
   - Probar con múltiples reserve addresses (2, 3, 4, 5)
   - Probar con diferentes balances
   - Stress test: 100+ proofs consecutivos

3. **Optimizaciones futuras**:
   - Benchmark: Poseidon2 vs Pedersen (tiempo de prueba)
   - Considerar: Merkle tree con Poseidon2 (mayor eficiencia)
   - Evaluar: Poseidon2 para commitment de balances también

4. **Production readiness**:
   - Audit de seguridad (enfoque en Poseidon2 implementation)
   - Load testing en testnet
   - Mainnet deployment plan

---

## ❓ FAQ

**Q: ¿Por qué no seguir usando Pedersen?**
A: Pedersen no tiene soporte nativo en Soroban. Implementarlo manualmente sería costoso en gas y propenso a errores.

**Q: ¿Poseidon2 es seguro?**
A: Sí. Es el estándar oficial de Stellar (CAP-75), usado en producción por Nethermind (Stellar Private Payments) y OpenZeppelin (Confidential Tokens).

**Q: ¿Afecta el tamaño de las pruebas?**
A: No. UltraHonk mantiene tamaño constante (~3-4 KB) independiente de la función hash.

**Q: ¿Mejora la performance?**
A: Sí. Poseidon2 reduce constraints en el circuit, acelerando proof generation 2-4x vs Pedersen.

**Q: ¿Es compatible con versiones futuras?**
A: Sí. CAP-75 garantiza compatibilidad hacia adelante en Protocol 26+.

---

**Documento creado**: 2026-09-30
**Versión**: 1.0
**Estado**: Ready for implementation
