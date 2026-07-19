import { useLang } from '../context/LangContext';

export default function TopBar() {
  const { t, toggleLang, lang } = useLang();

  return (
    <header
      style={{
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(51, 65, 85, 0.5)',
        padding: '0.875rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 40,
      }}
    >
      {/* Brand */}
      <div className="flex items-center gap-2">
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
            style={{ fontSize: '0.875rem', fontWeight: 800, lineHeight: 1.1 }}
          >
            {t.appName}
          </p>
          <p style={{ fontSize: '0.6rem', color: '#64748b', lineHeight: 1 }}>
            {t.appTagline}
          </p>
        </div>
      </div>

      {/* Language toggle */}
      <button
        id="lang-toggle"
        onClick={toggleLang}
        style={{
          background: 'linear-gradient(135deg, rgba(37,99,235,0.15), rgba(13,148,136,0.15))',
          border: '1px solid rgba(59,130,246,0.3)',
          borderRadius: '9999px',
          padding: '0.375rem 0.875rem',
          color: '#93c5fd',
          fontWeight: 700,
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
