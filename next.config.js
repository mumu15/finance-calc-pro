/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.freefincalc.net' }],
        destination: 'https://freefincalc.net/:path*',
        permanent: true,
      },
    ]
  },
  trailingSlash: false,
  compress: true,
}
module.exports = nextConfig
