'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export const metadata = {
  title: 'High Yield Savings Calculator — Free Online High Yield Savings Calculator | FreeFinCalc',
  description: 'Free High Yield Savings Calculator — see how your savings grow over time with interest and regular deposits. Free, instant, no sign-up.',
  alternates: { canonical: 'https://freefincalc.net/high-yield-savings-calculator' },
  openGraph: {
    title: 'High Yield Savings Calculator — Free Online High Yield Savings Calculator | FreeFinCalc',
    description: 'Free High Yield Savings Calculator — see how your savings grow over time with interest and regular deposits. Free, instant, no sign-up.',
    url: 'https://freefincalc.net/high-yield-savings-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  const router = useRouter()
  useEffect(() => { router.replace('/savings-growth-calculator') }, [])
  return null
}
