# Veraz E2E Testing Guide - Frontend Proof Generation & Submission

**Date**: September 28, 2026
**Status**: Ready for Testing
**Live URL**: https://veraz-pos.xyz

---

## What We're Testing

This end-to-end test will validate the complete Veraz workflow:

1. ✅ **Frontend** - Generate ZK proof in browser
2. ✅ **Smart Contract** - Submit proof to testnet
3. ✅ **Verification** - Query attestation from contract
4. ✅ **API** - Read attestation via REST API

---

## Prerequisites

### 1. Freighter Wallet

**Required**: Stellar Freighter wallet extension

- **Install**: https://www.freighter.app/
- **Network**: Testnet
- **Funding**: Need testnet XLM for transaction fees

**Get Testnet XLM**:
```
Visit: https://laboratory.stellar.org/#account-creator?network=test
Enter your Freighter public key
Click "Get Test Network Lumens"
```

### 2. Browser Requirements

- **Recommended**: Chrome or Edge (best WASM support)
- **Requirements**:
  - SharedArrayBuffer support (enabled by default in modern browsers)
  - At least 2GB RAM available
  - Good internet connection (proof generation takes 3-5 seconds)

---

## Step-by-Step E2E Test

### Step 1: Open Veraz App

1. Navigate to https://veraz-pos.xyz
2. Click **"Issuer"** button on landing page
3. You should see the Issuer flow with 3 steps

### Step 2: Connect Wallet

1. Click **"Connect Freighter Wallet"** button
2. Approve connection in Freighter popup
3. **Verify**: Your public key should appear at top
4. **Verify**: You should see Step 1 complete

### Step 3: Configure Proof Inputs

**Default Balances** (pre-filled):
```
100000, 50000, 25000, 75000, 30000, 20000, 60000, 40000
```

**What these mean**:
- 8 holder balances (circuit requires exactly 8)
- Total liabilities: 400,000 stroops = 40 USDC
- These will be proven WITHOUT revealing individual amounts

**Contract Address** (pre-filled):
```
CCKXS7YK6H2NAQC4K3TJJMFMKCH7COPFDVSRLZZSZV4RKOEXFVHE7PX6
```

This is the deployed Solvency Policy contract on testnet.

**Options**:
- Keep defaults (recommended for first test)
- Or customize balances (must be exactly 8 comma-separated numbers)

### Step 4: Generate & Submit Proof

1. Click **"Generate Proof"** button
2. **Wait 3-5 seconds** - You'll see:
   - "Generating zero-knowledge proof..." message
   - Progress indicator
   - Console logs (open DevTools to see details)

3. **Proof Generation Complete** - You'll see:
   - "Proof generated successfully!"
   - Proof size displayed (should be ~14.6 KB)

4. **Transaction Signing** - Freighter will popup:
   - **Review** transaction details
   - **Verify** it's calling `attest` method
   - **Sign** transaction (will cost ~2-3 XLM in fees)

5. **Submission** - Wait 5-10 seconds:
   - Transaction sent to testnet
   - Waiting for confirmation
   - Contract verification running

6. **Success!** - You should see:
   - ✅ "Proof verified and submitted!"
   - Transaction hash displayed
   - Link to Stellar Expert explorer

### Step 5: Verify On-Chain

**Option A: Via Frontend (Auditor View)**

1. Click **"Back"** button
2. Click **"Auditor"** button
3. Paste contract address: `CCKXS7YK6H2NAQC4K3TJJMFMKCH7COPFDVSRLZZSZV4RKOEXFVHE7PX6`
4. Click **"Verify"**
5. **Expected Result**: Attestation card showing:
   - Status: ✅ Solvent
   - Reserves: 100,000 stroops (10 USDC from SAC wallet)
   - Liabilities: 400,000 stroops (40 USDC from proof)
   - Solvency Ratio: 0.25 (insolvent because reserves < liabilities)
   - Multi-source breakdown

**Option B: Via API**

```bash
# Query solvency endpoint
curl https://veraz-api.example.com/api/v1/protocols/CCKXS7YK6H2NAQC4K3TJJMFMKCH7COPFDVSRLZZSZV4RKOEXFVHE7PX6/solvency

# Expected response
{
  "success": true,
  "data": {
    "protocol_id": "CCKXS7Y...HE7PX6",
    "status": "insolvent",
    "solvency_ratio": 0.25,
    "attestation": {
      "solvent": false,
      "reserves": "100000000000",
      "liabilities": "400000000000",
      "ledger_seq": 4922000,
      "timestamp": "2026-09-28T..."
    },
    "reserve_breakdown": {
      "sac_balance": "100000000000",
      "aquarius_balance": "0",
      "defindex_balance": "0",
      "total": "100000000000"
    }
  }
}
```

**Option C: Via Stellar Expert**

1. Click transaction link from success screen
2. View on https://stellar.expert/explorer/testnet
3. See contract invocation details
4. Verify `attest` method was called
5. Check transaction status: SUCCESS

---

## Expected Results

### ✅ Successful Test

**Frontend**:
- [x] Wallet connected
- [x] Proof generated in 3-5 seconds
- [x] Transaction signed via Freighter
- [x] Confirmation received
- [x] Transaction hash displayed

**On-Chain**:
- [x] Contract method: `attest` called
- [x] Public inputs: 96 bytes (Merkle root + liabilities + ledger)
- [x] Proof: ~14.6 KB (UltraHonk)
- [x] Verification: PASSED
- [x] Attestation stored
- [x] Status: INSOLVENT (expected with default values)

