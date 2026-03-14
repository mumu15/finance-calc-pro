// app/biweekly-mortgage-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Biweekly Mortgage Calculator',
  description: 'See how biweekly mortgage payments save interest and pay off your mortgage years early. Calculate total savings.',
  openGraph: {
    title: 'Biweekly Mortgage Calculator',
    description: 'See how biweekly mortgage payments save interest and pay off your mortgage years early. Calculate total savings.',
    url: 'https://www.freefincalc.net/biweekly-mortgage-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biweekly Mortgage Calculator',
    description: 'See how biweekly mortgage payments save interest and pay off your mortgage years early. Calculate total savings.',
  },
}

export default function Layout({ children }) {
  return children
}
