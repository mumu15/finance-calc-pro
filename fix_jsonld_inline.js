/**
 * FreeFinCalc.net — Inline JSON-LD Fix
 * Run: node fix_jsonld_inline.js
 *
 * Root cause: Next.js 14 App Router does not reliably render
 * dangerouslySetInnerHTML from child components inside <head>.
 * Fix: write JSON-LD script tags DIRECTLY in layout.js <head>.
 * No separate component needed. This is the most reliable method.
 */

const fs = require('fs')

const layoutPath = 'app/layout.js'

if (!fs.existsSync(layoutPath)) {
  console.error('❌ app/layout.js not found. Run from project root.')
  process.exit(1)
}

let layout = fs.readFileSync(layoutPath, 'utf8')
console.log('✅ Read app/layout.js')

// ── Remove old StructuredData import if present ──────────────────────────────
if (layout.includes("from '../components/StructuredData'")) {
  layout = layout.replace(
    /import \{ OrganizationSchema, WebSiteSchema \} from '\.\.\/components\/StructuredData'\n/,
    ''
  )
  console.log('✅ Removed old StructuredData import')
}

// ── Remove old component tags if present ────────────────────────────────────
layout = layout.replace(/\s*<OrganizationSchema \/>\n?/g, '')
layout = layout.replace(/\s*<WebSiteSchema \/>\n?/g, '')
console.log('✅ Removed old schema component tags')

// ── Build inline JSON-LD strings ─────────────────────────────────────────────
const orgSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "FreeFinCalc",
  "url": "https://www.freefincalc.net",
  "logo": "https://www.freefincalc.net/icon.png",
  "description": "Free financial calculators for mortgage, tax, retirement, investing and more. 100+ calculators, 40+ currencies."
})

const siteSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "FreeFinCalc",
  "url": "https://www.freefincalc.net",
  "description": "100+ free financial calculators. No sign-up required.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.freefincalc.net/?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
})

// Escape backticks and backslashes for template literal safety
function safe(str) {
  return str.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$')
}

const inlineScripts = `        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: \`${safe(orgSchema)}\` }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: \`${safe(siteSchema)}\` }}
        />`

// ── Inject into <head> ───────────────────────────────────────────────────────
if (layout.includes('<head>')) {
  layout = layout.replace('<head>', '<head>\n' + inlineScripts)
  console.log('✅ Injected inline JSON-LD into <head>')
} else {
  console.error('❌ Could not find <head> tag in layout.js')
  process.exit(1)
}

// ── Save ─────────────────────────────────────────────────────────────────────
fs.writeFileSync(layoutPath, layout, 'utf8')
console.log('✅ app/layout.js saved')

// ── Print final result ───────────────────────────────────────────────────────
console.log(`
════════════════════════════════════════════════════
  FINAL app/layout.js:
════════════════════════════════════════════════════`)
console.log(fs.readFileSync(layoutPath, 'utf8'))
console.log(`════════════════════════════════════════════════════
  DONE. Now run:
    git add app/layout.js
    git commit -m "fix: inline JSON-LD structured data in layout head"
    git push origin master:main
════════════════════════════════════════════════════`)
