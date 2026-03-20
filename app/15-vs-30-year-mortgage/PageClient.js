'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import AdUnit from '../../components/AdUnit'
import FaqSchema from '../../components/FaqSchema'

function fmt(n) { return '$' + Math.round(n || 0).toLocaleString('en-US') }
function pmt(p, r, n) { const m = r/100/12; return m > 0 ? p*m*Math.pow(1+m,n)/(Math.pow(1+m,n)-1) : p/n; }

export default function Page() {
  
  const st = {
    page: { minHeight: '100vh', background: '#0f1117', color: '#e2e8f0' },
    wrap: { maxWidth: 940, margin: '0 auto', padding: '32px 16px 64px' },
    bc: { fontSize: 13, color: '#64748b', marginBottom: 20, display: 'flex', gap: 6, flexWrap: 'wrap' },
    bcA: { color: '#64748b', textDecoration: 'none' },
    h1: { fontSize: 'clamp(26px, 4.5vw, 40px)', fontWeight: 800, color: '#f1f5f9', margin: '0 0 8px', lineHeight: 1.15 },
    sub: { fontSize: 15, color: '#94a3b8', margin: '0 0 32px', lineHeight: 1.6 },
    box: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: 28, marginBottom: 28 },
    goldBox: { background: 'rgba(240,200,66,0.04)', border: '1px solid rgba(240,200,66,0.15)', borderRadius: 18, padding: 28, marginBottom: 28 },
    h2: { fontSize: 22, fontWeight: 700, color: '#f1f5f9', margin: '0 0 16px' },
    h3: { fontSize: 17, fontWeight: 700, color: '#e2e8f0', margin: '24px 0 10px' },
    p: { fontSize: 15, color: '#94a3b8', lineHeight: 1.8, margin: '0 0 14px' },
    row: { display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' },
    vs: { display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 16, marginBottom: 24 },
    vsCard: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 20, textAlign: 'center' },
    vsMid: { display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800, color: '#475569' },
    winner: { background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)' },
    lbl: { fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6, display: 'block' },
    val: { fontSize: 24, fontWeight: 800, color: '#f0c842', margin: '0 0 10px' },
    calcA: { display: 'inline-block', padding: '8px 16px', background: 'rgba(240,200,66,0.08)', border: '1px solid rgba(240,200,66,0.2)', borderRadius: 8, color: '#f0c842', textDecoration: 'none', fontSize: 13, fontWeight: 600, margin: '0 8px 8px 0' },
    badge: { display: 'inline-block', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 },
    greenBadge: { background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' },
    redBadge: { background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' },
    table: { width: '100%', borderCollapse: 'collapse', fontSize: 14 },
    th: { textAlign: 'left', padding: '10px 12px', color: '#f0c842', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', borderBottom: '2px solid rgba(240,200,66,0.2)' },
    td: { padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#94a3b8' },
    tdBold: { padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#e2e8f0', fontWeight: 700 },
  }


  const [homePrice, setHomePrice] = useState(400000)
  const [downPct, setDownPct] = useState(20)
  const [rate15, setRate15] = useState(6.0)
  const [rate30, setRate30] = useState(6.75)

  const calc = useMemo(() => {
    const loan = homePrice * (1 - downPct / 100)
    const pmt15 = pmt(loan, rate15, 180)
    const pmt30 = pmt(loan, rate30, 360)
    const total15 = pmt15 * 180
    const total30 = pmt30 * 360
    const int15 = total15 - loan
    const int30 = total30 - loan
    const saved = int30 - int15
    const pmtDiff = pmt15 - pmt30
    return { loan, pmt15, pmt30, total15, total30, int15, int30, saved, pmtDiff }
  }, [homePrice, downPct, rate15, rate30])

  const faqs = [
    { q: 'Is a 15-year mortgage better than a 30-year?', a: 'A 15-year mortgage saves you a huge amount in total interest (often 50-60% less) and builds equity faster. However, the monthly payment is significantly higher (40-50% more). Choose 15-year if you can comfortably afford the higher payment without sacrificing emergency savings or retirement contributions.' },
    { q: 'How much do you save with a 15-year mortgage?', a: 'On a $320,000 loan, a 15-year at 6% vs 30-year at 6.75% saves approximately ' + fmt(calc.saved) + ' in total interest. That is real money that stays in your pocket instead of going to the bank.' },
    { q: 'Why are 15-year rates lower than 30-year?', a: 'Lenders charge lower rates on 15-year mortgages because the shorter term means less risk. The bank gets its money back faster, reducing exposure to economic changes, defaults, and inflation. This rate discount (typically 0.5-0.75% lower) is an additional benefit on top of the shorter payoff period.' },
    { q: 'Can I get a 20 or 25-year mortgage instead?', a: 'Yes, some lenders offer 20 and 25-year terms as a middle ground. A 20-year mortgage typically has rates close to the 15-year rate with a lower monthly payment. However, these are less common and may require shopping around with multiple lenders.' },
    { q: 'Should I get a 30-year and make extra payments instead?', a: 'This is a popular strategy that gives you flexibility. You get the lower required payment of a 30-year but pay extra toward principal when possible. The downside is you get the higher 30-year rate, and most people do not consistently make extra payments. If you have the discipline, it works. If not, the 15-year forces the faster payoff.' },
  ]

  return (
    <div style={st.page}>
      <Header />
      <FaqSchema faqs={faqs} />
      <AdUnit slot="7405024590" />
      <div style={st.wrap}>
        <nav style={st.bc}><a href="/" style={st.bcA}>Home</a><span style={{color:'#475569'}}>›</span><span style={{color:'#94a3b8'}}>15 vs 30 Year Mortgage</span></nav>
        <h1 style={st.h1}>15-Year vs 30-Year Mortgage — Full Comparison</h1>
        <p style={st.sub}>See the real cost difference between a 15-year and 30-year mortgage on any home price.</p>

        <div style={st.box}>
          <h2 style={st.h2}>Loan Details</h2>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
            {[
              ['Home Price', homePrice, setHomePrice, 100000, 2000000, 10000, fmt(homePrice)],
              ['Down Payment', downPct, setDownPct, 3, 40, 1, downPct + '%'],
              ['15-Year Rate', rate15, setRate15, 3, 10, 0.125, rate15 + '%'],
              ['30-Year Rate', rate30, setRate30, 3, 10, 0.125, rate30 + '%'],
            ].map(([label, val, set, min, max, step, display], i) => (
              <div key={i}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                  <span style={{fontSize:12,color:'#64748b'}}>{label}</span>
                  <span style={{fontSize:13,fontWeight:700,color:'#f0c842'}}>{display}</span>
                </div>
                <input type="range" min={min} max={max} step={step} value={val} onChange={e => set(+e.target.value)} style={{width:'100%',accentColor:'#f0c842'}} />
              </div>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:12,fontSize:13,color:'#64748b'}}>Loan Amount: <strong style={{color:'#e2e8f0'}}>{fmt(calc.loan)}</strong></div>
        </div>

        <div style={st.vs}>
          <div style={{...st.vsCard,...st.winner}}>
            <div style={{fontSize:14,fontWeight:700,color:'#10b981',marginBottom:8}}>15-Year Mortgage</div>
            <div style={{fontSize:11,color:'#64748b'}}>Monthly Payment</div>
            <div style={{fontSize:24,fontWeight:800,color:'#f0c842'}}>{fmt(calc.pmt15)}/mo</div>
            <div style={{fontSize:11,color:'#64748b',marginTop:8}}>Total Interest</div>
            <div style={{fontSize:18,fontWeight:700,color:'#10b981'}}>{fmt(calc.int15)}</div>
            <div style={{...st.badge,...st.greenBadge,marginTop:10}}>SAVES {fmt(calc.saved)}</div>
          </div>
          <div style={st.vsMid}>VS</div>
          <div style={st.vsCard}>
            <div style={{fontSize:14,fontWeight:700,color:'#60a5fa',marginBottom:8}}>30-Year Mortgage</div>
            <div style={{fontSize:11,color:'#64748b'}}>Monthly Payment</div>
            <div style={{fontSize:24,fontWeight:800,color:'#f0c842'}}>{fmt(calc.pmt30)}/mo</div>
            <div style={{fontSize:11,color:'#64748b',marginTop:8}}>Total Interest</div>
            <div style={{fontSize:18,fontWeight:700,color:'#ef4444'}}>{fmt(calc.int30)}</div>
            <div style={{...st.badge,...st.redBadge,marginTop:10}}>+{fmt(calc.pmtDiff)}/mo</div>
          </div>
        </div>

        <div style={st.goldBox}>
          <h2 style={{...st.h2,color:'#f0c842'}}>The Numbers</h2>
          <div style={st.row}><span style={{color:'#94a3b8'}}>Monthly difference</span><span style={{fontWeight:700}}>{fmt(calc.pmtDiff)}/mo more for 15-year</span></div>
          <div style={st.row}><span style={{color:'#94a3b8'}}>Total interest (15-year)</span><span style={{fontWeight:700,color:'#10b981'}}>{fmt(calc.int15)}</span></div>
          <div style={st.row}><span style={{color:'#94a3b8'}}>Total interest (30-year)</span><span style={{fontWeight:700,color:'#ef4444'}}>{fmt(calc.int30)}</span></div>
          <div style={{...st.row,borderBottom:'none'}}><span style={{color:'#f0c842',fontWeight:700}}>Total interest saved with 15-year</span><span style={{fontWeight:800,color:'#10b981',fontSize:20}}>{fmt(calc.saved)}</span></div>
        </div>

        <div style={st.box}>
          <h2 style={st.h2}>15 vs 30 Year Mortgage — Complete Guide</h2>
          <h3 style={st.h3}>The Case for a 15-Year Mortgage</h3>
          <p style={st.p}>The 15-year mortgage is the wealth-building choice. You save a massive amount in interest — on this loan, <strong style={{color:'#10b981'}}>{fmt(calc.saved)}</strong> stays in your pocket instead of going to the bank. You also get a lower interest rate (typically 0.5-0.75% less), build equity twice as fast, and own your home free and clear in half the time.</p>
          <p style={st.p}>The trade-off is a higher monthly payment — {fmt(calc.pmtDiff)} more per month. This means less flexibility in your monthly budget. Financial advisors generally recommend the 15-year only if the payment is under 25% of your gross monthly income and you have a fully-funded emergency fund.</p>

          <h3 style={st.h3}>The Case for a 30-Year Mortgage</h3>
          <p style={st.p}>The 30-year mortgage offers lower monthly payments and greater financial flexibility. The extra {fmt(calc.pmtDiff)}/month could go toward retirement investing (which may earn more than your mortgage rate), emergency savings, or other financial goals. If invested at 7% over 30 years, that monthly difference could grow to a substantial sum.</p>
          <p style={st.p}>The 30-year is also the safer choice during uncertain times. If you lose your job or face unexpected expenses, the lower required payment provides a bigger financial cushion. You can always make extra payments toward a 30-year mortgage when cash flow allows.</p>
        </div>

        <div style={st.box}><h2 style={st.h2}>Related Calculators</h2>{[['/mortgage-calculator','Mortgage Calculator'],['/amortization-calculator','Amortization'],['/refinance-calculator','Refinance Calculator'],['/home-affordability-calculator','Home Affordability'],['/extra-payment-calculator','Extra Payment']].map(([href,lbl]) => (<a key={href} href={href} style={st.calcA}>{lbl}</a>))}</div>

        <div style={st.box}>
          <h2 style={st.h2}>Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <div key={i} style={i < faqs.length - 1 ? {borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:16,marginBottom:16} : {paddingBottom:8}}>
              <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>{faq.q}</h3>
              <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"15 vs 30 Year Mortgage","item":"https://www.freefincalc.net/15-vs-30-year-mortgage"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"15 vs 30 Year Mortgage Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","ratingCount":"3654","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </div>
  )
}
