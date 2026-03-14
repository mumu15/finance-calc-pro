// app/portfolio-rebalancing-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Portfolio Rebalancing Calculator',
  description: 'Calculate how to rebalance your investment portfolio to target allocations. See exact buy and sell amounts needed.',
  openGraph: {
    title: 'Portfolio Rebalancing Calculator',
    description: 'Calculate how to rebalance your investment portfolio to target allocations. See exact buy and sell amounts needed.',
    url: 'https://freefincalc.net/portfolio-rebalancing-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio Rebalancing Calculator',
    description: 'Calculate how to rebalance your investment portfolio to target allocations. See exact buy and sell amounts needed.',
  },
}

export default function Layout({ children }) {
  return children
}
