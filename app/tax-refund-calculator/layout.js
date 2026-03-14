// app/tax-refund-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Tax Refund Calculator',
  description: 'Estimate your federal tax refund or amount owed. Calculate withholding adjustments to optimize your tax situation.',
  openGraph: {
    title: 'Tax Refund Calculator',
    description: 'Estimate your federal tax refund or amount owed. Calculate withholding adjustments to optimize your tax situation.',
    url: 'https://www.freefincalc.net/tax-refund-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tax Refund Calculator',
    description: 'Estimate your federal tax refund or amount owed. Calculate withholding adjustments to optimize your tax situation.',
  },
}

export default function Layout({ children }) {
  return children
}
