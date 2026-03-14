// app/overtime-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Overtime Calculator',
  description: 'Calculate overtime pay at 1.5x, 2x or custom rates. Find total weekly earnings and annual income with overtime hours.',
  openGraph: {
    title: 'Overtime Calculator',
    description: 'Calculate overtime pay at 1.5x, 2x or custom rates. Find total weekly earnings and annual income with overtime hours.',
    url: 'https://www.freefincalc.net/overtime-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Overtime Calculator',
    description: 'Calculate overtime pay at 1.5x, 2x or custom rates. Find total weekly earnings and annual income with overtime hours.',
  },
}

export default function Layout({ children }) {
  return children
}
