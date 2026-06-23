# Verifier Integration - Code Changes Required

## Overview

This document contains the exact code changes needed to integrate the UltraHonk verifier with the Solvency Policy contract.

## Prerequisites

1. ✅ Verifier contract deployed to testnet/mainnet
2. ✅ Verifier initialized with VK
3. ✅ Verifier contract ID known

## Changes to `solvency_policy/src/lib.rs`

### Step 1: Add Verifier Module Import

Add this at the top of the file, after the existing `use` statements:

```rust
// Import verifier contract client
// NOTE: Uncomment and update path when verifier WASM is built
// mod verifier {
//     soroban_sdk::contractimport!(
//         file = "../verifier/contracts/rs-soroban-ultrahonk/target/wasm32-unknown-unknown/release/rs_soroban_ultrahonk.wasm"
//     );
// }
```

### Step 2: Update `attest()` Function

Replace the MOCK verification block (lines ~115-125) with real verification:

**Current Code (MOCK mode):**
```rust
// 3. Verificación criptográfica (cross-contract a Capa 1)
// TODO: En producción, descomentar y usar el verifier real:
// let verifier = verifier::Client::new(&env, &cfg.verifier);
// if !verifier.verify_proof(&public_inputs, &proof) {
//     return Err(Error::InvalidProof);
// }

// MOCK: Para el MVP, aceptamos cualquier prueba si proof no está vacío
if proof.len() == 0 && public_inputs.len() > 0 {
    // Solo validamos que haya inputs públicos válidos
    // En producción esto NO es seguro - requiere verificación ZK real
}
```

**New Code (Real verification):**
```rust
// 3. Verificación criptográfica (cross-contract a Capa 1)
let verifier = verifier::Client::new(&env, &cfg.verifier);

// Call verify_proof - returns Result<(), Error>
verifier.verify_proof(&public_inputs, &proof)
    .map_err(|_| Error::InvalidProof)?;
```

### Step 3: Update Error Messages (Optional)

Add more detailed error for verifier failures:

```rust
#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum Error {
    // ... existing errors ...
    InvalidProof = 3,
    VerifierCallFailed = 9,  // Add new error
}
```

Then update verification:
```rust
let verifier = verifier::Client::new(&env, &cfg.verifier);

match verifier.verify_proof(&public_inputs, &proof) {
    Ok(_) => {}, // Proof valid
    Err(_) => return Err(Error::InvalidProof),
}
```

## Complete Integration Workflow

### 1. Build Verifier Contract

```bash
cd contracts/verifier/contracts/rs-soroban-ultrahonk
cargo build --target wasm32-unknown-unknown --release
```

### 2. Generate WASM Path

```bash
# Get absolute path
VERIFIER_WASM=$(pwd)/target/wasm32-unknown-unknown/release/rs_soroban_ultrahonk.wasm
echo $VERIFIER_WASM
```

### 3. Update solvency_policy

```bash
cd ../../../solvency_policy/src

# Edit lib.rs - uncomment verifier import and update path
# Replace:
#   file = "../verifier/contracts/rs-soroban-ultrahonk/target/..."
# With your actual path from step 2
```

### 4. Uncomment Verification Code

In `lib.rs`, function `attest()`:
- Remove/comment out MOCK block
- Uncomment real verification lines

### 5. Rebuild Solvency Policy

```bash
cd contracts/solvency_policy
cargo build --target wasm32-unknown-unknown --release
cargo test
```

Expected: Tests should pass (they mock verifier responses)

### 6. Deploy to Testnet

