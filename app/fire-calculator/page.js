import PageClient from './PageClient'

export const metadata = {
  title: 'FIRE Calculator — When Can You Retire Early?',
  description: 'Calculate your financial independence number and retirement date. Based on the 4% rule with your real expenses and savings rate.',
  alternates: { canonical: 'https://www.freefincalc.net/fire-calculator' },
  openGraph: {
    title: 'FIRE Calculator — When Can You Retire Early?',
    description: 'Free FIRE Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://www.freefincalc.net/fire-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
