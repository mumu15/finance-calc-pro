'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export const metadata = {
  title: 'Child Support Calculator — Free Online Child Support Calculator | FreeFinCalc',
  description: 'Free Child Support Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required. Trusted by thousands.',
  alternates: { canonical: 'https://freefincalc.net/child-support-calculator' },
  openGraph: {
    title: 'Child Support Calculator — Free Online Child Support Calculator | FreeFinCalc',
    description: 'Free Child Support Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required. Trusted by thousands.',
    url: 'https://freefincalc.net/child-support-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  const router = useRouter()
  useEffect(() => { router.replace('/budget-planner-calculator') }, [])
  return null
}
