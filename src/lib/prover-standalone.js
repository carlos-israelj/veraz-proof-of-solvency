/**
 * Standalone Proof Generator for Veraz (Node.js compatible)
 *
 * This is a self-contained prover that doesn't depend on React or browser APIs.
 * Can be used in Node.js CLI tools, backend services, or standalone SDKs.
 *
 * Key differences from prover.js:
 * - No browser-only imports
 * - Crypto randomness from Node.js crypto module (not window.crypto)
 * - All dependencies explicitly managed
 * - Can be bundled or used directly in Node
 */

import { Noir } from "@noir-lang/noir_js";
import { UltraHonkBackend } from "@aztec/bb.js";
import { BarretenbergSync, Fr } from "@aztec/bb.js";
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createHash, randomBytes } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Constants (must match circuit)
const N = 8; // number of holders
const TREE_SIZE = 2 * N - 1; // 15 nodes
const MAX_RESERVE_ACCOUNTS = 5;

// BN254 field modulus
const BN254_MODULUS = 21888242871839275222246405745257275088548364400416034343698204186575808495617n;

// Singleton for Barretenberg WASM
let bbSingleton = null;

/**
 * Initialize Barretenberg WASM (singleton)
 */
async function getBB() {
  if (bbSingleton) return bbSingleton;

  try {
    if (typeof BarretenbergSync.initSingleton === "function") {
      bbSingleton = await BarretenbergSync.initSingleton();
    } else if (typeof BarretenbergSync.new === "function") {
      bbSingleton = await BarretenbergSync.new();
    } else {
      throw new Error("No initialization method found in BarretenbergSync");
    }
  } catch (err) {
    throw new Error(`Error initializing Barretenberg WASM: ${err.message}`);
  }

  if (typeof bbSingleton.pedersenHash !== "function") {
    throw new Error(
      "pedersenHash not available in this version of @aztec/bb.js. " +
      "Ensure you have version ^4.3.1 installed."
    );
  }

  return bbSingleton;
}

/**
 * Pedersen hash function (matches Noir std::hash::pedersen_hash)
 */
function pedersenHash(bb, inputs) {
  const frInputs = inputs.map(x => {
    try {
      const val =
        typeof x === "bigint"
          ? x
          : typeof x === "string" && x.startsWith("0x")
          ? BigInt(x)
          : BigInt(x);
      return new Fr(val);
    } catch (err) {
      throw new Error(`Failed to convert "${x}" to Fr: ${err.message}`);
    }
  });

  const result = bb.pedersenHash(frInputs, 0);
  const raw = result.toString();
  return raw.startsWith("0x") ? BigInt(raw).toString() : raw;
}

/**
 * Hash a single leaf node
 */
function hashLeaf(bb, balance, salt) {
  return pedersenHash(bb, [balance.toString(), salt.toString()]);
}

/**
 * Hash an internal node
 */
function hashNode(bb, lh, ls, rh, rs) {
  return pedersenHash(bb, [lh, ls, rh, rs]);
}

/**
 * Build Merkle sum-tree (matches circuit algorithm exactly)
 *
 * @param {string[]} balances - Exactly N balance values (decimal strings)
 * @param {string[]} salts - Exactly N salt values (decimal strings)
 * @returns {Promise<{ root: string, totalSum: string }>}
 */
