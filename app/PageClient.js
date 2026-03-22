'use client'
import { useState, useMemo } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AdUnit from '../components/AdUnit'
import FaqSchema from '../components/FaqSchema'


const ALL_CALCS = [
  { name: 'Mortgage Calculator', href: '/mortgage-calculator', cat: 'Mortgage' },
  { name: 'Amortization Calculator', href: '/amortization-calculator', cat: 'Mortgage' },
  { name: 'Refinance Calculator', href: '/refinance-calculator', cat: 'Mortgage' },
  { name: 'Home Affordability', href: '/home-affordability-calculator', cat: 'Mortgage' },
  { name: 'HELOC Calculator', href: '/heloc-calculator', cat: 'Mortgage' },
  { name: 'Property Tax', href: '/property-tax-calculator', cat: 'Mortgage' },
  { name: 'Rent vs Buy', href: '/rent-vs-buy-calculator', cat: 'Mortgage' },
  { name: 'Down Payment', href: '/down-payment-calculator', cat: 'Mortgage' },
  { name: 'Biweekly Mortgage', href: '/biweekly-mortgage-calculator', cat: 'Mortgage' },
  { name: 'Extra Payment', href: '/extra-payment-calculator', cat: 'Mortgage' },
  { name: 'Home Equity', href: '/home-equity-calculator', cat: 'Mortgage' },
  { name: 'Solar Payback', href: '/solar-payback-calculator', cat: 'Mortgage' },
  { name: 'Mortgage Points', href: '/mortgage-points-calculator', cat: 'Mortgage' },
  { name: 'Home Buying Cost', href: '/home-buying-cost-calculator', cat: 'Mortgage' },
  { name: 'Home Improvement Loan', href: '/home-improvement-loan-calculator', cat: 'Mortgage' },
  { name: 'Credit Card Payoff', href: '/credit-card-payoff-calculator', cat: 'Debt' },
  { name: 'Debt Payoff', href: '/debt-payoff-calculator', cat: 'Debt' },
  { name: 'Debt Snowball', href: '/debt-snowball-calculator', cat: 'Debt' },
  { name: 'Debt Avalanche', href: '/debt-avalanche-calculator', cat: 'Debt' },
  { name: 'Balance Transfer', href: '/balance-transfer-calculator', cat: 'Debt' },
  { name: 'Debt Consolidation', href: '/debt-consolidation-calculator', cat: 'Debt' },
  { name: 'Debt-to-Income', href: '/debt-to-income-calculator', cat: 'Debt' },
  { name: 'Credit Utilization', href: '/credit-utilization-calculator', cat: 'Debt' },
  { name: 'Minimum Payment', href: '/credit-card-minimum-payment-calculator', cat: 'Debt' },
  { name: 'Total Debt', href: '/total-debt-calculator', cat: 'Debt' },
  { name: 'Pay Off Debt vs Invest', href: '/payoff-vs-invest-calculator', cat: 'Debt' },
  { name: 'Personal Loan', href: '/personal-loan-calculator', cat: 'Loans' },
  { name: 'Student Loan', href: '/student-loan-calculator', cat: 'Loans' },
  { name: 'Loan Comparison', href: '/loan-comparison-calculator', cat: 'Loans' },
  { name: 'Loan Interest', href: '/loan-interest-calculator', cat: 'Loans' },
  { name: 'Loan Payment', href: '/loan-payment-calculator', cat: 'Loans' },
  { name: 'Business Loan', href: '/business-loan-calculator', cat: 'Loans' },
  { name: 'SBA Loan', href: '/sba-loan-calculator', cat: 'Loans' },
  { name: 'Equipment Loan', href: '/equipment-loan-calculator', cat: 'Loans' },
  { name: 'APR Calculator', href: '/apr-calculator', cat: 'Loans' },
  { name: 'Simple Interest', href: '/simple-interest-calculator', cat: 'Loans' },
  { name: 'Interest Rate', href: '/interest-rate-calculator', cat: 'Loans' },
  { name: 'Car Loan', href: '/car-loan-calculator', cat: 'Auto' },
  { name: 'Car Affordability', href: '/car-affordability-calculator', cat: 'Auto' },
  { name: 'Car Depreciation', href: '/car-depreciation-calculator', cat: 'Auto' },
  { name: 'Lease vs Buy', href: '/lease-vs-buy-calculator', cat: 'Auto' },
  { name: 'Fuel Cost', href: '/fuel-cost-calculator', cat: 'Auto' },
  { name: 'Boat Loan', href: '/boat-loan-calculator', cat: 'Auto' },
  { name: 'RV Loan', href: '/rv-loan-calculator', cat: 'Auto' },
  { name: 'Truck Loan', href: '/truck-loan-calculator', cat: 'Auto' },
  { name: 'Retirement Calculator', href: '/retirement-calculator', cat: 'Retirement' },
  { name: '401k Calculator', href: '/401k-calculator', cat: 'Retirement' },
  { name: 'Roth IRA', href: '/roth-ira-calculator', cat: 'Retirement' },
  { name: 'FIRE Calculator', href: '/fire-calculator', cat: 'Retirement' },
  { name: 'Social Security', href: '/social-security-calculator', cat: 'Retirement' },
  { name: 'RMD Calculator', href: '/rmd-calculator', cat: 'Retirement' },
  { name: 'Pension', href: '/pension-calculator', cat: 'Retirement' },
  { name: 'Annuity', href: '/annuity-calculator', cat: 'Retirement' },
  { name: 'FIRE Retirement', href: '/fire-retirement-calculator', cat: 'Retirement' },
  { name: 'Retirement Savings', href: '/retirement-savings-calculator', cat: 'Retirement' },
  { name: 'Investment Return', href: '/investment-return-calculator', cat: 'Investing' },
  { name: 'Portfolio Growth', href: '/portfolio-growth-calculator', cat: 'Investing' },
  { name: 'Portfolio Rebalancing', href: '/portfolio-rebalancing-calculator', cat: 'Investing' },
  { name: 'Dollar Cost Averaging', href: '/dollar-cost-averaging-calculator', cat: 'Investing' },
  { name: 'Passive Income', href: '/passive-income-calculator', cat: 'Investing' },
  { name: 'Dividend Calculator', href: '/dividend-calculator', cat: 'Investing' },
  { name: 'Stock Profit', href: '/stock-profit-calculator', cat: 'Investing' },
  { name: 'Bond Yield', href: '/bond-yield-calculator', cat: 'Investing' },
  { name: 'CD Calculator', href: '/cd-calculator', cat: 'Savings' },
  { name: 'Savings Goal', href: '/savings-goal-calculator', cat: 'Savings' },
  { name: 'Savings Interest', href: '/savings-interest-calculator', cat: 'Savings' },
  { name: 'Savings Growth', href: '/savings-growth-calculator', cat: 'Savings' },
  { name: 'Emergency Fund', href: '/emergency-fund-calculator', cat: 'Savings' },
  { name: 'College Savings', href: '/college-savings-calculator', cat: 'Savings' },
  { name: 'Income Tax', href: '/tax-calculator', cat: 'Tax' },
  { name: 'Capital Gains Tax', href: '/capital-gains-tax-calculator', cat: 'Tax' },
  { name: 'Self-Employment Tax', href: '/self-employment-tax-calculator', cat: 'Tax' },
  { name: 'Payroll Tax', href: '/payroll-tax-calculator', cat: 'Tax' },
  { name: 'Tax Refund', href: '/tax-refund-calculator', cat: 'Tax' },
  { name: 'Sales Tax', href: '/sales-tax-calculator', cat: 'Tax' },
  { name: 'VAT Calculator', href: '/vat-calculator', cat: 'Tax' },
  { name: 'Estate Tax', href: '/estate-tax-calculator', cat: 'Tax' },
  { name: 'Gift Tax', href: '/gift-tax-calculator', cat: 'Tax' },
  { name: 'Child Tax Credit', href: '/child-tax-credit-calculator', cat: 'Tax' },
  { name: 'Salary After Tax', href: '/salary-after-tax-calculator', cat: 'Salary' },
  { name: 'Paycheck Calculator', href: '/paycheck-calculator', cat: 'Salary' },
  { name: 'Hourly to Salary', href: '/hourly-to-salary-calculator', cat: 'Salary' },
  { name: 'Salary to Hourly', href: '/salary-to-hourly-calculator', cat: 'Salary' },
  { name: 'Overtime Pay', href: '/overtime-pay-calculator', cat: 'Salary' },
  { name: 'Commission', href: '/commission-calculator', cat: 'Salary' },
  { name: 'Freelance Rate', href: '/freelance-rate-calculator', cat: 'Salary' },
  { name: 'Net Pay', href: '/net-pay-calculator', cat: 'Salary' },
  { name: 'Raise Calculator', href: '/raise-calculator', cat: 'Salary' },
  { name: 'Profit Margin', href: '/profit-margin-calculator', cat: 'Business' },
  { name: 'Break-Even', href: '/break-even-calculator', cat: 'Business' },
  { name: 'ROI Calculator', href: '/roi-calculator', cat: 'Business' },
  { name: 'Business Valuation', href: '/business-valuation-calculator', cat: 'Business' },
  { name: 'Cash Flow', href: '/cash-flow-calculator', cat: 'Business' },
  { name: 'Startup Cost', href: '/startup-cost-calculator', cat: 'Business' },
  { name: 'Ecommerce Profit', href: '/ecommerce-profit-calculator', cat: 'Business' },
  { name: 'Markup Calculator', href: '/markup-calculator', cat: 'Business' },
  { name: 'Invoice Calculator', href: '/invoice-calculator', cat: 'Business' },
  { name: 'Budget Planner', href: '/budget-planner-calculator', cat: 'Budget' },
  { name: 'Net Worth', href: '/net-worth-calculator', cat: 'Budget' },
  { name: 'Cost of Living', href: '/cost-of-living-calculator', cat: 'Budget' },
  { name: 'Moving Cost', href: '/moving-cost-calculator', cat: 'Budget' },
  { name: 'Wedding Budget', href: '/wedding-budget-calculator', cat: 'Budget' },
  { name: 'Currency Converter', href: '/currency-converter', cat: 'Budget' },
  { name: 'Rental Property', href: '/rental-property-calculator', cat: 'Real Estate' },
  { name: 'Cap Rate', href: '/cap-rate-calculator', cat: 'Real Estate' },
  { name: 'House Flipping', href: '/house-flipping-calculator', cat: 'Real Estate' },
  { name: 'Rent Affordability', href: '/rent-affordability-calculator', cat: 'Real Estate' },
  { name: '401k vs Roth IRA', href: '/401k-vs-roth-ira', cat: 'Comparison' },
  { name: '15 vs 30 Year Mortgage', href: '/15-vs-30-year-mortgage', cat: 'Comparison' },
  { name: 'Fixed vs Adjustable', href: '/fixed-vs-adjustable-mortgage', cat: 'Comparison' },
  { name: 'Debt Snowball vs Avalanche', href: '/debt-snowball-vs-avalanche', cat: 'Comparison' },
  { name: 'CD vs High-Yield Savings', href: '/cd-vs-high-yield-savings', cat: 'Comparison' },
  { name: 'HSA vs FSA', href: '/hsa-vs-fsa', cat: 'Comparison' },
]

