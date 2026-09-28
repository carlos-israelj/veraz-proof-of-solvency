/**
 * Health Check Routes
 */

import express from 'express';
import stellarService from '../services/stellar.js';

const router = express.Router();

/**
 * GET /health
 *
 * Health check endpoint
 */
router.get('/', async (req, res) => {
  try {
    const stellar = await stellarService.healthCheck();

    const health = {
      status: stellar.status === 'healthy' ? 'operational' : 'degraded',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      services: {
        api: 'healthy',
        stellar: stellar.status,
        database: 'not_implemented' // TODO: Add database health check
      },
      network: {
        name: stellar.network,
        latestLedger: stellar.latestLedger,
        protocolVersion: stellar.protocolVersion
      }
    };

    const statusCode = health.status === 'operational' ? 200 : 503;
    res.status(statusCode).json(health);

  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
});

export default router;
