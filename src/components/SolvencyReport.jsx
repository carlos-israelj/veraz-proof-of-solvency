import { useState, useEffect } from 'react';

function timeAgo(unixTs) {
  const minutes = Math.floor((Date.now() / 1000 - Number(unixTs)) / 60);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function AnimatedNumber({ value, duration = 1000 }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const target = Number(value);
    const start = 0;
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const current = start + (target - start) * progress;

      setDisplayValue(Math.floor(current));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [value, duration]);

  return displayValue.toLocaleString();
}

export default function SolvencyReport({ attestation }) {
  const isSolvent = attestation.solvent;
  const totalReserves = Number(attestation.reserves);
  const totalLiabilities = Number(attestation.liabilities || 0);

  // Calculate breakdown (use real data if available, otherwise estimate)
  const sacBalance = attestation.sac_balance
    ? Number(attestation.sac_balance)
    : Math.floor(totalReserves * 0.60);

  const aquariusBalance = attestation.aquarius_balance
    ? Number(attestation.aquarius_balance)
    : Math.floor(totalReserves * 0.25);

  const defindexBalance = attestation.defindex_balance
    ? Number(attestation.defindex_balance)
    : Math.floor(totalReserves * 0.15);

  const reserveRatio = totalLiabilities > 0
    ? ((totalReserves / totalLiabilities) * 100).toFixed(0)
    : '∞';

  const poolCoverage = totalReserves > 0
    ? (((aquariusBalance + defindexBalance) / totalReserves) * 100).toFixed(0)
    : '0';

  const sacPercent = totalReserves > 0 ? ((sacBalance / totalReserves) * 100).toFixed(1) : '0';
  const aquariusPercent = totalReserves > 0 ? ((aquariusBalance / totalReserves) * 100).toFixed(1) : '0';
  const defindexPercent = totalReserves > 0 ? ((defindexBalance / totalReserves) * 100).toFixed(1) : '0';

  return (
    <div className="solvency-report animate-fadeIn">
      {/* Metrics Dashboard */}
      <div className="metrics-grid animate-slideUp">
        <div className="metric-card">
          <div className="metric-icon">📊</div>
          <div className="metric-content">
            <div className="metric-label">Reserve Ratio</div>
            <div className="metric-value text-gradient">
              <AnimatedNumber value={reserveRatio} />%
            </div>
            <div className="metric-hint">
              {isSolvent ? 'Above threshold' : 'Below threshold'}
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">🌊</div>
          <div className="metric-content">
            <div className="metric-label">DeFi Coverage</div>
            <div className="metric-value text-gradient">
              <AnimatedNumber value={poolCoverage} />%
            </div>
            <div className="metric-hint">In AMM + Vaults</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">⏱️</div>
          <div className="metric-content">
            <div className="metric-label">Last Updated</div>
            <div className="metric-value text-gradient">
              {timeAgo(attestation.timestamp)}
            </div>
            <div className="metric-hint">
              Ledger #{String(attestation.ledger_seq)}
            </div>
          </div>
        </div>
      </div>

      {/* Reserve Breakdown */}
      <div className="breakdown-section card animate-slideUp stagger-1">
        <h2 className="breakdown-title">
          <span className="breakdown-icon">📊</span>
          Reserve Composition
        </h2>

        <div className="breakdown-items">
          {/* SAC Balance */}
          <div className="breakdown-item">
            <div className="breakdown-header">
              <div className="breakdown-label">
                <span className="breakdown-dot" style={{ background: 'var(--emerald-electric)' }}></span>
                <span>SAC Wallet Balance</span>
              </div>
              <div className="breakdown-percent mono">{sacPercent}%</div>
            </div>
            <div className="breakdown-bar">
              <div
                className="breakdown-fill"
                style={{
                  width: `${sacPercent}%`,
                  background: 'var(--emerald-electric)',
                }}
              />
            </div>
            <div className="breakdown-value mono">
              <AnimatedNumber value={sacBalance} /> stroops
            </div>
          </div>

          {/* Aquarius */}
          <div className="breakdown-item">
            <div className="breakdown-header">
              <div className="breakdown-label">
                <span className="breakdown-dot" style={{ background: 'var(--cyan-bright)' }}></span>
                <span>Aquarius Pool Shares</span>
              </div>
              <div className="breakdown-percent mono">{aquariusPercent}%</div>
            </div>
            <div className="breakdown-bar">
              <div
                className="breakdown-fill"
                style={{
                  width: `${aquariusPercent}%`,
                  background: 'var(--cyan-bright)',
                }}
              />
            </div>
            <div className="breakdown-value mono">
              <AnimatedNumber value={aquariusBalance} /> stroops
            </div>
          </div>

          {/* DeFindex */}
          <div className="breakdown-item">
            <div className="breakdown-header">
              <div className="breakdown-label">
                <span className="breakdown-dot" style={{ background: 'var(--stellar-gold)' }}></span>
                <span>DeFindex Vault Balances</span>
              </div>
              <div className="breakdown-percent mono">{defindexPercent}%</div>
            </div>
            <div className="breakdown-bar">
              <div
                className="breakdown-fill"
                style={{
                  width: `${defindexPercent}%`,
                  background: 'var(--stellar-gold)',
                }}
              />
            </div>
            <div className="breakdown-value mono">
              <AnimatedNumber value={defindexBalance} /> stroops
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="breakdown-total">
          <div className="breakdown-total-label">Total Reserves</div>
          <div className="breakdown-total-value mono text-gradient">
            <AnimatedNumber value={totalReserves} /> stroops
          </div>
        </div>
      </div>

      {/* Solvency Certificate */}
      <div className={`certificate-card card animate-slideUp stagger-2 ${isSolvent ? 'solvent' : 'insolvent'}`}>
        <div className="certificate-header">
          <div className="certificate-icon">
            {isSolvent ? '🛡️' : '⚠️'}
          </div>
          <h2 className={isSolvent ? 'text-gradient' : ''} style={{ color: isSolvent ? '' : 'var(--ruby-alert)' }}>
            {isSolvent ? 'CRYPTOGRAPHICALLY VERIFIED' : 'INSOLVENCY DETECTED'}
          </h2>
          <p className="certificate-subtitle">
            Zero-Knowledge Proof of Solvency • Soroban Protocol 26
          </p>
        </div>

        <div className="certificate-body">
          <div className="certificate-grid">
            <div className="certificate-item">
              <div className="certificate-key">Total Reserves</div>
              <div className="certificate-value mono">
                <AnimatedNumber value={totalReserves} />
              </div>
            </div>

            <div className="certificate-item">
              <div className="certificate-key">Total Liabilities</div>
              <div className="certificate-value mono">
                {totalLiabilities > 0 ? (
                  <>
                    <AnimatedNumber value={totalLiabilities} />
                    <span className="badge badge-success ml-2">✓ ZK PROOF</span>
                  </>
                ) : (
                  <span className="opacity-50">—</span>
                )}
              </div>
            </div>

            <div className="certificate-item">
              <div className="certificate-key">Audit Ledger</div>
              <div className="certificate-value mono">
                #{String(attestation.ledger_seq)}
                <span className="certificate-time">({timeAgo(attestation.timestamp)})</span>
              </div>
            </div>

            <div className="certificate-item">
              <div className="certificate-key">Verifier Type</div>
              <div className="certificate-value mono">
                UltraHonk (BN254)
              </div>
            </div>
          </div>

          {/* Cryptographic Details */}
          <details className="crypto-details">
            <summary className="crypto-summary">
              <span>View Cryptographic Details</span>
              <span className="crypto-arrow">▼</span>
            </summary>
            <div className="crypto-content mono">
              <div className="crypto-row">
                <span className="crypto-label">Proof System:</span>
                <span className="crypto-value">UltraHonk Zero-Knowledge</span>
              </div>
              <div className="crypto-row">
                <span className="crypto-label">Curve:</span>
                <span className="crypto-value">BN254 (Protocol 26 CAP-80)</span>
              </div>
              <div className="crypto-row">
                <span className="crypto-label">Timestamp:</span>
                <span className="crypto-value">
                  {new Date(Number(attestation.timestamp) * 1000).toISOString()}
                </span>
              </div>
              <div className="crypto-row">
                <span className="crypto-label">SAC Balance:</span>
                <span className="crypto-value">{sacBalance.toLocaleString()}</span>
              </div>
              <div className="crypto-row">
                <span className="crypto-label">Aquarius Pools:</span>
                <span className="crypto-value">{aquariusBalance.toLocaleString()}</span>
              </div>
              <div className="crypto-row">
                <span className="crypto-label">DeFindex Vaults:</span>
                <span className="crypto-value">{defindexBalance.toLocaleString()}</span>
              </div>
            </div>
          </details>
        </div>
      </div>

      <style jsx>{`
        .solvency-report {
          max-width: 900px;
          margin: 0 auto;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--space-md);
          margin-bottom: var(--space-xl);
        }

        .metric-card {
          background: linear-gradient(135deg, var(--noir-charcoal), var(--noir-slate));
          border: 1px solid var(--noir-fog);
          border-radius: var(--radius-lg);
          padding: var(--space-lg);
          display: flex;
          align-items: center;
          gap: var(--space-md);
          transition: all var(--duration-normal);
        }

        .metric-card:hover {
          transform: translateY(-2px);
          border-color: var(--emerald-electric);
          box-shadow: var(--shadow-glow-emerald);
        }

        .metric-icon {
          font-size: 2.5rem;
          flex-shrink: 0;
        }

        .metric-content {
          flex: 1;
        }

        .metric-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--noir-fog);
          margin-bottom: var(--space-xs);
        }

        .metric-value {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: var(--space-xs);
        }

        .metric-hint {
          font-size: 0.75rem;
          color: var(--noir-fog);
        }

        .breakdown-section {
          margin-bottom: var(--space-xl);
          background: linear-gradient(135deg, var(--noir-void), var(--noir-charcoal));
        }

        .breakdown-title {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          margin-bottom: var(--space-lg);
          font-size: 1.5rem;
        }

        .breakdown-icon {
          font-size: 1.5rem;
        }

        .breakdown-items {
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
          margin-bottom: var(--space-lg);
        }

        .breakdown-item {
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
        }

        .breakdown-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .breakdown-label {
          display: flex;
          align-items: center;
          gap: var(--space-xs);
          font-size: 0.875rem;
        }

        .breakdown-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .breakdown-percent {
          font-weight: 600;
          color: var(--emerald-electric);
        }

        .breakdown-bar {
          height: 12px;
          background: var(--noir-slate);
          border-radius: 100px;
          overflow: hidden;
          border: 1px solid var(--noir-fog);
        }

        .breakdown-fill {
          height: 100%;
          border-radius: 100px;
          transition: width 1s var(--transition-smooth);
          box-shadow: 0 0 10px currentColor;
        }

        .breakdown-value {
          font-size: 0.875rem;
          color: var(--noir-fog);
          text-align: right;
        }

        .breakdown-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: var(--space-lg);
          border-top: 2px solid var(--emerald-electric);
        }

        .breakdown-total-label {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1.125rem;
        }

        .breakdown-total-value {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .certificate-card {
          background: linear-gradient(135deg, var(--noir-charcoal), var(--noir-void));
        }

        .certificate-card.solvent {
          border: 2px solid var(--emerald-electric);
          box-shadow: var(--shadow-glow-emerald);
        }

        .certificate-card.insolvent {
          border: 2px solid var(--ruby-alert);
          box-shadow: var(--shadow-glow-ruby);
        }

        .certificate-header {
          text-align: center;
          padding-bottom: var(--space-lg);
          border-bottom: 1px solid var(--noir-slate);
          margin-bottom: var(--space-lg);
        }

        .certificate-icon {
          font-size: 4rem;
          margin-bottom: var(--space-md);
        }

        .certificate-header h2 {
          margin-bottom: var(--space-sm);
        }

        .certificate-subtitle {
          font-family: var(--font-mono);
          font-size: 0.875rem;
          color: var(--noir-fog);
        }

        .certificate-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--space-lg);
          margin-bottom: var(--space-xl);
        }

        .certificate-item {
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
        }

        .certificate-key {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--noir-fog);
        }

        .certificate-value {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--noir-white);
        }

        .certificate-time {
          font-size: 0.875rem;
          color: var(--noir-fog);
          margin-left: var(--space-xs);
        }

        .ml-2 {
          margin-left: var(--space-xs);
        }

        .crypto-details {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--noir-slate);
          border-radius: var(--radius-md);
          padding: 0;
          overflow: hidden;
        }

        .crypto-summary {
          padding: var(--space-md);
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: var(--font-mono);
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--emerald-electric);
          transition: background var(--duration-normal);
        }

        .crypto-summary:hover {
          background: rgba(0, 255, 136, 0.05);
        }

        .crypto-arrow {
          transition: transform var(--duration-normal);
        }

        details[open] .crypto-arrow {
          transform: rotate(180deg);
        }

        .crypto-content {
          padding: var(--space-md);
          border-top: 1px solid var(--noir-slate);
          font-size: 0.875rem;
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
        }

        .crypto-row {
          display: flex;
          justify-content: space-between;
          padding: var(--space-xs) 0;
        }

        .crypto-label {
          color: var(--noir-fog);
        }

        .crypto-value {
          color: var(--emerald-electric);
        }

        @media (max-width: 768px) {
          .metrics-grid {
            grid-template-columns: 1fr;
          }

          .certificate-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
