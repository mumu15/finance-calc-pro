// app/emergency-fund-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Emergency Fund Calculator',
  description: 'Calculate exactly how much you need in your emergency fund based on expenses and job stability. Know your target savings number.',
  openGraph: {
    title: 'Emergency Fund Calculator',
    description: 'Calculate exactly how much you need in your emergency fund based on expenses and job stability. Know your target savings number.',
    url: 'https://www.freefincalc.net/emergency-fund-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emergency Fund Calculator',
    description: 'Calculate exactly how much you need in your emergency fund based on expenses and job stability. Know your target savings number.',
  },
}

export default function Layout({ children }) {
  return children
}
