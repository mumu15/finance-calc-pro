// app/wedding-budget-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Wedding Budget Calculator',
  description: 'Plan your wedding budget by category. Calculate cost per guest and allocate spending across venue, catering and more.',
  openGraph: {
    title: 'Wedding Budget Calculator',
    description: 'Plan your wedding budget by category. Calculate cost per guest and allocate spending across venue, catering and more.',
    url: 'https://www.freefincalc.net/wedding-budget-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wedding Budget Calculator',
    description: 'Plan your wedding budget by category. Calculate cost per guest and allocate spending across venue, catering and more.',
  },
}

export default function Layout({ children }) {
  return children
}
