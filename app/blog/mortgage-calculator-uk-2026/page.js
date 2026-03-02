import Header from '../../../components/Header'
import AdUnit from '../../components/AdUnit'
import Footer from '../../../components/Footer'
import Link from 'next/link'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
  title: 'Mortgage Calculator UK 2026: Monthly Payments, Stamp Duty and Rates',
  description: 'Calculate your UK mortgage monthly payment in pounds. Includes current UK mortgage rates, stamp duty calculator and first-time buyer guide for 2026.',
}

const faqs = [
  {
    "q": "What are current UK mortgage rates in 2026?",
    "a": "UK mortgage rates in 2026 range from approximately 3.8% to 5.5% depending on loan-to-value, deal type and lender. Two-year fixed rates average around 4.2-4.8% and five-year fixed rates average 4.0-4.6%."
  },
  {
    "q": "How much can I borrow for a mortgage in the UK?",
    "a": "UK lenders typically offer 4-4.5 times your annual salary. On a £50,000 salary you could borrow £200,000-£225,000. Joint applications combine incomes. Lenders also stress test affordability at higher rates."
  },
  {
    "q": "What is stamp duty land tax in the UK?",
    "a": "Stamp duty applies on properties over £250,000 for standard buyers (£425,000 for first-time buyers). The rates are 5% on the portion between £250,000-£925,000, 10% on £925,000-£1.5M and 12% above £1.5M."
  },
  {
    "q": "What is a Help to Buy scheme in the UK?",
    "a": "Help to Buy equity loans were available in England until March 2023. Currently the main government schemes are the Mortgage Guarantee Scheme (5% deposit mortgages) and Shared Ownership for those who cannot afford to buy outright."
  },
  {
    "q": "Should I choose a fixed or variable rate mortgage in the UK?",
    "a": "Fixed rate mortgages offer payment certainty for 2-5 years and are popular in uncertain rate environments. Variable rate (tracker or SVR) mortgages can be cheaper when rates fall but carry risk. Most UK buyers choose 2 or 5 year fixed deals."
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Mortgage Calculator UK 2026: Monthly Payments, Stamp Duty and Rates</h1>
          <p className="text-slate-400 text-sm mb-8">March 2026 · 9 min read</p>
          <div className="result-box mb-8" style={{borderColor:'rgba(240,200,66,0.3)'}}>
            <h2 className="font-bold mb-2" style={{color:'#f0c842'}}>Quick Answer</h2>
            <p className="text-white">On a £250,000 mortgage at 4.5% over 25 years your monthly payment is approximately <strong &gt; £1,389</strong>. On a £350,000 mortgage at the same rate it is <strong &gt; £1,944 per month</strong>.</p>
          </div>
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">UK Mortgage Monthly Payment Chart</h2>
              <p className="text-slate-400 leading-relaxed mb-4">Monthly payment estimates for common UK mortgage amounts at 4.5% interest rate.</p>
              <div className="result-box mb-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b" style={{borderColor:'rgba(240,200,66,0.1)'}}><th className="text-left text-slate-400 py-2 pr-4">Mortgage Amount</th><th className="text-left text-slate-400 py-2 pr-4">20 Years</th><th className="text-left text-slate-400 py-2 pr-4">25 Years</th><th className="text-left text-slate-400 py-2 pr-4">30 Years</th><th className="text-left text-slate-400 py-2 pr-4">35 Years</th></tr></thead>
                    <tbody>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">£150,000</td><td className="text-slate-300 py-2 pr-4">£949</td><td className="text-slate-300 py-2 pr-4">£833</td><td className="text-slate-300 py-2 pr-4">£760</td><td className="text-slate-300 py-2 pr-4">£714</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">£200,000</td><td className="text-slate-300 py-2 pr-4">£1,265</td><td className="text-slate-300 py-2 pr-4">£1,111</td><td className="text-slate-300 py-2 pr-4">£1,013</td><td className="text-slate-300 py-2 pr-4">£952</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">£250,000</td><td className="text-slate-300 py-2 pr-4">£1,582</td><td className="text-slate-300 py-2 pr-4">£1,389</td><td className="text-slate-300 py-2 pr-4">£1,267</td><td className="text-slate-300 py-2 pr-4">£1,190</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">£300,000</td><td className="text-slate-300 py-2 pr-4">£1,898</td><td className="text-slate-300 py-2 pr-4">£1,667</td><td className="text-slate-300 py-2 pr-4">£1,520</td><td className="text-slate-300 py-2 pr-4">£1,428</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">£400,000</td><td className="text-slate-300 py-2 pr-4">£2,530</td><td className="text-slate-300 py-2 pr-4">£2,222</td><td className="text-slate-300 py-2 pr-4">£2,027</td><td className="text-slate-300 py-2 pr-4">£1,904</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">£500,000</td><td className="text-slate-300 py-2 pr-4">£3,163</td><td className="text-slate-300 py-2 pr-4">£2,778</td><td className="text-slate-300 py-2 pr-4">£2,533</td><td className="text-slate-300 py-2 pr-4">£2,380</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">UK Stamp Duty Calculator 2026</h2>
              <p className="text-slate-400 leading-relaxed mb-4">Stamp duty land tax (SDLT) is paid on property purchases in England and Northern Ireland. Scotland has Land and Buildings Transaction Tax (LBTT) and Wales has Land Transaction Tax (LTT) with different rates.</p>
              <div className="result-box mb-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b" style={{borderColor:'rgba(240,200,66,0.1)'}}><th className="text-left text-slate-400 py-2 pr-4">Property Value</th><th className="text-left text-slate-400 py-2 pr-4">Standard Buyer</th><th className="text-left text-slate-400 py-2 pr-4">First-Time Buyer</th><th className="text-left text-slate-400 py-2 pr-4">Additional Property</th></tr></thead>
                    <tbody>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">Up to £250,000</td><td className="text-slate-300 py-2 pr-4">0%</td><td className="text-slate-300 py-2 pr-4">0% (up to £425K)</td><td className="text-slate-300 py-2 pr-4">3%</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">£250,001-£925,000</td><td className="text-slate-300 py-2 pr-4">5%</td><td className="text-slate-300 py-2 pr-4">5% (above £425K)</td><td className="text-slate-300 py-2 pr-4">8%</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">£925,001-£1.5M</td><td className="text-slate-300 py-2 pr-4">10%</td><td className="text-slate-300 py-2 pr-4">10%</td><td className="text-slate-300 py-2 pr-4">13%</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">Above £1.5M</td><td className="text-slate-300 py-2 pr-4">12%</td><td className="text-slate-300 py-2 pr-4">12%</td><td className="text-slate-300 py-2 pr-4">15%</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Top UK Mortgage Lenders 2026</h2>
              <p className="text-slate-400 leading-relaxed mb-4">The largest UK mortgage lenders by volume include Halifax (part of Lloyds Banking Group), Nationwide Building Society, Barclays, HSBC, NatWest, Santander UK and Virgin Money. Always compare rates from multiple lenders or use a mortgage broker who can access exclusive deals not available directly.</p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Calculate Your UK Mortgage Payment Free</h2>
              <p className="text-slate-400 leading-relaxed mb-4">Use our free mortgage calculator — select £ British Pound from the currency menu for accurate UK calculations.</p>
              <a href="/mortgage-calculator" className="btn-primary inline-block px-6 py-3">Calculate UK Mortgage →</a>
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
            <a href="/rent-vs-buy-calculator" className="hover:underline text-sm" style={{color:'#f0c842'}}>Rent vs Buy Calculator</a>
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
