// app/cd-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'CD Calculator',
  description: 'Calculate Certificate of Deposit maturity value, interest earned and APY. Compare CD terms and find the best CD rates.',
  alternates: {
    canonical: 'https://freefincalc.net/cd-calculator',
  },
  openGraph: {
    title: 'CD Calculator',
    description: 'Calculate Certificate of Deposit maturity value, interest earned and APY. Compare CD terms and find the best CD rates.',
    url: 'https://freefincalc.net/cd-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CD Calculator',
    description: 'Calculate Certificate of Deposit maturity value, interest earned and APY. Compare CD terms and find the best CD rates.',
  },
}

export default function Layout({ children }) {
  return children
}
