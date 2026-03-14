// app/pension-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Pension Calculator',
  description: 'Calculate defined benefit pension monthly payout and compare lump sum vs annuity options at retirement.',
  openGraph: {
    title: 'Pension Calculator',
    description: 'Calculate defined benefit pension monthly payout and compare lump sum vs annuity options at retirement.',
    url: 'https://freefincalc.net/pension-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pension Calculator',
    description: 'Calculate defined benefit pension monthly payout and compare lump sum vs annuity options at retirement.',
  },
}

export default function Layout({ children }) {
  return children
}
