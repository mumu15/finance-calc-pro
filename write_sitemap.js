/**
 * node write_sitemap.js
 * Writes public/sitemap.xml as a plain static XML file
 * Also removes any conflicting route handler
 */
const fs = require('fs')

// Remove conflicting route handler if exists
try { fs.rmSync('app/sitemap.xml', { recursive: true }); console.log('✅ Removed app/sitemap.xml dir') } catch(e) {}
try { fs.unlinkSync('app/sitemap.js'); console.log('✅ Removed app/sitemap.js') } catch(e) {}

const BASE = 'https://freefincalc.net'
const now = new Date().toISOString()

const urls = [
  { loc: BASE, priority: '1.0' },
  { loc: BASE + '/about', priority: '0.6' },
  { loc: BASE + '/contact', priority: '0.6' },
  { loc: BASE + '/blog', priority: '0.8' },
  { loc: BASE + '/privacy-policy', priority: '0.3' },
  { loc: BASE + '/terms', priority: '0.3' },
  ...[
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
    'percentage-calculator','percent-change-calculator','currency-converter','unit-converter',
  ].map(s => ({ loc: BASE + '/' + s, priority: '0.9' })),
  ...[
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
  ].map(s => ({ loc: BASE + '/blog/' + s, priority: '0.7' })),
  ...[
    'new-york','los-angeles','chicago','houston','phoenix','philadelphia',
    'san-antonio','san-diego','dallas','san-jose','austin','jacksonville',
    'fort-worth','columbus','charlotte','indianapolis','san-francisco',
    'seattle','denver','nashville','oklahoma-city','el-paso','boston',
    'portland','las-vegas','memphis','louisville','baltimore','milwaukee',
    'albuquerque','tucson','fresno','sacramento','mesa','atlanta','omaha',
    'colorado-springs','raleigh','miami','tampa','orlando','minneapolis',
    'pittsburgh','st-louis','richmond','salt-lake-city','kansas-city',
    'cincinnati','detroit',
  ].map(s => ({ loc: BASE + '/mortgage-calculator/' + s, priority: '0.8' })),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`

fs.mkdirSync('public', { recursive: true })
fs.writeFileSync('public/sitemap.xml', xml, 'utf8')
console.log(`✅ public/sitemap.xml written — ${urls.length} URLs`)

// Also fix robots.txt to point to sitemap
const robots = `User-agent: *
Allow: /

Sitemap: https://freefincalc.net/sitemap.xml`
fs.writeFileSync('public/robots.txt', robots, 'utf8')
console.log('✅ public/robots.txt updated')
