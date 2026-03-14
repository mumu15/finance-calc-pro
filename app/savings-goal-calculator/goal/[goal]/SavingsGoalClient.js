'use client'
import { useState } from 'react'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import AdUnit from '../../../../components/AdUnit';
import SchemaMarkup from '../../../../components/SchemaMarkup';

function fmt(n) { return '$' + Math.round(n || 0).toLocaleString('en-US') }

export default function SavingsGoalClient({ item: g, all }) {
  const [target,  setTarget]  = useState(g.target)
  const [months,  setMonths]  = useState(g.months)
  const [rate,    setRate]    = useState(g.rate)

  const mo  = rate / 100 / 12
  const pmt = mo > 0 ? target * mo / (Math.pow(1 + mo, months) - 1) : target / months
  const interest = target - pmt * months

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
    val:  { fontSize:26, fontWeight:800, color:'#f0c842', margin:'0 0 10px' },
    sldr: { width:'100%', accentColor:'#f0c842' },
    box:  { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:20, marginBottom:20 },
    h2:   { fontSize:18, fontWeight:700, color:'#f1f5f9', margin:'0 0 14px' },
    p:    { fontSize:15, color:'#94a3b8', lineHeight:1.7, margin:'0 0 10px' },
    row:  { display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.05)' },
    gA:   { display:'inline-block', padding:'5px 12px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:8, color:'#94a3b8', textDecoration:'none', fontSize:12, margin:'0 6px 6px 0' },
    calcA:{ display:'inline-block', padding:'8px 14px', background:'rgba(240,200,66,0.08)', border:'1px solid rgba(240,200,66,0.2)', borderRadius:8, color:'#f0c842', textDecoration:'none', fontSize:13, fontWeight:600, margin:'0 8px 8px 0' },
  }

  return (
    <div style={st.page}>
      <Header />
        <SchemaMarkup breadcrumbs={[
    { name: 'Home', url: 'https://www.freefincalc.net' },
    { name: 'Savings Goal Calculator', url: 'https://www.freefincalc.net/savings-goal-calculator' }
  ]} />
        <AdUnit slot="7405024590" />
      <div style={st.wrap}>
        <nav style={st.bc}>
          <a href="/" style={st.bcA}>Home</a><span>›</span>
          <a href="/savings-goal-calculator" style={st.bcA}>Savings Goal Calculator</a><span>›</span>
          <span style={{color:'#94a3b8'}}>{g.name}</span>
        </nav>
        <h1 style={st.h1}>Savings Goal: {g.name}</h1>
        <p style={st.sub}>How much do you need to save each month for {g.desc}?</p>

        <div style={st.grid}>
          <div style={st.card}>
            <label style={st.lbl}>Savings Target</label>
            <div style={st.val}>{fmt(target)}</div>
            <input type="range" value={target} onChange={e => setTarget(+e.target.value)} className="calc-input" />
          </div>
          <div style={st.card}>
            <label style={st.lbl}>Timeframe (months)</label>
            <div style={st.val}>{months} mo ({(months/12).toFixed(1)} yrs)</div>
            <input type="range" value={months} onChange={e => setMonths(+e.target.value)} className="calc-input" />
          </div>
          <div style={{...st.card, gridColumn:'span 2'}}>
            <label style={st.lbl}>Annual Interest Rate (savings account / investment)</label>
            <div style={st.val}>{rate}%</div>
            <input type="range" value={rate} onChange={e => setRate(+e.target.value)} className="calc-input" />
          </div>
        </div>

        <div style={st.box}>
          <h2 style={st.h2}>Savings Plan Summary</h2>
          <div style={st.row}><span style={{color:'#94a3b8'}}>Monthly Deposit Needed</span><span style={{fontWeight:800, color:'#f0c842', fontSize:20}}>{fmt(pmt)}/mo</span></div>
          <div style={st.row}><span style={{color:'#94a3b8'}}>Total Deposits</span><span style={{fontWeight:700}}>{fmt(pmt * months)}</span></div>
          <div style={st.row}><span style={{color:'#94a3b8'}}>Interest Earned</span><span style={{fontWeight:700, color:'#10b981'}}>{fmt(interest > 0 ? interest : 0)}</span></div>
          <div style={{...st.row, borderBottom:'none'}}><span style={{color:'#94a3b8'}}>Goal Amount</span><span style={{fontWeight:800, fontSize:18, color:'#f0c842'}}>{fmt(target)}</span></div>
        </div>

        <div style={st.box}>
          <h2 style={st.h2}>{g.name} Savings Guide</h2>
          <p style={st.p}>Saving for {g.desc} is one of the most impactful financial decisions you can make. With a target of {fmt(g.target)} and {g.months} months to reach it, you need to save <strong style={{color:'#f0c842'}}>{fmt(pmt)}/month</strong> — less than a daily coffee habit for most goals.</p>
          <p style={st.p}>A High-Yield Savings Account (HYSA) currently offers 4-5% APY — far better than a regular savings account. For longer goals over 5 years, index funds historically average 7-10% annually, significantly reducing the monthly amount needed.</p>
        </div>

        <div style={st.box}>
          <h2 style={st.h2}>Related Calculators</h2>
          {[['/savings-goal-calculator','Savings Goal'],['/savings-calculator','Savings Calculator'],['/compound-interest','Compound Interest'],['/emergency-fund-calculator','Emergency Fund'],['/investment-return-calculator','Investment Return']].map(([href,lbl]) => (
            <a key={href} href={href} style={st.calcA}>{lbl}</a>
          ))}
        </div>
        <div style={st.box}>
          <h2 style={st.h2}>Other Savings Goals</h2>
          {all.filter(x => x.slug !== g.slug).map(x => (
            <a key={x.slug} href={'/savings-goal-calculator/goal/' + x.slug} style={st.gA}>{x.name}</a>
          ))}
        </div>
      </div>
      <AdUnit slot="3248634657" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Savings Goal Calculator","item":"https://www.freefincalc.net/savings-goal-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Savings Goal Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </div>
  )
}
