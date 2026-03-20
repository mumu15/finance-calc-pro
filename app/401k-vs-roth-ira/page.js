import PageClient from './PageClient'

export const metadata = {
  title: '401k vs Roth IRA — Which Is Better? 2026 Calculator | FreeFinCalc',
  description: 'Compare 401k vs Roth IRA side by side. See which gives you more money at retirement. Interactive calculator with employer match, tax brackets, and growth projections.',
  alternates: { canonical: 'https://www.freefincalc.net/401k-vs-roth-ira' },
  openGraph: {
    title: '401k vs Roth IRA — Which Is Better? 2026 Calculator',
    description: 'Compare 401k vs Roth IRA side by side. See which gives you more money at retirement. Interactive calculator with employer match, tax brackets, and growth projections.',
    url: 'https://www.freefincalc.net/401k-vs-roth-ira',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
}

export default function Page() {
  return <PageClient />
}
