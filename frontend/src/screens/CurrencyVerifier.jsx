import { useState, useRef, useCallback } from 'react';
import { useLang } from '../context/LangContext';

const API_BASE = 'http://localhost:8000';
const NAVY = '#0F172A';
const BORDER = '#E2E8F0';
const BG = '#F8FAFC';
const MUTED = '#64748B';

const FEATURE_KEYS = [
  'watermark',
  'security_thread',
  'microprint',
  'serial_pattern',
  'color_shift',
];

function ShieldLogo() {
  return (
    <div
      style={{
        width: '2.25rem',
        height: '2.25rem',
        background: NAVY,
        borderRadius: '9999px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} style={{ width: '1.125rem', height: '1.125rem' }}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
        />
      </svg>
    </div>
  );
}

function UploadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth={1.75} style={{ width: '2rem', height: '2rem' }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ width: '1rem', height: '1rem' }}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: '1.125rem', height: '1.125rem', color: '#16a34a', flexShrink: 0 }}>
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: '1.125rem', height: '1.125rem', color: '#dc2626', flexShrink: 0 }}>
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
    </svg>
  );
}

function QuestionIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: '1.125rem', height: '1.125rem', color: '#94a3b8', flexShrink: 0 }}>
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a1.5 1.5 0 112.12 2.12l-.94.94a.75.75 0 000 1.06.75.75 0 001.06 0l.94-.94a3 3 0 10-4.24-4.24.75.75 0 001.06 1.06zM10 15a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
    </svg>
  );
}

function VerdictCard({ result, t }) {
  const verdict = (result.verdict ?? '').toLowerCase();
  const confidence = result.confidence_score ?? result.confidence ?? 0;
  const features = result.features ?? {};
  const pct = Math.round(
    typeof confidence === 'number' && confidence <= 1 ? confidence * 100 : confidence
  );

  const isGenuine = verdict === 'genuine';
  const isFake = verdict === 'fake' || verdict === 'counterfeit';

  const palette = isGenuine
    ? { border: '#86efac', bg: '#f0fdf4', label: t.currencyVerdictGenuine, bar: '#16a34a', text: '#15803d' }
    : isFake
    ? { border: '#fca5a5', bg: '#fef2f2', label: t.currencyVerdictFake, bar: '#dc2626', text: '#b91c1c' }
    : { border: '#fcd34d', bg: '#fffbeb', label: t.currencyVerdictSuspect, bar: '#d97706', text: '#b45309' };

  return (
    <div
      className="animate-slide-up"
      style={{
        background: palette.bg,
        border: `1px solid ${palette.border}`,
        borderRadius: '0.75rem',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
        maxWidth: '42rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <span style={{ fontSize: '1.125rem', fontWeight: 800, color: palette.text, letterSpacing: '0.04em' }}>
          {palette.label}
        </span>
        <span style={{ fontSize: '0.875rem', fontWeight: 700, color: palette.text }}>{pct}%</span>
      </div>

      <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: palette.bar, borderRadius: '9999px', transition: 'width 0.8s ease' }} />
      </div>

      <div>
        <p style={{ fontSize: '0.7rem', fontWeight: 700, color: MUTED, marginBottom: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {t.currencyFeatureBreakdown}
        </p>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {FEATURE_KEYS.map(key => {
            const val = features[key];
            const passed =
              typeof val === 'boolean' ? val :
              typeof val === 'object' && val !== null ? (val.passed ?? val.detected ?? val.present ?? false) :
              undefined;
            const label = t[`feat_${key}`] ?? key.replace(/_/g, ' ');
            const detail =
              typeof val === 'object' && val !== null
                ? (val.detail ?? val.note ?? val.description ?? '')
                : '';

            return (
              <li
                key={key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  padding: '0.625rem 0.75rem',
                  borderRadius: '0.5rem',
                  background: '#ffffff',
                  border: `1px solid ${BORDER}`,
                }}
              >
                {passed === true ? <CheckIcon /> : passed === false ? <CrossIcon /> : <QuestionIcon />}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '0.8rem', fontWeight: 600, color: NAVY }}>{label}</p>
                  {detail && (
                    <p style={{ fontSize: '0.68rem', color: MUTED, marginTop: '0.1rem' }}>{detail}</p>
                  )}
                </div>
                <span
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    color: passed === true ? '#16a34a' : passed === false ? '#dc2626' : MUTED,
                  }}
                >
                  {passed === true ? 'PASS' : passed === false ? 'FAIL' : 'N/A'}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {isFake && (
        <button
          type="button"
          style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '0.5rem',
            padding: '0.75rem 1rem',
            color: '#b91c1c',
            fontWeight: 700,
            fontSize: '0.8125rem',
            cursor: 'pointer',
            fontFamily: 'var(--font-sans)',
          }}
        >
          {t.currencyReportFake}
        </button>
      )}
    </div>
  );
}

