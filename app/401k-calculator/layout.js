// app/401k-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: '401k Calculator',
  description: 'Calculate your 401k balance at retirement with employer match, contribution rates and compound growth over time.',
  openGraph: {
    title: '401k Calculator',
    description: 'Calculate your 401k balance at retirement with employer match, contribution rates and compound growth over time.',
    url: 'https://freefincalc.net/401k-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '401k Calculator',
    description: 'Calculate your 401k balance at retirement with employer match, contribution rates and compound growth over time.',
  },
}

export default function Layout({ children }) {
  return children
}
