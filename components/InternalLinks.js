'use client'
import { usePathname } from 'next/navigation'

const LINK_MAP = {
  mortgage: {
    label: 'Mortgage & Home',
    calcs: [
      { name: 'Mortgage Calculator', href: '/mortgage-calculator' },
      { name: 'Amortization', href: '/amortization-calculator' },
      { name: 'Refinance', href: '/refinance-calculator' },
      { name: 'Home Affordability', href: '/home-affordability-calculator' },
      { name: 'HELOC', href: '/heloc-calculator' },
      { name: 'Property Tax', href: '/property-tax-calculator' },
      { name: 'Down Payment', href: '/down-payment-calculator' },
      { name: 'Biweekly Mortgage', href: '/biweekly-mortgage-calculator' },
    ],
    blogs: [
      { name: 'How to Calculate Mortgage Payment', href: '/blog/how-to-calculate-mortgage-payment' },
      { name: 'How Much House Can I Afford?', href: '/blog/how-much-house-can-i-afford' },
      { name: 'How to Refinance Mortgage', href: '/blog/how-to-refinance-mortgage' },
      { name: 'Rent vs Buy Home', href: '/blog/rent-vs-buy-home' },
    ],
    comparisons: [
      { name: '15 vs 30 Year Mortgage', href: '/15-vs-30-year-mortgage' },
      { name: 'Fixed vs Adjustable Mortgage', href: '/fixed-vs-adjustable-mortgage' },
      { name: 'Rent vs Buy', href: '/rent-vs-buy-calculator' },
    ],
    states: [
      { name: 'California COL', href: '/cost-of-living-calculator/state/california' },
      { name: 'Texas COL', href: '/cost-of-living-calculator/state/texas' },
      { name: 'Florida COL', href: '/cost-of-living-calculator/state/florida' },
      { name: 'New York COL', href: '/cost-of-living-calculator/state/new-york' },
      { name: 'All 50 States', href: '/cost-of-living-calculator' },
    ],
    keywords: ['mortgage','home','house','heloc','refinanc','amortiz','property-tax','down-payment','home-buy','home-equity','solar','rent-vs-buy','extra-payment','biweekly'],
  },
  debt: {
    label: 'Debt & Credit',
    calcs: [
      { name: 'Credit Card Payoff', href: '/credit-card-payoff-calculator' },
      { name: 'Debt Payoff', href: '/debt-payoff-calculator' },
      { name: 'Debt Snowball', href: '/debt-snowball-calculator' },
      { name: 'Debt Avalanche', href: '/debt-avalanche-calculator' },
      { name: 'Balance Transfer', href: '/balance-transfer-calculator' },
      { name: 'Debt Consolidation', href: '/debt-consolidation-calculator' },
      { name: 'Debt-to-Income', href: '/debt-to-income-calculator' },
      { name: 'Credit Utilization', href: '/credit-utilization-calculator' },
    ],
    blogs: [
      { name: 'How to Get Out of Debt', href: '/blog/how-to-get-out-of-debt' },
      { name: 'How to Pay Off Debt Fast', href: '/blog/how-to-pay-off-debt-fast' },
      { name: 'What Is a Good Credit Score?', href: '/blog/what-is-a-good-credit-score' },
      { name: 'Debt Snowball vs Avalanche', href: '/blog/debt-snowball-vs-avalanche' },
    ],
    comparisons: [
      { name: 'Debt Snowball vs Avalanche', href: '/debt-snowball-vs-avalanche' },
      { name: 'Pay Off Debt vs Invest', href: '/payoff-vs-invest-calculator' },
    ],
    states: [],
    keywords: ['debt','credit','payoff','snowball','avalanche','consolidat','balance-transfer','credit-card','minimum-payment','total-debt','utilization'],
  },
  retirement: {
    label: 'Retirement & Investing',
    calcs: [
      { name: 'Retirement Calculator', href: '/retirement-calculator' },
      { name: '401k Calculator', href: '/401k-calculator' },
      { name: 'Roth IRA', href: '/roth-ira-calculator' },
      { name: 'FIRE Calculator', href: '/fire-calculator' },
      { name: 'Social Security', href: '/social-security-calculator' },
      { name: 'Investment Return', href: '/investment-return-calculator' },
      { name: 'Dividend', href: '/dividend-calculator' },
      { name: 'Pension', href: '/pension-calculator' },
    ],
    blogs: [
      { name: 'How Much to Save for Retirement', href: '/blog/how-much-to-save-for-retirement' },
      { name: 'Types of Retirement Accounts', href: '/blog/types-of-retirement-accounts' },
      { name: 'How to Max Out Roth IRA', href: '/blog/how-to-max-out-roth-ira' },
      { name: 'How to Invest for Beginners', href: '/blog/how-to-invest-for-beginners' },
      { name: 'What Is Compound Interest?', href: '/blog/what-is-compound-interest' },
      { name: 'What Is Passive Income?', href: '/blog/what-is-passive-income' },
    ],
    comparisons: [
      { name: '401k vs Roth IRA', href: '/401k-vs-roth-ira' },
      { name: 'CD vs High-Yield Savings', href: '/cd-vs-high-yield-savings' },
      { name: 'HSA vs FSA', href: '/hsa-vs-fsa' },
    ],
    states: [],
    keywords: ['retire','401k','roth','ira','fire','social-security','rmd','pension','annuit','investment','portfolio','dividend','stock','bond','cd-calc','dollar-cost','passive-income','savings-goal','savings-interest','savings-growth','college-savings','emergency-fund'],
  },
  tax: {
    label: 'Tax & Salary',
    calcs: [
      { name: 'Income Tax Calculator', href: '/tax-calculator' },
      { name: 'Salary After Tax', href: '/salary-after-tax-calculator' },
      { name: 'Paycheck Calculator', href: '/paycheck-calculator' },
      { name: 'Capital Gains Tax', href: '/capital-gains-tax-calculator' },
      { name: 'Self-Employment Tax', href: '/self-employment-tax-calculator' },
      { name: 'Hourly to Salary', href: '/hourly-to-salary-calculator' },
      { name: 'Freelance Rate', href: '/freelance-rate-calculator' },
    ],
    blogs: [
      { name: 'How to Lower Your Tax Bill', href: '/blog/how-to-lower-tax-bill' },
      { name: 'How to Read Your Pay Stub', href: '/blog/how-to-read-pay-stub' },
      { name: 'How to Negotiate Salary', href: '/blog/how-to-negotiate-salary' },
    ],
    comparisons: [],
    states: [
      { name: 'Texas (No Tax)', href: '/cost-of-living-calculator/state/texas' },
      { name: 'Florida (No Tax)', href: '/cost-of-living-calculator/state/florida' },
      { name: 'Tennessee (No Tax)', href: '/cost-of-living-calculator/state/tennessee' },
      { name: 'Washington (No Tax)', href: '/cost-of-living-calculator/state/washington' },
    ],
    keywords: ['tax','salary','paycheck','payroll','hourly','overtime','commission','freelance','contractor','net-pay','raise','self-employ','capital-gain','estate-tax','gift-tax','sales-tax','vat','child-tax','tax-refund'],
  },
  business: {
    label: 'Business',
    calcs: [
      { name: 'Profit Margin', href: '/profit-margin-calculator' },
      { name: 'Break-Even', href: '/break-even-calculator' },
      { name: 'ROI Calculator', href: '/roi-calculator' },
      { name: 'Cash Flow', href: '/cash-flow-calculator' },
      { name: 'Startup Cost', href: '/startup-cost-calculator' },
      { name: 'Business Valuation', href: '/business-valuation-calculator' },
    ],
    blogs: [
      { name: 'How to Build Wealth', href: '/blog/how-to-build-wealth' },
    ],
    comparisons: [],
    states: [],
    keywords: ['profit','break-even','roi','business','cash-flow','working-capital','employee-cost','startup','ecommerce','saas','invoice','markup','accounts-receiv','debt-service'],
  },
  auto: {
    label: 'Auto & Vehicles',
    calcs: [
      { name: 'Car Loan Calculator', href: '/car-loan-calculator' },
      { name: 'Car Affordability', href: '/car-affordability-calculator' },
      { name: 'Car Depreciation', href: '/car-depreciation-calculator' },
      { name: 'Fuel Cost', href: '/fuel-cost-calculator' },
    ],
    blogs: [
      { name: 'How Car Loans Work', href: '/blog/how-car-loans-work' },
    ],
    comparisons: [
      { name: 'Lease vs Buy Car', href: '/lease-vs-buy-calculator' },
    ],
    states: [],
    keywords: ['car-','auto','vehicle','fuel','boat','rv-loan','truck','lease-vs-buy'],
  },
  budget: {
    label: 'Budget & Life',
    calcs: [
      { name: 'Budget Planner', href: '/budget-planner-calculator' },
      { name: 'Net Worth', href: '/net-worth-calculator' },
      { name: 'Cost of Living', href: '/cost-of-living-calculator' },
      { name: 'Currency Converter', href: '/currency-converter' },
    ],
    blogs: [
      { name: 'How to Budget 50/30/20', href: '/blog/how-to-budget-50-30-20' },
      { name: 'How to Create Monthly Budget', href: '/blog/how-to-create-monthly-budget' },
      { name: 'How to Save Money Fast', href: '/blog/how-to-save-money-fast' },
      { name: 'How to Build Emergency Fund', href: '/blog/how-to-build-emergency-fund' },
      { name: 'What Is Net Worth?', href: '/blog/what-is-net-worth' },
      { name: 'How to Calculate Net Worth', href: '/blog/how-to-calculate-net-worth' },
      { name: 'What Is an Emergency Fund?', href: '/blog/what-is-an-emergency-fund' },
    ],
    comparisons: [],
    states: [
      { name: 'California COL', href: '/cost-of-living-calculator/state/california' },
      { name: 'Texas COL', href: '/cost-of-living-calculator/state/texas' },
      { name: 'New York COL', href: '/cost-of-living-calculator/state/new-york' },
      { name: 'Florida COL', href: '/cost-of-living-calculator/state/florida' },
      { name: 'All 50 States', href: '/cost-of-living-calculator' },
    ],
    keywords: ['budget','net-worth','cost-of-living','moving-cost','wedding','vacation','baby-cost','pet-cost','insurance','life-insurance','currency','discount','tip-calc','inflation'],
  },
  loans: {
    label: 'Loans',
    calcs: [
      { name: 'Personal Loan', href: '/personal-loan-calculator' },
      { name: 'Student Loan', href: '/student-loan-calculator' },
      { name: 'Loan Comparison', href: '/loan-comparison-calculator' },
      { name: 'Business Loan', href: '/business-loan-calculator' },
      { name: 'SBA Loan', href: '/sba-loan-calculator' },
      { name: 'APR Calculator', href: '/apr-calculator' },
    ],
    blogs: [
      { name: 'How Personal Loans Work', href: '/blog/how-personal-loans-work' },
      { name: 'How Student Loans Work', href: '/blog/how-student-loans-work' },
      { name: 'How to Calculate Loan Payment', href: '/blog/how-to-calculate-loan-payment' },
    ],
    comparisons: [],
    states: [],
    keywords: ['personal-loan','student-loan','loan-comp','loan-interest','loan-payment','business-loan','sba-loan','equipment-loan','apr-calc','simple-interest','interest-rate'],
  },
}

