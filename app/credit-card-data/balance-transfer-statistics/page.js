import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import AdUnit from '../../../components/AdUnit'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
  title: 'Balance Transfer Statistics 2026: Rates, Fees and Success Rates | FreeFinCalc',
  description: 'Balance transfer card data: average intro periods, fees, success rates, and how much Americans save by transferring balances.',
  alternates: { canonical: 'https://www.freefincalc.net/credit-card-data/balance-transfer-statistics' },
  openGraph: { title: 'Balance Transfer Statistics 2026: Rates, Fees and Success Rates', description: 'Balance transfer card data: average intro periods, fees, success rates, and how much Americans save by transferring balances.', url: 'https://www.freefincalc.net/credit-card-data/balance-transfer-statistics', siteName: 'FreeFinCalc', type: 'article' },
}

const faqs = [{"q":"How long is the average 0% APR balance transfer?","a":"The average intro period is 16.5 months. The best cards offer 21 months at 0% APR. Transfer fees average 3.25% of the amount transferred."},{"q":"Are balance transfers worth it?","a":"Yes, if you can pay off the balance before the intro period ends. Transferring $8,000 at 22% APR saves approximately $1,500/year after the transfer fee. However, only 48% of people pay off in time."},{"q":"What happens after the 0% period ends?","a":"The regular APR kicks in, typically 20-25%. Any remaining balance starts accruing interest at the full rate. About 35% of people transfer again to a new 0% card."}]

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
        <nav style={{fontSize:13,color:'#64748b',marginBottom:20,display:'flex',gap:6,flexWrap:'wrap'}}><a href="/" style={{color:'#64748b',textDecoration:'none'}}>Home</a><span style={{color:'#475569'}}>{'\u203a'}</span><a href="/credit-card-data" style={{color:'#64748b',textDecoration:'none'}}>Credit Card Data</a><span style={{color:'#475569'}}>{'\u203a'}</span><span style={{color:'#94a3b8'}}>Balance Transfer Statistics 2026</span></nav>
        <h1 style={st.h1}>Balance Transfer Statistics 2026: Rates, Fees and Success Rates</h1>
        <p style={st.desc}>Balance transfer card data: average intro periods, fees, success rates, and how much Americans save by transferring balances.</p>

        <div style={st.box}>
          <h2 style={st.h2}>Balance Transfer Card Statistics 2026</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Metric</th><th style={st.th}>Value</th><th style={st.th}>Notes</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Average Intro APR Period</td><td style={{...st.td}}>16.5 months</td><td style={{...st.td}}>0% APR duration</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Longest Intro Period</td><td style={{...st.td}}>21 months</td><td style={{...st.td}}>Top cards available</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Average Transfer Fee</td><td style={{...st.td}}>3.25%</td><td style={{...st.td}}>Of amount transferred</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Transfer Fee Range</td><td style={{...st.td}}>3-5%</td><td style={{...st.td}}>Varies by card</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Average Balance Transferred</td><td style={{...st.td}}>$5,800</td><td style={{...st.td}}>Per transfer</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Average Interest Saved</td><td style={{...st.td}}>$1,450</td><td style={{...st.td}}>During 0% period</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Post-Intro APR</td><td style={{...st.td}}>20-25%</td><td style={{...st.td}}>Regular rate after promo</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Success Rate (Paid Off in Time)</td><td style={{...st.td}}>48%</td><td style={{...st.td}}>Less than half pay off before promo ends</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Repeat Transferers</td><td style={{...st.td}}>35%</td><td style={{...st.td}}>Transfer again when promo ends</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Cards with No Transfer Fee</td><td style={{...st.td}}>3 cards</td><td style={{...st.td}}>Rare but available</td></tr>
          </tbody></table></div>
        </div>
        <AdUnit slot="3248634657" />
        <div style={st.box}>
          <h2 style={st.h2}>Balance Transfer Savings Calculator</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Current Debt</th><th style={st.th}>Annual Interest</th><th style={st.th}>Transfer Fee</th><th style={st.th}>Net Savings</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>$3,000 at 22% APR</td><td style={{...st.td}}>$660 interest/year</td><td style={{...st.td}}>$98 fee (3%)</td><td style={{...st.td}}>Save $562/year</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>$5,000 at 22% APR</td><td style={{...st.td}}>$1,100 interest/year</td><td style={{...st.td}}>$163 fee (3%)</td><td style={{...st.td}}>Save $937/year</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>$8,000 at 22% APR</td><td style={{...st.td}}>$1,760 interest/year</td><td style={{...st.td}}>$260 fee (3%)</td><td style={{...st.td}}>Save $1,500/year</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>$10,000 at 22% APR</td><td style={{...st.td}}>$2,200 interest/year</td><td style={{...st.td}}>$325 fee (3%)</td><td style={{...st.td}}>Save $1,875/year</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>$15,000 at 22% APR</td><td style={{...st.td}}>$3,300 interest/year</td><td style={{...st.td}}>$488 fee (3%)</td><td style={{...st.td}}>Save $2,812/year</td></tr>
          </tbody></table></div>
        </div>
        <div style={st.box}><h2 style={st.h2}>Related Calculators</h2><div style={{display:'flex',flexWrap:'wrap',gap:8}}><a href="/balance-transfer-calculator" style={st.calcLink}>balance transfer calculator</a>
            <a href="/credit-card-payoff-calculator" style={st.calcLink}>credit card payoff calculator</a>
            <a href="/debt-consolidation-calculator" style={st.calcLink}>debt consolidation calculator</a></div></div>
        <div style={st.box}><h2 style={st.h2}>Frequently Asked Questions</h2>{faqs.map((faq,i)=>(<div key={i} style={i<faqs.length-1?{borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:16,marginBottom:16}:{paddingBottom:8}}><h3 style={{fontSize:14,fontWeight:600,color:'#e2e8f0',marginBottom:6,marginTop:0}}>{faq.q}</h3><p style={{fontSize:13,color:'#94a3b8',lineHeight:1.7,margin:0}}>{faq.a}</p></div>))}</div>
      </div>
      <Footer />
    </div>)
}