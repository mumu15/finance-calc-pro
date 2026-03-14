// app/saas-metrics-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'SaaS Metrics Calculator',
  description: 'Calculate MRR, ARR, LTV, CAC ratio, churn impact and Rule of 40. Track the key metrics for SaaS business health.',
  openGraph: {
    title: 'SaaS Metrics Calculator',
    description: 'Calculate MRR, ARR, LTV, CAC ratio, churn impact and Rule of 40. Track the key metrics for SaaS business health.',
    url: 'https://freefincalc.net/saas-metrics-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SaaS Metrics Calculator',
    description: 'Calculate MRR, ARR, LTV, CAC ratio, churn impact and Rule of 40. Track the key metrics for SaaS business health.',
  },
}

export default function Layout({ children }) {
  return children
}
