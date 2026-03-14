import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  metadataBase: new URL('https://www.freefincalc.net'),
  title: 'Unit Converter | FreeFinCalc',
  description: 'Convert between units of measurement including length, weight and volume.',
}
export default function Layout({ children }) {
  return <div className={inter.className}>{children}</div>
}