function getCategory(pathname) {
  const p = pathname.toLowerCase()
  for (const [key, cat] of Object.entries(LINK_MAP)) {
    for (const kw of cat.keywords) {
      if (p.includes(kw)) return key
    }
  }
  // Blog posts
  if (p.includes('/blog/')) {
    for (const [key, cat] of Object.entries(LINK_MAP)) {
      for (const kw of cat.keywords) {
        if (p.includes(kw)) return key
      }
    }
  }
  // COL pages
  if (p.includes('cost-of-living')) return 'budget'
  return null
}

const st = {
  wrap: { maxWidth: 900, margin: '0 auto', padding: '0 16px 32px' },
  box: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 24, marginBottom: 20 },
  h3: { fontSize: 15, fontWeight: 700, color: '#f0c842', margin: '0 0 12px' },
  grid: { display: 'flex', flexWrap: 'wrap', gap: 8 },
  link: { display: 'inline-block', padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, textDecoration: 'none', transition: 'all 0.15s' },
  calcLink: { background: 'rgba(240,200,66,0.06)', border: '1px solid rgba(240,200,66,0.15)', color: '#f0c842' },
  blogLink: { background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)', color: '#60a5fa' },
  compLink: { background: 'rgba(168,85,247,0.06)', border: '1px solid rgba(168,85,247,0.15)', color: '#c084fc' },
  stateLink: { background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)', color: '#34d399' },
}

