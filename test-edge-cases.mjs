#!/usr/bin/env node

/**
 * Veraz Testnet Edge Case Testing Suite
 *
 * Tests critical error paths to demonstrate contract robustness:
 * 1. Stale proof (ledger_seq outside freshness window)
 * 2. Replay attempt (same ledger_seq twice)
 * 3. Invalid proof (tampered proof bytes)
 * 4. Insolvency detection (reserves < liabilities)
 * 5. Different holder distributions
 *
 * Usage: node test-edge-cases.mjs
 */

import * as StellarSdk from '@stellar/stellar-sdk';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const NETWORK = 'testnet';
const HORIZON_URL = 'https://horizon-testnet.stellar.org';
const SOROBAN_RPC_URL = 'https://soroban-testnet.stellar.org';

// Contract addresses (from deploy-config.json)
const SOLVENCY_CONTRACT = 'CC5XFT7XZXKJEONWOBALJTSKYGGCV3I7TEA54FKZWEHSOMQHDOF53SGG';
const VERIFIER_CONTRACT = 'CAU5ZPZSJSASGEDMKPBQHL26AFEMH3DQWWTG52Y77L5NWWSECBHJAFKA';

// Test results tracking
const results = {
  total: 0,
  passed: 0,
  failed: 0,
  tests: []
};

/**
 * Sleep helper
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Get current ledger sequence from network
 */
async function getCurrentLedgerSeq() {
  const server = new StellarSdk.Horizon.Server(HORIZON_URL);
  const ledgers = await server.ledgers().order('desc').limit(1).call();
  return ledgers.records[0].sequence;
}

/**
 * Generate a valid proof with specific parameters
 * (This would call your actual prover.js logic)
 */
async function generateProof(balances, ledgerSeq) {
  // TODO: Import and call actual prover.js
  // For now, return mock structure
  console.log(`  [Mock] Generating proof for balances: [${balances.join(', ')}], ledger: ${ledgerSeq}`);

  return {
    publicInputs: new Uint8Array(96), // Mock 96 bytes
    proof: new Uint8Array(2048)        // Mock proof
  };
}

/**
 * Submit attestation to contract
 */
