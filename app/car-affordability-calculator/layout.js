// app/car-affordability-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Car Affordability Calculator',
  description: 'Calculate how much car you can afford using the 20/4/10 rule. Find maximum car price based on income and budget.',
  openGraph: {
    title: 'Car Affordability Calculator',
    description: 'Calculate how much car you can afford using the 20/4/10 rule. Find maximum car price based on income and budget.',
    url: 'https://www.freefincalc.net/car-affordability-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Car Affordability Calculator',
    description: 'Calculate how much car you can afford using the 20/4/10 rule. Find maximum car price based on income and budget.',
  },
}

export default function Layout({ children }) {
  return children
}
