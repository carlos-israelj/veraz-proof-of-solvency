/**
 * Veraz Protocol SDK - Main Entry Point
 *
 * Generate Zero-Knowledge Proof of Solvency attestations locally.
 * All sensitive data stays on your server.
 */

import { CronJob } from 'cron';
import { createDatabaseConnector } from './database/connector';
import { MerkleSumTree } from './merkle/tree';
import { ProofGenerator } from './proof/generator';
import { AttestationSubmitter } from './stellar/submitter-cli';  // Using CLI version (reliable)
import {
  VerazConfig,
  AttestationResult,
  MerkleReceipt,
  Balance,
} from './types';

export * from './types';
export { MerkleSumTree } from './merkle/tree';
export { ProofGenerator } from './proof/generator';
export { AttestationSubmitter } from './stellar/submitter-cli';

export class VerazSDK {
  private config: VerazConfig;
  private proofGenerator: ProofGenerator | null = null;
  private submitter: AttestationSubmitter | null = null;
  private cronJob: CronJob | null = null;

  constructor(config: VerazConfig) {
    this.config = config;
    this.validateConfig();

    console.log('🔐 Veraz SDK initialized');
    console.log(`   • Database: ${config.database.type}`);
    console.log(`   • Network: ${config.stellar.network}`);
  }

  /**
   * Validate configuration
   */
  private validateConfig(): void {
    // Validate database config
    if (!this.config.database.connectionString) {
      throw new Error('Database connection string is required');
    }
    if (!this.config.database.query) {
      throw new Error('Database query is required');
    }

    // Validate Stellar config
    if (!this.config.stellar.secretKey) {
      throw new Error('Stellar secret key is required');
    }
    if (!this.config.stellar.contractId) {
      throw new Error('Stellar contract ID is required');
    }
    if (!['testnet', 'mainnet'].includes(this.config.stellar.network)) {
      throw new Error('Stellar network must be "testnet" or "mainnet"');
    }
  }

  /**
   * Initialize modules (lazy initialization)
   */
  private async ensureInitialized(): Promise<void> {
    if (!this.proofGenerator) {
      this.proofGenerator = new ProofGenerator(this.config.circuitPath);

      // Initialize proof generator with circuit if provided
      if (this.config.circuit) {
        await this.proofGenerator.initialize(this.config.circuit);
      } else if (this.config.circuitPath) {
        await this.proofGenerator.initialize();
      } else {
        throw new Error(
          'No circuit provided. Set config.circuit or config.circuitPath'
        );
      }
    }

    if (!this.submitter) {
      this.submitter = new AttestationSubmitter(this.config.stellar);
    }
  }

