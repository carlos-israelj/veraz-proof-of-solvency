# Complete UltraHonk Verifier Integration Guide

## Current Status

✅ **Verifier Code**: Cloned from NethermindEth/rs-soroban-ultrahonk
✅ **Circuit**: Compiled (circuits/solvency/target/solvency.json)
✅ **ZK Proving**: Working in browser
✅ **Contract**: Ready for verifier integration
⏳ **VK Generation**: Requires Barretenberg CLI (bb)

## Integration Architecture

```
┌─────────────────────────────────────────┐
│  Frontend (Browser)                     │
│  - Generates ZK proof via bb.js         │
│  - Proof + PublicInputs                 │
└───────────────┬─────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────┐
│  Solvency Policy Contract (Layer 2)     │
│  - Receives proof from frontend         │
│  - Cross-contract call to verifier      │
│  - Checks R >= L if proof valid         │
└───────────────┬─────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────┐
│  UltraHonk Verifier Contract (Layer 1)  │
│  - Initialized with VK at deploy        │
│  - verify_proof(publicInputs, proof)    │
│  - Returns true/false                   │
└─────────────────────────────────────────┘
```

## Prerequisites

### 1. Barretenberg CLI Installation

The VK generation requires `bb` CLI version 0.87.0 (matches Noir 1.0.0-beta.9).

#### Option A: Manual Install
```bash
# Download pre-built binary
wget https://github.com/AztecProtocol/aztec-packages/releases/download/aztec-packages-v0.87.0/bb-x86_64-linux-gnu.tar.gz

# Extract
tar -xzf bb-x86_64-linux-gnu.tar.gz

# Move to PATH
sudo mv bb /usr/local/bin/
chmod +x /usr/local/bin/bb

# Verify
bb --version
```

#### Option B: Build from Source
```bash
git clone --branch aztec-packages-v0.87.0 https://github.com/AztecProtocol/aztec-packages.git
cd aztec-packages/barretenberg/cpp
cmake --preset default
cmake --build --preset default

# Binary at: barretenberg/cpp/build/bin/bb
```

#### Option C: Use Docker
```bash
docker run -v $(pwd):/workspace aztecprotocol/bb:0.87.0 write_vk -b /workspace/circuits/solvency/target/solvency.json -o /workspace/vk
```

### 2. Verify Circuit Compatibility

Ensure circuit uses compatible backend:
```bash
# Check circuit
cat circuits/solvency/target/solvency.json | grep -i backend
```

## Step-by-Step Integration

### Step 1: Generate Verification Key

```bash
cd circuits/solvency

# Generate VK from compiled circuit
bb write_vk -b ./target/solvency.json -o ./vk

# Verify VK generated
ls -lh vk
# Expected: ~5-10KB file

# Convert VK to hex for deployment
hexdump -ve '1/1 "%.2x"' vk > vk.hex
```

### Step 2: Build UltraHonk Verifier Contract

```bash
cd contracts/verifier/contracts/rs-soroban-ultrahonk

# Build
cargo build --target wasm32-unknown-unknown --release

# Verify WASM
ls -lh target/wasm32-unknown-unknown/release/rs_soroban_ultrahonk.wasm
```

### Step 3: Deploy Verifier to Testnet

```bash
# Deploy verifier contract
stellar contract deploy \
  --wasm contracts/verifier/contracts/rs-soroban-ultrahonk/target/wasm32-unknown-unknown/release/rs_soroban_ultrahonk.wasm \
  --source issuer \
  --network testnet

# Save contract ID
export VERIFIER_ID=<returned_contract_id>
echo $VERIFIER_ID > .verifier_id
```

### Step 4: Initialize Verifier with VK

```bash
# Read VK hex
VK_HEX=$(cat circuits/solvency/vk.hex)

# Initialize verifier
stellar contract invoke \
  --id $VERIFIER_ID \
  --source issuer \
  --network testnet \
  -- initialize \
  --vk $VK_HEX

# Verify initialization
stellar contract invoke \
  --id $VERIFIER_ID \
  --source issuer \
  --network testnet \
  -- get_vk
```

### Step 5: Update Solvency Policy Contract

Update `contracts/solvency_policy/src/lib.rs`:

```rust
// 1. Import verifier client
mod verifier {
    soroban_sdk::contractimport!(
        file = "../verifier/contracts/rs-soroban-ultrahonk/target/wasm32-unknown-unknown/release/rs_soroban_ultrahonk.wasm"
    );
}

// 2. In attest() function, replace MOCK verification:

// Remove this:
// MOCK: Para el MVP, aceptamos cualquier prueba si proof no está vacío
if proof.len() == 0 && public_inputs.len() > 0 {
    // ...
}

// Add this:
let verifier = verifier::Client::new(&env, &cfg.verifier);
let proof_valid = verifier.verify_proof(&public_inputs, &proof);

if !proof_valid {
    return Err(Error::InvalidProof);
}
```

