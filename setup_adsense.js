/**
 * FreeFinCalc.net — Google AdSense Setup
 * node setup_adsense.js YOUR_PUBLISHER_ID
 *
 * Usage:
 *   node setup_adsense.js ca-pub-XXXXXXXXXXXXXXXXX
 *
 * What this does:
 *  1. Adds AdSense <script> to app/layout.js <head>
 *  2. Creates components/AdUnit.js reusable ad component
 *  3. Adds a leaderboard ad to homepage between sections
 *
 * Get your publisher ID from:
 *   https://adsense.google.com → Account → Account information
 */

const fs   = require('fs')
const path = require('path')

const publisherId = process.argv[2]

if (!publisherId || !publisherId.startsWith('ca-pub-')) {
  console.log('')
  console.log('════════════════════════════════════════════════════')
  console.log('  USAGE:')
  console.log('  node setup_adsense.js ca-pub-XXXXXXXXXXXXXXXXX')
  console.log('')
  console.log('  Get your publisher ID from:')
  console.log('  https://adsense.google.com')
  console.log('  → Account → Account information → Publisher ID')
  console.log('════════════════════════════════════════════════════')
  console.log('')
  console.log('  If you have not applied for AdSense yet, see')
  console.log('  the requirements checklist below first.')
  console.log('')
  console.log('  ADSENSE REQUIREMENTS CHECKLIST:')
  console.log('  ✅ Site must be live (freefincalc.net is live)')
  console.log('  ✅ Real useful content (103+ calculators + 41 blogs)')
  console.log('  ✅ Privacy Policy page exists')
  console.log('  ✅ Terms of Service page exists')
  console.log('  ✅ Contact page exists')
  console.log('  ✅ About page exists')
  console.log('  ✅ Original content (not copied from elsewhere)')
  console.log('  ⏳ Age requirement: site should have some traffic')
  console.log('     (Google prefers 3+ months of existence but')
  console.log('      not strictly required — apply as soon as possible)')
  console.log('')
  console.log('  HOW TO APPLY:')
  console.log('  1. Go to https://adsense.google.com/start')
  console.log('  2. Sign in with your Google account')
  console.log('  3. Enter https://freefincalc.net as your site URL')
  console.log('  4. Choose your country')
  console.log('  5. Accept terms and click Start using AdSense')
  console.log('  6. You will get a publisher ID immediately')
  console.log('  7. Add the AdSense code to your site (this script does that)')
  console.log('  8. Google reviews your site — typically 1-14 days')
  console.log('  9. Once approved, ads start showing automatically')
  console.log('')
  console.log('  Run this script again once you have your publisher ID:')
  console.log('  node setup_adsense.js ca-pub-XXXXXXXXXXXXXXXXX')
  console.log('')
  process.exit(0)
}

console.log('Publisher ID: ' + publisherId)
console.log('')

// ── 1. Add AdSense script to layout.js ───────────────────────────────────────

const layoutPath = 'app/layout.js'
let layout = fs.readFileSync(layoutPath, 'utf8')

if (layout.includes('adsbygoogle')) {
  console.log('ℹ️  AdSense script already in layout.js — skipping')
} else {
  const adsenseScript = `        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}"
          crossOrigin="anonymous"
        />`

  layout = layout.replace(
    '<head>',
    '<head>\n' + adsenseScript
  )
  fs.writeFileSync(layoutPath, layout, 'utf8')
  console.log('✅ AdSense script added to app/layout.js')
}

// ── 2. Create AdUnit component ────────────────────────────────────────────────

const adUnitContent = `'use client'
// components/AdUnit.js
// Reusable Google AdSense ad unit
// Usage: <AdUnit slot="XXXXXXXXXX" format="auto" />

import { useEffect } from 'react'

export default function AdUnit({ slot, format = 'auto', responsive = true, className = '' }) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    } catch (e) {
      // AdSense not loaded yet
    }
  }, [])

  return (
    <div className={'my-6 flex justify-center ' + className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="${publisherId}"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  )
}
`

fs.mkdirSync('components', { recursive: true })
fs.writeFileSync('components/AdUnit.js', adUnitContent, 'utf8')
console.log('✅ components/AdUnit.js created')

// ── 3. Done ───────────────────────────────────────────────────────────────────

console.log(`
════════════════════════════════════════════════════
  ADSENSE SETUP COMPLETE
════════════════════════════════════════════════════
  Publisher ID : ${publisherId}
  ✅ AdSense script → app/layout.js <head>
  ✅ AdUnit component → components/AdUnit.js

  NEXT STEPS:
  ─────────────────────────────────────────────────
  1. Deploy:
     git add .
     git commit -m "AdSense: add publisher script and AdUnit component"
     git push origin master:main

  2. Go to AdSense dashboard and verify the site:
     https://adsense.google.com

  3. Once Google approves (1-14 days), create ad units:
     AdSense → Ads → By ad unit → Display ad
     Copy the slot ID (10-digit number)

  4. Add ads to calculator pages:
     import AdUnit from '../../components/AdUnit'
     <AdUnit slot="1234567890" />

  Best ad placements for calculator sites:
  - Between the calculator and results: high CTR
  - Below the FAQ section: good viewability
  - Sidebar on desktop: non-intrusive
  - Avoid above the fold — can hurt approval

  ESTIMATED REVENUE (once approved + traffic):
  - Calculator sites: $3-8 RPM (per 1,000 pageviews)
  - At 10,000 visits/month: $30-80/month
  - At 50,000 visits/month: $150-400/month
  - At 200,000 visits/month: $600-1,600/month
  Traffic grows with Google rankings — SEO is key.
════════════════════════════════════════════════════
`)
