import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  metadataBase: new URL('https://www.freefincalc.net'),
  title: 'Percent Change Calculator | FreeFinCalc',
  description: 'Calculate percentage change, increase or decrease between two values.',
}
export default function Layout({ children }) {
  return <div className={inter.className}>{children}</div>
}
