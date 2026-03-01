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
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'FreeFinCalc.net - Free Personal Finance Calculators' }],
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
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-HYY72T4W5T"></script>
        <script dangerouslySetInnerHTML={{__html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-HYY72T4W5T');
        `}} />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8934829211507329" crossOrigin="anonymous"></script>
      </head>
      <body>{children}</body>
    </html>
  )
}