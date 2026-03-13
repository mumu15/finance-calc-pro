'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export const metadata = {
  title: 'Index Fund Calculator — Free Online Index Fund Calculator | FreeFinCalc',
  description: 'Free Index Fund Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required. Trusted by thousands.',
  alternates: { canonical: 'https://freefincalc.net/index-fund-calculator' },
  openGraph: {
    title: 'Index Fund Calculator — Free Online Index Fund Calculator | FreeFinCalc',
    description: 'Free Index Fund Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required. Trusted by thousands.',
    url: 'https://freefincalc.net/index-fund-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  const router = useRouter()
  useEffect(() => { router.replace('/investment-return-calculator') }, [])
  return null
}
