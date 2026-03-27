import Header from '../../components/Header'
import Footer from '../../components/Footer'
import AdUnit from '../../components/AdUnit'
import FaqSchema from '../../components/FaqSchema'

export const metadata = {
  title: 'Social Security Benefits by Age 2026 (Monthly Payment Table) | FreeFinCalc',
  description: 'Estimated Social Security retirement benefits by claiming age from 62 to 70. See how much more you get by waiting, plus maximum benefit amounts.',
  alternates: { canonical: 'https://www.freefincalc.net/social-security-benefits-by-age' },
  openGraph: {
    title: 'Social Security Benefits by Age 2026 (Monthly Payment Table)',
    description: 'Estimated Social Security retirement benefits by claiming age from 62 to 70. See how much more you get by waiting, plus maximum benefit amounts.',
    url: 'https://www.freefincalc.net/social-security-benefits-by-age',
    siteName: 'FreeFinCalc',
    type: 'article',
  },
}

const faqs = [{"q":"What is the maximum Social Security benefit in 2026?","a":"The maximum benefit at age 70 is $4,873/month ($58,476/year). At full retirement age (67), the maximum is $3,822/month. At age 62, the maximum is $2,710/month."},{"q":"What is full retirement age in 2026?","a":"Full retirement age (FRA) is 67 for anyone born in 1960 or later. This is the age at which you receive 100% of your benefit. Claiming earlier reduces it; waiting until 70 increases it."},{"q":"How much does Social Security increase per year after 67?","a":"Benefits increase 8% per year for each year you delay past FRA until age 70. Waiting from 67 to 70 increases your benefit by 24%."},{"q":"Should I claim Social Security at 62 or wait?","a":"If you claim at 62, you get 30% less per month but collect for 5+ more years. If you wait until 70, you get 24% more. The break-even age is around 80-82. If you expect to live past 82, waiting is better financially."}]

