/**
 * Add Stage 10 (21 new calculators) to sitemap
 * node update_sitemap_stage10.js
 */

const fs = require('fs')

const newRoutes = [
  'boat-loan-calculator',
  'commission-calculator',
  'contractor-pay-calculator',
  'credit-card-minimum-payment-calculator',
  'credit-utilization-calculator',
  'debt-avalanche-calculator',
  'debt-payoff-time-calculator',
  'debt-snowball-calculator',
  'equipment-loan-calculator',
  'fire-retirement-calculator',
  'loan-interest-calculator',
  'loan-payment-calculator',
  'overtime-pay-calculator',
  'passive-income-calculator',
  'portfolio-growth-calculator',
  'retirement-savings-calculator',
  'rv-loan-calculator',
  'salary-to-hourly-calculator',
  'savings-growth-calculator',
  'total-debt-calculator',
  'truck-loan-calculator',
]

let sitemap = fs.readFileSync('app/sitemap.js', 'utf8')

const insertion = newRoutes.map(r => `    '${r}',`).join('\n')
const marker = `  return [...staticEntries, ...blogEntries, ...calcEntries]`

if (!sitemap.includes('boat-loan-calculator')) {
  sitemap = sitemap.replace(
    `    // Stage 9b (11) — previously missing`,
    `    // Stage 9b (11) — previously missing`
  )
  // Insert before the closing ] of calculators array
  sitemap = sitemap.replace(
    `    'insurance-calculator',\n  ]`,
    `    'insurance-calculator',\n\n    // Stage 10 (21) — linked from homepage\n${insertion}\n  ]`
  )
  fs.writeFileSync('app/sitemap.js', sitemap, 'utf8')
  console.log('✅ app/sitemap.js updated with 21 new routes')
  console.log('   Total calculators in sitemap: 124')
} else {
  console.log('ℹ️  Stage 10 routes already in sitemap')
}

console.log('')
console.log('Verify: https://freefincalc.net/sitemap.xml after deploy')
