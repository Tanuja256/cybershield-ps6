import React from 'react';

export default function LandingPage({ onNavigate }) {
  return (
    <div style={{
      minHeight: '100dvh',
      backgroundColor: '#ffffff',
      color: '#0f172a',
      fontFamily: '"Inter", "Noto Sans Devanagari", sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem 1rem',
      width: '100%',
      maxWidth: '100vw',
      boxSizing: 'border-box',
    }}>
      {/* Header / Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
        <div style={{
          width: '2.5rem',
          height: '2.5rem',
          backgroundColor: '#0f172a',
          borderRadius: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ width: '1.25rem', height: '1.25rem' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontWeight: 700, fontSize: '1rem', lineHeight: 1.2 }}>CyberShield India</span>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>साइबरशील्ड भारत</span>
        </div>
      </div>

      {/* Main Title */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 0.5rem 0', color: '#0f172a' }}>
          भारत का साइबर सुरक्षा कवच
        </h1>
        <p style={{ fontSize: '1rem', color: '#64748b', margin: 0 }}>
          India's AI Shield Against Fraud
        </p>
      </div>

      {/* Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '600px' }}>
        
        {/* Scam Checker */}
        <button 
          onClick={() => onNavigate('scam')}
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '0.75rem',
            padding: '1.25rem',
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'all 0.2s ease',
            width: '100%',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.borderColor = '#cbd5e1';
            e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = '#e2e8f0';
            e.currentTarget.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
          }}
        >
          <div style={{
            width: '3.5rem',
            height: '3.5rem',
            backgroundColor: '#fee2e2',
            borderRadius: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginRight: '1.25rem'
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" style={{ width: '1.5rem', height: '1.5rem' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span style={{ fontWeight: 700, fontSize: '1.125rem', color: '#0f172a' }}>स्कैम जांचें</span>
            </div>
            <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#334155', marginBottom: '0.25rem' }}>Scam Checker</div>
            <div style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.4 }}>
              Paste a suspicious call, SMS or WhatsApp message — get an instant verdict.
            </div>
          </div>
          <div style={{ paddingLeft: '1rem' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" style={{ width: '1.25rem', height: '1.25rem' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>

        {/* Currency Verifier */}
        <button 
          onClick={() => onNavigate('currency')}
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '0.75rem',
            padding: '1.25rem',
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'all 0.2s ease',
            width: '100%',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.borderColor = '#cbd5e1';
            e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = '#e2e8f0';
            e.currentTarget.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
          }}
        >
          <div style={{
            width: '3.5rem',
            height: '3.5rem',
            backgroundColor: '#dcfce7',
            borderRadius: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginRight: '1.25rem'
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" style={{ width: '1.5rem', height: '1.5rem' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span style={{ fontWeight: 700, fontSize: '1.125rem', color: '#0f172a' }}>नोट सत्यापन</span>
            </div>
            <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#334155', marginBottom: '0.25rem' }}>Currency Verifier</div>
            <div style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.4 }}>
              Photograph any note to check if it is genuine or counterfeit.
            </div>
          </div>
          <div style={{ paddingLeft: '1rem' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" style={{ width: '1.25rem', height: '1.25rem' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>

        {/* Report Fraud */}
        <button 
          onClick={() => onNavigate('report')}
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '0.75rem',
            padding: '1.25rem',
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'all 0.2s ease',
            width: '100%',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.borderColor = '#cbd5e1';
            e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = '#e2e8f0';
            e.currentTarget.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
          }}
        >
          <div style={{
            width: '3.5rem',
            height: '3.5rem',
            backgroundColor: '#f1f5f9',
            borderRadius: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginRight: '1.25rem'
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" style={{ width: '1.5rem', height: '1.5rem' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span style={{ fontWeight: 700, fontSize: '1.125rem', color: '#0f172a' }}>धोखाधड़ी रिपोर्ट</span>
            </div>
            <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#334155', marginBottom: '0.25rem' }}>Report Fraud</div>
            <div style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.4 }}>
              Generate an FIR-ready complaint for the National Cybercrime Portal.
            </div>
          </div>
          <div style={{ paddingLeft: '1rem' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" style={{ width: '1.25rem', height: '1.25rem' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>

      </div>

      {/* Footer link */}
      <div style={{ marginTop: 'auto', paddingTop: '3rem', paddingBottom: '1rem' }}>
        <button 
          onClick={() => { /* Law Enforcement Login */ }}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: '#64748b', 
            fontSize: '0.875rem', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}
          onMouseOver={(e) => e.currentTarget.style.color = '#334155'}
          onMouseOut={(e) => e.currentTarget.style.color = '#64748b'}
        >
          Law Enforcement Login <span style={{ fontSize: '1rem' }}>→</span>
        </button>
      </div>
    </div>
  );
}
