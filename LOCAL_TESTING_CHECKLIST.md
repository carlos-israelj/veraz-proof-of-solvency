# Checklist de Pruebas Locales - Antes del Commit

**Fecha:** 3 de octubre, 2026
**Objetivo:** Verificar 100% de funcionalidad local antes de commit

---

## ✅ Fase 1: Standalone Prover (CLI)

### Test 1.1: Imports
```bash
node test-prover-import.mjs
```
**Esperado:** ✅ Todos los módulos importados

**Estado:** ✅ PASADO

---

### Test 1.2: Hash Functions
```bash
node test-hash-comparison.mjs
```
**Esperado:**
- ✅ pedersenHash disponible
- ✅ poseidon2Hash disponible
- ✅ Valores de hash correctos

**Estado:** ✅ PASADO

---

### Test 1.3: Reserve Address Hashing
```bash
node test-standalone-hash.mjs
```
**Esperado:**
- ✅ Hash coincide con implementación del browser
- ✅ Field elements correctos

**Estado:** ✅ PASADO

---

### Test 1.4: Proof Generation (Simple Test)
```bash
node test-proof-simple.mjs
```
**Esperado:**
- ✅ Proof generado en 10-30s
- ✅ Proof size: 14,592 bytes
- ✅ Public inputs: 128 bytes
- ✅ Sin errores

**Estado:** ✅ PASADO (12.4s)

---

### Test 1.5: CLI End-to-End
```bash
node generate-proof-standalone.mjs \
  --balances 100,100,100,100,100,100,100,100 \
  --ledger 1234567
```

**Esperado:**
- ✅ Proof generado exitosamente
- ✅ Archivos creados:
  - `contracts/solvency_policy/public_inputs.hex`
  - `contracts/solvency_policy/proof.hex`
  - `contracts/solvency_policy/submit-attestation.sh`
- ✅ Script `submit-attestation.sh` ejecutable

**Estado:** ⏳ EN PROGRESO

**Verificación:**
```bash
# Verificar archivos existen
ls -lh contracts/solvency_policy/*.hex contracts/solvency_policy/submit-attestation.sh

# Verificar contenido
wc -c contracts/solvency_policy/public_inputs.hex  # Debe ser 256 chars (128 bytes hex)
wc -c contracts/solvency_policy/proof.hex          # Debe ser 29184 chars (14592 bytes hex)

# Verificar script ejecutable
bash -n contracts/solvency_policy/submit-attestation.sh  # Verificar sintaxis
```

---

## ⏸️ Fase 2: Frontend (Browser)

### Test 2.1: Dev Server Startup
```bash
npm run dev
```

**Esperado:**
- ✅ Server inicia sin errores
- ✅ CORS headers configurados
- ✅ Puerto: http://localhost:5173

**Verificación:**
```bash
# En otra terminal:
curl -I http://localhost:5173
# Debe incluir:
# Cross-Origin-Opener-Policy: same-origin
# Cross-Origin-Embedder-Policy: require-corp
```

**Estado:** ⏸️ PENDIENTE

---

### Test 2.2: Landing Page
**URL:** http://localhost:5173/

**Esperado:**
- ✅ Página carga sin errores de consola
- ✅ Animaciones funcionan
- ✅ Links a /issuer, /auditor funcionan

**Verificación:**
- Abrir DevTools Console
- No debe haber errores (warnings sobre WASM ok)
- Verificar navegación entre páginas

**Estado:** ⏸️ PENDIENTE

---

### Test 2.3: Issuer Flow - Proof Generation
**URL:** http://localhost:5173/issuer

**Paso a paso:**
1. Ingresar balances: `100,100,100,100,100,100,100,100`
2. Click "Generate Proof"
3. Esperar 10-30 segundos

**Esperado:**
- ✅ Sin errores en consola
- ✅ Proof generado exitosamente
- ✅ Public inputs visible en UI
- ✅ Proof visible en UI
- ✅ Console logs muestran:
  ```
  🔑 Poseidon2 hash computed
  🌳 Merkle sum-tree built
  🔐 UltraHonk proof generated
  ```

**Verificación en Console:**
```javascript
// Copiar public_inputs y proof de la UI
// Verificar longitud:
public_inputs.length  // Debe ser 256 (128 bytes hex)
proof.length          // Debe ser 29184 (14592 bytes hex)
```

**Estado:** ⏸️ PENDIENTE

