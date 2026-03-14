/**
 * FreeFinCalc.net — Auto-inject AdSense into all pages
 * node inject_ads.js
 *
 * Places:
 *  - "Calc Below" (7405024590) after results section in all 124 calculators
 *  - "Blog Content" (3248634657) in all 41 blog pages
 */

const fs   = require('fs')
const path = require('path')

const CALC_SLOT  = '7405024590'
const BLOG_SLOT  = '3248634657'
const PUB_ID     = 'ca-pub-8934829211507329'

let calcUpdated = 0
let blogUpdated = 0
let skipped     = 0

// ── STEP 1: Create AdUnit component ──────────────────────────────────────────

const adUnitContent = `'use client'
// components/AdUnit.js

import { useEffect } from 'react'

export default function AdUnit({ slot }) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    } catch(e) {}
  }, [])

  return (
    <div className="my-8 flex justify-center overflow-hidden rounded-xl"
      style={{minHeight:'90px',background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.05)'}}>
      <ins
        className="adsbygoogle"
        style={{display:'block',width:'100%'}}
        data-ad-client="${PUB_ID}"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
`

fs.mkdirSync('components', { recursive: true })
fs.writeFileSync('components/AdUnit.js', adUnitContent, 'utf8')
console.log('✅ components/AdUnit.js created')

// ── STEP 2: Inject into all calculator pages ──────────────────────────────────

const calcRoutes = [
  'mortgage-calculator','amortization-calculator','student-loan-calculator',
  'refinance-calculator','debt-to-income-calculator','home-affordability-calculator',
  'heloc-calculator','property-tax-calculator','rent-vs-buy-calculator',
  'emergency-fund-calculator','401k-calculator','roth-ira-calculator',
  'dividend-calculator','stock-profit-calculator','simple-interest-calculator',
  'apr-calculator','interest-rate-calculator','paycheck-calculator',
  'raise-calculator','tip-calculator','sales-tax-calculator','vat-calculator',
  'currency-converter','payoff-vs-invest-calculator','net-worth-calculator',
  'payroll-tax-calculator','bond-yield-calculator','car-depreciation-calculator',
  'home-equity-calculator','inflation-impact-calculator','profit-margin-calculator',
  'break-even-calculator','roi-calculator','freelance-rate-calculator',
  'business-valuation-calculator','hourly-to-salary-calculator',
  'salary-after-tax-calculator','overtime-calculator','cost-of-living-calculator',
  'moving-cost-calculator','lease-vs-buy-calculator','car-loan-calculator',
  'fuel-cost-calculator','down-payment-calculator','mortgage-points-calculator',
  'retirement-calculator','social-security-calculator','rmd-calculator',
  'investment-return-calculator','portfolio-rebalancing-calculator',
  'dollar-cost-averaging-calculator','personal-loan-calculator',
  'credit-card-payoff-calculator','savings-interest-calculator',
  'net-investment-fee-calculator','budget-planner-calculator',
  'rent-affordability-calculator','net-pay-calculator','tax-refund-calculator',
  'child-tax-credit-calculator','estate-tax-calculator','gift-tax-calculator',
  'rental-property-calculator','cap-rate-calculator','house-flipping-calculator',
  'business-loan-calculator','sba-loan-calculator','accounts-receivable-calculator',
  'cash-flow-calculator','working-capital-calculator',
  'debt-service-coverage-calculator','employee-cost-calculator',
  'startup-cost-calculator','ecommerce-profit-calculator','saas-metrics-calculator',
  'wedding-budget-calculator','vacation-budget-calculator','baby-cost-calculator',
  'pet-cost-calculator','home-buying-cost-calculator','debt-payoff-calculator',
  'tax-calculator','capital-gains-tax-calculator','self-employment-tax-calculator',
  'pension-calculator','annuity-calculator','life-insurance-calculator',
  'college-savings-calculator','car-affordability-calculator',
  'home-improvement-loan-calculator','solar-payback-calculator','invoice-calculator',
  'markup-calculator','discount-calculator','loan-comparison-calculator',
  'biweekly-mortgage-calculator','extra-payment-calculator','cd-calculator',
  'savings-goal-calculator','fire-calculator','debt-consolidation-calculator',
  'balance-transfer-calculator','insurance-calculator','boat-loan-calculator',
  'commission-calculator','contractor-pay-calculator',
  'credit-card-minimum-payment-calculator','credit-utilization-calculator',
  'debt-avalanche-calculator','debt-payoff-time-calculator',
  'debt-snowball-calculator','equipment-loan-calculator',
  'fire-retirement-calculator','loan-interest-calculator',
  'loan-payment-calculator','overtime-pay-calculator','passive-income-calculator',
  'portfolio-growth-calculator','retirement-savings-calculator','rv-loan-calculator',
  'salary-to-hourly-calculator','savings-growth-calculator',
  'total-debt-calculator','truck-loan-calculator',
]

const calcImport    = `import AdUnit from '../../components/AdUnit'\n`
const calcAdTag     = `        <AdUnit slot="${CALC_SLOT}" />`

