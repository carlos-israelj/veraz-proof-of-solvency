# Veraz SDK + Supabase Setup Guide

**Recommended for**: Stablecoin issuers and exchanges using Supabase

---

## Why Supabase?

✅ **PostgreSQL-based** - Production-ready, ACID-compliant database
✅ **Built-in Auth** - User authentication already integrated
✅ **Real-time** - Listen to balance changes in real-time
✅ **Auto API** - REST API generated automatically
✅ **Easy Setup** - Get started in minutes

---

## Setup Instructions

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Note your project URL and database password

### 2. Create Database Schema

Run this SQL in Supabase SQL Editor:

```sql
-- Create user balances table
CREATE TABLE user_balances (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  asset TEXT NOT NULL DEFAULT 'USDC',
  balance BIGINT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_user_balances_asset ON user_balances(asset);
CREATE INDEX idx_user_balances_user_id ON user_balances(user_id);

-- Create read-only role for SDK (security best practice)
CREATE ROLE veraz_readonly;
GRANT CONNECT ON DATABASE postgres TO veraz_readonly;
GRANT USAGE ON SCHEMA public TO veraz_readonly;
GRANT SELECT ON user_balances TO veraz_readonly;

-- Optional: Row Level Security (RLS)
ALTER TABLE user_balances ENABLE ROW LEVEL SECURITY;

-- Allow service role to read all rows
CREATE POLICY "Service role can read all balances"
  ON user_balances
  FOR SELECT
  TO service_role
  USING (true);
```

### 3. Insert Sample Data (for testing)

```sql
INSERT INTO user_balances (user_id, asset, balance) VALUES
  ('alice', 'USDC', 100000000000),   -- 100,000 USDC (7 decimals)
  ('bob', 'USDC', 50000000000),      -- 50,000 USDC
  ('charlie', 'USDC', 250000000000), -- 250,000 USDC
  ('dave', 'USDC', 75000000000),     -- 75,000 USDC
  ('eve', 'USDC', 125000000000);     -- 125,000 USDC

-- Total liabilities: 600,000 USDC
```

### 4. Get Connection String

**Option A: Direct PostgreSQL (Recommended)**

1. Go to **Project Settings** → **Database**
2. Scroll to **Connection string** section
3. Select **Direct connection** tab
4. Copy the connection string
5. Replace `[YOUR-PASSWORD]` with your database password

Example:
```
postgresql://postgres:your_password@db.abc123xyz.supabase.co:5432/postgres
```

**Option B: Connection Pooler (for serverless)**

Use this if deploying to Vercel/Netlify:
```
postgresql://postgres.abc123xyz:your_password@aws-0-us-west-1.pooler.supabase.com:6543/postgres
```

### 5. Configure Veraz SDK

Create `.env` file:

```bash
# Supabase connection
SUPABASE_CONNECTION_STRING=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres

# Stellar configuration
STELLAR_SECRET_KEY=S...
CONTRACT_ID=C...

# Circuit path
CIRCUIT_PATH=./circuits/solvency.json
```

### 6. Run Your First Attestation

```typescript
import { VerazSDK } from '@veraz-protocol/sdk';

const sdk = new VerazSDK({
  database: {
    type: 'supabase',
    connectionString: process.env.SUPABASE_CONNECTION_STRING!,
    query: `
      SELECT user_id, balance
      FROM user_balances
      WHERE asset = 'USDC'
    `
  },
  stellar: {
    network: 'testnet',
    secretKey: process.env.STELLAR_SECRET_KEY!,
    contractId: process.env.CONTRACT_ID!
  },
  circuitPath: process.env.CIRCUIT_PATH
});

// Generate attestation
const result = await sdk.attest();

console.log(`Solvent: ${result.solvent}`);
console.log(`TX Hash: ${result.txHash}`);
```

---

## Security Best Practices

### 1. Use Read-Only Credentials

Create a dedicated database user with **only SELECT** permissions:

```sql
CREATE USER veraz_sdk WITH PASSWORD 'secure_password';
GRANT SELECT ON user_balances TO veraz_sdk;
```

Then use this connection string:
```
postgresql://veraz_sdk:secure_password@db.[PROJECT-REF].supabase.co:5432/postgres
```

### 2. Enable Row Level Security (RLS)

Prevent unauthorized access even if credentials leak:

