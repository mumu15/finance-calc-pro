// app/boat-loan-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Boat Loan Calculator',
  description: 'Calculate monthly boat loan payments, total interest and annual ownership cost. Finance any boat with confidence.',
  openGraph: {
    title: 'Boat Loan Calculator',
    description: 'Calculate monthly boat loan payments, total interest and annual ownership cost. Finance any boat with confidence.',
    url: 'https://freefincalc.net/boat-loan-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Boat Loan Calculator',
    description: 'Calculate monthly boat loan payments, total interest and annual ownership cost. Finance any boat with confidence.',
  },
}

export default function Layout({ children }) {
  return children
}
