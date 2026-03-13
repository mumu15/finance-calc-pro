// app/paycheck-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Paycheck Calculator',
  description: 'Calculate your take-home paycheck after federal tax, state tax, Social Security and Medicare deductions.',
  openGraph: {
    title: 'Paycheck Calculator',
    description: 'Calculate your take-home paycheck after federal tax, state tax, Social Security and Medicare deductions.',
    url: 'https://freefincalc.net/paycheck-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paycheck Calculator',
    description: 'Calculate your take-home paycheck after federal tax, state tax, Social Security and Medicare deductions.',
  },
}

export default function Layout({ children }) {
  return children
}
