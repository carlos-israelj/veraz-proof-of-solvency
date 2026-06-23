# Veraz — Proof of Solvency para Stellar

Sistema de proof of solvency privado para emisores de stablecoins y RWA en Stellar.

**Chainlink Proof of Reserves, pero privado, criptográfico y nativo de Stellar.**

## 🚀 Estado del Proyecto

✅ **Contratos Soroban desplegados en testnet**
✅ **Frontend React completo**
✅ **Circuito Noir compilado y funcionando**
✅ **REAL ZK PROVING ACTIVADO** (no más MOCK!)
⏳ **Verifier UltraHonk (Layer 1) - integración pendiente**

**🎉 Nuevo:** Pruebas ZK reales se generan en el navegador usando Noir + Barretenberg!

### Testnet Deployment

**Contract ID**: `CAKDHQ43FKKHLDR2R7YZKTAKKI7JN2T56WZJYBFDFTZJF2WIRR5J3FWA`
[Ver en Stellar.Expert](https://stellar.expert/explorer/testnet/contract/CAKDHQ43FKKHLDR2R7YZKTAKKI7JN2T56WZJYBFDFTZJF2WIRR5J3FWA)

Ver [DEPLOYMENT.md](./DEPLOYMENT.md) para detalles completos.

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

## Estado actual (honesto)
- La integración con Stellar (`src/lib/stellar.js`) es **real**: `querySolvent` simula `is_solvent`
  y `attest` firma+envía con Freighter, siguiendo los patrones de la skill `dapp`.
- El proving (`src/lib/prover.js`) está en **MOCK = true** para iterar la UI. Para pruebas reales:
  1. `cd ../circuits/solvency && nargo compile` → genera `target/solvency.json`
  2. `npm i @noir-lang/noir_js @aztec/bb.js`
  3. copiar el `.json` compilado y poner `MOCK = false` (ver bloque comentado).

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

1. **Frontend** → pegar Contract ID en la UI
2. **Pantalla Emisor** → conectar Freighter → generar prueba MOCK
3. **Pantalla Público** → ver estado de solvencia
4. (Futuro) **Pruebas reales** → compilar circuito + activar prover

## Próximos Pasos

1. ✅ ~~Contracts desplegados~~
2. ⏳ Integrar UltraHonk verifier (Layer 1)
3. ⏳ Compilar circuito Noir
4. ⏳ Activar prover real en frontend
5. ⏳ Test end-to-end con pruebas ZK reales

## Más Información

- [Arquitectura Completa](./docs/arquitectura-proof-of-solvency-stellar.md)
- [Spec de Implementación](./docs/spec-implementacion-proof-of-solvency.md)
- [Guía de Contratos](./contracts/README.md)
- [Deployment Info](./DEPLOYMENT.md)
