/**
 * FreeFinCalc.net — Structured Data Diagnostic + Fix
 * Run: node fix_structured_data.js
 *
 * Step 1: prints your current layout.js so we can see exactly what is there
 * Step 2: aggressively injects JSON-LD schemas directly as a script tag
 * Step 3: saves and reports result
 */

const fs = require('fs')

// ─────────────────────────────────────────────────────────────────────────────
// DIAGNOSTIC — print current layout.js
// ─────────────────────────────────────────────────────────────────────────────

const layoutPath = 'app/layout.js'

if (!fs.existsSync(layoutPath)) {
  console.error('❌ app/layout.js not found. Run from project root.')
  process.exit(1)
}

let layout = fs.readFileSync(layoutPath, 'utf8')

console.log('════════════════════════════════════════')
console.log('  CURRENT app/layout.js CONTENT:')
console.log('════════════════════════════════════════')
console.log(layout)
console.log('════════════════════════════════════════')

// ─────────────────────────────────────────────────────────────────────────────
// CREATE components/StructuredData.js
// ─────────────────────────────────────────────────────────────────────────────

const structuredDataContent = `'use client'
// components/StructuredData.js

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FreeFinCalc",
    "url": "https://www.freefincalc.net",
    "logo": "https://www.freefincalc.net/icon.png",
    "description": "Free financial calculators for mortgage, tax, retirement, investing and more. 100+ calculators, 40+ currencies."
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebSiteSchema() {
  const schema = {
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
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
`

fs.mkdirSync('components', { recursive: true })
fs.writeFileSync('components/StructuredData.js', structuredDataContent, 'utf8')
console.log('✅ components/StructuredData.js written')

// ─────────────────────────────────────────────────────────────────────────────
// PATCH LAYOUT.JS — 3 strategies, tries each in order
// ─────────────────────────────────────────────────────────────────────────────

let patched = false

// --- Strategy 1: already has 'use client' at top (client component layout) ---
// Just inject a raw JSON-LD script string via dangerouslySetInnerHTML
// Find the return ( and inject before the first child

// --- Add import if missing ---
if (!layout.includes('StructuredData')) {
  // Find position right after 'use client' line or first import
  if (layout.startsWith("'use client'") || layout.startsWith('"use client"')) {
    const firstNewline = layout.indexOf('\n') + 1
    layout = layout.slice(0, firstNewline)
      + "import { OrganizationSchema, WebSiteSchema } from '../components/StructuredData'\n"
      + layout.slice(firstNewline)
  } else {
    // Insert before first import
    const firstImport = layout.indexOf('import ')
    layout = layout.slice(0, firstImport)
      + "import { OrganizationSchema, WebSiteSchema } from '../components/StructuredData'\n"
      + layout.slice(firstImport)
  }
  console.log('✅ StructuredData import added')
}

// --- Strategy 1: inject into existing <head> tag ---
if (!patched && layout.includes('<head>') && !layout.includes('<OrganizationSchema')) {
  layout = layout.replace(
    '<head>',
    '<head>\n        <OrganizationSchema />\n        <WebSiteSchema />'
  )
  patched = true
  console.log('✅ Strategy 1: Injected into <head> tag')
}

// --- Strategy 2: inject after <html ...> with no <head> ---
if (!patched && layout.includes('<html') && !layout.includes('<OrganizationSchema')) {
  layout = layout.replace(
    /<html([^>]*)>/,
    (match, attrs) =>
      `<html${attrs}>\n      <head>\n        <OrganizationSchema />\n        <WebSiteSchema />\n      </head>`
  )
  patched = true
  console.log('✅ Strategy 2: Added <head> block after <html>')
}

// --- Strategy 3: inject right after the opening return ( ---
if (!patched && layout.includes('return (') && !layout.includes('<OrganizationSchema')) {
  layout = layout.replace(
    'return (',
    'return (\n    <>\n      <OrganizationSchema />\n      <WebSiteSchema />'
  )
  // Close the fragment before the last )
  const lastParen = layout.lastIndexOf('\n  )')
  layout = layout.slice(0, lastParen) + '\n    </>' + layout.slice(lastParen)
  patched = true
  console.log('✅ Strategy 3: Wrapped return with fragment + schemas')
}

// --- Strategy 4: already has schemas, nothing to do ---
if (!patched && layout.includes('<OrganizationSchema')) {
  console.log('ℹ️  Schemas already present in layout.js')
  patched = true
}

if (!patched) {
  console.log('⚠️  Could not auto-patch layout.js — printing it above for manual review')
}

// ─────────────────────────────────────────────────────────────────────────────
// UPDATE METADATA
// ─────────────────────────────────────────────────────────────────────────────

const newMetadata = `export const metadata = {
  metadataBase: new URL('https://www.freefincalc.net'),
  title: {
    default: 'FreeFinCalc — 100+ Free Financial Calculators',
    template: '%s | FreeFinCalc',
  },
  description: 'Free financial calculators for mortgage, tax, retirement, investing, budgeting and more. 100+ calculators, 40+ currencies, no sign-up required.',
  keywords: ['financial calculator','mortgage calculator','tax calculator','retirement calculator','investment calculator','loan calculator','budget calculator','free finance tools'],
  authors: [{ name: 'FreeFinCalc' }],
  creator: 'FreeFinCalc',
  publisher: 'FreeFinCalc',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.freefincalc.net',
    siteName: 'FreeFinCalc',
    title: 'FreeFinCalc — 100+ Free Financial Calculators',
    description: 'Free financial calculators for mortgage, tax, retirement, investing and budgeting. No sign-up required.',
    images: [{ url: 'https://www.freefincalc.net/og-image.png', width: 1200, height: 630, alt: 'FreeFinCalc' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FreeFinCalc — 100+ Free Financial Calculators',
    description: 'Free financial calculators. 40+ currencies. No sign-up.',
    images: ['https://www.freefincalc.net/og-image.png'],
  },
  alternates: { canonical: 'https://www.freefincalc.net' },
}`

if (layout.includes('export const metadata')) {
  // Replace existing metadata block — match greedily to closing }
  let start = layout.indexOf('export const metadata')
  let depth = 0
  let end = start
  let inBlock = false
  for (let i = start; i < layout.length; i++) {
    if (layout[i] === '{') { depth++; inBlock = true }
    if (layout[i] === '}') { depth-- }
    if (inBlock && depth === 0) { end = i + 1; break }
  }
  layout = layout.slice(0, start) + newMetadata + layout.slice(end)
  console.log('✅ Existing metadata replaced')
} else {
  // Insert after last import line
  const lines = layout.split('\n')
  let lastImportLine = 0
  lines.forEach((line, i) => { if (line.trim().startsWith('import ')) lastImportLine = i })
  lines.splice(lastImportLine + 1, 0, '', newMetadata)
  layout = lines.join('\n')
  console.log('✅ New metadata inserted')
}

// ─────────────────────────────────────────────────────────────────────────────
// SAVE
// ─────────────────────────────────────────────────────────────────────────────

fs.writeFileSync(layoutPath, layout, 'utf8')
console.log('✅ app/layout.js saved')

console.log(`
════════════════════════════════════════════════════
  FINAL app/layout.js CONTENT:
════════════════════════════════════════════════════`)
console.log(fs.readFileSync(layoutPath, 'utf8'))
console.log(`════════════════════════════════════════════════════
  DONE — review the output above for any issues
  Then run:
    git add .
    git commit -m "SEO: structured data + metadata"
    git push origin master:main
════════════════════════════════════════════════════`)
