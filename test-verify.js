// Test script to generate AND VERIFY a proof locally
import { Noir } from "@noir-lang/noir_js";
import { UltraHonkBackend } from "@aztec/bb.js";
import circuit from "./src/solvency.json" assert { type: "json" };
import { buildMerkleTree } from "./src/lib/merkle.js";
import { writeFileSync } from "fs";

const balances = ["100000", "50000", "25000", "75000", "30000", "20000", "60000", "40000"];
const salts = ["1", "2", "3", "4", "5", "6", "7", "8"];
const ledgerSeq = 3279663; // Use the same ledger_seq from the logs

console.log("🌳 Building Merkle tree...");
const { root, totalSum } = await buildMerkleTree(balances, salts);

console.log(`  root: ${root}`);
console.log(`  totalSum: ${totalSum}`);
console.log(`  ledgerSeq: ${ledgerSeq}`);

const circuitInputs = {
  root,
  total_liabilities: totalSum,
  ledger_seq: String(ledgerSeq),
  balances,
  salts,
};

console.log("\n⚙️  Executing circuit...");
const noir = new Noir(circuit);
const { witness } = await noir.execute(circuitInputs);

console.log("\n🔐 Generating proof...");
const backend = new UltraHonkBackend(circuit.bytecode);
const { proof, publicInputs: rawPI } = await backend.generateProof(witness);

console.log(`\n✅ Proof generated: ${proof.length} bytes`);

// Save proof and public inputs for CLI verification
writeFileSync("/tmp/proof.hex", Buffer.from(proof).toString("hex"));
console.log("📝 Proof saved to /tmp/proof.hex");

// Format public inputs (same logic as prover.js)
const publicInputs = new Uint8Array(96);
if (Array.isArray(rawPI) && rawPI.length >= 3) {
  for (let i = 0; i < 3; i++) {
    const val = rawPI[i];
    const hex = (typeof val === "string" && val.startsWith("0x"))
      ? val.slice(2).padStart(64, "0")
      : BigInt(val.toString()).toString(16).padStart(64, "0");
    for (let j = 0; j < 32; j++) {
      publicInputs[i * 32 + j] = parseInt(hex.slice(j * 2, j * 2 + 2), 16);
    }
  }
}

writeFileSync("/tmp/public_inputs.hex", Buffer.from(publicInputs).toString("hex"));
console.log("📝 Public inputs saved to /tmp/public_inputs.hex");

console.log("\n🔍 Verifying proof locally with bb.js...");
const verifyResult = await backend.verifyProof({ proof, publicInputs: rawPI });
console.log(`Verification result: ${verifyResult ? "✅ VALID" : "❌ INVALID"}`);

if (!verifyResult) {
  console.error("\n⚠️  The proof is INVALID! This means there's a bug in the proof generation.");
} else {
  console.log("\n✅ The proof is VALID locally!");
  console.log("   This means the on-chain verifier should accept it.");
  console.log("   If it doesn't, there's a problem with the on-chain verifier contract.");
}
