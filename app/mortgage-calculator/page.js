import PageClient from './PageClient'

export const metadata = {
  title: 'Mortgage Calculator: Real Monthly Payment with 2026 Rates (PITI)',
  description: 'Free mortgage calculator with current April 2026 rates from Freddie Mac (30-year 6.46%, 15-year 5.77%). Calculates real monthly payment with principal, interest, taxes, insurance, PMI and HOA. Includes 5 real scenarios and what most calculators miss.',
  keywords: [
    'mortgage calculator',
    'mortgage payment calculator',
    'home loan calculator',
    'piti calculator',
    'mortgage calculator with taxes and insurance',
    'monthly mortgage payment',
    '30 year mortgage calculator',
    '15 year mortgage calculator',
    'mortgage calculator 2026',
  ],
  alternates: { canonical: 'https://www.freefincalc.net/mortgage-calculator' },
  openGraph: {
    title: 'Mortgage Calculator (April 2026 Rates)',
    description: 'See your real monthly mortgage payment with current Freddie Mac rates. Includes principal, interest, taxes, insurance, PMI and HOA. Free, no sign-up.',
    url: 'https://www.freefincalc.net/mortgage-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mortgage Calculator: Real PITI with 2026 Rates',
    description: 'Free calculator using current Freddie Mac rates. Includes everything most calculators leave out.',
  },
}

export default function Page() {
  return <PageClient />
}
