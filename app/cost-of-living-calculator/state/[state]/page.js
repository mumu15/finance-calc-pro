import colStates from '../../../../data/colStates'
import COLStateClient from './COLStateClient'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return colStates.map(s => ({ state: s.slug }))
}

export async function generateMetadata({ params }) {
  const s = colStates.find(x => x.slug === params.state)
  if (!s) return {}
  const dir = s.colIndex > 100 ? (s.colIndex - 100) + '% above' : (100 - s.colIndex) + '% below'
  return {
    title: 'Cost of Living in ' + s.name + ' 2026 — Complete Guide & Calculator | FreeFinCalc',
    description: s.name + ' cost of living is ' + dir + ' the US average. Median rent: $' + s.medianRent.toLocaleString() + '/mo. Median income: $' + s.medianIncome.toLocaleString() + '. ' + (s.noTax ? 'No state income tax.' : 'State tax: ' + s.taxRate + '%.') + ' Free calculator & comparison tool.',
    alternates: { canonical: 'https://www.freefincalc.net/cost-of-living-calculator/state/' + s.slug },
    openGraph: {
      title: 'Cost of Living in ' + s.name + ' (' + s.abbr + ') 2026',
      description: s.name + ' COL index: ' + s.colIndex + '. Housing: ' + s.housing + '. Rent: $' + s.medianRent + '/mo. Complete breakdown + calculator.',
      url: 'https://www.freefincalc.net/cost-of-living-calculator/state/' + s.slug,
      siteName: 'FreeFinCalc', type: 'website',
    },
  }
}

export default function Page({ params }) {
  const item = colStates.find(x => x.slug === params.state)
  if (!item) return notFound()
  return <COLStateClient item={item} all={colStates} />
}
