// app/rental-property-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Rental Property Calculator',
  description: 'Calculate rental property cash flow, cap rate, cash-on-cash return and ROI. Analyze investment property deals accurately.',
  openGraph: {
    title: 'Rental Property Calculator',
    description: 'Calculate rental property cash flow, cap rate, cash-on-cash return and ROI. Analyze investment property deals accurately.',
    url: 'https://www.freefincalc.net/rental-property-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rental Property Calculator',
    description: 'Calculate rental property cash flow, cap rate, cash-on-cash return and ROI. Analyze investment property deals accurately.',
  },
}

export default function Layout({ children }) {
  return children
}
