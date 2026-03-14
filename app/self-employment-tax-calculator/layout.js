// app/self-employment-tax-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Self-Employment Tax Calculator',
  description: 'Calculate self-employment tax, quarterly estimated payments and deductions for freelancers and independent contractors.',
  openGraph: {
    title: 'Self-Employment Tax Calculator',
    description: 'Calculate self-employment tax, quarterly estimated payments and deductions for freelancers and independent contractors.',
    url: 'https://www.freefincalc.net/self-employment-tax-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Self-Employment Tax Calculator',
    description: 'Calculate self-employment tax, quarterly estimated payments and deductions for freelancers and independent contractors.',
  },
}

export default function Layout({ children }) {
  return children
}
