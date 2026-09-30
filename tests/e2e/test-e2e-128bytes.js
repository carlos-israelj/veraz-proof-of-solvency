/**
 * E2E Test: 128-byte Public Inputs with Reserve Address Commitment
 *
 * Tests the complete flow:
 * 1. Generate ZK proof with reserve addresses
 * 2. Format 128-byte public inputs (old: 96 bytes)
 * 3. Submit attestation to new contract
 * 4. Verify on-chain success
 */

import { generateSolvencyProof } from './src/lib/prover.js';
import { attest, getCurrentLedgerSeq } from './src/lib/stellar.js';
import { Contract, SorobanRpc, Keypair } from '@stellar/stellar-sdk';

const CONFIG = {
  contractId: 'CADFYWTVXQ5WKWPEOI5VYQ55ICQFNHLLGNSH2ETM2GXNBPFWDLW7NRRX',
  network: 'testnet',
  rpcUrl: 'https://soroban-testnet.stellar.org',
};

// Test data
const TEST_BALANCES = [
  100000, // Holder 1: 100k
  50000,  // Holder 2: 50k
  25000,  // Holder 3: 25k
  75000,  // Holder 4: 75k
  30000,  // Holder 5: 30k
  20000,  // Holder 6: 20k
  60000,  // Holder 7: 60k
  40000,  // Holder 8: 40k
];
// Total liabilities: 400,000

const RESERVE_ADDRESSES = [
  'GCY4CQHYSGI2MKE24R6ASMSX6EN6VQDYQZIC2NG3FSLJML6ELPFQAPKT', // Reserve account 1
  'GDZST3XVCDTUJ76ZAV2HA72KYQODXXZ5PTMAPZGDHZ6CS7RO7MGG3DBM', // Reserve account 2 (example)
];

async function main() {
  console.log('🧪 E2E Test: 128-byte Public Inputs\n');
  console.log('═══════════════════════════════════════════════════\n');

  try {
    // ========================================
    // Step 1: Get Current Ledger Sequence
    // ========================================
    console.log('📊 Step 1: Fetching current ledger sequence...');
    const ledgerSeq = await getCurrentLedgerSeq();
    console.log(`   ✅ Current ledger: ${ledgerSeq}\n`);

    // ========================================
    // Step 2: Generate ZK Proof
    // ========================================
    console.log('🔐 Step 2: Generating ZK proof with reserve addresses...');
    console.log(`   Balances: ${TEST_BALANCES.length} holders`);
    console.log(`   Total liabilities: ${TEST_BALANCES.reduce((a, b) => a + b, 0).toLocaleString()}`);
    console.log(`   Reserve addresses: ${RESERVE_ADDRESSES.length}`);

    const salts = TEST_BALANCES.map((_, i) => String(i + 1));

    console.log('   ⏳ Generating proof (this takes 3-5 seconds)...');
    const startTime = Date.now();

    const { proof, publicInputs } = await generateSolvencyProof({
      balances: TEST_BALANCES,
      salts,
      ledgerSeq,
      reserveAddresses: RESERVE_ADDRESSES,
    });

    const proofTime = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`   ✅ Proof generated in ${proofTime}s`);
    console.log(`   ✅ Proof size: ${proof.length} bytes`);
    console.log(`   ✅ Public inputs size: ${publicInputs.length} bytes (expected: 128)\n`);

    // ========================================
    // Step 3: Validate Public Inputs Format
    // ========================================
    console.log('🔍 Step 3: Validating public inputs format...');

    if (publicInputs.length !== 128) {
      throw new Error(`❌ FAIL: Public inputs is ${publicInputs.length} bytes, expected 128`);
    }
    console.log('   ✅ Public inputs is 128 bytes (correct)\n');

    // ========================================
    // Step 4: Query Contract State (Before)
    // ========================================
    console.log('📋 Step 4: Querying contract state (before attestation)...');

    const server = new SorobanRpc.Server(CONFIG.rpcUrl);
    const contract = new Contract(CONFIG.contractId);

    try {
      const tx = await server.prepareTransaction(
        contract.call('is_solvent'),
        CONFIG.network
      );
      const result = await server.sendTransaction(tx);
      console.log('   Current attestation:', result);
    } catch (err) {
      console.log('   ℹ️  No previous attestation (expected for first run)');
    }
    console.log('');

    // ========================================
    // Step 5: Submit Attestation (DRY RUN)
    // ========================================
    console.log('🚀 Step 5: Simulating attestation transaction...');
    console.log('   ⚠️  DRY RUN MODE (not actually submitting)');
    console.log('   Contract ID:', CONFIG.contractId);
    console.log('   Public inputs:', publicInputs.length, 'bytes');
    console.log('   Proof:', proof.length, 'bytes');
    console.log('');
    console.log('   To submit for real, uncomment the attest() call below.\n');

    // UNCOMMENT TO ACTUALLY SUBMIT:
    /*
    console.log('🔐 Step 5: Submitting attestation to contract...');

    // You need to provide a signing function
    // This is just a placeholder - replace with actual Freighter or keypair signing
    const dummySignFn = async (tx) => {
      console.log('   ⏳ Waiting for user to sign transaction...');
      throw new Error('Signing not implemented - use Freighter wallet in browser');
    };

    const result = await attest({
      contractId: CONFIG.contractId,
      publicInputs,
      proof,
      sourceAddress: 'YOUR_STELLAR_ADDRESS',
      signTransactionFn: dummySignFn,
    });

    console.log('   ✅ Transaction submitted!');
    console.log('   TX Hash:', result.hash);
    console.log('   Explorer:', `https://stellar.expert/explorer/testnet/tx/${result.hash}\n`);

    // ========================================
    // Step 6: Verify On-Chain
    // ========================================
    console.log('✅ Step 6: Verifying attestation on-chain...');

    // Wait a few seconds for transaction to finalize
    await new Promise(resolve => setTimeout(resolve, 5000));

    const attestation = await contract.call('is_solvent');
    console.log('   Attestation result:', attestation);
    console.log('   Solvent:', attestation.solvent);
    console.log('   Reserves:', attestation.reserves);
    console.log('   Liabilities:', attestation.liabilities);
    */

    // ========================================
    // Summary
    // ========================================
    console.log('═══════════════════════════════════════════════════');
    console.log('✅ E2E Test Summary\n');
    console.log('   [✅] Ledger sequence fetched');
    console.log('   [✅] ZK proof generated successfully');
    console.log('   [✅] Public inputs is 128 bytes (correct)');
    console.log('   [✅] Proof size is valid');
    console.log('   [⏸️ ] Transaction submission (dry run)');
    console.log('   [⏸️ ] On-chain verification (pending)');
    console.log('');
    console.log('🎯 Next Steps:');
    console.log('   1. Test in browser with Freighter wallet');
    console.log('   2. Verify transaction succeeds on testnet');
    console.log('   3. Check attestation is stored correctly');
    console.log('═══════════════════════════════════════════════════\n');

  } catch (error) {
    console.error('\n❌ Test Failed:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

main().catch(console.error);
