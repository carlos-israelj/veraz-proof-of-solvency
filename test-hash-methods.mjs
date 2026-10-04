import { StrKey } from '@stellar/stellar-sdk';
import crypto from 'crypto';

const BN254_MODULUS = 21888242871839275222246405745257275088548364400416034343698204186575808495617n;

const addr = 'GCY4CQHYSGI2MKE24R6ASMSX6EN6VQDYQZIC2NG3FSLJML6ELPFQAPKT';

console.log('Testing different hash methods...\n');

// Method 1: Hash address string (current frontend method)
console.log('=== Method 1: Hash address string ===');
const method1_data = Buffer.from(addr, 'utf8');
const method1_hash = crypto.createHash('sha256').update(method1_data).digest();
let method1_field = 0n;
for (const byte of method1_hash) {
  method1_field = (method1_field << 8n) | BigInt(byte);
}
method1_field = method1_field % BN254_MODULUS;
console.log('Field element:', method1_field.toString());
console.log('As hex:', '0x' + method1_field.toString(16));
console.log();

// Method 2: Hash Ed25519 public key bytes (32 bytes)
console.log('=== Method 2: Hash Ed25519 public key ===');
const publicKey = StrKey.decodeEd25519PublicKey(addr);
console.log('Public key hex:', Buffer.from(publicKey).toString('hex'));
const method2_hash = crypto.createHash('sha256').update(Buffer.from(publicKey)).digest();
let method2_field = 0n;
for (const byte of method2_hash) {
  method2_field = (method2_field << 8n) | BigInt(byte);
}
method2_field = method2_field % BN254_MODULUS;
console.log('Field element:', method2_field.toString());
console.log('As hex:', '0x' + method2_field.toString(16));
console.log();

// Method 3: What we saw in the contract output
console.log('=== Contract computed hash (from transaction) ===');
console.log('0x1e9bca67ba69955430dc4cf404bea0ca7b46d98d680c94e1f6c58dd75d6e5157');
console.log();

console.log('=== Frontend computed hash (from transaction) ===');
console.log('0x1462d6098cdc99ceb2a8cc34ebc487e7a2e9ca60a4092f30364f6b7beb7b6e1f');
