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
  mortgageData: {
    label: 'Mortgage Data',
    calcs: [
      { name: 'Mortgage Rates History', href: '/mortgage-data/average-mortgage-rates-by-year' },
      { name: 'Down Payment Stats', href: '/mortgage-data/down-payment-statistics' },
      { name: 'Foreclosure Rates', href: '/mortgage-data/foreclosure-rates-by-state' },
      { name: 'Housing Market Stats', href: '/mortgage-data/housing-market-statistics' },
      { name: 'Closing Costs by State', href: '/mortgage-data/average-closing-costs-by-state' },
      { name: 'Home Price History', href: '/mortgage-data/average-home-price-by-year' },
    ],
    blogs: [
      { name: 'Best Mortgage Rates 2026', href: '/blog/best-mortgage-rates-2026' },
      { name: 'How to Refinance', href: '/blog/how-to-refinance-mortgage-2026' },
      { name: 'How Much House Can I Afford', href: '/blog/how-much-house-can-i-afford-2026' },
    ],
    color: '#f0c842',
  },
  insuranceData: {
    label: 'Insurance Data',
    calcs: [
      { name: 'Car Insurance by State', href: '/insurance-data/average-car-insurance-by-state' },
      { name: 'Health Insurance Cost', href: '/insurance-data/average-health-insurance-cost' },
      { name: 'Life Insurance by Age', href: '/insurance-data/average-life-insurance-cost-by-age' },
      { name: 'Renters Insurance', href: '/insurance-data/average-renters-insurance-by-state' },
      { name: 'Insurance by Age', href: '/insurance-data/insurance-cost-by-age' },
      { name: 'Uninsured Rates', href: '/insurance-data/uninsured-rates-by-state' },
    ],
    blogs: [],
    color: '#10b981',
  },
  creditCardData: {
    label: 'Credit Card Data',
    calcs: [
      { name: 'Credit Card Debt by State', href: '/credit-card-data/average-credit-card-debt-by-state' },
      { name: 'Credit Card APR', href: '/credit-card-data/average-credit-card-interest-rate' },
      { name: 'Debt Statistics', href: '/credit-card-data/credit-card-debt-statistics' },
      { name: 'Approval Rates', href: '/credit-card-data/credit-card-approval-rates' },
      { name: 'Balance Transfer Stats', href: '/credit-card-data/balance-transfer-statistics' },
      { name: 'Rewards Statistics', href: '/credit-card-data/credit-card-rewards-statistics' },
    ],
    blogs: [
      { name: 'Pay Off Credit Card Debt', href: '/blog/how-to-pay-off-credit-card-debt-fast' },
      { name: 'Build Credit Score Fast', href: '/blog/how-to-build-credit-score-fast' },
      { name: 'Debt Consolidation Guide', href: '/blog/debt-consolidation-guide-2026' },
    ],
    color: '#ef4444',
  },
  salaryData: {
    label: 'Salary Data',
    calcs: [
      { name: 'Teacher Salary by State', href: '/salary-data/teacher-salary-by-state' },
      { name: 'Nurse Salary by State', href: '/salary-data/nurse-salary-by-state' },
      { name: 'Software Engineer Salary', href: '/salary-data/software-engineer-salary-by-state' },
      { name: 'Police Officer Salary', href: '/salary-data/police-officer-salary-by-state' },
      { name: 'Electrician Salary', href: '/salary-data/electrician-salary-by-state' },
      { name: 'Pharmacist Salary', href: '/salary-data/pharmacist-salary-by-state' },
    ],
    blogs: [],
    color: '#3b82f6',
  },
  financialData: {
    label: 'Financial Benchmarks',
    calcs: [
      { name: 'Net Worth by Age', href: '/financial-data/average-net-worth-by-age' },
      { name: '401k Balance by Age', href: '/financial-data/average-401k-balance-by-age' },
      { name: 'Savings by Age', href: '/financial-data/average-savings-by-age' },
      { name: 'Debt by Age', href: '/financial-data/average-debt-by-age' },
      { name: 'Saved by 30', href: '/financial-data/how-much-should-you-have-saved-by-30' },
      { name: 'Retirement Savings', href: '/financial-data/average-retirement-savings-by-age' },
    ],
    blogs: [
      { name: 'Save for Retirement', href: '/blog/how-to-save-for-retirement-at-every-age' },
      { name: 'Start Investing', href: '/blog/how-to-invest-for-beginners-2026' },
      { name: 'Save on Taxes', href: '/blog/how-to-save-money-on-taxes-2026' },
    ],
    color: '#8b5cf6',
  },
  referenceData: {
    label: 'Reference Data',
    calcs: [
      { name: 'Tax Brackets 2026', href: '/federal-tax-brackets' },
      { name: 'Minimum Wage by State', href: '/minimum-wage-by-state' },
      { name: 'State Income Tax Rates', href: '/state-income-tax-rates' },
      { name: 'Property Tax by State', href: '/property-tax-rates-by-state' },
      { name: 'Inflation Rate History', href: '/inflation-rate-by-year' },
      { name: 'Social Security by Age', href: '/social-security-benefits-by-age' },
      { name: '401k/IRA Limits', href: '/401k-ira-contribution-limits' },
    ],
    blogs: [],
    color: '#06b6d4',
  },
}

