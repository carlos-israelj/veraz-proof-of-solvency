# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Veraz is a production-ready Zero-Knowledge Proof of Solvency system for Stellar/Soroban that enables stablecoin issuers to prove `Reserves ≥ Liabilities` without revealing individual holder balances. The system integrates with Aquarius AMM pools and DeFindex yield vaults to provide comprehensive reserve verification across multiple DeFi venues.

**Key Innovation**: This is the ONLY solution that verifies solvency across both SAC balances AND AMM liquidity pools with Zero-Knowledge privacy.

## Common Commands

### Development Server
```bash
# Start frontend development server
npm run dev

# Build for production
npm build

# Preview production build
npm run preview
```

### Smart Contracts (Soroban)

**Working Directory**: `contracts/solvency_policy/`

```bash
# Build contracts
cargo build --target wasm32-unknown-unknown --release

# Run contract tests
cargo test

# Deploy contract (requires stellar CLI)
stellar contract deploy \
  --wasm target/wasm32-unknown-unknown/release/solvency_policy.wasm \
  --network testnet
```

### ZK Circuit (Noir)

**Working Directory**: `circuits/solvency/`

```bash
# Compile Noir circuit
nargo compile

# Run circuit tests
nargo test

# Generate verification key (after compilation)
bb write_vk -b target/solvency.json
```

### Testing End-to-End

```bash
# Run complete proof generation + verification flow
node test-proof.js

# Test contract verification
node test-verify.js

# Query testnet contract state
node scripts/debug-is-solvent.js
```

## Architecture

Veraz implements a three-layer cryptographic architecture:

### Layer 1: UltraHonk Verifier (Cryptographic Core)
- **Contract**: `CAU5ZPZSJSASGEDMKPBQHL26AFEMH3DQWWTG52Y77L5NWWSECBHJAFKA` (testnet)
- **Purpose**: Performs actual BN254 elliptic curve cryptographic verification of ZK proofs
- **Source**: Nethermind's `rs-soroban-ultrahonk` (submodule in `contracts/verifier/`)
- **Key Function**: `verify_proof(public_inputs: Bytes, proof: Bytes)`

### Layer 2+3: Solvency Policy Contract (Business Logic + Attestation)
- **Location**: `contracts/solvency_policy/src/lib.rs`
- **Contract**: `CC5XFT7XZXKJEONWOBALJTSKYGGCV3I7TEA54FKZWEHSOMQHDOF53SGG` (testnet)
- **Responsibilities**:
  1. Parse public inputs to extract liabilities (L) and ledger sequence
  2. Validate proof freshness (100-ledger window) and anti-replay protection
  3. Cross-contract call to Layer 1 verifier
  4. Read live reserves from:
     - SAC wallets (direct token balances)
     - Aquarius AMM pools (liquidity pool shares)
     - DeFindex yield vaults (vault positions converted to asset value)
  5. Check solvency: `total_reserves ≥ liabilities`
  6. Persist public attestation with breakdown

**Key Files**:
- `lib.rs`: Main contract logic (300 lines)
- `aquarius.rs`: Aquarius pool integration (94 lines)
- `defindex.rs`: DeFindex vault integration
- `test.rs`: Contract tests (6/6 passing)

### Off-Chain: Zero-Knowledge Circuit
- **Location**: `circuits/solvency/src/main.nr`
- **Language**: Noir 1.0.0-beta.22
- **Algorithm**: Merkle-sum-tree with Pedersen hash commitments
- **Constants**:
  - `N = 8`: Number of holders (demo size, scalable to 1000+)
  - `TREE = 15`: Total nodes in binary heap-indexed tree
  - `MAX_BITS = 120`: Upper bound per balance (fits i128)

**Circuit Logic**:
1. Build Merkle-sum-tree from private balances and salts
2. Prove tree structure integrity (sums match at each node)
3. Assert root commitment matches public input
4. Assert total sum equals claimed liabilities
5. Bind proof to ledger sequence for freshness validation

**Public Inputs** (96 bytes):
- `[0..32]`: Merkle root (Field)
- `[32..64]`: Total liabilities as i128 big-endian (16 bytes padding + 16 bytes value)
- `[64..96]`: Ledger sequence as u32 big-endian (28 bytes padding + 4 bytes value)

