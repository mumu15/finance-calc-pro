import Link from 'next/link'

const BADGES = [
  { d:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', title:'Privacy First', desc:'Zero data stored. Runs in your browser.' },
  { d:'M12 2a10 10 0 100 20A10 10 0 0012 2zM12 6v6l4 2', title:'Instant Results', desc:'Real-time as you adjust each slider.' },
  { d:'M12 2a10 10 0 100 20A10 10 0 0012 2zM2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20', title:'40+ Currencies', desc:'Auto-detected. Switch anytime.' },
  { d:'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m4-5l5 5 5-5M12 15V3', title:'PDF Export', desc:'Download results from any calculator.' },
  { d:'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', title:'100% Free', desc:'No subscriptions or hidden costs.' },
  { d:'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z', title:'Mobile Ready', desc:'Fully responsive on every device.' },
]

export default function TrustSection() {
  return (
    <section aria-label="Why users trust FreeFinCalc" style={{ borderTop:"1px solid rgba(240,200,66,0.12)", borderBottom:'1px solid rgba(240,200,66,0.12)', background:'linear-gradient(180deg,rgba(240,200,66,0.025) 0%,transparent 100%)', padding:'60px 0 48px' }}>
      <div className="max-w-6xl mx-auto px-4">

        <div style={{ textAlign:'center', marginBottom:'40px' }}>
          <p style={{ fontSize:'11px', fontWeight:'600', letterSpacing:'2px', textTransform:'uppercase', color:'rgba(240,200,66,0.7)', marginBottom:'8px' }}>
            Trusted by 100,000+ users every month
          </p>
          <h2 style={{ fontFamily:""DM Serif Display",Georgia,serif", fontSize:"clamp(22px,3vw,30px)", fontWeight:'400', color:'#fff', letterSpacing:'-0.3px' }}>
            Why professionals choose FreeFinCalc
          </h2>
        </div>

        {/* Badges — CSS hover via .trust-badge class */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))', gap:'12px', marginBottom:'40px' }}>
          {BADGES.map((b,i) => (
            <div key={i} className="trust-badge">
              <div style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:'40px', height:'40px', borderRadius:'10px', background:'rgba(240,200,66,0.1)', color:'#f0c842', marginBottom:'12px' }}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d={b.d}/>
                </svg>
              </div>
              <div style={{ color:'#f1f5f9', fontWeight:'600', fontSize:'13.5px', marginBottom:'5px' }}>{b.title}</div>
              <div style={{ color:'#64748b', fontSize:'12px', lineHeight:'1.5' }}>{b.desc}</div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={{ display:'flex', flexWrap:'wrap', borderRadius:'16px', overflow:'hidden', border:'1px solid rgba(240,200,66,0.12)', marginBottom:'36px' }}>
          {[{n:'100',u:'calculators',l:'Across 10 categories'},{n:'40+',u:'currencies',l:'Auto-detected'},{n:'100K+',u:'users/month',l:'And growing'},{n:'4.9',u:'★ rating',l:'Verified users'}].map((s,i) => (
            <div key={i} style={{ flex:'1 1 140px', padding:'20px 24px', textAlign:'center', background:i%2===0?'rgba(240,200,66,0.03)':'rgba(255,255,255,0.01)', borderRight:i<3?'1px solid rgba(240,200,66,0.1)':'none' }}>
              <div style={{ fontFamily:""DM Serif Display",serif", fontSize:"28px", color:'#f0c842', lineHeight:'1', marginBottom:'2px' }}>{s.n}</div>
              <div style={{ color:'#94a3b8', fontSize:'12px', fontWeight:'500' }}>{s.u}</div>
              <div style={{ color:'#475569', fontSize:'11px', marginTop:'3px' }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div style={{ maxWidth:'760px', margin:'0 auto', padding:'16px 20px', borderRadius:'12px', background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ color:'#475569', fontSize:'12px', lineHeight:'1.7', textAlign:'center' }}>
            <strong style={{ color:'#64748b' }}>⚠ Disclaimer:</strong>{' '}
            All calculators are for educational purposes only and do not constitute financial, tax, legal or investment advice.
            Always consult a qualified professional.{' '}
            <Link href="/privacy-policy" className="ffc-link">Privacy Policy</Link>
            {' · '}
            <Link href="/about" className="ffc-link">About Us</Link>
          </p>
        </div>

      </div>
    </section>
  )
}
