# Tareas para el Backend: Resolución de Verificación ZK (Error 4)

Este documento detalla el diagnóstico y las tareas necesarias del lado del backend/smart contracts para habilitar el flujo End-to-End de Veraz Proof of Solvency.

## 1. Contexto y Estado del Frontend
El frontend ha sido depurado y estabilizado exitosamente para generar pruebas ZK reales:
- **Circuito y Prover:** Se integró `@aztec/bb.js@0.87.0` y `@noir-lang/noir_js@1.0.0-beta.9`. Las pruebas UltraHonk de ~14.5KB se generan correctamente en el navegador y el `witness` resuelve todos los *constraints* correctamente contra el archivo `src/solvency.json` local.
- **Serialización de Public Inputs:** El frontend ahora formatea correctamente las salidas de Noir. Se empaquetan `[root, total_liabilities, ledger_seq]` en un arreglo de exactamente **96 bytes en Big-Endian**.
- **Stale Proof Bypass:** Se compensó el tiempo de generación de la prueba en el frontend (`latest.sequence + 5`) garantizando que al llegar a la red la secuencia no exceda la `freshness_window` (100 ledgers) del contrato.

## 2. Historial de Resolución de Problemas

### Fase 1: VK Mismatch (Resuelto - 25 junio 2026)
- ✅ Regeneración de VK con bb 0.87.0
- ✅ Despliegue de nuevo Verifier compatible
- ✅ Sincronización de versiones frontend/backend

### Fase 2: Keccak + SDK 26 (Resuelto - 26 junio 2026)
- ✅ Verifier actualizado con SDK 26 + CAP-80
- ✅ VK regenerada con oracle hash Keccak-256
- ✅ Frontend actualizado con flag `{ keccak: true }`
- ✅ Verificación ZK End-to-End funcional

## 3. Componentes Desplegados (Funcionando)

**Smart Contracts**:
- **Verifier (SDK 26 + Keccak)**: `CDYOR3YHANB63YUBUA3H3NGVZH6JGSNJC3ZKTAHG7IYSAIMGHMHLBDWK`
- **SolvencyPolicy (SAC Only)**: `CDYE4ABSXKJSZU2RLO3WIZG7IIMAYTBINUMB2FDUTJBUMUFSA5IVJLRB`
- **Reserve SAC (USDC)**: `CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC`
- **Reserve Account**: `GCXY55U4OBCQSE57LTLQHEALRITRUHO3KIO54LUS3SAMCLDTLGCQJKP2`

**Configuración Activa**:
```json
{
  "verifier": "CDYOR3YHANB63YUBUA3H3NGVZH6JGSNJC3ZKTAHG7IYSAIMGHMHLBDWK",
  "reserve_sac": "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC",
  "reserve_accounts": ["GCXY55U4OBCQSE57LTLQHEALRITRUHO3KIO54LUS3SAMCLDTLGCQJKP2"],
  "freshness_window": 100,
  "aquarius_pools": [],
  "defindex_vaults": []
}
```

## 4. 🌊 Integración con Protocolos DeFi

### 4.1 Arquitectura Implementada

El sistema de solvencia soporta múltiples fuentes de reservas en tres tiers:

**Tier 1 - SAC Balance** (✅ Activo):
- Lectura directa de balances desde Stellar Asset Contracts
- Implementación: `lib.rs:143-148`

**Tier 2 - Aquarius AMM** (🚧 Implementado, no activo):
- Integración con pools de liquidez Aquarius
- Implementación: `aquarius.rs`
- Estado: Código completo pero deshabilitado por problemas de testnet
- Issue: Pools de testnet usan arquitectura diferente a la esperada

**Tier 3 - DeFindex Vaults** (✅ Implementado, no activo):
- Integración con yield aggregator DeFindex
- Implementación: `defindex.rs`
- Estado: Código completo y verificado, pendiente deployment
- Conversión share-to-asset implementada correctamente

### 4.2 Código DeFindex Implementado

**Archivo**: `contracts/solvency_policy/src/defindex.rs` (206 líneas)

**Características**:
- ✅ Lectura de vault shares con `balance()`
- ✅ Query de total supply con `total_supply()`
- ✅ Query de managed funds con `fetch_total_managed_funds()`
- ✅ Conversión share-to-asset: `(user_shares * total_assets) / total_supply`
- ✅ Protección de overflow en todas las operaciones
- ✅ Manejo robusto de estructuras complejas `Vec<AssetAllocation>`

**Script de Verificación**: `scripts/query-defindex-vaults.js`
- Testea 3 vaults en testnet: USDC, XLM, CETES
- Verifica llamadas a contratos DeFindex
- Valida conversiones de shares

### 4.3 Scripts de Deployment Disponibles

**SAC Only** (Activo):
```bash
./scripts/deploy-solvency-sac-only.sh
```

**Con DeFindex** (Listo para deployment):
```bash
./scripts/deploy-solvency-defindex.sh
```
- Configuración: 3 vaults (USDC, XLM, CETES)
- Aquarius: 2 pools configurados pero opcionales

