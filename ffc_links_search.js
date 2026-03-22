const fs = require('fs');
const path = require('path');

const BASE = __dirname;

function writeFile(fp, content) {
  const dir = path.dirname(fp);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(fp, content, 'utf8');
}

console.log('');
console.log('=====================================================');
console.log('  FFC: Internal Link Web + Homepage Search');
console.log('=====================================================');
console.log('');

// ================================================================
// 1. INTERNAL LINKS COMPONENT
// ================================================================

const internalLinksJS = `'use client'
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
`;

writeFile(path.join(BASE, 'components', 'InternalLinks.js'), internalLinksJS);
console.log('  Done: components/InternalLinks.js');

// ================================================================
// 2. INJECT InternalLinks INTO Footer.js (above footer)
// ================================================================

let footerContent = fs.readFileSync(path.join(BASE, 'components', 'Footer.js'), 'utf8');

if (!footerContent.includes('InternalLinks')) {
  // Add import
  if (footerContent.includes("'use client'")) {
    footerContent = footerContent.replace("'use client'", "'use client'\nimport InternalLinks from './InternalLinks'");
  } else {
    footerContent = "'use client'\nimport InternalLinks from './InternalLinks'\n" + footerContent;
  }

  // Add component before the footer element
  // Find the return statement's first JSX
  footerContent = footerContent.replace(
    /return\s*\(\s*\n?\s*</,
    'return (\n    <>\n      <InternalLinks />\n      <'
  );

  // Close the fragment at the end
  // Find last closing tag pattern
  const lastReturn = footerContent.lastIndexOf(')')
  // Find the closing of the component
  footerContent = footerContent.replace(/\n\s*\)\s*\n\}/, '\n    </>\n  )\n}');

  fs.writeFileSync(path.join(BASE, 'components', 'Footer.js'), footerContent, 'utf8');
  console.log('  Done: Footer.js (injected InternalLinks)');
} else {
  console.log('  Skip: Footer.js already has InternalLinks');
}


// ================================================================
// 3. HOMEPAGE SEARCH - Update PageClient.js
// ================================================================

let pageClient = fs.readFileSync(path.join(BASE, 'app', 'PageClient.js'), 'utf8');

// Check if search already works - look for the search input and add filtering
// The current homepage has a search bar but it just stores state without doing anything visible

// We need to add: ALL_TOOLS data, search filtering, and search results display

// Find the search input and the section after hero
const searchFix = `
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
`;

// Insert ALL_CALCS before POPULAR
pageClient = pageClient.replace(
  "const POPULAR = [",
  searchFix + "\nconst POPULAR = ["
);

// Add search results section - find the hero closing and add results after it
// Add search results display after the stats bar section
const searchResults = `
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
`;

// Insert search results after the hero section closing div
// Find the closing of the stats bar section and add search results
pageClient = pageClient.replace(
  "</section>\n\n      <div style={st.wrap}>",
  "</section>\n" + searchResults + "\n      <div style={st.wrap}>"
);

// Wrap the rest of homepage content in {!search && ...} so it hides during search
pageClient = pageClient.replace(
  "\n      <div style={st.wrap}>\n\n        {/* Popular Calculators */}",
  "\n      {!search && <div style={st.wrap}>\n\n        {/* Popular Calculators */}"
);

pageClient = pageClient.replace(
  "      </div>\n      <Footer />",
  "      </div>}\n      <Footer />"
);

fs.writeFileSync(path.join(BASE, 'app', 'PageClient.js'), pageClient, 'utf8');
console.log('  Done: app/PageClient.js (search functionality)');


console.log('');
console.log('=====================================================');
console.log('  COMPLETE');
console.log('');
console.log('  1. InternalLinks component:');
console.log('    - Auto-detects page category from URL');
console.log('    - Shows related calculators (gold)');
console.log('    - Shows related blog guides (blue)');
console.log('    - Shows comparisons (purple)');
console.log('    - Shows COL states (green)');
console.log('    - Appears on ALL pages via Footer');
console.log('');
console.log('  2. Homepage search:');
console.log('    - 100+ calculators searchable');
console.log('    - Live filtering as you type');
console.log('    - Shows category for each result');
console.log('    - Hides homepage sections during search');
console.log('=====================================================');
console.log('');
console.log('Now run:');
console.log('  git add .');
console.log('  git commit -m "Add internal links web + homepage search"');
console.log('  git push origin master');
console.log('');
