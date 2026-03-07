// app/inflation-impact-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Inflation Calculator',
  description: 'Calculate the impact of inflation on purchasing power over time. See what money will be worth in the future.',
  alternates: {
    canonical: 'https://freefincalc.net/inflation-impact-calculator',
  },
  openGraph: {
    title: 'Inflation Calculator',
    description: 'Calculate the impact of inflation on purchasing power over time. See what money will be worth in the future.',
    url: 'https://freefincalc.net/inflation-impact-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inflation Calculator',
    description: 'Calculate the impact of inflation on purchasing power over time. See what money will be worth in the future.',
  },
}

export default function Layout({ children }) {
  return children
}
