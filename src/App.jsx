import { useState, useEffect, useCallback } from "react";
import { isConnected, setAllowed, getAddress } from "@stellar/freighter-api";
import { querySolvent, attest, getCurrentLedgerSeq } from "./lib/stellar.js";
import { t } from "./locales.js";
import { startTour } from "./lib/tours.js";

const DEFAULT_CONTRACT = "CBUGYVTOHYNXI7MOLPSQCPZRAF6NSRHIVOROZQVAB23DJVYIUE6REJK7";
const N = 8; // Holders que soporta el circuito

// ── Utilidades ─────────────────────────────────────────────────────────
function toHex(bytes) {
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

function timeAgo(unixTs) {
  const min = Math.floor((Date.now() / 1000 - Number(unixTs)) / 60);
  if (min < 1) return "just now";
  if (min < 60) return `${min} min ago`;
  return `${Math.floor(min / 60)}h ${min % 60}min ago`;
}

// ── Componente: Modal de Error ─────────────────────────────────────────
function ErrorModal({ error, onClose, lang }) {
  if (!error) return null;
  const btnText = lang === "es" ? "Cerrar" : "Close";
  const titleText = lang === "es" ? "Operación Fallida" : "Operation Failed";
  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-icon">❌</div>
        <h3>{titleText}</h3>
        <p>{error}</p>
        <button className="btn-primary" onClick={onClose}>{btnText}</button>
      </div>
    </div>
  );
}

// ── Componente: Certificado de Solvencia (Auditor) ──────────────────────
function SolvencyCertificate({ att, lang }) {
  if (!att) return null;
  const isSolvent = att.solvent;
  const str = t[lang];

  return (
    <div className="glass-panel certificate-card">
      <div className={`cert-header ${isSolvent ? "" : "insolvent"}`}>
        <div className="cert-icon">{isSolvent ? "🛡️" : "⚠️"}</div>
        <h2 style={{ color: isSolvent ? "var(--brand-emerald)" : "var(--brand-red)" }}>
          {isSolvent ? str.certSolvent : str.certInsolvent}
        </h2>
        <p className="muted" style={{ marginTop: "0.5rem" }}>
          {str.certSub}
        </p>
      </div>
      
      <div className="cert-body">
        <dl className="cert-kv">
          <div className="cert-kv-item">
            <dt>{str.reservesLabel}</dt>
            <dd>{Number(att.reserves).toLocaleString()}</dd>
          </div>
          <div className="cert-kv-item">
            <dt>{str.liabilitiesLabel}</dt>
            <dd style={{ color: "var(--brand-cyan)" }}>
              {str.verifiedBadge}
            </dd>
          </div>
          <div className="cert-kv-item">
            <dt>{str.auditLabel}</dt>
            <dd className="mono">#{String(att.ledger_seq)} <span className="muted text-sm">({timeAgo(att.timestamp)})</span></dd>
          </div>
        </dl>
        
        <details className="crypto-details">
          <summary>{str.viewCryptoDetails}</summary>
          <pre className="crypto-pre">
            Verifier Contract: ZK UltraHonk{`\n`}
            Snapshot Timestamp: {new Date(Number(att.timestamp) * 1000).toISOString()}{`\n`}
            Raw Reserves: {att.reserves.toString()}
          </pre>
        </details>
      </div>
    </div>
  );
}

// ── Vista: Auditor Journey ──────────────────────────────────────────────
function AuditorJourney({ onBack, lang }) {
  const [contractId, setContractId] = useState(DEFAULT_CONTRACT);
  const [att, setAtt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const str = t[lang];

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
        setError(str.errNoAttestation);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { verificar(); }, []);

  return (
    <section>
      <div className="view-header">
        <button className="btn-back" onClick={onBack}>{str.backBtn}</button>
      </div>
      
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2>{str.auditorHeaderTitle}</h2>
        <p className="muted">{str.auditorHeaderDesc}</p>
      </div>

      <div className="search-container" id="tour-auditor-search">
        <input
          className="search-input"
          value={contractId}
          onChange={e => setContractId(e.target.value)}
          placeholder={str.searchPlaceholder}
          aria-label={str.ariaSearchInput}
        />
        <button className="btn-primary" onClick={verificar} disabled={loading || !contractId}>
          {loading ? str.btnAuditing : str.btnAudit}
        </button>
      </div>

      <ErrorModal error={error} onClose={() => setError("")} lang={lang} />
      
      {loading && !error && (
        <div style={{ textAlign: "center", color: "var(--brand-cyan)", marginTop: "2rem" }}>
          <span className="spinner" style={{ borderColor: "var(--border-subtle)", borderTopColor: "var(--brand-cyan)" }} /> {str.analyzingNetwork}
        </div>
      )}

      {!loading && att && <SolvencyCertificate att={att} lang={lang} />}
    </section>
  );
}