const POPULAR = [
  { name: 'Mortgage Calculator', href: '/mortgage-calculator', desc: 'Monthly payments & amortization' },
  { name: 'Tax Calculator', href: '/tax-calculator', desc: '2026 federal tax brackets' },
  { name: 'Retirement Calculator', href: '/retirement-calculator', desc: 'Are you on track to retire?' },
  { name: '401k Calculator', href: '/401k-calculator', desc: 'Employer match & growth' },
  { name: 'Credit Card Payoff', href: '/credit-card-payoff-calculator', desc: 'Pay off cards faster' },
  { name: 'Car Loan Calculator', href: '/car-loan-calculator', desc: 'Auto loan payments' },
  { name: 'Budget Planner', href: '/budget-planner-calculator', desc: '50/30/20 budgeting' },
  { name: 'FIRE Calculator', href: '/fire-calculator', desc: 'Financial independence number' },
  { name: 'Salary After Tax', href: '/salary-after-tax-calculator', desc: 'Exact take-home pay' },
  { name: 'Net Worth Calculator', href: '/net-worth-calculator', desc: 'Assets minus liabilities' },
  { name: 'Student Loan', href: '/student-loan-calculator', desc: 'Repayment plans compared' },
  { name: 'Debt Payoff', href: '/debt-payoff-calculator', desc: 'Custom payoff plan' },
]

