// app/baby-cost-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Baby Cost Calculator',
  description: 'Estimate the first-year cost of having a baby including delivery, childcare and essentials. Plan your family finances.',
  openGraph: {
    title: 'Baby Cost Calculator',
    description: 'Estimate the first-year cost of having a baby including delivery, childcare and essentials. Plan your family finances.',
    url: 'https://www.freefincalc.net/baby-cost-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Baby Cost Calculator',
    description: 'Estimate the first-year cost of having a baby including delivery, childcare and essentials. Plan your family finances.',
  },
}

export default function Layout({ children }) {
  return children
}
