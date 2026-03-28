import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import AdUnit from '../../../components/AdUnit'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
  title: 'Car Insurance Statistics 2026: Rates, Claims and Industry Data | FreeFinCalc',
  description: 'Auto insurance statistics including premiums, claims data, uninsured drivers, and industry trends.',
  alternates: { canonical: 'https://www.freefincalc.net/insurance-data/car-insurance-statistics' },
  openGraph: { title: 'Car Insurance Statistics 2026: Rates, Claims and Industry Data', description: 'Auto insurance statistics including premiums, claims data, uninsured drivers, and industry trends.', url: 'https://www.freefincalc.net/insurance-data/car-insurance-statistics', siteName: 'FreeFinCalc', type: 'article' },
}

const faqs = [{"q":"What percentage of drivers are uninsured?","a":"12.6% of US drivers are uninsured. Mississippi has the highest rate at 29.4%."},{"q":"How much has car insurance gone up?","a":"Premiums have increased about 25% since 2020, from $1,548 to $1,935 annually."}]

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
        <nav style={{fontSize:13,color:'#64748b',marginBottom:20,display:'flex',gap:6,flexWrap:'wrap'}}><a href="/" style={{color:'#64748b',textDecoration:'none'}}>Home</a><span style={{color:'#475569'}}>{'\u203a'}</span><a href="/insurance-data" style={{color:'#64748b',textDecoration:'none'}}>Insurance Data</a><span style={{color:'#475569'}}>{'\u203a'}</span><span style={{color:'#94a3b8'}}>Car Insurance Statistics 2026</span></nav>
        <h1 style={st.h1}>Car Insurance Statistics 2026: Rates, Claims and Industry Data</h1>
        <p style={st.desc}>Auto insurance statistics including premiums, claims data, uninsured drivers, and industry trends.</p>

        <div style={st.box}>
          <h2 style={st.h2}>US Auto Insurance Key Statistics</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Metric</th><th style={st.th}>Value</th><th style={st.th}>Notes</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Total Premiums Written</td><td style={{...st.td}}>$350 billion</td><td style={{...st.td}}>Annual</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Average Annual Premium</td><td style={{...st.td}}>$1,935</td><td style={{...st.td}}>Full coverage</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Uninsured Motorist Rate</td><td style={{...st.td}}>12.6%</td><td style={{...st.td}}>1 in 8 drivers</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Average Claim Amount</td><td style={{...st.td}}>$5,200</td><td style={{...st.td}}>Property damage</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Average Injury Claim</td><td style={{...st.td}}>$20,235</td><td style={{...st.td}}>Bodily injury</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Fatal Accidents/Year</td><td style={{...st.td}}>42,795</td><td style={{...st.td}}>NHTSA data</td></tr>
          </tbody></table></div>
        </div>
        <AdUnit slot="3248634657" />
        <div style={st.box}>
          <h2 style={st.h2}>Uninsured Rates (Top 10)</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Rank</th><th style={st.th}>State</th><th style={st.th}>Uninsured Rate</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>1</td><td style={{...st.td}}>Mississippi</td><td style={{...st.td}}>29.4%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2</td><td style={{...st.td}}>Michigan</td><td style={{...st.td}}>25.5%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>3</td><td style={{...st.td}}>Tennessee</td><td style={{...st.td}}>23.7%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>4</td><td style={{...st.td}}>New Mexico</td><td style={{...st.td}}>21.8%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>5</td><td style={{...st.td}}>Florida</td><td style={{...st.td}}>20.4%</td></tr>
          </tbody></table></div>
        </div>
        <div style={st.box}><h2 style={st.h2}>Related Calculators</h2><div style={{display:'flex',flexWrap:'wrap',gap:8}}><a href="/car-loan-calculator" style={st.calcLink}>car loan calculator</a>
            <a href="/budget-planner-calculator" style={st.calcLink}>budget planner calculator</a></div></div>
        <div style={st.box}><h2 style={st.h2}>Frequently Asked Questions</h2>{faqs.map((faq,i)=>(<div key={i} style={i<faqs.length-1?{borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:16,marginBottom:16}:{paddingBottom:8}}><h3 style={{fontSize:14,fontWeight:600,color:'#e2e8f0',marginBottom:6,marginTop:0}}>{faq.q}</h3><p style={{fontSize:13,color:'#94a3b8',lineHeight:1.7,margin:0}}>{faq.a}</p></div>))}</div>
      </div>
      <Footer />
    </div>)
}