# Solución: Pantalla en Blanco/Negro en Frontend de Veraz

**Fecha**: Septiembre 2026
**Problema**: Frontend de React mostraba pantalla completamente en blanco o negro
**Estado**: ✅ Resuelto
**Archivos Afectados**: `vite.config.js`, configuración de WASM/Workers, Stellar SDK
**Aplicabilidad**: Proyectos con ZK Proofs, WASM, o Stellar SDK v13+

---

## ⚠️ ¿Esta Guía Aplica a Tu Proyecto?

### ✅ NECESITAS Esta Solución Completa SI:

Tu proyecto usa **ZK Proofs / WASM**:
- Usas `@noir-lang/noir_js` o `@aztec/bb.js`
- Generas proofs criptográficos en el navegador
- Usas WebAssembly (archivos `.wasm`)
- Necesitas `SharedArrayBuffer`

**Solución requerida**: TODA esta guía (Pasos 0-4)

---

### ⚙️ NECESITAS Solución PARCIAL SI:

Tu proyecto **SOLO usa Stellar SDK** (sin ZK proofs):
- Interactúas con blockchain Stellar/Soroban
- Usas `@stellar/stellar-sdk` v13+
- NO usas ZK proofs ni WASM
- Solo necesitas llamadas a contratos

**Solución requerida**:
- ✅ **Paso 0**: Actualizar código para SDK v13+ (CRÍTICO)
- ❌ Paso 1: Plugins WASM (NO necesario)
- ❌ Paso 2: Vite config completa (NO necesario)
- ❌ Paso 3: package.json con WASM (NO necesario)

---

### 🚫 NO NECESITAS Esta Guía SI:

Tu proyecto es un **frontend simple**:
- ❌ No usa Stellar SDK
- ❌ No usa ZK proofs
- ❌ No usa WASM
- Solo React + componentes normales

**Solución**: Si tienes pantalla en blanco, el problema es otro (revisa errores de consola)

---

## 📊 Tabla de Decisión Rápida

| Tu Proyecto Usa... | Paso 0 (SDK) | Paso 1 (Plugins) | Paso 2 (Vite Config) | Paso 3-4 |
|--------------------|--------------|------------------|----------------------|----------|
| ZK Proofs + Stellar | ✅ SÍ | ✅ SÍ | ✅ SÍ | ✅ SÍ |
| Solo ZK Proofs (sin Stellar) | ❌ NO | ✅ SÍ | ✅ SÍ | ✅ SÍ |
| Solo Stellar SDK (sin ZK) | ✅ SÍ | ❌ NO | ⚠️ Mínima* | ❌ NO |
| React simple (nada de lo anterior) | ❌ NO | ❌ NO | ❌ NO | ❌ NO |

**⚠️ Mínima**: Solo headers CORS si planeas agregar WASM después

---

## 💡 Guía Simplificada por Tipo de Proyecto

### Tipo A: Proyecto SOLO con Stellar SDK (sin ZK proofs)

**Síntoma**: Error `SorobanRpc is not defined` o `Contract is not a constructor`

**Solución Mínima**:

1. Verificar versión del SDK:
   ```bash
   npm list @stellar/stellar-sdk
   # Si es v12.x o anterior, actualizar:
   npm install @stellar/stellar-sdk@^17.1.0
   ```

2. Actualizar imports en TODOS los archivos que usen el SDK:
   ```javascript
   // ❌ Antes (v12)
   import { SorobanRpc, Contract } from '@stellar/stellar-sdk';

   // ✅ Después (v13+)
   import StellarSdk from '@stellar/stellar-sdk';
   const server = new StellarSdk.rpc.Server(url);
   ```

3. Limpiar caché y reiniciar:
   ```bash
   rm -rf node_modules/.vite
   npm run dev
   ```

**Tiempo**: 10-15 minutos
**No necesitas**: Plugins WASM, headers CORS especiales, configuración compleja

---

### Tipo B: Proyecto con ZK Proofs (Noir/Aztec bb.js)

**Síntoma**: Pantalla en blanco + errores de WASM/SharedArrayBuffer

