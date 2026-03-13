'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export const metadata = {
  title: 'Land Loan Calculator — Free Online Land Loan Calculator | FreeFinCalc',
  description: 'Free Land Loan Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/land-loan-calculator' },
  openGraph: {
    title: 'Land Loan Calculator — Free Online Land Loan Calculator | FreeFinCalc',
    description: 'Free Land Loan Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
    url: 'https://freefincalc.net/land-loan-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  const router = useRouter()
  useEffect(() => { router.replace('/mortgage-calculator') }, [])
  return null
}
