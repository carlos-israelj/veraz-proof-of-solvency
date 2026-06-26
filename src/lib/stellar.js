// stellar.js - Integración con Stellar/Soroban
// - querySolvent  -> lectura por SIMULACIÓN (sin firmar): consulta el badge is_solvent
// - attest        -> escritura firmada: envía la prueba al contrato (Capa 2 attest)
// - getCurrentLedgerSeq -> obtiene el ledger sequence actual de la red

import * as StellarSdk from "@stellar/stellar-sdk";
import { signTransaction } from "@stellar/freighter-api";

export const config = {
  rpcUrl: "https://soroban-testnet.stellar.org",
  networkPassphrase: StellarSdk.Networks.TESTNET,
};

const rpc = new StellarSdk.rpc.Server(config.rpcUrl);

// Cuenta "dummy" para simular llamadas de solo lectura sin necesidad de firma.
// Esta es una cuenta válida con checksum correcto que se usa solo para simulaciones (no necesita existir en la red)
const READONLY_SOURCE =
  "GB6NVEN5HSUBKMYCE5ZOWSK5K23TBWRUQLZY3KNMXUZ3AQ2ESC4MY4AQ";

// Mapa de errores del contrato Solvency Policy a mensajes amigables
// IMPORTANTE: Estos códigos coinciden con la reorganización del backend (ver BACKEND_RESOLUTION.md)
const CONTRACT_ERRORS = {
  "Error(Contract, #1)": "El contrato ya fue inicializado.",
  "Error(Contract, #2)": "El contrato no ha sido inicializado.",
  "Error(Contract, #3)": "Public inputs con formato incorrecto. Deben ser exactamente 96 bytes.",
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

function bytesToScVal(bytes) {
  if (!(bytes instanceof Uint8Array)) {
    throw new Error(`bytesToScVal expects Uint8Array, got ${typeof bytes}`);
  }
  return StellarSdk.xdr.ScVal.scvBytes(bytes);
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
    const account = new StellarSdk.Account(READONLY_SOURCE, "0");
    const contract = new StellarSdk.Contract(contractId);

    const tx = new StellarSdk.TransactionBuilder(account, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: config.networkPassphrase,
    })
      .addOperation(contract.call("is_solvent"))
      .setTimeout(30)
      .build();

    console.log("[querySolvent] Simulando transacción...");
    const sim = await rpc.simulateTransaction(tx);
    console.log("[querySolvent] Resultado de simulación:", sim);

    if (StellarSdk.rpc.Api.isSimulationError(sim)) {
      console.error("[querySolvent] Error en simulación:", sim.error);
      const friendly = parseContractError(sim.error);
      throw new Error(friendly || `Simulación falló: ${sim.error}`);
    }
    const retval = sim.result?.retval;
    console.log("[querySolvent] Valor de retorno:", retval);
    if (!retval) return null;
    const result = StellarSdk.scValToNative(retval);
    console.log("[querySolvent] Resultado deserializado:", result);
    return result;
  } catch (error) {
    console.error("[querySolvent] Error capturado:", error);
    throw error;
  }
}

// Atestación: el emisor envía (public_inputs, proof) al contrato. Firma con Freighter.
export async function attest({ contractId, publicInputs, proof, sourceAddress }) {
  // Validaciones de formato antes de enviar a la blockchain
  if (!(publicInputs instanceof Uint8Array) || publicInputs.length !== 96) {
    throw new Error(
      `Public inputs inválidos: se esperan exactamente 96 bytes, recibidos ${publicInputs?.length ?? "undefined"}. Verifica el formato del prover.`
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

  const account = await rpc.getAccount(sourceAddress);
  const contract = new StellarSdk.Contract(contractId);

  let tx = new StellarSdk.TransactionBuilder(account, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase: config.networkPassphrase,
  })
    .addOperation(contract.call("attest", bytesToScVal(publicInputs), bytesToScVal(proof)))
    .setTimeout(60)
    .build();

  // Simular para estimar recursos y ensamblar.
  const sim = await rpc.simulateTransaction(tx);
  if (StellarSdk.rpc.Api.isSimulationError(sim)) {
    const friendly = parseContractError(sim.error);
    throw new Error(friendly || `Simulación falló: ${sim.error}`);
  }
  tx = StellarSdk.rpc.assembleTransaction(tx, sim).build();

  // Firmar con Freighter.
  const { signedTxXdr } = await signTransaction(tx.toXDR(), {
    networkPassphrase: config.networkPassphrase,
  });
  const signed = StellarSdk.TransactionBuilder.fromXDR(signedTxXdr, config.networkPassphrase);

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
