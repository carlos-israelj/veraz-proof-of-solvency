#!/bin/bash
# 🚀 Veraz - Deploy Solvency Policy with DeFindex Integration
# Date: June 26, 2026
# Purpose: Deploy updated solvency_policy contract with DeFindex vault support

set -e  # Exit on error

echo "═══════════════════════════════════════════════"
echo "  Veraz - Solvency Policy Deployment"
echo "  With DeFindex Integration"
echo "═══════════════════════════════════════════════"
echo ""

# Configuration from FINAL_DEPLOYMENT.md
VERIFIER="CDYOR3YHANB63YUBUA3H3NGVZH6JGSNJC3ZKTAHG7IYSAIMGHMHLBDWK"
RESERVE_SAC="CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC"
RESERVE_ACCOUNT="GCXY55U4OBCQSE57LTLQHEALRITRUHO3KIO54LUS3SAMCLDTLGCQJKP2"
FRESHNESS_WINDOW=100

# Aquarius Pools (from FINAL_DEPLOYMENT.md)
AQUARIUS_POOL_1="CBEPUTV5IJHR75PKITMFDCWTTKEHLWDEUOARPNVIW52A3AHK7OLIFCEK"
AQUARIUS_POOL_2="CDG2O3AM2NKHOWJHCXMOFBI4RL4INYIW3N4YZYI3UOOCEULOJML276BJ"

# DeFindex Vaults (from testnet query)
DEFINDEX_USDC="CBMVK2JK6NTOT2O4HNQAIQFJY232BHKGLIMXDVQVHIIZKDACXDFZDWHN"
DEFINDEX_XLM="CCLV4H7WTLJQ7ATLHBBQV2WW3OINF3FOY5XZ7VPHZO7NH3D2ZS4GFSF6"
DEFINDEX_CETES="CBIS5TEMTNNOTBE3WXPQUAGUEDYZZVIWAKTXEQCOUJ34OJJ3FJ5NLF2P"

NETWORK="testnet"
SOURCE="issuer"

echo "📋 Configuration:"
echo "  Verifier:        $VERIFIER"
echo "  Reserve SAC:     $RESERVE_SAC"
echo "  Reserve Account: $RESERVE_ACCOUNT"
echo "  Freshness:       $FRESHNESS_WINDOW ledgers"
echo "  Aquarius Pools:  2 pools"
echo "  DeFindex Vaults: 3 vaults"
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

# Step 3: Initialize contract with full configuration
echo "⚙️  Step 3/3: Initializing contract..."
echo "───────────────────────────────────────────────"
echo "This includes:"
echo "  - ZK Verifier integration"
echo "  - Reserve account tracking"
echo "  - 2 Aquarius AMM pools"
echo "  - 3 DeFindex yield vaults (NEW!)"
echo ""

stellar contract invoke \
  --id $CONTRACT_ID \
  --source $SOURCE \
  --network $NETWORK \
  -- initialize \
  --config '{"verifier":"'"$VERIFIER"'","reserve_sac":"'"$RESERVE_SAC"'","reserve_accounts":["'"$RESERVE_ACCOUNT"'"],"freshness_window":'$FRESHNESS_WINDOW',"aquarius_pools":["'"$AQUARIUS_POOL_1"'","'"$AQUARIUS_POOL_2"'"],"defindex_vaults":["'"$DEFINDEX_USDC"'","'"$DEFINDEX_XLM"'","'"$DEFINDEX_CETES"'"]}'

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
echo "  Status:          ✅ Operational"
echo ""
echo "🌟 New Features Enabled:"
echo "  ✅ SAC Balance Reading (Tier 1)"
echo "  ✅ Aquarius AMM Pools (Tier 2) - 2 pools"
echo "  ✅ DeFindex Vaults (Tier 3) - 3 vaults [NEW]"
echo ""
echo "📊 Total Reserve Sources: 6"
echo "  - 1 Reserve account (XLM SAC)"
echo "  - 2 Aquarius pools (XLM/AQUA, USDC/AQUA)"
echo "  - 3 DeFindex vaults (USDC, XLM, CETES)"
echo ""
echo "🔗 Explorer:"
echo "  https://stellar.expert/explorer/$NETWORK/contract/$CONTRACT_ID"
echo ""
echo "📝 Next Steps:"
echo "  1. Update frontend with new contract ID"
echo "  2. Test attestation with DeFindex vaults"
echo "  3. Verify breakdown events include defindex_balance"
echo ""
echo "═══════════════════════════════════════════════"
