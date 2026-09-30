/**
 * E2E Test: Poseidon2 Contract Verification
 *
 * Tests the complete flow with Poseidon2:
 * 1. Generate ZK proof with Poseidon2 reserve hash
 * 2. Format 128-byte public inputs
 * 3. Save to files for stellar CLI invocation
 */

import { Noir } from "@noir-lang/noir_js";
import { UltraHonkBackend, Fr } from "@aztec/bb.js";
import circuit from "../../circuits/solvency/target/solvency.json" assert { type: "json" };
import { buildMerkleTree } from "../../src/lib/merkle.js";
import { hashReserveAddresses } from "../../src/lib/stellar.js";
import { writeFileSync } from 'fs';

console.log("🧪 E2E Test: Poseidon2 Contract Verification\n");
console.log("═══════════════════════════════════════════════════\n");

// Test data (same as integration test for consistency)
const balances = ["100000", "50000", "25000", "75000", "30000", "20000", "60000", "40000"];

// BN254 field modulus
const BN254_MODULUS = 21888242871839275222246405745257275088548364400416034343698204186575808495617n;

// Generate cryptographically secure salts reduced modulo BN254 field
const salts = Array.from({ length: 8 }, () => {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  let bigInt = 0n;
  for (const byte of bytes) {
    bigInt = (bigInt << 8n) | BigInt(byte);
  }
  return (bigInt % BN254_MODULUS).toString();
});

const ledgerSeq = 12345678;
const reserveAddresses = ["GCY4CQHYSGI2MKE24R6ASMSX6EN6VQDYQZIC2NG3FSLJML6ELPFQAPKT"];

console.log("📝 Test Parameters:");
console.log(`  Balances: ${balances.join(", ")}`);
console.log(`  Ledger Seq: ${ledgerSeq}`);
console.log(`  Reserve Addresses: ${reserveAddresses.join(", ")}`);

// Step 1: Build Merkle tree
console.log("\n🌳 Step 1: Building Merkle tree...");
const { root, totalSum } = await buildMerkleTree(balances, salts);
console.log(`  ✓ Root: ${root}`);
console.log(`  ✓ Total Sum: ${totalSum}`);

// Step 2: Compute reserve addresses hash with Poseidon2
console.log("\n🔑 Step 2: Computing reserve addresses hash with Poseidon2...");
const { reserveAddressesHash, paddedAddresses } = await hashReserveAddresses(reserveAddresses);
console.log(`  ✓ Reserve Hash: ${reserveAddressesHash}`);

// Step 3: Execute circuit
console.log("\n⚙️  Step 3: Executing Noir circuit...");
const circuitInputs = {
  root,
  total_liabilities: totalSum,
  ledger_seq: String(ledgerSeq),
  reserve_addresses_hash: reserveAddressesHash,
  balances,
  salts,
  reserve_addresses: paddedAddresses,
  num_reserve_accounts: String(reserveAddresses.length),
};

const noir = new Noir(circuit);
const { witness } = await noir.execute(circuitInputs);
console.log(`  ✓ Circuit executed successfully`);

// Step 4: Generate proof
console.log("\n🔐 Step 4: Generating UltraHonk proof...");
const backend = new UltraHonkBackend(circuit.bytecode);
const startTime = Date.now();
const { proof, publicInputs: rawPI } = await backend.generateProof(witness);
const proofTime = ((Date.now() - startTime) / 1000).toFixed(2);
console.log(`  ✓ Proof generated in ${proofTime}s`);
console.log(`  ✓ Proof size: ${proof.length} bytes`);

// Step 5: Format public inputs for Soroban (128 bytes)
console.log("\n📦 Step 5: Formatting for Soroban contract...");

function toDecimalString(value) {
  if (value && typeof value === 'object' && typeof value.toBigInt === 'function') {
    return value.toBigInt().toString();
  }
  if (typeof value === 'bigint') {
    return value.toString();
  }
  const str = value.toString();
  if (str.startsWith('0x')) {
    return BigInt(str).toString();
  }
  return str;
}

