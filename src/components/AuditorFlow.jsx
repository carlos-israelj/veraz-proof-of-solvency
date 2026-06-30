import { useState, useEffect } from 'react';
import SolvencyReport from './SolvencyReport';

const DEFAULT_CONTRACT = 'CACQIPK5OAJTT44WEK4D5IP2CWAVRTBLDXXRY3LO4HNSJAUUAQGTHNHS';

export default function AuditorFlow({ onBack }) {
  const [contractId, setContractId] = useState(DEFAULT_CONTRACT);
  const [attestation, setAttestation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (contractId) {
      queryAttestation();
    }
  }, []);

  async function queryAttestation() {
    if (!contractId.trim()) return;

    setLoading(true);
    setError('');
    setAttestation(null);

    try {
      const { querySolvent } = await import('../lib/stellar.js');
      const result = await querySolvent(contractId.trim());

      if (result) {
        setAttestation(result);
      } else {
        setError('No attestation found for this contract');
      }
    } catch (e) {
      setError(e.message || 'Failed to query contract');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auditor-flow">
      {/* Header */}
      <div className="flow-header">
        <button className="btn-ghost" onClick={onBack}>
          ← Back
        </button>
        <h1 className="flow-title">
          <span className="text-gradient">AUDITOR</span>
        </h1>
        <p className="flow-subtitle mono">Solvency Verification</p>
      </div>

      {/* Search Bar */}
      <div className="search-section animate-slideUp">
        <div className="search-container card">
          <div className="search-label mono">CONTRACT ADDRESS</div>
          <div className="search-input-group">
            <input
              className="input search-input mono"
              value={contractId}
              onChange={(e) => setContractId(e.target.value)}
              placeholder="C..."
            />
            <button
              className="btn btn-primary"
              onClick={queryAttestation}
              disabled={loading || !contractId.trim()}
            >
              {loading ? (
                <span className="flex-center">
                  <span className="spinner" style={{ width: '20px', height: '20px' }}></span>
                </span>
              ) : (
                'Verify'
              )}
            </button>
          </div>
          <div className="search-hint mono">
            Query solvency proofs from deployed policy contracts
          </div>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="error-banner animate-slideUp">
          <span className="error-icon">⚠</span>
          <span>{error}</span>
          <button className="error-close" onClick={() => setError('')}>×</button>
        </div>
      )}

      {/* Loading State */}
      {loading && !error && (
        <div className="loading-state animate-fadeIn">
          <div className="loading-scanner">
            <div className="spinner" style={{ width: '60px', height: '60px' }}></div>
          </div>
          <p className="loading-text mono">Querying blockchain...</p>
          <div className="loading-details">
            <div className="loading-step">→ Reading contract state</div>
            <div className="loading-step">→ Fetching reserve balances</div>
            <div className="loading-step">→ Verifying cryptographic proof</div>
          </div>
        </div>
      )}

      {/* Solvency Report */}
      {!loading && attestation && (
        <SolvencyReport attestation={attestation} />
      )}

      {/* Empty State */}
      {!loading && !attestation && !error && (
        <div className="empty-state animate-fadeIn">
          <div className="empty-icon">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
              <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
              <circle cx="60" cy="60" r="35" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
              <circle cx="60" cy="60" r="5" fill="currentColor"/>
              <path d="M60 20 L60 35 M60 85 L60 100 M20 60 L35 60 M85 60 L100 60"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
            </svg>
          </div>
          <h3>Enter Contract ID to Verify</h3>
          <p>Query any Solvency Policy contract to view cryptographic attestations</p>
        </div>
      )}

      <style jsx>{`
        .auditor-flow {
          min-height: 100vh;
          padding: var(--space-xl) var(--space-md);
          max-width: 1000px;
          margin: 0 auto;
        }

        .flow-header {
          text-align: center;
          margin-bottom: var(--space-2xl);
          position: relative;
        }

        .flow-header .btn-ghost {
          position: absolute;
          left: 0;
          top: 0;
        }

        .flow-title {
          margin: var(--space-md) 0 var(--space-xs);
        }

        .flow-subtitle {
          color: var(--emerald-electric);
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .search-section {
          margin-bottom: var(--space-2xl);
        }

        .search-container {
          background: linear-gradient(135deg, var(--noir-charcoal), var(--noir-slate));
          padding: var(--space-xl);
        }

        .search-label {
          font-size: 0.75rem;
          color: var(--emerald-electric);
          margin-bottom: var(--space-sm);
          letter-spacing: 0.1em;
        }

        .search-input-group {
          display: flex;
          gap: var(--space-md);
          margin-bottom: var(--space-sm);
        }

        .search-input {
          flex: 1;
          font-size: 1rem;
        }

        .search-hint {
          font-size: 0.75rem;
          color: var(--noir-fog);
          margin-top: var(--space-sm);
        }

        .error-banner {
          background: var(--ruby-glow);
          border: 1px solid var(--ruby-alert);
          border-radius: var(--radius-md);
          padding: var(--space-md);
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          margin-bottom: var(--space-lg);
          color: var(--ruby-alert);
        }

        .error-icon {
          font-size: 1.5rem;
        }

        .error-close {
          margin-left: auto;
          background: none;
          border: none;
          color: var(--ruby-alert);
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0;
          width: 24px;
          height: 24px;
        }

        .loading-state {
          text-align: center;
          padding: var(--space-3xl) var(--space-md);
        }

        .loading-scanner {
          margin-bottom: var(--space-xl);
          display: flex;
          justify-content: center;
        }

        .loading-text {
          font-size: 1.25rem;
          color: var(--emerald-electric);
          margin-bottom: var(--space-lg);
        }

        .loading-details {
          max-width: 400px;
          margin: 0 auto;
          text-align: left;
        }

        .loading-step {
          font-family: var(--font-mono);
          font-size: 0.875rem;
          color: var(--noir-fog);
          padding: var(--space-xs) 0;
          animation: fadeIn 0.5s ease-in-out;
        }

        .loading-step:nth-child(1) {
          animation-delay: 0s;
        }

        .loading-step:nth-child(2) {
          animation-delay: 0.3s;
        }

        .loading-step:nth-child(3) {
          animation-delay: 0.6s;
        }

        .empty-state {
          text-align: center;
          padding: var(--space-3xl) var(--space-md);
          color: var(--noir-fog);
        }

        .empty-icon {
          margin: 0 auto var(--space-xl);
          color: var(--noir-slate);
        }

        .empty-state h3 {
          color: var(--noir-white);
          margin-bottom: var(--space-sm);
        }

        @media (max-width: 768px) {
          .search-input-group {
            flex-direction: column;
          }

          .search-input {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
