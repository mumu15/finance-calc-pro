import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import AdUnit from '../../../components/AdUnit'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
  title: 'Credit Card Debt Statistics 2026: Total US Debt, Payments and Trends | FreeFinCalc',
  description: 'Complete credit card debt data for the US. Total outstanding debt, average payments, minimum payment traps, and industry trends.',
  alternates: { canonical: 'https://www.freefincalc.net/credit-card-data/credit-card-debt-statistics' },
  openGraph: { title: 'Credit Card Debt Statistics 2026: Total US Debt, Payments and Trends', description: 'Complete credit card debt data for the US. Total outstanding debt, average payments, minimum payment traps, and industry trends.', url: 'https://www.freefincalc.net/credit-card-data/credit-card-debt-statistics', siteName: 'FreeFinCalc', type: 'article' },
}

const faqs = [{"q":"How much credit card debt does America have?","a":"Total US credit card debt is $1.14 trillion in 2026, a record high. This is spread across 576 million active credit card accounts held by 196 million Americans."},{"q":"What happens if I only pay the minimum?","a":"A $10,000 balance at 20% APR with minimum payments takes 19 years to pay off and costs $21,600 total — more than double the original balance. Always pay more than the minimum."},{"q":"What is the average credit card payment?","a":"The average monthly credit card payment is $225 across all cardholders. The average minimum payment is about $110 per card with a balance."}]

