import items from '../../../../data/retirementAges'
import RetirementAgeClient from './RetirementAgeClient'
import { notFound } from 'next/navigation'
export async function generateStaticParams() { return items.map(x => ({ age: x.slug })) }








export async function generateMetadata({ params }) {
  return {
    alternates: { canonical: `https://freefincalc.net/retirement-calculator/age/${params.age}` },
  };
}


export default function Page({ params }) {
  const item = items.find(x => x.slug === params.age)
  if (!item) return notFound()
  return <RetirementAgeClient item={item} all={items} />
}