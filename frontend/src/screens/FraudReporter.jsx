import { useMemo, useState } from 'react';
import { useLang } from '../context/LangContext';

const NAVY = '#0F172A';
const RED = '#DC2626';
const BORDER = '#E2E8F0';
const BG = '#F8FAFC';
const MUTED = '#64748B';

function generateComplaintId() {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, '');
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `CS-${date}-${suffix}`;
}

function formatTimestamp(date) {
  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

function BilingualLabel({ primary, secondary }) {
  return (
    <label style={{ display: 'block', marginBottom: '0.375rem' }}>
      <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: NAVY }}>{primary}</span>
      <span style={{ display: 'block', fontSize: '0.6875rem', color: MUTED, marginTop: '1px' }}>{secondary}</span>
    </label>
  );
}

function SectionTitle({ primary, secondary }) {
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <h2 style={{ fontSize: '1rem', fontWeight: 700, color: NAVY, lineHeight: 1.3 }}>{primary}</h2>
      <p style={{ fontSize: '0.75rem', color: MUTED, marginTop: '2px' }}>{secondary}</p>
    </div>
  );
}

function ShieldLogo() {
  return (
    <div
      style={{
        width: '2.25rem',
        height: '2.25rem',
        background: NAVY,
        borderRadius: '0.5rem',
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

const inputStyle = {
  width: '100%',
  background: '#FFFFFF',
  border: `1px solid ${BORDER}`,
  borderRadius: '0.5rem',
  color: NAVY,
  padding: '0.625rem 0.75rem',
  fontSize: '0.875rem',
  outline: 'none',
  fontFamily: 'var(--font-sans)',
};

const cardStyle = {
  background: '#FFFFFF',
  border: `1px solid ${BORDER}`,
  borderRadius: '0.5rem',
  boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
  padding: '1.5rem',
};

export default function FraudReporter({ initialDescription = '', onNavigate }) {
  const { t, lang, toggleLang } = useLang();
  const [complaintId] = useState(generateComplaintId);
  const [generatedAt] = useState(() => new Date());
  const [copied, setCopied] = useState(false);

  const [form, setForm] = useState({
    fullName: '',
    mobile: '',
    city: '',
    state: '',
    type: initialDescription ? t.reportTypes[0] : t.reportTypes[0],
    date: new Date().toISOString().slice(0, 10),
    amount: '',
    scammerNumber: '',
    scammerBank: '',
    description: initialDescription,
  });

  const isPrefilled = !!initialDescription;
  const handleChange = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const firText = useMemo(() => {
    const lines = [
      t.reportFirTitle,
      t.reportFirSubtitle,
      '',
      `${t.reportFirComplaintId}: ${complaintId}`,
      `${t.reportFirGenerated}: ${formatTimestamp(generatedAt)}`,
      `${t.reportFirPortal}: ${t.reportNCRPUrl}`,
      '',
      `1. ${t.reportFirSection1}`,
      `   Name: ${form.fullName || '—'}`,
      `   Mobile: ${form.mobile || '—'}`,
      `   City: ${form.city || '—'}`,
      `   State: ${form.state || '—'}`,
      '',
      `2. ${t.reportFirSection2}`,
      `   Scam Type: ${form.type || '—'}`,
      `   Date: ${form.date || '—'}`,
      `   Amount Lost: ${form.amount ? `₹${form.amount}` : '—'}`,
      '',
      `3. ${t.reportFirSection3}`,
      `   Scammer Number: ${form.scammerNumber || '—'}`,
      `   Bank Account: ${form.scammerBank || '—'}`,
      '',
      `4. ${t.reportFirSection4}`,
      form.description || '—',
      '',
      `5. ${t.reportFirSection5}`,
      t.reportFirDeclaration,
      '',
      `${t.reportFirSignature}: _________________________`,
    ];
    return lines.join('\n');
  }, [form, t, complaintId, generatedAt]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(firText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const handleDownloadPdf = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html><head><title>${complaintId}</title>
      <style>
        body { font-family: Georgia, serif; padding: 40px; color: #0f172a; line-height: 1.6; font-size: 13px; }
        h1 { text-align: center; font-size: 16px; margin-bottom: 4px; }
        .sub { text-align: center; font-size: 11px; color: #64748b; margin-bottom: 24px; }
        .meta { background: #f8fafc; border: 1px solid #e2e8f0; padding: 12px; margin-bottom: 20px; font-size: 11px; }
        .section { margin-bottom: 16px; }
        .section-title { font-weight: 700; font-size: 12px; margin-bottom: 6px; }
        .sig { text-align: right; margin-top: 32px; font-size: 12px; }
      </style></head><body>
      <h1>${t.reportFirTitle}</h1>
      <p class="sub">${t.reportFirSubtitle}</p>
      <div class="meta">
        <div>${t.reportFirComplaintId}: ${complaintId}</div>
        <div>${t.reportFirGenerated}: ${formatTimestamp(generatedAt)}</div>
        <div>${t.reportFirPortal}: ${t.reportNCRPUrl}</div>
      </div>
      <div class="section"><div class="section-title">1. ${t.reportFirSection1}</div>
        Name: ${form.fullName || '—'}<br/>Mobile: ${form.mobile || '—'}<br/>City: ${form.city || '—'}<br/>State: ${form.state || '—'}
      </div>
      <div class="section"><div class="section-title">2. ${t.reportFirSection2}</div>
        Scam Type: ${form.type || '—'}<br/>Date: ${form.date || '—'}<br/>Amount Lost: ${form.amount ? `₹${form.amount}` : '—'}
      </div>
      <div class="section"><div class="section-title">3. ${t.reportFirSection3}</div>
        Scammer Number: ${form.scammerNumber || '—'}<br/>Bank Account: ${form.scammerBank || '—'}
      </div>
      <div class="section"><div class="section-title">4. ${t.reportFirSection4}</div>
        ${(form.description || '—').replace(/\n/g, '<br/>')}
      </div>
      <div class="section"><div class="section-title">5. ${t.reportFirSection5}</div>
        ${t.reportFirDeclaration}
      </div>
      <div class="sig">${t.reportFirSignature}: _________________________</div>
      </body></html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div style={{ background: BG, minHeight: '100%', fontFamily: 'var(--font-sans)' }}>
      {/* Page Header */}
      <header
        style={{
          background: '#FFFFFF',
          borderBottom: `1px solid ${BORDER}`,
          padding: '0.875rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
          <button
            type="button"
            onClick={() => onNavigate?.('landing')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <ShieldLogo />
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 700, color: NAVY, lineHeight: 1.2 }}>{t.appName}</p>
              <p style={{ fontSize: '0.625rem', color: MUTED }}>{t.appTagline}</p>
            </div>
          </button>
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
            {t.reportSystemStatus} • {t.reportSystemStatusHi}
          </div>

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
                onClick={() => { if (lang !== code) toggleLang(); }}
                style={{
                  padding: '0.375rem 0.625rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  background: lang === code ? '#F1F5F9' : '#FFFFFF',
                  color: lang === code ? NAVY : MUTED,
                }}
              >
                {code === 'en' ? 'EN' : 'हि'}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Page title row */}
      <div style={{ padding: '1.25rem 1.5rem 0' }}>
        <button
          type="button"
          onClick={() => onNavigate?.('landing')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.5rem 0.875rem',
            marginBottom: '1rem',
            background: '#FFFFFF',
            border: `1px solid ${BORDER}`,
            borderRadius: '0.375rem',
            fontSize: '0.8125rem',
            fontWeight: 500,
            color: NAVY,
            cursor: 'pointer',
            fontFamily: 'var(--font-sans)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          {t.reportBack} · {t.reportBackHi}
        </button>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: NAVY }}>{t.reportTitle}</h1>
        <p style={{ fontSize: '0.75rem', color: MUTED, marginTop: '2px' }}>{t.reportTitleHi}</p>
      </div>

      {/* Pre-fill notice */}
      {isPrefilled && (
        <div
          style={{
            margin: '1rem 1.5rem 0',
            background: '#FEF2F2',
            border: '1px solid #FECACA',
            borderRadius: '0.5rem',
            padding: '0.625rem 0.875rem',
            fontSize: '0.8125rem',
            color: '#B91C1C',
            fontWeight: 500,
          }}
        >
          {t.reportPrefillNotice}
        </div>
      )}

      {/* Two-column layout */}
      <div
        className="report-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '1.25rem',
          padding: '1.25rem 1.5rem 2rem',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {/* Left: Form */}
        <div style={cardStyle}>
          <SectionTitle primary={t.reportVictimSection} secondary={t.reportVictimSectionHi} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="report-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <BilingualLabel primary={t.reportFullName} secondary={t.reportFullNameHi} />
                <input
                  type="text"
                  value={form.fullName}
                  onChange={e => handleChange('fullName', e.target.value)}
                  style={inputStyle}
                  placeholder="Rajesh Kumar"
                />
              </div>
              <div>
                <BilingualLabel primary={t.reportMobile} secondary={t.reportMobileHi} />
                <input
                  type="tel"
                  value={form.mobile}
                  onChange={e => handleChange('mobile', e.target.value)}
                  style={inputStyle}
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <BilingualLabel primary={t.reportCity} secondary={t.reportCityHi} />
                <input
                  type="text"
                  value={form.city}
                  onChange={e => handleChange('city', e.target.value)}
                  style={inputStyle}
                  placeholder="Mumbai"
                />
              </div>
              <div>
                <BilingualLabel primary={t.reportState} secondary={t.reportStateHi} />
                <input
                  type="text"
                  value={form.state}
                  onChange={e => handleChange('state', e.target.value)}
                  style={inputStyle}
                  placeholder="Maharashtra"
                />
              </div>
              <div>
                <BilingualLabel primary={t.reportType} secondary={t.reportTypeHi} />
                <select
                  value={form.type}
                  onChange={e => handleChange('type', e.target.value)}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                >
                  {t.reportTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <BilingualLabel primary={t.reportDate} secondary={t.reportDateHi} />
                <input
                  type="date"
                  value={form.date}
                  onChange={e => handleChange('date', e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <BilingualLabel primary={t.reportAmount} secondary={t.reportAmountHi} />
                <input
                  type="number"
                  value={form.amount}
                  onChange={e => handleChange('amount', e.target.value)}
                  style={inputStyle}
                  placeholder="85000"
                  min="0"
                />
              </div>
              <div>
                <BilingualLabel primary={t.reportScammerNumber} secondary={t.reportScammerNumberHi} />
                <input
                  type="tel"
                  value={form.scammerNumber}
                  onChange={e => handleChange('scammerNumber', e.target.value)}
                  style={inputStyle}
                  placeholder="+91 98••••4421"
                />
              </div>
            </div>

            <div>
              <BilingualLabel primary={t.reportScammerBank} secondary={t.reportScammerBankHi} />
              <input
                type="text"
                value={form.scammerBank}
                onChange={e => handleChange('scammerBank', e.target.value)}
                style={inputStyle}
                placeholder="XXXX1234@paytm"
              />
            </div>

            <div>
              <BilingualLabel primary={t.reportDescription} secondary={t.reportDescriptionHi} />
              <textarea
                id="report-description"
                rows={6}
                value={form.description}
                onChange={e => handleChange('description', e.target.value)}
                placeholder={t.reportDescriptionPlaceholder}
                style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5 }}
              />
            </div>
          </div>

          <p style={{ fontSize: '0.6875rem', color: MUTED, marginTop: '1.25rem', lineHeight: 1.5 }}>
            {t.reportDisclaimer}
          </p>
        </div>

        {/* Right: FIR Preview */}
        <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <SectionTitle primary={t.reportPreviewSection} secondary={t.reportPreviewSectionHi} />
            <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
              <button
                type="button"
                onClick={handleCopy}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  padding: '0.5rem 0.875rem',
                  background: '#FFFFFF',
                  border: `1px solid ${BORDER}`,
                  borderRadius: '0.375rem',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  color: NAVY,
                  cursor: 'pointer',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
                {copied ? t.reportCopied : t.reportCopyText}
              </button>
              <button
                type="button"
                onClick={handleDownloadPdf}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  padding: '0.5rem 0.875rem',
                  background: NAVY,
                  border: 'none',
                  borderRadius: '0.375rem',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  color: '#FFFFFF',
                  cursor: 'pointer',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                {t.reportDownloadPdf}
              </button>
            </div>
          </div>

          {/* Document preview */}
          <div
            style={{
              flex: 1,
              background: '#FAFAFA',
              border: `1px solid ${BORDER}`,
              borderRadius: '0.375rem',
              padding: '1.25rem',
              fontSize: '0.75rem',
              lineHeight: 1.6,
              color: '#334155',
              overflowY: 'auto',
              maxHeight: '520px',
            }}
          >
            <h3 style={{ textAlign: 'center', fontSize: '0.8125rem', fontWeight: 700, color: NAVY, marginBottom: '4px' }}>
              {t.reportFirTitle}
            </h3>
            <p style={{ textAlign: 'center', fontSize: '0.625rem', color: MUTED, marginBottom: '1rem' }}>
              {t.reportFirSubtitle}
            </p>

            <div
              style={{
                background: '#FFFFFF',
                border: `1px solid ${BORDER}`,
                borderRadius: '0.25rem',
                padding: '0.625rem 0.75rem',
                marginBottom: '1rem',
                fontSize: '0.6875rem',
                color: MUTED,
              }}
            >
              <div>{t.reportFirComplaintId}: <strong style={{ color: NAVY }}>{complaintId}</strong></div>
              <div>{t.reportFirGenerated}: {formatTimestamp(generatedAt)}</div>
              <div>{t.reportFirPortal}: {t.reportNCRPUrl}</div>
            </div>

            <div style={{ marginBottom: '0.875rem' }}>
              <p style={{ fontWeight: 700, fontSize: '0.6875rem', color: NAVY, marginBottom: '0.375rem' }}>1. {t.reportFirSection1}</p>
              <p>Name: {form.fullName || '—'}</p>
              <p>Mobile: {form.mobile || '—'}</p>
              <p>City: {form.city || '—'}</p>
              <p>State: {form.state || '—'}</p>
            </div>

            <div style={{ marginBottom: '0.875rem' }}>
              <p style={{ fontWeight: 700, fontSize: '0.6875rem', color: NAVY, marginBottom: '0.375rem' }}>2. {t.reportFirSection2}</p>
              <p>Scam Type: {form.type || '—'}</p>
              <p>Date: {form.date || '—'}</p>
              <p>Amount Lost: {form.amount ? `₹${Number(form.amount).toLocaleString('en-IN')}` : '—'}</p>
            </div>

            <div style={{ marginBottom: '0.875rem' }}>
              <p style={{ fontWeight: 700, fontSize: '0.6875rem', color: NAVY, marginBottom: '0.375rem' }}>3. {t.reportFirSection3}</p>
              <p>Scammer Number: {form.scammerNumber || '—'}</p>
              <p>Bank Account: {form.scammerBank || '—'}</p>
            </div>

            <div style={{ marginBottom: '0.875rem' }}>
              <p style={{ fontWeight: 700, fontSize: '0.6875rem', color: NAVY, marginBottom: '0.375rem' }}>4. {t.reportFirSection4}</p>
              <p style={{ whiteSpace: 'pre-wrap' }}>{form.description || '—'}</p>
            </div>

            <div style={{ marginBottom: '0.875rem' }}>
              <p style={{ fontWeight: 700, fontSize: '0.6875rem', color: NAVY, marginBottom: '0.375rem' }}>5. {t.reportFirSection5}</p>
              <p>{t.reportFirDeclaration}</p>
            </div>

            <p style={{ textAlign: 'right', fontSize: '0.6875rem', color: MUTED, marginTop: '1rem' }}>
              {t.reportFirSignature}: _________________________
            </p>
          </div>

          {/* NCRB Submit */}
          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            id="report-submit-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '1rem',
              padding: '0.875rem 1rem',
              background: RED,
              color: '#FFFFFF',
              borderRadius: '0.5rem',
              fontSize: '0.9375rem',
              fontWeight: 600,
              textDecoration: 'none',
              width: '100%',
            }}
          >
            {t.reportSubmitNCRB}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          </a>

          <p style={{ fontSize: '0.6875rem', color: MUTED, textAlign: 'center', marginTop: '0.625rem' }}>
            {t.reportNCRBFooter}
          </p>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .report-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .report-form-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
