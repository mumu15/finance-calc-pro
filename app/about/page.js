import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'About FreeFinCalc — 470+ Free Financial Calculators',
  description: 'FreeFinCalc.net offers 470+ free financial calculators for mortgage, tax, retirement, investing, debt, budgeting and more. 40+ currencies, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/about' },
}

export default function About() {
  const stats = [
    { value: '470+', label: 'Free Calculators' },
    { value: '40+', label: 'Currencies Supported' },
    { value: '50', label: 'US States Covered' },
    { value: '0', label: 'Data Stored' },
  ]

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-white mb-4">About FreeFinCalc</h1>
        <div className="space-y-6 text-slate-400 leading-relaxed">

          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:28}}>
            {stats.map((s,i) => (
              <div key={i} style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:12,padding:'16px 10px',textAlign:'center'}}>
                <div style={{color:'#f0c842',fontSize:24,fontWeight:700}}>{s.value}</div>
                <div style={{color:'#94a3b8',fontSize:12}}>{s.label}</div>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-white" style={{marginTop:32}}>Our Mission</h2>
          <p>FreeFinCalc.net was created to help everyday people make smarter financial decisions. We believe professional-grade financial tools should be accessible to everyone, regardless of income or financial literacy level.</p>

          <h2 className="text-xl font-bold text-white">What We Offer</h2>
          <p>We provide over 470 free financial calculators covering mortgages, loans, retirement planning, investing, debt payoff strategies, budgeting, cost of living comparisons, tax estimation, business finance, and more. Every calculator supports 40+ global currencies and is designed to give you instant, accurate results.</p>

          <h2 className="text-xl font-bold text-white">How It Works</h2>
          <p>All calculations happen directly in your browser using industry-standard financial formulas. We never store your financial data, never require a sign-up, and never charge a fee. Your privacy is guaranteed because your numbers never leave your device.</p>

          <h2 className="text-xl font-bold text-white">Our Calculators Are Accurate</h2>
          <p>Every calculator uses the same mathematical formulas trusted by financial professionals. We regularly update our tools to reflect current tax brackets, interest rate environments, and financial regulations. Default values are reviewed quarterly to stay relevant.</p>

          <h2 className="text-xl font-bold text-white">Who We Help</h2>
          <p>Whether you are buying your first home, planning for retirement, figuring out how to pay off debt faster, comparing investment strategies, or just trying to understand your paycheck, we have a calculator designed to help you make that decision with confidence.</p>

          <h2 className="text-xl font-bold text-white">Data & Research</h2>
          <p>Beyond calculators, we publish original financial data and rankings covering all 50 US states, including mortgage rates, salary data by profession, cost of living comparisons, insurance costs, tax brackets, and more. Our data pages are designed to be cited in research and journalism.</p>

          <h2 className="text-xl font-bold text-white">Contact</h2>
          <p>Have feedback, suggestions, or found a bug? We would love to hear from you. Visit our <a href="/contact" className="text-yellow-400 hover:underline">contact page</a> to get in touch.</p>

          <p style={{color:'#475569',fontSize:13,marginTop:40}}>Disclaimer: All calculators are for educational and informational purposes only. Results are estimates and do not constitute financial, tax, legal, or investment advice. Always consult a qualified professional before making financial decisions.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
