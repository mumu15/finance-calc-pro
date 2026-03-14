// app/loan-comparison-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Loan Comparison Calculator',
  description: 'Compare two loans side by side on monthly payment, total interest and overall cost. Find the best loan offer instantly.',
  openGraph: {
    title: 'Loan Comparison Calculator',
    description: 'Compare two loans side by side on monthly payment, total interest and overall cost. Find the best loan offer instantly.',
    url: 'https://freefincalc.net/loan-comparison-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Loan Comparison Calculator',
    description: 'Compare two loans side by side on monthly payment, total interest and overall cost. Find the best loan offer instantly.',
  },
}

export default function Layout({ children }) {
  return children
}
