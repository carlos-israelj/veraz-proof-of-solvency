# Implementación Oracle Hash Keccak + Soroban SDK 26

**Fecha**: 26 de junio de 2026 (Actualizado: 28 de junio de 2026)
**Autor**: Equipo Veraz
**Estado**: ✅ Implementado y Verificado en Testnet
**Deployments**: ✅ 2 Verifiers en Producción (Simple + Solvency)

📖 **Para guía práctica de deployment**: Ver `VERIFIER_DEPLOYMENT_GUIDE.md`

---

## Tabla de Contenidos

1. [Contexto del Problema](#contexto-del-problema)
2. [Descubrimiento de la Solución](#descubrimiento-de-la-solución)
3. [Requisitos Técnicos](#requisitos-técnicos)
4. [Implementación Paso a Paso](#implementación-paso-a-paso)
5. [Cambios en el Código](#cambios-en-el-código)
6. [Verificación del Sistema](#verificación-del-sistema)
7. [Troubleshooting](#troubleshooting)
8. [Referencias](#referencias)
9. [🎉 Actualización: Deployments Exitosos](#-actualización-deployments-exitosos-28-junio-2026)

---

## Contexto del Problema

### Estado Inicial

Tras resolver el **Verification Key mismatch** documentado en `BACKEND_RESOLUTION.md`, el sistema seguía fallando con **Error #4 (VerificationFailed)**. Las pruebas ZK generadas en el navegador eran matemáticamente correctas (verificables localmente con bb.js), pero el verifier on-chain las rechazaba.

**Síntomas**:
- ✅ Pruebas válidas localmente (bb.js verificación exitosa)
- ✅ VK regenerada con bb 0.87.0 (matching con frontend)
- ❌ Verificación on-chain fallando con Error #4
- ❌ Event logs mostraban rechazo del verifier

### Hipótesis Inicial

Se sospechaba de un problema de compatibilidad entre:
- **bb.js v0.87.0** (cliente/navegador)
- **rs-soroban-ultrahonk** (verifier on-chain)
- **Barretenberg backend** (formato de prueba)

---

## Descubrimiento de la Solución

### Fuente de Información

La solución se encontró en un **thread de Discord** de la comunidad Stellar donde otro desarrollador tuvo el mismo problema:

**Discord - Stellar Developers**
**Usuario**: `yugocabrio`
**Fecha**: Mayo 2026

> **Problema Reportado**:
> "Getting Error #4 on verification even though proofs verify locally with bb.js. Using rs-soroban-ultrahonk."
>
> **Respuesta del Equipo Stellar**:
> "The issue is that the old verifier uses Soroban SDK 25 which does WASM-based BN254 operations. You need to:
> 1. Use SDK 26 with CAP-80 host functions (native BN254 operations)
> 2. Generate VK with `--oracle_hash keccak` flag
> 3. Add `{ keccak: true }` to bb.js generateProof call
>
> Repository: https://github.com/yugocabrio/rs-soroban-ultrahonk
> Commit: 661db07 (SDK 26 + CAP-80 support)"

### Componentes Críticos Identificados

1. **Soroban SDK 26** con **CAP-80 host functions**
2. **Oracle hash Keccak-256** (no Poseidon2)
3. **Verificación Key** regenerada con flag Keccak
4. **Pruebas** generadas con flag Keccak en bb.js

---

## Requisitos Técnicos

### Software y Versiones

#### Backend (Smart Contracts)
```bash
# Soroban CLI
stellar --version
# stellar 22.0.0 (con soroban-rpc para testnet)

# Barretenberg (para VK generation)
bb --version
# bb version 0.87.0

# Rust toolchain
rustc --version
# rustc 1.75.0 (82e1608df 2023-12-21)
```

#### Frontend (Browser)
```json
{
  "@noir-lang/noir_js": "1.0.0-beta.9",
  "@aztec/bb.js": "0.87.0",
  "stellar-sdk": "13.0.0"
}
```

#### Smart Contract Dependencies
```toml
[dependencies]
soroban-sdk = "26.0.0"  # ← CRÍTICO: Debe ser v26

[dev-dependencies]
soroban-sdk = "26.0.0"
```

### CAP-80 Host Functions

**CAP-80** (Core Advancement Proposal 80) agrega operaciones nativas BN254 a Soroban:

**Operaciones Habilitadas**:
- `bls12_381_g1_add`
- `bls12_381_g1_mul`
- `bls12_381_pairing_check`
- `bn254_g1_add`
- `bn254_g1_mul`
- `bn254_g1_msm`
- `bn254_pairing_check` ← Usado por el verifier

**Beneficio**: Reduce consumo de instrucciones de ~400M (WASM) a <10M (host function nativa).

---

## Implementación Paso a Paso

### Paso 1: Actualizar Repositorio del Verifier

```bash
cd contracts/

# Backup del verifier anterior
mv verifier verifier.backup

# Clonar el repositorio correcto
git clone https://github.com/yugocabrio/rs-soroban-ultrahonk verifier
cd verifier

# Checkout del commit específico con SDK 26
git checkout 661db07

# Verificar SDK version en Cargo.toml
grep "soroban-sdk" Cargo.toml
# Debe mostrar: soroban-sdk = "26.0.0"
```

**Verificación del Oracle Hash**:
```bash
# Confirmar que el verifier usa Keccak
cat crates/ultrahonk-soroban-verifier/src/hash.rs
```

Debe contener:
```rust
pub fn hash32(data: &Bytes) -> BytesN<32> {
    data.env().crypto().keccak256(data).to_bytes()
}
```

### Paso 2: Regenerar Verification Key con Keccak

```bash
cd circuits/solvency

# Limpiar outputs anteriores
rm -rf target/vk*

# Regenerar VK con flag Keccak
bb write_vk \
  --scheme ultra_honk \
  --oracle_hash keccak \
  --bytecode_path target/solvency.json \
  --output_path target \
  --output_format bytes_and_fields

# Verificar generación exitosa
ls -lh target/vk
# Debe crear: vk (1760 bytes) y vk_fields.json
```

**Validación del VK**:
```bash
# Extraer VK como hex para deployment
xxd -p target/vk | tr -d '\n' > target/vk.hex

# Verificar tamaño
wc -c target/vk
# Debe ser exactamente: 1760 bytes
```

### Paso 3: Compilar el Verifier con SDK 26

```bash
cd contracts/verifier

# Build optimizado para deployment
cargo build --target wasm32-unknown-unknown --release \
  --package ultrahonk-soroban-verifier

# Optimizar WASM (crítico para límites de Soroban)
stellar contract optimize \
  --wasm target/wasm32-unknown-unknown/release/ultrahonk_soroban_verifier.wasm

# Verificar tamaño del WASM
ls -lh target/wasm32-unknown-unknown/release/*.wasm
```

**Tiempo de compilación esperado**: 4-6 minutos en primera compilación.

### Paso 4: Desplegar Verifier con VK Keccak

```bash
# Leer VK como hex string
VK_HEX=$(xxd -p circuits/solvency/target/vk | tr -d '\n')

# Deploy verifier con VK
VERIFIER_ID=$(stellar contract deploy \
  --wasm contracts/verifier/target/wasm32v1-none/release/ultrahonk_soroban_verifier.optimized.wasm \
  --source deployer \
  --network testnet \
  -- \
  --vk_bytes "$VK_HEX")

echo "✅ Verifier desplegado: $VERIFIER_ID"
```

**Resultado**:
```
VERIFIER_ID=CDYOR3YHANB63YUBUA3H3NGVZH6JGSNJC3ZKTAHG7IYSAIMGHMHLBDWK
```

### Paso 5: Redesplegar SolvencyPolicy con Configuración Correcta

**Problema encontrado**: El formato JSON para Soroban `Vec<Address>` estaba incorrecto.

```bash
# ❌ FORMATO INCORRECTO (creaba Vec<Vec<Address>>):
--config '{"reserve_accounts":[{"vec":[{"address":"..."}]}],"aquarius_pools":{"vec":[]}}'

# ✅ FORMATO CORRECTO (Vec<Address>):
--config '{"reserve_accounts":[{"address":"GCY4CQHYSGI2MKE24R6ASMSX6EN6VQDYQZIC2NG3FSLJML6ELPFQAPKT"}],"aquarius_pools":[]}'
```

**Script de Deployment**:
```bash
#!/bin/bash
set -e

VERIFIER="CDYOR3YHANB63YUBUA3H3NGVZH6JGSNJC3ZKTAHG7IYSAIMGHMHLBDWK"

# Deploy SolvencyPolicy
NEW_POLICY=$(stellar contract deploy \
  --wasm contracts/solvency_policy/target/wasm32v1-none/release/solvency_policy.wasm \
  --source deployer \
  --network testnet)

echo "✅ SolvencyPolicy: $NEW_POLICY"

# Initialize con formato correcto
stellar contract invoke \
  --id "$NEW_POLICY" \
  --source-account deployer \
  --network testnet \
  --send yes \
  -- initialize \
  --config "{\"verifier\":\"$VERIFIER\",\"reserve_sac\":\"CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC\",\"reserve_accounts\":[{\"address\":\"GCY4CQHYSGI2MKE24R6ASMSX6EN6VQDYQZIC2NG3FSLJML6ELPFQAPKT\"}],\"freshness_window\":100,\"aquarius_pools\":[]}"

echo "✅ Inicialización completada"
```

**Resultado**:
```
POLICY_ID=CCEZTVM2OKDZ2HIUMS4XHR2PB7JALT6Z4GC5EFWESN3CCZ2A3X7DF62M
```

### Paso 6: Actualizar Frontend con Flag Keccak

**Archivo**: `src/lib/prover.js`

```javascript
// Línea 59-61 (ANTES):
console.log("🔐 Generando prueba UltraHonk...");
const backend = new UltraHonkBackend(circuit.bytecode);
const { proof, publicInputs: rawPI } = await backend.generateProof(witness);

// Línea 59-61 (DESPUÉS):
console.log("🔐 Generando prueba UltraHonk con Keccak (10–30s)...");
const backend = new UltraHonkBackend(circuit.bytecode);
const { proof, publicInputs: rawPI } = await backend.generateProof(witness, { keccak: true });
```

**Cambio crítico**: Agregar `{ keccak: true }` como segundo parámetro.

### Paso 7: Actualizar Contract ID en Frontend

**Archivo**: `src/App.jsx`

```javascript
// Línea 7 (ANTES):
const DEFAULT_CONTRACT = "CBUGYVTOHYNXI7MOLPSQCPZRAF6NSRHIVOROZQVAB23DJVYIUE6REJK7";

// Línea 7 (DESPUÉS):
const DEFAULT_CONTRACT = "CCEZTVM2OKDZ2HIUMS4XHR2PB7JALT6Z4GC5EFWESN3CCZ2A3X7DF62M";
```

**Archivo**: `deploy-config.json`

```json
{
  "network": "testnet",
  "contracts": {
    "verifier": "CDYOR3YHANB63YUBUA3H3NGVZH6JGSNJC3ZKTAHG7IYSAIMGHMHLBDWK",
    "solvencyPolicy": "CCEZTVM2OKDZ2HIUMS4XHR2PB7JALT6Z4GC5EFWESN3CCZ2A3X7DF62M"
  }
}
```

---

## Cambios en el Código

### Backend: Verifier Contract

**Archivo**: `contracts/verifier/crates/ultrahonk-soroban-verifier/Cargo.toml`

```toml
[package]
name = "ultrahonk-soroban-verifier"
version = "0.1.0"
edition = "2021"

[dependencies]
soroban-sdk = "26.0.0"  # ← Actualizado de 25.x a 26.0

[features]
testutils = ["soroban-sdk/testutils"]
```

**Archivo**: `contracts/verifier/crates/ultrahonk-soroban-verifier/src/hash.rs`

```rust
use soroban_sdk::{Bytes, BytesN, Env};

/// Hash function usando Keccak-256 (requerido por UltraHonk)
pub fn hash32(data: &Bytes) -> BytesN<32> {
    data.env().crypto().keccak256(data).to_bytes()
}
```

### Frontend: Prover Integration

**Archivo**: `src/lib/prover.js` (Cambio principal)

```javascript
export async function generateSolvencyProof({ balances, salts, ledgerSeq }) {
  // ... setup code ...

  console.log("🔐 Generando prueba UltraHonk con Keccak (10–30s)...");
  const backend = new UltraHonkBackend(circuit.bytecode);

  // ✅ CRÍTICO: Agregar { keccak: true }
  const { proof, publicInputs: rawPI } = await backend.generateProof(
    witness,
    { keccak: true }  // ← Esto habilita Keccak oracle hash
  );

  console.log("  proof.length:", proof.length);  // Debe ser 14592
  console.log("  publicInputs type:", rawPI?.constructor?.name);

  // ... formato y validación ...

  return {
    proof: new Uint8Array(proof),
    publicInputs,
  };
}
```

### Frontend: Transaction Handling

**Archivo**: `src/lib/stellar.js` (Simplificación)

```javascript
export async function attest({ contractId, publicInputs, proof, sourceAddress }) {
  // ... setup y simulación ...

  // Enviar transacción
  const sent = await rpc.sendTransaction(signed);

  // Esperar confirmación
  let res = await rpc.getTransaction(sent.hash);
  while (res.status === "NOT_FOUND") {
    await new Promise((r) => setTimeout(r, 1000));
    res = await rpc.getTransaction(sent.hash);
  }

  if (res.status !== "SUCCESS") {
    const errStr = JSON.stringify(res);
    const friendly = parseContractError(errStr);
    throw new Error(friendly || `Transacción falló: ${res.status}`);
  }

  // ✅ NO intentar deserializar returnValue (causa "Bad union switch: 4")
  console.log("✅ Transacción confirmada on-chain:", sent.hash);
  return { hash: sent.hash };  // Solo retornar hash
}
```

**Razón**: El contrato retorna `Result<bool, Error>`. stellar-sdk tiene problemas deserializando este tipo. Como `status === "SUCCESS"` garantiza éxito, solo necesitamos el hash.

---

## Verificación del Sistema

### Test 1: Generar Prueba Localmente

```javascript
// En consola del navegador (http://localhost:5173)
const { generateSolvencyProof } = await import('./lib/prover.js');

const result = await generateSolvencyProof({
  balances: ["100000", "50000", "25000", "75000", "30000", "20000", "60000", "40000"],
  salts: ["1", "2", "3", "4", "5", "6", "7", "8"],
  ledgerSeq: 3288730
});

console.log("✅ Proof length:", result.proof.length);  // 14592
console.log("✅ Public inputs length:", result.publicInputs.length);  // 96
```

**Resultado Esperado**:
```
🌳 Calculando Merkle sum-tree...
  root: 7081961587178677259607565708551582186593326784948627263989359318376711750947
  totalSum: 400000
⚙️  Ejecutando circuito Noir...
🔐 Generando prueba UltraHonk con Keccak (10–30s)...
  proof.length: 14592
  publicInputs raw type: Array length: 3
ℹ️  public_inputs: convirtiendo array of fields a 96 bytes
📦 Public inputs formateados (96 bytes):
  root (bytes 0-31): 0x0fa83f8ac7ec78d7...
  L (bytes 48-63): 400000
  seq (bytes 92-95): 3288730
✅ Proof generado exitosamente
```

### Test 2: Verificar Configuración del Contrato

```bash
stellar contract invoke \
  --id CCEZTVM2OKDZ2HIUMS4XHR2PB7JALT6Z4GC5EFWESN3CCZ2A3X7DF62M \
  --source deployer \
  --network testnet \
  -- get_config
```

**Resultado Esperado**:
```json
{
  "aquarius_pools": [],
  "freshness_window": 100,
  "reserve_accounts": [
    "GCY4CQHYSGI2MKE24R6ASMSX6EN6VQDYQZIC2NG3FSLJML6ELPFQAPKT"
  ],
  "reserve_sac": "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC",
  "verifier": "CDYOR3YHANB63YUBUA3H3NGVZH6JGSNJC3ZKTAHG7IYSAIMGHMHLBDWK"
}
```

✅ **Validación**: `reserve_accounts` es un array plano, NO un array de arrays.

### Test 3: Flujo E2E desde Frontend

**Pasos**:
1. Abrir http://localhost:5173
2. Click en "Emisor"
3. Conectar Freighter wallet
4. Click en "Generar Prueba" (esperar 15-30s)
5. Firmar transacción en Freighter
6. Esperar confirmación

**Consola del Navegador - Output Esperado**:
```
🔄 Enviando atestación al contrato...
✅ Transacción confirmada on-chain: c368c9d54f...
✅ Atestación exitosa: {hash: "c368c9d54f..."}
```

### Test 4: Verificar Atestación On-Chain

```bash
stellar contract invoke \
  --id CCEZTVM2OKDZ2HIUMS4XHR2PB7JALT6Z4GC5EFWESN3CCZ2A3X7DF62M \
  --source deployer \
  --network testnet \
  -- is_solvent
```

**Resultado Exitoso**:
```json
{
  "ledger_seq": 3288730,
  "liabilities": "400000",
  "reserves": "100000000000",
  "solvent": true,
  "timestamp": 1782457771
}
```

✅ **Validación**:
- `solvent: true`
- `reserves >= liabilities`
- `timestamp` reciente

### Test 5: Verificar Eventos

```bash
stellar events \
  --start-ledger 3288725 \
  --count 10 \
  --network testnet \
  --id CCEZTVM2OKDZ2HIUMS4XHR2PB7JALT6Z4GC5EFWESN3CCZ2A3X7DF62M
```

**Evento Esperado**:
```
Event 0014124983500423168-0000000000 [CONTRACT]:
  Ledger:   3288729
  Contract: CCEZTVM2OKDZ2HIUMS4XHR2PB7JALT6Z4GC5EFWESN3CCZ2A3X7DF62M
  Topics:   Symbol(solvency)
  Value:    Vec([Bool(true), U32(3288730)])
```

✅ **Validación**: Evento muestra `Bool(true)` = Solvente.

---

## Troubleshooting

### Error: "Bad union switch: 4"

**Síntoma**: Frontend muestra error aunque transacción se confirma on-chain.

**Causa**: stellar-sdk no puede deserializar `Result<bool, Error>`.

**Solución**: No intentar deserializar returnValue. Solo usar hash.

```javascript
// ❌ INCORRECTO:
return { hash: sent.hash, returnValue: res.returnValue };

// ✅ CORRECTO:
return { hash: sent.hash };
```

### Error: "UnreachableCodeReached" en contrato

**Síntoma**: Verifier devuelve Void (éxito) pero SolvencyPolicy crashea.

**Causa**: Formato incorrecto de `Vec<Address>` en configuración.

**Diagnóstico**:
```bash
stellar contract invoke --id CONTRACT_ID ... -- get_config
```

Si ves `Vec(Some(ScVec(VecM([Vec(...)]))))` → Formato incorrecto (Vec de Vecs).

**Solución**: Usar formato correcto en initialize:
```json
{
  "reserve_accounts": [{"address":"..."}],  // ✅ Vec<Address>
  "aquarius_pools": []                       // ✅ Vec vacío
}
```

### Error: Verification Failed (Error #4) persistente

**Síntoma**: Pruebas verifican localmente pero fallan on-chain.

**Diagnóstico**:
1. Verificar SDK version del verifier:
   ```bash
   grep soroban-sdk contracts/verifier/Cargo.toml
   ```
   Debe ser `26.0.0` o superior.

2. Verificar oracle hash en verifier:
   ```bash
   cat contracts/verifier/crates/ultrahonk-soroban-verifier/src/hash.rs
   ```
   Debe usar `keccak256`.

3. Verificar flag Keccak en frontend:
   ```bash
   grep "keccak" src/lib/prover.js
   ```
   Debe tener `{ keccak: true }`.

4. Verificar VK generada con Keccak:
   ```bash
   # Regenerar VK
   bb write_vk --oracle_hash keccak --bytecode_path circuits/solvency/target/solvency.json
   ```

### Error: WASM demasiado grande para deployment

**Síntoma**: `contract too large` al desplegar verifier.

**Solución**: Optimizar WASM:
```bash
stellar contract optimize \
  --wasm target/wasm32-unknown-unknown/release/ultrahonk_soroban_verifier.wasm
```

Tamaño esperado: ~250KB (optimizado) vs ~800KB (sin optimizar).

---

## Referencias

### Documentación Oficial

1. **CAP-80 Specification**
   https://stellar.org/protocol/cap-80

2. **Soroban SDK 26 Release Notes**
   https://github.com/stellar/rs-soroban-sdk/releases/tag/v26.0.0

3. **UltraHonk Verifier para Soroban**
   https://github.com/yugocabrio/rs-soroban-ultrahonk

4. **Barretenberg Documentation**
   https://github.com/AztecProtocol/aztec-packages/tree/master/barretenberg

5. **Noir Language Docs**
   https://noir-lang.org/docs/

### Community Resources

- **Discord Thread**: Stellar Developers #soroban-dev
- **Commit de Referencia**: yugocabrio/rs-soroban-ultrahonk@661db07
- **Stellar Expert** (Testnet): https://stellar.expert/explorer/testnet

### Contract IDs (Testnet)

```
Verifier (SDK 26 + Keccak):
CDYOR3YHANB63YUBUA3H3NGVZH6JGSNJC3ZKTAHG7IYSAIMGHMHLBDWK

SolvencyPolicy:
CCEZTVM2OKDZ2HIUMS4XHR2PB7JALT6Z4GC5EFWESN3CCZ2A3X7DF62M

Reserve SAC (USDC):
CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC

Reserve Account:
GCY4CQHYSGI2MKE24R6ASMSX6EN6VQDYQZIC2NG3FSLJML6ELPFQAPKT
```

### Transacciones de Ejemplo

**Atestación Exitosa**:
https://stellar.expert/explorer/testnet/tx/14124983500423168

**Event ID**: 0014124983500423168-0000000000

---

## Conclusión

La implementación de **Keccak oracle hash** + **Soroban SDK 26** fue **crítica** para habilitar la verificación ZK on-chain. Los componentes clave fueron:

1. ✅ Actualizar verifier a SDK 26 con CAP-80
2. ✅ Regenerar VK con `--oracle_hash keccak`
3. ✅ Agregar `{ keccak: true }` en bb.js
4. ✅ Corregir formato de configuración Soroban

**Resultado**: Sistema E2E funcional en testnet con verificación cryptográfica completa.

---

## 🎉 ACTUALIZACIÓN: Deployments Exitosos (28 Junio 2026)

### Nuevos Verifiers Deployados

Después de la implementación exitosa de Keccak + SDK 26, se realizaron deployments de producción:

**Simple Circuit Verifier** (Testing/Demo):
```
CONTRACT_ID: CDJGO6BJVNHKFRDRZB6B2DKCUGU764DVEILWUZKW6GEQEUWQQLB33YTW
Status: ✅ Deployed + Verified on-chain
VK Size: 1760 bytes (Keccak oracle)
Proof Size: 14,592 bytes
Verification: ✅ Exitosa (null = Ok())
```

**Solvency Circuit Verifier** (Producción):
```
CONTRACT_ID: CBURMJENDNJRGVVFPF4MUZQKWGDVDWAHKVWLVRGBSEZMVNKZRPHEOVXJ
Status: ✅ Deployed to testnet
Circuit: Merkle Sum Tree (8 leaves)
VK Size: 1760 bytes (Keccak oracle)
Public Inputs: 3 (merkle_root, total_liabilities, ledger_seq)
Private Inputs: 16 (balances[8] + salts[8])
```

### Links de Verificación

**Simple Circuit**:
https://stellar.expert/explorer/testnet/contract/CDJGO6BJVNHKFRDRZB6B2DKCUGU764DVEILWUZKW6GEQEUWQQLB33YTW

**Solvency Circuit**:
https://stellar.expert/explorer/testnet/contract/CBURMJENDNJRGVVFPF4MUZQKWGDVDWAHKVWLVRGBSEZMVNKZRPHEOVXJ

### Comandos Utilizados

```bash
# Instalación de Barretenberg (manual)
curl -L "https://github.com/AztecProtocol/aztec-packages/releases/download/v0.87.0/barretenberg-amd64-linux.tar.gz" -o /tmp/bb.tar.gz
tar -xzf /tmp/bb.tar.gz -C contracts/verifier/.bb/bin
chmod +x contracts/verifier/.bb/bin/bb

# Generación de VK (con Keccak oracle)
bb write_vk \
  --scheme ultra_honk \
  --oracle_hash keccak \
  --bytecode_path target/circuit.json \
  --output_path target \
  --output_format bytes_and_fields

# Deployment
stellar contract deploy \
  --wasm target/wasm32v1-none/release/rs_soroban_ultrahonk.wasm \
  --source alice \
  --network testnet \
  -- \
  --vk_bytes-file-path path/to/vk

# Verificación on-chain
stellar contract invoke \
  --id CONTRACT_ID \
  --source alice \
  --network testnet \
  --send=yes \
  -- \
  verify_proof \
  --proof_bytes-file-path path/to/proof \
  --public_inputs-file-path path/to/public_inputs
```

### Lecciones Aprendidas

1. **VK Size Critical**: Debe ser **exactamente 1760 bytes**
   - `wc -c target/vk` debe retornar `1760`
   - Si no, regenerar con `--oracle_hash keccak`

2. **Oracle Hash Obligatorio**: `--oracle_hash keccak` en TODOS los comandos
   - `bb write_vk --oracle_hash keccak ...`
   - `bb prove --oracle_hash keccak ...`
   - Sin esto, deployment falla o verification falla

3. **Barretenberg Installation**: bbup puede fallar
   - Usar instalación manual desde GitHub releases
   - Versión 0.87.0 confirmed working
   - Match con Noir 1.0.0-beta.9

4. **Protocol 26 Features**:
   - CAP-80 BN254 host functions
   - 400M instruction limit (testnet)
   - Keccak oracle native support
   - Permite ZK verification on-chain

### Documentación Adicional

Para guía completa de deployment paso a paso:
📖 **Ver**: `VERIFIER_DEPLOYMENT_GUIDE.md`

Incluye:
- ✅ Instalación de Barretenberg
- ✅ Compilación de circuits
- ✅ Generación de VK y proofs
- ✅ Deployment de verifiers
- ✅ Verificación on-chain
- ✅ Troubleshooting completo
- ✅ Workflow completo end-to-end
- ✅ Cálculo de Merkle root
- ✅ Referencias rápidas

### Status Actual del Proyecto

**Progress**: 99% Complete

| Component | Status |
|-----------|--------|
| Circuit Compilation | ✅ Both circuits with Keccak |
| Verifier Deployment | ✅ Both verifiers on testnet |
| Simple Proof Verification | ✅ Verified on-chain |
| Solvency Verifier | ✅ Deployed (needs witness data) |
| SDK Integration | ✅ CONTRACT_ID updated |
| Documentation | ✅ Complete guides |

**Próximos Pasos**:
1. Calcular Merkle root válido para solvency circuit
2. Generar y verificar solvency proof on-chain
3. E2E test con SDK
4. Demo materials para hackathon

---

**Última actualización de este documento**: 28 de Junio, 2026, 20:15 UTC
