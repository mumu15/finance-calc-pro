// app/salary-to-hourly-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Salary to Hourly Calculator',
  description: 'Convert annual salary to hourly rate based on hours worked. Calculate daily, weekly and monthly pay from salary.',
  openGraph: {
    title: 'Salary to Hourly Calculator',
    description: 'Convert annual salary to hourly rate based on hours worked. Calculate daily, weekly and monthly pay from salary.',
    url: 'https://freefincalc.net/salary-to-hourly-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salary to Hourly Calculator',
    description: 'Convert annual salary to hourly rate based on hours worked. Calculate daily, weekly and monthly pay from salary.',
  },
}

export default function Layout({ children }) {
  return children
}
