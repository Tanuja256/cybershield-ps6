import { useState, useRef, useCallback } from 'react';
import { useLang } from '../context/LangContext';

const API_BASE = 'http://localhost:8000';

// The five feature keys the API returns
const FEATURE_KEYS = [
  'watermark',
  'security_thread',
  'microprint',
  'serial_pattern',
  'color_shift',
];

// Icon SVGs as inline components for crisp rendering
function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: '1.125rem', height: '1.125rem', color: '#4ade80', flexShrink: 0 }}>
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: '1.125rem', height: '1.125rem', color: '#f87171', flexShrink: 0 }}>
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

function UploadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
      style={{ width: '2.5rem', height: '2.5rem', color: '#475569' }}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
      style={{ width: '1rem', height: '1rem', color: '#64748b' }}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
    </svg>
  );
}

// ── Loading skeleton ─────────────────────────────────────────────────────────
function VerifyingSkeleton({ t }) {
  return (
    <div className="glass-card p-5 flex flex-col gap-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <div
          className="animate-pulse-glow"
          style={{
            width: '2.75rem', height: '2.75rem',
            background: 'linear-gradient(135deg, rgba(37,99,235,0.25), rgba(13,148,136,0.2))',
            borderRadius: '0.75rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.25rem', flexShrink: 0,
          }}
        >
          🔬
        </div>
        <div style={{ flex: 1 }}>
          <div className="shimmer h-3 rounded w-3/5 mb-2" />
          <div className="shimmer h-2.5 rounded w-2/5" />
        </div>
      </div>
      {/* Fake progress bar */}
      <div style={{ height: '6px', background: '#1e293b', borderRadius: '9999px', overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: '60%',
            background: 'linear-gradient(90deg, #2563eb, #0d9488)',
            borderRadius: '9999px',
            animation: 'shimmer-bar 1.4s ease-in-out infinite',
          }}
        />
      </div>
      {/* Feature rows skeleton */}
      {FEATURE_KEYS.map(k => (
        <div key={k} className="flex items-center gap-3">
          <div className="shimmer rounded-full" style={{ width: '1.125rem', height: '1.125rem', flexShrink: 0 }} />
          <div className="shimmer h-3 rounded flex-1" />
          <div className="shimmer h-5 rounded w-16" />
        </div>
      ))}
      <style>{`
        @keyframes shimmer-bar {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
      `}</style>
    </div>
  );
}

