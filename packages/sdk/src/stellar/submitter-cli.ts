/**
 * Veraz Protocol SDK - Stellar Transaction Submitter (CLI Version)
 *
 * Simplified version that uses the Stellar CLI for contract invocations.
 * This approach is more reliable than using stellar-sdk v13 which has a different API.
 *
 * The stellar CLI is already tested and working perfectly with our deployed contracts.
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as os from 'os';

const execAsync = promisify(exec);

export interface StellarConfig {
  /**
   * Name of the stellar identity to use (e.g., 'alice', 'bob')
   * The identity must already be configured with `stellar keys add`
   * For backward compatibility, if secretKey is provided, it will be used as identity name
   */
  identity?: string;
  /**
   * @deprecated Use 'identity' instead. This field is kept for backward compatibility.
   * If provided, it will be treated as the identity name.
   */
  secretKey?: string;
  contractId: string;
  network: 'testnet' | 'mainnet';
  rpcUrl?: string;
}

export interface AttestationResult {
  success: boolean;
  solvent: boolean;
  txHash: string;
  ledgerSeq: number;
}

export class AttestationSubmitter {
  private config: StellarConfig;
  private identity: string;

  constructor(config: StellarConfig) {
    this.config = config;

    // Determine identity name (prefer identity field, fallback to secretKey for backward compatibility)
    if (config.identity) {
      this.identity = config.identity;
    } else if (config.secretKey) {
      // For backward compatibility: if secretKey is provided, assume it's the identity name
      this.identity = config.secretKey;
    } else {
      throw new Error('Either identity or secretKey (as identity name) must be provided');
    }

    console.log('📡 Stellar submitter initialized (CLI mode)');
    console.log(`   • Network: ${config.network}`);
    console.log(`   • Contract: ${config.contractId}`);
    console.log(`   • Identity: ${this.identity}`);
    console.log('   ℹ️  Note: Identity must be pre-configured with `stellar keys add`');
  }

  /**
   * Verify that the stellar CLI identity exists
   * Throws an error if the identity doesn't exist
   */
  private async verifyIdentity(): Promise<void> {
    try {
      const { stdout } = await execAsync(`stellar keys address ${this.identity} 2>&1`);
      if (!stdout.trim()) {
        throw new Error(`Identity '${this.identity}' not found`);
      }
    } catch (error) {
      throw new Error(
        `Stellar identity '${this.identity}' not found. ` +
        `Please configure it first with: stellar keys add ${this.identity}`
      );
    }
  }

  /**
   * Submit attestation to Stellar network using CLI
   *
   * Process:
   * 1. Save proof and public inputs to temp files
   * 2. Invoke contract using stellar CLI
   * 3. Parse transaction result
   * 4. Cleanup temp files
   */
  async submitAttestation(
    proof: Uint8Array,
    publicInputs: Uint8Array,
    ledgerSeq?: number
  ): Promise<AttestationResult> {
    console.log('🚀 Submitting attestation to Stellar...');

    // Verify identity exists
    await this.verifyIdentity();

    try {
      // 1. Validate proof and public inputs
      if (proof.length !== 14592) {
        throw new Error(`Invalid proof length: ${proof.length}, expected 14592`);
      }
      if (publicInputs.length !== 96) {
        throw new Error(`Invalid public inputs length: ${publicInputs.length}, expected 96`);
      }

      // 2. Create temp directory for proof files
      const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'veraz-proof-'));
      const proofPath = path.join(tempDir, 'proof');
      const publicInputsPath = path.join(tempDir, 'public_inputs');

      try {
        // 3. Write proof files
        await fs.writeFile(proofPath, Buffer.from(proof));
        await fs.writeFile(publicInputsPath, Buffer.from(publicInputs));

        console.log('   ⏳ Invoking contract via stellar CLI...');

        // 4. Invoke contract using stellar CLI
        // Note: The contract method is 'verify_proof' for the verifier contract
        // If using solvency_policy, the method would be 'attest'
        const command = `stellar contract invoke \\
          --id ${this.config.contractId} \\
          --source ${this.identity} \\
          --network ${this.config.network} \\
          --send=yes \\
          -- \\
          verify_proof \\
          --proof_bytes-file-path "${proofPath}" \\
          --public_inputs-file-path "${publicInputsPath}"`;

        const { stdout, stderr } = await execAsync(command);

        // 5. Parse result
        // The stellar CLI outputs the transaction hash in the format:
        // "ℹ️  Signing transaction: <hash>"
        const txHashMatch = stdout.match(/Signing transaction: ([a-f0-9]{64})/i) ||
                           stderr.match(/Signing transaction: ([a-f0-9]{64})/i);

        const txHash = txHashMatch ? txHashMatch[1] : '';

        // Check if verification succeeded
        // For verify_proof, null = success
        // For attest, it returns a boolean
        const success = stdout.includes('null') || stdout.includes('true');

        console.log(`   ✅ Transaction submitted: ${txHash}`);

        if (success) {
          console.log('✅ PROOF VERIFIED ON-CHAIN');
        } else {
          console.log('❌ PROOF VERIFICATION FAILED');
        }

        return {
          success: true,
          solvent: success,
          txHash,
          ledgerSeq: ledgerSeq || 0,
        };

      } finally {
        // 6. Cleanup temp files
        try {
          await fs.rm(tempDir, { recursive: true, force: true });
        } catch (cleanupError) {
          console.warn('Warning: Failed to cleanup temp files:', cleanupError);
        }
      }

    } catch (error) {
      console.error('❌ Attestation submission failed:', error);

      // Parse error message for more details
      let errorMessage = String(error);
      if (errorMessage.includes('Command failed')) {
        // Extract the actual stellar CLI error
        const match = errorMessage.match(/stderr: (.+)/);
        if (match) {
          errorMessage = match[1];
        }
      }

      throw new Error(`Failed to submit attestation: ${errorMessage}`);
    }
  }

  /**
   * Get account balance (for checking if account can pay fees)
   */
  async getAccountBalance(): Promise<string> {
    try {
      await this.verifyIdentity();

      const command = `stellar keys address ${this.identity}`;
      const { stdout } = await execAsync(command);
      const address = stdout.trim();

      // Get account info using CLI
      const infoCommand = `stellar account info --address ${address} --network ${this.config.network}`;
      const { stdout: accountInfo } = await execAsync(infoCommand);

      // Parse balance from output
      // The CLI outputs balances in a human-readable format
      const balanceMatch = accountInfo.match(/native.*?(\d+\.?\d*)/i);
      return balanceMatch ? balanceMatch[1] : '0';

    } catch (error) {
      throw new Error(`Failed to fetch account balance: ${error}`);
    }
  }

  /**
   * Get network info
   */
  getNetworkInfo(): {
    network: string;
    contractId: string;
    identity: string;
  } {
    return {
      network: this.config.network,
      contractId: this.config.contractId,
      identity: this.identity,
    };
  }
}
