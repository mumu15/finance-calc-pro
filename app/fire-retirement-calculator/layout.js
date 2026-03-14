// app/fire-retirement-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'FIRE Retirement Age Calculator',
  description: 'Calculate your exact retirement age using the FIRE method. Find your Financial Independence number and target date.',
  openGraph: {
    title: 'FIRE Retirement Age Calculator',
    description: 'Calculate your exact retirement age using the FIRE method. Find your Financial Independence number and target date.',
    url: 'https://www.freefincalc.net/fire-retirement-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FIRE Retirement Age Calculator',
    description: 'Calculate your exact retirement age using the FIRE method. Find your Financial Independence number and target date.',
  },
}

export default function Layout({ children }) {
  return children
}
