import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  metadataBase: new URL('https://freefincalc.net'),
  title: 'Options Profit Calculator | FreeFinCalc',
  description: 'Calculate options trade profit and loss scenarios.',
  alternates: { canonical: 'https://freefincalc.net/investment-return-calculator' },
}
export default function Layout({ children }) {
  return <div className={inter.className}>{children}</div>
}
