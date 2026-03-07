// app/ecommerce-profit-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Ecommerce Profit Calculator',
  description: 'Calculate net profit per order, ROAS and monthly store profit. Optimize your online store margins and ad spend.',
  alternates: {
    canonical: 'https://freefincalc.net/ecommerce-profit-calculator',
  },
  openGraph: {
    title: 'Ecommerce Profit Calculator',
    description: 'Calculate net profit per order, ROAS and monthly store profit. Optimize your online store margins and ad spend.',
    url: 'https://freefincalc.net/ecommerce-profit-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ecommerce Profit Calculator',
    description: 'Calculate net profit per order, ROAS and monthly store profit. Optimize your online store margins and ad spend.',
  },
}

export default function Layout({ children }) {
  return children
}
