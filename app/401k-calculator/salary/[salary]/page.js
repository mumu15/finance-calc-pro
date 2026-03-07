import salaries401k from '../../../../data/salaries401k.js'
import FourOhOneKClient from './FourOhOneKClient.js'
import { notFound } from 'next/navigation'
export async function generateStaticParams() { return salaries401k.map(x => ({ salary: x.slug })) }
export default function Page({ params }) {
  const item = salaries401k.find(x => x.slug === params.salary)
  if (!item) return notFound()
  return <FourOhOneKClient item={item} all={salaries401k} />
}
