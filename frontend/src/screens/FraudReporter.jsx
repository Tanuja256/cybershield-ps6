import { useState } from 'react';
import { useLang } from '../context/LangContext';

function generateRefId() {
  return 'CS-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).slice(2, 6).toUpperCase();
}

export default function FraudReporter({ initialDescription = '' }) {
  const { t } = useLang();
  const [form, setForm] = useState({
    type: initialDescription ? t.reportTypes[0] : '',   // auto-pick first type when pre-filled
    description: initialDescription,
    contact: '',
    file: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState('');
  const isPrefilled = !!initialDescription;

  const handleChange = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.type || !form.description.trim()) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1800));
    setRefId(generateRefId());
    setSubmitted(true);
    setSubmitting(false);
  };

  const handleReset = () => {
    setForm({ type: '', description: '', contact: '', file: null });
    setSubmitted(false);
    setRefId('');
  };

  if (submitted) {
    return (
      <div className="p-4 flex flex-col gap-5">
        <div
          className="glass-card p-6 flex flex-col items-center gap-4 text-center animate-slide-up"
          style={{
            background: 'linear-gradient(135deg, rgba(34,197,94,0.1), rgba(13,148,136,0.08))',
            border: '1px solid rgba(34,197,94,0.25)',
          }}
        >
          <div
            style={{
              width: '4rem',
              height: '4rem',
              background: 'linear-gradient(135deg, #22c55e, #14b8a6)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.75rem',
            }}
          >
            ✅
          </div>
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#16a34a', marginBottom: '0.5rem' }}>
              {t.reportSuccess}
            </h2>
            <div
              style={{
                background: 'rgba(241,245,249,0.8)',
                borderRadius: '0.625rem',
                padding: '0.625rem 1rem',
                fontFamily: 'monospace',
                fontSize: '1rem',
                fontWeight: 700,
                color: '#2563eb',
                letterSpacing: '0.05em',
                margin: '0 auto',
                display: 'inline-block',
              }}
            >
              {refId}
            </div>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Save this Reference ID for follow-up with authorities.
          </p>

          {/* Quick links */}
          <div className="w-full flex flex-col gap-2">
            <a
              href="tel:1930"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.75rem',
                background: 'rgba(59,130,246,0.1)',
                border: '1px solid rgba(59,130,246,0.25)',
                borderRadius: '0.75rem',
                color: '#93c5fd',
                fontWeight: 700,
                fontSize: '0.875rem',
                textDecoration: 'none',
              }}
            >
              📞 {t.reportHelpline}: {t.reportHelplineNumber}
            </a>
            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.75rem',
                background: 'rgba(13,148,136,0.1)',
                border: '1px solid rgba(20,184,166,0.25)',
                borderRadius: '0.75rem',
                color: '#2dd4bf',
                fontWeight: 700,
                fontSize: '0.875rem',
                textDecoration: 'none',
              }}
            >
              🌐 {t.reportNCRP}: {t.reportNCRPUrl}
            </a>
          </div>

          <button className="btn-primary" onClick={handleReset}>
            Submit Another Report
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-5">
      {/* Header */}
      <div
        className="glass-card p-5 animate-slide-up"
        style={{
          background: 'linear-gradient(135deg, rgba(37,99,235,0.12), rgba(13,148,136,0.08))',
          border: '1px solid rgba(59,130,246,0.2)',
        }}
      >
        <div className="flex items-center gap-3">
          <div style={{ fontSize: '1.75rem' }}>🚨</div>
          <div>
            <h1 className="gradient-text" style={{ fontSize: '1.25rem', fontWeight: 800 }}>
              {t.reportTitle}
            </h1>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{t.reportSubtitle}</p>
          </div>
        </div>
      </div>

      {/* Pre-fill notice when coming from Scam Checker */}
      {isPrefilled && (
        <div
          className="animate-slide-up"
          style={{
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '0.75rem',
            padding: '0.75rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.78rem',
            color: '#fca5a5',
            fontWeight: 600,
          }}
        >
          <span>🚨</span>
          <span>Scam message pre-filled from checker — review and submit</span>
        </div>
      )}

      {/* Anonymous notice */}
      <div
        style={{
          background: 'rgba(59,130,246,0.08)',
          border: '1px solid rgba(59,130,246,0.2)',
          borderRadius: '0.75rem',
          padding: '0.75rem 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.78rem',
          color: '#93c5fd',
        }}
      >
        <span>🔒</span>
        <span>{t.reportAnonymous}</span>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Fraud type */}
        <div className="glass-card p-4 flex flex-col gap-2">
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#93c5fd' }}>
            {t.reportType} *
          </label>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.5rem',
            }}
          >
            {t.reportTypes.map((type, i) => (
              <button
                key={i}
                type="button"
                id={`fraud-type-${i}`}
                onClick={() => handleChange('type', type)}
                style={{
                  padding: '0.625rem 0.5rem',
                  borderRadius: '0.625rem',
                  background: form.type === type
                    ? 'linear-gradient(135deg, rgba(37,99,235,0.25), rgba(13,148,136,0.2))'
                    : 'rgba(30,41,59,0.7)',
                  border: `1px solid ${form.type === type ? 'rgba(59,130,246,0.5)' : 'rgba(51,65,85,0.5)'}`,
                  color: form.type === type ? '#93c5fd' : '#94a3b8',
                  fontWeight: form.type === type ? 700 : 500,
                  fontSize: '0.72rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                  lineHeight: 1.35,
                  fontFamily: 'var(--font-sans)',
                  transition: 'all 0.15s ease',
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="glass-card p-4 flex flex-col gap-2">
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#93c5fd' }}>
            {t.reportDescription} *
          </label>
          <textarea
            id="report-description"
            className="input-base"
            rows={5}
            value={form.description}
            onChange={e => handleChange('description', e.target.value)}
            placeholder={t.reportDescriptionPlaceholder}
            style={{ resize: 'none' }}
            required
          />
        </div>

        {/* Evidence upload */}
        <div className="glass-card p-4 flex flex-col gap-2">
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#93c5fd' }}>
            {t.reportEvidence}
          </label>
          <label
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '1.25rem',
              border: '2px dashed rgba(51,65,85,0.7)',
              borderRadius: '0.75rem',
              background: 'rgba(30,41,59,0.4)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <span style={{ fontSize: '1.5rem' }}>📎</span>
            <span style={{ fontSize: '0.78rem', color: '#64748b', textAlign: 'center' }}>
              {form.file ? form.file.name : t.reportEvidenceHint}
            </span>
            <input
              id="report-evidence"
              type="file"
              accept="image/*,video/*,.pdf"
              style={{ display: 'none' }}
              onChange={e => handleChange('file', e.target.files?.[0] || null)}
            />
          </label>
        </div>

        {/* Contact */}
        <div className="glass-card p-4 flex flex-col gap-2">
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#93c5fd' }}>
            {t.reportContact}
          </label>
          <input
            id="report-contact"
            type="text"
            className="input-base"
            value={form.contact}
            onChange={e => handleChange('contact', e.target.value)}
            placeholder={t.reportContactPlaceholder}
          />
        </div>

        {/* Submit */}
        <button
          id="report-submit-btn"
          type="submit"
          className="btn-primary animate-pulse-glow"
          disabled={submitting || !form.type || !form.description.trim()}
        >
          {submitting ? (
            <>
              <span className="animate-spin inline-block">⟳</span>
              {t.reportSubmitting}
            </>
          ) : (
            <>🚀 {t.reportSubmit}</>
          )}
        </button>
      </form>

      {/* Helpline quick-links */}
      <div className="glass-card p-4 flex flex-col gap-2">
        <a
          href="tel:1930"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem',
            background: 'rgba(59,130,246,0.08)',
            border: '1px solid rgba(59,130,246,0.2)',
            borderRadius: '0.75rem',
            textDecoration: 'none',
          }}
        >
          <span style={{ fontSize: '1.25rem' }}>📞</span>
          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#93c5fd' }}>{t.reportHelpline}</p>
            <p style={{ fontSize: '1rem', fontWeight: 900, color: '#f1f5f9' }}>{t.reportHelplineNumber}</p>
          </div>
          <span style={{ marginLeft: 'auto', color: '#60a5fa' }}>→</span>
        </a>
        <a
          href="https://cybercrime.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem',
            background: 'rgba(13,148,136,0.08)',
            border: '1px solid rgba(20,184,166,0.2)',
            borderRadius: '0.75rem',
            textDecoration: 'none',
          }}
        >
          <span style={{ fontSize: '1.25rem' }}>🌐</span>
          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2dd4bf' }}>{t.reportNCRP}</p>
            <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#f1f5f9' }}>{t.reportNCRPUrl}</p>
          </div>
          <span style={{ marginLeft: 'auto', color: '#14b8a6' }}>→</span>
        </a>
      </div>
    </div>
  );
}
