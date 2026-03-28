import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import AdUnit from '../../../components/AdUnit'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
  title: 'Average Renters Insurance Cost by State 2026 | FreeFinCalc',
  description: 'Renters insurance rates for all 50 states. Average premiums and what it covers.',
  alternates: { canonical: 'https://www.freefincalc.net/insurance-data/average-renters-insurance-by-state' },
  openGraph: { title: 'Average Renters Insurance Cost by State 2026', description: 'Renters insurance rates for all 50 states. Average premiums and what it covers.', url: 'https://www.freefincalc.net/insurance-data/average-renters-insurance-by-state', siteName: 'FreeFinCalc', type: 'article' },
}

const faqs = [{"q":"How much is renters insurance?","a":"The national average is $195/year or about $16/month."},{"q":"Is renters insurance worth it?","a":"Yes. For $16/month you get $30,000-$50,000 in property protection plus liability coverage."}]

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
        <nav style={{fontSize:13,color:'#64748b',marginBottom:20,display:'flex',gap:6,flexWrap:'wrap'}}><a href="/" style={{color:'#64748b',textDecoration:'none'}}>Home</a><span style={{color:'#475569'}}>{'\u203a'}</span><a href="/insurance-data" style={{color:'#64748b',textDecoration:'none'}}>Insurance Data</a><span style={{color:'#475569'}}>{'\u203a'}</span><span style={{color:'#94a3b8'}}>Average Renters Insurance Cost by State 2026</span></nav>
        <h1 style={st.h1}>Average Renters Insurance Cost by State 2026</h1>
        <p style={st.desc}>Renters insurance rates for all 50 states. Average premiums and what it covers.</p>

        <div style={st.box}>
          <h2 style={st.h2}>Annual Renters Insurance by State</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Rank</th><th style={st.th}>State</th><th style={st.th}>Annual</th><th style={st.th}>Monthly</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>1</td><td style={{...st.td}}>Wyoming</td><td style={{...st.td}}>$120</td><td style={{...st.td}}>$10</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2</td><td style={{...st.td}}>Idaho</td><td style={{...st.td}}>$132</td><td style={{...st.td}}>$11</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>3</td><td style={{...st.td}}>Oregon</td><td style={{...st.td}}>$138</td><td style={{...st.td}}>$12</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>---</td><td style={{...st.td}}>National Average</td><td style={{...st.td}}>$195</td><td style={{...st.td}}>$16</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>48</td><td style={{...st.td}}>Florida</td><td style={{...st.td}}>$290</td><td style={{...st.td}}>$24</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>49</td><td style={{...st.td}}>Louisiana</td><td style={{...st.td}}>$310</td><td style={{...st.td}}>$26</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>50</td><td style={{...st.td}}>Mississippi</td><td style={{...st.td}}>$325</td><td style={{...st.td}}>$27</td></tr>
          </tbody></table></div>
        </div>
        <AdUnit slot="3248634657" />
        <div style={st.box}><h2 style={st.h2}>Related Calculators</h2><div style={{display:'flex',flexWrap:'wrap',gap:8}}><a href="/rent-affordability-calculator" style={st.calcLink}>rent affordability calculator</a>
            <a href="/budget-planner-calculator" style={st.calcLink}>budget planner calculator</a></div></div>
        <div style={st.box}><h2 style={st.h2}>Frequently Asked Questions</h2>{faqs.map((faq,i)=>(<div key={i} style={i<faqs.length-1?{borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:16,marginBottom:16}:{paddingBottom:8}}><h3 style={{fontSize:14,fontWeight:600,color:'#e2e8f0',marginBottom:6,marginTop:0}}>{faq.q}</h3><p style={{fontSize:13,color:'#94a3b8',lineHeight:1.7,margin:0}}>{faq.a}</p></div>))}</div>
      </div>
      <Footer />
    </div>)
}