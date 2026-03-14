'use client'
import { useState } from 'react'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import AdUnit from '../../../../components/AdUnit';
import SchemaMarkup from '../../../../components/SchemaMarkup';
function fmt(n){return '$'+Math.round(n||0).toLocaleString('en-US')}
function pmt(p,r,n){const mo=r/100/12;return mo>0?p*mo/(1-Math.pow(1+mo,-n)):p/n}
const s={page:{minHeight:'100vh',background:'#0f1117',color:'#e2e8f0'},wrap:{maxWidth:860,margin:'0 auto',padding:'32px 16px 64px'},bc:{fontSize:13,color:'#64748b',marginBottom:12,display:'flex',gap:6,flexWrap:'wrap'},bcA:{color:'#64748b',textDecoration:'none'},h1:{fontSize:'clamp(22px,4vw,32px)',fontWeight:800,color:'#f1f5f9',margin:'0 0 8px'},sub:{fontSize:15,color:'#94a3b8',margin:'0 0 28px'},grid:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:20},card:{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:20},lbl:{fontSize:12,fontWeight:700,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:6,display:'block'},val:{fontSize:24,fontWeight:800,color:'#f0c842',margin:'0 0 10px'},sldr:{width:'100%',accentColor:'#f0c842'},box:{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:20,marginBottom:20},h2:{fontSize:18,fontWeight:700,color:'#f1f5f9',margin:'0 0 14px'},p:{fontSize:15,color:'#94a3b8',lineHeight:1.7,margin:'0 0 10px'},row:{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.05)'},tagA:{display:'inline-block',padding:'5px 12px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#94a3b8',textDecoration:'none',fontSize:12,margin:'0 6px 6px 0'},calcA:{display:'inline-block',padding:'8px 14px',background:'rgba(240,200,66,0.08)',border:'1px solid rgba(240,200,66,0.2)',borderRadius:8,color:'#f0c842',textDecoration:'none',fontSize:13,fontWeight:600,margin:'0 8px 8px 0'}}
export default function CarLoanPriceClient({item:it,all}){
  const[price,setPrice]=useState(it.price)
  const[down,setDown]=useState(10)
  const[rate,setRate]=useState(6.5)
  const[term,setTerm]=useState(60)
  const loan=price*(1-down/100)
  const monthly=pmt(loan,rate,term)
  const total=monthly*term
  const interest=total-loan
  return(<div style={s.page}><Header/>
        <SchemaMarkup breadcrumbs={[
    { name: 'Home', url: 'https://freefincalc.net' },
    { name: 'Car Loan Calculator', url: 'https://freefincalc.net/car-loan-calculator' }
  ]} />
        <AdUnit slot="7405024590" /><div style={s.wrap}>
    <nav style={s.bc}><a href="/" style={s.bcA}>Home</a><span>›</span><a href="/car-loan-calculator" style={s.bcA}>Car Loan Calculator</a><span>›</span><span style={{color:'#94a3b8'}}>{fmt(price)} Vehicle</span></nav>
    <h1 style={s.h1}>Car Loan Calculator: {fmt(price)} Vehicle</h1>
    <p style={s.sub}>A {fmt(price)} vehicle is a {it.type}. Calculate your exact monthly payment and total loan cost.</p>
    <div style={s.grid}>
      <div style={s.card}><label style={s.lbl}>Vehicle Price</label><div style={s.val}>{fmt(price)}</div><input type="number" value={price} onChange={e=>setPrice(+e.target.value)} className="calc-input"/></div>
      <div style={s.card}><label style={s.lbl}>Down Payment</label><div style={s.val}>{down}% — {fmt(price*down/100)}</div><input type="number" value={down} onChange={e=>setDown(+e.target.value)} className="calc-input"/></div>
      <div style={s.card}><label style={s.lbl}>APR Rate</label><div style={s.val}>{rate}%</div><input type="number" value={rate} onChange={e=>setRate(+e.target.value)} className="calc-input"/></div>
      <div style={s.card}><label style={s.lbl}>Loan Term (months)</label><div style={s.val}>{term} months</div><input type="number" value={term} onChange={e=>setTerm(+e.target.value)} className="calc-input"/></div>
    </div>
    <div style={s.box}>
      <h2 style={s.h2}>Loan Summary</h2>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Monthly Payment</span><span style={{fontWeight:800,color:'#f0c842',fontSize:20}}>{fmt(monthly)}/mo</span></div>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Loan Amount</span><span style={{fontWeight:700}}>{fmt(loan)}</span></div>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Total Interest</span><span style={{fontWeight:700,color:'#ef4444'}}>{fmt(interest)}</span></div>
      <div style={{...s.row,borderBottom:'none'}}><span style={{color:'#94a3b8'}}>Total Cost</span><span style={{fontWeight:700}}>{fmt(total+price*down/100)}</span></div>
    </div>
    <div style={s.box}>
      <h2 style={s.h2}>Term Comparison</h2>
      {[[48,5.9],[60,6.5],[72,7.5],[84,8.5]].map(([t,r])=>(<div key={t} style={s.row}><span style={{color:'#94a3b8'}}>{t}-month at {r}%</span><span style={{fontWeight:700}}>{fmt(pmt(loan,r,t))}/mo — {fmt(pmt(loan,r,t)*t-loan)} interest</span></div>))}
    </div>
    <div style={s.box}><h2 style={s.h2}>Related Calculators</h2>{[['/car-loan-calculator','Car Loan'],['/auto-lease-calculator','Auto Lease'],['/car-affordability-calculator','Car Affordability'],['/loan-payoff-calculator','Loan Payoff'],['/trade-in-calculator','Trade-In Value']].map(([href,lbl])=>(<a key={href} href={href} style={s.calcA}>{lbl}</a>))}</div>
    <div style={s.box}><h2 style={s.h2}>Car Loan by Vehicle Price</h2>{all.filter(x=>x.slug!==it.slug).map(x=>(<a key={x.slug} href={'/car-loan-calculator/price/'+x.slug} style={s.tagA}>{x.name}</a>))}</div>
  </div><AdUnit slot="3248634657" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://freefincalc.net"},{"@type":"ListItem","position":2,"name":"Car Loan Calculator","item":"https://freefincalc.net/car-loan-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Car Loan Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer/></div>)
}