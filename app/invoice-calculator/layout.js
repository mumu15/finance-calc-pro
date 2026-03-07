// app/invoice-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Invoice Calculator',
  description: 'Calculate invoice totals with tax, discounts and late fees. Create accurate invoice amounts for any billing scenario.',
  alternates: {
    canonical: 'https://freefincalc.net/invoice-calculator',
  },
  openGraph: {
    title: 'Invoice Calculator',
    description: 'Calculate invoice totals with tax, discounts and late fees. Create accurate invoice amounts for any billing scenario.',
    url: 'https://freefincalc.net/invoice-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Invoice Calculator',
    description: 'Calculate invoice totals with tax, discounts and late fees. Create accurate invoice amounts for any billing scenario.',
  },
}

export default function Layout({ children }) {
  return children
}
