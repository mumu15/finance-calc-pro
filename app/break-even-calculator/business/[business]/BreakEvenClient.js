'use client'
import { useState } from 'react'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import AdUnit from '../../../../components/AdUnit';
import SchemaMarkup from '../../../../components/SchemaMarkup';
function fmt(n){return '$'+Math.round(n||0).toLocaleString('en-US')}
function fmtN(n){return Math.round(n||0).toLocaleString('en-US')}
const s={page:{minHeight:'100vh',background:'#0f1117',color:'#e2e8f0'},wrap:{maxWidth:860,margin:'0 auto',padding:'32px 16px 64px'},bc:{fontSize:13,color:'#64748b',marginBottom:12,display:'flex',gap:6,flexWrap:'wrap'},bcA:{color:'#64748b',textDecoration:'none'},h1:{fontSize:'clamp(22px,4vw,32px)',fontWeight:800,color:'#f1f5f9',margin:'0 0 8px'},sub:{fontSize:15,color:'#94a3b8',margin:'0 0 28px'},grid:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:20},card:{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:20},lbl:{fontSize:12,fontWeight:700,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:6,display:'block'},val:{fontSize:24,fontWeight:800,color:'#f0c842',margin:'0 0 10px'},sldr:{width:'100%',accentColor:'#f0c842'},box:{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:20,marginBottom:20},h2:{fontSize:18,fontWeight:700,color:'#f1f5f9',margin:'0 0 14px'},p:{fontSize:15,color:'#94a3b8',lineHeight:1.7,margin:'0 0 10px'},row:{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.05)'},tagA:{display:'inline-block',padding:'5px 12px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#94a3b8',textDecoration:'none',fontSize:12,margin:'0 6px 6px 0'},calcA:{display:'inline-block',padding:'8px 14px',background:'rgba(240,200,66,0.08)',border:'1px solid rgba(240,200,66,0.2)',borderRadius:8,color:'#f0c842',textDecoration:'none',fontSize:13,fontWeight:600,margin:'0 8px 8px 0'}}
export default function BreakEvenClient({item:it,all}){
  const[fixed,setFixed]=useState(it.fixed)
  const[price,setPrice]=useState(it.price)
  const[varPct,setVarPct]=useState(Math.round(it.varCost*100))
  const margin=price*(1-varPct/100)
  const beUnits=margin>0?Math.ceil(fixed/margin):Infinity
  const beRevenue=beUnits*price
  const profit1x=beRevenue*2-fixed-beRevenue*varPct/100
  return(<div style={s.page}><Header/>
        <SchemaMarkup breadcrumbs={[
    { name: 'Home', url: 'https://www.freefincalc.net' },
    { name: 'Break Even Calculator', url: 'https://www.freefincalc.net/break-even-calculator' }
  ]} />
        <AdUnit slot="7405024590" /><div style={s.wrap}>
    <nav style={s.bc}><a href="/" style={s.bcA}>Home</a><span>›</span><a href="/break-even-calculator" style={s.bcA}>Break-Even Calculator</a><span>›</span><span style={{color:'#94a3b8'}}>{it.name}</span></nav>
    <h1 style={s.h1}>Break-Even Calculator: {it.name}</h1>
    <p style={s.sub}>A {it.name.toLowerCase()} is {it.desc}. Find your break-even point in units and revenue.</p>
    <div style={s.grid}>
      <div style={s.card}><label style={s.lbl}>Monthly Fixed Costs</label><div style={s.val}>{fmt(fixed)}/mo</div><input type="range" value={fixed} onChange={e=>setFixed(+e.target.value)} className="calc-input"/></div>
      <div style={s.card}><label style={s.lbl}>Price per {it.unit}</label><div style={s.val}>{fmt(price)}</div><input type="range" value={price} onChange={e=>setPrice(+e.target.value)} className="calc-input"/></div>
      <div style={{...s.card,gridColumn:'span 2'}}><label style={s.lbl}>Variable Cost %</label><div style={s.val}>{varPct}% per {it.unit}</div><input type="range" value={varPct} onChange={e=>setVarPct(+e.target.value)} className="calc-input"/></div>
    </div>
    <div style={s.box}>
      <h2 style={s.h2}>Break-Even Analysis</h2>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Contribution Margin per {it.unit}</span><span style={{fontWeight:700}}>{fmt(margin)}</span></div>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Break-Even Units/Month</span><span style={{fontWeight:800,color:'#f0c842',fontSize:20}}>{beUnits===Infinity?'N/A':fmtN(beUnits)+' '+it.unit+'s'}</span></div>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Break-Even Revenue/Month</span><span style={{fontWeight:700,color:'#10b981'}}>{fmt(beRevenue)}</span></div>
      <div style={{...s.row,borderBottom:'none'}}><span style={{color:'#94a3b8'}}>Profit at 2x Break-Even</span><span style={{fontWeight:700}}>{fmt(profit1x)}/mo</span></div>
    </div>
    <div style={s.box}><h2 style={s.h2}>About {it.name} Break-Even</h2><p style={s.p}>A typical {it.name.toLowerCase()} has ~{fmt(it.fixed)}/month in fixed costs (rent, insurance, salaries) and variable costs of ~{Math.round(it.varCost*100)}% of revenue. At {fmt(it.price)} per {it.unit}, the contribution margin is {fmt(it.price*(1-it.varCost))} — so you need to sell <strong style={{color:'#f0c842'}}>{fmtN(Math.ceil(it.fixed/(it.price*(1-it.varCost))))} {it.unit}s/month</strong> just to cover costs. Every unit beyond that is pure profit.</p></div>
    <div style={s.box}><h2 style={s.h2}>Related Calculators</h2>{[['/break-even-calculator','Break-Even'],['/profit-margin-calculator','Profit Margin'],['/business-loan-calculator','Business Loan'],['/roi-calculator','ROI Calculator'],['/startup-cost-calculator','Startup Cost']].map(([href,lbl])=>(<a key={href} href={href} style={s.calcA}>{lbl}</a>))}</div>
    <div style={s.box}><h2 style={s.h2}>Break-Even by Business Type</h2>{all.filter(x=>x.slug!==it.slug).map(x=>(<a key={x.slug} href={'/break-even-calculator/business/'+x.slug} style={s.tagA}>{x.name}</a>))}</div>
  </div><AdUnit slot="3248634657" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Break Even Calculator","item":"https://www.freefincalc.net/break-even-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Break Even Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer/></div>)
}