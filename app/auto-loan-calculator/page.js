'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AutoLoanCalculator() {
  const router = useRouter()
  useEffect(() => { router.replace('/car-loan-calculator') }, [])
  return null
}
