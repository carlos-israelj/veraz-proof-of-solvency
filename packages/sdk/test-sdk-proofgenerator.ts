/**
 * Test the FIXED ProofGenerator from SDK
 *
 * This tests that the corrected SDK code now works properly
 */

import { ProofGenerator } from './src/proof/generator';
import type { CompiledCircuit } from '@noir-lang/types';
import * as fs from 'fs/promises';
import * as path from 'path';

async function testSDKProofGenerator() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🧪 SDK ProofGenerator Test (FIXED VERSION)');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  try {
    // Step 1: Load circuit
    console.log('📦 Step 1: Loading circuit...');
    const circuitPath = path.join(__dirname, '../../circuits/solvency/target/solvency.json');
    const circuitJson = await fs.readFile(circuitPath, 'utf-8');
    const circuit: CompiledCircuit = JSON.parse(circuitJson);
    console.log('   ✅ Circuit loaded\n');

    // Step 2: Initialize ProofGenerator (from SDK)
    console.log('🔧 Step 2: Initializing SDK ProofGenerator...');
    const generator = new ProofGenerator();
    await generator.initialize(circuit);
    console.log('   ✅ ProofGenerator initialized\n');

    // Step 3: Prepare test data
    console.log('📊 Step 3: Preparing test data...');
    const testData = {
      merkleRoot: '0x0fa83f8ac7ec78d7338a9f6777307cb4aa21ce6a94ffecfc3378453ac3e08523',
      totalLiabilities: BigInt(400000),
      ledgerSeq: 58204113,
      balances: [
        BigInt(100000),
        BigInt(50000),
        BigInt(25000),
        BigInt(75000),
        BigInt(30000),
        BigInt(20000),
        BigInt(60000),
        BigInt(40000),
      ],
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
    console.log(`   • Merkle Root: ${testData.merkleRoot.substring(0, 16)}...`);
    console.log(`   • Total Liabilities: ${testData.totalLiabilities.toString()}`);
    console.log(`   • Ledger Seq: ${testData.ledgerSeq}\n`);

    // Step 4: Generate proof using SDK's ProofGenerator
    console.log('🔐 Step 4: Generating proof with SDK ProofGenerator...');
    const startTime = Date.now();

    const { proof, publicInputs } = await generator.generateProof(testData);

    const elapsed = Date.now() - startTime;

    console.log(`\n   ✅ Proof generated in ${(elapsed / 1000).toFixed(2)}s`);
    console.log(`   • Proof size: ${proof.length} bytes`);
    console.log(`   • Public inputs size: ${publicInputs.length} bytes\n`);

    // Step 5: Validate
    console.log('✅ Step 5: Validating proof format...');
    if (proof.length !== 14592) {
      throw new Error(`Invalid proof size: ${proof.length}, expected 14592`);
    }
    if (publicInputs.length !== 96) {
      throw new Error(`Invalid public inputs size: ${publicInputs.length}, expected 96`);
    }
    console.log('   ✅ Proof format valid\n');

    // Step 6: Save proof
    console.log('💾 Step 6: Saving proof files...');
    const outputDir = path.join(__dirname, 'sdk-proof-output');
    await fs.mkdir(outputDir, { recursive: true });

    const proofPath = path.join(outputDir, 'proof');
    const publicInputsPath = path.join(outputDir, 'public_inputs');

    await fs.writeFile(proofPath, Buffer.from(proof));
    await fs.writeFile(publicInputsPath, Buffer.from(publicInputs));

    console.log(`   ✅ Proof saved to: ${proofPath}`);
    console.log(`   ✅ Public inputs saved to: ${publicInputsPath}\n`);

    // Cleanup
    await generator.destroy();

    // Success
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ SDK ProofGenerator Test: SUCCESS');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    console.log('📊 Results:');
    console.log(`   • SDK ProofGenerator: ✅ WORKING (after fixes)`);
    console.log(`   • Proof Generation: ${(elapsed / 1000).toFixed(2)}s`);
    console.log(`   • Proof Size: ${proof.length} bytes ✅`);
    console.log(`   • Public Inputs: ${publicInputs.length} bytes ✅\n`);

    console.log('📝 Next: Verify on-chain');
    console.log('   cd ../../contracts/verifier');
    console.log('   stellar contract invoke \\');
    console.log('     --id CBURMJENDNJRGVVFPF4MUZQKWGDVDWAHKVWLVRGBSEZMVNKZRPHEOVXJ \\');
    console.log('     --source alice \\');
    console.log('     --network testnet \\');
    console.log('     --send=yes \\');
    console.log('     -- \\');
    console.log('     verify_proof \\');
    console.log('     --proof_bytes-file-path ../../packages/sdk/sdk-proof-output/proof \\');
    console.log('     --public_inputs-file-path ../../packages/sdk/sdk-proof-output/public_inputs');
    console.log('');

    return { success: true, elapsed };

  } catch (error) {
    console.error('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error('❌ SDK ProofGenerator Test: FAILED');
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.error(`Error: ${error}`);
    if (error instanceof Error) {
      console.error('Stack trace:');
      console.error(error.stack);
    }
    return { success: false, error };
  }
}

// Run test
testSDKProofGenerator()
  .then((result) => {
    process.exit(result.success ? 0 : 1);
  })
  .catch((error) => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