async function buildMerkleTree(balances, salts) {
  if (balances.length !== N || salts.length !== N) {
    throw new Error(
      `buildMerkleTree requires exactly ${N} balances and ${N} salts. ` +
      `Received: ${balances.length} balances, ${salts.length} salts.`
    );
  }

  const bb = await getBB();

  const nodeHash = new Array(TREE_SIZE).fill("0");
  const nodeSum = new Array(TREE_SIZE).fill("0");

  // Leaves: indices [N-1 .. 2N-2]
  for (let i = 0; i < N; i++) {
    const idx = N - 1 + i; // 7,8,...,14
    nodeHash[idx] = hashLeaf(bb, balances[i], salts[i]);
    nodeSum[idx] = balances[i].toString();
  }

  // Internal nodes: bottom-up [N-2 .. 0] = [6 .. 0]
  for (let k = 0; k < N - 1; k++) {
    const i = (N - 2) - k; // 6,5,4,3,2,1,0
    const l = 2 * i + 1;
    const r = 2 * i + 2;

    nodeSum[i] = (BigInt(nodeSum[l]) + BigInt(nodeSum[r])).toString();
    nodeHash[i] = hashNode(
      bb,
      nodeHash[l], nodeSum[l],
      nodeHash[r], nodeSum[r]
    );
  }

  return { root: nodeHash[0], totalSum: nodeSum[0] };
}

/**
 * Hash reserve addresses (matches circuit implementation)
 * CRITICAL: Uses Poseidon2 hash (CAP-75 standard), NOT Pedersen
 * Circuit uses: Poseidon2::hash(reserve_addresses, MAX_RESERVE_ACCOUNTS)
 *
 * @param {string[]} addresses - Array of Stellar addresses
 * @returns {Promise<{reserveAddressesHash: string, paddedAddresses: string[]}>}
 */
async function hashReserveAddresses(addresses) {
  if (!addresses || addresses.length === 0) {
    throw new Error("At least one reserve address is required");
  }

  if (addresses.length > MAX_RESERVE_ACCOUNTS) {
    throw new Error(`Maximum ${MAX_RESERVE_ACCOUNTS} reserve addresses allowed`);
  }

  const bb = await getBB();

  // Convert Stellar addresses to field elements via SHA-256 (deterministic, matches browser version)
  const addressFields = [];
  for (const addr of addresses) {
    // SHA-256 hash of address string
    const hash = createHash('sha256').update(addr, 'utf8').digest();

    // Convert hash bytes to BigInt (big-endian)
    let value = 0n;
    for (const byte of hash) {
      value = (value << 8n) | BigInt(byte);
    }

    // Ensure it fits in BN254 field
    value = value % BN254_MODULUS;
    addressFields.push(value.toString());
  }

  // Pad to MAX_RESERVE_ACCOUNTS
  const paddedAddresses = [...addressFields];
  while (paddedAddresses.length < MAX_RESERVE_ACCOUNTS) {
    paddedAddresses.push("0");
  }

  // CRITICAL: Use Poseidon2 hash (not Pedersen!)
  // This must match circuit: Poseidon2::hash(reserve_addresses, MAX_RESERVE_ACCOUNTS)
  // IMPORTANT: Must hash the PADDED array, not the original addressFields!
  const frArray = paddedAddresses.map(f => new Fr(BigInt(f)));
  const hashResult = bb.poseidon2Hash(frArray);

  // Convert Fr result to decimal string
  let hashBigInt = 0n;
  for (const byte of hashResult.value) {
    hashBigInt = (hashBigInt << 8n) | BigInt(byte);
  }
  const reserveAddressesHash = hashBigInt.toString();

  return {
    reserveAddressesHash,
    paddedAddresses
  };
}

/**
 * Generate cryptographically secure random salt (256-bit reduced to BN254 field)
 * Uses Node.js crypto module instead of window.crypto
 * IMPORTANT: Must apply modulo to fit in BN254 field
 */
function generateRandomSalt() {
  const bytes = randomBytes(32); // 256 bits

  let saltBigInt = 0n;
  for (let i = 0; i < bytes.length; i++) {
    saltBigInt = (saltBigInt << 8n) | BigInt(bytes[i]);
  }

  // Apply modulo to ensure value fits in BN254 field
  saltBigInt = saltBigInt % BN254_MODULUS;

  return saltBigInt.toString();
}

/**
 * Convert field element to 64-char hex string
 */
