# Veraz Testnet Testing Guide

**Date:** October 3, 2026
**Goal:** Execute 19 transactions on Stellar testnet to achieve Advanced PoC status

---

## Quick Start

### Prerequisites

✅ **Already Configured:**
- Stellar CLI installed
- Keys configured: `issuer`, `reserve1`, etc.
- Node.js environment ready

⏸️ **Needs Integration:**
- Proof generation from browser UI → CLI

---

## Testing Workflow

### Step 1: Generate Proof

**Option A: Use Browser UI** (Recommended for now)
```bash
# Start frontend
npm run dev

# Open http://localhost:5173/issuer
# Enter balances in UI
# Click "Generate Proof"
# Copy public_inputs and proof from browser console
```

**Option B: Use CLI** (TODO - needs prover.js integration)
```bash
# Not yet functional, needs integration
node generate-proof-cli.mjs \
  --balances 100,100,100,100,100,100,100,100 \
  --ledger $(stellar network container shared testnet | grep ledger | awk '{print $NF}')
```

---

### Step 2: Submit to Contract

Once you have `public_inputs` and `proof` from Step 1:

```bash
stellar contract invoke \
  --id CC5XFT7XZXKJEONWOBALJTSKYGGCV3I7TEA54FKZWEHSOMQHDOF53SGG \
  --network testnet \
  --source issuer \
  -- attest \
  --public_inputs <HEX_FROM_BROWSER> \
  --proof <HEX_FROM_BROWSER>
```

**Expected Output:**
```
Transaction hash: abc123...
Status: SUCCESS
```

---

### Step 3: Verify Result

```bash
stellar contract invoke \
  --id CC5XFT7XZXKJEONWOBALJTSKYGGCV3I7TEA54FKZWEHSOMQHDOF53SGG \
  --network testnet \
  -- is_solvent
```

**Expected Output:**
```json
{
  "solvent": true,
  "reserves": 1000,
  "sac_balance": 1000,
  "aquarius_balance": 0,
  "defindex_balance": 0,
  "liabilities": 800,
  "ledger_seq": 1234567,
  "timestamp": 1696320000
}
```

---

## Test Plan (19 Transactions)

### Phase 1: SAC Multi-Account (TX 2-10, 9 total)

#### TX 2: Uniform Distribution
```
Balances: [100, 100, 100, 100, 100, 100, 100, 100]
Total: 800
Expected: Solvent
```

#### TX 3: Skewed Distribution (Whale)
```
Balances: [500, 10, 10, 10, 10, 10, 10, 10]
Total: 570
Expected: Solvent
```

#### TX 4: With Zeros
```
Balances: [100, 0, 0, 50, 0, 30, 20, 0]
Total: 200
Expected: Solvent
```

#### TX 5: Small Liabilities
```
Balances: [1, 1, 1, 2, 1, 2, 1, 1]
Total: 10
Expected: Solvent (easy)
```

#### TX 6: Near-Boundary Solvency
```
Balances: [12, 12, 12, 13, 12, 13, 12, 12]
Total: 98
Reserves: 100
Expected: Solvent (2% margin)
```

#### TX 7: Exact Solvency
```
Balances: [12, 13, 12, 13, 12, 13, 12, 13]
Total: 100
Reserves: 100
Expected: Solvent (reserves == liabilities)
```

#### TX 8: Large Values
```
Balances: [1000, 2000, 1500, 800, 900, 1100, 700, 2000]
Total: 10000
Expected: Solvent (if reserves sufficient)
```

#### TX 9: All Equal Non-Round
```
Balances: [137, 137, 137, 137, 137, 137, 137, 137]
Total: 1096
Expected: Solvent
```

#### TX 10: Progressive Distribution
```
Balances: [10, 20, 30, 40, 50, 60, 70, 80]
Total: 360
Expected: Solvent
```

---

### Phase 2: Edge Cases (TX 11-15, 5 total)

