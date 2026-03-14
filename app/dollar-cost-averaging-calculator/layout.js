// app/dollar-cost-averaging-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Dollar Cost Averaging Calculator',
  description: 'Calculate the benefits of dollar cost averaging vs lump sum investing. See average cost basis and total returns.',
  openGraph: {
    title: 'Dollar Cost Averaging Calculator',
    description: 'Calculate the benefits of dollar cost averaging vs lump sum investing. See average cost basis and total returns.',
    url: 'https://www.freefincalc.net/dollar-cost-averaging-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dollar Cost Averaging Calculator',
    description: 'Calculate the benefits of dollar cost averaging vs lump sum investing. See average cost basis and total returns.',
  },
}

export default function Layout({ children }) {
  return children
}
