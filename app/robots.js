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
    sitemap: 'https://www.freefincalc.net/sitemap.xml',
    host: 'https://www.freefincalc.net',
  }
}
