import Header from '../../../components/Header'
import AdUnit from '../../components/AdUnit'
import Footer from '../../../components/Footer'
import Link from 'next/link'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
  title: 'How Much House Can I Afford? (2026 Calculator Guide)',
  description: 'Find out exactly how much house you can afford in 2026. Includes the 28/36 rule, down payment requirements and real payment examples.',
}

const faqs = [
  {
    "q": "What is the 28/36 rule for buying a house?",
    "a": "The 28/36 rule says housing costs should not exceed 28% of gross monthly income and total debt payments should not exceed 36%. These are guidelines used by most lenders to qualify borrowers."
  },
  {
    "q": "How much do I need for a down payment?",
    "a": "Conventional loans require 3-20% down. FHA loans require 3.5% with a 580+ credit score. A 20% down payment eliminates PMI saving $100-200 per month. VA and USDA loans offer zero down for eligible buyers."
  },
  {
    "q": "What income do I need to buy a $300,000 house?",
    "a": "To comfortably afford a $300,000 home with a 20% down payment you need roughly $60,000-70,000 annual income. This keeps housing costs near the 28% guideline at current interest rates."
  },
  {
    "q": "Should I buy or rent in 2026?",
    "a": "Buying makes sense if you plan to stay 5+ years, have a stable income and can afford the down payment and closing costs without depleting savings. Use the price-to-rent ratio — if home prices are over 20x annual rent renting may be smarter."
  },
  {
    "q": "What are closing costs when buying a house?",
    "a": "Closing costs are typically 2-5% of the purchase price. On a $300,000 home expect $6,000-15,000 in closing costs including lender fees, title insurance, appraisal and prepaid taxes and insurance."
  }
]

export default function Post() {
  return (
    <>
      <FaqSchema faqs={faqs} />
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8"><Link href="/blog" className="text-sm hover:underline" style={{color:"#f0c842'}}>← Back to Blog</Link></div>
        <article>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">How Much House Can I Afford? (2026 Calculator Guide)</h1>
          <p className="text-slate-400 text-sm mb-8">March 2026 · 8 min read</p>
          <div className="result-box mb-8" style={{borderColor:"rgba(240,200,66,0.3)'}}>
            <h2 className="font-bold mb-2" style={{color:"#f0c842'}}>Quick Answer</h2>
            <p className="text-white">A common guideline is to spend no more than <strong>28% of gross monthly income</strong> on housing. On a $6,000/month income that is $1,680/month for housing. With a 20% down payment and 6.5% rate that buys roughly a <strong>$250,000 home</strong>.</p>
          </div>
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">How Much House Can You Afford by Income</h2>
              <p className="text-slate-400 leading-relaxed mb-4">These estimates use the 28% rule with a 6.5% interest rate, 20% down payment and 30-year term.</p>
              <div className="result-box mb-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b" style={{borderColor:"rgba(240,200,66,0.1)"}}><th className="text-left text-slate-400 py-2 pr-4">Annual Income</th><th className="text-left text-slate-400 py-2 pr-4">Max Monthly Payment</th><th className="text-left text-slate-400 py-2 pr-4">Estimated Home Price</th></tr></thead>
                    <tbody>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">$40,000</td><td className="text-slate-300 py-2 pr-4">$933</td><td className="text-slate-300 py-2 pr-4">$130,000</td></tr>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">$60,000</td><td className="text-slate-300 py-2 pr-4">$1,400</td><td className="text-slate-300 py-2 pr-4">$195,000</td></tr>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">$80,000</td><td className="text-slate-300 py-2 pr-4">$1,867</td><td className="text-slate-300 py-2 pr-4">$260,000</td></tr>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">$100,000</td><td className="text-slate-300 py-2 pr-4">$2,333</td><td className="text-slate-300 py-2 pr-4">$325,000</td></tr>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">$120,000</td><td className="text-slate-300 py-2 pr-4">$2,800</td><td className="text-slate-300 py-2 pr-4">$390,000</td></tr>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">$150,000</td><td className="text-slate-300 py-2 pr-4">$3,500</td><td className="text-slate-300 py-2 pr-4">$490,000</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Hidden Costs of Homeownership</h2>
              <p className="text-slate-400 leading-relaxed mb-4">Many first-time buyers focus only on the mortgage payment and forget these additional costs. Property taxes average 1-2% of home value per year. Homeowners insurance costs $100-200 per month. Maintenance and repairs average 1% of home value per year. HOA fees where applicable add $200-500 per month. PMI if your down payment is under 20% adds $100-200 per month. Budget for all of these when calculating what you can truly afford.</p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">The True Cost of Waiting to Buy</h2>
              <p className="text-slate-400 leading-relaxed mb-4">Many renters wait for the perfect time to buy but home prices and rents historically rise over time. A $300,000 home that appreciates 3% per year is worth $348,000 in five years. The down payment you need grows with the price. Waiting has a real financial cost that is easy to underestimate.</p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Calculate Your Mortgage Payment Free</h2>
              <p className="text-slate-400 leading-relaxed mb-4">Use our free mortgage calculator to see your exact monthly payment for any home price.</p>
              <a href="/mortgage-calculator" className="btn-primary inline-block px-6 py-3">Try the Mortgage Calculator →</a>
            </section>

            <AdUnit slot="3248634657" />

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">{faqs.map((faq,i)=>(<div key={i} className="result-box"><h3 className="text-white font-bold mb-2">{faq.q}</h3><p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p></div>))}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Related Calculators</h2>
              <div className="flex flex-wrap gap-3">
                <a href="/mortgage-calculator" className="hover:underline text-sm" style={{color:"#f0c842'}}>Mortgage Calculator</a>
            <a href="/blog/rent-vs-buy-home" className="hover:underline text-sm" style={{color:"#f0c842'}}>Rent vs Buy: Which Is Better?</a>
            <a href="/blog/how-to-calculate-mortgage-payment" className="hover:underline text-sm" style={{color:"#f0c842'}}>How to Calculate Mortgage Payment</a>
              </div>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
