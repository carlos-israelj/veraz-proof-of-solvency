const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-CN-L86ny.js","./index-DLCSQN-i.js","./index-CmOZt9DE.css"])))=>i.map(i=>d[i]);
import { N as B, R as b, C as A, n as T, T as v, B as C, A as _, _ as O, a as P, s as N, __tla as __tla_0 } from "./index-DLCSQN-i.js";
let L, y, X, M, $;
let __tla = Promise.all([
    (()=>{
        try {
            return __tla_0;
        } catch  {}
    })()
]).then(async ()=>{
    let l, U, V;
    y = {
        rpcUrl: "https://soroban-testnet.stellar.org",
        networkPassphrase: B.TESTNET
    };
    l = new b(y.rpcUrl);
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
    function w(e) {
        for (const [r, o] of Object.entries(V))if (e && e.includes(r)) return `❌ ${o}`;
        return null;
    }
    X = async function() {
        return (await l.getLatestLedger()).sequence + 5;
    };
    $ = async function(e) {
        try {
            console.log("[querySolvent] Iniciando consulta para contractId:", e);
            const r = new P(U, "0"), o = new A(e), p = new v(r, {
                fee: C,
                networkPassphrase: y.networkPassphrase
            }).addOperation(o.call("is_solvent")).setTimeout(30).build();
            console.log("[querySolvent] Simulando transacción...");
            const a = await l.simulateTransaction(p);
            if (console.log("[querySolvent] Resultado de simulación:", a), _.isSimulationError(a)) {
                console.error("[querySolvent] Error en simulación:", a.error);
                const f = w(a.error);
                throw new Error(f || `Simulación falló: ${a.error}`);
            }
            const d = a.result?.retval;
            if (console.log("[querySolvent] Valor de retorno:", d), !d) return null;
            const n = N(d);
            return console.log("[querySolvent] Resultado deserializado:", n), n;
        } catch (r) {
            throw console.error("[querySolvent] Error capturado:", r), r;
        }
    };
    L = async function({ contractId: e, publicInputs: r, proof: o, sourceAddress: p, signTransactionFn: a }) {
        if (!(r instanceof Uint8Array) || r.length !== 128) throw new Error(`Public inputs inválidos: se esperan exactamente 128 bytes (con reserve_addresses_hash), recibidos ${r?.length ?? "undefined"}. Verifica el formato del prover.`);
        if (!(o instanceof Uint8Array) || o.length === 0) throw new Error("Proof inválido: el proof está vacío o no es un Uint8Array.");
        o.length !== 14592 && console.warn(`⚠️ Proof size: ${o.length} bytes (esperados 14592 para UltraHonk). El verifier on-chain determinará si es válido.`), console.log("[attest] Preparing transaction..."), console.log(`  Public inputs length: ${r.length} bytes`), console.log(`  Proof length: ${o.length} bytes`), console.log(`  Contract ID: ${e}`);
        const d = await l.getAccount(p), n = new A(e), f = Buffer.from(r), E = Buffer.from(o);
        console.log("[attest] Created Buffers:", {
            piLength: f.length,
            proofLength: E.length,
            piIsBuffer: Buffer.isBuffer(f),
            proofIsBuffer: Buffer.isBuffer(E)
        });
        const u = T(f, {
            type: "bytes"
        }), h = T(E, {
            type: "bytes"
        });
        console.log("[attest] Created ScVal wrappers:", {
            piType: u?.constructor?.name,
            proofType: h?.constructor?.name,
            piHasToXdr: typeof u?.toXdrObject,
            proofHasToXdr: typeof h?.toXdrObject
        });
        let t = new v(d, {
            fee: C,
            networkPassphrase: y.networkPassphrase
        }).addOperation(n.call("attest", u, h)).setTimeout(60).build();
        const g = await l.simulateTransaction(t);
        if (_.isSimulationError(g)) {
            const c = w(g.error);
            throw new Error(c || `Simulación falló: ${g.error}`);
        }
        t = await l.prepareTransaction(t);
        const S = await a(t.toXdr()), m = v.fromXdr(S, y.networkPassphrase), i = await l.sendTransaction(m);
        if (i.status === "ERROR") {
            const c = w(JSON.stringify(i.errorResult));
            throw new Error(c || `Envío falló: ${JSON.stringify(i.errorResult)}`);
        }
        let s = await l.getTransaction(i.hash);
        for(; s.status === "NOT_FOUND";)await new Promise((c)=>setTimeout(c, 1e3)), s = await l.getTransaction(i.hash);
        if (s.status !== "SUCCESS") {
            const c = JSON.stringify(s), R = w(c);
            throw new Error(R || `Transacción falló: ${s.status}`);
        }
        return console.log("✅ Transacción confirmada on-chain:", i.hash), {
            hash: i.hash
        };
    };
    M = async function(e) {
        const o = 21888242871839275222246405745257275088548364400416034343698204186575808495617n;
        if (!e || e.length === 0) throw new Error("At least one reserve address is required");
        if (e.length > 5) throw new Error("Maximum 5 reserve addresses allowed");
        const { BarretenbergSync: p, Fr: a } = await O(async ()=>{
            const { BarretenbergSync: t, Fr: g } = await import("./index-CN-L86ny.js").then(async (m)=>{
                await m.__tla;
                return m;
            });
            return {
                BarretenbergSync: t,
                Fr: g
            };
        }, __vite__mapDeps([0,1,2]), import.meta.url), d = await p.initSingleton(), n = [];
        for (const t of e){
            const S = new TextEncoder().encode(t), m = await crypto.subtle.digest("SHA-256", S), i = Array.from(new Uint8Array(m));
            let s = 0n;
            for (const c of i)s = s << 8n | BigInt(c);
            s = s % o, n.push(s.toString());
        }
        for(; n.length < 5;)n.push("0");
        const f = n.map((t)=>new a(BigInt(t))), E = d.poseidon2Hash(f);
        let u = 0n;
        for (const t of E.value)u = u << 8n | BigInt(t);
        const h = u.toString();
        return console.log("🔑 Poseidon2 hash computed:"), console.log("  Input addresses:", e), console.log("  Field elements:", n), console.log("  Poseidon2 hash:", h), {
            reserveAddressesHash: h,
            paddedAddresses: n
        };
    };
});
export { L as attest, y as config, X as getCurrentLedgerSeq, M as hashReserveAddresses, $ as querySolvent, __tla };
