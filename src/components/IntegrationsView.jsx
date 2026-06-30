import { useState, useEffect } from 'react';
import GlitchText from './GlitchText';
import DepositModal from './DepositModal';
import YieldChart from './YieldChart';
import {
  DEFINDEX_VAULTS,
  getAllVaultsData,
  generateHistoricalYields
} from '../lib/defindex';

/**
 * Integrations View
 * Shows live data from DeFindex vaults and Aquarius pools
 * Demonstrates multi-source reserve aggregation
 */

const AQUARIUS_POOLS = [
  {
    id: 'CBEPUTV5IJHR75PKITMFDCWTTKEHLWDEUOARPNVIW52A3AHK7OLIFCEK',
    name: 'XLM/AQUA',
    type: 'Concentrated Liquidity',
    fee: '0.30%',
    volume24h: '293.8B',
    icon: '🌊',
  },
  {
    id: 'CDG2O3AM2NKHOWJHCXMOFBI4RL4INYIW3N4YZYI3UOOCEULOJML276BJ',
    name: 'USDC/AQUA',
    type: 'Concentrated Liquidity',
    fee: '0.10%',
    volume24h: '16.5T',
    icon: '💧',
  },
];

export default function IntegrationsView({ onBack }) {
  const [activeTab, setActiveTab] = useState('defindex'); // 'defindex' | 'aquarius' | 'overview'
  const [mounted, setMounted] = useState(false);
  const [vaultsData, setVaultsData] = useState([]);
  const [isLoadingVaults, setIsLoadingVaults] = useState(true);
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [selectedVault, setSelectedVault] = useState(null);
  const [yieldHistory, setYieldHistory] = useState({});

  useEffect(() => {
    setMounted(true);
    loadVaultData();
  }, []);

  async function loadVaultData() {
    setIsLoadingVaults(true);
    try {
      // Fetch live vault data
      const liveVaults = await getAllVaultsData();
      setVaultsData(liveVaults);

      // Generate historical yield data for each vault
      const history = {};
      liveVaults.forEach(vault => {
        history[vault.id] = generateHistoricalYields(vault.id, 30);
      });
      setYieldHistory(history);
    } catch (error) {
      console.error('Failed to load vault data:', error);
      // Fallback to static data from DEFINDEX_VAULTS
      setVaultsData(Object.values(DEFINDEX_VAULTS));
    } finally {
      setIsLoadingVaults(false);
    }
  }

  function openDepositModal(vault) {
    setSelectedVault(vault);
    setDepositModalOpen(true);
  }

  function closeDepositModal() {
    setDepositModalOpen(false);
    setSelectedVault(null);
    // Reload vault data after deposit
    loadVaultData();
  }

  return (
    <div className="integrations-view">
      {/* Header */}
      <div className="flow-header">
        <button className="btn-ghost" onClick={onBack}>
          ← Back
        </button>
        <h1 className="flow-title">
          <GlitchText active={mounted}>
            <span className="text-gradient">INTEGRATIONS</span>
          </GlitchText>
        </h1>
        <p className="flow-subtitle mono">Multi-Source Reserve Aggregation</p>
      </div>

      {/* Info Banner */}
      <div className="info-banner animate-slideUp">
        <div className="info-icon">🌊</div>
        <div className="info-content">
          <h3>Multi-Source Solvency Verification</h3>
          <p>
            Veraz is the first Proof of Solvency protocol that aggregates reserves from
            <strong> DeFi protocols</strong> (Aquarius AMM + DeFindex Vaults) alongside
            traditional wallet balances. This enables comprehensive solvency verification
            for modern crypto businesses.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs animate-slideUp stagger-1">
        <button
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <span className="tab-icon">📊</span>
          <span>Overview</span>
        </button>
        <button
          className={`tab ${activeTab === 'defindex' ? 'active' : ''}`}
          onClick={() => setActiveTab('defindex')}
        >
          <span className="tab-icon">🏦</span>
          <span>DeFindex Vaults</span>
        </button>
        <button
          className={`tab ${activeTab === 'aquarius' ? 'active' : ''}`}
          onClick={() => setActiveTab('aquarius')}
        >
          <span className="tab-icon">🌊</span>
          <span>Aquarius Pools</span>
        </button>
      </div>

      {/* Content */}
      <div className="tab-content">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="overview-section animate-fadeIn">
            <div className="integration-grid">
              <div className="integration-card card animate-scaleIn">
                <div className="integration-header">
                  <span className="integration-icon">🏦</span>
                  <h2>DeFindex</h2>
                  <span className="badge badge-success">ACTIVE</span>
                </div>
                <p className="integration-description">
                  Yield aggregation protocol. Veraz reads vault share balances and converts
                  them to underlying asset values using the "rule of three" formula.
                </p>
                <div className="integration-stats">
                  <div className="stat">
                    <div className="stat-label">Vaults Configured</div>
                    <div className="stat-value">3</div>
                  </div>
                  <div className="stat">
                    <div className="stat-label">Assets</div>
                    <div className="stat-value">USDC, XLM, CETES</div>
                  </div>
                  <div className="stat">
                    <div className="stat-label">Total TVL</div>
                    <div className="stat-value">~40K</div>
                  </div>
                </div>
                <div className="integration-code">
                  <div className="code-label mono">CONTRACT INTEGRATION</div>
                  <pre className="code-block mono">
{`// Read vault balances
for vault in vaults {
  shares = vault.balance(user);
  total = vault.total_supply();
  assets = vault.fetch_total_managed_funds();
  value = (shares * assets) / total;
  reserves += value;
}`}
                  </pre>
                </div>
                <a
                  href="https://docs.defindex.io/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary"
                >
                  View DeFindex Docs →
                </a>
              </div>

              <div className="integration-card card animate-scaleIn stagger-1">
                <div className="integration-header">
                  <span className="integration-icon">🌊</span>
                  <h2>Aquarius AMM</h2>
                  <span className="badge badge-success">ACTIVE</span>
                </div>
                <p className="integration-description">
                  Decentralized exchange on Stellar. Veraz reads pool share token balances
                  to include AMM liquidity as part of total reserves.
                </p>
                <div className="integration-stats">
                  <div className="stat">
                    <div className="stat-label">Pools Configured</div>
                    <div className="stat-value">2</div>
                  </div>
                  <div className="stat">
                    <div className="stat-label">Pairs</div>
                    <div className="stat-value">XLM/AQUA, USDC/AQUA</div>
                  </div>
                  <div className="stat">
                    <div className="stat-label">Available Pools</div>
                    <div className="stat-value">84 on Testnet</div>
                  </div>
                </div>
                <div className="integration-code">
                  <div className="code-label mono">CONTRACT INTEGRATION</div>
                  <pre className="code-block mono">
{`// Read pool share balances
for pool in pools {
  balance = pool.balance(user);
  reserves += balance;
}`}
                  </pre>
                </div>
                <a
                  href="https://docs.aqua.network/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary"
                >
                  View Aquarius Docs →
                </a>
              </div>
            </div>
          </div>
        )}

        {/* DeFindex Tab */}
        {activeTab === 'defindex' && (
          <div className="defindex-section animate-fadeIn">
            <div className="section-intro">
              <h2>DeFindex Yield Vaults</h2>
              <p>
                Configured vaults in the Solvency Policy contract. When users deposit assets
                into these vaults, the shares are automatically counted as reserves.
              </p>
            </div>

            <div className="vaults-grid">
              {isLoadingVaults ? (
                <div className="loading-state">
                  <div className="spinner-large"></div>
                  <p>Loading live vault data...</p>
                </div>
              ) : (
                vaultsData.map((vault, idx) => (
                  <div key={vault.id} className={`vault-card card animate-scaleIn stagger-${idx + 1}`}>
                    <div className="vault-header">
                      <span className="vault-icon">{vault.icon}</span>
                      <div className="vault-info">
                        <h3>{vault.name}</h3>
                        <div className="vault-asset mono">{vault.asset}</div>
                      </div>
                      <div className="vault-apy">
                        <div className="apy-label">APY</div>
                        <div className="apy-value text-gradient">
                          {typeof vault.apy === 'number' ? vault.apy.toFixed(1) : vault.apy}%
                        </div>
                      </div>
                    </div>

                    <div className="vault-stats">
                      <div className="vault-stat">
                        <span className="stat-label">TVL</span>
                        <span className="stat-value mono">
                          {typeof vault.tvl === 'number'
                            ? vault.tvl.toLocaleString()
                            : vault.tvl}
                        </span>
                      </div>
                      <div className="vault-stat">
                        <span className="stat-label">Strategy</span>
                        <span className="stat-value">{vault.strategy || 'Yield Aggregation'}</span>
                      </div>
                    </div>

                    {/* Yield Chart */}
                    {yieldHistory[vault.id] && (
                      <div className="vault-chart">
                        <YieldChart
                          data={yieldHistory[vault.id]}
                          title="30-Day APY History"
                          height={150}
                        />
                      </div>
                    )}

                    <div className="vault-contract">
                      <div className="contract-label mono">CONTRACT ID</div>
                      <div className="contract-id mono">
                        {vault.id.slice(0, 8)}...{vault.id.slice(-8)}
                      </div>
                    </div>

                    <div className="vault-actions">
                      <button
                        className="btn btn-primary btn-small"
                        onClick={() => openDepositModal(vault)}
                      >
                        Deposit {vault.asset}
                      </button>
                      <a
                        href={`https://stellar.expert/explorer/testnet/contract/${vault.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-ghost btn-small"
                      >
                        View on Stellar.Expert →
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="integration-example card">
              <h3>💡 How It Works</h3>
              <ol className="steps-list">
                <li>
                  <strong>User deposits</strong> USDC into DeFindex vault
                </li>
                <li>
                  <strong>Receives vault shares</strong> representing proportional ownership
                </li>
                <li>
                  <strong>Veraz contract reads</strong> share balance using <code>balance()</code>
                </li>
                <li>
                  <strong>Converts to asset value</strong> using "rule of three":
                  <pre className="code-inline mono">value = (shares × total_assets) ÷ total_supply</pre>
                </li>
                <li>
                  <strong>Adds to total reserves</strong> for solvency check
                </li>
              </ol>
            </div>
          </div>
        )}

        {/* Aquarius Tab */}
        {activeTab === 'aquarius' && (
          <div className="aquarius-section animate-fadeIn">
            <div className="section-intro">
              <h2>Aquarius AMM Pools</h2>
              <p>
                Configured liquidity pools in the Solvency Policy contract. Pool share balances
                are automatically included in reserve calculations.
              </p>
            </div>

            <div className="pools-grid">
              {AQUARIUS_POOLS.map((pool, idx) => (
                <div key={pool.id} className={`pool-card card animate-scaleIn stagger-${idx + 1}`}>
                  <div className="pool-header">
                    <span className="pool-icon">{pool.icon}</span>
                    <div className="pool-info">
                      <h3>{pool.name}</h3>
                      <div className="pool-type">{pool.type}</div>
                    </div>
                  </div>

                  <div className="pool-stats">
                    <div className="pool-stat">
                      <span className="stat-label">Fee</span>
                      <span className="stat-value text-gradient">{pool.fee}</span>
                    </div>
                    <div className="pool-stat">
                      <span className="stat-label">24h Volume</span>
                      <span className="stat-value mono">{pool.volume24h}</span>
                    </div>
                  </div>

                  <div className="pool-contract">
                    <div className="contract-label mono">CONTRACT ID</div>
                    <div className="contract-id mono">
                      {pool.id.slice(0, 8)}...{pool.id.slice(-8)}
                    </div>
                  </div>

                  <button className="btn btn-ghost btn-small">
                    View on Aquarius →
                  </button>
                </div>
              ))}
            </div>

            <div className="integration-example card">
              <h3>💡 How It Works</h3>
              <ol className="steps-list">
                <li>
                  <strong>User provides liquidity</strong> to XLM/AQUA pool
                </li>
                <li>
                  <strong>Receives pool share tokens</strong> (LP tokens)
                </li>
                <li>
                  <strong>Veraz contract reads</strong> LP token balance
                </li>
                <li>
                  <strong>Includes in reserves</strong> as part of total holdings
                </li>
                <li>
                  <strong>Verifies solvency</strong> accounting for DeFi positions
                </li>
              </ol>
            </div>

            <div className="router-info card">
              <h4>🌐 Aquarius Testnet Router</h4>
              <div className="router-details mono">
                <div>Contract: CBCFTQSPDBAIZ6R6PJQKSQWKNKWH2QIV3I4J72SHWBIK3ADRRAM5A6GD</div>
                <div>Available Pools: 84</div>
                <div>API: https://amm-api-testnet.aqua.network/api/external/v1</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Deposit Modal */}
      <DepositModal
        isOpen={depositModalOpen}
        onClose={closeDepositModal}
        selectedVault={selectedVault}
      />

      <style jsx>{`
        .integrations-view {
          min-height: 100vh;
          padding: var(--space-xl) var(--space-md);
          max-width: 1200px;
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

        .info-banner {
          background: linear-gradient(135deg, rgba(0, 255, 255, 0.1), rgba(0, 255, 136, 0.1));
          border: 2px solid var(--cyan-bright);
          border-radius: var(--radius-lg);
          padding: var(--space-lg);
          margin-bottom: var(--space-xl);
          display: flex;
          gap: var(--space-md);
        }

        .info-icon {
          font-size: 3rem;
          flex-shrink: 0;
        }

        .info-content h3 {
          color: var(--cyan-bright);
          margin-bottom: var(--space-sm);
        }

        .info-content p {
          color: var(--noir-white);
          line-height: 1.7;
        }

        .info-content strong {
          color: var(--emerald-electric);
        }

        .tabs {
          display: flex;
          gap: var(--space-sm);
          margin-bottom: var(--space-xl);
          border-bottom: 2px solid var(--noir-slate);
        }

        .tab {
          background: none;
          border: none;
          color: var(--noir-fog);
          padding: var(--space-md) var(--space-lg);
          cursor: pointer;
          font-family: var(--font-display);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-size: 0.875rem;
          display: flex;
          align-items: center;
          gap: var(--space-xs);
          transition: all var(--duration-normal);
          border-bottom: 3px solid transparent;
          margin-bottom: -2px;
        }

        .tab:hover {
          color: var(--emerald-electric);
        }

        .tab.active {
          color: var(--emerald-electric);
          border-bottom-color: var(--emerald-electric);
        }

        .tab-icon {
          font-size: 1.25rem;
        }

        .integration-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
          gap: var(--space-xl);
          margin-bottom: var(--space-xl);
        }

        .integration-card {
          background: linear-gradient(135deg, var(--noir-charcoal), var(--noir-void));
        }

        .integration-header {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          margin-bottom: var(--space-md);
        }

        .integration-icon {
          font-size: 3rem;
        }

        .integration-header h2 {
          flex: 1;
          margin: 0;
        }

        .integration-description {
          color: var(--noir-fog);
          line-height: 1.7;
          margin-bottom: var(--space-lg);
        }

        .integration-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: var(--space-md);
          margin-bottom: var(--space-lg);
          padding: var(--space-md);
          background: rgba(0, 0, 0, 0.3);
          border-radius: var(--radius-md);
        }

        .stat {
          text-align: center;
        }

        .stat-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--noir-fog);
          margin-bottom: var(--space-xs);
        }

        .stat-value {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1.125rem;
          color: var(--emerald-electric);
        }

        .integration-code {
          margin-bottom: var(--space-lg);
        }

        .code-label {
          font-size: 0.75rem;
          color: var(--emerald-electric);
          margin-bottom: var(--space-xs);
          letter-spacing: 0.1em;
        }

        .code-block {
          background: rgba(0, 0, 0, 0.5);
          padding: var(--space-md);
          border-radius: var(--radius-md);
          border-left: 3px solid var(--emerald-electric);
          overflow-x: auto;
          font-size: 0.875rem;
          line-height: 1.6;
          color: var(--cyan-bright);
        }

        .section-intro {
          margin-bottom: var(--space-xl);
        }

        .section-intro h2 {
          margin-bottom: var(--space-sm);
        }

        .section-intro p {
          color: var(--noir-fog);
          line-height: 1.7;
        }

        .vaults-grid, .pools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: var(--space-lg);
          margin-bottom: var(--space-xl);
        }

        .vault-card, .pool-card {
          background: linear-gradient(135deg, var(--noir-charcoal), var(--noir-slate));
        }

        .vault-header, .pool-header {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          margin-bottom: var(--space-lg);
          padding-bottom: var(--space-md);
          border-bottom: 1px solid var(--noir-slate);
        }

        .vault-icon, .pool-icon {
          font-size: 2.5rem;
        }

        .vault-info, .pool-info {
          flex: 1;
        }

        .vault-info h3, .pool-info h3 {
          margin: 0 0 var(--space-xs);
          font-size: 1.25rem;
        }

        .vault-asset, .pool-type {
          font-size: 0.875rem;
          color: var(--emerald-electric);
        }

        .vault-apy {
          text-align: center;
        }

        .apy-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--noir-fog);
          margin-bottom: var(--space-xs);
        }

        .apy-value {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.5rem;
        }

        .vault-stats, .pool-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-md);
          margin-bottom: var(--space-lg);
        }

        .vault-stat, .pool-stat {
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
        }

        .vault-contract, .pool-contract {
          margin-bottom: var(--space-md);
        }

        .contract-label {
          font-size: 0.75rem;
          color: var(--noir-fog);
          margin-bottom: var(--space-xs);
          letter-spacing: 0.1em;
        }

        .contract-id {
          color: var(--cyan-bright);
          font-size: 0.875rem;
        }

        .btn-small {
          width: 100%;
          padding: var(--space-sm);
          font-size: 0.875rem;
        }

        .integration-example {
          background: rgba(0, 255, 136, 0.05);
          border: 1px solid var(--emerald-electric);
        }

        .integration-example h3 {
          color: var(--emerald-electric);
          margin-bottom: var(--space-md);
        }

        .steps-list {
          margin-left: var(--space-lg);
          color: var(--noir-white);
        }

        .steps-list li {
          margin-bottom: var(--space-sm);
          line-height: 1.7;
        }

        .steps-list strong {
          color: var(--emerald-electric);
        }

        .steps-list code {
          font-family: var(--font-mono);
          background: rgba(0, 0, 0, 0.3);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          color: var(--cyan-bright);
        }

        .code-inline {
          display: block;
          margin-top: var(--space-xs);
          background: rgba(0, 0, 0, 0.5);
          padding: var(--space-sm);
          border-radius: 4px;
        }

        .router-info {
          background: rgba(0, 255, 255, 0.05);
          border: 1px solid var(--cyan-bright);
        }

        .router-info h4 {
          color: var(--cyan-bright);
          margin-bottom: var(--space-md);
        }

        .router-details {
          font-size: 0.875rem;
          color: var(--noir-fog);
        }

        .router-details div {
          margin-bottom: var(--space-xs);
        }

        .loading-state {
          grid-column: 1 / -1;
          text-align: center;
          padding: var(--space-3xl) var(--space-md);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-lg);
        }

        .spinner-large {
          width: 60px;
          height: 60px;
          border: 4px solid var(--noir-slate);
          border-top-color: var(--emerald-electric);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .loading-state p {
          font-family: var(--font-mono);
          color: var(--noir-fog);
        }

        .vault-chart {
          margin-bottom: var(--space-lg);
        }

        .vault-actions {
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
        }

        .vault-actions a {
          text-decoration: none;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .integration-grid {
            grid-template-columns: 1fr;
          }

          .vaults-grid, .pools-grid {
            grid-template-columns: 1fr;
          }

          .tabs {
            flex-direction: column;
          }

          .tab {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
