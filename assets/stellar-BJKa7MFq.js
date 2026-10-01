const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-BOJa9c7e.js","./index-VvyDmmil.js","./index-CmOZt9DE.css"])))=>i.map(i=>d[i]);
import { N as R, R as b, C as T, n as m, T as v, B as A, A as C, _ as O, a as P, s as N, __tla as __tla_0 } from "./index-VvyDmmil.js";
let $, S, B, M, X;
let __tla = Promise.all([
    (()=>{
        try {
            return __tla_0;
        } catch  {}
    })()
]).then(async ()=>{
    let l, U, V;
    S = {
        rpcUrl: "https://soroban-testnet.stellar.org",
        networkPassphrase: R.TESTNET
    };
    l = new b(S.rpcUrl);
    U = "GB6NVEN5HSUBKMYCE5ZOWSK5K23TBWRUQLZY3KNMXUZ3AQ2ESC4MY4AQ";
    V = {
        "Error(Contract, #1)": "El contrato ya fue inicializado.",
        "Error(Contract, #2)": "El contrato no ha sido inicializado.",
        "Error(Contract, #3)": "Public inputs con formato incorrecto. Deben ser exactamente 128 bytes (root + liabilities + ledger_seq + reserve_addresses_hash).",
        "Error(Contract, #4)": "Verificación ZK falló. La prueba fue rechazada por el verifier on-chain. Verifica que el circuito local coincida con el VK del contrato.",
        "Error(Contract, #10)": "Prueba obsoleta (StaleProof). El ledger_seq está fuera de la ventana de frescura (100 ledgers).",
        "Error(Contract, #11)": "Replay detectado. Ya se usó este ledger_seq. Espera al siguiente ledger.",
        "Error(Contract, #12)": "Insolvente: las reservas on-chain son menores que los pasivos probados.",
        "Error(Contract, #13)": "Overflow en la suma de pasivos o reservas."
    };
    function y(e) {
        for (const [r, o] of Object.entries(V))if (e && e.includes(r)) return `❌ ${o}`;
        return null;
    }
    B = async function() {
        return (await l.getLatestLedger()).sequence + 5;
    };
    X = async function(e) {
        try {
            console.log("[querySolvent] Iniciando consulta para contractId:", e);
            const r = new P(U, "0"), o = new T(e), E = new v(r, {
                fee: A,
                networkPassphrase: S.networkPassphrase
            }).addOperation(o.call("is_solvent")).setTimeout(30).build();
            console.log("[querySolvent] Simulando transacción...");
            const n = await l.simulateTransaction(E);
            if (console.log("[querySolvent] Resultado de simulación:", n), C.isSimulationError(n)) {
                console.error("[querySolvent] Error en simulación:", n.error);
                const u = y(n.error);
                throw new Error(u || `Simulación falló: ${n.error}`);
            }
            const d = n.result?.retval;
            if (console.log("[querySolvent] Valor de retorno:", d), !d) return null;
            const t = N(d);
            return console.log("[querySolvent] Resultado deserializado:", t), t;
        } catch (r) {
            throw console.error("[querySolvent] Error capturado:", r), r;
        }
    };
    $ = async function({ contractId: e, publicInputs: r, proof: o, sourceAddress: E, signTransactionFn: n }) {
        if (!(r instanceof Uint8Array) || r.length !== 128) throw new Error(`Public inputs inválidos: se esperan exactamente 128 bytes (con reserve_addresses_hash), recibidos ${r?.length ?? "undefined"}. Verifica el formato del prover.`);
        if (!(o instanceof Uint8Array) || o.length === 0) throw new Error("Proof inválido: el proof está vacío o no es un Uint8Array.");
        o.length !== 14592 && console.warn(`⚠️ Proof size: ${o.length} bytes (esperados 14592 para UltraHonk). El verifier on-chain determinará si es válido.`), console.log("[attest] Preparing transaction..."), console.log(`  Public inputs length: ${r.length} bytes`), console.log(`  Proof length: ${o.length} bytes`), console.log(`  Contract ID: ${e}`);
        const d = await l.getAccount(E), t = new T(e), u = m(r, {
            type: "bytes"
        }), w = m(o, {
            type: "bytes"
        });
        console.log("[attest] Created ScVal wrappers:", {
            piType: u?.constructor?.name,
            proofType: w?.constructor?.name,
            piHasToXdr: typeof u?.toXdrObject,
            proofHasToXdr: typeof w?.toXdrObject
        });
        let c = new v(d, {
            fee: A,
            networkPassphrase: S.networkPassphrase
        }).addOperation(t.call("attest", u, w)).setTimeout(60).build();
        const g = await l.simulateTransaction(c);
        if (C.isSimulationError(g)) {
            const i = y(g.error);
            throw new Error(i || `Simulación falló: ${g.error}`);
        }
        c = await l.prepareTransaction(c);
        const a = await n(c.toXdr()), p = v.fromXdr(a, S.networkPassphrase), s = await l.sendTransaction(p);
        if (s.status === "ERROR") {
            const i = y(JSON.stringify(s.errorResult));
            throw new Error(i || `Envío falló: ${JSON.stringify(s.errorResult)}`);
        }
        let h = await l.getTransaction(s.hash);
        for(; h.status === "NOT_FOUND";)await new Promise((i)=>setTimeout(i, 1e3)), h = await l.getTransaction(s.hash);
        if (h.status !== "SUCCESS") {
            const i = JSON.stringify(h), f = y(i);
            throw new Error(f || `Transacción falló: ${h.status}`);
        }
        return console.log("✅ Transacción confirmada on-chain:", s.hash), {
            hash: s.hash
        };
    };
    M = async function(e) {
        const o = 21888242871839275222246405745257275088548364400416034343698204186575808495617n;
        if (!e || e.length === 0) throw new Error("At least one reserve address is required");
        if (e.length > 5) throw new Error("Maximum 5 reserve addresses allowed");
        const { BarretenbergSync: E, Fr: n } = await O(async ()=>{
            const { BarretenbergSync: a, Fr: p } = await import("./index-BOJa9c7e.js").then(async (m)=>{
                await m.__tla;
                return m;
            });
            return {
                BarretenbergSync: a,
                Fr: p
            };
        }, __vite__mapDeps([0,1,2]), import.meta.url), d = await E.initSingleton(), t = [];
        for (const a of e){
            const s = new TextEncoder().encode(a), h = await crypto.subtle.digest("SHA-256", s), i = Array.from(new Uint8Array(h));
            let f = 0n;
            for (const _ of i)f = f << 8n | BigInt(_);
            f = f % o, t.push(f.toString());
        }
        for(; t.length < 5;)t.push("0");
        const u = t.map((a)=>new n(BigInt(a))), w = d.poseidon2Hash(u);
        let c = 0n;
        for (const a of w.value)c = c << 8n | BigInt(a);
        const g = c.toString();
        return console.log("🔑 Poseidon2 hash computed:"), console.log("  Input addresses:", e), console.log("  Field elements:", t), console.log("  Poseidon2 hash:", g), {
            reserveAddressesHash: g,
            paddedAddresses: t
        };
    };
});
export { $ as attest, S as config, B as getCurrentLedgerSeq, M as hashReserveAddresses, X as querySolvent, __tla };
