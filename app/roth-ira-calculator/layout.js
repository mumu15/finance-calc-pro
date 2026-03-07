// app/roth-ira-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Roth IRA Calculator',
  description: 'Calculate tax-free Roth IRA growth and retirement income. See contribution limits and compare to traditional IRA.',
  alternates: {
    canonical: 'https://freefincalc.net/roth-ira-calculator',
  },
  openGraph: {
    title: 'Roth IRA Calculator',
    description: 'Calculate tax-free Roth IRA growth and retirement income. See contribution limits and compare to traditional IRA.',
    url: 'https://freefincalc.net/roth-ira-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roth IRA Calculator',
    description: 'Calculate tax-free Roth IRA growth and retirement income. See contribution limits and compare to traditional IRA.',
  },
}

export default function Layout({ children }) {
  return children
}
