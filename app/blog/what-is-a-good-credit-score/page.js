import Header from '../../../components/Header'
import AdUnit from '../../components/AdUnit'
import Footer from '../../../components/Footer'
import Link from 'next/link'
import FaqSchema from '../../../components/FaqSchema'
import SchemaMarkup from '../../../components/SchemaMarkup';


export const metadata = {
  alternates: { canonical: 'https://www.freefincalc.net/blog/what-is-a-good-credit-score' },
  title: 'What is a Good Credit Score? (Complete 2026 Guide)',
  description: 'Learn what credit score ranges mean, what is considered good, and exactly how to improve your credit score fast in 2026.',
}

const faqs = [
  {
    "q": "What credit score do I need for a mortgage?",
    "a": "Most conventional mortgages require a minimum 620 credit score. FHA loans accept 580 with 3.5% down or 500 with 10% down. The best mortgage rates go to borrowers with 740+ scores."
  },
  {
    "q": "How long does it take to improve a credit score?",
    "a": "Paying down credit card balances can improve your score within 30 days. Building a strong credit history typically takes 6-12 months. Recovering from serious negative marks like bankruptcy takes 2-7 years."
  },
  {
    "q": "What hurts your credit score the most?",
    "a": "Payment history is 35% of your score — missing payments causes the most damage. High credit utilisation above 30% is the second biggest factor at 30%. Collections, charge-offs and bankruptcy cause severe long-term damage."
  },
  {
    "q": "How often does credit score update?",
    "a": "Credit scores typically update monthly when lenders report your account activity to the credit bureaus. After making a big payment or paying off debt your score may update within 30-45 days."
  },
  {
    "q": "Does checking my credit score lower it?",
    "a": "Checking your own credit score is a soft inquiry and does not affect your score. Only hard inquiries from lenders applying for new credit temporarily lower your score by 2-5 points."
  }
]

