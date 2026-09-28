import { useState } from 'react';
import { WalletProvider } from './contexts/WalletContext';
import Landing from './components/Landing';
import IssuerFlow from './components/IssuerFlow';
import AuditorFlow from './components/AuditorFlow';
import IntegrationsView from './components/IntegrationsView';

export default function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'issuer' | 'auditor' | 'integrations'

  function handleNavigate(destination) {
    setView(destination);
  }

  function handleBack() {
    setView('landing');
  }

  return (
    <WalletProvider>
      <main id="main-content">
        {/* View Router */}
        {view === 'landing' && <Landing onNavigate={handleNavigate} />}
        {view === 'issuer' && <IssuerFlow onBack={handleBack} />}
        {view === 'auditor' && <AuditorFlow onBack={handleBack} />}
        {view === 'integrations' && <IntegrationsView onBack={handleBack} />}
      </main>
    </WalletProvider>
  );
}
