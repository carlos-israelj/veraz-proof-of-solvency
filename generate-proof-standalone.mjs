#!/usr/bin/env node

/**
 * Standalone CLI Proof Generator for Veraz
 *
 * Generates zero-knowledge proofs using the standalone prover (Node.js compatible)
 *
 * Usage:
 *   node generate-proof-standalone.mjs --balances 100,100,100,100,100,100,100,100 --ledger 1234567
 *
 * Output:
 *   - public_inputs.hex
 *   - proof.hex
 *   - submit-attestation.sh (ready-to-run command)
 */

import { generateProof } from './src/lib/prover-standalone.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Default configuration
const DEFAULT_CONFIG = {
  solvencyContract: 'CC5XFT7XZXKJEONWOBALJTSKYGGCV3I7TEA54FKZWEHSOMQHDOF53SGG',
  network: 'testnet',
  source: 'issuer',
};

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const config = {
    balances: null,
    ledger: null,
    reserveAccounts: [],
    outputDir: join(__dirname, 'contracts/solvency_policy'),
    circuitPath: join(__dirname, 'src/solvency.json'),
  };

  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace('--', '');
    const value = args[i + 1];

    switch (key) {
      case 'balances':
        config.balances = value.split(',').map(b => parseInt(b.trim()));
        break;
      case 'ledger':
        config.ledger = parseInt(value);
        break;
      case 'output':
        config.outputDir = value;
        break;
      case 'circuit':
        config.circuitPath = value;
        break;
      default:
        console.warn(`⚠️  Unknown argument: ${key}`);
    }
  }

  return config;
}

/**
 * Load reserve accounts from deploy-config.json
 */
function loadReserveAccounts() {
  try {
    const configPath = join(__dirname, 'contracts/solvency_policy/deploy-config.json');
    const configData = fs.readFileSync(configPath, 'utf8');
    const config = JSON.parse(configData);

    if (config.reserve_accounts && Array.isArray(config.reserve_accounts)) {
      console.log(`✅ Loaded ${config.reserve_accounts.length} reserve accounts from deploy-config.json`);
      return config.reserve_accounts;
    }
  } catch (error) {
    console.warn('⚠️  Could not load reserve accounts from deploy-config.json:', error.message);
  }

  // Fallback to default test account
  console.warn('⚠️  Using default test reserve account');
  return ['GDWIVL2VQOR67L4F7BTPK5DI47EZHGHBQAY62RSMZDUZF2A7SGJLWRJ6'];
}

/**
 * Validate configuration
 */
function validate(config) {
  if (!config.balances || config.balances.length !== 8) {
    throw new Error('Must provide exactly 8 balances (comma-separated)');
  }

  if (!config.ledger || config.ledger < 0) {
    throw new Error('Must provide valid ledger sequence number');
  }

  if (config.balances.some(b => isNaN(b) || b < 0)) {
    throw new Error('All balances must be non-negative numbers');
  }

  return true;
}

/**
 * Format bytes as hex string
 */
function toHex(bytes) {
  return Buffer.from(bytes).toString('hex');
}

/**
 * Main execution
 */
async function main() {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║     Veraz Standalone Proof Generator                    ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  // Parse and validate
  const config = parseArgs();
  validate(config);

  console.log('Configuration:');
  console.log(`  Balances: [${config.balances.join(', ')}]`);
  console.log(`  Total: ${config.balances.reduce((a, b) => a + b, 0)}`);
  console.log(`  Ledger: ${config.ledger}`);
  console.log('');

  // Load reserve accounts
  config.reserveAccounts = loadReserveAccounts();
  console.log(`  Reserve Accounts: ${config.reserveAccounts.length} configured`);
  config.reserveAccounts.forEach((addr, i) => {
    console.log(`    ${i + 1}. ${addr.substring(0, 10)}...`);
  });
  console.log('');

  try {
    console.log('⏳ Generating zero-knowledge proof...');
    console.log('   (This may take 10-30 seconds)');
    console.log('');

    const startTime = Date.now();

    const result = await generateProof({
      balances: config.balances,
      ledgerSeq: config.ledger,
      reserveAddresses: config.reserveAccounts,
      circuitPath: config.circuitPath,
    });

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log('');
    console.log(`✅ Proof generated successfully in ${elapsed}s!`);
    console.log('');

    // Extract and format outputs
    const publicInputsHex = toHex(result.publicInputs);
    const proofHex = toHex(result.proof);

    console.log('📊 Proof Details:');
    console.log(`  Public Inputs: ${result.publicInputs.length} bytes`);
    console.log(`  Proof Size: ${result.proof.length} bytes`);
    console.log('');

    // Save to files
    const piPath = join(config.outputDir, 'public_inputs.hex');
    const proofPath = join(config.outputDir, 'proof.hex');

    fs.writeFileSync(piPath, publicInputsHex);
    fs.writeFileSync(proofPath, proofHex);

    console.log('💾 Saved outputs:');
    console.log(`  ${piPath}`);
    console.log(`  ${proofPath}`);
    console.log('');

    // Generate stellar CLI command
    const cmdPath = join(config.outputDir, 'submit-attestation.sh');
    const cmdContent = `#!/bin/bash
# Auto-generated attestation submission command
# Generated: ${new Date().toISOString()}
# Balances: [${config.balances.join(', ')}]
# Ledger: ${config.ledger}
# Total Liabilities: ${config.balances.reduce((a, b) => a + b, 0)}

stellar contract invoke \\
  --id ${DEFAULT_CONFIG.solvencyContract} \\
  --network ${DEFAULT_CONFIG.network} \\
  --source ${DEFAULT_CONFIG.source} \\
  -- attest \\
  --public_inputs ${publicInputsHex} \\
  --proof ${proofHex}
`;

    fs.writeFileSync(cmdPath, cmdContent);
    fs.chmodSync(cmdPath, 0o755);

    console.log('📋 Ready to submit to Stellar testnet:');
    console.log('');
    console.log('stellar contract invoke \\');
    console.log(`  --id ${DEFAULT_CONFIG.solvencyContract} \\`);
    console.log(`  --network ${DEFAULT_CONFIG.network} \\`);
    console.log(`  --source ${DEFAULT_CONFIG.source} \\`);
    console.log('  -- attest \\');
    console.log(`  --public_inputs ${publicInputsHex.substring(0, 40)}... \\`);
    console.log(`  --proof ${proofHex.substring(0, 40)}...`);
    console.log('');

    console.log('🚀 Quick submit (saved to submit-attestation.sh):');
    console.log(`   bash ${cmdPath}`);
    console.log('');

    console.log('✅ All done! Proof ready for submission.');
    console.log('');
    console.log('📖 Next steps:');
    console.log('   1. Review the submit-attestation.sh script');
    console.log('   2. Run: bash contracts/solvency_policy/submit-attestation.sh');
    console.log('   3. Wait for confirmation (~5 seconds)');
    console.log('   4. Verify with: stellar contract invoke --id ... -- is_solvent');
    console.log('');

  } catch (error) {
    console.error('');
    console.error('❌ Error generating proof:');
    console.error(`   ${error.message}`);
    console.error('');

    if (error.stack) {
      console.error('Stack trace:');
      console.error(error.stack);
    }

    process.exit(1);
  }
}

// Run if called directly
// Note: fileURLToPath handles the comparison properly across platforms
const scriptPath = fileURLToPath(import.meta.url);
const isMainModule = process.argv[1] && (
  scriptPath === process.argv[1] ||
  scriptPath === join(process.cwd(), process.argv[1])
);

if (isMainModule) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}
