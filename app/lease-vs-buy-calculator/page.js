import PageClient from './PageClient'

export const metadata = {
  title: 'Lease vs Buy Calculator | FreeFinCalc',
  description: 'Free Lease vs Buy Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://www.freefincalc.net/lease-vs-buy-calculator' },
  openGraph: {
    title: 'Lease vs Buy Calculator | FreeFinCalc',
    description: 'Free Lease vs Buy Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://www.freefincalc.net/lease-vs-buy-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
