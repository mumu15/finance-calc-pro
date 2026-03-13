'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export const metadata = {
  title: 'Property Tax by State Calculator — Free Online Property Tax by State Calculator | FreeFinCalc',
  description: 'Free Property Tax by State Calculator — estimate your tax liability, deductions, and take-home pay. Fast, accurate, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/property-tax-by-state-calculator' },
  openGraph: {
    title: 'Property Tax by State Calculator — Free Online Property Tax by State Calculator | FreeFinCalc',
    description: 'Free Property Tax by State Calculator — estimate your tax liability, deductions, and take-home pay. Fast, accurate, no sign-up required.',
    url: 'https://freefincalc.net/property-tax-by-state-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  const router = useRouter()
  useEffect(() => { router.replace('/property-tax-calculator') }, [])
  return null
}
