// app/salary-after-tax-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Salary After Tax Calculator',
  description: 'Calculate your exact take-home salary after all taxes. See federal tax, state tax, Social Security and Medicare breakdown.',
  openGraph: {
    title: 'Salary After Tax Calculator',
    description: 'Calculate your exact take-home salary after all taxes. See federal tax, state tax, Social Security and Medicare breakdown.',
    url: 'https://freefincalc.net/salary-after-tax-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salary After Tax Calculator',
    description: 'Calculate your exact take-home salary after all taxes. See federal tax, state tax, Social Security and Medicare breakdown.',
  },
}

export default function Layout({ children }) {
  return children
}
