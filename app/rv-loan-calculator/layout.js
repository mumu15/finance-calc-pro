// app/rv-loan-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'RV Loan Calculator',
  description: 'Calculate RV loan monthly payments, total interest and true ownership cost. Finance a motorhome or travel trailer.',
  openGraph: {
    title: 'RV Loan Calculator',
    description: 'Calculate RV loan monthly payments, total interest and true ownership cost. Finance a motorhome or travel trailer.',
    url: 'https://freefincalc.net/rv-loan-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RV Loan Calculator',
    description: 'Calculate RV loan monthly payments, total interest and true ownership cost. Finance a motorhome or travel trailer.',
  },
}

export default function Layout({ children }) {
  return children
}
