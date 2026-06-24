// Merkle Sum Tree builder - mirrors circuit logic
// Uses Pedersen hash to match circuits/solvency/src/main.nr

import { BarretenbergSync, Fr } from "@aztec/bb.js";

let bb = null;

async function initBarretenberg() {
  if (!bb) {
    bb = await BarretenbergSync.initSingleton();
  }
  return bb;
}

/**
 * Pedersen hash matching std::hash::pedersen_hash in Noir
 * @param {string[]} inputs - Array of field elements as strings
 * @returns {string} - Hash as field element string
 */
function pedersenHash(inputs) {
  // Convert string inputs to Fr field elements
  const frInputs = inputs.map(x => new Fr(BigInt(x)));

  // Use barretenberg's Pedersen hash
  // hashIndex 0 is the standard Pedersen hash used by Noir
  const hashResult = bb.pedersenHash(frInputs, 0);

  // Convert Fr result to string
  return hashResult.toString();
}

/**
 * Hash a leaf node: hash_leaf(balance, salt)
 */
function hashLeaf(balance, salt) {
  return pedersenHash([balance.toString(), salt.toString()]);
}

/**
 * Hash an internal node: hash_node(lh, ls, rh, rs)
 */
function hashNode(leftHash, leftSum, rightHash, rightSum) {
  return pedersenHash([
    leftHash.toString(),
    leftSum.toString(),
    rightHash.toString(),
    rightSum.toString(),
  ]);
}

/**
 * Build merkle sum tree and return root hash
 * Mirrors circuit logic in circuits/solvency/src/main.nr
 *
 * @param {string[]} balances - Array of 8 balance values as strings
 * @param {string[]} salts - Array of 8 salt values as strings
 * @returns {Promise<{root: string, totalSum: string}>}
 */
export async function buildMerkleTree(balances, salts) {
  await initBarretenberg();

  const N = 8; // Must match circuit N
  const TREE_SIZE = 2 * N - 1; // 15 nodes total

  if (balances.length !== N || salts.length !== N) {
    throw new Error(`Expected ${N} balances and ${N} salts`);
  }

  const nodeHash = new Array(TREE_SIZE).fill("0");
  const nodeSum = new Array(TREE_SIZE).fill("0");

  // Leaves: indices [N-1 .. 2N-2] = [7 .. 14]
  for (let i = 0; i < N; i++) {
    const idx = N - 1 + i; // 7, 8, 9, ..., 14
    nodeHash[idx] = hashLeaf(balances[i], salts[i]);
    nodeSum[idx] = balances[i].toString();
  }

  // Internal nodes, bottom-up: indices [0 .. N-2] = [0 .. 6]
  // Process in reverse order: i = (N-2) down to 0
  for (let k = 0; k < N - 1; k++) {
    const i = (N - 2) - k; // 6, 5, 4, 3, 2, 1, 0
    const leftIdx = 2 * i + 1;
    const rightIdx = 2 * i + 2;

    // Sum
    nodeSum[i] = (BigInt(nodeSum[leftIdx]) + BigInt(nodeSum[rightIdx])).toString();

    // Hash
    nodeHash[i] = hashNode(
      nodeHash[leftIdx],
      nodeSum[leftIdx],
      nodeHash[rightIdx],
      nodeSum[rightIdx]
    );
  }

  return {
    root: nodeHash[0],
    totalSum: nodeSum[0],
  };
}
