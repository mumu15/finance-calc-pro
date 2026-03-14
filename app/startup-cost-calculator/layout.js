// app/startup-cost-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Startup Cost Calculator',
  description: 'Estimate total startup costs, funding needed and months to break even. Plan your new business finances accurately.',
  openGraph: {
    title: 'Startup Cost Calculator',
    description: 'Estimate total startup costs, funding needed and months to break even. Plan your new business finances accurately.',
    url: 'https://www.freefincalc.net/startup-cost-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Startup Cost Calculator',
    description: 'Estimate total startup costs, funding needed and months to break even. Plan your new business finances accurately.',
  },
}

export default function Layout({ children }) {
  return children
}
