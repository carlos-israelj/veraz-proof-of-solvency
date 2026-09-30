// stellar.js - Integración con Stellar/Soroban
// - querySolvent  -> lectura por SIMULACIÓN (sin firmar): consulta el badge is_solvent
// - attest        -> escritura firmada: envía la prueba al contrato (Capa 2 attest)
// - getCurrentLedgerSeq -> obtiene el ledger sequence actual de la red

import {
  Account,
  Contract,
  TransactionBuilder,
  Networks,
  BASE_FEE,
  xdr,
  scValToNative,
} from "@stellar/stellar-sdk";
import { Server, Api } from "@stellar/stellar-sdk/rpc";

export const config = {
  rpcUrl: "https://soroban-testnet.stellar.org",
  networkPassphrase: Networks.TESTNET,
};

const rpc = new Server(config.rpcUrl);

// Cuenta "dummy" para simular llamadas de solo lectura sin necesidad de firma.
// Esta es una cuenta válida con checksum correcto que se usa solo para simulaciones (no necesita existir en la red)
const READONLY_SOURCE =
  "GB6NVEN5HSUBKMYCE5ZOWSK5K23TBWRUQLZY3KNMXUZ3AQ2ESC4MY4AQ";

// Mapa de errores del contrato Solvency Policy a mensajes amigables
// IMPORTANTE: Estos códigos coinciden con la reorganización del backend (ver BACKEND_RESOLUTION.md)
const CONTRACT_ERRORS = {
  "Error(Contract, #1)": "El contrato ya fue inicializado.",
  "Error(Contract, #2)": "El contrato no ha sido inicializado.",
  "Error(Contract, #3)": "Public inputs con formato incorrecto. Deben ser exactamente 128 bytes (root + liabilities + ledger_seq + reserve_addresses_hash).",
  "Error(Contract, #4)": "Verificación ZK falló. La prueba fue rechazada por el verifier on-chain. Verifica que el circuito local coincida con el VK del contrato.",
  "Error(Contract, #10)": "Prueba obsoleta (StaleProof). El ledger_seq está fuera de la ventana de frescura (100 ledgers).",
  "Error(Contract, #11)": "Replay detectado. Ya se usó este ledger_seq. Espera al siguiente ledger.",
  "Error(Contract, #12)": "Insolvente: las reservas on-chain son menores que los pasivos probados.",
  "Error(Contract, #13)": "Overflow en la suma de pasivos o reservas.",
};

function parseContractError(message) {
  for (const [code, friendly] of Object.entries(CONTRACT_ERRORS)) {
    if (message && message.includes(code)) {
      return `❌ ${friendly}`;
    }
  }
  return null;
}

/**
 * Obtiene el ledger sequence actual de la red Stellar Testnet.
 * @returns {Promise<number>} Ledger sequence actual
 */
export async function getCurrentLedgerSeq() {
  const latest = await rpc.getLatestLedger();
  // Sumar 5 (aprox 25 segs) para compensar el tiempo de generación de la prueba en el browser.
  // De esta manera, cuando la TX se envíe, el ledger_seq estará en el presente o futuro cercano,
  // pasando limpiamente la validación de frescura del contrato (freshness_window).
  return latest.sequence + 5;
}

// Lectura del badge público: simula is_solvent y devuelve la atestación nativa.
export async function querySolvent(contractId) {
  try {
    console.log("[querySolvent] Iniciando consulta para contractId:", contractId);
    const account = new Account(READONLY_SOURCE, "0");
    const contract = new Contract(contractId);

    const tx = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: config.networkPassphrase,
    })
      .addOperation(contract.call("is_solvent"))
      .setTimeout(30)
      .build();

    console.log("[querySolvent] Simulando transacción...");
    const sim = await rpc.simulateTransaction(tx);
    console.log("[querySolvent] Resultado de simulación:", sim);

    if (Api.isSimulationError(sim)) {
      console.error("[querySolvent] Error en simulación:", sim.error);
      const friendly = parseContractError(sim.error);
      throw new Error(friendly || `Simulación falló: ${sim.error}`);
    }
    const retval = sim.result?.retval;
    console.log("[querySolvent] Valor de retorno:", retval);
    if (!retval) return null;
    const result = scValToNative(retval);
    console.log("[querySolvent] Resultado deserializado:", result);
    return result;
  } catch (error) {
    console.error("[querySolvent] Error capturado:", error);
    throw error;
  }
}

