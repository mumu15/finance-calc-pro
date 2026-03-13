// app/rmd-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Required Minimum Distribution Calculator',
  description: 'Calculate your RMD amount for any age and account balance. Avoid IRS penalties with accurate RMD planning.',
  openGraph: {
    title: 'Required Minimum Distribution Calculator',
    description: 'Calculate your RMD amount for any age and account balance. Avoid IRS penalties with accurate RMD planning.',
    url: 'https://freefincalc.net/rmd-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Required Minimum Distribution Calculator',
    description: 'Calculate your RMD amount for any age and account balance. Avoid IRS penalties with accurate RMD planning.',
  },
}

export default function Layout({ children }) {
  return children
}
