#!/bin/bash

# Veraz Testnet Deployment with DeFindex Integration
# Week 2: E2E Testing Phase

set -e

echo "======================================"
echo "VERAZ TESTNET DEPLOYMENT"
echo "DeFindex Multi-Source Integration"
echo "======================================"
echo ""

# Configuration
NETWORK="testnet"
SOURCE_ACCOUNT="mainnet-veraz"  # Using mainnet-veraz identity for testnet deployment
WASM_PATH="contracts/solvency_policy/target/wasm32-unknown-unknown/release/solvency_policy.wasm"

# Testnet addresses (from CLAUDE.md and deploy-config.json)
VERIFIER="CAU5ZPZSJSASGEDMKPBQHL26AFEMH3DQWWTG52Y77L5NWWSECBHJAFKA"
RESERVE_SAC="CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC"  # USDC on testnet
RESERVE_ACCOUNT="GCY4CQHYSGI2MKE24R6ASMSX6EN6VQDYQZIC2NG3FSLJML6ELPFQAPKT"

# DeFindex vaults on testnet (same addresses as mainnet but testnet network)
DEFINDEX_VAULT_1="CBNKCU3HGFKHFOF7JTGXQCNKE3G3DXS5RDBQUKQMIIECYKXPIOUGB2S3"  # 17.89% APY
DEFINDEX_VAULT_2="CA2FIPJ7U6BG3N7EOZFI74XPJZOEOD4TYWXFVCIO5VDCHTVAGS6F4UKK"  # 14.64% APY

# Aquarius pools (empty for now - focus on DeFindex)
AQUARIUS_POOLS="[]"

echo "Step 1: Building contract..."
echo "Building from: $(pwd)"
cargo build --target wasm32-unknown-unknown --release 2>&1 | tail -3

if [ ! -f "$WASM_PATH" ]; then
    echo "❌ WASM not found at: $WASM_PATH"
    exit 1
else
    echo "✅ WASM found: $WASM_PATH"
    WASM_SIZE=$(ls -lh "$WASM_PATH" | awk '{print $5}')
    echo "   Size: $WASM_SIZE"
fi
echo ""

echo "Step 2: Optimizing contract..."
stellar contract optimize --wasm $WASM_PATH 2>/dev/null || echo "⚠️  Optimization skipped (not critical)"
echo ""

echo "Step 3: Installing WASM on testnet..."
WASM_HASH=$(stellar contract install \
  --wasm $WASM_PATH \
  --source-account $SOURCE_ACCOUNT \
  --network $NETWORK 2>&1 | grep -o 'C[A-Z0-9]\{55\}' | head -1)

if [ -z "$WASM_HASH" ]; then
    echo "❌ Failed to install WASM"
    exit 1
fi

echo "✅ WASM Hash: $WASM_HASH"
echo ""

echo "Step 4: Deploying contract..."
CONTRACT_ID=$(stellar contract deploy \
  --wasm-hash $WASM_HASH \
  --source-account $SOURCE_ACCOUNT \
  --network $NETWORK 2>&1 | grep -o 'C[A-Z0-9]\{55\}' | head -1)

if [ -z "$CONTRACT_ID" ]; then
    echo "❌ Failed to deploy contract"
    exit 1
fi

echo "✅ Contract deployed: $CONTRACT_ID"
echo ""

echo "Step 5: Initializing with DeFindex configuration..."
echo "  Verifier: $VERIFIER"
echo "  Reserve SAC: $RESERVE_SAC"
echo "  Reserve Account: $RESERVE_ACCOUNT"
echo "  DeFindex Vaults:"
echo "    - $DEFINDEX_VAULT_1 (17.89% APY)"
echo "    - $DEFINDEX_VAULT_2 (14.64% APY)"
echo ""

# Initialize contract (note: using JSON format for arrays)
stellar contract invoke \
  --id $CONTRACT_ID \
  --source-account $SOURCE_ACCOUNT \
  --network $NETWORK \
  --send=yes \
  -- initialize \
  --config "{
    \"verifier\": \"$VERIFIER\",
    \"reserve_sac\": \"$RESERVE_SAC\",
    \"reserve_accounts\": [\"$RESERVE_ACCOUNT\"],
    \"freshness_window\": 100,
    \"aquarius_pools\": [],
    \"defindex_vaults\": [\"$DEFINDEX_VAULT_1\", \"$DEFINDEX_VAULT_2\"]
  }"

echo ""
echo "======================================"
echo "✅ DEPLOYMENT COMPLETE"
echo "======================================"
echo ""
echo "Contract ID: $CONTRACT_ID"
echo "Network: testnet"
echo ""
echo "Configuration:"
echo "  - SAC Balance: Direct wallet reserves"
echo "  - DeFindex Vaults: 2 vaults configured"
echo "  - Aquarius Pools: None (will add in next phase)"
echo ""
echo "Next steps:"
echo "1. Update deploy-config.json:"
echo "   {\"solvency_policy\": \"$CONTRACT_ID\"}"
echo ""
echo "2. Test attestation:"
echo "   stellar contract invoke --id $CONTRACT_ID --network testnet -- is_solvent"
echo ""
echo "3. Generate proof with multi-source reserves:"
echo "   npm run test:attest"
echo ""
echo "======================================"

# Save contract ID to file for later use
echo "$CONTRACT_ID" > .testnet-contract-id
echo "Contract ID saved to .testnet-contract-id"
