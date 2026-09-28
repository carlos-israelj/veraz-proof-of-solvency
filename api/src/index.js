/**
 * Veraz Public API v1
 *
 * Production-ready REST API for Proof of Solvency infrastructure
 * Based on docs/technical/API_SPECIFICATION_V1.md
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Routes
import protocolRoutes from './routes/protocols.js';
import healthRoutes from './routes/health.js';

// Middleware
import { errorHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/logger.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================================================
// Middleware
// ============================================================================

// Security headers
app.use(helmet());

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));

// Compression
app.use(compression());

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
app.use(requestLogger);

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 3600000, // 1 hour
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: {
      code: 'rate_limit_exceeded',
      message: 'Too many requests, please try again later',
      retryAfter: '1 hour'
    }
  }
});

app.use('/api', limiter);

// ============================================================================
// Routes
// ============================================================================

// Health check
app.use('/health', healthRoutes);

// API v1
app.use('/api/v1/protocols', protocolRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Veraz Public API',
    version: '1.0.0',
    description: 'Proof of Solvency Infrastructure for Stellar DeFi',
    documentation: 'https://docs.veraz.io/api',
    endpoints: {
      health: '/health',
      protocols: '/api/v1/protocols',
      swagger: '/api/docs'
    },
    network: process.env.STELLAR_NETWORK || 'testnet',
    status: 'operational'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      code: 'not_found',
      message: `Route ${req.method} ${req.path} not found`,
      timestamp: new Date().toISOString()
    }
  });
});

// Error handler (must be last)
app.use(errorHandler);

// ============================================================================
// Server Start
// ============================================================================

app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║                   VERAZ PUBLIC API v1.0.0                    ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝

🚀 Server running on port ${PORT}
🌍 Environment: ${process.env.NODE_ENV || 'development'}
🔗 Network: ${process.env.STELLAR_NETWORK || 'testnet'}

📡 Endpoints:
   Health:    http://localhost:${PORT}/health
   API Root:  http://localhost:${PORT}/api/v1
   Protocols: http://localhost:${PORT}/api/v1/protocols

📋 Rate Limiting:
   Window: ${parseInt(process.env.RATE_LIMIT_WINDOW_MS) / 60000} minutes
   Max Requests: ${process.env.RATE_LIMIT_MAX_REQUESTS || 100}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                         API READY ✅
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('\n⏳ SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\n⏳ SIGINT received, shutting down gracefully...');
  process.exit(0);
});

export default app;
