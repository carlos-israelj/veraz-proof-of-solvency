// Test script to verify public inputs ordering
import { Noir } from "@noir-lang/noir_js";
import { UltraHonkBackend } from "@aztec/bb.js";
import circuit from "./src/solvency.json" assert { type: "json" };
import { buildMerkleTree } from "./src/lib/merkle.js";

const balances = ["100000", "50000", "25000", "75000", "30000", "20000", "60000", "40000"];
const salts = ["1", "2", "3", "4", "5", "6", "7", "8"];
const ledgerSeq = 12345678;

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

console.log("\n📊 Raw Public Inputs from bb.js:");
console.log(`  Type: ${rawPI?.constructor?.name}`);
console.log(`  Length: ${rawPI?.length}`);

if (Array.isArray(rawPI)) {
  console.log("\n  Array values:");
  for (let i = 0; i < rawPI.length && i < 5; i++) {
    const val = rawPI[i];
    let display;
    if (typeof val === "string") {
      display = val;
    } else if (typeof val === "bigint") {
      display = val.toString();
    } else if (val && typeof val.toString === "function") {
      display = val.toString();
    } else {
      display = JSON.stringify(val);
    }
    console.log(`  [${i}]: ${display}`);
  }
}

console.log("\n✅ Done! Check if rawPI[0]=root, rawPI[1]=totalSum, rawPI[2]=ledgerSeq");
console.log(`Expected: root=${root}, totalSum=${totalSum}, ledgerSeq=${ledgerSeq}`);