// ── Verdict card ─────────────────────────────────────────────────────────────
function VerdictCard({ result, t }) {
  const verdict    = (result.verdict ?? '').toLowerCase();
  const confidence = result.confidence_score ?? result.confidence ?? 0;
  const features   = result.features ?? {};
  const pct        = Math.round(
    typeof confidence === 'number' && confidence <= 1
      ? confidence * 100
      : confidence
  );

  const isGenuine = verdict === 'genuine';
  const isFake    = verdict === 'fake' || verdict === 'counterfeit';

  const palette = isGenuine ? {
    bg:     'linear-gradient(135deg, rgba(20,83,45,0.3), rgba(6,78,59,0.2))',
    border: 'rgba(34,197,94,0.4)',
    label:  t.currencyVerdictGenuine,
    icon:   '✅',
    bar:    '#22c55e',
    badge:  { bg: 'rgba(34,197,94,0.15)', border: 'rgba(34,197,94,0.4)', text: '#4ade80' },
  } : isFake ? {
    bg:     'linear-gradient(135deg, rgba(127,29,29,0.35), rgba(154,52,18,0.2))',
    border: 'rgba(239,68,68,0.45)',
    label:  t.currencyVerdictFake,
    icon:   '🚨',
    bar:    '#ef4444',
    badge:  { bg: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.4)', text: '#fca5a5' },
  } : {
    bg:     'linear-gradient(135deg, rgba(120,53,15,0.3), rgba(146,64,14,0.2))',
    border: 'rgba(245,158,11,0.4)',
    label:  t.currencyVerdictSuspect,
    icon:   '⚠️',
    bar:    '#f59e0b',
    badge:  { bg: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.4)', text: '#fbbf24' },
  };

  return (
    <div
      className="flex flex-col gap-4 animate-slide-up"
      style={{
        background: palette.bg,
        border: `2px solid ${palette.border}`,
        borderRadius: '1rem',
        padding: '1.125rem',
      }}
    >
      {/* Verdict header */}
      <div className="flex items-center gap-3">
        <span style={{ fontSize: '1.75rem' }}>{palette.icon}</span>
        <div>
          <span
            style={{
              display: 'inline-block',
              padding: '0.3rem 0.875rem',
              borderRadius: '9999px',
              background: palette.badge.bg,
              border: `1px solid ${palette.badge.border}`,
              color: palette.badge.text,
              fontWeight: 800,
              fontSize: '0.85rem',
              letterSpacing: '0.06em',
            }}
          >
            {palette.label}
          </span>
          {result.denomination && (
            <p style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.3rem' }}>
              ₹{result.denomination} note analysed
            </p>
          )}
        </div>
      </div>

      {/* Confidence bar */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
          <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{t.currencyConfidence}</span>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: palette.badge.text }}>{pct}%</span>
        </div>
        <div style={{ height: '7px', background: 'rgba(226,232,240,1)', borderRadius: '9999px', overflow: 'hidden' }}>
          <div
            style={{
              width: `${pct}%`,
              height: '100%',
              background: palette.bar,
              borderRadius: '9999px',
              transition: 'width 1s cubic-bezier(0.4,0,0.2,1)',
              boxShadow: `0 0 8px ${palette.bar}60`,
            }}
          />
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'rgba(51,65,85,0.5)' }} />

      {/* Feature breakdown */}
      <div>
        <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', marginBottom: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {t.currencyFeatureBreakdown}
        </p>
        <ul className="flex flex-col gap-2">
          {FEATURE_KEYS.map(key => {
            const val = features[key];
            // val can be: true/false boolean, or {passed: bool, ...}, or undefined
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
                  borderRadius: '0.625rem',
                  background:
                    passed === true  ? 'rgba(34,197,94,0.07)' :
                    passed === false ? 'rgba(239,68,68,0.07)' :
                    'rgba(241,245,249,0.8)',
                  border:
                    passed === true  ? '1px solid rgba(34,197,94,0.25)' :
                    passed === false ? '1px solid rgba(239,68,68,0.25)' :
                    '1px solid rgba(226,232,240,1)',
                }}
              >
                {passed === true  ? <CheckIcon /> :
                 passed === false ? <CrossIcon /> :
                 <QuestionIcon />}

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: passed === true ? '#16a34a' : passed === false ? '#dc2626' : '#334155',
                  }}>
                    {label}
                  </p>
                  {detail && (
                    <p style={{ fontSize: '0.68rem', color: '#64748b', marginTop: '0.1rem', lineHeight: 1.35 }}>
                      {detail}
                    </p>
                  )}
                </div>

                {/* Pass / Fail pill */}
                <span
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.5rem',
                    borderRadius: '9999px',
                    flexShrink: 0,
                    background:
                      passed === true  ? 'rgba(34,197,94,0.15)' :
                      passed === false ? 'rgba(239,68,68,0.15)' :
                      'rgba(100,116,139,0.15)',
                    color:
                      passed === true  ? '#4ade80' :
                      passed === false ? '#f87171' :
                      '#94a3b8',
                    letterSpacing: '0.04em',
                  }}
                >
                  {passed === true ? 'PASS' : passed === false ? 'FAIL' : 'N/A'}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Report button for fake notes */}
      {isFake && (
        <button
          style={{
            background: 'rgba(239,68,68,0.12)',
            border: '1px solid rgba(239,68,68,0.35)',
            borderRadius: '0.75rem',
            padding: '0.75rem 1rem',
            color: '#fca5a5',
            fontWeight: 700,
            fontSize: '0.82rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            fontFamily: 'var(--font-sans)',
          }}
        >
          🚨 {t.currencyReportFake}
        </button>
      )}
    </div>
  );
}

