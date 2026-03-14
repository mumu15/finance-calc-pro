// app/passive-income-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Passive Income Calculator',
  description: 'Calculate how much you need invested to generate target passive income. Plan dividends, rental and investment income.',
  openGraph: {
    title: 'Passive Income Calculator',
    description: 'Calculate how much you need invested to generate target passive income. Plan dividends, rental and investment income.',
    url: 'https://www.freefincalc.net/passive-income-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Passive Income Calculator',
    description: 'Calculate how much you need invested to generate target passive income. Plan dividends, rental and investment income.',
  },
}

export default function Layout({ children }) {
  return children
}