---

### Test 2.4: Auditor Flow
**URL:** http://localhost:5173/auditor

**Esperado:**
- ✅ Página carga sin errores
- ✅ Formulario de verificación visible
- ✅ Input para contract ID funciona

**Verificación:**
- Ingresar contract ID: `CC5XFT7XZXKJEONWOBALJTSKYGGCV3I7TEA54FKZWEHSOMQHDOF53SGG`
- Click "Query Contract"
- Verificar que muestra datos del contrato

**Estado:** ⏸️ PENDIENTE

---

### Test 2.5: Integrations View
**URL:** http://localhost:5173/integrations

**Esperado:**
- ✅ Tabs: SAC, Aquarius, DeFindex
- ✅ SAC balance visible
- ✅ DeFindex vaults listados (3 vaults)
- ✅ Sin errores en consola

**Estado:** ⏸️ PENDIENTE

---

## ⏸️ Fase 3: Integración CLI + Stellar Testnet

### Test 3.1: Generar Proof con Ledger Real
```bash
# Obtener ledger actual
LEDGER=$(stellar network container shared testnet 2>&1 | grep ledger | awk '{print $NF}')

# Generar proof
node generate-proof-standalone.mjs \
  --balances 100,100,100,100,100,100,100,100 \
  --ledger $LEDGER
```

**Esperado:**
- ✅ Archivos `.hex` y `.sh` creados
- ✅ Script contiene ledger correcto

**Estado:** ⏸️ PENDIENTE

---

### Test 3.2: Submit a Testnet (Dry Run)
```bash
# Verificar sintaxis del script
bash -n contracts/solvency_policy/submit-attestation.sh

# Ver comando que se ejecutaría (sin ejecutar)
cat contracts/solvency_policy/submit-attestation.sh
```

**Esperado:**
- ✅ Script bien formado
- ✅ Contract ID correcto: `CC5XFT7XZXKJEONWOBALJTSKYGGCV3I7TEA54FKZWEHSOMQHDOF53SGG`
- ✅ Network: testnet
- ✅ Source: issuer

**Estado:** ⏸️ PENDIENTE

---

### Test 3.3: Submit Real (Transacción 1)
```bash
bash contracts/solvency_policy/submit-attestation.sh
```

**Esperado:**
- ✅ Transacción exitosa
- ✅ TX hash visible
- ✅ Sin errores

**Verificación:**
```bash
stellar contract invoke \
  --id CC5XFT7XZXKJEONWOBALJTSKYGGCV3I7TEA54FKZWEHSOMQHDOF53SGG \
  --network testnet \
  -- is_solvent
```

**Esperado en output:**
```json
{
  "solvent": true,
  "reserves": 1000,
  "liabilities": 800,
  "ledger_seq": <LEDGER_USADO>,
  ...
}
```

**Estado:** ⏸️ PENDIENTE

---

## 📋 Criterios de Éxito para Commit

**TODOS deben estar ✅ antes de hacer commit:**

- [ ] Test 1.1: Imports ✅
- [ ] Test 1.2: Hash Functions ✅
- [ ] Test 1.3: Reserve Address Hashing ✅
- [ ] Test 1.4: Proof Generation (Simple) ✅
- [ ] Test 1.5: CLI End-to-End ⏳
- [ ] Test 2.1: Dev Server Startup
- [ ] Test 2.2: Landing Page
- [ ] Test 2.3: Issuer Flow - Proof Generation
- [ ] Test 2.4: Auditor Flow
- [ ] Test 2.5: Integrations View
- [ ] Test 3.1: Generar Proof con Ledger Real
- [ ] Test 3.2: Submit a Testnet (Dry Run)
- [ ] Test 3.3: Submit Real (Transacción 1)

**Progreso:** 4/13 tests pasados (30%)

---

## 🚨 Blockers Conocidos

Ninguno por ahora. Si Test 1.5 falla, investigar:
- ¿Archivos .hex se crearon?
- ¿Script .sh se creó?
- ¿Hay errores en la salida del CLI?

---

## 📝 Notas

- **Tiempo estimado:** 30-45 minutos para completar todas las pruebas
- **Fase 1:** ~5 min (4/5 pasados)
- **Fase 2:** ~15-20 min (frontend testing)
- **Fase 3:** ~10-15 min (testnet integration)

---

**Última actualización:** En progreso - Test 1.5 corriendo
