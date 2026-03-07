import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://freefincalc.net'),
  title: 'Auto Loan Calculator — Free Car Loan Payment Calculator | FreeFinCalc',
  description: 'Calculate your auto loan monthly payment, total interest and true cost of financing any vehicle. Free auto loan calculator with instant results.',
  alternates: {
    canonical: 'https://freefincalc.net/car-loan-calculator',
  },
}

export default function Layout({ children }) {
  return <div className={inter.className}>{children}</div>
}
