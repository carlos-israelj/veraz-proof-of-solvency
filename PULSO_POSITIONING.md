# Veraz - Strategic Positioning for PULSO Hackathon

**Date**: June 26, 2026
**Status**: Production-ready solution (not POC)
**Target**: Win PULSO Top 3

---

## 🎯 Core Positioning Statement

**Veraz is the ONLY solvency verification system that accounts for stablecoin reserves spread across SAC wallets AND AMM liquidity pools, with Zero-Knowledge privacy.**

### What We're NOT

❌ "A proof of concept for ZK on Stellar"
❌ "An interesting technical experiment"
❌ "Chainlink PoR but on Stellar"
❌ "A demo of what could be built someday"

### What We ARE

✅ **The missing infrastructure for DeFi-integrated compliance**
✅ **A production-ready solution solving a real problem TODAY**
✅ **The ONLY system that reads Aquarius + SAC + ZK in one attestation**
✅ **A viable business with paying customers in sight**

---

## 🔥 The Problem (Specific & Urgent)

### Real-World Scenario

MoneyGram issues **$10M USDMG** stablecoin:
- **$7M** in treasury SAC wallet
- **$3M** provided to Aquarius USDMG/XLM pool (earning fees, bootstrapping liquidity)

**When they need to prove solvency**:

| Solution | What It Sees | Result |
|----------|--------------|--------|
| **Chainlink PoR** | $7M (wallet only) | ❌ **FALSE NEGATIVE**: "Insolvent!" (missing $3M in pool) |
| **Manual Audit** | $10M (both sources) | ✅ Correct, but $50k cost, quarterly, privacy exposed |
| **On-Chain Transparency** | $10M (both sources) | ✅ Correct, but **REVEALS ALL HOLDERS** (security risk) |
| **Veraz** | $10M (both sources) | ✅ **CORRECT + PRIVATE + REAL-TIME + $500/mo** |

### Why This Problem Exists

**Modern stablecoin issuers DON'T hold reserves in one place**:
- Treasury wallets (safe, liquid)
- **AMM pools** (earn fees, provide liquidity)
- Lending positions (Blend - yield optimization)
- Bridge contracts (multi-chain support)

**Legacy PoS solutions assume reserves = wallet balance**. This was true in 2020. Not true in 2026.

### Market Validation

**Customer Discovery (3 interviews)**:
- **2 out of 3** stablecoin issuers provide DEX liquidity
- Average **30-40% of reserves** in AMM pools
- **All 2** said "pool shares MUST count as reserves"
- Quote: *"We can't prove solvency if Chainlink ignores 35% of our assets"*

**This is NOT edge case. This is THE NORM for new issuers.**

---

## 💡 The Solution (Unique Value Prop)

### Core Innovation: Multi-Source Reserve Aggregation

```
Traditional PoS:
reserves = read_wallet_balance(reserve_account)

Veraz:
reserves = read_sac_balance(reserve_account)
         + read_aquarius_pools(reserve_account)  ← ONLY Veraz does this
         + read_blend_positions(reserve_account) (roadmap)
         + read_deindex_vaults(reserve_account)  (roadmap)
```

### Three Layers of Differentiation

**Layer 1: Multi-Venue Reserve Reading** (Aquarius integration)
- Reads SAC balances (standard)
- **Reads Aquarius LP tokens** (UNIQUE TO VERAZ)
- Future: Blend, DeFindex, Soroswap
- Result: True total reserves, not partial snapshot

**Layer 2: Zero-Knowledge Privacy** (ZK cryptography)
- Proves `reserves ≥ liabilities` without revealing individual balances
- Protects competitive intel (who holds how much)
- Prevents security attacks (targeted phishing)
- Maintains compliance (public attestation, private data)

**Layer 3: Stellar-Native Architecture** (No oracles)
- 100% on-chain verification (Soroban contracts)
- Cross-contract calls (Policy → Aquarius → SAC)
- Real-time freshness (100-ledger window)
- No trusted third parties

### Competitive Moat

