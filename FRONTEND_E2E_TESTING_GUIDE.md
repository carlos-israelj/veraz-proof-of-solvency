# Veraz Frontend E2E Testing Guide
**Date**: September 23, 2026
**Status**: Ready for Manual Testing
**Servers Running**:
- ✅ Frontend: http://localhost:5173
- ✅ API Backend: http://localhost:3000

---

## 🎯 Testing Objective

Validate the complete end-to-end flow of Veraz Proof of Solvency system:
1. User enters holder balances in browser
2. ZK proof generated client-side (no server involvement)
3. Proof submitted to Stellar testnet via Freighter wallet
4. Attestation stored in solvency contract
5. Attestation queryable via public API

**Expected Time**: 15-30 minutes

---

## 📋 Prerequisites

### 1. Freighter Wallet Setup

**If Not Installed**:
1. Install Freighter browser extension: https://www.freighter.app/
2. Create new wallet or import existing
3. Switch to **Testnet** network (important!)
4. Fund account with testnet XLM from friendbot

**Funding Testnet Account**:
```bash
# Get your Freighter public key (starts with G...)
# Then fund it:
curl "https://friendbot.stellar.org?addr=YOUR_PUBLIC_KEY"
```

Or use: https://laboratory.stellar.org/#account-creator?network=test

**Verification**:
- Open Freighter
- Check network = "Testnet" (top right)
- Check balance > 1000 XLM

### 2. Contract Addresses (Already Deployed)

From `.env` and `deploy-config.json`:
```
Solvency Policy: CCKXS7YK6H2NAQC4K3TJJMFMKCH7COPFDVSRLZZSZV4RKOEXFVHE7PX6
Verifier:        CAU5ZPZSJSASGEDMKPBQHL26AFEMH3DQWWTG52Y77L5NWWSECBHJAFKA
Reserve SAC:     CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC
```

### 3. Test Data

Use these 8 holder balances (already in USDC with 7 decimals):
```
Holder 1: 1,000,000 USDC  →  10000000000000
Holder 2:   500,000 USDC  →   5000000000000
Holder 3:   250,000 USDC  →   2500000000000
Holder 4:   100,000 USDC  →   1000000000000
Holder 5:    50,000 USDC  →    500000000000
Holder 6:    25,000 USDC  →    250000000000
Holder 7:    10,000 USDC  →    100000000000
Holder 8:     5,000 USDC  →     50000000000

Total Liabilities: 1,940,000 USDC
```

**In frontend format** (paste into input fields):
```
10000000000000
5000000000000
2500000000000
1000000000000
500000000000
250000000000
100000000000
50000000000
```

---

## 🧪 E2E Testing Steps

### Step 1: Access Frontend (5 min)

1. **Open Browser**:
   ```
   http://localhost:5173
   ```

2. **Expected Landing Page**:
   - Veraz logo/title
   - "Zero-Knowledge Proof of Solvency"
   - Navigation menu: Home | Generate Proof | Verify | About

3. **Take Screenshot**: `1-landing-page.png`

4. **Check Browser Console**:
   - Open DevTools (F12)
   - Look for errors (should be none)
   - Verify WASM/worker loaded successfully

---

### Step 2: Navigate to Proof Generator (2 min)

1. **Click "Generate Proof" or "Issuer Flow"**

2. **Expected View**:
   - Title: "Generate Solvency Proof"
   - 8 input fields for holder balances
   - "Generate Proof" button
   - Instructions/help text

3. **Take Screenshot**: `2-proof-generator.png`

---

### Step 3: Enter Test Balances (5 min)

1. **Paste Balances** into each field:
   ```
   Field 1: 10000000000000
   Field 2: 5000000000000
   Field 3: 2500000000000
   Field 4: 1000000000000
   Field 5: 500000000000
   Field 6: 250000000000
   Field 7: 100000000000
   Field 8: 50000000000
   ```

2. **Verify UI Updates**:
   - Total liabilities shown: "1,940,000 USDC"
   - All fields validated (green checkmark or no error)

3. **Take Screenshot**: `3-balances-entered.png`

---

### Step 4: Generate ZK Proof (5-10 min)

**WARNING**: This is CPU-intensive and will take 2-5 minutes!

1. **Click "Generate Proof" Button**

2. **Expected Behavior**:
   - Button changes to "Generating..." (disabled)
   - Progress indicator appears
   - Browser may freeze briefly (normal for WASM)
   - Console logs proof generation steps

3. **Monitor Console** for:
   ```
   Starting proof generation...
   Building Merkle tree...
   Computing witness...
   Generating UltraHonk proof...
   Proof generated successfully!
   ```

4. **Wait Patiently**: 2-5 minutes depending on CPU

5. **Expected Result**:
   - Success message: "Proof generated successfully!"
   - Proof data displayed (hex string, ~2-4KB)
   - Public inputs shown:
     - Merkle root: 0x...
     - Total liabilities: 19400000000000 (194M stroops)
     - Ledger sequence: current ledger

6. **Take Screenshot**: `4-proof-generated.png`

