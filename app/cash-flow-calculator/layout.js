// app/cash-flow-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Cash Flow Calculator',
  description: 'Calculate operating cash flow, free cash flow and cash runway for your business. Know your burn rate and financial health.',
  openGraph: {
    title: 'Cash Flow Calculator',
    description: 'Calculate operating cash flow, free cash flow and cash runway for your business. Know your burn rate and financial health.',
    url: 'https://www.freefincalc.net/cash-flow-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cash Flow Calculator',
    description: 'Calculate operating cash flow, free cash flow and cash runway for your business. Know your burn rate and financial health.',
  },
}

export default function Layout({ children }) {
  return children
}
