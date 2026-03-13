import brands from '../../../../data/carBrands'
import CarBrandClient from './CarBrandClient'
import { notFound } from 'next/navigation'
export async function generateStaticParams() {
  return brands.map(b => ({ brand: b.slug }))
}





export async function generateMetadata({ params }) {
  return {
    alternates: { canonical: `https://freefincalc.net/car-loan-calculator/brand/${params.brand}` },
  };
}

export default function Page({ params }) {
  const brand = brands.find(b => b.slug === params.brand)
  if (!brand) return notFound()
  return <CarBrandClient brand={brand} allBrands={brands} />
}
