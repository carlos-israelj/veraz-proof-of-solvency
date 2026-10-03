# Veraz Testnet Validation Evidence

**Document Version:** 1.0
**Last Updated:** October 3, 2026
**Network:** Stellar Testnet
**Status:** In Progress (1/19 transactions completed)

---

## Executive Summary

This document provides cryptographic evidence of Veraz protocol validation on Stellar Testnet. All transactions are verifiable on public explorers.

**Current Status:**
- **Total Transactions:** 1 (target: 19)
- **Features Validated:** Basic shield operation
- **Period:** September 2026 - October 2026
- **Next Milestone:** Edge case testing (5 txs) + SAC multi-account (10 txs)

---

## Contract Addresses

### Deployed Contracts
- **Solvency Policy:** `CC5XFT7XZXKJEONWOBALJTSKYGGCV3I7TEA54FKZWEHSOMQHDOF53SGG`
- **UltraHonk Verifier:** `CAU5ZPZSJSASGEDMKPBQHL26AFEMH3DQWWTG52Y77L5NWWSECBHJAFKA` (Nethermind)
- **Reserve SAC (USDC):** `CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC`

### Reference Contracts (Not Tested on Testnet - Mainnet Only)
- **Aquarius Pool (USDC/XLM):** `CCGFVAHVN4XGY2SKWNCLBMIJ6EPT3FELLMIBQMVTC2DNVX3HPBA23OMU`
- **DeFindex Vault 1:** `CBJVBK63OET7AX4YBJVSCK3ZOF6PWIJAHXPWSIBJ2DRCOVNM3FFAQCF7`
- **DeFindex Vault 2:** `CBZKHUFO43WP3F3I455G7NY2LU3ST23W25QRWNK74VNาาᲐᲐᲐᲕՓ3DDWQ`
- **DeFindex Vault 3:** `CB57Eosvdslm7MPXVHL5HMV7VWPL46CTMYGZTY2WPકેDYWBUCLL7IC`

**Note:** Aquarius and DeFindex integrations work only on mainnet. Testnet validation focuses on SAC multi-account scenarios and edge cases to maximize proof depth.

---

## Transaction Log

### Phase 1: Basic Functionality (September 2026)

