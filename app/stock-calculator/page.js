'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export const metadata = {
  title: 'Stock Calculator — Free Online Stock Calculator | FreeFinCalc',
  description: 'Free Stock Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required. Trusted by thousands.',
  alternates: { canonical: 'https://freefincalc.net/stock-calculator' },
  openGraph: {
    title: 'Stock Calculator — Free Online Stock Calculator | FreeFinCalc',
    description: 'Free Stock Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required. Trusted by thousands.',
    url: 'https://freefincalc.net/stock-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  const router = useRouter()
  useEffect(() => { router.replace('/investment-return-calculator') }, [])
  return null
}
