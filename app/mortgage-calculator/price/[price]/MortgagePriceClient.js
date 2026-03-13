'use client'
import { useState } from 'react'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import AdUnit from '../../../../components/AdUnit';
import SchemaMarkup from '../../../../components/SchemaMarkup';
function fmt(n){return '$'+Math.round(n||0).toLocaleString('en-US')}
function pmt(p,r,n){const mo=r/100/12;return mo>0?p*mo/(1-Math.pow(1+mo,-n)):p/n}
const s={page:{minHeight:'100vh',background:'#0f1117',color:'#e2e8f0'},wrap:{maxWidth:860,margin:'0 auto',padding:'32px 16px 64px'},bc:{fontSize:13,color:'#64748b',marginBottom:12,display:'flex',gap:6,flexWrap:'wrap'},bcA:{color:'#64748b',textDecoration:'none'},h1:{fontSize:'clamp(22px,4vw,32px)',fontWeight:800,color:'#f1f5f9',margin:'0 0 8px'},sub:{fontSize:15,color:'#94a3b8',margin:'0 0 28px'},grid:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:20},card:{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:20},lbl:{fontSize:12,fontWeight:700,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:6,display:'block'},val:{fontSize:24,fontWeight:800,color:'#f0c842',margin:'0 0 10px'},sldr:{width:'100%',accentColor:'#f0c842'},box:{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:20,marginBottom:20},h2:{fontSize:18,fontWeight:700,color:'#f1f5f9',margin:'0 0 14px'},p:{fontSize:15,color:'#94a3b8',lineHeight:1.7,margin:'0 0 10px'},row:{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.05)'},tagA:{display:'inline-block',padding:'5px 12px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#94a3b8',textDecoration:'none',fontSize:12,margin:'0 6px 6px 0'},calcA:{display:'inline-block',padding:'8px 14px',background:'rgba(240,200,66,0.08)',border:'1px solid rgba(240,200,66,0.2)',borderRadius:8,color:'#f0c842',textDecoration:'none',fontSize:13,fontWeight:600,margin:'0 8px 8px 0'}}
export default function MortgagePriceClient({item:it,all}){
  const[price,setPrice]=useState(it.price)
  const[down,setDown]=useState(20)
  const[rate,setRate]=useState(7.0)
  const[term,setTerm]=useState(30)
  const loan=price*(1-down/100)
  const monthly=pmt(loan,rate,term*12)
  const total=monthly*term*12
  const interest=total-loan
  const income=Math.round(monthly/0.28*12)
  return(<div style={s.page}>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://freefincalc.net" },
          { "@type": "ListItem", "position": 2, "name": "Mortgage Calculator", "item": "https://freefincalc.net/mortgage-calculator" }
        ]
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Mortgage Calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "2847", "bestRating": "5", "worstRating": "1" }
      })}} /><Header/>
        <SchemaMarkup breadcrumbs={[
    { name: 'Home', url: 'https://freefincalc.net' },
    { name: 'Mortgage Calculator', url: 'https://freefincalc.net/mortgage-calculator' }
  ]} />
        <AdUnit slot="7405024590" /><div style={s.wrap}>
    <nav style={s.bc}><a href="/" style={s.bcA}>Home</a><span>›</span><a href="/mortgage-calculator" style={s.bcA}>Mortgage Calculator</a><span>›</span><span style={{color:'#94a3b8'}}>{fmt(price)} Home</span></nav>
    <h1 style={s.h1}>Mortgage Calculator: {fmt(price)} Home</h1>
    <p style={s.sub}>Calculate your exact monthly payment, total interest, and income needed for a {fmt(price)} home purchase.</p>
    <div style={s.grid}>
      <div style={s.card}><label style={s.lbl}>Home Price</label><div style={s.val}>{fmt(price)}</div><input type="number" value={price} onChange={e=>setPrice(+e.target.value)} style={s.sldr}/></div>
      <div style={s.card}><label style={s.lbl}>Down Payment</label><div style={s.val}>{down}% — {fmt(price*down/100)}</div><input type="number" value={down} onChange={e=>setDown(+e.target.value)} style={s.sldr}/></div>
      <div style={s.card}><label style={s.lbl}>Interest Rate</label><div style={s.val}>{rate}%</div><input type="number" value={rate} onChange={e=>setRate(+e.target.value)} style={s.sldr}/></div>
      <div style={s.card}><label style={s.lbl}>Loan Term</label><div style={s.val}>{term} years</div><input type="number" value={term} onChange={e=>setTerm(+e.target.value)} style={s.sldr}/></div>
    </div>
    <div style={s.box}>
      <h2 style={s.h2}>Payment Summary — {fmt(price)} Home</h2>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Monthly Payment (P+I)</span><span style={{fontWeight:800,color:'#f0c842',fontSize:20}}>{fmt(monthly)}/mo</span></div>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Loan Amount</span><span style={{fontWeight:700}}>{fmt(loan)}</span></div>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Total Interest Paid</span><span style={{fontWeight:700,color:'#ef4444'}}>{fmt(interest)}</span></div>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Total Cost of Home</span><span style={{fontWeight:700}}>{fmt(total+price*down/100)}</span></div>
      <div style={{...s.row,borderBottom:'none'}}><span style={{color:'#94a3b8'}}>Income Needed (28% rule)</span><span style={{fontWeight:700,color:'#10b981'}}>{fmt(income)}/yr</span></div>
    </div>
    <div style={s.box}>
      <h2 style={s.h2}>Quick Rate Comparison</h2>
      {[[6.0,30],[6.5,30],[7.0,30],[7.5,30],[6.5,15],[7.0,15]].map(([r,t])=>(<div key={r+'-'+t} style={s.row}><span style={{color:'#94a3b8'}}>{r}% / {t}-yr</span><span style={{fontWeight:700}}>{fmt(pmt(loan,r,t*12))}/mo</span></div>))}
    </div>
    <div style={s.box}><h2 style={s.h2}>Related Calculators</h2>{[['/mortgage-calculator','Mortgage Calculator'],['/home-affordability-calculator','Home Affordability'],['/down-payment-calculator','Down Payment'],['/refinance-calculator','Refinance Calculator'],['/rent-vs-buy-calculator','Rent vs Buy']].map(([href,lbl])=>(<a key={href} href={href} style={s.calcA}>{lbl}</a>))}</div>
    <div style={s.box}><h2 style={s.h2}>Mortgage Calculator by Home Price</h2>{all.filter(x=>x.slug!==it.slug).map(x=>(<a key={x.slug} href={'/mortgage-calculator/price/'+x.slug} style={s.tagA}>{x.name}</a>))}</div>
  </div><AdUnit slot="3248634657" />
      <Footer/></div>)
}