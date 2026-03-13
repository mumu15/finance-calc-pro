import PageClient from './PageClient'

export const metadata = {
  title: 'Required Minimum Distribution Calculator | FreeFinCalc',
  description: 'Free Required Minimum Distribution Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/required-minimum-distribution-calculator' },
  openGraph: {
    title: 'Required Minimum Distribution Calculator | FreeFinCalc',
    description: 'Free Required Minimum Distribution Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://freefincalc.net/required-minimum-distribution-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
