// app/savings-growth-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Savings Growth Calculator',
  description: 'See how savings grow over time with regular deposits and compound interest. Project account balance for any goal.',
  openGraph: {
    title: 'Savings Growth Calculator',
    description: 'See how savings grow over time with regular deposits and compound interest. Project account balance for any goal.',
    url: 'https://www.freefincalc.net/savings-growth-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Savings Growth Calculator',
    description: 'See how savings grow over time with regular deposits and compound interest. Project account balance for any goal.',
  },
}

export default function Layout({ children }) {
  return children
}
