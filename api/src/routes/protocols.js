/**
 * Protocol Routes
 *
 * Defines API endpoints for protocol solvency queries
 * Based on docs/technical/API_SPECIFICATION_V1.md
 */

import express from 'express';
import protocolController from '../controllers/protocolController.js';

const router = express.Router();

/**
 * GET /api/v1/protocols/:id/solvency
 *
 * Get current solvency attestation
 */
router.get('/:id/solvency', protocolController.getSolvency);

/**
 * GET /api/v1/protocols/:id/reserves
 *
 * Get reserve breakdown by source
 */
router.get('/:id/reserves', protocolController.getReserves);

/**
 * GET /api/v1/protocols/:id/attestations
 *
 * Get attestation history
 */
router.get('/:id/attestations', protocolController.getAttestations);

export default router;
