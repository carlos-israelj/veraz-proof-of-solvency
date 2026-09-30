# E2E Testing Checklist - 128-byte Public Inputs

**Date**: September 29, 2026
**New Contract**: `CADFYWTVXQ5WKWPEOI5VYQ55ICQFNHLLGNSH2ETM2GXNBPFWDLW7NRRX`
**Network**: Testnet
**Status**: ⏳ **PENDING MANUAL TESTING**

---

## Pre-Test Verification

### ✅ Backend Components

- [x] **Circuit Compiled**: `circuits/solvency/target/solvency.json` (Sept 29 14:06)
- [x] **Circuit Tests**: 2/2 passing
- [x] **Contract Compiled**: `solvency_policy.optimized.wasm` (9.8 KB)
- [x] **Contract Tests**: 21/21 passing
- [x] **Contract Deployed**: Testnet @ `CADFYWTVXQ5WKWPEOI5VYQ55ICQFNHLLGNSH2ETM2GXNBPFWDLW7NRRX`
- [x] **Contract Initialized**: Config verified via `get_config()`

### ✅ Frontend Components

- [x] **Circuit Artifact Updated**: `src/solvency.json` (Sept 29 17:08)
- [x] **Deploy Config Updated**: New contract ID in `deploy-config.json`
- [x] **Build Successful**: Vite build completed (59.02s)
- [x] **Code Pushed**: Commit `35c656d` to GitHub main
- [x] **Auto-Deploy Triggered**: Vercel/Netlify rebuilding

---

## Manual Testing Steps

### Step 1: Verify Frontend Deployment

**URL**: Check your deployment platform (Vercel/Netlify dashboard)

**Checklist**:
- [ ] Deployment status shows "Success"
- [ ] Latest commit is `35c656d` (chore: update circuit artifact)
- [ ] No build errors
- [ ] Deployment preview URL accessible

**Expected**: Deployment completes in 2-5 minutes after push

---

### Step 2: Open Application

