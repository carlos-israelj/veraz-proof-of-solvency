/**
 * Veraz SDK - Example Usage
 *
 * This example demonstrates how to use the Veraz SDK to generate
 * and submit solvency attestations.
 */

import { VerazSDK } from './src/index';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Example 1: One-time attestation
 */
async function oneTimeAttestation() {
  console.log('═══════════════════════════════════════════════════');
  console.log('Example 1: One-Time Attestation');
  console.log('═══════════════════════════════════════════════════\n');

  // Create SDK instance
  const sdk = new VerazSDK({
    database: {
      type: 'postgres',
      connectionString: process.env.DATABASE_URL!,
      query: `
        SELECT user_id, balance
        FROM user_balances
        WHERE asset = 'USDC'
      `,
    },
    stellar: {
      network: 'testnet',
      secretKey: process.env.STELLAR_SECRET_KEY!,
      contractId: process.env.CONTRACT_ID!,
    },
    circuitPath: process.env.CIRCUIT_PATH,
  });

  // Check account balance
  console.log('Checking Stellar account balance...');
  const balance = await sdk.checkBalance();
  console.log(`Account balance: ${balance} XLM\n`);

  // Generate and submit attestation
  const result = await sdk.attest();

  if (result.success) {
    console.log('\n✅ SUCCESS');
    console.log(`Solvent: ${result.solvent ? 'YES' : 'NO'}`);
    console.log(`TX Hash: ${result.txHash}`);
    console.log(`Merkle Root: ${result.merkleRoot.substring(0, 16)}...`);
    console.log(`Total Liabilities: ${result.totalLiabilities}`);
    console.log(`Individual Receipts: ${result.receipts?.size || 0}`);
  } else {
    console.log('\n❌ FAILED');
    console.log(`Error: ${result.error}`);
  }
}

/**
 * Example 2: Scheduled attestations
 */
async function scheduledAttestations() {
  console.log('\n═══════════════════════════════════════════════════');
  console.log('Example 2: Scheduled Attestations');
  console.log('═══════════════════════════════════════════════════\n');

  const sdk = new VerazSDK({
    database: {
      type: 'postgres',
      connectionString: process.env.DATABASE_URL!,
      query: 'SELECT user_id, balance FROM user_balances WHERE asset = $1',
    },
    stellar: {
      network: 'testnet',
      secretKey: process.env.STELLAR_SECRET_KEY!,
      contractId: process.env.CONTRACT_ID!,
    },
    circuitPath: process.env.CIRCUIT_PATH,
  });

  // Schedule attestations every 6 hours
  sdk.scheduleAttestation('0 */6 * * *', (result) => {
    console.log('\n📊 Scheduled Attestation Complete');
    console.log(`   • Solvent: ${result.solvent}`);
    console.log(`   • TX Hash: ${result.txHash}`);
    console.log(`   • Time: ${new Date().toISOString()}`);
  });

  console.log('Scheduled attestations running...');
  console.log('Press Ctrl+C to stop\n');

  // Keep process running
  process.on('SIGINT', () => {
    console.log('\nStopping scheduled attestations...');
    sdk.stopSchedule();
    process.exit(0);
  });
}

/**
 * Example 3: With individual verification receipts
 */
async function attestationWithReceipts() {
  console.log('\n═══════════════════════════════════════════════════');
  console.log('Example 3: Attestation with Individual Receipts');
  console.log('═══════════════════════════════════════════════════\n');

  const sdk = new VerazSDK({
    database: {
      type: 'postgres',
      connectionString: process.env.DATABASE_URL!,
      query: 'SELECT user_id, balance FROM user_balances',
    },
    stellar: {
      network: 'testnet',
      secretKey: process.env.STELLAR_SECRET_KEY!,
      contractId: process.env.CONTRACT_ID!,
    },
    circuitPath: process.env.CIRCUIT_PATH,
  });

  const result = await sdk.attest();

  if (result.success && result.receipts) {
    console.log(`\n📋 Generated ${result.receipts.size} individual receipts:`);

    // Example: Store receipts in database for users to retrieve
    for (const [userId, receipt] of result.receipts) {
      console.log(`\n• User: ${userId}`);
      console.log(`  Balance: ${receipt.balance}`);
      console.log(`  Root: ${receipt.root.substring(0, 16)}...`);
      console.log(`  Siblings: ${receipt.siblings.length} hashes`);

      // In production, you would store this in your database:
      /*
      await db.query(
        'UPDATE users SET merkle_receipt = $1 WHERE user_id = $2',
        [JSON.stringify(receipt), userId]
      );
      */
    }

    console.log('\n💡 Users can verify their receipts at:');
    console.log('   https://explorer.veraz.com/verify');
  }
}

/**
 * Example 4: Multi-database support
 */
