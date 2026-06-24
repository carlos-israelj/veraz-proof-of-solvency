// Integración con Stellar/Soroban (patrones de la skill `dapp`).
// - `querySolvent`  -> lectura por SIMULACIÓN (sin firmar): consulta el badge `is_solvent`.
// - `attest`        -> escritura firmada: envía la prueba al contrato (Capa 2 `attest`).

import * as StellarSdk from "@stellar/stellar-sdk";
import { signTransaction } from "@stellar/freighter-api";

export const config = {
  rpcUrl: "https://soroban-testnet.stellar.org",
  networkPassphrase: StellarSdk.Networks.TESTNET,
};

const rpc = new StellarSdk.rpc.Server(config.rpcUrl);

// Cuenta "dummy" para simular llamadas de solo lectura sin necesidad de firma.
const READONLY_SOURCE =
  "GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF5";

function bytesToScVal(bytes) {
  // Ensure bytes is a Uint8Array
  if (!(bytes instanceof Uint8Array)) {
    throw new Error(`bytesToScVal expects Uint8Array, got ${typeof bytes}`);
  }

  console.log("Converting bytes to ScVal, length:", bytes.length);
  console.log("First 32 bytes:", Array.from(bytes.slice(0, 32)).map(b => b.toString(16).padStart(2, '0')).join(''));

  // Stellar SDK accepts Uint8Array directly, no need for Buffer
  return StellarSdk.xdr.ScVal.scvBytes(bytes);
}

// Lectura del badge público: simula `is_solvent` y devuelve la atestación nativa.
export async function querySolvent(contractId) {
  const account = new StellarSdk.Account(READONLY_SOURCE, "0");
  const contract = new StellarSdk.Contract(contractId);

  const tx = new StellarSdk.TransactionBuilder(account, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase: config.networkPassphrase,
  })
    .addOperation(contract.call("is_solvent"))
    .setTimeout(30)
    .build();

  const sim = await rpc.simulateTransaction(tx);
  if (StellarSdk.rpc.Api.isSimulationError(sim)) {
    throw new Error(`Simulación falló: ${sim.error}`);
  }
  const retval = sim.result?.retval;
  if (!retval) return null;
  return StellarSdk.scValToNative(retval); // { solvent, reserves, ledger_seq, timestamp } | null
}

// Atestación: el emisor envía (public_inputs, proof) al contrato. Firma con Freighter.
export async function attest({ contractId, publicInputs, proof, sourceAddress }) {
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
    throw new Error(`Simulación falló: ${sim.error}`);
  }
  tx = StellarSdk.rpc.assembleTransaction(tx, sim).build();

  // Firmar con Freighter.
  const { signedTxXdr } = await signTransaction(tx.toXDR(), {
    networkPassphrase: config.networkPassphrase,
  });
  const signed = StellarSdk.TransactionBuilder.fromXDR(signedTxXdr, config.networkPassphrase);

  // Enviar y esperar confirmación.
  const sent = await rpc.sendTransaction(signed);
  if (sent.status === "ERROR") throw new Error(`Envío falló: ${JSON.stringify(sent.errorResult)}`);

  let res = await rpc.getTransaction(sent.hash);
  while (res.status === "NOT_FOUND") {
    await new Promise((r) => setTimeout(r, 1000));
    res = await rpc.getTransaction(sent.hash);
  }
  if (res.status !== "SUCCESS") throw new Error(`Transacción falló: ${res.status}`);
  return { hash: sent.hash, returnValue: res.returnValue };
}
