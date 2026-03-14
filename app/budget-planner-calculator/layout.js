// app/budget-planner-calculator/layout.js
// Server component — exports metadata for this route

export const metadata = {
  title: 'Budget Planner Calculator',
  description: 'Create a monthly budget using the 50/30/20 rule. Calculate needs, wants and savings allocations for any income.',
  openGraph: {
    title: 'Budget Planner Calculator',
    description: 'Create a monthly budget using the 50/30/20 rule. Calculate needs, wants and savings allocations for any income.',
    url: 'https://www.freefincalc.net/budget-planner-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Budget Planner Calculator',
    description: 'Create a monthly budget using the 50/30/20 rule. Calculate needs, wants and savings allocations for any income.',
  },
}

export default function Layout({ children }) {
  return children
}
