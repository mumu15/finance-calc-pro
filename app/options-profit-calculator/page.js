'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export const metadata = {
  title: 'Options Profit Calculator — Free Online Options Profit Calculator | FreeFinCalc',
  description: 'Free Options Profit Calculator — analyze business finances, profit margins, and break-even points. Instant results, no sign-up.',
  alternates: { canonical: 'https://freefincalc.net/options-profit-calculator' },
  openGraph: {
    title: 'Options Profit Calculator — Free Online Options Profit Calculator | FreeFinCalc',
    description: 'Free Options Profit Calculator — analyze business finances, profit margins, and break-even points. Instant results, no sign-up.',
    url: 'https://freefincalc.net/options-profit-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  const router = useRouter()
  useEffect(() => { router.replace('/investment-return-calculator') }, [])
  return null
}
