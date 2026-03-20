import PageClient from './PageClient'

export const metadata = {
  title: 'CD vs High-Yield Savings Account — Which Earns More? 2026 | FreeFinCalc',
  description: 'Compare CD vs high-yield savings account returns. See which earns more interest over 1-5 years. Interactive calculator.',
  alternates: { canonical: 'https://www.freefincalc.net/cd-vs-high-yield-savings' },
  openGraph: {
    title: 'CD vs High-Yield Savings Account — Which Earns More? 2026',
    description: 'Compare CD vs high-yield savings account returns. See which earns more interest over 1-5 years. Interactive calculator.',
    url: 'https://www.freefincalc.net/cd-vs-high-yield-savings',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
}

export default function Page() {
  return <PageClient />
}
