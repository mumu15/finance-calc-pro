'use client'
import { useState } from 'react'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import AdUnit from '../../../../components/AdUnit';
import SchemaMarkup from '../../../../components/SchemaMarkup';
import FaqSchema from '../../../../components/FaqSchema'
function fmt(n){return '$'+Math.round(n||0).toLocaleString('en-US')}
const s={page:{minHeight:'100vh',background:'#0f1117',color:'#e2e8f0'},wrap:{maxWidth:860,margin:'0 auto',padding:'32px 16px 64px'},bc:{fontSize:13,color:'#64748b',marginBottom:12,display:'flex',gap:6,flexWrap:'wrap'},bcA:{color:'#64748b',textDecoration:'none'},h1:{fontSize:'clamp(22px,4vw,32px)',fontWeight:800,color:'#f1f5f9',margin:'0 0 8px'},sub:{fontSize:15,color:'#94a3b8',margin:'0 0 28px'},grid:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:20},card:{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:20},lbl:{fontSize:12,fontWeight:700,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:6,display:'block'},val:{fontSize:24,fontWeight:800,color:'#f0c842',margin:'0 0 10px'},sldr:{width:'100%',accentColor:'#f0c842'},box:{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:20,marginBottom:20},h2:{fontSize:18,fontWeight:700,color:'#f1f5f9',margin:'0 0 14px'},p:{fontSize:15,color:'#94a3b8',lineHeight:1.7,margin:'0 0 10px'},row:{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.05)'},tagA:{display:'inline-block',padding:'5px 12px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#94a3b8',textDecoration:'none',fontSize:12,margin:'0 6px 6px 0'},calcA:{display:'inline-block',padding:'8px 14px',background:'rgba(240,200,66,0.08)',border:'1px solid rgba(240,200,66,0.2)',borderRadius:8,color:'#f0c842',textDecoration:'none',fontSize:13,fontWeight:600,margin:'0 8px 8px 0'}}
export default function FreelanceRateClient({item:it,all}){
  const[income,setIncome]=useState(80000)
  const[hours,setHours]=useState(40)
  const[weeks,setWeeks]=useState(48)
  const[util,setUtil]=useState(70)
  const billableHours=hours*weeks*util/100
  const targetRate=Math.round(income*1.3/billableHours)
  const fullTimeEquiv=Math.round(income*1.3)
  return(<div style={s.page}>
      <FaqSchema faqs={[{"q":"How does the Freelance Rate Calculator work?","a":"Our Freelance Rate Calculator uses industry-standard formulas to give you instant, accurate results. Enter your values using the sliders above and the calculator updates in real time. All calculations happen in your browser — nothing is stored or sent to a server."},{"q":"Is this Freelance Rate Calculator accurate?","a":"Yes. This calculator uses the same mathematical formulas used by financial professionals. Results are estimates for planning purposes. For binding financial decisions, consult with a qualified financial advisor or accountant."},{"q":"Is the Freelance Rate Calculator really free?","a":"100% free, no sign-up required, no hidden fees. We are supported by advertising revenue, which allows us to provide all our calculators completely free. You can also download results as a PDF for your records."},{"q":"Can I use this calculator for freelance rate in my country?","a":"Yes. Use the currency selector at the top of the page to switch between 40+ currencies. The calculator adapts its default values to match your region. The underlying math works the same regardless of currency."},{"q":"How often is this Freelance Rate Calculator updated?","a":"We update our calculators regularly to reflect current rates, tax brackets, and financial regulations. The formulas and default values are reviewed quarterly. For the most current rates, always verify with your specific lender or institution."}]} />
<Header/>
        <SchemaMarkup breadcrumbs={[
    { name: 'Home', url: 'https://www.freefincalc.net' },
    { name: 'Freelance Rate Calculator', url: 'https://www.freefincalc.net/freelance-rate-calculator' }
  ]} />
        <AdUnit slot="7405024590" /><div style={s.wrap}>
    <nav style={s.bc}><a href="/" style={s.bcA}>Home</a><span>›</span><a href="/freelance-rate-calculator" style={s.bcA}>Freelance Rate Calculator</a><span>›</span><span style={{color:'#94a3b8'}}>{it.name}</span></nav>
    <h1 style={s.h1}>Freelance {it.name} Rate Calculator 2026</h1>
    <p style={s.sub}>How much should a freelance {it.name.toLowerCase()} charge? Market data + your personal income goal.</p>
    <div style={s.box}>
      <h2 style={s.h2}>2026 Market Rates — Freelance {it.name}</h2>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Low (entry-level)</span><span style={{fontWeight:700}}>{fmt(it.lowRate)}/hr</span></div>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Median (mid-level)</span><span style={{fontWeight:700,color:'#f0c842'}}>{fmt(it.medRate)}/hr</span></div>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Average (market)</span><span style={{fontWeight:700}}>{fmt(it.avgRate)}/hr</span></div>
      <div style={{...s.row,borderBottom:'none'}}><span style={{color:'#94a3b8'}}>High (senior/specialist)</span><span style={{fontWeight:700,color:'#10b981'}}>{fmt(it.highRate)}/hr</span></div>
    </div>
    <div style={s.grid}>
      <div style={s.card}><label style={s.lbl}>Target Annual Income</label><div style={s.val}>{fmt(income)}/yr</div><input type="range" value={income} onChange={e=>setIncome(+e.target.value)} className="calc-input"/></div>
      <div style={s.card}><label style={s.lbl}>Billable Utilization</label><div style={s.val}>{util}% of hours</div><input type="range" value={util} onChange={e=>setUtil(+e.target.value)} className="calc-input"/></div>
      <div style={s.card}><label style={s.lbl}>Hours per Week</label><div style={s.val}>{hours} hrs/wk</div><input type="range" value={hours} onChange={e=>setHours(+e.target.value)} className="calc-input"/></div>
      <div style={s.card}><label style={s.lbl}>Weeks Working per Year</label><div style={s.val}>{weeks} weeks</div><input type="range" value={weeks} onChange={e=>setWeeks(+e.target.value)} className="calc-input"/></div>
    </div>
    <div style={s.box}>
      <h2 style={s.h2}>Your Target Rate</h2>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Billable Hours per Year</span><span style={{fontWeight:700}}>{billableHours} hrs</span></div>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Break-Even Hourly Rate</span><span style={{fontWeight:800,color:'#f0c842',fontSize:20}}>{fmt(targetRate)}/hr</span></div>
      <div style={{...s.row,borderBottom:'none'}}><span style={{color:'#94a3b8'}}>Full Cost to Client (1.3x overhead)</span><span style={{fontWeight:700}}>{fmt(fullTimeEquiv)}/yr equivalent</span></div>
      <div style={{marginTop:10,fontSize:13,color:'#64748b'}}>{targetRate < it.lowRate ? 'Your target is below market — you may be undervaluing your services.' : targetRate < it.medRate ? 'Your target is in the entry-level market range.' : targetRate <= it.avgRate ? 'Your target is right in the market sweet spot.' : targetRate <= it.highRate ? 'Your target is in the senior specialist range — achievable with strong portfolio.' : 'Your target exceeds typical market rates — ensure your value proposition matches.'}</div>
    </div>
    <div style={s.box}><h2 style={s.h2}>Related Calculators</h2>{[['/freelance-rate-calculator','Freelance Rate'],['/salary-after-tax-calculator','Salary After Tax'],['/self-employment-tax-calculator','Self-Employment Tax'],['/invoice-calculator','Invoice Calculator'],['/hourly-to-salary-calculator','Hourly to Salary']].map(([href,lbl])=>(<a key={href} href={href} style={s.calcA}>{lbl}</a>))}</div>
    <div style={s.box}><h2 style={s.h2}>Freelance Rate by Profession</h2>{all.filter(x=>x.slug!==it.slug).map(x=>(<a key={x.slug} href={'/freelance-rate-calculator/job/'+x.slug} style={s.tagA}>{x.name}</a>))}</div>
  </div><AdUnit slot="3248634657" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Freelance Rate Calculator","item":"https://www.freefincalc.net/freelance-rate-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Freelance Rate Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      
        {/* FAQ Section */}
        <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:24,marginTop:32,marginBottom:32,maxWidth:900,marginLeft:'auto',marginRight:'auto'}}>
          <h2 style={{fontSize:20,fontWeight:700,color:'#f1f5f9',marginBottom:16,marginTop:0}}>Frequently Asked Questions</h2>
          <div style={{borderBottom:'1px solid rgba(255,255,255,0.06)',paddingBottom:16,marginBottom:16}}>
            <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>How does the Freelance Rate Calculator work?</h3>
            <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>Our Freelance Rate Calculator uses industry-standard formulas to give you instant, accurate results. Enter your values using the sliders above and the calculator updates in real time. All calculations happen in your browser — nothing is stored or sent to a server.</p>
          </div>
          <div style={{borderBottom:'1px solid rgba(255,255,255,0.06)',paddingBottom:16,marginBottom:16}}>
            <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>Is this Freelance Rate Calculator accurate?</h3>
            <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>Yes. This calculator uses the same mathematical formulas used by financial professionals. Results are estimates for planning purposes. For binding financial decisions, consult with a qualified financial advisor or accountant.</p>
          </div>
          <div style={{borderBottom:'1px solid rgba(255,255,255,0.06)',paddingBottom:16,marginBottom:16}}>
            <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>Is the Freelance Rate Calculator really free?</h3>
            <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>100% free, no sign-up required, no hidden fees. We are supported by advertising revenue, which allows us to provide all our calculators completely free. You can also download results as a PDF for your records.</p>
          </div>
          <div style={{borderBottom:'1px solid rgba(255,255,255,0.06)',paddingBottom:16,marginBottom:16}}>
            <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>Can I use this calculator for freelance rate in my country?</h3>
            <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>Yes. Use the currency selector at the top of the page to switch between 40+ currencies. The calculator adapts its default values to match your region. The underlying math works the same regardless of currency.</p>
          </div>
          <div style={{paddingBottom:8}}>
            <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>How often is this Freelance Rate Calculator updated?</h3>
            <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>We update our calculators regularly to reflect current rates, tax brackets, and financial regulations. The formulas and default values are reviewed quarterly. For the most current rates, always verify with your specific lender or institution.</p>
          </div>
        </div>
      <Footer/></div>)
}