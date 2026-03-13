'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export const metadata = {
  title: 'Construction Loan Calculator — Free Online Construction Loan Calculator | FreeFinCalc',
  description: 'Free Construction Loan Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/construction-loan-calculator' },
  openGraph: {
    title: 'Construction Loan Calculator — Free Online Construction Loan Calculator | FreeFinCalc',
    description: 'Free Construction Loan Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
    url: 'https://freefincalc.net/construction-loan-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  const router = useRouter()
  useEffect(() => { router.replace('/mortgage-calculator') }, [])
  return null
}
