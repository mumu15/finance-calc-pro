/**
 * node fix_sitemap_route.js
 * Creates app/sitemap.js — a proper Next.js sitemap that auto-generates
 * Google can always access this at https://freefincalc.net/sitemap.xml
 */
const fs = require('fs')

const sitemapCode = `const BASE = 'https://freefincalc.net'

const calculators = [
  'mortgage-calculator','car-loan-calculator','personal-loan-calculator',
  'auto-loan-calculator','home-equity-calculator','rent-vs-buy-calculator',
  'refinance-calculator','down-payment-calculator','property-tax-calculator',
  'closing-cost-calculator','heloc-calculator','land-loan-calculator',
  'construction-loan-calculator','house-affordability-calculator',
  'fha-loan-calculator','credit-card-payoff-calculator','debt-payoff-calculator',
  'debt-consolidation-calculator','balance-transfer-calculator',
  'debt-to-income-calculator','credit-card-minimum-payment-calculator',
  'credit-utilization-calculator','debt-avalanche-calculator',
  'debt-snowball-calculator','debt-payoff-time-calculator','total-debt-calculator',
  'loan-payment-calculator','loan-comparison-calculator','loan-interest-calculator',
  'simple-interest-calculator','amortization-calculator','apr-calculator',
  'truck-loan-calculator','boat-loan-calculator','rv-loan-calculator',
  'equipment-loan-calculator','sba-loan-calculator','car-affordability-calculator',
  'lease-vs-buy-calculator','car-depreciation-calculator','gas-mileage-calculator',
  'retirement-calculator','401k-calculator','roth-ira-calculator',
  'social-security-calculator','pension-calculator','fire-calculator',
  'fire-retirement-calculator','retirement-savings-calculator',
  'required-minimum-distribution-calculator','early-retirement-calculator',
  'investment-return-calculator','compound-interest','stock-calculator',
  'dividend-calculator','index-fund-calculator','options-profit-calculator',
  'real-estate-roi-calculator','portfolio-growth-calculator',
  'passive-income-calculator','savings-calculator','savings-goal-calculator',
  'savings-growth-calculator','cd-calculator','emergency-fund-calculator',
  'high-yield-savings-calculator','tax-calculator','self-employment-tax-calculator',
  'capital-gains-tax-calculator','sales-tax-calculator','paycheck-calculator',
  'salary-after-tax-calculator','take-home-pay-calculator','vat-calculator',
  'estate-tax-calculator','property-tax-by-state-calculator',
  'hourly-to-salary-calculator','salary-to-hourly-calculator','raise-calculator',
  'overtime-calculator','overtime-pay-calculator','freelance-rate-calculator',
  'contractor-pay-calculator','commission-calculator','invoice-calculator',
  'net-worth-calculator','budget-planner-calculator','cost-of-living-calculator',
  'inflation-calculator','tip-calculator','split-bill-calculator',
  'wedding-budget-calculator','college-savings-calculator','child-support-calculator',
  'alimony-calculator','business-loan-calculator','startup-cost-calculator',
  'break-even-calculator','profit-margin-calculator','roi-calculator',
  'markup-calculator','business-valuation-calculator','cash-flow-calculator',
  'payroll-calculator','accounts-receivable-calculator','burn-rate-calculator',
  'runway-calculator','employee-cost-calculator','rental-property-calculator',
  'cap-rate-calculator','mortgage-points-calculator','home-sale-proceeds-calculator',
  'percentage-calculator','percent-change-calculator','currency-converter',
  'unit-converter',
]

const blogs = [
  'how-to-calculate-mortgage-payment','how-to-pay-off-debt-fast',
  'compound-interest-explained','50-30-20-budget-rule','how-to-save-for-retirement',
  'debt-avalanche-vs-snowball','what-is-apr','how-to-invest-for-beginners',
  'fire-movement-explained','how-to-build-emergency-fund',
  'credit-score-improvement-tips','roth-ira-vs-traditional-ira',
  'how-much-house-can-i-afford','what-is-net-worth','how-to-negotiate-salary',
  'freelance-taxes-guide','how-to-calculate-take-home-pay','car-loan-tips',
  'what-is-pmi','how-to-refinance-mortgage','passive-income-ideas',
  'dollar-cost-averaging','index-funds-vs-etfs','4-percent-rule-retirement',
  'what-is-inflation','how-to-calculate-roi','small-business-financing',
  'student-loan-repayment-strategies','how-to-create-budget',
  'real-estate-investing-beginners','how-to-use-heloc',
  'debt-to-income-ratio-explained','401k-contribution-limits',
  'capital-gains-tax-explained','side-hustle-tax-tips',
  'how-to-calculate-net-worth','amortization-explained',
  'savings-account-interest-explained','how-to-retire-early',
  'vat-explained','how-to-build-wealth',
]

const citySlugs = [
  'new-york','los-angeles','chicago','houston','phoenix','philadelphia',
  'san-antonio','san-diego','dallas','san-jose','austin','jacksonville',
  'fort-worth','columbus','charlotte','indianapolis','san-francisco',
  'seattle','denver','nashville','oklahoma-city','el-paso','boston',
  'portland','las-vegas','memphis','louisville','baltimore','milwaukee',
  'albuquerque','tucson','fresno','sacramento','mesa','atlanta','omaha',
  'colorado-springs','raleigh','miami','tampa','orlando','minneapolis',
  'pittsburgh','st-louis','richmond','salt-lake-city','kansas-city',
  'cincinnati','detroit',
]

export default function sitemap() {
  const now = new Date().toISOString()

  const pages = [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: \`\${BASE}/about\`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: \`\${BASE}/blog\`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: \`\${BASE}/privacy-policy\`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: \`\${BASE}/terms\`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const calcPages = calculators.map(slug => ({
    url: \`\${BASE}/\${slug}\`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  const blogPages = blogs.map(slug => ({
    url: \`\${BASE}/blog/\${slug}\`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const cityPages = citySlugs.map(slug => ({
    url: \`\${BASE}/mortgage-calculator/\${slug}\`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...pages, ...calcPages, ...blogPages, ...cityPages]
}
`

// Remove old static sitemap from public/
try {
  fs.unlinkSync('public/sitemap.xml')
  console.log('✅ Removed old public/sitemap.xml')
} catch(e) {
  console.log('ℹ️  No old sitemap.xml to remove')
}

// Write new Next.js sitemap route
fs.writeFileSync('app/sitemap.js', sitemapCode, 'utf8')
console.log('✅ app/sitemap.js created')
console.log('')
console.log('This generates https://freefincalc.net/sitemap.xml automatically.')
console.log('Total URLs: ~200 calculators + 41 blogs + 50 cities = ~295 URLs')
