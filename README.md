# Veraz — Proof of Solvency para Stellar

Sistema de proof of solvency privado para emisores de stablecoins y RWA en Stellar.

**Chainlink Proof of Reserves, pero privado, criptográfico y nativo de Stellar.**

## 🚀 Estado del Proyecto: 90% Completo

✅ **Circuito Noir compilado** (29KB, Pedersen hash, 8 holders)
✅ **ZK Proving real activado** (Noir + Barretenberg en navegador)
✅ **Contratos Soroban desplegados en testnet** (6/6 tests passing)
✅ **Frontend React completo** (Freighter wallet integration)
✅ **Sistema end-to-end funcional** (MOCK verifier mode)
⏳ **UltraHonk Verifier deployment** (bloqueado por incompatibilidad de herramientas)

**Estado actual:** El sistema genera pruebas ZK reales y funciona completamente en modo MOCK. El 10% restante es deployment del verifier, bloqueado por problemas de infraestructura (bb CLI installation, Rust version). Ver [COMPLETION_STATUS.md](./COMPLETION_STATUS.md) para detalles completos.

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
- **ZK Proving** (`src/lib/prover.js`): ✅ Real - MOCK = false, genera pruebas ZK reales en navegador
- **Circuito Noir**: ✅ Compilado - `public/solvency.json` (29KB)
- **Dependencias ZK**: ✅ Instaladas - `@noir-lang/noir_js`, `@aztec/bb.js`
- **Verifier Contract**: ✅ Código listo - Deployment bloqueado por herramientas (ver COMPLETION_STATUS.md)

**El sistema funciona end-to-end en modo MOCK.** Todas las pruebas ZK son reales, solo falta deployment del verifier criptográfico.

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
4. ✅ Tests end-to-end funcionando (MOCK mode)
5. ⏳ Deploy UltraHonk verifier (bloqueado - ver COMPLETION_STATUS.md)
6. ⏳ Actualizar solvency_policy para usar verifier real (código listo)
7. ⏳ Security audit y preparación para mainnet

## Documentación

- [COMPLETION_STATUS.md](./COMPLETION_STATUS.md) - Estado actual detallado (90% completo)
- [STATUS.md](./STATUS.md) - Status técnico y métricas
- [FINAL_SUMMARY.md](./FINAL_SUMMARY.md) - Resumen ejecutivo del proyecto
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Info de deployment en testnet
- [Arquitectura Completa](./docs/arquitectura-proof-of-solvency-stellar.md)
- [Spec de Implementación](./docs/spec-implementacion-proof-of-solvency.md)
- [Guía de Contratos](./contracts/README.md)
- [Verifier Integration Guide](./docs/verifier-integration-complete-guide.md)