for (const route of calcRoutes) {
  const filePath = path.join('app', route, 'page.js')
  if (!fs.existsSync(filePath)) { skipped++; continue }

  let content = fs.readFileSync(filePath, 'utf8')
  if (content.includes('AdUnit')) { skipped++; continue }

  // Add import after last existing import line
  const lastImport = content.lastIndexOf('\nimport ')
  const endOfImport = content.indexOf('\n', lastImport + 1) + 1
  content = content.slice(0, endOfImport) + calcImport + content.slice(endOfImport)

  // Inject ad before <TrustSection /> or before <Footer /> if no TrustSection
  if (content.includes('<TrustSection')) {
    content = content.replace('<TrustSection', calcAdTag + '\n      <TrustSection')
  } else if (content.includes('<Footer')) {
    content = content.replace('<Footer', calcAdTag + '\n      <Footer')
  }

  fs.writeFileSync(filePath, content, 'utf8')
  calcUpdated++
}

console.log(`✅ Calc ad injected into ${calcUpdated} calculator pages`)

// ── STEP 3: Inject into all blog pages ────────────────────────────────────────

const blogSlugs = [
  'bond-calculator-south-africa-2026','debt-snowball-vs-avalanche',
  'home-loan-calculator-pakistan-2026','home-loan-emi-calculator-india',
  'how-car-loans-work','how-does-inflation-affect-savings',
  'how-inflation-works','how-much-house-can-i-afford',
  'how-much-to-save-for-retirement','how-personal-loans-work',
  'how-student-loans-work','how-to-budget-50-30-20',
  'how-to-build-emergency-fund','how-to-build-wealth',
  'how-to-calculate-loan-payment','how-to-calculate-mortgage-payment',
  'how-to-calculate-net-worth','how-to-create-monthly-budget',
  'how-to-get-out-of-debt','how-to-invest-for-beginners',
  'how-to-lower-tax-bill','how-to-max-out-roth-ira',
  'how-to-negotiate-salary','how-to-pay-off-debt-fast',
  'how-to-read-pay-stub','how-to-refinance-mortgage',
  'how-to-save-money-fast','income-tax-calculator-india-2026',
  'isa-savings-calculator-uk','loan-calculator-nigeria-2026',
  'mortgage-calculator-australia-2026','mortgage-calculator-canada-2026',
  'mortgage-calculator-singapore-2026','mortgage-calculator-uae-dubai-2026',
  'mortgage-calculator-uk-2026','rent-vs-buy-home',
  'types-of-retirement-accounts','what-is-a-good-credit-score',
  'what-is-an-emergency-fund','what-is-compound-interest',
  'what-is-net-worth','what-is-passive-income',
]

const blogImport = `import AdUnit from '../../../components/AdUnit'\n`
const blogAdTag  = `      <AdUnit slot="${BLOG_SLOT}" />`

for (const slug of blogSlugs) {
  const filePath = path.join('app', 'blog', slug, 'page.js')
  if (!fs.existsSync(filePath)) { skipped++; continue }

  let content = fs.readFileSync(filePath, 'utf8')
  if (content.includes('AdUnit')) { skipped++; continue }

  // Add import
  const lastImport = content.lastIndexOf('\nimport ')
  const endOfImport = content.indexOf('\n', lastImport + 1) + 1
  content = content.slice(0, endOfImport) + blogImport + content.slice(endOfImport)

  // Inject ad before </article> or before <Footer
  if (content.includes('</article>')) {
    content = content.replace('</article>', blogAdTag + '\n      </article>')
  } else if (content.includes('<Footer')) {
    content = content.replace('<Footer', blogAdTag + '\n      <Footer')
  }

  fs.writeFileSync(filePath, content, 'utf8')
  blogUpdated++
}

console.log(`✅ Blog ad injected into ${blogUpdated} blog pages`)

// ── STEP 4: Add AdSense script to layout.js ───────────────────────────────────

const layoutPath = 'app/layout.js'
let layout = fs.readFileSync(layoutPath, 'utf8')

if (layout.includes('adsbygoogle')) {
  console.log('ℹ️  AdSense script already in layout.js — skipping')
} else {
  const adsScript = `        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUB_ID}"
          crossOrigin="anonymous"
        />`
  layout = layout.replace('<head>', '<head>\n' + adsScript)
  fs.writeFileSync(layoutPath, layout, 'utf8')
  console.log('✅ AdSense script added to app/layout.js')
}

// ── Done ──────────────────────────────────────────────────────────────────────

console.log(`
════════════════════════════════════════════════════
  ADS INJECTION COMPLETE
════════════════════════════════════════════════════
  Publisher ID  : ${PUB_ID}
  Calc slot     : ${CALC_SLOT}  (Calc Below)
  Blog slot     : ${BLOG_SLOT}  (Blog Content)

  ✅ Calculator pages updated : ${calcUpdated}
  ✅ Blog pages updated       : ${blogUpdated}
  ⏭️  Skipped (already done)  : ${skipped}

  Ad placement:
  - Calculators → just above <TrustSection />
  - Blogs       → end of article content

  Now deploy:
    git add .
    git commit -m "AdSense: inject ads into all calculator and blog pages"
    git push origin master:main

  After deploy verify at:
    https://freefincalc.net/mortgage-calculator
    → scroll to bottom, ad should appear above trust section

  Note: Ads show as blank/grey until Google approves your
  site or if you are viewing from your own IP.
════════════════════════════════════════════════════
`)
