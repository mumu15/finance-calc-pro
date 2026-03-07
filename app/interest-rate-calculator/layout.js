// app/interest-rate-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Interest Rate Calculator',
  description: 'Find the interest rate on any loan given payment amount, principal and term. Reverse-calculate loan rates easily.',
  alternates: {
    canonical: 'https://freefincalc.net/interest-rate-calculator',
  },
  openGraph: {
    title: 'Interest Rate Calculator',
    description: 'Find the interest rate on any loan given payment amount, principal and term. Reverse-calculate loan rates easily.',
    url: 'https://freefincalc.net/interest-rate-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Interest Rate Calculator',
    description: 'Find the interest rate on any loan given payment amount, principal and term. Reverse-calculate loan rates easily.',
  },
}

export default function Layout({ children }) {
  return children
}
