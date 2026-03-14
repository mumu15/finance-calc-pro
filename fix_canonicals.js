/**
 * FreeFinCalc.net — Fix Canonical Tags on all 124 calculator layout.js files
 * node fix_canonicals.js
 *
 * "Duplicate without user-selected canonical" fix:
 * - Sets canonical to https://www.freefincalc.net/[route] (no trailing slash)
 * - Sets metadataBase so relative OG urls resolve correctly
 * - Adds alternates.canonical to every layout
 */

const fs = require('fs')
const path = require('path')

const BASE = 'https://www.freefincalc.net'

// Get all routes that have a layout.js
const appDir = 'app'
const routes = fs.readdirSync(appDir).filter(dir => {
  const layoutPath = path.join(appDir, dir, 'layout.js')
  return fs.existsSync(layoutPath) && fs.statSync(path.join(appDir, dir)).isDirectory()
})

console.log(`Found ${routes.length} routes with layout.js`)

let fixed = 0
let skipped = 0

routes.forEach(route => {
  const layoutPath = path.join(appDir, route, 'layout.js')
  let content = fs.readFileSync(layoutPath, 'utf8')

  // Check if it has metadata export
  if (!content.includes('export const metadata')) {
    skipped++
    return
  }

  const canonicalUrl = `${BASE}/${route}`

  // Check if alternates.canonical already correctly set
  if (content.includes(`canonical: '${canonicalUrl}'`)) {
    // Already correct
    return
  }

  // Strategy: replace the entire metadata export with a clean version
  // Extract title and description from existing metadata
  const titleMatch = content.match(/title:\s*['"`]([^'"`]+)['"`]/)
  const descMatch = content.match(/description:\s*['"`]([^'"`]+)['"`]/)

  if (!titleMatch || !descMatch) {
    skipped++
    return
  }

  const title = titleMatch[1]
  const desc = descMatch[1]

  // Build clean metadata block
  const newMetadata = `export const metadata = {
  metadataBase: new URL('${BASE}'),
  title: '${title}',
  description: '${desc}',
  alternates: {
    canonical: '${canonicalUrl}',
  },
  openGraph: {
    title: '${title}',
    description: '${desc}',
    url: '${canonicalUrl}',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: '${title}',
    description: '${desc}',
  },
}`

  // Replace old metadata block
  content = content.replace(
    /export const metadata = \{[\s\S]*?\n\}/,
    newMetadata
  )

  fs.writeFileSync(layoutPath, content, 'utf8')
  fixed++
  console.log(`✅ ${route}`)
})

console.log(`
════════════════════════════════════════════════
  CANONICAL FIX COMPLETE
════════════════════════════════════════════════
  ✅ Fixed: ${fixed} layout.js files
  ⏭️  Skipped: ${skipped} (no metadata or no match)
  
  Each page now has:
  alternates.canonical: https://www.freefincalc.net/[route]
  metadataBase: https://www.freefincalc.net
  
  This tells Google the ONE canonical URL for each page
  and stops "Duplicate without user-selected canonical"
════════════════════════════════════════════════
`)
