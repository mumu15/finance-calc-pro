// app/credit-utilization-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Credit Utilization Calculator',
  description: 'Calculate credit utilization ratio across all cards. See credit score impact and how much to pay down to reach 10%.',
  openGraph: {
    title: 'Credit Utilization Calculator',
    description: 'Calculate credit utilization ratio across all cards. See credit score impact and how much to pay down to reach 10%.',
    url: 'https://freefincalc.net/credit-utilization-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Credit Utilization Calculator',
    description: 'Calculate credit utilization ratio across all cards. See credit score impact and how much to pay down to reach 10%.',
  },
}

export default function Layout({ children }) {
  return children
}
