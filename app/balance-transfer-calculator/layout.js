// app/balance-transfer-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Balance Transfer Calculator',
  description: 'Calculate if a 0% balance transfer saves money vs keeping your current card. See net savings after transfer fee.',
  openGraph: {
    title: 'Balance Transfer Calculator',
    description: 'Calculate if a 0% balance transfer saves money vs keeping your current card. See net savings after transfer fee.',
    url: 'https://www.freefincalc.net/balance-transfer-calculator',
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
