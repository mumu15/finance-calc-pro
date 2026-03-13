'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'


export const metadata = {
  title: 'Auto Loan Calculator — Free Online Auto Loan Calculator | FreeFinCalc',
  description: 'Free Auto Loan Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/auto-loan-calculator' },
  openGraph: {
    title: 'Auto Loan Calculator — Free Online Auto Loan Calculator | FreeFinCalc',
    description: 'Free Auto Loan Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
    url: 'https://freefincalc.net/auto-loan-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function AutoLoanCalculator() {
  const router = useRouter()
  useEffect(() => { router.replace('/car-loan-calculator') }, [])
  return null
}
