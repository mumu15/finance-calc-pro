import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  metadataBase: new URL('https://www.freefincalc.net'),
  title: 'Take-Home Pay Calculator | FreeFinCalc',
  description: 'Calculate your exact take-home pay after all taxes and deductions.',
}
export default function Layout({ children }) {
  return <div className={inter.className}>{children}</div>
}
