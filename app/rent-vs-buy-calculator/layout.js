// app/rent-vs-buy-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Rent vs Buy Calculator',
  description: 'Compare the true cost of renting vs buying a home over time. See which option builds more wealth in your situation.',
  alternates: {
    canonical: 'https://freefincalc.net/rent-vs-buy-calculator',
  },
  openGraph: {
    title: 'Rent vs Buy Calculator',
    description: 'Compare the true cost of renting vs buying a home over time. See which option builds more wealth in your situation.',
    url: 'https://freefincalc.net/rent-vs-buy-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rent vs Buy Calculator',
    description: 'Compare the true cost of renting vs buying a home over time. See which option builds more wealth in your situation.',
  },
}

export default function Layout({ children }) {
  return children
}
