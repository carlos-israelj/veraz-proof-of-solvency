#!/usr/bin/env node

/**
 * Standalone Proof Generator for Veraz Testnet Testing
 *
 * Generates zero-knowledge proofs of solvency that can be submitted to
 * the Soroban contract via stellar CLI.
 *
 * Usage:
 *   node generate-proof-cli.mjs --balances 100,100,100,100,100,100,100,100 --ledger 1234567
 *
 * Output:
 *   - public_inputs.hex (96 bytes)
 *   - proof.hex (2-4 KB)
 *   - Transaction ready command
 */

import { generateProof } from './src/lib/prover.js';
import { buildMerkleTree } from './src/lib/merkle.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Parse command line arguments
function parseArgs() {
    const args = process.argv.slice(2);
    const config = {
        balances: null,
        ledger: null,
        outputDir: join(__dirname, 'contracts/solvency_policy'),
        reserveAccounts: []  // Will be filled from deploy-config.json
    };

    for (let i = 0; i < args.length; i += 2) {
        const key = args[i].replace('--', '');
        const value = args[i + 1];

        switch(key) {
            case 'balances':
                config.balances = value.split(',').map(b => parseInt(b.trim()));
                break;
            case 'ledger':
                config.ledger = parseInt(value);
                break;
            case 'output':
                config.outputDir = value;
                break;
            default:
                console.warn(`Unknown argument: ${key}`);
        }
    }

    return config;
}

// Validate configuration
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

// Load reserve accounts from deploy-config.json
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

    return [];
}

// Format bytes as hex string
function toHex(bytes) {
    return Buffer.from(bytes).toString('hex');
}

// Main proof generation
async function main() {
    console.log('╔══════════════════════════════════════════════════════════╗');
    console.log('║     Veraz Proof Generator CLI                           ║');
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
    if (config.reserveAccounts.length === 0) {
        console.warn('⚠️  No reserve accounts configured, using empty array');
    } else {
        console.log(`  Reserve Accounts: ${config.reserveAccounts.length} configured`);
        config.reserveAccounts.forEach((addr, i) => {
            console.log(`    ${i + 1}. ${addr.substring(0, 10)}...`);
        });
        console.log('');
    }

    try {
        console.log('⏳ Step 1: Building Merkle tree...');
        const tree = buildMerkleTree(config.balances);
        console.log(`✅ Merkle root: ${tree.root.substring(0, 20)}...`);
        console.log('');

        console.log('⏳ Step 2: Generating zero-knowledge proof...');
        console.log('   (This may take 3-5 seconds)');

        const result = await generateProof(
            config.balances,
            config.ledger,
            config.reserveAccounts
        );

        console.log('✅ Proof generated successfully!');
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
        console.log('📋 Ready to submit to Stellar testnet:');
        console.log('');
        console.log('stellar contract invoke \\');
        console.log('  --id CC5XFT7XZXKJEONWOBALJTSKYGGCV3I7TEA54FKZWEHSOMQHDOF53SGG \\');
        console.log('  --network testnet \\');
        console.log('  --source issuer \\');
        console.log('  -- attest \\');
        console.log(`  --public_inputs ${publicInputsHex} \\`);
        console.log(`  --proof ${proofHex}`);
        console.log('');

        // Save command to file for convenience
        const cmdPath = join(config.outputDir, 'submit-attestation.sh');
        const cmdContent = `#!/bin/bash
# Auto-generated attestation submission command
# Generated: ${new Date().toISOString()}
# Balances: [${config.balances.join(', ')}]
# Ledger: ${config.ledger}

stellar contract invoke \\
  --id CC5XFT7XZXKJEONWOBALJTSKYGGCV3I7TEA54FKZWEHSOMQHDOF53SGG \\
  --network testnet \\
  --source issuer \\
  -- attest \\
  --public_inputs ${publicInputsHex} \\
  --proof ${proofHex}
`;

        fs.writeFileSync(cmdPath, cmdContent);
        fs.chmodSync(cmdPath, 0o755);

        console.log('🚀 Quick submit (saved to submit-attestation.sh):');
        console.log(`   bash ${cmdPath}`);
        console.log('');

        console.log('✅ All done! Proof ready for submission.');

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
if (import.meta.url === `file://${process.argv[1]}`) {
    main().catch(error => {
        console.error('Fatal error:', error);
        process.exit(1);
    });
}
