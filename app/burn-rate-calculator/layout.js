import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  metadataBase: new URL('https://www.freefincalc.net'),
  title: 'Burn Rate Calculator | FreeFinCalc',
  description: 'Calculate your monthly burn rate and cash runway.',
}
export default function Layout({ children }) {
  return <div className={inter.className}>{children}</div>
}
