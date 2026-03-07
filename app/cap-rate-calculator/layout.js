// app/cap-rate-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Cap Rate Calculator',
  description: 'Calculate capitalization rate for any rental property. Use cap rate to compare and value investment properties.',
  alternates: {
    canonical: 'https://freefincalc.net/cap-rate-calculator',
  },
  openGraph: {
    title: 'Cap Rate Calculator',
    description: 'Calculate capitalization rate for any rental property. Use cap rate to compare and value investment properties.',
    url: 'https://freefincalc.net/cap-rate-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cap Rate Calculator',
    description: 'Calculate capitalization rate for any rental property. Use cap rate to compare and value investment properties.',
  },
}

export default function Layout({ children }) {
  return children
}
