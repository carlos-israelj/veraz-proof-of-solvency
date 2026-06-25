import { useState, useEffect, useCallback } from "react";
import { isConnected, setAllowed, getAddress } from "@stellar/freighter-api";
import { querySolvent, attest, getCurrentLedgerSeq } from "./lib/stellar.js";

const DEFAULT_CONTRACT = "CBONF5V5BZDHNVYRB5YEW2W2OQ7GNIS4M3CVQMUTMWACZFGD6RVY636U";
const N = 8; // holders que soporta el circuito

// ── Utilidades ─────────────────────────────────────────────────────────
function toHex(bytes) {
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

function timeAgo(unixTs) {
  const min = Math.floor((Date.now() / 1000 - Number(unixTs)) / 60);
  if (min < 1) return "ahora mismo";
  if (min < 60) return `hace ${min} min`;
  return `hace ${Math.floor(min / 60)}h ${min % 60}min`;
}

// ── Componente: Badge de solvencia ─────────────────────────────────────
function Badge({ att, loading }) {
  if (loading) {
    return (
      <div className="badge-loading">
        <span className="spinner" /> Consultando la red...
      </div>
    );
  }
  if (!att) {
    return (
      <div className="badge-empty">
        <span className="badge-icon">🔍</span>
        <p>Este contrato aún no tiene atestación publicada.</p>
      </div>
    );
  }
  return (
    <div className="badge-card">
      <div className="badge-status">
        <span className={att.solvent ? "pill ok" : "pill bad"}>
          {att.solvent ? "✅ Solvente" : "❌ Insolvente"}
        </span>
        <span className="badge-age">{timeAgo(att.timestamp)}</span>
      </div>
      <dl className="kv">
        <dt>Reservas verificadas (on-chain)</dt>
        <dd className="num">{Number(att.reserves).toLocaleString()}</dd>
        <dt>Pasivos (L)</dt>
        <dd className="private">🔒 Ocultos — probado L ≤ R</dd>
        <dt>Snapshot</dt>
        <dd className="num">Ledger #{String(att.ledger_seq)}</dd>
      </dl>
    </div>
  );
}

// ── Tab: Público ────────────────────────────────────────────────────────
function Publico() {
  const [contractId, setContractId] = useState(DEFAULT_CONTRACT);
  const [att, setAtt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const verificar = useCallback(async (id) => {
    setLoading(true);
    setStatus("");
    setAtt(null);
    try {
      const r = await querySolvent(id.trim());
      setAtt(r);
      if (!r) setStatus("Este contrato aún no tiene atestación.");
    } catch (e) {
      setStatus(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-consultar al cargar
  useEffect(() => { verificar(DEFAULT_CONTRACT); }, [verificar]);

  return (
    <section>
      <p className="lead">
        Verifica criptográficamente si un emisor tiene reservas suficientes para cubrir sus pasivos.
      </p>

      <Badge att={att} loading={loading} />

      {status && <p className="status-msg error">{status}</p>}

      <button className="link-btn" onClick={() => setShowAdvanced(v => !v)}>
        {showAdvanced ? "▲ Ocultar" : "▼ Consultar otro emisor"}
      </button>

      {showAdvanced && (
        <div className="advanced-box">
          <label>Contract ID del emisor
            <div className="row">
              <input
                value={contractId}
                onChange={e => setContractId(e.target.value)}
                placeholder="C…"
              />
              <button onClick={() => verificar(contractId)} disabled={!contractId}>
                Verificar
              </button>
            </div>
          </label>
        </div>
      )}
    </section>
  );
}

// ── Componentes de progreso ─────────────────────────────────────────────
const STEPS = [
  "Calcular Merkle tree",
  "Generar prueba ZK (10–30s)",
  "Firmar en Freighter",
  "Confirmado ✓",
];

function StepList({ current }) {
  if (current < 0) return null;
  return (
    <div className="steps">
      {STEPS.map((label, i) => {
        const cls = i < current ? "done" : i === current ? "active" : "";
        return (
          <div key={i} className={`step-item ${cls}`}>
            <span className="step-dot">{i < current ? "✓" : i + 1}</span>
            <span>{label}</span>
          </div>
        );
      })}
    </div>
  );
}

function ProgressBar({ active, value }) {
  if (!active) return null;
  return (
    <div className="progress-wrap">
      <div className="progress-bar" style={{ width: `${value}%` }} />
    </div>
  );
}

// ── Tab: Emisor ─────────────────────────────────────────────────────────
function Emisor() {
  const [address, setAddress] = useState(null);
  const [balances, setBalances] = useState(
    "100000, 50000, 25000, 75000, 30000, 20000, 60000, 40000"
  );
  const [status, setStatus] = useState("");
  const [step, setStep] = useState(-1);
  const [txHash, setTxHash] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [contractId, setContractId] = useState(DEFAULT_CONTRACT);

  // Parsear balances en tiempo real
  const balList = balances.split(/[\s,]+/).filter(Boolean);
  const count = balList.length;
  const walletReady = !!address;
  const balancesReady = count === N;
  const allReady = walletReady && balancesReady && contractId;

  // Porcentaje para la barra de progreso
  const progressPct = step < 0 ? 0 : Math.round(((step + 1) / STEPS.length) * 100);

  async function conectar() {
    try {
      if (!(await isConnected())) {
        setStatus("⚠️ Instala la extensión Freighter en tu navegador.");
        return;
      }
      await setAllowed();
      const { address: addr } = await getAddress();
      setAddress(addr);
      setStatus("");
    } catch (e) {
      setStatus(`Error conectando wallet: ${e.message}`);
    }
  }

  async function atestar() {
    setTxHash(null);
    setDebugInfo(null);
    setStatus("Iniciando...");
    setStep(0);

    try {
      // Import lazy para no cargar WASM al arrancar la app
      const { generateSolvencyProof } = await import("./lib/prover.js");

      const salts = balList.map((_, i) => String(i + 1));
      const ledgerSeq = await getCurrentLedgerSeq();

      setStatus("Calculando árbol de compromisos Merkle...");
      // step 0 ya está activo, la generación del tree ocurre dentro del prover

      setStep(1);
      setStatus("Generando prueba ZK (esto puede tardar 10–30 segundos)…");

      const { proof, publicInputs } = await generateSolvencyProof({
        balances: balList,
        salts,
        ledgerSeq,
      });

      // Guardar info de debug
      setDebugInfo({
        proof_bytes: proof.length,
        public_inputs_bytes: publicInputs.length,
        ledger_seq: ledgerSeq,
        total_liabilities: balList.reduce((a, b) => a + BigInt(b), 0n).toString(),
        balances_count: balList.length,
        pi_hex: {
          root: toHex(publicInputs.slice(0, 32)),
          L_field: toHex(publicInputs.slice(32, 64)),
          seq_field: toHex(publicInputs.slice(64, 96)),
        },
      });

      setStep(2);
      setStatus("Firma la transacción en Freighter...");

      const { hash } = await attest({
        contractId: contractId.trim(),
        publicInputs,
        proof,
        sourceAddress: address,
      });

      setStep(3);
      setTxHash(hash);
      setStatus("");
    } catch (e) {
      setStatus(e.message);
      setStep(-1);
    }
  }

  return (
    <section>
      <p className="lead">
        Genera la prueba criptográfica que demuestra tu solvencia sin revelar los saldos individuales.
      </p>

      {/* ── Paso 1: Wallet ─────────────────────────────────────────── */}
      <div className="form-step">
        <div className={`step-num ${walletReady ? "done" : ""}`}>
          {walletReady ? "✓" : "1"}
        </div>
        <div className="step-content">
          <h3>Conectar wallet</h3>
          {walletReady ? (
            <span className="pill ok small">
              {address.slice(0, 5)}…{address.slice(-5)}
            </span>
          ) : (
            <button className="primary" onClick={conectar}>
              Conectar Freighter
            </button>
          )}
        </div>
      </div>

      {/* ── Paso 2: Pasivos ────────────────────────────────────────── */}
      <div className="form-step">
        <div className={`step-num ${balancesReady ? "done" : ""}`}>
          {balancesReady ? "✓" : "2"}
        </div>
        <div className="step-content">
          <h3>
            Pasivos de tus tenedores{" "}
            <span className={`counter ${count === N ? "ok" : count > N ? "bad" : ""}`}>
              {count}/{N}
            </span>
          </h3>
          <p className="step-desc">
            Ingresa los saldos de tus {N} tenedores. Estos datos son <strong>privados</strong> —
            la prueba ZK demuestra que la suma ≤ reservas sin revelar ningún valor individual.
          </p>
          <textarea
            rows={3}
            value={balances}
            onChange={e => setBalances(e.target.value)}
            placeholder={`${N} valores separados por coma:\n100000, 50000, 25000, 75000, 30000, 20000, 60000, 40000`}
          />
          {count > 0 && count !== N && (
            <small className="muted warn">
              {count < N
                ? `⚠️ Faltan ${N - count} valor${N - count > 1 ? "es" : ""}`
                : `⚠️ Sobran ${count - N} valor${count - N > 1 ? "es" : ""} — el circuito acepta exactamente ${N}`}
            </small>
          )}
        </div>
      </div>

      {/* ── Paso 3: Generar y publicar ─────────────────────────────── */}
      <div className="form-step">
        <div className="step-num">3</div>
        <div className="step-content">
          <h3>Generar y publicar on-chain</h3>
          <p className="step-desc">
            El sistema generará la prueba ZK y la enviará al contrato Soroban.
            Necesitarás firmar una transacción en Freighter.
          </p>
          <button
            className="primary big"
            onClick={atestar}
            disabled={!allReady || step >= 0}
          >
            {!walletReady
              ? "Conecta tu wallet primero"
              : !balancesReady
              ? `Necesitas exactamente ${N} balances`
              : step >= 0 && step < 3
              ? "Generando prueba..."
              : "Generar prueba y publicar →"}
          </button>
        </div>
      </div>

      {/* ── Progreso ───────────────────────────────────────────────── */}
      <ProgressBar active={step >= 0 && step < 3} value={progressPct} />
      <StepList current={step} />

      {/* ── Status ─────────────────────────────────────────────────── */}
      {status && (
        <p className={`status-msg ${status.startsWith("⚠️") || status.startsWith("❌") || status.includes("Error") ? "error" : ""}`}>
          {status}
        </p>
      )}

      {/* ── Éxito ──────────────────────────────────────────────────── */}
      {txHash && (
        <div className="card tx-card">
          <p className="tx-title">✅ Atestación publicada en Stellar testnet</p>
          <a
            href={`https://stellar.expert/explorer/testnet/tx/${txHash}`}
            target="_blank"
            rel="noreferrer"
          >
            Ver transacción en Stellar Expert ↗
          </a>
          <code className="tx-hash">{txHash}</code>
        </div>
      )}

      {/* ── Configuración avanzada ─────────────────────────────────── */}
      <button className="link-btn" onClick={() => setShowAdvanced(v => !v)}>
        {showAdvanced ? "▲ Ocultar configuración avanzada" : "▼ Configuración avanzada"}
      </button>

      {showAdvanced && (
        <div className="advanced-box">
          <label>
            Contract ID (Solvency Policy)
            <input
              value={contractId}
              onChange={e => setContractId(e.target.value)}
              placeholder="C…"
            />
          </label>

          {debugInfo && (
            <details className="debug-panel">
              <summary>🔍 Debug: public inputs & proof</summary>
              <pre className="debug-pre">{JSON.stringify(debugInfo, null, 2)}</pre>
            </details>
          )}
        </div>
      )}
    </section>
  );
}

// ── App root ────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("publico");
  return (
    <main>
      <header>
        <h1>Veraz</h1>
        <p className="tag">Proof of solvency privado · Stellar · UltraHonk ZK</p>
      </header>
      <nav className="tabs">
        <button
          className={tab === "publico" ? "on" : ""}
          onClick={() => setTab("publico")}
        >
          🔍 Verificar solvencia
        </button>
        <button
          className={tab === "emisor" ? "on" : ""}
          onClick={() => setTab("emisor")}
        >
          🔐 Publicar prueba
        </button>
      </nav>
      {tab === "publico" ? <Publico /> : <Emisor />}
      <footer>
        Verificado por contrato Soroban ·{" "}
        <a
          href={`https://stellar.expert/explorer/testnet/contract/${DEFAULT_CONTRACT}`}
          target="_blank"
          rel="noreferrer"
        >
          Ver contrato ↗
        </a>
      </footer>
    </main>
  );
}
