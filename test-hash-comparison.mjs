#!/usr/bin/env node

/**
 * Compare hash outputs between standalone and browser implementations
 */

import { BarretenbergSync, Fr } from "@aztec/bb.js";
import { createHash } from 'crypto';

const BN254_MODULUS = 21888242871839275222246405745257275088548364400416034343698204186575808495617n;

async function main() {
  console.log('🔬 Testing hash function compatibility\n');

  // Initialize Barretenberg
  const bb = await BarretenbergSync.initSingleton();
  console.log('✅ Barretenberg initialized\n');

  // Test 1: Pedersen hash (for Merkle tree)
  console.log('Test 1: Pedersen hash (leaf)');
  const balance = "100";
  const salt = "12345678901234567890";  // Fixed salt for reproducibility

  const frInputs = [balance, salt].map(x => new Fr(BigInt(x)));
  const pedersenResult = bb.pedersenHash(frInputs, 0);

  let pedersenBigInt = 0n;
  for (const byte of pedersenResult.value) {
    pedersenBigInt = (pedersenBigInt << 8n) | BigInt(byte);
  }

  console.log(`  balance: ${balance}`);
  console.log(`  salt: ${salt}`);
  console.log(`  pedersen_hash: ${pedersenBigInt.toString()}\n`);

  // Test 2: Poseidon2 hash (for reserve addresses)
  console.log('Test 2: Poseidon2 hash (reserve addresses)');
  const testAddress = "GCY4CQHYSGI2MKE24R6ASMSX6EN6VQDYQZIC2NG3FSLJML6ELPFQAPKT";

  // SHA-256 hash of address (matching browser)
  const addrHash = createHash('sha256').update(testAddress, 'utf8').digest();
  let addrValue = 0n;
  for (const byte of addrHash) {
    addrValue = (addrValue << 8n) | BigInt(byte);
  }
  addrValue = addrValue % BN254_MODULUS;

  console.log(`  address: ${testAddress}`);
  console.log(`  field_element: ${addrValue.toString()}`);

  // Pad to 5 elements (MAX_RESERVE_ACCOUNTS)
  const paddedFields = [addrValue.toString(), "0", "0", "0", "0"];
  const poseidon2Inputs = paddedFields.map(f => new Fr(BigInt(f)));
  const poseidon2Result = bb.poseidon2Hash(poseidon2Inputs);

  let poseidon2BigInt = 0n;
  for (const byte of poseidon2Result.value) {
    poseidon2BigInt = (poseidon2BigInt << 8n) | BigInt(byte);
  }

  console.log(`  poseidon2_hash: ${poseidon2BigInt.toString()}\n`);

  // Test 3: Check if Poseidon2 method exists
  console.log('Test 3: API availability');
  console.log(`  pedersenHash: ${typeof bb.pedersenHash === 'function' ? '✅' : '❌'}`);
  console.log(`  poseidon2Hash: ${typeof bb.poseidon2Hash === 'function' ? '✅' : '❌'}`);
  console.log('');

  console.log('✅ All hash tests completed successfully!');
}

main().catch(error => {
  console.error('❌ Error:', error.message);
  console.error(error.stack);
  process.exit(1);
});
