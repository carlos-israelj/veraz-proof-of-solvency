import { Buffer } from "buffer";
import { Address } from "@stellar/stellar-sdk";
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  MethodOptions,
  Result,
  Spec as ContractSpec,
} from "@stellar/stellar-sdk/contract";
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Timepoint,
  Duration,
} from "@stellar/stellar-sdk/contract";
export * from "@stellar/stellar-sdk";
export * as contract from "@stellar/stellar-sdk/contract";
export * as rpc from "@stellar/stellar-sdk/rpc";

if (typeof window !== "undefined") {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}


export const networks = {
  testnet: {
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CC7IZENRRA5ME5JA4V773HYK57DGBHVWQCHZXIFYGXQPOOWENDNGXUVB",
  }
} as const

export const Errors = {
  1: {message:"AlreadyInitialized"},
  2: {message:"NotInitialized"},
  3: {message:"BadPublicInputs"},
  10: {message:"StaleProof"},
  11: {message:"Replay"},
  12: {message:"Insolvent"},
  13: {message:"Overflow"}
}


export interface Config {
  aquarius_pools: Array<string>;
  freshness_window: u32;
  reserve_accounts: Array<string>;
  reserve_sac: string;
  verifier: string;
}

export type DataKey = {tag: "Config", values: void} | {tag: "LastSeq", values: void} | {tag: "Attestation", values: void};


export interface Attestation {
  aquarius_balance: i128;
  ledger_seq: u32;
  liabilities: i128;
  reserves: i128;
  sac_balance: i128;
  solvent: boolean;
  timestamp: u64;
}

export interface Client {
  /**
   * Construct and simulate a attest transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Verifica una prueba de pasivos y actualiza la atestación.
   * 
   * # Flujo:
   * 1. Parsear public_inputs → extraer L y ledger_seq
   * 2. Validar frescura + anti-replay
   * 3. Verificar prueba ZK (cross-contract a Capa 1)
   * 4. Leer reservas R en vivo del ledger
   * 5. Comprobar R ≥ L
   * 6. Persistir atestación
   * 
   * # Nota sobre verificación:
   * En producción, llamaría al verifier (Capa 1) vía:
   * verifier::Client::new(&env, &cfg.verifier).verify_proof(&public_inputs, &proof)
   * 
   * Para el MVP sin verifier desplegado, se SIMULA la verificación.
   * TODO: Integrar con rs-soroban-ultrahonk cuando esté desplegado.
   */
  attest: ({public_inputs, proof}: {public_inputs: Buffer, proof: Buffer}, options?: MethodOptions) => Promise<AssembledTransaction<Result<boolean>>>

  /**
   * Construct and simulate a get_config transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Obtener configuración (útil para debugging)
   */
  get_config: (options?: MethodOptions) => Promise<AssembledTransaction<Option<Config>>>

