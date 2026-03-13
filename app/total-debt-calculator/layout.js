// app/total-debt-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Total Debt Calculator',
  description: 'Add up all your debts and calculate debt-to-income ratio. See total interest burden and create a debt payoff plan.',
  openGraph: {
    title: 'Total Debt Calculator',
    description: 'Add up all your debts and calculate debt-to-income ratio. See total interest burden and create a debt payoff plan.',
    url: 'https://freefincalc.net/total-debt-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Total Debt Calculator',
    description: 'Add up all your debts and calculate debt-to-income ratio. See total interest burden and create a debt payoff plan.',
  },
}

export default function Layout({ children }) {
  return children
}