**Solución Completa**: Seguir TODA esta guía (Pasos 0-4)

**Tiempo**: 30-45 minutos
**Necesitas**: Todo lo documentado aquí

---

### Tipo C: Proyecto con Stellar SDK v13+ Y ZK Proofs (Como Veraz)

**Síntoma**: Múltiples errores (SDK + WASM + SharedArrayBuffer)

**Solución**: TODA esta guía

**Tiempo**: 45-60 minutos
**Necesitas**: Configuración completa

---

## 📋 Descripción del Problema

### Síntomas

Al intentar cargar la aplicación frontend de Veraz en el navegador:

1. **Pantalla completamente en blanco**
   - URL carga correctamente (http://localhost:5173)
   - No se muestra ningún contenido
   - Consola del navegador muestra errores relacionados con módulos

2. **Pantalla completamente negra**
   - Variante del mismo problema
   - Interfaz no renderiza
   - JavaScript/React no se ejecuta correctamente

### Errores en Consola del Navegador

```
❌ Failed to resolve module specifier "pino/browser"
❌ SharedArrayBuffer is not defined
❌ Cannot find module '@noir-lang/noir_js'
❌ WebAssembly instantiation failed
```

---

## 🔍 Causa Raíz

El problema tenía **múltiples causas relacionadas** con la configuración de Vite para trabajar con:

### 1. **Módulos WASM (WebAssembly)**
- `@aztec/bb.js` requiere WASM para generar proofs UltraHonk
- `@noir-lang/noir_js` usa WASM para ejecutar circuitos Noir
- Vite por defecto no optimiza correctamente los módulos WASM

### 2. **Workers de JavaScript**
- La generación de proofs ZK requiere Web Workers
- Vite necesita configuración especial para `top-level await` en workers

### 3. **SharedArrayBuffer**
- `bb.js` requiere SharedArrayBuffer para operaciones criptográficas
- Necesita headers CORS específicos que no estaban configurados

### 4. **Módulo `pino/browser`**
- `@noir-lang/noir_js` importa `pino` para logging
- Vite intentaba optimizar `pino/browser` causando errores 404
- Necesitaba ser excluido de optimizaciones o stubbed

### 5. **Stellar SDK v13+ - Cambios de Arquitectura** ⭐
- **Problema adicional**: Actualización de `@stellar/stellar-sdk` de v12 a v13/v14/v15+
- **Versión actual del proyecto**: `v17.1.0` (la más reciente)
- La estructura del SDK cambió completamente desde v13
- Código antiguo con v12 causaba errores que rompían toda la app
- Imports incorrectos hacían que React no se inicializara

**Errores específicos del SDK**:
```
❌ SorobanRpc is not defined
❌ Contract is not a constructor
❌ Cannot read properties of undefined (reading 'Server')
```

**Cambios de API v12 → v13+ (v13, v14, v15, v16, v17)**:
| v12 (Antiguo) | v13+ (Nuevo - actual v17) |
|---------------|---------------------------|
| `import { SorobanRpc } from '@stellar/stellar-sdk'` | `import StellarSdk from '@stellar/stellar-sdk'` |
| `new SorobanRpc.Server(url)` | `new StellarSdk.rpc.Server(url)` |
| `new Contract(address)` | `StellarSdk.contract.*` |
| `import { Contract, Networks }` | `const { Networks } = StellarSdk` |

**Nota**: Todas las versiones desde v13 hasta v17 (actual) usan la misma estructura de imports.

---

## ✅ Solución Implementada

### Paso 0: Actualizar Código para Stellar SDK v13+ (CRÍTICO)

**Este paso es ESENCIAL** - Si no actualizas el código del SDK, la app seguirá con pantalla en blanco.

**Versión actual del proyecto**: `@stellar/stellar-sdk@17.1.0`
**Versiones compatibles**: v13, v14, v15, v16, v17 (todas usan la misma API nueva)

#### Archivos que Usar SDK (Frontend)

**Archivo**: `src/lib/stellar.js` o similar

**❌ Código Antiguo (v12 y anteriores) - NO FUNCIONA**:
```javascript
import { SorobanRpc, Contract, Networks } from '@stellar/stellar-sdk';

const server = new SorobanRpc.Server('https://soroban-rpc.testnet.stellar.org');
const contract = new Contract(contractAddress);
```

**✅ Código Nuevo (v13+ incluyendo v17 actual) - FUNCIONA**:

**Opción 1: Import default (Recomendado)**
```javascript
import StellarSdk from '@stellar/stellar-sdk';

// Acceder a submódulos desde StellarSdk
const server = new StellarSdk.rpc.Server('https://soroban-rpc.testnet.stellar.org');
const { Networks } = StellarSdk;
```

**Opción 2: Import namespace (También válido)**
```javascript
import * as StellarSDK from '@stellar/stellar-sdk';

// Desestructurar submódulos
const { rpc } = StellarSDK;
const server = new rpc.Server('https://soroban-rpc.testnet.stellar.org');
const { Networks } = StellarSDK;
```

**Opción 3: Desestructuración directa (Más limpio)**
```javascript
import StellarSdk from '@stellar/stellar-sdk';
const { rpc, Networks, Keypair } = StellarSdk;

// Uso directo
const server = new rpc.Server('https://soroban-rpc.testnet.stellar.org');
```

**Todas estas opciones funcionan igual en v13, v14, v15, v16, v17**

**¿Cuál usar?**
- **Opción 1** (default): Más común en la documentación oficial
- **Opción 2** (namespace): Útil si tienes conflictos de nombres
- **Opción 3** (desestructuración): Código más limpio, menos repetitivo

**Ejemplo completo con las 3 opciones**:

```javascript
// ========================================
// OPCIÓN 1: Import default
// ========================================
import StellarSdk from '@stellar/stellar-sdk';

const server = new StellarSdk.rpc.Server('https://soroban-rpc.testnet.stellar.org');
const keypair = StellarSdk.Keypair.random();
const { Networks } = StellarSdk;

// ========================================
// OPCIÓN 2: Import namespace
// ========================================
import * as StellarSDK from '@stellar/stellar-sdk';

const { rpc } = StellarSDK;
const server = new rpc.Server('https://soroban-rpc.testnet.stellar.org');
const keypair = StellarSDK.Keypair.random();
const { Networks } = StellarSDK;

// ========================================
// OPCIÓN 3: Desestructuración (MÁS LIMPIO)
// ========================================
import StellarSdk from '@stellar/stellar-sdk';
const { rpc, Keypair, Networks, TransactionBuilder } = StellarSdk;

const server = new rpc.Server('https://soroban-rpc.testnet.stellar.org');
const keypair = Keypair.random();  // ← Más limpio, sin StellarSdk.
```

**Recomendación**: Usa **Opción 3** para código más limpio y legible.

#### Archivos que Usar SDK (API Backend)

**Archivo**: `api/src/services/stellar.js`

**Antes (v12)**:
```javascript
import { Contract, SorobanRpc, TransactionBuilder, Networks } from '@stellar/stellar-sdk';

const rpc = new SorobanRpc.Server(url);
```

**Después (v13)**:
```javascript
import StellarSdk from '@stellar/stellar-sdk';

// Extraer submódulos
const rpc = StellarSdk.rpc;
const server = new rpc.Server(url);
```

#### Verificar Versión Instalada

```bash
# Ver versión actual
npm list @stellar/stellar-sdk

# Debe mostrar:
@stellar/stellar-sdk@17.1.0  # ← v17.1.0 (versión actual del proyecto)

# Si muestra v12.x o anterior, actualizar:
npm install @stellar/stellar-sdk@^17.1.0

# O simplemente:
npm install @stellar/stellar-sdk@latest
```

**Nota**: Cualquier versión desde v13 hasta v17 funciona con la misma sintaxis nueva.

#### Test de Importación

Crear archivo `test-sdk.js`:
```javascript
import StellarSdk from '@stellar/stellar-sdk';

console.log('✅ SDK importado correctamente');
console.log('Tiene rpc?', 'rpc' in StellarSdk);
console.log('Tiene rpc.Server?', 'Server' in (StellarSdk.rpc || {}));
console.log('Tiene contract?', 'contract' in StellarSdk);

// Debe mostrar:
// ✅ SDK importado correctamente
// Tiene rpc? true
// Tiene rpc.Server? true
// Tiene contract? true
```

Ejecutar:
```bash
node test-sdk.js
```

Si ves `false` en alguna línea, el SDK no está correctamente instalado/importado.

---

### Paso 1: Instalar Plugins de Vite para WASM

```bash
npm install --save-dev vite-plugin-wasm vite-plugin-top-level-await
```

**Propósito**:
- `vite-plugin-wasm`: Permite cargar archivos `.wasm` como módulos
- `vite-plugin-top-level-await`: Habilita `await` en el nivel superior de workers

### Paso 2: Configurar `vite.config.js`

**Archivo completo**: `/vite.config.js`

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';

// ============================================
// CUSTOM PLUGIN: Stub pino/browser
// ============================================
// Problema: pino/browser causa errores 404 cuando noir_js lo importa
// Solución: Interceptar requests y devolver un stub vacío

function stubPinoBrowserPlugin() {
  return {
    name: 'stub-pino-browser',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.includes('/node_modules/pino/browser.js')) {
          res.setHeader('Content-Type', 'application/javascript');
          res.end(`
            // Stub para pino/browser - evita errores en desarrollo
            export default {
              pino: () => ({
                info: () => {},
                error: () => {},
                warn: () => {},
                debug: () => {},
                trace: () => {},
                fatal: () => {},
                child: function() { return this; },
                level: 'info'
              })
            };
          `);
          return;
        }
        next();
      });
    }
  };
}

