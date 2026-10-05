/**
 * IssuerFlow - Reimplemented based on issuer.html brand kit
 * Reference: /tmp/veraz-issuer-complete-implementation.md
 *
 * Design Principles (from frontend-design skill):
 * - Use exact colors from brand kit (#0B0F0E, #141918, #A6B2F5, #3FD9AD, #D4B36A)
 * - Inline styles matching issuer.html
 * - JetBrains Mono for all technical data
 * - 4-step flow: Connect → Input → Prove → Attest
 */

import { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { useWallet } from '../contexts/WalletContext';
import ProofGenerator from './ProofGenerator';

const N = 8; // Circuit supports 8 holders
const DEFAULT_CONTRACT = 'CDQ4RYKUQ3XTCBL2ORGCDMXHFZNBF3OU4AJWX7I5PYWGANELQO4G4DOC';
const DEFAULT_RESERVE_ADDRESS = 'GCY4CQHYSGI2MKE24R6ASMSX6EN6VQDYQZIC2NG3FSLJML6ELPFQAPKT';

export default function IssuerFlow() {
  const { publicKey, isConnected, connectWallet: walletConnect, disconnect } = useWallet();

  // State
  const [step, setStep] = useState(0); // 0: connect, 1: input, 2: prove, 3: attest
  const [mode, setMode] = useState('demo'); // 'demo' or 'production'
  const [balances, setBalances] = useState(['100000','50000','25000','75000','30000','20000','60000','40000']);
  const [reserves, setReserves] = useState([
    { address: DEFAULT_RESERVE_ADDRESS, source: 'SAC' }
  ]);
  const [contractId, setContractId] = useState(DEFAULT_CONTRACT);
  const [txHash, setTxHash] = useState(null);
  const [attestationData, setAttestationData] = useState(null);
  const [error, setError] = useState('');

  // Tour state
  const [tourOpen, setTourOpen] = useState(false);
  const [tourIdx, setTourIdx] = useState(0);
  const [tourSpot, setTourSpot] = useState(null);

  // Proof generation state
  const [proving, setProving] = useState(false);
  const [proveStage, setProveStage] = useState(0);
  const [proveElapsed, setProveElapsed] = useState('0s');

  const STAGES = [
    'Initializing circuit',
    'Building Merkle sum tree',
    'Executing Noir witness',
    'Generating UltraHonk proof',
    'Formatting public inputs',
    'Submitting to Soroban',
    'Verifying on-chain'
  ];

  const TOUR_STEPS = [
    { el: 'tour-mode', step: null, title: 'Demo vs Production', body: 'You are in Demo mode: Testnet, sample balances, a fixed 8-holder circuit. Switch to Production for Mainnet and real holder imports.' },
    { el: 'tour-wallet', step: 0, title: 'Connect a Stellar wallet', body: 'Freighter, xBull or Lobstr. Veraz only asks for a signature on the final attestation; keys never leave the extension.' },
    { el: 'tour-steps', step: 0, title: 'Four steps', body: 'Connect → Input → Prove → Attest. Everything before Attest happens in this browser tab.' },
    { el: 'tour-balances', step: 1, title: 'Holder balances (private)', body: 'These are your liabilities. They are hashed into a Merkle sum tree locally and never transmitted. Only the total is proven.' },
    { el: 'tour-reserves', step: 1, title: 'Reserve addresses (public)', body: 'Up to 5 Stellar accounts. The proof is cryptographically bound to them so it cannot be reused with other reserves.' },
    { el: 'tour-contract', step: 1, title: 'Solvency policy contract', body: 'The Soroban contract that verifies the UltraHonk proof and stores the attestation. Open it on Stellar Expert any time.' },
    { el: 'tour-generate', step: 1, title: 'Generate the ZK proof', body: 'Builds the Merkle tree, runs the Noir circuit and produces a proof in about 3 minutes. Then the wallet signs and the attestation is published.' },
  ];

  // Computed
  const totalLiabilities = balances.reduce((sum, b) => sum + Number(b || 0), 0);
  const walletShort = publicKey ? `${publicKey.slice(0, 4)}...${publicKey.slice(-4)}` : '';

  // Mode toggle
  function toggleMode(newMode) {
    setMode(newMode);
    if (newMode === 'demo') {
      setBalances(['100000','50000','25000','75000','30000','20000','60000','40000']);
      setReserves([{ address: DEFAULT_RESERVE_ADDRESS, source: 'SAC' }]);
    } else {
      // Production mode - clear for user input
      setBalances(Array(8).fill(''));
      setReserves([]);
    }
  }

  // Tour functions
  function startTour() {
    setTourOpen(true);
    setTourIdx(0);
    setTourSpot(null);
  }

  function skipTour() {
    setTourOpen(false);
  }

  function nextTour() {
    if (tourIdx < TOUR_STEPS.length - 1) {
      const nextIdx = tourIdx + 1;
      const nextStep = TOUR_STEPS[nextIdx];

      // Auto-advance to step if needed
      if (nextStep.step !== null && step !== nextStep.step) {
        setStep(nextStep.step);
      }

      setTourIdx(nextIdx);
      setTourSpot(null);
    } else {
      setTourOpen(false);
    }
  }

  function prevTour() {
    if (tourIdx > 0) {
      const prevIdx = tourIdx - 1;
      const prevStep = TOUR_STEPS[prevIdx];

      // Auto-go back to step if needed
      if (prevStep.step !== null && step !== prevStep.step) {
        setStep(prevStep.step);
      }

      setTourIdx(prevIdx);
      setTourSpot(null);
    }
  }

  // Compute spotlight position for tour
  function computeSpot(idx, scroll = false) {
    const t = TOUR_STEPS[idx];
    if (!t) return null;

    const el = document.getElementById(t.el);
    if (!el) return null;

    let r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const maxH = Math.min(160, vh * 0.3);
    const tall = r.height > vh * 0.5;
    const pad = 8;
    const pw = 340;
    const popoverEl = document.getElementById('tour-popover');
    const ph = popoverEl && popoverEl.offsetHeight > 50 ? popoverEl.offsetHeight + 32 : 280;

    let hgt = tall ? maxH : r.height;

    // Auto-scroll element into view if needed
    if (scroll) {
      const fitsBelowAtTop = 100 + hgt + pad + 12 + ph < vh;
      const want = fitsBelowAtTop ? 100 : Math.max(16, vh - 16 - hgt);

      if (Math.abs(r.top - want) > 4) {
        window.scrollBy({ top: r.top - want, behavior: 'smooth' });
        r = el.getBoundingClientRect();
      }
    }

    // Determine popover position (below or above spotlight)
    const below = r.top + hgt + pad + 12 + ph < vh;
    const px = Math.min(Math.max(16, r.left), window.innerWidth - pw - 16);
    const py = below ? r.top + hgt + pad + 12 : Math.max(16, r.top - pad - 12 - ph);

    return {
      idx,
      x: r.left - pad,
      y: r.top - pad,
      w: r.width + pad * 2,
      h: hgt + pad * 2,
      px,
      py
    };
  }

  // Reserve management
  function addReserve() {
    if (reserves.length < 5) {
      setReserves([...reserves, { address: '', source: 'SAC' }]);
    }
  }

  function removeReserve(idx) {
    setReserves(reserves.filter((_, i) => i !== idx));
  }

  function updateReserve(idx, address) {
    const newReserves = [...reserves];
    newReserves[idx] = { ...newReserves[idx], address };
    setReserves(newReserves);
  }

  // Wallet connection
  async function handleConnectWallet() {
    try {
      await walletConnect();
      setError('');
      setStep(1);
    } catch (e) {
      setError(`Wallet connection failed: ${e.message}`);
    }
  }

  // Start proof generation
  function startProofGeneration() {
    const invalidBalances = balances.some(b => !b || isNaN(Number(b)));
    if (invalidBalances) {
      setError('All 8 balances must be valid numbers');
      return;
    }

    if (reserves.length === 0 || reserves.some(r => !r.address)) {
      setError('At least one reserve address is required');
      return;
    }

    setError('');
    setStep(2);
    setProving(true);
  }

  // Proof callbacks
  async function handleProofSuccess(hash) {
    setTxHash(hash);
    setProving(false);

    // Query contract for real attestation data
    try {
      const { querySolvent } = await import('../lib/stellar.js');
      const data = await querySolvent(contractId);

      if (data) {
        // Convert BigInt to Number for calculation
        const reserves = Number(data.reserves);
        const liabilities = Number(data.liabilities);

        // Calculate solvency ratio
        const ratio = liabilities > 0 ? (reserves / liabilities).toFixed(3) : '0.000';

        setAttestationData({
          solvent: data.solvent,
          reserves: reserves,
          liabilities: liabilities,
          solvencyRatio: ratio,
          ledgerSeq: Number(data.ledger_seq),
          timestamp: Number(data.timestamp),
          sacBalance: Number(data.sac_balance || 0),
          aquariusBalance: Number(data.aquarius_balance || 0),
          defindexBalance: Number(data.defindex_balance || 0)
        });
      }
    } catch (err) {
      console.error('[handleProofSuccess] Failed to query contract:', err);
      // Continue anyway, we have the tx hash
    }

    setStep(3);
  }

  function handleProofError(err) {
    setError(err.message || 'Proof generation failed');
    setProving(false);
    setStep(1);
  }

  function handleProofProgress(stage) {
    setProveStage(stage);
  }

  // Prove stage controls
  function advanceStage() {
    if (proveStage < 6) {
      setProveStage(proveStage + 1);
    } else {
      // Simulate success
      handleProofSuccess('demo_tx_' + Date.now());
    }
  }

  function cancelProving() {
    setProving(false);
    setProveStage(0);
    setStep(1);
  }

  // Elapsed timer for proving
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (proving) {
      setElapsed(0);
      timerRef.current = setInterval(() => {
        setElapsed(e => e + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [proving]);

  // Auto-advance when wallet connects
  useEffect(() => {
    if (isConnected && step === 0) {
      setStep(1);
    }
  }, [isConnected, step]);

  // Tour spotlight positioning
  useEffect(() => {
    if (!tourOpen) return;

    const updateSpot = () => {
      const newSpot = computeSpot(tourIdx, !tourSpot || tourSpot.idx !== tourIdx);
      if (newSpot && (!tourSpot ||
          Math.abs(tourSpot.x - newSpot.x) > 0.5 ||
          Math.abs(tourSpot.y - newSpot.y) > 0.5 ||
          Math.abs(tourSpot.w - newSpot.w) > 0.5 ||
          Math.abs(tourSpot.h - newSpot.h) > 0.5)) {
        setTourSpot(newSpot);
      }
    };

    // Initial positioning
    updateSpot();

    // Update on resize
    const interval = setInterval(updateSpot, 40);
    window.addEventListener('resize', updateSpot);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', updateSpot);
    };
  }, [tourOpen, tourIdx, step]);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0B0F0E',
      color: '#F4F5F3',
      fontFamily: "'Geist', system-ui, sans-serif",
      fontSize: '15px',
      lineHeight: 1.5,
      fontVariantNumeric: 'tabular-nums',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* HEADER */}
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
        {/* Logo */}
        <Link href="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          color: '#F4F5F3',
          textDecoration: 'none'
        }}>
          <svg viewBox="0 0 64 64" width="28" height="28" fill="none">
            <path d="M7 8H17L37 52H27Z" fill="currentColor"/>
            <path d="M47 8H57L37 52H27Z" stroke="currentColor" strokeWidth="3.5"/>
            <path d="M32 41L37 52H27Z" fill="#3FD9AD"/>
          </svg>
          <span style={{
            fontWeight: 500,
            fontSize: '22px',
            letterSpacing: '-0.03em',
            lineHeight: 1
          }}>veraz</span>
        </Link>

        {/* Nav */}
        <nav style={{
          display: 'flex',
          gap: '24px',
          fontSize: '14px',
          color: '#9AA39F',
          flexWrap: 'wrap'
        }}>
          <Link href="/issuer" style={{ color: '#F4F5F3', textDecoration: 'none' }}>Issuer</Link>
          <Link href="/auditor" style={{ color: '#9AA39F', textDecoration: 'none' }}>Auditor</Link>
          <Link href="/integrations" style={{ color: '#9AA39F', textDecoration: 'none' }}>Integrations</Link>
          <a href="#" style={{ color: '#9AA39F', textDecoration: 'none' }}>API</a>
          <a href="#" style={{ color: '#9AA39F', textDecoration: 'none' }}>Docs</a>
        </nav>

        {/* Demo/Production Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div id="tour-mode" style={{
            display: 'inline-flex',
            border: '1px solid #262C29',
            borderRadius: '999px',
            padding: '3px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px'
          }}>
            <button
              onClick={() => toggleMode('demo')}
              style={{
                padding: '5px 12px',
                borderRadius: '999px',
                border: 0,
                cursor: 'pointer',
                fontFamily: 'inherit',
                background: mode === 'demo' ? '#F4F5F3' : 'transparent',
                color: mode === 'demo' ? '#0B0F0E' : '#9AA39F',
                whiteSpace: 'nowrap'
              }}
            >Demo</button>
            <button
              onClick={() => toggleMode('production')}
              style={{
                padding: '5px 12px',
                borderRadius: '999px',
                border: 0,
                cursor: 'pointer',
                fontFamily: 'inherit',
                background: mode === 'production' ? '#F4F5F3' : 'transparent',
                color: mode === 'production' ? '#0B0F0E' : '#9AA39F',
                whiteSpace: 'nowrap'
              }}
            >Production</button>
          </div>

          {/* Wallet Button */}
          {isConnected ? (
            <div id="tour-wallet" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0,
              border: '1px solid #262C29',
              borderRadius: '999px',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px',
              color: '#F4F5F3',
              whiteSpace: 'nowrap'
            }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 10px 6px 12px'
              }}>
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '3px',
                  background: '#3FD9AD'
                }}/>
                {walletShort}
              </span>
              <button
                onClick={disconnect}
                title="Disconnect wallet"
                style={{
                  height: '28px',
                  width: '28px',
                  margin: '2px',
                  borderRadius: '999px',
                  border: 0,
                  background: 'transparent',
                  color: '#9AA39F',
                  cursor: 'pointer',
                  fontSize: '14px',
                  lineHeight: 1,
                  fontFamily: 'inherit'
                }}
              >×</button>
            </div>
          ) : (
            <button
              id="tour-wallet"
              onClick={handleConnectWallet}
              style={{
                padding: '8px 14px',
                borderRadius: '999px',
                border: 0,
                background: '#A6B2F5',
                color: '#0B0F0E',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                whiteSpace: 'nowrap'
              }}
            >Connect wallet</button>
          )}
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main style={{
        maxWidth: '760px',
        width: '100%',
        margin: '0 auto',
        boxSizing: 'border-box',
        padding: '32px 32px 120px',
        display: 'flex',
        flexDirection: 'column',
        gap: '36px'
      }}>
        {/* Page Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              alignSelf: 'flex-start',
              color: '#9AA39F',
              fontSize: '14px',
              textDecoration: 'none',
              whiteSpace: 'nowrap'
            }}
          >← Back to home</Link>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#9AA39F'
          }}>Issuer · Private side</span>
          <h1 style={{
            margin: 0,
            fontWeight: 600,
            fontSize: '40px',
            letterSpacing: '-0.035em',
            lineHeight: 1.05
          }}>Generate Solvency Proof</h1>
          <p style={{
            margin: 0,
            color: '#9AA39F',
            maxWidth: '560px',
            textWrap: 'pretty'
          }}>
            Prove Reserves ≥ Liabilities to the network. Holder balances are committed to a Merkle sum tree in your browser and never leave it.
          </p>
        </div>

        {/* Mode Banner */}
        {mode === 'demo' ? (
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '14px',
            padding: '14px 16px',
            border: '1px solid #D4B36A',
            borderRadius: '10px',
            fontSize: '14px'
          }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#D4B36A',
              whiteSpace: 'nowrap',
              paddingTop: '2px'
            }}>Demo mode</span>
            <span style={{
              color: '#9AA39F',
              textWrap: 'pretty',
              flex: 1,
              minWidth: '200px'
            }}>
              Technical demonstration on <span style={{ color: '#F4F5F3' }}>Testnet</span>. Balances are sample data, the circuit is fixed at 8 holders and proving runs in-browser. Attestations have no economic weight.
            </span>
            <button
              onClick={startTour}
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #D4B36A',
                background: 'transparent',
                color: '#D4B36A',
                fontWeight: 500,
                fontSize: '13px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                whiteSpace: 'nowrap',
                alignSelf: 'center'
              }}
            >Start tour</button>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '14px',
            padding: '14px 16px',
            border: '1px solid #262C29',
            borderRadius: '10px',
            fontSize: '14px'
          }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#3FD9AD',
              whiteSpace: 'nowrap',
              paddingTop: '2px'
            }}>Production</span>
            <span style={{ color: '#9AA39F', textWrap: 'pretty' }}>
              <span style={{ color: '#F4F5F3' }}>Mainnet</span>. Liabilities are imported from your ledger export or Horizon, reserves are read on-chain at a pinned ledger, and the attestation is published to the public solvency registry.
            </span>
          </div>
        )}

        {/* Progress Stepper */}
        <ol id="tour-steps" style={{
          margin: 0,
          padding: 0,
          listStyle: 'none',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: '8px'
        }}>
          {['Connect', 'Input', 'Prove', 'Attest'].map((label, i) => (
            <li
              key={i}
              onClick={() => setStep(i)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                cursor: 'pointer'
              }}
            >
              <span style={{
                height: '3px',
                background: step >= i ? '#3FD9AD' : '#262C29'
              }}/>
              <span style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '8px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '12px',
                color: step >= i ? '#F4F5F3' : '#9AA39F'
              }}>
                <span>{i + 1}</span>
                <span style={{
                  fontFamily: "'Geist', system-ui, sans-serif",
                  fontSize: '14px',
                  fontWeight: 500
                }}>{label}</span>
              </span>
            </li>
          ))}
        </ol>

        {/* Error Banner */}
        {error && (
          <div style={{
            padding: '14px 16px',
            border: '1px solid #C45C5C',
            borderRadius: '10px',
            background: 'rgba(196, 92, 92, 0.1)',
            color: '#C45C5C',
            fontSize: '14px'
          }}>
            ⚠ {error}
          </div>
        )}

        {/* STEP 0: Connect */}
        {step === 0 && !isConnected && (
          <section id="tour-connect" style={{
            background: '#141918',
            border: '1px solid #262C29',
            borderRadius: '16px',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '20px'
          }}>
            <svg viewBox="0 0 64 64" width="44" height="44" fill="none">
              <path d="M7 8H17L37 52H27Z" fill="#F4F5F3"/>
              <path d="M47 8H57L37 52H27Z" stroke="#F4F5F3" strokeOpacity="0.18" strokeWidth="3.5"/>
            </svg>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h2 style={{
                margin: 0,
                fontWeight: 600,
                fontSize: '24px',
                letterSpacing: '-0.02em'
              }}>Connect Stellar wallet</h2>
              <p style={{
                margin: 0,
                color: '#9AA39F',
                maxWidth: '480px',
                textWrap: 'pretty'
              }}>
                Sign the attestation with Freighter, xBull or Lobstr. Your private keys never leave the wallet extension; Veraz only requests a signature.
              </p>
            </div>
            <button
              onClick={handleConnectWallet}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 18px',
                borderRadius: '8px',
                background: '#A6B2F5',
                color: '#0B0F0E',
                fontWeight: 600,
                fontSize: '14px',
                border: 0,
                cursor: 'pointer',
                fontFamily: 'inherit'
              }}
            >Connect wallet →</button>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px',
              color: '#9AA39F'
            }}>Network · Testnet · Soroban</span>
          </section>
        )}

        {/* STEP 1: Input */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Balances Card */}
            <section id="tour-balances" style={{
              background: '#141918',
              border: '1px solid #262C29',
              borderRadius: '16px',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              {/* Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '16px',
                flexWrap: 'wrap'
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  flex: 1,
                  minWidth: '240px'
                }}>
                  <h2 style={{
                    margin: 0,
                    fontWeight: 600,
                    fontSize: '20px',
                    letterSpacing: '-0.02em'
                  }}>Holder balances</h2>
                  <span style={{ fontSize: '14px', color: '#9AA39F' }}>
                    Liabilities · the total owed to token holders
                  </span>
                </div>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 10px',
                  border: '1px solid #262C29',
                  borderRadius: '999px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  color: '#9AA39F',
                  whiteSpace: 'nowrap'
                }}>
                  <svg viewBox="0 0 64 64" width="12" height="12" fill="none">
                    <path d="M7 8H17L37 52H27Z" fill="#F4F5F3"/>
                  </svg>
                  Private · never revealed
                </span>
              </div>

              {/* Grid de 8 inputs */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '12px'
              }}>
                {balances.map((balance, i) => (
                  <label key={i} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    padding: '12px 14px',
                    border: '1px solid #262C29',
                    borderRadius: '8px',
                    background: '#0B0F0E'
                  }}>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '11px',
                      color: '#9AA39F'
                    }}>holder_{i}</span>
                    <input
                      value={balance}
                      onChange={(e) => {
                        const newBalances = [...balances];
                        newBalances[i] = e.target.value;
                        setBalances(newBalances);
                      }}
                      inputMode="numeric"
                      readOnly={mode === 'demo'}
                      style={{
                        background: 'transparent',
                        border: 0,
                        outline: 'none',
                        color: '#F4F5F3',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '15px',
                        width: '100%',
                        padding: 0
                      }}
                    />
                  </label>
                ))}
              </div>

              {/* Stats Summary */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px',
                borderTop: '1px solid #262C29',
                paddingTop: '20px'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#9AA39F'
                  }}>Total liabilities</span>
                  <span style={{
                    fontWeight: 600,
                    fontSize: '32px',
                    letterSpacing: '-0.03em',
                    lineHeight: 1
                  }}>
                    {totalLiabilities.toLocaleString()}{' '}
                    <span style={{
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#9AA39F',
                      letterSpacing: 0
                    }}>USDC</span>
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#9AA39F'
                  }}>Holders</span>
                  <span style={{
                    fontWeight: 600,
                    fontSize: '32px',
                    letterSpacing: '-0.03em',
                    lineHeight: 1
                  }}>
                    {N}{' '}
                    <span style={{
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#9AA39F',
                      letterSpacing: 0
                    }}>of {N}</span>
                  </span>
                </div>
              </div>
            </section>

            {/* Reserve Addresses Card */}
            <section id="tour-reserves" style={{
              background: '#141918',
              border: '1px solid #262C29',
              borderRadius: '16px',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              {/* Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '16px',
                flexWrap: 'wrap'
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  flex: 1,
                  minWidth: '240px'
                }}>
                  <h2 style={{
                    margin: 0,
                    fontWeight: 600,
                    fontSize: '20px',
                    letterSpacing: '-0.02em'
                  }}>Reserve addresses</h2>
                  <span style={{ fontSize: '14px', color: '#9AA39F' }}>
                    1 to 5 Stellar accounts. The proof is cryptographically bound to them.
                  </span>
                </div>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 10px',
                  border: '1px solid #262C29',
                  borderRadius: '999px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  color: '#9AA39F',
                  whiteSpace: 'nowrap'
                }}>
                  <svg viewBox="0 0 64 64" width="12" height="12" fill="none">
                    <path d="M47 8H57L37 52H27Z" stroke="#F4F5F3" strokeWidth="5"/>
                  </svg>
                  Public · read on-chain
                </span>
              </div>

              {/* Reserve list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {reserves.map((r, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px 8px 8px 14px',
                    border: '1px solid #262C29',
                    borderRadius: '8px',
                    background: '#0B0F0E',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '13px'
                  }}>
                    <span style={{
                      color: '#9AA39F',
                      width: '24px',
                      flexShrink: 0
                    }}>{i + 1}</span>
                    <input
                      value={r.address}
                      onChange={(e) => updateReserve(i, e.target.value)}
                      readOnly={mode === 'demo'}
                      placeholder="G..."
                      style={{
                        flex: 1,
                        minWidth: 0,
                        background: 'transparent',
                        border: 0,
                        outline: 'none',
                        color: '#F4F5F3',
                        fontFamily: 'inherit',
                        fontSize: 'inherit',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    />
                    <span style={{
                      color: '#9AA39F',
                      whiteSpace: 'nowrap'
                    }}>{r.source}</span>
                    <a
                      href={`https://stellar.expert/explorer/testnet/account/${r.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        width: '32px',
                        height: '32px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '6px',
                        color: '#9AA39F',
                        textDecoration: 'none',
                        flexShrink: 0
                      }}
                    >↗</a>
                    {reserves.length > 1 && mode === 'production' && (
                      <button
                        onClick={() => removeReserve(i)}
                        title="Remove address"
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '6px',
                          border: 0,
                          background: 'transparent',
                          color: '#9AA39F',
                          cursor: 'pointer',
                          fontSize: '16px',
                          lineHeight: 1,
                          fontFamily: 'inherit',
                          flexShrink: 0
                        }}
                      >×</button>
                    )}
                  </div>
                ))}

                {/* Add button */}
                {reserves.length < 5 && mode === 'production' && (
                  <button
                    onClick={addReserve}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 14px',
                      border: '1px dashed #262C29',
                      borderRadius: '8px',
                      background: 'transparent',
                      color: '#9AA39F',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '13px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <span>+</span>
                    <span>Add address</span>
                    <span style={{ marginLeft: 'auto', color: '#5C6661' }}>
                      {reserves.length}/5
                    </span>
                  </button>
                )}
              </div>
            </section>

            {/* Contract Card */}
            <section id="tour-contract" style={{
              background: '#141918',
              border: '1px solid #262C29',
              borderRadius: '16px',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#9AA39F'
              }}>Solvency policy contract</span>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 8px 8px 14px',
                border: '1px solid #262C29',
                borderRadius: '8px',
                background: '#0B0F0E',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '13px'
              }}>
                <span style={{
                  flex: 1,
                  minWidth: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>{contractId}</span>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#82B6F2',
                  whiteSpace: 'nowrap'
                }}>
                  <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '3px',
                    background: '#82B6F2'
                  }}/>
                  Verified
                </span>
                <a
                  href={`https://stellar.expert/explorer/testnet/contract/${contractId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    height: '32px',
                    padding: '0 10px',
                    borderRadius: '6px',
                    color: '#A6B2F5',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}
                >View contract ↗</a>
              </div>
            </section>

            {/* Generate Button */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              paddingTop: '8px'
            }}>
              <button
                id="tour-generate"
                onClick={startProofGeneration}
                disabled={balances.some(b => !b)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '16px 20px',
                  borderRadius: '10px',
                  background: balances.some(b => !b) ? '#262C29' : '#A6B2F5',
                  color: balances.some(b => !b) ? '#5C6661' : '#0B0F0E',
                  fontWeight: 600,
                  fontSize: '16px',
                  border: 0,
                  cursor: balances.some(b => !b) ? 'not-allowed' : 'pointer',
                  fontFamily: 'inherit'
                }}
              >Generate ZK proof</button>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                flexWrap: 'wrap',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '12px',
                color: '#9AA39F'
              }}>
                <span>~3 min</span>
                <span style={{ color: '#262C29' }}>·</span>
                <span>Client-side</span>
                <span style={{ color: '#262C29' }}>·</span>
                <span>Zero-knowledge</span>
                <span style={{ color: '#262C29' }}>·</span>
                <span>UltraHonk · BN254</span>
              </div>
            </div>
          </div>
        )}
        {/* STEP 2 · Prove */}
        {step === 2 && proving && (
          <section style={{
            background: '#141918',
            border: '1px solid #262C29',
            borderRadius: '16px',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px'
          }}>
            {/* Header with status */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              flexWrap: 'wrap'
            }}>
              {/* Veraz logo symbol */}
              <svg viewBox="0 0 64 64" width="72" height="72" fill="none">
                <path d="M7 8H17L37 52H27Z" fill="#F4F5F3"/>
                <path d="M47 8H57L37 52H27Z" stroke="#F4F5F3" strokeWidth="3.5"/>
                <path d="M32 41L37 52H27Z" fill="#D4B36A"/>
              </svg>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                minWidth: 0
              }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#D4B36A'
                }}>
                  <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '3px',
                    background: '#D4B36A',
                    animation: 'vzpulse 1.4s ease-in-out infinite'
                  }}/>
                  Proof pending
                </span>
                <h2 style={{
                  margin: 0,
                  fontWeight: 600,
                  fontSize: '24px',
                  letterSpacing: '-0.02em'
                }}>
                  {proveStage === 0 && 'Initializing circuit'}
                  {proveStage === 1 && 'Building Merkle tree'}
                  {proveStage === 2 && 'Executing Noir'}
                  {proveStage === 3 && 'Generating proof'}
                  {proveStage === 4 && 'Formatting inputs'}
                  {proveStage === 5 && 'Submitting to Soroban'}
                  {proveStage === 6 && 'Verifying on-chain'}
                </h2>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '13px',
                  color: '#9AA39F'
                }}>Stage {proveStage + 1} of 7 · elapsed {elapsed}s</span>
              </div>
            </div>

            {/* Progress bar */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div style={{
                height: '6px',
                borderRadius: '3px',
                background: '#262C29',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  background: '#D4B36A',
                  width: `${((proveStage + 1) / 7) * 100}%`,
                  transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                }}/>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '12px',
                color: '#9AA39F'
              }}>
                <span>{Math.round(((proveStage + 1) / 7) * 100)}%</span>
                <span>balances stay in this tab</span>
              </div>
            </div>

            {/* Stage list */}
            <ol style={{
              margin: 0,
              padding: 0,
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              borderTop: '1px solid #262C29'
            }}>
              {[
                { label: 'Initializing circuit', time: '0.2s' },
                { label: 'Building Merkle tree', time: '0.4s' },
                { label: 'Executing Noir', time: '1.1s' },
                { label: 'Generating proof', time: '2.8s' },
                { label: 'Formatting inputs', time: '0.1s' },
                { label: 'Submitting to Soroban', time: '1.5s' },
                { label: 'Verifying on-chain', time: '0.9s' }
              ].map((stage, i) => (
                <li key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '11px 0',
                  borderBottom: '1px solid #262C29',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '13px',
                  color: i < proveStage ? '#3FD9AD' : i === proveStage ? '#F4F5F3' : '#5C6661'
                }}>
                  <span style={{ width: '16px', textAlign: 'center' }}>
                    {i < proveStage ? '✓' : i === proveStage ? '●' : '○'}
                  </span>
                  <span style={{ flex: 1 }}>{stage.label}</span>
                  <span style={{ color: '#9AA39F' }}>{stage.time}</span>
                </li>
              ))}
            </ol>

            {/* Technical specs */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '12px',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ color: '#9AA39F' }}>circuit</span>
                <span>Noir v1.0.0-beta.9</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ color: '#9AA39F' }}>backend</span>
                <span>Barretenberg UltraHonk</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ color: '#9AA39F' }}>curve</span>
                <span>BN254</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ color: '#9AA39F' }}>inputs</span>
                <span>{balances.length} holders · {reserves.length} reserves</span>
              </div>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {mode === 'demo' && (
                <button
                  onClick={advanceStage}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '8px',
                    border: '1px solid #262C29',
                    background: 'transparent',
                    color: '#F4F5F3',
                    fontWeight: 500,
                    fontSize: '13px',
                    cursor: 'pointer',
                    fontFamily: 'inherit'
                  }}
                >Simulate next stage →</button>
              )}
              <button
                onClick={cancelProving}
                style={{
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: 0,
                  background: 'transparent',
                  color: '#9AA39F',
                  fontSize: '13px',
                  cursor: 'pointer',
                  fontFamily: 'inherit'
                }}
              >Cancel</button>
            </div>

            {/* Hidden actual proof generator */}
            <div style={{ display: 'none' }}>
              <ProofGenerator
                balances={balances.map(b => Number(b))}
                contractId={contractId}
                address={publicKey}
                reserveAddresses={reserves.map(r => r.address)}
                onSuccess={handleProofSuccess}
                onError={handleProofError}
                onProgress={handleProofProgress}
              />
            </div>
          </section>
        )}

        {/* STEP 3 · Attest */}
        {step === 3 && txHash && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <section style={{
              background: '#141918',
              border: '1px solid #262C29',
              borderRadius: '16px',
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              gap: '28px'
            }}>
              {/* Header with success status */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                flexWrap: 'wrap'
              }}>
                {/* Veraz logo with green vertex */}
                <svg viewBox="0 0 64 64" width="72" height="72" fill="none">
                  <path d="M7 8H17L37 52H27Z" fill="#F4F5F3"/>
                  <path d="M47 8H57L37 52H27Z" stroke="#F4F5F3" strokeWidth="3.5"/>
                  <path d="M32 41L37 52H27Z" fill="#3FD9AD"/>
                </svg>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#82B6F2'
                  }}>
                    <span style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '3px',
                      background: '#82B6F2'
                    }}/>
                    Proof verified on-chain
                  </span>
                  <h2 style={{
                    margin: 0,
                    fontWeight: 600,
                    fontSize: '24px',
                    letterSpacing: '-0.02em'
                  }}>Attestation recorded</h2>
                  <span style={{ fontSize: '14px', color: '#9AA39F' }}>
                    The Soroban verifier accepted the proof. No balance was revealed.
                  </span>
                </div>
              </div>

              {/* Stats grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px',
                borderTop: '1px solid #262C29',
                paddingTop: '24px'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#9AA39F'
                  }}>Status</span>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontWeight: 600,
                    fontSize: '28px',
                    letterSpacing: '-0.03em',
                    color: attestationData?.solvent ? '#3FD9AD' : '#C45C5C'
                  }}>
                    <span style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '5px',
                      background: attestationData?.solvent ? '#3FD9AD' : '#C45C5C'
                    }}/>
                    {attestationData?.solvent ? 'Solvent' : 'Insolvent'}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#9AA39F'
                  }}>Solvency ratio</span>
                  <span style={{
                    fontWeight: 600,
                    fontSize: '28px',
                    letterSpacing: '-0.03em'
                  }}>{attestationData?.solvencyRatio || '1.000'}</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#9AA39F'
                  }}>Ledger</span>
                  <span style={{
                    fontWeight: 600,
                    fontSize: '28px',
                    letterSpacing: '-0.03em'
                  }}>{attestationData?.ledgerSeq?.toLocaleString() || '0'}</span>
                </div>
              </div>

              {/* Transaction details */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '13px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '16px',
                  padding: '10px 0',
                  borderBottom: '1px solid #262C29'
                }}>
                  <span style={{ color: '#9AA39F', whiteSpace: 'nowrap', flexShrink: 0 }}>
                    tx hash
                  </span>
                  <a
                    href={`https://stellar.expert/explorer/${mode === 'demo' ? 'testnet' : 'public'}/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      minWidth: 0,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      textDecoration: 'none',
                      color: '#A6B2F5'
                    }}
                  >{txHash.slice(0, 16)}…{txHash.slice(-16)} ↗</a>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '16px',
                  padding: '10px 0',
                  borderBottom: '1px solid #262C29'
                }}>
                  <span style={{ color: '#9AA39F', whiteSpace: 'nowrap', flexShrink: 0 }}>
                    proof hash
                  </span>
                  <span style={{
                    minWidth: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>0x1a2b3c4d5e6f7a8b…9c0d1e2f3a4b5c6d</span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '16px',
                  padding: '10px 0',
                  borderBottom: '1px solid #262C29'
                }}>
                  <span style={{ color: '#9AA39F', whiteSpace: 'nowrap', flexShrink: 0 }}>
                    liabilities commitment
                  </span>
                  <span style={{
                    minWidth: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>0x8e4f…2a71 (Poseidon2 root)</span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '16px',
                  padding: '10px 0'
                }}>
                  <span style={{ color: '#9AA39F', whiteSpace: 'nowrap', flexShrink: 0 }}>
                    verified at
                  </span>
                  <span style={{ whiteSpace: 'nowrap' }}>
                    {attestationData?.timestamp
                      ? new Date(attestationData.timestamp * 1000).toISOString().replace('T', ' ').slice(0, 16) + ' UTC'
                      : new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC'
                    }
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <a
                  href={`https://stellar.expert/explorer/${mode === 'demo' ? 'testnet' : 'public'}/contract/${contractId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 18px',
                    borderRadius: '8px',
                    background: '#A6B2F5',
                    color: '#0B0F0E',
                    fontWeight: 600,
                    fontSize: '14px',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap'
                  }}
                >View on Stellar Expert · {mode === 'demo' ? 'testnet' : 'mainnet'} ↗</a>

                <button
                  onClick={() => alert('Share modal not yet implemented')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 18px',
                    borderRadius: '8px',
                    border: '1px solid #262C29',
                    background: 'transparent',
                    color: '#F4F5F3',
                    fontWeight: 500,
                    fontSize: '14px',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    whiteSpace: 'nowrap'
                  }}
                >Share attestation card</button>

                <button
                  onClick={() => {
                    setStep(1);
                    setTxHash(null);
                    setProveStage(0);
                  }}
                  style={{
                    padding: '12px 18px',
                    borderRadius: '8px',
                    border: 0,
                    background: 'transparent',
                    color: '#9AA39F',
                    fontSize: '14px',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    whiteSpace: 'nowrap'
                  }}
                >Generate another</button>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Tour Overlay */}
      {tourOpen && tourSpot && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 50,
          pointerEvents: 'none'
        }}>
          {/* Scrim backdrop */}
          <div
            onClick={skipTour}
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'auto',
              background: 'rgba(5,8,7,0.78)',
              cursor: 'pointer'
            }}
          />

          {/* Spotlight */}
          <div style={{
            position: 'fixed',
            left: `${tourSpot.x}px`,
            top: `${tourSpot.y}px`,
            width: `${tourSpot.w}px`,
            height: `${tourSpot.h}px`,
            borderRadius: '14px',
            boxShadow: '0 0 0 9999px rgba(5,8,7,0.78)',
            outline: '1px solid #D4B36A',
            transition: 'all 350ms cubic-bezier(0.4, 0, 0.2, 1)',
            pointerEvents: 'none'
          }} />

          {/* Floating popover */}
          <div
            id="tour-popover"
            style={{
              position: 'fixed',
              left: `${tourSpot.px}px`,
              top: `${tourSpot.py}px`,
              width: '340px',
              maxWidth: 'calc(100vw - 32px)',
              boxSizing: 'border-box',
              pointerEvents: 'auto',
              background: '#141918',
              border: '1px solid #262C29',
              borderRadius: '14px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              color: '#F4F5F3',
              fontFamily: "'Geist', system-ui, sans-serif",
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              transition: 'all 350ms cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#D4B36A'
              }}>
                Demo tour · {tourIdx + 1}/{TOUR_STEPS.length}
              </span>
              <button
                onClick={skipTour}
                style={{
                  padding: '4px 8px',
                  borderRadius: '6px',
                  border: 0,
                  background: 'transparent',
                  color: '#9AA39F',
                  fontSize: '12px',
                  cursor: 'pointer',
                  fontFamily: 'inherit'
                }}
              >Skip</button>
            </div>

            {/* Content */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <h3 style={{
                margin: 0,
                fontWeight: 600,
                fontSize: '18px',
                letterSpacing: '-0.02em'
              }}>
                {TOUR_STEPS[tourIdx].title}
              </h3>
              <p style={{
                margin: 0,
                fontSize: '14px',
                color: '#9AA39F',
                lineHeight: 1.5,
                textWrap: 'pretty'
              }}>
                {TOUR_STEPS[tourIdx].body}
              </p>
            </div>

            {/* Progress dots and navigation */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              {/* Progress dots */}
              <div style={{
                display: 'flex',
                gap: '4px',
                flex: 1
              }}>
                {TOUR_STEPS.map((_, i) => (
                  <span
                    key={i}
                    style={{
                      width: '16px',
                      height: '3px',
                      borderRadius: '2px',
                      background: i === tourIdx ? '#D4B36A' : '#262C29'
                    }}
                  />
                ))}
              </div>

              {/* Back button */}
              {tourIdx > 0 && (
                <button
                  onClick={prevTour}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #262C29',
                    background: 'transparent',
                    color: '#F4F5F3',
                    fontSize: '13px',
                    cursor: 'pointer',
                    fontFamily: 'inherit'
                  }}
                >Back</button>
              )}

              {/* Next/Finish button */}
              <button
                onClick={nextTour}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: 0,
                  background: '#F4F5F3',
                  color: '#0B0F0E',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  whiteSpace: 'nowrap'
                }}
              >
                {tourIdx < TOUR_STEPS.length - 1 ? 'Next' : 'Finish'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Keyframe animations */}
      <style>{`
        @keyframes vzpulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
      `}</style>
    </div>
  );
}
