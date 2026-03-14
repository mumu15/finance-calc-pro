// app/fire-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'FIRE Calculator',
  description: 'Calculate your Financial Independence Retire Early number and timeline. Find your FIRE number and years to freedom.',
  openGraph: {
    title: 'FIRE Calculator',
    description: 'Calculate your Financial Independence Retire Early number and timeline. Find your FIRE number and years to freedom.',
    url: 'https://www.freefincalc.net/fire-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FIRE Calculator',
    description: 'Calculate your Financial Independence Retire Early number and timeline. Find your FIRE number and years to freedom.',
  },
}

export default function Layout({ children }) {
  return children
}
