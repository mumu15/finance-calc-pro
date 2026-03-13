import homePrices from '../../../../data/homePrices.js'
import MortgagePriceClient from './MortgagePriceClient.js'
import { notFound } from 'next/navigation'
export async function generateStaticParams() { return homePrices.map(x => ({ price: x.slug })) }





export async function generateMetadata({ params }) {
  return {
    alternates: { canonical: `https://freefincalc.net/mortgage-calculator/price/${params.price}` },
  };
}

export default function Page({ params }) {
  const item = homePrices.find(x => x.slug === params.price)
  if (!item) return notFound()
  return <MortgagePriceClient item={item} all={homePrices} />
}