#### TX 11: Stale Proof ❌
```bash
# Get current ledger
CURRENT=$(stellar network container shared testnet | grep ledger | awk '{print $NF}')
STALE=$((CURRENT - 150))

# Generate proof with stale ledger (150 ledgers ago)
# ledger_seq in proof: $STALE
# Submit to contract

# Expected: Error::StaleProof
```

#### TX 12: Replay Attempt ❌
```bash
# 1. Submit valid proof for ledger N (should succeed)
# 2. Immediately submit SAME proof again

# Expected:
#   First: SUCCESS
#   Second: Error::ReplayAttempt
```

#### TX 13: Invalid Proof ❌
```bash
# 1. Generate valid proof
# 2. Tamper with proof bytes (flip 1 byte)
# 3. Submit tampered proof

# Expected: Error::InvalidProof (verifier panic)
```

#### TX 14: Insolvency Detection ⚠️
```
Balances: [200, 200, 200, 200, 200, 200, 200, 200]
Total Liabilities: 1600
Reserves (SAC): ~100
Expected: solvent = false, but TX succeeds (attestation stored)
```

#### TX 15: Exact Boundary Test
```
Reserves: 100
Liabilities: 100
Expected: solvent = true (≥ operator, not >)
```

---

### Phase 3: Ledger Scenarios (TX 16-19, 4 total)

#### TX 16: Low Activity Period
```bash
# Execute at ~3am UTC
# Purpose: Test during low network activity
```

#### TX 17: High Activity Period
```bash
# Execute at ~6pm UTC
# Purpose: Test during peak network activity
# Compare gas costs vs TX 16
```

#### TX 18-19: Back-to-Back Proofs
```bash
# TX 18: ledger N
# Wait 2 ledgers (~12 seconds)
# TX 19: ledger N+2

# Purpose: Verify anti-replay works for close ledgers
```

---

## Current Integration Status

### ✅ What Works
- Contract deployed: `CC5XFT7XZXKJEONWOBALJTSKYGGCV3I7TEA54FKZWEHSOMQHDOF53SGG`
- Verifier deployed: `CAU5ZPZSJSASGEDMKPBQHL26AFEMH3DQWWTG52Y77L5NWWSECBHJAFKA`
- Frontend proof generation (browser)
- Stellar keys configured

### ⏸️ What Needs Integration
1. **CLI Proof Generation**
   - Current: Must use browser UI
   - Needed: `generate-proof-cli.mjs` integration with `src/lib/prover.js`
   - Blocker: Import path resolution (ES modules)

2. **Automated Testing**
   - Current: Manual copy-paste from browser console
   - Needed: Script to generate + submit in one command
   - Estimate: 2-3 hours to complete integration

---

## Integration Steps (For Developer)

### Step A: Fix generate-proof-cli.mjs

**Issue:** Cannot import from `src/lib/prover.js` due to module resolution

**Solution Options:**

**Option 1: Bundle prover.js for Node**
```bash
# Use esbuild or similar to create standalone bundle
npx esbuild src/lib/prover.js --bundle --platform=node --outfile=dist/prover-node.js
```

**Option 2: Use browser automation**
```bash
# Use puppeteer to automate browser proof generation
npm install puppeteer
# Script opens http://localhost:5173/issuer
# Fills in balances
# Extracts proof from console
```

**Option 3: Extract circuit logic**
```bash
# Create standalone prover using @noir-lang/noir_js directly
# Don't import from React components
# Copy just the Noir circuit logic
```

---

### Step B: Test One Transaction End-to-End

Once CLI proof generation works:

```bash
# 1. Generate proof
node generate-proof-cli.mjs --balances 100,100,100,100,100,100,100,100 --ledger 1234567

# 2. Submit (auto-generated command in submit-attestation.sh)
bash contracts/solvency_policy/submit-attestation.sh

# 3. Verify
stellar contract invoke \
  --id CC5XFT7XZXKJEONWOBALJTSKYGGCV3I7TEA54FKZWEHSOMQHDOF53SGG \
  --network testnet \
  -- is_solvent

# 4. Document in POC_TESTNET_VALIDATION.md
# - TX hash
# - Balances used
# - Result (solvent/insolvent)
# - Screenshot of events
```

