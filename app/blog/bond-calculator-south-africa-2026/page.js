import Header from '../../../components/Header'
import AdUnit from '../../components/AdUnit'
import Footer from '../../../components/Footer'
import Link from 'next/link'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
  title: 'Bond Calculator South Africa 2026: Home Loan Repayments and Rates',
  description: 'Calculate your South African home loan (bond) monthly repayment in Rands. Includes current prime rate, transfer costs, deposit requirements and first-time buyer guide 2026.',
}

const faqs = [
  {
    "q": "What is the current prime rate for home loans in South Africa 2026?",
    "a": "The South African prime lending rate in 2026 is approximately 11.25-11.75% (SARB repo rate + 3.5%). First-time buyers with good credit can sometimes negotiate prime minus 0.25-0.5%. Most banks offer rates between prime minus 1% and prime plus 1%."
  },
  {
    "q": "What deposit do I need for a home loan in South Africa?",
    "a": "South African banks typically require a 10-20% deposit. A 20% deposit gives you access to the best rates and avoids added costs. First-time buyers with good credit may qualify for 100% bonds (zero deposit) though these carry higher rates."
  },
  {
    "q": "What are transfer costs when buying property in South Africa?",
    "a": "Transfer costs include transfer duty (government tax from R1.05M), conveyancer fees (attorney fees for transferring ownership) and bond registration costs. On a R2 million property expect total transfer and registration costs of approximately R60,000-R90,000."
  },
  {
    "q": "What is the First Home Finance scheme in South Africa?",
    "a": "First Home Finance (formerly FLISP) provides a once-off housing subsidy of R27,960 to R121,626 for qualifying first-time buyers earning R3,501 to R22,000 per month. The subsidy reduces your bond amount and monthly repayment."
  },
  {
    "q": "Should I choose a fixed or variable rate bond in South Africa?",
    "a": "Most South African home loans are variable rate linked to prime. Fixed rate options are available for 1-5 years typically at prime plus 0.5-1%. Variable rates have historically been lower long-term in South Africa but carry SARB rate change risk."
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Bond Calculator South Africa 2026: Home Loan Repayments and Rates</h1>
          <p className="text-slate-400 text-sm mb-8">March 2026 · 8 min read</p>
          <div className="result-box mb-8" style={{borderColor:'rgba(240,200,66,0.3)'}}>
            <h2 className="font-bold mb-2" style={{color:'#f0c842'}}>Quick Answer</h2>
            <p className="text-white">On a R1.5 million bond at 11.75% (prime rate) over 20 years your monthly repayment is approximately <strong>R16,234</strong>. South African home loans are typically priced at the prime lending rate which is the SARB repo rate plus 3.5%.</p>
          </div>
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">South Africa Bond Repayment Chart (11.75% Prime Rate)</h2>
              <p className="text-slate-400 leading-relaxed mb-4">Monthly repayment guide for common South African bond amounts.</p>
              <div className="result-box mb-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b" style={{borderColor:'rgba(240,200,66,0.1)'}}><th className="text-left text-slate-400 py-2 pr-4">Bond Amount</th><th className="text-left text-slate-400 py-2 pr-4">15 Years</th><th className="text-left text-slate-400 py-2 pr-4">20 Years</th><th className="text-left text-slate-400 py-2 pr-4">25 Years</th><th className="text-left text-slate-400 py-2 pr-4">30 Years</th></tr></thead>
                    <tbody>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">R500,000</td><td className="text-slate-300 py-2 pr-4">R5,879</td><td className="text-slate-300 py-2 pr-4">R5,411</td><td className="text-slate-300 py-2 pr-4">R5,204</td><td className="text-slate-300 py-2 pr-4">R5,105</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">R750,000</td><td className="text-slate-300 py-2 pr-4">R8,818</td><td className="text-slate-300 py-2 pr-4">R8,117</td><td className="text-slate-300 py-2 pr-4">R7,806</td><td className="text-slate-300 py-2 pr-4">R7,658</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">R1,000,000</td><td className="text-slate-300 py-2 pr-4">R11,758</td><td className="text-slate-300 py-2 pr-4">R10,822</td><td className="text-slate-300 py-2 pr-4">R10,408</td><td className="text-slate-300 py-2 pr-4">R10,210</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">R1,500,000</td><td className="text-slate-300 py-2 pr-4">R17,636</td><td className="text-slate-300 py-2 pr-4">R16,234</td><td className="text-slate-300 py-2 pr-4">R15,612</td><td className="text-slate-300 py-2 pr-4">R15,315</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">R2,000,000</td><td className="text-slate-300 py-2 pr-4">R23,515</td><td className="text-slate-300 py-2 pr-4">R21,645</td><td className="text-slate-300 py-2 pr-4">R20,816</td><td className="text-slate-300 py-2 pr-4">R20,420</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">R3,000,000</td><td className="text-slate-300 py-2 pr-4">R35,273</td><td className="text-slate-300 py-2 pr-4">R32,467</td><td className="text-slate-300 py-2 pr-4">R31,224</td><td className="text-slate-300 py-2 pr-4">R30,631</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Full Costs of Buying Property in South Africa</h2>
              <p className="text-slate-400 leading-relaxed mb-4">Beyond the deposit many buyers underestimate the full upfront costs when buying property in South Africa.</p>
              <div className="result-box mb-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b" style={{borderColor:'rgba(240,200,66,0.1)'}}><th className="text-left text-slate-400 py-2 pr-4">Cost</th><th className="text-left text-slate-400 py-2 pr-4">Amount (on R2M property)</th><th className="text-left text-slate-400 py-2 pr-4">Notes</th></tr></thead>
                    <tbody>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">Deposit</td><td className="text-slate-300 py-2 pr-4">R200,000-R400,000</td><td className="text-slate-300 py-2 pr-4">10-20% of purchase price</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">Transfer Duty</td><td className="text-slate-300 py-2 pr-4">R33,000</td><td className="text-slate-300 py-2 pr-4">Government tax above R1.05M</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">Conveyancing Fee</td><td className="text-slate-300 py-2 pr-4">R25,000-R40,000</td><td className="text-slate-300 py-2 pr-4">Attorney transfer cost</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">Bond Registration</td><td className="text-slate-300 py-2 pr-4">R20,000-R30,000</td><td className="text-slate-300 py-2 pr-4">Attorney bond cost</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">Bank Initiation Fee</td><td className="text-slate-300 py-2 pr-4">R6,037 max</td><td className="text-slate-300 py-2 pr-4">Once-off</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">Total Upfront Estimate</td><td className="text-slate-300 py-2 pr-4">R280,000-R510,000</td><td className="text-slate-300 py-2 pr-4">Including deposit</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Calculate Your South African Bond Repayment Free</h2>
              <p className="text-slate-400 leading-relaxed mb-4">Use our free mortgage calculator — select R South African Rand from the currency menu.</p>
              <a href="/mortgage-calculator" className="btn-primary inline-block px-6 py-3">Calculate Bond →</a>
            </section>

            <AdUnit slot="3248634657" />

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">{faqs.map((faq,i)=>(<div key={i} className="result-box"><h3 className="text-white font-bold mb-2">{faq.q}</h3><p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p></div>))}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Related Calculators</h2>
              <div className="flex flex-wrap gap-3">
                <a href="/mortgage-calculator" className="hover:underline text-sm" style={{color:'#f0c842'}}>Mortgage Calculator</a>
            <a href="/loan-calculator" className="hover:underline text-sm" style={{color:'#f0c842'}}>Loan Calculator</a>
            <a href="/blog/rent-vs-buy-home" className="hover:underline text-sm" style={{color:'#f0c842'}}>Rent vs Buy: Which Is Better?</a>
              </div>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
