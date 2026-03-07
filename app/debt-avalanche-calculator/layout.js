// app/debt-avalanche-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Debt Avalanche Calculator',
  description: 'Pay debts in highest-interest order to minimize total interest. Calculate payoff timeline with the avalanche method.',
  alternates: {
    canonical: 'https://freefincalc.net/debt-avalanche-calculator',
  },
  openGraph: {
    title: 'Debt Avalanche Calculator',
    description: 'Pay debts in highest-interest order to minimize total interest. Calculate payoff timeline with the avalanche method.',
    url: 'https://freefincalc.net/debt-avalanche-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Debt Avalanche Calculator',
    description: 'Pay debts in highest-interest order to minimize total interest. Calculate payoff timeline with the avalanche method.',
  },
}

export default function Layout({ children }) {
  return children
}