7. **Copy Proof Data** to clipboard for verification

---

### Step 5: Connect Freighter Wallet (2 min)

1. **Click "Connect Wallet" or "Submit Proof"**

2. **Freighter Popup Appears**:
   - Shows your public key
   - Network: Testnet
   - Permissions requested: Sign transactions

3. **Click "Approve"** in Freighter

4. **Expected Result**:
   - Wallet connected indicator (green dot)
   - Your address shown (truncated)
   - "Submit to Testnet" button enabled

5. **Take Screenshot**: `5-wallet-connected.png`

---

### Step 6: Submit Proof to Testnet (5 min)

1. **Click "Submit to Testnet" Button**

2. **Freighter Transaction Popup**:
   - Shows transaction details
   - Contract: Solvency Policy (CCKXS7...)
   - Function: `attest`
   - Parameters: public_inputs (Bytes), proof (Bytes)
   - Est. gas: ~2-3M stroops

3. **Review Transaction**:
   - Verify contract address matches (CCKXS7YK6H...)
   - Check gas is reasonable (< 5M stroops)

4. **Click "Approve" in Freighter**

5. **Expected Behavior**:
   - "Submitting..." message
   - Transaction broadcast to network
   - Waiting for confirmation (~5-10 seconds)

6. **Monitor Console** for:
   ```
   Transaction submitted: HASH...
   Waiting for confirmation...
   Transaction confirmed!
   ```

7. **Expected Success**:
   - ✅ "Attestation submitted successfully!"
   - Transaction hash displayed
   - Link to Stellar Expert explorer

8. **Take Screenshot**: `6-proof-submitted.png`

9. **Copy Transaction Hash** for later verification

---

### Step 7: Verify on Stellar Expert (3 min)

1. **Click Transaction Hash Link** or visit:
   ```
   https://stellar.expert/explorer/testnet/tx/YOUR_TX_HASH
   ```

2. **Expected Transaction Details**:
   - Status: Success ✅
   - Type: Invoke Contract
   - Contract: CCKXS7YK6H2NAQC4K3TJJMFMKCH7COPFDVSRLZZSZV4RKOEXFVHE7PX6
   - Function: attest
   - Gas used: ~2-3M stroops
   - Events emitted

3. **Check Events**:
   - Look for `solvent` event with value `true`
   - Look for `reserve_breakdown` event

4. **Take Screenshot**: `7-stellar-expert.png`

---

### Step 8: Query Attestation via API (3 min)

**Test the API backend we just built!**

1. **Open New Terminal**

2. **Query Solvency Endpoint**:
   ```bash
   curl "http://localhost:3000/api/v1/protocols/CCKXS7YK6H2NAQC4K3TJJMFMKCH7COPFDVSRLZZSZV4RKOEXFVHE7PX6/solvency" | jq .
   ```

3. **Expected Response**:
   ```json
   {
     "success": true,
     "data": {
       "status": "solvent",
       "solvency_ratio": 1.XX,
       "attestation": {
         "solvent": true,
         "reserves": "XXXXXX",
         "liabilities": "19400000000000",
         "ledger_seq": XXXXX,
         "timestamp": "2026-09-23T..."
       },
       "reserve_breakdown": {
         "sac_balance": "XXXXXX",
         "total": "XXXXXX"
       }
     }
   }
   ```

4. **Verify**:
   - ✅ `status` = "solvent"
   - ✅ `liabilities` = 19400000000000 (matches our input)
   - ✅ `reserves` >= liabilities
   - ✅ Timestamp is recent

5. **Take Screenshot**: `8-api-response.png`

---

### Step 9: Query Contract Directly (Advanced) (5 min)

**Verify attestation stored in contract using Stellar CLI**:

```bash
stellar contract invoke \
  --id CCKXS7YK6H2NAQC4K3TJJMFMKCH7COPFDVSRLZZSZV4RKOEXFVHE7PX6 \
  --network testnet \
  -- is_solvent
```

**Expected Output**:
```rust
Attestation {
  solvent: true,
  reserves: XXXXX,
  liabilities: 19400000000000,
  ledger_seq: XXXXX,
  timestamp: XXXXX
}
```

---

## ✅ Success Criteria

Mark test as PASSED if:

| Criterion | Status |
|-----------|--------|
| Frontend loads without errors | ⬜ |
| All 8 balance inputs accept values | ⬜ |
| Proof generation completes (2-5 min) | ⬜ |
| Freighter wallet connects | ⬜ |
| Transaction submits successfully | ⬜ |
| Transaction confirmed on testnet | ⬜ |
| Stellar Expert shows success | ⬜ |
| API returns updated attestation | ⬜ |
| Contract query returns attestation | ⬜ |

**Overall Result**: PASS / FAIL

---

## 🐛 Troubleshooting

### Issue: Frontend Won't Load

**Symptoms**: Blank page, "Cannot GET /"

**Solutions**:
```bash
# Check server is running
lsof -i:5173

# Restart if needed
pkill -f vite
npm run dev
```

---

