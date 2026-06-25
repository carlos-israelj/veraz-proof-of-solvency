// merkle.js — Merkle sum-tree idéntico al circuito Noir
//
// Usa std::hash::pedersen_hash de Barretenberg para producir el mismo
// root que calculará el circuito internamente durante la ejecución.
//
// Estructura del árbol (heap-indexed, N=8):
//   Hojas:   índices [N-1 .. 2N-2] = [7 .. 14]
//   Internos: índices [0 .. N-2]   = [0 .. 6]
//   Raíz:    índice 0

import { BarretenbergSync, Fr } from "@aztec/bb.js";

const N = 8;
const TREE_SIZE = 2 * N - 1; // 15

let bbSingleton = null;

async function getBB() {
  if (bbSingleton) return bbSingleton;

  // bb.js v3/v4 compatible: primero intenta initSingleton, luego new()
  try {
    if (typeof BarretenbergSync.initSingleton === "function") {
      bbSingleton = await BarretenbergSync.initSingleton();
    } else if (typeof BarretenbergSync.new === "function") {
      bbSingleton = await BarretenbergSync.new();
    } else {
      throw new Error("No se encontró método de inicialización en BarretenbergSync");
    }
  } catch (err) {
    throw new Error(`Error inicializando Barretenberg WASM: ${err.message}`);
  }

  // Verificar que pedersenHash está disponible
  if (typeof bbSingleton.pedersenHash !== "function") {
    throw new Error(
      "pedersenHash no está disponible en esta versión de @aztec/bb.js. " +
      "Verifica que tienes instalada la versión ^4.3.1."
    );
  }

  return bbSingleton;
}

/**
 * Calcula pedersen_hash([inputs...]) con índice 0.
 * Equivalente a std::hash::pedersen_hash en Noir.
 *
 * @param {BarretenbergSync} bb
 * @param {string[]} inputs  — valores en decimal o hex (con o sin 0x)
 * @returns {string}          — hash como decimal string (para pasar al circuito)
 */
function pedersenHash(bb, inputs) {
  const frInputs = inputs.map(x => {
    try {
      // Acepta decimal strings, hex strings y BigInts
      const val =
        typeof x === "bigint"
          ? x
          : typeof x === "string" && x.startsWith("0x")
          ? BigInt(x)
          : BigInt(x);
      return new Fr(val);
    } catch (err) {
      throw new Error(`No se pudo convertir "${x}" a Fr: ${err.message}`);
    }
  });

  const result = bb.pedersenHash(frInputs, 0);

  // Fr.toString() en bb.js puede devolver hex o decimal según la versión.
  // Normalizamos a decimal para que BigInt() funcione de forma consistente.
  const raw = result.toString();
  // Si bb.js devuelve hex (empieza con 0x) lo convertimos
  return raw.startsWith("0x") ? BigInt(raw).toString() : raw;
}

/** hash_leaf(balance, salt) — igual que el circuito */
function hashLeaf(bb, balance, salt) {
  return pedersenHash(bb, [balance.toString(), salt.toString()]);
}

/** hash_node(lh, ls, rh, rs) — igual que el circuito */
function hashNode(bb, lh, ls, rh, rs) {
  return pedersenHash(bb, [lh, ls, rh, rs]);
}

/**
 * Construye el Merkle sum-tree y devuelve root y totalSum.
 *
 * @param {string[]} balances — exactamente N valores en decimal
 * @param {string[]} salts    — exactamente N salts en decimal
 * @returns {Promise<{ root: string, totalSum: string }>}
 */
export async function buildMerkleTree(balances, salts) {
  if (balances.length !== N || salts.length !== N) {
    throw new Error(
      `buildMerkleTree requiere exactamente ${N} balances y ${N} salts. ` +
      `Recibidos: ${balances.length} balances, ${salts.length} salts.`
    );
  }

  const bb = await getBB();

  const nodeHash = new Array(TREE_SIZE).fill("0");
  const nodeSum  = new Array(TREE_SIZE).fill("0");

  // Hojas: índices [N-1 .. 2N-2]
  for (let i = 0; i < N; i++) {
    const idx = N - 1 + i; // 7,8,...,14
    nodeHash[idx] = hashLeaf(bb, balances[i], salts[i]);
    nodeSum[idx]  = balances[i].toString();
  }

  // Nodos internos: de abajo hacia arriba [N-2 .. 0] = [6 .. 0]
  for (let k = 0; k < N - 1; k++) {
    const i = (N - 2) - k; // 6,5,4,3,2,1,0
    const l = 2 * i + 1;
    const r = 2 * i + 2;

    nodeSum[i] = (BigInt(nodeSum[l]) + BigInt(nodeSum[r])).toString();
    nodeHash[i] = hashNode(
      bb,
      nodeHash[l], nodeSum[l],
      nodeHash[r], nodeSum[r]
    );
  }

  console.log("🌳 Merkle tree calculado:");
  console.log("  root     :", nodeHash[0]);
  console.log("  totalSum :", nodeSum[0]);

  return { root: nodeHash[0], totalSum: nodeSum[0] };
}
