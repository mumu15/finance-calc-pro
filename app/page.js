import Link from 'next/link'
import Script from 'next/script'
import Header from '../components/Header'
import Footer from '../components/Footer'
import TrustSection from '../components/TrustSection'

export const metadata = {
  title: 'FreeFinCalc.net — 100 Free Financial Calculators in 40+ Currencies',
  description: '100 free professional financial calculators: loans, debt, investing, salary, tax and more. 40+ currencies. Instant results. PDF download. No sign up.',
  keywords: ['free financial calculator','mortgage calculator','loan calculator','compound interest calculator','debt payoff calculator','salary calculator','tax calculator'],
  openGraph: { title:'FreeFinCalc.net — 100 Free Financial Calculators', description:'100 free calculators in 40+ currencies.', url:'https://www.freefincalc.net', type:'website' },
  alternates: { canonical:'https://www.freefincalc.net' },
}

const categories = [{"id":"loan","label":"Loan Calculators","svgPath":"M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10","color":"#f0c842","bg":"rgba(240,200,66,0.08)","border":"rgba(240,200,66,0.18)","desc":"Payments, interest and true costs for any loan.","tools":[{"title":"Mortgage Calculator","href":"/mortgage-calculator","badge":"Popular"},{"title":"Loan Payment Calculator","href":"/loan-payment-calculator"},{"title":"Personal Loan Calculator","href":"/personal-loan-calculator"},{"title":"Car Loan Calculator","href":"/car-loan-calculator"},{"title":"Business Loan Calculator","href":"/business-loan-calculator"},{"title":"Student Loan Calculator","href":"/student-loan-calculator"},{"title":"Truck Loan Calculator","href":"/truck-loan-calculator"},{"title":"Boat Loan Calculator","href":"/boat-loan-calculator"},{"title":"RV Loan Calculator","href":"/rv-loan-calculator"},{"title":"Equipment Loan Calculator","href":"/equipment-loan-calculator"}]},{"id":"debt","label":"Debt Calculators","svgPath":"M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z","color":"#f97316","bg":"rgba(249,115,22,0.08)","border":"rgba(249,115,22,0.18)","desc":"Payoff strategies, utilization and consolidation tools.","tools":[{"title":"Credit Card Payoff","href":"/credit-card-payoff-calculator","badge":"Popular"},{"title":"Debt Snowball Calculator","href":"/debt-snowball-calculator"},{"title":"Debt Avalanche Calculator","href":"/debt-avalanche-calculator"},{"title":"Debt Consolidation","href":"/debt-consolidation-calculator"},{"title":"Loan Interest Calculator","href":"/loan-interest-calculator"},{"title":"Debt Payoff Time","href":"/debt-payoff-time-calculator"},{"title":"Credit Utilization","href":"/credit-utilization-calculator"},{"title":"Balance Transfer","href":"/balance-transfer-calculator"},{"title":"Min Payment Calculator","href":"/credit-card-minimum-payment-calculator"},{"title":"Total Debt Calculator","href":"/total-debt-calculator"}]},{"id":"invest","label":"Investment Calculators","svgPath":"M13 7h8m0 0v8m0-8l-8 8-4-4-6 6","color":"#34d399","bg":"rgba(52,211,153,0.08)","border":"rgba(52,211,153,0.18)","desc":"Compound interest, FIRE and portfolio growth tools.","tools":[{"title":"Compound Interest","href":"/compound-interest","badge":"Popular"},{"title":"Investment Return","href":"/investment-return-calculator"},{"title":"Stock Profit Calculator","href":"/stock-profit-calculator"},{"title":"Dividend Calculator","href":"/dividend-calculator"},{"title":"Savings Growth Calculator","href":"/savings-growth-calculator"},{"title":"Retirement Savings","href":"/retirement-savings-calculator"},{"title":"FIRE Calculator","href":"/fire-retirement-calculator"},{"title":"Portfolio Growth","href":"/portfolio-growth-calculator"},{"title":"Dollar Cost Averaging","href":"/dollar-cost-averaging-calculator"},{"title":"Passive Income Calculator","href":"/passive-income-calculator"}]},{"id":"salary","label":"Salary Calculators","svgPath":"M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z","color":"#60a5fa","bg":"rgba(96,165,250,0.08)","border":"rgba(96,165,250,0.18)","desc":"Convert pay rates, take-home and compensation tools.","tools":[{"title":"Hourly to Salary","href":"/hourly-to-salary-calculator","badge":"Popular"},{"title":"Salary to Hourly","href":"/salary-to-hourly-calculator"},{"title":"Salary After Tax","href":"/salary-after-tax-calculator"},{"title":"Overtime Pay Calculator","href":"/overtime-pay-calculator"},{"title":"Freelance Rate Calculator","href":"/freelance-rate-calculator"},{"title":"Contractor Pay Calculator","href":"/contractor-pay-calculator"},{"title":"Commission Calculator","href":"/commission-calculator"},{"title":"Pay Raise Calculator","href":"/pay-raise-calculator"},{"title":"Take Home Pay Calculator","href":"/take-home-pay-calculator"},{"title":"Net Salary Calculator","href":"/net-salary-calculator"}]},{"id":"living","label":"Cost of Living","svgPath":"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6","color":"#a78bfa","bg":"rgba(167,139,250,0.08)","border":"rgba(167,139,250,0.18)","desc":"Rent, mortgage, utilities and monthly living tools.","tools":[{"title":"Cost of Living Calculator","href":"/cost-of-living-calculator","badge":"Popular"},{"title":"Rent Affordability","href":"/rent-affordability-calculator"},{"title":"Mortgage Affordability","href":"/mortgage-affordability-calculator"},{"title":"Moving Cost Calculator","href":"/moving-cost-calculator"},{"title":"Utility Cost Calculator","href":"/utility-cost-calculator"},{"title":"Grocery Budget Calculator","href":"/grocery-budget-calculator"},{"title":"Household Budget Calculator","href":"/household-budget-calculator"},{"title":"Apartment Affordability","href":"/apartment-affordability-calculator"},{"title":"Property Tax Calculator","href":"/property-tax-calculator"},{"title":"Rent vs Buy Calculator","href":"/rent-vs-buy-calculator"}]},{"id":"vehicle","label":"Vehicle Calculators","svgPath":"M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8l2-2zM13 6l4 4 2 2v4h-2","color":"#fb7185","bg":"rgba(251,113,133,0.08)","border":"rgba(251,113,133,0.18)","desc":"Car payments, fuel costs and EV charging tools.","tools":[{"title":"Car Payment Calculator","href":"/car-payment-calculator","badge":"Popular"},{"title":"Auto Loan Calculator","href":"/auto-loan-calculator"},{"title":"Fuel Cost Calculator","href":"/fuel-cost-calculator"},{"title":"Gas Mileage Calculator","href":"/gas-mileage-calculator"},{"title":"Vehicle Depreciation","href":"/vehicle-depreciation-calculator"},{"title":"Lease vs Buy Calculator","href":"/lease-vs-buy-calculator"},{"title":"Car Affordability Calculator","href":"/car-affordability-calculator"},{"title":"Road Trip Cost Calculator","href":"/road-trip-cost-calculator"},{"title":"Truck Fuel Cost Calculator","href":"/truck-fuel-cost-calculator"},{"title":"EV Charging Cost Calculator","href":"/ev-charging-cost-calculator"}]},{"id":"business","label":"Business Calculators","svgPath":"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z","color":"#fbbf24","bg":"rgba(251,191,36,0.08)","border":"rgba(251,191,36,0.18)","desc":"ROI, break-even, profit margins and valuation tools.","tools":[{"title":"Profit Margin Calculator","href":"/profit-margin-calculator","badge":"Popular"},{"title":"Break-Even Calculator","href":"/break-even-calculator"},{"title":"ROI Calculator","href":"/roi-calculator"},{"title":"Startup Cost Calculator","href":"/startup-cost-calculator"},{"title":"Business Loan Calculator","href":"/business-loan-calculator"},{"title":"Revenue Growth Calculator","href":"/revenue-growth-calculator"},{"title":"Pricing Calculator","href":"/pricing-calculator"},{"title":"Inventory Turnover","href":"/inventory-turnover-calculator"},{"title":"Sales Commission Calc","href":"/sales-commission-calculator"},{"title":"Business Valuation","href":"/business-valuation-calculator"}]},{"id":"tax","label":"Tax Calculators","svgPath":"M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z","color":"#4ade80","bg":"rgba(74,222,128,0.08)","border":"rgba(74,222,128,0.18)","desc":"Income, self-employment, VAT and capital gains tools.","tools":[{"title":"Income Tax Calculator","href":"/income-tax-calculator","badge":"Popular"},{"title":"Self-Employment Tax","href":"/self-employment-tax-calculator"},{"title":"Capital Gains Tax","href":"/capital-gains-tax-calculator"},{"title":"Sales Tax Calculator","href":"/sales-tax-calculator"},{"title":"VAT Calculator","href":"/vat-calculator"},{"title":"Payroll Tax Calculator","href":"/payroll-tax-calculator"},{"title":"Tax Refund Calculator","href":"/tax-refund-calculator"},{"title":"Corporate Tax Calculator","href":"/corporate-tax-calculator"},{"title":"State Tax Calculator","href":"/state-tax-calculator"},{"title":"Property Tax Calculator","href":"/property-tax-calculator"}]},{"id":"budget","label":"Budget & Money","svgPath":"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z","color":"#38bdf8","bg":"rgba(56,189,248,0.08)","border":"rgba(56,189,248,0.18)","desc":"Budgets, emergency funds, net worth and FIRE tools.","tools":[{"title":"Monthly Budget Calculator","href":"/budget-calculator","badge":"Popular"},{"title":"Expense Tracker","href":"/expense-tracker-calculator"},{"title":"Emergency Fund Calculator","href":"/emergency-fund-calculator"},{"title":"Debt-to-Income Calculator","href":"/debt-to-income-calculator"},{"title":"Net Worth Calculator","href":"/net-worth-calculator"},{"title":"Financial Independence","href":"/financial-independence-calculator"},{"title":"Savings Goal Calculator","href":"/savings-calculator"},{"title":"Retirement Age Calculator","href":"/retirement-age-calculator"},{"title":"Wealth Growth Calculator","href":"/wealth-growth-calculator"},{"title":"Inflation Calculator","href":"/inflation-calculator"}]},{"id":"bonus","label":"High-Value Tools","svgPath":"M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z","color":"#e879f9","bg":"rgba(232,121,249,0.08)","border":"rgba(232,121,249,0.18)","desc":"High-CPC: amortization, APR, refinance and comparison.","tools":[{"title":"Mortgage Amortization","href":"/mortgage-amortization-calculator","badge":"High CPC"},{"title":"Loan Comparison Calculator","href":"/loan-comparison-calculator","badge":"High CPC"},{"title":"Interest Rate Calculator","href":"/interest-rate-calculator"},{"title":"APR Calculator","href":"/apr-calculator"},{"title":"Credit Score Simulator","href":"/credit-score-simulator"},{"title":"Down Payment Calculator","href":"/down-payment-calculator"},{"title":"Refinance Calculator","href":"/refinance-calculator"},{"title":"Investment Risk Calculator","href":"/investment-risk-calculator"},{"title":"Loan Eligibility Calculator","href":"/loan-eligibility-calculator"},{"title":"Early Loan Payoff Calculator","href":"/early-loan-payoff-calculator"}]}]
const faqs = [{"q":"Are all calculators on FreeFinCalc.net free?","a":"Yes — every calculator is 100% free with no sign up, no subscription and no hidden fees. All calculators remain free forever."},{"q":"What currencies does FreeFinCalc.net support?","a":"FreeFinCalc.net supports 40+ global currencies. Your local currency is auto-detected and you can switch at any time using the currency selector."},{"q":"Can I download my calculation results as a PDF?","a":"Yes — every calculator includes a PDF download button. Results are formatted as a professional document with a full disclaimer."},{"q":"How accurate are the financial calculators?","a":"Our calculators use standard financial formulas such as the amortization formula for loans and compound interest for investments. Results may differ from lender figures due to fees and specific terms."},{"q":"Is the financial information on FreeFinCalc.net advice?","a":"No — calculators are for educational purposes only and do not constitute financial, tax or legal advice. Always consult a qualified financial professional before making decisions."}]
const jsonLd = {"@context":"https://schema.org","@graph":[{"@type":"WebSite","@id":"https://www.freefincalc.net/#website","url":"https://www.freefincalc.net","name":"FreeFinCalc.net","description":"100 free financial calculators in 40+ currencies"},{"@type":"Organization","@id":"https://www.freefincalc.net/#organization","name":"FreeFinCalc.net","url":"https://www.freefincalc.net"},{"@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Are all calculators on FreeFinCalc.net free?","acceptedAnswer":{"@type":"Answer","text":"Yes — every calculator is 100% free with no sign up, no subscription and no hidden fees. All calculators remain free forever."}},{"@type":"Question","name":"What currencies does FreeFinCalc.net support?","acceptedAnswer":{"@type":"Answer","text":"FreeFinCalc.net supports 40+ global currencies. Your local currency is auto-detected and you can switch at any time using the currency selector."}},{"@type":"Question","name":"Can I download my calculation results as a PDF?","acceptedAnswer":{"@type":"Answer","text":"Yes — every calculator includes a PDF download button. Results are formatted as a professional document with a full disclaimer."}},{"@type":"Question","name":"How accurate are the financial calculators?","acceptedAnswer":{"@type":"Answer","text":"Our calculators use standard financial formulas such as the amortization formula for loans and compound interest for investments. Results may differ from lender figures due to fees and specific terms."}},{"@type":"Question","name":"Is the financial information on FreeFinCalc.net advice?","acceptedAnswer":{"@type":"Answer","text":"No — calculators are for educational purposes only and do not constitute financial, tax or legal advice. Always consult a qualified financial professional before making decisions."}}]}]}

