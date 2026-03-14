// app/mortgage-points-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Mortgage Points Calculator',
  description: 'Calculate if buying mortgage discount points is worth it. Find break-even timeline and total interest savings.',
  openGraph: {
    title: 'Mortgage Points Calculator',
    description: 'Calculate if buying mortgage discount points is worth it. Find break-even timeline and total interest savings.',
    url: 'https://www.freefincalc.net/mortgage-points-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mortgage Points Calculator',
    description: 'Calculate if buying mortgage discount points is worth it. Find break-even timeline and total interest savings.',
  },
}

export default function Layout({ children }) {
  return children
}
