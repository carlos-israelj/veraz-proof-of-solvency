// Generación de la prueba de solvencia (off-chain, en el navegador).
//
// Estado: REAL proving activado (UltraHonk backend)
//   ✅ Circuit compilado: circuits/solvency/target/solvency.json
//   ✅ Dependencies instaladas: @noir-lang/noir_js @aztec/bb.js
//   ✅ Circuit en /public/solvency.json
//   ✅ Backend: UltraHonkBackend (compatible con Nethermind verifier)

const MOCK = false;

import { Noir } from "@noir-lang/noir_js";
import { UltraHonkBackend } from "@aztec/bb.js";
import circuit from "../solvency.json";
import { buildMerkleTree } from "./merkle.js";

/**
 * Converts public inputs from bb.js UltraHonk format to Soroban contract format
 * bb.js returns: Array of hex strings or Uint8Array with variable encoding
 * Soroban expects: 96 bytes concatenated [root (32), L (32), ledger_seq (32)]
 */
function formatPublicInputsForSoroban(publicInputs) {
  // If publicInputs is already a Uint8Array and has correct length, return it
  if (publicInputs instanceof Uint8Array && publicInputs.length === 96) {
    return publicInputs;
  }

  // bb.js might return an array of hex strings
  if (Array.isArray(publicInputs) && publicInputs.length === 3) {
    // Each field should be a hex string representing a 32-byte value
    const result = new Uint8Array(96);
    let offset = 0;

    for (const field of publicInputs) {
      // Remove '0x' prefix if present
      const hexStr = field.startsWith('0x') ? field.slice(2) : field;

      // Pad to 64 hex chars (32 bytes) if needed
      const paddedHex = hexStr.padStart(64, '0');

      // Convert hex to bytes
      for (let i = 0; i < 32; i++) {
        const byte = parseInt(paddedHex.substr(i * 2, 2), 16);
        result[offset + i] = byte;
      }

      offset += 32;
    }

    return result;
  }

  // If publicInputs is a Uint8Array but not 96 bytes, try to interpret it
  if (publicInputs instanceof Uint8Array) {
    // bb.js might encode fields with length prefixes or in a different format
    // For UltraHonk, public inputs are typically serialized as field elements
    // Each field element in BN254 is 32 bytes

    // If it's close to 96 bytes, it might have some encoding overhead
    console.warn("Public inputs is Uint8Array with length:", publicInputs.length);

    // Try to extract 3 x 32 bytes from the data
    if (publicInputs.length >= 96) {
      return publicInputs.slice(0, 96);
    }

    throw new Error(`Unexpected public inputs format: Uint8Array of length ${publicInputs.length}`);
  }

  throw new Error(`Unexpected public inputs format: ${typeof publicInputs}`);
}

/**
 * @param {{ balances: string[], salts: string[], ledgerSeq: number }} inputs
 * @returns {Promise<{ publicInputs: Uint8Array, proof: Uint8Array }>}
 */
export async function generateSolvencyProof(inputs) {
  if (MOCK) {
    // Placeholders para iterar la UI. NO son una prueba válida.
    return {
      publicInputs: new Uint8Array(96), // [root, L, ledger_seq] = 3 campos de 32 bytes
      proof: new Uint8Array(0),
    };
  }

  try {
    console.log("Building merkle tree from balances...");
    // Build merkle tree to get the root that the circuit will validate
    const { root, totalSum } = await buildMerkleTree(inputs.balances, inputs.salts);

    console.log("Merkle root calculated:", root);
    console.log("Total sum:", totalSum);

    // Prepare inputs for Noir circuit
    const circuitInputs = {
      root: root, // Calculated merkle root
      total_liabilities: totalSum, // Must match the sum from tree
      ledger_seq: inputs.ledgerSeq.toString(),
      balances: inputs.balances,
      salts: inputs.salts,
    };

    console.log("Generating proof with inputs:", circuitInputs);

    const noir = new Noir(circuit);
    const backend = new UltraHonkBackend(circuit.bytecode);

    // Execute circuit to get witness
    const { witness } = await noir.execute(circuitInputs);

    // Generate proof
    const { proof, publicInputs } = await backend.generateProof(witness);

    console.log("Proof generated successfully");
    console.log("Public inputs (raw from bb.js):", publicInputs);
    console.log("Proof length:", proof.length);

    // Convert public inputs to the format expected by Soroban contract
    // Contract expects: 96 bytes = [root (32), L (32), ledger_seq (32)]
    const formattedPublicInputs = formatPublicInputsForSoroban(publicInputs);
    console.log("Formatted public inputs (96 bytes):", formattedPublicInputs);
    console.log("Formatted length:", formattedPublicInputs.length);

    return {
      proof: new Uint8Array(proof),
      publicInputs: formattedPublicInputs,
    };
  } catch (error) {
    console.error("Error generating proof:", error);
    throw new Error(`Failed to generate ZK proof: ${error.message}`);
  }
}
