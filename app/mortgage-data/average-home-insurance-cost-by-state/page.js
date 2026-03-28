import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import AdUnit from '../../../components/AdUnit'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
  title: 'Average Home Insurance Cost by State 2026 (All 50 States) | FreeFinCalc',
  description: 'Homeowners insurance rates for all 50 states. Average annual premiums, factors that affect cost, and ways to save.',
  alternates: { canonical: 'https://www.freefincalc.net/mortgage-data/average-home-insurance-cost-by-state' },
  openGraph: { title: 'Average Home Insurance Cost by State 2026 (All 50 States)', description: 'Homeowners insurance rates for all 50 states. Average annual premiums, factors that affect cost, and ways to save.', url: 'https://www.freefincalc.net/mortgage-data/average-home-insurance-cost-by-state', siteName: 'FreeFinCalc', type: 'article' },
}

const faqs = [{"q":"How much is homeowners insurance on average?","a":"The national average homeowners insurance premium is $2,377/year ($198/month) in 2026. This varies dramatically by state from $1,020 in Oregon to $4,820 in Oklahoma."},{"q":"Which state has the cheapest home insurance?","a":"Oregon has the lowest average home insurance at $1,020/year, followed by Hawaii ($1,050) and Vermont ($1,150). States with low natural disaster risk have the cheapest premiums."},{"q":"Which state has the most expensive home insurance?","a":"Oklahoma has the most expensive home insurance at $4,820/year due to high tornado and hail risk. Kansas ($4,250), Nebraska ($4,100), and Texas ($3,950) are also very expensive."},{"q":"How can I lower my home insurance?","a":"Raise your deductible to $2,500 (saves 10-25%), bundle with auto insurance (saves 5-15%), improve your credit score, install security systems and smoke detectors, replace your roof, and shop quotes from at least 5 insurers annually."}]

