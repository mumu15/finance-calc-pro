import goals from '../../../../data/savingsGoals'
import SavingsGoalClient from './SavingsGoalClient'
import { notFound } from 'next/navigation'
export async function generateStaticParams() { return goals.map(g => ({ goal: g.slug })) }



export async function generateMetadata({ params }) {
  return {
    alternates: { canonical: `https://freefincalc.net/savings-goal-calculator/goal/${params.goal}` },
  };
}

export default function Page({ params }) {
  const item = goals.find(g => g.slug === params.goal)
  if (!item) return notFound()
  return <SavingsGoalClient item={item} all={goals} />
}