// ── Loader ZK Interactivo ───────────────────────────────────────────────
function ZKLoader({ stepIndex, lang }) {
  const str = t[lang];
  const messages = [
    str.zkMsg1,
    str.zkMsg2,
    str.zkMsg3,
    str.zkMsg4
  ];

  const currentMsg = messages[Math.min(stepIndex, messages.length - 1)];

  // Trivia rotation
  const [triviaIdx, setTriviaIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTriviaIdx(prev => (prev + 1) % str.triviaList.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [str.triviaList.length]);

  return (
    <div className="glass-panel zk-loader">
      <div className="scanner-box">
        <div className="scanner-line"></div>
      </div>
      <h4>{str.zkProgressTitle}</h4>
      <p>{currentMsg}</p>

      <div className="trivia-box">
        <h5>💡 {str.triviaTitle}</h5>
        <p key={triviaIdx}>{str.triviaList[triviaIdx]}</p>
      </div>
    </div>
  );
}

// ── Vista: Issuer Wizard (Emisor) ───────────────────────────────────────
function IssuerWizard({ onBack, lang }) {
  const [address, setAddress] = useState(null);
  const [balances, setBalances] = useState("100000, 50000, 25000, 75000, 30000, 20000, 60000, 40000");
  const [contractId, setContractId] = useState(DEFAULT_CONTRACT);
  
  const [step, setStep] = useState(0);
  const [zkProgress, setZkProgress] = useState(0);
  const [txHash, setTxHash] = useState(null);
  const [error, setError] = useState("");

  const str = t[lang];
  const balList = balances.split(/[\s,]+/).filter(Boolean);
  const count = balList.length;

  async function conectar() {
    try {
      if (!(await isConnected())) {
        setError("Install Freighter extension");
        return;
      }
      await setAllowed();
      const { address: addr } = await getAddress();
      setAddress(addr);
      setError("");
      setStep(1); 
    } catch (e) {
      setError(`Error: ${e.message}`);
    }
  }

  async function generarPrueba() {
    setError("");
    setStep(2); 
    setZkProgress(0);

    try {
      setZkProgress(1); 
      const { generateSolvencyProof } = await import("./lib/prover.js");
      const salts = balList.map((_, i) => String(i + 1));
      const ledgerSeq = await getCurrentLedgerSeq();

      setZkProgress(2); 
      const { proof, publicInputs } = await generateSolvencyProof({
        balances: balList,
        salts,
        ledgerSeq,
      });

      setZkProgress(3); 
      const { hash } = await attest({
        contractId: contractId.trim(),
        publicInputs,
        proof,
        sourceAddress: address,
      });

      setTxHash(hash);
      setStep(3); 
    } catch (e) {
      setError(e.message);
      setStep(1); 
    }
  }

  return (
    <section>
      <div className="view-header">
        <button className="btn-back" onClick={onBack}>{str.backBtn}</button>
      </div>

      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2>{str.issuerHeaderTitle}</h2>
        <p className="muted">{str.issuerHeaderDesc}</p>
      </div>

      <ErrorModal error={error} onClose={() => setError("")} lang={lang} />

      <div className="wizard-container">
        {step < 2 && (
          <div className={`glass-panel wizard-step ${step === 0 ? "active" : step > 0 ? "completed" : ""}`} id="tour-issuer-wallet">
            <div className="wizard-step-header">
              <div className="step-circle">{step > 0 ? "✓" : "1"}</div>
              <h3>{str.step1Title}</h3>
            </div>
            {step === 0 ? (
              <button className="btn-primary" onClick={conectar}>{str.btnConnect}</button>
            ) : (
              <p className="mono text-sm text-gradient">{address}</p>
            )}
          </div>
        )}

        {step === 1 && (
          <div className="glass-panel wizard-step active" id="tour-issuer-inputs">
            <div className="wizard-step-header">
              <div className="step-circle">2</div>
              <h3>{str.step2Title}</h3>
            </div>
            <p className="text-sm muted" style={{ marginBottom: "1rem" }}>
              {str.step2Desc}
            </p>
            <textarea
              className="textarea-premium"
              value={balances}
              onChange={e => setBalances(e.target.value)}
              placeholder={str.balancesPlaceholder}
              aria-label={str.ariaBalancesInput}
            />
            <div className="counters">
              <div className={`counter-pill ${count === N ? "ok" : "err"}`}>
                {count}/{N} {str.inputsRequired}
              </div>
            </div>
            <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem", flexDirection: "column" }}>
              <input 
                className="search-input" 
                style={{ padding: "0.75rem", fontSize: "0.85rem" }}
                value={contractId} 
                onChange={e => setContractId(e.target.value)} 
                placeholder={str.contractIdPlaceholder} 
              />
              <button 
                className="btn-primary" 
                onClick={generarPrueba}
                disabled={count !== N || !contractId}
              >
                {str.btnGenerateProof}
              </button>
            </div>
          </div>
        )}

        {step === 2 && <ZKLoader stepIndex={zkProgress} lang={lang} />}

        {step === 3 && txHash && (
          <div className="glass-panel certificate-card" style={{ marginTop: 0 }}>
            <div className="cert-header">
              <div className="cert-icon">🚀</div>
              <h2 style={{ color: "var(--brand-emerald)" }}>{str.proofAccepted}</h2>
              <p className="muted" style={{ marginTop: "0.5rem" }}>
                {str.proofAcceptedDesc}
              </p>
            </div>
            <div className="cert-body" style={{ textAlign: "center" }}>
              <p className="text-sm muted" style={{ marginBottom: "1rem" }}>{str.txHashLabel}</p>
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
  const [lang, setLang] = useState("es"); // 'en', 'es'
  
  const str = t[lang];

  // Mouse Glow Effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
    <div className="mouse-glow"></div>
    <main>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <button 
          className="btn-secondary" 
          onClick={() => setLang(lang === "es" ? "en" : "es")}
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
          aria-label={str.ariaLangToggle}
        >
          {lang === "es" ? "English" : "Español"}
        </button>
      </div>

      <header style={{ paddingTop: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img 
          src="/images/stellar-icon.webp" 
          alt="Stellar Logo" 
          style={{ width: '48px', height: '48px', marginBottom: '1rem', filter: 'drop-shadow(0 0 10px rgba(244, 196, 48, 0.4))' }} 
        />
        <h1 className="text-gradient">
          {str.appTitle}
        </h1>
        <p className="tag">{str.appSubtitle}</p>
      </header>

      {view === "landing" && (
        <>
          <div className="journey-grid">
            <button className="glass-panel glass-panel-interactive journey-card" id="tour-auditor-btn" onClick={() => setView("auditor")}>
              <div className="journey-icon" aria-hidden="true">🔍</div>
              <h2>{str.auditorCardTitle}</h2>
              <p>{str.auditorCardDesc}</p>
            </button>

            <button className="glass-panel glass-panel-interactive journey-card" id="tour-issuer-btn" onClick={() => setView("issuer")}>
              <div className="journey-icon" aria-hidden="true">🔐</div>
              <h2>{str.issuerCardTitle}</h2>
              <p>{str.issuerCardDesc}</p>
            </button>
          </div>

          <details className="landing-accordion">
            <summary>{str.infoAccordionTitle}</summary>
            <div className="landing-info-container">
              <div className="info-card">
                <h3>{str.infoWhyStellarTitle}</h3>
                <p>{str.infoWhyStellarDesc}</p>
              </div>
              <div className="info-card">
                <h3>{str.infoHowItWorksTitle}</h3>
                <p>{str.infoHowItWorksDesc}</p>
              </div>
            </div>
          </details>
        </>
      )}

      {view === "auditor" && <AuditorJourney onBack={() => setView("landing")} lang={lang} />}
      
      {view === "issuer" && <IssuerWizard onBack={() => setView("landing")} lang={lang} />}

      {view === "landing" && (
        <footer>
          {str.footerText}
        </footer>
      )}

      <button className="float-help-btn" onClick={() => startTour(view, lang)} aria-label={str.ariaHelpBtn} title={str.tourHelpBtn}>
        <span aria-hidden="true">💡</span>
      </button>
    </main>
    </>
  );
}
