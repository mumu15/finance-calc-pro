import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Contact Us – FreeFinCalc.net',
  description: 'Contact FreeFinCalc.net — get in touch for feedback or suggestions.',
}

export default function Contact() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
        <div className="space-y-6 text-slate-400 leading-relaxed">
          <p>Have a suggestion for a new calculator? Found an error? We would love to hear from you!</p>
          <p>📧 Email us at: <span className="text-yellow-400">contact@freefincalc.net</span></p>
          <h2 className="text-xl font-bold text-white mt-8">FAQ</h2>
          <p><strong className="text-white">Are the calculators free?</strong><br/>Yes! All calculators are 100% free with no sign up required.</p>
          <p><strong className="text-white">Is my financial data stored?</strong><br/>No. All calculations happen in your browser. We never store your data.</p>
          <p><strong className="text-white">Are the results accurate?</strong><br/>Our calculators use standard financial formulas and are accurate for estimation. Always consult a financial advisor for major decisions.</p>
          <p><strong className="text-white">Can I suggest a new calculator?</strong><br/>Yes! Send us an email and we will consider adding it.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}