'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export const metadata = {
  title: 'FHA Loan Calculator — Free Online FHA Loan Calculator | FreeFinCalc',
  description: 'Free FHA Loan Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/fha-loan-calculator' },
  openGraph: {
    title: 'FHA Loan Calculator — Free Online FHA Loan Calculator | FreeFinCalc',
    description: 'Free FHA Loan Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
    url: 'https://freefincalc.net/fha-loan-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  const router = useRouter()
  useEffect(() => { router.replace('/mortgage-calculator') }, [])
  return null
}
