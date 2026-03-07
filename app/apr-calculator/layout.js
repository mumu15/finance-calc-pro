// app/apr-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'APR Calculator',
  description: 'Calculate the true Annual Percentage Rate (APR) on any loan including fees. Compare loan offers accurately with APR.',
  alternates: {
    canonical: 'https://freefincalc.net/apr-calculator',
  },
  openGraph: {
    title: 'APR Calculator',
    description: 'Calculate the true Annual Percentage Rate (APR) on any loan including fees. Compare loan offers accurately with APR.',
    url: 'https://freefincalc.net/apr-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'APR Calculator',
    description: 'Calculate the true Annual Percentage Rate (APR) on any loan including fees. Compare loan offers accurately with APR.',
  },
}

export default function Layout({ children }) {
  return children
}
