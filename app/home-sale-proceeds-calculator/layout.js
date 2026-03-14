import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  metadataBase: new URL('https://freefincalc.net'),
  title: 'Home Sale Proceeds Calculator | FreeFinCalc',
  description: 'Estimate how much you will net after selling your home.',
}
export default function Layout({ children }) {
  return <div className={inter.className}>{children}</div>
}
