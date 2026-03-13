import studentAmounts from '../../../../data/studentAmounts.js'
import StudentLoanClient from './StudentLoanClient.js'
import { notFound } from 'next/navigation'
export async function generateStaticParams() { return studentAmounts.map(x => ({ amount: x.slug })) }



export async function generateMetadata({ params }) {
  return {
    alternates: { canonical: `https://freefincalc.net/student-loan-calculator/amount/${params.amount}` },
  };
}

export default function Page({ params }) {
  const item = studentAmounts.find(x => x.slug === params.amount)
  if (!item) return notFound()
  return <StudentLoanClient item={item} all={studentAmounts} />
}
