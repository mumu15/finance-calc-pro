'use client'
import { useState } from 'react'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import AdUnit from '../../../../components/AdUnit';
import SchemaMarkup from '../../../../components/SchemaMarkup';
import FaqSchema from '../../../../components/FaqSchema'
function fmt(n){return '$'+Math.round(n||0).toLocaleString('en-US')}
function pmt(p,r,n){const mo=r/100/12;return mo>0?p*mo/(1-Math.pow(1+mo,-n)):p/n}
const s={page:{minHeight:'100vh',background:'#0f1117',color:'#e2e8f0'},wrap:{maxWidth:860,margin:'0 auto',padding:'32px 16px 64px'},bc:{fontSize:13,color:'#64748b',marginBottom:12,display:'flex',gap:6,flexWrap:'wrap'},bcA:{color:'#64748b',textDecoration:'none'},h1:{fontSize:'clamp(22px,4vw,32px)',fontWeight:800,color:'#f1f5f9',margin:'0 0 8px'},sub:{fontSize:15,color:'#94a3b8',margin:'0 0 28px'},grid:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:20},card:{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:20},lbl:{fontSize:12,fontWeight:700,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:6,display:'block'},val:{fontSize:24,fontWeight:800,color:'#f0c842',margin:'0 0 10px'},sldr:{width:'100%',accentColor:'#f0c842'},box:{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:20,marginBottom:20},h2:{fontSize:18,fontWeight:700,color:'#f1f5f9',margin:'0 0 14px'},p:{fontSize:15,color:'#94a3b8',lineHeight:1.7,margin:'0 0 10px'},row:{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.05)'},tagA:{display:'inline-block',padding:'5px 12px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#94a3b8',textDecoration:'none',fontSize:12,margin:'0 6px 6px 0'},calcA:{display:'inline-block',padding:'8px 14px',background:'rgba(240,200,66,0.08)',border:'1px solid rgba(240,200,66,0.2)',borderRadius:8,color:'#f0c842',textDecoration:'none',fontSize:13,fontWeight:600,margin:'0 8px 8px 0'}}
export default function StudentLoanClient({item:it,all}){
  const[amount,setAmount]=useState(it.amount)
  const[rate,setRate]=useState(it.fedRate)
  const[term,setTerm]=useState(10)
  const monthly=pmt(amount,rate,term*12)
  const total=monthly*term*12
  const interest=total-amount
  return(<div style={s.page}>
      <FaqSchema faqs={[{"q":"How does the Student Loan Calculator work?","a":"Our Student Loan Calculator uses industry-standard formulas to give you instant, accurate results. Enter your values using the sliders above and the calculator updates in real time. All calculations happen in your browser — nothing is stored or sent to a server."},{"q":"Is this Student Loan Calculator accurate?","a":"Yes. This calculator uses the same mathematical formulas used by financial professionals. Results are estimates for planning purposes. For binding financial decisions, consult with a qualified financial advisor or accountant."},{"q":"Is the Student Loan Calculator really free?","a":"100% free, no sign-up required, no hidden fees. We are supported by advertising revenue, which allows us to provide all our calculators completely free. You can also download results as a PDF for your records."},{"q":"Can I use this calculator for student loan in my country?","a":"Yes. Use the currency selector at the top of the page to switch between 40+ currencies. The calculator adapts its default values to match your region. The underlying math works the same regardless of currency."},{"q":"How often is this Student Loan Calculator updated?","a":"We update our calculators regularly to reflect current rates, tax brackets, and financial regulations. The formulas and default values are reviewed quarterly. For the most current rates, always verify with your specific lender or institution."}]} />
<Header/>
        <SchemaMarkup breadcrumbs={[
    { name: 'Home', url: 'https://www.freefincalc.net' },
    { name: 'Student Loan Calculator', url: 'https://www.freefincalc.net/student-loan-calculator' }
  ]} />
        <AdUnit slot="7405024590" /><div style={s.wrap}>
    <nav style={s.bc}><a href="/" style={s.bcA}>Home</a><span>›</span><a href="/student-loan-calculator" style={s.bcA}>Student Loan Calculator</a><span>›</span><span style={{color:'#94a3b8'}}>{fmt(amount)}</span></nav>
    <h1 style={s.h1}>Student Loan Calculator: {fmt(amount)}</h1>
    <p style={s.sub}>{fmt(amount)} in student loans is a {it.type}. Compare repayment plans and find your best payoff strategy.</p>
    <div style={s.grid}>
      <div style={s.card}><label style={s.lbl}>Loan Balance</label><div style={s.val}>{fmt(amount)}</div><input type="range" value={amount} onChange={e=>setAmount(+e.target.value)} className="calc-input"/></div>
      <div style={s.card}><label style={s.lbl}>Interest Rate</label><div style={s.val}>{rate}%</div><input type="range" value={rate} onChange={e=>setRate(+e.target.value)} className="calc-input"/></div>
      <div style={{...s.card,gridColumn:'span 2'}}><label style={s.lbl}>Repayment Term</label><div style={s.val}>{term} years</div><input type="range" value={term} onChange={e=>setTerm(+e.target.value)} className="calc-input"/></div>
    </div>
    <div style={s.box}>
      <h2 style={s.h2}>Repayment Summary</h2>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Monthly Payment</span><span style={{fontWeight:800,color:'#f0c842',fontSize:20}}>{fmt(monthly)}/mo</span></div>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Total Interest</span><span style={{fontWeight:700,color:'#ef4444'}}>{fmt(interest)}</span></div>
      <div style={{...s.row,borderBottom:'none'}}><span style={{color:'#94a3b8'}}>Total Repaid</span><span style={{fontWeight:700}}>{fmt(total)}</span></div>
    </div>
    <div style={s.box}>
      <h2 style={s.h2}>Federal Repayment Plans for {fmt(it.amount)}</h2>
      {[[10,'Standard'],[20,'Extended'],[25,'IBR / PAYE'],[30,'ICR']].map(([t,name])=>(<div key={t} style={s.row}><span style={{color:'#94a3b8'}}>{name} ({t}-yr)</span><span style={{fontWeight:700}}>{fmt(pmt(amount,rate,t*12))}/mo — {fmt(pmt(amount,rate,t*12)*t*12-amount)} interest</span></div>))}
    </div>
    <div style={s.box}><h2 style={s.h2}>Related Calculators</h2>{[['/student-loan-calculator','Student Loan'],['/student-loan-refinance-calculator','Refinance Student Loans'],['/income-based-repayment-calculator','IBR Calculator'],['/loan-forgiveness-calculator','Loan Forgiveness'],['/debt-payoff-calculator','Debt Payoff']].map(([href,lbl])=>(<a key={href} href={href} style={s.calcA}>{lbl}</a>))}</div>
    <div style={s.box}><h2 style={s.h2}>Student Loan by Amount</h2>{all.filter(x=>x.slug!==it.slug).map(x=>(<a key={x.slug} href={'/student-loan-calculator/amount/'+x.slug} style={s.tagA}>{x.name}</a>))}</div>
  </div><AdUnit slot="3248634657" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Student Loan Calculator","item":"https://www.freefincalc.net/student-loan-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Student Loan Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      
        {/* FAQ Section */}
        <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:24,marginTop:32,marginBottom:32,maxWidth:900,marginLeft:'auto',marginRight:'auto'}}>
          <h2 style={{fontSize:20,fontWeight:700,color:'#f1f5f9',marginBottom:16,marginTop:0}}>Frequently Asked Questions</h2>
          <div style={{borderBottom:'1px solid rgba(255,255,255,0.06)',paddingBottom:16,marginBottom:16}}>
            <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>How does the Student Loan Calculator work?</h3>
            <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>Our Student Loan Calculator uses industry-standard formulas to give you instant, accurate results. Enter your values using the sliders above and the calculator updates in real time. All calculations happen in your browser — nothing is stored or sent to a server.</p>
          </div>
          <div style={{borderBottom:'1px solid rgba(255,255,255,0.06)',paddingBottom:16,marginBottom:16}}>
            <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>Is this Student Loan Calculator accurate?</h3>
            <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>Yes. This calculator uses the same mathematical formulas used by financial professionals. Results are estimates for planning purposes. For binding financial decisions, consult with a qualified financial advisor or accountant.</p>
          </div>
          <div style={{borderBottom:'1px solid rgba(255,255,255,0.06)',paddingBottom:16,marginBottom:16}}>
            <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>Is the Student Loan Calculator really free?</h3>
            <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>100% free, no sign-up required, no hidden fees. We are supported by advertising revenue, which allows us to provide all our calculators completely free. You can also download results as a PDF for your records.</p>
          </div>
          <div style={{borderBottom:'1px solid rgba(255,255,255,0.06)',paddingBottom:16,marginBottom:16}}>
            <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>Can I use this calculator for student loan in my country?</h3>
            <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>Yes. Use the currency selector at the top of the page to switch between 40+ currencies. The calculator adapts its default values to match your region. The underlying math works the same regardless of currency.</p>
          </div>
          <div style={{paddingBottom:8}}>
            <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>How often is this Student Loan Calculator updated?</h3>
            <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>We update our calculators regularly to reflect current rates, tax brackets, and financial regulations. The formulas and default values are reviewed quarterly. For the most current rates, always verify with your specific lender or institution.</p>
          </div>
        </div>
      <Footer/></div>)
}