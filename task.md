# Veraz - Resumen Ejecutivo de Tareas Críticas

**Fecha**: 26 de junio de 2026
**Estado**: 🔴 BLOQUEADOR CRÍTICO

---

## 🚨 PROBLEMA CRÍTICO ACTUAL

### Error "Bad union switch: 4" - PERSISTENTE Y SIN RESOLVER

**Síntoma**: Después de que el usuario firma la transacción en Freighter, el frontend muestra:
```
"Operación Fallida - Bad union switch: 4"
```

**Paradoja**: La transacción se confirma exitosamente en blockchain, pero la UI muestra error.

---

## ✅ LO QUE FUNCIONA

1. **Backend (Smart Contracts)**
   - ✅ Verifier: `CDYOR3YHANB63YUBUA3H3NGVZH6JGSNJC3ZKTAHG7IYSAIMGHMHLBDWK`
   - ✅ SolvencyPolicy: `CDPMSYQ3HRBL4YFEI5HPQOHEVGSHKJ4KAE3OTUGAVTAJ2OC3B2BZ3VW5`
   - ✅ Verificación ZK con Keccak oracle hash
   - ✅ Lectura de reservas desde SAC
   - ✅ Integración con Aquarius AMM
   - ✅ Atestaciones se guardan correctamente

2. **Frontend (Generación de Pruebas)**
   - ✅ Pruebas ZK generadas correctamente (14592 bytes)
   - ✅ Public inputs formateados (96 bytes)
   - ✅ Keccak flag habilitado en prover

3. **Blockchain**
   - ✅ Transacciones confirmadas on-chain
   - ✅ `is_solvent()` retorna atestaciones correctas
   - ✅ Eventos emitidos correctamente

---

## ❌ LO QUE NO FUNCIONA

**UI muestra error** a pesar de que todo funciona en blockchain.

---

## 🔧 INTENTOS DE RESOLUCIÓN (TODOS FALLIDOS)

### 1. Upgrade de stellar-sdk ❌
```bash
npm install --save @stellar/stellar-sdk@14.1.0
# Auto-upgraded a v14.6.1
```
**Razón del intento**: Documentación indica que SDK v13 no puede deserializar Result<bool, Error>
**Resultado**: Error persiste

### 2. Limpieza Completa de Cache ❌
```bash
rm -rf node_modules/.vite dist .vite
rm -rf src/lib/contracts/node_modules src/lib/contracts/dist src/lib/contracts/.tsbuildinfo
cd src/lib/contracts && npm install && npm run build
cd ../../.. && npm run dev
```
**Razón del intento**: Posible cache corrupto de Vite o TypeScript
**Resultado**: Error persiste

### 3. Regeneración de TypeScript Bindings ❌
```bash
cd src/lib/contracts && npm run build
```
**Razón del intento**: Bindings podrían estar desactualizados
**Resultado**: Error persiste

### 4. Múltiples Reinicios de Servidor ❌
```bash
pkill -f "vite|npm.*dev"
npm run dev
```
**Razón del intento**: Servidor podría tener estado corrupto
**Resultado**: Error persiste

### 5. Verificación de Código ❌
**Hallazgo**: El código de `src/lib/stellar.js` **YA NO deserializa returnValue**:
```javascript
// stellar.js líneas 159-162
// No intentamos deserializar el returnValue porque Result<bool, Error> causa problemas
console.log("✅ Transacción confirmada on-chain:", sent.hash);
return { hash: sent.hash }; // Solo retorna el hash
```
**Resultado**: A pesar de esto, el error persiste

---

## 🔍 ANÁLISIS TÉCNICO

### Hipótesis Actuales

1. **El error NO viene de la deserialización explícita del returnValue**
   - Código ya implementa workaround documentado
   - Error debe venir de otra parte del flujo

2. **Posibles Ubicaciones del Error**:
   - Durante `rpc.simulateTransaction()` (stellar.js:128)
   - Durante `StellarSdk.rpc.assembleTransaction()` (stellar.js:133)
   - Durante `signTransaction()` en Freighter
   - Durante `rpc.sendTransaction()` (stellar.js:142)
   - Durante `rpc.getTransaction()` polling (stellar.js:148-152)

3. **Posible Mismatch**:
   - Contract spec en bindings vs contrato desplegado
   - SDK v14 aún tiene issues con este tipo específico de Result

