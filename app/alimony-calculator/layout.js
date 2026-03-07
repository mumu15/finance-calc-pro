import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  metadataBase: new URL('https://freefincalc.net'),
  title: 'Alimony Calculator | FreeFinCalc',
  description: 'Estimate alimony payments based on marriage length and income.',
  alternates: { canonical: 'https://freefincalc.net/budget-planner-calculator' },
}
export default function Layout({ children }) {
  return <div className={inter.className}>{children}</div>
}
