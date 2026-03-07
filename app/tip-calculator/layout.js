// app/tip-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Tip Calculator',
  description: 'Calculate tip amount, total bill and split between multiple people for any restaurant or service. Free tip calculator.',
  alternates: {
    canonical: 'https://freefincalc.net/tip-calculator',
  },
  openGraph: {
    title: 'Tip Calculator',
    description: 'Calculate tip amount, total bill and split between multiple people for any restaurant or service. Free tip calculator.',
    url: 'https://freefincalc.net/tip-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tip Calculator',
    description: 'Calculate tip amount, total bill and split between multiple people for any restaurant or service. Free tip calculator.',
  },
}

export default function Layout({ children }) {
  return children
}
