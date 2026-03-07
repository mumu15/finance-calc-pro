// app/balance-transfer-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Balance Transfer Calculator',
  description: 'Calculate if a 0% balance transfer saves money vs keeping your current card. See net savings after transfer fee.',
  alternates: {
    canonical: 'https://freefincalc.net/balance-transfer-calculator',
  },
  openGraph: {
    title: 'Balance Transfer Calculator',
    description: 'Calculate if a 0% balance transfer saves money vs keeping your current card. See net savings after transfer fee.',
    url: 'https://freefincalc.net/balance-transfer-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Balance Transfer Calculator',
    description: 'Calculate if a 0% balance transfer saves money vs keeping your current card. See net savings after transfer fee.',
  },
}

export default function Layout({ children }) {
  return children
}
