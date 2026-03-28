import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import AdUnit from '../../../components/AdUnit'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
  title: 'Average Car Insurance Cost by State 2026 (All 50 States) | FreeFinCalc',
  description: 'Car insurance rates for all 50 states ranked cheapest to most expensive. Full coverage and minimum coverage rates compared.',
  alternates: { canonical: 'https://www.freefincalc.net/insurance-data/average-car-insurance-by-state' },
  openGraph: { title: 'Average Car Insurance Cost by State 2026 (All 50 States)', description: 'Car insurance rates for all 50 states ranked cheapest to most expensive. Full coverage and minimum coverage rates compared.', url: 'https://www.freefincalc.net/insurance-data/average-car-insurance-by-state', siteName: 'FreeFinCalc', type: 'article' },
}

const faqs = [{"q":"How much is car insurance on average?","a":"The national average is $1,935/year for full coverage and $565/year for minimum coverage in 2026."},{"q":"Which state has the cheapest car insurance?","a":"Maine has the cheapest at $1,020/year for full coverage."},{"q":"Which state has the most expensive car insurance?","a":"New York has the most expensive at $3,150/year for full coverage."}]

export default function Page() {
  const st = {
    page:{minHeight:'100vh',background:'#0f1117',color:'#e2e8f0'},
    wrap:{maxWidth:1000,margin:'0 auto',padding:'32px 16px 64px'},
    h1:{fontSize:'clamp(24px,4vw,38px)',fontWeight:900,color:'#f1f5f9',margin:'0 0 12px',lineHeight:1.15},
    desc:{fontSize:15,color:'#94a3b8',lineHeight:1.7,margin:'0 0 28px'},
    box:{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:16,padding:24,marginBottom:24},
    h2:{fontSize:20,fontWeight:700,color:'#f1f5f9',margin:'0 0 16px'},
    table:{width:'100%',borderCollapse:'collapse',fontSize:13},
    th:{padding:'10px 12px',textAlign:'left',color:'#10b981',fontWeight:700,fontSize:11,textTransform:'uppercase',letterSpacing:'0.05em',borderBottom:'2px solid rgba(16,185,129,0.2)'},
    td:{padding:'10px 12px',borderBottom:'1px solid rgba(255,255,255,0.05)',color:'#94a3b8'},
    calcLink:{display:'inline-block',padding:'8px 16px',borderRadius:8,fontSize:13,fontWeight:600,textDecoration:'none',margin:'0 8px 8px 0',background:'rgba(16,185,129,0.08)',border:'1px solid rgba(16,185,129,0.2)',color:'#10b981'},
  }
  return (
    <div style={st.page}>
      <Header />
      <FaqSchema faqs={faqs} />
      <AdUnit slot="7405024590" />
      <div style={st.wrap}>
        <nav style={{fontSize:13,color:'#64748b',marginBottom:20,display:'flex',gap:6,flexWrap:'wrap'}}><a href="/" style={{color:'#64748b',textDecoration:'none'}}>Home</a><span style={{color:'#475569'}}>{'\u203a'}</span><a href="/insurance-data" style={{color:'#64748b',textDecoration:'none'}}>Insurance Data</a><span style={{color:'#475569'}}>{'\u203a'}</span><span style={{color:'#94a3b8'}}>Average Car Insurance Cost by State 2026</span></nav>
        <h1 style={st.h1}>Average Car Insurance Cost by State 2026 (All 50 States)</h1>
        <p style={st.desc}>Car insurance rates for all 50 states ranked cheapest to most expensive. Full coverage and minimum coverage rates compared.</p>

        <div style={st.box}>
          <h2 style={st.h2}>Annual Car Insurance Premiums by State</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Rank</th><th style={st.th}>State</th><th style={st.th}>Full Coverage</th><th style={st.th}>Min Coverage</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>1</td><td style={{...st.td}}>Maine</td><td style={{...st.td}}>$1,020</td><td style={{...st.td}}>$380</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2</td><td style={{...st.td}}>Vermont</td><td style={{...st.td}}>$1,085</td><td style={{...st.td}}>$395</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>3</td><td style={{...st.td}}>Idaho</td><td style={{...st.td}}>$1,095</td><td style={{...st.td}}>$340</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>4</td><td style={{...st.td}}>Ohio</td><td style={{...st.td}}>$1,110</td><td style={{...st.td}}>$365</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>5</td><td style={{...st.td}}>New Hampshire</td><td style={{...st.td}}>$1,125</td><td style={{...st.td}}>$410</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>---</td><td style={{...st.td}}>National Average</td><td style={{...st.td}}>$1,935</td><td style={{...st.td}}>$565</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>46</td><td style={{...st.td}}>New Jersey</td><td style={{...st.td}}>$2,650</td><td style={{...st.td}}>$780</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>47</td><td style={{...st.td}}>Florida</td><td style={{...st.td}}>$2,780</td><td style={{...st.td}}>$820</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>48</td><td style={{...st.td}}>Louisiana</td><td style={{...st.td}}>$2,890</td><td style={{...st.td}}>$765</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>49</td><td style={{...st.td}}>Michigan</td><td style={{...st.td}}>$2,950</td><td style={{...st.td}}>$860</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>50</td><td style={{...st.td}}>New York</td><td style={{...st.td}}>$3,150</td><td style={{...st.td}}>$920</td></tr>
          </tbody></table></div>
        </div>
        <AdUnit slot="3248634657" />
        <div style={st.box}>
          <h2 style={st.h2}>Car Insurance by Age</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Age</th><th style={st.th}>Avg Full Coverage</th><th style={st.th}>Notes</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>16-19</td><td style={{...st.td}}>$5,100</td><td style={{...st.td}}>Highest risk</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>20-24</td><td style={{...st.td}}>$2,900</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>25-34</td><td style={{...st.td}}>$1,920</td><td style={{...st.td}}>Rates drop at 25</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>35-54</td><td style={{...st.td}}>$1,760</td><td style={{...st.td}}>Best rates</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>55-64</td><td style={{...st.td}}>$1,820</td><td style={{...st.td}}>Slight increase</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>65+</td><td style={{...st.td}}>$2,100</td><td style={{...st.td}}>Higher risk</td></tr>
          </tbody></table></div>
        </div>
        <div style={st.box}><h2 style={st.h2}>Related Calculators</h2><div style={{display:'flex',flexWrap:'wrap',gap:8}}><a href="/car-loan-calculator" style={st.calcLink}>car loan calculator</a>
            <a href="/budget-planner-calculator" style={st.calcLink}>budget planner calculator</a></div></div>
        <div style={st.box}><h2 style={st.h2}>Frequently Asked Questions</h2>{faqs.map((faq,i)=>(<div key={i} style={i<faqs.length-1?{borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:16,marginBottom:16}:{paddingBottom:8}}><h3 style={{fontSize:14,fontWeight:600,color:'#e2e8f0',marginBottom:6,marginTop:0}}>{faq.q}</h3><p style={{fontSize:13,color:'#94a3b8',lineHeight:1.7,margin:0}}>{faq.a}</p></div>))}</div>
      </div>
      <Footer />
    </div>)
}