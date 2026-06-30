/**
 * Veraz Protocol SDK - Merkle Sum Tree
 *
 * Builds a Merkle Sum Tree from user balances for Zero-Knowledge proof generation.
 * Compatible with the Noir circuit solvency.nr
 */

import { createHash, randomBytes } from 'crypto';
import { Balance, MerkleLeaf, MerkleReceipt } from '../types';

export class MerkleSumTree {
  private leaves: MerkleLeaf[];
  private tree: string[][]; // tree[level][index] = hash
  private root: string;
  private totalSum: bigint;

  constructor(balances: Balance[]) {
    // 1. Pad balances to next power of 2
    const paddedBalances = this.padToPowerOfTwo(balances);

    // 2. Create leaves with random salts
    this.leaves = paddedBalances.map((b, idx) => ({
      userId: b.userId,
      balance: b.balance,
      salt: this.generateSalt(),
      index: idx,
    }));

    // 3. Calculate total sum
    this.totalSum = this.leaves.reduce(
      (sum, leaf) => sum + leaf.balance,
      0n
    );

    // 4. Build tree
    this.tree = this.buildTree();
    this.root = this.tree[this.tree.length - 1][0];
  }

  /**
   * Build Merkle tree using Pedersen hash (SHA256 for now, will use Pedersen in production)
   */
  private buildTree(): string[][] {
    const tree: string[][] = [];

    // Level 0: hash all leaves
    const level0 = this.leaves.map((leaf) => this.hashLeaf(leaf));
    tree.push(level0);

    // Build up the tree
    let currentLevel = level0;
    while (currentLevel.length > 1) {
      const nextLevel: string[] = [];

      for (let i = 0; i < currentLevel.length; i += 2) {
        const left = currentLevel[i];
        const right = currentLevel[i + 1];
        const parent = this.hashPair(left, right);
        nextLevel.push(parent);
      }

      tree.push(nextLevel);
      currentLevel = nextLevel;
    }

    return tree;
  }

  /**
   * Hash a leaf node
   * Format: hash(userId || balance || salt)
   */
  private hashLeaf(leaf: MerkleLeaf): string {
    const userIdBuffer = Buffer.from(leaf.userId, 'utf8');
    const balanceBuffer = this.bigIntToBytes(leaf.balance);
    const saltBuffer = Buffer.from(leaf.salt, 'hex');

    const data = Buffer.concat([userIdBuffer, balanceBuffer, saltBuffer]);

    return createHash('sha256').update(data).digest('hex');
  }

  /**
   * Hash two nodes to create parent
   * Format: hash(left || right)
   */
  private hashPair(left: string, right: string): string {
    const leftBuffer = Buffer.from(left, 'hex');
    const rightBuffer = Buffer.from(right, 'hex');
    const data = Buffer.concat([leftBuffer, rightBuffer]);

    return createHash('sha256').update(data).digest('hex');
  }

  /**
   * Generate random salt for leaf privacy
   */
  private generateSalt(): string {
    return randomBytes(32).toString('hex');
  }

  /**
   * Convert BigInt to 16-byte buffer (i128 representation)
   */
  private bigIntToBytes(value: bigint): Buffer {
    // Convert to hex, pad to 32 chars (16 bytes)
    let hex = value.toString(16);

    // Handle negative numbers (two's complement)
    if (value < 0n) {
      // For negative numbers, we need proper two's complement
      const positive = -value;
      const bits = positive.toString(2).length;
      const bytes = Math.ceil(bits / 8);
      const maxValue = 2n ** BigInt(bytes * 8);
      const twosComplement = maxValue + value;
      hex = twosComplement.toString(16);
    }

    hex = hex.padStart(32, '0');

    return Buffer.from(hex, 'hex');
  }

  /**
   * Pad balances array to next power of 2
   * Required for balanced Merkle tree
   */
  private padToPowerOfTwo(balances: Balance[]): Balance[] {
    if (balances.length === 0) {
      throw new Error('Cannot create Merkle tree from empty balances');
    }

    const nextPowerOf2 = 2 ** Math.ceil(Math.log2(balances.length));
    const padding = nextPowerOf2 - balances.length;

    if (padding === 0) {
      return balances;
    }

    // Add dummy entries with 0 balance
    const dummyBalances: Balance[] = Array(padding)
      .fill(null)
      .map((_, idx) => ({
        userId: `dummy_${idx}`,
        balance: 0n,
      }));

    return [...balances, ...dummyBalances];
  }

