// app/debt-snowball-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Debt Snowball Calculator',
  description: 'Pay smallest debts first to build momentum. Calculate debt snowball payoff timeline and total interest paid.',
  alternates: {
    canonical: 'https://freefincalc.net/debt-snowball-calculator',
  },
  openGraph: {
    title: 'Debt Snowball Calculator',
    description: 'Pay smallest debts first to build momentum. Calculate debt snowball payoff timeline and total interest paid.',
    url: 'https://freefincalc.net/debt-snowball-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Debt Snowball Calculator',
    description: 'Pay smallest debts first to build momentum. Calculate debt snowball payoff timeline and total interest paid.',
  },
}

export default function Layout({ children }) {
  return children
}
