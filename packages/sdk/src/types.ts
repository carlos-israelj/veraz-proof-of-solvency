/**
 * Veraz Protocol SDK - Type Definitions
 *
 * Core types for the Veraz SDK
 */

import type { CompiledCircuit } from '@noir-lang/types';

// Re-export for external use
export type { CompiledCircuit };

/**
 * User balance record from database
 */
export interface Balance {
  userId: string;
  balance: bigint; // i128 compatible
}

/**
 * Merkle tree leaf with salt for privacy
 */
export interface MerkleLeaf {
  userId: string;
  balance: bigint;
  salt: string; // 32-byte hex string
  index: number;
}

/**
 * Merkle receipt for individual verification
 * Users can use this to verify their balance was included in the attestation
 */
export interface MerkleReceipt {
  userId: string;
  balance: string; // Stringified bigint
  salt: string;
  siblings: string[]; // Sibling hashes in path to root
  root: string;
}

/**
 * Database connection configuration
 */
export interface DatabaseConfig {
  type: 'postgres' | 'mysql' | 'mongodb' | 'supabase';
  connectionString: string;
  /**
   * SQL query to fetch user balances
   * Must return columns: user_id (string), balance (number/bigint)
   *
   * Example:
   * "SELECT user_id, balance FROM accounts WHERE asset = 'USDC'"
   *
   * For Supabase: Use standard PostgreSQL connection string or Supabase connection pooler
   */
  query: string;
  /**
   * Optional: For Supabase, you can provide the project URL and anon key
   * If provided, will use Supabase client instead of direct Postgres connection
   */
  supabaseUrl?: string;
  supabaseKey?: string;
}

/**
 * Stellar network configuration
 */
export interface StellarConfig {
  network: 'testnet' | 'mainnet';
  /**
   * Stellar secret key (S...)
   * Used to sign attestation transactions
   */
  secretKey: string;
  /**
   * Solvency Policy contract ID (C...)
   */
  contractId: string;
  /**
   * Optional: RPC URL override
   */
  rpcUrl?: string;
}

/**
 * Complete Veraz SDK configuration
 */
export interface VerazConfig {
  database: DatabaseConfig;
  stellar: StellarConfig;
  /**
   * Optional: Noir circuit object (for client-provided circuits)
   */
  circuit?: CompiledCircuit;
  /**
   * Optional: Path to compiled Noir circuit JSON file
   */
  circuitPath?: string;
  /**
   * Optional: Ledger sequence number for attestation
   * If not provided, uses current timestamp
   */
  ledgerSeq?: number;
}

/**
 * Result of attestation generation
 */
export interface AttestationResult {
  success: boolean;
  solvent: boolean;
  txHash: string;
  merkleRoot: string;
  totalLiabilities: string; // Stringified bigint
  ledgerSeq?: number;
  receipts?: Map<string, MerkleReceipt>;
  error?: string;
}

/**
 * Proof data structure
 */
export interface ProofData {
  proof: Uint8Array; // 14,592 bytes (UltraHonk proof)
  publicInputs: Uint8Array; // 96 bytes (root + liabilities + ledger_seq)
}
