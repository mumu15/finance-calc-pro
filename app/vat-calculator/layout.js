// app/vat-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'VAT Calculator',
  description: 'Calculate VAT (Value Added Tax) for any amount and rate. Add or remove VAT from prices for UK, EU and global transactions.',
  openGraph: {
    title: 'VAT Calculator',
    description: 'Calculate VAT (Value Added Tax) for any amount and rate. Add or remove VAT from prices for UK, EU and global transactions.',
    url: 'https://freefincalc.net/vat-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VAT Calculator',
    description: 'Calculate VAT (Value Added Tax) for any amount and rate. Add or remove VAT from prices for UK, EU and global transactions.',
  },
}

export default function Layout({ children }) {
  return children
}
