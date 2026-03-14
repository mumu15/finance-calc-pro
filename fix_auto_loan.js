/**
 * Fix: create app/auto-loan-calculator/page.js
 * node fix_auto_loan.js
 */
const fs = require('fs')

fs.mkdirSync('app/auto-loan-calculator', { recursive: true })

// Option A: redirect page (instant redirect to car-loan-calculator)
fs.writeFileSync('app/auto-loan-calculator/page.js', `'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AutoLoanCalculator() {
  const router = useRouter()
  useEffect(() => { router.replace('/car-loan-calculator') }, [])
  return null
}
`, 'utf8')

// Layout with canonical pointing to car-loan-calculator (tells Google the real page)
fs.writeFileSync('app/auto-loan-calculator/layout.js', `import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://freefincalc.net'),
  title: 'Auto Loan Calculator — Free Car Loan Payment Calculator | FreeFinCalc',
  description: 'Calculate your auto loan monthly payment, total interest and true cost of financing any vehicle. Free auto loan calculator with instant results.',
  alternates: {
    canonical: 'https://freefincalc.net/car-loan-calculator',
  },
}

export default function Layout({ children }) {
  return <div className={inter.className}>{children}</div>
}
`, 'utf8')

console.log('✅ app/auto-loan-calculator created → redirects to /car-loan-calculator')
