import './globals.css'

export const metadata = {
  metadataBase: new URL('https://www.freefincalc.net'),
  title: {
    default: 'FreeFinCalc.net — 100 Free Financial Calculators in 40+ Currencies',
    template: '%s | FreeFinCalc.net',
  },
  description:
    '100 free professional financial calculators: loans, debt, investing, salary, tax, business and more. Works in 40+ currencies. Instant results, PDF download, no sign up.',
  keywords: [
    'financial calculator', 'free calculator', 'mortgage calculator',
    'loan calculator', 'debt payoff calculator', 'compound interest calculator',
    'salary calculator', 'tax calculator', 'retirement calculator',
    'investment calculator', 'budget calculator',
  ],
  authors: [{ name: 'FreeFinCalc.net', url: 'https://www.freefincalc.net' }],
  creator: 'FreeFinCalc.net',
  publisher: 'FreeFinCalc.net',
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.freefincalc.net',
    siteName: 'FreeFinCalc.net',
    title: 'FreeFinCalc.net — 100 Free Financial Calculators',
    description: '100 free professional financial calculators in 40+ currencies. Loans, debt, investing, salary, tax and more.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'FreeFinCalc.net' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FreeFinCalc.net — 100 Free Financial Calculators',
    description: '100 free professional calculators. No sign up. Instant results. PDF download.',
    images: ['/og-image.png'],
  },
  alternates: { canonical: 'https://www.freefincalc.net' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'DM Sans', sans-serif" }}>{children}</body>
    </html>
  )
}
