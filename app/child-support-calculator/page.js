import PageClient from './PageClient'

export const metadata = {
  title: 'Child Support Calculator | FreeFinCalc',
  description: 'Free Child Support Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/child-support-calculator' },
  openGraph: {
    title: 'Child Support Calculator | FreeFinCalc',
    description: 'Free Child Support Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://freefincalc.net/child-support-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
