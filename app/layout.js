import './globals.css'
import { CurrencyProvider } from '../components/CurrencyContext'

export const metadata = {
  metadataBase: new URL('https://freefincalc.net'),
  title: {
    default: 'FreeFinCalc — 100+ Free Financial Calculators',
    template: '%s | FreeFinCalc',
  },
  description: 'Free financial calculators for mortgage, tax, retirement, investing, budgeting and more. 100+ calculators, 40+ currencies, no sign-up required.',
  keywords: ['financial calculator','mortgage calculator','tax calculator','retirement calculator','investment calculator','loan calculator','budget calculator','free finance tools'],
  authors: [{ name: 'FreeFinCalc' }],
  creator: 'FreeFinCalc',
  publisher: 'FreeFinCalc',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://freefincalc.net',
    siteName: 'FreeFinCalc',
    title: 'FreeFinCalc — 100+ Free Financial Calculators',
    description: 'Free financial calculators for mortgage, tax, retirement, investing and budgeting. No sign-up required.',
    images: [{ url: 'https://freefincalc.net/og-image.png', width: 1200, height: 630, alt: 'FreeFinCalc' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FreeFinCalc — 100+ Free Financial Calculators',
    description: 'Free financial calculators. 40+ currencies. No sign-up.',
    images: ['https://freefincalc.net/og-image.png'],
  },
  alternates: { canonical: 'https://freefincalc.net' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8934829211507329"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"Organization","name":"FreeFinCalc","url":"https://freefincalc.net","logo":"https://freefincalc.net/icon.png","description":"Free financial calculators for mortgage, tax, retirement, investing and more. 100+ calculators, 40+ currencies."}` }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"WebSite","name":"FreeFinCalc","url":"https://freefincalc.net","description":"100+ free financial calculators. No sign-up required.","potentialAction":{"@type":"SearchAction","target":{"@type":"EntryPoint","urlTemplate":"https://freefincalc.net/?q={search_term_string}"},"query-input":"required name=search_term_string"}}` }}
        />        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet" />
      </head>
      <body>
        <CurrencyProvider>
          {children}
        </CurrencyProvider>
      </body>
    </html>
  )
}