// ============================================
// VITE CONFIGURATION
// ============================================

export default defineConfig({
  plugins: [
    react(),
    wasm(),              // ← CRÍTICO: Habilita WASM
    topLevelAwait(),     // ← CRÍTICO: Habilita top-level await
    stubPinoBrowserPlugin() // ← Evita errores de pino
  ],

  // ============================================
  // SERVER CONFIGURATION
  // ============================================
  server: {
    port: 5173,
    headers: {
      // CRÍTICO: Headers para SharedArrayBuffer
      // Sin estos, bb.js falla con "SharedArrayBuffer is not defined"
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    }
  },

  // ============================================
  // OPTIMIZATIONS
  // ============================================
  optimizeDeps: {
    exclude: [
      // NO optimizar estos módulos (causan problemas)
      '@noir-lang/noir_js',
      '@aztec/bb.js',
      '@noir-lang/backend_barretenberg'
    ],
    esbuildOptions: {
      target: 'esnext' // Requerido para top-level await
    }
  },

  // ============================================
  // BUILD CONFIGURATION
  // ============================================
  build: {
    target: 'esnext', // Soporte para características modernas
    rollupOptions: {
      output: {
        // Configuración para chunks de WASM
        manualChunks: {
          'noir': ['@noir-lang/noir_js'],
          'bb': ['@aztec/bb.js']
        }
      }
    }
  },

  // ============================================
  // WORKER CONFIGURATION
  // ============================================
  worker: {
    format: 'es',        // Formato ES modules para workers
    plugins: [
      wasm(),            // WASM en workers también
      topLevelAwait()    // Top-level await en workers
    ]
  }
});
```

### Paso 3: Verificar `package.json`

Asegurar que las dependencias estén correctamente instaladas:

```json
{
  "dependencies": {
    "@aztec/bb.js": "^0.87.0",
    "@noir-lang/noir_js": "1.0.0-beta.9",
    "@stellar/stellar-sdk": "^17.1.0",  // ← IMPORTANTE: v17.1.0 (actual del proyecto)
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^5.4.0",
    "vite-plugin-wasm": "^3.3.0",
    "vite-plugin-top-level-await": "^1.4.4"
  }
}
```

### Paso 4: Reiniciar el Servidor de Desarrollo

```bash
# Detener servidor existente
pkill -f vite