async function multiDatabaseExample() {
  console.log('\n═══════════════════════════════════════════════════');
  console.log('Example 4: Multi-Database Support');
  console.log('═══════════════════════════════════════════════════\n');

  // PostgreSQL
  const postgresSDK = new VerazSDK({
    database: {
      type: 'postgres',
      connectionString: 'postgresql://user:pass@localhost:5432/mydb',
      query: 'SELECT user_id, balance FROM accounts',
    },
    stellar: {
      network: 'testnet',
      secretKey: process.env.STELLAR_SECRET_KEY!,
      contractId: process.env.CONTRACT_ID!,
    },
    circuitPath: process.env.CIRCUIT_PATH,
  });

  // Supabase (recommended for startups)
  const supabaseSDK = new VerazSDK({
    database: {
      type: 'supabase',
      connectionString: process.env.SUPABASE_CONNECTION_STRING!,
      query: 'SELECT user_id, balance FROM user_balances WHERE asset = $1',
    },
    stellar: {
      network: 'testnet',
      secretKey: process.env.STELLAR_SECRET_KEY!,
      contractId: process.env.CONTRACT_ID!,
    },
    circuitPath: process.env.CIRCUIT_PATH,
  });

  // MySQL
  const mysqlSDK = new VerazSDK({
    database: {
      type: 'mysql',
      connectionString: 'mysql://user:pass@localhost:3306/mydb',
      query: 'SELECT user_id, balance FROM accounts',
    },
    stellar: {
      network: 'testnet',
      secretKey: process.env.STELLAR_SECRET_KEY!,
      contractId: process.env.CONTRACT_ID!,
    },
    circuitPath: process.env.CIRCUIT_PATH,
  });

  // MongoDB
  const mongoSDK = new VerazSDK({
    database: {
      type: 'mongodb',
      connectionString: 'mongodb://localhost:27017/mydb',
      query: 'accounts', // Collection name
    },
    stellar: {
      network: 'testnet',
      secretKey: process.env.STELLAR_SECRET_KEY!,
      contractId: process.env.CONTRACT_ID!,
    },
    circuitPath: process.env.CIRCUIT_PATH,
  });

  console.log('✅ SDK supports PostgreSQL, MySQL, MongoDB, and Supabase');
  console.log('   Choose based on your existing infrastructure');
  console.log('\n💡 Recommended for startups: Supabase');
  console.log('   - Easy setup, built-in auth, real-time features');
  console.log('   - PostgreSQL under the hood (production-ready)');
}

/**
 * Example 5: Supabase-specific example
 */
async function supabaseExample() {
  console.log('\n═══════════════════════════════════════════════════');
  console.log('Example 5: Supabase Integration (Recommended)');
  console.log('═══════════════════════════════════════════════════\n');

  console.log('🚀 Supabase is the recommended database for Veraz SDK');
  console.log('   • PostgreSQL-based (production-ready)');
  console.log('   • Built-in authentication');
  console.log('   • Real-time subscriptions');
  console.log('   • Auto-generated REST API\n');

  // Direct PostgreSQL connection (more secure)
  const sdk = new VerazSDK({
    database: {
      type: 'supabase',
      connectionString: process.env.SUPABASE_CONNECTION_STRING!,
      query: `
        SELECT user_id, balance
        FROM user_balances
        WHERE asset = 'USDC'
      `,
    },
    stellar: {
      network: 'testnet',
      secretKey: process.env.STELLAR_SECRET_KEY!,
      contractId: process.env.CONTRACT_ID!,
    },
    circuitPath: process.env.CIRCUIT_PATH,
  });

  console.log('Database: Supabase (PostgreSQL)');
  console.log('Connection: Direct (secure)\n');

  const result = await sdk.attest();

  if (result.success) {
    console.log('\n✅ Attestation successful!');
    console.log(`   Solvent: ${result.solvent ? 'YES' : 'NO'}`);
    console.log(`   TX: ${result.txHash}`);
    console.log('\n💡 Next steps:');
    console.log('   1. Set up RLS (Row Level Security) in Supabase');
    console.log('   2. Create read-only role for SDK queries');
    console.log('   3. Schedule attestations every 6-12 hours');
  }
}

/**
 * Run examples
 */
async function main() {
  const example = process.argv[2] || '1';

  try {
    switch (example) {
      case '1':
        await oneTimeAttestation();
        break;
      case '2':
        await scheduledAttestations();
        break;
      case '3':
        await attestationWithReceipts();
        break;
      case '4':
        await multiDatabaseExample();
        break;
      case '5':
        await supabaseExample();
        break;
      default:
        console.log('Usage: node example.js [1|2|3|4|5]');
        console.log('  1 - One-time attestation');
        console.log('  2 - Scheduled attestations');
        console.log('  3 - Attestation with receipts');
        console.log('  4 - Multi-database support');
        console.log('  5 - Supabase integration (recommended)');
    }
  } catch (error) {
    console.error('Error running example:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}
