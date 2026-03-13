// app/fuel-cost-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Fuel Cost Calculator',
  description: 'Calculate annual fuel costs for any vehicle based on MPG, miles driven and gas prices. Compare fuel economy savings.',
  openGraph: {
    title: 'Fuel Cost Calculator',
    description: 'Calculate annual fuel costs for any vehicle based on MPG, miles driven and gas prices. Compare fuel economy savings.',
    url: 'https://freefincalc.net/fuel-cost-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fuel Cost Calculator',
    description: 'Calculate annual fuel costs for any vehicle based on MPG, miles driven and gas prices. Compare fuel economy savings.',
  },
}

export default function Layout({ children }) {
  return children
}