# Limpiar caché de node_modules (opcional pero recomendado)
rm -rf node_modules/.vite

# Reinstalar dependencias (si agregaste plugins nuevos)
npm install

# Iniciar servidor
npm run dev
```

---

## 🧪 Verificación de la Solución

### Test 1: Servidor Inicia sin Errores

```bash
npm run dev
```

**Output esperado**:
```
VITE v5.4.21  ready in 1500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Test 2: Página Carga en el Navegador

1. Abrir http://localhost:5173
2. **Resultado esperado**: Interfaz de Veraz visible (no pantalla en blanco)
3. Ver landing page con logo, título, navegación

### Test 3: Consola del Navegador Sin Errores Críticos

Abrir DevTools (F12) → Console

**Esperado**:
```
✅ No errores de "Failed to resolve module"
✅ No errores de "SharedArrayBuffer"
✅ WASM cargado correctamente
✅ Workers iniciados
```

**Pueden aparecer warnings** (no críticos):
```
⚠️ DevTools: Service Worker registration failed (normal en desarrollo)
⚠️ Some optimization hints (ignorar)
```

### Test 4: Módulos WASM Funcionan

Navegar a "Generate Proof" y verificar que:
- Inputs de balances son editables
- Al hacer clic en "Generate Proof", comienza el proceso
- No hay error de `WebAssembly instantiation failed`

