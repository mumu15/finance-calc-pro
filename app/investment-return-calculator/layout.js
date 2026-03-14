// app/investment-return-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Investment Return Calculator',
  description: 'Calculate investment returns with compound growth, contributions and time. Project portfolio value over any horizon.',
  openGraph: {
    title: 'Investment Return Calculator',
    description: 'Calculate investment returns with compound growth, contributions and time. Project portfolio value over any horizon.',
    url: 'https://www.freefincalc.net/investment-return-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Investment Return Calculator',
    description: 'Calculate investment returns with compound growth, contributions and time. Project portfolio value over any horizon.',
  },
}

export default function Layout({ children }) {
  return children
}