function fieldToHex64(field) {
  let value;
  if (typeof field === "string") {
    value = field.startsWith("0x") ? BigInt(field) : BigInt(field);
  } else if (typeof field === "bigint") {
    value = field;
  } else if (field && typeof field.toBigInt === "function") {
    value = field.toBigInt();
  } else if (field && typeof field.toString === "function") {
    const s = field.toString();
    value = s.startsWith("0x") ? BigInt(s) : BigInt(s);
  } else {
    value = 0n;
  }
  return value.toString(16).padStart(64, "0");
}

/**
 * Format public inputs to Soroban contract format (128 bytes)
 *
 * Layout:
 *   [0..32]   root (field element BE)
 *   [32..64]  L (i128 BE with 16 bytes padding)
 *   [64..96]  ledger_seq (u32 BE with 28 bytes padding)
 *   [96..128] reserve_addresses_hash (field element BE)
 */
function formatPublicInputsForSoroban(rawPI, root, totalSum, ledgerSeq, reserveAddressesHash) {
  // Try using bb.js output directly
  if (rawPI instanceof Uint8Array && rawPI.length >= 128) {
    console.log("✅ public_inputs: using 128 bytes from bb.js directly");
    return rawPI.slice(0, 128);
  }

  // bb.js v4 may return array of hex strings or Fr
  if (Array.isArray(rawPI) && rawPI.length >= 4) {
    console.log("ℹ️  public_inputs: converting field array to 128 bytes");
    const out = new Uint8Array(128);
    rawPI.slice(0, 4).forEach((field, i) => {
      const hex = fieldToHex64(field);
      for (let j = 0; j < 32; j++) {
        out[i * 32 + j] = parseInt(hex.slice(j * 2, j * 2 + 2), 16);
      }
    });
    return out;
  }

  // Fallback: build manually
  console.warn("⚠️  public_inputs: building manually from root/L/seq/reserve_hash");
  return buildPublicInputsManually(root, totalSum, ledgerSeq, reserveAddressesHash);
}

/**
 * Manual construction of 128-byte public inputs
 */
function buildPublicInputsManually(root, totalSum, ledgerSeq, reserveAddressesHash) {
  const out = new Uint8Array(128);

  // root (32 bytes)
  const rootHex = fieldToHex64(root);
  for (let i = 0; i < 32; i++) {
    out[i] = parseInt(rootHex.slice(i * 2, i * 2 + 2), 16);
  }

  // L (i128 big-endian in bytes[48..64])
  const L = BigInt(totalSum);
  for (let i = 0; i < 16; i++) {
    out[48 + i] = Number((L >> BigInt((15 - i) * 8)) & 0xffn);
  }

  // ledger_seq (u32 big-endian in bytes[92..96])
  const seq = Number(ledgerSeq);
  out[92] = (seq >>> 24) & 0xff;
  out[93] = (seq >>> 16) & 0xff;
  out[94] = (seq >>> 8) & 0xff;
  out[95] = seq & 0xff;

  // reserve_addresses_hash (32 bytes, bytes[96..128])
  const reserveHashHex = fieldToHex64(reserveAddressesHash);
  for (let i = 0; i < 32; i++) {
    out[96 + i] = parseInt(reserveHashHex.slice(i * 2, i * 2 + 2), 16);
  }

  return out;
}

/**
 * Log public inputs for debugging
 */
function logPublicInputs(pi) {
  const rootHex = Array.from(pi.slice(0, 32)).map(b => b.toString(16).padStart(2, "0")).join("");
  const LBytes = pi.slice(48, 64);
  const seqBytes = pi.slice(92, 96);
  const reserveHashHex = Array.from(pi.slice(96, 128)).map(b => b.toString(16).padStart(2, "0")).join("");

  let L = 0n;
  for (const b of LBytes) L = (L << 8n) | BigInt(b);
  const seq = (seqBytes[0] << 24) | (seqBytes[1] << 16) | (seqBytes[2] << 8) | seqBytes[3];

  console.log("📦 Public inputs formatted (128 bytes):");
  console.log(`  root (bytes 0-31):         0x${rootHex.slice(0, 16)}…`);
  console.log(`  L    (bytes 48-63):        ${L}`);
  console.log(`  seq  (bytes 92-95):        ${seq}`);
  console.log(`  reserve_hash (bytes 96-127): 0x${reserveHashHex.slice(0, 16)}…`);
}

