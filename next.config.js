/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'freefincalc.net' }],
        destination: 'https://www.freefincalc.net/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig