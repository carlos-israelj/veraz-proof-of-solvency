// Generación de la prueba de solvencia (off-chain, en el navegador).
//
// Flujo real (requiere artefacto del circuito compilado + dependencias):
//   1. `nargo compile` en circuits/solvency  -> target/solvency.json
//   2. instalar: npm i @noir-lang/noir_js @aztec/bb.js
//   3. descomentar el bloque REAL y copiar el .json compilado a /public o importarlo.
//
// Mientras tanto, MOCK=true permite desarrollar la UI sin el toolchain.

const MOCK = true;

// import { Noir } from "@noir-lang/noir_js";
// import { UltraHonkBackend } from "@aztec/bb.js";
// import circuit from "../../public/solvency.json";

/**
 * @param {{ balances: string[], salts: string[], ledgerSeq: number, root: string, totalLiabilities: string }} inputs
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

  // --- BLOQUE REAL (descomentar cuando el circuito esté compilado) ---
  // const noir = new Noir(circuit);
  // const backend = new UltraHonkBackend(circuit.bytecode);
  // const { witness } = await noir.execute({
  //   root: inputs.root,
  //   total_liabilities: inputs.totalLiabilities,
  //   ledger_seq: inputs.ledgerSeq,
  //   balances: inputs.balances,
  //   salts: inputs.salts,
  // });
  // const { proof, publicInputs } = await backend.generateProof(witness);
  // return { proof, publicInputs: serializePublicInputs(publicInputs) };
}
