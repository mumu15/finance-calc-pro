import majors from '../../../../data/majors'
import StudentLoanClient from './StudentLoanClient'
import { notFound } from 'next/navigation'
export async function generateStaticParams() {
  return majors.map(m => ({ major: m.slug }))
}
export default function Page({ params }) {
  const major = majors.find(m => m.slug === params.major)
  if (!major) return notFound()
  return <StudentLoanClient major={major} allMajors={majors} />
}
