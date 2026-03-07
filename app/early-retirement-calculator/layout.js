import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  metadataBase: new URL('https://freefincalc.net'),
  title: 'Early Retirement Calculator | FreeFinCalc',
  description: 'Calculate when you can retire early based on savings and expenses.',
  alternates: { canonical: 'https://freefincalc.net/fire-calculator' },
}
export default function Layout({ children }) {
  return <div className={inter.className}>{children}</div>
}
