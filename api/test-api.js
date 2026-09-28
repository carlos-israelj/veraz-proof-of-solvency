/**
 * Quick test script for API endpoints
 */

import dotenv from 'dotenv';
import stellarService from './src/services/stellar.js';

dotenv.config();

async function testAPI() {
  console.log('🧪 Testing Veraz API...\n');

  const testContractId = process.env.SOLVENCY_CONTRACT;
  console.log(`Testing with contract: ${testContractId}\n`);

  try {
    // Test 1: Health Check
    console.log('1️⃣  Testing Stellar connection...');
    const health = await stellarService.healthCheck();
    console.log('  ✅ Health:', health);
    console.log('');

    // Test 2: Query Solvency Attestation
    console.log('2️⃣  Querying solvency attestation...');
    const attestation = await stellarService.querySolvencyAttestation(testContractId);

    if (attestation) {
      console.log('  ✅ Attestation retrieved:');
      console.log('     Solvent:', attestation.solvent);
      console.log('     Reserves:', stellarService.formatStroops(attestation.reserves), 'USDC');
      console.log('     Liabilities:', stellarService.formatStroops(attestation.liabilities), 'USDC');
      console.log('     SAC Balance:', stellarService.formatStroops(attestation.sac_balance), 'USDC');
      console.log('     Aquarius:', stellarService.formatStroops(attestation.aquarius_balance), 'USDC');
      console.log('     DeFindex:', stellarService.formatStroops(attestation.defindex_balance), 'USDC');
      console.log('     Ledger:', attestation.ledger_seq);
      console.log('     Timestamp:', new Date(attestation.timestamp * 1000).toISOString());
    } else {
      console.log('  ⚠️  No attestation found (contract may not have proof yet)');
    }
    console.log('');

    // Test 3: Reserve Breakdown
    console.log('3️⃣  Getting reserve breakdown...');
    const breakdown = await stellarService.getReserveBreakdown(testContractId);

    if (breakdown) {
      console.log('  ✅ Reserve breakdown:');
      console.log('     Total:', stellarService.formatStroops(breakdown.total), 'USDC');
      breakdown.breakdown.forEach(source => {
        console.log(`     - ${source.type}: ${stellarService.formatStroops(source.amount)} USDC (${source.percentage.toFixed(2)}%)`);
      });
    } else {
      console.log('  ⚠️  No breakdown available');
    }
    console.log('');

    console.log('✅ All tests completed successfully!');

  } catch (error) {
    console.error('❌ Error during testing:', error.message);
    console.error(error.stack);
  }
}

testAPI();
