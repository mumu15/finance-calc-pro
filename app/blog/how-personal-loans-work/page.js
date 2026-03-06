import Header from '../../../components/Header'
import AdUnit from '../../components/AdUnit'
import Footer from '../../../components/Footer'
import Link from 'next/link'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
  title: 'How Personal Loans Work: Everything You Need to Know (2026)',
  description: 'Learn how personal loans work in 2026. Includes interest rates, approval requirements, how to compare lenders and when a personal loan makes sense.',
}

const faqs = [
  {
    "q": "What credit score do I need for a personal loan?",
    "a": "Most personal loan lenders require a minimum 580-640 credit score. The best rates are reserved for borrowers with 720+ credit scores. With scores below 580 you may only qualify for secured loans or credit unions."
  },
  {
    "q": "How long does it take to get a personal loan?",
    "a": "Online lenders can approve and fund personal loans in 1-3 business days. Traditional banks may take 5-7 business days. Credit unions can take 1-5 business days depending on membership requirements."
  },
  {
    "q": "What can I use a personal loan for?",
    "a": "Personal loans can be used for debt consolidation, home improvements, medical bills, weddings, moving expenses and emergency expenses. They cannot be used for illegal activities, gambling or typically for education (student loans are better)."
  },
  {
    "q": "Is a personal loan better than a credit card?",
    "a": "For large purchases over $2,000 that you will pay off over more than 3 months a personal loan usually has a lower interest rate than a credit card. For smaller short-term purchases a 0% intro APR credit card may be better."
  },
  {
    "q": "What is the origination fee on a personal loan?",
    "a": "Many personal loans charge an origination fee of 1-8% of the loan amount which is deducted from the funds you receive. Always check for origination fees when comparing APRs as they significantly affect the true cost."
  }
]

export default function Post() {
  return (
    <>
      <FaqSchema faqs={faqs} />
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8"><Link href="/blog" className="text-sm hover:underline" style={{color:"#f0c842"}}>← Back to Blog</Link></div>
        <article>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">How Personal Loans Work: Everything You Need to Know (2026)</h1>
          <p className="text-slate-400 text-sm mb-8">March 2026 · 8 min read</p>
          <div className="result-box mb-8" style={{borderColor:"rgba(240,200,66,0.3)"}}>
            <h2 className="font-bold mb-2" style={{color:"#f0c842"}}>Quick Answer</h2>
            <p className="text-white">A personal loan is an <strong>unsecured loan</strong> of $1,000–$100,000 repaid in fixed monthly payments over 1–7 years. Interest rates range from <strong>6–36%</strong> depending on your credit score. Best rates go to borrowers with 740+ credit scores.</p>
          </div>
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Personal Loan Interest Rates by Credit Score</h2>
              <p className="text-slate-400 leading-relaxed mb-4">Your credit score is the biggest factor in your personal loan interest rate.</p>
              <div className="result-box mb-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b" style={{borderColor:"rgba(240,200,66,0.1)"}}><th className="text-left text-slate-400 py-2 pr-4">Credit Score</th><th className="text-left text-slate-400 py-2 pr-4">Typical APR Range</th></tr></thead>
                    <tbody>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">720–850 (Excellent)</td><td className="text-slate-300 py-2 pr-4">6%–12%</td></tr>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">680–719 (Good)</td><td className="text-slate-300 py-2 pr-4">12%–18%</td></tr>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">640–679 (Fair)</td><td className="text-slate-300 py-2 pr-4">18%–25%</td></tr>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">580–639 (Poor)</td><td className="text-slate-300 py-2 pr-4">25%–36%</td></tr>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">Below 580</td><td className="text-slate-300 py-2 pr-4">Unlikely to qualify</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Personal Loan vs Other Borrowing Options</h2>
              <p className="text-slate-400 leading-relaxed mb-4">Choosing the right type of loan depends on your credit score, collateral and repayment timeline.</p>
              <div className="result-box mb-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b" style={{borderColor:"rgba(240,200,66,0.1)"}}><th className="text-left text-slate-400 py-2 pr-4">Loan Type</th><th className="text-left text-slate-400 py-2 pr-4">Rate</th><th className="text-left text-slate-400 py-2 pr-4">Secured?</th><th className="text-left text-slate-400 py-2 pr-4">Best For</th></tr></thead>
                    <tbody>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">Personal Loan</td><td className="text-slate-300 py-2 pr-4">6–36%</td><td className="text-slate-300 py-2 pr-4">No</td><td className="text-slate-300 py-2 pr-4">Debt consolidation</td></tr>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">Home Equity Loan</td><td className="text-slate-300 py-2 pr-4">6–10%</td><td className="text-slate-300 py-2 pr-4">Yes</td><td className="text-slate-300 py-2 pr-4">Home improvements</td></tr>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">Credit Card</td><td className="text-slate-300 py-2 pr-4">18–30%</td><td className="text-slate-300 py-2 pr-4">No</td><td className="text-slate-300 py-2 pr-4">Small short-term purchases</td></tr>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">401k Loan</td><td className="text-slate-300 py-2 pr-4">5–7%</td><td className="text-slate-300 py-2 pr-4">No</td><td className="text-slate-300 py-2 pr-4">Emergency (last resort)</td></tr>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">Payday Loan</td><td className="text-slate-300 py-2 pr-4">300–400%</td><td className="text-slate-300 py-2 pr-4">No</td><td className="text-slate-300 py-2 pr-4">Avoid at all costs</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">How to Get the Best Personal Loan Rate</h2>
              <p className="text-slate-400 leading-relaxed mb-4">Always prequalify with at least three lenders before choosing. Prequalification uses a soft credit check and does not affect your score. Compare APR not just the interest rate as APR includes fees. Consider credit unions which often offer rates 2-5% lower than banks for the same credit profile. If your credit score is below 680 consider a co-signer or spending 6 months improving your score before applying.</p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Calculate Your Loan Payment Free</h2>
              <p className="text-slate-400 leading-relaxed mb-4">Use our free loan calculator to compare monthly payments and total cost for any loan amount and rate.</p>
              <a href="/loan-calculator" className="btn-primary inline-block px-6 py-3">Try the Loan Calculator →</a>
            </section>

            <AdUnit slot="3248634657" />

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">{faqs.map((faq,i)=>(<div key={i} className="result-box"><h3 className="text-white font-bold mb-2">{faq.q}</h3><p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p></div>))}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Related Calculators</h2>
              <div className="flex flex-wrap gap-3">
                <a href="/loan-calculator" className="hover:underline text-sm" style={{color:"#f0c842"}}>Loan Calculator</a>
            <a href="/blog/how-to-calculate-loan-payment" className="hover:underline text-sm" style={{color:"#f0c842"}}>How to Calculate Loan Payment</a>
            <a href="/blog/debt-snowball-vs-avalanche" className="hover:underline text-sm" style={{color:"#f0c842"}}>Debt Snowball vs Avalanche</a>
              </div>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
