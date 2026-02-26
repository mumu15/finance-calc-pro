import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'About Us – FreeFinCalc.net',
  description: 'About FreeFinCalc.net — free professional financial calculators.',
}

export default function About() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-white mb-4">About Us</h1>
        <div className="space-y-6 text-slate-400 leading-relaxed">
          <p>FreeFinCalc.net was created to help everyday people make smarter financial decisions. We provide free professional-grade financial calculators with no sign up required.</p>
          <p>We offer six calculators covering mortgages, loans, compound interest, savings, retirement and income tax.</p>
          <p>All calculations happen in your browser. We never store your financial data.</p>
          <p>Results are for informational purposes only and not financial advice. Always consult a qualified financial advisor.</p>
          <p>Contact us at: <a href="/contact" className="text-yellow-400">contact page</a></p>
        </div>
      </main>
      <Footer />
    </>
  )
}