---

## 📊 Comparación Antes/Después

| Aspecto | ❌ Antes (Pantalla Blanco/Negro) | ✅ Después (Funcionando) |
|---------|----------------------------------|--------------------------|
| Carga de página | Pantalla en blanco | Interfaz completa visible |
| Consola | 5+ errores críticos | 0 errores críticos |
| Módulos WASM | Falla al cargar | Carga correctamente |
| SharedArrayBuffer | No disponible | Disponible |
| Workers | Fallan al iniciar | Funcionan correctamente |
| Stellar SDK | Errores de imports v12/v13 | Importado correctamente (v13) |
| SorobanRpc | `undefined` o no es constructor | `StellarSdk.rpc.Server` funciona |
| Generación de proof | Imposible | Funcional (2-5 min) |

---

## 🔧 Troubleshooting Adicional

### Si el Problema Persiste

#### Problema: Aún veo pantalla en blanco

**Soluciones**:

1. **Limpiar caché completa**:
   ```bash
   rm -rf node_modules/.vite
   rm -rf dist
   npm cache clean --force
   npm install
   npm run dev
   ```

2. **Verificar versiones de Node.js**:
   ```bash
   node --version  # Debe ser >= 18.0.0
   npm --version   # Debe ser >= 9.0.0
   ```

3. **Probar en navegador diferente**:
   - Chrome/Chromium: Mejor soporte para WASM
   - Firefox: También soportado
   - Safari: Puede tener problemas con SharedArrayBuffer

4. **Modo incógnito**:
   - Abre ventana incógnita
   - Esto evita extensiones que puedan interferir

#### Problema: Error "SharedArrayBuffer is not defined"

**Verificar headers CORS en `vite.config.js`**:

```javascript
server: {
  headers: {
    'Cross-Origin-Opener-Policy': 'same-origin',    // ← DEBE estar
    'Cross-Origin-Embedder-Policy': 'require-corp'  // ← DEBE estar
  }
}
```

**Test con curl**:
```bash
curl -I http://localhost:5173
```

