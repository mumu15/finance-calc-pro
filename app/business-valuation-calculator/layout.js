// app/business-valuation-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Business Valuation Calculator',
  description: 'Estimate your business value using multiple methods: revenue multiple, EBITDA multiple and discounted cash flow.',
  alternates: {
    canonical: 'https://freefincalc.net/business-valuation-calculator',
  },
  openGraph: {
    title: 'Business Valuation Calculator',
    description: 'Estimate your business value using multiple methods: revenue multiple, EBITDA multiple and discounted cash flow.',
    url: 'https://freefincalc.net/business-valuation-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Business Valuation Calculator',
    description: 'Estimate your business value using multiple methods: revenue multiple, EBITDA multiple and discounted cash flow.',
  },
}

export default function Layout({ children }) {
  return children
}
