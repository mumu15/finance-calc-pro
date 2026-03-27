import Header from '../../components/Header'
import Footer from '../../components/Footer'
import AdUnit from '../../components/AdUnit'
import FaqSchema from '../../components/FaqSchema'

export const metadata = {
  title: 'US Inflation Rate by Year (1960-2026 Historical Data) | FreeFinCalc',
  description: 'Historical US inflation rates from 1960 to 2026. Annual CPI data, cumulative inflation, and purchasing power calculations.',
  alternates: { canonical: 'https://www.freefincalc.net/inflation-rate-by-year' },
  openGraph: {
    title: 'US Inflation Rate by Year (1960-2026 Historical Data)',
    description: 'Historical US inflation rates from 1960 to 2026. Annual CPI data, cumulative inflation, and purchasing power calculations.',
    url: 'https://www.freefincalc.net/inflation-rate-by-year',
    siteName: 'FreeFinCalc',
    type: 'article',
  },
}

const faqs = [{"q":"What is the current US inflation rate?","a":"The US inflation rate for 2026 is approximately 2.8%, measured by the Consumer Price Index (CPI). This is down significantly from the 2022 peak of 8.0%."},{"q":"What was the highest inflation rate in US history?","a":"The highest post-WWII inflation was 13.5% in 1980. In 2022, inflation reached 8.0%, the highest since 1981. The 1970s and early 1980s saw sustained high inflation."},{"q":"How much has the dollar lost in value?","a":"Since 1960, the US dollar has lost over 91% of its purchasing power. $1 in 1960 has the equivalent purchasing power of about $12.48 in 2026."},{"q":"How does inflation affect savings?","a":"At 3% inflation, $100,000 in savings loses about $3,000 in real value per year. Over 10 years, $100,000 becomes worth only about $74,400 in real terms. This is why investing to beat inflation is critical."}]

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
          <span style={{color:'#94a3b8'}}>US Inflation Rate by Year</span>
        </nav>

        <h1 style={st.h1}>US Inflation Rate by Year (1960-2026 Historical Data)</h1>
        <p style={st.desc}>Historical US inflation rates from 1960 to 2026. Annual CPI data, cumulative inflation, and purchasing power calculations.</p>
        <p style={st.vol}>Est. monthly search volume: 200K+/mo</p>

        <div style={st.box}>
          <h2 style={st.h2}>US Inflation Rate by Year</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr>
            <th style={st.th}>Year</th>
            <th style={st.th}>Inflation Rate</th>
            <th style={st.th}>CPI</th>
            <th style={st.th}>Cumulative Since 1960</th>
          </tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>2026</td><td style={{...st.td}}>2.8%</td><td style={{...st.td}}>322.5</td><td style={{...st.td}}>1,148%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>2025</td><td style={{...st.td}}>2.9%</td><td style={{...st.td}}>313.7</td><td style={{...st.td}}>1,114%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>2024</td><td style={{...st.td}}>2.9%</td><td style={{...st.td}}>304.8</td><td style={{...st.td}}>1,080%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>2023</td><td style={{...st.td}}>4.1%</td><td style={{...st.td}}>296.2</td><td style={{...st.td}}>1,046%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>2022</td><td style={{...st.td}}>8.0%</td><td style={{...st.td}}>284.5</td><td style={{...st.td}}>1,000%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>2021</td><td style={{...st.td}}>4.7%</td><td style={{...st.td}}>263.4</td><td style={{...st.td}}>919%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>2020</td><td style={{...st.td}}>1.2%</td><td style={{...st.td}}>251.6</td><td style={{...st.td}}>873%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>2019</td><td style={{...st.td}}>1.8%</td><td style={{...st.td}}>248.6</td><td style={{...st.td}}>862%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>2018</td><td style={{...st.td}}>2.4%</td><td style={{...st.td}}>244.2</td><td style={{...st.td}}>845%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>2017</td><td style={{...st.td}}>2.1%</td><td style={{...st.td}}>238.5</td><td style={{...st.td}}>823%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>2016</td><td style={{...st.td}}>1.3%</td><td style={{...st.td}}>233.6</td><td style={{...st.td}}>804%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>2015</td><td style={{...st.td}}>0.1%</td><td style={{...st.td}}>230.6</td><td style={{...st.td}}>793%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>2014</td><td style={{...st.td}}>1.6%</td><td style={{...st.td}}>230.3</td><td style={{...st.td}}>791%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>2013</td><td style={{...st.td}}>1.5%</td><td style={{...st.td}}>226.7</td><td style={{...st.td}}>778%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>2012</td><td style={{...st.td}}>2.1%</td><td style={{...st.td}}>223.4</td><td style={{...st.td}}>765%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>2011</td><td style={{...st.td}}>3.2%</td><td style={{...st.td}}>218.8</td><td style={{...st.td}}>746%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>2010</td><td style={{...st.td}}>1.6%</td><td style={{...st.td}}>212.1</td><td style={{...st.td}}>720%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>2009</td><td style={{...st.td}}>-0.4%</td><td style={{...st.td}}>208.8</td><td style={{...st.td}}>707%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>2008</td><td style={{...st.td}}>3.8%</td><td style={{...st.td}}>209.7</td><td style={{...st.td}}>710%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>2007</td><td style={{...st.td}}>2.8%</td><td style={{...st.td}}>202.0</td><td style={{...st.td}}>681%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>2006</td><td style={{...st.td}}>3.2%</td><td style={{...st.td}}>196.5</td><td style={{...st.td}}>660%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>2005</td><td style={{...st.td}}>3.4%</td><td style={{...st.td}}>190.4</td><td style={{...st.td}}>637%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>2004</td><td style={{...st.td}}>2.7%</td><td style={{...st.td}}>184.1</td><td style={{...st.td}}>612%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>2003</td><td style={{...st.td}}>2.3%</td><td style={{...st.td}}>179.3</td><td style={{...st.td}}>594%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>2002</td><td style={{...st.td}}>1.6%</td><td style={{...st.td}}>175.2</td><td style={{...st.td}}>578%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>2001</td><td style={{...st.td}}>2.8%</td><td style={{...st.td}}>172.4</td><td style={{...st.td}}>567%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>2000</td><td style={{...st.td}}>3.4%</td><td style={{...st.td}}>167.7</td><td style={{...st.td}}>549%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>1990</td><td style={{...st.td}}>5.4%</td><td style={{...st.td}}>126.1</td><td style={{...st.td}}>388%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>1980</td><td style={{...st.td}}>13.5%</td><td style={{...st.td}}>77.8</td><td style={{...st.td}}>201%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>1970</td><td style={{...st.td}}>5.7%</td><td style={{...st.td}}>37.8</td><td style={{...st.td}}>46%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>1960</td><td style={{...st.td}}>1.7%</td><td style={{...st.td}}>25.9</td><td style={{...st.td}}>0% (base)</td></tr>
          </tbody></table></div>
        </div>

        <AdUnit slot="3248634657" />

        <div style={st.box}>
          <h2 style={st.h2}>Related Calculators</h2>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            <a href="/inflation-impact-calculator" style={st.calcLink}>inflation impact calculator</a>
            <a href="/savings-interest-calculator" style={st.calcLink}>savings interest calculator</a>
            <a href="/investment-return-calculator" style={st.calcLink}>investment return calculator</a>
          </div>
        </div>

        <div style={st.box}>
          <h2 style={st.h2}>Related Data</h2>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            <a href="/data/how-far-100k-goes-by-state" style={st.dataLink}>how far 100k goes by state</a>
            <a href="/data/monthly-budget-by-state" style={st.dataLink}>monthly budget by state</a>
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"Article","headline":"US Inflation Rate by Year (1960-2026 Historical Data)","description":"Historical US inflation rates from 1960 to 2026. Annual CPI data, cumulative inflation, and purchasing power calculations.","author":{"@type":"Organization","name":"FreeFinCalc"},"publisher":{"@type":"Organization","name":"FreeFinCalc"},"datePublished":"2026-03-27","dateModified":"2026-03-27","mainEntityOfPage":"https://www.freefincalc.net/inflation-rate-by-year"})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"US Inflation Rate by Year","item":"https://www.freefincalc.net/inflation-rate-by-year"}]})}} />
      <Footer />
    </div>
  )
}
