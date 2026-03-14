import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  metadataBase: new URL('https://freefincalc.net'),
  title: 'High-Yield Savings Calculator | FreeFinCalc',
  description: 'See how much more you earn with a high-yield savings account.',
}
export default function Layout({ children }) {
  return <div className={inter.className}>{children}</div>
}
