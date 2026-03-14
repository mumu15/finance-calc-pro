// app/employee-cost-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Employee Cost Calculator',
  description: 'Calculate the true total cost of an employee including taxes, benefits and overhead. Know the real cost before hiring.',
  openGraph: {
    title: 'Employee Cost Calculator',
    description: 'Calculate the true total cost of an employee including taxes, benefits and overhead. Know the real cost before hiring.',
    url: 'https://www.freefincalc.net/employee-cost-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Employee Cost Calculator',
    description: 'Calculate the true total cost of an employee including taxes, benefits and overhead. Know the real cost before hiring.',
  },
}

export default function Layout({ children }) {
  return children
}
