// app/capital-gains-tax-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Capital Gains Tax Calculator',
  description: 'Calculate short-term and long-term capital gains tax on stocks, real estate and other assets. Know your tax before selling.',
  openGraph: {
    title: 'Capital Gains Tax Calculator',
    description: 'Calculate short-term and long-term capital gains tax on stocks, real estate and other assets. Know your tax before selling.',
    url: 'https://www.freefincalc.net/capital-gains-tax-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Capital Gains Tax Calculator',
    description: 'Calculate short-term and long-term capital gains tax on stocks, real estate and other assets. Know your tax before selling.',
  },
}

export default function Layout({ children }) {
  return children
}
