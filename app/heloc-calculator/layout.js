// app/heloc-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'HELOC Calculator',
  description: 'Calculate your home equity line of credit limit, monthly payments and total borrowing capacity based on your home value.',
  openGraph: {
    title: 'HELOC Calculator',
    description: 'Calculate your home equity line of credit limit, monthly payments and total borrowing capacity based on your home value.',
    url: 'https://www.freefincalc.net/heloc-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HELOC Calculator',
    description: 'Calculate your home equity line of credit limit, monthly payments and total borrowing capacity based on your home value.',
  },
}

export default function Layout({ children }) {
  return children
}
