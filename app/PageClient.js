'use client'
import { useState, useMemo } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FaqSchema from '../components/FaqSchema'

// ── All 470+ calculators organized into categories ─────────────────────────────
const CATEGORIES = [
  {
    id: 'mortgage',
    icon: '🏠',
    label: 'Mortgage & Home',
    color: '#3b82f6',
    tools: [
      { name: 'Mortgage Calculator',            href: '/mortgage-calculator',            desc: 'Monthly payments and amortization' },
      { name: 'Amortization Calculator',        href: '/amortization-calculator',        desc: 'Full payment schedule breakdown' },
      { name: 'Refinance Calculator',           href: '/refinance-calculator',           desc: 'Is refinancing worth it?' },
      { name: 'Home Affordability Calculator',  href: '/home-affordability-calculator',  desc: 'How much house can you afford?' },
      { name: 'HELOC Calculator',               href: '/heloc-calculator',               desc: 'Home equity line of credit' },
      { name: 'Property Tax Calculator',        href: '/property-tax-calculator',        desc: 'Estimate annual property taxes' },
      { name: 'Rent vs Buy Calculator',         href: '/rent-vs-buy-calculator',         desc: 'Compare renting and buying' },
      { name: 'Down Payment Calculator',        href: '/down-payment-calculator',        desc: 'How long to save for a home' },
      { name: 'Mortgage Points Calculator',     href: '/mortgage-points-calculator',     desc: 'Are discount points worth buying?' },
      { name: 'Biweekly Mortgage Calculator',   href: '/biweekly-mortgage-calculator',   desc: 'Pay off mortgage years early' },
      { name: 'Extra Payment Calculator',       href: '/extra-payment-calculator',       desc: 'Interest saved with extra payments' },
      { name: 'Home Equity Calculator',         href: '/home-equity-calculator',         desc: 'Calculate your available equity' },
      { name: 'Home Buying Cost Calculator',    href: '/home-buying-cost-calculator',    desc: 'All costs of buying a home' },
      { name: 'Home Improvement Loan',          href: '/home-improvement-loan-calculator',desc: 'Finance your renovation' },
      { name: 'Solar Payback Calculator',       href: '/solar-payback-calculator',       desc: 'Solar panel ROI and savings' },
    ],
  },
  {
    id: 'debt',
    icon: '💳',
    label: 'Debt & Credit',
    color: '#ef4444',
    tools: [
      { name: 'Credit Card Payoff Calculator', href: '/credit-card-payoff-calculator',           desc: 'Pay off cards faster' },
      { name: 'Minimum Payment Calculator',    href: '/credit-card-minimum-payment-calculator',   desc: 'True cost of minimums' },
      { name: 'Credit Utilization Calculator', href: '/credit-utilization-calculator',            desc: 'Score impact of balances' },
      { name: 'Debt Payoff Calculator',        href: '/debt-payoff-calculator',                   desc: 'Custom payoff plan' },
      { name: 'Debt Payoff Time Calculator',   href: '/debt-payoff-time-calculator',              desc: 'When will you be debt-free?' },
      { name: 'Debt Avalanche Calculator',     href: '/debt-avalanche-calculator',                desc: 'Highest interest first' },
      { name: 'Debt Snowball Calculator',      href: '/debt-snowball-calculator',                 desc: 'Smallest balance first' },
      { name: 'Debt Consolidation Calculator', href: '/debt-consolidation-calculator',            desc: 'Merge debts into one loan' },
      { name: 'Balance Transfer Calculator',   href: '/balance-transfer-calculator',              desc: '0% transfer savings' },
      { name: 'Total Debt Calculator',         href: '/total-debt-calculator',                    desc: 'Add up all your debts' },
      { name: 'Debt-to-Income Calculator',     href: '/debt-to-income-calculator',                desc: 'DTI ratio for mortgage' },
      { name: 'Pay Off Debt vs Invest',        href: '/payoff-vs-invest-calculator',              desc: 'Which is smarter?' },
    ],
  },
  {
    id: 'loans',
    icon: '🏦',
    label: 'Loans',
    color: '#8b5cf6',
    tools: [
      { name: 'Personal Loan Calculator',    href: '/personal-loan-calculator',    desc: 'Monthly payments and total cost' },
      { name: 'Student Loan Calculator',     href: '/student-loan-calculator',     desc: 'Repayment plans compared' },
      { name: 'Loan Comparison Calculator',  href: '/loan-comparison-calculator',  desc: 'Compare two loan offers' },
      { name: 'Loan Interest Calculator',    href: '/loan-interest-calculator',    desc: 'Total interest on any loan' },
      { name: 'Loan Payment Calculator',     href: '/loan-payment-calculator',     desc: 'Payment for any loan' },
      { name: 'Business Loan Calculator',    href: '/business-loan-calculator',    desc: 'Small business financing' },
      { name: 'SBA Loan Calculator',         href: '/sba-loan-calculator',         desc: 'SBA 7(a) and 504 loans' },
      { name: 'Equipment Loan Calculator',   href: '/equipment-loan-calculator',   desc: 'Finance business equipment' },
      { name: 'APR Calculator',              href: '/apr-calculator',              desc: 'True annual percentage rate' },
      { name: 'Simple Interest Calculator',  href: '/simple-interest-calculator',  desc: 'Basic interest calculation' },
      { name: 'Interest Rate Calculator',    href: '/interest-rate-calculator',    desc: 'Reverse-calculate your rate' },
    ],
  },
  {
    id: 'auto',
    icon: '🚗',
    label: 'Auto & Vehicles',
    color: '#f59e0b',
    tools: [
      { name: 'Car Loan Calculator',          href: '/car-loan-calculator',          desc: 'Auto loan payments' },
      { name: 'Car Affordability Calculator', href: '/car-affordability-calculator', desc: '20/4/10 rule for cars' },
      { name: 'Car Depreciation Calculator',  href: '/car-depreciation-calculator',  desc: 'Future vehicle value' },
      { name: 'Lease vs Buy Calculator',      href: '/lease-vs-buy-calculator',      desc: 'Which is better for you?' },
      { name: 'Fuel Cost Calculator',         href: '/fuel-cost-calculator',         desc: 'Annual driving costs' },
      { name: 'Boat Loan Calculator',         href: '/boat-loan-calculator',         desc: 'Marine financing' },
      { name: 'RV Loan Calculator',           href: '/rv-loan-calculator',           desc: 'Motorhome financing' },
      { name: 'Truck Loan Calculator',        href: '/truck-loan-calculator',        desc: 'Pickup and commercial trucks' },
    ],
  },
  {
    id: 'retirement',
    icon: '🌅',
    label: 'Retirement',
    color: '#06b6d4',
    tools: [
      { name: 'Retirement Calculator',         href: '/retirement-calculator',         desc: 'Are you on track?' },
      { name: '401k Calculator',               href: '/401k-calculator',               desc: 'Employer match growth' },
      { name: 'Roth IRA Calculator',           href: '/roth-ira-calculator',           desc: 'Tax-free growth projection' },
      { name: 'Social Security Calculator',    href: '/social-security-calculator',    desc: 'Benefit at any age' },
      { name: 'RMD Calculator',                href: '/rmd-calculator',                desc: 'Required minimum distributions' },
      { name: 'Pension Calculator',            href: '/pension-calculator',            desc: 'Defined benefit payout' },
      { name: 'Annuity Calculator',            href: '/annuity-calculator',            desc: 'Fixed annuity payments' },
      { name: 'FIRE Calculator',               href: '/fire-calculator',               desc: 'Financial independence number' },
      { name: 'FIRE Retirement Calculator',    href: '/fire-retirement-calculator',    desc: 'Exact early retirement age' },
      { name: 'Retirement Savings Calculator', href: '/retirement-savings-calculator', desc: 'Savings gap analysis' },
    ],
  },
  {
    id: 'investing',
    icon: '📈',
    label: 'Investing',
    color: '#10b981',
    tools: [
      { name: 'Investment Return Calculator',     href: '/investment-return-calculator',     desc: 'Portfolio growth projections' },
      { name: 'Portfolio Growth Calculator',      href: '/portfolio-growth-calculator',      desc: 'With contributions over time' },
      { name: 'Portfolio Rebalancing Calculator', href: '/portfolio-rebalancing-calculator', desc: 'Buy and sell amounts needed' },
      { name: 'Dollar Cost Averaging Calculator', href: '/dollar-cost-averaging-calculator', desc: 'DCA vs lump sum' },
      { name: 'Passive Income Calculator',        href: '/passive-income-calculator',        desc: 'Portfolio needed for income' },
      { name: 'Dividend Calculator',              href: '/dividend-calculator',              desc: 'Dividend income planning' },
      { name: 'Stock Profit Calculator',          href: '/stock-profit-calculator',          desc: 'Trade profit and loss' },
      { name: 'Bond Yield Calculator',            href: '/bond-yield-calculator',            desc: 'Yield to maturity' },
      { name: 'Net Investment Fee Calculator',    href: '/net-investment-fee-calculator',    desc: 'True cost of fund fees' },
    ],
  },
  {
    id: 'savings',
    icon: '💰',
    label: 'Savings',
    color: '#f0c842',
    tools: [
      { name: 'Savings Interest Calculator', href: '/savings-interest-calculator', desc: 'Account growth over time' },
      { name: 'Savings Goal Calculator',     href: '/savings-goal-calculator',     desc: 'Monthly amount to reach goal' },
      { name: 'Savings Growth Calculator',   href: '/savings-growth-calculator',   desc: 'Compound growth projection' },
      { name: 'CD Calculator',               href: '/cd-calculator',               desc: 'Certificate of deposit returns' },
      { name: 'Emergency Fund Calculator',   href: '/emergency-fund-calculator',   desc: 'How much buffer you need' },
      { name: 'College Savings Calculator',  href: '/college-savings-calculator',  desc: '529 plan contributions needed' },
    ],
  },
  {
    id: 'tax',
    icon: '🧾',
    label: 'Tax',
    color: '#ec4899',
    tools: [
      { name: 'Income Tax Calculator',           href: '/tax-calculator',                   desc: '2026 federal brackets' },
      { name: 'Capital Gains Tax Calculator',    href: '/capital-gains-tax-calculator',     desc: 'Short and long-term rates' },
      { name: 'Self-Employment Tax Calculator',  href: '/self-employment-tax-calculator',   desc: 'Freelancer SE tax' },
      { name: 'Payroll Tax Calculator',          href: '/payroll-tax-calculator',           desc: 'Employer and employee taxes' },
      { name: 'Tax Refund Calculator',           href: '/tax-refund-calculator',            desc: 'Estimate your refund' },
      { name: 'Child Tax Credit Calculator',     href: '/child-tax-credit-calculator',      desc: 'Credit per child 2026' },
      { name: 'Estate Tax Calculator',           href: '/estate-tax-calculator',            desc: 'Inheritance tax planning' },
      { name: 'Gift Tax Calculator',             href: '/gift-tax-calculator',              desc: 'Annual exclusion limits' },
      { name: 'Sales Tax Calculator',            href: '/sales-tax-calculator',             desc: 'Any state or rate' },
      { name: 'VAT Calculator',                  href: '/vat-calculator',                   desc: 'UK, EU and global VAT' },
    ],
  },
  {
    id: 'salary',
    icon: '💵',
    label: 'Income & Salary',
    color: '#84cc16',
    tools: [
      { name: 'Salary After Tax Calculator',  href: '/salary-after-tax-calculator',  desc: 'Exact take-home pay' },
      { name: 'Paycheck Calculator',          href: '/paycheck-calculator',          desc: 'Per-paycheck breakdown' },
      { name: 'Hourly to Salary Calculator',  href: '/hourly-to-salary-calculator',  desc: 'Annual income from hourly rate' },
      { name: 'Salary to Hourly Calculator',  href: '/salary-to-hourly-calculator',  desc: 'Hourly rate from salary' },
      { name: 'Overtime Calculator',          href: '/overtime-calculator',          desc: 'Time and a half pay' },
      { name: 'Overtime Pay Calculator',      href: '/overtime-pay-calculator',      desc: 'Total earnings with overtime' },
      { name: 'Raise Calculator',             href: '/raise-calculator',             desc: 'Dollar value of a raise' },
      { name: 'Net Pay Calculator',           href: '/net-pay-calculator',           desc: 'Take-home after deductions' },
      { name: 'Commission Calculator',        href: '/commission-calculator',        desc: 'Sales commission earnings' },
      { name: 'Freelance Rate Calculator',    href: '/freelance-rate-calculator',    desc: 'Minimum hourly rate to charge' },
      { name: 'Contractor Pay Calculator',    href: '/contractor-pay-calculator',    desc: 'Take-home after SE tax' },
    ],
  },
  {
    id: 'business',
    icon: '🏢',
    label: 'Business',
    color: '#6366f1',
    tools: [
      { name: 'Profit Margin Calculator',         href: '/profit-margin-calculator',         desc: 'Gross and net margins' },
      { name: 'Break-Even Calculator',            href: '/break-even-calculator',            desc: 'Units and revenue to break even' },
      { name: 'ROI Calculator',                   href: '/roi-calculator',                   desc: 'Return on any investment' },
      { name: 'Business Valuation Calculator',    href: '/business-valuation-calculator',    desc: 'What is your business worth?' },
      { name: 'Cash Flow Calculator',             href: '/cash-flow-calculator',             desc: 'Operating and free cash flow' },
      { name: 'Working Capital Calculator',       href: '/working-capital-calculator',       desc: 'Liquidity and current ratio' },
      { name: 'Accounts Receivable Calculator',   href: '/accounts-receivable-calculator',   desc: 'DSO and AR turnover' },
      { name: 'DSCR Calculator',                  href: '/debt-service-coverage-calculator', desc: 'Loan coverage ratio' },
      { name: 'Employee Cost Calculator',         href: '/employee-cost-calculator',         desc: 'True cost of hiring' },
      { name: 'Startup Cost Calculator',          href: '/startup-cost-calculator',          desc: 'New business budget' },
      { name: 'Ecommerce Profit Calculator',      href: '/ecommerce-profit-calculator',      desc: 'Online store margins' },
      { name: 'SaaS Metrics Calculator',          href: '/saas-metrics-calculator',          desc: 'MRR, ARR, LTV, CAC' },
      { name: 'Markup Calculator',                href: '/markup-calculator',                desc: 'Price from cost and margin' },
      { name: 'Invoice Calculator',               href: '/invoice-calculator',               desc: 'Invoice totals with tax' },
    ],
  },
  {
    id: 'realestate',
    icon: '🏘️',
    label: 'Real Estate',
    color: '#14b8a6',
    tools: [
      { name: 'Rental Property Calculator', href: '/rental-property-calculator', desc: 'Cash flow and cap rate' },
      { name: 'Cap Rate Calculator',        href: '/cap-rate-calculator',        desc: 'Investment property value' },
      { name: 'House Flipping Calculator',  href: '/house-flipping-calculator',  desc: '70% rule and profit' },
      { name: 'Rent Affordability Calculator',href: '/rent-affordability-calculator',desc: 'Max rent on your salary' },
    ],
  },
  {
    id: 'budget',
    icon: '📋',
    label: 'Budget & Life',
    color: '#f97316',
    tools: [
      { name: 'Budget Planner Calculator', href: '/budget-planner-calculator', desc: '50/30/20 rule budgeting' },
      { name: 'Net Worth Calculator',      href: '/net-worth-calculator',      desc: 'Assets minus liabilities' },
      { name: 'Cost of Living Calculator', href: '/cost-of-living-calculator', desc: 'Compare cities' },
      { name: 'Moving Cost Calculator',    href: '/moving-cost-calculator',    desc: 'Total relocation budget' },
      { name: 'Wedding Budget Calculator', href: '/wedding-budget-calculator', desc: 'Plan your wedding costs' },
      { name: 'Vacation Budget Calculator',href: '/vacation-budget-calculator',desc: 'Total trip cost' },
      { name: 'Baby Cost Calculator',      href: '/baby-cost-calculator',      desc: 'First year expenses' },
      { name: 'Pet Cost Calculator',       href: '/pet-cost-calculator',       desc: 'Annual pet ownership cost' },
      { name: 'Insurance Calculator',      href: '/insurance-calculator',      desc: 'Coverage you need' },
      { name: 'Life Insurance Calculator', href: '/life-insurance-calculator', desc: 'DIME method coverage' },
    ],
  },
  {
    id: 'math',
    icon: '🔢',
    label: 'Math & Conversions',
    color: '#a78bfa',
    tools: [
      { name: 'Currency Converter',         href: '/currency-converter',         desc: '40+ currencies live' },
      { name: 'Inflation Calculator',        href: '/inflation-impact-calculator', desc: 'Purchasing power over time' },
      { name: 'Discount Calculator',         href: '/discount-calculator',         desc: 'Sale price and savings' },
      { name: 'Tip Calculator',              href: '/tip-calculator',              desc: 'Split bills and tips' },
    ],
  },
]

