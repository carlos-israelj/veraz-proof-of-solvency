import { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import ProofGenerator from './ProofGenerator';
import ShieldAnimation from './ShieldAnimation';

const N = 8; // Circuit supports 8 holders
const DEFAULT_CONTRACT = 'CADFYWTVXQ5WKWPEOI5VYQ55ICQFNHLLGNSH2ETM2GXNBPFWDLW7NRRX'; // Testnet solvency policy contract (128-byte format)

export default function IssuerFlow({ onBack }) {
  const { publicKey, isConnected, connectWallet: walletConnect, disconnect } = useWallet();
  const [step, setStep] = useState(0); // 0: connect, 1: input, 2: generating, 3: success
  const [balances, setBalances] = useState('100000, 50000, 25000, 75000, 30000, 20000, 60000, 40000');
  const [contractId, setContractId] = useState(DEFAULT_CONTRACT);
  const [reserveAddresses, setReserveAddresses] = useState(''); // Stellar addresses for reserve commitment
  const [txHash, setTxHash] = useState(null);
  const [error, setError] = useState('');

  const balanceList = balances.split(/[\s,]+/).filter(Boolean);
  const count = balanceList.length;
  const totalLiabilities = balanceList.reduce((sum, b) => sum + Number(b), 0);

  async function handleConnectWallet() {
    try {
      await walletConnect();
      setError('');
      setStep(1);
    } catch (e) {
      setError(`Wallet connection failed: ${e.message}`);
    }
  }

  function startProofGeneration() {
    if (count !== N) {
      setError(`Circuit requires exactly ${N} balances`);
      return;
    }

    // Validate reserve addresses
    const addressList = reserveAddresses.split(/[\s,]+/).filter(Boolean);
    if (addressList.length === 0) {
      setError('At least one reserve address is required');
      return;
    }
    if (addressList.length > 5) {
      setError('Maximum 5 reserve addresses allowed');
      return;
    }

    // Basic validation of Stellar address format (starts with G, 56 chars)
    for (const addr of addressList) {
      if (!addr.startsWith('G') || addr.length !== 56) {
        setError(`Invalid Stellar address format: ${addr}`);
        return;
      }
    }

    setError('');
    setStep(2);
  }

  function handleProofSuccess(hash) {
    setTxHash(hash);
    setStep(3);
  }

  function handleProofError(err) {
    setError(err);
    setStep(1);
  }

  return (
    <div className="issuer-flow">
      {/* Header */}
      <div className="flow-header">
        <button className="vz-btn vz-btn-ghost" onClick={onBack}>
          ← Back
        </button>
        <h1 className="flow-title">ISSUER</h1>
        <p className="flow-subtitle vz-mono">Zero-Knowledge Attestation</p>
      </div>

      {/* Progress Indicators */}
      <div className="progress-steps">
        <div className={`progress-step ${step >= 0 ? 'active' : ''} ${step > 0 ? 'completed' : ''}`}>
          <div className="step-number">1</div>
          <div className="step-label">Connect</div>
        </div>
        <div className="progress-line"></div>
        <div className={`progress-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
          <div className="step-number">2</div>
          <div className="step-label">Input</div>
        </div>
        <div className="progress-line"></div>
        <div className={`progress-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
          <div className="step-number">3</div>
          <div className="step-label">Prove</div>
        </div>
        <div className="progress-line"></div>
        <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
          <div className="step-number">4</div>
          <div className="step-label">Attest</div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="error-banner animate-slideUp">
          <span className="error-icon">⚠</span>
          <span>{error}</span>
          <button className="error-close" onClick={() => setError('')}>×</button>
        </div>
      )}

      {/* Step Content */}
      <div className="flow-content">
        {/* Step 0: Connect Wallet */}
        {step === 0 && (
          <div className="vz-card step-card animate-scaleIn">
            <div className="step-icon">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <rect x="12" y="20" width="40" height="28" rx="4" stroke="currentColor" strokeWidth="2"/>
                <path d="M44 32h8M44 28h8M44 36h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="24" cy="32" r="4" fill="currentColor"/>
              </svg>
            </div>
            <h2>Connect Stellar Wallet</h2>
            <p className="step-description">
              Sign transactions using your preferred Stellar wallet (Freighter, xBull, Lobstr, etc.).
              Your private keys never leave your wallet extension.
            </p>
            <button className="vz-btn vz-btn-primary" onClick={handleConnectWallet}>
              Connect Wallet
            </button>
          </div>
        )}

        {/* Step 1: Input Balances */}
        {step === 1 && (
          <div className="input-section animate-fadeIn">
            {/* Connected Address */}
            <div className="vz-card connected-card">
              <div className="connected-header">
                <span className="status-dot"></span>
                <span className="vz-mono">Wallet Connected</span>
                <button
                  className="btn-disconnect"
                  onClick={() => {
                    disconnect();
                    setStep(0);
                  }}
                  title="Disconnect wallet"
                >
                  ✕
                </button>
              </div>
              <div className="connected-address mono text-gradient">
                {publicKey?.slice(0, 8)}...{publicKey?.slice(-8)}
              </div>
            </div>

            {/* Multi-Source Info */}
            <div className="vz-card info-card">
              <h3>🌊 Multi-Source Reserve System</h3>
              <p className="info-text">
                Veraz verifies solvency by aggregating reserves from multiple sources:
              </p>
              <div className="source-grid">
                <div className="source-item">
                  <span className="source-check">✓</span>
                  <span>SAC Wallet Balances</span>
                </div>
                <div className="source-item">
                  <span className="source-check">✓</span>
                  <span>Aquarius Pool Shares</span>
                </div>
                <div className="source-item">
                  <span className="source-check">✓</span>
                  <span>DeFindex Vault Balances</span>
                </div>
              </div>
              <div className="info-highlight">
                💡 Configured with 2 Aquarius pools + 3 DeFindex vaults (USDC, XLM, CETES)
              </div>
            </div>

            {/* Balance Input */}
            <div className="vz-card input-card">
              <div className="input-header">
                <h3>Token Holder Liabilities</h3>
                <span className="info-badge" title="Total amount owed to token holders">ℹ️</span>
              </div>

              <div className="liability-explainer">
                <p className="explainer-text">
                  <strong>Liabilities</strong> are the total token balances held by your users.
                  To prove solvency, your reserves must equal or exceed this amount.
                </p>
                <div className="explainer-formula">
                  <span className="formula-item reserves">Reserves</span>
                  <span className="formula-operator">≥</span>
                  <span className="formula-item liabilities">Liabilities</span>
                  <span className="formula-result">= Solvent ✓</span>
                </div>
              </div>

              <div className="input-method-tabs">
                <button className="tab-btn active">Manual Input</button>
                <button className="tab-btn" disabled title="Coming soon: Auto-fetch from Horizon API">
                  Import from Stellar
                </button>
              </div>

              {/* Stats */}
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-label">Total Liabilities</div>
                  <div className="stat-value mono">{totalLiabilities.toLocaleString()}</div>
                  <div className="stat-sublabel">Sum of all holder balances</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Holders Counted</div>
                  <div className={`stat-value mono ${count === N ? 'text-gradient' : 'opacity-50'}`}>
                    {count}/{N}
                  </div>
                  <div className="stat-sublabel">Required for proof</div>
                </div>
              </div>

              <label className="input-label">
                Enter {N} holder balances (comma or space separated)
                <span className="privacy-note">🔒 Zero-Knowledge: Individual amounts remain private</span>
              </label>

              <textarea
                className="vz-input balance-input mono"
                value={balances}
                onChange={(e) => setBalances(e.target.value)}
                placeholder="100000, 50000, 25000, 75000, 30000, 20000, 60000, 40000"
                rows={4}
              />

              <div className="balance-status">
                {count === N ? (
                  <span className="badge badge-success">✓ Ready to Generate Proof</span>
                ) : (
                  <span className="badge badge-error">⚠ Need {N - count} more</span>
                )}
              </div>
            </div>

            {/* Reserve Addresses Input */}
            <div className="vz-card input-card">
              <div className="input-header">
                <h3>🔒 Reserve Address Commitment</h3>
                <span className="info-badge" title="Cryptographically bind proof to specific addresses">ℹ️</span>
              </div>

              <p className="explainer-text">
                Enter the Stellar addresses that hold your reserves. The proof will be cryptographically bound
                to these addresses, preventing manipulation after generation.
              </p>

              <label className="input-label">
                Reserve Addresses (1-5 addresses, comma or space separated)
                <span className="privacy-note">🔗 Addresses are committed in the proof</span>
              </label>

              <textarea
                className="vz-input balance-input mono"
                value={reserveAddresses}
                onChange={(e) => setReserveAddresses(e.target.value)}
                placeholder="GABCDEFGHIJ..., GXYZABC..."
                rows={2}
              />

              <div className="balance-status">
                {reserveAddresses.split(/[\s,]+/).filter(Boolean).length > 0 ? (
                  <span className="badge badge-success">
                    ✓ {reserveAddresses.split(/[\s,]+/).filter(Boolean).length} address(es) configured
                  </span>
                ) : (
                  <span className="badge badge-error">⚠ At least 1 address required</span>
                )}
              </div>
            </div>

            {/* Contract ID */}
            <div className="card">
              <h3>Solvency Policy Contract</h3>
              <input
                className="vz-input mono"
                value={contractId}
                onChange={(e) => setContractId(e.target.value)}
                placeholder="Contract ID"
              />
            </div>

            {/* Generate Button */}
            <button
              className="vz-btn vz-btn-primary btn-large"
              onClick={startProofGeneration}
              disabled={count !== N || !contractId || !reserveAddresses.trim()}
            >
              Generate Zero-Knowledge Proof
            </button>
          </div>
        )}

        {/* Step 2 & 3: Proof Generation & Success */}
        {step === 2 && (
          <ProofGenerator
            balances={balanceList}
            contractId={contractId}
            address={publicKey}
            reserveAddresses={reserveAddresses.split(/[\s,]+/).filter(Boolean)}
            onSuccess={handleProofSuccess}
            onError={handleProofError}
          />
        )}

        {/* Step 3: Success */}
        {step === 3 && txHash && (
          <div className="vz-card success-card animate-scaleIn">
            <ShieldAnimation onComplete={() => {}} />
            <h2 className="text-gradient">Proof Verified On-Chain</h2>
            <p className="success-message">
              Your solvency attestation has been cryptographically verified and
              recorded on the Stellar blockchain.
            </p>

            <div className="tx-display">
              <div className="tx-label mono">Transaction Hash</div>
              <a
                href={`https://stellar.expert/explorer/testnet/tx/${txHash}`}
                target="_blank"
                rel="noreferrer"
                className="tx-hash mono"
              >
                {txHash.slice(0, 16)}...{txHash.slice(-16)}
                <span className="external-icon">↗</span>
              </a>
            </div>

            <div className="success-actions">
              <button className="vz-btn vz-btn-secondary" onClick={() => setStep(1)}>
                Generate Another
              </button>
              <button className="vz-btn vz-btn-ghost" onClick={onBack}>
                Back to Home
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .issuer-flow {
          min-height: 100vh;
          padding: var(--space-xl) var(--space-md);
          max-width: 800px;
          margin: 0 auto;
        }

        .flow-header {
          text-align: center;
          margin-bottom: var(--space-xl);
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

        .progress-steps {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: var(--space-xl) 0;
          padding: 0 var(--space-lg);
        }

        .progress-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-xs);
          opacity: 0.3;
          transition: opacity var(--duration-normal);
        }

        .progress-step.active {
          opacity: 1;
        }

        .step-number {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid var(--noir-slate);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-weight: 600;
          transition: all var(--duration-normal);
        }

        .progress-step.active .step-number {
          border-color: var(--emerald-electric);
          color: var(--emerald-electric);
          box-shadow: var(--shadow-glow-emerald);
        }

        .progress-step.completed .step-number {
          background: var(--emerald-electric);
          border-color: var(--emerald-electric);
          color: var(--noir-black);
        }

        .step-label {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .progress-line {
          width: 60px;
          height: 2px;
          background: var(--noir-slate);
          margin: 0 var(--space-sm);
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

        .flow-content {
          margin-top: var(--space-xl);
        }

        .step-card {
          text-align: center;
          padding: var(--space-2xl);
          max-width: 500px;
          margin: 0 auto;
        }

        .step-icon {
          margin: 0 auto var(--space-lg);
          color: var(--emerald-electric);
        }

        .step-card h2 {
          margin-bottom: var(--space-md);
        }

        .step-description {
          color: var(--noir-fog);
          margin-bottom: var(--space-xl);
          line-height: 1.7;
        }

        .input-section {
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
        }

        .connected-card {
          background: linear-gradient(135deg, var(--noir-charcoal), var(--noir-slate));
        }

        .connected-header {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          margin-bottom: var(--space-sm);
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          position: relative;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          background: var(--emerald-electric);
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        .btn-disconnect {
          margin-left: auto;
          background: none;
          border: 1px solid var(--noir-slate);
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--noir-fog);
          cursor: pointer;
          transition: all var(--duration-fast);
          font-size: 0.875rem;
          padding: 0;
        }

        .btn-disconnect:hover {
          background: rgba(255, 0, 0, 0.1);
          border-color: var(--ruby-alert);
          color: var(--ruby-alert);
        }

        .connected-address {
          font-size: 1.25rem;
        }

        .info-card {
          background: rgba(0, 255, 255, 0.05);
          border-color: var(--cyan-bright);
        }

        .info-card h3 {
          color: var(--cyan-bright);
          margin-bottom: var(--space-sm);
        }

        .info-text {
          color: var(--noir-fog);
          margin-bottom: var(--space-md);
        }

        .source-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--space-sm);
          margin-bottom: var(--space-md);
        }

        .source-item {
          display: flex;
          align-items: center;
          gap: var(--space-xs);
          font-family: var(--font-mono);
          font-size: 0.875rem;
        }

        .source-check {
          color: var(--emerald-electric);
          font-weight: bold;
        }

        .info-highlight {
          background: rgba(0, 0, 0, 0.3);
          padding: var(--space-sm);
          border-radius: var(--radius-md);
          border-left: 3px solid var(--cyan-bright);
          font-size: 0.875rem;
          font-style: italic;
        }

        .input-card h3 {
          margin-bottom: var(--space-sm);
        }

        .input-header {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          margin-bottom: var(--space-md);
        }

        .info-badge {
          font-size: 1rem;
          opacity: 0.6;
          cursor: help;
          transition: opacity var(--duration-fast);
        }

        .info-badge:hover {
          opacity: 1;
        }

        .liability-explainer {
          background: rgba(0, 255, 255, 0.05);
          border: 1px solid var(--cyan-bright);
          border-radius: var(--radius-md);
          padding: var(--space-md);
          margin-bottom: var(--space-lg);
        }

        .explainer-text {
          color: var(--noir-fog);
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: var(--space-md);
        }

        .explainer-formula {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-sm);
          padding: var(--space-sm);
          background: rgba(0, 0, 0, 0.3);
          border-radius: var(--radius-sm);
          font-family: var(--font-mono);
          font-size: 0.95rem;
        }

        .formula-item {
          padding: var(--space-xs) var(--space-sm);
          border-radius: var(--radius-sm);
          font-weight: 600;
        }

        .formula-item.reserves {
          background: rgba(0, 255, 255, 0.2);
          color: var(--cyan-bright);
        }

        .formula-item.liabilities {
          background: rgba(139, 92, 246, 0.2);
          color: var(--violet-deep);
        }

        .formula-operator {
          color: var(--noir-fog);
          font-size: 1.2rem;
        }

        .formula-result {
          margin-left: var(--space-sm);
          padding-left: var(--space-sm);
          border-left: 1px solid var(--noir-slate);
          color: var(--emerald-electric);
        }

        .input-method-tabs {
          display: flex;
          gap: var(--space-xs);
          margin-bottom: var(--space-md);
        }

        .tab-btn {
          flex: 1;
          padding: var(--space-sm) var(--space-md);
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--noir-slate);
          border-radius: var(--radius-md);
          color: var(--noir-fog);
          font-size: 0.875rem;
          cursor: pointer;
          transition: all var(--duration-fast);
        }

        .tab-btn.active {
          background: rgba(0, 255, 255, 0.1);
          border-color: var(--cyan-bright);
          color: var(--cyan-bright);
        }

        .tab-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .input-help {
          color: var(--noir-fog);
          font-size: 0.875rem;
          margin-bottom: var(--space-md);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-md);
          margin-bottom: var(--space-md);
        }

        .stat-item {
          background: rgba(0, 0, 0, 0.3);
          padding: var(--space-md);
          border-radius: var(--radius-md);
        }

        .stat-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--noir-fog);
          margin-bottom: var(--space-xs);
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 600;
        }

        .stat-sublabel {
          font-size: 0.75rem;
          color: var(--noir-fog);
          margin-top: var(--space-xs);
          opacity: 0.7;
        }

        .input-label {
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
          margin-bottom: var(--space-sm);
          font-size: 0.9rem;
          color: var(--noir-silver);
        }

        .privacy-note {
          font-size: 0.8rem;
          color: var(--emerald-electric);
          font-style: italic;
        }

        .balance-input {
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .balance-status {
          display: flex;
          justify-content: flex-end;
        }

        .btn-large {
          width: 100%;
          padding: var(--space-md) var(--space-xl);
          font-size: 1.125rem;
        }

        .success-card {
          text-align: center;
          padding: var(--space-2xl);
          background: linear-gradient(135deg, var(--noir-charcoal), var(--noir-void));
        }

        .success-icon {
          margin: 0 auto var(--space-lg);
          color: var(--emerald-electric);
        }

        .success-message {
          color: var(--noir-fog);
          max-width: 500px;
          margin: var(--space-lg) auto;
          line-height: 1.7;
        }

        .tx-display {
          background: rgba(0, 0, 0, 0.3);
          padding: var(--space-lg);
          border-radius: var(--radius-md);
          border: 1px solid var(--emerald-electric);
          margin: var(--space-xl) 0;
        }

        .tx-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--noir-fog);
          margin-bottom: var(--space-sm);
        }

        .tx-hash {
          color: var(--emerald-electric);
          text-decoration: none;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-xs);
          transition: all var(--duration-normal);
        }

        .tx-hash:hover {
          color: var(--cyan-bright);
          text-shadow: var(--shadow-glow-cyan);
        }

        .external-icon {
          font-size: 1.25rem;
        }

        .success-actions {
          display: flex;
          gap: var(--space-md);
          justify-content: center;
          margin-top: var(--space-xl);
        }

        @media (max-width: 768px) {
          .progress-steps {
            padding: 0;
          }

          .progress-line {
            width: 30px;
            margin: 0 var(--space-xs);
          }

          .step-label {
            font-size: 0.65rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
