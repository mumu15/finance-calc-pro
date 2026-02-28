import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import Link from 'next/link'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
  title: 'How to Calculate Your Monthly Mortgage Payment (2026)',
  description: 'Learn exactly how to calculate your monthly mortgage payment including principal, interest, taxes and insurance. Includes formula and real examples.',
}

const faqs = [
  { q: 'How is a monthly mortgage payment calculated?', a: 'A monthly mortgage payment is calculated using the loan amount, annual interest rate and loan term. The formula factors these three inputs to determine your exact monthly principal and interest payment.' },
  { q: 'What is included in a monthly mortgage payment?', a: 'A full mortgage payment includes principal, interest, property taxes, homeowners insurance and PMI if your down payment was less than 20 percent. This is called PITI.' },
  { q: 'How much mortgage can I afford?', a: 'A common guideline is that total monthly housing costs should not exceed 28 percent of your gross monthly income. Total debt payments should not exceed 36 percent of gross income.' },
  { q: 'What is the difference between a 15 year and 30 year mortgage?', a: 'A 15 year mortgage has higher monthly payments but you pay far less total interest. A 30 year mortgage has lower payments but costs much more in total interest over the life of the loan.' },
  { q: 'What is PMI on a mortgage?', a: 'PMI is Private Mortgage Insurance required when your down payment is less than 20 percent. It typically costs 0.5 to 1.5 percent of the loan per year and can be removed once you reach 20 percent equity.' },
]

export default function Post() {
  return (
    <>
      <FaqSchema faqs={faqs} />
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8"><Link href="/blog" className="text-sm hover:underline" style={{color:'#f0c842'}}>Back to Blog</Link></div>
        <article>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">How to Calculate Your Monthly Mortgage Payment (2026)</h1>
          <p className="text-slate-400 text-sm mb-8">Updated February 2026 · 9 min read</p>
          <div className="result-box mb-8" style={{borderColor:'rgba(240,200,66,0.3)'}}>
            <h2 className="font-bold mb-2" style={{color:'#f0c842'}}>Quick Answer</h2>
            <p className="text-white">On a $300,000 loan at 6.5% for 30 years the monthly principal and interest payment is approximately <strong>$1,896 per month</strong>. Add property taxes and insurance for your full payment.</p>
          </div>
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Mortgage Payment Examples</h2>
              <div className="result-box">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b" style={{borderColor:'rgba(240,200,66,0.1)'}}><th className="text-left text-slate-400 py-2 pr-3">Loan Amount</th><th className="text-left text-slate-400 py-2 pr-3">Rate</th><th className="text-left text-slate-400 py-2 pr-3">Term</th><th className="text-left py-2" style={{color:'#f0c842'}}>Monthly P and I</th></tr></thead>
                    <tbody>
                      {[['$150,000','6.0%','30 years','$899'],['$200,000','6.0%','30 years','$1,199'],['$300,000','6.5%','30 years','$1,896'],['$400,000','6.5%','30 years','$2,528'],['$500,000','7.0%','30 years','$3,327'],['$300,000','6.5%','15 years','$2,614']].map((r,i)=>(
                        <tr key={i} className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-3">{r[0]}</td><td className="text-slate-400 py-2 pr-3">{r[1]}</td><td className="text-slate-400 py-2 pr-3">{r[2]}</td><td className="font-bold py-2" style={{color:'#f0c842'}}>{r[3]}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">What Makes Up Your Full Mortgage Payment</h2>
              <div className="space-y-3">
                {[
                  {label:'Principal',desc:'The portion of your payment that reduces your loan balance. In early years most of your payment goes to interest. Over time more goes to principal.'},
                  {label:'Interest',desc:'The cost of borrowing money. On a $300,000 loan at 6.5% you pay approximately $1,625 in interest in month one alone.'},
                  {label:'Property Taxes',desc:'Most lenders collect property taxes monthly and hold them in escrow. Taxes are typically 1-2% of home value per year.'},
                  {label:'Homeowners Insurance',desc:'Required by lenders. Typically $100-200 per month depending on your home value and location.'},
                  {label:'PMI if applicable',desc:'Required when your down payment is under 20%. Costs 0.5-1.5% of loan per year. Can be removed once you reach 20% equity.'},
                ].map((item,i)=>(
                  <div key={i} className="result-box"><h3 className="text-white font-bold mb-2">{item.label}</h3><p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p></div>
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">15 Year vs 30 Year Mortgage</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {term:'30 Year',pay:'$1,896 per month',interest:'$382,560 total interest',pro:'Lower monthly payment',con:'Pay far more in interest'},
                  {term:'15 Year',pay:'$2,614 per month',interest:'$170,520 total interest',pro:'Save over $212,000 in interest',con:'Higher monthly payment'},
                ].map((item,i)=>(
                  <div key={i} className="result-box">
                    <h3 className="font-bold text-center mb-3" style={{color:'#f0c842'}}>{item.term}</h3>
                    <div className="space-y-2 text-sm">
                      <div><span className="text-slate-400">Payment: </span><span className="text-white font-bold">{item.pay}</span></div>
                      <div><span className="text-slate-400">Interest: </span><span className="text-red-400">{item.interest}</span></div>
                      <div className="pt-2 border-t" style={{borderColor:'rgba(240,200,66,0.1)'}}>
                        <p className="text-emerald-400 text-xs">Plus: {item.pro}</p>
                        <p className="text-red-400 text-xs">Minus: {item.con}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Calculate Your Mortgage Payment Free</h2>
              <p className="text-slate-400 leading-relaxed mb-4">Use our free mortgage calculator to instantly see your exact monthly payment, total interest and full amortization schedule.</p>
              <Link href="/mortgage-calculator" className="btn-primary inline-block px-6 py-3">Try the Free Mortgage Calculator</Link>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">{faqs.map((faq,i)=>(<div key={i} className="result-box"><h3 className="text-white font-bold mb-2">{faq.q}</h3><p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p></div>))}</div>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}