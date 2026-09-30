# E2E Testing Guide - Deployed Site

## 🌐 Deployment URL

**Production URL**: https://veraz-pos.xyz/

**GitHub Pages URL**: https://carlos-israelj.github.io/veraz-proof-of-solvency/ (redirects to veraz-pos.xyz)

**Last Deployment**: 2026-09-30 (with cryptographically secure random salts)

---

## 🎯 Testing Objectives

Verify the complete proof generation flow with the latest security improvements:

1. ✅ **Random Salts Generation**: Confirm 256-bit cryptographic randomness
2. ✅ **128-byte Public Inputs**: Verify reserve address commitment included
3. ✅ **Contract ID**: Confirm new contract `CADFYWTVXQ5WKWPEOI5VYQ55...` displayed
4. ✅ **Proof Generation**: Complete ZK proof generation in browser
5. ✅ **On-chain Verification**: Successful attestation on testnet

---

## 📋 Pre-requisites

### 1. Wallet Setup
- **Freighter Wallet** installed: https://freighter.app/
- **Testnet account** with XLM balance
- Network set to **Testnet**

### 2. Browser Setup
- **Chrome/Brave** recommended (WASM support)
- **Developer Console** open (F12)
- **Network tab** ready for monitoring

### 3. Test Data Preparation
```javascript
// Test balances (8 holders required)
Balances: 100000, 50000, 25000, 75000, 30000, 20000, 60000, 40000
Total Liabilities: 400000

// Test reserve addresses (1-5 addresses)
Reserve Address 1: GABC... (your testnet address)
Reserve Address 2: GXYZ... (another testnet address, optional)
```

---

## 🧪 Testing Steps

### **Step 1: Access Deployed Site**

1. Navigate to: https://carlos-israelj.github.io/veraz-proof-of-solvency/
2. Open Browser Console (F12 → Console tab)
3. Verify no errors on initial load
4. Check for WASM loading messages

**Expected Console Output**:
```
✅ No errors
✅ Vite app loaded
```

---

### **Step 2: Enter ISSUER Flow**

1. Click **"ISSUER"** button on landing page
2. Verify progress steps display: `1. Connect → 2. Input → 3. Prove → 4. Attest`
3. Check contract ID displayed in UI

**Expected**:
```
Contract ID: CADFYWTVXQ5WKWPEOI5VYQ55ICQFNHLLGNSH2ETM2GXNBPFWDLW7NRRX
```

**⚠️ If you see old contract ID**:
```
OLD: CCKXS7YK6H2NAQC4K3TJJMFMKCH7COPFDVSRLZZSZV4RKOEXFVHE7PX6 ❌
```
→ Deployment hasn't updated yet, wait 1-2 minutes and refresh

---

### **Step 3: Connect Wallet**

1. Click **"Connect Wallet"** button
2. Approve Freighter connection
3. Verify wallet address displayed (truncated format)

**Expected**:
```
Wallet Connected
GABCDEFG...XYZWXYZ (your address)
```

---

### **Step 4: Input Data**

#### 4.1 Enter Balances
1. Textarea should show default balances
2. Verify counter shows: `8/8 holders`
3. Check total liabilities: `400,000`

**Default Balances**:
```
100000, 50000, 25000, 75000, 30000, 20000, 60000, 40000
```

#### 4.2 Enter Reserve Addresses 🔑 **NEW FEATURE**
1. Scroll to **"Reserve Address Commitment"** section
2. Enter 1-5 Stellar addresses (comma or space separated)

**Example**:
```
GABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890ABCDEFGHIJKLMNOPQR
```

**Validation**:
- ✅ Starts with 'G'
- ✅ Exactly 56 characters
- ✅ Shows badge: "✓ 1 address(es) configured"

#### 4.3 Verify Contract ID
- Should be pre-filled with new contract ID
- Editable if needed

---

### **Step 5: Generate Proof** 🔐 **CRITICAL TEST**

1. Click **"Generate Zero-Knowledge Proof"** button
2. **IMMEDIATELY** watch the console for salt generation logs

