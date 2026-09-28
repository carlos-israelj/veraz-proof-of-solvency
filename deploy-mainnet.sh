#!/bin/bash

# Veraz Mainnet Deployment Script
# Based on PRODUCT_DEFINITION.md and DEFINDEX_TESTING_REPORT.md
# Deploys Solvency Policy contract with DeFindex integration

set -e

echo "======================================"
echo "VERAZ MAINNET DEPLOYMENT"
echo "======================================"
echo ""

# Configuration
NETWORK="mainnet"
SOURCE_ACCOUNT="mainnet-veraz"
WASM_PATH="contracts/solvency_policy/target/wasm32-unknown-unknown/release/solvency_policy.wasm"

# Mainnet configuration (from DEFINDEX_TESTING_REPORT.md)
RESERVE_SAC="CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC"  # USDC on mainnet
RESERVE_ACCOUNT="GAXZV4SEFLXDUJW6RDZVCKOOW6U5OZ66SORFVZ7HL4NX3TLXSJPDVQQP"  # mainnet-veraz public key

# DeFindex vaults (confirmed working - see DEFINDEX_TESTING_REPORT.md)
DEFINDEX_VAULT_1="CBNKCU3HGFKHFOF7JTGXQCNKE3G3DXS5RDBQUKQMIIECYKXPIOUGB2S3"  # 6.51% APY, $704 TVL
DEFINDEX_VAULT_2="CAB4JOLSCNELJVDQKZLVGHKWJCLXFDBZZMITJAFL4GBGTHIKWO47PYFH"  # 7.99% APY, $18.67 TVL
DEFINDEX_VAULT_3="CCA2ZJP5BVRXYTQH4FAGHCAUMRYCXVC4CRYC2NXHWMR7TIVX36U7F5HR"  # 7.23% APY, $19,538 TVL

# UltraHonk Verifier (need to deploy or find existing on mainnet)
VERIFIER_CONTRACT="TBD"  # Will deploy or use existing

echo "Step 1: Checking if WASM exists..."
if [ ! -f "$WASM_PATH" ]; then
    echo "❌ WASM not found. Building contract..."
    cd contracts/solvency_policy
    cargo build --target wasm32-unknown-unknown --release
    cd ../..
fi
echo "✅ WASM found: $WASM_PATH"
echo ""

echo "Step 2: Optimizing contract..."
stellar contract optimize --wasm $WASM_PATH
OPTIMIZED_WASM="${WASM_PATH%.wasm}_optimized.wasm"
echo "✅ Optimized WASM: $OPTIMIZED_WASM"
echo ""

echo "Step 3: Installing WASM on mainnet..."
WASM_HASH=$(stellar contract install \
  --wasm $WASM_PATH \
  --source-account $SOURCE_ACCOUNT \
  --network $NETWORK)
echo "✅ WASM Hash: $WASM_HASH"
echo ""

echo "Step 4: Deploying contract..."
CONTRACT_ID=$(stellar contract deploy \
  --wasm-hash $WASM_HASH \
  --source-account $SOURCE_ACCOUNT \
  --network $NETWORK)
echo "✅ Contract deployed: $CONTRACT_ID"
echo ""

echo "Step 5: Initializing contract with DeFindex configuration..."
# Initialize with multi-source configuration
stellar contract invoke \
  --id $CONTRACT_ID \
  --source-account $SOURCE_ACCOUNT \
  --network $NETWORK \
  --send=yes \
  -- initialize \
  --verifier $VERIFIER_CONTRACT \
  --reserve-sac $RESERVE_SAC \
  --reserve-accounts "[\"$RESERVE_ACCOUNT\"]" \
  --freshness-window 100 \
  --aquarius-pools "[]" \
  --defindex-vaults "[\"$DEFINDEX_VAULT_1\", \"$DEFINDEX_VAULT_2\", \"$DEFINDEX_VAULT_3\"]"

echo ""
echo "======================================"
echo "✅ DEPLOYMENT COMPLETE"
echo "======================================"
echo ""
echo "Contract ID: $CONTRACT_ID"
echo "Network: $NETWORK"
echo "Reserve SAC: $RESERVE_SAC"
echo "DeFindex Vaults:"
echo "  - $DEFINDEX_VAULT_1 (6.51% APY)"
echo "  - $DEFINDEX_VAULT_2 (7.99% APY)"
echo "  - $DEFINDEX_VAULT_3 (7.23% APY)"
echo ""
echo "Next steps:"
echo "1. Update deploy-config.json with new contract ID"
echo "2. Test attestation with: npm run test:attest"
echo "3. Update frontend with new contract address"
echo ""
echo "======================================"
