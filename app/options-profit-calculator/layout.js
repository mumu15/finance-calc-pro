import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  metadataBase: new URL('https://www.freefincalc.net'),
  title: 'Options Profit Calculator | FreeFinCalc',
  description: 'Calculate options trade profit and loss scenarios.',
}
export default function Layout({ children }) {
  return <div className={inter.className}>{children}</div>
}
