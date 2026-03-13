import Header from '../../../components/Header'
import AdUnit from '../../components/AdUnit'
import Footer from '../../../components/Footer'
import Link from 'next/link'
import FaqSchema from '../../../components/FaqSchema'
import SchemaMarkup from '../../components/SchemaMarkup';


export const metadata = {
  title: 'How to Negotiate Your Salary: Scripts and Tips That Work (2026)',
  description: 'Learn how to negotiate your salary confidently in 2026. Includes word-for-word scripts, timing tips and how to handle counteroffers.',
}

const faqs = [
  {
    "q": "Should I always negotiate salary?",
    "a": "Yes. Studies show 85% of hiring managers have room to negotiate and expect candidates to ask. Accepting the first offer leaves real money on the table. The worst they can say is no and the offer will not be rescinded for asking professionally."
  },
  {
    "q": "How do I know what salary to ask for?",
    "a": "Research the market rate using Glassdoor, LinkedIn Salary, Levels.fyi (for tech) and Bureau of Labor Statistics data. Aim for the 60th-75th percentile for your experience level in your location."
  },
  {
    "q": "What if they ask my current salary?",
    "a": "In many US states it is illegal to ask your current salary. You can deflect by saying you are focused on the right fit and market rate for the role. Research your market value beforehand so you have a strong number ready."
  },
  {
    "q": "How do I negotiate a raise at my current job?",
    "a": "Document your achievements and their business impact with numbers. Research market rates. Request a specific meeting to discuss compensation — do not ask in passing. Present your case clearly and ask for a specific amount."
  },
  {
    "q": "Can I negotiate benefits if salary is fixed?",
    "a": "Yes. If the base salary cannot move negotiate signing bonus, extra vacation days, flexible work schedule, remote work, professional development budget or earlier performance review date."
  }
]

export default function Post() {
  return (
    <>
      <FaqSchema faqs={faqs} />
      <Header />
      <SchemaMarkup breadcrumbs={[{"name":"Home","url":"https://freefincalc.net/"},{"name":"Blog","url":"https://freefincalc.net/blog"},{"name":"How To Negotiate Salary","url":"https://freefincalc.net/blog/how-to-negotiate-salary"}]} includeReview={true} />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8"><Link href="/blog" className="text-sm hover:underline" style={{color:"#f0c842"}}>← Back to Blog</Link></div>
        <article>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">How to Negotiate Your Salary: Scripts and Tips That Work (2026)</h1>
          <p className="text-slate-400 text-sm mb-8">March 2026 · 8 min read</p>
          <div className="result-box mb-8" style={{borderColor:"rgba(240,200,66,0.3)"}}>
            <h2 className="font-bold mb-2" style={{color:"#f0c842"}}>Quick Answer</h2>
            <p className="text-white">Always negotiate — <strong>85% of employers expect it</strong> and the average negotiation adds <strong>$5,000–$15,000</strong> to first-year salary. Ask for 10–20% above the offer. Use data from Glassdoor and LinkedIn Salary to anchor your ask.</p>
          </div>
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Word-for-Word Salary Negotiation Scripts</h2>
              <p className="text-slate-400 leading-relaxed mb-4">Use these exact phrases to negotiate your salary confidently and professionally.</p>
              <ul className="space-y-2 mb-4">
                <li className="text-slate-400 text-sm flex items-start gap-2"><span style={{color:"#f0c842"}} className="mt-1">→</span><span>Initial response to offer: "Thank you so much for the offer. I am very excited about this role. Based on my research and experience I was expecting something closer to [X]. Is there flexibility there?"</span></li>
                <li className="text-slate-400 text-sm flex items-start gap-2"><span style={{color:"#f0c842"}} className="mt-1">→</span><span>When asked your number first: "I would love to hear your budgeted range first to make sure we are aligned before we discuss numbers."</span></li>
                <li className="text-slate-400 text-sm flex items-start gap-2"><span style={{color:"#f0c842"}} className="mt-1">→</span><span>Countering a low offer: "I appreciate the offer. Based on my [specific skills/achievements] and the market rate of [X] for this role I was hoping for [Y]. Can we get there?"</span></li>
                <li className="text-slate-400 text-sm flex items-start gap-2"><span style={{color:"#f0c842"}} className="mt-1">→</span><span>Negotiating total package: "If the base salary is firm is there flexibility on the signing bonus or additional vacation days?"</span></li>
                <li className="text-slate-400 text-sm flex items-start gap-2"><span style={{color:"#f0c842"}} className="mt-1">→</span><span>Closing the negotiation: "I am really excited to join the team. If you can get to [X] I am ready to accept today."</span></li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">The Financial Impact of Negotiating</h2>
              <p className="text-slate-400 leading-relaxed mb-4">Salary negotiation is the highest return-on-time activity in personal finance. A $5,000 salary increase compounds significantly over a career.</p>
              <div className="result-box mb-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b" style={{borderColor:"rgba(240,200,66,0.1)"}}><th className="text-left text-slate-400 py-2 pr-4">Salary Increase</th><th className="text-left text-slate-400 py-2 pr-4">5 Years</th><th className="text-left text-slate-400 py-2 pr-4">10 Years</th><th className="text-left text-slate-400 py-2 pr-4">20 Years</th></tr></thead>
                    <tbody>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">$5,000/year</td><td className="text-slate-300 py-2 pr-4">$25,000</td><td className="text-slate-300 py-2 pr-4">$50,000</td><td className="text-slate-300 py-2 pr-4">$100,000</td></tr>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">$10,000/year</td><td className="text-slate-300 py-2 pr-4">$50,000</td><td className="text-slate-300 py-2 pr-4">$100,000</td><td className="text-slate-300 py-2 pr-4">$200,000</td></tr>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">$15,000/year</td><td className="text-slate-300 py-2 pr-4">$75,000</td><td className="text-slate-300 py-2 pr-4">$150,000</td><td className="text-slate-300 py-2 pr-4">$300,000</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Calculate the Impact of a Raise on Your Savings</h2>
              <p className="text-slate-400 leading-relaxed mb-4">Use our savings calculator to see how a salary increase accelerates your financial goals.</p>
              <a href="/savings-calculator" className="btn-primary inline-block px-6 py-3">Try the Savings Calculator →</a>
            </section>

            <AdUnit slot="3248634657" />

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">{faqs.map((faq,i)=>(<div key={i} className="result-box"><h3 className="text-white font-bold mb-2">{faq.q}</h3><p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p></div>))}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Related Calculators</h2>
              <div className="flex flex-wrap gap-3">
                <a href="/savings-calculator" className="hover:underline text-sm" style={{color:"#f0c842"}}>Savings Calculator</a>
            <a href="/budget-calculator" className="hover:underline text-sm" style={{color:"#f0c842"}}>Budget Calculator</a>
            <a href="/blog/how-much-to-save-for-retirement" className="hover:underline text-sm" style={{color:"#f0c842"}}>How Much to Save for Retirement</a>
              </div>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
