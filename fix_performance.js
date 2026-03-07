/**
 * FreeFinCalc.net — Lighthouse Performance Fixes
 * node fix_performance.js
 *
 * Fixes these common Next.js performance killers:
 * 1. next.config.js — compression, image optimization, bundle splitting
 * 2. AdSense script — defer loading so it doesn't block render
 * 3. Font loading — font-display: swap to prevent FOIT
 * 4. AdUnit component — lazy load below fold ads
 * 5. Root layout — remove render-blocking patterns
 */

const fs = require('fs')
const path = require('path')

// ─────────────────────────────────────────────────────────────
// 1. NEXT.CONFIG.JS — performance headers + optimization
// ─────────────────────────────────────────────────────────────
const nextConfig = `/** @type {import('next').NextConfig} */
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
        source: '/(.*)\\.(ico|png|jpg|jpeg|svg|woff|woff2|ttf|otf|css|js)',
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
`
fs.writeFileSync('next.config.js', nextConfig, 'utf8')
console.log('✅ next.config.js optimized')


// ─────────────────────────────────────────────────────────────
// 2. ROOT LAYOUT — fix font loading + defer AdSense
// ─────────────────────────────────────────────────────────────
const rootLayout = `import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

// font-display: swap prevents FOIT (flash of invisible text)
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

export const metadata = {
  metadataBase: new URL('https://freefincalc.net'),
  title: 'Free Financial Calculators — FreeFinCalc.net',
  description: 'Free online financial calculators for mortgage, loans, retirement, investments, taxes and more. 124 calculators, instant results, no sign-up required.',
  keywords: 'financial calculator, mortgage calculator, loan calculator, retirement calculator, investment calculator',
  authors: [{ name: 'FreeFinCalc' }],
  creator: 'FreeFinCalc',
  openGraph: {
    title: 'Free Financial Calculators — FreeFinCalc.net',
    description: '124 free financial calculators. Mortgage, loans, retirement, investments, taxes and more.',
    url: 'https://freefincalc.net',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Free Financial Calculators — FreeFinCalc.net',
    description: '124 free financial calculators. Mortgage, loans, retirement, investments, taxes and more.',
  },
  alternates: {
    canonical: 'https://freefincalc.net',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        {/* Preconnect to Google AdSense domains for faster ad loading */}
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://googleads.g.doubleclick.net" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
      </head>
      <body style={{margin:0,background:'#0f1117'}}>
        {children}

        {/* AdSense — afterInteractive so it never blocks First Contentful Paint */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8934829211507329"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
`
fs.writeFileSync('app/layout.js', rootLayout, 'utf8')
console.log('✅ Root layout.js optimized (font-display:swap, AdSense deferred)')


// ─────────────────────────────────────────────────────────────
// 3. ADUNIT COMPONENT — lazy load with Intersection Observer
//    Ads only load when they scroll into view
// ─────────────────────────────────────────────────────────────
const adUnit = `'use client'
import { useEffect, useRef, useState } from 'react'

export default function AdUnit({ slot, format = 'auto', style = {} }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [pushed, setPushed] = useState(false)

  // Only load ad when it enters the viewport (Intersection Observer)
  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { rootMargin: '200px' } // start loading 200px before visible
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  // Push ad unit once visible and adsbygoogle is loaded
  useEffect(() => {
    if (!visible || pushed) return
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
        setPushed(true)
      } else {
        // adsbygoogle not ready yet — wait for it
        const timer = setTimeout(() => {
          try {
            ;(window.adsbygoogle = window.adsbygoogle || []).push({})
            setPushed(true)
          } catch (e) {}
        }, 1000)
        return () => clearTimeout(timer)
      }
    } catch (e) {}
  }, [visible, pushed])

  return (
    <div
      ref={ref}
      style={{
        minHeight: 90,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '16px 0',
        ...style,
      }}
    >
      {visible && (
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', ...style }}
          data-ad-client="ca-pub-8934829211507329"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      )}
    </div>
  )
}
`
fs.writeFileSync('components/AdUnit.js', adUnit, 'utf8')
console.log('✅ AdUnit.js — lazy loads with IntersectionObserver')


// ─────────────────────────────────────────────────────────────
// 4. GLOBALS.CSS — critical performance CSS additions
// ─────────────────────────────────────────────────────────────
let globalsCss = ''
try {
  globalsCss = fs.readFileSync('app/globals.css', 'utf8')
} catch (e) {
  globalsCss = ''
}

const perfCss = `
/* ── Performance: reduce layout shift ────────────────────── */
* { box-sizing: border-box; }

/* Prevent image layout shift */
img { height: auto; max-width: 100%; }

/* Smooth scrolling */
html { scroll-behavior: smooth; }

/* Prevent invisible text during font load */
html { font-display: swap; }

/* Reduce motion for accessibility + performance */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* Content-visibility: auto for off-screen sections (huge perf win) */
.ffc-section-lazy {
  content-visibility: auto;
  contain-intrinsic-size: 0 500px;
}
`

if (!globalsCss.includes('content-visibility')) {
  globalsCss += perfCss
  fs.writeFileSync('app/globals.css', globalsCss, 'utf8')
  console.log('✅ globals.css — performance CSS added')
}


// ─────────────────────────────────────────────────────────────
// 5. CREATE vercel.json — edge caching config
// ─────────────────────────────────────────────────────────────
const vercelJson = {
  headers: [
    {
      source: "/(.*)\\.(js|css|woff|woff2|png|jpg|ico|svg)",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" }
      ]
    },
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" }
      ]
    }
  ],
  regions: ["iad1", "cdg1", "sin1", "syd1", "hnd1"],
  framework: "nextjs"
}

fs.writeFileSync('vercel.json', JSON.stringify(vercelJson, null, 2), 'utf8')
console.log('✅ vercel.json — edge regions + cache headers')


console.log(`
╔══════════════════════════════════════════════════════════╗
║   PERFORMANCE FIXES COMPLETE                             ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  Expected Lighthouse improvements:                       ║
║                                                          ║
║  🚀 FCP (First Contentful Paint)                         ║
║     AdSense now loads afterInteractive — no blocking     ║
║                                                          ║
║  🚀 LCP (Largest Contentful Paint)                       ║
║     Font-display:swap — text shows immediately           ║
║                                                          ║
║  🚀 TBT (Total Blocking Time)                            ║
║     Ads lazy-load via IntersectionObserver               ║
║                                                          ║
║  🚀 CLS (Cumulative Layout Shift)                        ║
║     AdUnit has fixed minHeight — no layout jump          ║
║                                                          ║
║  🚀 TTI (Time to Interactive)                            ║
║     content-visibility:auto on off-screen sections       ║
║                                                          ║
║  🚀 Caching                                              ║
║     Static assets cached 1 year, edge regions added      ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
`)
