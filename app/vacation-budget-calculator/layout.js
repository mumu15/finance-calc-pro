// app/vacation-budget-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Vacation Budget Calculator',
  description: 'Plan your trip budget including flights, hotel, food and activities. Calculate total vacation cost per person and per day.',
  openGraph: {
    title: 'Vacation Budget Calculator',
    description: 'Plan your trip budget including flights, hotel, food and activities. Calculate total vacation cost per person and per day.',
    url: 'https://freefincalc.net/vacation-budget-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vacation Budget Calculator',
    description: 'Plan your trip budget including flights, hotel, food and activities. Calculate total vacation cost per person and per day.',
  },
}

export default function Layout({ children }) {
  return children
}
