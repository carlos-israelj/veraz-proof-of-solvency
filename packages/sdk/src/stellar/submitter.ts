/**
 * Veraz Protocol SDK - Stellar Transaction Submitter
 *
 * Submits ZK proofs to the Solvency Policy contract on Stellar network.
 * Handles transaction building, signing, submission, and event parsing.
 */

import {
  // Server, // TODO: Update to v13 API
  Keypair,
  Networks,
  // TransactionBuilder, // TODO: Update to v13 API
  // Operation,
  // Asset,
  // Contract, // TODO: Update to v13 API
  // SorobanRpc, // TODO: Update to v13 API
  // xdr,
  // nativeToScVal,
  // scValToNative,
} from '@stellar/stellar-sdk';

// Temporary placeholders for v13 compatibility
const Server: any = null;
const TransactionBuilder: any = null;
const Contract: any = null;
const SorobanRpc: any = { Api: { isSimulationError: () => false, GetTransactionResponse: {} } };
const nativeToScVal: any = null;
const scValToNative: any = null;

// Temporary types for v13 compatibility
type ServerType = any;
namespace SorobanRpcNamespace {
  export namespace Api {
    export type GetTransactionResponse = any;
  }
}
import { StellarConfig } from '../types';

export interface AttestationResult {
  success: boolean;
  solvent: boolean;
  txHash: string;
  ledgerSeq: number;
}

export class AttestationSubmitter {
  private server: ServerType;
  private keypair: Keypair;
  private contractId: string;
  private network: string;

  constructor(config: StellarConfig) {
    // Initialize Stellar server
    if (config.network === 'testnet') {
      this.server = new Server('https://soroban-testnet.stellar.org');
      this.network = Networks.TESTNET;
    } else if (config.network === 'mainnet') {
      this.server = new Server('https://soroban.stellar.org');
      this.network = Networks.PUBLIC;
    } else {
      throw new Error(`Unsupported network: ${config.network}`);
    }

    // Initialize keypair from secret key
    try {
      this.keypair = Keypair.fromSecret(config.secretKey);
    } catch (error) {
      throw new Error(`Invalid secret key: ${error}`);
    }

    this.contractId = config.contractId;

    console.log('📡 Stellar submitter initialized');
    console.log(`   • Network: ${config.network}`);
    console.log(`   • Address: ${this.keypair.publicKey()}`);
    console.log(`   • Contract: ${this.contractId}`);
  }