export default function Post() {
  return (
    <>
      <FaqSchema faqs={faqs} />
      <Header />
      <SchemaMarkup breadcrumbs={[{"name":"Home","url":"https://www.freefincalc.net/"},{"name":"Blog","url":"https://www.freefincalc.net/blog"},{"name":"What Is A Good Credit Score","url":"https://www.freefincalc.net/blog/what-is-a-good-credit-score"}]} includeReview={true} />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8"><Link href="/blog" className="text-sm hover:underline" style={{color:"#f0c842"}}>← Back to Blog</Link></div>
        <article>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">What is a Good Credit Score? (Complete 2026 Guide)</h1>
          <p className="text-slate-400 text-sm mb-8">March 2026 · 8 min read</p>
          <div className="result-box mb-8" style={{borderColor:"rgba(240,200,66,0.3)"}}>
            <h2 className="font-bold mb-2" style={{color:"#f0c842"}}>Quick Answer</h2>
            <p className="text-white">A credit score of <strong>670–739 is Good</strong>. <strong>740–799 is Very Good</strong>. <strong>800+ is Exceptional</strong>. Most lenders offer their best rates at 740+. Below 670 is considered fair and below 580 is poor.</p>
          </div>
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Credit Score Ranges Explained</h2>
              <p className="text-slate-400 leading-relaxed mb-4">Credit scores in the US use the FICO scale from 300 to 850. Here is what every range means for your financial life.</p>
              <div className="result-box mb-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b" style={{borderColor:"rgba(240,200,66,0.1)"}}><th className="text-left text-slate-400 py-2 pr-4">Score Range</th><th className="text-left text-slate-400 py-2 pr-4">Rating</th><th className="text-left text-slate-400 py-2 pr-4">Mortgage Rate Impact</th></tr></thead>
                    <tbody>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">800–850</td><td className="text-slate-300 py-2 pr-4">Exceptional</td><td className="text-slate-300 py-2 pr-4">Best available rates</td></tr>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">740–799</td><td className="text-slate-300 py-2 pr-4">Very Good</td><td className="text-slate-300 py-2 pr-4">Better than average rates</td></tr>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">670–739</td><td className="text-slate-300 py-2 pr-4">Good</td><td className="text-slate-300 py-2 pr-4">Near average rates</td></tr>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">580–669</td><td className="text-slate-300 py-2 pr-4">Fair</td><td className="text-slate-300 py-2 pr-4">Higher rates, limited options</td></tr>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">300–579</td><td className="text-slate-300 py-2 pr-4">Poor</td><td className="text-slate-300 py-2 pr-4">Very high rates or declined</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">What Makes Up Your Credit Score</h2>
              <p className="text-slate-400 leading-relaxed mb-4">FICO scores are calculated from five factors. Understanding each helps you know where to focus improvement efforts.</p>
              <div className="result-box mb-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b" style={{borderColor:"rgba(240,200,66,0.1)"}}><th className="text-left text-slate-400 py-2 pr-4">Factor</th><th className="text-left text-slate-400 py-2 pr-4">Weight</th><th className="text-left text-slate-400 py-2 pr-4">How to Improve</th></tr></thead>
                    <tbody>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">Payment History</td><td className="text-slate-300 py-2 pr-4">35%</td><td className="text-slate-300 py-2 pr-4">Never miss a payment — set up autopay</td></tr>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">Credit Utilisation</td><td className="text-slate-300 py-2 pr-4">30%</td><td className="text-slate-300 py-2 pr-4">Keep balances below 30% of limit</td></tr>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">Length of History</td><td className="text-slate-300 py-2 pr-4">15%</td><td className="text-slate-300 py-2 pr-4">Keep oldest accounts open</td></tr>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">Credit Mix</td><td className="text-slate-300 py-2 pr-4">10%</td><td className="text-slate-300 py-2 pr-4">Have both credit cards and loans</td></tr>
                      <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">New Credit</td><td className="text-slate-300 py-2 pr-4">10%</td><td className="text-slate-300 py-2 pr-4">Limit hard inquiries to when needed</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5 Fastest Ways to Improve Your Credit Score</h2>
              <p className="text-slate-400 leading-relaxed mb-4">These strategies produce the fastest improvements in your credit score. First pay down credit card balances — reducing utilisation from 80% to 30% can add 50-100 points quickly. Second become an authorised user on a family member with good credit score. Third dispute any errors on your credit report — one in five reports has errors. Fourth pay all bills on time going forward — even one missed payment stays on your report for 7 years. Fifth do not close old credit card accounts — length of history matters.</p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Calculate Your Mortgage Rate by Credit Score</h2>
              <p className="text-slate-400 leading-relaxed mb-4">See how your credit score affects your mortgage payment with our free calculator.</p>
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
            <a href="/loan-calculator" className="hover:underline text-sm" style={{color:"#f0c842"}}>Loan Calculator</a>
            <a href="/blog/how-to-calculate-mortgage-payment" className="hover:underline text-sm" style={{color:"#f0c842"}}>How to Calculate Mortgage Payment</a>
              </div>
            </section>
          </div>
        </article>
      </main>
      
        <div style={{marginTop:32,marginBottom:32,padding:24,borderRadius:16,background:'rgba(240,200,66,0.04)',border:'1px solid rgba(240,200,66,0.15)'}}>
          <h2 style={{fontSize:18,fontWeight:700,color:'#f0c842',marginBottom:12,marginTop:0}}>Try These Calculators</h2>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            <a href="/credit-card-payoff-calculator" style={{display:'inline-block',padding:'8px 14px',background:'rgba(240,200,66,0.08)',border:'1px solid rgba(240,200,66,0.2)',borderRadius:8,color:'#f0c842',textDecoration:'none',fontSize:13,fontWeight:600}}>Credit Card Payoff</a>
            <a href="/credit-utilization-calculator" style={{display:'inline-block',padding:'8px 14px',background:'rgba(240,200,66,0.08)',border:'1px solid rgba(240,200,66,0.2)',borderRadius:8,color:'#f0c842',textDecoration:'none',fontSize:13,fontWeight:600}}>Credit Utilization</a>
            <a href="/personal-loan-calculator" style={{display:'inline-block',padding:'8px 14px',background:'rgba(240,200,66,0.08)',border:'1px solid rgba(240,200,66,0.2)',borderRadius:8,color:'#f0c842',textDecoration:'none',fontSize:13,fontWeight:600}}>Personal Loan</a>
            <a href="/mortgage-calculator" style={{display:'inline-block',padding:'8px 14px',background:'rgba(240,200,66,0.08)',border:'1px solid rgba(240,200,66,0.2)',borderRadius:8,color:'#f0c842',textDecoration:'none',fontSize:13,fontWeight:600}}>Mortgage Calculator</a>
          </div>
        </div>
      <Footer />
    </>
  )
}
