import states from '../../../../data/states'

export async function generateMetadata({ params }) {
  const state = states.find(s => s.slug === params.state)
  if (!state) return { title: 'Mortgage Calculator by State' }
  const loanAmt = Math.round(state.medianPrice * (1 - state.downPct / 100))
  const monthly = Math.round((loanAmt * (state.rate / 100 / 12)) / (1 - Math.pow(1 + state.rate / 100 / 12, -360)))
  return {
    title: `${state.name} Mortgage Calculator 2026 — Monthly Payment & Rates`,
    description: `Calculate your mortgage payment in ${state.name}. Median home price $${state.medianPrice.toLocaleString()}, avg rate ${state.rate}%, property tax ${state.tax}%. Est. monthly payment $${monthly.toLocaleString()}.`,` },
    openGraph: {
      title: `${state.name} Mortgage Calculator 2026`,
      description: `Free mortgage calculator for ${state.name}. Real 2026 rates, property taxes, and home prices.`,
      url: `https://freefincalc.net/mortgage-calculator/state/${state.slug}`,
    },
  }
}

export default function Layout({ children }) {
  return children
}
