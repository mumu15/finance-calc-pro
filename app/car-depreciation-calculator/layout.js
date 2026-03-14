// app/car-depreciation-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Car Depreciation Calculator',
  description: 'Calculate how much your car depreciates each year and its future value. See total depreciation cost of any vehicle.',
  openGraph: {
    title: 'Car Depreciation Calculator',
    description: 'Calculate how much your car depreciates each year and its future value. See total depreciation cost of any vehicle.',
    url: 'https://www.freefincalc.net/car-depreciation-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Car Depreciation Calculator',
    description: 'Calculate how much your car depreciates each year and its future value. See total depreciation cost of any vehicle.',
  },
}

export default function Layout({ children }) {
  return children
}
