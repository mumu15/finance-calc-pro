'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export const metadata = {
  title: 'Closing Cost Calculator — Free Online Closing Cost Calculator | FreeFinCalc',
  description: 'Free Closing Cost Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required. Trusted by thousands.',
  alternates: { canonical: 'https://freefincalc.net/closing-cost-calculator' },
  openGraph: {
    title: 'Closing Cost Calculator — Free Online Closing Cost Calculator | FreeFinCalc',
    description: 'Free Closing Cost Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required. Trusted by thousands.',
    url: 'https://freefincalc.net/closing-cost-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  const router = useRouter()
  useEffect(() => { router.replace('/mortgage-calculator') }, [])
  return null
}
