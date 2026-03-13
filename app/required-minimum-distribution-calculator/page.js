'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export const metadata = {
  title: 'Required Minimum Distribution Calculator — Free Online Required Minimum Distribution Calculator | FreeFinCalc',
  description: 'Free Required Minimum Distribution Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required. Trusted by thousands.',
  alternates: { canonical: 'https://freefincalc.net/required-minimum-distribution-calculator' },
  openGraph: {
    title: 'Required Minimum Distribution Calculator — Free Online Required Minimum Distribution Calculator | FreeFinCalc',
    description: 'Free Required Minimum Distribution Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required. Trusted by thousands.',
    url: 'https://freefincalc.net/required-minimum-distribution-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  const router = useRouter()
  useEffect(() => { router.replace('/retirement-calculator') }, [])
  return null
}
