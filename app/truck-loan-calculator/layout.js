// app/truck-loan-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Truck Loan Calculator',
  description: 'Calculate truck loan payments, total interest and business tax deduction. Finance a pickup or commercial truck.',
  alternates: {
    canonical: 'https://freefincalc.net/truck-loan-calculator',
  },
  openGraph: {
    title: 'Truck Loan Calculator',
    description: 'Calculate truck loan payments, total interest and business tax deduction. Finance a pickup or commercial truck.',
    url: 'https://freefincalc.net/truck-loan-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Truck Loan Calculator',
    description: 'Calculate truck loan payments, total interest and business tax deduction. Finance a pickup or commercial truck.',
  },
}

export default function Layout({ children }) {
  return children
}
