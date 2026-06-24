# Veraz - Quick Reference Card

**Network**: Stellar Testnet
**Status**: ✅ Production Ready (No Mocks + Aquarius)
**Updated**: June 23, 2026

---

## 📝 Contract Addresses

```bash
# Solvency Policy (Main contract - WITH AQUARIUS)
CD5DKPLYH3XCJ2UP5H456SBZNKVC5E2OL45JJCB4OEQIBWAICC2HABTB

# UltraHonk Verifier (ZK verification)
CAU5ZPZSJSASGEDMKPBQHL26AFEMH3DQWWTG52Y77L5NWWSECBHJAFKA

# Reserve SAC (XLM Native)
CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC

# Reserve Account (Issuer)
GCXY55U4OBCQSE57LTLQHEALRITRUHO3KIO54LUS3SAMCLDTLGCQJKP2

# Aquarius Pools (Testnet - REAL)
# Pool 1: XLM/AQUA
CBEPUTV5IJHR75PKITMFDCWTTKEHLWDEUOARPNVIW52A3AHK7OLIFCEK

# Pool 2: USDC/AQUA
CDG2O3AM2NKHOWJHCXMOFBI4RL4INYIW3N4YZYI3UOOCEULOJML276BJ
```

---

## 🚀 Common Commands

### Query Solvency Status
```bash
stellar contract invoke \
  --id CD5DKPLYH3XCJ2UP5H456SBZNKVC5E2OL45JJCB4OEQIBWAICC2HABTB \
  --source issuer --network testnet -- is_solvent
```

### Query Configuration (Shows Aquarius Pools)
```bash
stellar contract invoke \
  --id CD5DKPLYH3XCJ2UP5H456SBZNKVC5E2OL45JJCB4OEQIBWAICC2HABTB \
  --source issuer --network testnet -- get_config
```

### Check Reserve Balance
```bash
stellar contract invoke \
  --id CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC \
  --source issuer --network testnet \
  -- balance --id GCXY55U4OBCQSE57LTLQHEALRITRUHO3KIO54LUS3SAMCLDTLGCQJKP2
```

### Verify Verifier VK
```bash
stellar contract invoke \
  --id CAU5ZPZSJSASGEDMKPBQHL26AFEMH3DQWWTG52Y77L5NWWSECBHJAFKA \
  --source issuer --network testnet -- vk_bytes
```

---

## 🔧 Development Commands

### Run Tests
```bash
cd contracts/solvency_policy
cargo test
```

### Build Contract
```bash
cd contracts/solvency_policy
stellar contract build
```

### Deploy Contract
```bash
stellar contract deploy \
  --wasm target/wasm32v1-none/release/solvency_policy.wasm \
  --source issuer --network testnet
```

---

## 📊 Frontend Config

```javascript
export const CONFIG = {
  network: "testnet",
  rpcUrl: "https://soroban-testnet.stellar.org",

  contracts: {
    // UPDATED: New contract with Aquarius pools
    solvencyPolicy: "CD5DKPLYH3XCJ2UP5H456SBZNKVC5E2OL45JJCB4OEQIBWAICC2HABTB",
    verifier: "CAU5ZPZSJSASGEDMKPBQHL26AFEMH3DQWWTG52Y77L5NWWSECBHJAFKA",
    reserveSAC: "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC"
  },

  issuer: "GCXY55U4OBCQSE57LTLQHEALRITRUHO3KIO54LUS3SAMCLDTLGCQJKP2",

  // Aquarius pools (optional)
  aquariusPools: [
    "CBEPUTV5IJHR75PKITMFDCWTTKEHLWDEUOARPNVIW52A3AHK7OLIFCEK", // XLM/AQUA
    "CDG2O3AM2NKHOWJHCXMOFBI4RL4INYIW3N4YZYI3UOOCEULOJML276BJ"  // USDC/AQUA
  ]
};
```

---

## 🌐 Explorer Links

- [Solvency Policy (with Aquarius)](https://stellar.expert/explorer/testnet/contract/CD5DKPLYH3XCJ2UP5H456SBZNKVC5E2OL45JJCB4OEQIBWAICC2HABTB)
- [Verifier](https://stellar.expert/explorer/testnet/contract/CAU5ZPZSJSASGEDMKPBQHL26AFEMH3DQWWTG52Y77L5NWWSECBHJAFKA)
- [Reserve SAC](https://stellar.expert/explorer/testnet/contract/CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC)
- [Issuer Account](https://stellar.expert/explorer/testnet/account/GCXY55U4OBCQSE57LTLQHEALRITRUHO3KIO54LUS3SAMCLDTLGCQJKP2)

---

## ⚡ Quick Facts

- **Verifier Type**: Real UltraHonk (No Mock)
- **Reserve Asset**: XLM Native (~9,995 XLM)
- **Freshness Window**: 100 ledgers (~8 minutes)
- **Aquarius Pools**: Ready (currently empty)
- **Test Coverage**: 11/11 passing
- **WASM Sizes**: Verifier 25KB, Policy 8.3KB

---

## 🎯 System Architecture

```
Frontend (React + bb.js)
    ↓ Generate ZK Proof
Solvency Policy Contract (CCUHI6...)
    ↓ Cross-contract call
UltraHonk Verifier (CAU5ZP...)
    ↓ Verify proof
    ↓ Read reserves
Reserve SAC (CDLZFC...)
    ↓ Query balance
Reserve Account (GCXY55...)
```

---

## 📖 Documentation

- `README.md` - Full project overview
- `DEPLOYMENT.md` - Complete deployment guide
- `PRODUCTION_DEPLOYMENT.md` - Production status
- `AQUARIUS_INTEGRATION.md` - Aquarius AMM guide
- `100_PERCENT_COMPLETION.md` - System completion

---

**Last Updated**: June 23, 2026
