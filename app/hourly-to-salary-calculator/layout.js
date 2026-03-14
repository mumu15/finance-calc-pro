// app/hourly-to-salary-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Hourly to Annual Salary Calculator',
  description: 'Convert hourly wage to annual salary, monthly, weekly and daily pay. Calculate yearly income from any hourly rate.',
  openGraph: {
    title: 'Hourly to Annual Salary Calculator',
    description: 'Convert hourly wage to annual salary, monthly, weekly and daily pay. Calculate yearly income from any hourly rate.',
    url: 'https://freefincalc.net/hourly-to-salary-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hourly to Annual Salary Calculator',
    description: 'Convert hourly wage to annual salary, monthly, weekly and daily pay. Calculate yearly income from any hourly rate.',
  },
}

export default function Layout({ children }) {
  return children
}
