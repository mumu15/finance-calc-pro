import colStates from '../../../data/colStates'
import PROFESSIONS from '../../../data/professions'
import SalaryPageClient from './SalaryPageClient'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return PROFESSIONS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const p = PROFESSIONS.find(x => x.slug === params.slug)
  if (!p) return {}
  return {
    title: p.title + ' | FreeFinCalc',
    description: p.desc,
    alternates: { canonical: 'https://www.freefincalc.net/salary-data/' + p.slug },
    openGraph: { title: p.title, description: p.desc, url: 'https://www.freefincalc.net/salary-data/' + p.slug, siteName: 'FreeFinCalc', type: 'article' },
  }
}

export default function Page({ params }) {
  const prof = PROFESSIONS.find(x => x.slug === params.slug)
  if (!prof) return notFound()
  return <SalaryPageClient prof={prof} states={colStates} allProfs={PROFESSIONS} />
}