**Expected Console Output (Key Verification)**:
```javascript
🔑 Calculando reserve addresses hash...
  reserve_addresses_hash: 0x8472398479238749823...
  num_reserve_accounts: 1

🌳 Calculando Merkle sum-tree...
  root: 0x1234567890abcdef...
  totalSum: 400000

🔐 Generated cryptographically secure random salts  // ← NEW!
  Sample salt (first 32 chars): 9823749823749823749823749823...  // ← RANDOM!

⚙️  Ejecutando circuito Noir...
🔐 Generando prueba UltraHonk con Keccak (10–30s)...
  proof.length: 14234
  publicInputs raw type: Uint8Array length: 128  // ← 128 bytes!

📦 Public inputs formateados (128 bytes):
  root (bytes 0-31):         0x1234567890abcdef…
  L    (bytes 48-63):        400000
  seq  (bytes 92-95):        58204567
  reserve_hash (bytes 96-127): 0x8472398479238…  // ← NEW!
```

**🔍 VERIFICATION POINTS**:

1. **Random Salts** ✅
   ```
   Sample salt (first 32 chars): 98237498237498237498237498...
   ```
   - Should be DIFFERENT every time (not 1, 2, 3, ...)
   - Should be ~77 digits long (256-bit number in decimal)

2. **128 Bytes** ✅
   ```
   publicInputs raw type: Uint8Array length: 128
   ```
   - NOT 96 bytes (old format)

3. **Reserve Hash** ✅
   ```
   reserve_hash (bytes 96-127): 0x...
   ```
   - Should be present in logs

#### 5.1 Progress Stages

Watch the UI progress through:
1. ✅ Initializing circuit...
2. ✅ Building Merkle Sum Tree...
3. ✅ Executing Noir witness...
4. ✅ Generating UltraHonk proof... (10-30 seconds)
5. ✅ Formatting public inputs...
6. ✅ Submitting to blockchain...
7. ✅ Verifying on-chain...

**Expected Duration**: 15-45 seconds total

---

### **Step 6: Transaction Submission**

1. Freighter popup appears for signature
2. Review transaction details
3. Click **"Approve"**

**Expected**:
- Transaction hash displayed
- Success screen with shield animation

---

### **Step 7: Verify On-Chain**

1. Copy transaction hash from success screen
2. Click transaction link (opens Stellar Expert)
3. Verify transaction status: **Success** ✅

**Stellar Expert URL**:
```
https://stellar.expert/explorer/testnet/tx/[TX_HASH]
```

**Check**:
- ✅ Status: Success
- ✅ Contract invoked: `CADFYWTVXQ5WKWPEOI5VYQ55...`
- ✅ Function: `attest`

---

### **Step 8: Query Attestation (AUDITOR Flow)**

1. Go back to home page
2. Click **"AUDITOR"** button
3. Enter contract ID (should be pre-filled)
4. Click **"Verify"**

**Expected Result**:
```json
{
  "solvent": true,
  "reserves": 500000,
  "sac_balance": 500000,
  "aquarius_balance": 0,
  "defindex_balance": 0,
  "liabilities": 400000,
  "ledger_seq": 58204567,
  "timestamp": 1727662129
}
```

**Verify**:
- ✅ `solvent: true` (Reserves ≥ Liabilities)
- ✅ `reserves >= liabilities`
- ✅ `ledger_seq` matches recent ledger

---

## 🐛 Common Issues & Solutions

### Issue 1: Old Contract ID Displayed
**Symptom**: UI shows `CCKXS7YK6H2NA...` (old contract)

**Solution**:
1. Wait 1-2 minutes for GitHub Pages deployment
2. Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
3. Clear cache and reload

---

### Issue 2: "Error(Storage, MissingValue)"
**Symptom**: Transaction fails with storage error

**Cause**: Using old contract ID or contract not initialized

**Solution**:
1. Verify contract ID matches new deployment: `CADFYWTVXQ5WKWPEOI5VYQ55...`
2. Check contract is initialized on testnet
3. Use query command to verify contract state

---

### Issue 3: Salts Still Sequential
**Symptom**: Console shows `salts: ["1", "2", "3", ...]`

**Cause**: Old cached JavaScript

**Solution**:
1. Hard refresh (Ctrl + Shift + R)
2. Clear browser cache completely
3. Open in Incognito/Private window
4. Check file hash: `prover-BO9p51Lb.js` should be loaded

