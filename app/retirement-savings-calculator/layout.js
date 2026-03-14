// app/retirement-savings-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Retirement Savings Calculator',
  description: 'Calculate if you are on track for retirement. Project savings at retirement and see how much more you need to save.',
  openGraph: {
    title: 'Retirement Savings Calculator',
    description: 'Calculate if you are on track for retirement. Project savings at retirement and see how much more you need to save.',
    url: 'https://freefincalc.net/retirement-savings-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Retirement Savings Calculator',
    description: 'Calculate if you are on track for retirement. Project savings at retirement and see how much more you need to save.',
  },
}

export default function Layout({ children }) {
  return children
}
