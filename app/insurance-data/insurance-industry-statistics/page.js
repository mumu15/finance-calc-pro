import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import AdUnit from '../../../components/AdUnit'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
  title: 'Insurance Industry Statistics 2026: Market Size and Revenue | FreeFinCalc',
  description: 'US insurance industry overview: total premiums, market segments, top companies, and employment data.',
  alternates: { canonical: 'https://www.freefincalc.net/insurance-data/insurance-industry-statistics' },
  openGraph: { title: 'Insurance Industry Statistics 2026: Market Size and Revenue', description: 'US insurance industry overview: total premiums, market segments, top companies, and employment data.', url: 'https://www.freefincalc.net/insurance-data/insurance-industry-statistics', siteName: 'FreeFinCalc', type: 'article' },
}

const faqs = [{"q":"How big is the US insurance industry?","a":"The US insurance industry writes approximately $3.52 trillion in premiums annually."},{"q":"What is the largest insurance company?","a":"UnitedHealth Group is the largest by revenue at $372 billion."}]

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
        <nav style={{fontSize:13,color:'#64748b',marginBottom:20,display:'flex',gap:6,flexWrap:'wrap'}}><a href="/" style={{color:'#64748b',textDecoration:'none'}}>Home</a><span style={{color:'#475569'}}>{'\u203a'}</span><a href="/insurance-data" style={{color:'#64748b',textDecoration:'none'}}>Insurance Data</a><span style={{color:'#475569'}}>{'\u203a'}</span><span style={{color:'#94a3b8'}}>Insurance Industry Statistics 2026</span></nav>
        <h1 style={st.h1}>Insurance Industry Statistics 2026: Market Size and Revenue</h1>
        <p style={st.desc}>US insurance industry overview: total premiums, market segments, top companies, and employment data.</p>

        <div style={st.box}>
          <h2 style={st.h2}>US Insurance Industry by Segment</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Segment</th><th style={st.th}>Annual Premiums</th><th style={st.th}>Share</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Health Insurance</td><td style={{...st.td}}>$1.28 trillion</td><td style={{...st.td}}>36.4%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Life/Annuity</td><td style={{...st.td}}>$850 billion</td><td style={{...st.td}}>24.2%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Property and Casualty</td><td style={{...st.td}}>$780 billion</td><td style={{...st.td}}>22.2%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Auto Insurance</td><td style={{...st.td}}>$350 billion</td><td style={{...st.td}}>10.0%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Total US Insurance</td><td style={{...st.td}}>$3.52 trillion</td><td style={{...st.td}}>100%</td></tr>
          </tbody></table></div>
        </div>
        <AdUnit slot="3248634657" />
        <div style={st.box}>
          <h2 style={st.h2}>Top 5 Insurance Companies</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Rank</th><th style={st.th}>Company</th><th style={st.th}>Revenue</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>1</td><td style={{...st.td}}>UnitedHealth Group</td><td style={{...st.td}}>$372 billion</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2</td><td style={{...st.td}}>CVS/Aetna</td><td style={{...st.td}}>$357 billion</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>3</td><td style={{...st.td}}>Berkshire Hathaway</td><td style={{...st.td}}>$302 billion</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>4</td><td style={{...st.td}}>Elevance Health</td><td style={{...st.td}}>$171 billion</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>5</td><td style={{...st.td}}>Centene</td><td style={{...st.td}}>$154 billion</td></tr>
          </tbody></table></div>
        </div>
        <div style={st.box}><h2 style={st.h2}>Related Calculators</h2><div style={{display:'flex',flexWrap:'wrap',gap:8}}><a href="/budget-planner-calculator" style={st.calcLink}>budget planner calculator</a>
            <a href="/roi-calculator" style={st.calcLink}>roi calculator</a></div></div>
        <div style={st.box}><h2 style={st.h2}>Frequently Asked Questions</h2>{faqs.map((faq,i)=>(<div key={i} style={i<faqs.length-1?{borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:16,marginBottom:16}:{paddingBottom:8}}><h3 style={{fontSize:14,fontWeight:600,color:'#e2e8f0',marginBottom:6,marginTop:0}}>{faq.q}</h3><p style={{fontSize:13,color:'#94a3b8',lineHeight:1.7,margin:0}}>{faq.a}</p></div>))}</div>
      </div>
      <Footer />
    </div>)
}