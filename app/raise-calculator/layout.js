// app/raise-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Raise Calculator',
  description: 'Calculate the dollar value of a salary raise, new annual pay and percentage increase. See how a raise affects take-home pay.',
  alternates: {
    canonical: 'https://freefincalc.net/raise-calculator',
  },
  openGraph: {
    title: 'Raise Calculator',
    description: 'Calculate the dollar value of a salary raise, new annual pay and percentage increase. See how a raise affects take-home pay.',
    url: 'https://freefincalc.net/raise-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raise Calculator',
    description: 'Calculate the dollar value of a salary raise, new annual pay and percentage increase. See how a raise affects take-home pay.',
  },
}

export default function Layout({ children }) {
  return children
}
