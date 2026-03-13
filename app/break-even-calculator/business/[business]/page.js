import businesses from '../../../../data/businesses.js'
import BreakEvenClient from './BreakEvenClient.js'
import { notFound } from 'next/navigation'
export async function generateStaticParams() { return businesses.map(x => ({ business: x.slug })) }

export const metadata = {
  alternates: { canonical: 'https://freefincalc.net/break-even-calculator/business/[business]' },
};

export default function Page({ params }) {
  const item = businesses.find(x => x.slug === params.business)
  if (!item) return notFound()
  return <BreakEvenClient item={item} all={businesses} />
}
