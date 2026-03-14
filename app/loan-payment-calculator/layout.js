// app/loan-payment-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Loan Payment Calculator',
  description: 'Calculate monthly loan payments for any amount, rate and term. See total interest and savings from extra payments.',
  openGraph: {
    title: 'Loan Payment Calculator',
    description: 'Calculate monthly loan payments for any amount, rate and term. See total interest and savings from extra payments.',
    url: 'https://www.freefincalc.net/loan-payment-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Loan Payment Calculator',
    description: 'Calculate monthly loan payments for any amount, rate and term. See total interest and savings from extra payments.',
  },
}

export default function Layout({ children }) {
  return children
}