const SECTIONS = [
  {
    title: 'Mortgage & Home',
    desc: '15 calculators for home buyers and homeowners',
    color: '#3b82f6',
    tools: [
      { name: 'Mortgage Calculator', href: '/mortgage-calculator' },
      { name: 'Amortization', href: '/amortization-calculator' },
      { name: 'Refinance', href: '/refinance-calculator' },
      { name: 'Home Affordability', href: '/home-affordability-calculator' },
      { name: 'HELOC', href: '/heloc-calculator' },
      { name: 'Property Tax', href: '/property-tax-calculator' },
      { name: 'Rent vs Buy', href: '/rent-vs-buy-calculator' },
      { name: 'Down Payment', href: '/down-payment-calculator' },
    ],
  },
  {
    title: 'Debt & Credit',
    desc: '12 tools to get out of debt faster',
    color: '#ef4444',
    tools: [
      { name: 'Credit Card Payoff', href: '/credit-card-payoff-calculator' },
      { name: 'Debt Payoff', href: '/debt-payoff-calculator' },
      { name: 'Debt Snowball', href: '/debt-snowball-calculator' },
      { name: 'Debt Avalanche', href: '/debt-avalanche-calculator' },
      { name: 'Balance Transfer', href: '/balance-transfer-calculator' },
      { name: 'Debt Consolidation', href: '/debt-consolidation-calculator' },
      { name: 'Debt-to-Income', href: '/debt-to-income-calculator' },
      { name: 'Credit Utilization', href: '/credit-utilization-calculator' },
    ],
  },
  {
    title: 'Retirement & Investing',
    desc: '20 tools for long-term wealth building',
    color: '#10b981',
    tools: [
      { name: 'Retirement', href: '/retirement-calculator' },
      { name: '401k', href: '/401k-calculator' },
      { name: 'Roth IRA', href: '/roth-ira-calculator' },
      { name: 'FIRE', href: '/fire-calculator' },
      { name: 'Investment Return', href: '/investment-return-calculator' },
      { name: 'Dividend', href: '/dividend-calculator' },
      { name: 'Dollar Cost Avg', href: '/dollar-cost-averaging-calculator' },
      { name: 'Social Security', href: '/social-security-calculator' },
    ],
  },
  {
    title: 'Tax & Salary',
    desc: '12 tools for tax planning and income',
    color: '#ec4899',
    tools: [
      { name: 'Income Tax', href: '/tax-calculator' },
      { name: 'Salary After Tax', href: '/salary-after-tax-calculator' },
      { name: 'Paycheck', href: '/paycheck-calculator' },
      { name: 'Capital Gains Tax', href: '/capital-gains-tax-calculator' },
      { name: 'Self-Employment Tax', href: '/self-employment-tax-calculator' },
      { name: 'Hourly to Salary', href: '/hourly-to-salary-calculator' },
      { name: 'Freelance Rate', href: '/freelance-rate-calculator' },
      { name: 'Overtime Pay', href: '/overtime-pay-calculator' },
    ],
  },
]

