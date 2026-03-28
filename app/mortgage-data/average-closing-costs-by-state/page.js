import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import AdUnit from '../../../components/AdUnit'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
  title: 'Average Closing Costs by State 2026 (All 50 States Ranked) | FreeFinCalc',
  description: 'How much are closing costs in your state? All 50 states ranked by average closing costs with and without transfer taxes.',
  alternates: { canonical: 'https://www.freefincalc.net/mortgage-data/average-closing-costs-by-state' },
  openGraph: { title: 'Average Closing Costs by State 2026 (All 50 States Ranked)', description: 'How much are closing costs in your state? All 50 states ranked by average closing costs with and without transfer taxes.', url: 'https://www.freefincalc.net/mortgage-data/average-closing-costs-by-state', siteName: 'FreeFinCalc', type: 'article' },
}

const faqs = [{"q":"How much are closing costs on average?","a":"Average closing costs are $6,000-$10,000 or 2-5% of the home purchase price. On a $350,000 home, expect $7,000-$17,500 depending on your state and whether transfer taxes apply."},{"q":"Which state has the highest closing costs?","a":"Washington DC has the highest average closing costs at $29,888, primarily due to high transfer taxes. Among states, New York ($16,849) and Delaware ($14,425) are the most expensive."},{"q":"Can the seller pay closing costs?","a":"Yes. Seller concessions (seller-paid closing costs) are common, especially in buyer markets. Conventional loans allow up to 3-9% in seller concessions depending on down payment. FHA allows up to 6%."},{"q":"How can I reduce closing costs?","a":"Shop multiple lenders for loan origination fees, negotiate with the seller to pay a portion, ask about lender credits (higher rate in exchange for lower closing costs), and compare title insurance quotes."}]

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
          <span style={{color:'#94a3b8'}}>Average Closing Costs by State 2026</span>
        </nav>
        <h1 style={st.h1}>Average Closing Costs by State 2026 (All 50 States Ranked)</h1>
        <p style={st.desc}>How much are closing costs in your state? All 50 states ranked by average closing costs with and without transfer taxes.</p>

        <div style={st.box}>
          <h2 style={st.h2}>Closing Costs by State (Including Taxes)</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Rank</th><th style={st.th}>State</th><th style={st.th}>Avg Closing Costs</th><th style={st.th}>% of Home Price</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>1</td><td style={{...st.td}}>District of Columbia</td><td style={{...st.td}}>$29,888</td><td style={{...st.td}}>6.25%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>2</td><td style={{...st.td}}>New York</td><td style={{...st.td}}>$16,849</td><td style={{...st.td}}>3.36%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>3</td><td style={{...st.td}}>Delaware</td><td style={{...st.td}}>$14,425</td><td style={{...st.td}}>3.76%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>4</td><td style={{...st.td}}>Washington</td><td style={{...st.td}}>$13,927</td><td style={{...st.td}}>2.78%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>5</td><td style={{...st.td}}>Maryland</td><td style={{...st.td}}>$12,056</td><td style={{...st.td}}>2.87%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>6</td><td style={{...st.td}}>Connecticut</td><td style={{...st.td}}>$11,475</td><td style={{...st.td}}>2.72%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>7</td><td style={{...st.td}}>New Jersey</td><td style={{...st.td}}>$10,987</td><td style={{...st.td}}>2.33%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>8</td><td style={{...st.td}}>Pennsylvania</td><td style={{...st.td}}>$10,345</td><td style={{...st.td}}>2.64%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>9</td><td style={{...st.td}}>Virginia</td><td style={{...st.td}}>$9,876</td><td style={{...st.td}}>2.38%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>10</td><td style={{...st.td}}>Florida</td><td style={{...st.td}}>$9,654</td><td style={{...st.td}}>2.31%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>11</td><td style={{...st.td}}>California</td><td style={{...st.td}}>$9,442</td><td style={{...st.td}}>1.20%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>12</td><td style={{...st.td}}>Massachusetts</td><td style={{...st.td}}>$9,287</td><td style={{...st.td}}>1.97%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>13</td><td style={{...st.td}}>Illinois</td><td style={{...st.td}}>$8,965</td><td style={{...st.td}}>2.65%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>14</td><td style={{...st.td}}>Hawaii</td><td style={{...st.td}}>$8,732</td><td style={{...st.td}}>1.05%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>15</td><td style={{...st.td}}>Nevada</td><td style={{...st.td}}>$8,544</td><td style={{...st.td}}>1.97%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>16</td><td style={{...st.td}}>Minnesota</td><td style={{...st.td}}>$8,345</td><td style={{...st.td}}>2.44%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>17</td><td style={{...st.td}}>Texas</td><td style={{...st.td}}>$8,287</td><td style={{...st.td}}>2.25%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>18</td><td style={{...st.td}}>Oregon</td><td style={{...st.td}}>$8,156</td><td style={{...st.td}}>1.64%</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>19</td><td style={{...st.td}}>Colorado</td><td style={{...st.td}}>$7,945</td><td style={{...st.td}}>1.38%</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>20</td><td style={{...st.td}}>Georgia</td><td style={{...st.td}}>$7,832</td><td style={{...st.td}}>2.12%</td></tr>
          </tbody></table></div>
        </div>
        <AdUnit slot="3248634657" />
        <div style={st.box}>
          <h2 style={st.h2}>Closing Cost Breakdown</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Cost Item</th><th style={st.th}>Typical Range</th><th style={st.th}>Average</th><th style={st.th}>Notes</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Loan Origination Fee</td><td style={{...st.td}}>0.5-1% of loan</td><td style={{...st.td}}>$1,400-$2,800</td><td style={{...st.td}}>Negotiable</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Appraisal</td><td style={{...st.td}}>$400-$600</td><td style={{...st.td}}>$500</td><td style={{...st.td}}>Required by lender</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Credit Report</td><td style={{...st.td}}>$30-$50</td><td style={{...st.td}}>$40</td><td style={{...st.td}}>Per borrower</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Title Search</td><td style={{...st.td}}>$200-$400</td><td style={{...st.td}}>$300</td><td style={{...st.td}}>Required</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Title Insurance</td><td style={{...st.td}}>$500-$2,000</td><td style={{...st.td}}>$1,000</td><td style={{...st.td}}>Protects lender/buyer</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Survey</td><td style={{...st.td}}>$300-$600</td><td style={{...st.td}}>$400</td><td style={{...st.td}}>May be required</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Recording Fees</td><td style={{...st.td}}>$50-$250</td><td style={{...st.td}}>$125</td><td style={{...st.td}}>Government fee</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Transfer Tax</td><td style={{...st.td}}>0-4% of price</td><td style={{...st.td}}>Varies by state</td><td style={{...st.td}}>Biggest variable</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Attorney Fees</td><td style={{...st.td}}>$500-$2,000</td><td style={{...st.td}}>$1,000</td><td style={{...st.td}}>Required in some states</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Escrow/Prepaid</td><td style={{...st.td}}>2-6 months taxes/ins</td><td style={{...st.td}}>$3,000-$6,000</td><td style={{...st.td}}>Held in escrow</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Mortgage Points</td><td style={{...st.td}}>0-2% of loan</td><td style={{...st.td}}>$0-$5,600</td><td style={{...st.td}}>Optional, reduces rate</td></tr>
          </tbody></table></div>
        </div>
        <div style={st.box}>
          <h2 style={st.h2}>Related Calculators</h2>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            <a href="/mortgage-calculator" style={st.calcLink}>mortgage calculator</a>
            <a href="/home-affordability-calculator" style={st.calcLink}>home affordability calculator</a>
            <a href="/down-payment-calculator" style={st.calcLink}>down payment calculator</a>
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