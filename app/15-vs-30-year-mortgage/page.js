import PageClient from './PageClient'

export const metadata = {
  title: '15 vs 30 Year Mortgage — Compare Payments & Total Cost 2026 | FreeFinCalc',
  description: 'Compare 15 year vs 30 year mortgage payments, total interest, and total cost. See how much you save with a 15-year loan. Free calculator.',
  alternates: { canonical: 'https://www.freefincalc.net/15-vs-30-year-mortgage' },
  openGraph: {
    title: '15 vs 30 Year Mortgage — Compare Payments & Total Cost 2026',
    description: 'Compare 15 year vs 30 year mortgage payments, total interest, and total cost. See how much you save with a 15-year loan. Free calculator.',
    url: 'https://www.freefincalc.net/15-vs-30-year-mortgage',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
}

export default function Page() {
  return <PageClient />
}
