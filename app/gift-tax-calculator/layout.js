// app/gift-tax-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Gift Tax Calculator',
  description: 'Calculate gift tax on transfers over the annual exclusion. Understand lifetime exemptions and gift tax filing requirements.',
  openGraph: {
    title: 'Gift Tax Calculator',
    description: 'Calculate gift tax on transfers over the annual exclusion. Understand lifetime exemptions and gift tax filing requirements.',
    url: 'https://freefincalc.net/gift-tax-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gift Tax Calculator',
    description: 'Calculate gift tax on transfers over the annual exclusion. Understand lifetime exemptions and gift tax filing requirements.',
  },
}

export default function Layout({ children }) {
  return children
}
