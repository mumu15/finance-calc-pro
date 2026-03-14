// app/net-pay-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Net Pay Calculator',
  description: 'Calculate your net pay after all deductions. See exactly what lands in your bank account each pay period.',
  openGraph: {
    title: 'Net Pay Calculator',
    description: 'Calculate your net pay after all deductions. See exactly what lands in your bank account each pay period.',
    url: 'https://www.freefincalc.net/net-pay-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Net Pay Calculator',
    description: 'Calculate your net pay after all deductions. See exactly what lands in your bank account each pay period.',
  },
}

export default function Layout({ children }) {
  return children
}
