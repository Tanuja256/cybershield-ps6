import { useState, useRef } from 'react';
import { useLang } from '../context/LangContext';

const API_BASE = 'http://localhost:8000';

// ─── Red-flag chip color mapping ───────────────────────────────────────────
const FLAG_COLORS = {
  default:            { bg: 'rgba(239,68,68,0.15)',   border: 'rgba(239,68,68,0.35)',   text: '#fca5a5' },
  authority:          { bg: 'rgba(249,115,22,0.15)',  border: 'rgba(249,115,22,0.35)',  text: '#fdba74' },
  urgency:            { bg: 'rgba(234,179,8,0.15)',   border: 'rgba(234,179,8,0.35)',   text: '#fde047' },
  financial:          { bg: 'rgba(168,85,247,0.15)',  border: 'rgba(168,85,247,0.35)',  text: '#d8b4fe' },
  phishing:           { bg: 'rgba(236,72,153,0.15)',  border: 'rgba(236,72,153,0.35)', text: '#f9a8d4' },
  social_engineering: { bg: 'rgba(6,182,212,0.15)',   border: 'rgba(6,182,212,0.35)',   text: '#67e8f9' },
};

const FLAG_CATEGORY_MAP = {
  'authority impersonation': 'authority',
  'government impersonation': 'authority',
  'bank impersonation': 'authority',
  'urgency pressure': 'urgency',
  'time pressure': 'urgency',
  'fear tactics': 'urgency',
  'financial lure': 'financial',
  'lottery scam': 'financial',
  'prize fraud': 'financial',
  'investment fraud': 'financial',
  'phishing link': 'phishing',
  'malicious link': 'phishing',
  'url spoofing': 'phishing',
  'social engineering': 'social_engineering',
  'otp solicitation': 'social_engineering',
};

