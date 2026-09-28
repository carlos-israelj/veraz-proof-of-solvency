/**
 * AttestationCard Component
 * Based on Veraz brand kit attestation-card.html template
 *
 * Displays a comprehensive solvency report with:
 * - Solvency ratio (large display number)
 * - Reserve breakdown (SAC, DeFindex, Aquarius)
 * - Liabilities and margin
 * - Verification timestamp and ledger
 */

import VerazLogo from './VerazLogo';

function formatNumber(num) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(num);
}

function formatPercent(num) {
  return `${num.toFixed(1)}%`;
}

export default function AttestationCard({ attestation }) {
  if (!attestation) {
    return (
      <div className="attestation-card vz-card">
        <p style={{ textAlign: 'center', color: 'var(--vz-text-2)' }}>
          No attestation data available
        </p>
      </div>
    );
  }

  const {
    solvent,
    reserves,
    sac_balance = 0,
    defindex_balance = 0,
    aquarius_balance = 0,
    liabilities,
    ledger_seq,
    timestamp
  } = attestation;

  // Calculate metrics
  const totalReserves = Number(reserves);
  const totalLiabilities = Number(liabilities);
  const margin = totalReserves - totalLiabilities;
  const solvencyRatio = totalLiabilities > 0
    ? (totalReserves / totalLiabilities).toFixed(2)
    : '∞';

  // Calculate percentages
  const sacPct = totalReserves > 0 ? (Number(sac_balance) / totalReserves * 100) : 0;
  const defindexPct = totalReserves > 0 ? (Number(defindex_balance) / totalReserves * 100) : 0;
  const aquariusPct = totalReserves > 0 ? (Number(aquarius_balance) / totalReserves * 100) : 0;

  // Format timestamp
  const verifiedAt = timestamp
    ? new Date(Number(timestamp) * 1000).toISOString().split('T')[0]
    : 'Unknown';

  const explorerUrl = `https://stellar.expert/explorer/testnet/tx/${ledger_seq}`;

  return (
    <div className="attestation-card">
      {/* Header */}
      <div className="attestation-header">
        <div className="attestation-logo">
          <VerazLogo variant="lockup" size="lg" href="#" />
        </div>
        <span className="vz-label">SOLVENCY ATTESTATION</span>
      </div>

      {/* Status and Ratio */}
      <div className="attestation-body">
        <div className="attestation-protocol vz-mono" style={{
          fontSize: '18px',
          color: 'var(--vz-text-2)',
          marginBottom: 'var(--vz-space-sm)'
        }}>
          Stellar · Soroban
        </div>

        <div className={`vz-status vz-status-${solvent ? 'solvent' : 'insolvent'}`} style={{
          marginBottom: 'var(--vz-space-md)'
        }}>
          Status: {solvent ? 'Solvent' : 'Insolvent'}
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--vz-space-md)' }}>
          <span className="vz-ratio" style={{
            fontSize: 'clamp(64px, 12vw, 120px)',
            color: solvent ? 'var(--vz-solvent)' : 'var(--vz-insolvent)'
          }}>
            {solvencyRatio}
          </span>
          <span style={{ fontSize: '1.25rem', color: 'var(--vz-text-2)' }}>
            Solvency Ratio
          </span>
        </div>
      </div>

      {/* Reserves Table */}
      <div className="attestation-table">
        <table className="vz-table">
          <tbody>
            <tr>
              <td>Reserves:</td>
              <td className="num">{formatNumber(totalReserves)}</td>
              <td></td>
            </tr>
            <tr style={{ opacity: 0.7 }}>
              <td style={{ paddingLeft: 'var(--vz-space-md)' }}>SAC Wallet:</td>
              <td className="num">{formatNumber(sac_balance)}</td>
              <td className="num">{formatPercent(sacPct)}</td>
            </tr>
            <tr style={{ opacity: 0.7 }}>
              <td style={{ paddingLeft: 'var(--vz-space-md)' }}>DeFindex:</td>
              <td className="num">{formatNumber(defindex_balance)}</td>
              <td className="num">{formatPercent(defindexPct)}</td>
            </tr>
            <tr style={{ opacity: 0.7 }}>
              <td style={{ paddingLeft: 'var(--vz-space-md)' }}>Aquarius:</td>
              <td className="num">{formatNumber(aquarius_balance)}</td>
              <td className="num">{formatPercent(aquariusPct)}</td>
            </tr>
            <tr>
              <td style={{ paddingTop: 'var(--vz-space-sm)' }}>Liabilities:</td>
              <td className="num" style={{ paddingTop: 'var(--vz-space-sm)' }}>
                {formatNumber(totalLiabilities)}
              </td>
              <td></td>
            </tr>
            <tr style={{ color: solvent ? 'var(--vz-solvent)' : 'var(--vz-insolvent)' }}>
              <td>Margin:</td>
              <td className="num">{formatNumber(margin)}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="attestation-footer vz-mono" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        fontSize: '13px',
        color: 'var(--vz-text-2)',
        paddingTop: 'var(--vz-space-md)',
        borderTop: '1px solid var(--vz-border)',
        marginTop: 'var(--vz-space-lg)'
      }}>
        <span>
          Last verified: {verifiedAt} UTC<br />
          Ledger: {ledger_seq}
        </span>
        <a
          href={explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--vz-proof-verified)', textDecoration: 'none' }}
        >
          View on Stellar Expert →
        </a>
      </div>

      <style jsx>{`
        .attestation-card {
          background: var(--vz-surface);
          border: 1px solid var(--vz-border);
          border-radius: var(--vz-radius-lg);
          padding: var(--vz-space-2xl);
          max-width: 800px;
          margin: 0 auto;
        }

        .attestation-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--vz-space-xl);
        }

        .attestation-body {
          margin-bottom: var(--vz-space-xl);
        }

        .attestation-table {
          margin: var(--vz-space-lg) 0;
        }

        @media (max-width: 640px) {
          .attestation-card {
            padding: var(--vz-space-lg);
          }

          .vz-ratio {
            font-size: clamp(48px, 15vw, 80px) !important;
          }

          .attestation-footer {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--vz-space-sm);
          }
        }
      `}</style>
    </div>
  );
}

/**
 * Compact version for displaying in lists or smaller spaces
 */
export function AttestationCardCompact({ attestation }) {
  if (!attestation) return null;

  const { solvent, reserves, liabilities } = attestation;
  const solvencyRatio = Number(liabilities) > 0
    ? (Number(reserves) / Number(liabilities)).toFixed(2)
    : '∞';

  return (
    <div className="vz-card" style={{
      padding: 'var(--vz-space-md)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <div className={`vz-status vz-status-${solvent ? 'solvent' : 'insolvent'}`}>
          {solvent ? 'Solvent' : 'Insolvent'}
        </div>
        <div className="vz-mono" style={{
          fontSize: '11px',
          color: 'var(--vz-text-2)',
          marginTop: '4px'
        }}>
          Ledger {attestation.ledger_seq}
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{
          fontSize: '32px',
          fontWeight: 600,
          fontFamily: 'var(--vz-font-mono)',
          color: solvent ? 'var(--vz-solvent)' : 'var(--vz-insolvent)'
        }}>
          {solvencyRatio}
        </div>
        <div className="vz-label">RATIO</div>
      </div>
    </div>
  );
}
