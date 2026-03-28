import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import AdUnit from '../../../components/AdUnit'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
  title: 'Mortgage Debt Statistics 2026: How Much Americans Owe | FreeFinCalc',
  description: 'Total US mortgage debt, average balances by age, underwater mortgages, and home equity data. Complete mortgage debt analysis.',
  alternates: { canonical: 'https://www.freefincalc.net/mortgage-data/mortgage-debt-statistics' },
  openGraph: { title: 'Mortgage Debt Statistics 2026: How Much Americans Owe', description: 'Total US mortgage debt, average balances by age, underwater mortgages, and home equity data. Complete mortgage debt analysis.', url: 'https://www.freefincalc.net/mortgage-data/mortgage-debt-statistics', siteName: 'FreeFinCalc', type: 'article' },
}

const faqs = [{"q":"How much mortgage debt does the average American have?","a":"The average mortgage balance is $244,500. However, this varies widely by age: under-30 borrowers average $228,000 while those over 70 average $118,000."},{"q":"How much total mortgage debt is in the US?","a":"Total US mortgage debt is approximately $12.8 trillion across 53.5 million mortgages. This is the largest category of household debt."},{"q":"What percentage of homes are underwater?","a":"Only 1.8% of mortgaged homes are underwater (owe more than the home is worth) in 2026. This is dramatically lower than the 26% rate seen during the 2012 housing crisis."},{"q":"How much home equity does the average homeowner have?","a":"The average homeowner has approximately $315,000 in home equity. Nearly half (48.3%) of homeowners are equity-rich, meaning their mortgage balance is less than 50% of the home value."}]

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
          <span style={{color:'#94a3b8'}}>Mortgage Debt Statistics 2026</span>
        </nav>
        <h1 style={st.h1}>Mortgage Debt Statistics 2026: How Much Americans Owe</h1>
        <p style={st.desc}>Total US mortgage debt, average balances by age, underwater mortgages, and home equity data. Complete mortgage debt analysis.</p>

        <div style={st.box}>
          <h2 style={st.h2}>US Mortgage Debt Overview 2026</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Metric</th><th style={st.th}>Value</th><th style={st.th}>Notes</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Total US Mortgage Debt</td><td style={{...st.td}}>$12.8 trillion</td><td style={{...st.td}}>All outstanding mortgages</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Number of Mortgages</td><td style={{...st.td}}>53.5 million</td><td style={{...st.td}}>Active mortgage accounts</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Average Mortgage Balance</td><td style={{...st.td}}>$244,500</td><td style={{...st.td}}>Per borrower</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Median Mortgage Balance</td><td style={{...st.td}}>$210,000</td><td style={{...st.td}}>Per borrower</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Average Monthly Payment</td><td style={{...st.td}}>$2,150</td><td style={{...st.td}}>Principal + Interest</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Total Monthly w/ Escrow</td><td style={{...st.td}}>$2,680</td><td style={{...st.td}}>PITI (Principal, Interest, Tax, Insurance)</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Mortgage Originations (2025)</td><td style={{...st.td}}>$1.9 trillion</td><td style={{...st.td}}>Annual new loans</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Refinance Share</td><td style={{...st.td}}>22%</td><td style={{...st.td}}>Of all originations</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Average Loan-to-Value</td><td style={{...st.td}}>72%</td><td style={{...st.td}}>At origination</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Average Credit Score</td><td style={{...st.td}}>735</td><td style={{...st.td}}>Of new borrowers</td></tr>
          </tbody></table></div>
        </div>
        <AdUnit slot="3248634657" />
        <div style={st.box}>
          <h2 style={st.h2}>Average Mortgage Balance by Age</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Age Group</th><th style={st.th}>Avg Mortgage Balance</th><th style={st.th}>Notes</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Under 30</td><td style={{...st.td}}>$228,000</td><td style={{...st.td}}>First-time buyer mortgages</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>30-39</td><td style={{...st.td}}>$268,000</td><td style={{...st.td}}>Upgrading/growing families</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>40-49</td><td style={{...st.td}}>$245,000</td><td style={{...st.td}}>Peak home value period</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>50-59</td><td style={{...st.td}}>$198,000</td><td style={{...st.td}}>Paying down principal</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>60-69</td><td style={{...st.td}}>$152,000</td><td style={{...st.td}}>Approaching retirement</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>70+</td><td style={{...st.td}}>$118,000</td><td style={{...st.td}}>Many paid off or downsized</td></tr>
          </tbody></table></div>
        </div>
        <div style={st.box}>
          <h2 style={st.h2}>Home Equity Statistics</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr><th style={st.th}>Metric</th><th style={st.th}>Value</th><th style={st.th}>Notes</th></tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Total US Home Equity</td><td style={{...st.td}}>$35.2 trillion</td><td style={{...st.td}}>All homeowners combined</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Average Equity per Homeowner</td><td style={{...st.td}}>$315,000</td><td style={{...st.td}}>Including paid-off homes</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Equity-Rich Homes</td><td style={{...st.td}}>48.3%</td><td style={{...st.td}}>Mortgage balance less than 50% of value</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Underwater Mortgages</td><td style={{...st.td}}>1.8%</td><td style={{...st.td}}>Owe more than home is worth</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>Average HELOC Balance</td><td style={{...st.td}}>$42,000</td><td style={{...st.td}}>Among HELOC holders</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:600,color:'#e2e8f0'}}>HELOC Utilization Rate</td><td style={{...st.td}}>38%</td><td style={{...st.td}}>Of available credit line</td></tr>
          </tbody></table></div>
        </div>
        <div style={st.box}>
          <h2 style={st.h2}>Related Calculators</h2>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            <a href="/mortgage-calculator" style={st.calcLink}>mortgage calculator</a>
            <a href="/home-affordability-calculator" style={st.calcLink}>home affordability calculator</a>
            <a href="/net-worth-calculator" style={st.calcLink}>net worth calculator</a>
            <a href="/heloc-calculator" style={st.calcLink}>heloc calculator</a>
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