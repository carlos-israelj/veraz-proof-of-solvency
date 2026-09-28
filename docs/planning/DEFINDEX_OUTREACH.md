# DeFindex Team Outreach

## Discord Contact Plan

**Target Contacts**:
- @devmonsterblock
- @esteblock
- @yripper

**Discord Server**: DeFindex Community (https://discord.gg/defindex)

---

## Outreach Message Template

**Subject**: Veraz Integration - Proof of Solvency for DeFi Protocols

**Message**:

Hi DeFindex team! 👋

I'm building **Veraz**, a Proof of Solvency infrastructure for Stellar DeFi protocols, and I'd love to collaborate on integrating with DeFindex vaults.

**What is Veraz?**
- Zero-Knowledge Proof of Solvency system (Reserves ≥ Liabilities)
- Multi-source reserve aggregation: SAC wallets + AMM pools + **yield vaults**
- Enables protocols to prove they're fully backed without revealing user balances

**Why DeFindex Integration?**
DeFindex vaults are a perfect use case for continuous solvency verification:
- Prove vault deposits = underlying asset value
- Aggregate reserves across strategies (Blend Autocompound, etc.)
- Build trust with depositors through transparent, privacy-preserving proofs

**Current Status**:
- ✅ Smart contract integration logic implemented (`defindex.rs` module)
- ✅ ZK proof system working (UltraHonk on Soroban)
- ✅ Multi-source aggregation architecture ready
- 🟡 Need to test with real testnet vaults

**What I Need**:
1. Access to DeFindex testnet vaults for integration testing
2. Guidance on best practices for vault integration
3. Feedback on use cases (vault managers, depositors, etc.)

**Timeline**: Targeting 1-2 weeks for complete integration as part of SCF Build Integration Track submission.

Would you be open to a quick call/chat to discuss? Happy to demo the current implementation!

**Resources**:
- GitHub: [link to repo]
- Testnet Demo: http://localhost:9014
- Docs: DEFINDEX_INTEGRATION_GUIDE.md

Best,
Carlos (Veraz)

---

## Follow-up Actions

### If Positive Response:
1. Schedule demo call
2. Get testnet vault addresses for testing
3. Discuss API key access for production
4. Explore co-marketing opportunities

### If No Response (48 hours):
1. Try alternative contact method (Twitter/X)
2. Post in DeFindex Discord general channel
3. Reach out via GitHub issues on defindex-io repos

### If Technical Questions:
**Q: How does the integration work?**
A: We use cross-contract calls to read:
- `balance(user)` - User's vault shares
- `total_supply()` - Total vault shares
- `fetch_total_managed_funds()` - Total assets under management
- Then calculate: `asset_value = (user_shares * total_assets) / total_supply`

**Q: What about API vs on-chain?**
A: We use hybrid approach:
- API for fast UI queries (https://api.defindex.io/vault/{id}/balance)
- On-chain contract calls for trustless verification during proof attestation

**Q: Privacy concerns?**
A: Zero-Knowledge proofs hide individual vault depositor balances. Only aggregate "total reserves ≥ liabilities" is public.

**Q: Performance impact?**
A: Read-only queries, no writes to DeFindex contracts. Minimal gas cost (~500K stroops per vault query).

---

## Integration Testing Plan

### Phase 1: Contract Method Testing (2-3 hours)

**Test Vaults** (from deploy-config.json):
```
CBNKCU3HGFKHFOF7JTGXQCNKE3G3DXS5RDBQUKQMIIECYKXPIOUGB2S3
CC24OISYJHWXZIFZBRJHFLVO5CNN3PQSKZE5BBBZLSSI5Z23TKC6GQY2
CA2FIPJ7U6BG3N7EOZFI74XPJZOEOD4TYWXFVCIO5VDCHTVAGS6F4UKK
```

**Commands**:
```bash
# 1. Test balance() method
stellar contract invoke \
  --id CBNKCU3HGFKHFOF7JTGXQCNKE3G3DXS5RDBQUKQMIIECYKXPIOUGB2S3 \
  --network testnet \
  -- balance \
  --from GCY4CQHYSGI2MKE24R6ASMSX6EN6VQDYQZIC2NG3FSLJML6ELPFQAPKT

# 2. Test total_supply()
stellar contract invoke \
  --id CBNKCU3HGFKHFOF7JTGXQCNKE3G3DXS5RDBQUKQMIIECYKXPIOUGB2S3 \
  --network testnet \
  -- total_supply

# 3. Test fetch_total_managed_funds()
stellar contract invoke \
  --id CBNKCU3HGFKHFOF7JTGXQCNKE3G3DXS5RDBQUKQMIIECYKXPIOUGB2S3 \
  --network testnet \
  -- fetch_total_managed_funds
```

**Success Criteria**:
- All methods return valid i128 values
- No errors or missing functions
- Data matches API responses

### Phase 2: API Integration Testing (1 hour)

**API Endpoint**:
```bash
# Get vault balance for user
curl "https://api.defindex.io/vault/CBNKCU3HGFKHFOF7JTGXQCNKE3G3DXS5RDBQUKQMIIECYKXPIOUGB2S3/balance?from=GCY4CQHYSGI2MKE24R6ASMSX6EN6VQDYQZIC2NG3FSLJML6ELPFQAPKT&network=testnet"

# Discover available vaults
curl "https://api.defindex.io/vault/discover?network=testnet"
```

**Success Criteria**:
- API returns `underlyingBalance` field
- Values match on-chain calculation
- Response time < 500ms

### Phase 3: E2E Solvency Proof (2-3 hours)

**Scenario**:
User has:
- 50,000 USDC in SAC wallet
- 30,000 USDC in DeFindex vault
- Total liabilities: 75,000 USDC

**Steps**:
1. Make test deposit into DeFindex vault
2. Deploy solvency contract with DeFindex configured
3. Generate ZK proof with multi-source reserves
4. Verify aggregation: `sac_balance + defindex_balance ≥ liabilities`
5. Query `is_solvent()` and check breakdown

**Success Criteria**:
- Proof verifies successfully
- Attestation shows correct `defindex_balance`
- Total reserves = SAC + DeFindex

---

## Expected Outcomes

### Best Case:
- DeFindex team responds within 24 hours
- Integration testing completed in 3 days
- Co-marketing opportunity for both projects
- DeFindex becomes reference customer

### Realistic Case:
- Response within 1 week
- Testing with public testnet vaults (no team support needed)
- Integration complete in 1-2 weeks
- Add to portfolio/case studies

### Worst Case:
- No response from team
- Proceed with public API + contracts
- Complete integration independently
- Reach out again post-SCF submission

---

## Next Steps After Integration

1. **Documentation**: Create DeFindex integration guide
2. **Demo**: Add DeFindex tab to frontend `/integrations` view
3. **Marketing**: Joint announcement on Twitter/Discord
4. **Expand**: Integrate with Blend, Aquarius next

**Timeline**: Week 1-2 of 8-week roadmap
