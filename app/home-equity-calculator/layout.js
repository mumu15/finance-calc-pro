// app/home-equity-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Home Equity Calculator',
  description: 'Calculate your current home equity, loan-to-value ratio and available equity for a HELOC or cash-out refinance.',
  openGraph: {
    title: 'Home Equity Calculator',
    description: 'Calculate your current home equity, loan-to-value ratio and available equity for a HELOC or cash-out refinance.',
    url: 'https://www.freefincalc.net/home-equity-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home Equity Calculator',
    description: 'Calculate your current home equity, loan-to-value ratio and available equity for a HELOC or cash-out refinance.',
  },
}

export default function Layout({ children }) {
  return children
}
