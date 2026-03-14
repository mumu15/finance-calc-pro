// app/debt-service-coverage-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'DSCR Calculator',
  description: 'Calculate Debt Service Coverage Ratio (DSCR) for business loans. See if your income covers loan payments for lender approval.',
  openGraph: {
    title: 'DSCR Calculator',
    description: 'Calculate Debt Service Coverage Ratio (DSCR) for business loans. See if your income covers loan payments for lender approval.',
    url: 'https://www.freefincalc.net/debt-service-coverage-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DSCR Calculator',
    description: 'Calculate Debt Service Coverage Ratio (DSCR) for business loans. See if your income covers loan payments for lender approval.',
  },
}

export default function Layout({ children }) {
  return children
}
