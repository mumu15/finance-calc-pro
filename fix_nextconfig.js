/**
 * node fix_nextconfig.js
 */
const fs = require('fs')

const config = `/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.freefincalc.net' }],
        destination: 'https://www.freefincalc.net/:path*',
        permanent: true,
      },
    ]
  },
  trailingSlash: false,
  compress: true,
}
module.exports = nextConfig
`

fs.writeFileSync('next.config.js', config, 'utf8')
console.log('✅ next.config.js replaced with safe version')