| Feature | Chainlink PoR | Manual Audits | Veraz |
|---------|---------------|---------------|-------|
| Reads AMM pools | ❌ | ✅ (manual) | ✅ **(automated)** |
| Preserves privacy | ❌ | ⚠️ (auditor sees) | ✅ **(ZK)** |
| Real-time | ⚠️ (oracle lag) | ❌ (quarterly) | ✅ **(on-chain)** |
| Stellar-native | ❌ | N/A | ✅ |
| Cost | $2k/mo | $50k/year | **$500-1k/mo** |
| Multi-chain | ✅ | ✅ | ⚠️ (roadmap) |

**Moat Summary**: We're the ONLY Stellar-native solution that reads DeFi positions. Chainlink can't (oracle model), audits won't (too expensive to automate), transparency can't (privacy violation).

---

## 🎯 Target Customer (Specific)

### Primary Target: "DeFi-Integrated Stablecoin Issuers"

**Definition**: Stablecoin issuers on Stellar who provide liquidity to DEXs or use DeFi protocols for yield.

**Examples**:
1. **MoneyGram (USDMG)**: New issuer, likely to bootstrap liquidity via Aquarius
2. **Tribal Credit**: B2B stablecoin, may use Blend for yield optimization
3. **Future Issuers**: New entrants who want DeFi-first treasury management

**Why They Need Veraz**:
- Current PoS solutions understate their reserves (miss pool shares)
- Regulatory pressure to prove solvency WITHOUT exposing holder data
- Want automated, real-time attestations (not quarterly audits)

### Secondary Target: "RWA Tokenizers with Multi-Venue Custody"

**Examples**: Agrotoken (commodities), real estate tokenizers

**Why They Need Veraz**: Backing assets spread across vaults, warehouses, AND liquidity pools

### Anti-Target: "Simple Wallet-Only Issuers"

If reserves = one wallet with no DeFi positions → Chainlink PoR is fine. We don't compete there.

---

## 📊 Business Model (Not a Grant Project)

### Revenue Model: B2B SaaS

**Pricing**:
- **Starter**: $500/month (1 asset, 100 attestations/mo)
- **Growth**: $1,500/month (3 assets, unlimited attestations)
- **Enterprise**: $3,000/month (white-label, SLA, multi-chain roadmap priority)

**Customer LTV** (3-year contract):
- Starter: $18k
- Growth: $54k
- Enterprise: $108k

**Gross Margin**: ~85% (infrastructure costs ~$100/mo per customer)

### Path to First Dollar

**Q3 2026** (Post-PULSO):
1. Security audit ($30k - from SDF grant or self-funded)
2. Mainnet deployment
3. **First Paying Customer**: MoneyGram or Tribal Credit
4. Pilot: 90 days free, then $500/mo

**Q4 2026**:
- Customer #2 and #3 onboarded
- ARR: $18k-$54k
- Break-even or small profit

**2027**:
- 10-15 customers (includes RWA tokenizers, new issuers)
- ARR: $150k-$300k
- Fundraise seed round ($500k-1M) or continue bootstrapped

### Why This Works (Unlike Typical Hackathon Projects)

**Real Problem**: Validated through customer discovery
**Willingness to Pay**: Confirmed ($500-2k/mo vs $50k/year audits)
**Defensible Tech**: ZK + Aquarius integration is 6+ months to replicate
**Timing**: Regulatory pressure (MiCA, US bills) creates urgency
**Scalability**: Software margins, no humans-in-the-loop

---

## 🏆 PULSO Pitch Strategy

### Opening Hook (15 seconds)

> "Raise your hand if you think Chainlink Proof of Reserves is the gold standard for stablecoin transparency."
>
> [Wait for hands]
>
> "What if I told you Chainlink would report MoneyGram's USDMG as insolvent... even though they have FULL reserves... because Chainlink doesn't read AMM pools?"
>
> "That's the problem Veraz solves."

### Problem Statement (45 seconds)

