// app/stock-profit-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Stock Profit Calculator',
  description: 'Calculate profit or loss on stock trades including commissions. See return on investment and annualized gain or loss.',
  openGraph: {
    title: 'Stock Profit Calculator',
    description: 'Calculate profit or loss on stock trades including commissions. See return on investment and annualized gain or loss.',
    url: 'https://www.freefincalc.net/stock-profit-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stock Profit Calculator',
    description: 'Calculate profit or loss on stock trades including commissions. See return on investment and annualized gain or loss.',
  },
}

export default function Layout({ children }) {
  return children
}
