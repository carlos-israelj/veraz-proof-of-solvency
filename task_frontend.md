# Tareas Frontend: Integración Oracle Hash Keccak y SDK 26

Este documento detalla las actualizaciones y pendientes del frontend para completar la integración del sistema de Proof of Solvency con el nuevo verifier basado en Soroban SDK 26 y CAP-80.

## 1. Contexto de la Actualización

Tras resolver los problemas de Verification Key mismatch documentados en `task_backend.md`, surgió un nuevo requisito crítico: compatibilidad con el **oracle hash Keccak-256** y el uso de **Soroban SDK 26** con **CAP-80 host functions** para operaciones BN254 nativas.

### Descubrimiento del Requisito Keccak
Según documentación de Discord y pruebas en testnet, el verifier UltraHonk para Soroban requiere:
- Verificación Key generada con `--oracle_hash keccak`
- Pruebas generadas en bb.js con flag `{ keccak: true }`
- Uso de SDK 26 (no SDK 25) para acceso a host functions CAP-80

## 2. Cambios Implementados

### 2.1 Integración Keccak en el Prover ✅
**Archivo**: `src/lib/prover.js`
**Línea 61**: Actualización del método `generateProof`

```javascript
// Antes:
const { proof, publicInputs: rawPI } = await backend.generateProof(witness);

// Ahora:
const { proof, publicInputs: rawPI } = await backend.generateProof(witness, { keccak: true });
```

**Resultado**: Las pruebas ahora se generan con Keccak-256 como oracle hash, coincidiendo con el verifier on-chain.

### 2.2 Simplificación de Retorno de Transacción ✅
**Archivo**: `src/lib/stellar.js`
**Función**: `attest()`

```javascript
// Problema: stellar-sdk no puede deserializar Result<bool, Error> correctamente
// Error: "Bad union switch: 4"

// Solución: No intentar deserializar el returnValue
return { hash: sent.hash }; // Solo retornar el hash
```

**Razón**: El contrato retorna `Result<bool, Error>`. Si `status === "SUCCESS"`, sabemos que funcionó. No necesitamos deserializar el valor de retorno.

### 2.3 Logging Mejorado ✅
**Archivo**: `src/App.jsx`
**Línea 243-250**: Agregado logging detallado del flujo

```javascript
console.log("🔄 Enviando atestación al contrato...");
const result = await attest({ ... });
console.log("✅ Atestación exitosa:", result);
```

## 3. Backend Actualizado

### Contratos Desplegados
- **Verifier (SDK 26 + Keccak)**: `CDYOR3YHANB63YUBUA3H3NGVZH6JGSNJC3ZKTAHG7IYSAIMGHMHLBDWK`
- **SolvencyPolicy**: `CCEZTVM2OKDZ2HIUMS4XHR2PB7JALT6Z4GC5EFWESN3CCZ2A3X7DF62M`
- **Reserve SAC (USDC)**: `CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC`

### Configuración Corregida
El deployment inicial tenía un error en la estructura de datos de Soroban:

```json
// ❌ Formato incorrecto (creaba Vec<Vec<Address>>):
"reserve_accounts": [{"vec":[{"address":"..."}]}]
"aquarius_pools": {"vec":[]}

// ✅ Formato correcto (Vec<Address>):
"reserve_accounts": [{"address":"GCY4CQHYSGI2MKE24R6ASMSX6EN6VQDYQZIC2NG3FSLJML6ELPFQAPKT"}]
"aquarius_pools": []
```

## 4. Estado del Flujo E2E

### ✅ Componentes Funcionales
1. **Generación de Prueba ZK**: 14592 bytes, ~15-30s en navegador
2. **Public Inputs**: 96 bytes correctamente formateados
3. **Verificación On-Chain**: Verifier retorna `Void` (éxito)
4. **Lectura de Reservas**: Contrato lee saldo de SAC correctamente
5. **Atestación Guardada**: Estado persiste en ledger con timestamp

### 🚧 Pendientes

#### P1: Resolver Error de Deserialización en UI - PERSISTENTE
**Estado**: 🔴 BLOQUEADOR CRÍTICO - Sin resolver tras múltiples intentos
**Descripción**: Aunque las transacciones se confirman exitosamente on-chain y las atestaciones se guardan correctamente, el frontend muestra "Operación Fallida - Bad union switch: 4" al recibir la respuesta.