// Atestación: el emisor envía (public_inputs, proof) al contrato. Firma con la wallet conectada.
export async function attest({ contractId, publicInputs, proof, sourceAddress, signTransactionFn }) {
  // Validaciones de formato antes de enviar a la blockchain
  // UPDATED: Changed from 96 to 128 bytes to support reserve_addresses_hash (4th public input)
  if (!(publicInputs instanceof Uint8Array) || publicInputs.length !== 128) {
    throw new Error(
      `Public inputs inválidos: se esperan exactamente 128 bytes (con reserve_addresses_hash), recibidos ${publicInputs?.length ?? "undefined"}. Verifica el formato del prover.`
    );
  }
  // El tamaño del proof depende de la versión de bb.js y el circuito — dejamos que el verifier lo valide
  if (!(proof instanceof Uint8Array) || proof.length === 0) {
    throw new Error(`Proof inválido: el proof está vacío o no es un Uint8Array.`);
  }
  if (proof.length !== 14592) {
    console.warn(
      `⚠️ Proof size: ${proof.length} bytes (esperados 14592 para UltraHonk). El verifier on-chain determinará si es válido.`
    );
  }

  console.log(`[attest] Preparing transaction...`);
  console.log(`  Public inputs length: ${publicInputs.length} bytes`);
  console.log(`  Proof length: ${proof.length} bytes`);
  console.log(`  Contract ID: ${contractId}`);

  const account = await rpc.getAccount(sourceAddress);
  const contract = new Contract(contractId);

  // Contract.call() in stellar-sdk v17 accepts native JS values directly
  // and converts them internally - no need for manual ScVal conversion
  console.log(`[attest] Passing bytes directly to contract.call()`);

  let tx = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: config.networkPassphrase,
  })
    .addOperation(contract.call("attest", publicInputs, proof))
    .setTimeout(60)
    .build();

  // Simular para estimar recursos y ensamblar.
  const sim = await rpc.simulateTransaction(tx);
  if (Api.isSimulationError(sim)) {
    const friendly = parseContractError(sim.error);
    throw new Error(friendly || `Simulación falló: ${sim.error}`);
  }
  tx = await rpc.prepareTransaction(tx);

  // Firmar con la wallet conectada (pasada como parámetro).
  const signedTxXdr = await signTransactionFn(tx.toXdr());
  const signed = TransactionBuilder.fromXdr(signedTxXdr, config.networkPassphrase);

  // Enviar y esperar confirmación.
  const sent = await rpc.sendTransaction(signed);
  if (sent.status === "ERROR") {
    const friendly = parseContractError(JSON.stringify(sent.errorResult));
    throw new Error(friendly || `Envío falló: ${JSON.stringify(sent.errorResult)}`);
  }

  let res = await rpc.getTransaction(sent.hash);
  while (res.status === "NOT_FOUND") {
    await new Promise((r) => setTimeout(r, 1000));
    res = await rpc.getTransaction(sent.hash);
  }
  if (res.status !== "SUCCESS") {
    const errStr = JSON.stringify(res);
    const friendly = parseContractError(errStr);
    throw new Error(friendly || `Transacción falló: ${res.status}`);
  }

  // No intentamos deserializar el returnValue porque Result<bool, Error> causa problemas
  // Si llegamos aquí, la transacción fue exitosa
  console.log("✅ Transacción confirmada on-chain:", sent.hash);
  return { hash: sent.hash };
}

/**
 * Hash reserve addresses using Pedersen hash (matching Noir circuit implementation)
 * CRITICAL: Must use the SAME hashing method as the circuit (std::hash::pedersen_hash)
 * Returns hash and padded addresses array for circuit input
 * @param {string[]} addresses - Array of Stellar addresses
 * @returns {Promise<{reserveAddressesHash: string, paddedAddresses: string[]}>}
 */
export async function hashReserveAddresses(addresses) {
  const MAX_RESERVE_ACCOUNTS = 5;
  // BN254 field modulus - all field elements must be less than this
  const BN254_MODULUS = 21888242871839275222246405745257275088548364400416034343698204186575808495617n;

  if (!addresses || addresses.length === 0) {
    throw new Error("At least one reserve address is required");
  }

  if (addresses.length > MAX_RESERVE_ACCOUNTS) {
    throw new Error(`Maximum ${MAX_RESERVE_ACCOUNTS} reserve addresses allowed`);
  }

  // Dynamically import Barretenberg for Pedersen hash
  const { BarretenbergSync, Fr } = await import("@aztec/bb.js");
  const api = await BarretenbergSync.initSingleton();

  // Convert Stellar addresses to field elements via SHA-256 (deterministic)
  const addrFields = [];
  for (const addr of addresses) {
    // Hash the address string to get a deterministic field element
    const encoder = new TextEncoder();
    const data = encoder.encode(addr);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // Convert hash to BigInt (field element)
    let fieldValue = 0n;
    for (const byte of hashArray) {
      fieldValue = (fieldValue << 8n) | BigInt(byte);
    }

    // CRITICAL: Reduce to BN254 field modulus
    fieldValue = fieldValue % BN254_MODULUS;

    addrFields.push(fieldValue.toString());
  }

  // Pad with zeros to MAX_RESERVE_ACCOUNTS (must match circuit's array size)
  while (addrFields.length < MAX_RESERVE_ACCOUNTS) {
    addrFields.push("0");
  }

  // CRITICAL: Compute Poseidon2 hash using Barretenberg (same as Noir circuit)
  // Circuit uses: Poseidon2::hash(reserve_addresses, MAX_RESERVE_ACCOUNTS)
  // This matches Soroban contract using poseidon2_hash (CAP-75 standard)
  const frArray = addrFields.map(f => new Fr(BigInt(f)));
  const hashResult = api.poseidon2Hash(frArray); // Poseidon2 hash

  // Convert Fr result to decimal string
  // Fr.value is a Uint8Array, convert it to BigInt using big-endian
  let hashBigInt = 0n;
  for (const byte of hashResult.value) {
    hashBigInt = (hashBigInt << 8n) | BigInt(byte);
  }
  const reserveAddressesHash = hashBigInt.toString();

  console.log("🔑 Poseidon2 hash computed:");
  console.log("  Input addresses:", addresses);
  console.log("  Field elements:", addrFields);
  console.log("  Poseidon2 hash:", reserveAddressesHash);

  return {
    reserveAddressesHash,
    paddedAddresses: addrFields,
  };
}
