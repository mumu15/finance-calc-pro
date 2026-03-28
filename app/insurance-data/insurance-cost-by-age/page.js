import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import AdUnit from '../../../components/AdUnit'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
  title: 'Insurance Cost by Age 2026: Car, Health, Life and Home Rates | FreeFinCalc',
  description: 'How insurance costs change across your lifetime. All insurance types by age from 18 to 75+.',
  alternates: { canonical: 'https://www.freefincalc.net/insurance-data/insurance-cost-by-age' },
  openGraph: { title: 'Insurance Cost by Age 2026: Car, Health, Life and Home Rates', description: 'How insurance costs change across your lifetime. All insurance types by age from 18 to 75+.', url: 'https://www.freefincalc.net/insurance-data/insurance-cost-by-age', siteName: 'FreeFinCalc', type: 'article' },
}

const faqs = [{"q":"At what age is insurance cheapest?","a":"Overall costs are lowest at 25-34 at about $8,973/year."},{"q":"At what age is insurance most expensive?","a":"Ages 55-64 are most expensive at about $16,737/year due to health and life insurance costs."}]

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
        <nav style={{fontSize:13,color:'#64748b',marginBottom:20,display:'flex',gap:6,flexWrap:'wrap'}}><a href="/" style={{color:'#64748b',textDecoration:'none'}}>Home</a><span style={{color:'#475569'}}>{'\u203a'}</span><a href="/insurance-data" style={{color:'#64748b',textDecoration:'none'}}>Insurance Data</a><span style={{color:'#475569'}}>{'\u203a'}</span><span style={{color:'#94a3b8'}}>Insurance Cost by Age 2026</span></nav>
        <h1 style={st.h1}>Insurance Cost by Age 2026: Car, Health, Life and Home Rates</h1>
        <p style={st.desc}>How insurance costs change across your lifetime. All insurance types by age from 18 to 75+.</p>

        <div style={st.box}>
          <h2 style={st.h2}>Total Annual Insurance Costs by Age</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Age</th><th style={st.th}>Car</th><th style={st.th}>Health</th><th style={st.th}>Life ($500K)</th><th style={st.th}>Home</th><th style={st.th}>Total/Year</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>18-24</td><td style={{...st.td}}>$4,850</td><td style={{...st.td}}>$3,900</td><td style={{...st.td}}>$180</td><td style={{...st.td}}>N/A</td><td style={{...st.td}}>$8,930</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>25-34</td><td style={{...st.td}}>$1,920</td><td style={{...st.td}}>$4,400</td><td style={{...st.td}}>$276</td><td style={{...st.td}}>$2,377</td><td style={{...st.td}}>$8,973</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>35-44</td><td style={{...st.td}}>$1,780</td><td style={{...st.td}}>$5,500</td><td style={{...st.td}}>$396</td><td style={{...st.td}}>$2,377</td><td style={{...st.td}}>$10,053</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>45-54</td><td style={{...st.td}}>$1,750</td><td style={{...st.td}}>$7,200</td><td style={{...st.td}}>$792</td><td style={{...st.td}}>$2,377</td><td style={{...st.td}}>$12,119</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>55-64</td><td style={{...st.td}}>$1,820</td><td style={{...st.td}}>$10,200</td><td style={{...st.td}}>$2,340</td><td style={{...st.td}}>$2,377</td><td style={{...st.td}}>$16,737</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>65+</td><td style={{...st.td}}>$2,100</td><td style={{...st.td}}>$2,640</td><td style={{...st.td}}>$6,000</td><td style={{...st.td}}>$2,377</td><td style={{...st.td}}>$13,117</td></tr>
          </tbody></table></div>
        </div>
        <AdUnit slot="3248634657" />
        <div style={st.box}><h2 style={st.h2}>Related Calculators</h2><div style={{display:'flex',flexWrap:'wrap',gap:8}}><a href="/budget-planner-calculator" style={st.calcLink}>budget planner calculator</a>
            <a href="/net-worth-calculator" style={st.calcLink}>net worth calculator</a></div></div>
        <div style={st.box}><h2 style={st.h2}>Frequently Asked Questions</h2>{faqs.map((faq,i)=>(<div key={i} style={i<faqs.length-1?{borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:16,marginBottom:16}:{paddingBottom:8}}><h3 style={{fontSize:14,fontWeight:600,color:'#e2e8f0',marginBottom:6,marginTop:0}}>{faq.q}</h3><p style={{fontSize:13,color:'#94a3b8',lineHeight:1.7,margin:0}}>{faq.a}</p></div>))}</div>
      </div>
      <Footer />
    </div>)
}