import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  metadataBase: new URL('https://www.freefincalc.net'),
  title: 'Index Fund Calculator | FreeFinCalc',
  description: 'Project index fund growth over time with compound returns.',
}
export default function Layout({ children }) {
  return <div className={inter.className}>{children}</div>
}