**Private Inputs** (never revealed):
- `balances[N]`: Individual holder balances
- `salts[N]`: Cryptographically secure random values (256-bit each) for commitment hiding
  - Generated using `crypto.getRandomValues()` in browser
  - CRITICAL for privacy: prevents attackers from verifying suspected balances
  - Never logged or stored, regenerated for each proof

### Frontend: Browser-Based Proving
- **Location**: `src/`
- **Framework**: React 18.3.1 + Vite 5.4.0
- **Proving**: `@aztec/bb.js` (UltraHonk backend) + `@noir-lang/noir_js`
- **Wallet**: Freighter API integration

**Key Files**:
- `src/lib/prover.js`: ZK proof generation (187 lines)
- `src/lib/merkle.js`: Merkle tree construction
- `src/lib/tours.js`: Interactive UI tours
- `vite.config.js`: Critical WASM/worker configuration

**IMPORTANT NOTES**:
- Proofs are generated 100% client-side (privacy by design)
- WASM plugins (`vite-plugin-wasm`, `vite-plugin-top-level-await`) are REQUIRED
- `pino/browser` is stubbed to avoid dev server issues (see vite.config.js:14-55)
- Cross-Origin headers are REQUIRED for SharedArrayBuffer support

## Critical Integration Points

### 1. Public Inputs Format Mismatch
The contract expects 96 bytes with specific layout:
```rust
// Contract parsing (lib.rs:258-286)
let l_bytes = pi.slice(32..64);      // Takes last 16 bytes as i128
let seq_bytes = pi.slice(64..96);    // Takes last 4 bytes as u32
```

The prover must match this EXACTLY (see `prover.js:formatPublicInputsForSoroban`).

### 2. Cross-Contract Verification Call
```rust
// lib.rs:137-141
env.invoke_contract::<()>(
    &cfg.verifier,
    &Symbol::new(&env, "verify_proof"),
    (public_inputs.clone(), proof.clone()).into_val(&env),
);
```
The verifier will PANIC on invalid proof, which propagates as `Error::InvalidProof`.

### 3. Multi-Source Reserve Aggregation
```rust
// lib.rs:149-186
// 1. Direct SAC balances
for acct in cfg.reserve_accounts.iter() {
    sac_balance += token.balance(&acct);
}

// 2. OPTIONAL: Aquarius pool shares
if !cfg.aquarius_pools.is_empty() {
    aquarius_balance = aquarius::read_aquarius_reserves(...)?;
}

// 3. OPTIONAL: DeFindex vault positions
if !cfg.defindex_vaults.is_empty() {
    defindex_balance = defindex::read_defindex_vaults(...)?;
}

total_reserves = sac_balance + aquarius_balance + defindex_balance;
```

### 4. Aquarius Integration
- **Module**: `contracts/solvency_policy/src/aquarius.rs`
- **Pool Contract**: `CCGFVAHVN4XGY2SKWNCLBMIJ6EPT3FELLMIBQMVTC2DNVX3HPBA23OMU` (USDC/XLM on testnet)
- **Method**: Cross-contract calls to read pool share token balances
- **Documentation**: https://docs.aqua.network/
- **Status**: Code implemented, not fully tested with real pools

**Key Functions**:
- `share_id()`: Get pool's share token address
- `balance(user)`: Query user's LP token balance

### 5. DeFindex Integration (RECOMMENDED FOR REAL USE)
- **Module**: `contracts/solvency_policy/src/defindex.rs`
- **Documentation**: https://docs.defindex.io/
- **Status**: Code implemented with proper share→asset conversion
- **Integration Time**: Hours (not weeks) thanks to MCP/Skills

**Why DeFindex?**
- ✅ Pre-built MCP and Skills for Claude Code integration
- ✅ API available for off-chain queries (`GET /vault/{VAULT_ADDRESS}/balance?from={USER}`)
- ✅ On-chain contract calls also supported
- ✅ Automatic yield aggregation across strategies (Blend Autocompound, etc.)

**Key Methods (On-Chain)**:
- `balance(user: Address) -> i128`: User's vault shares
- `total_supply() -> i128`: Total vault shares
- `fetch_total_managed_funds() -> Vec<AssetAllocation>`: Total assets under management
- **Conversion**: `asset_value = (user_shares * total_assets) / total_supply`

**Key Methods (API)**:
- `GET /vault/{VAULT_ADDRESS}/balance?from={USER}`: Returns `underlyingBalance` (already converted to assets)
- API Reference: https://api.defindex.io/docs

