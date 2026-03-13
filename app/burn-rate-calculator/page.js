'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export const metadata = {
  title: 'Burn Rate Calculator — Free Online Burn Rate Calculator | FreeFinCalc',
  description: 'Free Burn Rate Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required. Trusted by thousands.',
  alternates: { canonical: 'https://freefincalc.net/burn-rate-calculator' },
  openGraph: {
    title: 'Burn Rate Calculator — Free Online Burn Rate Calculator | FreeFinCalc',
    description: 'Free Burn Rate Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required. Trusted by thousands.',
    url: 'https://freefincalc.net/burn-rate-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  const router = useRouter()
  useEffect(() => { router.replace('/runway-calculator') }, [])
  return null
}
