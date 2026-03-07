// app/markup-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Markup Calculator',
  description: 'Calculate selling price from cost and markup percentage. Find profit margin, monthly revenue and gross profit per unit.',
  alternates: {
    canonical: 'https://freefincalc.net/markup-calculator',
  },
  openGraph: {
    title: 'Markup Calculator',
    description: 'Calculate selling price from cost and markup percentage. Find profit margin, monthly revenue and gross profit per unit.',
    url: 'https://freefincalc.net/markup-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Markup Calculator',
    description: 'Calculate selling price from cost and markup percentage. Find profit margin, monthly revenue and gross profit per unit.',
  },
}

export default function Layout({ children }) {
  return children
}
