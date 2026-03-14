import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  metadataBase: new URL('https://www.freefincalc.net'),
  title: 'Property Tax by State | FreeFinCalc',
  description: 'Compare property tax rates by state to estimate your annual tax bill.',
}
export default function Layout({ children }) {
  return <div className={inter.className}>{children}</div>
}
