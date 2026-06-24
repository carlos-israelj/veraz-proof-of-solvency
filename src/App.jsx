import { useState } from "react";
import { isConnected, setAllowed, getAddress } from "@stellar/freighter-api";
import { querySolvent, attest } from "./lib/stellar.js";
import { generateSolvencyProof } from "./lib/prover.js";

function Badge({ att }) {
  if (!att) return <p className="muted">Sin atestación todavía.</p>;
  return (
    <div className="card">
      <div className="badge-head">
        <span className={att.solvent ? "pill ok" : "pill bad"}>
          {att.solvent ? "Solvente" : "Insolvente"}
        </span>
      </div>
      <dl className="kv">
        <dt>Reservas (en vivo)</dt><dd className="num">{String(att.reserves)}</dd>
        <dt>Frescura</dt><dd className="num">ledger #{String(att.ledger_seq)}</dd>
        <dt>Última prueba</dt><dd className="num">{String(att.timestamp)}</dd>
        <dt>Pasivos (L)</dt><dd className="muted">ocultos · probado L ≤ reservas</dd>
      </dl>
    </div>
  );
}

function Publico() {
  const [contractId, setContractId] = useState("");
  const [att, setAtt] = useState(null);
  const [status, setStatus] = useState("");

  async function verificar() {
    setStatus("Consultando…");
    try {
      const r = await querySolvent(contractId.trim());
      setAtt(r);
      setStatus(r ? "" : "El contrato aún no tiene atestación.");
    } catch (e) {
      setStatus(`Error: ${e.message}`);
    }
  }

  return (
    <section>
      <p className="lead">Consulta verificable de la solvencia de un emisor.</p>
      <div className="row">
        <input value={contractId} onChange={(e) => setContractId(e.target.value)}
          placeholder="Contract ID del emisor (C…)" />
        <button onClick={verificar} disabled={!contractId}>Verificar</button>
      </div>
      {status && <p className="muted">{status}</p>}
      <Badge att={att} />
    </section>
  );
}

function Emisor() {
  const [address, setAddress] = useState(null);
  const [contractId, setContractId] = useState("");
  const [balances, setBalances] = useState("100000, 50000, 25000, 75000, 30000, 20000, 60000, 40000");
  const [ledgerSeq, setLedgerSeq] = useState("");
  const [status, setStatus] = useState("");

  async function conectar() {
    if (!(await isConnected())) { setStatus("Instala Freighter."); return; }
    await setAllowed();
    const { address } = await getAddress();
    setAddress(address);
  }

  async function atestar() {
    if (!address) { setStatus("Conecta tu wallet primero."); return; }
    setStatus("Generando prueba…");
    try {
      const bals = balances.split(/[\s,]+/).filter(Boolean);
      const salts = bals.map((_, i) => String(i + 1));
      const { publicInputs, proof } = await generateSolvencyProof({
        balances: bals,
        salts,
        ledgerSeq: Number(ledgerSeq) || 0,
      });
      setStatus("Atestando on-chain…");
      const { hash } = await attest({
        contractId: contractId.trim(), publicInputs, proof, sourceAddress: address,
      });
      setStatus(`Atestación enviada. Tx: ${hash}`);
    } catch (e) {
      setStatus(`Error: ${e.message}`);
    }
  }

  return (
    <section>
      <p className="lead">Genera la prueba de solvencia y publícala on-chain.</p>
      <div className="row">
        <button onClick={conectar}>{address ? `${address.slice(0,4)}…${address.slice(-4)}` : "Conectar Freighter"}</button>
      </div>
      <label>Contract ID (Capa 2)
        <input value={contractId} onChange={(e) => setContractId(e.target.value)} placeholder="C…" />
      </label>
      <label>Saldos de tenedores (libro de pasivos, privado)
        <textarea rows={3} value={balances} onChange={(e) => setBalances(e.target.value)} />
      </label>
      <label>Ledger sequence del snapshot
        <input value={ledgerSeq} onChange={(e) => setLedgerSeq(e.target.value)} placeholder="58204113" />
      </label>
      <button className="primary" onClick={atestar} disabled={!contractId}>Generar prueba y atestar</button>
      {status && <p className="muted">{status}</p>}
    </section>
  );
}

export default function App() {
  const [tab, setTab] = useState("publico");
  return (
    <main>
      <header>
        <h1>Veraz</h1>
        <p className="tag">Proof of solvency privado para emisores en Stellar</p>
      </header>
      <nav className="tabs">
        <button className={tab === "publico" ? "on" : ""} onClick={() => setTab("publico")}>Público</button>
        <button className={tab === "emisor" ? "on" : ""} onClick={() => setTab("emisor")}>Emisor</button>
      </nav>
      {tab === "publico" ? <Publico /> : <Emisor />}
      <footer>Verificado por contrato Soroban · BN254 / UltraHonk · testnet</footer>
    </main>
  );
}
