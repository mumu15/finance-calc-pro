import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  metadataBase: new URL('https://freefincalc.net'),
  title: 'RMD Calculator | FreeFinCalc',
  description: 'Calculate required minimum distributions from retirement accounts.',
}
export default function Layout({ children }) {
  return <div className={inter.className}>{children}</div>
}
