import purposes from '../../../../data/loanPurposes'
import PersonalLoanClient from './PersonalLoanClient'
import { notFound } from 'next/navigation'
export async function generateStaticParams() {
  return purposes.map(p => ({ purpose: p.slug }))
}



export async function generateMetadata({ params }) {
  return {
    alternates: { canonical: `https://freefincalc.net/personal-loan-calculator/purpose/${params.purpose}` },
  };
}

export default function Page({ params }) {
  const purpose = purposes.find(p => p.slug === params.purpose)
  if (!purpose) return notFound()
  return <PersonalLoanClient purpose={purpose} allPurposes={purposes} />
}
