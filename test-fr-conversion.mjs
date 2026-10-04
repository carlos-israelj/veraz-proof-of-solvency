import { BarretenbergSync, Fr } from "@aztec/bb.js";

const BN254_MODULUS = 21888242871839275222246405745257275088548364400416034343698204186575808495617n;
const MAX_RESERVE_ACCOUNTS = 5;

const addr = 'GCY4CQHYSGI2MKE24R6ASMSX6EN6VQDYQZIC2NG3FSLJML6ELPFQAPKT';

console.log('=== Testing Fr Conversion Methods ===\n');

// Initialize Barretenberg
const api = await BarretenbergSync.initSingleton();

// Hash address string (current method)
const encoder = new TextEncoder();
const data = encoder.encode(addr);
const hashBuffer = await crypto.subtle.digest('SHA-256', data);
const hashArray = Array.from(new Uint8Array(hashBuffer));

let fieldValue = 0n;
for (const byte of hashArray) {
  fieldValue = (fieldValue << 8n) | BigInt(byte);
}
fieldValue = fieldValue % BN254_MODULUS;

// Pad to 5 addresses
const addrFields = [fieldValue.toString()];
while (addrFields.length < MAX_RESERVE_ACCOUNTS) {
  addrFields.push("0");
}

// Compute Poseidon2 hash
const frArray = addrFields.map(f => new Fr(BigInt(f)));
const hashResult = api.poseidon2Hash(frArray);

console.log('hashResult type:', hashResult.constructor.name);
console.log('hashResult.value:', hashResult.value);
console.log('hashResult.value type:', hashResult.value.constructor.name);
console.log();

// Method 1: Read hashResult.value as big-endian (current frontend method)
let method1 = 0n;
for (const byte of hashResult.value) {
  method1 = (method1 << 8n) | BigInt(byte);
}
console.log('Method 1 (big-endian from .value):');
console.log('  Decimal:', method1.toString());
console.log('  Hex:', '0x' + method1.toString(16).padStart(64, '0'));
console.log();

// Method 2: Use toBuffer() then read
const buffer = hashResult.toBuffer();
let method2 = 0n;
for (const byte of buffer) {
  method2 = (method2 << 8n) | BigInt(byte);
}
console.log('Method 2 (big-endian from toBuffer()):');
console.log('  Decimal:', method2.toString());
console.log('  Hex:', '0x' + method2.toString(16).padStart(64, '0'));
console.log();

// Method 3: Use toBigInt() if available
if (typeof hashResult.toBigInt === 'function') {
  const method3 = hashResult.toBigInt();
  console.log('Method 3 (toBigInt()):');
  console.log('  Decimal:', method3.toString());
  console.log('  Hex:', '0x' + method3.toString(16).padStart(64, '0'));
  console.log();
}

// Method 4: Read as little-endian
let method4 = 0n;
for (let i = hashResult.value.length - 1; i >= 0; i--) {
  method4 = (method4 << 8n) | BigInt(hashResult.value[i]);
}
console.log('Method 4 (little-endian from .value):');
console.log('  Decimal:', method4.toString());
console.log('  Hex:', '0x' + method4.toString(16).padStart(64, '0'));
console.log();

console.log('Expected from transaction:');
console.log('  Frontend: 0x1462d6098cdc99ceb2a8cc34ebc487e7a2e9ca60a4092f30364f6b7beb7b6e1f');
console.log('  Contract: 0x1e9bca67ba69955430dc4cf404bea0ca7b46d98d680c94e1f6c58dd75d6e5157');
