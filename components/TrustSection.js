import Link from 'next/link'

const TRUST_BADGES = [
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Privacy First',
    desc: 'Zero data stored. Calculations run entirely in your browser.',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'Instant Results',
    desc: 'Real-time calculations as you adjust each slider.',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
      </svg>
    ),
    title: '40+ Currencies',
    desc: 'Your currency auto-detected. Switch anytime.',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
      </svg>
    ),
    title: 'PDF Export',
    desc: 'Download a professional result sheet from any calculator.',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
      </svg>
    ),
    title: '100% Free',
    desc: 'No subscriptions, no paywalls, no hidden costs.',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
        <line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
    title: 'Mobile Ready',
    desc: 'Fully responsive on every screen size.',
  },
]

export default function TrustSection() {
  return (
    <section
      aria-label="Why users trust FreeFinCalc"
      style={{
        borderTop: '1px solid rgba(240,200,66,0.12)',
        borderBottom: '1px solid rgba(240,200,66,0.12)',
        background: 'linear-gradient(180deg, rgba(240,200,66,0.025) 0%, transparent 100%)',
        padding: '60px 0 48px',
      }}
    >
      <div className="max-w-6xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-10">
          <p style={{
            fontSize: '11px',
            fontWeight: '600',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'rgba(240,200,66,0.7)',
            marginBottom: '8px',
          }}>
            Trusted by 100,000+ users every month
          </p>
          <h2 style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: 'clamp(22px, 3vw, 30px)',
            fontWeight: '400',
            color: '#ffffff',
            letterSpacing: '-0.3px',
          }}>
            Why professionals choose FreeFinCalc
          </h2>
        </div>

        {/* Badge Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '12px',
          marginBottom: '40px',
        }}>
          {TRUST_BADGES.map((badge, i) => (
            <div
              key={i}
              style={{
                padding: '20px 16px',
                borderRadius: '14px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                textAlign: 'center',
                transition: 'border-color 0.2s',
              }}
            >
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'rgba(240,200,66,0.1)',
                color: '#f0c842',
                marginBottom: '12px',
              }}>
                {badge.icon}
              </div>
              <div style={{
                color: '#f1f5f9',
                fontWeight: '600',
                fontSize: '13.5px',
                marginBottom: '5px',
              }}>
                {badge.title}
              </div>
              <div style={{ color: '#64748b', fontSize: '12px', lineHeight: '1.5' }}>
                {badge.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid rgba(240,200,66,0.12)',
          marginBottom: '36px',
        }}>
          {[
            { n: '100', unit: 'calculators', l: 'Across 10 categories' },
            { n: '40+', unit: 'currencies', l: 'Auto-detected globally' },
            { n: '100K+', unit: 'users/month', l: 'And growing daily' },
            { n: '4.9', unit: '★ rating', l: 'From verified users' },
          ].map((s, i) => (
            <div key={i} style={{
              flex: '1 1 160px',
              padding: '20px 24px',
              textAlign: 'center',
              background: i % 2 === 0 ? 'rgba(240,200,66,0.03)' : 'rgba(255,255,255,0.01)',
              borderRight: i < 3 ? '1px solid rgba(240,200,66,0.1)' : 'none',
            }}>
              <div style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: '28px',
                color: '#f0c842',
                lineHeight: '1',
                marginBottom: '2px',
              }}>
                {s.n}
              </div>
              <div style={{ color: '#94a3b8', fontSize: '12px', fontWeight: '500' }}>
                {s.unit}
              </div>
              <div style={{ color: '#475569', fontSize: '11px', marginTop: '3px' }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div style={{
          maxWidth: '760px',
          margin: '0 auto',
          padding: '16px 20px',
          borderRadius: '12px',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <p style={{
            color: '#475569',
            fontSize: '12px',
            lineHeight: '1.7',
            textAlign: 'center',
          }}>
            <strong style={{ color: '#64748b' }}>⚠ Disclaimer:</strong>{' '}
            All calculators on FreeFinCalc.net are provided for educational and informational purposes only.
            Results are estimates and do not constitute financial, tax, legal or investment advice.
            Always consult a qualified financial professional before making financial decisions.
            Figures may vary based on lender terms, local regulations and individual circumstances.
            See our{' '}
            <Link href="/privacy-policy" style={{ color: '#94a3b8', textDecoration: 'underline' }}>
              Privacy Policy
            </Link>
            {' '}and{' '}
            <Link href="/about" style={{ color: '#94a3b8', textDecoration: 'underline' }}>
              About Us
            </Link>.
          </p>
        </div>

      </div>
    </section>
  )
}