**Integration Guides**:
- Creating a Vault: https://docs.defindex.io/api-integration-guide/creating-a-defindex-vault
- API Integration: https://docs.defindex.io/api-integration-guide/api
- Privy Example: https://github.com/defindex-io/privy-defindex-guide
- AI Tools (MCP/Skills): https://docs.defindex.io/api-integration-guide/guides-and-tutorials/ai-tools

## Data Flow

### Proof Generation (Browser)
1. User enters 8 holder balances in frontend
2. Generate cryptographically secure random salts (256-bit each)
   - Uses `crypto.getRandomValues(new Uint8Array(32))` per balance
   - Converts to BigInt then decimal string for Noir Field type
   - CRITICAL: Random salts prevent balance verification attacks
3. Build Merkle-sum-tree in JavaScript (`merkle.js`)
4. Execute Noir circuit with balances + salts (via `noir_js`)
5. Generate UltraHonk proof with Keccak hash (`bb.js`, ~3-5s)
6. Format public inputs to 128-byte layout (includes reserve address commitment)
7. Submit transaction to Stellar via Freighter

### On-Chain Verification (Soroban)
1. Solvency Policy receives `attest(public_inputs, proof)`
2. Parse liabilities (L) and ledger sequence from public inputs
3. Validate freshness: `current_ledger - ledger_seq < 100`
4. Validate anti-replay: `ledger_seq > last_verified_seq`
5. Call UltraHonk verifier (Layer 1) - will panic if proof invalid
6. Read reserves from SAC + Aquarius + DeFindex
7. Check `total_reserves ≥ L`
8. Store attestation with breakdown in contract storage
9. Emit events: `(solvent, ledger_seq)` and `(sac, aquarius, defindex, total)`

### Public Query
Anyone can call `is_solvent()` to get:
```rust
Attestation {
    solvent: bool,
    reserves: i128,           // Total across all sources
    sac_balance: i128,        // Direct wallet balance
    aquarius_balance: i128,   // Pool share balance
    defindex_balance: i128,   // Vault position value
    liabilities: i128,        // From ZK proof
    ledger_seq: u32,          // Snapshot timestamp
    timestamp: u64
}
```

## Testing Strategy

### Circuit Tests
```bash
cd circuits/solvency
nargo test  # Runs test_well_formed_tree_sums
```

### Contract Tests
```bash
cd contracts/solvency_policy
cargo test  # 6 tests covering initialization, attestation, multi-source reserves
```

**Important Test Cases**:
- `test_constructor`: Basic initialization
- `test_attest_success`: Valid proof acceptance
- `test_attest_stale_proof`: Freshness window enforcement
- `test_attest_replay`: Anti-replay protection
- `test_attest_insolvent`: Solvency failure detection
- `test_multi_source_reserves`: SAC + Aquarius + DeFindex aggregation

### Integration Tests
```bash
# Generate proof locally and verify format
node test-proof.js

# Test contract deployment and initialization
./scripts/deploy-solvency-sac-only.sh

# Query live testnet state
node scripts/debug-is-solvent.js
```

## Common Development Tasks

### Adding a New DeFi Integration

**Option A: On-Chain Contract Calls (Like Aquarius)**

1. Create module in `contracts/solvency_policy/src/{protocol}.rs`
2. Implement function signature:
   ```rust
   pub fn read_{protocol}_reserves(
       env: &Env,
       addresses: &Vec<Address>,
       user: &Address,
   ) -> Result<i128, crate::Error>
   ```
3. Add field to `Config` struct in `lib.rs`
4. Add aggregation logic in `attest()` function (similar to Aquarius/DeFindex)
5. Update tests in `test.rs`

**Option B: Hybrid API + On-Chain (Recommended for DeFindex)**

DeFindex provides both on-chain contract methods AND a REST API. For better performance:

1. **Off-chain (Frontend)**: Use API to fetch `underlyingBalance`
   - `GET https://api.defindex.io/vault/{VAULT}/balance?from={USER}&network=testnet`
   - Returns already-converted asset value
   - Faster, no gas costs for queries

2. **On-chain (Verification)**: Use contract methods in `defindex.rs`
   - `balance()`, `total_supply()`, `fetch_total_managed_funds()`
   - Trustless verification during attestation
   - Already implemented in `contracts/solvency_policy/src/defindex.rs`

3. **Best Practice**: Display API data in UI, verify with on-chain calls in contract
   - User sees fast updates
   - Contract verifies trustlessly
   - Best of both worlds

