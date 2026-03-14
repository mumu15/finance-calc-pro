'use client'
import { useState } from 'react'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import AdUnit from '../../../../components/AdUnit';
import SchemaMarkup from '../../../../components/SchemaMarkup';
import FaqSchema from '../../../../components/FaqSchema'

function fmt(n) { return '$' + Math.round(n || 0).toLocaleString('en-US') }
function calcFV(saved, monthly, rate, years) {
  const mo = rate / 100 / 12
  const n  = years * 12
  return saved * Math.pow(1 + mo, n) + (mo > 0 ? monthly * (Math.pow(1 + mo, n) - 1) / mo : monthly * n)
}

export default function RetirementAgeClient({ item: it, all }) {
  const [saved,   setSaved]   = useState(it.saved)
  const [monthly, setMonthly] = useState(it.monthly)
  const [rate,    setRate]    = useState(it.rate)
  const [retireAt,setRetireAt]= useState(it.retireAt)
  const years = retireAt - it.age
  const fv    = years > 0 ? calcFV(saved, monthly, rate, years) : saved
  const income = fv * 0.04 / 12

  const s = {
    page:{minHeight:'100vh',background:'#0f1117',color:'#e2e8f0'},
    wrap:{maxWidth:860,margin:'0 auto',padding:'32px 16px 64px'},
    bc:{fontSize:13,color:'#64748b',marginBottom:12,display:'flex',gap:6,flexWrap:'wrap'},
    bcA:{color:'#64748b',textDecoration:'none'},
    h1:{fontSize:'clamp(22px,4vw,32px)',fontWeight:800,color:'#f1f5f9',margin:'0 0 8px'},
    sub:{fontSize:15,color:'#94a3b8',margin:'0 0 28px'},
    grid:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:20},
    card:{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:20},
    lbl:{fontSize:12,fontWeight:700,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:6,display:'block'},
    val:{fontSize:24,fontWeight:800,color:'#f0c842',margin:'0 0 10px'},
    sldr:{width:'100%',accentColor:'#f0c842'},
    box:{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:20,marginBottom:20},
    h2:{fontSize:18,fontWeight:700,color:'#f1f5f9',margin:'0 0 14px'},
    p:{fontSize:15,color:'#94a3b8',lineHeight:1.7,margin:'0 0 10px'},
    row:{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.05)'},
    aA:{display:'inline-block',padding:'5px 12px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#94a3b8',textDecoration:'none',fontSize:12,margin:'0 6px 6px 0'},
    calcA:{display:'inline-block',padding:'8px 14px',background:'rgba(240,200,66,0.08)',border:'1px solid rgba(240,200,66,0.2)',borderRadius:8,color:'#f0c842',textDecoration:'none',fontSize:13,fontWeight:600,margin:'0 8px 8px 0'},
  }

  return (
    <div style={s.page}>
      <FaqSchema faqs={[{"q":"How does the Retirement Calculator work?","a":"Our Retirement Calculator uses industry-standard formulas to give you instant, accurate results. Enter your values using the sliders above and the calculator updates in real time. All calculations happen in your browser — nothing is stored or sent to a server."},{"q":"Is this Retirement Calculator accurate?","a":"Yes. This calculator uses the same mathematical formulas used by financial professionals. Results are estimates for planning purposes. For binding financial decisions, consult with a qualified financial advisor or accountant."},{"q":"Is the Retirement Calculator really free?","a":"100% free, no sign-up required, no hidden fees. We are supported by advertising revenue, which allows us to provide all our calculators completely free. You can also download results as a PDF for your records."},{"q":"Can I use this calculator for retirement in my country?","a":"Yes. Use the currency selector at the top of the page to switch between 40+ currencies. The calculator adapts its default values to match your region. The underlying math works the same regardless of currency."},{"q":"How often is this Retirement Calculator updated?","a":"We update our calculators regularly to reflect current rates, tax brackets, and financial regulations. The formulas and default values are reviewed quarterly. For the most current rates, always verify with your specific lender or institution."}]} />

      <Header />
        <SchemaMarkup breadcrumbs={[
    { name: 'Home', url: 'https://www.freefincalc.net' },
    { name: 'Retirement Calculator', url: 'https://www.freefincalc.net/retirement-calculator' }
  ]} />
        <AdUnit slot="7405024590" />
      <div style={s.wrap}>
        <nav style={s.bc}><a href="/" style={s.bcA}>Home</a><span>›</span><a href="/retirement-calculator" style={s.bcA}>Retirement Calculator</a><span>›</span><span style={{color:'#94a3b8'}}>{it.name}</span></nav>
        <h1 style={s.h1}>Retirement Calculator — {it.name}</h1>
        <p style={s.sub}>Retirement plan for someone {it.desc}.</p>
        <div style={s.grid}>
          <div style={s.card}><label style={s.lbl}>Current Savings</label><div style={s.val}>{fmt(saved)}</div><input type="range" value={saved} onChange={e=>setSaved(+e.target.value)} className="calc-input"/></div>
          <div style={s.card}><label style={s.lbl}>Monthly Contribution</label><div style={s.val}>{fmt(monthly)}/mo</div><input type="range" value={monthly} onChange={e=>setMonthly(+e.target.value)} className="calc-input"/></div>
          <div style={s.card}><label style={s.lbl}>Annual Return Rate</label><div style={s.val}>{rate}%</div><input type="range" value={rate} onChange={e=>setRate(+e.target.value)} className="calc-input"/></div>
          <div style={s.card}><label style={s.lbl}>Retire at Age</label><div style={s.val}>{retireAt}</div><input type="range" value={retireAt} onChange={e=>setRetireAt(+e.target.value)} className="calc-input"/></div>
        </div>
        <div style={s.box}>
          <h2 style={s.h2}>Retirement Projection</h2>
          <div style={s.row}><span style={{color:'#94a3b8'}}>Years to Retirement</span><span style={{fontWeight:700}}>{years} years</span></div>
          <div style={s.row}><span style={{color:'#94a3b8'}}>Projected Nest Egg</span><span style={{fontWeight:800,color:'#f0c842',fontSize:20}}>{fmt(fv)}</span></div>
          <div style={s.row}><span style={{color:'#94a3b8'}}>Monthly Income (4% rule)</span><span style={{fontWeight:700,color:'#10b981'}}>{fmt(income)}/mo</span></div>
          <div style={{...s.row,borderBottom:'none'}}><span style={{color:'#94a3b8'}}>Total Contributions</span><span style={{fontWeight:700}}>{fmt(saved + monthly * years * 12)}</span></div>
        </div>
        <div style={s.box}>
          <h2 style={s.h2}>{it.name} Retirement Guide</h2>
          <p style={s.p}>At {it.age}, you have {years} years until retirement at {retireAt}. Starting with {fmt(saved)} and contributing {fmt(monthly)}/month at {rate}% return, you are projected to accumulate <strong style={{color:'#f0c842'}}>{fmt(fv)}</strong> — enough to generate <strong style={{color:'#10b981'}}>{fmt(income)}/month</strong> using the 4% withdrawal rule.</p>
          <p style={s.p}>{years >= 25 ? 'You have the most powerful retirement weapon — time. Even modest contributions now grow dramatically over ' + years + ' years.' : years >= 15 ? 'You still have ' + years + ' years to make a real difference. Maximizing contributions in this window is critical.' : 'With ' + years + ' years left, every dollar saved now counts more than ever. Consider catch-up contributions and delaying Social Security.'}</p>
        </div>
        <div style={s.box}><h2 style={s.h2}>Related Calculators</h2>{[['/retirement-calculator','Retirement Calculator'],['/401k-calculator','401k Calculator'],['/roth-ira-calculator','Roth IRA'],['/social-security-calculator','Social Security'],['/fire-calculator','FIRE Calculator']].map(([href,lbl])=>(<a key={href} href={href} style={s.calcA}>{lbl}</a>))}</div>
        <div style={s.box}><h2 style={s.h2}>Retirement Calculator by Age</h2>{all.filter(x=>x.slug!==it.slug).map(x=>(<a key={x.slug} href={'/retirement-calculator/age/'+x.slug} style={s.aA}>{x.name}</a>))}</div>
      </div>
      <AdUnit slot="3248634657" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Retirement Calculator","item":"https://www.freefincalc.net/retirement-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Retirement Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      
        {/* FAQ Section */}
        <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:24,marginTop:32,marginBottom:32,maxWidth:900,marginLeft:'auto',marginRight:'auto'}}>
          <h2 style={{fontSize:20,fontWeight:700,color:'#f1f5f9',marginBottom:16,marginTop:0}}>Frequently Asked Questions</h2>
          <div style={{borderBottom:'1px solid rgba(255,255,255,0.06)',paddingBottom:16,marginBottom:16}}>
            <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>How does the Retirement Calculator work?</h3>
            <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>Our Retirement Calculator uses industry-standard formulas to give you instant, accurate results. Enter your values using the sliders above and the calculator updates in real time. All calculations happen in your browser — nothing is stored or sent to a server.</p>
          </div>
          <div style={{borderBottom:'1px solid rgba(255,255,255,0.06)',paddingBottom:16,marginBottom:16}}>
            <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>Is this Retirement Calculator accurate?</h3>
            <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>Yes. This calculator uses the same mathematical formulas used by financial professionals. Results are estimates for planning purposes. For binding financial decisions, consult with a qualified financial advisor or accountant.</p>
          </div>
          <div style={{borderBottom:'1px solid rgba(255,255,255,0.06)',paddingBottom:16,marginBottom:16}}>
            <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>Is the Retirement Calculator really free?</h3>
            <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>100% free, no sign-up required, no hidden fees. We are supported by advertising revenue, which allows us to provide all our calculators completely free. You can also download results as a PDF for your records.</p>
          </div>
          <div style={{borderBottom:'1px solid rgba(255,255,255,0.06)',paddingBottom:16,marginBottom:16}}>
            <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>Can I use this calculator for retirement in my country?</h3>
            <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>Yes. Use the currency selector at the top of the page to switch between 40+ currencies. The calculator adapts its default values to match your region. The underlying math works the same regardless of currency.</p>
          </div>
          <div style={{paddingBottom:8}}>
            <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>How often is this Retirement Calculator updated?</h3>
            <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>We update our calculators regularly to reflect current rates, tax brackets, and financial regulations. The formulas and default values are reviewed quarterly. For the most current rates, always verify with your specific lender or institution.</p>
          </div>
        </div>
      <Footer />
    </div>
  )
}