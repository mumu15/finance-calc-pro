// components/StructuredData.js
// Server component — no 'use client' so Google crawler sees JSON-LD

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
