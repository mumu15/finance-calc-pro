// app/sales-tax-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Sales Tax Calculator',
  description: 'Calculate sales tax amount and total price for any purchase. Look up rates by state and find the pre-tax price from total.',
  alternates: {
    canonical: 'https://freefincalc.net/sales-tax-calculator',
  },
  openGraph: {
    title: 'Sales Tax Calculator',
    description: 'Calculate sales tax amount and total price for any purchase. Look up rates by state and find the pre-tax price from total.',
    url: 'https://freefincalc.net/sales-tax-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sales Tax Calculator',
    description: 'Calculate sales tax amount and total price for any purchase. Look up rates by state and find the pre-tax price from total.',
  },
}

export default function Layout({ children }) {
  return children
}
