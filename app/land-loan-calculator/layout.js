import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  metadataBase: new URL('https://www.freefincalc.net'),
  title: 'Land Loan Calculator | FreeFinCalc',
  description: 'Calculate monthly payments for land purchase loans.',
}
export default function Layout({ children }) {
  return <div className={inter.className}>{children}</div>
}