---

### Step C: Automate Full Test Suite

Create `run-all-tests.sh`:
```bash
#!/bin/bash

# Array of test scenarios
declare -a tests=(
    "100,100,100,100,100,100,100,100  # Uniform"
    "500,10,10,10,10,10,10,10          # Skewed"
    "100,0,0,50,0,30,20,0              # With zeros"
    # ... etc
)

# Loop through tests
for test in "${tests[@]}"; do
    balances=$(echo $test | awk '{print $1}')
    comment=$(echo $test | cut -d'#' -f2)

    echo "Test: $comment"
    node generate-proof-cli.mjs --balances $balances --ledger $(get_current_ledger)
    bash contracts/solvency_policy/submit-attestation.sh
    sleep 5  # Wait for confirmation

    # Capture tx hash and save to POC_TESTNET_VALIDATION.md
done
```

---

## Quick Reference

### Get Current Ledger
```bash
stellar network container shared testnet 2>&1 | grep ledger | awk '{print $NF}'
```

### Query Contract State
```bash
stellar contract invoke \
  --id CC5XFT7XZXKJEONWOBALJTSKYGGCV3I7TEA54FKZWEHSOMQHDOF53SGG \
  --network testnet \
  -- is_solvent
```

### Check Reserve Balance
```bash
stellar contract invoke \
  --id CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC \
  --network testnet \
  -- balance \
  --id $(stellar keys address reserve1)
```

### View Transaction on Explorer
```
https://stellar.expert/explorer/testnet/tx/[TX_HASH]
```

---

## Troubleshooting

### Error: "NotInitialized"
**Cause:** Contract not initialized
**Fix:**
```bash
stellar contract invoke \
  --id CC5XFT7XZXKJEONWOBALJTSKYGGCV3I7TEA54FKZWEHSOMQHDOF53SGG \
  --network testnet \
  --source issuer \
  -- initialize \
  --config '{...}'  # Use deploy-config.json
```

### Error: "StaleProof"
**Cause:** Proof ledger_seq is > 100 ledgers old
**Fix:** Regenerate proof with current ledger sequence

### Error: "ReplayAttempt"
**Cause:** Same ledger_seq submitted twice
**Fix:** Generate new proof with fresh ledger_seq

### Error: "BadPublicInputs"
**Cause:**
1. Wrong length (not 96 bytes)
2. Reserve addresses hash mismatch

**Fix:** Check proof generation and ensure reserve_accounts in circuit match contract config

---

## Success Criteria

**To reach Advanced PoC (50-60% funding probability):**

- [ ] 19 transactions completed on testnet
- [ ] All tx hashes documented in POC_TESTNET_VALIDATION.md
- [ ] Screenshots of 3-4 key transactions
- [ ] Evidence of edge case handling (stale, replay, invalid proofs)
- [ ] Evidence of different solvency scenarios (solvent, insolvent, boundary)

**Timeline:** 1-2 weeks (depending on CLI integration time)

---

## Next Steps

1. **Immediate:** Choose integration approach for CLI proof generation
   - Recommended: Option 1 (bundle prover.js) - fastest
   - Alternative: Option 2 (puppeteer) - more reliable but slower

2. **Week 1:** Complete 10 SAC multi-account tests
   - Document all tx hashes
   - Take screenshots

3. **Week 2:** Complete 5 edge case + 4 ledger scenario tests
   - Focus on error handling validation
   - Document all results

4. **Week 2-3:** Update POC_TESTNET_VALIDATION.md with full evidence
   - All tx hashes with links to Stellar Expert
   - Event logs showing reserve breakdowns
   - Comparison table vs ZKELLA

---

**Document Owner:** Veraz Protocol Team
**Status:** Ready for execution (pending CLI integration)
**Last Updated:** October 3, 2026