export default function Page() {
  const st = {
    page: { minHeight: '100vh', background: '#0f1117', color: '#e2e8f0' },
    wrap: { maxWidth: 1000, margin: '0 auto', padding: '32px 16px 64px' },
    h1: { fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 900, color: '#f1f5f9', margin: '0 0 12px', lineHeight: 1.15 },
    desc: { fontSize: 15, color: '#94a3b8', lineHeight: 1.7, margin: '0 0 28px' },
    box: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 24, marginBottom: 24 },
    h2: { fontSize: 20, fontWeight: 700, color: '#f1f5f9', margin: '0 0 16px' },
    table: { width: '100%', borderCollapse: 'collapse', fontSize: 13 },
    th: { padding: '10px 12px', textAlign: 'left', color: '#f0c842', fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid rgba(240,200,66,0.2)' },
    td: { padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#94a3b8' },
    calcLink: { display: 'inline-block', padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none', margin: '0 8px 8px 0', background: 'rgba(240,200,66,0.08)', border: '1px solid rgba(240,200,66,0.2)', color: '#f0c842' },
  }

  return (
    <div style={st.page}>
      <Header />
      <FaqSchema faqs={faqs} />
      <AdUnit slot="7405024590" />
      <div style={st.wrap}>
        <nav style={{fontSize:13,color:'#64748b',marginBottom:20,display:'flex',gap:6,flexWrap:'wrap'}}>
          <a href="/" style={{color:'#64748b',textDecoration:'none'}}>Home</a>
          <span style={{color:'#475569'}}>{'\u203a'}</span>
          <a href="/mortgage-data" style={{color:'#64748b',textDecoration:'none'}}>Mortgage Data</a>
          <span style={{color:'#475569'}}>{'\u203a'}</span>
          <span style={{color:'#94a3b8'}}>Average Home Insurance Cost by State 2026</span>
        </nav>
        <h1 style={st.h1}>Average Home Insurance Cost by State 2026 (All 50 States)</h1>
        <p style={st.desc}>Homeowners insurance rates for all 50 states. Average annual premiums, factors that affect cost, and ways to save.</p>

        <div style={st.box}>
          <h2 style={st.h2}>Annual Homeowners Insurance Premiums by State</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Rank</th><th style={st.th}>State</th><th style={st.th}>Annual Premium</th><th style={st.th}>Monthly</th><th style={st.th}>Notes</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>1</td><td style={{...st.td}}>Oklahoma</td><td style={{...st.td}}>$4,820</td><td style={{...st.td}}>$402</td><td style={{...st.td}}>Tornado/hail risk</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2</td><td style={{...st.td}}>Kansas</td><td style={{...st.td}}>$4,250</td><td style={{...st.td}}>$354</td><td style={{...st.td}}>Severe storm risk</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>3</td><td style={{...st.td}}>Nebraska</td><td style={{...st.td}}>$4,100</td><td style={{...st.td}}>$342</td><td style={{...st.td}}>Hail alley</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>4</td><td style={{...st.td}}>Texas</td><td style={{...st.td}}>$3,950</td><td style={{...st.td}}>$329</td><td style={{...st.td}}>Hurricane + hail</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>5</td><td style={{...st.td}}>Florida</td><td style={{...st.td}}>$3,850</td><td style={{...st.td}}>$321</td><td style={{...st.td}}>Hurricane risk</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>6</td><td style={{...st.td}}>Louisiana</td><td style={{...st.td}}>$3,750</td><td style={{...st.td}}>$313</td><td style={{...st.td}}>Hurricane + flood</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>7</td><td style={{...st.td}}>Colorado</td><td style={{...st.td}}>$3,600</td><td style={{...st.td}}>$300</td><td style={{...st.td}}>Hail + wildfire</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>8</td><td style={{...st.td}}>Mississippi</td><td style={{...st.td}}>$3,450</td><td style={{...st.td}}>$288</td><td style={{...st.td}}>Hurricane risk</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>9</td><td style={{...st.td}}>South Dakota</td><td style={{...st.td}}>$3,300</td><td style={{...st.td}}>$275</td><td style={{...st.td}}>Severe weather</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>10</td><td style={{...st.td}}>Arkansas</td><td style={{...st.td}}>$3,200</td><td style={{...st.td}}>$267</td><td style={{...st.td}}>Tornado alley</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>11</td><td style={{...st.td}}>Alabama</td><td style={{...st.td}}>$3,050</td><td style={{...st.td}}>$254</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>12</td><td style={{...st.td}}>Minnesota</td><td style={{...st.td}}>$2,950</td><td style={{...st.td}}>$246</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>13</td><td style={{...st.td}}>Kentucky</td><td style={{...st.td}}>$2,850</td><td style={{...st.td}}>$238</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>14</td><td style={{...st.td}}>Montana</td><td style={{...st.td}}>$2,800</td><td style={{...st.td}}>$233</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>15</td><td style={{...st.td}}>Missouri</td><td style={{...st.td}}>$2,750</td><td style={{...st.td}}>$229</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>16</td><td style={{...st.td}}>Georgia</td><td style={{...st.td}}>$2,650</td><td style={{...st.td}}>$221</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>17</td><td style={{...st.td}}>Iowa</td><td style={{...st.td}}>$2,600</td><td style={{...st.td}}>$217</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>18</td><td style={{...st.td}}>North Dakota</td><td style={{...st.td}}>$2,550</td><td style={{...st.td}}>$213</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>19</td><td style={{...st.td}}>Michigan</td><td style={{...st.td}}>$2,500</td><td style={{...st.td}}>$208</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>20</td><td style={{...st.td}}>South Carolina</td><td style={{...st.td}}>$2,450</td><td style={{...st.td}}>$204</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>---</td><td style={{...st.td}}>National Average</td><td style={{...st.td}}>$2,377</td><td style={{...st.td}}>$198</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>48</td><td style={{...st.td}}>Vermont</td><td style={{...st.td}}>$1,150</td><td style={{...st.td}}>$96</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>49</td><td style={{...st.td}}>Hawaii</td><td style={{...st.td}}>$1,050</td><td style={{...st.td}}>$88</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>50</td><td style={{...st.td}}>Oregon</td><td style={{...st.td}}>$1,020</td><td style={{...st.td}}>$85</td><td style={{...st.td}}>Lowest in US</td></tr>
          </tbody></table></div>
        </div>
        <AdUnit slot="3248634657" />
        <div style={st.box}>
          <h2 style={st.h2}>What Affects Home Insurance Cost</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Factor</th><th style={st.th}>Impact on Premium</th><th style={st.th}>Details</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Home Value/Rebuild Cost</td><td style={{...st.td}}>50-60%</td><td style={{...st.td}}>Higher value = higher premium</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Location/Natural Disaster Risk</td><td style={{...st.td}}>20-25%</td><td style={{...st.td}}>Hurricane, tornado, wildfire zones</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Deductible Amount</td><td style={{...st.td}}>10-15%</td><td style={{...st.td}}>Higher deductible = lower premium</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Credit Score</td><td style={{...st.td}}>5-10%</td><td style={{...st.td}}>Better score = lower premium</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Claims History</td><td style={{...st.td}}>5-10%</td><td style={{...st.td}}>Previous claims raise rates</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Home Age</td><td style={{...st.td}}>3-5%</td><td style={{...st.td}}>Newer homes cost less to insure</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Roof Condition/Age</td><td style={{...st.td}}>3-5%</td><td style={{...st.td}}>New roof = significant discount</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Pool/Trampoline</td><td style={{...st.td}}>1-3%</td><td style={{...st.td}}>Liability risk increases premium</td></tr>
          </tbody></table></div>
        </div>
        <div style={st.box}>
          <h2 style={st.h2}>Related Calculators</h2>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            <a href="/mortgage-calculator" style={st.calcLink}>mortgage calculator</a>
            <a href="/home-affordability-calculator" style={st.calcLink}>home affordability calculator</a>
            <a href="/budget-planner-calculator" style={st.calcLink}>budget planner calculator</a>
            <a href="/property-tax-calculator" style={st.calcLink}>property tax calculator</a>
          </div>
        </div>
        <div style={st.box}>
          <h2 style={st.h2}>Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <div key={i} style={i < faqs.length - 1 ? {borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:16,marginBottom:16} : {paddingBottom:8}}>
              <h3 style={{fontSize:14,fontWeight:600,color:'#e2e8f0',marginBottom:6,marginTop:0}}>{faq.q}</h3>
              <p style={{fontSize:13,color:'#94a3b8',lineHeight:1.7,margin:0}}>{faq.a}</p>
            </div>))}
        </div>
      </div>
      <Footer />
    </div>
  )
}