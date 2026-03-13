import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import Client from './Client';
import SchemaMarkup from '../../../components/SchemaMarkup';


export async function generateStaticParams() {
  return [{"purpose":"debt-consolidation"},{"purpose":"home-improvement"},{"purpose":"medical-expenses"},{"purpose":"car-repair"},{"purpose":"wedding"},{"purpose":"vacation"},{"purpose":"moving-expenses"},{"purpose":"business-startup"},{"purpose":"education"},{"purpose":"emergency-fund"},{"purpose":"furniture"},{"purpose":"appliances"},{"purpose":"electronics"},{"purpose":"dental"},{"purpose":"vet-bills"},{"purpose":"taxes"},{"purpose":"rent-deposit"},{"purpose":"baby-expenses"},{"purpose":"adoption"},{"purpose":"fertility-treatment"},{"purpose":"solar-panels"},{"purpose":"roof-repair"},{"purpose":"hvac"},{"purpose":"plumbing"},{"purpose":"kitchen-remodel"},{"purpose":"bathroom-remodel"},{"purpose":"basement-finishing"},{"purpose":"garage"},{"purpose":"pool"},{"purpose":"landscaping"},{"purpose":"fence"},{"purpose":"flooring"},{"purpose":"windows"},{"purpose":"doors"},{"purpose":"siding"},{"purpose":"driveway"},{"purpose":"rv"},{"purpose":"boat"},{"purpose":"motorcycle"},{"purpose":"atv"},{"purpose":"musical-instrument"},{"purpose":"art"},{"purpose":"photography"},{"purpose":"gym-equipment"},{"purpose":"clothing"},{"purpose":"jewelry"},{"purpose":"engagement-ring"},{"purpose":"divorce"},{"purpose":"legal-fees"},{"purpose":"burial-funeral"}];
}

export async function generateMetadata() {
  return {
    title: 'Personal Loan for Photography Equipment | FreeFinCalc.net',
    description: 'Invest in professional camera gear and lighting. Use our free calculator to estimate monthly payments.',
    alternates: { canonical: 'https://freefincalc.net/personal-loan/purpose/photography' },
  };
}

export default function Page() {
  return (
    <>
      <Header />
      <SchemaMarkup breadcrumbs={[{"name":"Home","url":"https://freefincalc.net/"},{"name":"Personal Loan Calculator","url":"https://freefincalc.net/personal-loan"},{"name":"Photography","url":"https://freefincalc.net/personal-loan/purpose/photography"}]} includeReview={true} />
      <main className="min-h-screen bg-slate-950 text-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <nav className="text-sm text-slate-500 mb-6">
            <a href="/" className="hover:text-amber-400 transition-colors">Home</a>
            <span className="mx-2">/</span>
            <a href="/personal-loan-calculator" className="hover:text-amber-400 transition-colors">Personal Loan</a>
            <span className="mx-2">/</span>
            <span className="text-slate-300">Photography Equipment</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Personal Loan for Photography Equipment</h1>
          <p className="text-slate-400 text-lg mb-10">Invest in professional camera gear and lighting.</p>
          <Client />
        </div>
      </main>
      <Footer />
    </>
  );
}
