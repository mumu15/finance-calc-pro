// app/debt-payoff-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Debt Payoff Calculator',
  description: 'Calculate how long to pay off any debt and compare avalanche vs snowball strategies. See interest saved with extra payments.',
  alternates: {
    canonical: 'https://freefincalc.net/debt-payoff-calculator',
  },
  openGraph: {
    title: 'Debt Payoff Calculator',
    description: 'Calculate how long to pay off any debt and compare avalanche vs snowball strategies. See interest saved with extra payments.',
    url: 'https://freefincalc.net/debt-payoff-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Debt Payoff Calculator',
    description: 'Calculate how long to pay off any debt and compare avalanche vs snowball strategies. See interest saved with extra payments.',
  },
}

export default function Layout({ children }) {
  return children
}
