import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  metadataBase: new URL('https://freefincalc.net'),
  title: 'Construction Loan Calculator | FreeFinCalc',
  description: 'Estimate construction loan payments and total interest.',
}
export default function Layout({ children }) {
  return <div className={inter.className}>{children}</div>
}
