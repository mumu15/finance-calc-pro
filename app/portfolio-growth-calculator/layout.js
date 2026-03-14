// app/portfolio-growth-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Portfolio Growth Calculator',
  description: 'Project investment portfolio growth with contributions and compound returns. See nominal and inflation-adjusted value.',
  openGraph: {
    title: 'Portfolio Growth Calculator',
    description: 'Project investment portfolio growth with contributions and compound returns. See nominal and inflation-adjusted value.',
    url: 'https://www.freefincalc.net/portfolio-growth-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio Growth Calculator',
    description: 'Project investment portfolio growth with contributions and compound returns. See nominal and inflation-adjusted value.',
  },
}

export default function Layout({ children }) {
  return children
}