export default function Page() {
  const st = {
    page: { minHeight: '100vh', background: '#0f1117', color: '#e2e8f0' },
    wrap: { maxWidth: 1000, margin: '0 auto', padding: '32px 16px 64px' },
    h1: { fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 900, color: '#f1f5f9', margin: '0 0 12px', lineHeight: 1.15 },
    desc: { fontSize: 15, color: '#94a3b8', lineHeight: 1.7, margin: '0 0 8px' },
    vol: { fontSize: 12, color: '#64748b', margin: '0 0 28px' },
    box: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 24, marginBottom: 24 },
    h2: { fontSize: 20, fontWeight: 700, color: '#f1f5f9', margin: '0 0 16px' },
    table: { width: '100%', borderCollapse: 'collapse', fontSize: 13 },
    th: { padding: '10px 12px', textAlign: 'left', color: '#f0c842', fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid rgba(240,200,66,0.2)' },
    td: { padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#94a3b8' },
    calcLink: { display: 'inline-block', padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none', margin: '0 8px 8px 0', background: 'rgba(240,200,66,0.08)', border: '1px solid rgba(240,200,66,0.2)', color: '#f0c842' },
    dataLink: { display: 'inline-block', padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, textDecoration: 'none', margin: '0 6px 8px 0', background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)', color: '#60a5fa' },
  }

  return (
    <div style={st.page}>
      <Header />
      <FaqSchema faqs={faqs} />
      <AdUnit slot="7405024590" />
      <div style={st.wrap}>
        <nav style={{fontSize:13,color:'#64748b',marginBottom:20,display:'flex',gap:6,flexWrap:'wrap'}}>
          <a href="/" style={{color:'#64748b',textDecoration:'none'}}>Home</a>
          <span style={{color:'#475569'}}>\u203a</span>
          <span style={{color:'#94a3b8'}}>Social Security Benefits by Age</span>
        </nav>

        <h1 style={st.h1}>Social Security Benefits by Age 2026 (Monthly Payment Table)</h1>
        <p style={st.desc}>Estimated Social Security retirement benefits by claiming age from 62 to 70. See how much more you get by waiting, plus maximum benefit amounts.</p>
        <p style={st.vol}>Est. monthly search volume: 150K+/mo</p>

        <div style={st.box}>
          <h2 style={st.h2}>Social Security Benefits by Age 2026</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr>
            <th style={st.th}>Claiming Age</th>
            <th style={st.th}>% of Full Benefit</th>
            <th style={st.th}>Est. Monthly</th>
            <th style={st.th}>Est. Annual</th>
            <th style={st.th}>Notes</th>
          </tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>62</td><td style={{...st.td}}>70%</td><td style={{...st.td}}>$1,274</td><td style={{...st.td}}>$15,288</td><td style={{...st.td}}>Maximum reduction (30%)</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>63</td><td style={{...st.td}}>75%</td><td style={{...st.td}}>$1,365</td><td style={{...st.td}}>$16,380</td><td style={{...st.td}}>25% reduction</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>64</td><td style={{...st.td}}>80%</td><td style={{...st.td}}>$1,456</td><td style={{...st.td}}>$17,472</td><td style={{...st.td}}>20% reduction</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>65</td><td style={{...st.td}}>86.7%</td><td style={{...st.td}}>$1,578</td><td style={{...st.td}}>$18,936</td><td style={{...st.td}}>13.3% reduction</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>66</td><td style={{...st.td}}>93.3%</td><td style={{...st.td}}>$1,698</td><td style={{...st.td}}>$20,376</td><td style={{...st.td}}>6.7% reduction</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>67 (FRA)</td><td style={{...st.td}}>100%</td><td style={{...st.td}}>$1,820</td><td style={{...st.td}}>$21,840</td><td style={{...st.td}}>Full Retirement Age</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>68</td><td style={{...st.td}}>108%</td><td style={{...st.td}}>$1,966</td><td style={{...st.td}}>$23,592</td><td style={{...st.td}}>8% delayed credit</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>69</td><td style={{...st.td}}>116%</td><td style={{...st.td}}>$2,111</td><td style={{...st.td}}>$25,332</td><td style={{...st.td}}>16% delayed credit</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>70</td><td style={{...st.td}}>124%</td><td style={{...st.td}}>$2,257</td><td style={{...st.td}}>$27,084</td><td style={{...st.td}}>Maximum benefit age</td></tr>
          </tbody></table></div>
        </div>

        <AdUnit slot="3248634657" />
        <div style={st.box}>
          <h2 style={st.h2}>Maximum Social Security Benefits 2026</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr>
            <th style={st.th}>Claiming Age</th>
            <th style={st.th}>Maximum Monthly Benefit</th>
          </tr></thead><tbody>
            <tr style={{background:'transparent'}}><td style={st.td}>Age 62</td><td style={st.td}>$2,710/mo ($32,520/yr)</td></tr>
            <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={st.td}>Age 67 (FRA)</td><td style={st.td}>$3,822/mo ($45,864/yr)</td></tr>
            <tr style={{background:'transparent'}}><td style={st.td}>Age 70</td><td style={st.td}>$4,873/mo ($58,476/yr)</td></tr>
          </tbody></table></div>
        </div>

        <div style={st.box}>
          <h2 style={st.h2}>Related Calculators</h2>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            <a href="/social-security-calculator" style={st.calcLink}>social security calculator</a>
            <a href="/retirement-calculator" style={st.calcLink}>retirement calculator</a>
            <a href="/fire-calculator" style={st.calcLink}>fire calculator</a>
          </div>
        </div>

        <div style={st.box}>
          <h2 style={st.h2}>Related Data</h2>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            <a href="/data/best-states-for-retirees" style={st.dataLink}>best states for retirees</a>
            <a href="/data/states-where-you-can-retire-on-50k" style={st.dataLink}>states where you can retire on 50k</a>
            <a href="/financial-data/average-retirement-savings-by-age" style={st.dataLink}>average retirement savings by age</a>
          </div>
        </div>

        <div style={st.box}>
          <h2 style={st.h2}>Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <div key={i} style={i < faqs.length - 1 ? {borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:16,marginBottom:16} : {paddingBottom:8}}>
              <h3 style={{fontSize:14,fontWeight:600,color:'#e2e8f0',marginBottom:6,marginTop:0}}>{faq.q}</h3>
              <p style={{fontSize:13,color:'#94a3b8',lineHeight:1.7,margin:0}}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"Article","headline":"Social Security Benefits by Age 2026 (Monthly Payment Table)","description":"Estimated Social Security retirement benefits by claiming age from 62 to 70. See how much more you get by waiting, plus maximum benefit amounts.","author":{"@type":"Organization","name":"FreeFinCalc"},"publisher":{"@type":"Organization","name":"FreeFinCalc"},"datePublished":"2026-03-27","dateModified":"2026-03-27","mainEntityOfPage":"https://www.freefincalc.net/social-security-benefits-by-age"})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Social Security Benefits by Age 2026","item":"https://www.freefincalc.net/social-security-benefits-by-age"}]})}} />
      <Footer />
    </div>
  )
}
