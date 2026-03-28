import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import AdUnit from '../../../components/AdUnit'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
  title: 'Average Health Insurance Cost 2026 (By Age, Family Size and Plan) | FreeFinCalc',
  description: 'Health insurance premiums by age, family size, and plan type. Marketplace, employer, and individual plan costs compared.',
  alternates: { canonical: 'https://www.freefincalc.net/insurance-data/average-health-insurance-cost' },
  openGraph: { title: 'Average Health Insurance Cost 2026 (By Age, Family Size and Plan)', description: 'Health insurance premiums by age, family size, and plan type. Marketplace, employer, and individual plan costs compared.', url: 'https://www.freefincalc.net/insurance-data/average-health-insurance-cost', siteName: 'FreeFinCalc', type: 'article' },
}

const faqs = [{"q":"How much does health insurance cost per month?","a":"The average marketplace plan costs $580/month for individuals. Through an employer, employees pay $145/month on average."},{"q":"How much does family health insurance cost?","a":"Family marketplace plans average $1,580/month. Employer family plans cost employees about $425/month."}]

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
        <nav style={{fontSize:13,color:'#64748b',marginBottom:20,display:'flex',gap:6,flexWrap:'wrap'}}><a href="/" style={{color:'#64748b',textDecoration:'none'}}>Home</a><span style={{color:'#475569'}}>{'\u203a'}</span><a href="/insurance-data" style={{color:'#64748b',textDecoration:'none'}}>Insurance Data</a><span style={{color:'#475569'}}>{'\u203a'}</span><span style={{color:'#94a3b8'}}>Average Health Insurance Cost 2026</span></nav>
        <h1 style={st.h1}>Average Health Insurance Cost 2026 (By Age, Family Size and Plan)</h1>
        <p style={st.desc}>Health insurance premiums by age, family size, and plan type. Marketplace, employer, and individual plan costs compared.</p>

        <div style={st.box}>
          <h2 style={st.h2}>Average Monthly Health Insurance Premiums</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Plan Type</th><th style={st.th}>Monthly</th><th style={st.th}>Annual</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Individual (Marketplace)</td><td style={{...st.td}}>$580</td><td style={{...st.td}}>$6,960</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Individual (Employer)</td><td style={{...st.td}}>$145</td><td style={{...st.td}}>$1,740</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Family (Marketplace)</td><td style={{...st.td}}>$1,580</td><td style={{...st.td}}>$18,960</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Family (Employer)</td><td style={{...st.td}}>$425</td><td style={{...st.td}}>$5,100</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Medicare Part B</td><td style={{...st.td}}>$185</td><td style={{...st.td}}>$2,220</td></tr>
          </tbody></table></div>
        </div>
        <AdUnit slot="3248634657" />
        <div style={st.box}>
          <h2 style={st.h2}>Health Insurance by Age (Marketplace)</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Age</th><th style={st.th}>Monthly</th><th style={st.th}>Annual</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>21</td><td style={{...st.td}}>$325</td><td style={{...st.td}}>$3,900</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>30</td><td style={{...st.td}}>$385</td><td style={{...st.td}}>$4,620</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>40</td><td style={{...st.td}}>$490</td><td style={{...st.td}}>$5,880</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>50</td><td style={{...st.td}}>$680</td><td style={{...st.td}}>$8,160</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>60</td><td style={{...st.td}}>$975</td><td style={{...st.td}}>$11,700</td></tr>
          </tbody></table></div>
        </div>
        <div style={st.box}><h2 style={st.h2}>Related Calculators</h2><div style={{display:'flex',flexWrap:'wrap',gap:8}}><a href="/budget-planner-calculator" style={st.calcLink}>budget planner calculator</a>
            <a href="/salary-after-tax-calculator" style={st.calcLink}>salary after tax calculator</a></div></div>
        <div style={st.box}><h2 style={st.h2}>Frequently Asked Questions</h2>{faqs.map((faq,i)=>(<div key={i} style={i<faqs.length-1?{borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:16,marginBottom:16}:{paddingBottom:8}}><h3 style={{fontSize:14,fontWeight:600,color:'#e2e8f0',marginBottom:6,marginTop:0}}>{faq.q}</h3><p style={{fontSize:13,color:'#94a3b8',lineHeight:1.7,margin:0}}>{faq.a}</p></div>))}</div>
      </div>
      <Footer />
    </div>)
}