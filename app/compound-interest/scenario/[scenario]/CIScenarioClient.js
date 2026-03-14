'use client'
import { useState } from 'react'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import AdUnit from '../../../../components/AdUnit';
import SchemaMarkup from '../../../../components/SchemaMarkup';

function fmt(n) { return '$' + Math.round(n || 0).toLocaleString('en-US') }
function calcFV(principal, rate, years, monthly) {
  const mo = rate / 100 / 12
  const n  = years * 12
  const fv = principal * Math.pow(1 + mo, n) + (monthly > 0 && mo > 0 ? monthly * (Math.pow(1 + mo, n) - 1) / mo : monthly * n)
  return { fv, gains: fv - principal - monthly * n, deposits: monthly * n }
}

export default function CIScenarioClient({ item: sc, all }) {
  const [principal, setPrincipal] = useState(sc.principal)
  const [rate,      setRate]      = useState(sc.rate)
  const [years,     setYears]     = useState(sc.years)
  const [monthly,   setMonthly]   = useState(sc.monthly)
  const { fv, gains, deposits } = calcFV(principal, rate, years, monthly)
  const totalIn = principal + deposits

  const st = {
    page: { minHeight:'100vh', background:'#0f1117', color:'#e2e8f0' },
    wrap: { maxWidth:860, margin:'0 auto', padding:'32px 16px 64px' },
    bc:   { fontSize:13, color:'#64748b', marginBottom:12, display:'flex', gap:6, flexWrap:'wrap' },
    bcA:  { color:'#64748b', textDecoration:'none' },
    h1:   { fontSize:'clamp(22px,4vw,32px)', fontWeight:800, color:'#f1f5f9', margin:'0 0 8px' },
    sub:  { fontSize:15, color:'#94a3b8', margin:'0 0 28px' },
    grid: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:20 },
    card: { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:20 },
    lbl:  { fontSize:12, fontWeight:700, color:'#64748b', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:6, display:'block' },
    val:  { fontSize:24, fontWeight:800, color:'#f0c842', margin:'0 0 10px' },
    sldr: { width:'100%', accentColor:'#f0c842' },
    box:  { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:20, marginBottom:20 },
    h2:   { fontSize:18, fontWeight:700, color:'#f1f5f9', margin:'0 0 14px' },
    p:    { fontSize:15, color:'#94a3b8', lineHeight:1.7, margin:'0 0 10px' },
    row:  { display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.05)' },
    scA:  { display:'inline-block', padding:'5px 12px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:8, color:'#94a3b8', textDecoration:'none', fontSize:12, margin:'0 6px 6px 0' },
    calcA:{ display:'inline-block', padding:'8px 14px', background:'rgba(240,200,66,0.08)', border:'1px solid rgba(240,200,66,0.2)', borderRadius:8, color:'#f0c842', textDecoration:'none', fontSize:13, fontWeight:600, margin:'0 8px 8px 0' },
  }

  return (
    <div style={st.page}>
      <Header />
        <SchemaMarkup breadcrumbs={[
    { name: 'Home', url: 'https://www.freefincalc.net' },
    { name: 'Compound Interest Calculator', url: 'https://www.freefincalc.net/compound-interest' }
  ]} />
        <AdUnit slot="7405024590" />
      <div style={st.wrap}>
        <nav style={st.bc}>
          <a href="/" style={st.bcA}>Home</a><span>›</span>
          <a href="/compound-interest" style={st.bcA}>Compound Interest</a><span>›</span>
          <span style={{color:'#94a3b8'}}>{sc.name}</span>
        </nav>
        <h1 style={st.h1}>Compound Interest: {sc.name}</h1>
        <p style={st.sub}>See exactly how compound interest grows {sc.desc}.</p>

        <div style={st.grid}>
          <div style={st.card}>
            <label style={st.lbl}>Starting Amount</label>
            <div style={st.val}>{fmt(principal)}</div>
            <input type="range" value={principal} onChange={e => setPrincipal(+e.target.value)} className="calc-input" />
          </div>
          <div style={st.card}>
            <label style={st.lbl}>Monthly Contribution</label>
            <div style={st.val}>{fmt(monthly)}/mo</div>
            <input type="range" value={monthly} onChange={e => setMonthly(+e.target.value)} className="calc-input" />
          </div>
          <div style={st.card}>
            <label style={st.lbl}>Annual Return Rate</label>
            <div style={st.val}>{rate}%</div>
            <input type="range" value={rate} onChange={e => setRate(+e.target.value)} className="calc-input" />
          </div>
          <div style={st.card}>
            <label style={st.lbl}>Time Period</label>
            <div style={st.val}>{years} years</div>
            <input type="range" value={years} onChange={e => setYears(+e.target.value)} className="calc-input" />
          </div>
        </div>

        <div style={st.box}>
          <h2 style={st.h2}>Growth Summary</h2>
          <div style={st.row}><span style={{color:'#94a3b8'}}>Total Deposited</span><span style={{fontWeight:700}}>{fmt(totalIn)}</span></div>
          <div style={st.row}><span style={{color:'#94a3b8'}}>Interest / Growth Earned</span><span style={{fontWeight:700, color:'#10b981'}}>{fmt(gains)}</span></div>
          <div style={{display:'flex', justifyContent:'space-between', padding:'12px 0 0'}}>
            <span style={{fontWeight:700, fontSize:15}}>Final Value</span>
            <span style={{fontWeight:800, fontSize:22, color:'#f0c842'}}>{fmt(fv)}</span>
          </div>
          {gains > 0 && <div style={{marginTop:10, fontSize:13, color:'#64748b'}}>
            Compound interest contributed <strong style={{color:'#10b981'}}>{Math.round(gains/fv*100)}%</strong> of the final balance — your money did {Math.round(gains/totalIn*100)}% of the work.
          </div>}
        </div>

        <div style={st.box}>
          <h2 style={st.h2}>The Power of Compound Interest</h2>
          <p style={st.p}>This scenario — {sc.desc} — demonstrates one of the most powerful forces in personal finance. Albert Einstein reportedly called compound interest the eighth wonder of the world. Starting with {fmt(principal)} and adding {fmt(monthly)}/month at {rate}% for {years} years results in <strong style={{color:'#f0c842'}}>{fmt(fv)}</strong> — where compound growth accounts for {fmt(gains)} of that total.</p>
          <p style={st.p}>The most important variable is time. Starting just 5 years earlier can double your final balance. The second most important variable is consistency — missing contributions is far more damaging than you might expect.</p>
        </div>

        <div style={st.box}>
          <h2 style={st.h2}>Related Calculators</h2>
          {[['/compound-interest','Compound Interest'],['/investment-return-calculator','Investment Return'],['/savings-goal-calculator','Savings Goal'],['/retirement-calculator','Retirement Calculator'],['/roth-ira-calculator','Roth IRA Calculator']].map(([href,lbl]) => (
            <a key={href} href={href} style={st.calcA}>{lbl}</a>
          ))}
        </div>
        <div style={st.box}>
          <h2 style={st.h2}>More Compound Interest Scenarios</h2>
          {all.filter(x => x.slug !== sc.slug).slice(0, 30).map(x => (
            <a key={x.slug} href={'/compound-interest/scenario/' + x.slug} style={st.scA}>{x.name}</a>
          ))}
        </div>
      </div>
      <AdUnit slot="3248634657" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Compound Interest Calculator","item":"https://www.freefincalc.net/compound-interest"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Compound Interest Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </div>
  )
}
