import { useState } from 'react';
import { LangProvider } from './context/LangContext';
import TopBar from './components/TopBar';
import BottomNav from './components/BottomNav';
import ScamChecker from './screens/ScamChecker';
import CurrencyVerifier from './screens/CurrencyVerifier';
import FraudReporter from './screens/FraudReporter';
import LandingPage from './screens/LandingPage';
import LawEnforcementLogin from './screens/LawEnforcementLogin';
import LawEnforcementDashboard from './screens/LawEnforcementDashboard';

function AppShell() {
  const [activeTab, setActiveTab] = useState('landing');
  // Holds text pre-filled into Fraud Reporter when navigated from Scam Checker
  const [reportPrefill, setReportPrefill] = useState('');

  /** Called from ScamChecker "Report This" button */
  const navigateToReport = (message) => {
    setReportPrefill(message);
    setActiveTab('report');
  };

  const handleTabChange = (tab) => {
    // Clear prefill when user manually switches to reporter (fresh start)
    if (tab !== 'report') setReportPrefill('');
    setActiveTab(tab);
  };

  if (activeTab === 'landing') {
    return (
      <div style={{ background: '#ffffff', minHeight: '100dvh', width: '100vw', overflowX: 'hidden' }}>
        <LandingPage onNavigate={handleTabChange} />
      </div>
    );
  }

  if (activeTab === 'le_login') {
    return (
      <LawEnforcementLogin 
        onBack={() => handleTabChange('landing')} 
        onLogin={() => handleTabChange('le_dashboard')} 
      />
    );
  }

  if (activeTab === 'le_dashboard') {
    return <LawEnforcementDashboard onNavigate={handleTabChange} />;
  }

  return (
    <div className="app-shell bg-slate-50">
      <TopBar activeTab={activeTab} setActiveTab={handleTabChange} />
      <main className="tab-content w-full max-w-4xl mx-auto" key={activeTab}>
        {activeTab === 'scam' && (
          <ScamChecker navigateToReport={navigateToReport} />
        )}
        {activeTab === 'currency' && <CurrencyVerifier />}
        {activeTab === 'report' && (
          <FraudReporter initialDescription={reportPrefill} />
        )}
      </main>
      <BottomNav activeTab={activeTab} setActiveTab={handleTabChange} />
    </div>
  );
}

export default function App() {
  return (
    <LangProvider>
      <AppShell />
    </LangProvider>
  );
}