export default function Home() {
  const total = categories.reduce((a,c) => a + c.tools.length, 0)
  return (
    <>
      <Script id="hp-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main-content">

        {/* HERO */}
        <section style={{ position:'relative', overflow:'hidden', paddingTop:'80px', paddingBottom:'64px', textAlign:'center' }}>
          <div aria-hidden="true" style={{ position:"absolute", inset:0, zIndex:0, backgroundImage:'linear-gradient(rgba(240,200,66,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(240,200,66,0.04) 1px,transparent 1px)', backgroundSize:'48px 48px', maskImage:'radial-gradient(ellipse 80% 60% at 50% 0%,black 40%,transparent 100%)' }} />
          <div aria-hidden="true" style={{ position:"absolute", top:'-120px', left:'50%', transform:'translateX(-50%)', width:'700px', height:'400px', background:'radial-gradient(ellipse,rgba(240,200,66,0.12) 0%,transparent 70%)', zIndex:0, pointerEvents:'none' }} />
          <div className="max-w-5xl mx-auto px-4" style={{ position:"relative", zIndex:1 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'6px 16px', borderRadius:'100px', marginBottom:'28px', background:'rgba(240,200,66,0.1)', border:'1px solid rgba(240,200,66,0.22)', fontSize:'12.5px', fontWeight:'600', color:'rgba(240,200,66,0.9)' }}>
              <span style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#f0c842', boxShadow:'0 0 8px #f0c842', display:'inline-block' }} />
              {total} Free Calculators · 10 Categories · 40+ Currencies · No Sign Up
            </div>
            <h1 style={{ fontFamily:'"DM Serif Display",Georgia,serif', fontSize:"clamp(38px,6vw,72px)", fontWeight:'400', lineHeight:'1.08', letterSpacing:'-1.5px', color:'#f1f5f9', marginBottom:'24px' }}>
              Free Financial<br/>
              <span style={{ background:'linear-gradient(135deg,#f0c842 0%,#f5a623 50%,#f0c842 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Calculators</span>
            </h1>
            <p style={{ color:'#64748b', fontSize:'clamp(15px,2vw,19px)', lineHeight:'1.65', maxWidth:'580px', margin:'0 auto 36px' }}>
              Professional tools for loans, debt, investing, salary, tax and business — in your local currency, with PDF download, completely free.
            </p>
            <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'10px', marginBottom:'44px' }}>
              {[['⚡','Instant Results'],['🔒','No Sign Up'],['💯','100% Free'],['🌍','40+ Currencies'],['📄','PDF Download'],['📱','Mobile Friendly']].map(([ic,tx]) => (
                <span key={tx} style={{ display:'inline-flex', alignItems:'center', gap:'6px', padding:'7px 14px', borderRadius:'100px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', color:'#94a3b8', fontSize:'13px', fontWeight:'500' }}>{ic} {tx}</span>
              ))}
            </div>
            <a href="#calculators" className="cta-btn">
              Browse All {total} Calculators
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
        </section>

        {/* STATS */}
        <section className="max-w-5xl mx-auto px-4" style={{ marginBottom:"72px" }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', borderRadius:'18px', overflow:'hidden', border:'1px solid rgba(240,200,66,0.12)', background:'rgba(240,200,66,0.025)' }}>
            {[{n:total,s:'',l:'Free Calculators'},{n:'40',s:'+',l:'Currencies'},{n:'100K',s:'+',l:'Monthly Users'},{n:'4.9',s:'★',l:'User Rating'}].map((st,i) => (
              <div key={i} style={{ padding:'24px 20px', textAlign:'center', borderRight:i<3?'1px solid rgba(240,200,66,0.1)':'none' }}>
                <div style={{ fontFamily:'"DM Serif Display",serif', fontSize:"clamp(26px,3vw,36px)", color:'#f0c842', lineHeight:'1', marginBottom:'6px' }}>{st.n}<span style={{ color:'rgba(240,200,66,0.6)', fontSize:'0.7em' }}>{st.s}</span></div>
                <div style={{ color:'#475569', fontSize:'12.5px', fontWeight:'500' }}>{st.l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CATEGORIES */}
        <section id="calculators" className="max-w-6xl mx-auto px-4" style={{ paddingBottom:"80px" }}>
          <div style={{ textAlign:'center', marginBottom:'56px' }}>
            <h2 style={{ fontFamily:'"DM Serif Display",serif', fontSize:"clamp(26px,4vw,40px)", fontWeight:'400', color:'#f1f5f9', letterSpacing:'-0.5px', marginBottom:'12px' }}>
              Everything You Need to Make Better Money Decisions
            </h2>
            <p style={{ color:'#475569', fontSize:'16px', maxWidth:'540px', margin:'0 auto', lineHeight:'1.6' }}>
              10 categories. {total} calculators. All free. All in your currency.
            </p>
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:'56px' }}>
            {categories.map(cat => (
              <article key={cat.id}>
                <div style={{ display:'flex', alignItems:'center', gap:'14px', marginBottom:'20px', flexWrap:'wrap' }}>
                  <div style={{ width:'42px', height:'42px', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, background:cat.bg, border:'1px solid '+cat.border, color:cat.color }}>
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d={cat.svgPath}/></svg>
                  </div>
                  <div>
                    <h2 style={{ fontFamily:'"DM Serif Display",serif', fontSize:"clamp(18px,2.5vw,24px)", fontWeight:'400', color:'#f1f5f9', letterSpacing:'-0.3px', margin:0, lineHeight:'1.2' }}>{cat.label}</h2>
                    <p style={{ color:'#475569', fontSize:'13px', margin:'3px 0 0' }}>{cat.desc}</p>
                  </div>
                  <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg,'+cat.border+',transparent)', minWidth:'40px' }} />
                  <span style={{ padding:'4px 12px', borderRadius:'100px', fontSize:'11.5px', fontWeight:'600', background:cat.bg, border:'1px solid '+cat.border, color:cat.color, flexShrink:0 }}>{cat.tools.length} tools</span>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:'10px' }}>
                  {cat.tools.map(tool => (
                    <Link key={tool.href} href={tool.href} className="tool-card">
                      {tool.badge && (
                        <span style={{ position:'absolute', top:'10px', right:'10px', padding:'2px 7px', borderRadius:'100px', fontSize:'10px', fontWeight:'700', background:cat.bg, border:'1px solid '+cat.border, color:cat.color }}>{tool.badge}</span>
                      )}
                      <h3 className="tool-card-title" style={{ paddingRight:tool.badge?"52px':'0' }}>{tool.title}</h3>
                      <span style={{ display:'inline-flex', alignItems:'center', gap:'4px', fontSize:'12px', fontWeight:'600', color:cat.color, opacity:0.85 }}>
                        Open <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SEO BLOCK */}
        <section className="max-w-4xl mx-auto px-4" style={{ paddingBottom:"64px" }}>
          <div style={{ padding:'40px 44px', borderRadius:'20px', background:'rgba(240,200,66,0.03)', border:'1px solid rgba(240,200,66,0.1)' }}>
            <h2 style={{ fontFamily:'"DM Serif Display",serif', fontSize:"clamp(20px,3vw,28px)", fontWeight:'400', color:'#f1f5f9', letterSpacing:'-0.3px', marginBottom:'16px', textAlign:'center' }}>
              Professional Financial Calculators — Free, Fast &amp; Global
            </h2>
            <p style={{ color:'#475569', fontSize:'14.5px', lineHeight:'1.8', textAlign:'center', maxWidth:'700px', margin:'0 auto 16px' }}>
              FreeFinCalc.net provides {total} free calculators across 10 categories in 40+ currencies. Whether you are calculating a{' '}
              <Link href="/mortgage-calculator" style={{ color:"#94a3b8", textDecoration:'underline' }}>mortgage payment</Link>,{' '}
              <Link href="/car-loan-calculator" style={{ color:"#94a3b8", textDecoration:'underline' }}>car loan</Link>,{' '}
              planning <Link href="/retirement-savings-calculator" style={{ color:"#94a3b8", textDecoration:'underline' }}>retirement</Link> or tracking{' '}
              <Link href="/debt-snowball-calculator" style={{ color:"#94a3b8", textDecoration:'underline' }}>debt payoff</Link> — every calculator adapts to your local currency with PDF download.
            </p>
            <p style={{ color:'#334155', fontSize:'13px', lineHeight:'1.7', textAlign:'center', maxWidth:'660px', margin:'0 auto' }}>
              Popular:{' '}
              <Link href="/compound-interest" style={{ color:"#64748b", textDecoration:'underline' }}>compound interest</Link>,{' '}
              <Link href="/salary-after-tax-calculator" style={{ color:"#64748b", textDecoration:'underline' }}>salary after tax</Link>,{' '}
              <Link href="/profit-margin-calculator" style={{ color:"#64748b", textDecoration:'underline' }}>profit margin</Link>,{' '}
              <Link href="/credit-card-payoff-calculator" style={{ color:"#64748b", textDecoration:'underline' }}>credit card payoff</Link>,{' '}
              <Link href="/fire-retirement-calculator" style={{ color:"#64748b", textDecoration:'underline' }}>FIRE calculator</Link>.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4" style={{ paddingBottom:"72px" }}>
          <h2 style={{ fontFamily:'"DM Serif Display",serif', fontSize:"clamp(22px,3vw,32px)", fontWeight:'400', color:'#f1f5f9', letterSpacing:'-0.3px', textAlign:'center', marginBottom:'32px' }}>
            Frequently Asked Questions
          </h2>
          {faqs.map((faq,i) => (
            <details key={i} className="faq-item">
              <summary>
                {faq.q}
                <svg width="16" height="16" fill="none" stroke="#f0c842" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink:0 }}><path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </summary>
              <p className="faq-answer">{faq.a}</p>
            </details>
          ))}
        </section>

        <TrustSection />
      </main>
      <Footer />
    </>
  )
}
