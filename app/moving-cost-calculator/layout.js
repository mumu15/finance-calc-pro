// app/moving-cost-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Moving Cost Calculator',
  description: 'Estimate total moving costs including movers, truck rental, packing and travel. Budget your relocation accurately.',
  alternates: {
    canonical: 'https://freefincalc.net/moving-cost-calculator',
  },
  openGraph: {
    title: 'Moving Cost Calculator',
    description: 'Estimate total moving costs including movers, truck rental, packing and travel. Budget your relocation accurately.',
    url: 'https://freefincalc.net/moving-cost-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moving Cost Calculator',
    description: 'Estimate total moving costs including movers, truck rental, packing and travel. Budget your relocation accurately.',
  },
}

export default function Layout({ children }) {
  return children
}
