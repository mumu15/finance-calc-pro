import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import AdUnit from '../../../components/AdUnit'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
  title: 'Average Credit Card Spending by Category 2026 (Monthly Breakdown) | FreeFinCalc',
  description: 'What do Americans charge to their credit cards? Average monthly spending by category including groceries, dining, gas, travel, and more.',
  alternates: { canonical: 'https://www.freefincalc.net/credit-card-data/credit-card-spending-by-category' },
  openGraph: { title: 'Average Credit Card Spending by Category 2026 (Monthly Breakdown)', description: 'What do Americans charge to their credit cards? Average monthly spending by category including groceries, dining, gas, travel, and more.', url: 'https://www.freefincalc.net/credit-card-data/credit-card-spending-by-category', siteName: 'FreeFinCalc', type: 'article' },
}

const faqs = [{"q":"What do Americans spend the most on with credit cards?","a":"Groceries ($475/month) and online shopping ($420/month) are the top credit card spending categories, followed by dining out ($380/month) and gas ($285/month)."},{"q":"How much does the average person spend on credit cards per month?","a":"The average active cardholder charges $3,125 per month to credit cards. This varies dramatically by income, from $1,450 for under $35K earners to $6,500+ for $150K+ earners."},{"q":"What percentage of spending is on credit cards?","a":"Credit cards account for approximately 31% of all US consumer payments by value. Debit cards account for 29%, cash 18%, and other methods (ACH, checks) 22%."}]

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
        <nav style={{fontSize:13,color:'#64748b',marginBottom:20,display:'flex',gap:6,flexWrap:'wrap'}}><a href="/" style={{color:'#64748b',textDecoration:'none'}}>Home</a><span style={{color:'#475569'}}>{'\u203a'}</span><a href="/credit-card-data" style={{color:'#64748b',textDecoration:'none'}}>Credit Card Data</a><span style={{color:'#475569'}}>{'\u203a'}</span><span style={{color:'#94a3b8'}}>Average Credit Card Spending by Category 2026</span></nav>
        <h1 style={st.h1}>Average Credit Card Spending by Category 2026 (Monthly Breakdown)</h1>
        <p style={st.desc}>What do Americans charge to their credit cards? Average monthly spending by category including groceries, dining, gas, travel, and more.</p>

        <div style={st.box}>
          <h2 style={st.h2}>Average Monthly Credit Card Spending by Category</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Category</th><th style={st.th}>Monthly Avg</th><th style={st.th}>% of Total</th><th style={st.th}>Notes</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Groceries/Supermarkets</td><td style={{...st.td}}>$475</td><td style={{...st.td}}>15.2%</td><td style={{...st.td}}>Most common category</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Dining/Restaurants</td><td style={{...st.td}}>$380</td><td style={{...st.td}}>12.2%</td><td style={{...st.td}}>Includes delivery apps</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Gas/Fuel</td><td style={{...st.td}}>$285</td><td style={{...st.td}}>9.1%</td><td style={{...st.td}}>Varies by location</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Online Shopping</td><td style={{...st.td}}>$420</td><td style={{...st.td}}>13.5%</td><td style={{...st.td}}>Amazon, retail sites</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Subscriptions/Streaming</td><td style={{...st.td}}>$85</td><td style={{...st.td}}>2.7%</td><td style={{...st.td}}>Netflix, Spotify, etc.</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Travel/Hotels</td><td style={{...st.td}}>$195</td><td style={{...st.td}}>6.3%</td><td style={{...st.td}}>Seasonal variation</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Utilities</td><td style={{...st.td}}>$165</td><td style={{...st.td}}>5.3%</td><td style={{...st.td}}>Electric, water, internet</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Healthcare/Medical</td><td style={{...st.td}}>$145</td><td style={{...st.td}}>4.6%</td><td style={{...st.td}}>Copays, prescriptions</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Insurance Premiums</td><td style={{...st.td}}>$180</td><td style={{...st.td}}>5.8%</td><td style={{...st.td}}>Auto, health, etc.</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Entertainment</td><td style={{...st.td}}>$120</td><td style={{...st.td}}>3.8%</td><td style={{...st.td}}>Movies, events, hobbies</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Home Improvement</td><td style={{...st.td}}>$110</td><td style={{...st.td}}>3.5%</td><td style={{...st.td}}>Hardware, repairs</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Clothing/Apparel</td><td style={{...st.td}}>$95</td><td style={{...st.td}}>3.0%</td><td style={{...st.td}}>In-store and online</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Education</td><td style={{...st.td}}>$75</td><td style={{...st.td}}>2.4%</td><td style={{...st.td}}>Tuition, books, courses</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Other</td><td style={{...st.td}}>$395</td><td style={{...st.td}}>12.6%</td><td style={{...st.td}}>Miscellaneous</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Total Monthly Average</td><td style={{...st.td}}>$3,125</td><td style={{...st.td}}>100%</td><td style={{...st.td}}>Per active cardholder</td></tr>
          </tbody></table></div>
        </div>
        <AdUnit slot="3248634657" />
        <div style={st.box}>
          <h2 style={st.h2}>Spending by Income Level (Monthly)</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Household Income</th><th style={st.th}>Monthly Card Spend</th><th style={st.th}>Notes</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Under $35,000</td><td style={{...st.td}}>$1,450</td><td style={{...st.td}}>Lower utilization</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>$35,000-$50,000</td><td style={{...st.td}}>$2,100</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>$50,000-$75,000</td><td style={{...st.td}}>$2,850</td><td style={{...st.td}}>Average range</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>$75,000-$100,000</td><td style={{...st.td}}>$3,500</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>$100,000-$150,000</td><td style={{...st.td}}>$4,800</td><td style={{...st.td}}>Higher spend, usually paid off</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>$150,000+</td><td style={{...st.td}}>$6,500</td><td style={{...st.td}}>Highest spend, lowest utilization</td></tr>
          </tbody></table></div>
        </div>
        <div style={st.box}><h2 style={st.h2}>Related Calculators</h2><div style={{display:'flex',flexWrap:'wrap',gap:8}}><a href="/credit-card-payoff-calculator" style={st.calcLink}>credit card payoff calculator</a>
            <a href="/budget-planner-calculator" style={st.calcLink}>budget planner calculator</a>
            <a href="/debt-to-income-calculator" style={st.calcLink}>debt to income calculator</a></div></div>
        <div style={st.box}><h2 style={st.h2}>Frequently Asked Questions</h2>{faqs.map((faq,i)=>(<div key={i} style={i<faqs.length-1?{borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:16,marginBottom:16}:{paddingBottom:8}}><h3 style={{fontSize:14,fontWeight:600,color:'#e2e8f0',marginBottom:6,marginTop:0}}>{faq.q}</h3><p style={{fontSize:13,color:'#94a3b8',lineHeight:1.7,margin:0}}>{faq.a}</p></div>))}</div>
      </div>
      <Footer />
    </div>)
}