function getCategory(path) {
  if (path.includes('/mortgage') || path.includes('/amortization') || path.includes('/refinance') || path.includes('/home-') || path.includes('/heloc') || path.includes('/property-tax') || path.includes('/down-payment') || path.includes('/rent-vs-buy') || path.includes('/closing-cost') || path.includes('/house-')) return 'mortgage'
  if (path.includes('/credit-card') || path.includes('/debt-') || path.includes('/balance-transfer')) return 'debt'
  if (path.includes('/retirement') || path.includes('/401k') || path.includes('/roth-ira') || path.includes('/fire') || path.includes('/investment') || path.includes('/dividend') || path.includes('/social-security-calc') || path.includes('/dollar-cost') || path.includes('/pension') || path.includes('/rmd')) return 'retirement'
  if (path.includes('/tax') || path.includes('/salary') || path.includes('/paycheck') || path.includes('/hourly') || path.includes('/freelance') || path.includes('/overtime') || path.includes('/capital-gains') || path.includes('/self-employment')) return 'tax'
  if (path.includes('/profit') || path.includes('/break-even') || path.includes('/roi') || path.includes('/startup') || path.includes('/cash-flow') || path.includes('/business') || path.includes('/saas') || path.includes('/burn-rate')) return 'business'
  if (path.includes('/car-') || path.includes('/auto-') || path.includes('/fuel') || path.includes('/boat') || path.includes('/rv-') || path.includes('/truck')) return 'auto'
  if (path.includes('/budget') || path.includes('/savings') || path.includes('/emergency') || path.includes('/net-worth') || path.includes('/cost-of-living') || path.includes('/inflation-calc') || path.includes('/tip-') || path.includes('/wedding') || path.includes('/vacation') || path.includes('/baby') || path.includes('/pet-cost') || path.includes('/moving')) return 'budget'
  if (path.includes('/loan') || path.includes('/personal-loan') || path.includes('/student-loan') || path.includes('/sba') || path.includes('/interest-rate') || path.includes('/simple-interest') || path.includes('/compound-interest') || path.includes('/apr-') || path.includes('/cd-calc')) return 'loans'
  if (path.includes('/mortgage-data')) return 'mortgageData'
  if (path.includes('/insurance-data')) return 'insuranceData'
  if (path.includes('/credit-card-data')) return 'creditCardData'
  if (path.includes('/salary-data')) return 'salaryData'
  if (path.includes('/financial-data')) return 'financialData'
  if (path.includes('/federal-tax') || path.includes('/minimum-wage') || path.includes('/state-income-tax') || path.includes('/property-tax-rates') || path.includes('/inflation-rate') || path.includes('/social-security-benefits') || path.includes('/401k-ira')) return 'referenceData'
  if (path.includes('/data/')) return 'financialData'
  return null
}

export default function InternalLinks() {
  const path = usePathname()
  const cat = getCategory(path)
  if (!cat || !LINK_MAP[cat]) return null

  const data = LINK_MAP[cat]
  const calcs = data.calcs || []
  const blogs = data.blogs || []
  const color = data.color || '#f0c842'

  if (calcs.length === 0 && blogs.length === 0) return null

  return (
    <div style={{maxWidth:1200,margin:'0 auto',padding:'24px 16px'}}>
      <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:'20px 24px'}}>
        <h3 style={{fontSize:14,fontWeight:700,color:color,marginBottom:12}}>{'More ' + data.label}</h3>
        <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
          {calcs.map(l => (
            <a key={l.href} href={l.href} style={{padding:'5px 12px',borderRadius:6,fontSize:12,fontWeight:600,textDecoration:'none',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:color}}>
              {l.name}
            </a>
          ))}
          {blogs.map(l => (
            <a key={l.href} href={l.href} style={{padding:'5px 12px',borderRadius:6,fontSize:12,fontWeight:600,textDecoration:'none',background:'rgba(59,130,246,0.06)',border:'1px solid rgba(59,130,246,0.12)',color:'#60a5fa'}}>
              {l.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
