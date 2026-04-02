const fs = require('fs')
const path = require('path')

console.log('\n═══════════════════════════════════════════════════')
console.log('  FIX: Updating vercel.json safely')
console.log('═══════════════════════════════════════════════════\n')

const vercelFile = path.join(__dirname, 'vercel.json')
let vercel

try {
  vercel = JSON.parse(fs.readFileSync(vercelFile, 'utf8'))
} catch(e) {
  vercel = { framework: 'nextjs' }
}

// Ensure headers array exists
if (!vercel.headers) {
  vercel.headers = []
}

// Add static asset caching if not present
const hasCache = vercel.headers.some(h => h.source && h.source.includes('.js'))
if (!hasCache) {
  vercel.headers.push({
    source: '/(.*)\\.(?:js|css|woff|woff2|png|jpg|ico|svg)',
    headers: [
      { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
    ]
  })
  console.log('  ✅ Added static asset caching headers')
}

// Add security headers if not present
const hasGlobal = vercel.headers.find(h => h.source === '/(.*)')
if (!hasGlobal) {
  vercel.headers.push({
    source: '/(.*)',
    headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-DNS-Prefetch-Control', value: 'on' }
    ]
  })
  console.log('  ✅ Added security headers')
} else {
  // Add missing headers to existing global rule
  const existing = hasGlobal.headers.map(h => h.key)
  if (!existing.includes('Referrer-Policy')) {
    hasGlobal.headers.push({ key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' })
    console.log('  ✅ Added Referrer-Policy')
  }
  if (!existing.includes('X-DNS-Prefetch-Control')) {
    hasGlobal.headers.push({ key: 'X-DNS-Prefetch-Control', value: 'on' })
    console.log('  ✅ Added DNS-Prefetch')
  }
}

// Add multi-region if not present
if (!vercel.regions) {
  vercel.regions = ['iad1', 'cdg1', 'sin1', 'syd1', 'hnd1']
  console.log('  ✅ Added multi-region deployment (US, EU, Asia, AU, JP)')
}

fs.writeFileSync(vercelFile, JSON.stringify(vercel, null, 2), 'utf8')
console.log('\n  ✅ vercel.json updated successfully')
console.log('')
console.log('  Now run:')
console.log('    git add -A')
console.log('    git commit -m "A+ upgrade: sitemap +169, about rewrite, metadata, OG, headers"')
console.log('    git push origin master')
console.log('')
