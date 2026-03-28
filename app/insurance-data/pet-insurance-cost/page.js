import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import AdUnit from '../../../components/AdUnit'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
  title: 'Pet Insurance Cost 2026: Average Rates for Dogs and Cats | FreeFinCalc',
  description: 'How much does pet insurance cost? Average premiums for dogs and cats by breed, age, and coverage.',
  alternates: { canonical: 'https://www.freefincalc.net/insurance-data/pet-insurance-cost' },
  openGraph: { title: 'Pet Insurance Cost 2026: Average Rates for Dogs and Cats', description: 'How much does pet insurance cost? Average premiums for dogs and cats by breed, age, and coverage.', url: 'https://www.freefincalc.net/insurance-data/pet-insurance-cost', siteName: 'FreeFinCalc', type: 'article' },
}

const faqs = [{"q":"How much is pet insurance?","a":"Dog insurance averages $56/month. Cat insurance averages $32/month for accident and illness coverage."},{"q":"Is pet insurance worth it?","a":"One emergency surgery costs $3,000-$6,000. At $56/month, insurance pays for itself with one major claim."}]

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
        <nav style={{fontSize:13,color:'#64748b',marginBottom:20,display:'flex',gap:6,flexWrap:'wrap'}}><a href="/" style={{color:'#64748b',textDecoration:'none'}}>Home</a><span style={{color:'#475569'}}>{'\u203a'}</span><a href="/insurance-data" style={{color:'#64748b',textDecoration:'none'}}>Insurance Data</a><span style={{color:'#475569'}}>{'\u203a'}</span><span style={{color:'#94a3b8'}}>Pet Insurance Cost 2026</span></nav>
        <h1 style={st.h1}>Pet Insurance Cost 2026: Average Rates for Dogs and Cats</h1>
        <p style={st.desc}>How much does pet insurance cost? Average premiums for dogs and cats by breed, age, and coverage.</p>

        <div style={st.box}>
          <h2 style={st.h2}>Average Monthly Pet Insurance Premiums</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Pet/Plan</th><th style={st.th}>Monthly</th><th style={st.th}>Annual</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Dog (Accident + Illness)</td><td style={{...st.td}}>$56</td><td style={{...st.td}}>$672</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Dog (Accident Only)</td><td style={{...st.td}}>$22</td><td style={{...st.td}}>$264</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Cat (Accident + Illness)</td><td style={{...st.td}}>$32</td><td style={{...st.td}}>$384</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Cat (Accident Only)</td><td style={{...st.td}}>$12</td><td style={{...st.td}}>$144</td></tr>
          </tbody></table></div>
        </div>
        <AdUnit slot="3248634657" />
        <div style={st.box}>
          <h2 style={st.h2}>Dog Insurance by Breed</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Breed</th><th style={st.th}>Monthly</th><th style={st.th}>Risk</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Mixed Breed</td><td style={{...st.td}}>$42</td><td style={{...st.td}}>Lower risk</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Labrador</td><td style={{...st.td}}>$55</td><td style={{...st.td}}>Joint issues</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>French Bulldog</td><td style={{...st.td}}>$72</td><td style={{...st.td}}>Breathing issues</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Bulldog</td><td style={{...st.td}}>$78</td><td style={{...st.td}}>Most expensive</td></tr>
          </tbody></table></div>
        </div>
        <div style={st.box}>
          <h2 style={st.h2}>Average Vet Costs</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Procedure</th><th style={st.th}>Cost Range</th><th style={st.th}></th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Annual Wellness Visit</td><td style={{...st.td}}>$250-$400</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Emergency Room</td><td style={{...st.td}}>$800-$2,500</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>ACL Surgery</td><td style={{...st.td}}>$3,500-$6,000</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Cancer Treatment</td><td style={{...st.td}}>$5,000-$15,000</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Dental Cleaning</td><td style={{...st.td}}>$500-$1,200</td><td style={{...st.td}}></td></tr>
          </tbody></table></div>
        </div>
        <div style={st.box}><h2 style={st.h2}>Related Calculators</h2><div style={{display:'flex',flexWrap:'wrap',gap:8}}><a href="/budget-planner-calculator" style={st.calcLink}>budget planner calculator</a>
            <a href="/savings-goal-calculator" style={st.calcLink}>savings goal calculator</a></div></div>
        <div style={st.box}><h2 style={st.h2}>Frequently Asked Questions</h2>{faqs.map((faq,i)=>(<div key={i} style={i<faqs.length-1?{borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:16,marginBottom:16}:{paddingBottom:8}}><h3 style={{fontSize:14,fontWeight:600,color:'#e2e8f0',marginBottom:6,marginTop:0}}>{faq.q}</h3><p style={{fontSize:13,color:'#94a3b8',lineHeight:1.7,margin:0}}>{faq.a}</p></div>))}</div>
      </div>
      <Footer />
    </div>)
}