### Issue: WASM/Worker Errors

**Symptoms**: Console errors about SharedArrayBuffer, WASM

**Solutions**:
1. Check Vite config has CORS headers:
   ```javascript
   headers: {
     'Cross-Origin-Opener-Policy': 'same-origin',
     'Cross-Origin-Embedder-Policy': 'require-corp'
   }
   ```

2. Try Chrome/Firefox (better WASM support)

3. Check `vite.config.js` has:
   - `vite-plugin-wasm`
   - `vite-plugin-top-level-await`

---

### Issue: Proof Generation Fails

**Symptoms**: Error after "Generating...", no proof displayed

**Check**:
1. Console for error message
2. All 8 balances entered correctly (no letters)
3. Balances in stroops (7 decimals, 13-14 digits)
4. Browser doesn't block WASM execution

**Try**:
- Clear browser cache
- Use incognito window
- Try different browser

---

### Issue: Freighter Won't Connect

**Symptoms**: Wallet popup doesn't appear

**Solutions**:
1. Install Freighter: https://www.freighter.app/
2. Check extension is enabled
3. Switch to Testnet network
4. Reload page and try again

---

### Issue: Transaction Fails

**Symptoms**: Freighter shows error, transaction rejected

**Check**:
1. **Sufficient XLM**: Need ~1000 XLM for gas
   ```bash
   curl "https://friendbot.stellar.org?addr=YOUR_KEY"
   ```

2. **Correct Network**: Must be Testnet (not Mainnet!)

3. **Contract Exists**: Verify contract ID is correct

4. **Proof Freshness**: Ledger sequence must be recent (< 100 ledgers old)

**Try**:
- Fund account from friendbot
- Generate new proof (fresh ledger sequence)
- Check contract is deployed: `stellar contract info --id CCKXS7... --network testnet`

---

### Issue: API Returns Null/No Attestation

**Symptoms**: API shows `attestation: null` or stale data

**Reasons**:
1. Proof not yet confirmed (wait 10 seconds)
2. Wrong contract address in query
3. API using mock data (check `stellar.js`)

**Solutions**:
- Wait 30 seconds after transaction confirmation
- Verify contract address matches
- Check API server logs for errors

---

## 📊 Expected Performance

| Operation | Time | Notes |
|-----------|------|-------|
| Page load | < 3s | WASM loading |
| Proof generation | 2-5 min | CPU-intensive |
| Wallet connect | < 10s | User approval |
| TX submission | 5-10s | Network confirmation |
| API query | < 100ms | Local server |

**Total E2E Time**: 15-30 minutes (including proof generation)

---

## 📸 Evidence Collection

Collect these screenshots for documentation:

1. `1-landing-page.png` - Initial frontend
2. `2-proof-generator.png` - Proof generator view
3. `3-balances-entered.png` - All balances filled
4. `4-proof-generated.png` - Proof successfully created
5. `5-wallet-connected.png` - Freighter connected
6. `6-proof-submitted.png` - Transaction submitted
7. `7-stellar-expert.png` - TX confirmed on explorer
8. `8-api-response.png` - API showing attestation

**Save to**: `screenshots/e2e-test-YYYY-MM-DD/`

---

## 🎉 Next Steps After Successful Test

If all tests pass:

1. **Document Results**: Create `FRONTEND_E2E_TEST_RESULTS.md` with:
   - All screenshots
   - Transaction hashes
   - API responses
   - Any issues encountered

2. **Update README**: Add E2E test status to main README

3. **Demo Preparation**: You now have a working end-to-end flow to demo!

4. **Proceed to Aquarius Integration**: Add multi-source reserve verification

---

## 📝 Test Report Template

```markdown
# Frontend E2E Test Results
**Date**: YYYY-MM-DD
**Tester**: Your Name
**Duration**: XX minutes

## Summary
- ✅ / ❌ Proof Generation
- ✅ / ❌ Wallet Integration
- ✅ / ❌ Transaction Submission
- ✅ / ❌ Attestation Storage
- ✅ / ❌ API Verification

## Transaction Details
- TX Hash: [link to Stellar Expert]
- Gas Used: XXXXX stroops
- Timestamp: YYYY-MM-DD HH:MM:SS

## Screenshots
[Attach 8 screenshots]

## Issues Encountered
[List any problems and how resolved]

## Conclusion
Overall Result: PASS / FAIL
Ready for production: YES / NO
```

---

## 🔗 Useful Links

- **Frontend**: http://localhost:5173
- **API**: http://localhost:3000
- **Freighter**: https://www.freighter.app/
- **Friendbot**: https://friendbot.stellar.org/
- **Stellar Expert**: https://stellar.expert/explorer/testnet
- **Contract Info**: https://stellar.expert/explorer/testnet/contract/CCKXS7YK6H2NAQC4K3TJJMFMKCH7COPFDVSRLZZSZV4RKOEXFVHE7PX6

---

**Happy Testing! 🚀**

---

**Last Updated**: 2026-09-23T18:20:00Z
**Version**: 1.0.0