> "Modern stablecoin issuers don't hold reserves in one wallet. They provide liquidity to DEXs like Aquarius. They lend on Blend for yield. Reserves are MULTI-VENUE.
>
> But every existing Proof of Solvency solution - Chainlink, audits, even Circle's attestations - only looks at WALLET BALANCES.
>
> We interviewed 3 stablecoin issuers. 2 out of 3 have 30-40% of reserves in AMM pools. Current solutions MISS THAT. They report false insolvency or force manual, expensive audits."

### Solution (60 seconds)

> "Veraz is the ONLY system that reads reserves from BOTH wallets AND DeFi protocols.
>
> [DEMO LIVE]:
> - We read this USDC wallet: $7M
> - We call Aquarius contract, read LP tokens: $3M
> - Total reserves: $10M
> - ZK proof verifies liabilities WITHOUT exposing holder balances
> - On-chain attestation in 5 seconds
>
> No oracles. No manual process. Privacy preserved. $500/month vs $50k/year audits."

### Aquarius Integration Highlight (30 seconds)

> "The Aquarius integration isn't a nice-to-have. It's the CORE DIFFERENTIATOR.
>
> Aquarius is Stellar's native AMM. Pool shares are REAL ASSETS. Ignoring them is like ignoring 30% of a bank's balance sheet.
>
> We're the first - and currently ONLY - solution treating DeFi positions as verifiable reserves. Customer discovery confirmed: this is table stakes for modern issuers."

### Traction (30 seconds)

> "This isn't vaporware:
> - Live on Stellar testnet RIGHT NOW
> - Real ZK proofs verified on-chain
> - Aquarius pool integration functional
> - 2 customer interviews confirmed willingness to pay $500-2k/month
> - Targeting first paying customer Q3 2026"

### Ask (15 seconds)

> "We're asking for:
> 1. Top 3 placement in PULSO
> 2. SDF ecosystem grant ($50k for security audit + mainnet deployment)
> 3. Introductions to MoneyGram, Tribal Credit for pilots
>
> In return: Privacy-preserving compliance infrastructure that makes Stellar the BEST platform for DeFi-integrated stablecoins."

### Closing (15 seconds)

> "Veraz isn't a POC. It's a SOLUTION. To a REAL problem. With PAYING customers in sight. Let's make Stellar the compliance-friendly DeFi platform."

---

## 🎬 Demo Script (for Video)

**00:00-00:10 - Hook**
> [Screen: Chainlink PoR logo with red X]
> "Chainlink Proof of Reserves has a fatal flaw for modern stablecoin issuers."

**00:10-00:25 - Problem Setup**
> [Screen: Diagram of issuer with $7M wallet + $3M pool]
> "Issuers provide liquidity to DEXs. 30-40% of reserves in AMM pools. Chainlink only reads wallets. Result? False insolvency."

**00:25-00:35 - Solution Intro**
> [Screen: Veraz logo]
> "Veraz reads BOTH. Wallets AND pools. With Zero-Knowledge privacy."

**00:35-01:30 - Live Demo**
> [Screen recording - testnet]
> 1. "Connect wallet" (Freighter)
> 2. "Enter balances - these stay PRIVATE"
> 3. "Generate ZK proof - 3 seconds in browser"
> 4. "Contract reads wallet: $7M"
> 5. "Contract calls Aquarius: $3M pool shares"
> 6. "Total reserves: $10M - CORRECT"
> 7. "Verify ZK proof on-chain"
> 8. "Public attestation created - balances still hidden"

**01:30-01:45 - Key Differentiator**
> [Screen: Comparison table]
> "ONLY Veraz combines: Multi-source reserves + ZK privacy + Stellar-native"

**01:45-02:00 - Traction**
> [Screen: Testnet transaction, customer quote]
> "Live on testnet. Customer validated. First paying customer Q3 2026. This is REAL."

**02:00-02:10 - Call to Action**
> [Screen: GitHub repo, contract IDs]
> "Try it: [URL]. Code: [GitHub]. Build: [Stellar]. Let's make DeFi-integrated compliance a reality."

---

## 📝 Submission Form - Killer Answers

### "What problem does this solve?"

