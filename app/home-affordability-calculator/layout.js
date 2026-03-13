// app/home-affordability-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Home Affordability Calculator',
  description: 'Find out how much house you can afford based on income, debts and down payment. Free home affordability calculator.',
  openGraph: {
    title: 'Home Affordability Calculator',
    description: 'Find out how much house you can afford based on income, debts and down payment. Free home affordability calculator.',
    url: 'https://freefincalc.net/home-affordability-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home Affordability Calculator',
    description: 'Find out how much house you can afford based on income, debts and down payment. Free home affordability calculator.',
  },
}

export default function Layout({ children }) {
  return children
}
