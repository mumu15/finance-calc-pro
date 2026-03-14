// app/working-capital-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Working Capital Calculator',
  description: 'Calculate net working capital, current ratio and quick ratio. Measure your business liquidity and short-term health.',
  openGraph: {
    title: 'Working Capital Calculator',
    description: 'Calculate net working capital, current ratio and quick ratio. Measure your business liquidity and short-term health.',
    url: 'https://www.freefincalc.net/working-capital-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Working Capital Calculator',
    description: 'Calculate net working capital, current ratio and quick ratio. Measure your business liquidity and short-term health.',
  },
}

export default function Layout({ children }) {
  return children
}