/**
 * Main proof generation function (standalone)
 *
 * @param {object} params
 * @param {number[]} params.balances - Array of 8 balance values
 * @param {number} params.ledgerSeq - Current Stellar ledger sequence
 * @param {string[]} params.reserveAddresses - Array of reserve account addresses
 * @param {string} params.circuitPath - Path to circuit JSON file (optional)
 * @returns {Promise<{ proof: Uint8Array, publicInputs: Uint8Array }>}
 */
export async function generateProof({ balances, ledgerSeq, reserveAddresses, circuitPath }) {
  if (!balances || balances.length !== N) {
    throw new Error(`Must provide exactly ${N} balances. Received: ${balances?.length}`);
  }

  if (!reserveAddresses || reserveAddresses.length === 0) {
    throw new Error("At least one reserve address is required");
  }

  // Convert balances to strings
  const balanceStrings = balances.map(b => String(b));

  // Generate random salts
  console.log("🎲 Generating random salts...");
  const salts = Array.from({ length: N }, () => generateRandomSalt());

  // Calculate reserve addresses hash
  console.log("🔑 Calculating reserve addresses hash...");
  const { reserveAddressesHash, paddedAddresses } = await hashReserveAddresses(reserveAddresses);
  console.log("  reserve_addresses_hash:", reserveAddressesHash);
  console.log("  num_reserve_accounts:", reserveAddresses.length);

  // Build Merkle tree
  console.log("🌳 Building Merkle sum-tree...");
  const { root, totalSum } = await buildMerkleTree(balanceStrings, salts);
  console.log("  root:", root);
  console.log("  totalSum:", totalSum);

  // Load circuit
  const circuitFile = circuitPath || join(__dirname, '../solvency.json');
  console.log(`📂 Loading circuit from: ${circuitFile}`);
  const circuitData = await fs.readFile(circuitFile, 'utf8');
  const circuit = JSON.parse(circuitData);

  // Prepare circuit inputs
  const circuitInputs = {
    root,
    total_liabilities: totalSum,
    ledger_seq: String(ledgerSeq),
    reserve_addresses_hash: reserveAddressesHash,
    balances: balanceStrings,
    salts,
    reserve_addresses: paddedAddresses,
    num_reserve_accounts: String(reserveAddresses.length),
  };

  // Execute circuit
  console.log("⚙️  Executing Noir circuit...");
  const noir = new Noir(circuit);
  let witness;
  try {
    ({ witness } = await noir.execute(circuitInputs));
  } catch (err) {
    throw new Error(
      `Circuit rejected inputs (incorrect root, total, or reserve hash): ${err.message}`
    );
  }

  // Generate UltraHonk proof
  console.log("🔐 Generating UltraHonk proof with Keccak (10-30s)...");
  const backend = new UltraHonkBackend(circuit.bytecode);
  const { proof, publicInputs: rawPI } = await backend.generateProof(witness, { keccak: true });

  console.log("  proof.length:", proof.length);
  console.log("  publicInputs raw type:", rawPI?.constructor?.name, "length:", rawPI?.length);

  // Format public inputs
  const publicInputs = formatPublicInputsForSoroban(rawPI, root, totalSum, ledgerSeq, reserveAddressesHash);

  // Validate
  if (publicInputs.length !== 128) {
    throw new Error(
      `Public inputs have ${publicInputs.length} bytes, expected 128.`
    );
  }

  logPublicInputs(publicInputs);

  return {
    proof: new Uint8Array(proof),
    publicInputs,
  };
}

// Export utility functions for testing
export {
  generateRandomSalt,
  buildMerkleTree,
  hashReserveAddresses,
};
