'use client'
import { useState } from 'react'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import AdUnit from '../../../../components/AdUnit';
import SchemaMarkup from '../../../../components/SchemaMarkup';
function fmt(n){return '$'+Math.round(n||0).toLocaleString('en-US')}
function pmt(p,r,n){const mo=r/100/12;return mo>0?p*mo/(1-Math.pow(1+mo,-n)):p/n}
export default function LoanAmountClient({item:it,all}){
  const[amount,setAmount]=useState(it.amount)
  const[rate,setRate]=useState(it.rate)
  const[term,setTerm]=useState(60)
  const monthly=pmt(amount,rate,term)
  const total=monthly*term
  const interest=total-amount
  const s={page:{minHeight:'100vh',background:'#0f1117',color:'#e2e8f0'},wrap:{maxWidth:860,margin:'0 auto',padding:'32px 16px 64px'},bc:{fontSize:13,color:'#64748b',marginBottom:12,display:'flex',gap:6,flexWrap:'wrap'},bcA:{color:'#64748b',textDecoration:'none'},h1:{fontSize:'clamp(22px,4vw,32px)',fontWeight:800,color:'#f1f5f9',margin:'0 0 8px'},sub:{fontSize:15,color:'#94a3b8',margin:'0 0 28px'},grid:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:20},card:{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:20},lbl:{fontSize:12,fontWeight:700,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:6,display:'block'},val:{fontSize:24,fontWeight:800,color:'#f0c842',margin:'0 0 10px'},sldr:{width:'100%',accentColor:'#f0c842'},box:{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:20,marginBottom:20},h2:{fontSize:18,fontWeight:700,color:'#f1f5f9',margin:'0 0 14px'},p:{fontSize:15,color:'#94a3b8',lineHeight:1.7,margin:'0 0 10px'},row:{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.05)'},lA:{display:'inline-block',padding:'5px 12px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#94a3b8',textDecoration:'none',fontSize:12,margin:'0 6px 6px 0'},calcA:{display:'inline-block',padding:'8px 14px',background:'rgba(240,200,66,0.08)',border:'1px solid rgba(240,200,66,0.2)',borderRadius:8,color:'#f0c842',textDecoration:'none',fontSize:13,fontWeight:600,margin:'0 8px 8px 0'}}
  return(<div style={s.page}><Header/>
        <SchemaMarkup breadcrumbs={[
    { name: 'Home', url: 'https://freefincalc.net' },
    { name: 'Personal Loan Calculator', url: 'https://freefincalc.net/personal-loan-calculator' }
  ]} />
        <AdUnit slot="7405024590" /><div style={s.wrap}>
    <nav style={s.bc}><a href="/" style={s.bcA}>Home</a><span>›</span><a href="/personal-loan-calculator" style={s.bcA}>Personal Loan Calculator</a><span>›</span><span style={{color:'#94a3b8'}}>{it.name}</span></nav>
    <h1 style={s.h1}>{fmt(amount)} Personal Loan Calculator</h1>
    <p style={s.sub}>Calculate exact monthly payments, total interest, and total cost for a {fmt(amount)} personal loan.</p>
    <div style={s.grid}>
      <div style={s.card}><label style={s.lbl}>Loan Amount</label><div style={s.val}>{fmt(amount)}</div><input type="number" value={amount} onChange={e=>setAmount(+e.target.value)} className="calc-input"/></div>
      <div style={s.card}><label style={s.lbl}>Interest Rate (APR)</label><div style={s.val}>{rate}%</div><input type="number" value={rate} onChange={e=>setRate(+e.target.value)} className="calc-input"/></div>
      <div style={{...s.card,gridColumn:'span 2'}}><label style={s.lbl}>Loan Term</label><div style={s.val}>{term} months ({(term/12).toFixed(1)} years)</div><input type="number" value={term} onChange={e=>setTerm(+e.target.value)} className="calc-input"/></div>
    </div>
    <div style={s.box}>
      <h2 style={s.h2}>Loan Payment Summary</h2>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Monthly Payment</span><span style={{fontWeight:800,color:'#f0c842',fontSize:20}}>{fmt(monthly)}/mo</span></div>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Total Interest</span><span style={{fontWeight:700,color:'#ef4444'}}>{fmt(interest)}</span></div>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Total Amount Repaid</span><span style={{fontWeight:700}}>{fmt(total)}</span></div>
      <div style={{...s.row,borderBottom:'none'}}><span style={{color:'#94a3b8'}}>Interest as % of loan</span><span style={{fontWeight:700}}>{Math.round(interest/amount*100)}%</span></div>
    </div>
    <div style={s.box}>
      <h2 style={s.h2}>Quick Comparison: 36 vs 60 Months</h2>
      <div style={s.row}><span style={{color:'#94a3b8'}}>36-Month Payment (~{it.rate}%)</span><span style={{fontWeight:700}}>{fmt(pmt(it.amount,it.rate,36))}/mo — less interest</span></div>
      <div style={{...s.row,borderBottom:'none'}}><span style={{color:'#94a3b8'}}>60-Month Payment (~{it.rate}%)</span><span style={{fontWeight:700}}>{fmt(pmt(it.amount,it.rate,60))}/mo — lower payment</span></div>
    </div>
    <div style={s.box}><h2 style={s.h2}>About {fmt(it.amount)} Personal Loans</h2><p style={s.p}>A {fmt(it.amount)} personal loan is {'used for ' + (it.amount < 5000 ? 'small emergencies, car repairs, or credit card consolidation' : it.amount < 20000 ? 'debt consolidation, home improvements, or medical bills' : it.amount < 50000 ? 'major home renovations, large debt consolidation, or business expenses' : 'major purchases, investment, or large debt consolidation')}. The best rates for {fmt(it.amount)} loans typically range from {it.rate-5 > 5 ? it.rate-5 : 6}% to {it.rate+5}% APR depending on your credit score. Excellent credit (750+) qualifies for the lowest rates.</p></div>
    <div style={s.box}><h2 style={s.h2}>Related Calculators</h2>{[['/personal-loan-calculator','Personal Loan'],['/debt-consolidation-calculator','Debt Consolidation'],['/debt-payoff-calculator','Debt Payoff'],['/credit-score-calculator','Credit Score'],['/apr-calculator','APR Calculator']].map(([href,lbl])=>(<a key={href} href={href} style={s.calcA}>{lbl}</a>))}</div>
    <div style={s.box}><h2 style={s.h2}>Loan Calculator by Amount</h2>{all.filter(x=>x.slug!==it.slug).map(x=>(<a key={x.slug} href={'/personal-loan-calculator/amount/'+x.slug} style={s.lA}>{x.name}</a>))}</div>
  </div><AdUnit slot="3248634657" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://freefincalc.net"},{"@type":"ListItem","position":2,"name":"Personal Loan Calculator","item":"https://freefincalc.net/personal-loan-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Personal Loan Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer/></div>)
}