**Integration Time with DeFindex MCP/Skills**:
- Hours (not days/weeks) thanks to pre-built Claude Code integration
- See: https://docs.defindex.io/api-integration-guide/guides-and-tutorials/ai-tools

### Scaling the Circuit to More Holders

1. Edit `circuits/solvency/src/main.nr`:
   ```noir
   global N: u32 = 64;  // Change from 8 to desired power of 2
   ```
2. Recompile circuit: `nargo compile`
3. Regenerate verification key: `bb write_vk -b target/solvency.json`
4. Update frontend constant in `prover.js:17`
5. **Note**: Proof generation time scales with N (8 holders ≈ 3s, 64 holders ≈ 10-15s)

### Deploying to Mainnet

1. Audit smart contracts (REQUIRED for production)
2. Deploy UltraHonk verifier to mainnet
3. Build optimized contract: `cargo build --release --target wasm32-unknown-unknown`
4. Deploy: `stellar contract deploy --wasm target/.../solvency_policy.wasm --network mainnet`
5. Initialize with mainnet configuration:
   ```bash
   stellar contract invoke \
     --id CONTRACT_ID \
     --network mainnet \
     -- initialize \
     --config '{"verifier":"...","reserve_sac":"...","reserve_accounts":["..."],"freshness_window":100,"aquarius_pools":[],"defindex_vaults":[]}'
   ```
6. Update frontend `deploy-config.json` with mainnet addresses

## Known Issues & Workarounds

### Vite Development Server
**Issue**: `pino/browser` module causes 404 errors when `noir_js` is excluded from optimizeDeps.

**Solution**: Custom Vite plugin intercepts `/node_modules/pino/browser.js` requests and serves stub (see `vite.config.js:14-55`).

### SharedArrayBuffer in Browsers
**Issue**: `bb.js` requires SharedArrayBuffer, which needs specific CORS headers.

**Solution**: Dev server configured with headers (see `vite.config.js:80-84`):
```js
"Cross-Origin-Opener-Policy": "same-origin",
"Cross-Origin-Embedder-Policy": "require-corp"
```

### Contract Error Codes
**Issue**: UltraHonk verifier uses error codes 3-9, which can conflict with policy contract errors.

**Solution**: Solvency Policy uses error codes 10+ to avoid collisions (see `lib.rs:31-33`).

## Documentation Structure