---

## 📋 PRÓXIMOS PASOS REQUERIDOS

### Prioridad 1: Logging Detallado
Agregar logs granulares en `src/lib/stellar.js` para identificar la línea exacta del error:

```javascript
export async function attest({ contractId, publicInputs, proof, sourceAddress }) {
  // ... validaciones existentes ...

  console.log("1. Pre-getAccount...");
  const account = await rpc.getAccount(sourceAddress);
  console.log("✅ Account obtenida");

  console.log("2. Pre-build transaction...");
  let tx = new StellarSdk.TransactionBuilder(account, {...})
    .addOperation(contract.call("attest", bytesToScVal(publicInputs), bytesToScVal(proof)))
    .setTimeout(60)
    .build();
  console.log("✅ Transaction built");

  console.log("3. Pre-simulateTransaction...");
  const sim = await rpc.simulateTransaction(tx);
  console.log("✅ Simulation complete:", sim);

  console.log("4. Pre-assembleTransaction...");
  tx = StellarSdk.rpc.assembleTransaction(tx, sim).build();
  console.log("✅ Transaction assembled");

  console.log("5. Pre-signTransaction (Freighter)...");
  const { signedTxXdr } = await signTransaction(tx.toXDR(), {...});
  console.log("✅ Transaction signed");

  console.log("6. Pre-sendTransaction...");
  const sent = await rpc.sendTransaction(signed);
  console.log("✅ Transaction sent:", sent);

  console.log("7. Pre-getTransaction polling...");
  let res = await rpc.getTransaction(sent.hash);
  console.log("✅ Transaction confirmed:", res);

  return { hash: sent.hash };
}
```

### Prioridad 2: Workarounds Alternativos

#### Opción A: Polling a is_solvent()
En lugar de confiar en el returnValue, hacer polling después de confirmar TX:
```javascript
// Después de res.status === "SUCCESS"
console.log("✅ TX confirmada, consultando atestación...");
const attestation = await querySolvent(contractId);
if (attestation && attestation.solvent) {
  return { hash: sent.hash, attestation };
}
```

#### Opción B: Ignorar el Error
Si el error es cosmético y la TX se confirma:
```javascript
try {
  const result = await attest(...);
  return result;
} catch (error) {
  if (error.message.includes("Bad union switch")) {
    // Verificar si la TX se confirmó de todas formas
    console.warn("⚠️ Error de deserialización, verificando TX...");
    const attestation = await querySolvent(contractId);
    if (attestation) {
      console.log("✅ TX exitosa a pesar del error de deserialización");
      return { success: true, attestation };
    }
  }
  throw error;
}
```

### Prioridad 3: Modificación del Contrato (Último Recurso)

Si todos los workarounds fallan, considerar modificar el contrato para retornar tipo más simple:

```rust
// ACTUAL (Problemático):
pub fn attest(env: Env, public_inputs: Bytes, proof: Bytes) -> Result<bool, Error> {
    // ...
    Ok(true)
}

// ALTERNATIVA (Más compatible):
pub fn attest(env: Env, public_inputs: Bytes, proof: Bytes) {
    // ... validaciones internas
    // panic!() en caso de error
    // Sin return value
}
```

**Pros**: Elimina problema de deserialización
**Cons**: Requiere redesplegar contrato

---

## 📊 IMPACTO DEL BLOCKER

- **Funcionalidad**: Sistema funciona end-to-end en blockchain
- **UX**: Usuario ve mensaje de error confuso
- **Demo**: Requiere explicación técnica del bug
- **Producción**: BLOQUEADOR para usuarios finales

---

## 📚 DOCUMENTACIÓN DE REFERENCIA

- **task_frontend.md**: Detalles técnicos frontend (Sección P1)
- **task_backend.md**: Análisis backend (Sección 8)
- **TASKS.md**: Lista completa de tareas del proyecto
- **KECCAK_SDK26_IMPLEMENTATION.md**: Documentación del workaround original
- **stellar.js**: `src/lib/stellar.js` líneas 99-163 (función attest)

---

## 🎯 OBJETIVO

Identificar la línea exacta donde ocurre "Bad union switch: 4" e implementar workaround definitivo para que la UI muestre éxito cuando la transacción se confirma on-chain.

---

**Última actualización**: 26 de junio de 2026, 21:40
