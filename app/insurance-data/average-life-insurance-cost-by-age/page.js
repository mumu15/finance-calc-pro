import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import AdUnit from '../../../components/AdUnit'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
  title: 'Average Life Insurance Cost by Age 2026 (Monthly Rates) | FreeFinCalc',
  description: 'Life insurance rates by age and coverage amount. Term life and whole life premiums for ages 20-70.',
  alternates: { canonical: 'https://www.freefincalc.net/insurance-data/average-life-insurance-cost-by-age' },
  openGraph: { title: 'Average Life Insurance Cost by Age 2026 (Monthly Rates)', description: 'Life insurance rates by age and coverage amount. Term life and whole life premiums for ages 20-70.', url: 'https://www.freefincalc.net/insurance-data/average-life-insurance-cost-by-age', siteName: 'FreeFinCalc', type: 'article' },
}

const faqs = [{"q":"How much does life insurance cost?","a":"A healthy 30-year-old male pays about $23/month for $500,000 of 20-year term life insurance."},{"q":"Is term or whole life better?","a":"Term life is better for most people. It costs $27/month vs $385/month for whole life at age 35. Invest the difference for better returns."}]

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
        <nav style={{fontSize:13,color:'#64748b',marginBottom:20,display:'flex',gap:6,flexWrap:'wrap'}}><a href="/" style={{color:'#64748b',textDecoration:'none'}}>Home</a><span style={{color:'#475569'}}>{'\u203a'}</span><a href="/insurance-data" style={{color:'#64748b',textDecoration:'none'}}>Insurance Data</a><span style={{color:'#475569'}}>{'\u203a'}</span><span style={{color:'#94a3b8'}}>Average Life Insurance Cost by Age 2026</span></nav>
        <h1 style={st.h1}>Average Life Insurance Cost by Age 2026 (Monthly Rates)</h1>
        <p style={st.desc}>Life insurance rates by age and coverage amount. Term life and whole life premiums for ages 20-70.</p>

        <div style={st.box}>
          <h2 style={st.h2}>Monthly Term Life Rates ($500K, 20-Year)</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Age</th><th style={st.th}>Male</th><th style={st.th}>Female</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>25</td><td style={{...st.td}}>$21</td><td style={{...st.td}}>$17</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>30</td><td style={{...st.td}}>$23</td><td style={{...st.td}}>$19</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>35</td><td style={{...st.td}}>$27</td><td style={{...st.td}}>$22</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>40</td><td style={{...st.td}}>$38</td><td style={{...st.td}}>$30</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>45</td><td style={{...st.td}}>$58</td><td style={{...st.td}}>$45</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>50</td><td style={{...st.td}}>$95</td><td style={{...st.td}}>$72</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>55</td><td style={{...st.td}}>$165</td><td style={{...st.td}}>$118</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>60</td><td style={{...st.td}}>$295</td><td style={{...st.td}}>$198</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>65</td><td style={{...st.td}}>$520</td><td style={{...st.td}}>$365</td></tr>
          </tbody></table></div>
        </div>
        <AdUnit slot="3248634657" />
        <div style={st.box}>
          <h2 style={st.h2}>Term vs Whole Life (Male, Age 35, $500K)</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Type</th><th style={st.th}>Monthly Cost</th><th style={st.th}>Notes</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>20-Year Term</td><td style={{...st.td}}>$27/mo</td><td style={{...st.td}}>Cheapest</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>30-Year Term</td><td style={{...st.td}}>$42/mo</td><td style={{...st.td}}>Longest term</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Whole Life</td><td style={{...st.td}}>$385/mo</td><td style={{...st.td}}>Permanent, cash value</td></tr>
          </tbody></table></div>
        </div>
        <div style={st.box}><h2 style={st.h2}>Related Calculators</h2><div style={{display:'flex',flexWrap:'wrap',gap:8}}><a href="/budget-planner-calculator" style={st.calcLink}>budget planner calculator</a>
            <a href="/net-worth-calculator" style={st.calcLink}>net worth calculator</a></div></div>
        <div style={st.box}><h2 style={st.h2}>Frequently Asked Questions</h2>{faqs.map((faq,i)=>(<div key={i} style={i<faqs.length-1?{borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:16,marginBottom:16}:{paddingBottom:8}}><h3 style={{fontSize:14,fontWeight:600,color:'#e2e8f0',marginBottom:6,marginTop:0}}>{faq.q}</h3><p style={{fontSize:13,color:'#94a3b8',lineHeight:1.7,margin:0}}>{faq.a}</p></div>))}</div>
      </div>
      <Footer />
    </div>)
}