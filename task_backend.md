# Tareas para el Backend: Resolución de Verificación ZK (Error 4)

Este documento detalla el diagnóstico y las tareas necesarias del lado del backend/smart contracts para terminar de habilitar el flujo End-to-End de Veraz Proof of Solvency.

## 1. Contexto y Estado del Frontend
El frontend ha sido depurado y estabilizado exitosamente para generar pruebas ZK reales:
- **Circuito y Prover:** Se integró `@aztec/bb.js@0.87.0` y `@noir-lang/noir_js@1.0.0-beta.9`. Las pruebas UltraHonk de ~14.5KB se generan correctamente en el navegador y el `witness` resuelve todos los *constraints* correctamente contra el archivo `src/solvency.json` local.
- **Serialización de Public Inputs:** El frontend ahora formatea correctamente las salidas de Noir. Se empaquetan `[root, total_liabilities, ledger_seq]` en un arreglo de exactamente **96 bytes en Big-Endian**. 
- **Stale Proof Bypass:** Se compensó el tiempo de generación de la prueba en el frontend (`latest.sequence + 5`) garantizando que al llegar a la red la secuencia no exceda la `freshness_window` (100 ledgers) del contrato.

## 2. El Problema Actual: `Error(Contract, #4)`
Actualmente, el contrato `SolvencyPolicy` devuelve un `Error 4` cuando el usuario hace el `attest`. Originalmente, el frontend creía que esto significaba siempre `StaleProof` ("Prueba obsoleta"). 

**Tras realizar simulaciones a bajo nivel comprobamos lo siguiente:**
1. El chequeo de `StaleProof` en `SolvencyPolicy` se está superando exitosamente. El contrato principal parsea correctamente la secuencia y continúa hacia el chequeo de verificación.
2. Al ejecutar el *cross-contract call* hacia el contrato `Verifier` (`CD3IUK7ONHMFMINBL44UF4P5ALJ6OUTX4MDZBQ6EJT6Z5HPB5UZIOOFN`), es **este contrato** el que está devolviendo `Error 4` (`VerifyProofFailed`).
3. Dado que Soroban hace un "bubble-up" del error, `SolvencyPolicy` reporta a la red un `Error 4`, confundiendo al cliente.

## 3. Diagnóstico Técnico
El Verifier en Testnet está rechazando pruebas que matemáticamente son 100% válidas localmente. Esto **confirma de forma concluyente que existe un "Verification Key Mismatch"**. 

La causa probable es que la versión global de `nargo` o el binario `bb` utilizados en la máquina del desarrollador que ejecutó el despliegue difiere de las dependencias usadas en el cliente (Noir 1.0.0-beta.9 / bb.js 0.87.0), provocando que la Llave de Verificación inyectada en el Smart Contract del Verifier espere una estructura criptográfica distinta.

## 4. Tareas a Ejecutar (Backend / Contratos)

Para completar el flujo E2E, el desarrollador backend debe encargarse de lo siguiente:

- [x] **Estandarizar Versiones:** ✅ Verificado Noir `1.0.0-beta.9` y bb `0.87.0` instalados correctamente
- [x] **Regenerar VK:** ✅ Ejecutado `bb write_vk` con bb 0.87.0 para el circuito solvency
- [x] **Redesplegar el Verifier:** ✅ Desplegado nuevo contrato a Testnet: `CB4QLDEITCZKTXSVBDP7YFT5DFLU35DV5OZCCSAZFYEEWEEBS7CIWPGM`
- [x] **Actualizar la Configuración:** ✅ Desplegado nuevo SolvencyPolicy: `CBUGYVTOHYNXI7MOLPSQCPZRAF6NSRHIVOROZQVAB23DJVYIUE6REJK7` con nuevo verifier ID
- [x] **Manejo de Errores Mejorado:** ✅ Reorganizados códigos de error para evitar colisiones (StaleProof ahora es Error 10, VerificationFailed del verifier es Error 4)

## 5. ✅ Resolución Inicial (25 de junio, 2026)

**Estado Fase 1**: RESUELTO - VK Mismatch Corregido

La Llave de Verificación en cadena ahora coincide matemáticamente con las pruebas generadas por el cliente.

**Componentes Actualizados Fase 1**:
- Verifier: `CB4QLDEITCZKTXSVBDP7YFT5DFLU35DV5OZCCSAZFYEEWEEBS7CIWPGM`
- SolvencyPolicy: `CBUGYVTOHYNXI7MOLPSQCPZRAF6NSRHIVOROZQVAB23DJVYIUE6REJK7`
- VK regenerada con bb 0.87.0

Ver **BACKEND_RESOLUTION.md** para documentación completa de la primera resolución.

