# Veraz - Tareas Pendientes para Sistema Funcional End-to-End

**Última actualización**: 26 de junio de 2026
**Estado actual**: Backend E2E funcional, pendiente fix en frontend UI

---

## 🎯 Objetivo

Completar el sistema de Proof of Solvency funcional end-to-end:
- ✅ Contratos desplegados y configurados (SDK 26 + Keccak)
- ✅ Frontend genera pruebas ZK correctamente con Keccak oracle hash
- ✅ Verificación on-chain funcional (atestaciones confirmadas en testnet)
- 🚧 Pendiente: Fix error de deserialización en UI (transacciones exitosas pero mensaje de error)
- ⚠️ Documentación actualizada con nuevos contract IDs

---

## 📋 Tareas por Categoría

### 🔴 CRÍTICO - Bloqueadores End-to-End

#### 1. Testing End-to-End del Flujo Completo
**Prioridad**: CRÍTICA
**Estado**: ❌ Pendiente
**Descripción**: Probar el flujo completo desde frontend hasta verificación on-chain

**Pasos**:
- [ ] Generar prueba ZK desde frontend con datos reales
- [ ] Enviar transacción `attest()` con Freighter
- [ ] Verificar que la prueba pase verificación cryptográfica
- [ ] Confirmar que `is_solvent()` devuelve la atestación correcta
- [ ] Validar que las reservas on-chain se lean correctamente
- [ ] Probar escenarios de error:
  - [ ] Prueba inválida (debería fallar con Error #4)
  - [ ] Proof stale (fuera del freshness window)
  - [ ] Replay attack (mismo ledger_seq)
  - [ ] Insolvente (R < L)

**Bloqueadores conocidos**: Ninguno (contratos correctamente desplegados)

**Comando de prueba**:
```bash
# Desde el frontend: usar Contract ID
CBONF5V5BZDHNVYRB5YEW2W2OQ7GNIS4M3CVQMUTMWACZFGD6RVY636U
```

---

#### 2. Validar Formato de Public Inputs
**Prioridad**: CRÍTICA
**Estado**: ⚠️ En revisión
**Descripción**: Verificar que el frontend genera public_inputs en el formato correcto esperado por el contrato

**Formato esperado por el contrato** (`solvency_policy/src/lib.rs:114`):
```rust
// [root (32 bytes), L (32 bytes), ledger_seq (32 bytes)] = 96 bytes total
```

**Frontend actual** (`src/lib/prover.js:119`):
```javascript
formatPublicInputsForSoroban(publicInputs) // Devuelve 96 bytes
```

**Tareas**:
- [ ] Verificar que `formatPublicInputsForSoroban()` produce exactamente 96 bytes
- [ ] Validar que el orden es correcto: [root, L, ledger_seq]
- [ ] Confirmar que cada field es 32 bytes en big-endian
- [ ] Agregar logs de debugging para inspeccionar los bytes enviados
- [ ] Comparar con formato esperado por UltraHonk verifier

**Testing**:
```javascript
console.log("Public inputs length:", publicInputs.length); // Debe ser 96
console.log("First 32 bytes (root):", publicInputs.slice(0, 32));
console.log("Bytes 32-64 (L):", publicInputs.slice(32, 64));
console.log("Bytes 64-96 (ledger_seq):", publicInputs.slice(64, 96));
```

---

#### 3. Verificar Proof Format
**Prioridad**: CRÍTICA
**Estado**: ⚠️ En revisión
**Descripción**: Confirmar que el proof generado por `@aztec/bb.js` es compatible con el verifier

**Formato esperado**:
- UltraHonk proof: 456 fields × 32 bytes = 14,592 bytes (según `ultrahonk-soroban-verifier/src/lib.rs:18`)

**Frontend actual**:
```javascript
const { proof, publicInputs } = await backend.generateProof(witness);
// proof es Uint8Array
```

**Tareas**:
- [ ] Verificar longitud del proof generado (debe ser 14,592 bytes)
- [ ] Confirmar que no hay padding o encoding adicional
- [ ] Validar que el proof es raw bytes, no hex-encoded
- [ ] Agregar validación en frontend antes de enviar

**Testing**:
```javascript
console.log("Proof length:", proof.length); // Debe ser 14592
if (proof.length !== 14592) {
  throw new Error(`Invalid proof length: expected 14592, got ${proof.length}`);
}
```

---

### 🟡 IMPORTANTE - Funcionalidad Core

#### 4. Merkle Tree Implementation
**Prioridad**: ALTA
**Estado**: ✅ Implementado (revisar)
**Descripción**: Verificar que el Merkle tree del frontend coincide con el del circuito

**Archivo**: `src/lib/merkle.js`

**Tareas**:
- [ ] Revisar que el hash function es compatible (Poseidon)
- [ ] Verificar que el tree depth es correcto
- [ ] Validar que el root calculado coincide con el esperado
- [ ] Agregar test cases con valores conocidos
- [ ] Documentar el formato del tree

**Testing**:
```javascript
// Crear test con valores conocidos
const balances = ["1000", "2000", "3000"];
const salts = ["1", "2", "3"];
const { root, totalSum } = await buildMerkleTree(balances, salts);
console.log("Root:", root);
console.log("Total:", totalSum); // Debe ser 6000
```

---

#### 5. Ledger Sequence Freshness
**Prioridad**: ALTA
**Estado**: ❌ Pendiente
**Descripción**: Implementar obtención automática del ledger sequence actual

**Problema actual**: El usuario debe ingresar manualmente el ledger_seq

**Solución propuesta**:
```javascript
// src/lib/stellar.js
export async function getCurrentLedgerSeq() {
  const account = await rpc.getLatestLedger();
  return account.sequence;
}

// src/App.jsx
async function atestar() {
  const currentSeq = await getCurrentLedgerSeq();
  const snapshotSeq = currentSeq; // O currentSeq - N para safety margin
  // ...
}
```

**Tareas**:
- [ ] Implementar `getCurrentLedgerSeq()` en stellar.js
- [ ] Actualizar UI para mostrar el ledger seq automáticamente
- [ ] Agregar opción para override manual (para testing)
- [ ] Considerar safety margin (e.g., currentSeq - 5)
- [ ] Validar que el seq está dentro del freshness window

---

#### 6. Error Handling y UX
**Prioridad**: ALTA
**Estado**: ⚠️ Parcial
**Descripción**: Mejorar manejo de errores y feedback al usuario

**Errores conocidos del contrato**:
```rust
AlreadyInitialized = 1
NotInitialized = 2
InvalidProof = 3        // ← Error actual resuelto
StaleProof = 4
Replay = 5
Insolvent = 6
BadPublicInputs = 7
Overflow = 8
```

**Tareas**:
- [ ] Mapear códigos de error a mensajes user-friendly
- [ ] Mostrar mensajes específicos por tipo de error
- [ ] Agregar loading states durante proof generation
- [ ] Implementar retry logic para transacciones fallidas
- [ ] Agregar validación de inputs antes de generar proof
- [ ] Mostrar progress durante proof generation (puede tomar 5-10s)

**Ejemplo**:
```javascript
try {
  await attest(...);
} catch (e) {
  if (e.message.includes("Error(Contract, #3)")) {
    setStatus("❌ Prueba inválida. Verifica tus datos.");
  } else if (e.message.includes("Error(Contract, #4)")) {
    setStatus("❌ Prueba obsoleta. El snapshot es muy antiguo.");
  }
  // ... más casos
}
```

---

### 🟢 MEJORAS - Optimización y Features

#### 7. Optimización de Proof Generation
**Prioridad**: MEDIA
**Estado**: ❌ Pendiente
**Descripción**: Optimizar generación de pruebas en el navegador

**Problemas actuales**:
- Proof generation puede tomar 10-30 segundos
- No hay feedback de progreso
- Puede fallar silenciosamente en browsers lentos

**Tareas**:
- [ ] Agregar Web Worker para proof generation (no bloquear UI)
- [ ] Implementar progress bar o spinner con estimación de tiempo
- [ ] Cachear el circuit compilation si es posible
- [ ] Considerar proof generation server-side como alternativa
- [ ] Agregar timeout con mensaje claro

---

#### 8. Multi-Asset Support
**Prioridad**: BAJA
**Estado**: ❌ Pendiente
**Descripción**: Soportar múltiples assets de reserva (no solo XLM)

**Implementación sugerida**:
```rust
// Actualizar Config
pub struct Config {
    pub verifier: Address,
    pub reserve_assets: Vec<ReserveAsset>, // Múltiples assets
    pub freshness_window: u32,
}

pub struct ReserveAsset {
    pub sac: Address,           // SAC del asset
    pub accounts: Vec<Address>, // Cuentas para este asset
    pub weight: u32,            // Peso para conversión a USD
}
```

**Tareas**:
- [ ] Diseñar estructura de datos para multi-asset
- [ ] Implementar conversión a moneda común (USD)
- [ ] Actualizar UI para mostrar breakdown por asset
- [ ] Agregar oracle price feeds si es necesario

---

#### 9. Aquarius AMM Integration Testing
**Prioridad**: MEDIA
**Estado**: ⚠️ Implementado pero no testeado
**Descripción**: Probar integración con Aquarius pools

**Código actual**: `solvency_policy/src/aquarius.rs`

**Tareas**:
- [ ] Desplegar un Aquarius pool de prueba en testnet
- [ ] Actualizar config con pool address
- [ ] Probar lectura de balances desde pool
- [ ] Verificar cálculo correcto de reserves totales
- [ ] Documentar proceso de agregar pools

**Testing**:
```bash
stellar contract invoke \
  --id CBONF5V5BZDHNVYRB5YEW2W2OQ7GNIS4M3CVQMUTMWACZFGD6RVY636U \
  --source issuer \
  --network testnet \
  -- initialize \
  --config '{"verifier":"...","aquarius_pools":["POOL_ADDRESS"],...}'
```

---

### 📚 DOCUMENTACIÓN

#### 10. Actualizar Documentación con Nuevos Contract IDs
**Prioridad**: ALTA
**Estado**: ❌ Pendiente
**Descripción**: Actualizar toda la documentación con los nuevos contract IDs

**Archivos a actualizar**:
- [ ] `README.md`
- [ ] `DEPLOYMENT.md`
- [ ] `FINAL_DEPLOYMENT.md`
- [ ] `PRODUCTION_DEPLOYMENT.md`
- [ ] `QUICK_REFERENCE.md`
- [ ] `100_PERCENT_COMPLETION.md`
- [ ] `AQUARIUS_INTEGRATION.md`

**Nuevos Contract IDs**:
```
Verifier: CD3IUK7ONHMFMINBL44UF4P5ALJ6OUTX4MDZBQ6EJT6Z5HPB5UZIOOFN
Solvency Policy: CBONF5V5BZDHNVYRB5YEW2W2OQ7GNIS4M3CVQMUTMWACZFGD6RVY636U
```

**Búsqueda y reemplazo**:
```bash
# Buscar el viejo contract ID
grep -r "CAU5ZPZSJSASGEDMKPBQHL26AFEMH3DQWWTG52Y77L5NWWSECBHJAFKA" .

# Reemplazar con nuevo
# Verifier: CD3IUK7ONHMFMINBL44UF4P5ALJ6OUTX4MDZBQ6EJT6Z5HPB5UZIOOFN

# Buscar el viejo solvency policy
grep -r "CCUHI6QJN45CXO7MEZ2VM7AFFIN6N37EY5L5WLM2VQ2T5NXVO4P2TFHT" .

# Reemplazar con nuevo
# Solvency Policy: CBONF5V5BZDHNVYRB5YEW2W2OQ7GNIS4M3CVQMUTMWACZFGD6RVY636U
```

---

#### 11. Documentar Flujo End-to-End
**Prioridad**: ALTA
**Estado**: ❌ Pendiente
**Descripción**: Crear guía paso a paso para usar el sistema

**Contenido sugerido**:
```markdown
# Guía de Uso End-to-End

## Para Usuarios (Verificar Solvencia)
1. Abrir frontend
2. Ir a tab "Público"
3. Ingresar Contract ID
4. Ver atestación de solvencia

## Para Emisores (Atestar Solvencia)
1. Preparar libro de pasivos (balances de holders)
2. Abrir frontend
3. Ir a tab "Emisor"
4. Conectar Freighter
5. Ingresar balances
6. Generar prueba (esperar 10-30s)
7. Firmar transacción
8. Verificar atestación

## Troubleshooting
- Error #3: Prueba inválida
- Error #4: Proof obsoleto
- ...
```

**Archivo**: `docs/END_TO_END_GUIDE.md`

---

#### 12. API Documentation
**Prioridad**: MEDIA
**Estado**: ❌ Pendiente
**Descripción**: Documentar APIs de los contratos

**Contenido**:
- [ ] Solvency Policy API
  - `initialize(config)`
  - `attest(public_inputs, proof)`
  - `is_solvent()`
  - `get_config()`
- [ ] Verifier API
  - `__constructor(vk_bytes)`
  - `verify_proof(public_inputs, proof)`
  - `vk_bytes()`

**Archivo**: `docs/API.md`

---

### 🧪 TESTING

#### 13. Unit Tests para Frontend
**Prioridad**: ALTA
**Estado**: ❌ Pendiente
**Descripción**: Agregar tests unitarios para lógica crítica

**Áreas a testear**:
- [ ] `merkle.js` - buildMerkleTree()
- [ ] `prover.js` - formatPublicInputsForSoroban()
- [ ] `stellar.js` - attest(), querySolvent()

**Framework sugerido**: Vitest (compatible con Vite)

```javascript
// tests/merkle.test.js
import { describe, it, expect } from 'vitest';
import { buildMerkleTree } from '../src/lib/merkle.js';

describe('buildMerkleTree', () => {
  it('should calculate correct root for known inputs', async () => {
    const balances = ["1000", "2000"];
    const salts = ["1", "2"];
    const { root, totalSum } = await buildMerkleTree(balances, salts);

    expect(totalSum).toBe("3000");
    expect(root).toBeDefined();
    expect(root.length).toBe(32); // 32 bytes
  });
});
```

---

#### 14. Integration Tests
**Prioridad**: ALTA
**Estado**: ❌ Pendiente
**Descripción**: Tests de integración contract ↔ frontend

**Escenarios**:
- [ ] Happy path: generar proof válida y atestar
- [ ] Invalid proof: proof con datos incorrectos
- [ ] Stale proof: proof con ledger_seq antiguo
- [ ] Replay: intentar reusar mismo ledger_seq
- [ ] Insolvency: R < L

**Herramientas**: Stellar SDK + test account

---

#### 15. Contract Tests
**Prioridad**: ALTA
**Estado**: ⚠️ Parcial (existen pero no completos)
**Descripción**: Completar tests del contrato Solvency Policy

**Archivo**: `contracts/solvency_policy/src/test.rs`

**Tests adicionales necesarios**:
- [ ] Test con Aquarius pools
- [ ] Test de overflow protection
- [ ] Test con múltiples reserve accounts
- [ ] Test de freshness window boundary cases
- [ ] Test de anti-replay con múltiples attestations

---

### 🚀 DEPLOYMENT Y DEVOPS

#### 16. Deployment Automation
**Prioridad**: MEDIA
**Estado**: ❌ Pendiente
**Descripción**: Script automatizado para deployment completo

**Script sugerido**: `scripts/deploy_full_system.sh`

```bash
#!/bin/bash
# Deploy completo del sistema

echo "1. Building circuits..."
cd circuits/solvency && nargo compile && bb write_vk -b ./target/solvency.json

echo "2. Building contracts..."
cd ../../contracts/verifier && stellar contract build
cd ../solvency_policy && stellar contract build

echo "3. Deploying verifier..."
VERIFIER_ID=$(stellar contract deploy --wasm ... --vk_bytes-file-path ...)

echo "4. Deploying solvency policy..."
POLICY_ID=$(stellar contract deploy --wasm ...)

echo "5. Initializing solvency policy..."
stellar contract invoke --id $POLICY_ID -- initialize --config "{\"verifier\":\"$VERIFIER_ID\",...}"

echo "✅ Deployment complete!"
echo "Verifier: $VERIFIER_ID"
echo "Policy: $POLICY_ID"
```

---

#### 17. Environment Configuration
**Prioridad**: MEDIA
**Estado**: ❌ Pendiente
**Descripción**: Sistema de configuración por entornos

**Archivo**: `.env.example`

```bash
# Network
STELLAR_NETWORK=testnet # local | testnet | mainnet
STELLAR_RPC_URL=https://soroban-testnet.stellar.org

# Contracts (auto-populated by deploy script)
VITE_VERIFIER_CONTRACT_ID=
VITE_SOLVENCY_POLICY_CONTRACT_ID=

# Reserve configuration
RESERVE_SAC=CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC
RESERVE_ACCOUNT=GCXY55U4OBCQSE57LTLQHEALRITRUHO3KIO54LUS3SAMCLDTLGCQJKP2
```

**Actualizar frontend** para leer de `.env`:
```javascript
// src/config.js
export const config = {
  network: import.meta.env.VITE_NETWORK || 'testnet',
  contractId: import.meta.env.VITE_SOLVENCY_POLICY_CONTRACT_ID,
  verifierId: import.meta.env.VITE_VERIFIER_CONTRACT_ID,
};
```

---

#### 18. CI/CD Pipeline
**Prioridad**: BAJA
**Estado**: ❌ Pendiente
**Descripción**: GitHub Actions para CI/CD

**Pipeline sugerido**:
```yaml
# .github/workflows/ci.yml
name: CI/CD

on: [push, pull_request]

jobs:
  test-contracts:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install Rust
        uses: actions-rs/toolchain@v1
      - name: Run contract tests
        run: cd contracts/solvency_policy && cargo test

  test-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install Node
        uses: actions/setup-node@v3
      - name: Install deps
        run: npm install
      - name: Run tests
        run: npm test

  build-circuits:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install Noir
        run: curl -L https://raw.githubusercontent.com/noir-lang/noirup/main/install | bash
      - name: Build circuits
        run: cd circuits/solvency && nargo compile
```

---

### 🎨 UI/UX IMPROVEMENTS

#### 19. Frontend Polish
**Prioridad**: MEDIA
**Estado**: ⚠️ Funcional pero básico
**Descripción**: Mejorar experiencia de usuario

**Mejoras sugeridas**:
- [ ] Agregar validación de inputs en tiempo real
- [ ] Mostrar estimación de costo de transacción
- [ ] Agregar tooltips explicativos
- [ ] Mejorar responsive design
- [ ] Agregar dark mode
- [ ] Mostrar histórico de atestaciones
- [ ] Agregar export de atestaciones (JSON/CSV)

---

#### 20. Transaction Explorer Integration
**Prioridad**: BAJA
**Estado**: ❌ Pendiente
**Descripción**: Links a exploradores de blockchain

**Implementación**:
```javascript
function showTransactionLink(hash) {
  const explorerUrl = `https://stellar.expert/explorer/testnet/tx/${hash}`;
  return <a href={explorerUrl} target="_blank">Ver en Explorer ↗</a>;
}
```

---

## 📊 Estado General del Proyecto

### Componentes Completados ✅
- [x] Circuit de solvency (Noir)
- [x] Verifier contract (UltraHonk)
- [x] Solvency Policy contract
- [x] Frontend básico (React)
- [x] Proof generation (bb.js)
- [x] Deployment en testnet
- [x] Aquarius integration (código)

### Componentes en Progreso ⚠️
- [ ] Testing end-to-end
- [ ] Validación de formatos (public inputs, proof)
- [ ] Error handling
- [ ] Documentación

### Componentes Pendientes ❌
- [ ] Testing completo (unit, integration, e2e)
- [ ] Documentación actualizada
- [ ] UI/UX polish
- [ ] Deployment automation
- [ ] CI/CD

---

## 🎯 Roadmap Sugerido

### Sprint 1 (1-2 días) - CRÍTICO
**Objetivo**: Sistema funcional end-to-end

1. ✅ Resolver Error #4 (VK mismatch) - COMPLETADO
2. Validar formato de public inputs
3. Validar formato de proof
4. Testing end-to-end del flujo completo
5. Actualizar documentación con nuevos contract IDs

### Sprint 2 (2-3 días) - IMPORTANTE
**Objetivo**: Robustez y UX

1. Implementar error handling robusto
2. Agregar obtención automática de ledger_seq
3. Optimizar proof generation (Web Worker)
4. Agregar progress indicators
5. Testing de casos de error

### Sprint 3 (3-5 días) - MEJORAS
**Objetivo**: Testing y documentación

1. Unit tests para frontend
2. Integration tests
3. Completar contract tests
4. Documentar API
5. Guía end-to-end

### Sprint 4 (Opcional) - FEATURES
**Objetivo**: Features avanzados

1. Aquarius integration testing
2. Multi-asset support
3. Deployment automation
4. CI/CD pipeline

---

## 🚦 Cómo Empezar

### Paso 1: Testing Inmediato
```bash
# 1. Abrir frontend
npm run dev

# 2. Usar Contract ID
CBONF5V5BZDHNVYRB5YEW2W2OQ7GNIS4M3CVQMUTMWACZFGD6RVY636U

# 3. Generar prueba con datos de ejemplo
Balances: 100000, 50000, 25000
Ledger Seq: [obtener actual]

# 4. Verificar logs del navegador
console.log en cada paso crítico
```

### Paso 2: Debugging
Si falla, revisar:
1. Longitud de public_inputs (debe ser 96 bytes)
2. Longitud de proof (debe ser 14,592 bytes)
3. Ledger seq dentro de freshness window
4. Mensajes de error del contrato

### Paso 3: Iterar
- Arreglar problemas encontrados
- Agregar tests
- Documentar soluciones

---

## 📞 Contacto y Soporte

Para reportar bugs o solicitar features:
- Issues en GitHub
- Documentación en `/docs`
- Contract IDs en `DEPLOYMENT.md`

---

**Última revisión**: 24 de junio de 2026
**Próxima revisión**: Después de Sprint 1
