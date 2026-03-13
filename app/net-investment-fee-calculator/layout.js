// app/net-investment-fee-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Investment Fee Calculator',
  description: 'Calculate the true cost of investment fees over time. See how expense ratios drain your retirement savings.',
  openGraph: {
    title: 'Investment Fee Calculator',
    description: 'Calculate the true cost of investment fees over time. See how expense ratios drain your retirement savings.',
    url: 'https://freefincalc.net/net-investment-fee-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Investment Fee Calculator',
    description: 'Calculate the true cost of investment fees over time. See how expense ratios drain your retirement savings.',
  },
}

export default function Layout({ children }) {
  return children
}
