'use client'
import { useState } from 'react'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import AdUnit from '../../../../components/AdUnit';
import SchemaMarkup from '../../../../components/SchemaMarkup';

function fmt(n) { return '$' + Math.round(n || 0).toLocaleString('en-US') }

export default function BudgetCityClient({ item: c, all }) {
  const [rent,   setRent]   = useState(c.rent)
  const [food,   setFood]   = useState(c.food)
  const [trans,  setTrans]  = useState(c.transport)
  const [utils,  setUtils]  = useState(c.utilities)
  const [ent,    setEnt]    = useState(c.entertainment)
  const [misc,   setMisc]   = useState(c.misc)
  const total = rent + food + trans + utils + ent + misc

  const s = {
    page:{minHeight:'100vh',background:'#0f1117',color:'#e2e8f0'},
    wrap:{maxWidth:860,margin:'0 auto',padding:'32px 16px 64px'},
    bc:{fontSize:13,color:'#64748b',marginBottom:12,display:'flex',gap:6,flexWrap:'wrap'},
    bcA:{color:'#64748b',textDecoration:'none'},
    h1:{fontSize:'clamp(22px,4vw,32px)',fontWeight:800,color:'#f1f5f9',margin:'0 0 8px'},
    sub:{fontSize:15,color:'#94a3b8',margin:'0 0 28px'},
    box:{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:20,marginBottom:20},
    h2:{fontSize:18,fontWeight:700,color:'#f1f5f9',margin:'0 0 14px'},
    p:{fontSize:15,color:'#94a3b8',lineHeight:1.7,margin:'0 0 10px'},
    row:{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 0',borderBottom:'1px solid rgba(255,255,255,0.05)'},
    lbl:{fontSize:13,color:'#94a3b8'},
    val:{fontSize:14,fontWeight:700,color:'#e2e8f0',minWidth:70,textAlign:'right'},
    sldr:{width:'100%',accentColor:'#f0c842',marginTop:4},
    cA:{display:'inline-block',padding:'5px 12px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#94a3b8',textDecoration:'none',fontSize:12,margin:'0 6px 6px 0'},
    calcA:{display:'inline-block',padding:'8px 14px',background:'rgba(240,200,66,0.08)',border:'1px solid rgba(240,200,66,0.2)',borderRadius:8,color:'#f0c842',textDecoration:'none',fontSize:13,fontWeight:600,margin:'0 8px 8px 0'},
  }

  const cats = [
    {lbl:'Rent / Housing',    v:rent,  set:setRent,  max:6000},
    {lbl:'Food & Groceries',  v:food,  set:setFood,  max:2000},
    {lbl:'Transportation',    v:trans, set:setTrans, max:1000},
    {lbl:'Utilities',         v:utils, set:setUtils, max:600},
    {lbl:'Entertainment',     v:ent,   set:setEnt,   max:1000},
    {lbl:'Miscellaneous',     v:misc,  set:setMisc,  max:800},
  ]

  return (
    <div style={s.page}>
      <Header />
        <SchemaMarkup breadcrumbs={[
    { name: 'Home', url: 'https://www.freefincalc.net' },
    { name: 'Budget Calculator', url: 'https://www.freefincalc.net/budget-calculator' }
  ]} />
        <AdUnit slot="7405024590" />
      <div style={s.wrap}>
        <nav style={s.bc}><a href="/" style={s.bcA}>Home</a><span>›</span><a href="/budget-planner-calculator" style={s.bcA}>Budget Calculator</a><span>›</span><span style={{color:'#94a3b8'}}>{c.name}</span></nav>
        <h1 style={s.h1}>Cost of Living & Budget Calculator: {c.name} 2026</h1>
        <p style={s.sub}>Adjust the sliders to build your personal monthly budget for living in {c.name}.</p>

        <div style={s.box}>
          {cats.map(({lbl,v,set,max}) => (
            <div key={lbl} style={s.row}>
              <div style={{flex:1}}>
                <div style={{display:'flex',justifyContent:'space-between'}}><span style={s.lbl}>{lbl}</span><span style={s.val}>{fmt(v)}/mo</span></div>
                <input type="number" value={v} onChange={e=>set(+e.target.value)} className="calc-input"/>
              </div>
            </div>
          ))}
          <div style={{display:'flex',justifyContent:'space-between',padding:'12px 0 0'}}>
            <span style={{fontWeight:700,fontSize:15}}>Total Monthly Budget</span>
            <span style={{fontWeight:800,fontSize:22,color:'#f0c842'}}>{fmt(total)}/mo</span>
          </div>
          <div style={{marginTop:8,fontSize:13,color:'#64748b',display:'flex',gap:20,flexWrap:'wrap'}}>
            <span>Annual: <strong style={{color:'#e2e8f0'}}>{fmt(total*12)}</strong></span>
            <span>Income needed (50/30/20): <strong style={{color:'#e2e8f0'}}>{fmt(total/0.5)}/mo</strong></span>
          </div>
        </div>

        <div style={s.box}>
          <h2 style={s.h2}>Cost of Living in {c.name}</h2>
          <p style={s.p}>The average monthly cost of living in {c.name} is approximately <strong style={{color:'#f0c842'}}>{fmt(c.rent+c.food+c.transport+c.utilities+c.entertainment+c.misc)}/month</strong> before personal savings and debt payments. Rent is the dominant expense at {fmt(c.rent)}/month for a typical apartment. To live comfortably using the 50/30/20 rule (50% needs, 30% wants, 20% savings), you need a take-home income of at least <strong style={{color:'#e2e8f0'}}>{fmt((c.rent+c.food+c.transport+c.utilities)*2)}/month</strong>.</p>
        </div>

        <div style={s.box}><h2 style={s.h2}>Related Calculators</h2>{[['/budget-planner-calculator','Budget Planner'],['/cost-of-living-calculator','Cost of Living'],['/salary-after-tax-calculator','Salary After Tax'],['/savings-calculator','Savings Calculator'],['/net-worth-calculator','Net Worth']].map(([href,lbl])=>(<a key={href} href={href} style={s.calcA}>{lbl}</a>))}</div>
        <div style={s.box}><h2 style={s.h2}>Budget Calculator by City</h2>{all.filter(x=>x.slug!==c.slug).map(x=>(<a key={x.slug} href={'/budget-calculator/city/'+x.slug} style={s.cA}>{x.name}</a>))}</div>
      </div>
      <AdUnit slot="3248634657" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Budget Calculator","item":"https://www.freefincalc.net/budget-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Budget Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </div>
  )
}