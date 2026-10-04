#!/usr/bin/env node

/**
 * Simple test to verify prover-standalone can be imported
 */

console.log('🧪 Testing prover-standalone import...\n');

try {
  console.log('Step 1: Importing module...');
  const { generateProof } = await import('./src/lib/prover-standalone.js');
  console.log('✅ Module imported successfully');
  console.log('   generateProof function:', typeof generateProof);

  console.log('\nStep 2: Checking dependencies...');
  const { Noir } = await import('@noir-lang/noir_js');
  console.log('✅ @noir-lang/noir_js imported');

  const { UltraHonkBackend } = await import('@aztec/bb.js');
  console.log('✅ @aztec/bb.js UltraHonkBackend imported');

  const { BarretenbergSync } = await import('@aztec/bb.js');
  console.log('✅ @aztec/bb.js BarretenbergSync imported');

  console.log('\nStep 3: Loading circuit...');
  const fs = await import('fs/promises');
  const circuitData = await fs.readFile('src/solvency.json', 'utf8');
  const circuit = JSON.parse(circuitData);
  console.log('✅ Circuit loaded');
  console.log('   Bytecode length:', circuit.bytecode?.length || 'N/A');

  console.log('\n✅ All imports successful!');
  console.log('\nReady to generate proofs.');

} catch (error) {
  console.error('\n❌ Error during import:');
  console.error('  ', error.message);
  console.error('\nStack trace:');
  console.error(error.stack);
  process.exit(1);
}
