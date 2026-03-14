// app/break-even-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Break-Even Calculator',
  description: 'Calculate break-even point in units and revenue for your business. Find fixed costs, variable costs and contribution margin.',
  openGraph: {
    title: 'Break-Even Calculator',
    description: 'Calculate break-even point in units and revenue for your business. Find fixed costs, variable costs and contribution margin.',
    url: 'https://freefincalc.net/break-even-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Break-Even Calculator',
    description: 'Calculate break-even point in units and revenue for your business. Find fixed costs, variable costs and contribution margin.',
  },
}

export default function Layout({ children }) {
  return children
}
