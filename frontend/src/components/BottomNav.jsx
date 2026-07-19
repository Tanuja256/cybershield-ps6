import { useLang } from '../context/LangContext';

const tabs = [
  {
    id: 'scam',
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={2} className="w-6 h-6"
        stroke={active ? 'url(#grad)' : 'currentColor'}>
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa"/>
            <stop offset="100%" stopColor="#2dd4bf"/>
          </linearGradient>
        </defs>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>
      </svg>
    ),
  },
  {
    id: 'currency',
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={2} className="w-6 h-6"
        stroke={active ? 'url(#grad2)' : 'currentColor'}>
        <defs>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa"/>
            <stop offset="100%" stopColor="#2dd4bf"/>
          </linearGradient>
        </defs>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"/>
      </svg>
    ),
  },
  {
    id: 'report',
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={2} className="w-6 h-6"
        stroke={active ? 'url(#grad3)' : 'currentColor'}>
        <defs>
          <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa"/>
            <stop offset="100%" stopColor="#2dd4bf"/>
          </linearGradient>
        </defs>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
      </svg>
    ),
  },
];

export default function BottomNav({ activeTab, setActiveTab }) {
  const { t } = useLang();
  const labels = [t.tabScamChecker, t.tabCurrencyVerifier, t.tabFraudReporter];

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '480px',
        background: 'rgba(15, 23, 42, 0.92)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(51, 65, 85, 0.6)',
        zIndex: 50,
        padding: '0.5rem 0 0.625rem',
      }}
    >
      <div className="flex items-center justify-around">
        {tabs.map((tab, i) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className="flex flex-col items-center gap-1 flex-1 py-1"
              style={{
                color: active ? 'transparent' : '#64748b',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              {/* Active indicator pill */}
              {active && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-0.5rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '2rem',
                    height: '3px',
                    background: 'linear-gradient(90deg, #3b82f6, #14b8a6)',
                    borderRadius: '9999px',
                  }}
                />
              )}
              {tab.icon(active)}
              <span
                style={{
                  fontSize: '0.625rem',
                  fontWeight: active ? 700 : 500,
                  letterSpacing: '0.025em',
                  background: active ? 'linear-gradient(135deg, #60a5fa, #2dd4bf)' : 'none',
                  WebkitBackgroundClip: active ? 'text' : 'unset',
                  WebkitTextFillColor: active ? 'transparent' : '#64748b',
                  backgroundClip: active ? 'text' : 'unset',
                  maxWidth: '5rem',
                  textAlign: 'center',
                  lineHeight: 1.2,
                }}
              >
                {labels[i]}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
