import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import AdUnit from '../../../components/AdUnit'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
  title: 'Credit Card Approval Rates by Credit Score 2026 | FreeFinCalc',
  description: 'What credit score do you need for a credit card? Approval rates by score, card type, and issuer.',
  alternates: { canonical: 'https://www.freefincalc.net/credit-card-data/credit-card-approval-rates' },
  openGraph: { title: 'Credit Card Approval Rates by Credit Score 2026', description: 'What credit score do you need for a credit card? Approval rates by score, card type, and issuer.', url: 'https://www.freefincalc.net/credit-card-data/credit-card-approval-rates', siteName: 'FreeFinCalc', type: 'article' },
}

const faqs = [{"q":"What credit score do you need for a credit card?","a":"A 650+ score gives you access to most cards. Premium rewards cards typically require 720+. Secured cards are available to almost anyone regardless of score."},{"q":"What is the average credit card approval rate?","a":"The overall credit card approval rate is about 52%. This ranges from 95% for excellent credit to 5% for very poor credit."},{"q":"Does applying for a credit card hurt your score?","a":"Each application creates a hard inquiry that can lower your score 5-10 points for 12 months. Multiple applications in a short period have a larger impact."}]

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
        <nav style={{fontSize:13,color:'#64748b',marginBottom:20,display:'flex',gap:6,flexWrap:'wrap'}}><a href="/" style={{color:'#64748b',textDecoration:'none'}}>Home</a><span style={{color:'#475569'}}>{'\u203a'}</span><a href="/credit-card-data" style={{color:'#64748b',textDecoration:'none'}}>Credit Card Data</a><span style={{color:'#475569'}}>{'\u203a'}</span><span style={{color:'#94a3b8'}}>Credit Card Approval Rates by Credit Score 2026</span></nav>
        <h1 style={st.h1}>Credit Card Approval Rates by Credit Score 2026</h1>
        <p style={st.desc}>What credit score do you need for a credit card? Approval rates by score, card type, and issuer.</p>

        <div style={st.box}>
          <h2 style={st.h2}>Approval Rates by Credit Score</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Credit Score</th><th style={st.th}>Approval Rate</th><th style={st.th}>Cards Available</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>750+</td><td style={{...st.td}}>95%</td><td style={{...st.td}}>Premium rewards, travel, 0% APR cards</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>700-749</td><td style={{...st.td}}>82%</td><td style={{...st.td}}>Most rewards cards, good limits</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>650-699</td><td style={{...st.td}}>58%</td><td style={{...st.td}}>Basic rewards, some restrictions</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>600-649</td><td style={{...st.td}}>32%</td><td style={{...st.td}}>Secured cards, store cards</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>550-599</td><td style={{...st.td}}>15%</td><td style={{...st.td}}>Secured cards primarily</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Below 550</td><td style={{...st.td}}>5%</td><td style={{...st.td}}>Secured cards, prepaid alternatives</td></tr>
          </tbody></table></div>
        </div>
        <AdUnit slot="3248634657" />
        <div style={st.box}>
          <h2 style={st.h2}>Approval Rates by Card Category</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Card Type</th><th style={st.th}>Avg Approval Rate</th><th style={st.th}>Notes</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Secured Cards</td><td style={{...st.td}}>92%</td><td style={{...st.td}}>Requires deposit, easiest approval</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Student Cards</td><td style={{...st.td}}>78%</td><td style={{...st.td}}>Must be enrolled in school</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Store/Retail Cards</td><td style={{...st.td}}>65%</td><td style={{...st.td}}>Easier than bank cards</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Basic Cash Back</td><td style={{...st.td}}>55%</td><td style={{...st.td}}>Entry-level rewards</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Premium Rewards</td><td style={{...st.td}}>38%</td><td style={{...st.td}}>Chase Sapphire, Amex Gold tier</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Travel/Airline Cards</td><td style={{...st.td}}>35%</td><td style={{...st.td}}>Airline and hotel branded</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Ultra-Premium</td><td style={{...st.td}}>22%</td><td style={{...st.td}}>Amex Platinum, CSR tier</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Business Cards</td><td style={{...st.td}}>45%</td><td style={{...st.td}}>Revenue requirements vary</td></tr>
          </tbody></table></div>
        </div>
        <div style={st.box}>
          <h2 style={st.h2}>Application Statistics</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Metric</th><th style={st.th}>Value</th><th style={st.th}>Notes</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Applications per Year</td><td style={{...st.td}}>110 million</td><td style={{...st.td}}>US credit card applications</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Overall Approval Rate</td><td style={{...st.td}}>52%</td><td style={{...st.td}}>Across all applications</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Average Applications Before Approval</td><td style={{...st.td}}>1.8</td><td style={{...st.td}}>For subprime borrowers</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Hard Inquiry Impact</td><td style={{...st.td}}>5-10 points</td><td style={{...st.td}}>Per application, lasts 12 months</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>New Account Impact</td><td style={{...st.td}}>Avg age decreases</td><td style={{...st.td}}>Affects 15% of score</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Applications in 24 Months (5/24 Rule)</td><td style={{...st.td}}>5 max</td><td style={{...st.td}}>Chase restriction</td></tr>
          </tbody></table></div>
        </div>
        <div style={st.box}><h2 style={st.h2}>Related Calculators</h2><div style={{display:'flex',flexWrap:'wrap',gap:8}}><a href="/credit-utilization-calculator" style={st.calcLink}>credit utilization calculator</a>
            <a href="/credit-card-payoff-calculator" style={st.calcLink}>credit card payoff calculator</a>
            <a href="/debt-to-income-calculator" style={st.calcLink}>debt to income calculator</a></div></div>
        <div style={st.box}><h2 style={st.h2}>Frequently Asked Questions</h2>{faqs.map((faq,i)=>(<div key={i} style={i<faqs.length-1?{borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:16,marginBottom:16}:{paddingBottom:8}}><h3 style={{fontSize:14,fontWeight:600,color:'#e2e8f0',marginBottom:6,marginTop:0}}>{faq.q}</h3><p style={{fontSize:13,color:'#94a3b8',lineHeight:1.7,margin:0}}>{faq.a}</p></div>))}</div>
      </div>
      <Footer />
    </div>)
}