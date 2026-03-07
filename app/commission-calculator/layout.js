// app/commission-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Commission Calculator',
  description: 'Calculate commission earnings, gross monthly income and annual pay for any commission structure or sales quota.',
  alternates: {
    canonical: 'https://freefincalc.net/commission-calculator',
  },
  openGraph: {
    title: 'Commission Calculator',
    description: 'Calculate commission earnings, gross monthly income and annual pay for any commission structure or sales quota.',
    url: 'https://freefincalc.net/commission-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Commission Calculator',
    description: 'Calculate commission earnings, gross monthly income and annual pay for any commission structure or sales quota.',
  },
}

export default function Layout({ children }) {
  return children
}
