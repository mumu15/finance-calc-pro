import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import Client from './Client';
import SchemaMarkup from '../../../components/SchemaMarkup';


export async function generateStaticParams() {
  return [{"major":"computer-science"},{"major":"nursing"},{"major":"business-administration"},{"major":"psychology"},{"major":"mechanical-engineering"},{"major":"biology"},{"major":"accounting"},{"major":"education"},{"major":"communications"},{"major":"criminal-justice"},{"major":"marketing"},{"major":"finance"},{"major":"electrical-engineering"},{"major":"civil-engineering"},{"major":"pre-med"},{"major":"political-science"},{"major":"sociology"},{"major":"history"},{"major":"english"},{"major":"art"},{"major":"music"},{"major":"film"},{"major":"architecture"},{"major":"pharmacy"},{"major":"law"},{"major":"social-work"},{"major":"public-health"},{"major":"economics"},{"major":"mathematics"},{"major":"statistics"},{"major":"data-science"},{"major":"information-technology"},{"major":"cybersecurity"},{"major":"graphic-design"},{"major":"interior-design"},{"major":"fashion-design"},{"major":"hospitality"},{"major":"culinary-arts"},{"major":"environmental-science"},{"major":"chemistry"},{"major":"physics"},{"major":"philosophy"},{"major":"theology"},{"major":"anthropology"},{"major":"linguistics"},{"major":"journalism"},{"major":"public-relations"},{"major":"human-resources"},{"major":"supply-chain"},{"major":"real-estate"}];
}

export async function generateMetadata() {
  return {
    title: 'Student Loan Calculator for Linguistics Majors | FreeFinCalc.net',
    description: 'Average student loan debt for Linguistics majors is $27 000. Calculate your monthly payments and total repayment cost.',
    alternates: { canonical: 'https://freefincalc.net/student-loan/major/linguistics' },
  };
}

export default function Page() {
  return (
    <>
      <Header />
      <SchemaMarkup breadcrumbs={[{"name":"Home","url":"https://freefincalc.net/"},{"name":"Student Loan Calculator","url":"https://freefincalc.net/student-loan"},{"name":"Linguistics","url":"https://freefincalc.net/student-loan/major/linguistics"}]} includeReview={true} />
      <main className="min-h-screen bg-slate-950 text-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <nav className="text-sm text-slate-500 mb-6">
            <a href="/" className="hover:text-blue-400 transition-colors">Home</a>
            <span className="mx-2">/</span>
            <a href="/student-loan-calculator" className="hover:text-blue-400 transition-colors">Student Loan</a>
            <span className="mx-2">/</span>
            <span className="text-slate-300">Linguistics</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Student Loan Calculator for Linguistics</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="bg-slate-800/50 border border-blue-500/30 rounded-2xl p-5 text-center">
              <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-1">Avg Debt</p>
              <p className="text-white text-2xl font-bold">$27 000</p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 text-center">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Avg Starting Salary</p>
              <p className="text-white text-2xl font-bold">$52 000</p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 text-center">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Debt-to-Income</p>
              <p className="text-white text-2xl font-bold">623%</p>
            </div>
          </div>
          <Client />
        </div>
      </main>
      <Footer />
    </>
  );
}
