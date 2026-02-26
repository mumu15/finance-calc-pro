import './globals.css'

export const metadata = {
  metadataBase: new URL('https://www.freefincalc.net'),
  title: {
    default: 'FinCalc Pro – Free Financial Calculators Online',
    template: '%s | FinCalc Pro'
  },
  description: 'Free professional financial calculators. Mortgage, loan, compound interest, retirement, savings, and tax calculators. Get instant accurate results.',
  keywords: ['financial calculator', 'mortgage calculator', 'loan calculator', 'compound interest calculator', 'retirement calculator', 'savings calculator'],
  authors: [{ name: 'FinCalc Pro' }],
  creator: 'FinCalc Pro',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.freefincalc.net',
    siteName: 'FinCalc Pro',
    title: 'FinCalc Pro – Free Financial Calculators Online',
    description: 'Free professional financial calculators for mortgage, loans, savings, retirement, and more.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FinCalc Pro – Free Financial Calculators',
    description: 'Professional financial calculators — free, fast, accurate.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8934829211507329" crossOrigin="anonymous"></script>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
