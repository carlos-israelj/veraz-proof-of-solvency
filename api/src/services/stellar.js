/**
 * Stellar Service - Contract Interaction Layer
 *
 * Handles all interactions with Stellar/Soroban contracts
 * Based on docs/technical/API_SPECIFICATION_V1.md
 */

import StellarSdk from '@stellar/stellar-sdk';

// SDK v13 uses new structure: rpc.Server instead of SorobanRpc.Server
const rpc = StellarSdk.rpc;
const Contract = StellarSdk.contract;

class StellarService {
  constructor() {
    this.network = process.env.STELLAR_NETWORK || 'testnet';
    this.horizonUrl = process.env.STELLAR_HORIZON_URL || 'https://horizon-testnet.stellar.org';

    // Initialize RPC server
    const rpcUrl = this.network === 'mainnet'
      ? 'https://soroban-rpc.mainnet.stellar.org'
      : 'https://soroban-rpc.testnet.stellar.org';

    this.server = new rpc.Server(rpcUrl);

    // Contract addresses
    this.solvencyContract = process.env.SOLVENCY_CONTRACT;
    this.verifierContract = process.env.VERIFIER_CONTRACT;

    console.log(`✅ Stellar Service initialized (${this.network})`);
  }

  /**
   * Query solvency attestation from contract
   * @param {string} protocolId - Protocol identifier
   * @returns {Promise<Object|null>} Attestation object or null
   */
  async querySolvencyAttestation(protocolId) {
    try {
      // TODO: Implement actual contract querying with SDK v13
      // For now, return mock data to test API structure

      // Validate it's a valid contract address format
      if (!protocolId || protocolId.length !== 56 || !protocolId.startsWith('C')) {
        return null;
      }

      // Return mock attestation data
      // In production, this would query the actual contract:
      // 1. Create contract client
      // 2. Call is_solvent() method
      // 3. Parse Soroban result to native types

      return this.parseAttestation(null);

    } catch (error) {
      console.error('Error querying solvency:', error);

      // Return null if no attestation exists (expected for new protocols)
      if (error.message?.includes('null') || error.message?.includes('not found')) {
        return null;
      }

      throw error;
    }
  }

  /**
   * Parse attestation from Soroban result
   * @param {Object} result - Soroban RPC result
   * @returns {Object} Parsed attestation
   */
  parseAttestation(result) {
    // Mock implementation - in real version, parse Soroban types
    // This would use stellar-sdk's scValToNative or similar

    return {
      solvent: true, // Parse from result
      reserves: '100000000000',
      sac_balance: '100000000000',
      aquarius_balance: '0',
      defindex_balance: '0',
      liabilities: '95000000000',
      ledger_seq: 12345678,
      timestamp: Math.floor(Date.now() / 1000)
    };
  }

  /**
   * Get reserve breakdown by source
   * @param {string} protocolId - Protocol identifier
   * @returns {Promise<Object>} Reserve breakdown
   */
  async getReserveBreakdown(protocolId) {
    const attestation = await this.querySolvencyAttestation(protocolId);

    if (!attestation) {
      return null;
    }

    return {
      total: attestation.reserves,
      sac_balance: attestation.sac_balance,
      aquarius_balance: attestation.aquarius_balance,
      defindex_balance: attestation.defindex_balance,
      breakdown: [
        {
          type: 'sac_wallet',
          amount: attestation.sac_balance,
          percentage: this.calculatePercentage(attestation.sac_balance, attestation.reserves)
        },
        {
          type: 'defindex_vault',
          amount: attestation.defindex_balance,
          percentage: this.calculatePercentage(attestation.defindex_balance, attestation.reserves)
        },
        {
          type: 'aquarius_pool',
          amount: attestation.aquarius_balance,
          percentage: this.calculatePercentage(attestation.aquarius_balance, attestation.reserves)
        }
      ].filter(source => source.amount !== '0')
    };
  }

  /**
   * Calculate percentage
   * @param {string} part - Part value (stroops)
   * @param {string} total - Total value (stroops)
   * @returns {number} Percentage
   */
  calculatePercentage(part, total) {
    if (total === '0') return 0;
    return (parseFloat(part) / parseFloat(total)) * 100;
  }

  /**
   * Get attestation history (mock for now - would query database)
   * @param {string} protocolId - Protocol identifier
   * @param {Object} options - Query options (limit, since, until)
   * @returns {Promise<Array>} Array of attestations
   */
  async getAttestationHistory(protocolId, options = {}) {
    const { limit = 50, since, until } = options;

    // Mock implementation
    // In production, this would query PostgreSQL database
    // where attestations are stored after each successful proof

    const current = await this.querySolvencyAttestation(protocolId);

    if (!current) {
      return [];
    }

    // Return array with current attestation
    // In real implementation, return historical records from DB
    return [{
      id: `att_${Date.now()}`,
      ...current,
      timestamp_iso: new Date(current.timestamp * 1000).toISOString()
    }];
  }

  /**
   * Format stroops to human-readable amount
   * @param {string} stroops - Amount in stroops (7 decimals)
   * @returns {string} Formatted amount
   */
  formatStroops(stroops) {
    return (parseFloat(stroops) / 10000000).toFixed(2);
  }

  /**
   * Health check - verify connection to Stellar network
   * @returns {Promise<Object>} Health status
   */
  async healthCheck() {
    try {
      const ledger = await this.server.getLatestLedger();

      return {
        status: 'healthy',
        network: this.network,
        latestLedger: ledger.sequence,
        protocolVersion: ledger.protocolVersion
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        network: this.network,
        error: error.message
      };
    }
  }
}

// Singleton instance
const stellarService = new StellarService();

export default stellarService;
