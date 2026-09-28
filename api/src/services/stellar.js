/**
 * Stellar Service - Contract Interaction Layer
 *
 * Handles all interactions with Stellar/Soroban contracts
 * Based on docs/technical/API_SPECIFICATION_V1.md
 */

import * as StellarSdk from '@stellar/stellar-sdk';

class StellarService {
  constructor() {
    this.network = process.env.STELLAR_NETWORK || 'testnet';
    this.horizonUrl = process.env.STELLAR_HORIZON_URL || 'https://horizon-testnet.stellar.org';

    // Initialize RPC server
    const rpcUrl = process.env.STELLAR_RPC_URL ||
      (this.network === 'mainnet'
        ? 'https://soroban-rpc.mainnet.stellar.org'
        : 'https://soroban-testnet.stellar.org');

    this.server = new StellarSdk.rpc.Server(rpcUrl);

    // Contract addresses
    this.solvencyContract = process.env.SOLVENCY_CONTRACT;
    this.verifierContract = process.env.VERIFIER_CONTRACT;

    console.log(`✅ Stellar Service initialized (${this.network})`);
  }

  /**
   * Query solvency attestation from contract
   * @param {string} protocolId - Protocol contract ID (solvency policy contract)
   * @returns {Promise<Object|null>} Attestation object or null
   */
  async querySolvencyAttestation(protocolId) {
    try {
      // Validate it's a valid contract address format
      if (!protocolId || protocolId.length !== 56 || !protocolId.startsWith('C')) {
        console.log(`Invalid protocol ID format: ${protocolId}`);
        return null;
      }

      console.log(`Querying solvency attestation for: ${protocolId}`);

      // Create contract instance
      const contractAddress = protocolId;
      const sourceAccount = await this.server.getAccount(
        'GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF' // Null account for simulation
      );

      // Build transaction to call is_solvent() method
      const contract = new StellarSdk.Contract(contractAddress);

      const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: this.network === 'mainnet'
          ? StellarSdk.Networks.PUBLIC
          : StellarSdk.Networks.TESTNET,
      })
        .addOperation(contract.call('is_solvent'))
        .setTimeout(30)
        .build();

      // Simulate the transaction to get result without submitting
      const simulation = await this.server.simulateTransaction(transaction);

      if (!simulation.result) {
        console.log('No result from simulation');
        return null;
      }

      // Parse the attestation from simulation result
      const attestation = this.parseAttestation(simulation.result.retval);

      console.log('✅ Attestation retrieved:', {
        solvent: attestation.solvent,
        reserves: this.formatStroops(attestation.reserves),
        liabilities: this.formatStroops(attestation.liabilities)
      });

      return attestation;

    } catch (error) {
      console.error('Error querying solvency:', error.message);

      // Return null if no attestation exists (expected for new/uninitialized protocols)
      if (error.message?.includes('null') ||
          error.message?.includes('not found') ||
          error.message?.includes('not initialized')) {
        return null;
      }

      // For other errors, throw to be handled by controller
      throw new Error(`Failed to query contract: ${error.message}`);
    }
  }

  /**
   * Parse attestation from Soroban result
   * @param {Object} scVal - Soroban ScVal (struct returned from is_solvent)
   * @returns {Object} Parsed attestation
   */
  parseAttestation(scVal) {
    try {
      // Convert Soroban ScVal to native JavaScript object
      // The is_solvent() method returns an Attestation struct:
      // struct Attestation {
      //     solvent: bool,
      //     reserves: i128,
      //     sac_balance: i128,
      //     aquarius_balance: i128,
      //     defindex_balance: i128,
      //     liabilities: i128,
      //     ledger_seq: u32,
      //     timestamp: u64
      // }

      const attestation = StellarSdk.scValToNative(scVal);

      // Convert i128 values to string (to avoid precision loss)
      return {
        solvent: attestation.solvent,
        reserves: attestation.reserves.toString(),
        sac_balance: attestation.sac_balance.toString(),
        aquarius_balance: attestation.aquarius_balance.toString(),
        defindex_balance: attestation.defindex_balance.toString(),
        liabilities: attestation.liabilities.toString(),
        ledger_seq: Number(attestation.ledger_seq),
        timestamp: Number(attestation.timestamp)
      };

    } catch (error) {
      console.error('Error parsing attestation:', error);
      throw new Error(`Failed to parse contract response: ${error.message}`);
    }
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
