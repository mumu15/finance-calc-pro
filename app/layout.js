import './globals.css'
import { CurrencyProvider } from '../components/CurrencyContext'

export const metadata = {
  metadataBase: new URL('https://www.freefincalc.net'),
  title: { default: 'FreeFinCalc.net — Free Financial Calculators', template: '%s | FreeFinCalc.net' },
  description: 'Free professional financial calculators in 40+ currencies. Loans, debt, investing, salary, tax and more. Instant results. PDF download. No sign up.',
  keywords: ['free financial calculator','mortgage calculator','loan calculator','compound interest','debt payoff','salary calculator','tax calculator'],
  authors: [{ name: 'FreeFinCalc.net' }],
  robots: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  openGraph: { type: 'website', locale: 'en_US', url: 'https://www.freefincalc.net', siteName: 'FreeFinCalc.net' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
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
