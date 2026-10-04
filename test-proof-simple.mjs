#!/usr/bin/env node

/**
 * Simplified proof generation test with explicit progress tracking
 */

import { promises as fs } from 'fs';

const PROGRESS_LOG = '/tmp/proof-progress.log';

async function log(msg) {
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] ${msg}\n`;

  // Write to both console and file
  process.stdout.write(line);
  await fs.appendFile(PROGRESS_LOG, line).catch(() => {});
}

async function main() {
  try {
    // Clear previous log
    await fs.writeFile(PROGRESS_LOG, '').catch(() => {});

    await log('START: Proof generation test');
    await log('Step 1: Importing prover module...');

    const { generateProof } = await import('./src/lib/prover-standalone.js');
    await log('Step 1: ✅ Module imported');

    await log('Step 2: Preparing inputs...');
    const inputs = {
      balances: [100, 100, 100, 100, 100, 100, 100, 100],
      ledgerSeq: 1234567,
      reserveAddresses: ['GCY4CQHYSGI2MKE24R6ASMSX6EN6VQDYQZIC2NG3FSLJML6ELPFQAPKT'],
      circuitPath: './src/solvency.json',
    };
    await log(`Step 2: ✅ Inputs: balances=${inputs.balances.join(',')}, ledger=${inputs.ledgerSeq}`);

    await log('Step 3: Calling generateProof() - this may take 10-60 seconds...');
    const startTime = Date.now();

    const result = await generateProof(inputs);

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    await log(`Step 3: ✅ Proof generated in ${elapsed}s`);

    await log(`Step 4: Validating result...`);
    await log(`  proof.length: ${result.proof.length} bytes`);
    await log(`  publicInputs.length: ${result.publicInputs.length} bytes`);

    if (result.proof.length === 0) {
      throw new Error('Proof is empty!');
    }

    if (result.publicInputs.length !== 128) {
      throw new Error(`Public inputs should be 128 bytes, got ${result.publicInputs.length}`);
    }

    await log('Step 4: ✅ Result validated');

    await log('SUCCESS: All tests passed!');
    await log(`Check ${PROGRESS_LOG} for details`);

    process.exit(0);

  } catch (error) {
    await log(`ERROR: ${error.message}`);
    await log(`Stack: ${error.stack}`);
    process.exit(1);
  }
}

main();
