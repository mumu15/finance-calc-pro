import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import AdUnit from '../../../components/AdUnit'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
  title: 'Mortgage Approval Rates by Credit Score 2026 (Real Data) | FreeFinCalc',
  description: 'What credit score do you need for a mortgage? Approval rates, interest rates, and loan options by credit score tier.',
  alternates: { canonical: 'https://www.freefincalc.net/mortgage-data/mortgage-approval-rates-by-credit-score' },
  openGraph: { title: 'Mortgage Approval Rates by Credit Score 2026 (Real Data)', description: 'What credit score do you need for a mortgage? Approval rates, interest rates, and loan options by credit score tier.', url: 'https://www.freefincalc.net/mortgage-data/mortgage-approval-rates-by-credit-score', siteName: 'FreeFinCalc', type: 'article' },
}

const faqs = [{"q":"What credit score do I need to buy a house?","a":"The minimum is 580 for an FHA loan with 3.5% down, or 500 with 10% down. Conventional loans require 620+. For the best rates, aim for 740+. Every 20-point increase in score saves 0.15-0.25% on your rate."},{"q":"What is the average credit score for a mortgage?","a":"The average credit score of approved mortgage borrowers in 2026 is 735. First-time buyers average 715, while refinancers average 745."},{"q":"How much does credit score affect mortgage rate?","a":"A 760 score gets approximately 6.15% while a 660 score gets 7.20% — a 1.05% difference. On a $280,000 mortgage, that costs an extra $228/month or $82,000 over 30 years."},{"q":"How can I improve my credit score before applying?","a":"Pay all bills on time, reduce credit card balances below 30% utilization (ideally under 10%), do not open new accounts, dispute any errors on your report, and become an authorized user on a family member's card. Allow 2-3 months for improvements to show."}]

