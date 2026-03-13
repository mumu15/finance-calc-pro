import scenarios from '../../../../data/ciScenarios'
import CIScenarioClient from './CIScenarioClient'
import { notFound } from 'next/navigation'
export async function generateStaticParams() { return scenarios.map(s => ({ scenario: s.slug })) }





export async function generateMetadata({ params }) {
  return {
    alternates: { canonical: `https://freefincalc.net/compound-interest/scenario/${params.scenario}` },
  };
}

export default function Page({ params }) {
  const item = scenarios.find(s => s.slug === params.scenario)
  if (!item) return notFound()
  return <CIScenarioClient item={item} all={scenarios} />
}
