// app/car-loan-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Car Loan Calculator',
  description: 'Calculate monthly car loan payments, total interest and true cost of financing. Compare loan terms and down payments.',
  openGraph: {
    title: 'Car Loan Calculator',
    description: 'Calculate monthly car loan payments, total interest and true cost of financing. Compare loan terms and down payments.',
    url: 'https://www.freefincalc.net/car-loan-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Car Loan Calculator',
    description: 'Calculate monthly car loan payments, total interest and true cost of financing. Compare loan terms and down payments.',
  },
}

export default function Layout({ children }) {
  return children
}
