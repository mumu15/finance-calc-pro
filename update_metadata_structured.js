/**
 * FreeFinCalc.net — Metadata + Structured Data Auto-Patcher
 * Run from project root: node update_metadata_structured.js
 *
 * This script:
 *  1. Reads your current app/layout.js
 *  2. Replaces the metadata export with a full SEO version
 *  3. Adds StructuredData import and usage into layout
 *  4. Creates components/StructuredData.js with JSON-LD schemas
 */

const fs = require('fs')
const path = require('path')

// ─────────────────────────────────────────────────────────────────────────────
// STEP 1 — Create components/StructuredData.js
// ─────────────────────────────────────────────────────────────────────────────

const structuredDataFile = `// components/StructuredData.js
// JSON-LD structured data for FreeFinCalc.net
// Included automatically in app/layout.js

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FreeFinCalc",
    "url": "https://freefincalc.net",
    "logo": "https://freefincalc.net/icon.png",
    "description": "Free financial calculators for mortgage, tax, retirement, investing and more. 100+ calculators, 40+ currencies.",
    "sameAs": []
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
    "url": "https://freefincalc.net",
    "description": "100+ free financial calculators. No sign-up required.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://freefincalc.net/?q={search_term_string}"
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
fs.writeFileSync('components/StructuredData.js', structuredDataFile, 'utf8')
console.log('✅ components/StructuredData.js created')

// ─────────────────────────────────────────────────────────────────────────────
// STEP 2 — Read current app/layout.js
// ─────────────────────────────────────────────────────────────────────────────

const layoutPath = 'app/layout.js'

if (!fs.existsSync(layoutPath)) {
  console.error('❌ app/layout.js not found. Make sure you are in the project root.')
  process.exit(1)
}

let layout = fs.readFileSync(layoutPath, 'utf8')
console.log('✅ app/layout.js read successfully')

// ─────────────────────────────────────────────────────────────────────────────
// STEP 3 — Build the new metadata block
// ─────────────────────────────────────────────────────────────────────────────

const newMetadata = `export const metadata = {
  metadataBase: new URL('https://freefincalc.net'),
  title: {
    default: 'FreeFinCalc — 100+ Free Financial Calculators',
    template: '%s | FreeFinCalc',
  },
  description: 'Free financial calculators for mortgage, tax, retirement, investing, budgeting and more. 100+ calculators, 40+ currencies, no sign-up required.',
  keywords: [
    'financial calculator',
    'mortgage calculator',
    'tax calculator',
    'retirement calculator',
    'investment calculator',
    'loan calculator',
    'budget calculator',
    'free finance tools',
  ],
  authors: [{ name: 'FreeFinCalc' }],
  creator: 'FreeFinCalc',
  publisher: 'FreeFinCalc',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://freefincalc.net',
    siteName: 'FreeFinCalc',
    title: 'FreeFinCalc — 100+ Free Financial Calculators',
    description: 'Free financial calculators for mortgage, tax, retirement, investing and budgeting. No sign-up required.',
    images: [
      {
        url: 'https://freefincalc.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FreeFinCalc — Free Financial Calculators',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FreeFinCalc — 100+ Free Financial Calculators',
    description: 'Free financial calculators. 40+ currencies. No sign-up.',
    images: ['https://freefincalc.net/og-image.png'],
  },
  alternates: {
    canonical: 'https://freefincalc.net',
  },
}`

// ─────────────────────────────────────────────────────────────────────────────
// STEP 4 — Replace existing metadata block (or insert after last import)
// ─────────────────────────────────────────────────────────────────────────────

// Check if metadata already exists
if (layout.includes('export const metadata')) {
  // Replace the whole existing metadata block
  // Match from 'export const metadata' to the closing }; or }
  layout = layout.replace(
    /export const metadata\s*=\s*\{[\s\S]*?\n\}/,
    newMetadata
  )
  console.log('✅ Existing metadata replaced with enhanced SEO version')
} else {
  // No metadata found — insert after the last import line
  const lastImportIndex = layout.lastIndexOf("import ")
  const endOfLastImport = layout.indexOf('\n', lastImportIndex) + 1
  layout = layout.slice(0, endOfLastImport) + '\n' + newMetadata + '\n' + layout.slice(endOfLastImport)
  console.log('✅ New metadata inserted after imports')
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 5 — Add StructuredData import if not already present
// ─────────────────────────────────────────────────────────────────────────────

if (!layout.includes('StructuredData')) {
  // Add import after the last existing import line
  const lastImportIndex = layout.lastIndexOf("import ")
  const endOfLastImport = layout.indexOf('\n', lastImportIndex) + 1
  const structuredImport = `import { OrganizationSchema, WebSiteSchema } from '../components/StructuredData'\n`
  layout = layout.slice(0, endOfLastImport) + structuredImport + layout.slice(endOfLastImport)
  console.log('✅ StructuredData import added')
} else {
  console.log('ℹ️  StructuredData import already present — skipping')
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 6 — Inject <OrganizationSchema /> and <WebSiteSchema /> into <head>
// ─────────────────────────────────────────────────────────────────────────────

if (!layout.includes('<OrganizationSchema')) {
  // Try to find existing <head> tag
  if (layout.includes('<head>')) {
    layout = layout.replace(
      '<head>',
      '<head>\n        <OrganizationSchema />\n        <WebSiteSchema />'
    )
    console.log('✅ Schemas injected into existing <head> tag')
  } else if (layout.includes('<html')) {
    // No <head> tag — add one after <html ...>
    layout = layout.replace(
      /<html([^>]*)>/,
      `<html$1>\n      <head>\n        <OrganizationSchema />\n        <WebSiteSchema />\n      </head>`
    )
    console.log('✅ <head> with schemas added inside <html>')
  } else {
    console.log('⚠️  Could not find <head> or <html> — add manually:')
    console.log('    <OrganizationSchema />')
    console.log('    <WebSiteSchema />')
  }
} else {
  console.log('ℹ️  Schemas already present — skipping')
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 7 — Write the updated layout.js back
// ─────────────────────────────────────────────────────────────────────────────

fs.writeFileSync(layoutPath, layout, 'utf8')
console.log('✅ app/layout.js saved successfully')

// ─────────────────────────────────────────────────────────────────────────────
// Done
// ─────────────────────────────────────────────────────────────────────────────

console.log(`
════════════════════════════════════════════════════
  METADATA + STRUCTURED DATA UPDATE COMPLETE
════════════════════════════════════════════════════
  ✅ components/StructuredData.js  — created
  ✅ app/layout.js metadata        — updated
  ✅ Organization JSON-LD schema   — injected
  ✅ WebSite JSON-LD schema        — injected

  Next: deploy and verify
════════════════════════════════════════════════════
`)
