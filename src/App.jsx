import { useState, useEffect, useCallback } from "react";
import { isConnected, setAllowed, getAddress } from "@stellar/freighter-api";
import { querySolvent, attest, getCurrentLedgerSeq } from "./lib/stellar.js";

const DEFAULT_CONTRACT = "CBONF5V5BZDHNVYRB5YEW2W2OQ7GNIS4M3CVQMUTMWACZFGD6RVY636U";
const N = 8; // Holders que soporta el circuito

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

// ── Componente: Certificado de Solvencia (Auditor) ──────────────────────
function SolvencyCertificate({ att }) {
  if (!att) return null;
  const isSolvent = att.solvent;

  return (
    <div className="glass-panel certificate-card">
      <div className={`cert-header ${isSolvent ? "" : "insolvent"}`}>
        <div className="cert-icon">{isSolvent ? "🛡️" : "⚠️"}</div>
        <h2 style={{ color: isSolvent ? "var(--brand-emerald)" : "var(--brand-red)" }}>
          {isSolvent ? "Certificado de Solvencia" : "Alerta de Insolvencia"}
        </h2>
        <p className="muted" style={{ marginTop: "0.5rem" }}>
          Verificado criptográficamente en la red Soroban
        </p>
      </div>
      
      <div className="cert-body">
        <dl className="cert-kv">
          <div className="cert-kv-item">
            <dt>Reservas On-Chain (XLM)</dt>
            <dd>{Number(att.reserves).toLocaleString()}</dd>
          </div>
          <div className="cert-kv-item">
            <dt>Pasivos Probados (ZK Proof)</dt>
            <dd style={{ color: "var(--brand-cyan)" }}>
              🔒 Verificado: Pasivos ≤ Reservas
            </dd>
          </div>
          <div className="cert-kv-item">
            <dt>Auditoría (Ledger Seq)</dt>
            <dd className="mono">#{String(att.ledger_seq)} <span className="muted text-sm">({timeAgo(att.timestamp)})</span></dd>
          </div>
        </dl>
        
        <details className="crypto-details">
          <summary>Ver Detalles Criptográficos</summary>
          <pre className="crypto-pre">
            Contrato Verifier: ZK UltraHonk{`\n`}
            Snapshot Timestamp: {new Date(Number(att.timestamp) * 1000).toISOString()}{`\n`}
            Reservas crudas: {att.reserves.toString()}
          </pre>
        </details>
      </div>
    </div>
  );
}

