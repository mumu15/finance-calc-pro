// app/savings-interest-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Savings Interest Calculator',
  description: 'Calculate savings account interest earnings over time. Compare rates and see how compound interest grows your money.',
  alternates: {
    canonical: 'https://freefincalc.net/savings-interest-calculator',
  },
  openGraph: {
    title: 'Savings Interest Calculator',
    description: 'Calculate savings account interest earnings over time. Compare rates and see how compound interest grows your money.',
    url: 'https://freefincalc.net/savings-interest-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Savings Interest Calculator',
    description: 'Calculate savings account interest earnings over time. Compare rates and see how compound interest grows your money.',
  },
}

export default function Layout({ children }) {
  return children
}
