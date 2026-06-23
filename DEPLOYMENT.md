# Veraz - Deployment Information

## Testnet Deployment

### Contract Details

**Solvency Policy Contract (Layer 2+3)**
- **Contract ID**: `CAKDHQ43FKKHLDR2R7YZKTAKKI7JN2T56WZJYBFDFTZJF2WIRR5J3FWA`
- **Network**: Stellar Testnet
- **WASM Hash**: `f7a251ceb0de50569c705c273ca0ba38c9636b56ea264b563d929c6c993fcfa2`
- **Deployed**: June 22, 2026
- **Explorer**: [View on Stellar.Expert](https://stellar.expert/explorer/testnet/contract/CAKDHQ43FKKHLDR2R7YZKTAKKI7JN2T56WZJYBFDFTZJF2WIRR5J3FWA)

### Configuration

```json
{
  "verifier": "GAWQBWC6FFYKBKDMUHUYX6JI2GMGEQJYY2GIEREDDVN42Q3LVD3QKBWT",
  "reserve_sac": "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC",
  "reserve_accounts": ["GCY4CQHYSGI2MKE24R6ASMSX6EN6VQDYQZIC2NG3FSLJML6ELPFQAPKT"],
  "freshness_window": 100
}
```

**Reserve SAC**: XLM Native
**Verifier**: Mock address (integration pending)

## Testing the Deployment

### Query Solvency Status

```bash
stellar contract invoke \
  --id CAKDHQ43FKKHLDR2R7YZKTAKKI7JN2T56WZJYBFDFTZJF2WIRR5J3FWA \
  --source issuer \
  --network testnet \
  -- is_solvent
```

Expected: `null` (no attestations yet)

### Query Configuration

```bash
stellar contract invoke \
  --id CAKDHQ43FKKHLDR2R7YZKTAKKI7JN2T56WZJYBFDFTZJF2WIRR5J3FWA \
  --source issuer \
  --network testnet \
  -- get_config
```

## Using in Frontend

Update `src/lib/stellar.js` or create a config file:

```javascript
export const TESTNET_CONFIG = {
  contractId: "CAKDHQ43FKKHLDR2R7YZKTAKKI7JN2T56WZJYBFDFTZJF2WIRR5J3FWA",
  network: "testnet",
  rpcUrl: "https://soroban-testnet.stellar.org"
};
```

## Test Attestation Flow (MOCK Mode)

Since the contract is in MOCK mode (verifier not yet integrated), you can test with dummy proofs:

```bash
# Create dummy proof inputs (96 bytes: root + L + ledger_seq)
# This will fail until real ZK proving is enabled

stellar contract invoke \
  --id CAKDHQ43FKKHLDR2R7YZKTAKKI7JN2T56WZJYBFDFTZJF2WIRR5J3FWA \
  --source issuer \
  --network testnet \
  -- attest \
  --public_inputs <hex_bytes> \
  --proof <hex_bytes>
```

**Note**: Real attestation requires:
1. Compiled Noir circuit
2. Generated ZK proof
3. Integrated UltraHonk verifier

## Accounts

### Issuer (Deployer)
- **Address**: `GCXY55U4OBCQSE57LTLQHEALRITRUHO3KIO54LUS3SAMCLDTLGCQJKP2`
- **Alias**: `issuer`
- **Funded**: ✅ via friendbot

### Reserve Account
- **Address**: `GCY4CQHYSGI2MKE24R6ASMSX6EN6VQDYQZIC2NG3FSLJML6ELPFQAPKT`
- **Alias**: `reserve1`
- **Funded**: ✅ via friendbot
- **Balance**: Check on [Stellar.Expert](https://stellar.expert/explorer/testnet/account/GCY4CQHYSGI2MKE24R6ASMSX6EN6VQDYQZIC2NG3FSLJML6ELPFQAPKT)

## Next Steps

1. **Integrate UltraHonk Verifier** (Layer 1)
   - Clone rs-soroban-ultrahonk
   - Deploy verifier contract
   - Update `verifier` address in config

2. **Compile Noir Circuit**
   ```bash
   cd circuits/solvency
   nargo compile
   bb write_vk -b ./target/solvency.json
   ```

3. **Enable Real Proving**
   - Install `@noir-lang/noir_js` and `@aztec/bb.js`
   - Update `src/lib/prover.js` (MOCK = false)

4. **Test End-to-End**
   - Generate real proof with actual liabilities
   - Submit to contract
   - Query is_solvent

5. **Frontend Integration**
   - Update Contract ID in UI
   - Test Emisor flow (generate + attest)
   - Test Público flow (query badge)

## Troubleshooting

### "ledger protocol version too old"
Ensure testnet is on protocol >= 22 (X-Ray or later)

### "InvalidProof"
The verifier integration is pending. In MOCK mode, any proof is accepted.

### "StaleProof" or "Replay"
Check `ledger_seq` is within freshness_window (100 ledgers) and hasn't been used before.

### "Insolvent"
Reserves are less than liabilities. This is working as designed!

## Resources

- [Soroban Testnet Dashboard](https://lab.stellar.org/r/testnet/contract/CAKDHQ43FKKHLDR2R7YZKTAKKI7JN2T56WZJYBFDFTZJF2WIRR5J3FWA)
- [Contract Source](./contracts/solvency_policy/)
- [Architecture Docs](./docs/arquitectura-proof-of-solvency-stellar.md)
- [Implementation Spec](./docs/spec-implementacion-proof-of-solvency.md)
