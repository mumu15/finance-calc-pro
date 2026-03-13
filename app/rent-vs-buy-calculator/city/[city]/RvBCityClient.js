'use client'
import { useState } from 'react'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import AdUnit from '../../../../components/AdUnit';
import SchemaMarkup from '../../../../components/SchemaMarkup';
function fmt(n){return '$'+Math.round(n||0).toLocaleString('en-US')}
function pmt(p,r,n){const mo=r/100/12;return mo>0?p*mo/(1-Math.pow(1+mo,-n)):p/n}
const s={page:{minHeight:'100vh',background:'#0f1117',color:'#e2e8f0'},wrap:{maxWidth:860,margin:'0 auto',padding:'32px 16px 64px'},bc:{fontSize:13,color:'#64748b',marginBottom:12,display:'flex',gap:6,flexWrap:'wrap'},bcA:{color:'#64748b',textDecoration:'none'},h1:{fontSize:'clamp(22px,4vw,32px)',fontWeight:800,color:'#f1f5f9',margin:'0 0 8px'},sub:{fontSize:15,color:'#94a3b8',margin:'0 0 28px'},grid:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:20},card:{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:20},lbl:{fontSize:12,fontWeight:700,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:6,display:'block'},val:{fontSize:24,fontWeight:800,color:'#f0c842',margin:'0 0 10px'},sldr:{width:'100%',accentColor:'#f0c842'},box:{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:20,marginBottom:20},h2:{fontSize:18,fontWeight:700,color:'#f1f5f9',margin:'0 0 14px'},p:{fontSize:15,color:'#94a3b8',lineHeight:1.7,margin:'0 0 10px'},row:{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.05)'},tagA:{display:'inline-block',padding:'5px 12px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#94a3b8',textDecoration:'none',fontSize:12,margin:'0 6px 6px 0'},calcA:{display:'inline-block',padding:'8px 14px',background:'rgba(240,200,66,0.08)',border:'1px solid rgba(240,200,66,0.2)',borderRadius:8,color:'#f0c842',textDecoration:'none',fontSize:13,fontWeight:600,margin:'0 8px 8px 0'}}
export default function RvBCityClient({item:it,all}){
  const[home,setHome]=useState(it.medianHome)
  const[rent,setRent]=useState(it.medianRent)
  const[rate,setRate]=useState(7.0)
  const[years,setYears]=useState(7)
  const loan=home*0.80
  const monthly=pmt(loan,rate,360)
  const taxes=Math.round(home*0.012/12)
  const insurance=Math.round(home*0.005/12)
  const buyCost=monthly+taxes+insurance
  const rentTotal=rent*years*12*(1+0.03*years/2)
  const buyTotal=buyCost*years*12
  const equity=Math.round(home*Math.pow(1+it.appreciation/100,years)-loan*(Math.pow(1+(rate/100/12),years*12)-1)/(Math.pow(1+(rate/100/12),360)-1)*360/12*(years/30))
  const buyWins=buyTotal-equity<rentTotal
  return(<div style={s.page}><Header/>
        <SchemaMarkup breadcrumbs={[
    { name: 'Home', url: 'https://freefincalc.net' },
    { name: 'Rent vs Buy Calculator', url: 'https://freefincalc.net/rent-vs-buy-calculator' }
  ]} />
        <AdUnit slot="7405024590" /><div style={s.wrap}>
    <nav style={s.bc}><a href="/" style={s.bcA}>Home</a><span>›</span><a href="/rent-vs-buy-calculator" style={s.bcA}>Rent vs Buy</a><span>›</span><span style={{color:'#94a3b8'}}>{it.name}</span></nav>
    <h1 style={s.h1}>Rent vs Buy in {it.name} 2026</h1>
    <p style={s.sub}>Median home price: {fmt(it.medianHome)} | Median rent: {fmt(it.medianRent)}/mo | Appreciation: {it.appreciation}%/yr</p>
    <div style={s.grid}>
      <div style={s.card}><label style={s.lbl}>Home Price</label><div style={s.val}>{fmt(home)}</div><input type="number" value={home} onChange={e=>setHome(+e.target.value)} style={s.sldr}/></div>
      <div style={s.card}><label style={s.lbl}>Monthly Rent</label><div style={s.val}>{fmt(rent)}/mo</div><input type="number" value={rent} onChange={e=>setRent(+e.target.value)} style={s.sldr}/></div>
      <div style={s.card}><label style={s.lbl}>Mortgage Rate</label><div style={s.val}>{rate}%</div><input type="number" value={rate} onChange={e=>setRate(+e.target.value)} style={s.sldr}/></div>
      <div style={s.card}><label style={s.lbl}>How Long You Stay</label><div style={s.val}>{years} years</div><input type="number" value={years} onChange={e=>setYears(+e.target.value)} style={s.sldr}/></div>
    </div>
    <div style={s.box}>
      <h2 style={s.h2}>{years}-Year Comparison in {it.name}</h2>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Monthly Buy Cost (P+I+Tax+Ins)</span><span style={{fontWeight:700,color:'#f0c842'}}>{fmt(buyCost)}/mo</span></div>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Monthly Rent Cost</span><span style={{fontWeight:700}}>{fmt(rent)}/mo</span></div>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Total Buy Cost over {years} yrs</span><span style={{fontWeight:700}}>{fmt(buyTotal)}</span></div>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Total Rent Cost over {years} yrs</span><span style={{fontWeight:700}}>{fmt(rentTotal)}</span></div>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Estimated Equity Built</span><span style={{fontWeight:700,color:'#10b981'}}>+{fmt(equity)}</span></div>
      <div style={{...s.row,borderBottom:'none'}}><span style={{fontWeight:700}}>Verdict for {years} years in {it.name}</span><span style={{fontWeight:800,color:buyWins?'#10b981':'#f0c842'}}>{buyWins?'Buying wins':'Renting wins'}</span></div>
    </div>
    <div style={s.box}><h2 style={s.h2}>Related Calculators</h2>{[['/rent-vs-buy-calculator','Rent vs Buy'],['/mortgage-calculator','Mortgage Calculator'],['/home-affordability-calculator','Home Affordability'],['/down-payment-calculator','Down Payment'],['/moving-cost-calculator','Moving Cost']].map(([href,lbl])=>(<a key={href} href={href} style={s.calcA}>{lbl}</a>))}</div>
    <div style={s.box}><h2 style={s.h2}>Rent vs Buy by City</h2>{all.filter(x=>x.slug!==it.slug).map(x=>(<a key={x.slug} href={'/rent-vs-buy-calculator/city/'+x.slug} style={s.tagA}>{x.name}</a>))}</div>
  </div><AdUnit slot="3248634657" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://freefincalc.net"},{"@type":"ListItem","position":2,"name":"Rent vs Buy Calculator","item":"https://freefincalc.net/rent-vs-buy-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Rent vs Buy Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer/></div>)
}