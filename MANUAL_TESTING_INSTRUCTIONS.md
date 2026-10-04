# Instrucciones de Pruebas Manuales - Frontend

**Fecha:** 4 de octubre, 2026
**Dev Server:** ✅ Corriendo en http://localhost:5173/
**Status:** Listo para pruebas manuales

---

## ✅ Pre-requisitos Completados

- ✅ Dev server iniciado (Vite 5.4.21)
- ✅ CORS headers configurados correctamente
- ✅ Puerto 5173 disponible
- ✅ Standalone prover funcionando (CLI tested)

---

## 📋 Checklist de Pruebas

### Test 1: Landing Page ✅

**URL:** http://localhost:5173/

**Pasos:**
1. Abrir http://localhost:5173/ en el browser
2. Abrir DevTools Console (F12)
3. Verificar que la página carga sin errores

**Qué verificar:**
- ✅ Página carga sin errores en console
- ✅ Animaciones funcionan (efectos visuales)
- ✅ Links visibles: "Issuer", "Auditor", "Integrations"
- ✅ Navegación funciona (click en links)

**Warnings aceptables:**
- Warnings sobre WASM o SharedArrayBuffer (normales)
- Mensajes de Vite HMR

**Resultado:** _____

---

### Test 2: Issuer Flow - Proof Generation ⭐

**URL:** http://localhost:5173/issuer

**Pasos:**
1. Navegar a http://localhost:5173/issuer
2. Abrir DevTools Console
3. Ingresar balances: `100,100,100,100,100,100,100,100`
4. Click "Generate Proof" (o botón equivalente)
5. **Esperar 10-30 segundos** (no cerrar, el proceso es largo)

**Qué verificar en Console:**
- ✅ `🎲 Generating random salts...`
- ✅ `🔑 Poseidon2 hash computed`
- ✅ `🌳 Building Merkle sum-tree...`
- ✅ `⚙️  Executing Noir circuit...`
- ✅ `🔐 Generating UltraHonk proof with Keccak (10-30s)...`
- ✅ `📦 Public inputs formatted (128 bytes)`

**Qué verificar en UI:**
- ✅ Proof se muestra (hex string largo)
- ✅ Public inputs se muestran (hex string de 256 caracteres)
- ✅ Sin errores en console

**Datos esperados:**
- Public inputs length: 256 caracteres (128 bytes en hex)
- Proof length: 29,184 caracteres (14,592 bytes en hex)

**Comandos útiles en Console:**
```javascript
// Verificar longitudes
console.log('public_inputs length:', document.querySelector('[data-public-inputs]')?.textContent.length);
console.log('proof length:', document.querySelector('[data-proof]')?.textContent.length);
```

**Resultado:** _____

---

### Test 3: Auditor Flow

**URL:** http://localhost:5173/auditor

**Pasos:**
1. Navegar a http://localhost:5173/auditor
2. Verificar que la página carga
3. Ingresar Contract ID: `CC5XFT7XZXKJEONWOBALJTSKYGGCV3I7TEA54FKZWEHSOMQHDOF53SGG`
4. Click "Query Contract" (o equivalente)

**Qué verificar:**
- ✅ Formulario visible
- ✅ Input funciona
- ✅ Botón clickeable
- ✅ (Opcional) Datos del contrato se muestran

**Nota:** Es posible que esta funcionalidad requiera wallet conectada o configuración adicional. Si falla, está OK - no es crítico para el standalone prover.

**Resultado:** _____

---

### Test 4: Integrations View

**URL:** http://localhost:5173/integrations

**Pasos:**
1. Navegar a http://localhost:5173/integrations
2. Verificar tabs: SAC, Aquarius, DeFindex
3. Click en cada tab

**Qué verificar:**
- ✅ 3 tabs visibles
- ✅ SAC tab muestra información
- ✅ Aquarius tab muestra información
- ✅ DeFindex tab muestra 3 vaults configurados
- ✅ Sin errores en console

**Datos esperados en DeFindex:**
- Vault 1: USDC Blend Autocompound (~12.83% APY)
- Vault 2: XLM Blend Autocompound (~9.92% APY)
- Vault 3: AQUA Blend Autocompound (~11.45% APY)

**Resultado:** _____

---

## 🎯 Criterio de Éxito

**Para considerar las pruebas exitosas, DEBE cumplirse:**

1. ✅ **Test 2 (Issuer Flow - Proof Generation)** - CRÍTICO
   - Proof se genera sin errores
   - Public inputs y proof tienen longitudes correctas
   - Console muestra todos los pasos

2. ✅ **Test 1 (Landing Page)** - Importante
   - Sin errores en console
   - Navegación funciona

3. ⚪ **Test 3 y 4** - Nice to have
   - Si funcionan: excelente
   - Si fallan: no es blocker para commit

---

## ⚠️ Problemas Comunes

### Error: "Cannot use SharedArrayBuffer"
**Causa:** Headers CORS no están configurados
**Solución:** Ya están configurados en vite.config.js, verificar que el server se inició con `npm run dev`

### Error: "Module not found: @aztec/bb.js"
**Causa:** Dependencias no instaladas
**Solución:** `npm install`

### Proof generation se queda colgado
**Causa:** WASM no se inicializó correctamente
**Solución:** Recargar página (F5), verificar console por errores

### Public inputs o proof vacíos
**Causa:** Proof generation falló silenciosamente
**Solución:** Verificar console, puede haber un error de circuit

---

## 📊 Resultados de Pruebas

**Completar después de probar:**

| Test | Status | Notas |
|------|--------|-------|
| 1. Landing Page | ☐ PASS ☐ FAIL | |
| 2. Issuer Flow (Proof Gen) | ☐ PASS ☐ FAIL | |
| 3. Auditor Flow | ☐ PASS ☐ FAIL | |
| 4. Integrations View | ☐ PASS ☐ FAIL | |

**Test 2 es CRÍTICO** - los demás son opcionales

---

## 🔍 Debug Console Commands

Si necesitas verificar algo en la console del browser:

```javascript
// Verificar que bb.js está cargado
typeof BarretenbergSync !== 'undefined'

// Verificar Noir
typeof Noir !== 'undefined'

// Ver circuit data
localStorage.getItem('circuitData') !== null

// Forzar limpieza
localStorage.clear()
```

---

## ✅ Cuando Termines las Pruebas

Si **Test 2 (Issuer Flow - Proof Generation) PASA**:
- ✅ Todo el sistema funciona end-to-end
- ✅ Standalone prover OK
- ✅ Frontend OK
- ✅ **LISTO PARA COMMIT**

Si Test 2 **FALLA**:
- ❌ Copiar el error exacto de la console
- ❌ Verificar que el circuito `src/solvency.json` existe
- ❌ Reportar el error para debugging

---

**Dev Server corriendo en:** http://localhost:5173/
**Para detener:** Ctrl+C en la terminal donde corre `npm run dev`

**Siguiente paso después de probar:** Commit del standalone prover ✅