**Actions**:
1. Open deployed URL in browser (or http://localhost:4321 if testing locally)
2. Open Developer Console (F12)
3. Check for errors in Console tab

**Checklist**:
- [ ] Page loads without errors
- [ ] No 404 errors for resources
- [ ] No JavaScript errors in console
- [ ] Network tab shows successful resource loading

**Expected**: Clean page load with no errors

---

### Step 3: Connect Wallet

**Actions**:
1. Click "Connect Wallet" button
2. Select Freighter
3. Approve connection

**Checklist**:
- [ ] Freighter popup appears
- [ ] Can select testnet network
- [ ] Connection succeeds
- [ ] Wallet address displayed

**Expected**: Wallet connects successfully

---

### Step 4: Navigate to Issuer Flow

**Actions**:
1. Click "Issuer" or navigate to issuer flow
2. Verify UI loads correctly

**Checklist**:
- [ ] Balance input fields visible (8 fields)
- [ ] Reserve address input field visible (**NEW**)
- [ ] Contract ID field shows: `CADFYWTVXQ5WKWPEOI5VYQ55ICQFNHLLGNSH2ETM2GXNBPFWDLW7NRRX`
- [ ] Generate Proof button visible

**Expected**: UI shows reserve address input field

---

### Step 5: Enter Test Data

**Test Balances** (8 holders):
```
100000
50000
25000
75000
30000
20000
60000
40000
```
Total: 400,000

**Reserve Addresses** (1-5 addresses, comma-separated):
```
GCY4CQHYSGI2MKE24R6ASMSX6EN6VQDYQZIC2NG3FSLJML6ELPFQAPKT
```

**Checklist**:
- [ ] All 8 balance fields filled
- [ ] Reserve address entered (Stellar G... format)
- [ ] No validation errors
- [ ] Generate Proof button enabled

**Expected**: Form validates correctly

---

### Step 6: Generate Proof (Critical Test)

**Actions**:
1. Click "Generate Proof"
2. Monitor Developer Console logs
3. Wait 3-5 seconds for proof generation

**Console Logs to Check**:
```javascript
// CRITICAL: Should see 128 bytes, NOT 96 bytes
✅ ℹ️  public_inputs: convirtiendo array de fields a 128 bytes
✅ 📦 Public inputs formateados (128 bytes):
   Bytes: Uint8Array(128) [...]
```

**Checklist**:
- [ ] Console shows "convirtiendo array de fields a **128 bytes**" (not 96)
- [ ] Console shows "Public inputs formateados (**128 bytes**)"
- [ ] Proof generation completes (3-5 seconds)
- [ ] No errors in console
- [ ] Progress indicators work smoothly

**Expected**: Proof generated with 128-byte public inputs

**⚠️ CRITICAL FAILURE INDICATOR**:
If you see "96 bytes" instead of "128 bytes", the deployment failed or browser cached old code.
- **Fix**: Hard refresh (Ctrl+Shift+R)
- **If still fails**: Check deployment logs

---

### Step 7: Submit Transaction

**Actions**:
1. Review transaction preview (if shown)
2. Click "Submit" or similar
3. Approve in Freighter wallet

**Checklist**:
- [ ] Freighter popup appears
- [ ] Transaction details look reasonable
- [ ] Gas cost estimate shown
- [ ] Approve transaction in Freighter

**Expected**: Freighter shows transaction for approval

---

### Step 8: Verify Transaction Success

**Actions**:
1. Wait for transaction confirmation (5-10 seconds)
2. Check for success message in UI
3. Check Developer Console for transaction hash

**Console Logs to Check**:
```javascript
✅ Transaction hash: abc123...
✅ Transaction successful
```

**Checklist**:
- [ ] UI shows success message
- [ ] No error messages (NOT "Error(Storage, MissingValue)")
- [ ] Transaction hash displayed
- [ ] Can copy transaction hash

**Expected**: Transaction succeeds without errors

**⚠️ CRITICAL FAILURE INDICATOR**:
If you see `Error(Storage, MissingValue)` or `Error(Contract, #3)`, it means:
- Public inputs format mismatch (contract expects 128, got 96)
- **Fix**: Verify deployment completed and refresh browser

---

### Step 9: Verify On-Chain State

**Actions**:
1. Copy transaction hash from UI
2. Open Stellar Expert: https://stellar.expert/explorer/testnet/tx/[TX_HASH]
3. Verify transaction details

**Checklist**:
- [ ] Transaction status: Success
- [ ] Contract invoked: `CADFYWTVXQ5WKWPEOI5VYQ55ICQFNHLLGNSH2ETM2GXNBPFWDLW7NRRX`
- [ ] Function called: `attest`
- [ ] Events emitted (if any)

**Or test via CLI**:
```bash
stellar contract invoke \
  --id CADFYWTVXQ5WKWPEOI5VYQ55ICQFNHLLGNSH2ETM2GXNBPFWDLW7NRRX \
  --network testnet \
  --source-account issuer \
  -- is_solvent
```

**Expected Output**:
```json
{
  "solvent": true,
  "reserves": 500000,
  "sac_balance": 500000,
  "aquarius_balance": 0,
  "defindex_balance": 0,
  "liabilities": 400000,
  "ledger_seq": 12345678,
  "timestamp": 1727654321
}
```

**Checklist**:
- [ ] `solvent: true` (reserves >= liabilities)
- [ ] `liabilities: 400000` (matches test data)
- [ ] `reserves >= 400000`
- [ ] `ledger_seq` is recent
- [ ] `timestamp` is recent

**Expected**: Attestation stored correctly on-chain

---

### Step 10: Test Edge Cases

#### Test Case A: Invalid Reserve Address

**Input**: `INVALID_ADDRESS_FORMAT`

**Expected**:
- [ ] Validation error before proof generation
- [ ] Error message: "Invalid Stellar address format"

#### Test Case B: Too Many Reserve Addresses

**Input**: 6 addresses (max is 5)

**Expected**:
- [ ] Validation error
- [ ] Error message: "Maximum 5 reserve addresses allowed"

#### Test Case C: No Reserve Addresses

**Input**: Empty field

**Expected**:
- [ ] Validation error
- [ ] Error message: "At least one reserve address is required"

---

## Success Criteria

### ✅ All Tests Pass

- [x] Backend deployed and initialized
- [ ] Frontend deployed successfully
- [ ] Proof generates with **128 bytes** public inputs
- [ ] Transaction succeeds on-chain
- [ ] Attestation stored correctly
- [ ] Edge cases handled properly

### ✅ Performance Metrics

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Proof generation time | < 10s | ? | ⏳ |
| Transaction confirmation | < 15s | ? | ⏳ |
| UI responsiveness | Smooth | ? | ⏳ |
| Error handling | Clear | ? | ⏳ |

---

## Troubleshooting

### Issue: "96 bytes" in Console (Not 128)

**Cause**: Old code cached in browser or deployment not updated

**Fix**:
1. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. Clear browser cache
3. Verify latest commit deployed: Check Vercel/Netlify dashboard
4. Check `src/solvency.json` timestamp in deployed files

### Issue: Error(Storage, MissingValue)

**Cause**: Contract expects 128 bytes but received 96 bytes

**Fix**:
1. Verify contract ID is correct: `CADFYWTVXQ5WKWPEOI5VYQ55ICQFNHLLGNSH2ETM2GXNBPFWDLW7NRRX`
2. Confirm deployment used latest code (commit `35c656d`)
3. Test contract directly via CLI to verify it's the new one

### Issue: Transaction Fails with "InvalidProof"

**Cause**: Proof verification failed (could be multiple reasons)

**Fix**:
1. Check verifier is correct: `CAU5ZPZSJSASGEDMKPBQHL26AFEMH3DQWWTG52Y77L5NWWSECBHJAFKA`
2. Verify proof generation completed without errors
3. Check console for proof generation logs

### Issue: "Contract not found"

**Cause**: Wrong contract ID or network

**Fix**:
1. Verify contract ID: `CADFYWTVXQ5WKWPEOI5VYQ55ICQFNHLLGNSH2ETM2GXNBPFWDLW7NRRX`
2. Ensure wallet connected to Testnet (not Mainnet)
3. Check Stellar Expert: Contract exists and initialized

---

## Testing Report Template

```
### E2E Test Report - [Date]

**Tester**: [Your Name]
**Environment**: [Testnet/Local]
**Browser**: [Chrome/Firefox/Safari + Version]
**Deployment**: [URL or Local]

#### Results:

- [ ] Step 1: Frontend Deployment
- [ ] Step 2: Page Load
- [ ] Step 3: Wallet Connection
- [ ] Step 4: UI Navigation
- [ ] Step 5: Data Entry
- [ ] Step 6: Proof Generation (128 bytes ✅)
- [ ] Step 7: Transaction Submission
- [ ] Step 8: Transaction Success
- [ ] Step 9: On-Chain Verification
- [ ] Step 10: Edge Cases

#### Issues Found:

1. [Issue description]
   - Severity: [Low/Medium/High/Critical]
   - Steps to reproduce: [...]
   - Expected: [...]
   - Actual: [...]

#### Performance:

- Proof generation: [X seconds]
- Transaction time: [X seconds]
- Overall UX: [Smooth/Acceptable/Needs improvement]

#### Recommendation:

- [ ] Ready for mainnet
- [ ] Needs fixes
- [ ] Needs re-testing

**Notes**: [Additional observations]
```

---

## Next Actions After Testing

### If All Tests Pass ✅

1. **Document success**: Update this checklist with actual results
2. **Create test report**: Use template above
3. **Proceed to**: Security audit preparation
4. **Consider**: User acceptance testing (UAT) with beta testers

### If Tests Fail ❌

1. **Document failure**: Note which step failed and error details
2. **Debug**: Use troubleshooting section above
3. **Fix issue**: Code changes or deployment fixes
4. **Re-test**: Run through checklist again
5. **Repeat**: Until all tests pass

---

**Checklist Created**: September 29, 2026
**Status**: Ready for Manual Testing
**Tester**: [Your Name Here]
**Testing Date**: [To be completed]
