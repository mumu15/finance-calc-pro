// app/student-loan-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Student Loan Calculator',
  description: 'Calculate student loan monthly payments, total interest and payoff timeline. Compare repayment plans and see how extra payments help.',
  openGraph: {
    title: 'Student Loan Calculator',
    description: 'Calculate student loan monthly payments, total interest and payoff timeline. Compare repayment plans and see how extra payments help.',
    url: 'https://freefincalc.net/student-loan-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Student Loan Calculator',
    description: 'Calculate student loan monthly payments, total interest and payoff timeline. Compare repayment plans and see how extra payments help.',
  },
}

export default function Layout({ children }) {
  return children
}
