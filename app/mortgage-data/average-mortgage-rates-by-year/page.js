import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import AdUnit from '../../../components/AdUnit'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
  title: 'Average Mortgage Rates by Year: Historical Data 1970-2026 | FreeFinCalc',
  description: 'Historical 30-year fixed mortgage rates from 1970 to 2026. Annual averages, trends, and how rates affect monthly payments and buying power.',
  alternates: { canonical: 'https://www.freefincalc.net/mortgage-data/average-mortgage-rates-by-year' },
  openGraph: { title: 'Average Mortgage Rates by Year: Historical Data 1970-2026', description: 'Historical 30-year fixed mortgage rates from 1970 to 2026. Annual averages, trends, and how rates affect monthly payments and buying power.', url: 'https://www.freefincalc.net/mortgage-data/average-mortgage-rates-by-year', siteName: 'FreeFinCalc', type: 'article' },
}

const faqs = [{"q":"What is the average mortgage rate in 2026?","a":"The average 30-year fixed mortgage rate in 2026 is approximately 6.45%. This is down from the 2023 peak of 7.79% but well above the historic lows of 2.65-2.96% seen in 2020-2021."},{"q":"What was the highest mortgage rate in US history?","a":"The highest average 30-year fixed mortgage rate was 16.63% in October 1981, during the Federal Reserve's aggressive fight against inflation under Chairman Paul Volcker."},{"q":"What was the lowest mortgage rate ever?","a":"The lowest average 30-year fixed mortgage rate was 2.65% in January 2021, during the COVID-19 pandemic when the Fed cut rates to near zero and purchased mortgage-backed securities."},{"q":"How do mortgage rates affect home prices?","a":"Lower rates increase buying power. At 3% on a $2,000/month budget, you can afford a $474,000 home. At 7%, the same payment only affords a $300,000 home. When rates drop, home prices tend to rise as buyers can afford more."}]

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
          <span style={{color:'#94a3b8'}}>Average Mortgage Rates by Year</span>
        </nav>
        <h1 style={st.h1}>Average Mortgage Rates by Year: Historical Data 1970-2026</h1>
        <p style={st.desc}>Historical 30-year fixed mortgage rates from 1970 to 2026. Annual averages, trends, and how rates affect monthly payments and buying power.</p>

        <div style={st.box}>
          <h2 style={st.h2}>30-Year Fixed Mortgage Rates by Year</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Year</th><th style={st.th}>Avg 30-Yr Rate</th><th style={st.th}>Monthly Payment*</th><th style={st.th}>*On $350K Loan</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2026</td><td style={{...st.td}}>6.45%</td><td style={{...st.td}}>$2,213</td><td style={{...st.td}}>$350,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2025</td><td style={{...st.td}}>6.81%</td><td style={{...st.td}}>$2,291</td><td style={{...st.td}}>$350,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2024</td><td style={{...st.td}}>6.72%</td><td style={{...st.td}}>$2,272</td><td style={{...st.td}}>$350,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2023</td><td style={{...st.td}}>6.81%</td><td style={{...st.td}}>$2,291</td><td style={{...st.td}}>$350,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2022</td><td style={{...st.td}}>5.34%</td><td style={{...st.td}}>$1,956</td><td style={{...st.td}}>$350,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2021</td><td style={{...st.td}}>2.96%</td><td style={{...st.td}}>$1,480</td><td style={{...st.td}}>$350,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2020</td><td style={{...st.td}}>3.11%</td><td style={{...st.td}}>$1,500</td><td style={{...st.td}}>$350,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2019</td><td style={{...st.td}}>3.94%</td><td style={{...st.td}}>$1,661</td><td style={{...st.td}}>$350,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2018</td><td style={{...st.td}}>4.54%</td><td style={{...st.td}}>$1,785</td><td style={{...st.td}}>$350,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2017</td><td style={{...st.td}}>3.99%</td><td style={{...st.td}}>$1,670</td><td style={{...st.td}}>$350,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2016</td><td style={{...st.td}}>3.65%</td><td style={{...st.td}}>$1,605</td><td style={{...st.td}}>$350,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2015</td><td style={{...st.td}}>3.85%</td><td style={{...st.td}}>$1,643</td><td style={{...st.td}}>$350,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2014</td><td style={{...st.td}}>4.17%</td><td style={{...st.td}}>$1,706</td><td style={{...st.td}}>$350,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2013</td><td style={{...st.td}}>3.98%</td><td style={{...st.td}}>$1,668</td><td style={{...st.td}}>$350,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2012</td><td style={{...st.td}}>3.66%</td><td style={{...st.td}}>$1,607</td><td style={{...st.td}}>$350,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2011</td><td style={{...st.td}}>4.45%</td><td style={{...st.td}}>$1,766</td><td style={{...st.td}}>$350,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2010</td><td style={{...st.td}}>4.69%</td><td style={{...st.td}}>$1,815</td><td style={{...st.td}}>$350,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2009</td><td style={{...st.td}}>5.04%</td><td style={{...st.td}}>$1,888</td><td style={{...st.td}}>$350,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2008</td><td style={{...st.td}}>6.03%</td><td style={{...st.td}}>$2,103</td><td style={{...st.td}}>$350,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2007</td><td style={{...st.td}}>6.34%</td><td style={{...st.td}}>$2,173</td><td style={{...st.td}}>$350,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2006</td><td style={{...st.td}}>6.41%</td><td style={{...st.td}}>$2,189</td><td style={{...st.td}}>$350,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2005</td><td style={{...st.td}}>5.87%</td><td style={{...st.td}}>$2,069</td><td style={{...st.td}}>$350,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2004</td><td style={{...st.td}}>5.84%</td><td style={{...st.td}}>$2,062</td><td style={{...st.td}}>$350,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2003</td><td style={{...st.td}}>5.83%</td><td style={{...st.td}}>$2,060</td><td style={{...st.td}}>$350,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2002</td><td style={{...st.td}}>6.54%</td><td style={{...st.td}}>$2,218</td><td style={{...st.td}}>$350,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2001</td><td style={{...st.td}}>6.97%</td><td style={{...st.td}}>$2,319</td><td style={{...st.td}}>$350,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2000</td><td style={{...st.td}}>8.05%</td><td style={{...st.td}}>$2,577</td><td style={{...st.td}}>$350,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>1995</td><td style={{...st.td}}>7.93%</td><td style={{...st.td}}>$2,548</td><td style={{...st.td}}>$350,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>1990</td><td style={{...st.td}}>10.13%</td><td style={{...st.td}}>$3,100</td><td style={{...st.td}}>$350,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>1985</td><td style={{...st.td}}>12.43%</td><td style={{...st.td}}>$3,694</td><td style={{...st.td}}>$350,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>1981</td><td style={{...st.td}}>16.63%</td><td style={{...st.td}}>$4,853</td><td style={{...st.td}}>$350,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>1980</td><td style={{...st.td}}>13.74%</td><td style={{...st.td}}>$4,037</td><td style={{...st.td}}>$350,000</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>1975</td><td style={{...st.td}}>9.05%</td><td style={{...st.td}}>$2,832</td><td style={{...st.td}}>$350,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>1970</td><td style={{...st.td}}>8.56%</td><td style={{...st.td}}>$2,708</td><td style={{...st.td}}>$350,000</td></tr>
          </tbody></table></div>
        </div>
        <AdUnit slot="3248634657" />
        <div style={st.box}>
          <h2 style={st.h2}>Key Mortgage Rate Milestones</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Milestone</th><th style={st.th}>Rate</th><th style={st.th}>Date</th><th style={st.th}>Context</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>All-Time High</td><td style={{...st.td}}>16.63%</td><td style={{...st.td}}>October 1981</td><td style={{...st.td}}>Volcker inflation fight</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>All-Time Low</td><td style={{...st.td}}>2.65%</td><td style={{...st.td}}>January 2021</td><td style={{...st.td}}>COVID stimulus era</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2008 Crisis Peak</td><td style={{...st.td}}>6.48%</td><td style={{...st.td}}>August 2008</td><td style={{...st.td}}>Housing crash</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2008 Crisis Low</td><td style={{...st.td}}>4.71%</td><td style={{...st.td}}>December 2008</td><td style={{...st.td}}>Fed intervention</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Post-COVID High</td><td style={{...st.td}}>7.79%</td><td style={{...st.td}}>October 2023</td><td style={{...st.td}}>Fed tightening cycle</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Current Rate</td><td style={{...st.td}}>6.45%</td><td style={{...st.td}}>March 2026</td><td style={{...st.td}}>Stabilizing</td></tr>
          </tbody></table></div>
        </div>
        <div style={st.box}>
          <h2 style={st.h2}>Related Calculators</h2>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            <a href="/mortgage-calculator" style={st.calcLink}>mortgage calculator</a>
            <a href="/amortization-calculator" style={st.calcLink}>amortization calculator</a>
            <a href="/refinance-calculator" style={st.calcLink}>refinance calculator</a>
            <a href="/home-affordability-calculator" style={st.calcLink}>home affordability calculator</a>
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