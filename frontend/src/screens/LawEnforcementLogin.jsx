import React from 'react';

export default function LawEnforcementLogin({ onBack, onLogin }) {
  return (
    <div style={{
      minHeight: '100dvh',
      backgroundColor: '#ffffff',
      color: '#0f172a',
      fontFamily: '"Inter", "Noto Sans Devanagari", sans-serif',
      display: 'flex',
      flexDirection: 'column',
      width: '100vw',
      overflowX: 'hidden',
    }}>
      {/* Top Header for Back Button */}
      <div style={{ padding: '1.5rem', width: '100%', boxSizing: 'border-box' }}>
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            color: '#475569',
            fontSize: '0.875rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: 500
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '1.25rem', height: '1.25rem' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back · वापस
        </button>
      </div>

      {/* Main Content Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}>
        {/* Card */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '0.75rem',
          padding: '2rem',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{
              width: '3rem',
              height: '3rem',
              backgroundColor: '#0f172a',
              borderRadius: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ width: '1.5rem', height: '1.5rem' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <div>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: '0 0 0.25rem 0', color: '#0f172a' }}>
                Law Enforcement Login
              </h2>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                कानून प्रवर्तन लॉगिन · Restricted access
              </div>
            </div>
          </div>

          {/* Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Officer ID */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>
                Officer ID · अधिकारी आईडी
              </label>
              <input 
                type="text" 
                placeholder="e.g. IPS-DL-2019-0847"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.875rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                  color: '#0f172a'
                }}
                onFocus={(e) => e.target.style.borderColor = '#94a3b8'}
                onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
              />
            </div>

            {/* Department */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>
                Department · विभाग
              </label>
              <div style={{ position: 'relative' }}>
                <select 
                  defaultValue=""
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.875rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                    appearance: 'none',
                    backgroundColor: '#ffffff',
                    color: '#64748b',
                    cursor: 'pointer'
                  }}
                  onChange={(e) => e.target.style.color = '#0f172a'}
                >
                  <option value="" disabled>Select department</option>
                  <option value="police">Police Department</option>
                  <option value="cyber">Cyber Crime Cell</option>
                  <option value="cbi">CBI</option>
                </select>
                <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" style={{ width: '1rem', height: '1rem' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Login Button */}
            <button 
              onClick={onLogin}
              style={{
              width: '100%',
              padding: '0.875rem',
              backgroundColor: '#0f172a',
              color: '#ffffff',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '0.5rem'
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '1rem', height: '1rem' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l3 3m0 0l-3 3m3-3H8.25" />
              </svg>
              Login · लॉगिन
            </button>
          </div>

          {/* Footer Text */}
          <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.65rem', color: '#94a3b8' }}>
            Unauthorised access is a punishable offence under the IT Act, 2000.
          </div>
        </div>
      </div>
    </div>
  );
}
