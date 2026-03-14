/**
 * FreeFinCalc.net — Fix StructuredData.js
 * Run: node fix_structured_data_component.js
 *
 * Problem: 'use client' in StructuredData.js prevents server-side rendering
 * so Google crawler never sees the JSON-LD schemas.
 * Fix: rewrite as a pure server component (no 'use client').
 */

const fs = require('fs')

const fixedComponent = `// components/StructuredData.js
// Server component — no 'use client' so Google crawler sees JSON-LD

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FreeFinCalc",
    "url": "https://freefincalc.net",
    "logo": "https://freefincalc.net/icon.png",
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
fs.writeFileSync('components/StructuredData.js', fixedComponent, 'utf8')

console.log('✅ components/StructuredData.js fixed — removed "use client"')
console.log('')
console.log('Root cause: "use client" caused client-side only rendering.')
console.log('Google crawler runs JavaScript minimally so it never saw the JSON-LD.')
console.log('Now it renders server-side — Google will detect it on next crawl.')
console.log('')
console.log('════════════════════════════════════════════════════')
console.log('  File content written:')
console.log('════════════════════════════════════════════════════')
console.log(fs.readFileSync('components/StructuredData.js', 'utf8'))
console.log('════════════════════════════════════════════════════')
