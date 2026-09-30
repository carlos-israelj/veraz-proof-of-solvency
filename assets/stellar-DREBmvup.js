const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-DZxxsyfi.js","./index-DmqjSo9g.js","./index-CmOZt9DE.css"])))=>i.map(i=>d[i]);
import { N as R, R as O, C as A, T as v, B as T, A as _, _ as U, a as b, s as P, S as N, __tla as __tla_0 } from "./index-DmqjSo9g.js";
let M, p, $, k, x;
let __tla = Promise.all([
    (()=>{
        try {
            return __tla_0;
        } catch  {}
    })()
]).then(async ()=>{
    let l, V, q;
    p = {
        rpcUrl: "https://soroban-testnet.stellar.org",
        networkPassphrase: R.TESTNET
    };
    l = new O(p.rpcUrl);
    V = "GB6NVEN5HSUBKMYCE5ZOWSK5K23TBWRUQLZY3KNMXUZ3AQ2ESC4MY4AQ";
    q = {
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
        for (const [r, o] of Object.entries(q))if (e && e.includes(r)) return `❌ ${o}`;
        return null;
    }
    function m(e) {
        if (!(e instanceof Uint8Array)) throw new Error(`bytesToScVal expects Uint8Array, got ${typeof e}`);
        return N.scvBytes(e);
    }
    $ = async function() {
        return (await l.getLatestLedger()).sequence + 5;
    };
    x = async function(e) {
        try {
            console.log("[querySolvent] Iniciando consulta para contractId:", e);
            const r = new b(V, "0"), o = new A(e), w = new v(r, {
                fee: T,
                networkPassphrase: p.networkPassphrase
            }).addOperation(o.call("is_solvent")).setTimeout(30).build();
            console.log("[querySolvent] Simulando transacción...");
            const n = await l.simulateTransaction(w);
            if (console.log("[querySolvent] Resultado de simulación:", n), _.isSimulationError(n)) {
                console.error("[querySolvent] Error en simulación:", n.error);
                const f = y(n.error);
                throw new Error(f || `Simulación falló: ${n.error}`);
            }
            const d = n.result?.retval;
            if (console.log("[querySolvent] Valor de retorno:", d), !d) return null;
            const t = P(d);
            return console.log("[querySolvent] Resultado deserializado:", t), t;
        } catch (r) {
            throw console.error("[querySolvent] Error capturado:", r), r;
        }
    };
    M = async function({ contractId: e, publicInputs: r, proof: o, sourceAddress: w, signTransactionFn: n }) {
        if (!(r instanceof Uint8Array) || r.length !== 128) throw new Error(`Public inputs inválidos: se esperan exactamente 128 bytes (con reserve_addresses_hash), recibidos ${r?.length ?? "undefined"}. Verifica el formato del prover.`);
        if (!(o instanceof Uint8Array) || o.length === 0) throw new Error("Proof inválido: el proof está vacío o no es un Uint8Array.");
        o.length !== 14592 && console.warn(`⚠️ Proof size: ${o.length} bytes (esperados 14592 para UltraHonk). El verifier on-chain determinará si es válido.`), console.log("[attest] Preparing transaction..."), console.log(`  Public inputs length: ${r.length} bytes`), console.log(`  Proof length: ${o.length} bytes`), console.log(`  Contract ID: ${e}`);
        const d = await l.getAccount(w), t = new A(e), f = m(r), E = m(o);
        console.log("[attest] ScVal types:", {
            piType: f?.switch?.()?.name,
            proofType: E?.switch?.()?.name
        });
        let c = new v(d, {
            fee: T,
            networkPassphrase: p.networkPassphrase
        }).addOperation(t.call("attest", f, E)).setTimeout(60).build();
        const g = await l.simulateTransaction(c);
        if (_.isSimulationError(g)) {
            const i = y(g.error);
            throw new Error(i || `Simulación falló: ${g.error}`);
        }
        c = await l.prepareTransaction(c);
        const a = await n(c.toXdr()), S = v.fromXdr(a, p.networkPassphrase), s = await l.sendTransaction(S);
        if (s.status === "ERROR") {
            const i = y(JSON.stringify(s.errorResult));
            throw new Error(i || `Envío falló: ${JSON.stringify(s.errorResult)}`);
        }
        let u = await l.getTransaction(s.hash);
        for(; u.status === "NOT_FOUND";)await new Promise((i)=>setTimeout(i, 1e3)), u = await l.getTransaction(s.hash);
        if (u.status !== "SUCCESS") {
            const i = JSON.stringify(u), h = y(i);
            throw new Error(h || `Transacción falló: ${u.status}`);
        }
        return console.log("✅ Transacción confirmada on-chain:", s.hash), {
            hash: s.hash
        };
    };
    k = async function(e) {
        const o = 21888242871839275222246405745257275088548364400416034343698204186575808495617n;
        if (!e || e.length === 0) throw new Error("At least one reserve address is required");
        if (e.length > 5) throw new Error("Maximum 5 reserve addresses allowed");
        const { BarretenbergSync: w, Fr: n } = await U(async ()=>{
            const { BarretenbergSync: a, Fr: S } = await import("./index-DZxxsyfi.js").then(async (m)=>{
                await m.__tla;
                return m;
            });
            return {
                BarretenbergSync: a,
                Fr: S
            };
        }, __vite__mapDeps([0,1,2]), import.meta.url), d = await w.initSingleton(), t = [];
        for (const a of e){
            const s = new TextEncoder().encode(a), u = await crypto.subtle.digest("SHA-256", s), i = Array.from(new Uint8Array(u));
            let h = 0n;
            for (const C of i)h = h << 8n | BigInt(C);
            h = h % o, t.push(h.toString());
        }
        for(; t.length < 5;)t.push("0");
        const f = t.map((a)=>new n(BigInt(a))), E = d.poseidon2Hash(f);
        let c = 0n;
        for (const a of E.value)c = c << 8n | BigInt(a);
        const g = c.toString();
        return console.log("🔑 Poseidon2 hash computed:"), console.log("  Input addresses:", e), console.log("  Field elements:", t), console.log("  Poseidon2 hash:", g), {
            reserveAddressesHash: g,
            paddedAddresses: t
        };
    };
});
export { M as attest, p as config, $ as getCurrentLedgerSeq, k as hashReserveAddresses, x as querySolvent, __tla };
