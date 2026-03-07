// app/dividend-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Dividend Calculator',
  description: 'Calculate dividend income, yield and annual earnings from your stock portfolio. Plan dividend reinvestment returns.',
  alternates: {
    canonical: 'https://freefincalc.net/dividend-calculator',
  },
  openGraph: {
    title: 'Dividend Calculator',
    description: 'Calculate dividend income, yield and annual earnings from your stock portfolio. Plan dividend reinvestment returns.',
    url: 'https://freefincalc.net/dividend-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dividend Calculator',
    description: 'Calculate dividend income, yield and annual earnings from your stock portfolio. Plan dividend reinvestment returns.',
  },
}

export default function Layout({ children }) {
  return children
}
