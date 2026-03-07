/**
 * Run from project root: node update_sitemap.js
 * Overwrites app/sitemap.js with all 103 calculator routes
 */

const fs = require('fs')

const content = `export default function sitemap() {
  const base = 'https://freefincalc.net'

  const routes = [
    // ── Core pages ──────────────────────────────────────────────
    '',
    'blog',

    // ── Stage 2 (25) ────────────────────────────────────────────
    'mortgage-calculator',
    'amortization-calculator',
    'student-loan-calculator',
    'refinance-calculator',
    'debt-to-income-calculator',
    'home-affordability-calculator',
    'heloc-calculator',
    'property-tax-calculator',
    'rent-vs-buy-calculator',
    'emergency-fund-calculator',
    '401k-calculator',
    'roth-ira-calculator',
    'dividend-calculator',
    'stock-profit-calculator',
    'simple-interest-calculator',
    'apr-calculator',
    'interest-rate-calculator',
    'paycheck-calculator',
    'raise-calculator',
    'tip-calculator',
    'sales-tax-calculator',
    'vat-calculator',
    'currency-converter',
    'payoff-vs-invest-calculator',
    'net-worth-calculator',

    // ── Stage 3 (10) ────────────────────────────────────────────
    'payroll-tax-calculator',
    'bond-yield-calculator',
    'car-depreciation-calculator',
    'home-equity-calculator',
    'inflation-impact-calculator',
    'profit-margin-calculator',
    'break-even-calculator',
    'roi-calculator',
    'freelance-rate-calculator',
    'business-valuation-calculator',

    // ── Stage 4 (10) ────────────────────────────────────────────
    'hourly-to-salary-calculator',
    'salary-after-tax-calculator',
    'overtime-calculator',
    'cost-of-living-calculator',
    'moving-cost-calculator',
    'lease-vs-buy-calculator',
    'car-loan-calculator',
    'fuel-cost-calculator',
    'down-payment-calculator',
    'mortgage-points-calculator',

    // ── Stage 5 (10) ────────────────────────────────────────────
    'retirement-calculator',
    'social-security-calculator',
    'rmd-calculator',
    'investment-return-calculator',
    'portfolio-rebalancing-calculator',
    'dollar-cost-averaging-calculator',
    'personal-loan-calculator',
    'credit-card-payoff-calculator',
    'savings-interest-calculator',
    'net-investment-fee-calculator',

    // ── Stage 6 (10) ────────────────────────────────────────────
    'budget-planner-calculator',
    'rent-affordability-calculator',
    'net-pay-calculator',
    'tax-refund-calculator',
    'child-tax-credit-calculator',
    'estate-tax-calculator',
    'gift-tax-calculator',
    'rental-property-calculator',
    'cap-rate-calculator',
    'house-flipping-calculator',

    // ── Stage 7 (10) ────────────────────────────────────────────
    'business-loan-calculator',
    'sba-loan-calculator',
    'accounts-receivable-calculator',
    'cash-flow-calculator',
    'working-capital-calculator',
    'debt-service-coverage-calculator',
    'employee-cost-calculator',
    'startup-cost-calculator',
    'ecommerce-profit-calculator',
    'saas-metrics-calculator',

    // ── Stage 8 (5) ─────────────────────────────────────────────
    'wedding-budget-calculator',
    'vacation-budget-calculator',
    'baby-cost-calculator',
    'pet-cost-calculator',
    'home-buying-cost-calculator',

    // ── Stage 9a (12) — previously missing ──────────────────────
    'debt-payoff-calculator',
    'tax-calculator',
    'capital-gains-tax-calculator',
    'self-employment-tax-calculator',
    'pension-calculator',
    'annuity-calculator',
    'life-insurance-calculator',
    'college-savings-calculator',
    'car-affordability-calculator',
    'home-improvement-loan-calculator',
    'solar-payback-calculator',
    'invoice-calculator',

    // ── Stage 9b (11) — previously missing ──────────────────────
    'markup-calculator',
    'discount-calculator',
    'loan-comparison-calculator',
    'biweekly-mortgage-calculator',
    'extra-payment-calculator',
    'cd-calculator',
    'savings-goal-calculator',
    'fire-calculator',
    'debt-consolidation-calculator',
    'balance-transfer-calculator',
    'insurance-calculator',
  ]

  return routes.map(route => ({
    url: route ? \`\${base}/\${route}\` : base,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : route === 'blog' ? 'weekly' : 'weekly',
    priority: route === '' ? 1.0 : route === 'blog' ? 0.7 : 0.8,
  }))
}
`

fs.writeFileSync('app/sitemap.js', content, 'utf8')
console.log('✅ app/sitemap.js updated — 103 calculator routes + 2 core pages = 105 URLs total')
console.log('')
console.log('Deploy:')
console.log('  git add app/sitemap.js')
console.log('  git commit -m "SEO: update sitemap with all 103 calculators"')
console.log('  git push origin master:main')
console.log('')
console.log('Then resubmit sitemap in Google Search Console:')
console.log('  https://search.google.com/search-console')
console.log('  Sitemaps → delete old → submit: sitemap.xml')
