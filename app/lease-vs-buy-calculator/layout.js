// app/lease-vs-buy-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Lease vs Buy Car Calculator',
  description: 'Compare the total cost of leasing vs buying a car over time. See which option saves more money for your situation.',
  openGraph: {
    title: 'Lease vs Buy Car Calculator',
    description: 'Compare the total cost of leasing vs buying a car over time. See which option saves more money for your situation.',
    url: 'https://www.freefincalc.net/lease-vs-buy-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lease vs Buy Car Calculator',
    description: 'Compare the total cost of leasing vs buying a car over time. See which option saves more money for your situation.',
  },
}

export default function Layout({ children }) {
  return children
}
