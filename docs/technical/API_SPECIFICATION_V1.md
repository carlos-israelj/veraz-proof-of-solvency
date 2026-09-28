# Veraz Public API v1 - Specification

**Version**: 1.0.0
**Base URL**: `https://api.veraz.io/v1`
**Status**: Design Phase
**Purpose**: Production-ready REST API for Proof of Solvency infrastructure

---

## Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Core Endpoints](#core-endpoints)
4. [Webhook System](#webhook-system)
5. [Error Handling](#error-handling)
6. [Rate Limiting](#rate-limiting)
7. [Data Models](#data-models)

---

## Overview

### Design Principles (from PRODUCT_DEFINITION.md)

1. **Production-Ready**: NOT an MVP - full SaaS infrastructure
2. **Multi-Tenancy**: Support multiple protocols on single platform
3. **Real-Time**: WebSocket updates for live solvency status
4. **Privacy-Preserving**: Never expose user balances, only aggregates
5. **Embeddable**: JSON responses optimized for widgets/badges

### Differentiation vs zkPOS

| Feature | zkPOS | Veraz API v1 |
|---------|-------|--------------|
| **API Type** | Basic JSON endpoint | Full REST API + WebSockets |
| **Multi-Protocol** | Single issuer per instance | Multi-tenant SaaS |
| **Webhooks** | ❌ | ✅ Real-time alerts |
| **Historical Data** | ❌ | ✅ Time-series analytics |
| **Embeddable Widgets** | Basic badge | Full widget library |
| **Reserve Breakdown** | ❌ | ✅ Multi-source aggregation |

---

## Authentication

### API Key System

**Endpoint**: `POST /auth/api-key`

**Request**:
```json
{
  "protocol_id": "defindex-vault-123",
  "name": "Production API Key",
  "permissions": ["read:solvency", "write:attestations"]
}
```

**Response**:
```json
{
  "api_key": "vz_live_a1b2c3d4e5f6...",
  "protocol_id": "defindex-vault-123",
  "created_at": "2026-09-23T10:00:00Z",
  "permissions": ["read:solvency", "write:attestations"]
}
```

**Usage**:
```bash
curl https://api.veraz.io/v1/protocols/defindex-vault-123/solvency \
  -H "Authorization: Bearer vz_live_a1b2c3d4e5f6..."
```

### Tiers

| Tier | Rate Limit | Endpoints | Webhooks | Price |
|------|------------|-----------|----------|-------|
| **Free** | 100 req/hr | Read-only | ❌ | $0 |
| **Pro** | 1,000 req/hr | All | ✅ 5 webhooks | $500/mo |
| **Enterprise** | Unlimited | All | ✅ Unlimited | $2,500+/mo |

---

## Core Endpoints

### 1. Get Protocol Solvency Status

**GET** `/protocols/{protocol_id}/solvency`

**Purpose**: Get current solvency attestation (most recent proof)

**Response**:
```json
{
  "protocol_id": "defindex-vault-123",
  "protocol_name": "DeFindex USDC Vault",
  "status": "solvent",
  "solvency_ratio": 1.05,
  "attestation": {
    "solvent": true,
    "reserves": 105000000000000,
    "liabilities": 100000000000000,
    "ledger_seq": 12345678,
    "timestamp": "2026-09-23T10:00:00Z",
    "proof_hash": "0x1234...abcd"
  },
  "reserve_breakdown": {
    "sac_balance": 50000000000000,
    "aquarius_balance": 0,
    "defindex_balance": 55000000000000,
    "total": 105000000000000
  },
  "verification": {
    "contract_address": "CBCD1234...ABCD",
    "network": "mainnet",
    "verified_at": "2026-09-23T10:00:05Z"
  }
}
```

**Status Codes**:
- `200 OK`: Solvency data retrieved
- `404 Not Found`: Protocol not registered
- `503 Service Unavailable`: No recent attestation (stale data)

---

### 2. Get Reserve Details

**GET** `/protocols/{protocol_id}/reserves`

**Purpose**: Get detailed reserve breakdown across sources

**Query Parameters**:
- `include_sources` (boolean): Include individual source addresses (default: false)
- `as_of` (timestamp): Historical snapshot (optional)

**Response**:
```json
{
  "protocol_id": "defindex-vault-123",
  "total_reserves": 105000000000000,
  "asset": {
    "code": "USDC",
    "issuer": "GABC...1234",
    "contract": "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC"
  },
  "sources": [
    {
      "type": "sac_wallet",
      "amount": 50000000000000,
      "percentage": 47.62,
      "addresses": ["GABC...1234"] // Only if include_sources=true
    },
    {
      "type": "defindex_vault",
      "amount": 55000000000000,
      "percentage": 52.38,
      "vaults": [
        {
          "address": "CBNKCU3HGFKHFOF7JTGXQCNKE3G3DXS5RDBQUKQMIIECYKXPIOUGB2S3",
          "amount": 30000000000000,
          "apy": 6.51
        },
        {
          "address": "CAB4JOLSCNELJVDQKZLVGHKWJCLXFDBZZMITJAFL4GBGTHIKWO47PYFH",
          "amount": 25000000000000,
          "apy": 7.99
        }
      ]
    },
    {
      "type": "aquarius_pool",
      "amount": 0,
      "percentage": 0,
      "pools": []
    }
  ],
  "last_updated": "2026-09-23T10:00:00Z"
}
```

**Privacy Note**: Individual user balances are NEVER exposed. Only aggregate protocol-level reserves.

---

### 3. Get Attestation History

**GET** `/protocols/{protocol_id}/attestations`

**Purpose**: Historical proof timeline for analytics

**Query Parameters**:
- `limit` (integer): Max results (default: 50, max: 1000)
- `since` (timestamp): Start of time range
- `until` (timestamp): End of time range
- `status` (string): Filter by `solvent` or `insolvent`

**Response**:
```json
{
  "protocol_id": "defindex-vault-123",
  "total_count": 1234,
  "attestations": [
    {
      "id": "att_a1b2c3d4",
      "solvent": true,
      "reserves": 105000000000000,
      "liabilities": 100000000000000,
      "solvency_ratio": 1.05,
      "ledger_seq": 12345678,
      "timestamp": "2026-09-23T10:00:00Z",
      "proof_hash": "0x1234...abcd",
      "verification_gas": 2500000
    },
    {
      "id": "att_b2c3d4e5",
      "solvent": true,
      "reserves": 104500000000000,
      "liabilities": 100000000000000,
      "solvency_ratio": 1.045,
      "ledger_seq": 12345600,
      "timestamp": "2026-09-23T09:00:00Z",
      "proof_hash": "0x5678...ef01",
      "verification_gas": 2500000
    }
  ],
  "pagination": {
    "next_cursor": "cursor_xyz",
    "has_more": true
  }
}
```

**Use Cases**:
- Display solvency chart on protocol website
- Monitor collateral ratio trends
- Compliance reporting (regulatory audits)

---

### 4. Submit Attestation (Write Endpoint)

**POST** `/protocols/{protocol_id}/attestations`

**Purpose**: Submit new ZK proof for verification

**Request**:
```json
{
  "public_inputs": "0x1234567890abcdef...",
  "proof": "0xabcdef1234567890...",
  "metadata": {
    "generated_at": "2026-09-23T10:00:00Z",
    "client_version": "veraz-sdk-1.0.0"
  }
}
```

**Response**:
```json
{
  "attestation_id": "att_c3d4e5f6",
  "status": "pending",
  "submitted_at": "2026-09-23T10:00:05Z",
  "estimated_verification_time": "5-10 seconds",
  "transaction": {
    "hash": "tx_1234...abcd",
    "network": "mainnet",
    "explorer_url": "https://stellar.expert/explorer/public/tx/..."
  }
}
```

**Async Verification**:
After submission, verification happens on-chain. Poll status via:

**GET** `/protocols/{protocol_id}/attestations/{attestation_id}`

```json
{
  "attestation_id": "att_c3d4e5f6",
  "status": "verified", // pending | verified | failed
  "solvent": true,
  "reserves": 105000000000000,
  "liabilities": 100000000000000,
  "verified_at": "2026-09-23T10:00:10Z",
  "transaction": {
    "hash": "tx_1234...abcd",
    "ledger_seq": 12345678,
    "gas_used": 2500000
  }
}
```

---

### 5. Protocol Registration

**POST** `/protocols`

**Purpose**: Register new protocol for Veraz monitoring

**Request**:
```json
{
  "name": "DeFindex USDC Vault",
  "description": "Yield-bearing USDC vault with Blend strategies",
  "contract_address": "CBCD1234...ABCD",
  "network": "mainnet",
  "asset": {
    "code": "USDC",
    "issuer": "GABC...1234"
  },
  "reserve_sources": {
    "sac_wallets": ["GABC...1234"],
    "defindex_vaults": [
      "CBNKCU3HGFKHFOF7JTGXQCNKE3G3DXS5RDBQUKQMIIECYKXPIOUGB2S3",
      "CAB4JOLSCNELJVDQKZLVGHKWJCLXFDBZZMITJAFL4GBGTHIKWO47PYFH"
    ],
    "aquarius_pools": [],
    "templar_custody": []
  },
  "attestation_schedule": "hourly", // hourly | daily | on_demand
  "collateral_alerts": {
    "enabled": true,
    "threshold": 1.02 // Alert if ratio < 1.02
  }
}
```

**Response**:
```json
{
  "protocol_id": "defindex-vault-123",
  "status": "active",
  "created_at": "2026-09-23T10:00:00Z",
  "api_key": "vz_live_a1b2c3d4e5f6...",
  "webhook_secret": "whsec_abcd1234...",
  "next_attestation": "2026-09-23T11:00:00Z"
}
```

---

### 6. Widget Embed Code

**GET** `/protocols/{protocol_id}/widget`

**Purpose**: Generate embeddable HTML/React code

**Query Parameters**:
- `format` (string): `html` | `react` | `vue` (default: `html`)
- `theme` (string): `light` | `dark` | `auto` (default: `auto`)
- `size` (string): `small` | `medium` | `large` (default: `medium`)

**Response**:
```json
{
  "protocol_id": "defindex-vault-123",
  "widget": {
    "html": "<div data-veraz-widget=\"defindex-vault-123\"></div><script src=\"https://cdn.veraz.io/widget.js\"></script>",
    "react": "import { VerazBadge } from '@veraz/react';\n\n<VerazBadge protocol=\"defindex-vault-123\" theme=\"dark\" />",
    "preview_url": "https://veraz.io/embed/defindex-vault-123"
  },
  "configuration": {
    "theme": "dark",
    "size": "medium",
    "auto_refresh": true,
    "show_breakdown": false
  }
}
```

---

## Webhook System

### Webhook Events

**POST** `{webhook_url}` (customer-provided)

**Event Types**:
1. `attestation.verified` - New proof verified
2. `attestation.failed` - Proof verification failed
3. `collateral.alert` - Solvency ratio below threshold
4. `protocol.updated` - Protocol configuration changed

**Payload**:
```json
{
  "event_id": "evt_a1b2c3d4",
  "event_type": "collateral.alert",
  "protocol_id": "defindex-vault-123",
  "timestamp": "2026-09-23T10:00:00Z",
  "data": {
    "current_ratio": 1.01,
    "threshold": 1.02,
    "reserves": 101000000000000,
    "liabilities": 100000000000000,
    "alert_level": "warning" // warning | critical
  },
  "signature": "sha256=..." // HMAC signature for verification
}
```

**Signature Verification** (webhook_secret):
```javascript
const crypto = require('crypto');
const signature = crypto
  .createHmac('sha256', webhook_secret)
  .update(JSON.stringify(payload))
  .digest('hex');
```

---

## Error Handling

### Standard Error Response

```json
{
  "error": {
    "code": "protocol_not_found",
    "message": "Protocol 'defindex-vault-123' does not exist",
    "details": {
      "protocol_id": "defindex-vault-123",
      "suggestion": "Check protocol ID or register at POST /protocols"
    },
    "request_id": "req_a1b2c3d4",
    "timestamp": "2026-09-23T10:00:00Z"
  }
}
```

### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `protocol_not_found` | 404 | Protocol ID doesn't exist |
| `stale_attestation` | 503 | No recent proof (>24hrs old) |
| `invalid_proof` | 400 | ZK proof verification failed |
| `rate_limit_exceeded` | 429 | Too many requests |
| `unauthorized` | 401 | Invalid or missing API key |
| `insufficient_permissions` | 403 | API key lacks required permissions |
| `internal_error` | 500 | Server error (retry with exponential backoff) |

---

## Rate Limiting

### Headers

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 987
X-RateLimit-Reset: 1695470400
Retry-After: 3600
```

### Tier Limits

| Tier | Requests/Hour | Burst Limit |
|------|---------------|-------------|
| Free | 100 | 10/min |
| Pro | 1,000 | 100/min |
| Enterprise | Unlimited | Unlimited |

---

## Data Models

### Protocol

```typescript
interface Protocol {
  protocol_id: string;
  name: string;
  description: string;
  contract_address: string;
  network: 'mainnet' | 'testnet';
  asset: Asset;
  reserve_sources: ReserveSources;
  attestation_schedule: 'hourly' | 'daily' | 'on_demand';
  collateral_alerts: CollateralAlerts;
  status: 'active' | 'paused' | 'archived';
  created_at: string; // ISO 8601
  updated_at: string;
}
```

### Attestation

```typescript
interface Attestation {
  attestation_id: string;
  protocol_id: string;
  solvent: boolean;
  reserves: bigint;
  liabilities: bigint;
  solvency_ratio: number;
  ledger_seq: number;
  timestamp: string;
  proof_hash: string;
  reserve_breakdown: ReserveBreakdown;
  verification: Verification;
}
```

### Reserve Breakdown

```typescript
interface ReserveBreakdown {
  sac_balance: bigint;
  aquarius_balance: bigint;
  defindex_balance: bigint;
  blend_balance: bigint;
  templar_balance: bigint;
  total: bigint;
}
```

---

## Implementation Roadmap

### Phase 1: Core Read Endpoints (Week 1)
- ✅ GET /protocols/{id}/solvency
- ✅ GET /protocols/{id}/reserves
- ✅ GET /protocols/{id}/attestations
- Database: PostgreSQL with time-series partitioning
- Caching: Redis for hot paths

### Phase 2: Write Endpoints (Week 2)
- POST /protocols
- POST /protocols/{id}/attestations
- Authentication system (API keys)

### Phase 3: Real-Time (Week 3)
- WebSocket support for live updates
- Webhook delivery system
- Alert engine for collateral ratios

### Phase 4: Widgets & SDKs (Week 4)
- GET /protocols/{id}/widget
- @veraz/react npm package
- @veraz/js npm package
- Widget CDN hosting

---

## Success Metrics

**API Adoption**:
- Target: 10 protocols integrated (Week 8)
- Target: 1,000 API calls/day (Week 8)
- Target: 5 webhook subscribers (Week 8)

**Performance**:
- P95 latency: <200ms
- Uptime: 99.9%
- Cache hit rate: >80%

---

**Status**: ✅ Specification Complete
**Next Step**: Implement Phase 1 (Core Read Endpoints)
