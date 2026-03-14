// app/child-tax-credit-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Child Tax Credit Calculator',
  description: 'Calculate your Child Tax Credit amount for 2026. See eligibility, phase-out limits and maximum credit per child.',
  openGraph: {
    title: 'Child Tax Credit Calculator',
    description: 'Calculate your Child Tax Credit amount for 2026. See eligibility, phase-out limits and maximum credit per child.',
    url: 'https://www.freefincalc.net/child-tax-credit-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Child Tax Credit Calculator',
    description: 'Calculate your Child Tax Credit amount for 2026. See eligibility, phase-out limits and maximum credit per child.',
  },
}

export default function Layout({ children }) {
  return children
}
