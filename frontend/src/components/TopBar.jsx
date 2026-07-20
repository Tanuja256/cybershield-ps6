import { useLang } from '../context/LangContext';

export default function TopBar({ activeTab, setActiveTab }) {
  const { t, toggleLang, lang } = useLang();

  const navItems = [
    { id: 'scam', label: t.tabScamChecker },
    { id: 'currency', label: t.tabCurrencyVerifier },
    { id: 'report', label: t.tabFraudReporter },
  ];

  return (
    <header
      style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
        padding: '0.875rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      }}
    >
      {/* Brand & Home */}
      <button 
        onClick={() => setActiveTab('landing')}
        style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
        className="flex items-center gap-2"
      >
        {/* Shield logo */}
        <div
          style={{
            width: '2rem',
            height: '2rem',
            background: 'linear-gradient(135deg, #2563eb, #0d9488)',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5}
            className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>
          </svg>
        </div>
        <div>
          <p
            className="gradient-text"
            style={{ fontSize: '1rem', fontWeight: 800, lineHeight: 1.1 }}
          >
            {t.appName}
          </p>
          <p style={{ fontSize: '0.65rem', color: '#64748b', lineHeight: 1, marginTop: '2px' }}>
            {t.appTagline}
          </p>
        </div>
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: activeTab === item.id ? 700 : 500,
              color: activeTab === item.id ? '#2563eb' : '#64748b',
              borderBottom: activeTab === item.id ? '2px solid #2563eb' : '2px solid transparent',
              padding: '0.5rem 0',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              if (activeTab !== item.id) e.currentTarget.style.color = '#334155';
            }}
            onMouseOut={(e) => {
              if (activeTab !== item.id) e.currentTarget.style.color = '#64748b';
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Language toggle */}
      <button
        id="lang-toggle"
        onClick={toggleLang}
        style={{
          background: 'rgba(241, 245, 249, 0.8)',
          border: '1px solid rgba(226, 232, 240, 1)',
          borderRadius: '9999px',
          padding: '0.375rem 0.875rem',
          color: '#334155',
          fontWeight: 600,
          fontSize: '0.75rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.375rem',
          letterSpacing: '0.025em',
          fontFamily: 'var(--font-sans)',
        }}
      >
        <span style={{ fontSize: '0.875rem' }}>{lang === 'en' ? '🇮🇳' : '🔤'}</span>
        {t.langToggle}
      </button>
    </header>
  );
}
