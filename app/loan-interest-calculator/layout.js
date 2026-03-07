// app/loan-interest-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Loan Interest Calculator',
  description: 'Calculate total interest paid on any loan. Compare simple vs compound interest and see true cost of borrowing.',
  alternates: {
    canonical: 'https://freefincalc.net/loan-interest-calculator',
  },
  openGraph: {
    title: 'Loan Interest Calculator',
    description: 'Calculate total interest paid on any loan. Compare simple vs compound interest and see true cost of borrowing.',
    url: 'https://freefincalc.net/loan-interest-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Loan Interest Calculator',
    description: 'Calculate total interest paid on any loan. Compare simple vs compound interest and see true cost of borrowing.',
  },
}

export default function Layout({ children }) {
  return children
}
