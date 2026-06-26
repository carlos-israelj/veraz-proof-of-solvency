// prover.js — Generación de prueba ZK off-chain (en el navegador)
//
// Circuito: Merkle-sum-tree con Pedersen hash (Noir/UltraHonk)
// Backend:  UltraHonkBackend de @aztec/bb.js
//
// Formato de public_inputs que espera el contrato Soroban (96 bytes):
//   [0..32]  = root         (32 bytes, field element BE)
//   [32..48] = 0x00×16      (padding del i128)
//   [48..64] = L (liabilities) como i128 BE (16 bytes útiles)
//   [64..92] = 0x00×28      (padding del u32)
//   [92..96] = ledger_seq   como u32 BE (4 bytes útiles)

import { Noir } from "@noir-lang/noir_js";
import { UltraHonkBackend } from "@aztec/bb.js";
import circuit from "../solvency.json";

const N = 8; // debe coincidir con el circuito

/**
 * Genera una prueba ZK de solvencia.
 * @param {{ balances: string[], salts: string[], ledgerSeq: number }} inputs
 * @returns {Promise<{ publicInputs: Uint8Array, proof: Uint8Array }>}
 */
export async function generateSolvencyProof({ balances, salts, ledgerSeq }) {
  if (balances.length !== N) {
    throw new Error(
      `El circuito requiere exactamente ${N} balances. Recibidos: ${balances.length}.`
    );
  }

  // ── 1. Calcular Merkle tree en JS (mismo algoritmo que el circuito) ──
  console.log("🌳 Calculando Merkle sum-tree...");
  const { buildMerkleTree } = await import("./merkle.js");
  const { root, totalSum } = await buildMerkleTree(balances, salts);
  console.log("  root:", root);
  console.log("  totalSum:", totalSum);

  // ── 2. Ejecutar el circuito para obtener el witness ──────────────────
  const circuitInputs = {
    root,
    total_liabilities: totalSum,
    ledger_seq: String(ledgerSeq),
    balances,
    salts,
  };

  console.log("⚙️  Ejecutando circuito Noir...");
  const noir = new Noir(circuit);
  let witness;
  try {
    ({ witness } = await noir.execute(circuitInputs));
  } catch (err) {
    throw new Error(
      `El circuito rechazó los inputs (root o total incorrecto): ${err.message}`
    );
  }

  // ── 3. Generar prueba UltraHonk con Keccak (compatible con verifier on-chain) ──
  console.log("🔐 Generando prueba UltraHonk con Keccak (10–30s)...");
  const backend = new UltraHonkBackend(circuit.bytecode);
  const { proof, publicInputs: rawPI } = await backend.generateProof(witness, { keccak: true });

  console.log("  proof.length:", proof.length);
  console.log("  publicInputs raw type:", rawPI?.constructor?.name, "length:", rawPI?.length);

  // ── 4. Formatear public_inputs al layout exacto del contrato ─────────
  const publicInputs = formatPublicInputsForSoroban(rawPI, root, totalSum, ledgerSeq);

  // ── 5. Validar antes de enviar ───────────────────────────────────────
  if (publicInputs.length !== 96) {
    throw new Error(
      `Public inputs tienen ${publicInputs.length} bytes, se esperan 96.`
    );
  }

  logPublicInputs(publicInputs);

  return {
    proof: new Uint8Array(proof),
    publicInputs,
  };
}

// ── Helpers ────────────────────────────────────────────────────────────

/**
 * Convierte los publicInputs que devuelve bb.js al formato de 96 bytes
 * que espera el contrato Soroban:
 *
 *   [0..32]  root         (32 bytes, campo BN254 BE)
 *   [32..64] L            (32 bytes: 16 ceros + i128 BE de 16 bytes)
 *   [64..96] ledger_seq   (32 bytes: 28 ceros + u32 BE de 4 bytes)
 *
 * El contrato toma los bytes[48..64] para L y bytes[92..96] para seq.
 * Esto coincide con la serialización de 32-byte field elements big-endian
 * que devuelve bb.js, siempre que los valores quepan en i128 y u32.
 */