// ── Vista: Auditor Journey ──────────────────────────────────────────────
function AuditorJourney({ onBack }) {
  const [contractId, setContractId] = useState(DEFAULT_CONTRACT);
  const [att, setAtt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const verificar = async () => {
    if (!contractId) return;
    setLoading(true);
    setError("");
    setAtt(null);
    try {
      const r = await querySolvent(contractId.trim());
      if (r) {
        setAtt(r);
      } else {
        setError("Este contrato aún no tiene una atestación ZK publicada.");
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Auto-verificar si hay un contrato por defecto
  useEffect(() => { verificar(); }, []);

  return (
    <section>
      <div className="view-header">
        <button className="btn-back" onClick={onBack}>← Volver</button>
      </div>
      
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2>Auditoría Criptográfica</h2>
        <p className="muted">Verifica matemáticamente que un emisor no opera con reserva fraccionaria.</p>
      </div>

      <div className="search-container">
        <input
          className="search-input"
          value={contractId}
          onChange={e => setContractId(e.target.value)}
          placeholder="Ingresa el Contract ID del Emisor..."
        />
        <button className="btn-primary" onClick={verificar} disabled={loading || !contractId}>
          {loading ? "Buscando..." : "Auditar"}
        </button>
      </div>

      {error && <div className="alert error">{error}</div>}
      
      {loading && !error && (
        <div style={{ textAlign: "center", color: "var(--brand-cyan)", marginTop: "2rem" }}>
          <span className="spinner" style={{ borderColor: "var(--border-subtle)", borderTopColor: "var(--brand-cyan)" }} /> Analizando red...
        </div>
      )}

      {!loading && att && <SolvencyCertificate att={att} />}
    </section>
  );
}

// ── Loader ZK Interactivo ───────────────────────────────────────────────
function ZKLoader({ stepIndex }) {
  const messages = [
    "Descargando circuito WASM...",
    "Construyendo Árbol de Merkle con saldos ocultos...",
    "Generando Prueba ZK (UltraHonk) - Puede tomar 10~30s...",
    "Alistando transacción para enviar a Soroban..."
  ];

  const currentMsg = messages[Math.min(stepIndex, messages.length - 1)];

  return (
    <div className="glass-panel zk-loader">
      <div className="scanner-box">
        <div className="scanner-line"></div>
      </div>
      <h4>Computación ZK en Progreso</h4>
      <p>{currentMsg}</p>
    </div>
  );
}

// ── Vista: Issuer Wizard (Emisor) ───────────────────────────────────────
function IssuerWizard({ onBack }) {
  const [address, setAddress] = useState(null);
  const [balances, setBalances] = useState("100000, 50000, 25000, 75000, 30000, 20000, 60000, 40000");
  const [contractId, setContractId] = useState(DEFAULT_CONTRACT);
  
  // Estado del Wizard: 0 = Wallet, 1 = Inputs, 2 = Generating, 3 = Done
  const [step, setStep] = useState(0);
  const [zkProgress, setZkProgress] = useState(0);
  const [txHash, setTxHash] = useState(null);
  const [error, setError] = useState("");

  const balList = balances.split(/[\s,]+/).filter(Boolean);
  const count = balList.length;

  async function conectar() {
    try {
      if (!(await isConnected())) {
        setError("Instala la extensión Freighter en tu navegador.");
        return;
      }
      await setAllowed();
      const { address: addr } = await getAddress();
      setAddress(addr);
      setError("");
      setStep(1); // Mover al siguiente paso
    } catch (e) {
      setError(`Error conectando wallet: ${e.message}`);
    }
  }

  async function generarPrueba() {
    setError("");
    setStep(2); // Entra a modo de carga
    setZkProgress(0);

    try {
      setZkProgress(1); // Merkle tree
      const { generateSolvencyProof } = await import("./lib/prover.js");
      const salts = balList.map((_, i) => String(i + 1));
      const ledgerSeq = await getCurrentLedgerSeq();

      setZkProgress(2); // Proving
      const { proof, publicInputs } = await generateSolvencyProof({
        balances: balList,
        salts,
        ledgerSeq,
      });

      setZkProgress(3); // Signing
      const { hash } = await attest({
        contractId: contractId.trim(),
        publicInputs,
        proof,
        sourceAddress: address,
      });

      setTxHash(hash);
      setStep(3); // Hecho
    } catch (e) {
      setError(e.message);
      setStep(1); // Regresar al formulario
    }
  }

  return (
    <section>
      <div className="view-header">
        <button className="btn-back" onClick={onBack}>← Volver</button>
      </div>

      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2>Emisión de Solvencia</h2>
        <p className="muted">Genera una prueba ZK de tus pasivos sin revelar la identidad ni los montos de tus clientes.</p>
      </div>

      {error && <div className="alert error" style={{ marginBottom: "1.5rem" }}>{error}</div>}

      <div className="wizard-container">
        {/* Step 1: Wallet */}
        {step < 2 && (
          <div className={`glass-panel wizard-step ${step === 0 ? "active" : step > 0 ? "completed" : ""}`}>
            <div className="wizard-step-header">
              <div className="step-circle">{step > 0 ? "✓" : "1"}</div>
              <h3>Conectar Identidad</h3>
            </div>
            {step === 0 ? (
              <button className="btn-primary" onClick={conectar}>Conectar Freighter</button>
            ) : (
              <p className="mono text-sm text-gradient">{address}</p>
            )}
          </div>
        )}

        {/* Step 2: Inputs */}
        {step === 1 && (
          <div className="glass-panel wizard-step active">
            <div className="wizard-step-header">
              <div className="step-circle">2</div>
              <h3>Ingresar Pasivos Privados</h3>
            </div>
            <p className="text-sm muted" style={{ marginBottom: "1rem" }}>
              Ingresa los saldos de los clientes. El circuito criptográfico ocultará esta información permanentemente.
            </p>
            <textarea
              className="textarea-premium"
              value={balances}
              onChange={e => setBalances(e.target.value)}
              placeholder="10000, 20000, ..."
            />
            <div className="counters">
              <div className={`counter-pill ${count === N ? "ok" : "err"}`}>
                {count}/{N} Inputs Requeridos
              </div>
            </div>
            <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem", flexDirection: "column" }}>
              <input 
                className="search-input" 
                style={{ padding: "0.75rem", fontSize: "0.85rem" }}
                value={contractId} 
                onChange={e => setContractId(e.target.value)} 
                placeholder="Contract ID de Destino" 
              />
              <button 
                className="btn-primary" 
                onClick={generarPrueba}
                disabled={count !== N || !contractId}
              >
                Generar Prueba Criptográfica →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Generación ZK */}
        {step === 2 && <ZKLoader stepIndex={zkProgress} />}

        {/* Step 4: Éxito */}
        {step === 3 && txHash && (
          <div className="glass-panel certificate-card" style={{ marginTop: 0 }}>
            <div className="cert-header">
              <div className="cert-icon">🚀</div>
              <h2 style={{ color: "var(--brand-emerald)" }}>Prueba Aceptada</h2>
              <p className="muted" style={{ marginTop: "0.5rem" }}>
                La red de Soroban ha verificado y aceptado tu prueba de solvencia.
              </p>
            </div>
            <div className="cert-body" style={{ textAlign: "center" }}>
              <p className="text-sm muted" style={{ marginBottom: "1rem" }}>Hash de la transacción:</p>
              <a 
                href={`https://stellar.expert/explorer/testnet/tx/${txHash}`} 
                target="_blank" 
                rel="noreferrer"
                className="mono text-sm"
                style={{ color: "var(--brand-cyan)", textDecoration: "none", wordBreak: "break-all" }}
              >
                {txHash} ↗
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ── App root ────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("landing"); // 'landing', 'auditor', 'issuer'

  return (
    <main>
      <header>
        <h1 className="text-gradient">Veraz</h1>
        <p className="tag">Auditoría criptográfica con Zero-Knowledge en Stellar</p>
      </header>

      {view === "landing" && (
        <div className="journey-grid">
          <div className="glass-panel glass-panel-interactive journey-card" onClick={() => setView("auditor")}>
            <div className="journey-icon">🔍</div>
            <h2>Auditar Exchange</h2>
            <p>Verifica matemáticamente que las reservas cubren todos los pasivos sin comprometer privacidad.</p>
          </div>

          <div className="glass-panel glass-panel-interactive journey-card" onClick={() => setView("issuer")}>
            <div className="journey-icon">🔐</div>
            <h2>Probar Solvencia</h2>
            <p>Genera una prueba criptográfica local que asegura a tus clientes que sus fondos están íntegros.</p>
          </div>
        </div>
      )}

      {view === "auditor" && <AuditorJourney onBack={() => setView("landing")} />}
      
      {view === "issuer" && <IssuerWizard onBack={() => setView("landing")} />}

      {view === "landing" && (
        <footer>
          Diseñado con tecnología Noir & Soroban
        </footer>
      )}
    </main>
  );
}
