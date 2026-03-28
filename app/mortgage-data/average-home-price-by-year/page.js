import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import AdUnit from '../../../components/AdUnit'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
  title: 'Average Home Price by Year in US (2000-2026 Historical Data) | FreeFinCalc',
  description: 'US median home prices from 2000 to 2026. Year-over-year changes, cumulative appreciation, and inflation-adjusted values.',
  alternates: { canonical: 'https://www.freefincalc.net/mortgage-data/average-home-price-by-year' },
  openGraph: { title: 'Average Home Price by Year in US (2000-2026 Historical Data)', description: 'US median home prices from 2000 to 2026. Year-over-year changes, cumulative appreciation, and inflation-adjusted values.', url: 'https://www.freefincalc.net/mortgage-data/average-home-price-by-year', siteName: 'FreeFinCalc', type: 'article' },
}

const faqs = [{"q":"What is the average home price in 2026?","a":"The national median home price in 2026 is approximately $412,000. This varies dramatically by location: from $175,000 in Mississippi to $835,000 in Hawaii."},{"q":"How much have home prices increased since 2000?","a":"The median home price has increased from $157,200 in 2000 to $412,000 in 2026 — a 162% increase. Adjusted for inflation, the real increase is about 35%."},{"q":"Did home prices drop during the 2008 crash?","a":"Yes. From the 2006 peak of $238,900 to the 2012 trough of $175,100, median home prices fell 26.7%. It took until 2017 for prices to fully recover to pre-crash levels."},{"q":"Will home prices go down?","a":"Home prices are driven by supply and demand. With persistent housing shortages, limited new construction, and population growth, most economists project continued modest 3-5% annual appreciation. A 2008-style crash is unlikely given current lending standards."}]

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
          <span style={{color:'#94a3b8'}}>Average Home Price by Year in US</span>
        </nav>
        <h1 style={st.h1}>Average Home Price by Year in US (2000-2026 Historical Data)</h1>
        <p style={st.desc}>US median home prices from 2000 to 2026. Year-over-year changes, cumulative appreciation, and inflation-adjusted values.</p>

        <div style={st.box}>
          <h2 style={st.h2}>Median US Home Price by Year</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Year</th><th style={st.th}>Median Price</th><th style={st.th}>YoY Change</th><th style={st.th}>Inflation-Adjusted (2026$)</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2026</td><td style={{...st.td}}>$412,000</td><td style={{...st.td}}>3.8%</td><td style={{...st.td}}>$412,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2025</td><td style={{...st.td}}>$397,000</td><td style={{...st.td}}>3.5%</td><td style={{...st.td}}>$402,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2024</td><td style={{...st.td}}>$383,500</td><td style={{...st.td}}>2.8%</td><td style={{...st.td}}>$395,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2023</td><td style={{...st.td}}>$373,000</td><td style={{...st.td}}>-1.0%</td><td style={{...st.td}}>$392,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2022</td><td style={{...st.td}}>$376,700</td><td style={{...st.td}}>10.2%</td><td style={{...st.td}}>$405,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2021</td><td style={{...st.td}}>$342,000</td><td style={{...st.td}}>16.9%</td><td style={{...st.td}}>$378,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2020</td><td style={{...st.td}}>$293,000</td><td style={{...st.td}}>10.5%</td><td style={{...st.td}}>$333,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2019</td><td style={{...st.td}}>$265,300</td><td style={{...st.td}}>4.3%</td><td style={{...st.td}}>$310,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2018</td><td style={{...st.td}}>$254,500</td><td style={{...st.td}}>4.7%</td><td style={{...st.td}}>$303,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2017</td><td style={{...st.td}}>$243,000</td><td style={{...st.td}}>5.7%</td><td style={{...st.td}}>$295,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2016</td><td style={{...st.td}}>$229,800</td><td style={{...st.td}}>4.8%</td><td style={{...st.td}}>$286,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2015</td><td style={{...st.td}}>$219,400</td><td style={{...st.td}}>6.3%</td><td style={{...st.td}}>$280,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2014</td><td style={{...st.td}}>$206,400</td><td style={{...st.td}}>5.7%</td><td style={{...st.td}}>$270,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2013</td><td style={{...st.td}}>$195,200</td><td style={{...st.td}}>11.5%</td><td style={{...st.td}}>$262,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2012</td><td style={{...st.td}}>$175,100</td><td style={{...st.td}}>-0.3%</td><td style={{...st.td}}>$242,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2011</td><td style={{...st.td}}>$175,600</td><td style={{...st.td}}>-4.4%</td><td style={{...st.td}}>$250,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2010</td><td style={{...st.td}}>$183,600</td><td style={{...st.td}}>-2.6%</td><td style={{...st.td}}>$268,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2009</td><td style={{...st.td}}>$188,500</td><td style={{...st.td}}>-11.2%</td><td style={{...st.td}}>$283,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2008</td><td style={{...st.td}}>$212,300</td><td style={{...st.td}}>-9.5%</td><td style={{...st.td}}>$326,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2007</td><td style={{...st.td}}>$234,500</td><td style={{...st.td}}>-1.8%</td><td style={{...st.td}}>$367,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2006</td><td style={{...st.td}}>$238,900</td><td style={{...st.td}}>1.1%</td><td style={{...st.td}}>$385,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2005</td><td style={{...st.td}}>$236,300</td><td style={{...st.td}}>12.4%</td><td style={{...st.td}}>$392,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2004</td><td style={{...st.td}}>$210,300</td><td style={{...st.td}}>9.5%</td><td style={{...st.td}}>$360,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2003</td><td style={{...st.td}}>$192,000</td><td style={{...st.td}}>7.5%</td><td style={{...st.td}}>$340,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2002</td><td style={{...st.td}}>$178,600</td><td style={{...st.td}}>7.0%</td><td style={{...st.td}}>$326,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2001</td><td style={{...st.td}}>$166,800</td><td style={{...st.td}}>6.1%</td><td style={{...st.td}}>$314,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2000</td><td style={{...st.td}}>$157,200</td><td style={{...st.td}}>3.5%</td><td style={{...st.td}}>$306,000</td></tr>
          </tbody></table></div>
        </div>
        <AdUnit slot="3248634657" />
        <div style={st.box}>
          <h2 style={st.h2}>Related Calculators</h2>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            <a href="/home-affordability-calculator" style={st.calcLink}>home affordability calculator</a>
            <a href="/mortgage-calculator" style={st.calcLink}>mortgage calculator</a>
            <a href="/rent-vs-buy-calculator" style={st.calcLink}>rent vs buy calculator</a>
            <a href="/investment-return-calculator" style={st.calcLink}>investment return calculator</a>
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