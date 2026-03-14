// app/life-insurance-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Life Insurance Calculator',
  description: 'Calculate how much life insurance coverage you need to protect your family. Use the DIME method for accurate coverage.',
  openGraph: {
    title: 'Life Insurance Calculator',
    description: 'Calculate how much life insurance coverage you need to protect your family. Use the DIME method for accurate coverage.',
    url: 'https://www.freefincalc.net/life-insurance-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Life Insurance Calculator',
    description: 'Calculate how much life insurance coverage you need to protect your family. Use the DIME method for accurate coverage.',
  },
}

export default function Layout({ children }) {
  return children
}
