import Header from '../../../components/Header'
import AdUnit from '../../components/AdUnit'
import Footer from '../../../components/Footer'
import Link from 'next/link'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
  title: 'How to Max Out Your Roth IRA in 2026 (Step-by-Step Guide)',
  description: 'Learn how to max out your Roth IRA contribution in 2026. Contribution limits, income limits, investment choices and automation strategies.',
}

const faqs = [
  {
    "q": "How much can I contribute to a Roth IRA in 2026?",
    "a": "The 2026 Roth IRA contribution limit is $7,000 per person ($8,000 for those 50 and older). Married couples can each contribute $7,000 for a combined $14,000 per year."
  },
  {
    "q": "What is the Roth IRA income limit for 2026?",
    "a": "For 2026 single filers can fully contribute with MAGI below $150,000. The contribution phases out between $150,000-$165,000. Married filing jointly phases out between $236,000-$246,000."
  },
  {
    "q": "What should I invest in inside my Roth IRA?",
    "a": "Most experts recommend a simple three-fund portfolio: a US total market index fund, an international index fund and a bond index fund. Or a single target-date retirement fund if you want full automation."
  },
  {
    "q": "Can I withdraw from a Roth IRA early?",
    "a": "You can withdraw contributions (not earnings) at any time tax and penalty free. Earnings can be withdrawn tax and penalty free after age 59.5 if the account is at least 5 years old."
  },
  {
    "q": "What if I earn too much for a Roth IRA?",
    "a": "Use the backdoor Roth IRA strategy — contribute to a non-deductible Traditional IRA then convert it to Roth. This is legal and commonly used by high earners."
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">How to Max Out Your Roth IRA in 2026 (Step-by-Step Guide)</h1>
          <p className="text-slate-400 text-sm mb-8">March 2026 · 7 min read</p>
          <div className="result-box mb-8" style={{borderColor:"rgba(240,200,66,0.3)"}}>
            <h2 className="font-bold mb-2" style={{color:"#f0c842"}}>Quick Answer</h2>
            <p className="text-white">The 2026 Roth IRA contribution limit is <strong>$7,000</strong> ($8,000 if 50+). To max it out automatically contribute <strong>$583.33 per month</strong>. Invest in a low-cost total market index fund. Roth IRA growth and withdrawals are <strong>completely tax-free</strong>.</p>
          </div>
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Roth IRA Monthly Contribution Schedule</h2>
              <p className="text-slate-400 leading-relaxed mb-4">Breaking the annual limit into monthly contributions makes maxing out easier.</p>
              <div className="result-box mb-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b" style={{borderColor:"rgba(240,200,66,0.1)"}}><th className="text-left text-slate-400 py-2 pr-4">Contribution Goal</th><th className="text-left text-slate-400 py-2 pr-4">Monthly Amount</th><th className="text-left text-slate-400 py-2 pr-4">Weekly Amount</th></tr></thead>
                    <tbody>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">Max $7,000/year</td><td className="text-slate-300 py-2 pr-4">$583.33/month</td><td className="text-slate-300 py-2 pr-4">$134.62/week</td></tr>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">Half max $3,500/year</td><td className="text-slate-300 py-2 pr-4">$291.67/month</td><td className="text-slate-300 py-2 pr-4">$67.31/week</td></tr>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">Quarter max $1,750/year</td><td className="text-slate-300 py-2 pr-4">$145.83/month</td><td className="text-slate-300 py-2 pr-4">$33.65/week</td></tr>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">Starter $1,200/year</td><td className="text-slate-300 py-2 pr-4">$100/month</td><td className="text-slate-300 py-2 pr-4">$23.08/week</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">How Much a Maxed Roth IRA Is Worth at Retirement</h2>
              <p className="text-slate-400 leading-relaxed mb-4">Maxing out a Roth IRA every year from age 25 to 65 produces remarkable results.</p>
              <div className="result-box mb-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b" style={{borderColor:"rgba(240,200,66,0.1)"}}><th className="text-left text-slate-400 py-2 pr-4">Starting Age</th><th className="text-left text-slate-400 py-2 pr-4">Annual Contribution</th><th className="text-left text-slate-400 py-2 pr-4">At 8% Return at 65</th><th className="text-left text-slate-400 py-2 pr-4">Tax Savings</th></tr></thead>
                    <tbody>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">25 years old</td><td className="text-slate-300 py-2 pr-4">$7,000/year</td><td className="text-slate-300 py-2 pr-4">$1,948,000</td><td className="text-slate-300 py-2 pr-4">All tax-free</td></tr>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">30 years old</td><td className="text-slate-300 py-2 pr-4">$7,000/year</td><td className="text-slate-300 py-2 pr-4">$1,302,000</td><td className="text-slate-300 py-2 pr-4">All tax-free</td></tr>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">35 years old</td><td className="text-slate-300 py-2 pr-4">$7,000/year</td><td className="text-slate-300 py-2 pr-4">$860,000</td><td className="text-slate-300 py-2 pr-4">All tax-free</td></tr>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">40 years old</td><td className="text-slate-300 py-2 pr-4">$7,000/year</td><td className="text-slate-300 py-2 pr-4">$559,000</td><td className="text-slate-300 py-2 pr-4">All tax-free</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">How to Open and Max Out a Roth IRA</h2>
              <ul className="space-y-2 mb-4">
                <li className="text-slate-400 text-sm flex items-start gap-2"><span style={{color:"#f0c842"}} className="mt-1">→</span><span>Choose a broker — Fidelity, Schwab and Vanguard all offer excellent Roth IRAs with no account fees</span></li>
                <li className="text-slate-400 text-sm flex items-start gap-2"><span style={{color:"#f0c842"}} className="mt-1">→</span><span>Open the account online — takes about 15 minutes</span></li>
                <li className="text-slate-400 text-sm flex items-start gap-2"><span style={{color:"#f0c842"}} className="mt-1">→</span><span>Set up automatic monthly contributions of $583.33</span></li>
                <li className="text-slate-400 text-sm flex items-start gap-2"><span style={{color:"#f0c842"}} className="mt-1">→</span><span>Choose investments — FZROX (Fidelity) or VTI (Vanguard) total market index funds</span></li>
                <li className="text-slate-400 text-sm flex items-start gap-2"><span style={{color:"#f0c842"}} className="mt-1">→</span><span>Set investments to auto-invest so contributions are deployed immediately</span></li>
                <li className="text-slate-400 text-sm flex items-start gap-2"><span style={{color:"#f0c842"}} className="mt-1">→</span><span>Review once per year and increase contributions if limits rise</span></li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">See Your Roth IRA Growth Potential</h2>
              <p className="text-slate-400 leading-relaxed mb-4">Use our free compound interest calculator to see exactly how your Roth IRA grows over time.</p>
              <a href="/compound-interest" className="btn-primary inline-block px-6 py-3">Try the Compound Interest Calculator →</a>
            </section>

            <AdUnit slot="3248634657" />

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">{faqs.map((faq,i)=>(<div key={i} className="result-box"><h3 className="text-white font-bold mb-2">{faq.q}</h3><p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p></div>))}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Related Calculators</h2>
              <div className="flex flex-wrap gap-3">
                <a href="/compound-interest" className="hover:underline text-sm" style={{color:"#f0c842"}}>Compound Interest Calculator</a>
            <a href="/retirement-calculator" className="hover:underline text-sm" style={{color:"#f0c842"}}>Retirement Calculator</a>
            <a href="/blog/types-of-retirement-accounts" className="hover:underline text-sm" style={{color:"#f0c842"}}>401k vs Roth IRA vs Traditional IRA</a>
              </div>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
