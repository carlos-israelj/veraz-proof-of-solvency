# @veraz-protocol/sdk

**Veraz Protocol SDK** - Generate Zero-Knowledge Proof of Solvency attestations locally.

## Overview

Veraz Protocol enables stablecoin issuers and exchanges to prove solvency (`Reserves ≥ Liabilities`) using Zero-Knowledge proofs **without revealing individual user balances**.

### Key Features

✅ **Local Execution**: All sensitive data stays on your server
✅ **Zero-Knowledge Privacy**: User balances never leave your infrastructure
✅ **Multi-Database Support**: PostgreSQL, MySQL, MongoDB, **Supabase**
✅ **Multi-Venue Reserves**: Counts SAC wallets + Aquarius pools + DeFindex vaults
✅ **Automated Attestations**: Schedule proofs via cron
✅ **Individual Verification**: Users can verify their inclusion

## Installation

```bash
npm install @veraz-protocol/sdk
```

**Using Supabase?** (Recommended for startups)
```bash
npm install @veraz-protocol/sdk @supabase/supabase-js
```

👉 See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed Supabase integration guide.

## Quick Start

```typescript
import { VerazSDK } from '@veraz-protocol/sdk';

const sdk = new VerazSDK({
  database: {
    type: 'postgres',
    connectionString: process.env.DATABASE_URL!,
    query: `
      SELECT user_id, balance
      FROM user_balances
      WHERE asset = 'USDC'
    `
  },
  stellar: {
    network: 'testnet',
    secretKey: process.env.STELLAR_SECRET_KEY!,
    contractId: 'CACQIPK5OAJTT44WEK4D5IP2CWAVRTBLDXXRY3LO4HNSJAUUAQGTHNHS'
  }
});

// Generate attestation
const result = await sdk.attest();
console.log(`Solvent: ${result.solvent}`);
console.log(`TX Hash: ${result.txHash}`);
```

## Architecture

```
Your Database → Veraz SDK → Merkle Sum Tree → ZK Proof → Stellar Network
                 (local)      (local)         (local)      (public)
```

**Privacy Guarantee**: Only the ZK proof (14KB) and Merkle root (32 bytes) are published.
Your user balances **never** leave your server.

## Configuration

### Database Configuration

#### PostgreSQL

```typescript
{
  database: {
    type: 'postgres',
    connectionString: 'postgresql://user:pass@localhost:5432/mydb',
    query: 'SELECT user_id, balance FROM accounts WHERE asset = $1'
  }
}
```

#### MySQL

```typescript
{
  database: {
    type: 'mysql',
    connectionString: 'mysql://user:pass@localhost:3306/mydb',
    query: 'SELECT user_id, balance FROM accounts WHERE asset = ?'
  }
}
```

#### MongoDB

```typescript
{
  database: {
    type: 'mongodb',
    connectionString: 'mongodb://localhost:27017/mydb',
    query: 'accounts' // Collection name
  }
}
```

#### Supabase

```typescript
// Option 1: Direct PostgreSQL connection (recommended for security)
{
  database: {
    type: 'supabase',
    connectionString: 'postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres',
    query: 'SELECT user_id, balance FROM user_balances WHERE asset = $1'
  }
}

// Option 2: Supabase REST API (requires @supabase/supabase-js)
{
  database: {
    type: 'supabase',
    connectionString: '', // Not used with REST API
    query: 'SELECT user_id, balance FROM user_balances',
    supabaseUrl: 'https://[PROJECT-REF].supabase.co',
    supabaseKey: '[YOUR-SUPABASE-ANON-KEY]'
  }
}
```

> **Note**: For production, use the direct PostgreSQL connection (Option 1) as it's more secure and doesn't expose your Supabase API key. Get your connection string from Supabase Dashboard → Project Settings → Database → Connection string.

### Stellar Configuration

```typescript
{
  stellar: {
    network: 'testnet', // or 'mainnet'
    secretKey: 'S...',  // Your Stellar secret key
    contractId: 'C...', // Solvency Policy contract ID
  }
}
```

## API Reference

### `VerazSDK`

Main SDK class.

#### Constructor

```typescript
new VerazSDK(config: VerazConfig)
```

#### Methods

##### `attest()`

Generates and submits a solvency attestation.

```typescript
async attest(): Promise<AttestationResult>
```

**Process**:
1. Queries balances from your database
2. Builds Merkle Sum Tree locally
3. Generates UltraHonk ZK proof locally (10-30 seconds)
4. Submits to Stellar network
5. Returns result with transaction hash

**Returns**:
```typescript
{
  success: boolean;
  solvent: boolean;
  txHash: string;
  merkleRoot: string;
  totalLiabilities: string;
  receipts?: Map<string, MerkleReceipt>;
}
```

##### `scheduleAttestation(schedule: string)`

Schedules automatic attestations using cron syntax.

```typescript
sdk.scheduleAttestation('0 */6 * * *'); // Every 6 hours
```

## Examples

### One-Time Attestation

```typescript
const result = await sdk.attest();

if (result.solvent) {
  console.log('✅ SOLVENT');
  console.log(`Reserves ≥ Liabilities`);
} else {
  console.log('❌ INSOLVENT');
  console.log(`WARNING: Reserves < Liabilities`);
}
```

### Scheduled Attestations

```typescript
// Attest every 6 hours
sdk.scheduleAttestation('0 */6 * * *');

console.log('Scheduled attestations. Running indefinitely...');
```

### With Individual Verification Receipts

```typescript
const result = await sdk.attest();

// Generate receipts for all users
if (result.receipts) {
  for (const [userId, receipt] of result.receipts) {
    // Store receipt in your database
    await db.query(
      'UPDATE users SET merkle_receipt = $1 WHERE user_id = $2',
      [JSON.stringify(receipt), userId]
    );
  }
}

// Users can later verify their receipt at explorer.veraz.com
```

## Development Status

### ✅ Completed (Week 1-2)

- [x] TypeScript project structure
- [x] Database connectors (PostgreSQL, MySQL, MongoDB)
- [x] Merkle Sum Tree implementation
- [x] Type definitions

### 🚧 In Progress (Week 3-4)

- [ ] UltraHonk proof generation (Barretenberg integration)
- [ ] Stellar transaction submission
- [ ] Main SDK class implementation

### 📋 Planned (Week 5-8)

- [ ] Cronjob scheduling
- [ ] End-to-end testing
- [ ] Production deployment
- [ ] Documentation

## Security

⚠️ **TESTNET ONLY**: This SDK is currently for testnet use only.
Before mainnet deployment, a security audit is required.

### Privacy Guarantees

- **Database queries execute locally** on your server
- **Merkle tree built locally** in your process memory
- **ZK proof generated locally** using your CPU
- **Only public outputs** (proof + root) sent to network
- **User balances never transmitted** over network

### Best Practices

1. **Secure Secret Key**: Store Stellar secret key in environment variables, never hardcode
2. **Database Credentials**: Use read-only database credentials if possible
3. **Network Security**: Run SDK inside your VPN/VPC
4. **Monitoring**: Set up alerts if attestation fails
5. **Backup**: Keep backup of Merkle receipts for user verification

## Support

- **GitHub**: https://github.com/veraz-protocol/veraz
- **Docs**: https://docs.veraz.com (coming soon)
- **Discord**: (coming soon)

## License

MIT
