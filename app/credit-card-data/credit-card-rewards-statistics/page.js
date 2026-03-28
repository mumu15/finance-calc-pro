import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import AdUnit from '../../../components/AdUnit'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
  title: 'Credit Card Rewards Statistics 2026: Cash Back, Points and Miles | FreeFinCalc',
  description: 'How much do Americans earn from credit card rewards? Cash back, points, miles, and the most popular rewards programs.',
  alternates: { canonical: 'https://www.freefincalc.net/credit-card-data/credit-card-rewards-statistics' },
  openGraph: { title: 'Credit Card Rewards Statistics 2026: Cash Back, Points and Miles', description: 'How much do Americans earn from credit card rewards? Cash back, points, miles, and the most popular rewards programs.', url: 'https://www.freefincalc.net/credit-card-data/credit-card-rewards-statistics', siteName: 'FreeFinCalc', type: 'article' },
}

const faqs = [{"q":"How much do credit card rewards actually earn?","a":"The average cardholder earns about $320/year in rewards. However, those who pay in full earn about $520/year while paying $0 in interest. Those who carry balances earn $280 but pay $1,350 in interest."},{"q":"Are credit card rewards worth it?","a":"Only if you pay your balance in full every month. Transactors earn a net $520/year. Revolvers lose $1,070/year after interest. The rewards are designed to encourage spending."},{"q":"What is the best type of credit card reward?","a":"Cash back is simplest and most popular (62% of rewards cardholders). Travel points can offer higher value (1.5-2 cents per point) but require more effort to maximize."}]

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
        <nav style={{fontSize:13,color:'#64748b',marginBottom:20,display:'flex',gap:6,flexWrap:'wrap'}}><a href="/" style={{color:'#64748b',textDecoration:'none'}}>Home</a><span style={{color:'#475569'}}>{'\u203a'}</span><a href="/credit-card-data" style={{color:'#64748b',textDecoration:'none'}}>Credit Card Data</a><span style={{color:'#475569'}}>{'\u203a'}</span><span style={{color:'#94a3b8'}}>Credit Card Rewards Statistics 2026</span></nav>
        <h1 style={st.h1}>Credit Card Rewards Statistics 2026: Cash Back, Points and Miles</h1>
        <p style={st.desc}>How much do Americans earn from credit card rewards? Cash back, points, miles, and the most popular rewards programs.</p>

        <div style={st.box}>
          <h2 style={st.h2}>Credit Card Rewards Overview 2026</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Metric</th><th style={st.th}>Value</th><th style={st.th}>Notes</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Total Rewards Earned (US)</td><td style={{...st.td}}>$45 billion</td><td style={{...st.td}}>Annual rewards paid out</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Average Rewards per Cardholder</td><td style={{...st.td}}>$320/year</td><td style={{...st.td}}>Across all card types</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Cash Back Cardholders</td><td style={{...st.td}}>62%</td><td style={{...st.td}}>Most popular reward type</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Points/Miles Cardholders</td><td style={{...st.td}}>38%</td><td style={{...st.td}}>Travel-focused</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Average Cash Back Rate</td><td style={{...st.td}}>1.8%</td><td style={{...st.td}}>On all purchases</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Average Travel Points Value</td><td style={{...st.td}}>1.5 cents/point</td><td style={{...st.td}}>Varies by program</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Unredeemed Rewards</td><td style={{...st.td}}>$25 billion</td><td style={{...st.td}}>Sitting unused</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Cards with Annual Fees</td><td style={{...st.td}}>35%</td><td style={{...st.td}}>Premium cards</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Average Annual Fee</td><td style={{...st.td}}>$120</td><td style={{...st.td}}>Among fee cards</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Annual Fee Breakeven Spend</td><td style={{...st.td}}>$8,000</td><td style={{...st.td}}>To offset $120 fee at 1.5%</td></tr>
          </tbody></table></div>
        </div>
        <AdUnit slot="3248634657" />
        <div style={st.box}>
          <h2 style={st.h2}>Top Rewards Categories</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Category</th><th style={st.th}>Typical Reward Rate</th><th style={st.th}>Notes</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Groceries</td><td style={{...st.td}}>3-6% back</td><td style={{...st.td}}>Best category bonuses</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Dining</td><td style={{...st.td}}>3-5% back</td><td style={{...st.td}}>Restaurants, delivery</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Gas</td><td style={{...st.td}}>3-5% back</td><td style={{...st.td}}>Fuel stations</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Travel</td><td style={{...st.td}}>3-10x points</td><td style={{...st.td}}>Flights, hotels booked through portal</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Online Shopping</td><td style={{...st.td}}>2-5% back</td><td style={{...st.td}}>Rotating categories</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Streaming</td><td style={{...st.td}}>3-5% back</td><td style={{...st.td}}>Netflix, Spotify, etc.</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Everything Else</td><td style={{...st.td}}>1-2% back</td><td style={{...st.td}}>Flat rate on non-bonus categories</td></tr>
          </tbody></table></div>
        </div>
        <div style={st.box}>
          <h2 style={st.h2}>Rewards vs Interest Paid</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Cardholder Type</th><th style={st.th}>Rewards Earned</th><th style={st.th}>Interest Paid</th><th style={st.th}>Net Result</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Transactors (Pay in Full)</td><td style={{...st.td}}>$520/year earned</td><td style={{...st.td}}>$0 interest paid</td><td style={{...st.td}}>Net: +$520</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Revolvers (Carry Balance)</td><td style={{...st.td}}>$280/year earned</td><td style={{...st.td}}>$1,350 interest paid</td><td style={{...st.td}}>Net: -$1,070</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Heavy Revolvers</td><td style={{...st.td}}>$180/year earned</td><td style={{...st.td}}>$2,800 interest paid</td><td style={{...st.td}}>Net: -$2,620</td></tr>
          </tbody></table></div>
        </div>
        <div style={st.box}><h2 style={st.h2}>Related Calculators</h2><div style={{display:'flex',flexWrap:'wrap',gap:8}}><a href="/credit-card-payoff-calculator" style={st.calcLink}>credit card payoff calculator</a>
            <a href="/budget-planner-calculator" style={st.calcLink}>budget planner calculator</a>
            <a href="/roi-calculator" style={st.calcLink}>roi calculator</a></div></div>
        <div style={st.box}><h2 style={st.h2}>Frequently Asked Questions</h2>{faqs.map((faq,i)=>(<div key={i} style={i<faqs.length-1?{borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:16,marginBottom:16}:{paddingBottom:8}}><h3 style={{fontSize:14,fontWeight:600,color:'#e2e8f0',marginBottom:6,marginTop:0}}>{faq.q}</h3><p style={{fontSize:13,color:'#94a3b8',lineHeight:1.7,margin:0}}>{faq.a}</p></div>))}</div>
      </div>
      <Footer />
    </div>)
}