const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-B8F1AVu4.js","./index-Bt1osp3T.js","./index-CmOZt9DE.css"])))=>i.map(i=>d[i]);
import { N as _, R as O, C as m, T as y, B as A, A as T, _ as U, a as N, s as b, S as P, __tla as __tla_0 } from "./index-Bt1osp3T.js";
let $, g, x, k, M;
let __tla = Promise.all([
    (()=>{
        try {
            return __tla_0;
        } catch  {}
    })()
]).then(async ()=>{
    let l, q, B;
    g = {
        rpcUrl: "https://soroban-testnet.stellar.org",
        networkPassphrase: _.TESTNET
    };
    l = new O(g.rpcUrl);
    q = "GB6NVEN5HSUBKMYCE5ZOWSK5K23TBWRUQLZY3KNMXUZ3AQ2ESC4MY4AQ";
    B = {
        "Error(Contract, #1)": "El contrato ya fue inicializado.",
        "Error(Contract, #2)": "El contrato no ha sido inicializado.",
        "Error(Contract, #3)": "Public inputs con formato incorrecto. Deben ser exactamente 128 bytes (root + liabilities + ledger_seq + reserve_addresses_hash).",
        "Error(Contract, #4)": "Verificación ZK falló. La prueba fue rechazada por el verifier on-chain. Verifica que el circuito local coincida con el VK del contrato.",
        "Error(Contract, #10)": "Prueba obsoleta (StaleProof). El ledger_seq está fuera de la ventana de frescura (100 ledgers).",
        "Error(Contract, #11)": "Replay detectado. Ya se usó este ledger_seq. Espera al siguiente ledger.",
        "Error(Contract, #12)": "Insolvente: las reservas on-chain son menores que los pasivos probados.",
        "Error(Contract, #13)": "Overflow en la suma de pasivos o reservas."
    };
    function w(e) {
        for (const [t, o] of Object.entries(B))if (e && e.includes(t)) return `❌ ${o}`;
        return null;
    }
    function v(e) {
        if (!(e instanceof Uint8Array)) throw new Error(`bytesToScVal expects Uint8Array, got ${typeof e}`);
        return P.scvBytes(e);
    }
    x = async function() {
        return (await l.getLatestLedger()).sequence + 5;
    };
    M = async function(e) {
        try {
            console.log("[querySolvent] Iniciando consulta para contractId:", e);
            const t = new N(q, "0"), o = new m(e), u = new y(t, {
                fee: A,
                networkPassphrase: g.networkPassphrase
            }).addOperation(o.call("is_solvent")).setTimeout(30).build();
            console.log("[querySolvent] Simulando transacción...");
            const a = await l.simulateTransaction(u);
            if (console.log("[querySolvent] Resultado de simulación:", a), T.isSimulationError(a)) {
                console.error("[querySolvent] Error en simulación:", a.error);
                const i = w(a.error);
                throw new Error(i || `Simulación falló: ${a.error}`);
            }
            const d = a.result?.retval;
            if (console.log("[querySolvent] Valor de retorno:", d), !d) return null;
            const n = b(d);
            return console.log("[querySolvent] Resultado deserializado:", n), n;
        } catch (t) {
            throw console.error("[querySolvent] Error capturado:", t), t;
        }
    };
    $ = async function({ contractId: e, publicInputs: t, proof: o, sourceAddress: u, signTransactionFn: a }) {
        if (!(t instanceof Uint8Array) || t.length !== 96) throw new Error(`Public inputs inválidos: se esperan exactamente 96 bytes, recibidos ${t?.length ?? "undefined"}. Verifica el formato del prover.`);
        if (!(o instanceof Uint8Array) || o.length === 0) throw new Error("Proof inválido: el proof está vacío o no es un Uint8Array.");
        o.length !== 14592 && console.warn(`⚠️ Proof size: ${o.length} bytes (esperados 14592 para UltraHonk). El verifier on-chain determinará si es válido.`);
        const d = await l.getAccount(u), n = new m(e);
        let i = new y(d, {
            fee: A,
            networkPassphrase: g.networkPassphrase
        }).addOperation(n.call("attest", v(t), v(o))).setTimeout(60).build();
        const f = await l.simulateTransaction(i);
        if (T.isSimulationError(f)) {
            const s = w(f.error);
            throw new Error(s || `Simulación falló: ${f.error}`);
        }
        i = await l.prepareTransaction(i);
        const p = await a(i.toXdr()), E = y.fromXdr(p, g.networkPassphrase), r = await l.sendTransaction(E);
        if (r.status === "ERROR") {
            const s = w(JSON.stringify(r.errorResult));
            throw new Error(s || `Envío falló: ${JSON.stringify(r.errorResult)}`);
        }
        let c = await l.getTransaction(r.hash);
        for(; c.status === "NOT_FOUND";)await new Promise((s)=>setTimeout(s, 1e3)), c = await l.getTransaction(r.hash);
        if (c.status !== "SUCCESS") {
            const s = JSON.stringify(c), S = w(s);
            throw new Error(S || `Transacción falló: ${c.status}`);
        }
        return console.log("✅ Transacción confirmada on-chain:", r.hash), {
            hash: r.hash
        };
    };
    k = async function(e) {
        const o = 21888242871839275222246405745257275088548364400416034343698204186575808495617n;
        if (!e || e.length === 0) throw new Error("At least one reserve address is required");
        if (e.length > 5) throw new Error("Maximum 5 reserve addresses allowed");
        const { BarretenbergSync: u, Fr: a } = await U(async ()=>{
            const { BarretenbergSync: r, Fr: c } = await import("./index-B8F1AVu4.js").then(async (m)=>{
                await m.__tla;
                return m;
            });
            return {
                BarretenbergSync: r,
                Fr: c
            };
        }, __vite__mapDeps([0,1,2]), import.meta.url), d = await u.initSingleton(), n = [];
        for (const r of e){
            const s = new TextEncoder().encode(r), S = await crypto.subtle.digest("SHA-256", s), R = Array.from(new Uint8Array(S));
            let h = 0n;
            for (const C of R)h = h << 8n | BigInt(C);
            h = h % o, n.push(h.toString());
        }
        for(; n.length < 5;)n.push("0");
        const i = n.map((r)=>new a(BigInt(r))), E = d.pedersenHash(i, 0).toBigInt().toString();
        return console.log("🔑 Pedersen hash computed:"), console.log("  Input addresses:", e), console.log("  Field elements:", n), console.log("  Pedersen hash:", E), {
            reserveAddressesHash: E,
            paddedAddresses: n
        };
    };
});
export { $ as attest, g as config, x as getCurrentLedgerSeq, k as hashReserveAddresses, M as querySolvent, __tla };
