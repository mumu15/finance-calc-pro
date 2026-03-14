// app/net-worth-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Net Worth Calculator',
  description: 'Calculate your total net worth by adding assets and subtracting liabilities. Track wealth over time with our free calculator.',
  openGraph: {
    title: 'Net Worth Calculator',
    description: 'Calculate your total net worth by adding assets and subtracting liabilities. Track wealth over time with our free calculator.',
    url: 'https://freefincalc.net/net-worth-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Net Worth Calculator',
    description: 'Calculate your total net worth by adding assets and subtracting liabilities. Track wealth over time with our free calculator.',
  },
}

export default function Layout({ children }) {
  return children
}
