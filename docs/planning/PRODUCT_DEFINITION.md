# VERAZ - PRODUCT DEFINITION

**Last Updated**: September 23, 2026
**Version**: 1.0 - Production-Ready
**Context**: Stellar Community Fund (SCF) - Build Integration Track

---

## TABLE OF CONTENTS

1. [Executive Summary](#executive-summary)
2. [Program Context](#program-context)
3. [Target Audience](#target-audience)
4. [Problem Statement](#problem-statement)
5. [Solution](#solution)
6. [Product Architecture](#product-architecture)
7. [Integration Strategy](#integration-strategy)
8. [Business Model](#business-model)
9. [Go-to-Market Strategy](#go-to-market-strategy)
10. [Technology Stack](#technology-stack)
11. [Roadmap](#roadmap)
12. [Success Metrics](#success-metrics)

---

## EXECUTIVE SUMMARY

### Product Name
**Veraz**

### Product Type
**Infrastructure-as-a-Service (Web App + API + Smart Contracts)**

### Tagline
> "Continuous Solvency Verification for Stellar DeFi Protocols"

### One-Liner
Veraz enables DeFi protocols on Stellar to prove solvency (reserves ≥ liabilities) through automated Zero-Knowledge proofs that aggregate reserves from multiple sources—SAC wallets, AMM pools, yield vaults, and cross-chain custody—while preserving user privacy.

### Key Differentiators
1. **Proof of Solvency (Not Just Reserves)**: We prove the complete equation `Reserves ≥ Liabilities`, not just "we have X in reserves"
2. **Multi-Source Reserve Aggregation**: ONLY solution that verifies reserves across SAC + DeFi (Aquarius, DeFindex, Blend, etc.)
3. **Cross-Chain Verification**: Supports cross-chain custody verification (e.g., Templar Protocol: NEAR custody ↔ Stellar settlement)
4. **DeFi Protocol Focus**: Purpose-built for protocols with complex reserve structures (vaults, pools, strategies), not simple stablecoin issuers
5. **Production-Ready Infrastructure**: NOT an MVP - full SaaS platform with API, webhooks, embeddable widgets
6. **UltraHonk (No Trusted Setup)**: More secure than Groth16 competitors (zkPOS)

### Proof of Reserves vs Proof of Solvency

**Important Distinction**:

**Proof of Reserves (PoR)**:
- ✅ Proves: "We have $100M in reserves"
- ❌ Doesn't prove: "How much do we owe?"
- ⚠️ Risk: Could have $100M reserves but owe $150M = **Insolvent**

**Proof of Solvency (PoS)** - What Veraz Does:
- ✅ Proves: "We have $100M in reserves"
- ✅ Proves: "We owe $95M in liabilities"
- ✅ Proves: "$100M ≥ $95M = **Solvent**"

**Why This Matters**: Post-FTX, proving you have reserves is not enough. Users need to know the **full equation** to assess risk. Veraz verifies solvency, not just reserves.

### Competitive Positioning vs zkPOS

While zkPOS is an excellent Proof of Solvency solution for **stablecoin issuers**, Veraz is purpose-built for **DeFi protocols** with fundamentally different requirements:

| Dimension | zkPOS | Veraz |
|-----------|-------|-------|
| **Target Audience** | Stablecoin issuers (Circle, USDC clones) | DeFi protocols (vaults, AMMs, lending) |
| **Reserve Sources** | Single SAC wallet | Multi-source (SAC + DeFi + cross-chain) |
| **Use Case** | "Our stablecoin is backed 1:1" | "Our vault/pool is fully collateralized" |
| **Privacy Scope** | Customer balances only | Customer balances + strategy allocations |
| **Product Type** | Badge for issuer websites | Infrastructure platform (API, webhooks, dashboard) |
| **ZK System** | Groth16 (trusted setup) | UltraHonk (no trusted setup) |
| **Proof Size** | 200-300 bytes | 2-4 KB |
| **Security Features** | Non-omission, risk limits, downgrade protection | Multi-source aggregation, cross-chain verification |

**Our Niche**: DeFi protocols that manage assets across **multiple venues** (Aquarius pools, DeFindex vaults, Blend positions, cross-chain custody). zkPOS cannot verify these complex reserve structures.

**Strategic Positioning**:
> "While zkPOS serves stablecoin issuers with simple reserve structures, Veraz is the infrastructure layer for modern DeFi protocols that need to prove solvency across wallets, AMM pools, yield strategies, and cross-chain custody."

---

## PROGRAM CONTEXT

### Stellar Community Fund (SCF) - Build Integration Track

**Requirements**:
- ✅ Must integrate with **at least one** building block from SCF Integration List
- ✅ Majority of budget goes towards integration costs
- ✅ Estimated integration time: 1-2 weeks per building block
- ✅ Must ship **production-ready** product (NOT MVP/PoC)

**Funding Goal**: Enable high-quality integrations that expand Stellar's utility for developers and users.

**Selected Integrations**:
1. **DeFindex** (Primary) - Yield infrastructure
2. **Aquarius** (Secondary) - DEX/AMM protocol
3. **Templar Protocol** (Tertiary) - Cross-chain lending
4. **Blend v2** (Future) - Lending protocol
5. **Stellar Broker** (Future) - Multi-source swap router

---

## TARGET AUDIENCE

### Primary: DeFi Protocols on SCF Integration List

**Tier 1 Targets** (Highest Need for PoR):
1. **DeFindex** - Yield vaults ($M TVL)
   - Contact: @devmonsterblock, @esteblock, @yripper (Discord)
   - Need: Prove vault assets = user deposits
   - Integration: ✅ Already implemented (`defindex.rs`)

2. **Blend v2** - Lending protocol
   - Contact: @berry, @mootz12, @! markus_0 (Discord)
   - Need: Prove pool collateral ratio
   - Integration: Similar to DeFindex

3. **Templar Protocol** - Cross-chain lending
   - Contact: dev@templarprotocol.com
   - Need: Verify NEAR custody = Stellar liabilities
   - Integration: Cross-chain oracle verification

**Tier 2 Targets**:
4. **Aquarius** - DEX/AMM
   - Need: Prove pool reserves = LP tokens issued
   - Integration: ✅ Partially implemented (`aquarius.rs`)

5. **Soroswap** - AMM
   - Need: Similar to Aquarius
   - Integration: Reuse Aquarius logic

6. **Stellar Broker** - Multi-source liquidity router
   - Need: Verify aggregated liquidity sources
   - Integration: Perfect fit for multi-source aggregation

### Customer Personas

#### Persona 1: "Protocol Paul" - DeFindex Vault Admin
- **Role**: Protocol developer/admin
- **Pain**: Users fear vault admins can steal funds
- **Goal**: Build trust with "Provably Backed" badge
- **Budget**: $0-$500/month (starting)
- **Technical Level**: High (can integrate APIs)

#### Persona 2: "Security Sarah" - Blend Pool Manager
- **Role**: DeFi protocol operations
- **Pain**: Users can't verify pool health externally
- **Goal**: Prevent bank runs during market volatility
- **Budget**: $2,500/month (enterprise)
- **Technical Level**: Medium (needs docs)

#### Persona 3: "Cross-Chain Chris" - Templar Protocol Founder
- **Role**: Protocol founder
- **Pain**: Users don't trust NEAR ↔ Stellar custody
- **Goal**: Differentiate with cross-chain verification
- **Budget**: $10,000/month (custom integration)
- **Technical Level**: Very High (will build custom)

---

## PROBLEM STATEMENT

### Core Problem

> **"As a DeFi protocol on Stellar, I need to PROVE to my users that the funds in my smart contracts are safe and fully backed, in real-time, to prevent bank runs and gain trust."**

### Specific Pain Points by Protocol Type

#### DeFi Vaults (DeFindex)
- ❌ Users fear vault admins can steal funds
- ❌ No way to verify TVL shown = actual on-chain balance
- ❌ Yield strategies are opaque (where are assets invested?)
- ❌ Competitors can claim higher APY without verification

#### Lending Protocols (Blend, Templar)
- ❌ Borrowers fear insufficient liquidity to withdraw
- ❌ Lenders fear over-leveraged positions
- ❌ Pool health is not verifiable externally
- ❌ Post-FTX, users demand transparency

#### AMMs/DEXs (Aquarius, Soroswap)
- ❌ Liquidity pools must prove reserves = LP tokens issued
- ❌ Impermanent loss concerns
- ❌ No verification of actual vs claimed TVL

#### Cross-Chain Protocols (Templar)
- ❌ Custody on NEAR, settlement on Stellar = trust gap
- ❌ Users can't verify collateral exists on other chain
- ❌ Bridge risk perception (even without traditional bridge)

### Market Context
- **Post-FTX Crisis**: Users demand proof, not promises
- **Regulatory Pressure**: MiCA (Europe), Basel III require transparency
- **Competitive Advantage**: "Provably solvent" is a marketing differentiator
- **Ecosystem Growth**: Stellar DeFi TVL growing, protocols need trust infrastructure

---

## SOLUTION

### How Veraz Works

Veraz enables DeFi protocols to generate automated, continuous Zero-Knowledge proofs that their smart contracts are fully backed by:

1. **Multi-Source Reserve Aggregation**
   ```
   Total Reserves = SAC Wallets
                  + DeFindex Vaults
                  + Aquarius Pools
                  + Blend Collateral
                  + Templar Custody (cross-chain)
                  + Custom Sources
   ```

2. **Zero-Knowledge Privacy**
   - Protocols prove reserves ≥ liabilities
   - WITHOUT revealing individual holder balances
   - WITHOUT exposing competitive info (strategy allocations)

3. **Continuous Attestation**
   - Automated proofs every hour/day
   - Event-triggered proofs (on large withdrawals)
   - 1-click manual proof generation
   - Alert system when collateral < threshold

4. **Public Verification**
   - Embeddable solvency badge for protocol UIs
   - Public proof explorer (veraz.io/protocol/{id})
   - REST API for programmatic verification
   - On-chain attestation registry

### Value Proposition by Stakeholder

**For Protocols**:
- ✅ Build user trust with "Provably Backed" badge
- ✅ Prevent bank runs during market volatility
- ✅ Marketing differentiation vs competitors
- ✅ Automated compliance reporting (future)
- ✅ Reduce audit costs (manual → automated)

**For Users**:
- ✅ Verify protocol solvency 24/7 (not just quarterly)
- ✅ See real-time reserve breakdown (SAC vs DeFi)
- ✅ Get alerts if protocol becomes under-collateralized
- ✅ Privacy-preserved inclusion proofs (future)

**For Ecosystem**:
- ✅ Raises trust in Stellar DeFi overall
- ✅ Attracts institutional capital (verified safety)
- ✅ Enables new protocol types (requires PoR)
- ✅ Network effects (more protocols → more visibility)

---

## PRODUCT ARCHITECTURE

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│  VERAZ PLATFORM (Production-Ready)                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. PROTOCOL DASHBOARD (React Web App)                      │
│     ├─ Onboarding (15 mins)                                 │
│     │   ├─ Connect admin wallet (Freighter/Stellar Wallets) │
│     │   ├─ Register smart contracts to monitor              │
│     │   └─ Configure attestation frequency                  │
│     │                                                        │
│     ├─ Multi-Source Integration (Auto-detect)               │
│     │   ├─ SAC Wallets (direct balances)                    │
│     │   ├─ DeFindex Vaults (via contract calls)             │
│     │   ├─ Aquarius Pools (via share tokens)                │
│     │   ├─ Blend Pools (collateral tracking)                │
│     │   ├─ Templar Custody (cross-chain via API)            │
│     │   └─ Custom contracts (generic interface)             │
│     │                                                        │
│     ├─ Automated Attestation Engine                         │
│     │   ├─ Scheduled proofs (hourly/daily)                  │
│     │   ├─ Event-triggered proofs (on large withdrawals)    │
│     │   ├─ 1-click manual proof generation                  │
│     │   └─ Alert system (collateral < threshold)            │
│     │                                                        │
│     └─ Analytics & Monitoring                               │
│         ├─ Real-time reserve breakdown                      │
│         ├─ Historical collateral ratio                      │
│         ├─ Proof success/failure log                        │
│         └─ Gas cost tracking                                │
│                                                             │
│  2. PUBLIC VERIFICATION (Embeddable)                        │
│     ├─ Solvency Badge (React component)                     │
│     │   <VerazBadge protocol="defindex-vault-1" />          │
│     │   Shows: "✓ Fully Backed (105.2%)" + timestamp        │
│     │                                                        │
│     ├─ Proof Explorer (Public page)                         │
│     │   veraz.io/protocol/defindex-vault-1                  │
│     │   ├─ Latest attestation                               │
│     │   ├─ Historical proofs (graph)                        │
│     │   ├─ Reserve breakdown (pie chart)                    │
│     │   └─ Verify proof on Stellar (link to txn)            │
│     │                                                        │
│     └─ Embeddable Widget (iframe)                           │
│         <iframe src="veraz.io/widget/VAULT_ID" />           │
│                                                             │
│  3. DEVELOPER API (RESTful + Webhooks)                      │
│     ├─ REST Endpoints                                       │
│     │   GET /api/v1/protocol/{id}/solvency                  │
│     │   GET /api/v1/protocol/{id}/reserves                  │
│     │   GET /api/v1/protocol/{id}/history                   │
│     │   POST /api/v1/protocol/{id}/attest (trigger proof)   │
│     │                                                        │
│     ├─ Webhooks                                             │
│     │   POST {your-url}/veraz/proof-completed               │
│     │   POST {your-url}/veraz/solvency-alert                │
│     │   POST {your-url}/veraz/proof-failed                  │
│     │                                                        │
│     └─ GraphQL (optional)                                   │
│         query { protocol(id) { solvency reserves } }        │
│                                                             │
│  4. SMART CONTRACTS (Soroban)                               │
│     ├─ UltraHonk Verifier (deployed)                        │
│     │   verify_proof(public_inputs, proof) -> bool          │
│     │                                                        │
│     ├─ Solvency Registry (NEW)                              │
│     │   register_protocol(admin, sources)                   │
│     │   attest(protocol_id, proof, reserves)                │
│     │   query_solvency(protocol_id) -> Attestation          │
│     │                                                        │
│     └─ Integration Adapters                                 │
│         ├─ DeFindexAdapter (read vault balances)            │
│         ├─ AquariusAdapter (read pool shares)               │
│         ├─ BlendAdapter (read pool collateral)              │
│         └─ TemplarAdapter (cross-chain via oracle)          │
│                                                             │
│  5. OFF-CHAIN INFRASTRUCTURE                                │
│     ├─ Proof Generation Service (Node.js worker)            │
│     │   ├─ Polls protocols for balance updates              │
│     │   ├─ Aggregates multi-source reserves                 │
│     │   ├─ Generates Noir proof (bb.js)                     │
│     │   └─ Submits to Soroban contract                      │
│     │                                                        │
│     ├─ Monitoring Service                                   │
│     │   ├─ Health checks (every 5 mins)                     │
│     │   ├─ Alert triggers (ratio < threshold)               │
│     │   └─ Webhook dispatcher                               │
│     │                                                        │
│     └─ Database (PostgreSQL)                                │
│         ├─ protocols (id, admin, sources, config)           │
│         ├─ attestations (proof, timestamp, reserves)        │
│         ├─ alerts (type, severity, resolved)                │
│         └─ api_keys (protocol_id, key, rate_limits)         │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Protocol    │────▶│  Veraz API   │────▶│  Aggregator  │
│  (DeFindex)  │     │              │     │  Service     │
└──────────────┘     └──────────────┘     └──────┬───────┘
                                                  │
                    ┌─────────────────────────────┘
                    │
                    ▼
    ┌───────────────────────────────────────┐
    │  Multi-Source Reserve Reader          │
    ├───────────────────────────────────────┤
    │  ├─ SAC Balance: 5,000,000 USDC       │
    │  ├─ DeFindex Vault: 3,000,000 USDC    │
    │  ├─ Aquarius Pool: 2,000,000 USDC     │
    │  └─ Total: 10,000,000 USDC            │
    └───────────────┬───────────────────────┘
                    │
                    ▼
    ┌───────────────────────────────────────┐
    │  ZK Proof Generator (Noir + bb.js)    │
    ├───────────────────────────────────────┤
    │  Input:                                │
    │    - Liabilities: 9,500,000 USDC       │
    │    - Reserves: 10,000,000 USDC         │
    │    - Merkle tree of holder balances    │
    │  Output:                               │
    │    - Proof: 2KB UltraHonk proof        │
    │    - Public inputs: root, total, seq   │
    └───────────────┬───────────────────────┘
                    │
                    ▼
    ┌───────────────────────────────────────┐
    │  Soroban Smart Contract               │
    ├───────────────────────────────────────┤
    │  1. Verify proof (UltraHonk)           │
    │  2. Check reserves ≥ liabilities       │
    │  3. Store attestation on-chain         │
    │  4. Emit events (proof verified)       │
    └───────────────┬───────────────────────┘
                    │
                    ▼
    ┌───────────────────────────────────────┐
    │  Public Verification                  │
    ├───────────────────────────────────────┤
    │  ├─ Badge: "✓ Fully Backed (105%)"    │
    │  ├─ Explorer: veraz.io/protocol/xxx   │
    │  ├─ API: GET /solvency                │
    │  └─ Widget: <iframe src="..." />      │
    └───────────────────────────────────────┘
```

---

## INTEGRATION STRATEGY

### Primary Integration: DeFindex ✅

**Status**: Already implemented (`contracts/solvency_policy/src/defindex.rs`)

**Integration Details**:
- **What**: Read vault balances and convert shares → assets
- **How**: Cross-contract calls to DeFindex vault contracts
- **Functions Used**:
  - `balance(user)` - Get user's vault shares
  - `total_supply()` - Get total vault shares
  - `fetch_total_managed_funds()` - Get total assets under management
- **Calculation**: `asset_value = (user_shares * total_assets) / total_supply`

**What's Missing for Production**:
- [ ] Testing with real testnet vaults (deposits/withdrawals)
- [ ] UI dashboard for DeFindex vault admins
- [ ] Public solvency badge component
- [ ] Automated proof scheduling (hourly/daily)
- [ ] Documentation & integration tutorials
- [ ] Error handling & edge cases

**Timeline**: 1-2 weeks (SCF estimate)

**Contact**:
- Discord: @devmonsterblock, @esteblock, @yripper
- Team: Palta Labs

---

### Secondary Integration: Aquarius ✅

**Status**: Partially implemented (`contracts/solvency_policy/src/aquarius.rs`)

**Integration Details**:
- **What**: Read AMM pool reserves and LP token balances
- **How**:
  1. Get pool's share token address via `share_id()`
  2. Query user's LP token balance via `balance(user)`
  3. Convert LP tokens → underlying asset value
- **Contracts**: Pool contract + Share token contract

**What's Missing**:
- [ ] Testing with real Aquarius pools
- [ ] Multi-pool aggregation logic
- [ ] LP token → asset value conversion
- [ ] UI for pool monitoring

**Timeline**: 3-5 days

**Contact**:
- Discord: (see SCF Integration List)

---

### Tertiary Integration: Templar Protocol (Cross-Chain)

**Status**: Not started (NEW differentiation feature)

**Why Templar**:
- ✅ Cross-chain lending (NEAR custody ↔ Stellar settlement)
- ✅ Nobody else does cross-chain PoR (unique to Veraz)
- ✅ High value: Custody verification is critical for trust

**Integration Approach**:

```rust
// contracts/solvency_policy/src/templar.rs
pub fn verify_templar_collateral(
    env: &Env,
    stellar_vault: Address,      // Templar vault on Stellar
    near_custody_account: String, // MPC account on NEAR
) -> Result<i128, Error> {
    // 1. Query Stellar vault liabilities
    let liabilities = stellar_vault.get_total_deposits()?;

    // 2. Cross-chain oracle call to verify NEAR custody balance
    // Options:
    //   a) Use Templar's own API (centralized but fast)
    //   b) Use Wormhole/Axelar oracle (decentralized but complex)
    //   c) Use NEAR light client on Stellar (future)
    let near_balance = query_near_balance_via_oracle(near_custody_account)?;

    // 3. Verify collateral >= liabilities
    require!(near_balance >= liabilities, Error::Insolvent);

    Ok(near_balance)
}
```

**Implementation Options**:
1. **Phase 1** (Fast): Use Templar API for NEAR balance queries
2. **Phase 2** (Decentralized): Integrate Wormhole/Axelar cross-chain oracle
3. **Phase 3** (Future): NEAR light client on Stellar

**Timeline**: 1 week (Phase 1), 2-3 weeks (Phase 2)

**Contact**:
- Email: dev@templarprotocol.com
- Discord: (join from website)

---

### Future Integrations

**Blend v2** (Lending)
- **Need**: Verify pool collateral ratios
- **Timeline**: 1-2 weeks
- **Contact**: @berry, @mootz12, @! markus_0 (Discord)

**Stellar Broker** (Liquidity Router)
- **Need**: Multi-source liquidity verification
- **Timeline**: 1 week
- **Contact**: info@stellar.broker

**Soroswap** (AMM)
- **Need**: Similar to Aquarius
- **Timeline**: 3-5 days (reuse Aquarius logic)

---

## BUSINESS MODEL

### Freemium SaaS Model

**Rationale**:
- SCF prioritizes **adoption over revenue** (Year 1)
- Protocols have limited budgets early-stage
- Better to get 10 protocols using free than 2 paying
- Revenue comes later via upsells + enterprise features

### Pricing Tiers

| Tier | Price/Month | Features | Target Audience |
|------|-------------|----------|-----------------|
| **Free** | $0 | • 1 protocol<br>• Daily attestations<br>• Public badge<br>• API (1,000 requests/month)<br>• Community support | All protocols on SCF list<br>Early-stage projects |
| **Pro** | $500 | • 5 protocols<br>• Hourly attestations<br>• Custom branding<br>• API (10,000 requests/month)<br>• Webhook support<br>• Email support | Growing protocols<br>Mid-sized vaults/pools |
| **Enterprise** | $2,500+ | • Unlimited protocols<br>• Real-time attestations<br>• White-label solution<br>• API (unlimited)<br>• Dedicated support<br>• SLA guarantees<br>• Custom integrations | Large protocols (Blend, DeFindex)<br>Institutional-grade |

### Add-Ons (Future)

- **Additional Data Sources**: $200/month each
- **Custom Contract Adapters**: $1,000 one-time
- **White-Label Dashboard**: $5,000/month
- **Regulatory Reports**: $1,000/month
- **Priority Support**: $500/month

### Revenue Projections

**Year 1** (Adoption Focus):
- 20 Free tier users
- 5 Pro tier: $2,500/month
- 2 Enterprise tier: $5,000/month
- **Total MRR**: $7,500
- **Total ARR**: $90,000

**Year 2** (Monetization):
- 50 Free tier (upsell funnel)
- 15 Pro tier: $7,500/month
- 5 Enterprise tier: $12,500/month
- **Total MRR**: $20,000
- **Total ARR**: $240,000

**Year 3** (Scale):
- 100 Free tier
- 30 Pro tier: $15,000/month
- 10 Enterprise tier: $25,000/month
- **Total MRR**: $40,000
- **Total ARR**: $480,000

### Alternative Models Considered

**Pay-Per-Proof**:
- $10 per attestation
- Volume discounts (10+ = $7, 50+ = $5)
- **Rejected**: Unpredictable revenue, harder to budget for protocols

**Auditor Partnership (B2B2C)**:
- White-label to audit firms (Armanino, Hacken)
- They charge clients $50K-$100K/year
- We charge them $10K-$20K/year wholesale
- **Future Option**: After product-market fit

---

## GO-TO-MARKET STRATEGY

### Phase 1: Direct Integration (Month 1-2)

**Goal**: Launch with 5 protocols from SCF Integration List

**Target Protocols**:
1. **DeFindex** (Priority #1)
   - Pitch: "Add 'Provably Backed' badge to vault UI"
   - Contact: @devmonsterblock, @esteblock via Discord
   - Timeline: 1 week integration + 1 week testing

2. **Aquarius**
   - Pitch: "Verify pool reserves = LP tokens issued"
   - Contact: Discord (see SCF list)
   - Timeline: 3 days

3. **Blend v2**
   - Pitch: "Real-time pool collateral verification"
   - Contact: @berry, @mootz12 via Discord
   - Timeline: 1 week

4. **Templar**
   - Pitch: "Cross-chain custody verification (NEAR ↔ Stellar)"
   - Contact: dev@templarprotocol.com
   - Timeline: 1-2 weeks

5. **Stellar Broker**
   - Pitch: "Multi-source liquidity verification"
   - Contact: info@stellar.broker
   - Timeline: 1 week

**Outreach Sequence**:
1. **Week 1**: Warm intro via Discord/email
2. **Week 2**: Demo call (15 mins) - show dashboard + live proof
3. **Week 3-4**: Integration sprint (collaborative)
4. **Week 5**: Launch partner case study

---

### Phase 2: Ecosystem Amplification (Month 3)

**Content Marketing**:
1. **SCF Blog Post**: "Introducing Veraz: Proof-of-Reserves for Stellar DeFi"
2. **Partner Case Studies**:
   - "How DeFindex Uses Veraz to Prove $10M TVL"
   - "Blend's Real-Time Collateral Verification"
3. **Developer Tutorial**: "Add Veraz Badge to Your Protocol (15 Minutes)"
4. **Technical Deep Dive**: "How UltraHonk Proofs Work on Soroban"

**Community Engagement**:
- Stellar Discord: Answer dev questions, share updates
- Stellar Stack Exchange: Write detailed answers about PoR
- Twitter/X: Launch thread + weekly updates
- Meridian Conference: Booth/demo presentation

**Developer Experience**:
- Comprehensive docs (docs.veraz.io)
- Interactive API playground
- GitHub repo with examples
- Video tutorials (YouTube)

---

### Phase 3: Viral Growth (Month 4+)

**Embeddable Badge Strategy**:
```jsx
// Every protocol embeds badge on their site
<VerazBadge protocol="defindex-vault-1" theme="dark" />

// Badge displays on protocol UI
// Users click → veraz.io/protocol/defindex-vault-1
// Users discover other protocols using Veraz
// Network effects begin
```

**Referral Program**:
- Protocols get 1 month free Pro for each referral
- Referred protocol gets 20% off first year
- Create affiliate links for tracking

**Ecosystem Partnerships**:
- **Wallet Integrations**: Show Veraz badges in Freighter, xBull
- **DEX Integrations**: Display badges on token listings
- **Data Aggregators**: CoinGecko, DeFiLlama integration

**API-First Distribution**:
```typescript
// Public API enables ecosystem integrations
GET https://api.veraz.io/protocol/{id}/solvency

// Use cases:
// - Wallets check before adding new token
// - DEXes show badge on listings
// - Dashboards pull solvency data
// - Bots monitor for alerts
```

---

## TECHNOLOGY STACK

### Frontend

**Framework**: React 18 + Vite
- **Why**: Fast HMR, modern tooling, ecosystem support
- **Alternatives Considered**: Next.js (overkill for SPA), Svelte (smaller ecosystem)

**Styling**: TailwindCSS + Framer Motion
- **Why**: Rapid prototyping, consistent design system, smooth animations
- **Components**: shadcn/ui (customizable, accessible)

**State Management**: React Query + Zustand
- **React Query**: Server state (API calls, caching)
- **Zustand**: Client state (UI state, user preferences)
- **Why**: Simple, performant, less boilerplate than Redux

**Wallet Integration**: Stellar Wallets Kit
- **Why**: Multi-wallet support (Freighter, xBull, Lobstr, etc.)
- **Fallback**: Direct Freighter API for critical flows

**Data Visualization**: Recharts
- **Use Cases**: Proof history graphs, reserve breakdown pie charts, collateral ratio over time
- **Why**: React-native, composable, responsive

**Hosting**: Vercel
- **Why**: Zero-config, auto-deploy from GitHub, global CDN, edge functions
- **Cost**: Free tier → $20/month (Pro) when scaling

---

### Backend

**API Framework**: Node.js + Express + TypeScript
- **Why**: Type safety, fast development, huge ecosystem
- **Alternatives**: Fastify (considered for perf), NestJS (too heavyweight)

**Database**: PostgreSQL (via Supabase or Railway)
- **Schema**:
  ```sql
  protocols (
    id, admin_address, name, description,
    config_json, created_at, updated_at
  )

  attestations (
    id, protocol_id, proof_hash, reserves,
    liabilities, ratio, ledger_seq, timestamp
  )

  alerts (
    id, protocol_id, type, severity,
    message, resolved, created_at
  )

  api_keys (
    id, protocol_id, key_hash, rate_limit,
    last_used, created_at
  )
  ```

**Job Queue**: BullMQ (Redis-backed)
- **Use Cases**:
  - Scheduled proof generation
  - Async proof processing
  - Webhook delivery with retry
- **Why**: Reliable, persistent, great dashboard

**Monitoring**: Sentry + Logtail
- **Sentry**: Error tracking, performance monitoring
- **Logtail**: Structured logging, log aggregation
- **Alerts**: Slack/Discord webhooks

**Hosting**: Railway or Render
- **Why**: Easy deployment, managed Postgres, fair pricing
- **Cost**: ~$20-50/month (starter), scales with usage

---

### Blockchain

**Network**: Stellar Testnet → Mainnet
- **RPC Providers**:
  - Stellar.org RPC (free, rate-limited)
  - Validation Cloud (paid, higher limits)
  - Self-hosted Stellar Core (future)

**Smart Contracts**: Soroban (Rust)
- **Existing Contracts**:
  - UltraHonk Verifier: `CDJJV27KD5QBVH5JKUBAH6Y6FEA5WTYMAF2VGSTQRTJJFN4JLC2QVE22`
  - Solvency Policy: `CC5XFT7XZXKJEONWOBALJTSKYGGCV3I7TEA54FKZWEHSOMQHDOF53SGG` (old)
- **New Contracts**:
  - Solvency Registry (multi-protocol support)
  - Integration Adapters (DeFindex, Aquarius, Templar, etc.)

**SDK**: @stellar/stellar-sdk
- **Why**: Official SDK, well-maintained, TypeScript support

**Wallet Signing**: Stellar Wallets Kit + Freighter fallback
- **Flow**: User connects → Signs attestation tx → Contract verifies

---

### Zero-Knowledge System

**Circuit Language**: Noir (Aztec)
- **Why**: Modern syntax, good docs, active development
- **Version**: 1.0.0-beta.22 (latest stable)

**Proving System**: UltraHonk (BN254)
- **Why**: No trusted setup (transparent), 128-bit security
- **Alternatives**: Groth16 (smaller proofs but needs ceremony)

**Proving Backend**: bb.js (Barretenberg)
- **Where**: Browser (client-side) or Node.js (server-side)
- **Why**: WASM-based, runs anywhere, ~3-5s proof generation

**Circuit Size**: ~30 KB compiled
- **Inputs**: 8 holder balances (demo), scalable to 64+
- **Proof Size**: 2-4 KB (constant regardless of holder count)
- **Public Inputs**: 96 bytes (root, liabilities, ledger_seq)

---

### DevOps

**Version Control**: GitHub
- **Monorepo Structure**:
  ```
  veraz/
  ├── packages/
  │   ├── frontend/     (React app)
  │   ├── backend/      (Node.js API)
  │   ├── contracts/    (Soroban contracts)
  │   ├── circuits/     (Noir ZK circuits)
  │   └── sdk/          (Client SDK for protocols)
  ├── docs/             (Documentation site)
  └── scripts/          (Deployment, testing)
  ```

**CI/CD**: GitHub Actions
- **Pipelines**:
  - Frontend: Lint → Test → Build → Deploy (Vercel)
  - Backend: Lint → Test → Build → Deploy (Railway)
  - Contracts: Build → Test → Deploy (Stellar testnet)
  - Circuits: Compile → Generate VK → Test

**Testing**:
- **Unit Tests**: Jest (backend), Vitest (frontend)
- **Integration Tests**: Supertest (API), Playwright (E2E)
- **Contract Tests**: Soroban CLI + Rust tests
- **Circuit Tests**: Nargo test

**Documentation**: Mintlify or Docusaurus
- **Sections**:
  - Getting Started
  - Integration Guides (DeFindex, Aquarius, etc.)
  - API Reference
  - Smart Contract Docs
  - ZK Proof Explainers

**Status Page**: status.veraz.io (Statuspage.io or custom)
- **Monitors**: API uptime, proof generation success rate, blockchain health

---

## ROADMAP

### Weeks 1-2: DeFindex Integration (Priority)

**Week 1**:
- [x] Contact DeFindex team (@devmonsterblock, @esteblock)
- [ ] Test existing `defindex.rs` module with real vaults
- [ ] Fix any bugs in share → asset conversion logic
- [ ] Build Protocol Dashboard (basic UI)
  - Onboarding flow (connect wallet)
  - Link DeFindex vault contract
  - 1-click proof generation
- [ ] Deploy Solvency Registry contract to testnet

**Week 2**:
- [ ] Implement automated proof scheduling (cron jobs)
- [ ] Build public verification page (veraz.io/protocol/{id})
- [ ] Create embeddable badge component
- [ ] Write DeFindex integration docs
- [ ] Test end-to-end: Vault → Proof → Badge
- [ ] Launch with 1 DeFindex vault (beta)

**Deliverable**: Working DeFindex integration, live on testnet

---

### Weeks 3-4: Aquarius + Public API

**Week 3**:
- [ ] Complete Aquarius integration (`aquarius.rs`)
- [ ] Test with real Aquarius pools
- [ ] Implement multi-pool aggregation
- [ ] Add Aquarius to dashboard UI

**Week 4**:
- [ ] Build REST API (Express + TypeScript)
  - `GET /protocol/{id}/solvency`
  - `GET /protocol/{id}/reserves`
  - `GET /protocol/{id}/history`
  - `POST /protocol/{id}/attest`
- [ ] Implement API authentication (API keys)
- [ ] Add rate limiting (10 req/sec)
- [ ] Write API documentation (Swagger/OpenAPI)
- [ ] Launch API + Aquarius integration

**Deliverable**: Public API + Aquarius support

---

### Weeks 5-6: Templar Cross-Chain + Polish

**Week 5**:
- [ ] Research Templar architecture (NEAR MPC custody)
- [ ] Implement Templar adapter (via API or oracle)
- [ ] Test cross-chain verification flow
- [ ] Add to dashboard UI

**Week 6**:
- [ ] Polish dashboard UX/UI
- [ ] Add error handling & edge cases
- [ ] Implement webhook system
- [ ] Build embeddable widget (iframe version)
- [ ] Create landing page (veraz.io)
- [ ] Write comprehensive docs (Getting Started, tutorials)

**Deliverable**: Cross-chain support + production-ready platform

---

### Weeks 7-8: Launch + Onboarding

**Week 7**:
- [ ] Deploy to mainnet (smart contracts)
- [ ] Migrate database to production
- [ ] Set up monitoring (Sentry, Logtail)
- [ ] Security audit (internal review)
- [ ] Beta testing with 3-5 protocols

**Week 8**:
- [ ] Public launch (blog post, social media)
- [ ] Onboard first 10 protocols
- [ ] Collect feedback + iterate
- [ ] Meridian prep (if applicable)
- [ ] Create case studies

**Deliverable**: Public launch with 10+ protocol integrations

---

### Future Roadmap (Month 3+)

**Q1 2027**:
- [ ] Blend v2 integration
- [ ] Soroswap integration
- [ ] Stellar Broker integration
- [ ] White-label dashboard
- [ ] Regulatory reporting module

**Q2 2027**:
- [ ] Non-omission via self-registration
- [ ] Privacy-preserving holder inclusion proofs
- [ ] Automated collateral rebalancing alerts
- [ ] Insurance protocol integration (when available)

**Q3 2027**:
- [ ] Cross-chain expansion (Ethereum, Polygon)
- [ ] AI-powered fraud detection
- [ ] Mobile app (iOS/Android)
- [ ] Decentralized reputation system

---

## SUCCESS METRICS

### Product Metrics

**Adoption**:
- **Target Year 1**: 20 protocols integrated
- **Target Year 2**: 50 protocols integrated
- **Leading Indicator**: 5+ protocols in Month 1

**Engagement**:
- **Active Protocols**: Protocols generating ≥1 proof/week
- **Target Year 1**: 80% of integrated protocols active
- **API Usage**: 100K+ requests/month by Month 6

**Reliability**:
- **Proof Success Rate**: ≥99% (proofs that verify correctly)
- **Uptime**: 99.9% (API + dashboard availability)
- **Avg Proof Generation Time**: <5 seconds

### Business Metrics

**Revenue** (Year 1):
- **MRR**: $7,500 by Month 12
- **ARR**: $90,000
- **Customer Acquisition Cost (CAC)**: <$500/protocol
- **Lifetime Value (LTV)**: $18,000/protocol (3 years avg)
- **LTV:CAC Ratio**: 36:1 (target: >3:1)

**Growth**:
- **Month-over-Month Growth**: 20%+ new protocols
- **Churn Rate**: <5% monthly
- **Expansion Revenue**: 30% of MRR (free → paid upgrades)

### Ecosystem Impact

**Trust Metrics**:
- **TVL Verified**: $50M+ in protocol assets verified
- **Proofs Generated**: 10,000+ attestations by Month 12
- **Public Verifications**: 100,000+ badge views/month

**Developer Experience**:
- **Time to First Proof**: <30 minutes (from signup to live proof)
- **Documentation NPS**: ≥50 (Net Promoter Score)
- **Support Response Time**: <4 hours (business hours)

**Community**:
- **GitHub Stars**: 100+ by Month 6
- **Discord Members**: 500+ developers
- **Case Studies**: 5+ published by Month 12

---

## APPENDIX

### Competitor Analysis: Veraz vs zkPOS

| Feature | Veraz | zkPOS |
|---------|-------|-------|
| **Multi-Source Aggregation** | ✅ SAC + DeFi (Aquarius, DeFindex, Blend) | ❌ SAC only |
| **Cross-Chain Verification** | ✅ Templar (NEAR ↔ Stellar) | ❌ Not supported |
| **ZK Proof System** | UltraHonk (no trusted setup) | Groth16 (trusted setup) |
| **Proof Size** | 2-4 KB | 200-300 bytes |
| **Target Audience** | DeFi Protocols | Stablecoin Issuers |
| **Non-Omission** | ❌ Not yet (roadmap) | ✅ Via self-registration |
| **Risk Limits** | ❌ Not yet (roadmap) | ✅ In-circuit enforcement |
| **Downgrade Protection** | ❌ Not yet (roadmap) | ✅ Prevents downgrades |
| **Product Maturity** | Production (SaaS + API) | Proof of Concept |

**Veraz Wins On**:
1. ✅ DeFi integration (multi-source reserves)
2. ✅ Cross-chain verification
3. ✅ Modern crypto (UltraHonk)
4. ✅ Production infrastructure (API, webhooks, dashboard)

**zkPOS Wins On**:
1. ✅ Smaller proofs (Groth16)
2. ✅ Security features (non-omission, risk limits)
3. ✅ Test coverage (26 passing tests)

**Strategic Positioning**:
> "Veraz is the ONLY Proof-of-Reserves solution that understands modern DeFi. While zkPOS focuses on stablecoins with single SAC wallets, Veraz verifies solvency across wallets, AMM pools, yield vaults, and even cross-chain custody."

---

### Risk Mitigation

**Technical Risks**:
1. **ZK Proof Generation Fails**
   - Mitigation: Extensive testing, fallback to retry logic, alert admins
2. **Smart Contract Bugs**
   - Mitigation: Audit before mainnet, bug bounty program, upgradeable contracts
3. **Integration Breaking Changes**
   - Mitigation: Version adapters, monitor protocol upgrades, test on testnet first

**Business Risks**:
1. **Low Adoption**
   - Mitigation: Free tier, direct sales to top protocols, ecosystem partnerships
2. **Competitor Launches Similar**
   - Mitigation: Speed to market, unique features (cross-chain, multi-source)
3. **Regulatory Uncertainty**
   - Mitigation: Privacy-first design (ZK), no custody of funds, legal review

**Operational Risks**:
1. **Infrastructure Downtime**
   - Mitigation: 99.9% SLA, auto-scaling, redundant systems, status page
2. **Key Team Member Leaves**
   - Mitigation: Documentation, knowledge sharing, modular architecture
3. **Budget Overrun**
   - Mitigation: Phased development, MVP first, revenue validation before scaling

---

### Contact & Resources

**Team**:
- Lead Developer: (Your Name)
- Discord: (Your Handle)
- Email: contact@veraz.io

**Links**:
- Website: https://veraz.io (TBD)
- Docs: https://docs.veraz.io (TBD)
- GitHub: https://github.com/veraz/veraz (TBD)
- Status: https://status.veraz.io (TBD)

**Integration Partners**:
- DeFindex: @devmonsterblock, @esteblock, @yripper (Discord)
- Aquarius: (see SCF Integration List)
- Templar: dev@templarprotocol.com
- Blend: @berry, @mootz12 (Discord)

---

## CONCLUSION

Veraz is positioned to become the **infrastructure layer for trust in Stellar DeFi**. By enabling protocols to prove solvency through automated Zero-Knowledge proofs, we solve the fundamental trust problem that has plagued DeFi since FTX.

Our differentiation lies in:
1. **Multi-source reserve aggregation** (only solution that verifies across SAC + DeFi)
2. **Cross-chain verification** (unique capability for Templar and future protocols)
3. **Production-ready infrastructure** (not an MVP - full SaaS platform)
4. **Developer-first approach** (API, webhooks, embeddable widgets)

With the SCF Build Integration Track funding, we will launch with 5-10 protocol integrations in 8 weeks and establish Veraz as the standard for Proof-of-Reserves on Stellar.

**Next Steps**:
1. Contact DeFindex team this week
2. Complete DeFindex integration (Weeks 1-2)
3. Launch beta with first protocol
4. Iterate based on feedback
5. Scale to 20+ protocols by Month 6

---

**Document Version**: 1.0
**Last Updated**: September 23, 2026
**Status**: Ready for Implementation ✅
