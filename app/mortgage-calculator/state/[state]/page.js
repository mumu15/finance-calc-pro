import states from '../../../../data/states'
import StateMortgageClient from './StateMortgageClient'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return states.map(s => ({ state: s.slug }))
}

export default function StatePage({ params }) {
  const state = states.find(s => s.slug === params.state)
  if (!state) return notFound()
  return <StateMortgageClient state={state} allStates={states} />
}
