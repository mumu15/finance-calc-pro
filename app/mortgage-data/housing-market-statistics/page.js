import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import AdUnit from '../../../components/AdUnit'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
  title: 'Housing Market Statistics 2026: Prices, Sales, Inventory & Trends | FreeFinCalc',
  description: 'Comprehensive 2026 housing market data. Median prices, sales volume, inventory levels, days on market, and price trends by region.',
  alternates: { canonical: 'https://www.freefincalc.net/mortgage-data/housing-market-statistics' },
  openGraph: { title: 'Housing Market Statistics 2026: Prices, Sales, Inventory & Trends', description: 'Comprehensive 2026 housing market data. Median prices, sales volume, inventory levels, days on market, and price trends by region.', url: 'https://www.freefincalc.net/mortgage-data/housing-market-statistics', siteName: 'FreeFinCalc', type: 'article' },
}

const faqs = [{"q":"What is the median home price in 2026?","a":"The national median home price in 2026 is approximately $412,000 for all homes, $395,000 for existing homes, and $455,000 for new construction. Prices vary dramatically by region."},{"q":"Is it a buyer or seller market in 2026?","a":"With 3.8 months of inventory (below the 6-month balanced threshold), it remains a seller market nationally. However, conditions vary by metro area, with some markets seeing increased inventory."},{"q":"Are home prices going up or down?","a":"Home prices are rising at approximately 3.8% year-over-year nationally in 2026. This is a more sustainable pace compared to the 15-20% annual increases seen in 2021-2022."},{"q":"Is 2026 a good time to buy a house?","a":"It depends on your personal situation. Inventory is improving, price growth has moderated, and rates may decrease further. If you plan to stay 5+ years and can afford the payments, buying is generally better than waiting."}]

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
          <span style={{color:'#94a3b8'}}>Housing Market Statistics 2026</span>
        </nav>
        <h1 style={st.h1}>Housing Market Statistics 2026: Prices, Sales, Inventory & Trends</h1>
        <p style={st.desc}>Comprehensive 2026 housing market data. Median prices, sales volume, inventory levels, days on market, and price trends by region.</p>

        <div style={st.box}>
          <h2 style={st.h2}>National Housing Market Overview 2026</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Metric</th><th style={st.th}>Value</th><th style={st.th}>Context</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Median Home Price</td><td style={{...st.td}}>$412,000</td><td style={{...st.td}}>Up 3.8% YoY</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Median Existing Home Price</td><td style={{...st.td}}>$395,000</td><td style={{...st.td}}>Up 3.2% YoY</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Median New Home Price</td><td style={{...st.td}}>$455,000</td><td style={{...st.td}}>Up 4.5% YoY</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Total Homes Sold (Annual)</td><td style={{...st.td}}>4.95 million</td><td style={{...st.td}}>Existing homes</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>New Homes Sold (Annual)</td><td style={{...st.td}}>690,000</td><td style={{...st.td}}>New construction</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Months of Inventory</td><td style={{...st.td}}>3.8 months</td><td style={{...st.td}}>6 months = balanced</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Median Days on Market</td><td style={{...st.td}}>28 days</td><td style={{...st.td}}>Down from 35 in 2024</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Homes Sold Above List Price</td><td style={{...st.td}}>32%</td><td style={{...st.td}}>Down from 55% in 2022</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>All-Cash Sales</td><td style={{...st.td}}>28%</td><td style={{...st.td}}>Of all transactions</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Investor Purchases</td><td style={{...st.td}}>18%</td><td style={{...st.td}}>Of all purchases</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>First-Time Buyer Share</td><td style={{...st.td}}>31%</td><td style={{...st.td}}>Below historic 40% avg</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Average Mortgage Rate</td><td style={{...st.td}}>6.45%</td><td style={{...st.td}}>30-year fixed</td></tr>
          </tbody></table></div>
        </div>
        <AdUnit slot="3248634657" />
        <div style={st.box}>
          <h2 style={st.h2}>Median Home Price by Region</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Region/Market</th><th style={st.th}>Median Price</th><th style={st.th}>Notes</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Northeast</td><td style={{...st.td}}>$465,000</td><td style={{...st.td}}>4.1% YoY increase</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Midwest</td><td style={{...st.td}}>$305,000</td><td style={{...st.td}}>3.5% YoY increase</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>South</td><td style={{...st.td}}>$375,000</td><td style={{...st.td}}>3.8% YoY increase</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>West</td><td style={{...st.td}}>$595,000</td><td style={{...st.td}}>4.2% YoY increase</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Most Expensive State</td><td style={{...st.td}}>Hawaii - $835,000</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Least Expensive State</td><td style={{...st.td}}>Mississippi - $175,000</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Most Expensive Metro</td><td style={{...st.td}}>San Jose - $1,520,000</td><td style={{...st.td}}></td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Least Expensive Metro</td><td style={{...st.td}}>Detroit - $95,000</td><td style={{...st.td}}></td></tr>
          </tbody></table></div>
        </div>
        <div style={st.box}>
          <h2 style={st.h2}>Housing Market by the Numbers (2020-2026)</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Year</th><th style={st.th}>Median Price</th><th style={st.th}>Homes Sold</th><th style={st.th}>Avg Rate</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2020</td><td style={{...st.td}}>$329,000</td><td style={{...st.td}}>5.64 million</td><td style={{...st.td}}>2.96%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2021</td><td style={{...st.td}}>$369,800</td><td style={{...st.td}}>6.12 million</td><td style={{...st.td}}>2.96%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2022</td><td style={{...st.td}}>$392,600</td><td style={{...st.td}}>5.03 million</td><td style={{...st.td}}>5.34%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2023</td><td style={{...st.td}}>$389,800</td><td style={{...st.td}}>4.09 million</td><td style={{...st.td}}>6.81%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2024</td><td style={{...st.td}}>$396,500</td><td style={{...st.td}}>4.38 million</td><td style={{...st.td}}>6.72%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2025</td><td style={{...st.td}}>$405,000</td><td style={{...st.td}}>4.72 million</td><td style={{...st.td}}>6.81%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2026</td><td style={{...st.td}}>$412,000</td><td style={{...st.td}}>4.95 million</td><td style={{...st.td}}>6.45%</td></tr>
          </tbody></table></div>
        </div>
        <div style={st.box}>
          <h2 style={st.h2}>Related Calculators</h2>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            <a href="/home-affordability-calculator" style={st.calcLink}>home affordability calculator</a>
            <a href="/mortgage-calculator" style={st.calcLink}>mortgage calculator</a>
            <a href="/rent-vs-buy-calculator" style={st.calcLink}>rent vs buy calculator</a>
            <a href="/down-payment-calculator" style={st.calcLink}>down payment calculator</a>
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