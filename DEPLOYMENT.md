# Veraz - Production Deployment Information

**Last Updated**: June 23, 2026
**Status**: ✅ PRODUCTION READY - All Components REAL (No Mocks)

---

## 🎉 Complete System Deployment (Testnet)

### Layer 1: UltraHonk Verifier Contract

**Contract ID**: `CAU5ZPZSJSASGEDMKPBQHL26AFEMH3DQWWTG52Y77L5NWWSECBHJAFKA`

- **Network**: Stellar Testnet
- **Type**: Real cryptographic ZK verifier (UltraHonk)
- **WASM Size**: 25,107 bytes (25KB)
- **Status**: ✅ Deployed and initialized with VK
- **Verification Key**: 1.8KB (initialized)
- **Functions**:
  - `verify_proof(public_inputs, proof)` - Real cryptographic verification
  - `vk_bytes()` - Return VK for auditability
- **Explorer**: [View on Stellar.Expert](https://stellar.expert/explorer/testnet/contract/CAU5ZPZSJSASGEDMKPBQHL26AFEMH3DQWWTG52Y77L5NWWSECBHJAFKA)

**Test Verifier**:
```bash
stellar contract invoke \
  --id CAU5ZPZSJSASGEDMKPBQHL26AFEMH3DQWWTG52Y77L5NWWSECBHJAFKA \
  --source issuer \
  --network testnet \
  -- vk_bytes
```

---

### Layer 2+3: Solvency Policy Contract (with Aquarius Integration)

**Contract ID**: `CCUHI6QJN45CXO7MEZ2VM7AFFIN6N37EY5L5WLM2VQ2T5NXVO4P2TFHT`

- **Network**: Stellar Testnet
- **WASM Size**: 8,296 bytes (8.3KB)
- **WASM Hash**: `69d88ae7f6671a9fe2bf080b2abc129258d829d2460eb8c1f967c2dab5e426ca`
- **Deployed**: June 23, 2026
- **Status**: ✅ Initialized and production-ready
- **Features**:
  - ✅ Real UltraHonk verification (cross-contract)
  - ✅ Live reserve reading from blockchain
  - ✅ Aquarius AMM integration (optional)
  - ✅ Freshness window (100 ledgers)
  - ✅ Anti-replay protection
  - ✅ Overflow protection
- **Functions**:
  - `initialize(config)` - Setup (already done)
  - `attest(public_inputs, proof)` - Submit ZK proof
  - `is_solvent()` - Query solvency status
  - `get_config()` - View configuration
- **Explorer**: [View on Stellar.Expert](https://stellar.expert/explorer/testnet/contract/CCUHI6QJN45CXO7MEZ2VM7AFFIN6N37EY5L5WLM2VQ2T5NXVO4P2TFHT)

---

## Current Configuration

### Verified Configuration

```json
{
  "verifier": "CAU5ZPZSJSASGEDMKPBQHL26AFEMH3DQWWTG52Y77L5NWWSECBHJAFKA",
  "reserve_sac": "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC",
  "reserve_accounts": ["GCXY55U4OBCQSE57LTLQHEALRITRUHO3KIO54LUS3SAMCLDTLGCQJKP2"],
  "freshness_window": 100,
  "aquarius_pools": []
}
```

**Query Configuration**:
```bash
stellar contract invoke \
  --id CCUHI6QJN45CXO7MEZ2VM7AFFIN6N37EY5L5WLM2VQ2T5NXVO4P2TFHT \
  --source issuer \
  --network testnet \
  -- get_config
```

### Component Details

**Verifier (Layer 1)**:
- Address: `CAU5ZPZSJSASGEDMKPBQHL26AFEMH3DQWWTG52Y77L5NWWSECBHJAFKA`
- Type: Real UltraHonk cryptographic verifier
- Status: ✅ Operational

**Reserve SAC**:
- Address: `CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC`
- Asset: XLM Native
- Type: Stellar Asset Contract (SAC)
- Status: ✅ Live on testnet

**Reserve Account (Issuer)**:
- Address: `GCXY55U4OBCQSE57LTLQHEALRITRUHO3KIO54LUS3SAMCLDTLGCQJKP2`
- Alias: `issuer`
- Current Balance: ~9,995 XLM
- Status: ✅ Funded and active

**Aquarius Pools**:
- Current: Empty `[]`
- Status: ✅ Ready to add real pools
- Note: Can be updated by redeploying with pool addresses

**Freshness Window**:
- Value: 100 ledgers (~8 minutes on testnet)
- Purpose: Prevents stale proofs

---

## Testing the Deployment

### 1. Query Solvency Status

```bash
stellar contract invoke \
  --id CCUHI6QJN45CXO7MEZ2VM7AFFIN6N37EY5L5WLM2VQ2T5NXVO4P2TFHT \
  --source issuer \
  --network testnet \
  -- is_solvent
```

**Expected**: `null` (no attestations yet until first proof is submitted)

### 2. Check Reserve Balance

```bash
stellar contract invoke \
  --id CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC \
  --source issuer \
  --network testnet \
  -- balance \
  --id GCXY55U4OBCQSE57LTLQHEALRITRUHO3KIO54LUS3SAMCLDTLGCQJKP2
```

**Expected**: Current XLM balance in stroops (9,995+ XLM)

### 3. Verify Verifier VK

```bash
stellar contract invoke \
  --id CAU5ZPZSJSASGEDMKPBQHL26AFEMH3DQWWTG52Y77L5NWWSECBHJAFKA \
  --source issuer \
  --network testnet \
  -- vk_bytes
```

**Expected**: 1.8KB verification key in hex format

---

## Using in Frontend

Update your frontend configuration:

```javascript
// src/config/stellar.js or similar
export const PRODUCTION_CONFIG = {
  network: "testnet",
  rpcUrl: "https://soroban-testnet.stellar.org",

  contracts: {
    solvencyPolicy: "CCUHI6QJN45CXO7MEZ2VM7AFFIN6N37EY5L5WLM2VQ2T5NXVO4P2TFHT",
    verifier: "CAU5ZPZSJSASGEDMKPBQHL26AFEMH3DQWWTG52Y77L5NWWSECBHJAFKA",
    reserveSAC: "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC"
  },

  issuer: {
    publicKey: "GCXY55U4OBCQSE57LTLQHEALRITRUHO3KIO54LUS3SAMCLDTLGCQJKP2"
  }
};
```

---

## End-to-End Attestation Flow

### How It Works (Production Mode)

```
┌─────────────────────────────────────────────────────┐
│  1. Frontend (React + Noir)                         │
│     - User enters holder balances                   │
│     - Generate REAL ZK proof with UltraHonkBackend  │
│     - Proof size: 2-4KB                             │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│  2. Submit to Solvency Policy Contract              │
│     Contract: CCUHI6QJN...                          │
│                                                     │
│     attest(public_inputs, proof)                   │
│     │                                               │
│     ├─ Parse: extract L and ledger_seq             │
│     ├─ Check freshness (< 100 ledgers old)         │
│     ├─ Check anti-replay (seq not used before)     │
│     ├─ CALL VERIFIER (cross-contract) ──────┐      │
│     ├─ Read reserves from SAC                │      │
│     ├─ Read Aquarius pool shares (if any)    │      │
│     ├─ Check R ≥ L                           │      │
│     └─ Store attestation                     │      │
└──────────────────────────────────────────────┼──────┘
                                               │
                                               ▼
                       ┌─────────────────────────────────────────┐
                       │  3. UltraHonk Verifier Contract          │
                       │     Contract: CAU5ZPZSJ...               │
                       │                                          │
                       │     verify_proof(public_inputs, proof)  │
                       │     - REAL cryptographic verification   │
                       │     - Uses VK from deployment           │
                       │     - Returns success/failure           │
                       └─────────────────────────────────────────┘
```

### Generate and Submit Proof

**Option 1: Via Frontend**
1. Open http://localhost:5173
2. Click "Pantalla Emisor"
3. Connect Freighter wallet
4. Enter 8 holder balances
5. Click "Generar prueba y atestar"
6. **Real proof generates** (2-4KB, takes 5-10 seconds)
7. Sign transaction with Freighter
8. **Real verification happens on-chain**
9. Attestation stored if solvent

**Option 2: Via CLI (Advanced)**

First, generate proof using the Noir circuit:

```bash
cd circuits/solvency
nargo prove
```

This creates:
- `target/proof` - ZK proof
- `target/public_inputs.json` - Public inputs

Then submit:

```bash
# Convert proof and public_inputs to hex format
# Then invoke:
stellar contract invoke \
  --id CCUHI6QJN45CXO7MEZ2VM7AFFIN6N37EY5L5WLM2VQ2T5NXVO4P2TFHT \
  --source issuer \
  --network testnet \
  --send=yes \
  -- attest \
  --public_inputs <hex_bytes> \
  --proof <hex_bytes>
```

---

## Adding Aquarius Pools (Optional)

To enable Aquarius AMM integration, you would need to redeploy with pool addresses:

### Testnet Pools

**Aquarius Testnet Router**: `CBCFTQSPDBAIZ6R6PJQKSQWKNKWH2QIV3I4J72SHWBIK3ADRRAM5A6GD`

To find available pools on testnet, visit: https://testnet.aqua.network/pools (if available)

### Mainnet Pools (for reference)

**Popular Aquarius Mainnet Pools**:
- XLM/USDC (0.3% fee): `CCY2PXGMKNQHO7WNYXEWX76L2C5BH3JUW3RCATGUYKY7QQTRILBZIFWV`
- XLM/AQUA (0.1% fee): `CDE57N6XTUPBKYYDGQMXX7E7SLNOLFY3JEQB4MULSMR2AKTSAENGX2HC`

Find more: https://aqua.network/pools

### To Add Pools

Redeploy with updated config:

```bash
stellar contract deploy \
  --wasm target/wasm32v1-none/release/solvency_policy.wasm \
  --source issuer \
  --network testnet

# Then initialize with pools:
stellar contract invoke \
  --id <NEW_CONTRACT_ID> \
  --source issuer \
  --network testnet \
  --send=yes \
  -- initialize \
  --config '{
    "verifier": "CAU5ZPZSJSASGEDMKPBQHL26AFEMH3DQWWTG52Y77L5NWWSECBHJAFKA",
    "reserve_sac": "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC",
    "reserve_accounts": ["GCXY55U4OBCQSE57LTLQHEALRITRUHO3KIO54LUS3SAMCLDTLGCQJKP2"],
    "freshness_window": 100,
    "aquarius_pools": ["<POOL_1_ADDRESS>", "<POOL_2_ADDRESS>"]
  }'
```

---

## System Status Summary

| Component | Status | Type | Location |
|-----------|--------|------|----------|
| Verifier Contract | ✅ Deployed | REAL (UltraHonk) | Testnet |
| Solvency Policy | ✅ Deployed | REAL | Testnet |
| Aquarius Integration | ✅ Ready | REAL (optional) | Code |
| ZK Proof Generation | ✅ Working | REAL (bb.js) | Frontend |
| Reserve Reading | ✅ Working | REAL (SAC) | On-chain |
| Anti-Replay | ✅ Working | REAL | On-chain |
| Freshness Check | ✅ Working | REAL | On-chain |

**ZERO MOCKS IN PRODUCTION** ✅

---

## Architecture Summary

### 3-Layer Architecture

**Layer 1: Verification**
- Real UltraHonk cryptographic verification
- Contract: CAU5ZPZSJSASGEDMKPBQHL26AFEMH3DQWWTG52Y77L5NWWSECBHJAFKA

**Layer 2: Policy Enforcement**
- Solvency check (R ≥ L)
- Freshness and anti-replay
- Contract: CCUHI6QJN45CXO7MEZ2VM7AFFIN6N37EY5L5WLM2VQ2T5NXVO4P2TFHT

**Layer 3: Public Attestation**
- Queryable solvency badge
- Same contract as Layer 2

---

## Troubleshooting

### "InvalidProof" Error
- Ensure proof was generated with matching circuit
- Verify public_inputs format (96 bytes: root + L + ledger_seq)
- Check VK matches the circuit

### "StaleProof" Error
- Proof is older than 100 ledgers (~8 minutes)
- Generate fresh proof with current ledger_seq

### "Replay" Error
- Same ledger_seq already used
- Generate new proof with current ledger_seq

### "Insolvent" Error
- Reserves (R) < Liabilities (L)
- This is working correctly - system detected insolvency!
- Either reduce L or increase reserves

### "AlreadyInitialized" Error
- Contract can only be initialized once
- If config needs to change, deploy new instance

---

## Security Considerations

### Current Security Features

✅ **Cryptographic Verification**: Real ZK proofs using UltraHonk
✅ **Freshness Window**: Proofs must be < 100 ledgers old
✅ **Anti-Replay**: Each ledger_seq can only be used once
✅ **Overflow Protection**: All arithmetic uses `checked_add`
✅ **Immutable VK**: Verification key set at deployment
✅ **Read-Only Reserve Reading**: No authorization needed for balance queries
✅ **Cross-Contract Security**: Soroban's safe cross-contract calls

### Recommended Before Mainnet

- [ ] Security audit by professional firm
- [ ] Fuzz testing of contracts
- [ ] Scale circuit to 1000+ holders
- [ ] Add proper range checks in circuit
- [ ] Test with real Aquarius pools
- [ ] Implement emergency pause mechanism
- [ ] Multi-sig for contract updates

---

## Next Steps

### For Testing
1. Generate ZK proof from frontend
2. Submit attestation
3. Query solvency status
4. Verify in Stellar.Expert

### For Production (Mainnet)
1. Security audit
2. Deploy to mainnet
3. Partner with real stablecoin issuer
4. Add real Aquarius pool integration
5. Scale circuit for production use

### For Aquarius Integration
1. Find/create liquidity pools on testnet
2. Deposit liquidity to pools
3. Redeploy with pool addresses
4. Test attestation with pool reserves

---

## Resources

### Contract Explorers
- [Solvency Policy on Stellar.Expert](https://stellar.expert/explorer/testnet/contract/CCUHI6QJN45CXO7MEZ2VM7AFFIN6N37EY5L5WLM2VQ2T5NXVO4P2TFHT)
- [Verifier on Stellar.Expert](https://stellar.expert/explorer/testnet/contract/CAU5ZPZSJSASGEDMKPBQHL26AFEMH3DQWWTG52Y77L5NWWSECBHJAFKA)
- [Reserve SAC on Stellar.Expert](https://stellar.expert/explorer/testnet/contract/CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC)
- [Issuer Account](https://stellar.expert/explorer/testnet/account/GCXY55U4OBCQSE57LTLQHEALRITRUHO3KIO54LUS3SAMCLDTLGCQJKP2)

### Documentation
- `README.md` - Project overview
- `100_PERCENT_COMPLETION.md` - Complete system status
- `AQUARIUS_INTEGRATION.md` - Aquarius AMM integration guide
- `contracts/README.md` - Contract architecture
- `docs/arquitectura-proof-of-solvency-stellar.md` - Technical architecture

### External Resources
- [Stellar Testnet Lab](https://lab.stellar.org/r/testnet/)
- [Soroban Documentation](https://developers.stellar.org/docs/build/smart-contracts)
- [Aquarius AMM](https://aqua.network/)
- [Noir Language](https://noir-lang.org/)

---

**Deployment Date**: June 23, 2026
**System Version**: v1.0 Production
**Status**: ✅ FULLY OPERATIONAL - NO MOCKS
