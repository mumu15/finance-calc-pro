// app/annuity-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Annuity Calculator',
  description: 'Calculate annuity payments, future value and present value for fixed annuities. Plan retirement income from annuities.',
  openGraph: {
    title: 'Annuity Calculator',
    description: 'Calculate annuity payments, future value and present value for fixed annuities. Plan retirement income from annuities.',
    url: 'https://www.freefincalc.net/annuity-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Annuity Calculator',
    description: 'Calculate annuity payments, future value and present value for fixed annuities. Plan retirement income from annuities.',
  },
}

export default function Layout({ children }) {
  return children
}
