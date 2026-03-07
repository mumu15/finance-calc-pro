import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  metadataBase: new URL('https://freefincalc.net'),
  title: 'House Affordability Calculator | FreeFinCalc',
  description: 'Find out how much house you can afford based on income and expenses.',
  alternates: { canonical: 'https://freefincalc.net/mortgage-calculator' },
}
export default function Layout({ children }) {
  return <div className={inter.className}>{children}</div>
}
