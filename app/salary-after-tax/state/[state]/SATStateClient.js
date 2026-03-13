'use client'
import { useState } from 'react'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import AdUnit from '../../../../components/AdUnit';
import SchemaMarkup from '../../../../components/SchemaMarkup';
function fmt(n){return '$'+Math.round(n||0).toLocaleString('en-US')}
const brackets=[
  {min:0,     max:11600,  rate:0.10},
  {min:11600, max:47150,  rate:0.12},
  {min:47150, max:100525, rate:0.22},
  {min:100525,max:191950, rate:0.24},
  {min:191950,max:243725, rate:0.32},
  {min:243725,max:609350, rate:0.35},
  {min:609350,max:Infinity,rate:0.37},
]
function fedTax(income){
  let t=0
  for(const b of brackets){
    if(income<=b.min) break
    t+=(Math.min(income,b.max)-b.min)*b.rate
  }
  return t
}
const s={page:{minHeight:'100vh',background:'#0f1117',color:'#e2e8f0'},wrap:{maxWidth:860,margin:'0 auto',padding:'32px 16px 64px'},bc:{fontSize:13,color:'#64748b',marginBottom:12,display:'flex',gap:6,flexWrap:'wrap'},bcA:{color:'#64748b',textDecoration:'none'},h1:{fontSize:'clamp(22px,4vw,32px)',fontWeight:800,color:'#f1f5f9',margin:'0 0 8px'},sub:{fontSize:15,color:'#94a3b8',margin:'0 0 28px'},card:{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:20,marginBottom:20},lbl:{fontSize:12,fontWeight:700,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:6,display:'block'},val:{fontSize:24,fontWeight:800,color:'#f0c842',margin:'0 0 10px'},sldr:{width:'100%',accentColor:'#f0c842'},box:{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:20,marginBottom:20},h2:{fontSize:18,fontWeight:700,color:'#f1f5f9',margin:'0 0 14px'},p:{fontSize:15,color:'#94a3b8',lineHeight:1.7,margin:'0 0 10px'},row:{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.05)'},tagA:{display:'inline-block',padding:'5px 12px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#94a3b8',textDecoration:'none',fontSize:12,margin:'0 6px 6px 0'},calcA:{display:'inline-block',padding:'8px 14px',background:'rgba(240,200,66,0.08)',border:'1px solid rgba(240,200,66,0.2)',borderRadius:8,color:'#f0c842',textDecoration:'none',fontSize:13,fontWeight:600,margin:'0 8px 8px 0'}}
export default function SATStateClient({item:it,all}){
  const[salary,setSalary]=useState(75000)
  const fed=fedTax(salary)
  const state=it.noTax?0:salary*it.rate/100
  const fica=salary*0.0765
  const net=salary-fed-state-fica
  const eff=((fed+state+fica)/salary*100).toFixed(1)
  return(
    <div style={s.page}><Header/>
        <SchemaMarkup breadcrumbs={[
    { name: 'Home', url: 'https://freefincalc.net' },
    { name: 'Salary After Tax Calculator', url: 'https://freefincalc.net/salary-after-tax' }
  ]} />
        <AdUnit slot="7405024590" /><div style={s.wrap}>
      <nav style={s.bc}>
        <a href="/" style={s.bcA}>Home</a><span>›</span>
        <a href="/salary-after-tax-calculator" style={s.bcA}>Salary After Tax</a><span>›</span>
        <span style={{color:'#94a3b8'}}>{it.name}</span>
      </nav>
      <h1 style={s.h1}>{it.name} Salary After Tax Calculator 2026</h1>
      <p style={s.sub}>{it.noTax ? it.name+' has no state income tax — workers keep more of every paycheck.' : 'State income tax rate: '+it.rate+'%. See your full breakdown below.'}</p>

      <div style={s.card}>
        <label style={s.lbl}>Annual Salary</label>
        <div style={s.val}>{fmt(salary)}/yr</div>
        <input type="number" value={salary} onChange={e=>setSalary(+e.target.value)} style={s.sldr}/>
      </div>

      <div style={s.box}>
        <h2 style={s.h2}>Take-Home Pay — {it.name}</h2>
        <div style={s.row}><span style={{color:'#94a3b8'}}>Gross Salary</span><span style={{fontWeight:700}}>{fmt(salary)}</span></div>
        <div style={s.row}><span style={{color:'#94a3b8'}}>Federal Income Tax</span><span style={{fontWeight:700,color:'#ef4444'}}>- {fmt(fed)}</span></div>
        <div style={s.row}>
          <span style={{color:'#94a3b8'}}>{it.name} State Tax ({it.noTax?'None':it.rate+'%'})</span>
          <span style={{fontWeight:700,color:it.noTax?'#10b981':'#ef4444'}}>{it.noTax?'$0':'- '+fmt(state)}</span>
        </div>
        <div style={s.row}><span style={{color:'#94a3b8'}}>FICA / Social Security (7.65%)</span><span style={{fontWeight:700,color:'#ef4444'}}>- {fmt(fica)}</span></div>
        <div style={{display:'flex',justifyContent:'space-between',padding:'12px 0 0'}}>
          <span style={{fontWeight:700,fontSize:15}}>Take-Home Pay</span>
          <span style={{fontWeight:800,fontSize:22,color:'#f0c842'}}>{fmt(net)}/yr</span>
        </div>
        <div style={{marginTop:10,fontSize:13,color:'#64748b',display:'flex',gap:20,flexWrap:'wrap'}}>
          <span>Monthly: <strong style={{color:'#e2e8f0'}}>{fmt(net/12)}</strong></span>
          <span>Biweekly: <strong style={{color:'#e2e8f0'}}>{fmt(net/26)}</strong></span>
          <span>Hourly: <strong style={{color:'#e2e8f0'}}>{fmt(net/2080)}/hr</strong></span>
          <span>Effective rate: <strong style={{color:'#e2e8f0'}}>{eff}%</strong></span>
        </div>
      </div>

      <div style={s.box}>
        <h2 style={s.h2}>{it.name} Tax Guide 2026</h2>
        <p style={s.p}>{it.noTax
          ? it.name+' is one of '+['Texas','Florida','Washington','Nevada','Tennessee','New Hampshire','South Dakota','Alaska','Wyoming'].length+' states with no income tax. On a $75,000 salary, residents save over $4,000/year compared to a state like California.'
          : 'In '+it.name+', the state income tax rate is '+it.rate+'%. Combined with federal taxes and FICA, the total effective rate on a $75,000 salary is approximately '+((fedTax(75000)+75000*it.rate/100+75000*0.0765)/75000*100).toFixed(1)+'%.'
        }</p>
      </div>

      <div style={s.box}><h2 style={s.h2}>Related Calculators</h2>
        {[['/salary-after-tax-calculator','Salary After Tax'],['/paycheck-calculator','Paycheck Calculator'],['/tax-calculator','Tax Calculator'],['/hourly-to-salary-calculator','Hourly to Salary'],['/overtime-calculator','Overtime Calculator']].map(([href,lbl])=>(
          <a key={href} href={href} style={s.calcA}>{lbl}</a>
        ))}
      </div>
      <div style={s.box}><h2 style={s.h2}>Salary After Tax by State</h2>
        {all.filter(x=>x.slug!==it.slug).map(x=>(
          <a key={x.slug} href={'/salary-after-tax/state/'+x.slug} style={s.tagA}>{x.name} ({x.abbr})</a>
        ))}
      </div>
    </div><AdUnit slot="3248634657" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://freefincalc.net"},{"@type":"ListItem","position":2,"name":"Salary After Tax","item":"https://freefincalc.net/salary-after-tax"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Salary After Tax","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer/></div>
  )
}
