import Header from '../../../components/Header'
import AdUnit from '../../components/AdUnit'
import Footer from '../../../components/Footer'
import Link from 'next/link'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
  title: 'Mortgage Calculator Singapore 2026: HDB, CPF and Private Property Guide',
  description: 'Calculate your Singapore home loan monthly payment in SGD. Includes CPF usage, HDB loan vs bank loan comparison, ABSD rates and affordability guide 2026.',
}

const faqs = [
  {
    "q": "What is the Total Debt Servicing Ratio (TDSR) in Singapore?",
    "a": "TDSR limits your total monthly debt repayments (including the mortgage) to 55% of your gross monthly income. This applies to all property loans in Singapore. For HDB loans the Mortgage Servicing Ratio (MSR) limits the mortgage to 30% of gross income."
  },
  {
    "q": "HDB loan vs bank loan in Singapore: which is better?",
    "a": "HDB loans charge a fixed rate of 2.6% (pegged to CPF OA rate + 0.1%) and require 10% down payment. Bank loans are lower (around 3-4.5% currently) but require 25% down and carry rate risk. HDB loans have more flexibility on early repayment."
  },
  {
    "q": "Can I use CPF for my mortgage in Singapore?",
    "a": "Yes. CPF Ordinary Account funds can be used for the down payment and monthly mortgage instalments for both HDB and private property. However CPF usage is subject to a Valuation Limit and Withdrawal Limit based on the property value."
  },
  {
    "q": "What is ABSD (Additional Buyer Stamp Duty) in Singapore?",
    "a": "ABSD is payable on top of Buyer Stamp Duty. Singapore citizens pay 0% on first property, 20% on second, 30% on third. PRs pay 5% on first, 30% on second. Foreigners pay 60% on any residential property purchase."
  },
  {
    "q": "What is the minimum down payment for a private property in Singapore?",
    "a": "For bank loans on private property the minimum down payment is 25% of the purchase price with 5% in cash and 20% in cash or CPF. For HDB flats with HDB loan the minimum is 10% with no cash component required."
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Mortgage Calculator Singapore 2026: HDB, CPF and Private Property Guide</h1>
          <p className="text-slate-400 text-sm mb-8">March 2026 · 8 min read</p>
          <div className="result-box mb-8" style={{borderColor:'rgba(240,200,66,0.3)'}}>
            <h2 className="font-bold mb-2" style={{color:'#f0c842'}}>Quick Answer</h2>
            <p className="text-white">On an S$600,000 home loan at 3.5% over 25 years your monthly payment is approximately <strong &gt; S$3,001</strong>. CPF Ordinary Account savings can be used for down payment and monthly mortgage servicing — reducing your cash outflow significantly.</p>
          </div>
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Singapore Mortgage Monthly Repayment Chart</h2>
              <p className="text-slate-400 leading-relaxed mb-4">Monthly payment guide for Singapore home loans at 3.5% bank loan rate.</p>
              <div className="result-box mb-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b" style={{borderColor:'rgba(240,200,66,0.1)'}}><th className="text-left text-slate-400 py-2 pr-4">Loan Amount</th><th className="text-left text-slate-400 py-2 pr-4">20 Years</th><th className="text-left text-slate-400 py-2 pr-4">25 Years</th><th className="text-left text-slate-400 py-2 pr-4">30 Years</th></tr></thead>
                    <tbody>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">S$300,000</td><td className="text-slate-300 py-2 pr-4">S$1,740</td><td className="text-slate-300 py-2 pr-4">S$1,501</td><td className="text-slate-300 py-2 pr-4">S$1,347</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">S$500,000</td><td className="text-slate-300 py-2 pr-4">S$2,900</td><td className="text-slate-300 py-2 pr-4">S$2,501</td><td className="text-slate-300 py-2 pr-4">S$2,245</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">S$600,000</td><td className="text-slate-300 py-2 pr-4">S$3,480</td><td className="text-slate-300 py-2 pr-4">S$3,001</td><td className="text-slate-300 py-2 pr-4">S$2,695</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">S$800,000</td><td className="text-slate-300 py-2 pr-4">S$4,640</td><td className="text-slate-300 py-2 pr-4">S$4,002</td><td className="text-slate-300 py-2 pr-4">S$3,593</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">S$1,000,000</td><td className="text-slate-300 py-2 pr-4">S$5,800</td><td className="text-slate-300 py-2 pr-4">S$5,002</td><td className="text-slate-300 py-2 pr-4">S$4,490</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">S$1,500,000</td><td className="text-slate-300 py-2 pr-4">S$8,700</td><td className="text-slate-300 py-2 pr-4">S$7,503</td><td className="text-slate-300 py-2 pr-4">S$6,736</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">HDB Loan vs Bank Loan Comparison</h2>
              <p className="text-slate-400 leading-relaxed mb-4">Choosing between an HDB loan and a bank loan is one of the most important decisions Singapore homebuyers make.</p>
              <div className="result-box mb-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b" style={{borderColor:'rgba(240,200,66,0.1)'}}><th className="text-left text-slate-400 py-2 pr-4">Feature</th><th className="text-left text-slate-400 py-2 pr-4">HDB Loan</th><th className="text-left text-slate-400 py-2 pr-4">Bank Loan</th></tr></thead>
                    <tbody>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">Interest Rate</td><td className="text-slate-300 py-2 pr-4">2.6% fixed</td><td className="text-slate-300 py-2 pr-4">3.0-4.5% variable</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">Down Payment</td><td className="text-slate-300 py-2 pr-4"&gt;10% (CPF ok)</td><td className="text-slate-300 py-2 pr-4"&gt;25% (5% must be cash)</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">Eligible Properties</td><td className="text-slate-300 py-2 pr-4">HDB flats only</td><td className="text-slate-300 py-2 pr-4">HDB and private</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">Early Repayment Penalty</td><td className="text-slate-300 py-2 pr-4">None</td><td className="text-slate-300 py-2 pr-4">May apply in lock-in</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">Late Payment</td><td className="text-slate-300 py-2 pr-4">More flexible</td><td className="text-slate-300 py-2 pr-4">Stricter</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">Best For</td><td className="text-slate-300 py-2 pr-4">Security and flexibility</td><td className="text-slate-300 py-2 pr-4">Lower rates (currently)</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Calculate Your Singapore Mortgage Free</h2>
              <p className="text-slate-400 leading-relaxed mb-4">Use our free mortgage calculator — select S$ Singapore Dollar from the currency menu.</p>
              <a href="/mortgage-calculator" className="btn-primary inline-block px-6 py-3">Calculate Mortgage →</a>
            </section>

            <AdUnit slot="3248634657" />

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">{faqs.map((faq,i)=&gt;(<div key={i} className="result-box"><h3 className="text-white font-bold mb-2">{faq.q}</h3><p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p></div>))}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Related Calculators</h2>
              <div className="flex flex-wrap gap-3">
                <a href="/mortgage-calculator" className="hover:underline text-sm" style={{color:'#f0c842'}}>Mortgage Calculator</a>
            <a href="/savings-calculator" className="hover:underline text-sm" style={{color:'#f0c842'}}>Savings Calculator</a>
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
