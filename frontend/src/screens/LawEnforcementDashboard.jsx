import React from 'react';

export default function LawEnforcementDashboard({ onNavigate }) {
  return (
    <div style={{ display: 'flex', height: '100dvh', width: '100vw', backgroundColor: '#f8fafc', fontFamily: '"Inter", "Noto Sans Devanagari", sans-serif', overflow: 'hidden' }}>
      {/* Sidebar */}
      <div style={{ width: '260px', backgroundColor: '#0f172a', color: '#ffffff', display: 'flex', flexDirection: 'column' }}>
        {/* Logo area */}
        <div style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid #1e293b' }}>
          <div style={{ backgroundColor: '#ef4444', padding: '0.5rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ width: '1.25rem', height: '1.25rem' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 700, fontSize: '1rem', lineHeight: 1.2 }}>CyberShield</span>
            <span style={{ fontSize: '0.65rem', color: '#94a3b8' }}>भारत सरकार पहल</span>
          </div>
        </div>
        
        {/* Nav Items */}
        <div style={{ padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button style={{ backgroundColor: '#ef4444', color: '#ffffff', border: 'none', borderRadius: '0.5rem', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: '0.875rem' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '1.25rem', height: '1.25rem' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
            <div>
              <div style={{ lineHeight: 1.2 }}>Dashboard</div>
              <div style={{ fontSize: '0.65rem', color: '#fca5a5', fontWeight: 400 }}>डैशबोर्ड</div>
            </div>
          </button>
          
          <button style={{ backgroundColor: 'transparent', color: '#94a3b8', border: 'none', borderRadius: '0.5rem', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', textAlign: 'left', fontWeight: 500, fontSize: '0.875rem' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '1.25rem', height: '1.25rem' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 11.25L3 15.75m0 0l4.5 4.5M3 15.75h13.5m0-13.5L21 6.75m0 0l-4.5 4.5M21 6.75H7.5" />
            </svg>
            <div>
              <div style={{ lineHeight: 1.2, color: '#e2e8f0' }}>Fraud Network</div>
              <div style={{ fontSize: '0.65rem' }}>फ्रॉड नेटवर्क</div>
            </div>
          </button>
          
          <button onClick={() => onNavigate('scam')} style={{ backgroundColor: 'transparent', color: '#94a3b8', border: 'none', borderRadius: '0.5rem', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', textAlign: 'left', fontWeight: 500, fontSize: '0.875rem' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '1.25rem', height: '1.25rem' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <div style={{ lineHeight: 1.2, color: '#e2e8f0' }}>Case Intelligence</div>
              <div style={{ fontSize: '0.65rem' }}>केस इंटेलिजेंस</div>
            </div>
          </button>
          
          <button onClick={() => onNavigate('currency')} style={{ backgroundColor: 'transparent', color: '#94a3b8', border: 'none', borderRadius: '0.5rem', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', textAlign: 'left', fontWeight: 500, fontSize: '0.875rem' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '1.25rem', height: '1.25rem' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75" />
            </svg>
            <div>
              <div style={{ lineHeight: 1.2, color: '#e2e8f0' }}>Currency Verifier</div>
              <div style={{ fontSize: '0.65rem' }}>नोट सत्यापन</div>
            </div>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* Top bar */}
        <div style={{ backgroundColor: '#ffffff', padding: '1rem 1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '2.5rem', height: '2.5rem', backgroundColor: '#0f172a', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ width: '1.25rem', height: '1.25rem' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                CyberShield India <span style={{ color: '#cbd5e1', fontWeight: 300 }}>|</span> <span style={{ fontWeight: 600 }}>Command Centre</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', gap: '0.5rem' }}>
                <span>साइबरशील्ड भारत</span> <span>कमांड सेंटर</span>
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', padding: '0.375rem 0.75rem', borderRadius: '9999px' }}>
              <div style={{ width: '6px', height: '6px', backgroundColor: '#22c55e', borderRadius: '50%' }}></div>
              <span style={{ fontSize: '0.75rem', color: '#15803d', fontWeight: 500 }}>System operational · सिस्टम सक्रिय</span>
            </div>
            <div style={{ display: 'flex', border: '1px solid #e2e8f0', borderRadius: '0.5rem', overflow: 'hidden' }}>
              <div style={{ padding: '0.375rem 0.5rem', backgroundColor: '#f1f5f9', color: '#64748b', display: 'flex', alignItems: 'center' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '1rem', height: '1rem' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
                </svg>
              </div>
              <div style={{ padding: '0.375rem 0.75rem', backgroundColor: '#0f172a', color: '#ffffff', fontSize: '0.75rem', fontWeight: 600 }}>EN</div>
              <div style={{ padding: '0.375rem 0.75rem', backgroundColor: '#ffffff', color: '#64748b', fontSize: '0.75rem', fontWeight: 600 }}>हि</div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
          
          {/* Stats Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
            {/* Stat 1 */}
            <div style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.65rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.05em' }}>SCAMS DETECTED TODAY</div>
                  <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>आज पकड़े गए स्कैम</div>
                </div>
                <div style={{ backgroundColor: '#fee2e2', padding: '0.5rem', borderRadius: '0.5rem' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" style={{ width: '1.25rem', height: '1.25rem' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>2,847</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" style={{ width: '0.875rem', height: '0.875rem' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
                +12% vs yesterday
              </div>
            </div>

            {/* Stat 2 */}
            <div style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.65rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.05em' }}>AMOUNT PROTECTED</div>
                  <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>बचायी गयी राशि</div>
                </div>
                <div style={{ backgroundColor: '#dcfce7', padding: '0.5rem', borderRadius: '0.5rem' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" style={{ width: '1.25rem', height: '1.25rem' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>₹4.82 Cr</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" style={{ width: '0.875rem', height: '0.875rem' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
                +₹38.1L this hour
              </div>
            </div>

            {/* Stat 3 */}
            <div style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.65rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.05em' }}>FAKE NOTES CAUGHT</div>
                  <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>नकली नोट पकड़े</div>
                </div>
                <div style={{ backgroundColor: '#fef3c7', padding: '0.5rem', borderRadius: '0.5rem' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" style={{ width: '1.25rem', height: '1.25rem' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75" />
                  </svg>
                </div>
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>1,204</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" style={{ width: '0.875rem', height: '0.875rem' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.51m-3.182 5.51l-5.51-3.181" />
                </svg>
                -87 last 24h
              </div>
            </div>

            {/* Stat 4 */}
            <div style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.65rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.05em' }}>ACTIVE FRAUD NETWORKS</div>
                  <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>सक्रिय फ्रॉड नेटवर्क</div>
                </div>
                <div style={{ backgroundColor: '#f1f5f9', padding: '0.5rem', borderRadius: '0.5rem' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" style={{ width: '1.25rem', height: '1.25rem' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                  </svg>
                </div>
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>118</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" style={{ width: '0.875rem', height: '0.875rem' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
                9 new clusters
              </div>
            </div>
          </div>

          {/* Lower section */}
          <div style={{ display: 'flex', gap: '1.5rem', height: '400px' }}>
            
            {/* Live Alert Feed */}
            <div style={{ width: '350px', backgroundColor: '#ffffff', borderRadius: '0.75rem', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '6px', height: '6px', backgroundColor: '#ef4444', borderRadius: '50%' }}></div>
                    <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#0f172a' }}>Live Alert Feed</div>
                  </div>
                  <div style={{ fontSize: '0.65rem', color: '#64748b', marginLeft: '1rem' }}>लाइव अलर्ट फीड · past 15 minutes</div>
                </div>
                <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>Auto-refresh · 3s</div>
              </div>
              
              <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem 0' }}>
                {/* Alert Item 1 */}
                <div style={{ padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <div style={{ width: '6px', height: '6px', backgroundColor: '#f59e0b', borderRadius: '50%', marginTop: '0.375rem' }}></div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#1e293b' }}>Trai / DoT scam <span style={{ fontWeight: 400, color: '#94a3b8', fontSize: '0.75rem' }}>ट्राई फ्रॉड</span></div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.125rem' }}>Ahmedabad · +91 74****5501 · <span style={{ fontWeight: 600 }}>₹71.0k</span></div>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>just now</div>
                </div>

                {/* Alert Item 2 */}
                <div style={{ padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <div style={{ width: '6px', height: '6px', backgroundColor: '#94a3b8', borderRadius: '50%', marginTop: '0.375rem' }}></div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#1e293b' }}>Job Offer Fraud <span style={{ fontWeight: 400, color: '#94a3b8', fontSize: '0.75rem' }}>नौकरी धोखा</span></div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.125rem' }}>Lucknow · +91 88****3320 · <span style={{ fontWeight: 600 }}>₹26.5k</span></div>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>just now</div>
                </div>

                {/* Alert Item 3 */}
                <div style={{ padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <div style={{ width: '6px', height: '6px', backgroundColor: '#ef4444', borderRadius: '50%', marginTop: '0.375rem' }}></div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#1e293b' }}>Digital Arrest <span style={{ fontWeight: 400, color: '#94a3b8', fontSize: '0.75rem' }}>डिजिटल अरेस्ट</span></div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.125rem' }}>Mumbai · +91 98****4421 · <span style={{ fontWeight: 600 }}>₹4.80 L</span></div>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>just now</div>
                </div>

                {/* Alert Item 4 */}
                <div style={{ padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <div style={{ width: '6px', height: '6px', backgroundColor: '#f59e0b', borderRadius: '50%', marginTop: '0.375rem' }}></div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#1e293b' }}>Fake KYC <span style={{ fontWeight: 400, color: '#94a3b8', fontSize: '0.75rem' }}>फर्जी केवाईसी</span></div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.125rem' }}>Delhi · +91 89****1102 · <span style={{ fontWeight: 600 }}>₹62.0k</span></div>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>12s</div>
                </div>

                {/* Alert Item 5 */}
                <div style={{ padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <div style={{ width: '6px', height: '6px', backgroundColor: '#ef4444', borderRadius: '50%', marginTop: '0.375rem' }}></div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#1e293b' }}>Investment Fraud <span style={{ fontWeight: 400, color: '#94a3b8', fontSize: '0.75rem' }}>निवेश धोखा</span></div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.125rem' }}>Bengaluru · +91 77****8890 · <span style={{ fontWeight: 600 }}>₹12.50 L</span></div>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>48s</div>
                </div>

                {/* Alert Item 6 */}
                <div style={{ padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <div style={{ width: '6px', height: '6px', backgroundColor: '#ef4444', borderRadius: '50%', marginTop: '0.375rem' }}></div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#1e293b' }}>CBI Impersonation <span style={{ fontWeight: 400, color: '#94a3b8', fontSize: '0.75rem' }}>सीबीआई ठगी</span></div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.125rem' }}>Hyderabad · +91 91****3341 · <span style={{ fontWeight: 600 }}>₹3.20 L</span></div>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>1m</div>
                </div>
              </div>
            </div>

            {/* Active Fraud Network Map */}
            <div style={{ flex: 1, backgroundColor: '#ffffff', borderRadius: '0.75rem', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#0f172a' }}>Active Fraud Network</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>सक्रिय फ्रॉड नेटवर्क · Cluster #JAM-118</div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: '#475569' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div> Scammer</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#facc15' }}></div> Victim</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#a855f7' }}></div> Mule</div>
                </div>
              </div>
              
              <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                {/* Simulated Network Graph using SVG */}
                <svg width="100%" height="100%" viewBox="0 0 600 300" style={{ position: 'absolute', top: 0, left: 0 }}>
                  <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#cbd5e1" />
                    </marker>
                  </defs>
                  {/* Edges */}
                  <line x1="200" y1="80" x2="100" y2="150" stroke="#e2e8f0" strokeWidth="1.5" />
                  <line x1="200" y1="80" x2="300" y2="200" stroke="#e2e8f0" strokeWidth="1.5" />
                  <line x1="100" y1="150" x2="120" y2="220" stroke="#e2e8f0" strokeWidth="1.5" />
                  <line x1="120" y1="220" x2="250" y2="250" stroke="#e2e8f0" strokeWidth="1.5" />
                  <line x1="250" y1="250" x2="300" y2="200" stroke="#e2e8f0" strokeWidth="1.5" />
                  <line x1="300" y1="200" x2="450" y2="100" stroke="#e2e8f0" strokeWidth="1.5" />
                  <line x1="300" y1="200" x2="480" y2="220" stroke="#e2e8f0" strokeWidth="1.5" />
                  <line x1="450" y1="100" x2="520" y2="180" stroke="#e2e8f0" strokeWidth="1.5" />
                  <line x1="520" y1="180" x2="480" y2="220" stroke="#e2e8f0" strokeWidth="1.5" />
                  <line x1="520" y1="180" x2="560" y2="270" stroke="#e2e8f0" strokeWidth="1.5" />
                  
                  {/* Nodes */}
                  <circle cx="200" cy="80" r="12" fill="#ef4444" />
                  <text x="200" y="60" fontSize="8" fill="#64748b" textAnchor="middle">+91 77***8890</text>
                  
                  <circle cx="100" cy="150" r="10" fill="#ef4444" />
                  <text x="100" y="135" fontSize="8" fill="#64748b" textAnchor="middle">+91 98***4421</text>
                  
                  <circle cx="120" cy="220" r="8" fill="#a855f7" />
                  <text x="120" y="205" fontSize="8" fill="#64748b" textAnchor="middle">rbi-kyc-verify.in</text>
                  
                  <circle cx="250" cy="250" r="8" fill="#facc15" />
                  <text x="250" y="265" fontSize="8" fill="#64748b" textAnchor="middle">HDFC **7712</text>
                  
                  <circle cx="300" cy="200" r="8" fill="#a855f7" />
                  <text x="300" y="185" fontSize="8" fill="#64748b" textAnchor="middle">cbi-notice.online</text>

                  <circle cx="450" cy="100" r="10" fill="#ef4444" />
                  <text x="450" y="85" fontSize="8" fill="#64748b" textAnchor="middle">+91 91***3341</text>
                  
                  <circle cx="480" cy="220" r="8" fill="#facc15" />
                  <text x="480" y="235" fontSize="8" fill="#64748b" textAnchor="middle">SBI **2019</text>

                  <circle cx="520" cy="180" r="8" fill="#facc15" />
                  <text x="520" y="165" fontSize="8" fill="#64748b" textAnchor="middle">PayTM **0091</text>
                  
                  <circle cx="560" cy="270" r="8" fill="#facc15" />
                  <text x="560" y="285" fontSize="8" fill="#64748b" textAnchor="middle">Kavita R. (Pune)</text>
                  
                  <circle cx="80" cy="280" r="8" fill="#facc15" />
                  <text x="80" y="295" fontSize="8" fill="#64748b" textAnchor="middle">Amit S. (Mumbai)</text>
                  <line x1="100" y1="150" x2="80" y2="280" stroke="#e2e8f0" strokeWidth="1.5" />
                  
                </svg>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