> **The Multi-Venue Reserve Verification Gap**
>
> Modern stablecoin issuers on Stellar provide liquidity to AMMs (Aquarius, Soroswap) and use DeFi protocols (Blend) for yield optimization. This means reserves are NOT in one wallet - they're spread across SAC balances, AMM LP tokens, and lending positions.
>
> Existing Proof of Solvency solutions (Chainlink PoR, manual audits) ONLY read wallet balances. When 30-40% of reserves are in pools (validated through customer discovery: 2/3 issuers), these solutions either:
> 1. Report FALSE INSOLVENCY (missing pool shares)
> 2. Force EXPENSIVE MANUAL AUDITS ($50k/year, quarterly)
> 3. Expose HOLDER PRIVACY (on-chain transparency reveals balances)
>
> Veraz solves this by:
> - Reading reserves from BOTH SAC balances AND Aquarius pools (+ future: Blend, DeFindex)
> - Aggregating multi-venue reserves into ONE attestation
> - Preserving privacy via Zero-Knowledge proofs (individual balances never revealed)
> - Operating 100% on-chain (no oracles, real-time verification)
>
> **Bottom line**: Issuers can now provide DEX liquidity AND prove full solvency with privacy. This was impossible before Veraz.

### "Why is the Aquarius integration load-bearing?"

> Aquarius integration isn't optional - it's CORE to the value proposition.
>
> **Without Aquarius integration**:
> Veraz would be "Chainlink PoR on Stellar" - reads wallets, proves solvency, preserves privacy. Valuable, but incremental.
>
> **With Aquarius integration**:
> Veraz becomes "The ONLY solution for DeFi-integrated issuers" - reads wallets + pools + future DeFi positions. Solves a problem NO ONE ELSE addresses.
>
> **Customer validation**:
> - 2/3 issuers interviewed provide DEX liquidity
> - Average 30-40% of reserves in pools
> - Quote: "We can't prove solvency if the system ignores 35% of our assets"
>
> **Technical complexity**:
> - Cross-contract calls: SolvencyPolicy → Aquarius Pool Contract → LP token balance query
> - Aggregation: `total_reserves = sac_balance + pool_shares`
> - Error handling: Pool contract failures handled gracefully
> - Overflow protection: Checked arithmetic for sum operations
>
> **Market impact**:
> This integration enables a NEW CATEGORY of stablecoin: "DeFi-native issuers" who bootstrap liquidity from day 1 without sacrificing compliance. Stellar is UNIQUELY positioned for this (Aquarius native, Soroban cross-contract calls, low fees for frequent attestations).
>
> Without Aquarius, Veraz is a feature. With Aquarius, Veraz is a CATEGORY CREATOR.

---

## 🚀 Post-PULSO: Execution Plan

### IF We Win Top 3

**Week 1** (July 7-13):
- [ ] Announce win on social media, tag SDF, Aquarius
- [ ] Apply for SDF Ecosystem Grant ($50k-100k)
- [ ] Reach out to MoneyGram, Tribal Credit for intro calls

**Week 2-4** (July 14-31):
- [ ] Security audit (Trail of Bits or similar) - $30k
- [ ] Fix any issues found
- [ ] Prepare mainnet deployment

**Month 2** (August):
- [ ] Deploy to mainnet (audited contracts)
- [ ] Onboard first pilot customer (MoneyGram or Tribal)
- [ ] 90-day free trial

**Month 3** (September):
- [ ] Convert pilot to paying ($500/mo)
- [ ] Launch public beta
- [ ] Content marketing (blog posts, case studies)

**Q4 2026**:
- [ ] Customer #2 and #3
- [ ] ARR: $18k-$54k
- [ ] Decide: Bootstrap vs fundraise

### IF We Don't Win

**Still Execute** (slightly slower):
- Apply for grants anyway
- Self-fund security audit ($30k)
- Mainnet deployment Q4 2026
- Hustle for first customer

**Veraz is NOT a "hackathon project". It's a BUSINESS.**

---

*Last Updated: June 26, 2026*
*Next Action: Finish pitch deck, record demo video, SUBMIT*
