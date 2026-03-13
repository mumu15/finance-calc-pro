import PageClient from './PageClient'

export const metadata = {
  title: 'Freelance Rate Calculator | FreeFinCalc',
  description: 'Free Freelance Rate Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/freelance-rate-calculator' },
  openGraph: {
    title: 'Freelance Rate Calculator | FreeFinCalc',
    description: 'Free Freelance Rate Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://freefincalc.net/freelance-rate-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
