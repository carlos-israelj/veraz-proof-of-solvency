#!/bin/bash
# 🚀 Veraz - Deploy Solvency Policy (SAC Only)
# Date: June 27, 2026
# Purpose: Deploy solvency_policy contract with only SAC balance (no DeFi integrations)

set -e  # Exit on error

echo "═══════════════════════════════════════════════"
echo "  Veraz - Solvency Policy Deployment"
echo "  SAC Only (Testing Mode)"
echo "═══════════════════════════════════════════════"
echo ""

# Configuration
VERIFIER="CDYOR3YHANB63YUBUA3H3NGVZH6JGSNJC3ZKTAHG7IYSAIMGHMHLBDWK"
RESERVE_SAC="CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC"
RESERVE_ACCOUNT="GCXY55U4OBCQSE57LTLQHEALRITRUHO3KIO54LUS3SAMCLDTLGCQJKP2"
FRESHNESS_WINDOW=100

NETWORK="testnet"
SOURCE="issuer"

echo "📋 Configuration:"
echo "  Verifier:        $VERIFIER"
echo "  Reserve SAC:     $RESERVE_SAC"
echo "  Reserve Account: $RESERVE_ACCOUNT"
echo "  Freshness:       $FRESHNESS_WINDOW ledgers"
echo "  Aquarius Pools:  0 (disabled)"
echo "  DeFindex Vaults: 0 (disabled)"
echo "  Network:         $NETWORK"
echo ""

# Step 1: Build contract
echo "🔨 Step 1/3: Building contract..."
echo "───────────────────────────────────────────────"
cd contracts/solvency_policy
stellar contract build
cd ../..
echo "✅ Contract built successfully"
echo ""

# Step 2: Deploy contract
echo "🚀 Step 2/3: Deploying contract to $NETWORK..."
echo "───────────────────────────────────────────────"
CONTRACT_ID=$(stellar contract deploy \
  --wasm contracts/solvency_policy/target/wasm32v1-none/release/solvency_policy.wasm \
  --source $SOURCE \
  --network $NETWORK)

echo "✅ Contract deployed!"
echo "📍 Contract ID: $CONTRACT_ID"
echo ""

# Step 3: Initialize contract with SAC only
echo "⚙️  Step 3/3: Initializing contract (SAC only)..."
echo "───────────────────────────────────────────────"

stellar contract invoke \
  --id $CONTRACT_ID \
  --source $SOURCE \
  --network $NETWORK \
  -- initialize \
  --config '{
    "verifier":"'$VERIFIER'",
    "reserve_sac":"'$RESERVE_SAC'",
    "reserve_accounts":["'$RESERVE_ACCOUNT'"],
    "freshness_window":'$FRESHNESS_WINDOW',
    "aquarius_pools":[],
    "defindex_vaults":[]
  }'

echo "✅ Contract initialized successfully!"
echo ""

# Verification
echo "═══════════════════════════════════════════════"
echo "  Verification"
echo "═══════════════════════════════════════════════"
echo ""

echo "📊 Reading configuration..."
stellar contract invoke \
  --id $CONTRACT_ID \
  --source $SOURCE \
  --network $NETWORK \
  -- get_config

echo ""
echo "═══════════════════════════════════════════════"
echo "  🎉 Deployment Complete!"
echo "═══════════════════════════════════════════════"
echo ""
echo "📋 Summary:"
echo "  Contract ID:     $CONTRACT_ID"
echo "  Network:         $NETWORK"
echo "  Status:          ✅ Operational (SAC Only)"
echo ""
echo "🔗 Explorer:"
echo "  https://stellar.expert/explorer/$NETWORK/contract/$CONTRACT_ID"
echo ""
echo "📝 Next Steps:"
echo "  1. Update frontend with new contract ID (src/App.jsx)"
echo "  2. Test basic attestation flow"
echo "  3. Once working, can re-enable DeFi integrations"
echo ""
echo "═══════════════════════════════════════════════"
