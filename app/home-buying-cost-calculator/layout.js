// app/home-buying-cost-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Home Buying Cost Calculator',
  description: 'Calculate all upfront and ongoing costs of buying a home beyond the down payment. Know the true total cost.',
  alternates: {
    canonical: 'https://freefincalc.net/home-buying-cost-calculator',
  },
  openGraph: {
    title: 'Home Buying Cost Calculator',
    description: 'Calculate all upfront and ongoing costs of buying a home beyond the down payment. Know the true total cost.',
    url: 'https://freefincalc.net/home-buying-cost-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home Buying Cost Calculator',
    description: 'Calculate all upfront and ongoing costs of buying a home beyond the down payment. Know the true total cost.',
  },
}

export default function Layout({ children }) {
  return children
}
