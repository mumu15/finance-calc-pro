// app/freelance-rate-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Freelance Rate Calculator',
  description: 'Calculate your minimum freelance hourly rate to meet income goals after taxes and expenses. Price your services correctly.',
  openGraph: {
    title: 'Freelance Rate Calculator',
    description: 'Calculate your minimum freelance hourly rate to meet income goals after taxes and expenses. Price your services correctly.',
    url: 'https://www.freefincalc.net/freelance-rate-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Freelance Rate Calculator',
    description: 'Calculate your minimum freelance hourly rate to meet income goals after taxes and expenses. Price your services correctly.',
  },
}

export default function Layout({ children }) {
  return children
}
