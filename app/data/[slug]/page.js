import colStates from '../../../data/colStates'
import TOPICS from '../../../data/dataTopics'
import DataPageClient from './DataPageClient'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return TOPICS.map(t => ({ slug: t.slug }))
}

export async function generateMetadata({ params }) {
  const t = TOPICS.find(x => x.slug === params.slug)
  if (!t) return {}
  return {
    title: t.title + ' | FreeFinCalc',
    description: t.desc,
    alternates: { canonical: 'https://www.freefincalc.net/data/' + t.slug },
    openGraph: {
      title: t.title,
      description: t.desc,
      url: 'https://www.freefincalc.net/data/' + t.slug,
      siteName: 'FreeFinCalc',
      type: 'article',
    },
  }
}

export default function Page({ params }) {
  const topic = TOPICS.find(x => x.slug === params.slug)
  if (!topic) return notFound()
  return <DataPageClient topic={topic} states={colStates} allTopics={TOPICS} />
}