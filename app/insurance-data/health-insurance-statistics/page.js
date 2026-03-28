import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import AdUnit from '../../../components/AdUnit'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
  title: 'Health Insurance Statistics 2026: Coverage, Costs and Uninsured | FreeFinCalc',
  description: 'US health insurance coverage rates, premiums, uninsured population, and healthcare spending data.',
  alternates: { canonical: 'https://www.freefincalc.net/insurance-data/health-insurance-statistics' },
  openGraph: { title: 'Health Insurance Statistics 2026: Coverage, Costs and Uninsured', description: 'US health insurance coverage rates, premiums, uninsured population, and healthcare spending data.', url: 'https://www.freefincalc.net/insurance-data/health-insurance-statistics', siteName: 'FreeFinCalc', type: 'article' },
}

const faqs = [{"q":"How many Americans are uninsured?","a":"About 26 million Americans (7.9%) are uninsured in 2026."},{"q":"How much does the US spend on healthcare?","a":"The US spends $13,493 per person annually, nearly 2.5x the OECD average."}]

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
        <nav style={{fontSize:13,color:'#64748b',marginBottom:20,display:'flex',gap:6,flexWrap:'wrap'}}><a href="/" style={{color:'#64748b',textDecoration:'none'}}>Home</a><span style={{color:'#475569'}}>{'\u203a'}</span><a href="/insurance-data" style={{color:'#64748b',textDecoration:'none'}}>Insurance Data</a><span style={{color:'#475569'}}>{'\u203a'}</span><span style={{color:'#94a3b8'}}>Health Insurance Statistics 2026</span></nav>
        <h1 style={st.h1}>Health Insurance Statistics 2026: Coverage, Costs and Uninsured</h1>
        <p style={st.desc}>US health insurance coverage rates, premiums, uninsured population, and healthcare spending data.</p>

        <div style={st.box}>
          <h2 style={st.h2}>US Health Insurance Coverage</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Type</th><th style={st.th}>% of Population</th><th style={st.th}>People</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Total Insured</td><td style={{...st.td}}>92.1%</td><td style={{...st.td}}>305 million</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Employer-Sponsored</td><td style={{...st.td}}>49.6%</td><td style={{...st.td}}>164 million</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Medicaid</td><td style={{...st.td}}>21.2%</td><td style={{...st.td}}>70 million</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Medicare</td><td style={{...st.td}}>18.7%</td><td style={{...st.td}}>62 million</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Marketplace</td><td style={{...st.td}}>5.8%</td><td style={{...st.td}}>19 million</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Uninsured</td><td style={{...st.td}}>7.9%</td><td style={{...st.td}}>26 million</td></tr>
          </tbody></table></div>
        </div>
        <AdUnit slot="3248634657" />
        <div style={st.box}>
          <h2 style={st.h2}>Healthcare Spending by Country</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Country</th><th style={st.th}>Per Capita</th><th style={st.th}>% of GDP</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>United States</td><td style={{...st.td}}>$13,493</td><td style={{...st.td}}>17.8% of GDP</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Switzerland</td><td style={{...st.td}}>$8,650</td><td style={{...st.td}}>11.8%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Germany</td><td style={{...st.td}}>$7,890</td><td style={{...st.td}}>12.7%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Canada</td><td style={{...st.td}}>$6,320</td><td style={{...st.td}}>12.1%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>UK</td><td style={{...st.td}}>$5,150</td><td style={{...st.td}}>11.3%</td></tr>
          </tbody></table></div>
        </div>
        <div style={st.box}><h2 style={st.h2}>Related Calculators</h2><div style={{display:'flex',flexWrap:'wrap',gap:8}}><a href="/budget-planner-calculator" style={st.calcLink}>budget planner calculator</a>
            <a href="/salary-after-tax-calculator" style={st.calcLink}>salary after tax calculator</a></div></div>
        <div style={st.box}><h2 style={st.h2}>Frequently Asked Questions</h2>{faqs.map((faq,i)=>(<div key={i} style={i<faqs.length-1?{borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:16,marginBottom:16}:{paddingBottom:8}}><h3 style={{fontSize:14,fontWeight:600,color:'#e2e8f0',marginBottom:6,marginTop:0}}>{faq.q}</h3><p style={{fontSize:13,color:'#94a3b8',lineHeight:1.7,margin:0}}>{faq.a}</p></div>))}</div>
      </div>
      <Footer />
    </div>)
}