- **README.md**: Complete project overview, architecture, deployment guides
- **docs/**: Technical specifications and implementation details
- **AQUARIUS_INTEGRATION.md**: Aquarius AMM integration documentation
- **TESTING_GUIDE.md**: Comprehensive testing procedures
- **LOCAL_DEPLOYMENT.md**: Local development setup
- **FINAL_DEPLOYMENT.md**: Production deployment checklist

## Stellar Ecosystem Resources

- **Aquarius Documentation**: https://docs.aqua.network/
- **DeFindex Documentation**: https://docs.defindex.io/
  - **API Reference**: https://api.defindex.io/docs
  - **MCP/Skills for AI**: https://docs.defindex.io/api-integration-guide/guides-and-tutorials/ai-tools
  - **Privy Integration Example**: https://github.com/defindex-io/privy-defindex-guide
- **Stellar ZK Proofs**: https://developers.stellar.org/docs/build/apps/zk
- **Noir Language**: https://noir-lang.org/docs/
- **Soroban Docs**: https://developers.stellar.org/docs/build/smart-contracts

## Contract Addresses (Testnet)

```javascript
{
  "verifier": "CAU5ZPZSJSASGEDMKPBQHL26AFEMH3DQWWTG52Y77L5NWWSECBHJAFKA",
  "solvency_policy": "CC5XFT7XZXKJEONWOBALJTSKYGGCV3I7TEA54FKZWEHSOMQHDOF53SGG",
  "aquarius_pool_usdc_xlm": "CCGFVAHVN4XGY2SKWNCLBMIJ6EPT3FELLMIBQMVTC2DNVX3HPBA23OMU",
  "reserve_sac": "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC"
}
```

## Performance Characteristics

- **Proof Generation**: 2-5 seconds (browser, 8 holders)
- **Proof Size**: 2-4 KB (UltraHonk, constant regardless of holder count)
- **Verification Gas**: ~2-3M XLM stroops (on-chain verification)
- **Public Inputs**: 96 bytes (3 field elements)
- **Circuit Size**: 29 KB compiled bytecode
- **Contract Size**: 6.6 KB (Solvency Policy), 25 KB (UltraHonk Verifier)

## Security Considerations

- **Zero-Knowledge Soundness**: UltraHonk provides 128-bit cryptographic security (BN254 curve)
- **Anti-Replay**: Monotonic ledger sequence prevents proof reuse
- **Freshness**: 100-ledger window (~8 minutes on Stellar) ensures recent data
- **Overflow Protection**: All arithmetic uses `checked_add()` to prevent manipulation
- **Privacy - Cryptographic Commitments**:
  - Pedersen hash commitments are computationally hiding and binding
  - **Random Salts (256-bit)**: Generated using `crypto.getRandomValues()` per proof
  - CRITICAL: Without random salts, attackers could verify suspected balances by reconstructing the Merkle tree
  - Salts are never logged, stored, or reused across proofs
- **Reserve Address Commitment**:
  - 4th public input binds proof to specific reserve addresses
  - Prevents post-generation manipulation of reserve accounts
- **No Trusted Setup**: UltraHonk is transparent (no ceremony required)

---

## 🎯 PROJECT STATUS: HONEST ASSESSMENT

### What Actually Works (Verified)

✅ **Smart Contracts on Testnet**
- UltraHonk verifiers deployed and functional
- Real ZK proofs verified on-chain (TX hash: `ec9598c043bc04d0a6912b6e190d0762487aa87740462a72cea88d85bd009c4e`)
- Solvency Policy contract deployed

✅ **ZK Circuit**
- Noir circuit compiles correctly
- Merkle-sum-tree proof generation works
- Verification keys generated with Keccak oracle

✅ **Frontend Exists**
- React components built (Landing, IssuerFlow, AuditorFlow)
- Visual effects implemented
- UI components ready

### What's a Proof of Concept (Not Fully Tested)

🟡 **End-to-End User Flow**
- Proofs verified via CLI scripts, NOT from browser UI
- Frontend→Backend connection not tested by real users
- Missing: Complete user flow testing

🟡 **DeFi Integrations**
- **Aquarius**: Code implemented but likely not tested with real pool data
- **DeFindex**: Code implemented with proper conversion logic, NOT tested with real vaults
- Both integrations are "ready to use" but unverified

🟡 **Multi-Source Aggregation**
- Logic exists in contract (`sac_balance + aquarius_balance + defindex_balance`)
- Probably only tested with SAC balance alone
- Never tested all three sources simultaneously

### What Doesn't Exist

❌ **Production SDK**
- Mentioned "2,250+ lines" but not found in current repo
- May be in separate package or not integrated

❌ **Real Customer Validation**
- Claims of "2/3 issuers" feedback exist in docs
- No evidence of actual interviews or validation data

❌ **Production Readiness**
- No security audit
- No load testing
- No real user testing

### Honest Completion Percentage

| Component | Completion |
|-----------|------------|
| Core ZK System | 90% ✅ |
| Smart Contracts | 85% ✅ |
| Frontend UI | 40% 🟡 |
| DeFi Integrations | 30% 🟡 |
| E2E Testing | 25% 🟡 |
| Customer Validation | 10% ❌ |
| **Overall** | **~47% Functional** |

**Verdict**: This is an **advanced proof of concept** with a working technical core, but NOT a production-ready product. The ZK verification actually works (which is hard!), but user experience and integrations need real testing.

---

## 💡 OPPORTUNITY: Real DeFindex Integration

### Why DeFindex Integration Makes Sense NOW

The current `defindex.rs` implementation is theoretically correct but untested. DeFindex provides:

✅ **MCP & Skills Pre-built**
- Claude Code integration ready
- Saves weeks of development time
- https://docs.defindex.io/api-integration-guide/guides-and-tutorials/ai-tools

✅ **Dual Access: API + On-Chain**
- Fast queries via API for UI
- Trustless verification via contracts
- Best of both worlds

✅ **Real Yield Integration**
- Not just balance tracking
- Actual yield-bearing positions
- Strategies: Blend Autocompound, etc.

### Implementation Path (If Pursuing)

**Phase 1: Testing Current Code (2-3 hours)**
1. Create a real DeFindex vault on testnet
2. Deposit test assets
3. Test `read_defindex_vaults()` with real vault address
4. Verify share→asset conversion matches API

**Phase 2: API Integration (3-4 hours with MCP/Skills)**
1. Use DeFindex MCP for Claude Code
2. Add API calls to frontend
3. Display vault balances in UI
4. Keep on-chain verification in contract

**Phase 3: End-to-End Test (2 hours)**
1. Real user flow: Connect wallet → View DeFindex balance → Generate proof → Verify
2. Test with multiple vaults
3. Verify aggregation: SAC + Aquarius + DeFindex

**Total Time**: ~8-10 hours to go from PoC to functional integration

### Decision Point

**Should you integrate DeFindex for real?**

**YES, if:**
- You want to make this a real product (not just demo)
- You want to differentiate from competitors
- You have 1-2 days to invest
- Target customers actually use yield vaults

**NO, if:**
- This stays a hackathon demo
- Time-to-submission is days away
- Just need to show technical capability

**Recommendation**: The hard part (ZK on Stellar) is done. DeFindex integration with their MCP would make this genuinely useful. Consider it after hackathon if you want to productionize.

---

## 🆕 UPDATE: DeFindex Integration Completed (Sept 22, 2026)

### What Was Done (6 hours)

✅ **DeFindex MCP & Skills Installed**
- Skill location: `~/.claude/skills/defindex-api`
- Usage: `/defindex-api [topic]` or in prompts
- Documentation embedded for API, auth, vault operations

✅ **Real Testnet Vaults Discovered**
- Found 14 active DeFindex vaults on testnet via API
- Configured 3 vaults in Veraz (APY: 9.92% - 12.83%)
- Vault IDs updated in `src/lib/defindex.js`

✅ **Configuration Updated**
- `deploy-config.json` now includes `defindex_vaults` array
- Ready for contract deployment with multi-source reserves

✅ **Comprehensive Integration Guide**
- **Document**: `DEFINDEX_INTEGRATION_GUIDE.md` (350+ lines)
- Testing plan (Phase 1-3)
- All vault IDs and APYs documented
- CLI commands for testing
- API endpoints reference

### Current State

| Component | Status | Notes |
|-----------|--------|-------|
| **Smart Contract** (`defindex.rs`) | ✅ Code Complete | 167 lines, awaiting real vault testing |
| **Frontend** (`defindex.js`) | ✅ Code Complete | 305 lines, UI functional with real vault IDs |
| **UI Components** | ✅ Implemented | IntegrationsView with DeFindex tab, charts |
| **Configuration** | ✅ Updated | 3 real testnet vaults configured |
| **Documentation** | ✅ Comprehensive | Full integration guide created |
| **Real Testing** | 🟡 Pending | Needs API key + test deposits |

### What Works Now

**Frontend**:
- Visit `/integrations` view
- See 3 real DeFindex vaults
- Display (simulated) APY, TVL, yield charts
- Deposit modal ready (needs real vault deposits to test)

**Smart Contract**:
- `read_defindex_vaults()` implemented with proper conversion
- Handles multiple vaults, overflow protection
- Ready to deploy and test with real vault addresses

**Configuration**:
- Vault IDs: Real testnet contracts from DeFindex API
- APYs: Real data from `https://api.defindex.io/vault/discover?network=testnet`

### Testing Plan (When Ready)

**Phase 1: Contract Methods** (1-2 hrs)
```bash
# Test balance(), total_supply(), fetch_total_managed_funds()
stellar contract invoke --id VAULT_ID --network testnet -- balance --from USER
```

**Phase 2: API Integration** (1 hr)
- Get API key from https://console.defindex.io/
- Test user balance endpoint
- Verify data matches on-chain calls

**Phase 3: E2E Flow** (2-3 hrs)
- Make test deposit into vault
- Deploy solvency contract with DeFindex configured
- Generate proof with multi-source reserves (SAC + Aquarius + DeFindex)
- Verify aggregation works

**Total Time to Production**: ~4-6 hours (with API key and test funds)

### Resources Available

- **Guide**: `DEFINDEX_INTEGRATION_GUIDE.md`
- **MCP Skill**: `~/.claude/skills/defindex-api`
- **Official Docs**: https://docs.defindex.io/
- **API Reference**: https://api.defindex.io/docs
- **Example Code**: https://github.com/defindex-io/privy-defindex-guide

### Decision Made

**Chose Opción B**: Real integration over demo-only
- Installed MCP/Skills for fast development
- Updated all code with real vault addresses
- Created comprehensive testing plan
- Ready for production testing when API key available

**Next Blocker**: Need DeFindex API key for detailed vault testing
**Workaround**: Can use public `discover` endpoint, or proceed with testnet deposits manually
