const fs = require('fs');

// ─── FIX 1: layout.js ─────────────────────────────────────────────────────
const ffcLayout = `import './globals.css'
import Script from 'next/script'

export const metadata = {
  metadataBase: new URL('https://freefincalc.net'),
  title: {
    default: 'FreeFinCalc.net — Free Financial Calculators',
    template: '%s | FreeFinCalc.net'
  },
  description: 'Free professional financial calculators. Mortgage calculator, loan calculator, compound interest, savings, retirement and tax calculators. Instant results, no sign up.',
  keywords: ['mortgage calculator', 'loan calculator', 'compound interest calculator', 'savings calculator', 'retirement calculator', 'tax calculator', 'free financial calculators'],
  authors: [{ name: 'FreeFinCalc.net' }],
  creator: 'FreeFinCalc.net',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://freefincalc.net',
    siteName: 'FreeFinCalc.net',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'FreeFinCalc.net - Free Personal Finance Calculators' }],
    title: 'FreeFinCalc.net — Free Financial Calculators',
    description: 'Free professional financial calculators. Mortgage calculator, loan calculator, compound interest, savings, retirement and tax calculators. Instant results, no sign up.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FreeFinCalc.net — Free Financial Calculators',
    description: 'Free professional financial calculators. Mortgage, loan, savings, retirement and tax calculators. No sign up.',
    site: '@freefincalc',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* Google Analytics — loads after page is interactive, does NOT block render */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HYY72T4W5T"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {\`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HYY72T4W5T');
          \`}
        </Script>
        {/* AdSense — loads after page is interactive, does NOT block render */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8934829211507329"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  )
}
`;

// ─── FIX 2: next.config.js ────────────────────────────────────────────────
const ffcConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|css|js)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'freefincalc.net' }],
        destination: 'https://freefincalc.net/:path*',
        permanent: true,
      },
    ]
  },
}
module.exports = nextConfig
`;

// ─── FIX 3: sitemap.xml ───────────────────────────────────────────────────
const ffcSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- Homepage -->
  <url><loc>https://freefincalc.net/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>

  <!-- Calculators -->
  <url><loc>https://freefincalc.net/mortgage-calculator</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://freefincalc.net/loan-calculator</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://freefincalc.net/compound-interest</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://freefincalc.net/debt-payoff-calculator</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://freefincalc.net/budget-calculator</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://freefincalc.net/retirement-calculator</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://freefincalc.net/net-worth-calculator</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://freefincalc.net/savings-calculator</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://freefincalc.net/inflation-calculator</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://freefincalc.net/emergency-fund-calculator</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://freefincalc.net/tax-calculator</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://freefincalc.net/rent-vs-buy-calculator</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>

  <!-- Blog Index -->
  <url><loc>https://freefincalc.net/blog</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>

  <!-- Original Blog Posts -->
  <url><loc>https://freefincalc.net/blog/how-to-calculate-mortgage-payment</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://freefincalc.net/blog/how-to-calculate-loan-payment</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://freefincalc.net/blog/how-to-calculate-net-worth</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://freefincalc.net/blog/how-to-create-monthly-budget</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://freefincalc.net/blog/how-to-build-emergency-fund</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://freefincalc.net/blog/how-to-pay-off-debt-fast</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://freefincalc.net/blog/how-to-lower-tax-bill</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://freefincalc.net/blog/how-much-to-save-for-retirement</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://freefincalc.net/blog/debt-snowball-vs-avalanche</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://freefincalc.net/blog/how-does-inflation-affect-savings</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://freefincalc.net/blog/rent-vs-buy-home</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://freefincalc.net/blog/what-is-compound-interest</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>

  <!-- New Blog Posts -->
  <url><loc>https://freefincalc.net/blog/how-to-save-money-fast</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://freefincalc.net/blog/what-is-a-good-credit-score</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://freefincalc.net/blog/how-to-invest-for-beginners</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://freefincalc.net/blog/how-to-get-out-of-debt</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://freefincalc.net/blog/how-much-house-can-i-afford</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://freefincalc.net/blog/types-of-retirement-accounts</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://freefincalc.net/blog/how-to-budget-50-30-20</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://freefincalc.net/blog/how-personal-loans-work</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://freefincalc.net/blog/what-is-net-worth</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://freefincalc.net/blog/how-to-negotiate-salary</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://freefincalc.net/blog/how-inflation-works</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://freefincalc.net/blog/what-is-an-emergency-fund</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://freefincalc.net/blog/how-student-loans-work</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://freefincalc.net/blog/how-to-read-pay-stub</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://freefincalc.net/blog/how-to-build-wealth</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://freefincalc.net/blog/how-to-refinance-mortgage</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://freefincalc.net/blog/how-to-max-out-roth-ira</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://freefincalc.net/blog/how-car-loans-work</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://freefincalc.net/blog/what-is-passive-income</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>

</urlset>
`;

// ─── FIX 4: robots.txt ────────────────────────────────────────────────────
const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://freefincalc.net/sitemap.xml
`;

// ─── Write all FFC files ──────────────────────────────────────────────────
fs.writeFileSync('app/layout.js', ffcLayout, 'utf8');
console.log('✅ layout.js — scripts moved to afterInteractive (fixes LCP)');

fs.writeFileSync('next.config.js', ffcConfig, 'utf8');
console.log('✅ next.config.js — image cache TTL fixed to 1 year + security headers');

fs.writeFileSync('public/sitemap.xml', ffcSitemap, 'utf8');
console.log('✅ public/sitemap.xml — created with all 44 pages');

fs.writeFileSync('public/robots.txt', robotsTxt, 'utf8');
console.log('✅ public/robots.txt — updated with sitemap reference');

console.log('\n🎉 FFC technical SEO fixes complete!');
console.log('📋 Summary of improvements:');
console.log('   1. Scripts deferred → faster LCP (Core Web Vitals)');
console.log('   2. Image cache → 1 year (less re-fetching)');
console.log('   3. sitemap.xml → all 44 pages indexed faster');
console.log('   4. robots.txt → points Google to sitemap');
console.log('   5. Security headers → X-Frame-Options added');
