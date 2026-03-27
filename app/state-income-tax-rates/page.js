import Header from '../../components/Header'
import Footer from '../../components/Footer'
import AdUnit from '../../components/AdUnit'
import FaqSchema from '../../components/FaqSchema'

export const metadata = {
  title: 'State Income Tax Rates 2026 (All 50 States Ranked) | FreeFinCalc',
  description: 'Complete guide to state income tax rates in 2026. All 50 states ranked from lowest to highest with brackets, deductions, and no-income-tax states.',
  alternates: { canonical: 'https://www.freefincalc.net/state-income-tax-rates' },
  openGraph: {
    title: 'State Income Tax Rates 2026 (All 50 States Ranked)',
    description: 'Complete guide to state income tax rates in 2026. All 50 states ranked from lowest to highest with brackets, deductions, and no-income-tax states.',
    url: 'https://www.freefincalc.net/state-income-tax-rates',
    siteName: 'FreeFinCalc',
    type: 'article',
  },
}

const faqs = [{"q":"Which states have no income tax?","a":"Nine states have no income tax: Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming."},{"q":"Which state has the highest income tax?","a":"California has the highest top marginal rate at 13.3%. Hawaii (11%), New Jersey (10.75%), and New York (10.9%) also have very high rates."},{"q":"Which states have a flat income tax?","a":"States with flat income tax include: Arizona (2.5%), Colorado (4.4%), Illinois (4.95%), Indiana (3.05%), Kentucky (4.0%), Massachusetts (5.0%), Michigan (4.25%), Mississippi (5.0%), North Carolina (4.5%), Pennsylvania (3.07%), and Utah (4.65%)."},{"q":"How much do I save in a no-income-tax state?","a":"On a $75,000 salary, moving from California (9.3% effective) to Texas (0%) saves approximately $6,975/year. On $100,000, the savings are approximately $9,300/year."}]

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
          <span style={{color:'#94a3b8'}}>State Income Tax Rates</span>
        </nav>

        <h1 style={st.h1}>State Income Tax Rates 2026 (All 50 States Ranked)</h1>
        <p style={st.desc}>Complete guide to state income tax rates in 2026. All 50 states ranked from lowest to highest with brackets, deductions, and no-income-tax states.</p>
        <p style={st.vol}>Est. monthly search volume: 150K+/mo</p>

        <div style={st.box}>
          <h2 style={st.h2}>State Income Tax Rates 2026</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr>
            <th style={st.th}>State</th>
            <th style={st.th}>Rate Range</th>
            <th style={st.th}>Type</th>
            <th style={st.th}>Top Rate</th>
          </tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Alaska</td><td style={{...st.td}}>0%</td><td style={{...st.td}}>No income tax</td><td style={{...st.td}}>0%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Florida</td><td style={{...st.td}}>0%</td><td style={{...st.td}}>No income tax</td><td style={{...st.td}}>0%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Nevada</td><td style={{...st.td}}>0%</td><td style={{...st.td}}>No income tax</td><td style={{...st.td}}>0%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>New Hampshire</td><td style={{...st.td}}>0%</td><td style={{...st.td}}>No income tax (as of 2025)</td><td style={{...st.td}}>0%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>South Dakota</td><td style={{...st.td}}>0%</td><td style={{...st.td}}>No income tax</td><td style={{...st.td}}>0%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Tennessee</td><td style={{...st.td}}>0%</td><td style={{...st.td}}>No income tax</td><td style={{...st.td}}>0%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Texas</td><td style={{...st.td}}>0%</td><td style={{...st.td}}>No income tax</td><td style={{...st.td}}>0%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Washington</td><td style={{...st.td}}>0%</td><td style={{...st.td}}>No income tax</td><td style={{...st.td}}>0%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Wyoming</td><td style={{...st.td}}>0%</td><td style={{...st.td}}>No income tax</td><td style={{...st.td}}>0%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>North Dakota</td><td style={{...st.td}}>1.95%</td><td style={{...st.td}}>Graduated</td><td style={{...st.td}}>2.5%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Pennsylvania</td><td style={{...st.td}}>3.07%</td><td style={{...st.td}}>Flat</td><td style={{...st.td}}>3.07%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Indiana</td><td style={{...st.td}}>3.05%</td><td style={{...st.td}}>Flat</td><td style={{...st.td}}>3.05%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Michigan</td><td style={{...st.td}}>4.25%</td><td style={{...st.td}}>Flat</td><td style={{...st.td}}>4.25%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Colorado</td><td style={{...st.td}}>4.40%</td><td style={{...st.td}}>Flat</td><td style={{...st.td}}>4.40%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Arizona</td><td style={{...st.td}}>2.50%</td><td style={{...st.td}}>Flat</td><td style={{...st.td}}>2.50%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Utah</td><td style={{...st.td}}>4.65%</td><td style={{...st.td}}>Flat</td><td style={{...st.td}}>4.65%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Illinois</td><td style={{...st.td}}>4.95%</td><td style={{...st.td}}>Flat</td><td style={{...st.td}}>4.95%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Kentucky</td><td style={{...st.td}}>4.00%</td><td style={{...st.td}}>Flat</td><td style={{...st.td}}>4.00%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Mississippi</td><td style={{...st.td}}>5.00%</td><td style={{...st.td}}>Flat (2026)</td><td style={{...st.td}}>5.00%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Massachusetts</td><td style={{...st.td}}>5.00%</td><td style={{...st.td}}>Flat (+ 4% surtax over $1M)</td><td style={{...st.td}}>9.00%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>North Carolina</td><td style={{...st.td}}>4.50%</td><td style={{...st.td}}>Flat</td><td style={{...st.td}}>4.50%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Georgia</td><td style={{...st.td}}>5.49%</td><td style={{...st.td}}>Flat (2026)</td><td style={{...st.td}}>5.49%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Alabama</td><td style={{...st.td}}>2-5%</td><td style={{...st.td}}>Graduated</td><td style={{...st.td}}>5.00%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Virginia</td><td style={{...st.td}}>2-5.75%</td><td style={{...st.td}}>Graduated</td><td style={{...st.td}}>5.75%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Louisiana</td><td style={{...st.td}}>1.85-4.25%</td><td style={{...st.td}}>Graduated</td><td style={{...st.td}}>4.25%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Missouri</td><td style={{...st.td}}>2-4.95%</td><td style={{...st.td}}>Graduated</td><td style={{...st.td}}>4.95%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Oklahoma</td><td style={{...st.td}}>0.25-4.75%</td><td style={{...st.td}}>Graduated</td><td style={{...st.td}}>4.75%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Idaho</td><td style={{...st.td}}>5.80%</td><td style={{...st.td}}>Flat</td><td style={{...st.td}}>5.80%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Arkansas</td><td style={{...st.td}}>2-4.40%</td><td style={{...st.td}}>Graduated</td><td style={{...st.td}}>4.40%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Ohio</td><td style={{...st.td}}>0-3.75%</td><td style={{...st.td}}>Graduated</td><td style={{...st.td}}>3.75%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Kansas</td><td style={{...st.td}}>3.1-5.7%</td><td style={{...st.td}}>Graduated</td><td style={{...st.td}}>5.70%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Nebraska</td><td style={{...st.td}}>2.46-5.84%</td><td style={{...st.td}}>Graduated</td><td style={{...st.td}}>5.84%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Maryland</td><td style={{...st.td}}>2-5.75%</td><td style={{...st.td}}>Graduated</td><td style={{...st.td}}>5.75%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Montana</td><td style={{...st.td}}>4.7-5.9%</td><td style={{...st.td}}>Graduated</td><td style={{...st.td}}>5.90%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>West Virginia</td><td style={{...st.td}}>2.36-5.12%</td><td style={{...st.td}}>Graduated</td><td style={{...st.td}}>5.12%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>New Mexico</td><td style={{...st.td}}>1.7-5.9%</td><td style={{...st.td}}>Graduated</td><td style={{...st.td}}>5.90%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>South Carolina</td><td style={{...st.td}}>0-6.40%</td><td style={{...st.td}}>Graduated</td><td style={{...st.td}}>6.40%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Rhode Island</td><td style={{...st.td}}>3.75-5.99%</td><td style={{...st.td}}>Graduated</td><td style={{...st.td}}>5.99%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Delaware</td><td style={{...st.td}}>2.2-6.6%</td><td style={{...st.td}}>Graduated</td><td style={{...st.td}}>6.60%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Iowa</td><td style={{...st.td}}>4.40-6.00%</td><td style={{...st.td}}>Graduated</td><td style={{...st.td}}>6.00%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Connecticut</td><td style={{...st.td}}>2-6.99%</td><td style={{...st.td}}>Graduated</td><td style={{...st.td}}>6.99%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Wisconsin</td><td style={{...st.td}}>3.5-7.65%</td><td style={{...st.td}}>Graduated</td><td style={{...st.td}}>7.65%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Maine</td><td style={{...st.td}}>5.8-7.15%</td><td style={{...st.td}}>Graduated</td><td style={{...st.td}}>7.15%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Minnesota</td><td style={{...st.td}}>5.35-9.85%</td><td style={{...st.td}}>Graduated</td><td style={{...st.td}}>9.85%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Vermont</td><td style={{...st.td}}>3.35-8.75%</td><td style={{...st.td}}>Graduated</td><td style={{...st.td}}>8.75%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Oregon</td><td style={{...st.td}}>4.75-9.9%</td><td style={{...st.td}}>Graduated</td><td style={{...st.td}}>9.90%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>New Jersey</td><td style={{...st.td}}>1.4-10.75%</td><td style={{...st.td}}>Graduated</td><td style={{...st.td}}>10.75%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Hawaii</td><td style={{...st.td}}>1.4-11%</td><td style={{...st.td}}>Graduated</td><td style={{...st.td}}>11.00%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>New York</td><td style={{...st.td}}>4-10.9%</td><td style={{...st.td}}>Graduated</td><td style={{...st.td}}>10.90%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>California</td><td style={{...st.td}}>1-13.3%</td><td style={{...st.td}}>Graduated</td><td style={{...st.td}}>13.30%</td></tr>
          </tbody></table></div>
        </div>

        <AdUnit slot="3248634657" />

        <div style={st.box}>
          <h2 style={st.h2}>Related Calculators</h2>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            <a href="/tax-calculator" style={st.calcLink}>tax calculator</a>
            <a href="/salary-after-tax-calculator" style={st.calcLink}>salary after tax calculator</a>
            <a href="/paycheck-calculator" style={st.calcLink}>paycheck calculator</a>
          </div>
        </div>

        <div style={st.box}>
          <h2 style={st.h2}>Related Data</h2>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            <a href="/data/states-with-no-income-tax" style={st.dataLink}>states with no income tax</a>
            <a href="/data/states-with-highest-income-tax" style={st.dataLink}>states with highest income tax</a>
            <a href="/data/take-home-pay-by-state-100k" style={st.dataLink}>take home pay by state 100k</a>
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"Article","headline":"State Income Tax Rates 2026 (All 50 States Ranked)","description":"Complete guide to state income tax rates in 2026. All 50 states ranked from lowest to highest with brackets, deductions, and no-income-tax states.","author":{"@type":"Organization","name":"FreeFinCalc"},"publisher":{"@type":"Organization","name":"FreeFinCalc"},"datePublished":"2026-03-27","dateModified":"2026-03-27","mainEntityOfPage":"https://www.freefincalc.net/state-income-tax-rates"})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"State Income Tax Rates 2026","item":"https://www.freefincalc.net/state-income-tax-rates"}]})}} />
      <Footer />
    </div>
  )
}
