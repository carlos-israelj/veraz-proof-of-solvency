import { BarretenbergSync, Fr } from "@aztec/bb.js";

const BN254_MODULUS = 21888242871839275222246405745257275088548364400416034343698204186575808495617n;
const MAX_RESERVE_ACCOUNTS = 5;

const addr = 'GCY4CQHYSGI2MKE24R6ASMSX6EN6VQDYQZIC2NG3FSLJML6ELPFQAPKT';

console.log('=== Testing Frontend Hash Calculation ===\n');

// Initialize Barretenberg
const api = await BarretenbergSync.initSingleton();

// Method from current frontend: hash address string
const encoder = new TextEncoder();
const data = encoder.encode(addr);
const hashBuffer = await crypto.subtle.digest('SHA-256', data);
const hashArray = Array.from(new Uint8Array(hashBuffer));

let fieldValue = 0n;
for (const byte of hashArray) {
  fieldValue = (fieldValue << 8n) | BigInt(byte);
}
fieldValue = fieldValue % BN254_MODULUS;

console.log('Address:', addr);
console.log('Individual field element:', fieldValue.toString());
console.log('As hex:', '0x' + fieldValue.toString(16));
console.log();

// Pad to 5 addresses (all zeros except first)
const addrFields = [fieldValue.toString()];
while (addrFields.length < MAX_RESERVE_ACCOUNTS) {
  addrFields.push("0");
}

console.log('Padded array:', addrFields);
console.log();

// Compute Poseidon2 hash
const frArray = addrFields.map(f => new Fr(BigInt(f)));
const hashResult = api.poseidon2Hash(frArray);

// Convert Fr to hex
const hashBytes = hashResult.toBuffer();
const hashHex = '0x' + Buffer.from(hashBytes).toString('hex');

console.log('Poseidon2 hash result:', hashHex);
console.log();

console.log('Expected from transaction events:');
console.log('  Frontend: 0x1462d6098cdc99ceb2a8cc34ebc487e7a2e9ca60a4092f30364f6b7beb7b6e1f');
console.log('  Contract: 0x1e9bca67ba69955430dc4cf404bea0ca7b46d98d680c94e1f6c58dd75d6e5157');