async function submitAttestation(publicInputs, proof, secretKey) {
  const server = new StellarSdk.SorobanRpc.Server(SOROBAN_RPC_URL);
  const sourceKeypair = StellarSdk.Keypair.fromSecret(secretKey);

  const account = await server.getAccount(sourceKeypair.publicKey());

  const contract = new StellarSdk.Contract(SOLVENCY_CONTRACT);

  const tx = new StellarSdk.TransactionBuilder(account, {
    fee: '1000000',
    networkPassphrase: StellarSdk.Networks.TESTNET
  })
    .addOperation(
      contract.call(
        'attest',
        StellarSdk.nativeToScVal(publicInputs, { type: 'bytes' }),
        StellarSdk.nativeToScVal(proof, { type: 'bytes' })
      )
    )
    .setTimeout(300)
    .build();

  const prepared = await server.prepareTransaction(tx);
  prepared.sign(sourceKeypair);

  try {
    const response = await server.sendTransaction(prepared);
    console.log(`  Transaction submitted: ${response.hash}`);

    // Poll for result
    let status = 'PENDING';
    let attempts = 0;
    while (status === 'PENDING' && attempts < 20) {
      await sleep(2000);
      const txResponse = await server.getTransaction(response.hash);
      status = txResponse.status;
      attempts++;
    }

    if (status === 'SUCCESS') {
      console.log(`  ✅ Transaction successful`);
      return { success: true, hash: response.hash, status };
    } else {
      console.log(`  ❌ Transaction failed: ${status}`);
      return { success: false, hash: response.hash, status };
    }
  } catch (error) {
    console.log(`  ❌ Error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

/**
 * Test 1: Stale Proof (Outside Freshness Window)
 */
async function testStaleProof() {
  console.log('\n=== Test 1: Stale Proof ===');
  results.total++;

  const currentLedger = await getCurrentLedgerSeq();
  const staleLedger = currentLedger - 150; // 150 ledgers ago (> 100 window)

  console.log(`  Current ledger: ${currentLedger}`);
  console.log(`  Using stale ledger: ${staleLedger} (${currentLedger - staleLedger} ledgers old)`);

  const balances = [100, 100, 100, 100, 100, 100, 100, 100]; // Total: 800
  const { publicInputs, proof } = await generateProof(balances, staleLedger);

  // TODO: Get secret key from environment or config
  // const result = await submitAttestation(publicInputs, proof, SECRET_KEY);

  console.log(`  ⏸️  Skipped (requires wallet integration)`);
  results.tests.push({
    name: 'Stale Proof',
    status: 'skipped',
    reason: 'Requires wallet integration'
  });
}

/**
 * Test 2: Replay Attempt (Same ledger_seq twice)
 */
async function testReplayAttempt() {
  console.log('\n=== Test 2: Replay Attempt ===');
  results.total++;

  const currentLedger = await getCurrentLedgerSeq();
  const balances = [50, 50, 50, 50, 50, 50, 50, 50]; // Total: 400

  console.log(`  Step 1: Submit valid proof for ledger ${currentLedger}`);
  const { publicInputs, proof } = await generateProof(balances, currentLedger);

  // First submission (should succeed)
  console.log(`  Step 2: Attempt replay with same proof`);

  console.log(`  ⏸️  Skipped (requires wallet integration)`);
  results.tests.push({
    name: 'Replay Attempt',
    status: 'skipped',
    reason: 'Requires wallet integration'
  });
}

/**
 * Test 3: Invalid Proof (Tampered bytes)
 */
async function testInvalidProof() {
  console.log('\n=== Test 3: Invalid Proof ===');
  results.total++;

  const currentLedger = await getCurrentLedgerSeq();
  const balances = [100, 100, 100, 100, 100, 100, 100, 100];

  const { publicInputs, proof } = await generateProof(balances, currentLedger);

  // Tamper with proof (flip one byte)
  console.log(`  Tampering with proof byte 100...`);
  proof[100] = proof[100] ^ 0xFF;

  console.log(`  Expected: Error::InvalidProof from verifier`);

  console.log(`  ⏸️  Skipped (requires wallet integration)`);
  results.tests.push({
    name: 'Invalid Proof',
    status: 'skipped',
    reason: 'Requires wallet integration'
  });
}

/**
 * Test 4: Insolvency Detection
 */
async function testInsolvency() {
  console.log('\n=== Test 4: Insolvency Detection ===');
  results.total++;

  const currentLedger = await getCurrentLedgerSeq();

  // High liabilities
  const balances = [200, 200, 200, 200, 200, 200, 200, 200]; // Total: 1600

  console.log(`  Liabilities (from proof): 1600`);
  console.log(`  Reserves (SAC): ~100 (example)`);
  console.log(`  Expected: solvent = false, but tx succeeds`);

  const { publicInputs, proof } = await generateProof(balances, currentLedger);

  console.log(`  ⏸️  Skipped (requires wallet integration)`);
  results.tests.push({
    name: 'Insolvency Detection',
    status: 'skipped',
    reason: 'Requires wallet integration'
  });
}

/**
 * Test 5: Different Holder Distributions
 */
async function testHolderDistributions() {
  console.log('\n=== Test 5: Holder Distributions ===');
  results.total += 3;

  const currentLedger = await getCurrentLedgerSeq();

  // 5a: Uniform distribution
  console.log(`  5a: Uniform distribution [100, 100, 100, 100, 100, 100, 100, 100]`);
  const uniform = [100, 100, 100, 100, 100, 100, 100, 100];
  await generateProof(uniform, currentLedger);

  // 5b: Skewed (whale + retail)
  console.log(`  5b: Skewed distribution [500, 10, 10, 10, 10, 10, 10, 10]`);
  const skewed = [500, 10, 10, 10, 10, 10, 10, 10];
  await generateProof(skewed, currentLedger);

  // 5c: With zeros
  console.log(`  5c: With zeros [100, 0, 0, 50, 0, 30, 20, 0]`);
  const withZeros = [100, 0, 0, 50, 0, 30, 20, 0];
  await generateProof(withZeros, currentLedger);

  console.log(`  ⏸️  Skipped (requires wallet integration)`);
  results.tests.push(
    { name: 'Uniform Distribution', status: 'skipped', reason: 'Requires wallet integration' },
    { name: 'Skewed Distribution', status: 'skipped', reason: 'Requires wallet integration' },
    { name: 'Distribution with Zeros', status: 'skipped', reason: 'Requires wallet integration' }
  );
}

/**
 * Main test runner
 */
async function runTests() {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║     Veraz Testnet Edge Case Testing Suite               ║');
  console.log('╚══════════════════════════════════════════════════════════╝');

  console.log(`\nNetwork: ${NETWORK}`);
  console.log(`Solvency Contract: ${SOLVENCY_CONTRACT}`);
  console.log(`Verifier Contract: ${VERIFIER_CONTRACT}`);

  try {
    await testStaleProof();
    await testReplayAttempt();
    await testInvalidProof();
    await testInsolvency();
    await testHolderDistributions();
  } catch (error) {
    console.error('\n❌ Test suite error:', error);
  }

  // Print summary
  console.log('\n╔══════════════════════════════════════════════════════════╗');
  console.log('║                    Test Summary                          ║');
  console.log('╚══════════════════════════════════════════════════════════╝');
  console.log(`Total tests: ${results.total}`);
  console.log(`Passed: ${results.passed}`);
  console.log(`Failed: ${results.failed}`);
  console.log(`Skipped: ${results.tests.filter(t => t.status === 'skipped').length}`);

  console.log('\n📋 Test Details:');
  results.tests.forEach((test, i) => {
    const icon = test.status === 'passed' ? '✅' : test.status === 'failed' ? '❌' : '⏸️';
    console.log(`  ${icon} ${test.name}: ${test.status}`);
    if (test.reason) console.log(`     Reason: ${test.reason}`);
  });

  console.log('\n💡 Next Steps:');
  console.log('  1. Integrate with actual prover.js (import generateProof function)');
  console.log('  2. Add wallet integration (Freighter or secret key from env)');
  console.log('  3. Run tests and collect tx hashes');
  console.log('  4. Document results in POC_TESTNET_VALIDATION.md');

  // Save results to JSON
  const resultsPath = join(__dirname, 'test-results.json');
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  console.log(`\n📄 Results saved to: ${resultsPath}`);
}

// Run tests
runTests().catch(console.error);
