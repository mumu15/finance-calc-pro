'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export const metadata = {
  title: 'Percent Change Calculator — Free Online Percent Change Calculator | FreeFinCalc',
  description: 'Free Percent Change Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required. Trusted by thousands.',
  alternates: { canonical: 'https://freefincalc.net/percent-change-calculator' },
  openGraph: {
    title: 'Percent Change Calculator — Free Online Percent Change Calculator | FreeFinCalc',
    description: 'Free Percent Change Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required. Trusted by thousands.',
    url: 'https://freefincalc.net/percent-change-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  const router = useRouter()
  useEffect(() => { router.replace('/percentage-calculator') }, [])
  return null
}