function getFlagStyle(flag) {
  const key = Object.keys(FLAG_CATEGORY_MAP).find(k =>
    flag.toLowerCase().includes(k)
  );
  return FLAG_COLORS[key ? FLAG_CATEGORY_MAP[key] : 'default'];
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function LoadingSkeleton() {
  return (
    <div className="glass-card p-5 flex flex-col gap-4 animate-fade-in">
      {/* Pulsing shield icon */}
      <div className="flex items-center gap-3">
        <div
          className="animate-pulse-glow"
          style={{
            width: '2.5rem', height: '2.5rem',
            background: 'linear-gradient(135deg, rgba(37,99,235,0.3), rgba(13,148,136,0.3))',
            borderRadius: '0.625rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.25rem',
          }}
        >
          🔍
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <div className="shimmer h-3 rounded w-2/3" />
          <div className="shimmer h-3 rounded w-1/2" />
        </div>
      </div>
      <div className="shimmer h-2 rounded-full w-full" />
      <div className="flex gap-2">
        <div className="shimmer h-7 rounded-full w-32" />
        <div className="shimmer h-7 rounded-full w-28" />
        <div className="shimmer h-7 rounded-full w-24" />
      </div>
      <div className="shimmer h-16 rounded-xl w-full" />
    </div>
  );
}

function HighRiskBanner() {
  return (
    <div
      className="animate-slide-up"
      style={{
        background: 'linear-gradient(135deg, rgba(220,38,38,0.25), rgba(194,65,12,0.2))',
        border: '2px solid rgba(239,68,68,0.5)',
        borderRadius: '0.875rem',
        padding: '0.875rem 1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
      }}
    >
      <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>⚠️</span>
      <div>
        <p style={{ fontSize: '0.875rem', fontWeight: 800, color: '#fca5a5', lineHeight: 1.3 }}>
          HIGH RISK NUMBER
        </p>
        <p style={{ fontSize: '0.75rem', color: '#fda4a4', opacity: 0.9, marginTop: '0.2rem' }}>
          This number is linked to multiple other reports
        </p>
      </div>
    </div>
  );
}

function ScamVerdictCard({ result, message, onReport, t }) {
  const isScam    = result.verdict === 'scam';
  const isSafe    = result.verdict === 'safe';
  const isSuspect = result.verdict === 'suspicious';

  const palette = isScam ? {
    outerBg:     'linear-gradient(135deg, rgba(127,29,29,0.35), rgba(154,52,18,0.25))',
    outerBorder: 'rgba(239,68,68,0.45)',
    headerColor: '#fca5a5',
    barColor:    '#ef4444',
    badgeBg:     'rgba(239,68,68,0.2)',
    badgeBorder: 'rgba(239,68,68,0.45)',
    badgeText:   '#fca5a5',
    icon:        '🚨',
    label:       t.scamResultDanger,
  } : isSuspect ? {
    outerBg:     'linear-gradient(135deg, rgba(120,53,15,0.3), rgba(146,64,14,0.2))',
    outerBorder: 'rgba(245,158,11,0.4)',
    headerColor: '#fde68a',
    barColor:    '#f59e0b',
    badgeBg:     'rgba(245,158,11,0.15)',
    badgeBorder: 'rgba(245,158,11,0.4)',
    badgeText:   '#fbbf24',
    icon:        '⚠️',
    label:       t.scamResultWarning,
  } : {
    outerBg:     'linear-gradient(135deg, rgba(20,83,45,0.3), rgba(6,78,59,0.2))',
    outerBorder: 'rgba(34,197,94,0.35)',
    headerColor: '#86efac',
    barColor:    '#22c55e',
    badgeBg:     'rgba(34,197,94,0.15)',
    badgeBorder: 'rgba(34,197,94,0.35)',
    badgeText:   '#4ade80',
    icon:        '✅',
    label:       t.scamResultSafe,
  };

  const confidence = result.confidence_score ?? result.confidence ?? 0;
  const redFlags   = result.red_flags ?? [];
  const advisory   = result.advisory ?? result.message ?? '';

  return (
    <div
      className="flex flex-col gap-3 animate-slide-up"
      style={{
        background: palette.outerBg,
        border: `2px solid ${palette.outerBorder}`,
        borderRadius: '1rem',
        padding: '1.125rem',
      }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span style={{ fontSize: '1.5rem' }}>{palette.icon}</span>
          <div>
            <span
              style={{
                display: 'inline-block',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                background: palette.badgeBg,
                border: `1px solid ${palette.badgeBorder}`,
                color: palette.badgeText,
                fontWeight: 800,
                fontSize: '0.8rem',
                letterSpacing: '0.03em',
              }}
            >
              {palette.label}
            </span>
          </div>
        </div>

        {/* Report This button — only on scam/suspicious */}
        {!isSafe && (
          <button
            id="report-this-btn"
            onClick={() => onReport(message)}
            style={{
              background: 'rgba(239,68,68,0.15)',
              border: '1px solid rgba(239,68,68,0.4)',
              borderRadius: '0.625rem',
              padding: '0.375rem 0.75rem',
              color: '#fca5a5',
              fontWeight: 700,
              fontSize: '0.72rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              flexShrink: 0,
              fontFamily: 'var(--font-sans)',
              whiteSpace: 'nowrap',
            }}
          >
            🚀 {t.scamReport}
          </button>
        )}
      </div>

      {/* Confidence bar */}
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.375rem',
          }}
        >
          <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{t.scamConfidence}</span>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: palette.headerColor }}>
            {Math.round(confidence * 100)}%
          </span>
        </div>
        <div
          style={{
            height: '7px',
            background: 'rgba(15,23,42,0.6)',
            borderRadius: '9999px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${Math.round(confidence * 100)}%`,
              height: '100%',
              background: palette.barColor,
              borderRadius: '9999px',
              transition: 'width 1s cubic-bezier(0.4,0,0.2,1)',
              boxShadow: `0 0 8px ${palette.barColor}60`,
            }}
          />
        </div>
      </div>

      {/* Red flag chips */}
      {redFlags.length > 0 && (
        <div>
          <p style={{ fontSize: '0.7rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.5rem' }}>
            {t.scamReasons}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {redFlags.map((flag, i) => {
              const s = getFlagStyle(flag);
              return (
                <span
                  key={i}
                  style={{
                    padding: '0.3rem 0.65rem',
                    borderRadius: '9999px',
                    background: s.bg,
                    border: `1px solid ${s.border}`,
                    color: s.text,
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                  }}
                >
                  {flag}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Advisory text */}
      {advisory && (
        <div
          style={{
            background: 'rgba(15,23,42,0.5)',
            border: `1px solid ${palette.outerBorder}`,
            borderRadius: '0.75rem',
            padding: '0.75rem 0.875rem',
          }}
        >
          <p style={{ fontSize: '0.72rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.3rem' }}>
            Advisory
          </p>
          <p style={{ fontSize: '0.82rem', color: '#e2e8f0', lineHeight: 1.5 }}>
            {advisory}
          </p>
        </div>
      )}

      {/* Helpline nudge for non-safe results */}
      {!isSafe && (
        <a
          href="tel:1930"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.625rem 0.875rem',
            background: 'rgba(59,130,246,0.1)',
            border: '1px solid rgba(59,130,246,0.25)',
            borderRadius: '0.75rem',
            textDecoration: 'none',
          }}
        >
          <span>📞</span>
          <span style={{ fontSize: '0.8rem', color: '#93c5fd', fontWeight: 600 }}>
            {t.scamHelpline}
          </span>
          <span style={{ marginLeft: 'auto', color: '#60a5fa', fontSize: '0.75rem' }}>Tap to call →</span>
        </a>
      )}
    </div>
  );
}

// ─── Main screen ────────────────────────────────────────────────────────────

export default function ScamChecker({ navigateToReport }) {
  const { t, lang } = useLang();

  const [message, setMessage]     = useState('');
  const [phone, setPhone]         = useState('');
  const [result, setResult]       = useState(null);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState(null);

  const resultRef = useRef(null);

  const tips = [t.scamTip1, t.scamTip2, t.scamTip3, t.scamTip4];

  const handleCheck = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const body = {
        message: message.trim(),
        language: lang,
        ...(phone.trim() ? { phone_number: phone.trim() } : {}),
      };

      const res = await fetch(`${API_BASE}/scam-check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail ?? `Server error ${res.status}`);
      }

      const data = await res.json();
      setResult(data);

      // Scroll to result after paint
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    } catch (err) {
      setError(err.message || 'Could not reach the server. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessage('');
    setPhone('');
    setResult(null);
    setError(null);
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') handleCheck();
  };

  return (
    <div className="p-4 flex flex-col gap-4">

      {/* ── Header ── */}
      <div
        className="glass-card p-5 animate-slide-up"
        style={{
          background: 'linear-gradient(135deg, rgba(37,99,235,0.12), rgba(13,148,136,0.08))',
          border: '1px solid rgba(59,130,246,0.2)',
        }}
      >
        <div className="flex items-center gap-3">
          <div style={{ fontSize: '1.75rem' }}>🛡️</div>
          <div>
            <h1 className="gradient-text" style={{ fontSize: '1.25rem', fontWeight: 800 }}>
              {t.scamTitle}
            </h1>
            <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{t.scamSubtitle}</p>
          </div>
        </div>
      </div>

      {/* ── Input card ── */}
      <div className="glass-card p-4 flex flex-col gap-3">

        {/* Message textarea */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="scam-input"
            style={{ fontSize: '0.78rem', fontWeight: 600, color: '#93c5fd' }}
          >
            {t.scamInputLabel} *
          </label>
          <textarea
            id="scam-input"
            className="input-base"
            rows={5}
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t.scamPlaceholder}
            style={{ resize: 'none' }}
          />
          <p style={{ fontSize: '0.65rem', color: '#475569', textAlign: 'right' }}>
            Ctrl + Enter to submit
          </p>
        </div>

        {/* Optional phone field */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="scam-phone"
            style={{ fontSize: '0.78rem', fontWeight: 600, color: '#93c5fd' }}
          >
            Phone number{' '}
            <span style={{ fontWeight: 400, color: '#64748b' }}>(optional)</span>
          </label>
          <input
            id="scam-phone"
            type="tel"
            className="input-base"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="+91-98765-43210"
          />
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            id="scam-analyze-btn"
            className="btn-primary"
            onClick={handleCheck}
            disabled={loading || !message.trim()}
            style={{ flex: 2 }}
          >
            {loading ? (
              <>
                <span
                  style={{
                    display: 'inline-block',
                    animation: 'spin 0.8s linear infinite',
                  }}
                >
                  ⟳
                </span>
                {t.scamAnalyzing}
              </>
            ) : (
              <>{t.scamAnalyze}</>
            )}
          </button>

          {(message || result || error) && (
            <button
              className="btn-secondary"
              onClick={handleClear}
              style={{ flex: 1 }}
            >
              {t.scamClear}
            </button>
          )}
        </div>
      </div>

      {/* ── Loading skeleton ── */}
      {loading && <LoadingSkeleton />}

      {/* ── Error state ── */}
      {error && !loading && (
        <div
          className="glass-card p-4 animate-fade-in"
          style={{
            background: 'rgba(127,29,29,0.2)',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '0.875rem',
          }}
        >
          <div className="flex items-start gap-3">
            <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>🔌</span>
            <div>
              <p style={{ fontSize: '0.825rem', fontWeight: 700, color: '#fca5a5', marginBottom: '0.25rem' }}>
                Could not reach the server
              </p>
              <p style={{ fontSize: '0.75rem', color: '#fda4a4', opacity: 0.85, lineHeight: 1.45 }}>
                {error}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Result ── */}
      {result && !loading && (
        <div ref={resultRef} className="flex flex-col gap-3">
          {/* High-risk network banner (shown above verdict card) */}
          {result.high_risk_network && <HighRiskBanner />}

          <ScamVerdictCard
            result={result}
            message={message}
            onReport={navigateToReport}
            t={t}
          />
        </div>
      )}

      {/* ── Tips ── */}
      {!result && !loading && (
        <div className="glass-card p-4">
          <p style={{ fontSize: '0.78rem', fontWeight: 700, color: '#60a5fa', marginBottom: '0.625rem' }}>
            {t.scamTips}
          </p>
          <ul className="flex flex-col gap-2">
            {tips.map((tip, i) => (
              <li
                key={i}
                style={{
                  fontSize: '0.78rem',
                  color: '#94a3b8',
                  padding: '0.5rem 0.75rem',
                  background: 'rgba(30,41,59,0.5)',
                  borderRadius: '0.5rem',
                  lineHeight: 1.45,
                }}
              >
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Spin keyframe inline (Tailwind v4 doesn't bundle it by default without purge) */}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
