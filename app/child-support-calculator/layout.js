import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  metadataBase: new URL('https://freefincalc.net'),
  title: 'Child Support Calculator | FreeFinCalc',
  description: 'Estimate child support payments based on income and custody.',
}
export default function Layout({ children }) {
  return <div className={inter.className}>{children}</div>
}