// ── Stats bar ────────────────────────────────────────────────────────────────
function StatsBar({ t }) {
  const stats = [
    { value: '12,80,412', label: t.statNotesVerified },
    { value: '1,204',     label: t.statFakeCaught    },
    { value: '99.2%',     label: t.statAccuracy      },
  ];
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '0.625rem',
      }}
    >
      {stats.map(({ value, label }) => (
        <div
          key={label}
          className="glass-card"
          style={{ padding: '0.875rem 0.5rem', textAlign: 'center' }}
        >
          <p style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>
            {value}
          </p>
          <p style={{ fontSize: '0.6rem', color: '#64748b', marginTop: '0.25rem', lineHeight: 1.2 }}>
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}

// ── Main screen ──────────────────────────────────────────────────────────────
export default function CurrencyVerifier() {
  const { t } = useLang();

  const [file, setFile]         = useState(null);       // File object
  const [preview, setPreview]   = useState(null);       // object URL
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [result, setResult]     = useState(null);
  const [error, setError]       = useState(null);

  const fileInputRef    = useRef(null);
  const cameraInputRef  = useRef(null);

  // ── File helpers ────────────────────────────────────────────────────────
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

  const handleFileChange  = (e) => acceptFile(e.target.files?.[0]);
  const handleCameraChange = (e) => acceptFile(e.target.files?.[0]);

  // Drag-and-drop
  const onDragOver  = (e) => { e.preventDefault(); setDragging(true);  };
  const onDragLeave = (e) => { e.preventDefault(); setDragging(false); };
  const onDrop      = (e) => {
    e.preventDefault();
    setDragging(false);
    acceptFile(e.dataTransfer.files?.[0]);
  };

  // ── API call ────────────────────────────────────────────────────────────
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
        // Do NOT set Content-Type — browser sets it with the correct boundary
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

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="p-4 flex flex-col gap-4">

      {/* Header */}
      <div
        className="glass-card p-5 animate-slide-up"
        style={{
          background: 'linear-gradient(135deg, rgba(37,99,235,0.12), rgba(13,148,136,0.08))',
          border: '1px solid rgba(59,130,246,0.2)',
        }}
      >
        <div className="flex items-center gap-3">
          <div style={{ fontSize: '1.75rem' }}>💵</div>
          <div>
            <h1 className="gradient-text" style={{ fontSize: '1.25rem', fontWeight: 800 }}>
              {t.currencyTitle}
            </h1>
            <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{t.currencySubtitle}</p>
          </div>
        </div>
      </div>

      {/* Upload zone — shown when no file selected yet */}
      {!preview && (
        <div
          id="currency-drop-zone"
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: `2px dashed ${dragging ? 'rgba(59,130,246,0.7)' : 'rgba(51,65,85,0.6)'}`,
            borderRadius: '1rem',
            padding: '2.5rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.875rem',
            cursor: 'pointer',
            background: dragging
              ? 'rgba(37,99,235,0.06)'
              : 'rgba(248,250,252,0.8)',
            transition: 'all 0.2s ease',
          }}
        >
          {/* Upload icon in a circle */}
          <div
            style={{
              width: '4rem', height: '4rem',
              background: 'rgba(241,245,249,0.8)',
              border: '1px solid rgba(226,232,240,1)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <UploadIcon />
          </div>

          <div style={{ textAlign: 'center' }}>
            <p style={{ fontWeight: 700, fontSize: '0.95rem', color: '#334155', marginBottom: '0.3rem' }}>
              {t.currencyDropTitle}
            </p>
            <p style={{ fontSize: '0.7rem', color: '#64748b' }}>
              {t.currencyDropHint}
            </p>
          </div>

          {/* Choose file button */}
          <button
            id="currency-choose-file"
            onClick={e => { e.stopPropagation(); fileInputRef.current?.click(); }}
            style={{
              background: 'linear-gradient(135deg, #1d4ed8, #0f766e)',
              color: 'white',
              border: 'none',
              borderRadius: '0.625rem',
              padding: '0.625rem 1.25rem',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontFamily: 'var(--font-sans)',
            }}
          >
            ↑ {t.currencyChooseFile}
          </button>

          {/* Hidden file inputs */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>
      )}

      {/* Camera capture link */}
      {!preview && (
        <button
          id="currency-camera-btn"
          onClick={() => cameraInputRef.current?.click()}
          style={{
            background: 'none',
            border: 'none',
            color: '#64748b',
            fontSize: '0.78rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            padding: '0.25rem',
            fontFamily: 'var(--font-sans)',
          }}
        >
          <CameraIcon /> {t.currencyOrCamera}
        </button>
      )}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: 'none' }}
        onChange={handleCameraChange}
      />

      {/* Image preview */}
      {preview && (
        <div className="glass-card p-3 flex flex-col gap-3 animate-slide-up">
          <div style={{ position: 'relative', borderRadius: '0.75rem', overflow: 'hidden' }}>
            <img
              src={preview}
              alt="Note preview"
              style={{
                width: '100%',
                maxHeight: '220px',
                objectFit: 'cover',
                display: 'block',
                borderRadius: '0.75rem',
              }}
            />
            {/* Overlay shimmer while loading */}
            {loading && (
              <div
                style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(15,23,42,0.6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '0.75rem',
                  backdropFilter: 'blur(4px)',
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', animation: 'pulse 1.2s ease-in-out infinite' }}>🔬</div>
                  <p style={{ fontSize: '0.75rem', color: '#93c5fd', fontWeight: 600, marginTop: '0.5rem' }}>
                    {t.currencyVerifying}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* File name + Retake */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
            <p style={{ fontSize: '0.72rem', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              📄 {file?.name}
            </p>
            <button
              onClick={handleRetake}
              style={{
                background: 'rgba(241,245,249,0.8)',
                border: '1px solid rgba(226,232,240,1)',
                borderRadius: '0.5rem',
                padding: '0.3rem 0.65rem',
                color: '#94a3b8',
                fontSize: '0.7rem',
                fontWeight: 600,
                cursor: 'pointer',
                flexShrink: 0,
                fontFamily: 'var(--font-sans)',
              }}
            >
              ↺ {t.currencyRetake}
            </button>
          </div>

          {/* Verify button */}
          {!result && (
            <button
              id="currency-verify-btn"
              className="btn-primary"
              onClick={handleVerify}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span style={{ display: 'inline-block', animation: 'spin 0.8s linear infinite' }}>⟳</span>
                  {t.currencyVerifying}
                </>
              ) : (
                <>🔍 {t.currencyVerifyBtn}</>
              )}
            </button>
          )}
        </div>
      )}

      {/* Verifying skeleton */}
      {loading && <VerifyingSkeleton t={t} />}

      {/* Error */}
      {error && !loading && (
        <div
          className="glass-card p-4 animate-fade-in"
          style={{
            background: 'rgba(127,29,29,0.2)',
            border: '1px solid rgba(239,68,68,0.3)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
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

      {/* Verdict card */}
      {result && !loading && (
        <VerdictCard result={result} t={t} />
      )}

      {/* Stats bar — always visible */}
      <StatsBar t={t} />

      <style>{`
        @keyframes spin  { from { transform: rotate(0deg); }   to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.6; transform:scale(0.95); } }
      `}</style>
    </div>
  );
}
