/**
 * Protocol Controller
 *
 * Handles HTTP requests for protocol solvency endpoints
 * Based on docs/technical/API_SPECIFICATION_V1.md
 */

import stellarService from '../services/stellar.js';
import { formatResponse, formatError } from '../utils/response.js';

class ProtocolController {
  /**
   * GET /api/v1/protocols/:id/solvency
   *
   * Get current solvency status for a protocol
   */
  async getSolvency(req, res, next) {
    try {
      const { id: protocolId } = req.params;

      // Query attestation from Stellar contract
      const attestation = await stellarService.querySolvencyAttestation(protocolId);

      if (!attestation) {
        return res.status(503).json(formatError({
          code: 'stale_attestation',
          message: 'No recent attestation found for this protocol',
          details: {
            protocol_id: protocolId,
            suggestion: 'Protocol has not submitted a proof recently or does not exist'
          }
        }));
      }

      // Calculate solvency ratio
      const solvencyRatio = attestation.liabilities !== '0'
        ? parseFloat(attestation.reserves) / parseFloat(attestation.liabilities)
        : 0;

      // Format response according to API spec
      const response = {
        protocol_id: protocolId,
        protocol_name: `Protocol ${protocolId.substring(0, 10)}...`, // TODO: Get from database
        status: attestation.solvent ? 'solvent' : 'insolvent',
        solvency_ratio: solvencyRatio,
        attestation: {
          solvent: attestation.solvent,
          reserves: attestation.reserves,
          liabilities: attestation.liabilities,
          ledger_seq: attestation.ledger_seq,
          timestamp: new Date(attestation.timestamp * 1000).toISOString(),
          proof_hash: 'N/A' // TODO: Store proof hash in database
        },
        reserve_breakdown: {
          sac_balance: attestation.sac_balance,
          aquarius_balance: attestation.aquarius_balance,
          defindex_balance: attestation.defindex_balance,
          total: attestation.reserves
        },
        verification: {
          contract_address: protocolId,
          network: process.env.STELLAR_NETWORK || 'testnet',
          verified_at: new Date(attestation.timestamp * 1000).toISOString()
        }
      };

      res.json(formatResponse(response));

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/v1/protocols/:id/reserves
   *
   * Get detailed reserve breakdown
   */
  async getReserves(req, res, next) {
    try {
      const { id: protocolId } = req.params;
      const { include_sources } = req.query;

      // Get reserve breakdown
      const breakdown = await stellarService.getReserveBreakdown(protocolId);

      if (!breakdown) {
        return res.status(404).json(formatError({
          code: 'protocol_not_found',
          message: `Protocol '${protocolId}' not found or has no attestation`,
          details: {
            protocol_id: protocolId
          }
        }));
      }

      // Format response
      const response = {
        protocol_id: protocolId,
        total_reserves: breakdown.total,
        asset: {
          code: 'USDC', // TODO: Get from config
          issuer: 'GABC...1234', // TODO: Get from config
          contract: process.env.RESERVE_SAC || 'N/A'
        },
        sources: breakdown.breakdown.map(source => ({
          type: source.type,
          amount: source.amount,
          percentage: parseFloat(source.percentage.toFixed(2)),
          // Only include addresses if requested
          ...(include_sources === 'true' && {
            addresses: getSourceAddresses(source.type, protocolId)
          })
        })),
        last_updated: new Date().toISOString() // TODO: Use actual timestamp
      };

      res.json(formatResponse(response));

    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/v1/protocols/:id/attestations
   *
   * Get attestation history
   */
  async getAttestations(req, res, next) {
    try {
      const { id: protocolId } = req.params;
      const {
        limit = 50,
        since,
        until,
        status
      } = req.query;

      // Parse query parameters
      const options = {
        limit: parseInt(limit),
        since: since ? new Date(since) : undefined,
        until: until ? new Date(until) : undefined
      };

      // Get attestation history
      const attestations = await stellarService.getAttestationHistory(protocolId, options);

      // Filter by status if provided
      let filtered = attestations;
      if (status) {
        filtered = attestations.filter(att =>
          status === 'solvent' ? att.solvent : !att.solvent
        );
      }

      // Format response
      const response = {
        protocol_id: protocolId,
        total_count: filtered.length,
        attestations: filtered.map(att => ({
          id: att.id,
          solvent: att.solvent,
          reserves: att.reserves,
          liabilities: att.liabilities,
          solvency_ratio: parseFloat(att.reserves) / parseFloat(att.liabilities),
          ledger_seq: att.ledger_seq,
          timestamp: att.timestamp_iso,
          proof_hash: 'N/A', // TODO: Store in database
          verification_gas: 2500000 // Estimated
        })),
        pagination: {
          next_cursor: filtered.length >= limit ? 'cursor_next' : null,
          has_more: filtered.length >= limit
        }
      };

      res.json(formatResponse(response));

    } catch (error) {
      next(error);
    }
  }
}

/**
 * Helper: Get source addresses (mock for now)
 */
function getSourceAddresses(sourceType, protocolId) {
  // TODO: Query from database/config
  switch (sourceType) {
    case 'sac_wallet':
      return ['GABC...1234'];
    case 'defindex_vault':
      return ['CBNK...B2S3', 'CA2F...4UKK'];
    case 'aquarius_pool':
      return [];
    default:
      return [];
  }
}

export default new ProtocolController();
