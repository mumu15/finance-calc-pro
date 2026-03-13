// app/sba-loan-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'SBA Loan Calculator',
  description: 'Calculate SBA 7(a) and 504 loan payments, guarantee fees and total cost. Plan your small business SBA financing.',
  openGraph: {
    title: 'SBA Loan Calculator',
    description: 'Calculate SBA 7(a) and 504 loan payments, guarantee fees and total cost. Plan your small business SBA financing.',
    url: 'https://freefincalc.net/sba-loan-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SBA Loan Calculator',
    description: 'Calculate SBA 7(a) and 504 loan payments, guarantee fees and total cost. Plan your small business SBA financing.',
  },
}

export default function Layout({ children }) {
  return children
}
