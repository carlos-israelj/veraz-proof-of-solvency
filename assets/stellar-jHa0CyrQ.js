const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-DCyEQYFz.js","./index-DgaNsiyb.js","./index-CmOZt9DE.css"])))=>i.map(i=>d[i]);
import { N as R, R as T, C as p, T as v, B as m, A, _ as b, a as O, s as P, __tla as __tla_0 } from "./index-DgaNsiyb.js";
let $, S, B, M, V;
let __tla = Promise.all([
    (()=>{
        try {
            return __tla_0;
        } catch  {}
    })()
]).then(async ()=>{
    let l, N, U;
    S = {
        rpcUrl: "https://soroban-testnet.stellar.org",
        networkPassphrase: R.TESTNET
    };
    l = new T(S.rpcUrl);
    N = "GB6NVEN5HSUBKMYCE5ZOWSK5K23TBWRUQLZY3KNMXUZ3AQ2ESC4MY4AQ";
    U = {
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
        for (const [t, o] of Object.entries(U))if (e && e.includes(t)) return `❌ ${o}`;
        return null;
    }
    B = async function() {
        return (await l.getLatestLedger()).sequence + 5;
    };
    V = async function(e) {
        try {
            console.log("[querySolvent] Iniciando consulta para contractId:", e);
            const t = new O(N, "0"), o = new p(e), u = new v(t, {
                fee: m,
                networkPassphrase: S.networkPassphrase
            }).addOperation(o.call("is_solvent")).setTimeout(30).build();
            console.log("[querySolvent] Simulando transacción...");
            const s = await l.simulateTransaction(u);
            if (console.log("[querySolvent] Resultado de simulación:", s), A.isSimulationError(s)) {
                console.error("[querySolvent] Error en simulación:", s.error);
                const i = w(s.error);
                throw new Error(i || `Simulación falló: ${s.error}`);
            }
            const d = s.result?.retval;
            if (console.log("[querySolvent] Valor de retorno:", d), !d) return null;
            const n = P(d);
            return console.log("[querySolvent] Resultado deserializado:", n), n;
        } catch (t) {
            throw console.error("[querySolvent] Error capturado:", t), t;
        }
    };
    $ = async function({ contractId: e, publicInputs: t, proof: o, sourceAddress: u, signTransactionFn: s }) {
        if (!(t instanceof Uint8Array) || t.length !== 128) throw new Error(`Public inputs inválidos: se esperan exactamente 128 bytes (con reserve_addresses_hash), recibidos ${t?.length ?? "undefined"}. Verifica el formato del prover.`);
        if (!(o instanceof Uint8Array) || o.length === 0) throw new Error("Proof inválido: el proof está vacío o no es un Uint8Array.");
        o.length !== 14592 && console.warn(`⚠️ Proof size: ${o.length} bytes (esperados 14592 para UltraHonk). El verifier on-chain determinará si es válido.`), console.log("[attest] Preparing transaction..."), console.log(`  Public inputs length: ${t.length} bytes`), console.log(`  Proof length: ${o.length} bytes`), console.log(`  Contract ID: ${e}`);
        const d = await l.getAccount(u), n = new p(e);
        console.log("[attest] Passing bytes directly to contract.call()");
        let i = new v(d, {
            fee: m,
            networkPassphrase: S.networkPassphrase
        }).addOperation(n.call("attest", t, o)).setTimeout(60).build();
        const h = await l.simulateTransaction(i);
        if (A.isSimulationError(h)) {
            const a = w(h.error);
            throw new Error(a || `Simulación falló: ${h.error}`);
        }
        i = await l.prepareTransaction(i);
        const f = await s(i.toXdr()), E = v.fromXdr(f, S.networkPassphrase), r = await l.sendTransaction(E);
        if (r.status === "ERROR") {
            const a = w(JSON.stringify(r.errorResult));
            throw new Error(a || `Envío falló: ${JSON.stringify(r.errorResult)}`);
        }
        let c = await l.getTransaction(r.hash);
        for(; c.status === "NOT_FOUND";)await new Promise((a)=>setTimeout(a, 1e3)), c = await l.getTransaction(r.hash);
        if (c.status !== "SUCCESS") {
            const a = JSON.stringify(c), y = w(a);
            throw new Error(y || `Transacción falló: ${c.status}`);
        }
        return console.log("✅ Transacción confirmada on-chain:", r.hash), {
            hash: r.hash
        };
    };
    M = async function(e) {
        const o = 21888242871839275222246405745257275088548364400416034343698204186575808495617n;
        if (!e || e.length === 0) throw new Error("At least one reserve address is required");
        if (e.length > 5) throw new Error("Maximum 5 reserve addresses allowed");
        const { BarretenbergSync: u, Fr: s } = await b(async ()=>{
            const { BarretenbergSync: r, Fr: c } = await import("./index-DCyEQYFz.js").then(async (m)=>{
                await m.__tla;
                return m;
            });
            return {
                BarretenbergSync: r,
                Fr: c
            };
        }, __vite__mapDeps([0,1,2]), import.meta.url), d = await u.initSingleton(), n = [];
        for (const r of e){
            const a = new TextEncoder().encode(r), y = await crypto.subtle.digest("SHA-256", a), _ = Array.from(new Uint8Array(y));
            let g = 0n;
            for (const C of _)g = g << 8n | BigInt(C);
            g = g % o, n.push(g.toString());
        }
        for(; n.length < 5;)n.push("0");
        const i = n.map((r)=>new s(BigInt(r))), h = d.poseidon2Hash(i);
        let f = 0n;
        for (const r of h.value)f = f << 8n | BigInt(r);
        const E = f.toString();
        return console.log("🔑 Poseidon2 hash computed:"), console.log("  Input addresses:", e), console.log("  Field elements:", n), console.log("  Poseidon2 hash:", E), {
            reserveAddressesHash: E,
            paddedAddresses: n
        };
    };
});
export { $ as attest, S as config, B as getCurrentLedgerSeq, M as hashReserveAddresses, V as querySolvent, __tla };