  /**
   * Construct and simulate a initialize transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Inicializa la configuración del emisor.
   * Solo puede llamarse una vez.
   */
  initialize: ({config}: {config: Config}, options?: MethodOptions) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a is_solvent transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Consulta pública del badge de solvencia (Capa 3).
   * Lee por simulación sin firmar.
   */
  is_solvent: (options?: MethodOptions) => Promise<AssembledTransaction<Option<Attestation>>>

}
export class Client extends ContractClient {
  static async deploy<T = Client>(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options: MethodOptions &
      Omit<ContractClientOptions, "contractId"> & {
        /** The hash of the Wasm blob, which must already be installed on-chain. */
        wasmHash: Buffer | string;
        /** Salt used to generate the contract's ID. Passed through to {@link Operation.createCustomContract}. Default: random. */
        salt?: Buffer | Uint8Array;
        /** The format used to decode `wasmHash`, if it's provided as a string. */
        format?: "hex" | "base64";
      }
  ): Promise<AssembledTransaction<T>> {
    return ContractClient.deploy(null, options)
  }
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAAAAAkRWZXJpZmljYSB1bmEgcHJ1ZWJhIGRlIHBhc2l2b3MgeSBhY3R1YWxpemEgbGEgYXRlc3RhY2nDs24uCgojIEZsdWpvOgoxLiBQYXJzZWFyIHB1YmxpY19pbnB1dHMg4oaSIGV4dHJhZXIgTCB5IGxlZGdlcl9zZXEKMi4gVmFsaWRhciBmcmVzY3VyYSArIGFudGktcmVwbGF5CjMuIFZlcmlmaWNhciBwcnVlYmEgWksgKGNyb3NzLWNvbnRyYWN0IGEgQ2FwYSAxKQo0LiBMZWVyIHJlc2VydmFzIFIgZW4gdml2byBkZWwgbGVkZ2VyCjUuIENvbXByb2JhciBSIOKJpSBMCjYuIFBlcnNpc3RpciBhdGVzdGFjacOzbgoKIyBOb3RhIHNvYnJlIHZlcmlmaWNhY2nDs246CkVuIHByb2R1Y2Npw7NuLCBsbGFtYXLDrWEgYWwgdmVyaWZpZXIgKENhcGEgMSkgdsOtYToKdmVyaWZpZXI6OkNsaWVudDo6bmV3KCZlbnYsICZjZmcudmVyaWZpZXIpLnZlcmlmeV9wcm9vZigmcHVibGljX2lucHV0cywgJnByb29mKQoKUGFyYSBlbCBNVlAgc2luIHZlcmlmaWVyIGRlc3BsZWdhZG8sIHNlIFNJTVVMQSBsYSB2ZXJpZmljYWNpw7NuLgpUT0RPOiBJbnRlZ3JhciBjb24gcnMtc29yb2Jhbi11bHRyYWhvbmsgY3VhbmRvIGVzdMOpIGRlc3BsZWdhZG8uAAAABmF0dGVzdAAAAAAAAgAAAAAAAAANcHVibGljX2lucHV0cwAAAAAAAA4AAAAAAAAABXByb29mAAAAAAAADgAAAAEAAAPpAAAAAQAAAAM=",
        "AAAABAAAAAAAAAAAAAAABUVycm9yAAAAAAAABwAAAAAAAAASQWxyZWFkeUluaXRpYWxpemVkAAAAAAABAAAAAAAAAA5Ob3RJbml0aWFsaXplZAAAAAAAAgAAAAAAAAAPQmFkUHVibGljSW5wdXRzAAAAAAMAAAAAAAAAClN0YWxlUHJvb2YAAAAAAAoAAAAAAAAABlJlcGxheQAAAAAACwAAAAAAAAAJSW5zb2x2ZW50AAAAAAAADAAAAAAAAAAIT3ZlcmZsb3cAAAAN",
        "AAAAAQAAAAAAAAAAAAAABkNvbmZpZwAAAAAABQAAAAAAAAAOYXF1YXJpdXNfcG9vbHMAAAAAA+oAAAATAAAAAAAAABBmcmVzaG5lc3Nfd2luZG93AAAABAAAAAAAAAAQcmVzZXJ2ZV9hY2NvdW50cwAAA+oAAAATAAAAAAAAAAtyZXNlcnZlX3NhYwAAAAATAAAAAAAAAAh2ZXJpZmllcgAAABM=",
        "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAAAwAAAAAAAAAAAAAABkNvbmZpZwAAAAAAAAAAAAAAAAAHTGFzdFNlcQAAAAAAAAAAAAAAAAtBdHRlc3RhdGlvbgA=",
        "AAAAAAAAAC1PYnRlbmVyIGNvbmZpZ3VyYWNpw7NuICjDunRpbCBwYXJhIGRlYnVnZ2luZykAAAAAAAAKZ2V0X2NvbmZpZwAAAAAAAAAAAAEAAAPoAAAH0AAAAAZDb25maWcAAA==",
        "AAAAAAAAAEVJbmljaWFsaXphIGxhIGNvbmZpZ3VyYWNpw7NuIGRlbCBlbWlzb3IuClNvbG8gcHVlZGUgbGxhbWFyc2UgdW5hIHZlei4AAAAAAAAKaW5pdGlhbGl6ZQAAAAAAAQAAAAAAAAAGY29uZmlnAAAAAAfQAAAABkNvbmZpZwAAAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
        "AAAAAAAAAFJDb25zdWx0YSBww7pibGljYSBkZWwgYmFkZ2UgZGUgc29sdmVuY2lhIChDYXBhIDMpLgpMZWUgcG9yIHNpbXVsYWNpw7NuIHNpbiBmaXJtYXIuAAAAAAAKaXNfc29sdmVudAAAAAAAAAAAAAEAAAPoAAAH0AAAAAtBdHRlc3RhdGlvbgA=",
        "AAAAAQAAAAAAAAAAAAAAC0F0dGVzdGF0aW9uAAAAAAcAAAAAAAAAEGFxdWFyaXVzX2JhbGFuY2UAAAALAAAAAAAAAApsZWRnZXJfc2VxAAAAAAAEAAAAAAAAAAtsaWFiaWxpdGllcwAAAAALAAAAAAAAAAhyZXNlcnZlcwAAAAsAAAAAAAAAC3NhY19iYWxhbmNlAAAAAAsAAAAAAAAAB3NvbHZlbnQAAAAAAQAAAAAAAAAJdGltZXN0YW1wAAAAAAAABg==" ]),
      options
    )
  }
  public readonly fromJSON = {
    attest: this.txFromJSON<Result<boolean>>,
        get_config: this.txFromJSON<Option<Config>>,
        initialize: this.txFromJSON<Result<void>>,
        is_solvent: this.txFromJSON<Option<Attestation>>
  }
}