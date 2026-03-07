// app/equipment-loan-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Equipment Loan Calculator',
  description: 'Calculate equipment loan payments, total cost and Section 179 tax deduction. Finance business equipment accurately.',
  alternates: {
    canonical: 'https://freefincalc.net/equipment-loan-calculator',
  },
  openGraph: {
    title: 'Equipment Loan Calculator',
    description: 'Calculate equipment loan payments, total cost and Section 179 tax deduction. Finance business equipment accurately.',
    url: 'https://freefincalc.net/equipment-loan-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Equipment Loan Calculator',
    description: 'Calculate equipment loan payments, total cost and Section 179 tax deduction. Finance business equipment accurately.',
  },
}

export default function Layout({ children }) {
  return children
}
