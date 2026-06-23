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
import circuit from "../../public/solvency.json";

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
    // Calculate total liabilities
    const totalLiabilities = inputs.balances.reduce((sum, bal) => sum + BigInt(bal), 0n);

    // Prepare inputs for Noir circuit
    const circuitInputs = {
      root: "0", // Will be calculated by circuit, placeholder for now
      total_liabilities: totalLiabilities.toString(),
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
    console.log("Public inputs:", publicInputs);
    console.log("Proof length:", proof.length);

    return {
      proof: new Uint8Array(proof),
      publicInputs: new Uint8Array(publicInputs),
    };
  } catch (error) {
    console.error("Error generating proof:", error);
    throw new Error(`Failed to generate ZK proof: ${error.message}`);
  }
}
