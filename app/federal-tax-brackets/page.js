import Header from '../../components/Header'
import Footer from '../../components/Footer'
import AdUnit from '../../components/AdUnit'
import FaqSchema from '../../components/FaqSchema'

export const metadata = {
  title: 'Federal Tax Brackets 2026 (IRS Income Tax Rates & Calculator) | FreeFinCalc',
  description: '2026 federal income tax brackets and rates for all filing statuses. Single, married filing jointly, head of household. Includes standard deduction and capital gains rates.',
  alternates: { canonical: 'https://www.freefincalc.net/federal-tax-brackets' },
  openGraph: {
    title: 'Federal Tax Brackets 2026 (IRS Income Tax Rates & Calculator)',
    description: '2026 federal income tax brackets and rates for all filing statuses. Single, married filing jointly, head of household. Includes standard deduction and capital gains rates.',
    url: 'https://www.freefincalc.net/federal-tax-brackets',
    siteName: 'FreeFinCalc',
    type: 'article',
  },
}

const faqs = [{"q":"What are the federal tax brackets for 2026?","a":"The 2026 tax brackets are: 10%, 12%, 22%, 24%, 32%, 35%, and 37%. These are marginal rates, meaning only the income within each bracket is taxed at that rate."},{"q":"What is the standard deduction for 2026?","a":"The 2026 standard deduction is $15,000 for single filers, $30,000 for married filing jointly, and $22,500 for head of household. Additional deductions apply for those over 65."},{"q":"What is the 401k contribution limit for 2026?","a":"The 2026 401k contribution limit is $23,500, with an additional $7,500 catch-up contribution for those 50 and older."},{"q":"What are the capital gains tax rates for 2026?","a":"Long-term capital gains (held over 1 year) are taxed at 0%, 15%, or 20% depending on income. Short-term gains are taxed as ordinary income."}]

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
          <span style={{color:'#94a3b8'}}>Federal Tax Brackets</span>
        </nav>

        <h1 style={st.h1}>Federal Tax Brackets 2026 (IRS Income Tax Rates & Calculator)</h1>
        <p style={st.desc}>2026 federal income tax brackets and rates for all filing statuses. Single, married filing jointly, head of household. Includes standard deduction and capital gains rates.</p>
        <p style={st.vol}>Est. monthly search volume: 500K+/mo</p>

        <div style={st.box}>
          <h2 style={st.h2}>Federal Tax Brackets 2026</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr>
            <th style={st.th}>Tax Rate</th>
            <th style={st.th}>Single</th>
            <th style={st.th}>Married Filing Jointly</th>
            <th style={st.th}>Head of Household</th>
          </tr></thead><tbody>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>10%</td><td style={{...st.td}}>$0 - $11,925</td><td style={{...st.td}}>$0 - $23,850</td><td style={{...st.td}}>$0 - $17,000</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>12%</td><td style={{...st.td}}>$11,926 - $48,475</td><td style={{...st.td}}>$23,851 - $96,950</td><td style={{...st.td}}>$17,001 - $64,850</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>22%</td><td style={{...st.td}}>$48,476 - $103,350</td><td style={{...st.td}}>$96,951 - $206,700</td><td style={{...st.td}}>$64,851 - $103,350</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>24%</td><td style={{...st.td}}>$103,351 - $197,300</td><td style={{...st.td}}>$206,701 - $394,600</td><td style={{...st.td}}>$103,351 - $197,300</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>32%</td><td style={{...st.td}}>$197,301 - $250,525</td><td style={{...st.td}}>$394,601 - $501,050</td><td style={{...st.td}}>$197,301 - $250,500</td></tr>
              <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>35%</td><td style={{...st.td}}>$250,526 - $626,350</td><td style={{...st.td}}>$501,051 - $751,600</td><td style={{...st.td}}>$250,501 - $626,350</td></tr>
              <tr style={{background:'transparent'}}><td style={{...st.td,fontWeight:700,color:'#e2e8f0'}}>37%</td><td style={{...st.td}}>Over $626,350</td><td style={{...st.td}}>Over $751,600</td><td style={{...st.td}}>Over $626,350</td></tr>
          </tbody></table></div>
        </div>

        <AdUnit slot="3248634657" />
        <div style={st.box}>
          <h2 style={st.h2}>Standard Deduction 2026</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr>
            <th style={st.th}>Filing Status</th>
            <th style={st.th}>Standard Deduction</th>
            <th style={st.th}>Over 65 Additional</th>
          </tr></thead><tbody>
            <tr style={{background:'transparent'}}><td style={st.td}>Single</td><td style={st.td}>$15,000</td><td style={st.td}>$16,950</td></tr>
            <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={st.td}>Married Filing Jointly</td><td style={st.td}>$30,000</td><td style={st.td}>$31,500 (one) / $33,000 (both)</td></tr>
            <tr style={{background:'transparent'}}><td style={st.td}>Head of Household</td><td style={st.td}>$22,500</td><td style={st.td}>$24,450</td></tr>
          </tbody></table></div>
        </div>
        <div style={st.box}>
          <h2 style={st.h2}>Capital Gains Tax Rates 2026</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr>
            <th style={st.th}>Rate</th>
            <th style={st.th}>Single</th>
            <th style={st.th}>Married Filing Jointly</th>
          </tr></thead><tbody>
            <tr style={{background:'transparent'}}><td style={st.td}>0%</td><td style={st.td}>$0 - $48,350</td><td style={st.td}>$0 - $96,700</td></tr>
            <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={st.td}>15%</td><td style={st.td}>$48,351 - $533,400</td><td style={st.td}>$96,701 - $600,050</td></tr>
            <tr style={{background:'transparent'}}><td style={st.td}>20%</td><td style={st.td}>Over $533,400</td><td style={st.td}>Over $600,050</td></tr>
          </tbody></table></div>
        </div>
        <div style={st.box}>
          <h2 style={st.h2}>Key Tax Numbers 2026</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr>
            <th style={st.th}>Item</th>
            <th style={st.th}>Amount</th>
          </tr></thead><tbody>
            <tr style={{background:'transparent'}}><td style={st.td}>Social Security Wage Base</td><td style={st.td}>$176,100</td></tr>
            <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={st.td}>Medicare Tax Rate</td><td style={st.td}>1.45% (+ 0.9% over $200K)</td></tr>
            <tr style={{background:'transparent'}}><td style={st.td}>Social Security Tax Rate</td><td style={st.td}>6.2%</td></tr>
            <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={st.td}>401k Contribution Limit</td><td style={st.td}>$23,500</td></tr>
            <tr style={{background:'transparent'}}><td style={st.td}>401k Catch-Up (50+)</td><td style={st.td}>$7,500</td></tr>
            <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={st.td}>IRA Contribution Limit</td><td style={st.td}>$7,000</td></tr>
            <tr style={{background:'transparent'}}><td style={st.td}>IRA Catch-Up (50+)</td><td style={st.td}>$1,000</td></tr>
            <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={st.td}>HSA Individual Limit</td><td style={st.td}>$4,300</td></tr>
            <tr style={{background:'transparent'}}><td style={st.td}>HSA Family Limit</td><td style={st.td}>$8,550</td></tr>
            <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={st.td}>Gift Tax Exclusion</td><td style={st.td}>$19,000</td></tr>
            <tr style={{background:'transparent'}}><td style={st.td}>Estate Tax Exemption</td><td style={st.td}>$13.99 million</td></tr>
            <tr style={{background:'rgba(255,255,255,0.015)'}}><td style={st.td}>Child Tax Credit</td><td style={st.td}>$2,000 per child</td></tr>
            <tr style={{background:'transparent'}}><td style={st.td}>EITC Max (3+ children)</td><td style={st.td}>$7,830</td></tr>
          </tbody></table></div>
        </div>

        <div style={st.box}>
          <h2 style={st.h2}>Related Calculators</h2>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            <a href="/tax-calculator" style={st.calcLink}>tax calculator</a>
            <a href="/salary-after-tax-calculator" style={st.calcLink}>salary after tax calculator</a>
            <a href="/capital-gains-tax-calculator" style={st.calcLink}>capital gains tax calculator</a>
            <a href="/paycheck-calculator" style={st.calcLink}>paycheck calculator</a>
          </div>
        </div>

        <div style={st.box}>
          <h2 style={st.h2}>Related Data</h2>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            <a href="/data/states-with-no-income-tax" style={st.dataLink}>states with no income tax</a>
            <a href="/data/states-with-highest-income-tax" style={st.dataLink}>states with highest income tax</a>
            <a href="/data/tax-burden-by-state" style={st.dataLink}>tax burden by state</a>
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"Article","headline":"Federal Tax Brackets 2026 (IRS Income Tax Rates & Calculator)","description":"2026 federal income tax brackets and rates for all filing statuses. Single, married filing jointly, head of household. Includes standard deduction and capital gains rates.","author":{"@type":"Organization","name":"FreeFinCalc"},"publisher":{"@type":"Organization","name":"FreeFinCalc"},"datePublished":"2026-03-27","dateModified":"2026-03-27","mainEntityOfPage":"https://www.freefincalc.net/federal-tax-brackets"})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Federal Tax Brackets 2026","item":"https://www.freefincalc.net/federal-tax-brackets"}]})}} />
      <Footer />
    </div>
  )
}
