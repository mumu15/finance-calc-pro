import brands from '../../../../data/carBrands'
import CarBrandClient from './CarBrandClient'
import { notFound } from 'next/navigation'
export async function generateStaticParams() {
  return brands.map(b => ({ brand: b.slug }))
}
export default function Page({ params }) {
  const brand = brands.find(b => b.slug === params.brand)
  if (!brand) return notFound()
  return <CarBrandClient brand={brand} allBrands={brands} />
}
