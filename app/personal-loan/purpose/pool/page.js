import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import Client from './Client';
import SchemaMarkup from '../../../../components/SchemaMarkup';


export async function generateStaticParams() {
  return [{"purpose":"debt-consolidation"},{"purpose":"home-improvement"},{"purpose":"medical-expenses"},{"purpose":"car-repair"},{"purpose":"wedding"},{"purpose":"vacation"},{"purpose":"moving-expenses"},{"purpose":"business-startup"},{"purpose":"education"},{"purpose":"emergency-fund"},{"purpose":"furniture"},{"purpose":"appliances"},{"purpose":"electronics"},{"purpose":"dental"},{"purpose":"vet-bills"},{"purpose":"taxes"},{"purpose":"rent-deposit"},{"purpose":"baby-expenses"},{"purpose":"adoption"},{"purpose":"fertility-treatment"},{"purpose":"solar-panels"},{"purpose":"roof-repair"},{"purpose":"hvac"},{"purpose":"plumbing"},{"purpose":"kitchen-remodel"},{"purpose":"bathroom-remodel"},{"purpose":"basement-finishing"},{"purpose":"garage"},{"purpose":"pool"},{"purpose":"landscaping"},{"purpose":"fence"},{"purpose":"flooring"},{"purpose":"windows"},{"purpose":"doors"},{"purpose":"siding"},{"purpose":"driveway"},{"purpose":"rv"},{"purpose":"boat"},{"purpose":"motorcycle"},{"purpose":"atv"},{"purpose":"musical-instrument"},{"purpose":"art"},{"purpose":"photography"},{"purpose":"gym-equipment"},{"purpose":"clothing"},{"purpose":"jewelry"},{"purpose":"engagement-ring"},{"purpose":"divorce"},{"purpose":"legal-fees"},{"purpose":"burial-funeral"}];
}

export async function generateMetadata() {
  return {
    title: 'Personal Loan for Swimming Pool | FreeFinCalc.net',
    description: 'Install an in-ground or above-ground pool for your backyard. Use our free calculator to estimate monthly payments.',
    alternates: { canonical: 'https://www.freefincalc.net/personal-loan/purpose/pool' },
  };
}

export default function Page() {
  return (
    <>
      <Header />
      <SchemaMarkup breadcrumbs={[{"name":"Home","url":"https://www.freefincalc.net/"},{"name":"Personal Loan Calculator","url":"https://www.freefincalc.net/personal-loan"},{"name":"Pool","url":"https://www.freefincalc.net/personal-loan/purpose/pool"}]} includeReview={true} />
      <main className="min-h-screen bg-slate-950 text-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <nav className="text-sm text-slate-500 mb-6">
            <a href="/" className="hover:text-amber-400 transition-colors">Home</a>
            <span className="mx-2">/</span>
            <a href="/personal-loan-calculator" className="hover:text-amber-400 transition-colors">Personal Loan</a>
            <span className="mx-2">/</span>
            <span className="text-slate-300">Swimming Pool</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Personal Loan for Swimming Pool</h1>
          <p className="text-slate-400 text-lg mb-10">Install an in-ground or above-ground pool for your backyard.</p>
          <Client />
        </div>
      </main>
      <Footer />
    </>
  );
}
