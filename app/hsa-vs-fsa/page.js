import PageClient from './PageClient'

export const metadata = {
  title: 'HSA vs FSA — Which Health Account Is Better? 2026 | FreeFinCalc',
  description: 'Compare HSA vs FSA health savings accounts. See tax savings, rollover rules, and which saves you more money. Free calculator.',
  alternates: { canonical: 'https://www.freefincalc.net/hsa-vs-fsa' },
  openGraph: {
    title: 'HSA vs FSA — Which Health Account Is Better? 2026',
    description: 'Compare HSA vs FSA health savings accounts. See tax savings, rollover rules, and which saves you more money. Free calculator.',
    url: 'https://www.freefincalc.net/hsa-vs-fsa',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
}

export default function Page() {
  return <PageClient />
}