```sql
ALTER TABLE user_balances ENABLE ROW LEVEL SECURITY;

-- Only allow reads from specific IP (your server)
CREATE POLICY "Restrict to server IP"
  ON user_balances
  FOR SELECT
  USING (
    current_setting('request.headers')::json->>'x-forwarded-for' = 'YOUR_SERVER_IP'
  );
```

### 3. Use Environment Variables

**Never** hardcode credentials:

```typescript
// ❌ BAD
connectionString: 'postgresql://postgres:password123@...'

// ✅ GOOD
connectionString: process.env.SUPABASE_CONNECTION_STRING!
```

### 4. Rotate Credentials Regularly

1. Generate new database password every 90 days
2. Update `.env` file
3. Restart SDK service

---

## Scheduled Attestations

### Every 6 Hours (Recommended)

```typescript
sdk.scheduleAttestation('0 */6 * * *', (result) => {
  if (!result.success) {
    // Send alert to team
    console.error('Attestation failed!', result.error);
  } else {
    console.log(`Attestation ${result.solvent ? 'SOLVENT' : 'INSOLVENT'}`);
  }
});
```

### Run as Background Service

**Using PM2**:

```bash
npm install -g pm2
pm2 start example.ts --name veraz-attestations
pm2 save
pm2 startup
```

**Using systemd** (Linux):

Create `/etc/systemd/system/veraz.service`:

```ini
[Unit]
Description=Veraz Solvency Attestations
After=network.target

[Service]
Type=simple
User=veraz
WorkingDirectory=/opt/veraz
ExecStart=/usr/bin/node /opt/veraz/dist/example.js
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl enable veraz
sudo systemctl start veraz
```

---

## Monitoring

### Check Attestation History

Store attestation results in Supabase:

```sql
CREATE TABLE attestation_history (
  id BIGSERIAL PRIMARY KEY,
  tx_hash TEXT NOT NULL,
  solvent BOOLEAN NOT NULL,
  total_liabilities BIGINT NOT NULL,
  merkle_root TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

```typescript
// After attestation
if (result.success) {
  await supabase.from('attestation_history').insert({
    tx_hash: result.txHash,
    solvent: result.solvent,
    total_liabilities: result.totalLiabilities,
    merkle_root: result.merkleRoot
  });
}
```

### Set Up Alerts

Use Supabase Edge Functions to send alerts:

```typescript
// edge-functions/alert-insolvency.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

serve(async (req) => {
  const { record } = await req.json()

  // If insolvent, send alert
  if (!record.solvent) {
    await fetch('https://hooks.slack.com/your-webhook', {
      method: 'POST',
      body: JSON.stringify({
        text: `⚠️ INSOLVENT ATTESTATION DETECTED\nTX: ${record.tx_hash}`
      })
    })
  }

  return new Response('OK')
})
```

---

## Troubleshooting

### Connection Refused

**Problem**: `ECONNREFUSED` error

**Solution**:
1. Check if IP is whitelisted in Supabase settings
2. Verify connection string is correct
3. Ensure database is not paused (free tier auto-pauses)

### SSL Required

**Problem**: `SSL connection required`

**Solution**: Add `?sslmode=require` to connection string:
```
postgresql://...?sslmode=require
```

### Query Too Slow

**Problem**: Query takes >5 seconds

**Solution**:
1. Add index on `asset` column
2. Use connection pooler instead of direct connection
3. Consider caching balances temporarily

```sql
CREATE INDEX idx_user_balances_asset ON user_balances(asset);
```

---

## Cost Estimation

### Supabase Free Tier
- ✅ 500MB database
- ✅ 2GB bandwidth/month
- ✅ Unlimited API requests
- ✅ **Perfect for testing**

### Supabase Pro ($25/month)
- ✅ 8GB database
- ✅ 100GB bandwidth/month
- ✅ Daily backups
- ✅ **Recommended for production**

### Veraz SDK
- **Proof Generation**: ~10-30 seconds CPU time
- **Network Fees**: ~0.1 XLM per attestation
- **Storage**: Minimal (only stores merkle root on-chain)

**Example**: 4 attestations/day × 30 days = 12 XLM/month (~$1.20)

---

## Next Steps

1. ✅ Set up Supabase project
2. ✅ Create database schema
3. ✅ Configure Veraz SDK
4. ✅ Run first attestation
5. 🚀 Schedule automated attestations
6. 📊 Set up monitoring and alerts

---

## Support

- **Supabase Docs**: https://supabase.com/docs
- **Veraz GitHub**: https://github.com/veraz-protocol/veraz
- **Discord**: (coming soon)

---

**Ready to prove solvency? Let's go! 🚀**
