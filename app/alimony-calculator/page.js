'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export const metadata = {
  title: 'Alimony Calculator — Free Online Alimony Calculator | FreeFinCalc',
  description: 'Free Alimony Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required. Trusted by thousands.',
  alternates: { canonical: 'https://freefincalc.net/alimony-calculator' },
  openGraph: {
    title: 'Alimony Calculator — Free Online Alimony Calculator | FreeFinCalc',
    description: 'Free Alimony Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required. Trusted by thousands.',
    url: 'https://freefincalc.net/alimony-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  const router = useRouter()
  useEffect(() => { router.replace('/budget-planner-calculator') }, [])
  return null
}
