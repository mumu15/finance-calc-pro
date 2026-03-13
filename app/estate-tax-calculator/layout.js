// app/estate-tax-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Estate Tax Calculator',
  description: 'Calculate federal estate tax on inherited assets. Understand exemptions, rates and strategies to minimize estate taxes.',
  openGraph: {
    title: 'Estate Tax Calculator',
    description: 'Calculate federal estate tax on inherited assets. Understand exemptions, rates and strategies to minimize estate taxes.',
    url: 'https://freefincalc.net/estate-tax-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Estate Tax Calculator',
    description: 'Calculate federal estate tax on inherited assets. Understand exemptions, rates and strategies to minimize estate taxes.',
  },
}

export default function Layout({ children }) {
  return children
}
