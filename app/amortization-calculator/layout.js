// app/amortization-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Amortization Calculator',
  description: 'Generate a full amortization schedule showing every payment, interest and principal breakdown over the life of your loan.',
  openGraph: {
    title: 'Amortization Calculator',
    description: 'Generate a full amortization schedule showing every payment, interest and principal breakdown over the life of your loan.',
    url: 'https://www.freefincalc.net/amortization-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amortization Calculator',
    description: 'Generate a full amortization schedule showing every payment, interest and principal breakdown over the life of your loan.',
  },
}

export default function Layout({ children }) {
  return children
}
