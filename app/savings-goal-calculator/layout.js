// app/savings-goal-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Savings Goal Calculator',
  description: 'Calculate how long to reach any savings goal or monthly amount needed. Plan savings for any financial target.',
  openGraph: {
    title: 'Savings Goal Calculator',
    description: 'Calculate how long to reach any savings goal or monthly amount needed. Plan savings for any financial target.',
    url: 'https://www.freefincalc.net/savings-goal-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Savings Goal Calculator',
    description: 'Calculate how long to reach any savings goal or monthly amount needed. Plan savings for any financial target.',
  },
}

export default function Layout({ children }) {
  return children
}
