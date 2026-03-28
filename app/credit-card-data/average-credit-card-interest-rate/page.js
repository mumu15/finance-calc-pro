import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import AdUnit from '../../../components/AdUnit'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
  title: 'Average Credit Card Interest Rate 2026 (APR by Card Type) | FreeFinCalc',
  description: 'Current credit card interest rates by card type, credit score, and issuer. Historical APR trends from 2000 to 2026.',
  alternates: { canonical: 'https://www.freefincalc.net/credit-card-data/average-credit-card-interest-rate' },
  openGraph: { title: 'Average Credit Card Interest Rate 2026 (APR by Card Type)', description: 'Current credit card interest rates by card type, credit score, and issuer. Historical APR trends from 2000 to 2026.', url: 'https://www.freefincalc.net/credit-card-data/average-credit-card-interest-rate', siteName: 'FreeFinCalc', type: 'article' },
}

const faqs = [{"q":"What is the average credit card interest rate?","a":"The average credit card APR is 20.74% in 2026, near all-time highs. Rates range from 16.50% for excellent credit to 28%+ for poor credit."},{"q":"What is a good credit card APR?","a":"Anything under 18% is considered good. Excellent credit (750+) can get rates around 16.50%. The best strategy is to pay in full monthly and never pay interest."},{"q":"Why are credit card rates so high?","a":"Credit card rates are tied to the Federal Reserve rate plus a margin. After aggressive Fed hikes in 2022-2023, rates reached record highs. Cards are also unsecured debt, which carries higher risk for lenders."}]

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
        <nav style={{fontSize:13,color:'#64748b',marginBottom:20,display:'flex',gap:6,flexWrap:'wrap'}}><a href="/" style={{color:'#64748b',textDecoration:'none'}}>Home</a><span style={{color:'#475569'}}>{'\u203a'}</span><a href="/credit-card-data" style={{color:'#64748b',textDecoration:'none'}}>Credit Card Data</a><span style={{color:'#475569'}}>{'\u203a'}</span><span style={{color:'#94a3b8'}}>Average Credit Card Interest Rate 2026</span></nav>
        <h1 style={st.h1}>Average Credit Card Interest Rate 2026 (APR by Card Type)</h1>
        <p style={st.desc}>Current credit card interest rates by card type, credit score, and issuer. Historical APR trends from 2000 to 2026.</p>

        <div style={st.box}>
          <h2 style={st.h2}>Average Credit Card APR by Type (2026)</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Card Type</th><th style={st.th}>Average APR</th><th style={st.th}>Notes</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>All Credit Cards</td><td style={{...st.td}}>20.74%</td><td style={{...st.td}}>Record high territory</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>New Card Offers</td><td style={{...st.td}}>22.15%</td><td style={{...st.td}}>For new applicants</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Existing Accounts</td><td style={{...st.td}}>19.85%</td><td style={{...st.td}}>Current cardholders</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Rewards Cards</td><td style={{...st.td}}>21.50%</td><td style={{...st.td}}>Cash back, points, miles</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Travel Cards</td><td style={{...st.td}}>20.80%</td><td style={{...st.td}}>Airline and hotel cards</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Student Cards</td><td style={{...st.td}}>19.20%</td><td style={{...st.td}}>For college students</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Secured Cards</td><td style={{...st.td}}>18.50%</td><td style={{...st.td}}>For building credit</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Business Cards</td><td style={{...st.td}}>19.90%</td><td style={{...st.td}}>Small business cards</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Store/Retail Cards</td><td style={{...st.td}}>26.50%</td><td style={{...st.td}}>Highest APR category</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Balance Transfer Cards</td><td style={{...st.td}}>0%</td><td style={{...st.td}}>Intro 12-21 months</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Penalty APR</td><td style={{...st.td}}>29.99%</td><td style={{...st.td}}>After missed payments</td></tr>
          </tbody></table></div>
        </div>
        <AdUnit slot="3248634657" />
        <div style={st.box}>
          <h2 style={st.h2}>APR by Credit Score</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Credit Score</th><th style={st.th}>Avg APR</th><th style={st.th}>Assessment</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Excellent (750+)</td><td style={{...st.td}}>16.50%</td><td style={{...st.td}}>Best available rates</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Good (700-749)</td><td style={{...st.td}}>20.25%</td><td style={{...st.td}}>Average rates</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Fair (650-699)</td><td style={{...st.td}}>23.75%</td><td style={{...st.td}}>Above average</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Poor (600-649)</td><td style={{...st.td}}>25.50%</td><td style={{...st.td}}>Subprime rates</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Very Poor (below 600)</td><td style={{...st.td}}>28.00%+</td><td style={{...st.td}}>Secured cards recommended</td></tr>
          </tbody></table></div>
        </div>
        <div style={st.box}>
          <h2 style={st.h2}>Historical Average Credit Card APR</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Year</th><th style={st.th}>Avg APR</th><th style={st.th}>Notes</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2026</td><td style={{...st.td}}>20.74%</td><td style={{...st.td}}>Near all-time high</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2025</td><td style={{...st.td}}>20.68%</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2024</td><td style={{...st.td}}>20.72%</td><td style={{...st.td}}>Record high</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2023</td><td style={{...st.td}}>20.44%</td><td style={{...st.td}}>Rising fast</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2022</td><td style={{...st.td}}>16.65%</td><td style={{...st.td}}>Fed rate hikes began</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2021</td><td style={{...st.td}}>14.75%</td><td style={{...st.td}}>Pandemic low</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2020</td><td style={{...st.td}}>15.91%</td><td style={{...st.td}}>COVID impact</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2019</td><td style={{...st.td}}>17.14%</td><td style={{...st.td}}>Pre-pandemic</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2018</td><td style={{...st.td}}>16.46%</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2015</td><td style={{...st.td}}>13.18%</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2010</td><td style={{...st.td}}>14.67%</td><td style={{...st.td}}>Post-recession</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2005</td><td style={{...st.td}}>12.51%</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2000</td><td style={{...st.td}}>15.71%</td><td style={{...st.td}}></td></tr>
          </tbody></table></div>
        </div>
        <div style={st.box}><h2 style={st.h2}>Related Calculators</h2><div style={{display:'flex',flexWrap:'wrap',gap:8}}><a href="/credit-card-payoff-calculator" style={st.calcLink}>credit card payoff calculator</a>
            <a href="/balance-transfer-calculator" style={st.calcLink}>balance transfer calculator</a>
            <a href="/debt-consolidation-calculator" style={st.calcLink}>debt consolidation calculator</a></div></div>
        <div style={st.box}><h2 style={st.h2}>Frequently Asked Questions</h2>{faqs.map((faq,i)=>(<div key={i} style={i<faqs.length-1?{borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:16,marginBottom:16}:{paddingBottom:8}}><h3 style={{fontSize:14,fontWeight:600,color:'#e2e8f0',marginBottom:6,marginTop:0}}>{faq.q}</h3><p style={{fontSize:13,color:'#94a3b8',lineHeight:1.7,margin:0}}>{faq.a}</p></div>))}</div>
      </div>
      <Footer />
    </div>)
}