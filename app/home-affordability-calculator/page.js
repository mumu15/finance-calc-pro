import PageClient from './PageClient'

export const metadata = {
  title: 'Home Affordability Calculator 2026 — How Much House?',
  description: 'Find out how much house you can afford based on income, debt, down payment, and current rates. Uses the 28/36 rule. Free.',
  alternates: { canonical: 'https://www.freefincalc.net/home-affordability-calculator' },
  openGraph: {
    title: 'Home Affordability Calculator 2026 — How Much House?',
    description: 'Free Home Affordability Calculator — estimate housing costs and make smarter real estate decisions. No sign-up.',
    url: 'https://www.freefincalc.net/home-affordability-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
