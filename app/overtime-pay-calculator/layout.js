// app/overtime-pay-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Overtime Pay Calculator',
  description: 'Calculate overtime pay at time-and-a-half or double time. Find total weekly earnings and annual income with overtime.',
  openGraph: {
    title: 'Overtime Pay Calculator',
    description: 'Calculate overtime pay at time-and-a-half or double time. Find total weekly earnings and annual income with overtime.',
    url: 'https://www.freefincalc.net/overtime-pay-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Overtime Pay Calculator',
    description: 'Calculate overtime pay at time-and-a-half or double time. Find total weekly earnings and annual income with overtime.',
  },
}

export default function Layout({ children }) {
  return children
}