---

### Issue 4: WASM Loading Errors
**Symptom**: `SharedArrayBuffer not available`

**Solution**:
1. Use Chrome or Brave browser
2. Check CORS headers are set (GitHub Pages should handle this)
3. Verify HTTPS connection (required for SharedArrayBuffer)

---

### Issue 5: Invalid Reserve Address Format
**Symptom**: Error: "Invalid Stellar address format"

**Solution**:
1. Ensure address starts with 'G'
2. Verify exactly 56 characters
3. No spaces within address (only between multiple addresses)

---

## ✅ Success Criteria Checklist

Mark each item as you verify:

### Frontend
- [ ] Site loads without errors
- [ ] New contract ID displayed: `CADFYWTVXQ5WKWPEOI5VYQ55...`
- [ ] Wallet connects successfully
- [ ] Balance input accepts 8 values
- [ ] Reserve address input validates format
- [ ] Contract ID is editable

### Proof Generation
- [ ] Console shows: "🔐 Generated cryptographically secure random salts"
- [ ] Sample salt is ~77 digits (not 1, 2, 3, ...)
- [ ] Public inputs: 128 bytes (not 96)
- [ ] Reserve hash logged in console
- [ ] Proof generation completes in 15-45 seconds
- [ ] No errors in console during proof generation

### Transaction
- [ ] Freighter popup appears
- [ ] Transaction submits successfully
- [ ] Transaction hash displayed
- [ ] Stellar Expert shows "Success"
- [ ] Contract called: `CADFYWTVXQ5WKWPEOI5VYQ55...`

### Verification
- [ ] AUDITOR flow queries successfully
- [ ] `solvent: true` if reserves adequate
- [ ] All balance fields populated
- [ ] Ledger sequence recent (within last hour)

---

## 📊 Testing Report Template

```markdown
# E2E Test Report - [Date]

**Tester**: [Your Name]
**Browser**: Chrome/Brave [Version]
**Wallet**: Freighter [Version]

## Test Results

### ✅ Frontend Loading
- Site URL: https://carlos-israelj.github.io/veraz-proof-of-solvency/
- Contract ID Displayed: CADFYWTVXQ5WKWPEOI5VYQ55... ✅/❌
- No Console Errors: ✅/❌

### ✅ Random Salts Verification
- Console Log Present: ✅/❌
- Sample Salt (first 32 chars): [paste here]
- Is Random (not 1,2,3...): ✅/❌

### ✅ Proof Generation
- Duration: [X] seconds
- Public Inputs Size: 128 bytes ✅/❌
- Reserve Hash Included: ✅/❌
- Proof Generated: ✅/❌

### ✅ On-Chain Verification
- Transaction Hash: [TX_HASH]
- Stellar Expert Status: Success ✅/❌
- Contract Called: CADFYWTVXQ5WKWPEOI5VYQ55... ✅/❌

### ✅ Attestation Query
- Query Successful: ✅/❌
- Solvent Status: [true/false]
- Reserves: [amount]
- Liabilities: [amount]

## Issues Found
[List any issues encountered]

## Notes
[Additional observations]
```

---

## 🔬 Advanced Testing (Optional)

### Test 1: Multiple Reserve Addresses
Try with 2-5 addresses:
```
GABC..., GXYZ..., GDEF...
```

### Test 2: Different Balance Sets
Try with different liabilities:
```
50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000
Total: 400000
```

### Test 3: Edge Cases
- Minimum (1 reserve address)
- Maximum (5 reserve addresses)
- Invalid address format (should error)

---

## 📝 Documentation Updates

After successful E2E test, update:
1. README.md with latest deployment info
2. CLAUDE.md with verified contract addresses
3. Create SECURITY.md documenting random salt implementation

---

## 🚀 Next Steps After Successful Test

1. ✅ **Security Audit Prep**: Document random salt implementation
2. ✅ **Performance Metrics**: Record proof generation times
3. ✅ **User Documentation**: Create step-by-step user guide
4. ✅ **Mainnet Preparation**: Update deployment scripts for mainnet

---

**Last Updated**: 2026-09-30
**Version**: 2.0 (128-byte format + Random Salts)
