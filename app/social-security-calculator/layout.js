// app/social-security-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Social Security Calculator',
  description: 'Estimate your Social Security benefit at different retirement ages. See impact of claiming early vs waiting until 70.',
  openGraph: {
    title: 'Social Security Calculator',
    description: 'Estimate your Social Security benefit at different retirement ages. See impact of claiming early vs waiting until 70.',
    url: 'https://www.freefincalc.net/social-security-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Social Security Calculator',
    description: 'Estimate your Social Security benefit at different retirement ages. See impact of claiming early vs waiting until 70.',
  },
}

export default function Layout({ children }) {
  return children
}
