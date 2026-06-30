/**
 * SDK Integration Test - FIXED VERSION
 *
 * Tests proof generation using the CORRECT bb.js and noir_js APIs
 * (The SDK's ProofGenerator.ts has incorrect API usage)
 */

import { Noir } from '@noir-lang/noir_js';
import { UltraHonkBackend } from '@aztec/bb.js';
import type { CompiledCircuit } from '@noir-lang/types';
import * as fs from 'fs/promises';
import * as path from 'path';

async function testProofGeneration() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🧪 PROOF GENERATION TEST (Using correct APIs)');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  try {
    // Step 1: Load the compiled circuit
    console.log('📦 Step 1: Loading compiled circuit...');
    const circuitPath = path.join(__dirname, '../../circuits/solvency/target/solvency.json');

    const circuitJson = await fs.readFile(circuitPath, 'utf-8');
    const circuit: CompiledCircuit = JSON.parse(circuitJson);

    console.log(`   ✅ Circuit loaded\n`);

    // Step 2: Initialize Noir (for witness generation)
    console.log('🔧 Step 2: Initializing Noir witness generator...');
    const noir = new Noir(circuit);
    await noir.init();
    console.log('   ✅ Noir initialized\n');

    // Step 3: Initialize UltraHonk backend (for proof generation)
    console.log('🔧 Step 3: Initializing UltraHonk backend...');
    const backend = new UltraHonkBackend(circuit.bytecode);
    console.log('   ✅ UltraHonk backend initialized\n');

    // Step 4: Prepare test inputs (same data that worked with BB CLI)
    console.log('📊 Step 4: Preparing test inputs...');

    const inputs = {
      root: '0x0fa83f8ac7ec78d7338a9f6777307cb4aa21ce6a94ffecfc3378453ac3e08523',
      total_liabilities: '400000',
      ledger_seq: '58204113',
      balances: ['100000', '50000', '25000', '75000', '30000', '20000', '60000', '40000'],
      salts: [
        '0000000000000000000000000000000000000000000000000000000000000001',
        '0000000000000000000000000000000000000000000000000000000000000002',
        '0000000000000000000000000000000000000000000000000000000000000003',
        '0000000000000000000000000000000000000000000000000000000000000004',
        '0000000000000000000000000000000000000000000000000000000000000005',
        '0000000000000000000000000000000000000000000000000000000000000006',
        '0000000000000000000000000000000000000000000000000000000000000007',
        '0000000000000000000000000000000000000000000000000000000000000008',
      ],
    };

    console.log(`   • Root: ${inputs.root.substring(0, 16)}...`);
    console.log(`   • Total Liabilities: ${inputs.total_liabilities}`);
    console.log(`   • Ledger Seq: ${inputs.ledger_seq}\n`);

    // Step 5: Generate witness
    console.log('🔐 Step 5: Generating witness...');
    const witnessStart = Date.now();

    const { witness } = await noir.execute(inputs);

    const witnessElapsed = Date.now() - witnessStart;

    console.log(`   ✅ Witness generated in ${(witnessElapsed / 1000).toFixed(2)}s`);
    console.log(`   • Witness size: ${witness.length} bytes\n`);

    // Step 6: Generate proof with Keccak oracle
    console.log('🔐 Step 6: Generating UltraHonk proof with Keccak oracle...');
    console.log('   (This should take ~3-5 seconds)\n');

    const proofStart = Date.now();

    const proofData = await backend.generateProof(witness, {
      keccak: true,  // ✅ CRITICAL: Use Keccak oracle for Protocol 26
    });

    const proofElapsed = Date.now() - proofStart;

    console.log(`   ✅ Proof generated in ${(proofElapsed / 1000).toFixed(2)}s`);
    console.log(`   • Proof size: ${proofData.proof.length} bytes`);
    console.log(`   • Public inputs: ${proofData.publicInputs.length} bytes\n`);

    // Step 7: Validate proof format
    console.log('✅ Step 7: Validating proof format...');

    if (proofData.proof.length !== 14592) {
      throw new Error(`Invalid proof size: ${proofData.proof.length}, expected 14592`);
    }

    console.log('   ✅ Proof size correct (14592 bytes)\n');

    // Step 8: Format public inputs (96 bytes exact)
    console.log('📦 Step 8: Formatting public inputs for Soroban...');

    const publicInputsBuffer = new Uint8Array(96);

    // Field 1: root (32 bytes)
    const rootBytes = Buffer.from(inputs.root.replace('0x', ''), 'hex');
    publicInputsBuffer.set(rootBytes, 0);

    // Field 2: total_liabilities (32 bytes, i128 padded)
    const liabilitiesHex = BigInt(inputs.total_liabilities).toString(16).padStart(64, '0');
    const liabilitiesBytes = Buffer.from(liabilitiesHex, 'hex');
    publicInputsBuffer.set(liabilitiesBytes, 32);

    // Field 3: ledger_seq (32 bytes, u32 padded)
    const ledgerSeqHex = BigInt(inputs.ledger_seq).toString(16).padStart(64, '0');
    const ledgerSeqBytes = Buffer.from(ledgerSeqHex, 'hex');
    publicInputsBuffer.set(ledgerSeqBytes, 64);

    console.log(`   ✅ Public inputs formatted (96 bytes)\n`);

    // Step 9: Save files for verification
    console.log('💾 Step 9: Saving proof files...');

    const outputDir = path.join(__dirname, 'sdk-test-output');
    await fs.mkdir(outputDir, { recursive: true });

    const proofPath = path.join(outputDir, 'proof');
    const publicInputsPath = path.join(outputDir, 'public_inputs');

    await fs.writeFile(proofPath, Buffer.from(proofData.proof));
    await fs.writeFile(publicInputsPath, publicInputsBuffer);

    console.log(`   ✅ Proof saved to: ${proofPath}`);
    console.log(`   ✅ Public inputs saved to: ${publicInputsPath}\n`);

    // Success summary
    const totalElapsed = witnessElapsed + proofElapsed;

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ PROOF GENERATION TEST: SUCCESS');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    console.log('📊 Performance:');
    console.log(`   • Witness Generation: ${(witnessElapsed / 1000).toFixed(2)}s`);
    console.log(`   • Proof Generation: ${(proofElapsed / 1000).toFixed(2)}s`);
    console.log(`   • Total Time: ${(totalElapsed / 1000).toFixed(2)}s\n`);

    console.log('📊 Results:');
    console.log(`   • Noir witness generation: ✅ WORKING`);
    console.log(`   • UltraHonk proof generation: ✅ WORKING`);
    console.log(`   • Keccak oracle: ✅ USED`);
    console.log(`   • Proof format: ✅ VALID (14592 bytes)`);
    console.log(`   • Public inputs: ✅ FORMATTED (96 bytes)\n`);

    console.log('📝 Next Step - Verify on-chain:');
    console.log('   cd ../../contracts/verifier');
    console.log('   stellar contract invoke \\');
    console.log('     --id CBURMJENDNJRGVVFPF4MUZQKWGDVDWAHKVWLVRGBSEZMVNKZRPHEOVXJ \\');
    console.log('     --source alice \\');
    console.log('     --network testnet \\');
    console.log('     --send=yes \\');
    console.log('     -- \\');
    console.log('     verify_proof \\');
    console.log('     --proof_bytes-file-path ../../packages/sdk/sdk-test-output/proof \\');
    console.log('     --public_inputs-file-path ../../packages/sdk/sdk-test-output/public_inputs');
    console.log('');

    // Cleanup
    await backend.destroy();

    return {
      success: true,
      witnessTime: witnessElapsed,
      proofTime: proofElapsed,
      totalTime: totalElapsed
    };

  } catch (error) {
    console.error('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error('❌ PROOF GENERATION TEST: FAILED');
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.error(`Error: ${error}`);
    console.error('');

    if (error instanceof Error) {
      console.error('Stack trace:');
      console.error(error.stack);
    }

    return { success: false, error };
  }
}

// Run test
testProofGeneration()
  .then((result) => {
    process.exit(result.success ? 0 : 1);
  })
  .catch((error) => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