function fieldToBytes32(fieldStr) {
  const bn = BigInt(fieldStr);
  const bytes = new Uint8Array(32);
  for (let i = 0; i < 32; i++) {
    bytes[31 - i] = Number((bn >> BigInt(i * 8)) & 0xFFn);
  }
  return bytes;
}

const piRoot = toDecimalString(rawPI[0]);
const piLiabilities = toDecimalString(rawPI[1]);
const piLedgerSeq = toDecimalString(rawPI[2]);
const piReserveHash = toDecimalString(rawPI[3]);

const rootBytes = fieldToBytes32(piRoot);
const liabilitiesBytes = fieldToBytes32(piLiabilities);
const ledgerSeqBytes = fieldToBytes32(piLedgerSeq);
const reserveHashBytes = fieldToBytes32(piReserveHash);

const publicInputsBytes = new Uint8Array(128);
publicInputsBytes.set(rootBytes, 0);
publicInputsBytes.set(liabilitiesBytes, 32);
publicInputsBytes.set(ledgerSeqBytes, 64);
publicInputsBytes.set(reserveHashBytes, 96);

console.log(`  ✓ Public inputs: 128 bytes`);
console.log(`  ✓ Root: ${piRoot}`);
console.log(`  ✓ Liabilities: ${piLiabilities}`);
console.log(`  ✓ Ledger Seq: ${piLedgerSeq}`);
console.log(`  ✓ Reserve Hash: ${piReserveHash}`);

// Step 6: Verify proof locally
console.log("\n✅ Step 6: Verifying proof locally...");
const isValid = await backend.verifyProof({ proof, publicInputs: rawPI });
console.log(`  ${isValid ? "✓" : "❌"} Proof verification: ${isValid ? "VALID" : "INVALID"}`);

if (!isValid) {
  console.error("\n❌ TEST FAILED: Proof verification failed");
  process.exit(1);
}

// Step 7: Save files for stellar CLI
console.log("\n💾 Step 7: Saving files for stellar CLI...");

// Convert proof to hex string
const proofHex = Array.from(proof).map(b => b.toString(16).padStart(2, '0')).join('');
const publicInputsHex = Array.from(publicInputsBytes).map(b => b.toString(16).padStart(2, '0')).join('');

writeFileSync('/tmp/proof.hex', proofHex);
writeFileSync('/tmp/public_inputs.hex', publicInputsHex);
writeFileSync('/tmp/test_data.json', JSON.stringify({
  proof: proofHex,
  publicInputs: publicInputsHex,
  contract: "CDQGARHIY3ISKQXPATDGTB2CKJ4HWO7QNTECN6VIEFVLE6UNNUD4WFLN",
  root: piRoot,
  liabilities: piLiabilities,
  ledgerSeq: piLedgerSeq,
  reserveHash: piReserveHash,
}, null, 2));

console.log(`  ✓ Saved proof to /tmp/proof.hex (${proofHex.length / 2} bytes)`);
console.log(`  ✓ Saved public inputs to /tmp/public_inputs.hex (${publicInputsHex.length / 2} bytes)`);
console.log(`  ✓ Saved test data to /tmp/test_data.json`);

console.log("\n🎉 E2E PREPARATION COMPLETE!");
console.log("\n📋 Next steps:");
console.log("   1. Check current ledger: stellar contract invoke --id CDQGARHIY3ISKQXPATDGTB2CKJ4HWO7QNTECN6VIEFVLE6UNNUD4WFLN --network testnet -- is_solvent");
console.log("   2. Call attest with generated proof");
console.log(`   3. Contract: CDQGARHIY3ISKQXPATDGTB2CKJ4HWO7QNTECN6VIEFVLE6UNNUD4WFLN`);
console.log("\nTest data saved to /tmp/test_data.json");
