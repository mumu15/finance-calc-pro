'use client'
import { useState } from 'react'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import AdUnit from '../../../../components/AdUnit';
import SchemaMarkup from '../../../../components/SchemaMarkup';

function fmt(n) { return '$' + Math.round(n || 0).toLocaleString('en-US') }
function calc(amt, rate, term) {
  const mo = rate / 100 / 12
  const pmt = mo > 0 ? amt * mo / (1 - Math.pow(1 + mo, -term)) : amt / term
  return { pmt, interest: pmt * term - amt, total: pmt * term }
}

export default function PersonalLoanClient({ purpose, allPurposes }) {
  const [amt,  setAmt]  = useState(purpose.avg)
  const [rate, setRate] = useState(purpose.rate)
  const [term, setTerm] = useState(purpose.term)
  const r = calc(amt, rate, term)
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
    pA:    { display:'inline-block', padding:'5px 12px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:8, color:'#94a3b8', textDecoration:'none', fontSize:12, margin:'0 6px 6px 0' },
    calcA: { display:'inline-block', padding:'8px 14px', background:'rgba(240,200,66,0.08)', border:'1px solid rgba(240,200,66,0.2)', borderRadius:8, color:'#f0c842', textDecoration:'none', fontSize:13, fontWeight:600, margin:'0 8px 8px 0' },
  }
  return (
    <div style={s.page}>
      <Header />
        <SchemaMarkup breadcrumbs={[
    { name: 'Home', url: 'https://freefincalc.net' },
    { name: 'Personal Loan Calculator', url: 'https://freefincalc.net/personal-loan-calculator' }
  ]} />
        <AdUnit slot="7405024590" />
      <div style={s.wrap}>
        <nav style={s.bc}>
          <a href="/" style={s.bcA}>Home</a><span>›</span>
          <a href="/personal-loan-calculator" style={s.bcA}>Personal Loan Calculator</a><span>›</span>
          <span style={{color:'#94a3b8'}}>{purpose.name}</span>
        </nav>
        <h1 style={s.h1}>Personal Loan for {purpose.name} 2026</h1>
        <p style={s.sub}>Calculate monthly payments for {purpose.desc}.</p>
        <div style={s.grid}>
          <div style={s.card}>
            <label style={s.lbl}>Loan Amount</label>
            <div style={s.val}>{fmt(amt)}</div>
            <input type="number" value={amt} onChange={e => setAmt(+e.target.value)} className="calc-input" />
          </div>
          <div style={s.card}>
            <label style={s.lbl}>Interest Rate</label>
            <div style={s.val}>{rate}%</div>
            <input type="number" value={rate} onChange={e => setRate(+e.target.value)} className="calc-input" />
          </div>
          <div style={{...s.card, gridColumn:'span 2'}}>
            <label style={s.lbl}>Loan Term (months)</label>
            <div style={s.val}>{term} months</div>
            <input type="number" value={term} onChange={e => setTerm(+e.target.value)} className="calc-input" />
          </div>
        </div>
        <div style={s.box}>
          <h2 style={s.h2}>Loan Summary</h2>
          <div style={s.row}><span style={{color:'#94a3b8'}}>Monthly Payment</span><span style={{fontWeight:800, color:'#f0c842', fontSize:20}}>{fmt(r.pmt)}/mo</span></div>
          <div style={s.row}><span style={{color:'#94a3b8'}}>Total Interest</span><span style={{fontWeight:700}}>{fmt(r.interest)}</span></div>
          <div style={{...s.row, borderBottom:'none'}}><span style={{color:'#94a3b8'}}>Total Cost</span><span style={{fontWeight:700}}>{fmt(r.total)}</span></div>
        </div>
        <div style={s.box}>
          <h2 style={s.h2}>Guide: Personal Loan for {purpose.name}</h2>
          <p style={s.p}>A personal loan for {purpose.desc} typically ranges from {fmt(purpose.avg * 0.5)} to {fmt(purpose.avg * 2)} with rates between {(purpose.rate - 2).toFixed(1)}% and {(purpose.rate + 5).toFixed(1)}% depending on your credit score. Borrowers with scores above 720 generally qualify for the lowest rates.</p>
          <p style={s.p}>Before borrowing, compare at least 3 lenders — rates for the same borrower can vary by 5% or more. Online lenders often offer lower rates than banks for personal loans. Check if your employer or credit union offers lower rates first.</p>
        </div>
        <div style={s.box}>
          <h2 style={s.h2}>Related Calculators</h2>
          {[['/personal-loan-calculator','Personal Loan'],['/loan-comparison-calculator','Loan Comparison'],['/debt-consolidation-calculator','Debt Consolidation'],['/credit-card-payoff-calculator','Credit Card Payoff'],['/apr-calculator','APR Calculator']].map(([href,lbl]) => (
            <a key={href} href={href} style={s.calcA}>{lbl}</a>
          ))}
        </div>
        <div style={s.box}>
          <h2 style={s.h2}>Personal Loan by Purpose</h2>
          {allPurposes.filter(p => p.slug !== purpose.slug).map(p => (
            <a key={p.slug} href={'/personal-loan-calculator/purpose/' + p.slug} style={s.pA}>{p.name}</a>
          ))}
        </div>
      </div>
      <AdUnit slot="3248634657" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://freefincalc.net"},{"@type":"ListItem","position":2,"name":"Personal Loan Calculator","item":"https://freefincalc.net/personal-loan-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Personal Loan Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </div>
  )
}