const COMPARISONS = [
  { name: '401k vs Roth IRA', href: '/401k-vs-roth-ira' },
  { name: 'Roth IRA vs Traditional IRA', href: '/roth-ira-vs-traditional-ira' },
  { name: 'Debt Snowball vs Avalanche', href: '/debt-snowball-vs-avalanche' },
  { name: '15 vs 30 Year Mortgage', href: '/15-vs-30-year-mortgage' },
  { name: 'Rent vs Buy', href: '/rent-vs-buy-calculator' },
  { name: 'Lease vs Buy Car', href: '/lease-vs-buy-calculator' },
]

const COL_STATES = [
  { name: 'California', slug: 'california' },
  { name: 'Texas', slug: 'texas' },
  { name: 'Florida', slug: 'florida' },
  { name: 'New York', slug: 'new-york' },
  { name: 'Illinois', slug: 'illinois' },
  { name: 'Georgia', slug: 'georgia' },
  { name: 'North Carolina', slug: 'north-carolina' },
  { name: 'Ohio', slug: 'ohio' },
  { name: 'Tennessee', slug: 'tennessee' },
  { name: 'Washington', slug: 'washington' },
]

const faqs = [
  { q: 'How many calculators does FreeFinCalc have?', a: 'FreeFinCalc offers over 470 free financial calculators covering mortgage, tax, retirement, investing, debt payoff, budgeting, cost of living, business, auto loans, and more. Every calculator is 100% free with no sign-up required.' },
  { q: 'Are the calculators accurate?', a: 'Yes. All calculators use industry-standard mathematical formulas used by financial professionals. Results are estimates for planning purposes. For binding financial decisions, consult with a qualified financial advisor.' },
  { q: 'Can I use these calculators outside the US?', a: 'Yes. Use the currency selector in the header to switch between 40+ currencies including USD, EUR, GBP, CAD, AUD, and more. The calculators adapt to your selected currency automatically.' },
  { q: 'Is my data private?', a: 'Completely. All calculations happen in your browser. Nothing you enter is sent to our servers or stored anywhere. Your financial data stays on your device.' },
  { q: 'How often are calculators updated?', a: 'We update our calculators regularly to reflect current tax brackets, interest rates, and financial regulations. Formulas and default values are reviewed quarterly.' },
]

