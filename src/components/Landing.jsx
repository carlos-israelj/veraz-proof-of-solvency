import { useState, useEffect } from 'react';
import GlitchText from './GlitchText';

export default function Landing({ onNavigate }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-badge animate-slideUp">
          <span className="badge badge-info">
            <span className="pulse-dot"></span>
            STELLAR PROTOCOL 26 • CAP-80
          </span>
        </div>

        <h1 className="hero-title animate-slideUp stagger-1">
          <GlitchText active={true}>
            <span className="text-gradient">VERAZ</span>
          </GlitchText>
        </h1>

        <p className="hero-subtitle animate-slideUp stagger-2">
          Zero-Knowledge Proof of Solvency
        </p>

        <p className="hero-description animate-slideUp stagger-3">
          Cryptographically prove solvency without revealing individual balances.
          <br />
          Privacy-preserving attestations for the Stellar ecosystem.
        </p>

        {/* Tech Stack Pills */}
        <div className="tech-stack animate-slideUp stagger-4">
          <span className="tech-pill">UltraHonk</span>
          <span className="tech-pill">Noir v1.0</span>
          <span className="tech-pill">Soroban</span>
          <span className="tech-pill">BN254</span>
        </div>
      </header>

      {/* Journey Selection */}
      <section className="journey-selection">
        <div className="journey-grid">
          {/* Auditor Card */}
          <button
            className="journey-card card-interactive card-dual-border animate-scaleIn stagger-5"
            onClick={() => onNavigate('auditor')}
          >
            <div className="journey-icon">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
                <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="2"/>
                <circle cx="32" cy="32" r="4" fill="currentColor"/>
                <path d="M32 12 L32 20 M32 44 L32 52 M12 32 L20 32 M44 32 L52 32"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>

            <h2 className="journey-title">AUDITOR</h2>
            <p className="journey-description">
              Verify solvency proofs on-chain. Query attestations and validate
              cryptographic guarantees in real-time.
            </p>

            <div className="journey-features">
              <div className="feature-item">
                <span className="feature-check">✓</span>
                <span>On-chain verification</span>
              </div>
              <div className="feature-item">
                <span className="feature-check">✓</span>
                <span>Multi-source reserves</span>
              </div>
              <div className="feature-item">
                <span className="feature-check">✓</span>
                <span>Real-time queries</span>
              </div>
            </div>

            <div className="journey-cta">
              <span>Verify Proofs</span>
              <span className="arrow">→</span>
            </div>
          </button>

          {/* Issuer Card */}
          <button
            className="journey-card card-interactive card-dual-border animate-scaleIn stagger-6"
            onClick={() => onNavigate('issuer')}
          >
            <div className="journey-icon">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <rect x="16" y="16" width="32" height="32" rx="4"
                  stroke="currentColor" strokeWidth="2" opacity="0.3"/>
                <path d="M24 28 L32 36 L40 28" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="32" cy="32" r="3" fill="currentColor"/>
              </svg>
            </div>

            <h2 className="journey-title">ISSUER</h2>
            <p className="journey-description">
              Generate Zero-Knowledge proofs locally. Attest solvency without
              exposing sensitive liability data.
            </p>

            <div className="journey-features">
              <div className="feature-item">
                <span className="feature-check">✓</span>
                <span>Local proof generation</span>
              </div>
              <div className="feature-item">
                <span className="feature-check">✓</span>
                <span>Privacy-preserving</span>
              </div>
              <div className="feature-item">
                <span className="feature-check">✓</span>
                <span>Freighter integration</span>
              </div>
            </div>

            <div className="journey-cta">
              <span>Generate Proof</span>
              <span className="arrow">→</span>
            </div>
          </button>
        </div>
      </section>

      {/* Info Section */}
      <section className="info-section animate-fadeIn stagger-6">
        <div className="info-grid">
          <div className="info-card">
            <h3>Why Stellar?</h3>
            <p>
              Protocol 26 introduces native BN254 curve support via CAP-80, enabling
              on-chain Zero-Knowledge proof verification without Layer 2 solutions.
            </p>
          </div>

          <div className="info-card info-card-highlight">
            <h3>🌊 Multi-Source Reserves</h3>
            <p>
              Veraz aggregates reserves from SAC wallets, <strong>Aquarius AMM pools</strong>, and
              <strong> DeFindex yield vaults</strong> - proving comprehensive solvency.
            </p>
            <button
              className="btn btn-secondary"
              onClick={() => onNavigate('integrations')}
              style={{ marginTop: 'var(--space-md)', width: '100%' }}
            >
              View Integrations →
            </button>
          </div>

          <div className="info-card">
            <h3>How It Works</h3>
            <p>
              Issuers generate UltraHonk proofs locally using Noir circuits.
              Verifier contracts validate proofs on Soroban, ensuring cryptographic integrity.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p className="mono opacity-50">
          Built for Stellar PULSO Hackathon • Powered by UltraHonk & Soroban
        </p>
      </footer>

      <style jsx>{`
        .landing-container {
          min-height: 100vh;
          padding: var(--space-xl) 0;
          background:
            radial-gradient(ellipse at top, rgba(0, 255, 136, 0.05), transparent 50%),
            radial-gradient(ellipse at bottom, rgba(0, 255, 255, 0.05), transparent 50%);
        }

        .hero {
          text-align: center;
          padding: var(--space-3xl) var(--space-md);
          max-width: 900px;
          margin: 0 auto;
        }

        .hero-badge {
          margin-bottom: var(--space-md);
        }

        .pulse-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          background: var(--cyan-bright);
          border-radius: 50%;
          margin-right: var(--space-xs);
          animation: pulse 2s ease-in-out infinite;
        }

        .hero-title {
          margin: var(--space-lg) 0;
          font-size: clamp(4rem, 10vw, 8rem);
          letter-spacing: -0.05em;
          line-height: 0.9;
        }

        .hero-subtitle {
          font-family: var(--font-mono);
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: var(--emerald-electric);
          margin-bottom: var(--space-md);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .hero-description {
          font-size: clamp(1rem, 2vw, 1.125rem);
          color: var(--noir-fog);
          max-width: 700px;
          margin: 0 auto var(--space-xl);
          line-height: 1.8;
        }

        .tech-stack {
          display: flex;
          gap: var(--space-sm);
          justify-content: center;
          flex-wrap: wrap;
        }

        .tech-pill {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          padding: 0.5rem 1rem;
          background: var(--noir-charcoal);
          border: 1px solid var(--noir-slate);
          border-radius: 100px;
          color: var(--cyan-bright);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .journey-selection {
          padding: var(--space-2xl) var(--space-md);
          max-width: 1200px;
          margin: 0 auto;
        }

        .journey-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: var(--space-xl);
        }

        @media (max-width: 900px) {
          .journey-grid {
            grid-template-columns: 1fr;
            max-width: 500px;
            margin: 0 auto;
          }
        }

        .journey-card {
          padding: var(--space-xl);
          text-align: left;
          background: linear-gradient(135deg, var(--noir-charcoal), var(--noir-void));
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
          min-height: 500px;
        }

        .journey-icon {
          width: 64px;
          height: 64px;
          color: var(--emerald-electric);
          margin-bottom: var(--space-sm);
        }

        .journey-title {
          font-size: 2rem;
          color: var(--noir-white);
          margin: 0;
        }

        .journey-description {
          color: var(--noir-fog);
          line-height: 1.7;
          flex-grow: 1;
        }

        .journey-features {
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
          margin: var(--space-md) 0;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          font-family: var(--font-mono);
          font-size: 0.875rem;
          color: var(--noir-fog);
        }

        .feature-check {
          color: var(--emerald-electric);
          font-weight: bold;
        }

        .journey-cta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: var(--space-md);
          border-top: 1px solid var(--noir-slate);
          font-family: var(--font-display);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--emerald-electric);
        }

        .arrow {
          font-size: 1.5rem;
          transition: transform var(--duration-normal) var(--transition-smooth);
        }

        .journey-card:hover .arrow {
          transform: translateX(8px);
        }

        .info-section {
          padding: var(--space-3xl) var(--space-md);
          max-width: 1200px;
          margin: 0 auto;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--space-lg);
        }

        .info-card {
          padding: var(--space-lg);
          background: var(--noir-charcoal);
          border: 1px solid var(--noir-slate);
          border-radius: var(--radius-lg);
        }

        .info-card h3 {
          color: var(--emerald-electric);
          margin-bottom: var(--space-sm);
          font-size: 1.25rem;
        }

        .info-card p {
          color: var(--noir-fog);
          line-height: 1.7;
        }

        .info-card-highlight {
          background: linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(0, 255, 255, 0.1));
          border-color: var(--emerald-electric);
          position: relative;
          overflow: hidden;
        }

        .info-card-highlight::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--cyan-bright), transparent);
          animation: shimmer 3s ease-in-out infinite;
        }

        .info-card-highlight h3 {
          color: var(--emerald-electric);
        }

        .info-card-highlight strong {
          color: var(--cyan-bright);
        }

        .landing-footer {
          text-align: center;
          padding: var(--space-xl) var(--space-md);
          font-size: 0.875rem;
        }
      `}</style>
    </div>
  );
}
