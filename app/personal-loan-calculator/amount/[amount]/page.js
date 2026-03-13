import items from '../../../../data/loanAmounts'
import LoanAmountClient from './LoanAmountClient'
import { notFound } from 'next/navigation'
export async function generateStaticParams() { return items.map(x => ({ amount: x.slug })) }



export async function generateMetadata({ params }) {
  return {
    alternates: { canonical: `https://freefincalc.net/personal-loan-calculator/amount/${params.amount}` },
  };
}

export default function Page({ params }) {
  const item = items.find(x => x.slug === params.amount)
  if (!item) return notFound()
  return <LoanAmountClient item={item} all={items} />
}
