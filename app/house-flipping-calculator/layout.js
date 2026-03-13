// app/house-flipping-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'House Flipping Calculator',
  description: 'Calculate profit, ROI and costs for house flipping projects. Use the 70% rule to evaluate fix-and-flip deals.',
  openGraph: {
    title: 'House Flipping Calculator',
    description: 'Calculate profit, ROI and costs for house flipping projects. Use the 70% rule to evaluate fix-and-flip deals.',
    url: 'https://freefincalc.net/house-flipping-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'House Flipping Calculator',
    description: 'Calculate profit, ROI and costs for house flipping projects. Use the 70% rule to evaluate fix-and-flip deals.',
  },
}

export default function Layout({ children }) {
  return children
}
