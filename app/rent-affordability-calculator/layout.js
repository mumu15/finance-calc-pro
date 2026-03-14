// app/rent-affordability-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Rent Affordability Calculator',
  description: 'Calculate how much rent you can afford based on income. Use the 30% rule and see maximum rent for your salary.',
  openGraph: {
    title: 'Rent Affordability Calculator',
    description: 'Calculate how much rent you can afford based on income. Use the 30% rule and see maximum rent for your salary.',
    url: 'https://www.freefincalc.net/rent-affordability-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rent Affordability Calculator',
    description: 'Calculate how much rent you can afford based on income. Use the 30% rule and see maximum rent for your salary.',
  },
}

export default function Layout({ children }) {
  return children
}
