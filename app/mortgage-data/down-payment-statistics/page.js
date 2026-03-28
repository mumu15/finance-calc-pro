import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import AdUnit from '../../../components/AdUnit'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
  title: 'Down Payment Statistics 2026: Average Down Payment by State & Age | FreeFinCalc',
  description: 'Real data on how much Americans put down on homes. Average down payment by state, age group, buyer type, and loan program.',
  alternates: { canonical: 'https://www.freefincalc.net/mortgage-data/down-payment-statistics' },
  openGraph: { title: 'Down Payment Statistics 2026: Average Down Payment by State & Age', description: 'Real data on how much Americans put down on homes. Average down payment by state, age group, buyer type, and loan program.', url: 'https://www.freefincalc.net/mortgage-data/down-payment-statistics', siteName: 'FreeFinCalc', type: 'article' },
}

const faqs = [{"q":"What is the average down payment on a house?","a":"The average down payment is 14.1% of the purchase price. First-time buyers average 8.2%, while repeat buyers average 19.4%. You do not need 20% down to buy a home."},{"q":"Can I buy a house with 3% down?","a":"Yes. Conventional loans allow 3% down for first-time buyers. FHA loans require 3.5% down. VA and USDA loans offer 0% down for eligible borrowers. Lower down payments mean PMI costs of $100-$300/month."},{"q":"How long does it take to save for a down payment?","a":"Saving 10% down on a $350,000 home ($35,000) takes the average household (saving $800/month) about 3.6 years. Saving 20% ($70,000) takes about 7.3 years at the same rate."},{"q":"Is 20% down still necessary?","a":"No. Only 32% of buyers put 20%+ down. The main advantage of 20% is avoiding PMI ($100-$300/month). Many buyers choose lower down payments to buy sooner and invest the difference."}]

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
          <span style={{color:'#94a3b8'}}>Down Payment Statistics 2026</span>
        </nav>
        <h1 style={st.h1}>Down Payment Statistics 2026: Average Down Payment by State & Age</h1>
        <p style={st.desc}>Real data on how much Americans put down on homes. Average down payment by state, age group, buyer type, and loan program.</p>

        <div style={st.box}>
          <h2 style={st.h2}>Average Down Payment by Buyer Type</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Buyer Type</th><th style={st.th}>Avg Down Payment %</th><th style={st.th}>Dollar Amount</th><th style={st.th}>On Median Home</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>All Buyers</td><td style={{...st.td}}>14.1%</td><td style={{...st.td}}>$49,350</td><td style={{...st.td}}>$350,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>First-Time Buyers</td><td style={{...st.td}}>8.2%</td><td style={{...st.td}}>$28,700</td><td style={{...st.td}}>$350,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Repeat Buyers</td><td style={{...st.td}}>19.4%</td><td style={{...st.td}}>$67,900</td><td style={{...st.td}}>$350,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>FHA Borrowers</td><td style={{...st.td}}>3.5%</td><td style={{...st.td}}>$12,250</td><td style={{...st.td}}>$350,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>VA Borrowers</td><td style={{...st.td}}>0%</td><td style={{...st.td}}>$0</td><td style={{...st.td}}>$350,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Conventional (PMI)</td><td style={{...st.td}}>5-19%</td><td style={{...st.td}}>$17,500-$66,500</td><td style={{...st.td}}>$350,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Conventional (No PMI)</td><td style={{...st.td}}>20%+</td><td style={{...st.td}}>$70,000+</td><td style={{...st.td}}>$350,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Jumbo Loan Buyers</td><td style={{...st.td}}>25-30%</td><td style={{...st.td}}>$191,000-$229,000</td><td style={{...st.td}}>$766,000</td></tr>
          </tbody></table></div>
        </div>
        <AdUnit slot="3248634657" />
        <div style={st.box}>
          <h2 style={st.h2}>Average Down Payment by Age Group</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Age Group</th><th style={st.th}>Avg Down %</th><th style={st.th}>Dollar Amount</th><th style={st.th}>Notes</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>22-31 (Gen Z)</td><td style={{...st.td}}>8%</td><td style={{...st.td}}>$28,000</td><td style={{...st.td}}>First-time buyers</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>32-41 (Millennials)</td><td style={{...st.td}}>10%</td><td style={{...st.td}}>$35,000</td><td style={{...st.td}}>Mix of first/repeat</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>42-56 (Gen X)</td><td style={{...st.td}}>15%</td><td style={{...st.td}}>$52,500</td><td style={{...st.td}}>More equity from prior home</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>57-66 (Boomers)</td><td style={{...st.td}}>22%</td><td style={{...st.td}}>$77,000</td><td style={{...st.td}}>Downsizing, cash-rich</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>67-76 (Silent)</td><td style={{...st.td}}>28%</td><td style={{...st.td}}>$98,000</td><td style={{...st.td}}>Often all-cash purchases</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>All Cash Buyers</td><td style={{...st.td}}>100%</td><td style={{...st.td}}>$350,000</td><td style={{...st.td}}>26% of all purchases</td></tr>
          </tbody></table></div>
        </div>
        <div style={st.box}>
          <h2 style={st.h2}>Down Payment Sources</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Source</th><th style={st.th}>% of Buyers Using</th><th style={st.th}>Notes</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Personal Savings</td><td style={{...st.td}}>61%</td><td style={{...st.td}}>Most common source</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Sale of Previous Home</td><td style={{...st.td}}>38%</td><td style={{...st.td}}>Repeat buyers</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Gift from Family</td><td style={{...st.td}}>23%</td><td style={{...st.td}}>Common for first-timers</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>401k/IRA Withdrawal</td><td style={{...st.td}}>8%</td><td style={{...st.td}}>Penalty may apply</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Down Payment Assistance</td><td style={{...st.td}}>5%</td><td style={{...st.td}}>State/local programs</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Loan from Family</td><td style={{...st.td}}>4%</td><td style={{...st.td}}>Must be disclosed</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Second Mortgage/HELOC</td><td style={{...st.td}}>3%</td><td style={{...st.td}}>Piggyback loans</td></tr>
          </tbody></table></div>
        </div>
        <div style={st.box}>
          <h2 style={st.h2}>Related Calculators</h2>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            <a href="/down-payment-calculator" style={st.calcLink}>down payment calculator</a>
            <a href="/mortgage-calculator" style={st.calcLink}>mortgage calculator</a>
            <a href="/home-affordability-calculator" style={st.calcLink}>home affordability calculator</a>
            <a href="/savings-goal-calculator" style={st.calcLink}>savings goal calculator</a>
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