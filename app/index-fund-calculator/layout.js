import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  metadataBase: new URL('https://freefincalc.net'),
  title: 'Index Fund Calculator | FreeFinCalc',
  description: 'Project index fund growth over time with compound returns.',
  alternates: { canonical: 'https://freefincalc.net/investment-return-calculator' },
}
export default function Layout({ children }) {
  return <div className={inter.className}>{children}</div>
}
