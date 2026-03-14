import propertyTaxStates from '../../../../data/propertyTaxStates'
import PTStateClient from './PTStateClient'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return propertyTaxStates.map(s => ({ state: s.slug }))
}

export async function generateMetadata({ params }) {
  const s = propertyTaxStates.find(x => x.slug === params.state)
  if (!s) return {}
  return {
    title: s.name + ' Property Tax Calculator 2026 | FreeFinCalc',
    description: 'Calculate property taxes in ' + s.name + '. ' + s.name + ' property tax rate is ' + s.propertyTaxRate + '%. Median home: $' + s.medianHome.toLocaleString() + '. Free calculator, instant results.',
    alternates: { canonical: 'https://www.freefincalc.net/property-tax-calculator/state/' + s.slug },
    openGraph: {
      title: s.name + ' Property Tax Calculator 2026',
      description: 'Calculate ' + s.name + ' property taxes. Rate: ' + s.propertyTaxRate + '%. Median home: $' + s.medianHome.toLocaleString() + '.',
      url: 'https://www.freefincalc.net/property-tax-calculator/state/' + s.slug,
      siteName: 'FreeFinCalc',
      type: 'website',
    },
  }
}

export default function Page({ params }) {
  const item = propertyTaxStates.find(x => x.slug === params.state)
  if (!item) return notFound()
  return <PTStateClient item={item} all={propertyTaxStates} />
}
