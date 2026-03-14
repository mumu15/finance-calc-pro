// app/down-payment-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Down Payment Calculator',
  description: 'Calculate how much to save for a down payment and how long it will take. See impact of different down payment amounts.',
  openGraph: {
    title: 'Down Payment Calculator',
    description: 'Calculate how much to save for a down payment and how long it will take. See impact of different down payment amounts.',
    url: 'https://www.freefincalc.net/down-payment-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Down Payment Calculator',
    description: 'Calculate how much to save for a down payment and how long it will take. See impact of different down payment amounts.',
  },
}

export default function Layout({ children }) {
  return children
}
