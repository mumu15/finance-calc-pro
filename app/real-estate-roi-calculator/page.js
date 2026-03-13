'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export const metadata = {
  title: 'Real Estate Roi Calculator — Free Online Real Estate Roi Calculator | FreeFinCalc',
  description: 'Free Real Estate Roi Calculator — project investment growth, returns, and compound interest over time. Instant results, no sign-up.',
  alternates: { canonical: 'https://freefincalc.net/real-estate-roi-calculator' },
  openGraph: {
    title: 'Real Estate Roi Calculator — Free Online Real Estate Roi Calculator | FreeFinCalc',
    description: 'Free Real Estate Roi Calculator — project investment growth, returns, and compound interest over time. Instant results, no sign-up.',
    url: 'https://freefincalc.net/real-estate-roi-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  const router = useRouter()
  useEffect(() => { router.replace('/rental-property-calculator') }, [])
  return null
}
