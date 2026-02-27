import './globals.css'

export const metadata = {
  metadataBase: new URL('https://www.freefincalc.net'),
  title: {
    default: 'FreeFinCalc.net – Free Financial Calculators',
    template: '%s | FreeFinCalc.net'
  },
  description: 'Free professional financial calculators. Mortgage calculator, loan calculator, compound interest, savings, retirement and tax calculators. Instant results, no sign up.',
  keywords: ['mortgage calculator', 'loan calculator', 'compound interest calculator', 'savings calculator', 'retirement calculator', 'tax calculator'],
  icons: {
    icon: '/favicon.svg',
  },
  robots: { index: true, follow: true }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8934829211507329" crossOrigin="anonymous"></script>
      </head>
      <body>{children}</body>
    </html>
  )
}