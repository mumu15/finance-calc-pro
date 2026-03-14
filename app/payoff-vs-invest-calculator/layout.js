// app/payoff-vs-invest-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Pay Off Debt vs Invest Calculator',
  description: 'Should you pay off debt or invest? Compare the financial impact of each strategy to make the optimal money decision.',
  openGraph: {
    title: 'Pay Off Debt vs Invest Calculator',
    description: 'Should you pay off debt or invest? Compare the financial impact of each strategy to make the optimal money decision.',
    url: 'https://www.freefincalc.net/payoff-vs-invest-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pay Off Debt vs Invest Calculator',
    description: 'Should you pay off debt or invest? Compare the financial impact of each strategy to make the optimal money decision.',
  },
}

export default function Layout({ children }) {
  return children
}
