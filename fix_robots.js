/**
 * FreeFinCalc.net — Fix robots.js
 * Run: node fix_robots.js
 *
 * Problem: app/robots.js was blocking /_next/ entirely,
 * which blocked ALL Next.js JS chunks and CSS from Googlebot.
 * This prevents Google from rendering pages properly.
 *
 * Fix: only disallow /_next/server/ (private server files),
 * allow /_next/static/ so Googlebot can load JS and CSS.
 */

const fs = require('fs')

const robotsContent = `export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/server/',
        ],
      },
    ],
    sitemap: 'https://freefincalc.net/sitemap.xml',
    host: 'https://freefincalc.net',
  }
}
`

fs.writeFileSync('app/robots.js', robotsContent, 'utf8')

console.log('✅ app/robots.js fixed')
console.log('')
console.log('Old (broken):  disallow: /_next/')
console.log('New (correct): disallow: /_next/server/ only')
console.log('')
console.log('This now allows Googlebot to load:')
console.log('  ✅ /_next/static/chunks/*.js  (your JS bundles)')
console.log('  ✅ /_next/static/css/*.css    (your styles)')
console.log('  ✅ /_next/static/media/*      (fonts, images)')
console.log('  ❌ /_next/server/*            (still blocked - internal only)')
console.log('')
console.log('Verify after deploy at: https://freefincalc.net/robots.txt')
