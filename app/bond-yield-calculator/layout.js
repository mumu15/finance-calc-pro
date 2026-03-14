// app/bond-yield-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Bond Yield Calculator',
  description: 'Calculate bond yield to maturity, current yield and yield to call. Price bonds accurately with our free bond calculator.',
  openGraph: {
    title: 'Bond Yield Calculator',
    description: 'Calculate bond yield to maturity, current yield and yield to call. Price bonds accurately with our free bond calculator.',
    url: 'https://freefincalc.net/bond-yield-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bond Yield Calculator',
    description: 'Calculate bond yield to maturity, current yield and yield to call. Price bonds accurately with our free bond calculator.',
  },
}

export default function Layout({ children }) {
  return children
}
