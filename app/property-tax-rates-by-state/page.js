import Header from '../../components/Header'
import Footer from '../../components/Footer'
import AdUnit from '../../components/AdUnit'
import FaqSchema from '../../components/FaqSchema'

export const metadata = {
  title: 'Property Tax Rates by State 2026 (Effective Rates Ranked) | FreeFinCalc',
  description: 'Average property tax rates for all 50 states. Effective rates, median tax paid, and median home value. Ranked from lowest to highest.',
  alternates: { canonical: 'https://www.freefincalc.net/property-tax-rates-by-state' },
  openGraph: {
    title: 'Property Tax Rates by State 2026 (Effective Rates Ranked)',
    description: 'Average property tax rates for all 50 states. Effective rates, median tax paid, and median home value. Ranked from lowest to highest.',
    url: 'https://www.freefincalc.net/property-tax-rates-by-state',
    siteName: 'FreeFinCalc',
    type: 'article',
  },
}

const faqs = [{"q":"Which state has the highest property tax?","a":"New Jersey has the highest effective property tax rate at 2.23%, with a median annual tax of $11,040. Illinois (2.07%) and Connecticut (1.98%) follow."},{"q":"Which state has the lowest property tax?","a":"Hawaii has the lowest effective property tax rate at 0.29%, despite high home values. Alabama (0.40%) and Colorado (0.51%) also have very low rates."},{"q":"How is property tax calculated?","a":"Property tax = Assessed Value x Tax Rate. The assessed value may differ from market value depending on state assessment ratios. Effective tax rate is the actual tax paid divided by market value."},{"q":"Do states with no income tax have higher property taxes?","a":"Generally yes. Texas (1.74%), New Hampshire (1.86%), and Alaska (1.04%) all have above-average property taxes to compensate for no income tax revenue."}]

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
          <span style={{color:'#94a3b8'}}>Property Tax Rates by State</span>
        </nav>

        <h1 style={st.h1}>Property Tax Rates by State 2026 (Effective Rates Ranked)</h1>
        <p style={st.desc}>Average property tax rates for all 50 states. Effective rates, median tax paid, and median home value. Ranked from lowest to highest.</p>
        <p style={st.vol}>Est. monthly search volume: 110K+/mo</p>

        <div style={st.box}>
          <h2 style={st.h2}>Property Tax Rates by State 2026</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr>
            <th style={st.th}>State</th>
            <th style={st.th}>Effective Rate</th>
            <th style={st.th}>Median Tax Paid</th>
            <th style={st.th}>Median Home Value</th>
          </tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Hawaii</td><td style={{...st.td}}>0.29%</td><td style={{...st.td}}>$2,420</td><td style={{...st.td}}>$835,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Alabama</td><td style={{...st.td}}>0.40%</td><td style={{...st.td}}>$860</td><td style={{...st.td}}>$215,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Colorado</td><td style={{...st.td}}>0.51%</td><td style={{...st.td}}>$2,780</td><td style={{...st.td}}>$545,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Louisiana</td><td style={{...st.td}}>0.56%</td><td style={{...st.td}}>$1,148</td><td style={{...st.td}}>$205,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>South Carolina</td><td style={{...st.td}}>0.57%</td><td style={{...st.td}}>$1,682</td><td style={{...st.td}}>$295,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>West Virginia</td><td style={{...st.td}}>0.58%</td><td style={{...st.td}}>$899</td><td style={{...st.td}}>$155,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Wyoming</td><td style={{...st.td}}>0.60%</td><td style={{...st.td}}>$1,890</td><td style={{...st.td}}>$315,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Arkansas</td><td style={{...st.td}}>0.62%</td><td style={{...st.td}}>$1,209</td><td style={{...st.td}}>$195,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Utah</td><td style={{...st.td}}>0.63%</td><td style={{...st.td}}>$3,182</td><td style={{...st.td}}>$505,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Nevada</td><td style={{...st.td}}>0.65%</td><td style={{...st.td}}>$2,698</td><td style={{...st.td}}>$415,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Tennessee</td><td style={{...st.td}}>0.66%</td><td style={{...st.td}}>$2,475</td><td style={{...st.td}}>$375,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Idaho</td><td style={{...st.td}}>0.67%</td><td style={{...st.td}}>$2,781</td><td style={{...st.td}}>$415,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Arizona</td><td style={{...st.td}}>0.68%</td><td style={{...st.td}}>$2,822</td><td style={{...st.td}}>$415,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Delaware</td><td style={{...st.td}}>0.70%</td><td style={{...st.td}}>$2,275</td><td style={{...st.td}}>$325,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>California</td><td style={{...st.td}}>0.71%</td><td style={{...st.td}}>$5,574</td><td style={{...st.td}}>$785,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Mississippi</td><td style={{...st.td}}>0.72%</td><td style={{...st.td}}>$1,260</td><td style={{...st.td}}>$175,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Virginia</td><td style={{...st.td}}>0.75%</td><td style={{...st.td}}>$2,888</td><td style={{...st.td}}>$385,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Montana</td><td style={{...st.td}}>0.76%</td><td style={{...st.td}}>$3,382</td><td style={{...st.td}}>$445,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>New Mexico</td><td style={{...st.td}}>0.78%</td><td style={{...st.td}}>$2,223</td><td style={{...st.td}}>$285,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>North Carolina</td><td style={{...st.td}}>0.80%</td><td style={{...st.td}}>$2,840</td><td style={{...st.td}}>$355,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Kentucky</td><td style={{...st.td}}>0.82%</td><td style={{...st.td}}>$1,845</td><td style={{...st.td}}>$225,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Indiana</td><td style={{...st.td}}>0.84%</td><td style={{...st.td}}>$1,974</td><td style={{...st.td}}>$235,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Oklahoma</td><td style={{...st.td}}>0.87%</td><td style={{...st.td}}>$1,871</td><td style={{...st.td}}>$215,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Georgia</td><td style={{...st.td}}>0.88%</td><td style={{...st.td}}>$2,948</td><td style={{...st.td}}>$335,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Florida</td><td style={{...st.td}}>0.89%</td><td style={{...st.td}}>$3,605</td><td style={{...st.td}}>$405,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Oregon</td><td style={{...st.td}}>0.93%</td><td style={{...st.td}}>$4,418</td><td style={{...st.td}}>$475,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>North Dakota</td><td style={{...st.td}}>0.94%</td><td style={{...st.td}}>$2,209</td><td style={{...st.td}}>$235,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Washington</td><td style={{...st.td}}>0.98%</td><td style={{...st.td}}>$5,831</td><td style={{...st.td}}>$595,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Missouri</td><td style={{...st.td}}>0.99%</td><td style={{...st.td}}>$2,327</td><td style={{...st.td}}>$235,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>South Dakota</td><td style={{...st.td}}>1.01%</td><td style={{...st.td}}>$2,677</td><td style={{...st.td}}>$265,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Alaska</td><td style={{...st.td}}>1.04%</td><td style={{...st.td}}>$3,484</td><td style={{...st.td}}>$335,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Maryland</td><td style={{...st.td}}>1.05%</td><td style={{...st.td}}>$4,148</td><td style={{...st.td}}>$395,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Minnesota</td><td style={{...st.td}}>1.08%</td><td style={{...st.td}}>$3,402</td><td style={{...st.td}}>$315,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Massachusetts</td><td style={{...st.td}}>1.12%</td><td style={{...st.td}}>$6,552</td><td style={{...st.td}}>$585,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Kansas</td><td style={{...st.td}}>1.15%</td><td style={{...st.td}}>$2,473</td><td style={{...st.td}}>$215,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Maine</td><td style={{...st.td}}>1.18%</td><td style={{...st.td}}>$4,307</td><td style={{...st.td}}>$365,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Ohio</td><td style={{...st.td}}>1.22%</td><td style={{...st.td}}>$2,867</td><td style={{...st.td}}>$235,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Michigan</td><td style={{...st.td}}>1.25%</td><td style={{...st.td}}>$2,938</td><td style={{...st.td}}>$235,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Iowa</td><td style={{...st.td}}>1.29%</td><td style={{...st.td}}>$2,774</td><td style={{...st.td}}>$215,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Pennsylvania</td><td style={{...st.td}}>1.35%</td><td style={{...st.td}}>$3,578</td><td style={{...st.td}}>$265,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Rhode Island</td><td style={{...st.td}}>1.40%</td><td style={{...st.td}}>$5,950</td><td style={{...st.td}}>$425,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Nebraska</td><td style={{...st.td}}>1.44%</td><td style={{...st.td}}>$3,528</td><td style={{...st.td}}>$245,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>New York</td><td style={{...st.td}}>1.62%</td><td style={{...st.td}}>$7,857</td><td style={{...st.td}}>$485,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Wisconsin</td><td style={{...st.td}}>1.63%</td><td style={{...st.td}}>$4,320</td><td style={{...st.td}}>$265,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Vermont</td><td style={{...st.td}}>1.68%</td><td style={{...st.td}}>$5,964</td><td style={{...st.td}}>$355,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Texas</td><td style={{...st.td}}>1.74%</td><td style={{...st.td}}>$5,829</td><td style={{...st.td}}>$335,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>New Hampshire</td><td style={{...st.td}}>1.86%</td><td style={{...st.td}}>$8,277</td><td style={{...st.td}}>$445,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Connecticut</td><td style={{...st.td}}>1.98%</td><td style={{...st.td}}>$7,821</td><td style={{...st.td}}>$395,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>Illinois</td><td style={{...st.td}}>2.07%</td><td style={{...st.td}}>$5,900</td><td style={{...st.td}}>$285,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>New Jersey</td><td style={{...st.td}}>2.23%</td><td style={{...st.td}}>$11,040</td><td style={{...st.td}}>$495,000</td></tr>
          </tbody></table></div>
        </div>

        <AdUnit slot="3248634657" />

        <div style={st.box}>
          <h2 style={st.h2}>Related Calculators</h2>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            <a href="/property-tax-calculator" style={st.calcLink}>property tax calculator</a>
            <a href="/mortgage-calculator" style={st.calcLink}>mortgage calculator</a>
            <a href="/home-affordability-calculator" style={st.calcLink}>home affordability calculator</a>
          </div>
        </div>

        <div style={st.box}>
          <h2 style={st.h2}>Related Data</h2>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            <a href="/data/median-home-price-by-state" style={st.dataLink}>median home price by state</a>
            <a href="/data/average-mortgage-payment-by-state" style={st.dataLink}>average mortgage payment by state</a>
            <a href="/data/housing-affordability-index-by-state" style={st.dataLink}>housing affordability index by state</a>
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"Article","headline":"Property Tax Rates by State 2026 (Effective Rates Ranked)","description":"Average property tax rates for all 50 states. Effective rates, median tax paid, and median home value. Ranked from lowest to highest.","author":{"@type":"Organization","name":"FreeFinCalc"},"publisher":{"@type":"Organization","name":"FreeFinCalc"},"datePublished":"2026-03-27","dateModified":"2026-03-27","mainEntityOfPage":"https://www.freefincalc.net/property-tax-rates-by-state"})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Property Tax Rates by State 2026","item":"https://www.freefincalc.net/property-tax-rates-by-state"}]})}} />
      <Footer />
    </div>
  )
}
