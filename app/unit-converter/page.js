'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export const metadata = {
  title: 'Unit Converter — Free Online Unit Converter | FreeFinCalc',
  description: 'Free Unit Converter — get instant results with our easy-to-use calculator. 100% free, no sign-up required. Trusted by thousands.',
  alternates: { canonical: 'https://freefincalc.net/unit-converter' },
  openGraph: {
    title: 'Unit Converter — Free Online Unit Converter | FreeFinCalc',
    description: 'Free Unit Converter — get instant results with our easy-to-use calculator. 100% free, no sign-up required. Trusted by thousands.',
    url: 'https://freefincalc.net/unit-converter',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  const router = useRouter()
  useEffect(() => { router.replace('/percentage-calculator') }, [])
  return null
}
