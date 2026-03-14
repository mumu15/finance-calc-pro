// app/discount-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Discount Calculator',
  description: 'Calculate sale price, savings amount and percentage off. Find final price after discount and sales tax for any purchase.',
  openGraph: {
    title: 'Discount Calculator',
    description: 'Calculate sale price, savings amount and percentage off. Find final price after discount and sales tax for any purchase.',
    url: 'https://freefincalc.net/discount-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Discount Calculator',
    description: 'Calculate sale price, savings amount and percentage off. Find final price after discount and sales tax for any purchase.',
  },
}

export default function Layout({ children }) {
  return children
}
