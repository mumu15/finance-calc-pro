// app/credit-card-minimum-payment-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Credit Card Minimum Payment Calculator',
  description: 'See how long minimum credit card payments take to pay off debt and total interest paid over time.',
  openGraph: {
    title: 'Credit Card Minimum Payment Calculator',
    description: 'See how long minimum credit card payments take to pay off debt and total interest paid over time.',
    url: 'https://www.freefincalc.net/credit-card-minimum-payment-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Credit Card Minimum Payment Calculator',
    description: 'See how long minimum credit card payments take to pay off debt and total interest paid over time.',
  },
}

export default function Layout({ children }) {
  return children
}
