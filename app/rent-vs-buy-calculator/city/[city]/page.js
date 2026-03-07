import rvbCities from '../../../../data/rvbCities.js'
import RvBCityClient from './RvBCityClient.js'
import { notFound } from 'next/navigation'
export async function generateStaticParams() { return rvbCities.map(x => ({ city: x.slug })) }
export default function Page({ params }) {
  const item = rvbCities.find(x => x.slug === params.city)
  if (!item) return notFound()
  return <RvBCityClient item={item} all={rvbCities} />
}