**Con Aquarius** (Código listo, requiere investigación):
```bash
./scripts/deploy-solvency-aquarius.sh
```
- Requiere resolver incompatibilidad con pools de testnet

### 4.4 Configuración de Integración en Contrato

**Struct Config** (`lib.rs:49-56`):
```rust
pub struct Config {
    pub verifier: Address,
    pub reserve_sac: Address,
    pub reserve_accounts: Vec<Address>,
    pub freshness_window: u32,
    pub aquarius_pools: Vec<Address>,     // Tier 2
    pub defindex_vaults: Vec<Address>,   // Tier 3
}
```

**Struct Attestation** (`lib.rs:58-69`):
```rust
pub struct Attestation {
    pub solvent: bool,
    pub reserves: i128,
    pub sac_balance: i128,
    pub aquarius_balance: i128,          // Breakdown Tier 2
    pub defindex_balance: i128,          // Breakdown Tier 3
    pub liabilities: i128,
    pub ledger_seq: u32,
    pub timestamp: u64,
}
```

### 4.5 Direcciones DeFindex en Testnet

**Factory**: `CDSCWE4GLNBYYTES2OCYDFQA2LLY4RBIAX6ZI32VSUXD7GO6HRPO4A32`

**Vaults Verificados**:
- USDC: `CBMVK2JK6NTOT2O4HNQAIQFJY232BHKGLIMXDVQVHIIZKDACXDFZDWHN`
- XLM: `CCLV4H7WTLJQ7ATLHBBQV2WW3OINF3FOY5XZ7VPHZO7NH3D2ZS4GFSF6`
- CETES: `CBIS5TEMTNNOTBE3WXPQUAGUEDYZZVIWAKTXEQCOUJ34OJJ3FJ5NLF2P`

### 4.6 Direcciones Aquarius en Testnet

**Router**: `CBCFTQSPDBAIZ6R6PJQKSQWKNKWH2QIV3I4J72SHWBIK3ADRRAM5A6GD`

**Pools Identificados**:
- Pool 1 (XLM/AQUA): `CBEPUTV5IJHR75PKITMFDCWTTKEHLWDEUOARPNVIW52A3AHK7OLIFCEK`
- Pool 2 (USDC/AQUA): `CDG2O3AM2NKHOWJHCXMOFBI4RL4INYIW3N4YZYI3UOOCEULOJML276BJ`

**Issue Identificado**: Los pools retornan su propia dirección en `share_id()` en lugar de un contrato de shares separado.

## 5. Estado Actual del Sistema

### ✅ Funcionando
- ZK Verification (UltraHonk con Keccak)
- Lectura de reservas SAC
- Atestaciones persistentes en ledger
- Eventos de solvencia emitidos correctamente
- Código DeFindex completo y testeado

### 🚧 Pendiente
- Deployment con DeFindex (código listo)
- Investigar issue de Aquarius testnet
- Testing E2E con múltiples fuentes de reservas

## 6. Verificación de Funcionamiento

### Comandos CLI
```bash
# Verificar atestación guardada
stellar contract invoke \
  --id CDYE4ABSXKJSZU2RLO3WIZG7IIMAYTBINUMB2FDUTJBUMUFSA5IVJLRB \
  --source issuer \
  --network testnet \
  -- is_solvent

# Ver configuración
stellar contract invoke \
  --id CDYE4ABSXKJSZU2RLO3WIZG7IIMAYTBINUMB2FDUTJBUMUFSA5IVJLRB \
  --source issuer \
  --network testnet \
  -- get_config
```

### Respuesta Esperada
```json
{
  "solvent": true,
  "reserves": "99895758866",
  "sac_balance": "99895758866",
  "aquarius_balance": "0",
  "defindex_balance": "0",
  "liabilities": "400000",
  "ledger_seq": 3305852,
  "timestamp": 1782543512
}
```

## 7. Próximos Pasos de Desarrollo

### Prioridad 1: Habilitar DeFindex
1. Deployment con script `deploy-solvency-defindex.sh`
2. Testing de conversión share-to-asset on-chain
3. Verificación de eventos con breakdown DeFindex

### Prioridad 2: Resolver Aquarius
1. Investigar arquitectura real de pools en testnet
2. Actualizar módulo `aquarius.rs` si necesario
3. Testing con pools reales

### Prioridad 3: Testing Multi-Source
1. Casos de prueba con todas las fuentes activas
2. Verificar sumas correctas de reservas
3. Testing de edge cases (vaults vacíos, pools sin liquidez)

## 8. Documentación Relacionada

- **BACKEND_RESOLUTION.md**: Resolución detallada del VK mismatch
- **KECCAK_SDK26_IMPLEMENTATION.md**: Integración Keccak completa
- **FINAL_DEPLOYMENT.md**: Estado de deployments en testnet
- **task_frontend.md**: Estado del frontend y UI
- **TASKS.md**: Tareas generales del proyecto

---

**Última actualización**: 27 de junio de 2026
**Estado Backend**: ✅ OPERACIONAL (SAC Only + Código DeFi completo)