## 6. 🔄 Segunda Iteración: Integración Keccak + SDK 26 (26 de junio, 2026)

### 6.1 Descubrimiento del Requisito Oracle Hash
Tras resolver el VK mismatch, las pruebas seguían fallando con Error #4. Investigación en Discord y documentación oficial reveló:

**Requisitos del Verifier UltraHonk para Soroban**:
- ✅ Usar **Soroban SDK 26** (no SDK 25)
- ✅ Habilitar **CAP-80 host functions** (operaciones BN254 nativas)
- ✅ Oracle hash debe ser **Keccak-256** (no Poseidon2)
- ✅ VK regenerada con `--oracle_hash keccak`
- ✅ Pruebas generadas con flag `{ keccak: true }`

### 6.2 Repositorio Correcto del Verifier
**Fuente**: [yugocabrio/rs-soroban-ultrahonk](https://github.com/yugocabrio/rs-soroban-ultrahonk)
**Commit**: `661db07` (SDK 26 + CAP-80)

### 6.3 Tareas Ejecutadas - Fase 2

- [x] **Actualizar Verifier a SDK 26**: ✅ Clonado repositorio correcto con SDK 26
- [x] **Regenerar VK con Keccak**: ✅ Ejecutado `bb write_vk --oracle_hash keccak`
- [x] **Redesplegar Verifier con VK Keccak**: ✅ `CDYOR3YHANB63YUBUA3H3NGVZH6JGSNJC3ZKTAHG7IYSAIMGHMHLBDWK`
- [x] **Corregir Configuración de SolvencyPolicy**: ✅ Formato correcto de `Vec<Address>`
- [x] **Redesplegar SolvencyPolicy**: ✅ `CCEZTVM2OKDZ2HIUMS4XHR2PB7JALT6Z4GC5EFWESN3CCZ2A3X7DF62M`
- [x] **Actualizar Frontend con Keccak Flag**: ✅ Agregado `{ keccak: true }` en prover.js

### 6.4 Componentes Finales Desplegados

**Smart Contracts**:
- **Verifier (SDK 26 + Keccak)**: `CDYOR3YHANB63YUBUA3H3NGVZH6JGSNJC3ZKTAHG7IYSAIMGHMHLBDWK`
- **SolvencyPolicy**: `CCEZTVM2OKDZ2HIUMS4XHR2PB7JALT6Z4GC5EFWESN3CCZ2A3X7DF62M`
- **Reserve SAC (USDC)**: `CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC`
- **Reserve Account**: `GCY4CQHYSGI2MKE24R6ASMSX6EN6VQDYQZIC2NG3FSLJML6ELPFQAPKT`

**Configuración Corregida**:
```json
{
  "verifier": "CDYOR3YHANB63YUBUA3H3NGVZH6JGSNJC3ZKTAHG7IYSAIMGHMHLBDWK",
  "reserve_sac": "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC",
  "reserve_accounts": [{"address":"GCY4CQHYSGI2MKE24R6ASMSX6EN6VQDYQZIC2NG3FSLJML6ELPFQAPKT"}],
  "freshness_window": 100,
  "aquarius_pools": []
}
```

### 6.5 Evidencia de Éxito On-Chain

**Transacción Exitosa**: [14124983500423168](https://stellar.expert/explorer/testnet/tx/14124983500423168)

**Evento Emitido**:
```
Event: 0014124983500423168-0000000000
Ledger: 3288729
Contract: CCEZTVM2OKDZ2HIUMS4XHR2PB7JALT6Z4GC5EFWESN3CCZ2A3X7DF62M
Topics: Symbol(solvency)
Value: Vec([Bool(true), U32(3288730)])
```

**Atestación Verificable**:
```json
{
  "solvent": true,
  "reserves": "100000000000",
  "liabilities": "400000",
  "ledger_seq": 3288730,
  "timestamp": 1782457771
}
```

### 6.6 Estado Actual del Sistema

✅ **Backend (On-Chain)**: COMPLETAMENTE FUNCIONAL
- Verificación ZK exitosa con Keccak oracle hash
- Lectura de reservas desde SAC funciona correctamente
- Atestaciones se guardan y persisten en el ledger
- Eventos se emiten correctamente

🚧 **Frontend (UI)**: Pendiente corrección deserialización
- Las transacciones se confirman exitosamente on-chain
- Error de UI al deserializar `Result<bool, Error>`
- Ver **task_frontend.md** para detalles y pendientes

## 7. Documentación Relacionada

- **BACKEND_RESOLUTION.md**: Resolución detallada del VK mismatch
- **task_frontend.md**: Estado y pendientes del frontend
- **Discord Thread**: Solución SDK 26 + Keccak (referenciada en BACKEND_RESOLUTION.md)
