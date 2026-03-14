// app/contractor-pay-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Contractor Pay Calculator',
  description: 'Calculate contractor take-home pay after self-employment tax and expenses. Find equivalent employee salary comparison.',
  openGraph: {
    title: 'Contractor Pay Calculator',
    description: 'Calculate contractor take-home pay after self-employment tax and expenses. Find equivalent employee salary comparison.',
    url: 'https://freefincalc.net/contractor-pay-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contractor Pay Calculator',
    description: 'Calculate contractor take-home pay after self-employment tax and expenses. Find equivalent employee salary comparison.',
  },
}

export default function Layout({ children }) {
  return children
}
