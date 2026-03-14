import states from '../../../../data/states'
import HAStateClient from './HAStateClient'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return states.map(s => ({ state: s.slug }))
}

export async function generateMetadata({ params }) {
  const s = states.find(x => x.slug === params.state)
  if (!s) return {}
  const income = Math.round(s.medianPrice * 0.28 / 12 * 12 / 0.28)
  return {
    title: 'How Much House Can I Afford in ' + s.name + '? 2026 Calculator | FreeFinCalc',
    description: 'Calculate how much house you can afford in ' + s.name + '. Median home: $' + s.medianPrice.toLocaleString() + '. Based on ' + s.name + ' property taxes (' + s.tax + '%), insurance, and current mortgage rates.',
    alternates: { canonical: 'https://www.freefincalc.net/home-affordability-calculator/state/' + s.slug },
    openGraph: {
      title: 'How Much House Can I Afford in ' + s.name + '?',
      description: 'Home affordability calculator for ' + s.name + '. Median home: $' + s.medianPrice.toLocaleString() + '.',
      url: 'https://www.freefincalc.net/home-affordability-calculator/state/' + s.slug,
      siteName: 'FreeFinCalc',
      type: 'website',
    },
  }
}

export default function Page({ params }) {
  const item = states.find(x => x.slug === params.state)
  if (!item) return notFound()
  return <HAStateClient item={item} all={states} />
}
