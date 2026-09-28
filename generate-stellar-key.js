// Generate Stellar keypair from mnemonic using bip39
import StellarSdk from '@stellar/stellar-sdk';
import * as bip39 from 'bip39';
import * as ed25519 from 'ed25519-hd-key';

const mnemonic = "sword loop lazy hundred poverty picture decline episode outside yellow smoke memory";

try {
  // Validate mnemonic
  if (!bip39.validateMnemonic(mnemonic)) {
    throw new Error("Invalid mnemonic");
  }

  // Generate seed from mnemonic
  const seed = bip39.mnemonicToSeedSync(mnemonic);

  // Derive key using Stellar's derivation path (m/44'/148'/0')
  const derived = ed25519.derivePath("m/44'/148'/0'", seed.toString('hex'));

  // Create keypair from derived key
  const keypair = StellarSdk.Keypair.fromRawEd25519Seed(Buffer.from(derived.key));

  console.log("Public Key:", keypair.publicKey());
  console.log("Secret Key:", keypair.secret());
} catch (error) {
  console.error("Error:", error.message);
}
