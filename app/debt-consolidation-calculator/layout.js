// app/debt-consolidation-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Debt Consolidation Calculator',
  description: 'Calculate savings from consolidating multiple debts into one loan. See monthly savings and total interest reduction.',
  openGraph: {
    title: 'Debt Consolidation Calculator',
    description: 'Calculate savings from consolidating multiple debts into one loan. See monthly savings and total interest reduction.',
    url: 'https://freefincalc.net/debt-consolidation-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Debt Consolidation Calculator',
    description: 'Calculate savings from consolidating multiple debts into one loan. See monthly savings and total interest reduction.',
  },
}

export default function Layout({ children }) {
  return children
}