function formatPublicInputsForSoroban(rawPI, root, totalSum, ledgerSeq) {
  // Intentar usar los publicInputs de bb.js directamente
  if (rawPI instanceof Uint8Array && rawPI.length >= 96) {
    console.log("✅ public_inputs: usando los 96 bytes de bb.js directamente");
    return rawPI.slice(0, 96);
  }

  // bb.js v4 puede devolver un Array de hex strings o de Fr
  if (Array.isArray(rawPI) && rawPI.length >= 3) {
    console.log("ℹ️  public_inputs: convirtiendo array de fields a 96 bytes");
    const out = new Uint8Array(96);
    rawPI.slice(0, 3).forEach((field, i) => {
      const hex = fieldToHex64(field);
      for (let j = 0; j < 32; j++) {
        out[i * 32 + j] = parseInt(hex.slice(j * 2, j * 2 + 2), 16);
      }
    });
    return out;
  }

  // Fallback: construir manualmente desde los valores conocidos
  console.warn("⚠️  public_inputs: construyendo manualmente desde root/L/seq");
  return buildPublicInputsManually(root, totalSum, ledgerSeq);
}

/**
 * Construcción manual de 96 bytes cuando bb.js no los devuelve bien.
 * Layout:
 *   [0..32]  root como field element BE (32 bytes)
 *   [32..64] L como i128 BE, con 16 bytes de padding al inicio
 *   [64..96] ledger_seq como u32 BE, con 28 bytes de padding al inicio
 */
function buildPublicInputsManually(root, totalSum, ledgerSeq) {
  const out = new Uint8Array(96);

  // root (32 bytes)
  const rootHex = fieldToHex64(root);
  for (let i = 0; i < 32; i++) {
    out[i] = parseInt(rootHex.slice(i * 2, i * 2 + 2), 16);
  }

  // L (i128 big-endian en bytes[48..64])
  const L = BigInt(totalSum);
  for (let i = 0; i < 16; i++) {
    out[48 + i] = Number((L >> BigInt((15 - i) * 8)) & 0xffn);
  }

  // ledger_seq (u32 big-endian en bytes[92..96])
  const seq = Number(ledgerSeq);
  out[92] = (seq >>> 24) & 0xff;
  out[93] = (seq >>> 16) & 0xff;
  out[94] = (seq >>> 8) & 0xff;
  out[95] = seq & 0xff;

  return out;
}

/** Convierte un field element (string decimal, hex, Fr, o BigInt) a hex de 64 chars */
function fieldToHex64(field) {
  let value;
  if (typeof field === "string") {
    value = field.startsWith("0x") ? BigInt(field) : BigInt(field);
  } else if (typeof field === "bigint") {
    value = field;
  } else if (field && typeof field.toBigInt === "function") {
    value = field.toBigInt();
  } else if (field && typeof field.toString === "function") {
    const s = field.toString();
    value = s.startsWith("0x") ? BigInt(s) : BigInt(s);
  } else {
    value = 0n;
  }
  return value.toString(16).padStart(64, "0");
}

function logPublicInputs(pi) {
  const rootHex = Array.from(pi.slice(0, 32)).map(b => b.toString(16).padStart(2, "0")).join("");
  const LBytes = pi.slice(48, 64);
  const seqBytes = pi.slice(92, 96);

  let L = 0n;
  for (const b of LBytes) L = (L << 8n) | BigInt(b);
  const seq = (seqBytes[0] << 24) | (seqBytes[1] << 16) | (seqBytes[2] << 8) | seqBytes[3];

  console.log("📦 Public inputs formateados (96 bytes):");
  console.log(`  root (bytes 0-31):        0x${rootHex.slice(0, 16)}…`);
  console.log(`  L    (bytes 48-63):       ${L}`);
  console.log(`  seq  (bytes 92-95):       ${seq}`);
}
