import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import AdUnit from '../../../components/AdUnit'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
  title: 'Average Number of Credit Cards by Age 2026 | FreeFinCalc',
  description: 'How many credit cards does the average American have? Data by age, generation, income, and credit score.',
  alternates: { canonical: 'https://www.freefincalc.net/credit-card-data/number-of-credit-cards-by-age' },
  openGraph: { title: 'Average Number of Credit Cards by Age 2026', description: 'How many credit cards does the average American have? Data by age, generation, income, and credit score.', url: 'https://www.freefincalc.net/credit-card-data/number-of-credit-cards-by-age', siteName: 'FreeFinCalc', type: 'article' },
}

const faqs = [{"q":"How many credit cards does the average American have?","a":"The average American has 2.9 credit cards. Gen X (45-54) has the most at 4.0 cards. Gen Z (18-24) has the fewest at 1.6 cards."},{"q":"How many credit cards is too many?","a":"There is no magic number. Having multiple cards can help your credit score by lowering utilization. The key is managing them responsibly. Most experts say 3-5 cards is a good range."},{"q":"Does having more credit cards hurt your score?","a":"Not necessarily. More cards means a higher total credit limit, which lowers your utilization ratio (30% of your score). However, each new application creates a hard inquiry, and new accounts lower your average age."}]

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
        <nav style={{fontSize:13,color:'#64748b',marginBottom:20,display:'flex',gap:6,flexWrap:'wrap'}}><a href="/" style={{color:'#64748b',textDecoration:'none'}}>Home</a><span style={{color:'#475569'}}>{'\u203a'}</span><a href="/credit-card-data" style={{color:'#64748b',textDecoration:'none'}}>Credit Card Data</a><span style={{color:'#475569'}}>{'\u203a'}</span><span style={{color:'#94a3b8'}}>Average Number of Credit Cards by Age 2026</span></nav>
        <h1 style={st.h1}>Average Number of Credit Cards by Age 2026</h1>
        <p style={st.desc}>How many credit cards does the average American have? Data by age, generation, income, and credit score.</p>

        <div style={st.box}>
          <h2 style={st.h2}>Credit Cards by Age Group</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Age Group</th><th style={st.th}>Avg Cards</th><th style={st.th}>Avg Total Balance</th><th style={st.th}>Utilization</th><th style={st.th}>Notes</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>18-24 (Gen Z)</td><td style={{...st.td}}>1.6 cards</td><td style={{...st.td}}>$2,100</td><td style={{...st.td}}>22%</td><td style={{...st.td}}>Building credit</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>25-34 (Millennials)</td><td style={{...st.td}}>3.0 cards</td><td style={{...st.td}}>$4,800</td><td style={{...st.td}}>28%</td><td style={{...st.td}}>Growing portfolio</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>35-44 (Millennials/Gen X)</td><td style={{...st.td}}>3.8 cards</td><td style={{...st.td}}>$7,200</td><td style={{...st.td}}>26%</td><td style={{...st.td}}>Peak accumulation</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>45-54 (Gen X)</td><td style={{...st.td}}>4.0 cards</td><td style={{...st.td}}>$8,740</td><td style={{...st.td}}>24%</td><td style={{...st.td}}>Most cards, most debt</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>55-64 (Boomers)</td><td style={{...st.td}}>3.5 cards</td><td style={{...st.td}}>$6,130</td><td style={{...st.td}}>18%</td><td style={{...st.td}}>Consolidating</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>65+ (Boomers/Silent)</td><td style={{...st.td}}>3.0 cards</td><td style={{...st.td}}>$3,820</td><td style={{...st.td}}>12%</td><td style={{...st.td}}>Low utilization</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>National Average</td><td style={{...st.td}}>2.9 cards</td><td style={{...st.td}}>$6,501</td><td style={{...st.td}}>27%</td><td style={{...st.td}}></td></tr>
          </tbody></table></div>
        </div>
        <AdUnit slot="3248634657" />
        <div style={st.box}>
          <h2 style={st.h2}>Credit Cards by Income</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Household Income</th><th style={st.th}>Avg Cards</th><th style={st.th}>Avg Balance</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Under $30,000</td><td style={{...st.td}}>1.8 cards</td><td style={{...st.td}}>$2,400</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>$30,000-$50,000</td><td style={{...st.td}}>2.5 cards</td><td style={{...st.td}}>$4,100</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>$50,000-$75,000</td><td style={{...st.td}}>3.2 cards</td><td style={{...st.td}}>$5,800</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>$75,000-$100,000</td><td style={{...st.td}}>3.8 cards</td><td style={{...st.td}}>$6,500</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>$100,000-$150,000</td><td style={{...st.td}}>4.2 cards</td><td style={{...st.td}}>$7,200</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>$150,000+</td><td style={{...st.td}}>5.1 cards</td><td style={{...st.td}}>$8,400</td></tr>
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