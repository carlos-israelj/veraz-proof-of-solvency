import { useState, useEffect } from 'react';
import VerazLogo from './VerazLogo';

export default function LandingNew({ onNavigate }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="landing-veraz">
      {/* Header */}
      <header className="landing-header container">
        <div style={{ paddingTop: 'var(--vz-space-xl)' }}>
          <VerazLogo variant="lockup" size="lg" href="#" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section container section">
        <div className="hero-content" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          {/* Badge */}
          <div className="animate-slideUp" style={{ marginBottom: 'var(--vz-space-md)' }}>
            <span className="vz-badge" style={{ color: 'var(--vz-proof-verified)' }}>
              <svg width="10" height="10" viewBox="0 0 10 10" style={{ marginRight: '4px' }}>
                <circle cx="5" cy="5" r="5" fill="currentColor" />
              </svg>
              STELLAR PROTOCOL 26 · CAP-80 · SOROBAN
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="hero-title animate-slideUp stagger-1" style={{ marginBottom: 'var(--vz-space-md)' }}>
            Zero-Knowledge Proof of Solvency
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle animate-slideUp stagger-2" style={{
            fontSize: '1.25rem',
            color: 'var(--vz-text-2)',
            marginBottom: 'var(--vz-space-lg)',
            lineHeight: 1.6
          }}>
            Cryptographically prove <strong style={{ color: 'var(--vz-text)' }}>Reserves ≥ Liabilities</strong> without revealing individual balances.
            <br />
            Privacy-preserving attestations for the Stellar ecosystem.
          </p>

          {/* Tech Stack Pills */}
          <div className="tech-stack animate-slideUp stagger-3" style={{
            display: 'flex',
            gap: 'var(--vz-space-sm)',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: 'var(--vz-space-2xl)'
          }}>
            {['UltraHonk', 'Noir v1.0', 'BN254 Curve', 'Merkle Sum Tree'].map((tech, i) => (
              <span key={tech} className="vz-mono" style={{
                padding: '6px 12px',
                background: 'var(--vz-surface)',
                border: '1px solid var(--vz-border)',
                borderRadius: 'var(--vz-radius-sm)',
                fontSize: '12px',
                fontWeight: 500,
                color: 'var(--vz-text-2)'
              }}>
                {tech}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="stats-grid animate-slideUp stagger-4" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 'var(--vz-space-md)',
            marginBottom: 'var(--vz-space-2xl)'
          }}>
            <div className="stat-item vz-card" style={{ textAlign: 'center', padding: 'var(--vz-space-md)' }}>
              <div className="vz-ratio" style={{ color: 'var(--vz-primary)', fontSize: '36px' }}>
                ~3s
              </div>
              <div className="vz-label" style={{ marginTop: '8px' }}>
                Proof Generation
              </div>
            </div>
            <div className="stat-item vz-card" style={{ textAlign: 'center', padding: 'var(--vz-space-md)' }}>
              <div className="vz-ratio" style={{ color: 'var(--vz-primary)', fontSize: '36px' }}>
                2KB
              </div>
              <div className="vz-label" style={{ marginTop: '8px' }}>
                Proof Size
              </div>
            </div>
            <div className="stat-item vz-card" style={{ textAlign: 'center', padding: 'var(--vz-space-md)' }}>
              <div className="vz-ratio" style={{ color: 'var(--vz-primary)', fontSize: '36px' }}>
                128-bit
              </div>
              <div className="vz-label" style={{ marginTop: '8px' }}>
                Security
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Selection */}
      <section className="journey-section container" style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: 'var(--vz-space-2xl)' }}>
        <h2 className="text-center animate-slideUp" style={{ marginBottom: 'var(--vz-space-xl)' }}>
          Choose Your Path
        </h2>

        <div className="journey-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--vz-space-lg)'
        }}>
          {/* Issuer Card */}
          <button
            className="journey-card vz-card vz-card-interactive animate-scaleIn stagger-5"
            onClick={() => onNavigate('issuer')}
            style={{
              textAlign: 'left',
              background: 'var(--vz-surface)',
              cursor: 'pointer'
            }}
          >
            <div style={{ marginBottom: 'var(--vz-space-md)' }}>
              <svg width="48" height="48" viewBox="0 0 64 64" fill="none" style={{ color: 'var(--vz-primary)' }}>
                <rect x="16" y="16" width="32" height="32" rx="4"
                  stroke="currentColor" strokeWidth="2" />
                <path d="M24 32 L28 36 L40 24" stroke="currentColor" strokeWidth="3"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <h3 className="vz-h2" style={{ marginBottom: 'var(--vz-space-sm)' }}>
              Issuer
            </h3>

            <p style={{ color: 'var(--vz-text-2)', marginBottom: 'var(--vz-space-md)', lineHeight: 1.5 }}>
              Generate zero-knowledge proofs of solvency. Prove reserves exceed liabilities
              without revealing holder balances.
            </p>

            <div className="features" style={{ marginBottom: 'var(--vz-space-md)' }}>
              {['Browser-based proving', 'Multi-source reserves', 'Freighter integration'].map((feature) => (
                <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" style={{ color: 'var(--vz-secondary)', flexShrink: 0 }}>
                    <circle cx="8" cy="8" r="8" fill="currentColor" />
                    <path d="M5 8 L7 10 L11 6" stroke="var(--vz-bg)" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontSize: '14px', color: 'var(--vz-text-2)' }}>{feature}</span>
                </div>
              ))}
            </div>

            <div className="cta" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--vz-primary)', fontWeight: 600 }}>
              <span>Generate Proof</span>
              <span>→</span>
            </div>
          </button>

          {/* Auditor Card */}
          <button
            className="journey-card vz-card vz-card-interactive animate-scaleIn stagger-6"
            onClick={() => onNavigate('auditor')}
            style={{
              textAlign: 'left',
              background: 'var(--vz-surface)',
              cursor: 'pointer'
            }}
          >
            <div style={{ marginBottom: 'var(--vz-space-md)' }}>
              <svg width="48" height="48" viewBox="0 0 64 64" fill="none" style={{ color: 'var(--vz-primary)' }}>
                <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="2" />
                <circle cx="32" cy="32" r="4" fill="currentColor" />
                <path d="M32 12 L32 20 M32 44 L32 52 M12 32 L20 32 M44 32 L52 32"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            <h3 className="vz-h2" style={{ marginBottom: 'var(--vz-space-sm)' }}>
              Auditor
            </h3>

            <p style={{ color: 'var(--vz-text-2)', marginBottom: 'var(--vz-space-md)', lineHeight: 1.5 }}>
              Verify solvency proofs on-chain. Query attestations and validate
              cryptographic guarantees in real-time.
            </p>

            <div className="features" style={{ marginBottom: 'var(--vz-space-md)' }}>
              {['On-chain verification', 'Multi-source reserves', 'Real-time queries'].map((feature) => (
                <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" style={{ color: 'var(--vz-secondary)', flexShrink: 0 }}>
                    <circle cx="8" cy="8" r="8" fill="currentColor" />
                    <path d="M5 8 L7 10 L11 6" stroke="var(--vz-bg)" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontSize: '14px', color: 'var(--vz-text-2)' }}>{feature}</span>
                </div>
              ))}
            </div>

            <div className="cta" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--vz-primary)', fontWeight: 600 }}>
              <span>Verify Proofs</span>
              <span>→</span>
            </div>
          </button>
        </div>

        {/* Integrations Link */}
        <div className="text-center animate-slideUp stagger-7" style={{ marginTop: 'var(--vz-space-xl)' }}>
          <button
            className="vz-btn vz-btn-secondary"
            onClick={() => onNavigate('integrations')}
          >
            <span>View Integrations</span>
            <span>(DeFindex · Aquarius)</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer container" style={{
        borderTop: '1px solid var(--vz-border)',
        paddingTop: 'var(--vz-space-lg)',
        paddingBottom: 'var(--vz-space-lg)',
        textAlign: 'center'
      }}>
        <p className="vz-mono" style={{ fontSize: '13px', color: 'var(--vz-text-2)' }}>
          Built on Stellar · Deployed on Testnet
        </p>
        <p className="vz-mono" style={{ fontSize: '12px', color: 'var(--vz-stale)', marginTop: '8px' }}>
          Verifier: <code>CAU5ZPZ...HJAFKA</code> · Policy: <code>CCKXS7Y...HE7PX6</code>
        </p>
      </footer>
    </div>
  );
}