const ALL_TOOLS = CATEGORIES.flatMap(cat =>
  cat.tools.map(t => ({ ...t, category: cat.label, catIcon: cat.icon }))
)



export default function HomePage() {
  const [search, setSearch]     = useState('')
  const [activeTab, setActiveTab] = useState('all')

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    if (!q) return activeTab === 'all' ? ALL_TOOLS : CATEGORIES.find(c => c.id === activeTab)?.tools || []
    return ALL_TOOLS.filter(t =>
      t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q)
    )
  }, [search, activeTab])

  const displayCats = search
    ? null
    : activeTab === 'all'
      ? CATEGORIES
      : CATEGORIES.filter(c => c.id === activeTab)

  return (
    <>
      <FaqSchema faqs={[{"q":"How does the Calculator work?","a":"Our Calculator uses industry-standard formulas to give you instant, accurate results. Enter your values using the sliders above and the calculator updates in real time. All calculations happen in your browser — nothing is stored or sent to a server."},{"q":"Is this Calculator accurate?","a":"Yes. This calculator uses the same mathematical formulas used by financial professionals. Results are estimates for planning purposes. For binding financial decisions, consult with a qualified financial advisor or accountant."},{"q":"Is the Calculator really free?","a":"100% free, no sign-up required, no hidden fees. We are supported by advertising revenue, which allows us to provide all our calculators completely free. You can also download results as a PDF for your records."},{"q":"Can I use this calculator for  in my country?","a":"Yes. Use the currency selector at the top of the page to switch between 40+ currencies. The calculator adapts its default values to match your region. The underlying math works the same regardless of currency."},{"q":"How often is this Calculator updated?","a":"We update our calculators regularly to reflect current rates, tax brackets, and financial regulations. The formulas and default values are reviewed quarterly. For the most current rates, always verify with your specific lender or institution."}]} />

      <Header />
      <main>

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section className="relative py-8 px-4 text-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"
            style={{background:'radial-gradient(ellipse 80% 60% at 50% 0%,rgba(240,200,66,0.08) 0%,transparent 70%)'}} />
          <div className="relative max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-3"
              style={{background:'rgba(240,200,66,0.1)',border:'1px solid rgba(240,200,66,0.25)',color:'#f0c842'}}>
              ✦ 470+ Free Financial Calculators — No Sign-Up Required
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Free Financial<br />
              <span style={{color:'#f0c842'}}>Calculators</span>
            </h1>
            <p className="text-slate-400 text-base max-w-2xl mx-auto mb-5">
              Mortgage, tax, retirement, investing, debt — every calculator you need.
              Instant results, 40+ currencies, completely free.
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto mb-4">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg">🔍</span>
              <input
                type="text"
                placeholder="Search 470+ calculators..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-6 py-3 rounded-2xl text-white text-sm outline-none"
                style={{
                  background:'rgba(255,255,255,0.06)',
                  border:'1px solid rgba(255,255,255,0.12)',
                  fontSize:'16px'
                }}
              />
              {search && (
                <button onClick={() => setSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">✕</button>
              )}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
              {[["470+",'Calculators'],['41','Blog Guides'],['40+','Currencies'],['0','Sign-ups needed']].map(([n,l]) => (
                <div key={l} className="flex items-center gap-2">
                  <span className="font-bold text-white text-base">{n}</span>
                  <span>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Search Results ────────────────────────────────────────────────── */}
        {search && (
          <section className="max-w-6xl mx-auto px-4 pb-10">
            <p className="text-slate-400 text-sm mb-4">{filtered.length} results for "{search}"</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filtered.map(t => (
                <a key={t.href} href={t.href}
                  className="group p-4 rounded-2xl hover:-translate-y-1 transition-all duration-200"
                  style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)'}}>
                  <div className="text-xs text-slate-500 mb-1">{t.catIcon} {t.category}</div>
                  <div className="text-white font-semibold text-sm group-hover:text-yellow-400 transition-colors mb-1">{t.name}</div>
                  <div className="text-slate-500 text-xs">{t.desc}</div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* ── Category Tabs ─────────────────────────────────────────────────── */}
        {!search && (
          <>
            <section className="max-w-7xl mx-auto px-4 mb-10">
              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  onClick={() => setActiveTab('all')}
                  className="px-4 py-2 rounded-xl text-sm font-bold transition-all"
                  style={{
                    background: activeTab === 'all' ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                    border: activeTab === 'all' ? '1px solid rgba(240,200,66,0.4)' : '1px solid rgba(255,255,255,0.08)',
                    color: activeTab === 'all' ? '#f0c842' : '#64748b',
                  }}>
                  All (470+)
                </button>
                {CATEGORIES.map(cat => (
                  <button key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className="px-4 py-2 rounded-xl text-sm font-bold transition-all"
                    style={{
                      background: activeTab === cat.id ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                      border: activeTab === cat.id ? '1px solid rgba(240,200,66,0.4)' : '1px solid rgba(255,255,255,0.08)',
                      color: activeTab === cat.id ? '#f0c842' : '#64748b',
                    }}>
                    {cat.icon} {cat.label}
                  </button>
                ))}
              </div>
            </section>

            {/* ── Calculator Grid ─────────────────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 pb-16 space-y-14">
              {displayCats.map(cat => (
                <div key={cat.id} id={cat.id}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-3xl">{cat.icon}</div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{cat.label}</h2>
                      <p className="text-slate-500 text-sm">{cat.tools.length} calculators</p>
                    </div>
                    <div className="ml-auto h-px flex-1 max-w-xs"
                      style={{background:'linear-gradient(to right, rgba(255,255,255,0.08), transparent)'}} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                    {cat.tools.map(tool => (
                      <a key={tool.href} href={tool.href}
                        className="group p-4 rounded-2xl hover:-translate-y-1 transition-all duration-200 flex flex-col"
                        style={{
                          background:'rgba(255,255,255,0.04)',
                          border:'1px solid rgba(255,255,255,0.08)',
                        }}>
                        <div className="text-white font-semibold text-sm group-hover:text-yellow-400 transition-colors mb-2 leading-snug">
                          {tool.name}
                        </div>
                        <div className="text-slate-500 text-xs leading-relaxed mt-auto">
                          {tool.desc}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          </>
        )}

        {/* ── Popular Calculators ───────────────────────────────────────────── */}
        {!search && activeTab === 'all' && (
          <section className="max-w-7xl mx-auto px-4 pb-16">
            <h2 className="text-2xl font-bold text-white mb-2">Most Popular Calculators</h2>
            <p className="text-slate-500 text-sm mb-6">Our most-used tools by visitors</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {[
                { name: 'Mortgage',         href: '/mortgage-calculator',          icon: '🏠' },
                { name: 'Car Loan',          href: '/car-loan-calculator',          icon: '🚗' },
                { name: 'Tax Calculator',    href: '/tax-calculator',               icon: '🧾' },
                { name: 'Retirement',        href: '/retirement-calculator',        icon: '🌅' },
                { name: 'Budget Planner',    href: '/budget-planner-calculator',    icon: '📋' },
                { name: 'FIRE Calculator',   href: '/fire-calculator',              icon: '🔥' },
                { name: 'Salary After Tax',  href: '/salary-after-tax-calculator',  icon: '💵' },
                { name: 'Credit Card Payoff',href: '/credit-card-payoff-calculator',icon: '💳' },
                { name: '401k Calculator',   href: '/401k-calculator',              icon: '💼' },
                { name: 'Net Worth',         href: '/net-worth-calculator',         icon: '💰' },
                { name: 'Student Loan',      href: '/student-loan-calculator',      icon: '🎓' },
                { name: 'Debt Payoff',       href: '/debt-payoff-calculator',       icon: '🎯' },
              ].map(t => (
                <a key={t.href} href={t.href}
                  className="group p-4 rounded-2xl text-center hover:-translate-y-1 transition-all duration-200"
                  style={{background:'rgba(240,200,66,0.05)',border:'1px solid rgba(240,200,66,0.12)'}}>
                  <div className="text-2xl mb-2">{t.icon}</div>
                  <div className="text-white text-xs font-semibold group-hover:text-yellow-400 transition-colors">{t.name}</div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* ── Blog CTA ──────────────────────────────────────────────────────── */}
        {!search && activeTab === 'all' && (
          <section className="max-w-7xl mx-auto px-4 pb-16">
            <div className="rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6"
              style={{background:'rgba(240,200,66,0.06)',border:'1px solid rgba(240,200,66,0.15)'}}>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">📖 Financial Guides & Tutorials</h2>
                <p className="text-slate-400">41 in-depth articles on mortgages, investing, budgeting and more.</p>
              </div>
              <a href="/blog"
                className="shrink-0 px-8 py-4 rounded-2xl font-bold text-slate-900 text-sm transition-all hover:scale-105"
                style={{background:'#f0c842'}}>
                Browse All Guides →
              </a>
            </div>
          </section>
        )}

        {/* ── Trust section ─────────────────────────────────────────────────── */}
        {!search && activeTab === 'all' && (
          <section className="max-w-4xl mx-auto px-4 pb-20 text-center">
            <h2 className="text-xl font-bold text-white mb-2">Why FreeFinCalc?</h2>
            <p className="text-slate-500 text-sm mb-8">Built for people who want real answers, not paywalls</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: '⚡', title: 'Instant Results', desc: 'All calculations happen in your browser. No waiting, no loading.' },
                { icon: '🔒', title: '100% Private', desc: 'We never store your data. Nothing you enter is sent to a server.' },
                { icon: '🌍', title: '40+ Currencies', desc: 'Switch currency globally across all calculators in one click.' },
              ].map(f => (
                <div key={f.title} className="p-6 rounded-2xl"
                  style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)'}}>
                  <div className="text-3xl mb-3">{f.icon}</div>
                  <h3 className="text-white font-bold mb-2">{f.title}</h3>
                  <p className="text-slate-500 text-sm">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>
      
        {/* FAQ Section */}
        {/* How to Use Guide */}
        <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:16,padding:28,marginTop:32,marginBottom:32,maxWidth:900,marginLeft:'auto',marginRight:'auto'}}>
          <h2 style={{fontSize:20,fontWeight:700,color:'#f0c842',marginBottom:16,marginTop:0}}>How to Use the Calculator</h2>
          <p style={{fontSize:15,color:'#94a3b8',lineHeight:1.8,margin:'0 0 20px'}}>Start by entering your values using the sliders above. Each input updates the results instantly in real time. Adjust different scenarios to compare outcomes — for example, see how a higher contribution or a different rate changes your results. All calculations happen in your browser so your data stays completely private. You can download the results as a PDF for your records or to share with a financial advisor.</p>
          <h2 style={{fontSize:20,fontWeight:700,color:'#f0c842',marginBottom:16,marginTop:0}}>Why This Calculator Matters</h2>
          <p style={{fontSize:15,color:'#94a3b8',lineHeight:1.8,margin:0}}>Making informed calculator decisions can save you thousands of dollars over time. Many people rely on rough estimates or rules of thumb that do not account for their specific situation. This calculator uses precise mathematical formulas to give you personalized results based on your actual numbers. Whether you are planning ahead, comparing options, or checking a professional recommendation, having accurate calculations helps you make confident financial decisions. Use this tool alongside our related calculators for a complete picture of your finances.</p>
        </div>

        <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:24,marginTop:32,marginBottom:32,maxWidth:900,marginLeft:'auto',marginRight:'auto'}}>
          <h2 style={{fontSize:20,fontWeight:700,color:'#f1f5f9',marginBottom:16,marginTop:0}}>Frequently Asked Questions</h2>
          <div style={{borderBottom:'1px solid rgba(255,255,255,0.06)',paddingBottom:16,marginBottom:16}}>
            <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>How does the Calculator work?</h3>
            <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>Our Calculator uses industry-standard formulas to give you instant, accurate results. Enter your values using the sliders above and the calculator updates in real time. All calculations happen in your browser — nothing is stored or sent to a server.</p>
          </div>
          <div style={{borderBottom:'1px solid rgba(255,255,255,0.06)',paddingBottom:16,marginBottom:16}}>
            <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>Is this Calculator accurate?</h3>
            <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>Yes. This calculator uses the same mathematical formulas used by financial professionals. Results are estimates for planning purposes. For binding financial decisions, consult with a qualified financial advisor or accountant.</p>
          </div>
          <div style={{borderBottom:'1px solid rgba(255,255,255,0.06)',paddingBottom:16,marginBottom:16}}>
            <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>Is the Calculator really free?</h3>
            <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>100% free, no sign-up required, no hidden fees. We are supported by advertising revenue, which allows us to provide all our calculators completely free. You can also download results as a PDF for your records.</p>
          </div>
          <div style={{borderBottom:'1px solid rgba(255,255,255,0.06)',paddingBottom:16,marginBottom:16}}>
            <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>Can I use this calculator for  in my country?</h3>
            <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>Yes. Use the currency selector at the top of the page to switch between 40+ currencies. The calculator adapts its default values to match your region. The underlying math works the same regardless of currency.</p>
          </div>
          <div style={{paddingBottom:8}}>
            <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>How often is this Calculator updated?</h3>
            <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>We update our calculators regularly to reflect current rates, tax brackets, and financial regulations. The formulas and default values are reviewed quarterly. For the most current rates, always verify with your specific lender or institution.</p>
          </div>
        </div>
      <Footer />
    </>
  )
}