function StatsBar() {
  const stats = [
    { value: '12,80,412', en: 'Notes verified', hi: 'नोट जाँचे गए' },
    { value: '1,204', en: 'Fake caught (24h)', hi: 'नकली पकड़े' },
    { value: '99.2%', en: 'Model accuracy', hi: 'सटीकता' },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '0.75rem',
        width: '100%',
        maxWidth: '48rem',
      }}
    >
      {stats.map(({ value, en, hi }) => (
        <div
          key={en}
          style={{
            background: '#FFFFFF',
            border: `1px solid ${BORDER}`,
            borderRadius: '0.75rem',
            padding: '1.25rem 0.75rem',
            textAlign: 'center',
            boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.04)',
          }}
        >
          <p style={{ fontSize: '1.375rem', fontWeight: 800, color: NAVY, lineHeight: 1.1 }}>{value}</p>
          <p style={{ fontSize: '0.75rem', color: MUTED, marginTop: '0.375rem', fontWeight: 500 }}>{en}</p>
          <p style={{ fontSize: '0.6875rem', color: '#94a3b8', marginTop: '0.125rem' }}>{hi}</p>
        </div>
      ))}
    </div>
  );
}

export default function CurrencyVerifier({ onNavigate }) {
  const { t, lang, setLang } = useLang();

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const acceptFile = useCallback((f) => {
    if (!f) return;
    if (!f.type.startsWith('image/')) {
      setError('Please upload an image file (JPG or PNG).');
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setError('File too large — maximum 10 MB.');
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
    setError(null);
  }, []);

  const handleFileChange = (e) => acceptFile(e.target.files?.[0]);
  const handleCameraChange = (e) => acceptFile(e.target.files?.[0]);

  const onDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = (e) => { e.preventDefault(); setDragging(false); };
  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    acceptFile(e.dataTransfer.files?.[0]);
  };

  const handleVerify = async () => {
    if (!file) return;
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const fd = new FormData();
      fd.append('image', file);

      const res = await fetch(`${API_BASE}/currency-verify`, {
        method: 'POST',
        body: fd,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail ?? `Server error ${res.status}`);
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Could not reach the server. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleRetake = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  const switchLang = (code) => {
    if (lang !== code) setLang(code);
  };

  return (
    <div style={{ background: BG, minHeight: '100%', width: '100%', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header
        style={{
          background: '#FFFFFF',
          borderBottom: `1px solid ${BORDER}`,
          padding: '0.875rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', minWidth: 0 }}>
          <button
            type="button"
            onClick={() => onNavigate?.('landing')}
            aria-label="Back to home"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: '#FFFFFF',
              border: `1px solid ${BORDER}`,
              borderRadius: '0.375rem',
              padding: '0.4rem 0.65rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: NAVY,
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
              flexShrink: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', minWidth: 0 }}>
            <ShieldLogo />
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: '0.9375rem', fontWeight: 700, color: NAVY, lineHeight: 1.15 }}>CyberShield India</p>
              <p style={{ fontSize: '0.625rem', color: MUTED, marginTop: '1px' }}>साइबरशील्ड भारत</p>
            </div>
          </div>

          <div style={{ width: '1px', height: '2rem', background: BORDER, flexShrink: 0 }} className="hidden sm:block" />

          <div className="hidden sm:block" style={{ textAlign: 'left' }}>
            <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: NAVY, lineHeight: 1.15 }}>Currency Verifier</p>
            <p style={{ fontSize: '0.625rem', color: MUTED, marginTop: '1px' }}>मुद्रा सत्यापन</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              background: '#F0FDF4',
              border: '1px solid #BBF7D0',
              borderRadius: '9999px',
              padding: '0.375rem 0.75rem',
              fontSize: '0.75rem',
              fontWeight: 500,
              color: '#15803D',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E', flexShrink: 0 }} />
            System operational · सिस्टम सक्रिय
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="1.75">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.6 9h16.8M3.6 15h16.8M12 3c2.5 2.7 3.8 5.8 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.8-3.8-9s1.3-6.3 3.8-9z" />
            </svg>
            <div
              style={{
                display: 'flex',
                border: `1px solid ${BORDER}`,
                borderRadius: '0.375rem',
                overflow: 'hidden',
              }}
            >
              {['en', 'hi'].map(code => (
                <button
                  key={code}
                  type="button"
                  onClick={() => switchLang(code)}
                  style={{
                    padding: '0.375rem 0.625rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer',
                    background: lang === code ? NAVY : '#F1F5F9',
                    color: lang === code ? '#FFFFFF' : NAVY,
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  {code === 'en' ? 'EN' : 'हिं'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem 1.25rem 2.5rem',
          gap: '1.25rem',
          width: '100%',
          maxWidth: '56rem',
          margin: '0 auto',
        }}
      >
        {/* Mobile page title */}
        <div className="sm:hidden" style={{ width: '100%', textAlign: 'center', marginBottom: '0.25rem' }}>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: NAVY }}>Currency Verifier</h1>
          <p style={{ fontSize: '0.75rem', color: MUTED, marginTop: '2px' }}>मुद्रा सत्यापन</p>
        </div>

        {/* Upload zone */}
        {!preview && (
          <>
            <div
              id="currency-drop-zone"
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              style={{
                width: '100%',
                maxWidth: '42rem',
                border: `2px dashed ${dragging ? '#94a3b8' : '#CBD5E1'}`,
                borderRadius: '1rem',
                padding: '3rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                cursor: 'pointer',
                background: dragging ? '#F1F5F9' : '#FFFFFF',
                transition: 'all 0.2s ease',
                boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.03)',
              }}
            >
              <div
                style={{
                  width: '4.5rem',
                  height: '4.5rem',
                  background: '#F1F5F9',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <UploadIcon />
              </div>

              <div style={{ textAlign: 'center' }}>
                <p style={{ fontWeight: 700, fontSize: '1.25rem', color: NAVY, marginBottom: '0.375rem' }}>
                  Drop a photo of the note
                </p>
                <p style={{ fontSize: '0.8125rem', color: MUTED, marginBottom: '0.5rem', lineHeight: 1.4 }}>
                  नोट की फोटो यहां ड्रैग करें या क्लिक करके अपलोड करें
                </p>
                <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  Supports ₹100, ₹200, ₹500, ₹2000 · JPG / PNG · up to 10MB
                </p>
              </div>

              <button
                id="currency-choose-file"
                type="button"
                onClick={e => { e.stopPropagation(); fileInputRef.current?.click(); }}
                style={{
                  background: NAVY,
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  padding: '0.7rem 1.35rem',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  fontFamily: 'var(--font-sans)',
                  marginTop: '0.25rem',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                Choose file
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>

            <button
              id="currency-camera-btn"
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              style={{
                background: 'none',
                border: 'none',
                color: MUTED,
                fontSize: '0.8125rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                padding: '0.25rem',
                fontFamily: 'var(--font-sans)',
              }}
            >
              <CameraIcon />
              or use phone camera · या फ़ोन कैमरा इस्तेमाल करें
            </button>
          </>
        )}

        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          style={{ display: 'none' }}
          onChange={handleCameraChange}
        />

        {/* Preview + verify */}
        {preview && (
          <div
            className="animate-slide-up"
            style={{
              width: '100%',
              maxWidth: '42rem',
              background: '#FFFFFF',
              border: `1px solid ${BORDER}`,
              borderRadius: '1rem',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.875rem',
            }}
          >
            <div style={{ position: 'relative', borderRadius: '0.75rem', overflow: 'hidden' }}>
              <img
                src={preview}
                alt="Note preview"
                style={{
                  width: '100%',
                  maxHeight: '260px',
                  objectFit: 'cover',
                  display: 'block',
                  borderRadius: '0.75rem',
                }}
              />
              {loading && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(15,23,42,0.55)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '0.75rem',
                  }}
                >
                  <p style={{ fontSize: '0.875rem', color: '#fff', fontWeight: 600 }}>{t.currencyVerifying}</p>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
              <p style={{ fontSize: '0.75rem', color: MUTED, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {file?.name}
              </p>
              <button
                type="button"
                onClick={handleRetake}
                style={{
                  background: '#F8FAFC',
                  border: `1px solid ${BORDER}`,
                  borderRadius: '0.375rem',
                  padding: '0.35rem 0.7rem',
                  color: MUTED,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  flexShrink: 0,
                  fontFamily: 'var(--font-sans)',
                }}
              >
                {t.currencyRetake}
              </button>
            </div>

            {!result && (
              <button
                id="currency-verify-btn"
                type="button"
                onClick={handleVerify}
                disabled={loading}
                style={{
                  background: NAVY,
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  padding: '0.8rem 1rem',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                  fontFamily: 'var(--font-sans)',
                }}
              >
                {loading ? t.currencyVerifying : t.currencyVerifyBtn}
              </button>
            )}
          </div>
        )}

        {error && !loading && (
          <div
            style={{
              width: '100%',
              maxWidth: '42rem',
              background: '#FEF2F2',
              border: '1px solid #FECACA',
              borderRadius: '0.75rem',
              padding: '0.875rem 1rem',
              color: '#B91C1C',
              fontSize: '0.8125rem',
            }}
          >
            {error}
          </div>
        )}

        {result && !loading && <VerdictCard result={result} t={t} />}

        <StatsBar />
      </main>
    </div>
  );
}
