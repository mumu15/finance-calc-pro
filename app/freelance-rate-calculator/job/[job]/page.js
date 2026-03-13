import freelanceJobs from '../../../../data/freelanceJobs.js'
import FreelanceRateClient from './FreelanceRateClient.js'
import { notFound } from 'next/navigation'
export async function generateStaticParams() { return freelanceJobs.map(x => ({ job: x.slug })) }

export const metadata = {
  alternates: { canonical: 'https://freefincalc.net/freelance-rate-calculator/job/[job]' },
};

export default function Page({ params }) {
  const item = freelanceJobs.find(x => x.slug === params.job)
  if (!item) return notFound()
  return <FreelanceRateClient item={item} all={freelanceJobs} />
}