export default function HomePage() {
  const [search, setSearch] = useState('')

  const st = {
    page: { minHeight: '100vh', background: '#0f1117', color: '#e2e8f0' },
    wrap: { maxWidth: 1200, margin: '0 auto', padding: '0 16px' },
    hero: { position: 'relative', padding: '48px 16px 40px', textAlign: 'center', overflow: 'hidden' },
    heroGlow: { position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(240,200,66,0.1) 0%, transparent 70%)' },
    badge: { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 99, fontSize: 12, fontWeight: 700, background: 'rgba(240,200,66,0.1)', border: '1px solid rgba(240,200,66,0.25)', color: '#f0c842', marginBottom: 16 },
    h1: { fontSize: 'clamp(30px, 5vw, 52px)', fontWeight: 900, lineHeight: 1.1, margin: '0 0 16px', color: '#fff' },
    h1Gold: { color: '#f0c842' },
    sub: { fontSize: 16, color: '#94a3b8', maxWidth: 600, margin: '0 auto 24px', lineHeight: 1.6 },
    searchWrap: { position: 'relative', maxWidth: 560, margin: '0 auto 24px' },
    searchInput: { width: '100%', padding: '14px 20px 14px 48px', borderRadius: 16, fontSize: 16, color: '#fff', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', outline: 'none', fontFamily: 'inherit' },
    searchIcon: { position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#64748b', fontSize: 18, pointerEvents: 'none' },
    statsBar: { display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' },
    statItem: { textAlign: 'center' },
    statNum: { fontSize: 22, fontWeight: 900, color: '#fff' },
    statLabel: { fontSize: 12, color: '#64748b', marginTop: 2 },
    section: { marginBottom: 48 },
    sectionTitle: { fontSize: 24, fontWeight: 800, color: '#f1f5f9', margin: '0 0 4px' },
    sectionSub: { fontSize: 14, color: '#64748b', margin: '0 0 20px' },
    toolGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 10 },
    toolCard: { padding: '14px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', textDecoration: 'none', transition: 'all 0.15s' },
    toolName: { fontSize: 13, fontWeight: 600, color: '#e2e8f0' },
    popGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 },
    popCard: { padding: '18px 20px', borderRadius: 14, background: 'rgba(240,200,66,0.04)', border: '1px solid rgba(240,200,66,0.12)', textDecoration: 'none', transition: 'all 0.15s' },
    popName: { fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 4 },
    popDesc: { fontSize: 12, color: '#64748b' },
    compGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 },
    compCard: { padding: '14px 18px', borderRadius: 12, background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)', textDecoration: 'none', color: '#a5b4fc', fontSize: 14, fontWeight: 600, transition: 'all 0.15s' },
    colGrid: { display: 'flex', flexWrap: 'wrap', gap: 8 },
    colTag: { padding: '6px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', textDecoration: 'none', color: '#94a3b8', fontSize: 12, fontWeight: 600 },
    cta: { borderRadius: 20, padding: '40px 32px', textAlign: 'center', background: 'rgba(240,200,66,0.06)', border: '1px solid rgba(240,200,66,0.15)', marginBottom: 48 },
    ctaBtn: { display: 'inline-block', padding: '14px 32px', borderRadius: 14, background: '#f0c842', color: '#0a0c14', fontWeight: 800, fontSize: 15, textDecoration: 'none', marginTop: 16 },
    faqBox: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: 28, marginBottom: 48 },
    faqItem: { borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 18, marginBottom: 18 },
    trustGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 48 },
    trustCard: { padding: 24, borderRadius: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', textAlign: 'center' },
  }

  return (
    <div style={st.page}>
      <FaqSchema faqs={faqs} />
      <Header />
      <AdUnit slot="7405024590" />

      {/* Hero */}
      <section style={st.hero}>
        <div style={st.heroGlow} />
        <div style={{position:'relative',maxWidth:700,margin:'0 auto'}}>
          <div style={st.badge}>470+ Free Financial Calculators</div>
          <h1 style={st.h1}>Calculate Smarter.<br /><span style={st.h1Gold}>Plan Better.</span></h1>
          <p style={st.sub}>Mortgage, tax, retirement, investing, debt payoff, budgeting and more. Instant results in 40+ currencies. No sign-up required.</p>

          <div style={st.searchWrap}>
            <span style={st.searchIcon}>&#128269;</span>
            <input type="text" placeholder="Search 470+ calculators..." value={search} onChange={e => setSearch(e.target.value)} style={st.searchInput} />
          </div>

          <div style={st.statsBar}>
            {[['470+','Calculators'],['1,400+','Pages'],['40+','Currencies'],['4.9/5','Rating']].map(([n,l]) => (
              <div key={l} style={st.statItem}>
                <div style={st.statNum}>{n}</div>
                <div style={st.statLabel}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

        {/* Search Results */}
        {search && (() => {
          const q = search.toLowerCase()
          const results = ALL_CALCS.filter(c => c.name.toLowerCase().includes(q) || c.cat.toLowerCase().includes(q) || c.href.toLowerCase().includes(q))
          return (
            <div style={{...st.wrap, marginTop: 32, marginBottom: 32}}>
              <p style={{fontSize:14,color:'#64748b',marginBottom:16}}>{results.length} results for "{search}"</p>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))',gap:10}}>
                {results.map(r => (
                  <a key={r.href} href={r.href} style={{padding:'14px 18px',borderRadius:12,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',textDecoration:'none',transition:'all 0.15s'}} className="tool-link">
                    <div style={{fontSize:13,fontWeight:600,color:'#e2e8f0'}} className="tool-name">{r.name}</div>
                    <div style={{fontSize:11,color:'#64748b',marginTop:4}}>{r.cat}</div>
                  </a>
                ))}
              </div>
              {results.length === 0 && <p style={{color:'#64748b',fontSize:14}}>No calculators found. Try a different search term.</p>}
            </div>
          )
        })()}

      {!search && <div style={st.wrap}>

        {/* Popular Calculators */}
        <div style={st.section}>
          <h2 style={st.sectionTitle}>Most Popular Calculators</h2>
          <p style={st.sectionSub}>Our most-used tools by visitors</p>
          <div style={st.popGrid}>
            {POPULAR.map(t => (
              <a key={t.href} href={t.href} style={st.popCard} className="pop-link">
                <div style={st.popName} className="pop-name">{t.name}</div>
                <div style={st.popDesc}>{t.desc}</div>
              </a>
            ))}
          </div>
        </div>

        <AdUnit slot="3248634657" />

        {/* Calculator Sections */}
        {SECTIONS.map(sec => (
          <div key={sec.title} style={st.section}>
            <h2 style={{...st.sectionTitle, borderLeft: '4px solid ' + sec.color, paddingLeft: 12}}>{sec.title}</h2>
            <p style={st.sectionSub}>{sec.desc}</p>
            <div style={st.toolGrid}>
              {sec.tools.map(t => (
                <a key={t.href} href={t.href} style={st.toolCard} className="tool-link">
                  <div style={st.toolName} className="tool-name">{t.name}</div>
                </a>
              ))}
            </div>
          </div>
        ))}

        {/* Comparisons */}
        <div style={st.section}>
          <h2 style={st.sectionTitle}>Head-to-Head Comparisons</h2>
          <p style={st.sectionSub}>Side-by-side financial comparisons to help you decide</p>
          <div style={st.compGrid}>
            {COMPARISONS.map(c => (
              <a key={c.href} href={c.href} style={st.compCard} className="comp-link">{c.name}</a>
            ))}
          </div>
        </div>

        {/* Cost of Living */}
        <div style={st.section}>
          <h2 style={st.sectionTitle}>Cost of Living by State</h2>
          <p style={st.sectionSub}>Explore living costs across all 50 states</p>
          <div style={st.colGrid}>
            {COL_STATES.map(s => (
              <a key={s.slug} href={'/cost-of-living-calculator/state/' + s.slug} style={st.colTag} className="col-link">{s.name}</a>
            ))}
            <a href="/cost-of-living-calculator" style={{...st.colTag, color:'#f0c842', borderColor:'rgba(240,200,66,0.3)'}}>View All 50 States</a>
          </div>
        </div>

        {/* Trust */}
        <div style={st.trustGrid}>
          {[
            { icon: String.fromCharCode(9889), title: 'Instant Results', desc: 'All calculations happen in your browser. No waiting, no loading, no server calls.' },
            { icon: String.fromCharCode(128274), title: '100% Private', desc: 'We never store your data. Nothing you enter is sent to a server or tracked.' },
            { icon: String.fromCharCode(127758), title: '40+ Currencies', desc: 'Switch currency globally across every calculator in a single click.' },
          ].map(f => (
            <div key={f.title} style={st.trustCard}>
              <div style={{fontSize:32,marginBottom:10}}>{f.icon}</div>
              <h3 style={{fontSize:16,fontWeight:700,color:'#fff',marginBottom:6,marginTop:0}}>{f.title}</h3>
              <p style={{fontSize:13,color:'#64748b',margin:0,lineHeight:1.6}}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Blog CTA */}
        <div style={st.cta}>
          <h2 style={{fontSize:24,fontWeight:800,color:'#fff',margin:'0 0 8px'}}>Financial Guides & Tutorials</h2>
          <p style={{fontSize:15,color:'#94a3b8',margin:0}}>41 in-depth articles on mortgages, investing, budgeting, retirement, and more.</p>
          <a href="/blog" style={st.ctaBtn}>Browse All Guides</a>
        </div>

        {/* FAQ */}
        <div style={st.faqBox}>
          <h2 style={{fontSize:20,fontWeight:700,color:'#f1f5f9',margin:'0 0 20px'}}>Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <div key={i} style={i < faqs.length - 1 ? st.faqItem : {paddingBottom:8}}>
              <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>{faq.q}</h3>
              <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>{faq.a}</p>
            </div>
          ))}
        </div>

      </div>
      
      
      
      <Footer />
    </div>
  )
}
