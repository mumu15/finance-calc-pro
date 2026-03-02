import Header from '../../../components/Header'
import AdUnit from '../../components/AdUnit'
import Footer from '../../../components/Footer'
import Link from 'next/link'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
  title: 'ISA Savings Calculator UK: How Much Can You Save in an ISA? (2026)',
  description: 'Learn how to maximise your ISA allowance in 2026. Compare Cash ISA, Stocks and Shares ISA, Lifetime ISA and Innovative Finance ISA with savings projections.',
}

const faqs = [
  {
    "q": "What is the ISA allowance for 2026-27?",
    "a": "The annual ISA allowance for 2026-27 is £20,000 per person. You can split this across different ISA types but the total cannot exceed £20,000. Unused allowance cannot be carried forward to the next tax year."
  },
  {
    "q": "What is a Lifetime ISA and who should use it?",
    "a": "A Lifetime ISA (LISA) allows you to save up to £4,000 per year and receive a 25% government bonus (£1,000 maximum per year). It can be used to buy your first home (up to £450,000) or for retirement from age 60. Anyone aged 18-39 can open one."
  },
  {
    "q": "Cash ISA vs Stocks and Shares ISA: which is better?",
    "a": "Cash ISAs offer safety and fixed returns of 4-5% in 2026. Stocks and Shares ISAs offer higher long-term growth potential of 6-9% per year but with market risk. For goals over 5 years Stocks and Shares ISAs historically outperform. For goals under 3 years Cash ISAs are safer."
  },
  {
    "q": "Can I have multiple ISAs?",
    "a": "From April 2024 you can hold multiple ISAs of the same type simultaneously. You can contribute to a Cash ISA and a Stocks and Shares ISA in the same tax year as long as total contributions do not exceed £20,000."
  },
  {
    "q": "What happens to my ISA if I move abroad?",
    "a": "You can keep your existing ISA if you move abroad but you cannot make new contributions while a non-UK resident. The ISA remains tax-free in the UK but your new country of residence may tax the income and gains."
  }
]

export default function Post() {
  return (
    <>
      <FaqSchema faqs={faqs} />
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8"><Link href="/blog" className="text-sm hover:underline" style={{color:'#f0c842'}}>← Back to Blog</Link></div>
        <article>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">ISA Savings Calculator UK: How Much Can You Save in an ISA? (2026)</h1>
          <p className="text-slate-400 text-sm mb-8">March 2026 · 8 min read</p>
          <div className="result-box mb-8" style={{borderColor:'rgba(240,200,66,0.3)'}}>
            <h2 className="font-bold mb-2" style={{color:'#f0c842'}}>Quick Answer</h2>
            <p className="text-white">The ISA allowance for 2026-27 is <strong>£20,000 per year</strong>. A Stocks and Shares ISA growing at 7% per year — maxing out £20,000 annually — would be worth approximately <strong>£566,000 after 15 years</strong> completely tax-free.</p>
          </div>
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">ISA Types Compared 2026</h2>
              <p className="text-slate-400 leading-relaxed mb-4">Choosing the right ISA depends on your goal, timeline and risk tolerance.</p>
              <div className="result-box mb-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b" style={{borderColor:'rgba(240,200,66,0.1)'}}><th className="text-left text-slate-400 py-2 pr-4">ISA Type</th><th className="text-left text-slate-400 py-2 pr-4">Annual Limit</th><th className="text-left text-slate-400 py-2 pr-4">Returns</th><th className="text-left text-slate-400 py-2 pr-4">Best For</th></tr></thead>
                    <tbody>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">Cash ISA</td><td className="text-slate-300 py-2 pr-4">£20,000</td><td className="text-slate-300 py-2 pr-4">4-5% fixed</td><td className="text-slate-300 py-2 pr-4">Short-term goals, safety</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">Stocks & Shares ISA</td><td className="text-slate-300 py-2 pr-4">£20,000</td><td className="text-slate-300 py-2 pr-4">6-9% long-term avg</td><td className="text-slate-300 py-2 pr-4">Wealth building 5+ years</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">Lifetime ISA</td><td className="text-slate-300 py-2 pr-4">£4,000</td><td className="text-slate-300 py-2 pr-4">25% bonus + growth</td><td className="text-slate-300 py-2 pr-4">First home or retirement</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">Junior ISA</td><td className="text-slate-300 py-2 pr-4">£9,000</td><td className="text-slate-300 py-2 pr-4">Cash or stocks</td><td className="text-slate-300 py-2 pr-4">Saving for children</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">Innovative Finance ISA</td><td className="text-slate-300 py-2 pr-4">£20,000</td><td className="text-slate-300 py-2 pr-4">5-10% (higher risk)</td><td className="text-slate-300 py-2 pr-4">P2P lending exposure</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">ISA Growth Projections (£20,000 Per Year)</h2>
              <p className="text-slate-400 leading-relaxed mb-4">How much your ISA could be worth at different growth rates assuming maximum annual contributions.</p>
              <div className="result-box mb-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b" style={{borderColor:'rgba(240,200,66,0.1)'}}><th className="text-left text-slate-400 py-2 pr-4">Years</th><th className="text-left text-slate-400 py-2 pr-4">4% (Cash ISA)</th><th className="text-left text-slate-400 py-2 pr-4">7% (Stocks ISA)</th><th className="text-left text-slate-400 py-2 pr-4">9% (Optimistic)</th></tr></thead>
                    <tbody>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">5 years</td><td className="text-slate-300 py-2 pr-4">£108,328</td><td className="text-slate-300 py-2 pr-4">£115,766</td><td className="text-slate-300 py-2 pr-4">£119,694</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">10 years</td><td className="text-slate-300 py-2 pr-4">£240,122</td><td className="text-slate-300 py-2 pr-4">£275,905</td><td className="text-slate-300 py-2 pr-4">£304,425</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">15 years</td><td className="text-slate-300 py-2 pr-4">£400,574</td><td className="text-slate-300 py-2 pr-4">£505,383</td><td className="text-slate-300 py-2 pr-4">£594,186</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">20 years</td><td className="text-slate-300 py-2 pr-4">£595,962</td><td className="text-slate-300 py-2 pr-4">£819,910</td><td className="text-slate-300 py-2 pr-4">£1,027,455</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">30 years</td><td className="text-slate-300 py-2 pr-4">£1,122,047</td><td className="text-slate-300 py-2 pr-4">£1,887,596</td><td className="text-slate-300 py-2 pr-4">£2,723,000</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Calculate Your ISA Savings Growth</h2>
              <p className="text-slate-400 leading-relaxed mb-4">Use our free savings calculator — select £ British Pound to see your ISA projected value.</p>
              <a href="/savings-calculator" className="btn-primary inline-block px-6 py-3">Calculate ISA Growth →</a>
            </section>

            <AdUnit slot="3248634657" />

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">{faqs.map((faq,i)=>(<div key={i} className="result-box"><h3 className="text-white font-bold mb-2">{faq.q}</h3><p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p></div>))}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Related Calculators</h2>
              <div className="flex flex-wrap gap-3">
                <a href="/savings-calculator" className="hover:underline text-sm" style={{color:'#f0c842'}}>Savings Calculator</a>
            <a href="/compound-interest" className="hover:underline text-sm" style={{color:'#f0c842'}}>Compound Interest Calculator</a>
            <a href="/blog/mortgage-calculator-uk-2026" className="hover:underline text-sm" style={{color:'#f0c842'}}>Mortgage Calculator UK</a>
              </div>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
