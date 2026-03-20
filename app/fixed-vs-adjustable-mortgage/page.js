import PageClient from './PageClient'

export const metadata = {
  title: 'Fixed vs ARM Mortgage — Which Should You Choose? 2026 | FreeFinCalc',
  description: 'Compare fixed rate vs adjustable rate mortgages. See monthly payments, 5-year cost, and break-even point. Free calculator.',
  alternates: { canonical: 'https://www.freefincalc.net/fixed-vs-adjustable-mortgage' },
  openGraph: {
    title: 'Fixed vs ARM Mortgage — Which Should You Choose? 2026',
    description: 'Compare fixed rate vs adjustable rate mortgages. See monthly payments, 5-year cost, and break-even point. Free calculator.',
    url: 'https://www.freefincalc.net/fixed-vs-adjustable-mortgage',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
}

export default function Page() {
  return <PageClient />
}