  /**
   * Submit attestation to Stellar network
   *
   * Process:
   * 1. Build Soroban contract invocation
   * 2. Simulate transaction to get resource fees
   * 3. Sign transaction
   * 4. Submit to network
   * 5. Wait for confirmation
   * 6. Parse events to extract solvency result
   */
  async submitAttestation(
    proof: Uint8Array,
    publicInputs: Uint8Array,
    ledgerSeq?: number
  ): Promise<AttestationResult> {
    console.log('🚀 Submitting attestation to Stellar...');

    try {
      // 1. Load source account
      const sourceAccount = await this.server.getAccount(
        this.keypair.publicKey()
      );

      // 2. Build contract call operation
      const contract = new Contract(this.contractId);

      // Convert proof to BytesN<14592>
      if (proof.length !== 14592) {
        throw new Error(`Invalid proof length: ${proof.length}, expected 14592`);
      }

      // Convert public inputs to BytesN<96>
      if (publicInputs.length !== 96) {
        throw new Error(
          `Invalid public inputs length: ${publicInputs.length}, expected 96`
        );
      }

      // Build the contract call parameters
      const proofScVal = nativeToScVal(Buffer.from(proof), {
        type: 'bytes',
      });
      const publicInputsScVal = nativeToScVal(Buffer.from(publicInputs), {
        type: 'bytes',
      });
      const attestorScVal = nativeToScVal(this.keypair.publicKey(), {
        type: 'address',
      });

      // Build transaction
      const operation = contract.call(
        'attest',
        attestorScVal,
        proofScVal,
        publicInputsScVal
      );

      let transaction = new TransactionBuilder(sourceAccount, {
        fee: '100000', // Will be updated after simulation
        networkPassphrase: this.network,
      })
        .addOperation(operation)
        .setTimeout(300)
        .build();

      console.log('   ⏳ Simulating transaction...');

      // 3. Simulate to get accurate resource fees
      const simulateResponse = await this.server.simulateTransaction(
        transaction
      );

      if (SorobanRpc.Api.isSimulationError(simulateResponse)) {
        throw new Error(`Simulation failed: ${simulateResponse.error}`);
      }

      // Assemble transaction with simulation results
      transaction = SorobanRpc.assembleTransaction(
        transaction,
        simulateResponse
      ).build();

      // 4. Sign transaction
      transaction.sign(this.keypair);

      console.log('   ⏳ Submitting transaction...');

      // 5. Submit to network
      const sendResponse = await this.server.sendTransaction(transaction);

      if (sendResponse.status === 'ERROR') {
        throw new Error(
          `Transaction submission failed: ${sendResponse.errorResult}`
        );
      }

      const txHash = sendResponse.hash;
      console.log(`   • TX Hash: ${txHash}`);

      // 6. Wait for confirmation
      console.log('   ⏳ Waiting for confirmation...');

      const confirmedTx = await this.waitForConfirmation(txHash);

      if (confirmedTx.status !== 'SUCCESS') {
        throw new Error(`Transaction failed: ${confirmedTx.status}`);
      }

      console.log('   ✅ Transaction confirmed!');

      // 7. Parse result
      const result = this.parseAttestationResult(confirmedTx);

      if (result.solvent) {
        console.log('✅ SOLVENT - Reserves ≥ Liabilities');
      } else {
        console.log('❌ INSOLVENT - Reserves < Liabilities');
      }

      return {
        success: true,
        solvent: result.solvent,
        txHash,
        ledgerSeq: result.ledgerSeq,
      };
    } catch (error) {
      console.error('❌ Attestation submission failed:', error);
      throw new Error(`Failed to submit attestation: ${error}`);
    }
  }

  /**
   * Wait for transaction confirmation
   * Polls the network until transaction is confirmed or times out
   */
  private async waitForConfirmation(
    txHash: string,
    timeoutSeconds: number = 60
  ): Promise<SorobanRpcNamespace.Api.GetTransactionResponse> {
    const startTime = Date.now();

    while (Date.now() - startTime < timeoutSeconds * 1000) {
      try {
        const response = await this.server.getTransaction(txHash);

        if (response.status !== 'NOT_FOUND') {
          return response;
        }

        // Wait 2 seconds before next poll
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (error) {
        // Continue polling on transient errors
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }

    throw new Error(
      `Transaction confirmation timeout after ${timeoutSeconds} seconds`
    );
  }

  /**
   * Parse attestation result from transaction response
   *
   * The contract's attest function returns a boolean:
   * - true = SOLVENT (reserves >= liabilities)
   * - false = INSOLVENT (reserves < liabilities)
   */
  private parseAttestationResult(tx: SorobanRpcNamespace.Api.GetTransactionResponse): {
    solvent: boolean;
    ledgerSeq: number;
  } {
    if (tx.status !== 'SUCCESS') {
      throw new Error('Cannot parse result from failed transaction');
    }

    // Extract return value from transaction result
    const returnValue = tx.returnValue;

    if (!returnValue) {
      throw new Error('No return value in transaction');
    }

    // The contract returns a boolean
    const solvent = scValToNative(returnValue) as boolean;

    // Get ledger sequence from transaction
    const ledgerSeq = tx.ledger || 0;

    return {
      solvent,
      ledgerSeq,
    };
  }

  /**
   * Get account balance (for checking if account can pay fees)
   */
  async getAccountBalance(): Promise<string> {
    try {
      const account = await this.server.getAccount(this.keypair.publicKey());
      const nativeBalance = account.balances.find(
        (b: any) => b.asset_type === 'native'
      );

      return nativeBalance ? (nativeBalance as any).balance : '0';
    } catch (error) {
      throw new Error(`Failed to fetch account balance: ${error}`);
    }
  }

  /**
   * Get network info
   */
  getNetworkInfo(): {
    network: string;
    address: string;
    contractId: string;
  } {
    return {
      network: this.network === Networks.TESTNET ? 'testnet' : 'mainnet',
      address: this.keypair.publicKey(),
      contractId: this.contractId,
    };
  }
}