```bash
# Deploy verifier first (if not done)
VERIFIER_ID=$(stellar contract deploy \
  --wasm ../verifier/contracts/rs-soroban-ultrahonk/target/wasm32-unknown-unknown/release/rs_soroban_ultrahonk.wasm \
  --source issuer \
  --network testnet)

echo "Verifier ID: $VERIFIER_ID"

# Initialize verifier with VK
stellar contract invoke \
  --id $VERIFIER_ID \
  --source issuer \
  --network testnet \
  -- __constructor \
  --vk_bytes <VK_HEX>

# Deploy solvency policy with verifier address
stellar contract deploy \
  --wasm target/wasm32-unknown-unknown/release/solvency_policy.wasm \
  --source issuer \
  --network testnet \
  -- \
  --config '{"verifier":"'$VERIFIER_ID'","reserve_sac":"CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC","reserve_accounts":["GCY4CQHYSGI2MKE24R6ASMSX6EN6VQDYQZIC2NG3FSLJML6ELPFQAPKT"],"freshness_window":100}'
```

## Testing the Integration

### Test 1: Valid Proof

```javascript
// In frontend, generate real proof
const { proof, publicInputs } = await generateSolvencyProof({
  balances: ["100000", "50000", "25000", "75000", "30000", "20000", "60000", "40000"],
  salts: ["1", "2", "3", "4", "5", "6", "7", "8"],
  ledgerSeq: 12345
});

// Submit to contract
await attest({
  contractId: POLICY_CONTRACT_ID,
  publicInputs,
  proof,
  sourceAddress: userAddress
});

// Expected: Success
```

### Test 2: Invalid Proof

```javascript
// Modify proof bytes
const invalidProof = new Uint8Array(proof);
invalidProof[0] = 0xFF;

// Submit
await attest({
  contractId: POLICY_CONTRACT_ID,
  publicInputs,
  proof: invalidProof,
  sourceAddress: userAddress
});

// Expected: Error::InvalidProof
```

## Diff Summary

```diff
# solvency_policy/src/lib.rs

+ mod verifier {
+     soroban_sdk::contractimport!(
+         file = "../verifier/contracts/rs-soroban-ultrahonk/target/wasm32-unknown-unknown/release/rs_soroban_ultrahonk.wasm"
+     );
+ }

  pub fn attest(env: Env, public_inputs: Bytes, proof: Bytes) -> Result<bool, Error> {
      // ... existing code ...

-     // MOCK: Para el MVP, aceptamos cualquier prueba si proof no está vacío
-     if proof.len() == 0 && public_inputs.len() > 0 {
-         // Solo validamos que haya inputs públicos válidos
-     }
+     // Real verification via cross-contract call
+     let verifier = verifier::Client::new(&env, &cfg.verifier);
+     verifier.verify_proof(&public_inputs, &proof)
+         .map_err(|_| Error::InvalidProof)?;

      // ... rest of function ...
  }
```

## Verification Checklist

- [ ] Verifier WASM path is correct in contractimport!
- [ ] Verifier deployed and initialized with correct VK
- [ ] MOCK code removed/commented out
- [ ] Real verification code uncommented
- [ ] Contract rebuilt successfully
- [ ] Tests pass
- [ ] Deployed to testnet/mainnet
- [ ] End-to-end test with real proof passes

## Rollback Plan

If verification fails:

1. Keep current deployed contract (with MOCK mode)
2. Debug verifier separately
3. Once verifier confirmed working, redeploy policy

Current contract in MOCK mode is fully functional for demo purposes.

## Performance Notes

- **UltraHonk verification**: ~2-3M instructions
- **Cross-contract call overhead**: ~100K instructions
- **Total attest() cost**: ~3-4M instructions
- **Recommended fee**: 1,000,000 stroops or higher

Monitor with:
```bash
stellar contract invoke --id <CONTRACT_ID> --source issuer --network testnet --verbose -- attest ...
```

## Resources

- Verifier Contract: `contracts/verifier/contracts/rs-soroban-ultrahonk/src/lib.rs`
- Verifier Repo: https://github.com/NethermindEth/rs-soroban-ultrahonk
- Soroban Cross-Contract Calls: https://soroban.stellar.org/docs/how-to-guides/cross-contract-call
