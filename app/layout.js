import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import { CurrencyProvider } from '../components/CurrencyContext'

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
      <head><link rel="icon" href="/favicon.svg" type="image/svg+xml"/>
        {/* Preconnect to Google AdSense domains for faster ad loading */}
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://googleads.g.doubleclick.net" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
      </head>
      <body style={{margin:0,background:'#0f1117'}}>
        <CurrencyProvider>{children}</CurrencyProvider>

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
