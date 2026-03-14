/**
 * FreeFinCalc.net — Fix root layout metadata + canonical strategy
 * node fix_root_canonical.js
 *
 * Adds metadataBase to root layout so all OG/Twitter image URLs
 * resolve correctly, and adds site-level canonical strategy.
 */

const fs = require('fs')

// Fix next.config.js to redirect www → non-www (stops duplicate URL issue)
const nextConfigPath = 'next.config.js'
let nextConfig = ''

try {
  nextConfig = fs.readFileSync(nextConfigPath, 'utf8')
} catch (e) {
  nextConfig = '/** @type {import("next").NextConfig} */\nconst nextConfig = {}\nmodule.exports = nextConfig\n'
}

// Add redirects for www → non-www and trailing slash handling
if (!nextConfig.includes('www.freefincalc')) {
  const newConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  // Redirect www to non-www (prevents duplicate content)
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.freefincalc.net' }],
        destination: 'https://freefincalc.net/:path*',
        permanent: true,
      },
    ]
  },
  // Remove trailing slashes (canonical URL consistency)
  trailingSlash: false,
}

module.exports = nextConfig
`
  fs.writeFileSync(nextConfigPath, newConfig, 'utf8')
  console.log('✅ next.config.js updated with www redirect + trailingSlash: false')
} else {
  console.log('ℹ️  next.config.js already has www redirect')
}

// Fix root app/layout.js to have proper metadataBase
const rootLayoutPath = 'app/layout.js'
let rootLayout = fs.readFileSync(rootLayoutPath, 'utf8')

if (!rootLayout.includes('metadataBase')) {
  // Add metadataBase to existing metadata export
  rootLayout = rootLayout.replace(
    'export const metadata = {',
    `export const metadata = {
  metadataBase: new URL('https://freefincalc.net'),`
  )
  fs.writeFileSync(rootLayoutPath, rootLayout, 'utf8')
  console.log('✅ Root layout.js: metadataBase added')
} else {
  console.log('ℹ️  Root layout.js already has metadataBase')
}

console.log(`
════════════════════════════════════════════════
  ROOT CANONICAL FIX COMPLETE
════════════════════════════════════════════════
  ✅ www.freefincalc.net → freefincalc.net (301)
  ✅ trailingSlash: false (no /mortgage-calculator/)
  ✅ metadataBase in root layout
  
  This eliminates duplicate URL variants:
  ❌ www.freefincalc.net/mortgage-calculator
  ❌ freefincalc.net/mortgage-calculator/
  ✅ freefincalc.net/mortgage-calculator  ← only this
════════════════════════════════════════════════
`)
