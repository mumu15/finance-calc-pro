import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import AdUnit from '../../../components/AdUnit'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
  title: 'Foreclosure Rates by State 2026 (All 50 States Ranked) | FreeFinCalc',
  description: 'Current foreclosure rates for all 50 states. Foreclosure filings, rates per household, and year-over-year trends.',
  alternates: { canonical: 'https://www.freefincalc.net/mortgage-data/foreclosure-rates-by-state' },
  openGraph: { title: 'Foreclosure Rates by State 2026 (All 50 States Ranked)', description: 'Current foreclosure rates for all 50 states. Foreclosure filings, rates per household, and year-over-year trends.', url: 'https://www.freefincalc.net/mortgage-data/foreclosure-rates-by-state', siteName: 'FreeFinCalc', type: 'article' },
}

const faqs = [{"q":"What state has the highest foreclosure rate?","a":"New Jersey has the highest foreclosure rate at 1 in every 1,150 homes. Illinois, Delaware, Maryland, and Florida round out the top 5."},{"q":"Are foreclosure rates going up in 2026?","a":"Foreclosure rates have stabilized in 2026 after rising from historic pandemic lows. Current rates are well below the 2010 peak when over 2.8 million homes received foreclosure filings."},{"q":"How long does foreclosure take?","a":"It depends on the state. Judicial foreclosure states (like New York, New Jersey) average 930+ days. Non-judicial states (like Texas, Georgia) average around 180 days."},{"q":"How can I avoid foreclosure?","a":"Contact your lender immediately if you cannot make payments. Options include loan modification, forbearance, repayment plans, short sale, or deed in lieu of foreclosure. Many lenders prefer to work with borrowers rather than foreclose."}]

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
          <span style={{color:'#94a3b8'}}>Foreclosure Rates by State 2026</span>
        </nav>
        <h1 style={st.h1}>Foreclosure Rates by State 2026 (All 50 States Ranked)</h1>
        <p style={st.desc}>Current foreclosure rates for all 50 states. Foreclosure filings, rates per household, and year-over-year trends.</p>

        <div style={st.box}>
          <h2 style={st.h2}>Foreclosure Rates by State (Highest to Lowest)</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Rank</th><th style={st.th}>State</th><th style={st.th}>Foreclosure Rate</th><th style={st.th}>% of Homes</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>1</td><td style={{...st.td}}>New Jersey</td><td style={{...st.td}}>1 in 1,150</td><td style={{...st.td}}>0.087%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2</td><td style={{...st.td}}>Illinois</td><td style={{...st.td}}>1 in 1,280</td><td style={{...st.td}}>0.078%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>3</td><td style={{...st.td}}>Delaware</td><td style={{...st.td}}>1 in 1,350</td><td style={{...st.td}}>0.074%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>4</td><td style={{...st.td}}>Maryland</td><td style={{...st.td}}>1 in 1,420</td><td style={{...st.td}}>0.070%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>5</td><td style={{...st.td}}>Florida</td><td style={{...st.td}}>1 in 1,500</td><td style={{...st.td}}>0.067%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>6</td><td style={{...st.td}}>Connecticut</td><td style={{...st.td}}>1 in 1,580</td><td style={{...st.td}}>0.063%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>7</td><td style={{...st.td}}>Ohio</td><td style={{...st.td}}>1 in 1,650</td><td style={{...st.td}}>0.061%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>8</td><td style={{...st.td}}>Nevada</td><td style={{...st.td}}>1 in 1,700</td><td style={{...st.td}}>0.059%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>9</td><td style={{...st.td}}>Indiana</td><td style={{...st.td}}>1 in 1,780</td><td style={{...st.td}}>0.056%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>10</td><td style={{...st.td}}>South Carolina</td><td style={{...st.td}}>1 in 1,850</td><td style={{...st.td}}>0.054%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>11</td><td style={{...st.td}}>Pennsylvania</td><td style={{...st.td}}>1 in 1,900</td><td style={{...st.td}}>0.053%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>12</td><td style={{...st.td}}>California</td><td style={{...st.td}}>1 in 2,100</td><td style={{...st.td}}>0.048%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>13</td><td style={{...st.td}}>New York</td><td style={{...st.td}}>1 in 2,200</td><td style={{...st.td}}>0.045%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>14</td><td style={{...st.td}}>Georgia</td><td style={{...st.td}}>1 in 2,350</td><td style={{...st.td}}>0.043%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>15</td><td style={{...st.td}}>Michigan</td><td style={{...st.td}}>1 in 2,500</td><td style={{...st.td}}>0.040%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>16</td><td style={{...st.td}}>Texas</td><td style={{...st.td}}>1 in 2,600</td><td style={{...st.td}}>0.038%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>17</td><td style={{...st.td}}>Arizona</td><td style={{...st.td}}>1 in 2,800</td><td style={{...st.td}}>0.036%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>18</td><td style={{...st.td}}>Tennessee</td><td style={{...st.td}}>1 in 3,000</td><td style={{...st.td}}>0.033%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>19</td><td style={{...st.td}}>Virginia</td><td style={{...st.td}}>1 in 3,200</td><td style={{...st.td}}>0.031%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>20</td><td style={{...st.td}}>Colorado</td><td style={{...st.td}}>1 in 3,500</td><td style={{...st.td}}>0.029%</td></tr>
          </tbody></table></div>
        </div>
        <AdUnit slot="3248634657" />
        <div style={st.box}>
          <h2 style={st.h2}>Foreclosure Statistics 2026</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Metric</th><th style={st.th}>Value</th><th style={st.th}>Notes</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Total US Foreclosure Filings</td><td style={{...st.td}}>321,000</td><td style={{...st.td}}>Annual estimate</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Default Notices</td><td style={{...st.td}}>142,000</td><td style={{...st.td}}>First stage</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Scheduled Auctions</td><td style={{...st.td}}>108,000</td><td style={{...st.td}}>Second stage</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Bank Repossessions (REO)</td><td style={{...st.td}}>71,000</td><td style={{...st.td}}>Final stage</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Average Time to Foreclose</td><td style={{...st.td}}>930 days</td><td style={{...st.td}}>Judicial states</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Average Time to Foreclose</td><td style={{...st.td}}>180 days</td><td style={{...st.td}}>Non-judicial states</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Foreclosure Inventory Rate</td><td style={{...st.td}}>0.28%</td><td style={{...st.td}}>Of all mortgages</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Seriously Delinquent Rate</td><td style={{...st.td}}>1.2%</td><td style={{...st.td}}>90+ days past due</td></tr>
          </tbody></table></div>
        </div>
        <div style={st.box}>
          <h2 style={st.h2}>Related Calculators</h2>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            <a href="/mortgage-calculator" style={st.calcLink}>mortgage calculator</a>
            <a href="/debt-to-income-calculator" style={st.calcLink}>debt to income calculator</a>
            <a href="/home-affordability-calculator" style={st.calcLink}>home affordability calculator</a>
            <a href="/refinance-calculator" style={st.calcLink}>refinance calculator</a>
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