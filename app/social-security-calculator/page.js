import PageClient from './PageClient'

export const metadata = {
  title: 'Social Security Calculator | FreeFinCalc',
  description: 'Free Social Security Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://www.freefincalc.net/social-security-calculator' },
  openGraph: {
    title: 'Social Security Calculator | FreeFinCalc',
    description: 'Free Social Security Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://www.freefincalc.net/social-security-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
