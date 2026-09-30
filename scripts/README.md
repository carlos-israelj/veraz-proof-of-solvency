# Scripts

Deployment and utility scripts for Veraz Proof of Solvency.

## Structure

```
scripts/
├── deployment/     # Contract deployment scripts
│   ├── deploy-mainnet.sh
│   ├── deploy-testnet-defindex.sh
│   └── performance-test.sh
└── utils/          # Utility scripts
    ├── derive-secret-key.js
    └── generate-stellar-key.js
```

## Deployment Scripts

### deploy-mainnet.sh
Deploys the solvency policy contract to Stellar Mainnet.

**Prerequisites**:
- Stellar CLI installed (`stellar --version`)
- Mainnet identity configured
- Sufficient XLM balance for deployment

**Usage**:
```bash
cd scripts/deployment
./deploy-mainnet.sh
```

### deploy-testnet-defindex.sh
Deploys the solvency policy contract to Stellar Testnet with DeFindex vault integration.

**Usage**:
```bash
cd scripts/deployment
./deploy-testnet-defindex.sh
```

### performance-test.sh
Runs performance benchmarks for proof generation and verification.

**Usage**:
```bash
cd scripts/deployment
./performance-test.sh
```

## Utility Scripts

### derive-secret-key.js
Derives a secret key from a mnemonic phrase (BIP-39).

**Usage**:
```bash
node scripts/utils/derive-secret-key.js
```

### generate-stellar-key.js
Generates a new Stellar keypair for testing purposes.

**Usage**:
```bash
node scripts/utils/generate-stellar-key.js
```

**Output**:
- Public key (G...)
- Secret key (S...)

⚠️ **Warning**: Never use generated keys for real funds. For testing only.

## Environment Variables

Some scripts may require environment variables:
- `STELLAR_NETWORK`: Network to use (mainnet/testnet)
- `STELLAR_SOURCE_ACCOUNT`: Source account identity name

See individual scripts for specific requirements.
