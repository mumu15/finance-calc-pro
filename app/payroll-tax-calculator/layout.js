// app/payroll-tax-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Payroll Tax Calculator',
  description: 'Calculate employer and employee payroll taxes including Social Security, Medicare, FUTA and SUTA for any wage.',
  openGraph: {
    title: 'Payroll Tax Calculator',
    description: 'Calculate employer and employee payroll taxes including Social Security, Medicare, FUTA and SUTA for any wage.',
    url: 'https://www.freefincalc.net/payroll-tax-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Payroll Tax Calculator',
    description: 'Calculate employer and employee payroll taxes including Social Security, Medicare, FUTA and SUTA for any wage.',
  },
}

export default function Layout({ children }) {
  return children
}
