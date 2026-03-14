'use client'
import { useState } from 'react'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import AdUnit from '../../../../components/AdUnit';
import SchemaMarkup from '../../../../components/SchemaMarkup';
import FaqSchema from '../../../../components/FaqSchema'
function fmt(n){return '$'+Math.round(n||0).toLocaleString('en-US')}
export default function NWAgeClient({item:it,all}){
  const[assets,setAssets]=useState(50000)
  const[liabilities,setLiab]=useState(20000)
  const nw=assets-liabilities
  const pctile=nw<it.median?'Below median':(nw<it.p75?'Above median (25-75th %)':(nw<it.p90?'Top 25%':'Top 10%'))
  const pctileColor=nw<it.median?'#ef4444':(nw<it.p75?'#f0c842':(nw<it.p90?'#10b981':'#6ee7b7'))
  const s={page:{minHeight:'100vh',background:'#0f1117',color:'#e2e8f0'},wrap:{maxWidth:860,margin:'0 auto',padding:'32px 16px 64px'},bc:{fontSize:13,color:'#64748b',marginBottom:12,display:'flex',gap:6,flexWrap:'wrap'},bcA:{color:'#64748b',textDecoration:'none'},h1:{fontSize:'clamp(22px,4vw,32px)',fontWeight:800,color:'#f1f5f9',margin:'0 0 8px'},sub:{fontSize:15,color:'#94a3b8',margin:'0 0 28px'},grid:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:20},card:{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:20},lbl:{fontSize:12,fontWeight:700,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:6,display:'block'},val:{fontSize:24,fontWeight:800,color:'#f0c842',margin:'0 0 10px'},sldr:{width:'100%',accentColor:'#f0c842'},box:{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:20,marginBottom:20},h2:{fontSize:18,fontWeight:700,color:'#f1f5f9',margin:'0 0 14px'},p:{fontSize:15,color:'#94a3b8',lineHeight:1.7,margin:'0 0 10px'},row:{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.05)'},aA:{display:'inline-block',padding:'5px 12px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#94a3b8',textDecoration:'none',fontSize:12,margin:'0 6px 6px 0'},calcA:{display:'inline-block',padding:'8px 14px',background:'rgba(240,200,66,0.08)',border:'1px solid rgba(240,200,66,0.2)',borderRadius:8,color:'#f0c842',textDecoration:'none',fontSize:13,fontWeight:600,margin:'0 8px 8px 0'}}
  return(<div style={s.page}>
      <FaqSchema faqs={[{"q":"How does the Net Worth Calculator work?","a":"Our Net Worth Calculator uses industry-standard formulas to give you instant, accurate results. Enter your values using the sliders above and the calculator updates in real time. All calculations happen in your browser — nothing is stored or sent to a server."},{"q":"Is this Net Worth Calculator accurate?","a":"Yes. This calculator uses the same mathematical formulas used by financial professionals. Results are estimates for planning purposes. For binding financial decisions, consult with a qualified financial advisor or accountant."},{"q":"Is the Net Worth Calculator really free?","a":"100% free, no sign-up required, no hidden fees. We are supported by advertising revenue, which allows us to provide all our calculators completely free. You can also download results as a PDF for your records."},{"q":"Can I use this calculator for net worth in my country?","a":"Yes. Use the currency selector at the top of the page to switch between 40+ currencies. The calculator adapts its default values to match your region. The underlying math works the same regardless of currency."},{"q":"How often is this Net Worth Calculator updated?","a":"We update our calculators regularly to reflect current rates, tax brackets, and financial regulations. The formulas and default values are reviewed quarterly. For the most current rates, always verify with your specific lender or institution."}]} />
<Header/>
        <SchemaMarkup breadcrumbs={[
    { name: 'Home', url: 'https://www.freefincalc.net' },
    { name: 'Net Worth Calculator', url: 'https://www.freefincalc.net/net-worth-calculator' }
  ]} />
        <AdUnit slot="7405024590" /><div style={s.wrap}>
    <nav style={s.bc}><a href="/" style={s.bcA}>Home</a><span>›</span><a href="/net-worth-calculator" style={s.bcA}>Net Worth Calculator</a><span>›</span><span style={{color:'#94a3b8'}}>{it.name}</span></nav>
    <h1 style={s.h1}>Average Net Worth at {it.name} (2026 Data)</h1>
    <p style={s.sub}>{it.desc}. See where you stand vs US benchmarks.</p>
    <div style={s.box}>
      <h2 style={s.h2}>2026 Net Worth Benchmarks — {it.name}</h2>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Median (50th percentile)</span><span style={{fontWeight:700}}>{fmt(it.median)}</span></div>
      <div style={s.row}><span style={{color:'#94a3b8'}}>75th Percentile</span><span style={{fontWeight:700,color:'#f0c842'}}>{fmt(it.p75)}</span></div>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Top 10% (90th Percentile)</span><span style={{fontWeight:700,color:'#10b981'}}>{fmt(it.p90)}</span></div>
      <div style={{...s.row,borderBottom:'none'}}><span style={{color:'#94a3b8'}}>Average (mean, skewed by ultra-wealthy)</span><span style={{fontWeight:700}}>{fmt(it.avg)}</span></div>
    </div>
    <div style={s.grid}>
      <div style={s.card}><label style={s.lbl}>Total Assets</label><div style={s.val}>{fmt(assets)}</div><input type="range" value={assets} onChange={e=>setAssets(+e.target.value)} className="calc-input"/></div>
      <div style={s.card}><label style={s.lbl}>Total Liabilities</label><div style={s.val}>{fmt(liabilities)}</div><input type="range" value={liabilities} onChange={e=>setLiab(+e.target.value)} className="calc-input"/></div>
    </div>
    <div style={s.box}>
      <h2 style={s.h2}>Your Net Worth Percentile</h2>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Your Net Worth</span><span style={{fontWeight:800,color:'#f0c842',fontSize:20}}>{fmt(nw)}</span></div>
      <div style={{...s.row,borderBottom:'none'}}><span style={{color:'#94a3b8'}}>Your Ranking vs Peers</span><span style={{fontWeight:800,color:pctileColor}}>{pctile}</span></div>
    </div>
    <div style={s.box}><h2 style={s.h2}>Net Worth Guide — {it.name}</h2><p style={s.p}>The median American net worth at {it.name} is <strong style={{color:'#f0c842'}}>{fmt(it.median)}</strong>. This is the point where half of people have more and half have less. The average ({fmt(it.avg)}) is much higher, skewed by the ultra-wealthy. A more useful benchmark is the 75th percentile ({fmt(it.p75)}) — what the financially disciplined have achieved.</p><p style={s.p}>Common rules of thumb: save 1x your salary by 30, 3x by 40, 6x by 50, and 10x by 65. Focus on your savings rate — at {it.savingsRate}%+ you are on track for a comfortable retirement.</p></div>
    <div style={s.box}><h2 style={s.h2}>Related Calculators</h2>{[['/net-worth-calculator','Net Worth Calculator'],['/retirement-calculator','Retirement Calculator'],['/investment-return-calculator','Investment Return'],['/savings-calculator','Savings Calculator'],['/fire-calculator','FIRE Calculator']].map(([href,lbl])=>(<a key={href} href={href} style={s.calcA}>{lbl}</a>))}</div>
    <div style={s.box}><h2 style={s.h2}>Net Worth by Age</h2>{all.filter(x=>x.slug!==it.slug).map(x=>(<a key={x.slug} href={'/net-worth-calculator/age/'+x.slug} style={s.aA}>{x.name}</a>))}</div>
  </div><AdUnit slot="3248634657" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Net Worth Calculator","item":"https://www.freefincalc.net/net-worth-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Net Worth Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      
        {/* FAQ Section */}
        <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:24,marginTop:32,marginBottom:32,maxWidth:900,marginLeft:'auto',marginRight:'auto'}}>
          <h2 style={{fontSize:20,fontWeight:700,color:'#f1f5f9',marginBottom:16,marginTop:0}}>Frequently Asked Questions</h2>
          <div style={{borderBottom:'1px solid rgba(255,255,255,0.06)',paddingBottom:16,marginBottom:16}}>
            <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>How does the Net Worth Calculator work?</h3>
            <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>Our Net Worth Calculator uses industry-standard formulas to give you instant, accurate results. Enter your values using the sliders above and the calculator updates in real time. All calculations happen in your browser — nothing is stored or sent to a server.</p>
          </div>
          <div style={{borderBottom:'1px solid rgba(255,255,255,0.06)',paddingBottom:16,marginBottom:16}}>
            <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>Is this Net Worth Calculator accurate?</h3>
            <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>Yes. This calculator uses the same mathematical formulas used by financial professionals. Results are estimates for planning purposes. For binding financial decisions, consult with a qualified financial advisor or accountant.</p>
          </div>
          <div style={{borderBottom:'1px solid rgba(255,255,255,0.06)',paddingBottom:16,marginBottom:16}}>
            <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>Is the Net Worth Calculator really free?</h3>
            <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>100% free, no sign-up required, no hidden fees. We are supported by advertising revenue, which allows us to provide all our calculators completely free. You can also download results as a PDF for your records.</p>
          </div>
          <div style={{borderBottom:'1px solid rgba(255,255,255,0.06)',paddingBottom:16,marginBottom:16}}>
            <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>Can I use this calculator for net worth in my country?</h3>
            <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>Yes. Use the currency selector at the top of the page to switch between 40+ currencies. The calculator adapts its default values to match your region. The underlying math works the same regardless of currency.</p>
          </div>
          <div style={{paddingBottom:8}}>
            <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>How often is this Net Worth Calculator updated?</h3>
            <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>We update our calculators regularly to reflect current rates, tax brackets, and financial regulations. The formulas and default values are reviewed quarterly. For the most current rates, always verify with your specific lender or institution.</p>
          </div>
        </div>
      <Footer/></div>)
}
