import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  metadataBase: new URL('https://freefincalc.net'),
  title: 'Real Estate ROI Calculator | FreeFinCalc',
  description: 'Calculate return on investment for real estate properties.',
}
export default function Layout({ children }) {
  return <div className={inter.className}>{children}</div>
}