### Step 6: Rebuild and Redeploy Solvency Policy

```bash
cd contracts/solvency_policy

# Rebuild
cargo build --target wasm32-unknown-unknown --release

# Deploy new version
stellar contract deploy \
  --wasm target/wasm32-unknown-unknown/release/solvency_policy.wasm \
  --source issuer \
  --network testnet \
  -- \
  --config '{"verifier":"'$VERIFIER_ID'","reserve_sac":"CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC","reserve_accounts":["GCY4CQHYSGI2MKE24R6ASMSX6EN6VQDYQZIC2NG3FSLJML6ELPFQAPKT"],"freshness_window":100}'

# Save new contract ID
export POLICY_ID_V2=<returned_contract_id>
```

### Step 7: Test End-to-End with Real Verification

```bash
# Generate real proof from frontend
# (Frontend already configured to generate real proofs)

# Submit proof to contract
stellar contract invoke \
  --id $POLICY_ID_V2 \
  --source issuer \
  --network testnet \
  -- attest \
  --public_inputs <proof_public_inputs_hex> \
  --proof <proof_hex>

# Query result
stellar contract invoke \
  --id $POLICY_ID_V2 \
  --source issuer \
  --network testnet \
  -- is_solvent
```

## Testing the Integration

### Test 1: Valid Proof
```bash
# Use frontend to generate valid proof
# Submit to contract
# Expected: Success, is_solvent returns true
```

### Test 2: Invalid Proof
```bash
# Modify proof bytes
# Submit to contract
# Expected: Error::InvalidProof
```

### Test 3: Wrong Public Inputs
```bash
# Modify public inputs
# Submit to contract
# Expected: Error::InvalidProof (VK mismatch)
```

## Troubleshooting

### Error: "Invalid VK"
- Ensure VK generated from same circuit version
- Check bb version matches Noir version (0.87.0 for 1.0.0-beta.9)
- Regenerate VK with correct bb version

### Error: "Proof verification failed"
- Check public inputs format (3 fields of 32 bytes each)
- Ensure proof generated with same circuit
- Verify Barretenberg backend in frontend matches verifier

### Error: "Cross-contract call failed"
- Verify verifier contract ID is correct
- Check verifier is initialized
- Ensure sufficient gas/resources

### Performance Issues
- UltraHonk verification on-chain: ~2-3M instructions
- May need fee bumping: `--fee 1000000`
- Monitor with `stellar contract invoke --verbose`

## Alternative Approaches

### If bb CLI Not Available

#### Option 1: Use Node.js Script
```javascript
// generate-vk.js
import { BarretenbergBackend } from '@aztec/bb.js';
import circuit from './circuits/solvency/target/solvency.json';
import fs from 'fs';

const backend = new BarretenbergBackend(circuit.bytecode);
const vk = await backend.getVerificationKey();

fs.writeFileSync('vk.bin', Buffer.from(vk));
console.log('VK generated:', vk.length, 'bytes');
```

Run:
```bash
node generate-vk.js
```

#### Option 2: Extract from Proof Generation
The VK is embedded in the proof generation process. You can extract it during first proof:

```javascript
// In prover.js, add:
const vk = await backend.getVerificationKey();
console.log('VK (hex):', Buffer.from(vk).toString('hex'));
```

## Production Checklist

- [ ] VK generated from production circuit
- [ ] Verifier deployed to mainnet
- [ ] Verifier initialized with correct VK
- [ ] Solvency policy updated and redeployed
- [ ] End-to-end test passed
- [ ] Invalid proof test passed
- [ ] Gas costs measured and acceptable
- [ ] Security audit completed
- [ ] Monitoring/alerting configured

## Resources

- **Verifier Repo**: https://github.com/NethermindEth/rs-soroban-ultrahonk
- **Noir Docs**: https://noir-lang.org/docs/
- **Barretenberg**: https://github.com/AztecProtocol/aztec-packages/tree/master/barretenberg
- **Soroban Cross-Contract**: https://soroban.stellar.org/docs/how-to-guides/cross-contract-call

## Current Project Status

**With Verifier Integration: 100% Complete**
**Without Verifier (MOCK mode): 85% Complete**

The system is fully functional in MOCK mode for demonstration.
Verifier integration is the final step for production deployment.
