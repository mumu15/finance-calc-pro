// app/cost-of-living-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Cost of Living Calculator',
  description: 'Compare cost of living between cities. See how much salary you need in a new city to maintain your current lifestyle.',
  alternates: {
    canonical: 'https://freefincalc.net/cost-of-living-calculator',
  },
  openGraph: {
    title: 'Cost of Living Calculator',
    description: 'Compare cost of living between cities. See how much salary you need in a new city to maintain your current lifestyle.',
    url: 'https://freefincalc.net/cost-of-living-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cost of Living Calculator',
    description: 'Compare cost of living between cities. See how much salary you need in a new city to maintain your current lifestyle.',
  },
}

export default function Layout({ children }) {
  return children
}
