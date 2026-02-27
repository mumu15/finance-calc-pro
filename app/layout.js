import './globals.css'

export const metadata = {
  metadataBase: new URL('https://www.freefincalc.net'),
  title: {
    default: 'FreeFinCalc.net – Free Financial Calculators',
    template: '%s | FreeFinCalc.net'
  },
  description: 'Free professional financial calculators. Mortgage calculator, loan calculator, compound interest, savings, retirement and tax calculators. Instant results, no sign up.',
  keywords: ['mortgage calculator', 'loan calculator', 'compound interest calculator', 'savings calculator', 'retirement calculator', 'tax calculator', 'free financial calculators'],
  authors: [{ name: 'FreeFinCalc.net' }],
  creator: 'FreeFinCalc.net',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.freefincalc.net',
    siteName: 'FreeFinCalc.net',
    title: 'FreeFinCalc.net – Free Financial Calculators',
    description: 'Free professional financial calculators. Mortgage calculator, loan calculator, compound interest, savings, retirement and tax calculators. Instant results, no sign up.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FreeFinCalc.net – Free Financial Calculators',
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
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FreeFinCalc.net",
    "url": "https://www.freefincalc.net",
    "description": "Free professional financial calculators for mortgages, compound interest, loans, savings, retirement planning, and tax estimation.",
  }

  return (
    <html lang="en">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8934829211507329" crossOrigin="anonymous"></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}