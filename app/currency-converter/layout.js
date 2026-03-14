// app/currency-converter/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Currency Converter',
  description: 'Convert between 40+ currencies with live exchange rates. Free currency converter for travel, business and international payments.',
  openGraph: {
    title: 'Currency Converter',
    description: 'Convert between 40+ currencies with live exchange rates. Free currency converter for travel, business and international payments.',
    url: 'https://www.freefincalc.net/currency-converter',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Currency Converter',
    description: 'Convert between 40+ currencies with live exchange rates. Free currency converter for travel, business and international payments.',
  },
}

export default function Layout({ children }) {
  return children
}
