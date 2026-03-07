'use client'
import { useState } from 'react'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'

function fmt(n) { return '$' + Math.round(n || 0).toLocaleString('en-US') }

export default function TaxStateClient({ item: s, all }) {
  const [income, setIncome] = useState(75000)
  const fed   = income * s.fedRate / 100
  const state = income * s.rate / 100
  const fica  = income * 7.65 / 100
  const net   = income - fed - state - fica
  const eff   = ((fed + state + fica) / income * 100).toFixed(1)

  const st = {
    page: { minHeight:'100vh', background:'#0f1117', color:'#e2e8f0' },
    wrap: { maxWidth:860, margin:'0 auto', padding:'32px 16px 64px' },
    bc:   { fontSize:13, color:'#64748b', marginBottom:12, display:'flex', gap:6, flexWrap:'wrap' },
    bcA:  { color:'#64748b', textDecoration:'none' },
    h1:   { fontSize:'clamp(22px,4vw,32px)', fontWeight:800, color:'#f1f5f9', margin:'0 0 8px' },
    sub:  { fontSize:15, color:'#94a3b8', margin:'0 0 28px' },
    card: { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:20, marginBottom:20 },
    lbl:  { fontSize:12, fontWeight:700, color:'#64748b', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:6, display:'block' },
    val:  { fontSize:28, fontWeight:800, color:'#f0c842', margin:'0 0 10px' },
    sldr: { width:'100%', accentColor:'#f0c842' },
    h2:   { fontSize:18, fontWeight:700, color:'#f1f5f9', margin:'0 0 14px' },
    p:    { fontSize:15, color:'#94a3b8', lineHeight:1.7, margin:'0 0 10px' },
    row:  { display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.05)' },
    stA:  { display:'inline-block', padding:'5px 12px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:8, color:'#94a3b8', textDecoration:'none', fontSize:12, margin:'0 6px 6px 0' },
    calcA:{ display:'inline-block', padding:'8px 14px', background:'rgba(240,200,66,0.08)', border:'1px solid rgba(240,200,66,0.2)', borderRadius:8, color:'#f0c842', textDecoration:'none', fontSize:13, fontWeight:600, margin:'0 8px 8px 0' },
  }

  return (
    <div style={st.page}>
      <Header />
      <div style={st.wrap}>
        <nav style={st.bc}>
          <a href="/" style={st.bcA}>Home</a><span>›</span>
          <a href="/tax-calculator" style={st.bcA}>Tax Calculator</a><span>›</span>
          <span style={{color:'#94a3b8'}}>{s.name}</span>
        </nav>
        <h1 style={st.h1}>{s.name} Income Tax Calculator 2026</h1>
        <p style={st.sub}>{s.noTax ? s.name + ' has no state income tax.' : 'State rate: ' + s.rate + '%. ' + s.desc + '.'}</p>

        <div style={st.card}>
          <label style={st.lbl}>Annual Income</label>
          <div style={st.val}>{fmt(income)}/year</div>
          <input type="range" min={20000} max={500000} step={1000} value={income} onChange={e => setIncome(+e.target.value)} style={st.sldr} />
        </div>

        <div style={st.card}>
          <h2 style={st.h2}>Tax Breakdown — {s.name}</h2>
          <div style={st.row}><span style={{color:'#94a3b8'}}>Gross Income</span><span style={{fontWeight:700}}>{fmt(income)}/yr</span></div>
          <div style={st.row}><span style={{color:'#94a3b8'}}>Federal Tax ({s.fedRate}% est.)</span><span style={{fontWeight:700, color:'#ef4444'}}>- {fmt(fed)}</span></div>
          <div style={st.row}><span style={{color:'#94a3b8'}}>{s.name} State Tax ({s.noTax ? 'None' : s.rate + '%'})</span><span style={{fontWeight:700, color: s.noTax ? '#10b981' : '#ef4444'}}>- {fmt(state)}</span></div>
          <div style={st.row}><span style={{color:'#94a3b8'}}>FICA (7.65%)</span><span style={{fontWeight:700, color:'#ef4444'}}>- {fmt(fica)}</span></div>
          <div style={{display:'flex', justifyContent:'space-between', padding:'12px 0 0'}}>
            <span style={{fontWeight:700, fontSize:15}}>Take-Home Pay</span>
            <span style={{fontWeight:800, fontSize:22, color:'#f0c842'}}>{fmt(net)}/yr</span>
          </div>
          <div style={{marginTop:10, display:'flex', gap:20, flexWrap:'wrap', fontSize:13, color:'#64748b'}}>
            <span>Monthly: <strong style={{color:'#e2e8f0'}}>{fmt(net/12)}</strong></span>
            <span>Effective rate: <strong style={{color:'#e2e8f0'}}>{eff}%</strong></span>
          </div>
        </div>

        <div style={st.card}>
          <h2 style={st.h2}>{s.name} Tax Guide 2026</h2>
          <p style={st.p}>{s.name} is {s.desc}. {s.noTax ? 'With no state income tax, ' + s.name + ' workers keep significantly more of their paycheck than residents of high-tax states like California or New York. On a $75,000 salary, that is over ' + fmt(75000 * 0.06) + ' more per year.' : 'The ' + s.name + ' state income tax rate of ' + s.rate + '% applies to earned income. Combined with federal taxes and FICA, the effective total tax burden on a $75,000 income is approximately ' + ((75000 * (s.fedRate + s.rate) / 100 + 75000 * 0.0765) / 75000 * 100).toFixed(1) + '%.'}</p>
        </div>

        <div style={st.card}>
          <h2 style={st.h2}>Related Calculators</h2>
          {[['/tax-calculator','Tax Calculator'],['/salary-after-tax-calculator','Salary After Tax'],['/paycheck-calculator','Paycheck Calculator'],['/self-employment-tax-calculator','Self-Employment Tax'],['/capital-gains-tax-calculator','Capital Gains Tax']].map(([href,lbl]) => (
            <a key={href} href={href} style={st.calcA}>{lbl}</a>
          ))}
        </div>

        <div style={st.card}>
          <h2 style={st.h2}>Tax Calculator by State</h2>
          {all.filter(x => x.slug !== s.slug).map(x => (
            <a key={x.slug} href={'/tax-calculator/state/' + x.slug} style={st.stA}>{x.name} ({x.abbr})</a>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
