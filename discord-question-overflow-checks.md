# Discord Question for Stellar Developer Community

## Message to Post:

---

Hey Stellar devs! 👋

I'm working on a Soroban solvency proof contract and have a question about overflow protection best practices.

**Current approach**: I'm using `checked_add()` throughout the contract for arithmetic operations to prevent overflow attacks, especially when aggregating reserves from multiple sources (SAC balances + Aquarius pool shares + DeFindex vault positions).

**Example from my code**:
```rust
let total_reserves = sac_balance
    .checked_add(aquarius_balance)
    .ok_or(Error::Overflow)?
    .checked_add(defindex_balance)
    .ok_or(Error::Overflow)?;
```

**My question**: Does Soroban have built-in overflow checks at the VM level that would make explicit `checked_add()` calls redundant? Or is it still best practice to use checked arithmetic for financial contracts?

I want to ensure maximum security without adding unnecessary verbosity if the platform already handles this. Any guidance from the community would be greatly appreciated! 🙏

**Context**: Contract handles i128 values for reserve amounts and needs to be production-ready for mainnet deployment.

Thanks in advance for your help!

---

## Alternative Shorter Version:

---

Quick question for Soroban devs 👋

Does Soroban have built-in overflow protection, or should I continue using `checked_add()` for arithmetic operations in financial contracts?

Currently doing:
```rust
balance1.checked_add(balance2).ok_or(Error::Overflow)?
```

Is this necessary, or does the VM handle overflows automatically? Contract deals with i128 reserve amounts.

Thanks! 🙏

---

## Tips for Posting:

1. **Channel**: Post in `#soroban` or `#smart-contracts` channel
2. **Timing**: Post during US business hours (9am-5pm PT) for faster responses
3. **Follow-up**: Be ready to share more code context if asked
4. **Tag**: You can optionally tag @soroban-devs if the question goes unanswered for 24h

## Expected Answers:

Based on Rust/Soroban conventions, you'll likely get one of these responses:

**Answer A**: "Soroban compiles to WASM with debug assertions disabled, so you SHOULD use `checked_*()` for production contracts"

**Answer B**: "The Soroban SDK provides safe math wrappers - check out `soroban_sdk::checked_*` macros"

**Answer C**: "Overflow is undefined behavior in release mode - always use checked arithmetic for financial logic"

## Related Documentation to Check:

While waiting for Discord responses, check:
- https://soroban.stellar.org/docs/learn/security
- https://github.com/stellar/rs-soroban-sdk (search for "overflow")
- Soroban example contracts (how they handle arithmetic)

## What to Do Based on Answer:

**If answer is "VM handles it"**:
- Remove `checked_add()` calls
- Update error handling
- Rebuild and redeploy (new WASM ~8-9 KB)

**If answer is "Keep checked_add()"**:
- Current implementation is correct ✅
- No changes needed
- Mark as "security best practice" in docs
