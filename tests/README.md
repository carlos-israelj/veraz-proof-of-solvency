# Tests

Comprehensive test suite for Veraz Proof of Solvency system.

## Structure

```
tests/
├── unit/           # Unit tests for individual components
├── integration/    # Integration tests across multiple components
└── e2e/            # End-to-end tests simulating full user flows
```

## Running Tests

### Unit Tests
```bash
# Proof generation
node tests/unit/proof-verification.test.js
```

### Integration Tests
```bash
# Poseidon2 alignment (Circuit + Contract + Frontend)
node tests/integration/poseidon2-alignment.test.js

# DeFindex integration
node tests/integration/defindex-integration.test.js
node tests/integration/defindex-vaults.test.js
```

### End-to-End Tests
```bash
# Full DeFindex flow
node tests/e2e/defindex-e2e.test.js
```

## Test Categories

### Unit Tests
- **proof-verification.test.js**: Verifies ZK proof generation and verification

### Integration Tests
- **poseidon2-alignment.test.js**: Validates Poseidon2 hash consistency across:
  - Noir circuit (`Poseidon2::hash`)
  - Soroban contract (`poseidon2_hash::<4, Bn254Fr>`)
  - JavaScript frontend (`api.poseidon2Hash`)
- **defindex-integration.test.js**: Tests DeFindex API integration
- **defindex-vaults.test.js**: Tests DeFindex vault balance reading

### E2E Tests
- **defindex-e2e.test.js**: Complete flow from proof generation to on-chain verification with DeFindex vaults

## Test Data

All tests use testnet configuration:
- Network: Stellar Testnet
- Contract: See `deploy-config.json`
- Test accounts: See individual test files

## CI/CD

Tests are not currently automated in CI. Run manually before deploying to production.
