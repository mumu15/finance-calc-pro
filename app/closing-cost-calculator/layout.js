import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  metadataBase: new URL('https://freefincalc.net'),
  title: 'Closing Cost Calculator | FreeFinCalc',
  description: 'Estimate closing costs when buying a home. Typically 2-5% of the purchase price.',
  alternates: { canonical: 'https://freefincalc.net/mortgage-calculator' },
}
export default function Layout({ children }) {
  return <div className={inter.className}>{children}</div>
}
