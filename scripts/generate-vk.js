// Generate Verification Key using Barretenberg backend
// This script uses the same bb.js library that the frontend uses

import { UltraHonkBackend } from '@aztec/bb.js';
import circuit from '../public/solvency.json' with { type: 'json' };
import fs from 'fs';
import path from 'path';

console.log('Generating Verification Key...');
console.log('Circuit bytecode size:', circuit.bytecode.length, 'bytes');

async function generateVK() {
  try {
    // Initialize backend with circuit
    const backend = new UltraHonkBackend(circuit.bytecode);

    console.log('Backend initialized');

    // Get verification key
    console.log('Getting verification key...');
    const vk = await backend.getVerificationKey();

    console.log('VK generated successfully!');
    console.log('VK size:', vk.length, 'bytes');

    // Save VK as binary
    const vkPath = path.join(process.cwd(), 'circuits', 'solvency', 'vk.bin');
    fs.writeFileSync(vkPath, Buffer.from(vk));
    console.log('VK saved to:', vkPath);

    // Save VK as hex
    const vkHex = Buffer.from(vk).toString('hex');
    const vkHexPath = path.join(process.cwd(), 'circuits', 'solvency', 'vk.hex');
    fs.writeFileSync(vkHexPath, vkHex);
    console.log('VK (hex) saved to:', vkHexPath);

    // Print first 64 bytes for verification
    console.log('\nFirst 64 bytes (hex):', vkHex.substring(0, 128));
    console.log('\n✅ VK generation complete!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error generating VK:', error);
    process.exit(1);
  }
}

generateVK();
