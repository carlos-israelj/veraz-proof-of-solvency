import { useState, useEffect } from 'react';
import DataStream from './DataStream';

export default function ProofGenerator({ balances, contractId, address, onSuccess, onError }) {
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [triviaIndex, setTriviaIndex] = useState(0);

  const stages = [
    'Initializing circuit...',
    'Building Merkle Sum Tree...',
    'Executing Noir witness...',
    'Generating UltraHonk proof...',
    'Formatting public inputs...',
    'Submitting to blockchain...',
    'Verifying on-chain...'
  ];

  const trivia = [
    'UltraHonk generates proofs 10x faster than Groth16',
    'Stellar Protocol 26 enables native BN254 verification',
    'Your balances never leave your browser',
    'Merkle trees reduce 1000 balances to 32 bytes',
    'Proof size: ~14KB regardless of liability count',
    'On-chain verification takes ~7 seconds',
    'Zero-Knowledge: Verifier learns nothing about individual balances'
  ];

  useEffect(() => {
    generateAndSubmitProof();
  }, []);

  useEffect(() => {
    const triviaInterval = setInterval(() => {
      setTriviaIndex((prev) => (prev + 1) % trivia.length);
    }, 4000);
    return () => clearInterval(triviaInterval);
  }, []);

  async function generateAndSubmitProof() {
    try {
      // Stage 0: Initialize
      setStage(0);
      setProgress(5);
      await sleep(500);

      // Stage 1: Import prover
      setStage(1);
      setProgress(15);
      const { generateSolvencyProof } = await import('../lib/prover.js');
      const { attest, getCurrentLedgerSeq } = await import('../lib/stellar.js');
      await sleep(500);

      // Stage 2: Prepare inputs
      setStage(2);
      setProgress(25);
      const salts = balances.map((_, i) => String(i + 1));
      const ledgerSeq = await getCurrentLedgerSeq();
      await sleep(500);

      // Stage 3: Generate proof (this is the slow part)
      setStage(3);
      setProgress(35);

      const { proof, publicInputs } = await generateSolvencyProof({
        balances,
        salts,
        ledgerSeq,
      });

      setProgress(70);
      await sleep(500);

      // Stage 4: Format inputs
      setStage(4);
      setProgress(75);
      await sleep(300);

      // Stage 5: Submit transaction
      setStage(5);
      setProgress(80);
      const result = await attest({
        contractId: contractId.trim(),
        publicInputs,
        proof,
        sourceAddress: address,
      });

      setProgress(95);
      await sleep(300);

      // Stage 6: Verify
      setStage(6);
      setProgress(100);
      await sleep(500);

      onSuccess(result.hash);
    } catch (error) {
      console.error('Proof generation failed:', error);
      onError(error.message || String(error));
    }
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  return (
    <div className="proof-generator animate-fadeIn">
      {/* Data Stream Background */}
      <DataStream active={stage >= 3 && stage <= 5} />

      {/* Cryptographic Scanner */}
      <div className="scanner-container">
        <div className="scanner-box">
          <div className="scanner-line"></div>
          <div className="scanner-grid">
            {Array.from({ length: 64 }).map((_, i) => (
              <div
                key={i}
                className="scanner-cell"
                style={{
                  animationDelay: `${i * 0.05}s`,
                  opacity: Math.random() > 0.7 ? 1 : 0.3
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Progress Info */}
      <div className="progress-info">
        <h2 className="progress-title mono text-gradient">
          {stages[stage]}
        </h2>

        <div className="progress-bar-container">
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="progress-percent mono">{progress}%</div>
        </div>

        <div className="stage-badges">
          {stages.map((_, idx) => (
            <div
              key={idx}
              className={`stage-badge ${idx === stage ? 'active' : ''} ${idx < stage ? 'completed' : ''}`}
            />
          ))}
        </div>
      </div>

      {/* Trivia Box */}
      <div className="trivia-box">
        <div className="trivia-icon">💡</div>
        <div className="trivia-content">
          <div className="trivia-label mono">DID YOU KNOW?</div>
          <div className="trivia-text" key={triviaIndex}>
            {trivia[triviaIndex]}
          </div>
        </div>
      </div>

      {/* Technical Details */}
      <div className="tech-details">
        <div className="tech-row">
          <span className="tech-label mono">Circuit</span>
          <span className="tech-value mono">Noir v1.0.0-beta.9</span>
        </div>
        <div className="tech-row">
          <span className="tech-label mono">Backend</span>
          <span className="tech-value mono">Barretenberg UltraHonk</span>
        </div>
        <div className="tech-row">
          <span className="tech-label mono">Curve</span>
          <span className="tech-value mono">BN254</span>
        </div>
        <div className="tech-row">
          <span className="tech-label mono">Inputs</span>
          <span className="tech-value mono">{balances.length} holders</span>
        </div>
      </div>

      <style jsx>{`
        .proof-generator {
          padding: var(--space-xl) 0;
          max-width: 700px;
          margin: 0 auto;
        }

        .scanner-container {
          margin-bottom: var(--space-2xl);
        }

        .scanner-box {
          width: 100%;
          aspect-ratio: 1;
          max-width: 400px;
          margin: 0 auto;
          border: 2px solid var(--emerald-electric);
          border-radius: var(--radius-lg);
          position: relative;
          overflow: hidden;
          background: radial-gradient(
            circle at center,
            rgba(0, 255, 136, 0.1),
            transparent 70%
          );
          box-shadow: var(--shadow-glow-emerald);
        }

        .scanner-line {
          position: absolute;
          width: 100%;
          height: 3px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--emerald-electric),
            transparent
          );
          box-shadow: 0 0 10px var(--emerald-electric);
          animation: scan 3s ease-in-out infinite;
        }

        @keyframes scan {
          0%, 100% {
            top: 0;
            opacity: 1;
          }
          50% {
            top: 100%;
            opacity: 0.5;
          }
        }

        .scanner-grid {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 2px;
          padding: var(--space-md);
          height: 100%;
        }

        .scanner-cell {
          background: var(--emerald-electric);
          opacity: 0.3;
          border-radius: 2px;
          animation: cellPulse 2s ease-in-out infinite;
        }

        @keyframes cellPulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }

        .progress-info {
          text-align: center;
          margin-bottom: var(--space-2xl);
        }

        .progress-title {
          font-size: 1.25rem;
          margin-bottom: var(--space-lg);
          min-height: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .progress-bar-container {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          margin-bottom: var(--space-md);
        }

        .progress-bar {
          flex: 1;
          height: 12px;
          background: var(--noir-slate);
          border-radius: 100px;
          overflow: hidden;
          border: 1px solid var(--noir-fog);
        }

        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--emerald-electric), var(--cyan-bright));
          border-radius: 100px;
          transition: width 0.5s var(--transition-smooth);
          box-shadow: var(--shadow-glow-emerald);
          position: relative;
        }

        .progress-bar-fill::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          animation: shimmer 2s linear infinite;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .progress-percent {
          min-width: 50px;
          text-align: right;
          color: var(--emerald-electric);
          font-weight: 600;
        }

        .stage-badges {
          display: flex;
          justify-content: center;
          gap: var(--space-xs);
          margin-top: var(--space-md);
        }

        .stage-badge {
          width: 32px;
          height: 4px;
          background: var(--noir-slate);
          border-radius: 2px;
          transition: all var(--duration-normal);
        }

        .stage-badge.active {
          background: var(--emerald-electric);
          box-shadow: 0 0 8px var(--emerald-electric);
        }

        .stage-badge.completed {
          background: var(--cyan-bright);
        }

        .trivia-box {
          background: linear-gradient(135deg, var(--noir-charcoal), var(--noir-slate));
          border: 1px solid var(--emerald-electric);
          border-radius: var(--radius-lg);
          padding: var(--space-lg);
          display: flex;
          gap: var(--space-md);
          margin-bottom: var(--space-xl);
        }

        .trivia-icon {
          font-size: 2rem;
          flex-shrink: 0;
        }

        .trivia-content {
          flex: 1;
        }

        .trivia-label {
          font-size: 0.75rem;
          color: var(--emerald-electric);
          margin-bottom: var(--space-xs);
          letter-spacing: 0.1em;
        }

        .trivia-text {
          color: var(--noir-white);
          line-height: 1.6;
          animation: fadeIn 0.5s ease-in-out;
        }

        .tech-details {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--noir-slate);
          border-radius: var(--radius-md);
          padding: var(--space-md);
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
        }

        .tech-row {
          display: flex;
          justify-content: space-between;
          padding: var(--space-xs) 0;
          border-bottom: 1px solid var(--noir-slate);
        }

        .tech-row:last-child {
          border-bottom: none;
        }

        .tech-label {
          color: var(--noir-fog);
          font-size: 0.875rem;
        }

        .tech-value {
          color: var(--emerald-electric);
          font-size: 0.875rem;
        }

        @media (max-width: 768px) {
          .scanner-box {
            max-width: 300px;
          }

          .progress-title {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
