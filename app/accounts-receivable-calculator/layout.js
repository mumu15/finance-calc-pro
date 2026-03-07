// app/accounts-receivable-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Accounts Receivable Calculator',
  description: 'Calculate Days Sales Outstanding (DSO), AR turnover and carrying cost. Measure and improve your cash collection.',
  alternates: {
    canonical: 'https://freefincalc.net/accounts-receivable-calculator',
  },
  openGraph: {
    title: 'Accounts Receivable Calculator',
    description: 'Calculate Days Sales Outstanding (DSO), AR turnover and carrying cost. Measure and improve your cash collection.',
    url: 'https://freefincalc.net/accounts-receivable-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Accounts Receivable Calculator',
    description: 'Calculate Days Sales Outstanding (DSO), AR turnover and carrying cost. Measure and improve your cash collection.',
  },
}

export default function Layout({ children }) {
  return children
}
