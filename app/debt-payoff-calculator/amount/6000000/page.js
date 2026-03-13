import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import Client from './Client';

export async function generateStaticParams() {
  return [{"amount":"1000"},{"amount":"2000"},{"amount":"3000"},{"amount":"4000"},{"amount":"5000"},{"amount":"6000"},{"amount":"7000"},{"amount":"8000"},{"amount":"9000"},{"amount":"10000"},{"amount":"12000"},{"amount":"15000"},{"amount":"18000"},{"amount":"20000"},{"amount":"25000"},{"amount":"30000"},{"amount":"35000"},{"amount":"40000"},{"amount":"45000"},{"amount":"50000"},{"amount":"60000"},{"amount":"70000"},{"amount":"80000"},{"amount":"90000"},{"amount":"100000"},{"amount":"120000"},{"amount":"150000"},{"amount":"175000"},{"amount":"200000"},{"amount":"250000"},{"amount":"300000"},{"amount":"350000"},{"amount":"400000"},{"amount":"500000"},{"amount":"600000"},{"amount":"700000"},{"amount":"800000"},{"amount":"900000"},{"amount":"1000000"},{"amount":"1200000"},{"amount":"1500000"},{"amount":"1750000"},{"amount":"2000000"},{"amount":"2500000"},{"amount":"3000000"},{"amount":"4000000"},{"amount":"5000000"},{"amount":"6000000"},{"amount":"7000000"},{"amount":"8000000"}];
}

export async function generateMetadata() {
  return {
    title: 'How Long to Pay Off $6,000,000 in Debt? | FreeFinCalc.net',
    description: 'Find out how long it takes to pay off $6,000,000 in debt. Calculate monthly payments, total interest and payoff date with our free debt payoff calculator.',
    alternates: { canonical: 'https://freefincalc.net/debt-payoff-calculator/amount/6000000' },
  };
}

export default function Page() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-950 text-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <nav className="text-sm text-slate-500 mb-6">
            <a href="/" className="hover:text-red-400 transition-colors">Home</a>
            <span className="mx-2">/</span>
            <a href="/debt-payoff-calculator" className="hover:text-red-400 transition-colors">Debt Payoff</a>
            <span className="mx-2">/</span>
            <span className="text-slate-300">$6,000,000</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">How Long to Pay Off $6,000,000 in Debt?</h1>
          <p className="text-slate-400 text-lg mb-10">Use the calculator below to find out exactly how long it will take to pay off $6,000,000 in debt and how much interest you will pay in total.</p>
          <Client />
        </div>
      </main>
      <Footer />
    </>
  );
}
