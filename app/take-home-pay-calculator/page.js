'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export const metadata = {
  title: 'Take Home Pay Calculator — Free Online Take Home Pay Calculator | FreeFinCalc',
  description: 'Free Take Home Pay Calculator — calculate your take-home pay, hourly rate, and tax withholdings. Instant results, no sign-up.',
  alternates: { canonical: 'https://freefincalc.net/take-home-pay-calculator' },
  openGraph: {
    title: 'Take Home Pay Calculator — Free Online Take Home Pay Calculator | FreeFinCalc',
    description: 'Free Take Home Pay Calculator — calculate your take-home pay, hourly rate, and tax withholdings. Instant results, no sign-up.',
    url: 'https://freefincalc.net/take-home-pay-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  const router = useRouter()
  useEffect(() => { router.replace('/salary-after-tax-calculator') }, [])
  return null
}
