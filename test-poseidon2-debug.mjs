#!/usr/bin/env node
import { BarretenbergSync, Fr } from "@aztec/bb.js";

const bb = await BarretenbergSync.initSingleton();

const testField = "14116183078571040080738133686589492183576826224368072266633308598469135898125";
const paddedFields = [testField, "0", "0", "0", "0"];

console.log("Input fields:");
paddedFields.forEach((f, i) => console.log(`  [${i}]: ${f}`));

const frArray = paddedFields.map(f => new Fr(BigInt(f)));
console.log("\nFr array created");

const hashResult = bb.poseidon2Hash(frArray);
console.log("\nHashResult type:", hashResult.constructor.name);
console.log("HashResult.value type:", hashResult.value.constructor.name);
console.log("HashResult.value length:", hashResult.value.length);
console.log("HashResult.value bytes:", Array.from(hashResult.value).map(b => b.toString(16).padStart(2, '0')).join(' '));

// Method 1: Big-endian (our current method)
let hashBE = 0n;
for (const byte of hashResult.value) {
  hashBE = (hashBE << 8n) | BigInt(byte);
}
console.log("\nMethod 1 (big-endian):", hashBE.toString());

// Method 2: Using Fr.toString()
console.log("Method 2 (Fr.toString):", hashResult.toString());

// Method 3: Using Fr.toBigInt() if available
if (typeof hashResult.toBigInt === 'function') {
  console.log("Method 3 (Fr.toBigInt):", hashResult.toBigInt().toString());
}