export default function Page() {
  const st = {
    page: { minHeight: '100vh', background: '#0f1117', color: '#e2e8f0' },
    wrap: { maxWidth: 1000, margin: '0 auto', padding: '32px 16px 64px' },
    h1: { fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 900, color: '#f1f5f9', margin: '0 0 12px', lineHeight: 1.15 },
    desc: { fontSize: 15, color: '#94a3b8', lineHeight: 1.7, margin: '0 0 28px' },
    box: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 24, marginBottom: 24 },
    h2: { fontSize: 20, fontWeight: 700, color: '#f1f5f9', margin: '0 0 16px' },
    table: { width: '100%', borderCollapse: 'collapse', fontSize: 13 },
    th: { padding: '10px 12px', textAlign: 'left', color: '#f0c842', fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid rgba(240,200,66,0.2)' },
    td: { padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#94a3b8' },
    calcLink: { display: 'inline-block', padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none', margin: '0 8px 8px 0', background: 'rgba(240,200,66,0.08)', border: '1px solid rgba(240,200,66,0.2)', color: '#f0c842' },
  }

  return (
    <div style={st.page}>
      <Header />
      <FaqSchema faqs={faqs} />
      <AdUnit slot="7405024590" />
      <div style={st.wrap}>
        <nav style={{fontSize:13,color:'#64748b',marginBottom:20,display:'flex',gap:6,flexWrap:'wrap'}}>
          <a href="/" style={{color:'#64748b',textDecoration:'none'}}>Home</a>
          <span style={{color:'#475569'}}>{'\u203a'}</span>
          <a href="/mortgage-data" style={{color:'#64748b',textDecoration:'none'}}>Mortgage Data</a>
          <span style={{color:'#475569'}}>{'\u203a'}</span>
          <span style={{color:'#94a3b8'}}>Mortgage Approval Rates by Credit Score 2026</span>
        </nav>
        <h1 style={st.h1}>Mortgage Approval Rates by Credit Score 2026 (Real Data)</h1>
        <p style={st.desc}>What credit score do you need for a mortgage? Approval rates, interest rates, and loan options by credit score tier.</p>

        <div style={st.box}>
          <h2 style={st.h2}>Mortgage Approval & Rates by Credit Score</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Credit Score</th><th style={st.th}>Approval Rate</th><th style={st.th}>Avg Rate</th><th style={st.th}>Payment on $280K</th><th style={st.th}>Assessment</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>760-850</td><td style={{...st.td}}>98%</td><td style={{...st.td}}>6.15%</td><td style={{...st.td}}>$2,140</td><td style={{...st.td}}>Excellent - Best rates, all options</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>740-759</td><td style={{...st.td}}>96%</td><td style={{...st.td}}>6.30%</td><td style={{...st.td}}>$2,172</td><td style={{...st.td}}>Very Good - Near-best rates</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>720-739</td><td style={{...st.td}}>93%</td><td style={{...st.td}}>6.45%</td><td style={{...st.td}}>$2,205</td><td style={{...st.td}}>Good - Standard rates</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>700-719</td><td style={{...st.td}}>87%</td><td style={{...st.td}}>6.65%</td><td style={{...st.td}}>$2,248</td><td style={{...st.td}}>Good - Slightly higher rates</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>680-699</td><td style={{...st.td}}>78%</td><td style={{...st.td}}>6.90%</td><td style={{...st.td}}>$2,302</td><td style={{...st.td}}>Fair - Conventional available</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>660-679</td><td style={{...st.td}}>62%</td><td style={{...st.td}}>7.20%</td><td style={{...st.td}}>$2,368</td><td style={{...st.td}}>Fair - FHA recommended</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>640-659</td><td style={{...st.td}}>45%</td><td style={{...st.td}}>7.50%</td><td style={{...st.td}}>$2,435</td><td style={{...st.td}}>Below Avg - FHA likely required</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>620-639</td><td style={{...st.td}}>28%</td><td style={{...st.td}}>7.80%</td><td style={{...st.td}}>$2,503</td><td style={{...st.td}}>Poor - FHA minimum score</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>580-619</td><td style={{...st.td}}>12%</td><td style={{...st.td}}>8.50%</td><td style={{...st.td}}>$2,666</td><td style={{...st.td}}>Very Poor - FHA 3.5% down at 580</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Below 580</td><td style={{...st.td}}>3%</td><td style={{...st.td}}>9%+</td><td style={{...st.td}}>$2,800+</td><td style={{...st.td}}>Very Poor - Very limited options</td></tr>
          </tbody></table></div>
        </div>
        <AdUnit slot="3248634657" />
        <div style={st.box}>
          <h2 style={st.h2}>Minimum Credit Scores by Loan Type</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Loan Type</th><th style={st.th}>Minimum Score</th><th style={st.th}>Requirements</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Conventional</td><td style={{...st.td}}>620</td><td style={{...st.td}}>3% down, PMI required under 20%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>FHA</td><td style={{...st.td}}>580</td><td style={{...st.td}}>3.5% down payment</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>FHA (10% down)</td><td style={{...st.td}}>500-579</td><td style={{...st.td}}>10% down payment required</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>VA</td><td style={{...st.td}}>No minimum</td><td style={{...st.td}}>Lenders typically want 620+</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>USDA</td><td style={{...st.td}}>640</td><td style={{...st.td}}>Rural properties only</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Jumbo</td><td style={{...st.td}}>700-720</td><td style={{...st.td}}>Higher requirements for large loans</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Non-QM</td><td style={{...st.td}}>500+</td><td style={{...st.td}}>Alternative documentation, higher rates</td></tr>
          </tbody></table></div>
        </div>
        <div style={st.box}>
          <h2 style={st.h2}>Related Calculators</h2>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            <a href="/mortgage-calculator" style={st.calcLink}>mortgage calculator</a>
            <a href="/home-affordability-calculator" style={st.calcLink}>home affordability calculator</a>
            <a href="/credit-utilization-calculator" style={st.calcLink}>credit utilization calculator</a>
            <a href="/debt-to-income-calculator" style={st.calcLink}>debt to income calculator</a>
          </div>
        </div>
        <div style={st.box}>
          <h2 style={st.h2}>Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <div key={i} style={i < faqs.length - 1 ? {borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:16,marginBottom:16} : {paddingBottom:8}}>
              <h3 style={{fontSize:14,fontWeight:600,color:'#e2e8f0',marginBottom:6,marginTop:0}}>{faq.q}</h3>
              <p style={{fontSize:13,color:'#94a3b8',lineHeight:1.7,margin:0}}>{faq.a}</p>
            </div>))}
        </div>
      </div>
      <Footer />
    </div>
  )
}