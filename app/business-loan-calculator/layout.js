// app/business-loan-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Business Loan Calculator',
  description: 'Calculate business loan payments, total interest and true borrowing cost. Compare loan options for your small business.',
  openGraph: {
    title: 'Business Loan Calculator',
    description: 'Calculate business loan payments, total interest and true borrowing cost. Compare loan options for your small business.',
    url: 'https://freefincalc.net/business-loan-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Business Loan Calculator',
    description: 'Calculate business loan payments, total interest and true borrowing cost. Compare loan options for your small business.',
  },
}

export default function Layout({ children }) {
  return children
}
