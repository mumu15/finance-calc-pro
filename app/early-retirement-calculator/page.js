'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export const metadata = {
  title: 'Early Retirement Calculator — Free Online Early Retirement Calculator | FreeFinCalc',
  description: 'Free Early Retirement Calculator — plan your retirement savings, estimate future balances, and find out if you\'re on track. No sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/early-retirement-calculator' },
  openGraph: {
    title: 'Early Retirement Calculator — Free Online Early Retirement Calculator | FreeFinCalc',
    description: 'Free Early Retirement Calculator — plan your retirement savings, estimate future balances, and find out if you\'re on track. No sign-up required.',
    url: 'https://freefincalc.net/early-retirement-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  const router = useRouter()
  useEffect(() => { router.replace('/fire-calculator') }, [])
  return null
}