  /**
   * Generate and submit a solvency attestation
   *
   * Full process:
   * 1. Query balances from database
   * 2. Build Merkle Sum Tree
   * 3. Generate ZK proof (10-30 seconds)
   * 4. Submit to Stellar network
   * 5. Return result + individual receipts
   */
  async attest(): Promise<AttestationResult> {
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔐 VERAZ SOLVENCY ATTESTATION');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    try {
      // Initialize modules if needed
      await this.ensureInitialized();

      // Step 1: Query balances from database
      console.log('📊 Step 1/4: Querying balances from database...');
      const balances = await this.queryBalances();
      console.log(`   ✅ Found ${balances.length} user balances\n`);

      if (balances.length === 0) {
        throw new Error('No balances found in database');
      }

      // Step 2: Build Merkle Sum Tree
      console.log('🌳 Step 2/4: Building Merkle Sum Tree...');
      const merkleTree = new MerkleSumTree(balances);
      const stats = merkleTree.getStats();
      console.log(`   • Merkle Root: ${stats.root.substring(0, 16)}...`);
      console.log(`   • Total Liabilities: ${stats.totalLiabilities}`);
      console.log(`   • Tree Depth: ${stats.depth}`);
      console.log(`   • Leaf Count: ${stats.leafCount}\n`);

      // Step 3: Generate ZK proof
      console.log('🔐 Step 3/4: Generating Zero-Knowledge proof...');

      const proofInput = {
        merkleRoot: merkleTree.getRoot(),
        totalLiabilities: merkleTree.getTotalLiabilities(),
        ledgerSeq: this.config.ledgerSeq || Date.now(),
        balances: merkleTree.getBalances(),
        salts: merkleTree.getSalts(),
      };

      const { proof, publicInputs } = await this.proofGenerator!.generateProof(
        proofInput
      );
      console.log(`   ✅ Proof generated successfully\n`);

      // Step 4: Submit to Stellar network
      console.log('🚀 Step 4/4: Submitting to Stellar network...');
      const result = await this.submitter!.submitAttestation(
        proof,
        publicInputs,
        proofInput.ledgerSeq
      );

      // Generate individual verification receipts
      const receipts = new Map<string, MerkleReceipt>();
      for (const balance of balances) {
        const receipt = merkleTree.generateReceipt(balance.userId);
        if (receipt) {
          receipts.set(balance.userId, receipt);
        }
      }

      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('✅ ATTESTATION COMPLETE');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

      return {
        success: true,
        solvent: result.solvent,
        txHash: result.txHash,
        merkleRoot: merkleTree.getRoot(),
        totalLiabilities: merkleTree.getTotalLiabilities().toString(),
        ledgerSeq: result.ledgerSeq,
        receipts,
      };
    } catch (error) {
      console.error('\n❌ ATTESTATION FAILED');
      console.error(`   Error: ${error}\n`);

      return {
        success: false,
        solvent: false,
        txHash: '',
        merkleRoot: '',
        totalLiabilities: '0',
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  /**
   * Query balances from configured database
   */
  private async queryBalances(): Promise<Balance[]> {
    const connector = createDatabaseConnector(this.config.database);

    try {
      await connector.connect();
      const balances = await connector.queryBalances();
      await connector.disconnect();

      return balances;
    } catch (error) {
      await connector.disconnect();
      throw error;
    }
  }

  /**
   * Schedule automatic attestations using cron syntax
   *
   * Examples:
   * - Every hour: '0 * * * *'
   * - Every 6 hours: '0 STAR/6 * * *' (replace STAR with *)
   * - Daily at midnight: '0 0 * * *'
   * - Weekly on Sunday: '0 0 * * 0'
   *
   * @param schedule - Cron expression
   * @param onComplete - Optional callback after each attestation
   */
  scheduleAttestation(
    schedule: string,
    onComplete?: (result: AttestationResult) => void
  ): void {
    if (this.cronJob) {
      console.log('⚠️  Stopping existing scheduled job');
      this.cronJob.stop();
    }

    console.log(`⏰ Scheduling attestations: ${schedule}`);

    this.cronJob = new CronJob(
      schedule,
      async () => {
        console.log('\n⏰ Scheduled attestation triggered');
        const result = await this.attest();

        if (onComplete) {
          onComplete(result);
        }
      },
      null,
      true, // Start immediately
      'UTC'
    );

    console.log('✅ Scheduled attestation started');
  }

  /**
   * Stop scheduled attestations
   */
  stopSchedule(): void {
    if (this.cronJob) {
      this.cronJob.stop();
      this.cronJob = null;
      console.log('⏹️  Scheduled attestations stopped');
    }
  }

  /**
   * Get SDK statistics
   */
  getStats(): {
    database: string;
    network: string;
    contractId: string;
    scheduled: boolean;
  } {
    return {
      database: this.config.database.type,
      network: this.config.stellar.network,
      contractId: this.config.stellar.contractId,
      scheduled: this.cronJob !== null,
    };
  }

  /**
   * Check if account has sufficient balance for fees
   */
  async checkBalance(): Promise<string> {
    await this.ensureInitialized();
    return await this.submitter!.getAccountBalance();
  }
}

/**
 * Convenience function to create SDK instance
 */
export function createVerazSDK(config: VerazConfig): VerazSDK {
  return new VerazSDK(config);
}
