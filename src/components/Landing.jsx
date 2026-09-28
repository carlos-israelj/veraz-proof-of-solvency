import { useState } from 'react';

export default function Landing({ onNavigate }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <header style={{
        maxWidth: '1120px',
        width: '100%',
        margin: '0 auto',
        boxSizing: 'border-box',
        padding: '28px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '24px',
        flexWrap: 'wrap'
      }}>
        <a href="#" onClick={(e) => { e.preventDefault(); }} style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          color: 'var(--vz-text)',
          textDecoration: 'none'
        }}>
          <svg viewBox="0 0 64 64" width="28" height="28" fill="none">
            <path d="M7 8H17L37 52H27Z" fill="currentColor" />
            <path d="M47 8H57L37 52H27Z" stroke="currentColor" strokeWidth="3.5" />
            <path d="M32 41L37 52H27Z" fill="#3FD9AD" />
          </svg>
          <span style={{
            fontWeight: 500,
            fontSize: '22px',
            letterSpacing: '-0.03em',
            lineHeight: 1
          }}>veraz</span>
        </a>
        <nav style={{
          display: 'flex',
          gap: '24px',
          fontSize: '14px',
          color: 'var(--vz-text-2)',
          flexWrap: 'wrap'
        }}>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('issuer'); }} style={{ color: 'var(--vz-text-2)', textDecoration: 'none' }}>Issuer</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('auditor'); }} style={{ color: 'var(--vz-text-2)', textDecoration: 'none' }}>Auditor</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('integrations'); }} style={{ color: 'var(--vz-text-2)', textDecoration: 'none' }}>Integrations</a>
          <a href="#" style={{ color: 'var(--vz-text-2)', textDecoration: 'none' }}>API</a>
          <a href="#" style={{ color: 'var(--vz-text-2)', textDecoration: 'none' }}>Docs</a>
        </nav>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontFamily: 'var(--vz-font-mono)',
          fontSize: '11px',
          color: 'var(--vz-text-2)',
          whiteSpace: 'nowrap'
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '3px', background: '#3FD9AD' }} />
          Testnet · Soroban
        </span>
      </header>

      {/* Hero Section */}
      <section style={{
        maxWidth: '1120px',
        width: '100%',
        margin: '0 auto',
        boxSizing: 'border-box',
        padding: '72px 32px 56px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '48px',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <span style={{
            display: 'inline-flex',
            alignSelf: 'flex-start',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px 6px 8px',
            border: '1px solid var(--vz-border)',
            borderRadius: '999px',
            fontFamily: 'var(--vz-font-mono)',
            fontSize: '11px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#82B6F2',
            whiteSpace: 'nowrap'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '3px', background: '#82B6F2' }} />
            Stellar Protocol 26 · CAP-80 · Soroban
          </span>
          <h1 style={{
            margin: 0,
            fontWeight: 600,
            fontSize: 'clamp(40px, 5vw, 64px)',
            letterSpacing: '-0.04em',
            lineHeight: 1,
            textWrap: 'pretty'
          }}>Zero-Knowledge Proof of Solvency</h1>
          <p style={{
            margin: 0,
            fontSize: '19px',
            color: 'var(--vz-text-2)',
            lineHeight: 1.5,
            textWrap: 'pretty',
            maxWidth: '540px'
          }}>
            Cryptographically prove <strong style={{ color: 'var(--vz-text)', fontWeight: 500 }}>Reserves ≥ Liabilities</strong> without revealing individual balances. Privacy-preserving attestations for the Stellar ecosystem.
          </p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('issuer'); }} style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 18px',
              borderRadius: '8px',
              background: 'var(--vz-primary)',
              color: 'var(--vz-bg)',
              fontWeight: 600,
              fontSize: '14px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              border: 'none',
              cursor: 'pointer'
            }}>Generate Proof →</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('auditor'); }} style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 18px',
              borderRadius: '8px',
              border: '1px solid var(--vz-border)',
              color: 'var(--vz-text)',
              fontWeight: 500,
              fontSize: '14px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              background: 'transparent',
              cursor: 'pointer'
            }}>Verify Proofs</a>
          </div>
          <div style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            fontFamily: 'var(--vz-font-mono)',
            fontSize: '12px',
            color: 'var(--vz-text-2)'
          }}>
            {['UltraHonk', 'Noir v1.0', 'BN254 Curve', 'Merkle Sum Tree'].map(tech => (
              <span key={tech} style={{
                padding: '6px 10px',
                border: '1px solid var(--vz-border)',
                borderRadius: '6px',
                background: 'var(--vz-surface)'
              }}>{tech}</span>
            ))}
          </div>
        </div>
        {/* Attestation Card Example */}
        <div style={{
          background: 'var(--vz-surface)',
          border: '1px solid var(--vz-border)',
          borderRadius: '16px',
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '24px',
          minWidth: 0
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap'
          }}>
            <span style={{ fontSize: '14px', color: 'var(--vz-text-2)' }}>MoneyGram Access Stablecoin</span>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              fontWeight: 500,
              color: '#3FD9AD'
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '4px', background: '#3FD9AD' }} />
              Solvent
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', flexWrap: 'wrap' }}>
            <span style={{
              fontWeight: 600,
              fontSize: 'clamp(64px, 7vw, 96px)',
              lineHeight: 0.95,
              letterSpacing: '-0.045em'
            }}>1.052</span>
            <span style={{ fontSize: '14px', color: 'var(--vz-text-2)', whiteSpace: 'nowrap' }}>Solvency Ratio</span>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            borderTop: '1px solid var(--vz-border)',
            paddingTop: '16px',
            fontFamily: 'var(--vz-font-mono)',
            fontSize: '13px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
              <span style={{ color: 'var(--vz-text-2)' }}>reserves</span>
              <span>$105,200,000</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
              <span style={{ color: 'var(--vz-text-2)' }}>liabilities</span>
              <span>$100,000,000</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
              <span style={{ color: 'var(--vz-text-2)' }}>margin</span>
              <span style={{ color: '#3FD9AD' }}>$5,200,000</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '12px',
              paddingTop: '8px',
              fontSize: '11px',
              color: 'var(--vz-text-2)'
            }}>
              <span>Ledger 12,845,673</span>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: '#82B6F2',
                whiteSpace: 'nowrap'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '3px', background: '#82B6F2' }} />
                Proof verified
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section style={{
        maxWidth: '1120px',
        width: '100%',
        margin: '0 auto',
        boxSizing: 'border-box',
        padding: '0 32px 64px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '16px'
      }}>
        {[
          { value: '~3s', label: 'Proof generation' },
          { value: '2KB', label: 'Proof size' },
          { value: '128-bit', label: 'Security' },
          { value: '0', label: 'Trusted setup · funds held' }
        ].map(stat => (
          <div key={stat.label} style={{
            background: 'var(--vz-surface)',
            border: '1px solid var(--vz-border)',
            borderRadius: '12px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <span style={{
              fontWeight: 600,
              fontSize: '36px',
              letterSpacing: '-0.04em',
              lineHeight: 1,
              color: 'var(--vz-primary)'
            }}>{stat.value}</span>
            <span style={{
              fontFamily: 'var(--vz-font-mono)',
              fontSize: '11px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--vz-text-2)'
            }}>{stat.label}</span>
          </div>
        ))}
      </section>

      {/* Choose Your Path */}
      <section style={{
        maxWidth: '1120px',
        width: '100%',
        margin: '0 auto',
        boxSizing: 'border-box',
        padding: '0 32px 72px',
        display: 'flex',
        flexDirection: 'column',
        gap: '28px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <h2 style={{
            margin: 0,
            fontWeight: 600,
            fontSize: '32px',
            letterSpacing: '-0.03em',
            lineHeight: 1.1
          }}>Choose your path</h2>
          <p style={{ margin: 0, color: 'var(--vz-text-2)' }}>Veraz never holds funds or executes transactions. It verifies.</p>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px'
        }}>
          {/* Issuer Card */}
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('issuer'); }} className="vz-hover" style={{
            background: 'var(--vz-surface)',
            border: '1px solid var(--vz-border)',
            borderRadius: '12px',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            color: 'var(--vz-text)',
            textDecoration: 'none',
            transition: 'border-color 0.2s'
          }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              background: 'var(--vz-bg)',
              border: '1px solid var(--vz-border)'
            }}>
              <svg viewBox="0 0 64 64" width="36" height="36" fill="none">
                <path d="M7 8H17L37 52H27Z" fill="var(--vz-text)" />
                <path d="M47 8H57L37 52H27Z" stroke="var(--vz-text)" strokeOpacity="0.18" strokeWidth="3.5" />
              </svg>
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{
                fontFamily: 'var(--vz-font-mono)',
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--vz-text-2)'
              }}>Private side</span>
              <h3 style={{
                margin: 0,
                fontWeight: 600,
                fontSize: '24px',
                letterSpacing: '-0.02em'
              }}>Issuer</h3>
            </div>
            <p style={{ margin: 0, color: 'var(--vz-text-2)', textWrap: 'pretty' }}>
              Generate zero-knowledge proofs of solvency. Prove reserves exceed liabilities without revealing holder balances.
            </p>
            <ul style={{
              margin: 0,
              padding: 0,
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              fontSize: '14px',
              color: 'var(--vz-text-2)'
            }}>
              {['Browser-based proving', 'Multi-source reserves', 'Freighter integration'].map(feature => (
                <li key={feature} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: '6px', height: '6px', background: '#3FD9AD' }} />
                  {feature}
                </li>
              ))}
            </ul>
            <span style={{ marginTop: 'auto', fontWeight: 600, color: 'var(--vz-primary)' }}>Generate Proof →</span>
          </a>

          {/* Auditor Card */}
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('auditor'); }} className="vz-hover" style={{
            background: 'var(--vz-surface)',
            border: '1px solid var(--vz-border)',
            borderRadius: '12px',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            color: 'var(--vz-text)',
            textDecoration: 'none',
            transition: 'border-color 0.2s'
          }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              background: 'var(--vz-bg)',
              border: '1px solid var(--vz-border)'
            }}>
              <svg viewBox="0 0 64 64" width="36" height="36" fill="none">
                <path d="M7 8H17L37 52H27Z" fill="var(--vz-text)" fillOpacity="0.18" />
                <path d="M47 8H57L37 52H27Z" stroke="var(--vz-text)" strokeWidth="4" />
              </svg>
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{
                fontFamily: 'var(--vz-font-mono)',
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--vz-text-2)'
              }}>Public side</span>
              <h3 style={{
                margin: 0,
                fontWeight: 600,
                fontSize: '24px',
                letterSpacing: '-0.02em'
              }}>Auditor</h3>
            </div>
            <p style={{ margin: 0, color: 'var(--vz-text-2)', textWrap: 'pretty' }}>
              Verify solvency proofs on-chain. Query attestations and validate cryptographic guarantees in real time.
            </p>
            <ul style={{
              margin: 0,
              padding: 0,
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              fontSize: '14px',
              color: 'var(--vz-text-2)'
            }}>
              {['On-chain verification', 'Multi-source reserves', 'Real-time queries'].map(feature => (
                <li key={feature} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: '6px', height: '6px', background: '#3FD9AD' }} />
                  {feature}
                </li>
              ))}
            </ul>
            <span style={{ marginTop: 'auto', fontWeight: 600, color: 'var(--vz-primary)' }}>Verify Proofs →</span>
          </a>

          {/* Integrations Card */}
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('integrations'); }} className="vz-hover" style={{
            background: 'var(--vz-surface)',
            border: '1px solid var(--vz-border)',
            borderRadius: '12px',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            color: 'var(--vz-text)',
            textDecoration: 'none',
            transition: 'border-color 0.2s'
          }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              background: 'var(--vz-bg)',
              border: '1px solid var(--vz-border)'
            }}>
              <svg viewBox="0 0 64 64" width="36" height="36" fill="none">
                <path d="M7 8H17L37 52H27Z" fill="var(--vz-text)" fillOpacity="0.18" />
                <path d="M47 8H57L37 52H27Z" stroke="var(--vz-text)" strokeOpacity="0.18" strokeWidth="3.5" />
                <path d="M32 41L37 52H27Z" fill="#3FD9AD" />
              </svg>
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{
                fontFamily: 'var(--vz-font-mono)',
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--vz-text-2)'
              }}>Where they meet</span>
              <h3 style={{
                margin: 0,
                fontWeight: 600,
                fontSize: '24px',
                letterSpacing: '-0.02em'
              }}>Integrations</h3>
            </div>
            <p style={{ margin: 0, color: 'var(--vz-text-2)', textWrap: 'pretty' }}>
              Aggregate reserves from SAC wallets, Aquarius AMM pools and DeFindex vaults into a single attestation.
            </p>
            <ul style={{
              margin: 0,
              padding: 0,
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              fontSize: '14px',
              color: 'var(--vz-text-2)'
            }}>
              {['DeFindex', 'Aquarius', 'Public API · 100 req/hour'].map(feature => (
                <li key={feature} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: '6px', height: '6px', background: '#3FD9AD' }} />
                  {feature}
                </li>
              ))}
            </ul>
            <span style={{ marginTop: 'auto', fontWeight: 600, color: 'var(--vz-primary)' }}>View Integrations →</span>
          </a>
        </div>
      </section>

      {/* How It Works */}
      <section style={{
        maxWidth: '1120px',
        width: '100%',
        margin: '0 auto',
        boxSizing: 'border-box',
        padding: '0 32px 72px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '16px'
      }}>
        {[
          {
            num: '01',
            title: 'Balances stay private',
            desc: 'Holder balances are committed in a Merkle sum tree with Pedersen commitments. They never leave the issuer\'s browser.'
          },
          {
            num: '02',
            title: 'Reserves are read on-chain',
            desc: 'SAC, Aquarius and DeFindex positions are aggregated from public Stellar state at a given ledger.'
          },
          {
            num: '03',
            title: 'Only the proof is published',
            desc: 'An UltraHonk proof (BN254, no trusted setup) that Reserves ≥ Liabilities, verified by a Soroban contract.'
          }
        ].map(step => (
          <div key={step.num} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            borderTop: '1px solid var(--vz-border)',
            paddingTop: '20px'
          }}>
            <span style={{
              fontFamily: 'var(--vz-font-mono)',
              fontSize: '12px',
              color: '#3FD9AD'
            }}>{step.num}</span>
            <h3 style={{
              margin: 0,
              fontWeight: 500,
              fontSize: '18px'
            }}>{step.title}</h3>
            <p style={{
              margin: 0,
              color: 'var(--vz-text-2)',
              fontSize: '14px',
              textWrap: 'pretty'
            }}>{step.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer style={{ marginTop: 'auto', borderTop: '1px solid var(--vz-border)' }}>
        <div style={{
          maxWidth: '1120px',
          margin: '0 auto',
          boxSizing: 'border-box',
          padding: '28px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '24px',
          flexWrap: 'wrap',
          fontFamily: 'var(--vz-font-mono)',
          fontSize: '12px',
          color: 'var(--vz-text-2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <svg viewBox="0 0 64 64" width="18" height="18" fill="none" stroke="#FFFFFF">
              <path d="M7 8H17L32 41L27 52Z" fill="#FFFFFF" stroke="none" />
              <path d="M47 8H57L37 52H27Z" strokeWidth="4" />
            </svg>
            <span style={{ width: '1px', height: '16px', background: 'var(--vz-border)' }} />
            <span>Built on Stellar · Deployed on Testnet</span>
          </div>
          <span style={{ color: '#94A09B' }}>Verifier: CAU5ZPZ…HJAFKA · Policy: CCKXS7Y…HE7PX6</span>
        </div>
      </footer>
    </div>
  );
}
