import jobs from '../../../../data/jobs'
import SalaryJobClient from './SalaryJobClient'
import { notFound } from 'next/navigation'
export async function generateStaticParams() {
  return jobs.map(j => ({ job: j.slug }))
}





export async function generateMetadata({ params }) {
  return {
    alternates: { canonical: `https://freefincalc.net/salary-after-tax-calculator/job/${params.job}` },
  };
}

export default function Page({ params }) {
  const job = jobs.find(j => j.slug === params.job)
  if (!job) return notFound()
  return <SalaryJobClient job={job} allJobs={jobs} />
}
