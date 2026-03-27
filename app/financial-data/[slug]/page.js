import AGE_TOPICS from '../../../data/ageTopics'
import AgePageClient from './AgePageClient'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return AGE_TOPICS.map(t => ({ slug: t.slug }))
}

export async function generateMetadata({ params }) {
  const t = AGE_TOPICS.find(x => x.slug === params.slug)
  if (!t) return {}
  return {
    title: t.title + ' | FreeFinCalc',
    description: t.desc,
    alternates: { canonical: 'https://www.freefincalc.net/financial-data/' + t.slug },
    openGraph: { title: t.title, description: t.desc, url: 'https://www.freefincalc.net/financial-data/' + t.slug, siteName: 'FreeFinCalc', type: 'article' },
  }
}

export default function Page({ params }) {
  const topic = AGE_TOPICS.find(x => x.slug === params.slug)
  if (!topic) return notFound()
  return <AgePageClient topic={topic} allTopics={AGE_TOPICS} />
}