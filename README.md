# Veraz — Proof of Solvency para Stellar

Sistema de proof of solvency privado para emisores de stablecoins y RWA en Stellar.

**Chainlink Proof of Reserves, pero privado, criptográfico y nativo de Stellar.**

## 🚀 Estado del Proyecto: 95% Completo

✅ **Circuito Noir compilado** (29KB, Pedersen hash, 8 holders)
✅ **ZK Proving real activado** (UltraHonkBackend - compatible con verifier)
✅ **Contratos Soroban desplegados en testnet** (6/6 tests passing)
✅ **Frontend React completo** (Freighter wallet integration)
✅ **Sistema end-to-end funcional** (MOCK verifier mode)
✅ **Backend compatibility fix** (UltraPlonk → UltraHonk)
✅ **Verifier contract compilado** (25KB WASM, listo para deploy)
⏳ **VK generation** (único blocker restante)

**Progreso reciente:** Rust blocker resuelto (1.93.1 + wasm32v1-none ya instalado), verifier compilado exitosamente. Solo falta el VK (5-10KB) para deployment completo. Ver [BLOCKER_RESOLUTION_UPDATE.md](./BLOCKER_RESOLUTION_UPDATE.md) para detalles.

### Testnet Deployment

**Contract ID**: `CAKDHQ43FKKHLDR2R7YZKTAKKI7JN2T56WZJYBFDFTZJF2WIRR5J3FWA`
[Ver en Stellar.Expert](https://stellar.expert/explorer/testnet/contract/CAKDHQ43FKKHLDR2R7YZKTAKKI7JN2T56WZJYBFDFTZJF2WIRR5J3FWA)

Ver [DEPLOYMENT.md](./DEPLOYMENT.md) para deployment y [COMPLETION_STATUS.md](./COMPLETION_STATUS.md) para status detallado.

## Funcionalidad

Dos pantallas para el proof of solvency:

- **Público:** consulta el badge de un emisor (lectura por simulación, sin firmar).
- **Emisor:** genera la prueba de pasivos y la publica on-chain (firma con Freighter).

## Requisitos
- Node 20+
- Extensión [Freighter](https://freighter.app) en testnet (para la pantalla de Emisor)

## Correr
```bash
npm install
npm run dev
```

## Estado Actual

- **Integración Stellar** (`src/lib/stellar.js`): ✅ Real - `querySolvent` simula `is_solvent` y `attest` firma con Freighter
- **ZK Proving** (`src/lib/prover.js`): ✅ Real - UltraHonkBackend, genera pruebas ZK reales en navegador
- **Circuito Noir**: ✅ Compilado - `public/solvency.json` (29KB)
- **Dependencias ZK**: ✅ Instaladas - `@noir-lang/noir_js`, `@aztec/bb.js`
- **Backend Compatibility**: ✅ Fixed - UltraHonk proofs (compatible con Nethermind verifier)
- **Verifier Contract**: ✅ Código listo - Deployment bloqueado por herramientas (ver COMPLETION_STATUS.md)

**El sistema funciona end-to-end en modo MOCK.** Las pruebas ZK usan formato UltraHonk correcto, solo falta deployment del verifier criptográfico.

## Arquitectura

```
┌─────────────────────────────────────┐
│  Frontend (React + Vite)            │
│  - Pantalla Público (query badge)  │
│  - Pantalla Emisor (generate proof) │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│  Capa 2+3: Solvency Policy ✅       │
│  - Verifica R ≥ L                   │
│  - Freshness + anti-replay          │
│  - Registry de atestaciones         │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│  Capa 1: UltraHonk Verifier ⏳      │
│  - Verifica pruebas ZK              │
│  - VK fija, BN254                   │
└─────────────────────────────────────┘
```

## Estructura del Proyecto

```
veraz-proof-of-solvency/
├── circuits/solvency/      # Circuito Noir (Merkle-sum-tree)
├── contracts/              # Contratos Soroban
│   └── solvency_policy/   # ✅ Desplegado en testnet
├── src/                   # Frontend React
│   ├── App.jsx           # UI dual
│   └── lib/
│       ├── prover.js     # ZK proving (MOCK)
│       └── stellar.js    # Integración Stellar
├── docs/                  # Arquitectura y specs
├── DEPLOYMENT.md          # Info de deployment
└── README.md
```

## Demo Flow (testnet)

1. **Instalar dependencias** → `npm install`
2. **Correr frontend** → `npm run dev`
3. **Pantalla Emisor** → Conectar Freighter → Ingresar balances → **Generar prueba ZK real**
4. **Submit a testnet** → Firma transacción → Atestación on-chain (MOCK verifier acepta)
5. **Pantalla Público** → Query contract ID → Ver badge de solvencia

## Roadmap

1. ✅ Contracts desplegados en testnet
2. ✅ Circuito Noir compilado (Pedersen, 8 holders)
3. ✅ Prover real activado en frontend
4. ✅ Backend compatibility fix (UltraPlonk → UltraHonk)
5. ✅ Tests end-to-end funcionando (MOCK mode)
6. ⏳ Deploy UltraHonk verifier (bloqueado - ver COMPLETION_STATUS.md)
7. ⏳ Actualizar solvency_policy para usar verifier real (código listo)
8. ⏳ Security audit y preparación para mainnet

## Documentación

- [BACKEND_COMPATIBILITY_FIX.md](./BACKEND_COMPATIBILITY_FIX.md) - ⚡ Fix crítico de compatibilidad UltraHonk
- [COMPLETION_STATUS.md](./COMPLETION_STATUS.md) - Estado actual detallado (90% completo)
- [STATUS.md](./STATUS.md) - Status técnico y métricas
- [FINAL_SUMMARY.md](./FINAL_SUMMARY.md) - Resumen ejecutivo del proyecto
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Info de deployment en testnet
- [Arquitectura Completa](./docs/arquitectura-proof-of-solvency-stellar.md)
- [Spec de Implementación](./docs/spec-implementacion-proof-of-solvency.md)
- [Guía de Contratos](./contracts/README.md)
- [Verifier Integration Guide](./docs/verifier-integration-complete-guide.md)
