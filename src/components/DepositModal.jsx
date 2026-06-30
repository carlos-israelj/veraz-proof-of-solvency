import { useState, useEffect } from 'react';
import { depositToVault, DEFINDEX_VAULTS } from '../lib/defindex';

export default function DepositModal({ isOpen, onClose, selectedVault }) {
  const [amount, setAmount] = useState('');
  const [userAddress, setUserAddress] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isDepositing, setIsDepositing] = useState(false);
  const [txStatus, setTxStatus] = useState(null); // null | 'pending' | 'success' | 'error'
  const [txHash, setTxHash] = useState(null);
  const [error, setError] = useState(null);

  // Connect Freighter wallet
  async function connectWallet() {
    setIsConnecting(true);
    setError(null);

    try {
      // Check if Freighter is installed
      if (!window.freighterApi) {
        throw new Error('Freighter wallet not installed. Please install from freighter.app');
      }

      // Request access
      const isAllowed = await window.freighterApi.isAllowed();

      if (!isAllowed) {
        await window.freighterApi.setAllowed();
      }

      // Get public key
      const publicKey = await window.freighterApi.getPublicKey();
      setUserAddress(publicKey);
    } catch (err) {
      console.error('Wallet connection error:', err);
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  }

  // Handle deposit
  async function handleDeposit() {
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (!userAddress) {
      setError('Please connect your wallet first');
      return;
    }

    setIsDepositing(true);
    setTxStatus('pending');
    setError(null);

    try {
      // Convert amount to stroops (7 decimals for most assets)
      const amountInStroops = Math.floor(parseFloat(amount) * 10000000);

      // Sign transaction using Freighter
      async function signTransaction(xdr) {
        return await window.freighterApi.signTransaction(xdr, {
          network: 'TESTNET',
          networkPassphrase: 'Test SDF Network ; September 2015',
        });
      }

      const result = await depositToVault({
        vaultId: selectedVault.id,
        amount: amountInStroops,
        userAddress,
        signTransaction,
      });

      if (result.success) {
        setTxStatus('success');
        setTxHash(result.hash);
        setAmount('');
      } else {
        throw new Error('Deposit transaction failed');
      }
    } catch (err) {
      console.error('Deposit error:', err);
      setError(err.message || 'Deposit failed');
      setTxStatus('error');
    } finally {
      setIsDepositing(false);
    }
  }

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTxStatus(null);
      setTxHash(null);
      setError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const vault = selectedVault || Object.values(DEFINDEX_VAULTS)[0];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Deposit to {vault.name}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          {/* Wallet Connection */}
          {!userAddress ? (
            <div className="wallet-section">
              <p className="text-center opacity-70">
                Connect your Freighter wallet to deposit
              </p>
              <button
                className="btn btn-primary w-full"
                onClick={connectWallet}
                disabled={isConnecting}
              >
                {isConnecting ? 'Connecting...' : 'Connect Freighter Wallet'}
              </button>
            </div>
          ) : (
            <div className="wallet-connected">
              <div className="wallet-badge">
                <span className="wallet-icon">🔐</span>
                <span className="wallet-address">
                  {userAddress.slice(0, 8)}...{userAddress.slice(-8)}
                </span>
              </div>
            </div>
          )}

          {/* Deposit Form */}
          {userAddress && txStatus !== 'success' && (
            <div className="deposit-form">
              <div className="vault-info">
                <div className="vault-icon-large">{vault.icon}</div>
                <div>
                  <div className="vault-name">{vault.name}</div>
                  <div className="vault-asset mono opacity-70">{vault.asset}</div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="deposit-amount">Amount to Deposit</label>
                <div className="input-group">
                  <input
                    id="deposit-amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    disabled={isDepositing}
                    step="0.01"
                    min="0"
                  />
                  <span className="input-suffix">{vault.asset}</span>
                </div>
              </div>

              {error && (
                <div className="alert alert-error">
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              <button
                className="btn btn-primary w-full"
                onClick={handleDeposit}
                disabled={isDepositing || !amount}
              >
                {isDepositing ? 'Processing...' : `Deposit ${vault.asset}`}
              </button>

              {txStatus === 'pending' && (
                <div className="tx-pending">
                  <div className="spinner"></div>
                  <p>Waiting for transaction confirmation...</p>
                </div>
              )}
            </div>
          )}

          {/* Success State */}
          {txStatus === 'success' && (
            <div className="deposit-success">
              <div className="success-icon">✓</div>
              <h3>Deposit Successful!</h3>
              <p className="opacity-70">
                Your {vault.asset} has been deposited to the vault
              </p>

              {txHash && (
                <a
                  href={`https://stellar.expert/explorer/testnet/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tx-link"
                >
                  View on Stellar.Expert →
                </a>
              )}

              <button
                className="btn btn-secondary w-full"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: var(--space-md);
          animation: fadeIn 0.2s ease-out;
        }

        .modal-content {
          background: linear-gradient(135deg, var(--noir-charcoal), var(--noir-void));
          border: 1px solid var(--noir-slate);
          border-radius: var(--radius-lg);
          max-width: 500px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          animation: slideUp 0.3s ease-out;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--space-lg);
          border-bottom: 1px solid var(--noir-slate);
        }

        .modal-header h2 {
          margin: 0;
          color: var(--emerald-electric);
          font-size: 1.5rem;
        }

        .modal-close {
          background: none;
          border: none;
          color: var(--noir-fog);
          font-size: 2rem;
          cursor: pointer;
          padding: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color var(--duration-fast);
        }

        .modal-close:hover {
          color: var(--noir-white);
        }

        .modal-body {
          padding: var(--space-lg);
        }

        .wallet-section {
          text-align: center;
          padding: var(--space-xl) 0;
        }

        .wallet-section p {
          margin-bottom: var(--space-lg);
        }

        .wallet-connected {
          margin-bottom: var(--space-lg);
        }

        .wallet-badge {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          padding: var(--space-md);
          background: rgba(0, 255, 136, 0.1);
          border: 1px solid var(--emerald-electric);
          border-radius: var(--radius-md);
        }

        .wallet-icon {
          font-size: 1.5rem;
        }

        .wallet-address {
          font-family: var(--font-mono);
          color: var(--emerald-electric);
          font-size: 0.875rem;
        }

        .deposit-form {
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
        }

        .vault-info {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          padding: var(--space-md);
          background: var(--noir-void);
          border-radius: var(--radius-md);
        }

        .vault-icon-large {
          font-size: 2.5rem;
        }

        .vault-name {
          font-weight: 600;
          color: var(--noir-white);
        }

        .vault-asset {
          font-size: 0.875rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
        }

        .form-group label {
          font-family: var(--font-mono);
          font-size: 0.875rem;
          color: var(--noir-fog);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .input-group {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-group input {
          flex: 1;
          padding: var(--space-md);
          padding-right: 80px;
          background: var(--noir-void);
          border: 1px solid var(--noir-slate);
          border-radius: var(--radius-md);
          color: var(--noir-white);
          font-family: var(--font-mono);
          font-size: 1.25rem;
          transition: border-color var(--duration-fast);
        }

        .input-group input:focus {
          outline: none;
          border-color: var(--emerald-electric);
        }

        .input-group input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .input-suffix {
          position: absolute;
          right: var(--space-md);
          color: var(--noir-fog);
          font-family: var(--font-mono);
          font-weight: 600;
          pointer-events: none;
        }

        .alert {
          padding: var(--space-md);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          font-size: 0.875rem;
        }

        .alert-error {
          background: rgba(255, 0, 68, 0.1);
          border: 1px solid var(--ruby-alert);
          color: var(--ruby-alert);
        }

        .w-full {
          width: 100%;
        }

        .tx-pending {
          text-align: center;
          padding: var(--space-lg) 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-md);
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid var(--noir-slate);
          border-top-color: var(--emerald-electric);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .deposit-success {
          text-align: center;
          padding: var(--space-xl) 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-md);
        }

        .success-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(0, 255, 136, 0.2);
          border: 2px solid var(--emerald-electric);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
          color: var(--emerald-electric);
          animation: scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .deposit-success h3 {
          color: var(--emerald-electric);
          margin: 0;
        }

        .tx-link {
          font-family: var(--font-mono);
          font-size: 0.875rem;
          color: var(--cyan-bright);
          text-decoration: none;
          padding: var(--space-sm) var(--space-md);
          border: 1px solid var(--cyan-bright);
          border-radius: var(--radius-md);
          transition: all var(--duration-fast);
        }

        .tx-link:hover {
          background: rgba(0, 255, 255, 0.1);
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
