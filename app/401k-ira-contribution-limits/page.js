import Header from '../../components/Header'
import Footer from '../../components/Footer'
import AdUnit from '../../components/AdUnit'
import FaqSchema from '../../components/FaqSchema'

export const metadata = {
  title: '401k & IRA Contribution Limits 2026 (Complete Guide) | FreeFinCalc',
  description: 'All retirement account contribution limits for 2026. 401k, Roth IRA, Traditional IRA, SEP IRA, SIMPLE IRA, HSA, and 529 plan limits.',
  alternates: { canonical: 'https://www.freefincalc.net/401k-ira-contribution-limits' },
  openGraph: {
    title: '401k & IRA Contribution Limits 2026 (Complete Guide)',
    description: 'All retirement account contribution limits for 2026. 401k, Roth IRA, Traditional IRA, SEP IRA, SIMPLE IRA, HSA, and 529 plan limits.',
    url: 'https://www.freefincalc.net/401k-ira-contribution-limits',
    siteName: 'FreeFinCalc',
    type: 'article',
  },
}

const faqs = [{"q":"What is the 401k contribution limit for 2026?","a":"The 2026 401k employee contribution limit is $23,500. If you are 50 or older, you can contribute an additional $7,500 in catch-up contributions for a total of $31,000."},{"q":"What is the Roth IRA limit for 2026?","a":"The 2026 Roth IRA contribution limit is $7,000 ($8,000 if 50+). Income limits apply: single filers must earn under $165,000, married filing jointly under $246,000 for full contributions."},{"q":"Can I contribute to both a 401k and IRA?","a":"Yes, you can contribute to both. However, if you have a workplace 401k, your Traditional IRA contribution may not be tax-deductible above certain income thresholds. Roth IRA eligibility depends on income."},{"q":"What is the HSA contribution limit for 2026?","a":"The 2026 HSA limit is $4,300 for individual coverage and $8,550 for family coverage. An additional $1,000 catch-up is available for those 55+."}]

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
          <span style={{color:'#94a3b8'}}>401k & IRA Contribution Limits</span>
        </nav>

        <h1 style={st.h1}>401k & IRA Contribution Limits 2026 (Complete Guide)</h1>
        <p style={st.desc}>All retirement account contribution limits for 2026. 401k, Roth IRA, Traditional IRA, SEP IRA, SIMPLE IRA, HSA, and 529 plan limits.</p>
        <p style={st.vol}>Est. monthly search volume: 200K+/mo</p>

        <div style={st.box}>
          <h2 style={st.h2}>401k & IRA Contribution Limits 2026</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr>
            <th style={st.th}>Account Type</th>
            <th style={st.th}>2026 Limit</th>
            <th style={st.th}>Catch-Up</th>
            <th style={st.th}>Total with Catch-Up</th>
          </tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>401k / 403b</td><td style={{...st.td}}>$23,500</td><td style={{...st.td}}>$7,500 (50+)</td><td style={{...st.td}}>$31,000 (50+)</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Traditional IRA</td><td style={{...st.td}}>$7,000</td><td style={{...st.td}}>$1,000 (50+)</td><td style={{...st.td}}>$8,000 (50+)</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Roth IRA</td><td style={{...st.td}}>$7,000</td><td style={{...st.td}}>$1,000 (50+)</td><td style={{...st.td}}>$8,000 (50+)</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>SEP IRA</td><td style={{...st.td}}>$69,000 or 25% of comp</td><td style={{...st.td}}>N/A</td><td style={{...st.td}}>$69,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>SIMPLE IRA</td><td style={{...st.td}}>$16,500</td><td style={{...st.td}}>$3,500 (50+)</td><td style={{...st.td}}>$20,000 (50+)</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Solo 401k</td><td style={{...st.td}}>$23,500 + 25% of net SE</td><td style={{...st.td}}>$7,500 (50+)</td><td style={{...st.td}}>$69,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>HSA (Individual)</td><td style={{...st.td}}>$4,300</td><td style={{...st.td}}>$1,000 (55+)</td><td style={{...st.td}}>$5,300 (55+)</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>HSA (Family)</td><td style={{...st.td}}>$8,550</td><td style={{...st.td}}>$1,000 (55+)</td><td style={{...st.td}}>$9,550 (55+)</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>529 Plan</td><td style={{...st.td}}>No federal limit</td><td style={{...st.td}}>N/A</td><td style={{...st.td}}>$18,000/yr gift tax free</td></tr>
          </tbody></table></div>
        </div>

        <AdUnit slot="3248634657" />
        <div style={st.box}>
          <h2 style={st.h2}>Roth IRA Income Limits 2026</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr>
            <th style={st.th}>Filing Status</th>
            <th style={st.th}>Full Contribution</th>
            <th style={st.th}>Partial</th>
            <th style={st.th}>Not Eligible</th>
          </tr></thead><tbody>
            <tr style={{background:'transparent'}}><td style={st.td}>Single</td><td style={st.td}>Under $150,000</td><td style={st.td}>$150,000 - $165,000</td><td style={st.td}>Over $165,000</td></tr>
            <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={st.td}>Married Filing Jointly</td><td style={st.td}>Under $236,000</td><td style={st.td}>$236,000 - $246,000</td><td style={st.td}>Over $246,000</td></tr>
          </tbody></table></div>
        </div>
        <div style={st.box}>
          <h2 style={st.h2}>Historical 401k Limits (2020-2026)</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr>
            <th style={st.th}>Year</th>
            <th style={st.th}>Employee Limit</th>
            <th style={st.th}>Catch-Up (50+)</th>
          </tr></thead><tbody>
            <tr style={{background:'transparent'}}><td style={st.td}>2026</td><td style={st.td}>$23,500</td><td style={st.td}>$7,500</td></tr>
            <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={st.td}>2025</td><td style={st.td}>$23,500</td><td style={st.td}>$7,500</td></tr>
            <tr style={{background:'transparent'}}><td style={st.td}>2024</td><td style={st.td}>$23,000</td><td style={st.td}>$7,500</td></tr>
            <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={st.td}>2023</td><td style={st.td}>$22,500</td><td style={st.td}>$7,500</td></tr>
            <tr style={{background:'transparent'}}><td style={st.td}>2022</td><td style={st.td}>$20,500</td><td style={st.td}>$6,500</td></tr>
            <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={st.td}>2021</td><td style={st.td}>$19,500</td><td style={st.td}>$6,500</td></tr>
            <tr style={{background:'transparent'}}><td style={st.td}>2020</td><td style={st.td}>$19,500</td><td style={st.td}>$6,500</td></tr>
          </tbody></table></div>
        </div>

        <div style={st.box}>
          <h2 style={st.h2}>Related Calculators</h2>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            <a href="/401k-calculator" style={st.calcLink}>401k calculator</a>
            <a href="/roth-ira-calculator" style={st.calcLink}>roth ira calculator</a>
            <a href="/retirement-calculator" style={st.calcLink}>retirement calculator</a>
          </div>
        </div>

        <div style={st.box}>
          <h2 style={st.h2}>Related Data</h2>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            <a href="/financial-data/average-401k-balance-by-age" style={st.dataLink}>average 401k balance by age</a>
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"Article","headline":"401k & IRA Contribution Limits 2026 (Complete Guide)","description":"All retirement account contribution limits for 2026. 401k, Roth IRA, Traditional IRA, SEP IRA, SIMPLE IRA, HSA, and 529 plan limits.","author":{"@type":"Organization","name":"FreeFinCalc"},"publisher":{"@type":"Organization","name":"FreeFinCalc"},"datePublished":"2026-03-27","dateModified":"2026-03-27","mainEntityOfPage":"https://www.freefincalc.net/401k-ira-contribution-limits"})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"401k & IRA Contribution Limits 2026","item":"https://www.freefincalc.net/401k-ira-contribution-limits"}]})}} />
      <Footer />
    </div>
  )
}
