import { useState } from 'react';
import { LangProvider } from './context/LangContext';
import TopBar from './components/TopBar';
import BottomNav from './components/BottomNav';
import ScamChecker from './screens/ScamChecker';
import CurrencyVerifier from './screens/CurrencyVerifier';
import FraudReporter from './screens/FraudReporter';

function AppShell() {
  const [activeTab, setActiveTab] = useState('scam');
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

  return (
    <div className="app-shell">
      <TopBar />
      <main className="tab-content" key={activeTab}>
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