**Evidencia de Éxito On-Chain**:
- ✅ Transacción confirmada: [14124983500423168](https://stellar.expert/explorer/testnet/tx/14124983500423168)
- ✅ Evento emitido: `Bool(true), U32(3288730)`
- ✅ Atestación verificable: `is_solvent()` retorna datos correctos

**Diagnóstico Detallado**:
El error ocurre **persistentemente** a pesar de haber implementado todas las soluciones documentadas:

1. ✅ **stellar.js ya NO deserializa returnValue** (líneas 159-162):
   ```javascript
   // No intentamos deserializar el returnValue porque Result<bool, Error> causa problemas
   return { hash: sent.hash }; // Solo retorna el hash
   ```

2. ✅ **SDK actualizado a v14.6.1** (antes v13.0.0):
   - Ejecutado: `npm install --save @stellar/stellar-sdk@14.1.0`
   - Auto-upgraded a: v14.6.1
   - Verificado en package.json y package-lock.json

3. ✅ **Cache completamente limpiado**:
   ```bash
   rm -rf node_modules/.vite dist .vite
   rm -rf src/lib/contracts/node_modules src/lib/contracts/dist src/lib/contracts/.tsbuildinfo
   cd src/lib/contracts && npm install && npm run build
   ```

4. ✅ **TypeScript bindings regenerados** con SDK v14

5. ✅ **Servidor reiniciado múltiples veces**

**Resultado**: ❌ Error persiste - "Lo mismo no pasa nada"

**Hipótesis Actuales**:
- El error puede estar ocurriendo durante `assembleTransaction()` (stellar.js:133)
- Puede haber un mismatch entre contract spec en bindings vs contrato desplegado
- El SDK v14 puede tener issues con este tipo específico de Result
- El error puede venir de otra parte del código (no de la deserialización explícita)

**Próximas Investigaciones Requeridas**:
1. [ ] **Agregar logging detallado** en stellar.js para identificar línea exacta del error:
   ```javascript
   console.log("Pre-simulation...");
   const sim = await rpc.simulateTransaction(tx);
   console.log("Post-simulation:", sim);

   console.log("Pre-assembleTransaction...");
   tx = StellarSdk.rpc.assembleTransaction(tx, sim).build();
   console.log("Post-assembleTransaction");

   console.log("Pre-signTransaction...");
   const { signedTxXdr } = await signTransaction(tx.toXDR(), {...});
   console.log("Post-signTransaction");
   ```

2. [ ] **Verificar contract spec** - Comparar spec en dist/index.js con contrato desplegado
3. [ ] **Probar workaround alternativo** - Polling a `is_solvent()` después de enviar TX
4. [ ] **Revisar stellar-sdk issues** en GitHub para "Bad union switch: 4"
5. [ ] **Considerar cambio de contrato** - Retornar tipo más simple que Result<bool, Error>

#### P2: UI para Mostrar Hash de Transacción
**Archivo**: `src/App.jsx` líneas 329-351
**Estado**: Componente existe pero no se muestra

El componente de éxito (`step === 3`) está implementado pero no se renderiza porque el paso 3 no se alcanza debido al error de deserialización.

**Acción Requerida**:
- Resolver P1 primero
- Verificar que `setStep(3)` se ejecute correctamente
- Validar que `txHash` se pase correctamente al componente

## 5. Verificación de Integración

### Comandos de Verificación
```bash
# Verificar atestación guardada
stellar contract invoke \
  --id CCEZTVM2OKDZ2HIUMS4XHR2PB7JALT6Z4GC5EFWESN3CCZ2A3X7DF62M \
  --source deployer \
  --network testnet \
  -- is_solvent

# Ver eventos recientes
stellar events \
  --start-ledger 3288725 \
  --count 20 \
  --network testnet \
  --id CCEZTVM2OKDZ2HIUMS4XHR2PB7JALT6Z4GC5EFWESN3CCZ2A3X7DF62M
```

### Respuesta Esperada
```json
{
  "solvent": true,
  "reserves": "100000000000",
  "liabilities": "400000",
  "ledger_seq": 3288730,
  "timestamp": 1782457771
}
```

## 6. Tecnologías y Versiones

- **Noir**: v1.0.0-beta.9
- **bb.js**: v0.87.0
- **stellar-sdk**: v13.x
- **Soroban SDK** (backend): v26
- **CAP-80**: Habilitado en testnet
- **Vite**: v5.4.21
- **React**: v18.x

## 7. Próximos Pasos

1. **Investigar error de deserialización persistente**
   - Revisar flujo completo de stellar-sdk
   - Verificar si el error viene de otra parte del código
   - Considerar usar polling en lugar de esperar returnValue

2. **Implementar manejo robusto de errores**
   - Diferenciar entre errores de red y errores de contrato
   - Mostrar mensajes de error más específicos
   - Agregar retry logic para transacciones fallidas

3. **Mejorar UX del flujo de generación**
   - Mostrar tiempo estimado restante
   - Permitir cancelar generación de prueba
   - Guardar estado en localStorage para recuperación

4. **Testing**
   - Tests unitarios para formateo de public inputs
   - Tests de integración para flujo completo
   - Tests de manejo de errores

## 8. Referencias

- [Soroban CAP-80 Documentation](https://stellar.org/blog/developers/introducing-cap-80)
- [UltraHonk Verifier for Soroban](https://github.com/yugocabrio/rs-soroban-ultrahonk)
- [Discord: SDK 26 Requirement](./BACKEND_RESOLUTION.md#discord-solution)
- [Noir Language Documentation](https://noir-lang.org)
- [Barretenberg Backend](https://github.com/AztecProtocol/aztec-packages/tree/master/barretenberg)
