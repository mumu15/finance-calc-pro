import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  metadataBase: new URL('https://www.freefincalc.net'),
  title: 'FHA Loan Calculator | FreeFinCalc',
  description: 'Calculate FHA loan payments with MIP and low down payment options.',
}
export default function Layout({ children }) {
  return <div className={inter.className}>{children}</div>
}
