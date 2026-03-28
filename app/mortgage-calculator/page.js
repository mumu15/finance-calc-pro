import PageClient from './PageClient'

export const metadata = {
  title: 'Mortgage Calculator 2026 — Monthly Payment & Amortization',
  description: 'Calculate mortgage payments instantly. See amortization schedule, total interest, and how extra payments save you money. Free.',
  alternates: { canonical: 'https://www.freefincalc.net/mortgage-calculator' },
  openGraph: {
    title: 'Mortgage Calculator 2026 — Monthly Payment & Amortization',
    description: 'Free Mortgage Calculator — estimate monthly payments, amortization, and total cost. Compare rates and scenarios instantly.',
    url: 'https://www.freefincalc.net/mortgage-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