**Why Insolvent?**
- Reserves: 100,000 stroops (from testnet SAC wallet)
- Liabilities: 400,000 stroops (from proof)
- 100,000 < 400,000 → INSOLVENT

This is **correct behavior** - the contract validates that reserves < liabilities.

### ⚠️ To Make it Solvent

**Option 1**: Fund the reserve wallet
```bash
# Send USDC to reserve account
# Reserve account: GCY4CQHYSGI2MKE24R6ASMSX6EN6VQDYQZIC2NG3FSLJML6ELPFQAPKT
# Need: 400,000 stroops (40 USDC) to match liabilities
```

**Option 2**: Use smaller liabilities
```
Balances: 5000, 2500, 1000, 500, 250, 100, 50, 25
Total: 9,425 stroops < 100,000 stroops reserves
Result: SOLVENT ✅
```

---

## Troubleshooting

### Issue 1: Wallet Won't Connect

**Symptoms**: "Failed to connect Freighter"

**Solutions**:
- Install Freighter extension
- Refresh page
- Check browser console for errors
- Try incognito mode

### Issue 2: Proof Generation Fails

**Symptoms**: "Proof generation failed"

**Solutions**:
- Check exactly 8 balances provided
- Check numbers are positive integers
- Open DevTools console for detailed error
- Try with default values first

### Issue 3: Transaction Fails

**Symptoms**: "Transaction failed" or "Simulation error"

**Solutions**:
- Check you have testnet XLM (need ~3 XLM for fees)
- Verify contract address is correct
- Check network is Testnet in Freighter
- Wait 30 seconds and retry

### Issue 4: "Stale Proof" Error

**Symptoms**: `Error(Contract, #10): Prueba obsoleta`

**Cause**: Proof took too long to generate, ledger_seq is outdated

**Solutions**:
- Close other tabs/applications
- Use faster computer/connection
- Try again (freshness window is 100 ledgers ~8 minutes)

### Issue 5: "Replay Detected" Error

**Symptoms**: `Error(Contract, #11): Replay detectado`

**Cause**: Same ledger_seq used twice

**Solutions**:
- Wait for next ledger (~5 seconds)
- Try again with new proof

---

## Data to Collect During Test

### Test Metrics

- [ ] **Proof generation time**: _____ seconds
- [ ] **Proof size**: _____ KB (expected ~14.6 KB)
- [ ] **Transaction fee**: _____ XLM
- [ ] **Transaction hash**: _____________________
- [ ] **Ledger sequence**: ___________
- [ ] **Solvency status**: SOLVENT / INSOLVENT
- [ ] **Reserves found**: _____ stroops
- [ ] **Liabilities proven**: _____ stroops

### Screenshots to Capture

1. **Step 1**: Wallet connected screen
2. **Step 2**: Proof inputs screen
3. **Step 3**: Proof generating progress
4. **Step 4**: Freighter signing popup
5. **Step 5**: Success screen with TX hash
6. **Step 6**: Auditor view showing attestation
7. **Step 7**: Stellar Expert transaction details

---

## Post-Test Actions

### 1. Document Results

Create file: `E2E_TEST_RESULTS_[DATE].md`

Include:
- All metrics collected
- Screenshots
- Transaction hash
- Any errors encountered
- Observations

### 2. Verify API Integration

Once API is deployed, test:
```bash
# Test solvency endpoint
curl https://api.veraz.io/api/v1/protocols/CCKXS7Y.../solvency

# Test reserves endpoint
curl https://api.veraz.io/api/v1/protocols/CCKXS7Y.../reserves

# Test attestations endpoint
curl https://api.veraz.io/api/v1/protocols/CCKXS7Y.../attestations
```

### 3. Update Documentation

Add E2E test results to:
- `docs/progress/WEEK3_SESSION_SUMMARY.md`
- `docs/technical/E2E_VERIFICATION_[DATE].md`

---

## Success Criteria

✅ **Test Passes If**:
- [x] Proof generates in browser (3-10 seconds)
- [x] Transaction submits successfully
- [x] Contract verifies proof (no errors)
- [x] Attestation queryable on-chain
- [x] Multi-source reserves aggregated
- [x] Solvency status correct (solvent/insolvent)

---

## Next Steps After Successful Test

1. **Try Different Scenarios**:
   - Solvent case (small liabilities)
   - Insolvent case (large liabilities)
   - Edge cases (all zeros, max values)

2. **Performance Testing**:
   - Measure proof generation time
   - Test on different devices
   - Test with slow connection

3. **Integration Testing**:
   - API queries after submission
   - Multiple proofs in sequence
   - Concurrent proof submissions

4. **Production Readiness**:
   - Security audit
   - Load testing
   - Mainnet deployment planning

---

## Support

**Issues**:
- Check browser console (F12)
- Review Freighter transaction details
- Check Stellar Expert for contract state

**Contact**:
- GitHub Issues: [repo-url]/issues
- Documentation: `docs/` folder

---

**Status**: ✅ Ready for Testing
**Deployed**: https://veraz-pos.xyz
**Contract**: `CCKXS7YK6H2NAQC4K3TJJMFMKCH7COPFDVSRLZZSZV4RKOEXFVHE7PX6`
**Network**: Stellar Testnet

**Good luck with the E2E test!** 🚀
