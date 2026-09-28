# Veraz Public API v1.0.0

Production-ready REST API for Proof of Solvency infrastructure.

Based on: `../docs/technical/API_SPECIFICATION_V1.md`

---

## Quick Start

### Installation

```bash
npm install
```

### Configuration

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

### Development

```bash
npm run dev
```

API will be available at `http://localhost:3000`

---

## Endpoints Implemented

### ✅ Core Read Endpoints (Phase 1)

1. **GET `/api/v1/protocols/:id/solvency`**
   - Get current solvency attestation
   - Returns: Solvency status, ratio, attestation details

2. **GET `/api/v1/protocols/:id/reserves`**
   - Get reserve breakdown by source
   - Query params: `include_sources` (boolean)
   - Returns: Multi-source reserve breakdown

3. **GET `/api/v1/protocols/:id/attestations`**
   - Get attestation history
   - Query params: `limit`, `since`, `until`, `status`
   - Returns: Array of historical attestations

4. **GET `/health`**
   - Health check endpoint
   - Returns: API status, Stellar network status

---

## Example Requests

### Get Solvency Status

```bash
curl http://localhost:3000/api/v1/protocols/CCKXS7YK6H2NAQC4K3TJJMFMKCH7COPFDVSRLZZSZV4RKOEXFVHE7PX6/solvency
```

**Response**:
```json
{
  "success": true,
  "data": {
    "protocol_id": "CCKXS7...",
    "status": "solvent",
    "solvency_ratio": 1.05,
    "attestation": {
      "solvent": true,
      "reserves": "105000000000",
      "liabilities": "100000000000",
      "ledger_seq": 12345678,
      "timestamp": "2026-09-23T10:00:00Z"
    },
    "reserve_breakdown": {
      "sac_balance": "50000000000",
      "defindex_balance": "55000000000",
      "total": "105000000000"
    }
  }
}
```

### Get Reserves

```bash
curl http://localhost:3000/api/v1/protocols/CCKXS7.../reserves?include_sources=true
```

### Get Attestations

```bash
curl "http://localhost:3000/api/v1/protocols/CCKXS7.../attestations?limit=10&status=solvent"
```

---

## Architecture

```
api/
├── src/
│   ├── index.js              Express server entry point
│   ├── routes/               HTTP route definitions
│   │   ├── protocols.js      Protocol endpoints
│   │   └── health.js         Health check
│   ├── controllers/          Business logic
│   │   └── protocolController.js
│   ├── services/             External integrations
│   │   └── stellar.js        Stellar/Soroban SDK
│   ├── middleware/           Express middleware
│   │   ├── errorHandler.js   Global error handling
│   │   └── logger.js         Request logging
│   └── utils/                Helper functions
│       └── response.js       Response formatting
├── package.json
└── .env
```

---

## Features

### Security
- ✅ Helmet (security headers)
- ✅ CORS (cross-origin resource sharing)
- ✅ Rate limiting (100 req/hour default)
- ✅ Input validation (TODO: Add Zod schemas)

### Performance
- ✅ Compression (gzip)
- ✅ Response caching (TODO: Add Redis)

### Reliability
- ✅ Error handling (global handler)
- ✅ Health checks
- ✅ Graceful shutdown

---

## Status

**Phase 1 (Core Read Endpoints)**: ✅ Complete (Sept 23, 2026)
- ✅ GET /solvency - Tested and working
- ✅ GET /reserves - Tested and working
- ✅ GET /attestations - Tested and working
- ✅ Health check - Operational
- ✅ Security middleware (Helmet, CORS, rate limiting)
- ✅ Error handling and logging
- ✅ Stellar SDK v13 integration

**Test Results**: See `API_TESTING_REPORT.md` for detailed test results (3/3 endpoints passing)

**Phase 2 (Write Endpoints)**: 📋 Pending
- POST /protocols (register)
- POST /attestations (submit)
- Authentication system

**Phase 3 (Database & Webhooks)**: 📋 Pending
- PostgreSQL integration
- Redis caching
- Webhook delivery system
- Event subscriptions

---

## Testing

### Manual Testing

```bash
# Health check
curl http://localhost:3000/health

# Root endpoint
curl http://localhost:3000/

# Solvency
curl http://localhost:3000/api/v1/protocols/CCKXS7YK6H2NAQC4K3TJJMFMKCH7COPFDVSRLZZSZV4RKOEXFVHE7PX6/solvency
```

### Integration Tests

```bash
npm test
```

(TODO: Implement Jest tests)

---

## Deployment

### Production Build

```bash
npm start
```

### Docker (TODO)

```bash
docker build -t veraz-api .
docker run -p 3000:3000 veraz-api
```

---

## Next Steps

1. **Add Database Layer**
   - PostgreSQL for attestation history
   - Cache layer (Redis)

2. **Implement Phase 2 Endpoints**
   - POST /protocols
   - POST /attestations

3. **Add Webhooks**
   - Event delivery system
   - Signature verification

4. **Testing**
   - Unit tests (Jest)
   - Integration tests
   - Load testing

---

## License

MIT
