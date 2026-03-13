'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export const metadata = {
  title: 'House Affordability Calculator — Free Online House Affordability Calculator | FreeFinCalc',
  description: 'Free House Affordability Calculator — estimate housing costs, affordability, and make smarter real estate decisions. No sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/house-affordability-calculator' },
  openGraph: {
    title: 'House Affordability Calculator — Free Online House Affordability Calculator | FreeFinCalc',
    description: 'Free House Affordability Calculator — estimate housing costs, affordability, and make smarter real estate decisions. No sign-up required.',
    url: 'https://freefincalc.net/house-affordability-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  const router = useRouter()
  useEffect(() => { router.replace('/mortgage-calculator') }, [])
  return null
}
