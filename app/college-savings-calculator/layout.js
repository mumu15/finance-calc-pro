// app/college-savings-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'College Savings Calculator (529)',
  description: 'Calculate monthly 529 plan contributions needed to cover future college costs. Plan for tuition inflation over time.',
  openGraph: {
    title: 'College Savings Calculator (529)',
    description: 'Calculate monthly 529 plan contributions needed to cover future college costs. Plan for tuition inflation over time.',
    url: 'https://www.freefincalc.net/college-savings-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'College Savings Calculator (529)',
    description: 'Calculate monthly 529 plan contributions needed to cover future college costs. Plan for tuition inflation over time.',
  },
}

export default function Layout({ children }) {
  return children
}