export default function Page() {
  const st = {
    page:{minHeight:'100vh',background:'#0f1117',color:'#e2e8f0'},
    wrap:{maxWidth:1000,margin:'0 auto',padding:'32px 16px 64px'},
    h1:{fontSize:'clamp(24px,4vw,38px)',fontWeight:900,color:'#f1f5f9',margin:'0 0 12px',lineHeight:1.15},
    desc:{fontSize:15,color:'#94a3b8',lineHeight:1.7,margin:'0 0 28px'},
    box:{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:16,padding:24,marginBottom:24},
    h2:{fontSize:20,fontWeight:700,color:'#f1f5f9',margin:'0 0 16px'},
    table:{width:'100%',borderCollapse:'collapse',fontSize:13},
    th:{padding:'10px 12px',textAlign:'left',color:'#ef4444',fontWeight:700,fontSize:11,textTransform:'uppercase',letterSpacing:'0.05em',borderBottom:'2px solid rgba(239,68,68,0.2)'},
    td:{padding:'10px 12px',borderBottom:'1px solid rgba(255,255,255,0.05)',color:'#94a3b8'},
    calcLink:{display:'inline-block',padding:'8px 16px',borderRadius:8,fontSize:13,fontWeight:600,textDecoration:'none',margin:'0 8px 8px 0',background:'rgba(239,68,68,0.08)',border:'1px solid rgba(239,68,68,0.2)',color:'#ef4444'},
  }
  return (
    <div style={st.page}>
      <Header />
      <FaqSchema faqs={faqs} />
      <AdUnit slot="7405024590" />
      <div style={st.wrap}>
        <nav style={{fontSize:13,color:'#64748b',marginBottom:20,display:'flex',gap:6,flexWrap:'wrap'}}><a href="/" style={{color:'#64748b',textDecoration:'none'}}>Home</a><span style={{color:'#475569'}}>{'\u203a'}</span><a href="/credit-card-data" style={{color:'#64748b',textDecoration:'none'}}>Credit Card Data</a><span style={{color:'#475569'}}>{'\u203a'}</span><span style={{color:'#94a3b8'}}>Credit Card Debt Statistics 2026</span></nav>
        <h1 style={st.h1}>Credit Card Debt Statistics 2026: Total US Debt, Payments and Trends</h1>
        <p style={st.desc}>Complete credit card debt data for the US. Total outstanding debt, average payments, minimum payment traps, and industry trends.</p>

        <div style={st.box}>
          <h2 style={st.h2}>US Credit Card Debt Overview 2026</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Metric</th><th style={st.th}>Value</th><th style={st.th}>Notes</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Total US Credit Card Debt</td><td style={{...st.td}}>$1.14 trillion</td><td style={{...st.td}}>All outstanding balances</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Number of Credit Cards</td><td style={{...st.td}}>576 million</td><td style={{...st.td}}>Active accounts</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Number of Cardholders</td><td style={{...st.td}}>196 million</td><td style={{...st.td}}>Adults with at least 1 card</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Average Balance per Cardholder</td><td style={{...st.td}}>$6,501</td><td style={{...st.td}}>Among those with a balance</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Median Balance</td><td style={{...st.td}}>$3,200</td><td style={{...st.td}}>Median is lower than average</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Cards per Person</td><td style={{...st.td}}>2.9</td><td style={{...st.td}}>Average number of cards</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Average Credit Limit</td><td style={{...st.td}}>$23,500</td><td style={{...st.td}}>Per cardholder</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Average Utilization Rate</td><td style={{...st.td}}>27%</td><td style={{...st.td}}>Balance vs limit</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Monthly Payment Average</td><td style={{...st.td}}>$225</td><td style={{...st.td}}>Across all cardholders</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Minimum Payment Average</td><td style={{...st.td}}>$110</td><td style={{...st.td}}>Per card with balance</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Accounts in Delinquency</td><td style={{...st.td}}>3.1%</td><td style={{...st.td}}>30+ days past due</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Accounts in Serious Delinquency</td><td style={{...st.td}}>1.8%</td><td style={{...st.td}}>90+ days past due</td></tr>
          </tbody></table></div>
        </div>
        <AdUnit slot="3248634657" />
        <div style={st.box}>
          <h2 style={st.h2}>The Minimum Payment Trap</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Scenario</th><th style={st.th}>Minimum Payment</th><th style={st.th}>Time to Pay Off</th><th style={st.th}>Total Paid</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>$3,000 balance at 20%</td><td style={{...st.td}}>$60/mo minimum</td><td style={{...st.td}}>15 years to pay off</td><td style={{...st.td}}>$5,100 total paid</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>$5,000 balance at 20%</td><td style={{...st.td}}>$100/mo minimum</td><td style={{...st.td}}>17 years to pay off</td><td style={{...st.td}}>$9,800 total paid</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>$10,000 balance at 20%</td><td style={{...st.td}}>$200/mo minimum</td><td style={{...st.td}}>19 years to pay off</td><td style={{...st.td}}>$21,600 total paid</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>$15,000 balance at 20%</td><td style={{...st.td}}>$300/mo minimum</td><td style={{...st.td}}>20+ years to pay off</td><td style={{...st.td}}>$35,400 total paid</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>$20,000 balance at 20%</td><td style={{...st.td}}>$400/mo minimum</td><td style={{...st.td}}>22+ years to pay off</td><td style={{...st.td}}>$49,200 total paid</td></tr>
          </tbody></table></div>
        </div>
        <div style={st.box}>
          <h2 style={st.h2}>Credit Card Debt Growth (2019-2026)</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Year</th><th style={st.th}>Total Debt</th><th style={st.th}>Context</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2019</td><td style={{...st.td}}>$927 billion</td><td style={{...st.td}}>Pre-pandemic baseline</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2020</td><td style={{...st.td}}>$825 billion</td><td style={{...st.td}}>Pandemic paydowns</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2021</td><td style={{...st.td}}>$860 billion</td><td style={{...st.td}}>Recovery begins</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2022</td><td style={{...st.td}}>$986 billion</td><td style={{...st.td}}>Inflation-driven spending</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2023</td><td style={{...st.td}}>$1.08 trillion</td><td style={{...st.td}}>Crossed $1 trillion</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2024</td><td style={{...st.td}}>$1.10 trillion</td><td style={{...st.td}}>Continued growth</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2025</td><td style={{...st.td}}>$1.12 trillion</td><td style={{...st.td}}>Slowing growth</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2026</td><td style={{...st.td}}>$1.14 trillion</td><td style={{...st.td}}>Record high</td></tr>
          </tbody></table></div>
        </div>
        <div style={st.box}><h2 style={st.h2}>Related Calculators</h2><div style={{display:'flex',flexWrap:'wrap',gap:8}}><a href="/credit-card-payoff-calculator" style={st.calcLink}>credit card payoff calculator</a>
            <a href="/debt-payoff-calculator" style={st.calcLink}>debt payoff calculator</a>
            <a href="/debt-snowball-calculator" style={st.calcLink}>debt snowball calculator</a>
            <a href="/balance-transfer-calculator" style={st.calcLink}>balance transfer calculator</a></div></div>
        <div style={st.box}><h2 style={st.h2}>Frequently Asked Questions</h2>{faqs.map((faq,i)=>(<div key={i} style={i<faqs.length-1?{borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:16,marginBottom:16}:{paddingBottom:8}}><h3 style={{fontSize:14,fontWeight:600,color:'#e2e8f0',marginBottom:6,marginTop:0}}>{faq.q}</h3><p style={{fontSize:13,color:'#94a3b8',lineHeight:1.7,margin:0}}>{faq.a}</p></div>))}</div>
      </div>
      <Footer />
    </div>)
}