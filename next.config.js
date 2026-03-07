/** @type {import('next').NextConfig} */
const nextConfig = {
  // www → non-www redirect
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

  // Cache static assets aggressively
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options',    value: 'nosniff' },
          { key: 'X-Frame-Options',           value: 'DENY' },
          { key: 'X-XSS-Protection',          value: '1; mode=block' },
          { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        // Cache all static files for 1 year
        source: '/(.*)\.(ico|png|jpg|jpeg|svg|woff|woff2|ttf|otf|css|js)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },

  // No trailing slashes
  trailingSlash: false,

  // Compress responses
  compress: true,

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },

  // Reduce bundle size — remove unused locales
  i18n: undefined,

  // Experimental: optimize package imports
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig
