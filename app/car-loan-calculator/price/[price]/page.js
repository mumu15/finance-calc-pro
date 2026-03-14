import carPrices from '../../../../data/carPrices.js'
import CarLoanPriceClient from './CarLoanPriceClient.js'
import { notFound } from 'next/navigation'
export async function generateStaticParams() { return carPrices.map(x => ({ price: x.slug })) }







export async function generateMetadata({ params }) {
  return {
    alternates: { canonical: `https://www.freefincalc.net/car-loan-calculator/price/${params.price}` },
  };
}

export default function Page({ params }) {
  const item = carPrices.find(x => x.slug === params.price)
  if (!item) return notFound()
  return <CarLoanPriceClient item={item} all={carPrices} />
}
