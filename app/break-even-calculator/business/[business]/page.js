import businesses from '../../../../data/businesses.js'
import BreakEvenClient from './BreakEvenClient.js'
import { notFound } from 'next/navigation'
export async function generateStaticParams() { return businesses.map(x => ({ business: x.slug })) }



export async function generateMetadata({ params }) {
  return {
    alternates: { canonical: `https://freefincalc.net/break-even-calculator/business/${params.business}` },
  };
}

export default function Page({ params }) {
  const item = businesses.find(x => x.slug === params.business)
  if (!item) return notFound()
  return <BreakEvenClient item={item} all={businesses} />
}
