// app/solar-payback-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Solar Panel Payback Calculator',
  description: 'Calculate solar panel payback period, ROI and lifetime savings. See federal tax credit impact and break-even timeline.',
  alternates: {
    canonical: 'https://freefincalc.net/solar-payback-calculator',
  },
  openGraph: {
    title: 'Solar Panel Payback Calculator',
    description: 'Calculate solar panel payback period, ROI and lifetime savings. See federal tax credit impact and break-even timeline.',
    url: 'https://freefincalc.net/solar-payback-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solar Panel Payback Calculator',
    description: 'Calculate solar panel payback period, ROI and lifetime savings. See federal tax credit impact and break-even timeline.',
  },
}

export default function Layout({ children }) {
  return children
}
