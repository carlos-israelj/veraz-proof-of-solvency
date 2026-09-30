# Stellar ZK Proofs - Production Reference

**Date**: September 29, 2026
**Source**: Stellar Developer Discord

---

## Production ZK Projects on Stellar Mainnet

### 1. Tansu by The Aha Company

**Status**: ✅ **LIVE ON MAINNET**

**Developer**: tupui (Discord user)

**Key Information**:
- Running ZK proofs in production on Stellar mainnet
- Recently upgraded/modified the implementation
- Active development and iteration

**Quote from Discord** (Sept 29, 2026):
```
tupui | The Aha Company [XLM]: "Yes, Tansu (and making soon an upgrade
on mainnet as I changed many things)"
```

**Implications for Veraz**:
- ✅ ZK proofs ARE production-ready on Stellar
- ✅ Mainnet deployment is viable (not just testnet experimentation)
- ✅ Active ecosystem with real users

---

## Questions to Ask tupui (If Opportunity Arises)

### Technical Questions:

1. **Contract Size**: What's your optimized WASM size for ZK verification?
   - Context: Ours is 9.8 KB, wondering if that's competitive

2. **Public Inputs Format**: How do you handle public inputs serialization?
   - Context: We use 128 bytes (4 fields), want to validate approach

3. **Proof Generation**: Client-side (browser) or server-side?
   - Context: We do browser-based proving with bb.js

4. **Verification Cost**: What's typical gas cost for on-chain verification?
   - Context: Planning for mainnet deployment economics

5. **UltraHonk vs Groth16**: Which proving system are you using?
   - Context: We use UltraHonk, want to validate choice

### Product Questions:

6. **User Experience**: Any challenges with proof generation UX?
   - Context: 3-5 second proof time, wondering if acceptable

7. **Performance**: Any bottlenecks or optimization learnings?
   - Context: Want to learn from production experience

8. **Upgrades**: What prompted the recent mainnet upgrade?
   - Context: Understanding iteration patterns

---

## Resources to Investigate

### 1. Tansu Project
- **Search for**: "Tansu Stellar" / "Tansu The Aha Company"
- **Likely platforms**:
  - GitHub: https://github.com/search?q=tansu+stellar
  - Twitter/X: Search for @tansu or @theahacompany
  - Stellar Community: https://stellar.org/community

### 2. The Aha Company
- **Website**: Search for "The Aha Company Stellar"
- **Products**: May have multiple Stellar projects
- **Documentation**: Could have public docs on ZK implementation

### 3. Stellar ZK Examples
- **Official docs**: https://developers.stellar.org/docs/build/apps/zk
- **Example repos**: Check for updated examples post-Protocol 26
- **Community projects**: stellar-community GitHub org

---

## Action Items

### Immediate (While Waiting for Discord Response):

- [ ] Search for Tansu project (GitHub, Twitter, Stellar Explorer)
- [ ] Find The Aha Company's Stellar presence
- [ ] Review any public documentation from Tansu
- [ ] Compare implementation approaches

### If We Find Tansu Source Code:

- [ ] Compare contract sizes (our 9.8 KB vs theirs)
- [ ] Review their public inputs format
- [ ] Check their testing approach
- [ ] Learn from their upgrade patterns

### If We Can Contact tupui:

- [ ] Ask technical questions (list above)
- [ ] Share our approach for feedback
- [ ] Potentially collaborate or exchange learnings

---

## Veraz Competitive Positioning

**If Tansu is ZK proof verification**:
- Veraz differentiator: Multi-source reserve aggregation (SAC + Aquarius + DeFindex)
- Veraz focus: Stablecoin issuer solvency
- Tansu focus: Unknown (need to investigate)

**If Tansu is different use case**:
- Validates that Stellar ZK ecosystem is growing
- Multiple production projects = healthy ecosystem
- Opportunity for cross-learning

---

## Next Steps

1. **Research Tansu** (15-30 min investigation)
2. **Wait for Discord overflow question response** (24-48 hours)
3. **Continue Veraz testing** (E2E with new contract)
4. **Document learnings** from production ZK project

---

**Updated**: September 29, 2026
**Status**: Research in progress
**Priority**: Medium (informational, not blocking Veraz development)