  /**
   * Get Merkle root
   */
  getRoot(): string {
    return this.root;
  }

  /**
   * Get total sum of all balances (liabilities)
   */
  getTotalLiabilities(): bigint {
    return this.totalSum;
  }

  /**
   * Get salts for all leaves (needed for proof generation)
   */
  getSalts(): string[] {
    return this.leaves.map((leaf) => leaf.salt);
  }

  /**
   * Get balances for all leaves (needed for proof generation)
   */
  getBalances(): bigint[] {
    return this.leaves.map((leaf) => leaf.balance);
  }

  /**
   * Generate Merkle receipt for individual user verification
   *
   * This allows a user to verify their balance was included in the tree
   * without revealing other users' balances.
   */
  generateReceipt(userId: string): MerkleReceipt | null {
    const leaf = this.leaves.find((l) => l.userId === userId);
    if (!leaf) {
      return null;
    }

    // Calculate sibling path to root
    const siblings = this.calculateSiblingPath(leaf.index);

    return {
      userId: leaf.userId,
      balance: leaf.balance.toString(),
      salt: leaf.salt,
      siblings,
      root: this.root,
    };
  }

  /**
   * Calculate sibling hashes needed to verify a leaf
   */
  private calculateSiblingPath(leafIndex: number): string[] {
    const siblings: string[] = [];
    let currentIndex = leafIndex;

    // Traverse from leaf to root
    for (let level = 0; level < this.tree.length - 1; level++) {
      const isLeftChild = currentIndex % 2 === 0;
      const siblingIndex = isLeftChild ? currentIndex + 1 : currentIndex - 1;

      siblings.push(this.tree[level][siblingIndex]);

      // Move to parent index
      currentIndex = Math.floor(currentIndex / 2);
    }

    return siblings;
  }

  /**
   * Verify a Merkle receipt
   * Static method that can be used without constructing the tree
   */
  static verifyReceipt(receipt: MerkleReceipt): boolean {
    // Reconstruct leaf hash
    const userIdBuffer = Buffer.from(receipt.userId, 'utf8');
    const balanceBuffer = MerkleSumTree.bigIntToBytesStatic(
      BigInt(receipt.balance)
    );
    const saltBuffer = Buffer.from(receipt.salt, 'hex');
    const data = Buffer.concat([userIdBuffer, balanceBuffer, saltBuffer]);

    let currentHash = createHash('sha256').update(data).digest('hex');

    // Traverse up the tree using siblings
    for (const sibling of receipt.siblings) {
      // Determine if current hash is left or right child
      // (We always hash in sorted order for determinism)
      const left = currentHash < sibling ? currentHash : sibling;
      const right = currentHash < sibling ? sibling : currentHash;

      const leftBuffer = Buffer.from(left, 'hex');
      const rightBuffer = Buffer.from(right, 'hex');
      const combined = Buffer.concat([leftBuffer, rightBuffer]);

      currentHash = createHash('sha256').update(combined).digest('hex');
    }

    return currentHash === receipt.root;
  }

  private static bigIntToBytesStatic(value: bigint): Buffer {
    let hex = value.toString(16);
    if (value < 0n) {
      const positive = -value;
      const bits = positive.toString(2).length;
      const bytes = Math.ceil(bits / 8);
      const maxValue = 2n ** BigInt(bytes * 8);
      const twosComplement = maxValue + value;
      hex = twosComplement.toString(16);
    }
    hex = hex.padStart(32, '0');
    return Buffer.from(hex, 'hex');
  }

  /**
   * Get tree depth
   */
  getDepth(): number {
    return this.tree.length;
  }

  /**
   * Get number of leaves (including padding)
   */
  getLeafCount(): number {
    return this.leaves.length;
  }

  /**
   * Get tree statistics (useful for debugging)
   */
  getStats(): {
    leafCount: number;
    depth: number;
    root: string;
    totalLiabilities: string;
  } {
    return {
      leafCount: this.leaves.length,
      depth: this.tree.length,
      root: this.root,
      totalLiabilities: this.totalSum.toString(),
    };
  }
}
