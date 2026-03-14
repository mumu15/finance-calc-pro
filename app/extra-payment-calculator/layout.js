// app/extra-payment-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Extra Mortgage Payment Calculator',
  description: 'Calculate interest savings and time saved from extra mortgage payments. See payoff date with any additional amount.',
  openGraph: {
    title: 'Extra Mortgage Payment Calculator',
    description: 'Calculate interest savings and time saved from extra mortgage payments. See payoff date with any additional amount.',
    url: 'https://www.freefincalc.net/extra-payment-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Extra Mortgage Payment Calculator',
    description: 'Calculate interest savings and time saved from extra mortgage payments. See payoff date with any additional amount.',
  },
}

export default function Layout({ children }) {
  return children
}
