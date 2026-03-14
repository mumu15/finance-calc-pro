import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  metadataBase: new URL('https://www.freefincalc.net'),
  title: 'Alimony Calculator | FreeFinCalc',
  description: 'Estimate alimony payments based on marriage length and income.',
}
export default function Layout({ children }) {
  return <div className={inter.className}>{children}</div>
}