#### TX 1: First Successful Attestation ✅
- **Hash:** `ec9598c043bc04d0a6912b6e190d0762487aa87740462a72cea88d85bd009c4e`
- **Date:** September 22, 2026
- **Type:** Shield + Attest (basic solvency proof)
- **Balances:** [100, 200, 150, 80, 90, 110, 70, 200] (Total: 1000)
- **Reserves:** ~1000 (SAC only)
- **Result:** ✅ Solvent (reserves ≥ liabilities)
- **Explorer:** [View on StellarExpert](https://stellar.expert/explorer/testnet/tx/ec9598c043bc04d0a6912b6e190d0762487aa87740462a72cea88d85bd009c4e)

**Events Emitted:**
```
Event 1: (solvent: true, ledger_seq: [LEDGER])
Event 2: (sac_balance: [VALUE], aquarius_balance: 0, defindex_balance: 0, total_reserves: [VALUE])
```

---

### Phase 2: SAC Multi-Account Testing (October 2026 - Planned)

#### TX 2: Multiple Reserve Accounts (Planned)
- **Hash:** _Pending_
- **Type:** SAC with 3 reserve accounts
- **Config:** `reserve_accounts = [ADDR1, ADDR2, ADDR3]`
- **Expected Balances:** ADDR1=30 XLM, ADDR2=40 XLM, ADDR3=30 XLM
- **Expected Total:** sac_balance = 100 XLM
- **Status:** ⏳ Pending execution

#### TX 3: Empty Reserve Account (Planned)
- **Hash:** _Pending_
- **Type:** SAC with zero balance
- **Config:** `reserve_accounts = [ADDR_EMPTY]`
- **Expected:** sac_balance = 0, solvent = false
- **Status:** ⏳ Pending execution

#### TX 4-10: Various SAC Scenarios (Planned)
- Different account counts (1, 2, 3, 5 accounts)
- Different balance distributions
- Edge cases (very small balances, very large balances)
- **Status:** ⏳ Pending execution

---

### Phase 3: Edge Case Testing (October 2026 - Planned)

#### TX 11: Stale Proof Rejection (Planned)
- **Hash:** _Pending_
- **Type:** Error handling test
- **Scenario:** Proof with ledger_seq = current - 150 (outside 100-ledger window)
- **Expected:** `Error::StaleProof`
- **Status:** ⏳ Pending execution

#### TX 12: Replay Attempt Blocked (Planned)
- **Hash:** _Pending_
- **Type:** Anti-replay test
- **Scenario:** Submit same proof twice (same ledger_seq)
- **Expected:** Second attempt fails with `Error::ReplayAttempt`
- **Status:** ⏳ Pending execution

#### TX 13: Invalid Proof Rejection (Planned)
- **Hash:** _Pending_
- **Type:** Cryptographic verification test
- **Scenario:** Valid proof with 1 byte tampered
- **Expected:** `Error::InvalidProof` (panic from verifier)
- **Status:** ⏳ Pending execution

#### TX 14: Insolvency Detection (Planned)
- **Hash:** _Pending_
- **Type:** Solvency logic test
- **Scenario:** Reserves = 100, Liabilities (proof) = 150
- **Expected:** solvent = false, but tx succeeds (attestation stored)
- **Status:** ⏳ Pending execution

#### TX 15: Exact Solvency Boundary (Planned)
- **Hash:** _Pending_
- **Type:** Boundary condition test
- **Scenario:** Reserves = 100, Liabilities = 100
- **Expected:** solvent = true (≥ operator, not >)
- **Status:** ⏳ Pending execution

---

### Phase 4: Different Ledger Scenarios (October 2026 - Planned)

#### TX 16: Low Activity Period (Planned)
- **Hash:** _Pending_
- **Time:** ~3am UTC
- **Purpose:** Test during low network activity
- **Status:** ⏳ Pending execution

#### TX 17: High Activity Period (Planned)
- **Hash:** _Pending_
- **Time:** ~6pm UTC
- **Purpose:** Test during peak network activity
- **Status:** ⏳ Pending execution

#### TX 18-19: Back-to-Back Proofs (Planned)
- **Hash:** _Pending_
- **Scenario:** Two proofs in consecutive ledgers (N and N+2)
- **Purpose:** Verify anti-replay works for close ledgers
- **Status:** ⏳ Pending execution

---

## Validation Methodology

### Proof Generation
1. **Circuit:** Noir 1.0.0-beta.22 (`circuits/solvency/src/main.nr`)
2. **Backend:** UltraHonk via `@aztec/bb.js`
3. **Proving Time:** 3-5 seconds (browser, M1 Mac)
4. **Proof Size:** ~2-4 KB (constant, independent of holder count)

### Public Inputs Format (96 bytes)
```
Bytes 0-32:   Merkle root (Field, 32 bytes)
Bytes 32-64:  Total liabilities (i128, big-endian, last 16 bytes)
Bytes 64-96:  Ledger sequence (u32, big-endian, last 4 bytes)
```

### Verification Process
1. Solvency Policy parses public inputs
2. Validates freshness (current_ledger - ledger_seq < 100)
3. Validates anti-replay (ledger_seq > last_verified_seq)
4. Cross-contract call to UltraHonk Verifier
5. Reads reserves from SAC (+ Aquarius + DeFindex on mainnet)
6. Checks solvency: total_reserves ≥ liabilities
7. Stores attestation with breakdown

### Privacy Guarantees
- **Cryptographic Commitments:** Pedersen hash over BN254
- **Random Salts:** 256-bit per balance (generated via `crypto.getRandomValues()`)
- **Zero-Knowledge:** Verifier learns only: root, total liabilities, ledger_seq
- **No Balance Leakage:** Individual holder balances never revealed

---

## Comparison: Veraz vs ZKELLA

| Metric | ZKELLA | Veraz (Current) | Veraz (Target) |
|--------|--------|-----------------|----------------|
| **Testnet TXs** | 21 | 1 | 19 |
| **Circuits** | 7 | 1 | 1 |
| **Use Case** | General confidential finance | Proof of solvency | Proof of solvency |
| **Shield TXs** | 10 | 1 | 10+ |
| **Transfer TXs** | 1 (2x2) | 0 | 0 (not in scope) |
| **Swap TXs** | 6 (2 cycles) | 0 | 0 (not in scope) |
| **Governance TXs** | 8 (4 VK updates) | 0 | 0 (not in scope) |
| **Error Handling TXs** | Unknown | 0 | 5 |
| **Multi-Source TXs** | 0 | 0 | 10 (SAC multi-account) |
| **Period** | Aug-Sep 2026 (3 epochs) | Sep 2026 | Sep-Oct 2026 (2 epochs) |

**Key Insight:** ZKELLA has broader scope (7 primitives), Veraz has deeper validation in specific vertical (solvency).

---

## Known Limitations (Testnet)

### 1. Aquarius Integration ⚠️
- **Status:** Code implemented (`contracts/solvency_policy/src/aquarius.rs`)
- **Issue:** Aquarius pools only exist on mainnet
- **Workaround:** Test with SAC multi-account to simulate multi-source aggregation
- **Future:** Full testing post-mainnet deployment

### 2. DeFindex Integration ⚠️
- **Status:** Code implemented (`contracts/solvency_policy/src/defindex.rs`)
- **Issue:** DeFindex vaults only on mainnet
- **Workaround:** Same as Aquarius
- **Future:** Full testing post-mainnet deployment

### 3. Large Holder Counts ⚠️
- **Status:** Circuit supports N=8 holders (demo size)
- **Scalability:** Can scale to 64+ with circuit recompilation
- **Current:** Focus on proving correctness, not scale
- **Future:** Benchmark with 32, 64, 128 holders

### 4. Real USDC ⚠️
- **Status:** All tests use testnet XLM (not real value)
- **Future:** Mainnet testing with small USDC amounts ($10-50)

---

## Next Steps

### Immediate (Week 1-2)
- [ ] Execute TX 2-10 (SAC multi-account scenarios)
- [ ] Execute TX 11-15 (edge case testing)
- [ ] Execute TX 16-19 (ledger scenarios)
- [ ] Document all tx hashes and events

### Short-term (Week 3-4)
- [ ] Security scan (cargo audit, clippy)
- [ ] Add 15+ contract test cases
- [ ] Contact Nethermind for verifier feedback
- [ ] Contact DeFindex for partnership discussion

### Mid-term (Post-Audit, Week 8+)
- [ ] Mainnet deployment
- [ ] Real Aquarius pool testing
- [ ] Real DeFindex vault testing
- [ ] Multi-source aggregation validation

---

## Verification Instructions

All transactions can be independently verified:

### Method 1: StellarExpert
```
https://stellar.expert/explorer/testnet/tx/[TX_HASH]
```

### Method 2: StellarChain
```
https://testnet.stellarchain.io/transactions/[TX_HASH]
```

### Method 3: Soroban RPC
```bash
stellar contract invoke \
  --id CC5XFT7XZXKJEONWOBALJTSKYGGCV3I7TEA54FKZWEHSOMQHDOF53SGG \
  --network testnet \
  -- is_solvent
```

Returns latest attestation:
```rust
Attestation {
    solvent: bool,
    reserves: i128,
    sac_balance: i128,
    aquarius_balance: i128,
    defindex_balance: i128,
    liabilities: i128,
    ledger_seq: u32,
    timestamp: u64
}
```

---

## Audit Trail

### Internal Reviews
- **Date:** October 3, 2026
- **Reviewer:** [Your Name]
- **Scope:** Contract logic, proof generation, edge cases
- **Issues Found:** 0 (initial deployment)
- **Status:** Pending external review

### Planned External Reviews
- **Soroban Audit Bank:** Planned (post-testnet validation)
- **Nethermind Review:** Requested (verifier integration feedback)
- **DeFindex Review:** Requested (vault integration feedback)

---

## Appendix A: Test Scripts

### Edge Case Testing
- **Script:** `test-edge-cases.mjs`
- **Purpose:** Automated testing of error paths
- **Usage:** `node test-edge-cases.mjs`
- **Status:** Framework complete, awaiting wallet integration

### Multi-Account Testing
- **Script:** TBD
- **Purpose:** SAC multi-account scenarios
- **Status:** Planned

---

## Appendix B: Contract Configuration

### Current Testnet Config
```javascript
{
  "verifier": "CAU5ZPZSJSASGEDMKPBQHL26AFEMH3DQWWTG52Y77L5NWWSECBHJAFKA",
  "reserve_sac": "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC",
  "reserve_accounts": [
    "GDWIVL2VQOR67L4F7BTPK5DI47EZHGHBQAY62RSMZDUZF2A7SGJLWRJ6"
  ],
  "freshness_window": 100,
  "aquarius_pools": [],
  "defindex_vaults": []
}
```

### Planned Mainnet Config
```javascript
{
  "verifier": "[MAINNET_VERIFIER_ADDRESS]",
  "reserve_sac": "[MAINNET_USDC_SAC]",
  "reserve_accounts": [
    "[ISSUER_COLD_WALLET_1]",
    "[ISSUER_COLD_WALLET_2]",
    "[ISSUER_HOT_WALLET]"
  ],
  "freshness_window": 100,
  "aquarius_pools": [
    "CCGFVAHVN4XGY2SKWNCLBMIJ6EPT3FELLMIBQMVTC2DNVX3HPBA23OMU"
  ],
  "defindex_vaults": [
    "CBJVBK63OET7AX4YBJVSCK3ZOF6PWIJAHXPWSIBJ2DRCOVNM3FFAQCF7",
    "CBZKHUFO43WP3F3I455G7NY2LU3ST23W25QRWNK74VNVXM5B3DDWQ",
    "CB57Eosvdslm7MPXVHL5HMV7VWPL46CTMYGZTY2WPKPDYWBUCLL7IC"
  ]
}
```

---

**Document Maintained By:** Veraz Protocol Team
**Contact:** [Email/Discord/GitHub]
**Last Transaction:** October 3, 2026
**Next Update:** After Phase 2 completion (TX 2-10)
