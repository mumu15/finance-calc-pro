// app/roi-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'ROI Calculator',
  description: 'Calculate return on investment (ROI) for any business or personal investment. Compare investments with annualized ROI.',
  openGraph: {
    title: 'ROI Calculator',
    description: 'Calculate return on investment (ROI) for any business or personal investment. Compare investments with annualized ROI.',
    url: 'https://www.freefincalc.net/roi-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ROI Calculator',
    description: 'Calculate return on investment (ROI) for any business or personal investment. Compare investments with annualized ROI.',
  },
}

export default function Layout({ children }) {
  return children
}
