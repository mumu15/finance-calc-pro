import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import Client from './Client';

export async function generateStaticParams() {
  return [{"asset":"sp500"},{"asset":"nasdaq"},{"asset":"dow-jones"},{"asset":"real-estate"},{"asset":"gold"},{"asset":"silver"},{"asset":"bitcoin"},{"asset":"ethereum"},{"asset":"bonds"},{"asset":"treasury-bonds"},{"asset":"municipal-bonds"},{"asset":"corporate-bonds"},{"asset":"index-funds"},{"asset":"etfs"},{"asset":"mutual-funds"},{"asset":"dividend-stocks"},{"asset":"growth-stocks"},{"asset":"value-stocks"},{"asset":"small-cap-stocks"},{"asset":"large-cap-stocks"},{"asset":"international-stocks"},{"asset":"emerging-markets"},{"asset":"reits"},{"asset":"commodities"},{"asset":"oil"},{"asset":"natural-gas"},{"asset":"agricultural-commodities"},{"asset":"forex"},{"asset":"options"},{"asset":"futures"},{"asset":"peer-to-peer-lending"},{"asset":"crowdfunding"},{"asset":"angel-investing"},{"asset":"venture-capital"},{"asset":"private-equity"},{"asset":"hedge-funds"},{"asset":"annuities"},{"asset":"life-insurance-investment"},{"asset":"529-plan"},{"asset":"hsa"},{"asset":"roth-ira"},{"asset":"traditional-ira"},{"asset":"401k"},{"asset":"solo-401k"},{"asset":"sep-ira"},{"asset":"simple-ira"},{"asset":"defined-benefit-plan"},{"asset":"esop"},{"asset":"stock-options"},{"asset":"rsus"}];
}

export async function generateMetadata() {
  return {
    title: 'NASDAQ Return Calculator | FreeFinCalc.net',
    description: 'Calculate your NASDAQ investment return. Historical average return is 13% per year. See how your money grows over time.',
    alternates: { canonical: 'https://freefincalc.net/investment-return-calculator/asset/nasdaq' },
  };
}

export default function Page() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-950 text-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <nav className="text-sm text-slate-500 mb-6">
            <a href="/" className="hover:text-emerald-400 transition-colors">Home</a>
            <span className="mx-2">/</span>
            <a href="/investment-calculator" className="hover:text-emerald-400 transition-colors">Investment Calculator</a>
            <span className="mx-2">/</span>
            <span className="text-slate-300">NASDAQ</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">NASDAQ Return Calculator</h1>
          <p className="text-slate-400 text-lg mb-10">The historical average annual return for NASDAQ is approximately 13%. Use the calculator below to see how your investment grows over time.</p>
          <Client />
        </div>
      </main>
      <Footer />
    </>
  );
}