**Debe mostrar**:
```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

#### Problema: Error de módulo `pino/browser`

**Verificar que el plugin stub está activo**:

```javascript
// En vite.config.js, debe estar en plugins:
plugins: [
  react(),
  wasm(),
  topLevelAwait(),
  stubPinoBrowserPlugin() // ← Este debe estar
]
```

**Test manual**: Visitar http://localhost:5173/node_modules/pino/browser.js

**Debe devolver**:
```javascript
// Stub para pino/browser...
export default { pino: () => ({ ... }) };
```

#### Problema: Errores de Stellar SDK (SorobanRpc, Contract)

**Síntomas**:
```
❌ SorobanRpc is not defined
❌ Contract is not a constructor
❌ Cannot read properties of undefined (reading 'Server')
```

**Causa**: Código usando sintaxis de SDK v12 pero tienes v13 instalado (o viceversa)

**Solución**:

1. **Verificar versión instalada**:
   ```bash
   npm list @stellar/stellar-sdk
   # Proyecto Veraz usa: v17.1.0
   ```

2. **Si tienes v13+ (v13, v14, v15, v16, v17)**, actualizar todo el código:
   ```javascript
   // ❌ Antiguo (v12)
   import { SorobanRpc, Contract } from '@stellar/stellar-sdk';
   const server = new SorobanRpc.Server(url);

   // ✅ Nuevo (v13)
   import StellarSdk from '@stellar/stellar-sdk';
   const server = new StellarSdk.rpc.Server(url);
   ```

3. **Si tienes v12.x o anterior** (necesitas actualizar a v17):
   ```bash
   npm install @stellar/stellar-sdk@^17.1.0
   # O la última versión disponible:
   npm install @stellar/stellar-sdk@latest
   ```

4. **Buscar todos los archivos que importen el SDK**:
   ```bash
   # En proyecto frontend
   grep -r "stellar-sdk" src/

   # En proyecto API
   grep -r "stellar-sdk" api/src/
   ```

5. **Actualizar TODOS los imports** según la tabla de migración:

   | Código v12 | Código v13 |
   |------------|------------|
   | `import { SorobanRpc } from '@stellar/stellar-sdk'` | `import StellarSdk from '@stellar/stellar-sdk'`<br>`const rpc = StellarSdk.rpc;` |
   | `new SorobanRpc.Server(url)` | `new StellarSdk.rpc.Server(url)` |
   | `SorobanRpc.Api.scValToNative(val)` | `StellarSdk.rpc.Api.scValToNative(val)` |
   | `import { Contract }` | `const Contract = StellarSdk.contract;` |
   | `import { Networks }` | `const { Networks } = StellarSdk;` |

6. **Reiniciar servidor** después de actualizar:
   ```bash
   pkill -f vite  # o pkill -f node
   rm -rf node_modules/.vite  # Limpiar caché
   npm run dev
   ```

**Verificación**: Crear archivo de test:
```javascript
// test-sdk-v13.js
import StellarSdk from '@stellar/stellar-sdk';

console.log('SDK version check:');
console.log('✓ rpc exists:', 'rpc' in StellarSdk);
console.log('✓ rpc.Server exists:', StellarSdk.rpc && 'Server' in StellarSdk.rpc);
console.log('✓ contract exists:', 'contract' in StellarSdk);

// Intenta crear server
try {
  const server = new StellarSdk.rpc.Server('https://soroban-rpc.testnet.stellar.org');
  console.log('✅ Server creado exitosamente');
} catch (e) {
  console.error('❌ Error creando server:', e.message);
}
```

Ejecutar:
```bash
node test-sdk-v13.js
```

Debe mostrar:
```
SDK version check:
✓ rpc exists: true
✓ rpc.Server exists: true
✓ contract exists: true
✅ Server creado exitosamente
```

---

#### Problema: Módulos WASM no cargan

**Verificar plugins**:

```bash
# Verificar que están instalados
npm list vite-plugin-wasm vite-plugin-top-level-await

