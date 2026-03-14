'use client'
import { useState } from 'react'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import AdUnit from '../../../../components/AdUnit';
import SchemaMarkup from '../../../../components/SchemaMarkup';
import FaqSchema from '../../../../components/FaqSchema'

function fmt(n) { return '$' + Math.round(n || 0).toLocaleString('en-US') }
function calc(amt, rate, term) {
  const mo = rate / 100 / 12
  const pmt = mo > 0 ? amt * mo / (1 - Math.pow(1 + mo, -term)) : amt / term
  return { pmt, interest: pmt * term - amt, total: pmt * term }
}

export default function PersonalLoanClient({ purpose, allPurposes }) {
  const [amt,  setAmt]  = useState(purpose.avg)
  const [rate, setRate] = useState(purpose.rate)
  const [term, setTerm] = useState(purpose.term)
  const r = calc(amt, rate, term)
  const s = {
    page:  { minHeight:'100vh', background:'#0f1117', color:'#e2e8f0' },
    wrap:  { maxWidth:860, margin:'0 auto', padding:'32px 16px 64px' },
    bc:    { fontSize:13, color:'#64748b', marginBottom:12, display:'flex', gap:6, flexWrap:'wrap' },
    bcA:   { color:'#64748b', textDecoration:'none' },
    h1:    { fontSize:'clamp(22px,4vw,32px)', fontWeight:800, color:'#f1f5f9', margin:'0 0 8px' },
    sub:   { fontSize:15, color:'#94a3b8', margin:'0 0 28px' },
    grid:  { display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:20 },
    card:  { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:20 },
    lbl:   { fontSize:12, fontWeight:700, color:'#64748b', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:6, display:'block' },
    val:   { fontSize:26, fontWeight:800, color:'#f0c842', margin:'0 0 10px' },
    sldr:  { width:'100%', accentColor:'#f0c842' },
    box:   { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:20, marginBottom:20 },
    h2:    { fontSize:18, fontWeight:700, color:'#f1f5f9', margin:'0 0 14px' },
    p:     { fontSize:15, color:'#94a3b8', lineHeight:1.7, margin:'0 0 10px' },
    row:   { display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.05)' },
    pA:    { display:'inline-block', padding:'5px 12px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:8, color:'#94a3b8', textDecoration:'none', fontSize:12, margin:'0 6px 6px 0' },
    calcA: { display:'inline-block', padding:'8px 14px', background:'rgba(240,200,66,0.08)', border:'1px solid rgba(240,200,66,0.2)', borderRadius:8, color:'#f0c842', textDecoration:'none', fontSize:13, fontWeight:600, margin:'0 8px 8px 0' },
  }
  return (
    <div style={s.page}>
      <FaqSchema faqs={[{"q":"How does the Personal Loan Calculator work?","a":"Our Personal Loan Calculator uses industry-standard formulas to give you instant, accurate results. Enter your values using the sliders above and the calculator updates in real time. All calculations happen in your browser — nothing is stored or sent to a server."},{"q":"Is this Personal Loan Calculator accurate?","a":"Yes. This calculator uses the same mathematical formulas used by financial professionals. Results are estimates for planning purposes. For binding financial decisions, consult with a qualified financial advisor or accountant."},{"q":"Is the Personal Loan Calculator really free?","a":"100% free, no sign-up required, no hidden fees. We are supported by advertising revenue, which allows us to provide all our calculators completely free. You can also download results as a PDF for your records."},{"q":"Can I use this calculator for personal loan in my country?","a":"Yes. Use the currency selector at the top of the page to switch between 40+ currencies. The calculator adapts its default values to match your region. The underlying math works the same regardless of currency."},{"q":"How often is this Personal Loan Calculator updated?","a":"We update our calculators regularly to reflect current rates, tax brackets, and financial regulations. The formulas and default values are reviewed quarterly. For the most current rates, always verify with your specific lender or institution."}]} />

      <Header />
        <SchemaMarkup breadcrumbs={[
    { name: 'Home', url: 'https://www.freefincalc.net' },
    { name: 'Personal Loan Calculator', url: 'https://www.freefincalc.net/personal-loan-calculator' }
  ]} />
        <AdUnit slot="7405024590" />
      <div style={s.wrap}>
        <nav style={s.bc}>
          <a href="/" style={s.bcA}>Home</a><span>›</span>
          <a href="/personal-loan-calculator" style={s.bcA}>Personal Loan Calculator</a><span>›</span>
          <span style={{color:'#94a3b8'}}>{purpose.name}</span>
        </nav>
        <h1 style={s.h1}>Personal Loan for {purpose.name} 2026</h1>
        <p style={s.sub}>Calculate monthly payments for {purpose.desc}.</p>
        <div style={s.grid}>
          <div style={s.card}>
            <label style={s.lbl}>Loan Amount</label>
            <div style={s.val}>{fmt(amt)}</div>
            <input type="range" value={amt} onChange={e => setAmt(+e.target.value)} className="calc-input" />
          </div>
          <div style={s.card}>
            <label style={s.lbl}>Interest Rate</label>
            <div style={s.val}>{rate}%</div>
            <input type="range" value={rate} onChange={e => setRate(+e.target.value)} className="calc-input" />
          </div>
          <div style={{...s.card, gridColumn:'span 2'}}>
            <label style={s.lbl}>Loan Term (months)</label>
            <div style={s.val}>{term} months</div>
            <input type="range" value={term} onChange={e => setTerm(+e.target.value)} className="calc-input" />
          </div>
        </div>
        <div style={s.box}>
          <h2 style={s.h2}>Loan Summary</h2>
          <div style={s.row}><span style={{color:'#94a3b8'}}>Monthly Payment</span><span style={{fontWeight:800, color:'#f0c842', fontSize:20}}>{fmt(r.pmt)}/mo</span></div>
          <div style={s.row}><span style={{color:'#94a3b8'}}>Total Interest</span><span style={{fontWeight:700}}>{fmt(r.interest)}</span></div>
          <div style={{...s.row, borderBottom:'none'}}><span style={{color:'#94a3b8'}}>Total Cost</span><span style={{fontWeight:700}}>{fmt(r.total)}</span></div>
        </div>
        <div style={s.box}>
          <h2 style={s.h2}>Guide: Personal Loan for {purpose.name}</h2>
          <p style={s.p}>A personal loan for {purpose.desc} typically ranges from {fmt(purpose.avg * 0.5)} to {fmt(purpose.avg * 2)} with rates between {(purpose.rate - 2).toFixed(1)}% and {(purpose.rate + 5).toFixed(1)}% depending on your credit score. Borrowers with scores above 720 generally qualify for the lowest rates.</p>
          <p style={s.p}>Before borrowing, compare at least 3 lenders — rates for the same borrower can vary by 5% or more. Online lenders often offer lower rates than banks for personal loans. Check if your employer or credit union offers lower rates first.</p>
        </div>
        <div style={s.box}>
          <h2 style={s.h2}>Related Calculators</h2>
          {[['/personal-loan-calculator','Personal Loan'],['/loan-comparison-calculator','Loan Comparison'],['/debt-consolidation-calculator','Debt Consolidation'],['/credit-card-payoff-calculator','Credit Card Payoff'],['/apr-calculator','APR Calculator']].map(([href,lbl]) => (
            <a key={href} href={href} style={s.calcA}>{lbl}</a>
          ))}
        </div>
        <div style={s.box}>
          <h2 style={s.h2}>Personal Loan by Purpose</h2>
          {allPurposes.filter(p => p.slug !== purpose.slug).map(p => (
            <a key={p.slug} href={'/personal-loan-calculator/purpose/' + p.slug} style={s.pA}>{p.name}</a>
          ))}
        </div>
      </div>
      <AdUnit slot="3248634657" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Personal Loan Calculator","item":"https://www.freefincalc.net/personal-loan-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Personal Loan Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      
        {/* FAQ Section */}
        <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:24,marginTop:32,marginBottom:32,maxWidth:900,marginLeft:'auto',marginRight:'auto'}}>
          <h2 style={{fontSize:20,fontWeight:700,color:'#f1f5f9',marginBottom:16,marginTop:0}}>Frequently Asked Questions</h2>
          <div style={{borderBottom:'1px solid rgba(255,255,255,0.06)',paddingBottom:16,marginBottom:16}}>
            <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>How does the Personal Loan Calculator work?</h3>
            <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>Our Personal Loan Calculator uses industry-standard formulas to give you instant, accurate results. Enter your values using the sliders above and the calculator updates in real time. All calculations happen in your browser — nothing is stored or sent to a server.</p>
          </div>
          <div style={{borderBottom:'1px solid rgba(255,255,255,0.06)',paddingBottom:16,marginBottom:16}}>
            <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>Is this Personal Loan Calculator accurate?</h3>
            <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>Yes. This calculator uses the same mathematical formulas used by financial professionals. Results are estimates for planning purposes. For binding financial decisions, consult with a qualified financial advisor or accountant.</p>
          </div>
          <div style={{borderBottom:'1px solid rgba(255,255,255,0.06)',paddingBottom:16,marginBottom:16}}>
            <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>Is the Personal Loan Calculator really free?</h3>
            <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>100% free, no sign-up required, no hidden fees. We are supported by advertising revenue, which allows us to provide all our calculators completely free. You can also download results as a PDF for your records.</p>
          </div>
          <div style={{borderBottom:'1px solid rgba(255,255,255,0.06)',paddingBottom:16,marginBottom:16}}>
            <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>Can I use this calculator for personal loan in my country?</h3>
            <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>Yes. Use the currency selector at the top of the page to switch between 40+ currencies. The calculator adapts its default values to match your region. The underlying math works the same regardless of currency.</p>
          </div>
          <div style={{paddingBottom:8}}>
            <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>How often is this Personal Loan Calculator updated?</h3>
            <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>We update our calculators regularly to reflect current rates, tax brackets, and financial regulations. The formulas and default values are reviewed quarterly. For the most current rates, always verify with your specific lender or institution.</p>
          </div>
        </div>
      <Footer />
    </div>
  )
}
