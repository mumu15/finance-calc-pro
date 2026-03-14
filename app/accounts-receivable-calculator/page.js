import PageClient from './PageClient'

export const metadata = {
  title: 'Accounts Receivable Calculator | FreeFinCalc',
  description: 'Free Accounts Receivable Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
  alternates: { canonical: 'https://www.freefincalc.net/accounts-receivable-calculator' },
  openGraph: {
    title: 'Accounts Receivable Calculator | FreeFinCalc',
    description: 'Free Accounts Receivable Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required.',
    url: 'https://www.freefincalc.net/accounts-receivable-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Page() {
  return <PageClient />;
}
