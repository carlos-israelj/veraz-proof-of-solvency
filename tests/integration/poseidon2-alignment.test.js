// Test script to verify Poseidon2 hash alignment across circuit, contract, and frontend
import { Noir } from "@noir-lang/noir_js";
import { UltraHonkBackend, BarretenbergSync, Fr } from "@aztec/bb.js";
import circuit from "./circuits/solvency/target/solvency.json" assert { type: "json" };
import { buildMerkleTree } from "./src/lib/merkle.js";
import { hashReserveAddresses } from "./src/lib/stellar.js";

console.log("🧪 Poseidon2 E2E Test - Circuit + Frontend Hash Verification\n");

// Test data
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
  // Reduce modulo BN254 field to ensure it's a valid field element
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

// Step 2: Compute reserve addresses hash with Poseidon2 (frontend implementation)
console.log("\n🔑 Step 2: Computing reserve addresses hash with Poseidon2...");
const { reserveAddressesHash, paddedAddresses } = await hashReserveAddresses(reserveAddresses);
console.log(`  ✓ Reserve Hash: ${reserveAddressesHash}`);
console.log(`  ✓ Padded Addresses (5 total): ${paddedAddresses.join(", ")}`);

// Step 3: Execute circuit with Poseidon2
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

// Step 4: Generate proof with UltraHonk
console.log("\n🔐 Step 4: Generating UltraHonk proof...");
const backend = new UltraHonkBackend(circuit.bytecode);
const startTime = Date.now();
const { proof, publicInputs: rawPI } = await backend.generateProof(witness);
const proofTime = ((Date.now() - startTime) / 1000).toFixed(2);
console.log(`  ✓ Proof generated in ${proofTime}s`);
console.log(`  ✓ Proof size: ${proof.length} bytes`);
console.log(`  ✓ Public inputs count: ${rawPI.length}`);

// Step 5: Verify public inputs structure
console.log("\n📊 Step 5: Verifying public inputs structure...");
console.log(`  Expected layout: [root(32), liabilities(32), ledger_seq(32), reserve_hash(32)] = 128 bytes`);

if (rawPI.length !== 4) {
  console.error(`  ❌ ERROR: Expected 4 public inputs, got ${rawPI.length}`);
  process.exit(1);
}

// Convert from hex (0x...) to decimal for comparison
function hexOrDecimalToDecimal(value) {
  const str = value.toString();
  if (str.startsWith('0x')) {
    return BigInt(str).toString();
  }
  return str;
}

const piRoot = hexOrDecimalToDecimal(rawPI[0]);
const piLiabilities = hexOrDecimalToDecimal(rawPI[1]);
const piLedgerSeq = hexOrDecimalToDecimal(rawPI[2]);
const piReserveHash = hexOrDecimalToDecimal(rawPI[3]);

console.log(`  Public Input 0 (root):          ${rawPI[0].toString()} → ${piRoot}`);
console.log(`  Public Input 1 (liabilities):   ${rawPI[1].toString()} → ${piLiabilities}`);
console.log(`  Public Input 2 (ledger_seq):    ${rawPI[2].toString()} → ${piLedgerSeq}`);
console.log(`  Public Input 3 (reserve_hash):  ${rawPI[3].toString()} → ${piReserveHash}`);

// Verify values match

let hasError = false;

if (piRoot !== root) {
  console.error(`  ❌ Root mismatch! Expected ${root}, got ${piRoot}`);
  hasError = true;
} else {
  console.log(`  ✓ Root matches`);
}

if (piLiabilities !== totalSum) {
  console.error(`  ❌ Liabilities mismatch! Expected ${totalSum}, got ${piLiabilities}`);
  hasError = true;
} else {
  console.log(`  ✓ Liabilities match`);
}

if (piLedgerSeq !== String(ledgerSeq)) {
  console.error(`  ❌ Ledger seq mismatch! Expected ${ledgerSeq}, got ${piLedgerSeq}`);
  hasError = true;
} else {
  console.log(`  ✓ Ledger seq matches`);
}

if (piReserveHash !== reserveAddressesHash) {
  console.error(`  ❌ Reserve hash mismatch! Expected ${reserveAddressesHash}, got ${piReserveHash}`);
  hasError = true;
} else {
  console.log(`  ✓ Reserve hash matches (POSEIDON2 ALIGNMENT VERIFIED!)`);
}

// Step 6: Format for Soroban contract
console.log("\n📦 Step 6: Formatting for Soroban contract (128 bytes)...");

function fieldToBytes32(fieldStr) {
  const bn = BigInt(fieldStr);
  const bytes = new Uint8Array(32);
  for (let i = 0; i < 32; i++) {
    bytes[31 - i] = Number((bn >> BigInt(i * 8)) & 0xFFn);
  }
  return bytes;
}

const rootBytes = fieldToBytes32(piRoot);
const liabilitiesBytes = fieldToBytes32(piLiabilities);
const ledgerSeqBytes = fieldToBytes32(piLedgerSeq);
const reserveHashBytes = fieldToBytes32(piReserveHash);

const publicInputsBytes = new Uint8Array(128);
publicInputsBytes.set(rootBytes, 0);
publicInputsBytes.set(liabilitiesBytes, 32);
publicInputsBytes.set(ledgerSeqBytes, 64);
publicInputsBytes.set(reserveHashBytes, 96);

console.log(`  ✓ Formatted 128 bytes: ${publicInputsBytes.length} bytes`);
console.log(`  ✓ Bytes [0-32]:   Root`);
console.log(`  ✓ Bytes [32-64]:  Liabilities`);
console.log(`  ✓ Bytes [64-96]:  Ledger Seq`);
console.log(`  ✓ Bytes [96-128]: Reserve Hash (Poseidon2)`);

// Step 7: Verify proof
console.log("\n✅ Step 7: Verifying proof...");
const isValid = await backend.verifyProof({ proof, publicInputs: rawPI });
console.log(`  ${isValid ? "✓" : "❌"} Proof verification: ${isValid ? "VALID" : "INVALID"}`);

if (hasError) {
  console.error("\n❌ TEST FAILED: Public inputs mismatch detected");
  process.exit(1);
}

if (!isValid) {
  console.error("\n❌ TEST FAILED: Proof verification failed");
  process.exit(1);
}

console.log("\n🎉 ALL TESTS PASSED!");
console.log("\n✅ Summary:");
console.log("  - Circuit executed with Poseidon2 hash");
console.log("  - Frontend computed same Poseidon2 hash");
console.log("  - Proof generated successfully");
console.log("  - Public inputs formatted correctly (128 bytes)");
console.log("  - Reserve addresses hash alignment VERIFIED");
console.log("\n🚀 Ready to test on-chain with contract CDQGARHIY3ISKQXPATDGTB2CKJ4HWO7QNTECN6VIEFVLE6UNNUD4WFLN");
