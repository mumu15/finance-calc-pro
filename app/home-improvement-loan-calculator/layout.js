// app/home-improvement-loan-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Home Improvement Loan Calculator',
  description: 'Compare home equity loan, HELOC and personal loan for renovations. Calculate payments and ROI on home improvements.',
  openGraph: {
    title: 'Home Improvement Loan Calculator',
    description: 'Compare home equity loan, HELOC and personal loan for renovations. Calculate payments and ROI on home improvements.',
    url: 'https://freefincalc.net/home-improvement-loan-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home Improvement Loan Calculator',
    description: 'Compare home equity loan, HELOC and personal loan for renovations. Calculate payments and ROI on home improvements.',
  },
}

export default function Layout({ children }) {
  return children
}