export default function InternalLinks() {
  const pathname = usePathname()
  if (!pathname || pathname === '/') return null

  const catKey = getCategory(pathname)
  if (!catKey) return null
  const cat = LINK_MAP[catKey]
  if (!cat) return null

  const currentPath = pathname
  const calcs = cat.calcs.filter(c => c.href !== currentPath).slice(0, 8)
  const blogs = cat.blogs.filter(b => b.href !== currentPath).slice(0, 6)
  const comps = cat.comparisons.filter(c => c.href !== currentPath)
  const states = cat.states.filter(s => s.href !== currentPath)

  if (calcs.length === 0 && blogs.length === 0 && comps.length === 0 && states.length === 0) return null

  return (
    <div style={st.wrap}>
      {calcs.length > 0 && (
        <div style={st.box}>
          <h3 style={st.h3}>Related {cat.label} Calculators</h3>
          <div style={st.grid}>
            {calcs.map(c => <a key={c.href} href={c.href} style={{...st.link, ...st.calcLink}}>{c.name}</a>)}
          </div>
        </div>
      )}
      {blogs.length > 0 && (
        <div style={st.box}>
          <h3 style={{...st.h3, color: '#60a5fa'}}>Related Guides</h3>
          <div style={st.grid}>
            {blogs.map(b => <a key={b.href} href={b.href} style={{...st.link, ...st.blogLink}}>{b.name}</a>)}
          </div>
        </div>
      )}
      {comps.length > 0 && (
        <div style={st.box}>
          <h3 style={{...st.h3, color: '#c084fc'}}>Comparisons</h3>
          <div style={st.grid}>
            {comps.map(c => <a key={c.href} href={c.href} style={{...st.link, ...st.compLink}}>{c.name}</a>)}
          </div>
        </div>
      )}
      {states.length > 0 && (
        <div style={st.box}>
          <h3 style={{...st.h3, color: '#34d399'}}>Cost of Living by State</h3>
          <div style={st.grid}>
            {states.map(s => <a key={s.href} href={s.href} style={{...st.link, ...st.stateLink}}>{s.name}</a>)}
          </div>
        </div>
      )}
    </div>
  )
}
