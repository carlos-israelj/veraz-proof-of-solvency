import React, { useState, useEffect } from 'react';
import './VerazBadge.css';

/**
 * Veraz Solvency Badge - Embeddable Component
 *
 * Purpose: Displays protocol's solvency status in a compact, embeddable widget
 * Based on: PRODUCT_DEFINITION.md (Production-Ready Infrastructure) and API_SPECIFICATION_V1.md
 *
 * Key Differentiator vs zkPOS:
 * - Multi-source reserve breakdown (SAC + DeFindex + Aquarius)
 * - Real-time updates via API
 * - Customizable themes and sizes
 * - Click-through to detailed verification page
 *
 * Usage:
 *   <VerazBadge protocol="defindex-vault-123" theme="dark" size="medium" />
 */

const VerazBadge = ({
  protocol,
  theme = 'auto',
  size = 'medium',
  showBreakdown = false,
  apiKey = null,
  refreshInterval = 60000 // 1 minute default
}) => {
  const [solvencyData, setSolvencyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);

  // Fetch solvency status from Veraz API
  useEffect(() => {
    const fetchSolvency = async () => {
      try {
        setLoading(true);

        // In production, this would call the real API
        // For now, mock data based on DEFINDEX_TESTING_REPORT.md
        const mockData = {
          protocol_id: protocol,
          protocol_name: "DeFindex USDC Vault",
          status: "solvent",
          solvency_ratio: 1.05,
          attestation: {
            solvent: true,
            reserves: 105000000000000,
            liabilities: 100000000000000,
            ledger_seq: 12345678,
            timestamp: new Date().toISOString(),
            proof_hash: "0x1234...abcd"
          },
          reserve_breakdown: {
            sac_balance: 50000000000000,
            aquarius_balance: 0,
            defindex_balance: 55000000000000,
            total: 105000000000000
          },
          verification: {
            contract_address: "CBCD1234...ABCD",
            network: "mainnet",
            verified_at: new Date().toISOString()
          }
        };

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));

        setSolvencyData(mockData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSolvency();

    // Refresh on interval
    const interval = setInterval(fetchSolvency, refreshInterval);
    return () => clearInterval(interval);
  }, [protocol, refreshInterval]);

  // Format stroops to human-readable USDC
  const formatAmount = (stroops) => {
    const usdc = stroops / 10000000; // 7 decimals
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(usdc);
  };

  // Format percentage
  const formatPercentage = (ratio) => {
    return ((ratio - 1) * 100).toFixed(2);
  };

  // Format timestamp
  const formatTimestamp = (iso) => {
    const date = new Date(iso);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className={`veraz-badge veraz-badge--${theme} veraz-badge--${size} veraz-badge--loading`}>
        <div className="veraz-badge__loader">
          <div className="veraz-spinner"></div>
          <span>Verifying solvency...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`veraz-badge veraz-badge--${theme} veraz-badge--${size} veraz-badge--error`}>
        <div className="veraz-badge__error">
          <span className="veraz-badge__icon">⚠️</span>
          <span>Verification unavailable</span>
        </div>
      </div>
    );
  }

  const { status, solvency_ratio, attestation, reserve_breakdown } = solvencyData;
  const isSolvent = attestation.solvent;

  return (
    <div
      className={`veraz-badge veraz-badge--${theme} veraz-badge--${size} veraz-badge--${status}`}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Compact Badge View */}
      <div className="veraz-badge__header">
        <div className="veraz-badge__status">
          <span className={`veraz-badge__icon ${isSolvent ? 'solvent' : 'insolvent'}`}>
            {isSolvent ? '✓' : '⚠'}
          </span>
          <div className="veraz-badge__text">
            <span className="veraz-badge__label">
              {isSolvent ? 'Fully Backed' : 'Undercollateralized'}
            </span>
            <span className="veraz-badge__ratio">
              {(solvency_ratio * 100).toFixed(1)}%
              {isSolvent && (
                <span className="veraz-badge__excess">
                  (+{formatPercentage(solvency_ratio)}%)
                </span>
              )}
            </span>
          </div>
        </div>

        <div className="veraz-badge__timestamp">
          {formatTimestamp(attestation.timestamp)}
        </div>
      </div>

      {/* Expanded Breakdown (if showBreakdown or clicked) */}
      {(showBreakdown || expanded) && (
        <div className="veraz-badge__breakdown">
          <div className="veraz-badge__divider"></div>

          <div className="veraz-badge__reserves">
            <h4 className="veraz-badge__breakdown-title">Reserve Sources</h4>

            {reserve_breakdown.sac_balance > 0 && (
              <div className="veraz-badge__source">
                <span className="veraz-badge__source-label">SAC Wallets</span>
                <span className="veraz-badge__source-amount">
                  {formatAmount(reserve_breakdown.sac_balance)}
                </span>
                <span className="veraz-badge__source-pct">
                  {((reserve_breakdown.sac_balance / reserve_breakdown.total) * 100).toFixed(1)}%
                </span>
              </div>
            )}

            {reserve_breakdown.defindex_balance > 0 && (
              <div className="veraz-badge__source">
                <span className="veraz-badge__source-label">DeFindex Vaults</span>
                <span className="veraz-badge__source-amount">
                  {formatAmount(reserve_breakdown.defindex_balance)}
                </span>
                <span className="veraz-badge__source-pct">
                  {((reserve_breakdown.defindex_balance / reserve_breakdown.total) * 100).toFixed(1)}%
                </span>
              </div>
            )}

            {reserve_breakdown.aquarius_balance > 0 && (
              <div className="veraz-badge__source">
                <span className="veraz-badge__source-label">Aquarius Pools</span>
                <span className="veraz-badge__source-amount">
                  {formatAmount(reserve_breakdown.aquarius_balance)}
                </span>
                <span className="veraz-badge__source-pct">
                  {((reserve_breakdown.aquarius_balance / reserve_breakdown.total) * 100).toFixed(1)}%
                </span>
              </div>
            )}
          </div>

          <div className="veraz-badge__totals">
            <div className="veraz-badge__total-row">
              <span>Total Reserves:</span>
              <strong>{formatAmount(attestation.reserves)}</strong>
            </div>
            <div className="veraz-badge__total-row">
              <span>Total Liabilities:</span>
              <strong>{formatAmount(attestation.liabilities)}</strong>
            </div>
          </div>

          <div className="veraz-badge__footer">
            <a
              href={`https://veraz.io/protocol/${protocol}`}
              target="_blank"
              rel="noopener noreferrer"
              className="veraz-badge__link"
              onClick={(e) => e.stopPropagation()}
            >
              View Proof Details →
            </a>
          </div>
        </div>
      )}

      {/* Powered by Veraz watermark */}
      <div className="veraz-badge__branding">
        <a
          href="https://veraz.io"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          Verified by Veraz
        </a>
      </div>
    </div>
  );
};

export default VerazBadge;
