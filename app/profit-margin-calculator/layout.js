// app/profit-margin-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Profit Margin Calculator',
  description: 'Calculate gross, operating and net profit margin for any business. Find markup percentage and break-even revenue.',
  openGraph: {
    title: 'Profit Margin Calculator',
    description: 'Calculate gross, operating and net profit margin for any business. Find markup percentage and break-even revenue.',
    url: 'https://www.freefincalc.net/profit-margin-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Profit Margin Calculator',
    description: 'Calculate gross, operating and net profit margin for any business. Find markup percentage and break-even revenue.',
  },
}

export default function Layout({ children }) {
  return children
}
