#!/usr/bin/env node
// Derive Stellar secret key from 12-word mnemonic phrase

import StellarSdk from '@stellar/stellar-sdk';
import bip39 from 'bip39';
import { derivePath } from 'ed25519-hd-key';

const mnemonic = "sword loop lazy hundred poverty picture decline episode outside yellow smoke memory";

console.log("🔑 Deriving Stellar keypair from mnemonic...\n");

// Validate mnemonic
if (!bip39.validateMnemonic(mnemonic)) {
  console.error("❌ Invalid mnemonic phrase");
  process.exit(1);
}

// Generate seed from mnemonic
const seed = bip39.mnemonicToSeedSync(mnemonic);

// Stellar uses derivation path: m/44'/148'/0'
const path = "m/44'/148'/0'";
const derived = derivePath(path, seed.toString('hex'));

// Create Stellar keypair from the derived key
const keypair = StellarSdk.Keypair.fromRawEd25519Seed(Buffer.from(derived.key));

console.log("✅ Keypair derived successfully!\n");
console.log("Public Key (Address):", keypair.publicKey());
console.log("Secret Key:           ", keypair.secret());
console.log("\n⚠️  Keep your secret key safe! Never share it publicly.");
