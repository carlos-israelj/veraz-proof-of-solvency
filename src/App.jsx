import { useState } from 'react';
import Landing from './components/Landing';
import IssuerFlow from './components/IssuerFlow';
import AuditorFlow from './components/AuditorFlow';
import IntegrationsView from './components/IntegrationsView';
import ParticleNetwork from './components/ParticleNetwork';
import CursorTrail from './components/CursorTrail';
import HexGrid from './components/HexGrid';
import './styles/index.css';

export default function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'issuer' | 'auditor' | 'integrations'

  function handleNavigate(destination) {
    setView(destination);
  }

  function handleBack() {
    setView('landing');
  }

  return (
    <div className="app-container">
      {/* Background Effects */}
      <div className="bg-gradient-1"></div>
      <div className="bg-gradient-2"></div>

      {/* Animated Backgrounds */}
      <HexGrid opacity={0.03} />
      <ParticleNetwork active={view === 'landing'} />
      <CursorTrail active={true} />

      {/* View Router */}
      {view === 'landing' && <Landing onNavigate={handleNavigate} />}
      {view === 'issuer' && <IssuerFlow onBack={handleBack} />}
      {view === 'auditor' && <AuditorFlow onBack={handleBack} />}
      {view === 'integrations' && <IntegrationsView onBack={handleBack} />}

      <style jsx>{`
        .app-container {
          position: relative;
          min-height: 100vh;
        }

        .bg-gradient-1 {
          position: fixed;
          top: -50%;
          left: -50%;
          width: 100%;
          height: 100%;
          background: radial-gradient(
            circle at center,
            rgba(0, 255, 136, 0.08),
            transparent 50%
          );
          pointer-events: none;
          animation: float 20s ease-in-out infinite;
          z-index: -1;
        }

        .bg-gradient-2 {
          position: fixed;
          bottom: -50%;
          right: -50%;
          width: 100%;
          height: 100%;
          background: radial-gradient(
            circle at center,
            rgba(0, 255, 255, 0.08),
            transparent 50%
          );
          pointer-events: none;
          animation: float 25s ease-in-out infinite reverse;
          z-index: -1;
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
          }
          33% {
            transform: translate(30px, -30px);
          }
          66% {
            transform: translate(-20px, 20px);
          }
        }
      `}</style>
    </div>
  );
}
