'use client'
import { useState } from 'react'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import AdUnit from '../../../../components/AdUnit';
import SchemaMarkup from '../../../../components/SchemaMarkup';

function fmt(n) { return '$' + Math.round(n || 0).toLocaleString('en-US') }
function calc(debt, rate, term) {
  const mo = rate / 100 / 12
  const pmt = mo > 0 ? debt * mo / (1 - Math.pow(1 + mo, -term)) : debt / term
  return { pmt, interest: pmt * term - debt, total: pmt * term }
}

export default function StudentLoanClient({ major, allMajors }) {
  const [debt, setDebt] = useState(major.debt)
  const [rate, setRate] = useState(major.rate)
  const [term, setTerm] = useState(major.term)
  const r = calc(debt, rate, term)
  const dti = Math.round(r.pmt / (major.salary / 12) * 100)
  const s = {
    page:  { minHeight:'100vh', background:'#0f1117', color:'#e2e8f0' },
    wrap:  { maxWidth:860, margin:'0 auto', padding:'32px 16px 64px' },
    bc:    { fontSize:13, color:'#64748b', marginBottom:12, display:'flex', gap:6, flexWrap:'wrap' },
    bcA:   { color:'#64748b', textDecoration:'none' },
    h1:    { fontSize:'clamp(22px,4vw,32px)', fontWeight:800, color:'#f1f5f9', margin:'0 0 8px' },
    sub:   { fontSize:15, color:'#94a3b8', margin:'0 0 28px' },
    grid:  { display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:20 },
    card:  { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:20 },
    lbl:   { fontSize:12, fontWeight:700, color:'#64748b', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:6, display:'block' },
    val:   { fontSize:26, fontWeight:800, color:'#f0c842', margin:'0 0 10px' },
    sldr:  { width:'100%', accentColor:'#f0c842' },
    box:   { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:20, marginBottom:20 },
    h2:    { fontSize:18, fontWeight:700, color:'#f1f5f9', margin:'0 0 14px' },
    p:     { fontSize:15, color:'#94a3b8', lineHeight:1.7, margin:'0 0 10px' },
    row:   { display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.05)' },
    majA:  { display:'inline-block', padding:'5px 12px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:8, color:'#94a3b8', textDecoration:'none', fontSize:12, margin:'0 6px 6px 0' },
    calcA: { display:'inline-block', padding:'8px 14px', background:'rgba(240,200,66,0.08)', border:'1px solid rgba(240,200,66,0.2)', borderRadius:8, color:'#f0c842', textDecoration:'none', fontSize:13, fontWeight:600, margin:'0 8px 8px 0' },
    dtiColor: dti > 15 ? '#ef4444' : '#10b981',
  }
  return (
    <div style={s.page}>
      <Header />
        <SchemaMarkup breadcrumbs={[
    { name: 'Home', url: 'https://freefincalc.net' },
    { name: 'Student Loan Calculator', url: 'https://freefincalc.net/student-loan-calculator' }
  ]} />
        <AdUnit slot="7405024590" />
      <div style={s.wrap}>
        <nav style={s.bc}>
          <a href="/" style={s.bcA}>Home</a><span>›</span>
          <a href="/student-loan-calculator" style={s.bcA}>Student Loan Calculator</a><span>›</span>
          <span style={{color:'#94a3b8'}}>{major.name}</span>
        </nav>
        <h1 style={s.h1}>Student Loan Calculator: {major.name} 2026</h1>
        <p style={s.sub}>Average debt, monthly payments, and salary outlook for {major.desc}.</p>
        <div style={s.grid}>
          <div style={s.card}>
            <label style={s.lbl}>Total Student Debt</label>
            <div style={s.val}>{fmt(debt)}</div>
            <input type="number" value={debt} onChange={e => setDebt(+e.target.value)} style={s.sldr} />
          </div>
          <div style={s.card}>
            <label style={s.lbl}>Interest Rate</label>
            <div style={s.val}>{rate}%</div>
            <input type="number" value={rate} onChange={e => setRate(+e.target.value)} style={s.sldr} />
          </div>
          <div style={{...s.card, gridColumn:'span 2'}}>
            <label style={s.lbl}>Repayment Term (months)</label>
            <div style={s.val}>{term} months ({Math.round(term/12)} years)</div>
            <input type="number" value={term} onChange={e => setTerm(+e.target.value)} style={s.sldr} />
          </div>
        </div>
        <div style={s.box}>
          <h2 style={s.h2}>Repayment Summary</h2>
          <div style={s.row}><span style={{color:'#94a3b8'}}>Monthly Payment</span><span style={{fontWeight:800, color:'#f0c842', fontSize:20}}>{fmt(r.pmt)}/mo</span></div>
          <div style={s.row}><span style={{color:'#94a3b8'}}>Total Interest Paid</span><span style={{fontWeight:700}}>{fmt(r.interest)}</span></div>
          <div style={s.row}><span style={{color:'#94a3b8'}}>Total Repayment Cost</span><span style={{fontWeight:700}}>{fmt(r.total)}</span></div>
          <div style={s.row}><span style={{color:'#94a3b8'}}>Avg {major.name} Starting Salary</span><span style={{fontWeight:700}}>{fmt(major.salary)}/yr</span></div>
          <div style={{...s.row, borderBottom:'none'}}><span style={{color:'#94a3b8'}}>Loan-to-Salary Ratio</span><span style={{fontWeight:700, color:s.dtiColor}}>{dti}% of monthly income</span></div>
        </div>
        <div style={s.box}>
          <h2 style={s.h2}>{major.name}: Debt vs Salary Analysis</h2>
          <p style={s.p}>The average {major.name} graduate carries <strong style={{color:'#e2e8f0'}}>{fmt(major.debt)}</strong> in student debt and earns approximately <strong style={{color:'#e2e8f0'}}>{fmt(major.salary)}/year</strong> starting out. At the standard 10-year repayment rate of {major.rate}%, monthly payments are <strong style={{color:'#f0c842'}}>{fmt(calc(major.debt, major.rate, 120).pmt)}/month</strong> — representing {Math.round(calc(major.debt, major.rate, 120).pmt / (major.salary / 12) * 100)}% of gross monthly income.</p>
          <p style={s.p}>Financial experts recommend keeping student loan payments below 10-15% of gross monthly income. {dti <= 10 ? major.name + ' graduates generally stay within this guideline.' : dti <= 15 ? 'This is manageable but leaves limited room for other financial goals.' : 'This is above the recommended threshold — consider income-driven repayment plans or refinancing.'}</p>
        </div>
        <div style={s.box}>
          <h2 style={s.h2}>Related Calculators</h2>
          {[['/student-loan-calculator','Student Loan Calculator'],['/loan-payment-calculator','Loan Payment'],['/salary-after-tax-calculator','Salary After Tax'],['/debt-payoff-calculator','Debt Payoff'],['/refinance-calculator','Refinance Calculator']].map(([href,lbl]) => (
            <a key={href} href={href} style={s.calcA}>{lbl}</a>
          ))}
        </div>
        <div style={s.box}>
          <h2 style={s.h2}>Student Loan Calculator by Major</h2>
          {allMajors.filter(m => m.slug !== major.slug).map(m => (
            <a key={m.slug} href={'/student-loan-calculator/major/' + m.slug} style={s.majA}>{m.name}</a>
          ))}
        </div>
      </div>
      <AdUnit slot="3248634657" />
      <Footer />
    </div>
  )
}
