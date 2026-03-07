export default function robots() {
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