# Debe mostrar:
├── vite-plugin-wasm@3.3.0
└── vite-plugin-top-level-await@1.4.4
```

**Si faltan**:
```bash
npm install --save-dev vite-plugin-wasm vite-plugin-top-level-await
```

---

## 📚 Documentación de Referencia

### Stellar SDK v13+ Migration
- **Changelog oficial**: https://github.com/stellar/js-stellar-sdk/releases
- **Guía de migración**: https://github.com/stellar/js-stellar-sdk/blob/master/CHANGELOG.md
- **Versión actual del proyecto**: v17.1.0

### Vite + WASM (Solo si usas ZK proofs)
- https://vitejs.dev/guide/features.html#webassembly
- https://github.com/Menci/vite-plugin-wasm

### SharedArrayBuffer (Solo si usas ZK proofs)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer
- https://web.dev/cross-origin-isolation-guide/

### Aztec/Noir + Vite (Solo si usas ZK proofs)
- https://noir-lang.org/docs/getting_started/installation
- https://github.com/AztecProtocol/aztec-packages/tree/master/barretenberg/ts

---

## ❓ Preguntas Frecuentes

### P: Mi proyecto solo usa Stellar SDK, ¿necesito toda esta configuración?

**R**: NO. Si tu proyecto:
- ✅ Solo usa `@stellar/stellar-sdk` para interactuar con Stellar
- ❌ NO usa ZK proofs
- ❌ NO usa `@noir-lang/noir_js` o `@aztec/bb.js`

Entonces **solo necesitas el Paso 0** (actualizar SDK a v13+). No necesitas plugins WASM, headers CORS especiales, ni la configuración completa de Vite.

---

### P: Actualicé el SDK a v17 pero sigo viendo pantalla en blanco

**R**: Verifica que hayas actualizado **TODOS** los archivos que importan el SDK:

```bash
# Buscar TODOS los archivos que usan el SDK
grep -r "stellar-sdk" src/
grep -r "SorobanRpc" src/
grep -r "from '@stellar/stellar-sdk'" src/

# Verificar que ninguno use sintaxis antigua
```

Si encuentras imports antiguos como `import { SorobanRpc }`, debes actualizarlos a `import StellarSdk from '@stellar/stellar-sdk'`.

---

### P: ¿La solución funciona igual para v13, v14, v15, v16 y v17 del SDK?

**R**: SÍ. Los cambios breaking fueron de v12 → v13. Desde v13 hasta v17 (actual), la API se mantiene compatible. La sintaxis nueva funciona en todas:

```javascript
// Funciona en v13, v14, v15, v16, v17
import StellarSdk from '@stellar/stellar-sdk';
const server = new StellarSdk.rpc.Server(url);
```

---

### P: Mi proyecto no usa Stellar ni ZK proofs, ¿por qué tengo pantalla en blanco?

**R**: Esta guía NO aplica a tu proyecto. Tu problema es diferente. Revisa:

1. **Consola del navegador** (F12) - busca errores JavaScript
2. **Errores de import** - verifica que todas las dependencias estén instaladas
3. **Errores de React** - revisa componentes rotos
4. **Build issues** - intenta `rm -rf node_modules && npm install`

---

### P: ¿Puedo usar solo parte de la configuración de Vite?

**R**: Depende de tu proyecto:

| Necesitas... | Si usas... |
|--------------|------------|
| Plugins WASM | ZK proofs / Noir / bb.js |
| Headers CORS | SharedArrayBuffer / ZK proofs |
| Stub pino | `@noir-lang/noir_js` |
| SDK v13+ migration | `@stellar/stellar-sdk` |

Usa solo lo que necesites. No copies configuración innecesaria.

---

### P: ¿Puedo importar el SDK como `import * as StellarSDK`?

**R**: SÍ, todas estas formas funcionan:

```javascript
// ✅ Opción 1 (default)
import StellarSdk from '@stellar/stellar-sdk';
const server = new StellarSdk.rpc.Server(url);

// ✅ Opción 2 (namespace)
import * as StellarSDK from '@stellar/stellar-sdk';
const { rpc } = StellarSDK;
const server = new rpc.Server(url);

// ✅ Opción 3 (desestructuración - recomendada)
import StellarSdk from '@stellar/stellar-sdk';
const { rpc, Keypair, Networks } = StellarSdk;
const server = new rpc.Server(url);
```

**Recomendación**: Usa Opción 3 (desestructuración) para código más limpio.

**NO funciona** (sintaxis v12):
```javascript
// ❌ NO FUNCIONA en v13+
import { SorobanRpc, Contract } from '@stellar/stellar-sdk';
```

---

## 🎯 Lecciones Aprendidas

### 1. WASM Requiere Configuración Especial en Vite
- No es plug-and-play
- Necesita plugins dedicados
- Workers también necesitan configuración WASM

### 2. SharedArrayBuffer Tiene Requisitos Estrictos
- Requiere CORS headers específicos
- Solo funciona en contextos seguros (HTTPS o localhost)
- Algunos navegadores lo deshabilitan por seguridad

### 3. Optimización de Dependencias Puede Romper Módulos
- `@noir-lang/noir_js` no debe ser optimizado por Vite
- Usar `optimizeDeps.exclude` para módulos problemáticos
- `pino` requiere stub o exclusión completa

### 4. La Caché de Vite Puede Ocultar Problemas
- Siempre limpiar `.vite/` al cambiar configuración
- `rm -rf node_modules/.vite` resuelve muchos problemas

### 5. Stellar SDK v13+ Tiene Cambios Breaking ⭐
- **API completamente diferente** entre v12 y v13+
- **Versión actual**: v17.1.0 (todas desde v13 usan la misma API nueva)
- `SorobanRpc` ya no existe como export nombrado
- Todo el SDK ahora se importa como default: `import StellarSdk from '@stellar/stellar-sdk'`
- Submódulos se acceden vía: `StellarSdk.rpc`, `StellarSdk.contract`, etc.
- **Código antiguo causa pantalla en blanco** - no solo warnings
- Necesita migración manual de TODOS los imports
- Documentación oficial puede estar desactualizada (aún muestra v12)

**Regla de Oro**: Si ves errores de `SorobanRpc` o `Contract`, verifica versión del SDK primero.

**Compatibilidad**: La sintaxis nueva funciona igual en v13, v14, v15, v16, v17 (no hay más breaking changes).

---

## ✅ Checklist de Verificación

Usa este checklist si implementas la solución:

### Configuración de Vite
- [ ] `vite-plugin-wasm` instalado en devDependencies
- [ ] `vite-plugin-top-level-await` instalado en devDependencies
- [ ] Ambos plugins importados en `vite.config.js`
- [ ] Ambos plugins agregados al array `plugins`
- [ ] Headers CORS configurados en `server.headers`
- [ ] `@noir-lang/noir_js` y `@aztec/bb.js` en `optimizeDeps.exclude`
- [ ] Plugin stub de pino/browser implementado
- [ ] `target: 'esnext'` en `optimizeDeps.esbuildOptions`
- [ ] `target: 'esnext'` en `build`
- [ ] Worker config con `format: 'es'`

### Stellar SDK v13+ Migration (Proyecto usa v17.1.0)
- [ ] Versión de `@stellar/stellar-sdk` es `^17.1.0` (o al menos v13+)
- [ ] Todos los imports cambiados a: `import StellarSdk from '@stellar/stellar-sdk'`
- [ ] Eliminados imports nombrados: `import { SorobanRpc, Contract }`
- [ ] `SorobanRpc.Server` reemplazado por `StellarSdk.rpc.Server`
- [ ] `new Contract()` actualizado según nueva API
- [ ] Test de importación ejecutado exitosamente (`node test-sdk-v13.js`)
- [ ] Buscados TODOS los archivos que usan SDK (`grep -r "stellar-sdk"`)

### Verificación Final
- [ ] Caché de Vite limpiada (`rm -rf node_modules/.vite`)
- [ ] Servidor reiniciado
- [ ] Página carga sin pantalla en blanco
- [ ] Consola sin errores críticos
- [ ] WASM se carga correctamente

**Si todos tienen ✅**: La solución está completa.

---

## 📞 Contacto para Soporte

Si el problema persiste después de seguir esta guía:

1. Verificar versión de Node.js: `node --version` (requiere >= 18)
2. Verificar versión de npm: `npm --version` (requiere >= 9)
3. Revisar logs completos de consola del navegador
4. Compartir configuración exacta de `vite.config.js`
5. Probar con proyecto mínimo de Vite + WASM

---

**Última Actualización**: 2026-09-23
**Versión del Documento**: 1.0
**Estado**: Solución Verificada y Funcionando ✅
