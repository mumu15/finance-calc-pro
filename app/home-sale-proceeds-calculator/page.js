'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export const metadata = {
  title: 'Home Sale Proceeds Calculator — Free Online Home Sale Proceeds Calculator | FreeFinCalc',
  description: 'Free Home Sale Proceeds Calculator — estimate housing costs, affordability, and make smarter real estate decisions. No sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/home-sale-proceeds-calculator' },
  openGraph: {
    title: 'Home Sale Proceeds Calculator — Free Online Home Sale Proceeds Calculator | FreeFinCalc',
    description: 'Free Home Sale Proceeds Calculator — estimate housing costs, affordability, and make smarter real estate decisions. No sign-up required.',
    url: 'https://freefincalc.net/home-sale-proceeds-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  const router = useRouter()
  useEffect(() => { router.replace('/home-equity-calculator') }, [])
  return null
}
