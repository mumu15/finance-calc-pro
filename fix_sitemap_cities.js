/**
 * node fix_sitemap_cities.js
 * Only updates the sitemap — does NOT touch cities.js
 */
const fs = require('fs')

const slugs = [
  'new-york','los-angeles','chicago','houston','phoenix','philadelphia',
  'san-antonio','san-diego','dallas','san-jose','austin','jacksonville',
  'fort-worth','columbus','charlotte','indianapolis','san-francisco',
  'seattle','denver','nashville','oklahoma-city','el-paso','boston',
  'portland','las-vegas','memphis','louisville','baltimore','milwaukee',
  'albuquerque','tucson','fresno','sacramento','mesa','atlanta','omaha',
  'colorado-springs','raleigh','miami','tampa','orlando','minneapolis',
  'pittsburgh','st-louis','richmond','salt-lake-city','kansas-city',
  'cincinnati','detroit'
]

let sitemap = ''
try { sitemap = fs.readFileSync('public/sitemap.xml', 'utf8') } catch(e) {}

if (sitemap && !sitemap.includes('mortgage-calculator/new-york')) {
  const entries = slugs.map(s => `  <url>
    <loc>https://www.freefincalc.net/mortgage-calculator/${s}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')
  sitemap = sitemap.replace('</urlset>', entries + '\n</urlset>')
  fs.writeFileSync('public/sitemap.xml', sitemap, 'utf8')
  console.log('✅ sitemap.xml updated with 50 city pages')
} else {
  console.log('ℹ️  sitemap already has city pages or not found')
}

console.log('✅ Done — now run: git add -A && git commit -m "feat: city pages" && vercel --prod')
