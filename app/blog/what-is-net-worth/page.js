import Header from '../../../components/Header'
import AdUnit from '../../components/AdUnit'
import Footer from '../../../components/Footer'
import Link from 'next/link'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
  title: 'What Is Net Worth? How to Calculate and Grow Yours (2026)',
  description: 'Learn what net worth means, how to calculate it and what the average net worth is by age in 2026. Includes a free net worth calculator.',
}

const faqs = [
  {
    "q": "What is considered a good net worth at 30?",
    "a": "A common guideline is to have a net worth equal to your annual salary by age 30. The median US net worth for those under 35 is around $39,000. A net worth of $100,000+ at 30 puts you well ahead of average."
  },
  {
    "q": "What counts as an asset in net worth?",
    "a": "Assets include cash and savings, retirement accounts, investment accounts, home equity, vehicles, business equity and valuable personal property like jewelry. Use current market value not purchase price."
  },
  {
    "q": "What counts as a liability in net worth?",
    "a": "Liabilities include mortgage balance, car loans, student loans, credit card balances, personal loans and any other money you owe. Use the current payoff balance."
  },
  {
    "q": "Is net worth the same as wealth?",
    "a": "Net worth and wealth are closely related but not identical. Net worth is a snapshot of assets minus liabilities at one point in time. Wealth also considers income streams, earning potential and financial security."
  },
  {
    "q": "How often should I calculate my net worth?",
    "a": "Calculate your net worth monthly or quarterly. Tracking it over time is more valuable than any single number. A rising net worth trend shows your financial plan is working."
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">What Is Net Worth? How to Calculate and Grow Yours (2026)</h1>
          <p className="text-slate-400 text-sm mb-8">March 2026 · 7 min read</p>
          <div className="result-box mb-8" style={{borderColor:"rgba(240,200,66,0.3)'}}>
            <h2 className="font-bold mb-2" style={{color:"#f0c842'}}>Quick Answer</h2>
            <p className="text-white">Net worth is your <strong>total assets minus total liabilities</strong>. If you own $200,000 in assets and owe $120,000 your net worth is $80,000. The median net worth in the US is around <strong>$192,700</strong>. For ages 35–44 the median is $135,300.</p>
          </div>
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Average Net Worth by Age in the US (2026)</h2>
              <p className="text-slate-400 leading-relaxed mb-4">How does your net worth compare to peers in your age group?</p>
              <div className="result-box mb-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b" style={{borderColor:"rgba(240,200,66,0.1)"}}><th className="text-left text-slate-400 py-2 pr-4">Age Group</th><th className="text-left text-slate-400 py-2 pr-4">Median Net Worth</th><th className="text-left text-slate-400 py-2 pr-4">Average Net Worth</th></tr></thead>
                    <tbody>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">Under 35</td><td className="text-slate-300 py-2 pr-4">$39,000</td><td className="text-slate-300 py-2 pr-4">$183,000</td></tr>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">35–44</td><td className="text-slate-300 py-2 pr-4">$135,300</td><td className="text-slate-300 py-2 pr-4">$549,000</td></tr>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">45–54</td><td className="text-slate-300 py-2 pr-4">$247,200</td><td className="text-slate-300 py-2 pr-4">$975,800</td></tr>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">55–64</td><td className="text-slate-300 py-2 pr-4">$364,500</td><td className="text-slate-300 py-2 pr-4">$1,566,900</td></tr>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">65–74</td><td className="text-slate-300 py-2 pr-4">$409,900</td><td className="text-slate-300 py-2 pr-4">$1,794,600</td></tr>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">75+</td><td className="text-slate-300 py-2 pr-4">$335,600</td><td className="text-slate-300 py-2 pr-4">$1,624,100</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">How to Increase Your Net Worth</h2>
              <ul className="space-y-2 mb-4">
                <li className="text-slate-400 text-sm flex items-start gap-2"><span style={{color:"#f0c842"}} className="mt-1">→</span><span>Increase income — the most powerful lever for building net worth</span></li>
                <li className="text-slate-400 text-sm flex items-start gap-2"><span style={{color:"#f0c842"}} className="mt-1">→</span><span>Reduce liabilities — pay down debt starting with highest interest rates</span></li>
                <li className="text-slate-400 text-sm flex items-start gap-2"><span style={{color:"#f0c842"}} className="mt-1">→</span><span>Invest consistently — every dollar invested in index funds grows over time</span></li>
                <li className="text-slate-400 text-sm flex items-start gap-2"><span style={{color:"#f0c842"}} className="mt-1">→</span><span>Avoid lifestyle inflation — when income rises keep expenses flat</span></li>
                <li className="text-slate-400 text-sm flex items-start gap-2"><span style={{color:"#f0c842"}} className="mt-1">→</span><span>Build home equity — mortgage payments build assets unlike rent</span></li>
                <li className="text-slate-400 text-sm flex items-start gap-2"><span style={{color:"#f0c842"}} className="mt-1">→</span><span>Maximise retirement accounts — tax-advantaged growth accelerates net worth</span></li>
                <li className="text-slate-400 text-sm flex items-start gap-2"><span style={{color:"#f0c842"}} className="mt-1">→</span><span>Track monthly — awareness of your net worth creates better financial habits</span></li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Net Worth vs Income</h2>
              <p className="text-slate-400 leading-relaxed mb-4">High income does not automatically mean high net worth. A doctor earning $300,000 with $500,000 in student loans and a $800,000 mortgage may have a lower net worth than a teacher earning $60,000 who has saved consistently for 20 years. Net worth is built through the gap between income and spending not through income alone.</p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Calculate Your Net Worth Free</h2>
              <p className="text-slate-400 leading-relaxed mb-4">Use our free net worth calculator to add up your assets and liabilities in minutes.</p>
              <a href="/net-worth-calculator" className="btn-primary inline-block px-6 py-3">Calculate Net Worth Free →</a>
            </section>

            <AdUnit slot="3248634657" />

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">{faqs.map((faq,i)=>(<div key={i} className="result-box"><h3 className="text-white font-bold mb-2">{faq.q}</h3><p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p></div>))}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Related Calculators</h2>
              <div className="flex flex-wrap gap-3">
                <a href="/net-worth-calculator" className="hover:underline text-sm" style={{color:"#f0c842'}}>Net Worth Calculator</a>
            <a href="/blog/how-to-calculate-net-worth" className="hover:underline text-sm" style={{color:"#f0c842'}}>How to Calculate Net Worth</a>
            <a href="/blog/how-much-to-save-for-retirement" className="hover:underline text-sm" style={{color:"#f0c842'}}>How Much to Save for Retirement</a>
              </div>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
