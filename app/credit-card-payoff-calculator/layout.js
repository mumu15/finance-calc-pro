// app/credit-card-payoff-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Credit Card Payoff Calculator',
  description: 'Calculate how long to pay off your credit card and total interest paid. Compare minimum payments vs fixed payments.',
  openGraph: {
    title: 'Credit Card Payoff Calculator',
    description: 'Calculate how long to pay off your credit card and total interest paid. Compare minimum payments vs fixed payments.',
    url: 'https://freefincalc.net/credit-card-payoff-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Credit Card Payoff Calculator',
    description: 'Calculate how long to pay off your credit card and total interest paid. Compare minimum payments vs fixed payments.',
  },
}

export default function Layout({ children }) {
  return children
}
