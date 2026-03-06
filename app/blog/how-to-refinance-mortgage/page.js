import Header from '../../../components/Header'
import AdUnit from '../../components/AdUnit'
import Footer from '../../../components/Footer'
import Link from 'next/link'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
  title: 'How to Refinance Your Mortgage: When It Makes Sense (2026)',
  description: 'Learn when and how to refinance your mortgage in 2026. Includes break-even calculators, costs to expect and step-by-step application guide.',
}

const faqs = [
  {
    "q": "When should I refinance my mortgage?",
    "a": "Consider refinancing when rates drop at least 0.75-1% below your current rate, when you plan to stay long enough to recoup closing costs, or when you want to switch from an ARM to fixed rate."
  },
  {
    "q": "How much does it cost to refinance?",
    "a": "Refinancing costs 2-5% of the loan amount in closing costs. On a $300,000 mortgage expect $6,000-15,000 in costs. Some lenders offer no-closing-cost refinances but at a slightly higher rate."
  },
  {
    "q": "What is a cash-out refinance?",
    "a": "A cash-out refinance replaces your mortgage with a larger loan and you receive the difference in cash. It lets you access home equity but increases your loan balance and monthly payment."
  },
  {
    "q": "How long does refinancing take?",
    "a": "A typical refinance takes 30-45 days from application to closing. During this period you will need to provide income documentation, get an appraisal and wait for underwriting approval."
  },
  {
    "q": "Does refinancing hurt your credit score?",
    "a": "Refinancing causes a small temporary dip of 5-10 points from the hard credit inquiry. This typically recovers within 6-12 months. Rate shopping within 45 days counts as one inquiry."
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">How to Refinance Your Mortgage: When It Makes Sense (2026)</h1>
          <p className="text-slate-400 text-sm mb-8">March 2026 · 8 min read</p>
          <div className="result-box mb-8" style={{borderColor:"rgba(240,200,66,0.3)"}}>
            <h2 className="font-bold mb-2" style={{color:"#f0c842"}}>Quick Answer</h2>
            <p className="text-white">Refinancing makes sense when you can lower your rate by at least <strong>0.75–1%</strong> and plan to stay in the home long enough to recoup closing costs. The <strong>break-even point</strong> is typically 18–36 months.</p>
          </div>
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">How to Calculate Your Refinance Break-Even Point</h2>
              <p className="text-slate-400 leading-relaxed mb-4">The break-even point tells you how long you must stay to make refinancing worthwhile.</p>
              <div className="result-box mb-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b" style={{borderColor:"rgba(240,200,66,0.1)"}}><th className="text-left text-slate-400 py-2 pr-4">Scenario</th><th className="text-left text-slate-400 py-2 pr-4">Numbers</th></tr></thead>
                    <tbody>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">Current Rate</td><td className="text-slate-300 py-2 pr-4">7.5%</td></tr>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">New Rate</td><td className="text-slate-300 py-2 pr-4">6.5%</td></tr>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">Loan Balance</td><td className="text-slate-300 py-2 pr-4">$280,000</td></tr>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">Monthly Savings</td><td className="text-slate-300 py-2 pr-4">$186/month</td></tr>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">Closing Costs</td><td className="text-slate-300 py-2 pr-4">$8,000</td></tr>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">Break-Even Point</td><td className="text-slate-300 py-2 pr-4">$8,000 / $186 = 43 months (3.6 years)</td></tr>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">Decision</td><td className="text-slate-300 py-2 pr-4">Refinance if staying 4+ years</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Step-by-Step Mortgage Refinance Guide</h2>
              <ul className="space-y-2 mb-4">
                <li className="text-slate-400 text-sm flex items-start gap-2"><span style={{color:"#f0c842"}} className="mt-1">→</span><span>Check your credit score — lenders want 620+ for conventional, 740+ for best rates</span></li>
                <li className="text-slate-400 text-sm flex items-start gap-2"><span style={{color:"#f0c842"}} className="mt-1">→</span><span>Calculate your break-even point before applying</span></li>
                <li className="text-slate-400 text-sm flex items-start gap-2"><span style={{color:"#f0c842"}} className="mt-1">→</span><span>Get quotes from at least 3 lenders — rates vary significantly</span></li>
                <li className="text-slate-400 text-sm flex items-start gap-2"><span style={{color:"#f0c842"}} className="mt-1">→</span><span>Compare APR not just interest rate — APR includes fees</span></li>
                <li className="text-slate-400 text-sm flex items-start gap-2"><span style={{color:"#f0c842"}} className="mt-1">→</span><span>Lock your rate once you find the best offer</span></li>
                <li className="text-slate-400 text-sm flex items-start gap-2"><span style={{color:"#f0c842"}} className="mt-1">→</span><span>Gather documents — pay stubs, W-2s, bank statements and tax returns</span></li>
                <li className="text-slate-400 text-sm flex items-start gap-2"><span style={{color:"#f0c842"}} className="mt-1">→</span><span>Complete the appraisal and underwriting process</span></li>
                <li className="text-slate-400 text-sm flex items-start gap-2"><span style={{color:"#f0c842"}} className="mt-1">→</span><span>Review closing disclosure carefully before signing</span></li>
                <li className="text-slate-400 text-sm flex items-start gap-2"><span style={{color:"#f0c842"}} className="mt-1">→</span><span>Close and start saving money every month</span></li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Calculate Your New Mortgage Payment</h2>
              <p className="text-slate-400 leading-relaxed mb-4">Use our free mortgage calculator to see your new payment at current rates.</p>
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
                <a href="/mortgage-calculator" className="hover:underline text-sm" style={{color:"#f0c842"}}>Mortgage Calculator</a>
            <a href="/blog/how-to-calculate-mortgage-payment" className="hover:underline text-sm" style={{color:"#f0c842"}}>How to Calculate Mortgage Payment</a>
            <a href="/loan-calculator" className="hover:underline text-sm" style={{color:"#f0c842"}}>Loan Calculator</a>
              </div>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
