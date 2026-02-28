import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import Link from 'next/link'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
  title: 'What is Compound Interest and How Does It Work? (2026)',
  description: 'Learn what compound interest is, how it works, and why it is the most powerful force in personal finance. Includes real examples and calculations.',
}

const faqs = [
  { q: 'What is compound interest?', a: 'Compound interest is interest calculated on both your initial principal AND the interest you have already earned. Your money grows exponentially over time because you earn interest on your interest.' },
  { q: 'What is the difference between simple and compound interest?', a: 'Simple interest is calculated only on the original principal. Compound interest is calculated on the principal plus all previously earned interest. Over time compound interest grows much faster.' },
  { q: 'How often does interest compound?', a: 'Interest can compound daily, monthly, quarterly or annually. The more frequently interest compounds the more you earn. Daily compounding earns slightly more than monthly which earns more than annual.' },
  { q: 'What is the Rule of 72?', a: 'The Rule of 72 is a quick way to estimate how long it takes to double your money. Divide 72 by your annual interest rate. At 7% your money doubles every 10.3 years. At 10% it doubles every 7.2 years.' },
  { q: 'How can I take advantage of compound interest?', a: 'Start investing as early as possible, reinvest all dividends and interest, contribute regularly and avoid withdrawing money early. Time is the most powerful factor in compound interest.' },
]

export default function Post() {
  return (
    <>
      <FaqSchema faqs={faqs} />
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8"><Link href="/blog" className="text-sm hover:underline" style={{color:'#f0c842'}}>Back to Blog</Link></div>
        <article>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">What is Compound Interest and How Does It Work? (2026)</h1>
          <p className="text-slate-400 text-sm mb-8">Updated February 2026 · 9 min read</p>
          <div className="result-box mb-8" style={{borderColor:'rgba(240,200,66,0.3)'}}>
            <h2 className="font-bold mb-2" style={{color:'#f0c842'}}>Quick Answer</h2>
            <p className="text-white">Compound interest is interest earned on both your <strong>original principal and your accumulated interest</strong>. It causes your money to grow exponentially over time — making it the most powerful force in personal finance.</p>
          </div>
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Simple Interest vs Compound Interest</h2>
              <p className="text-slate-400 leading-relaxed mb-4">The difference between simple and compound interest becomes dramatic over long periods of time.</p>
              <div className="result-box">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b" style={{borderColor:'rgba(240,200,66,0.1)'}}><th className="text-left text-slate-400 py-2 pr-4">Years</th><th className="text-left text-slate-400 py-2 pr-4">Simple Interest (7%)</th><th className="text-left py-2" style={{color:'#f0c842'}}>Compound Interest (7%)</th></tr></thead>
                    <tbody>
                      {[['5 years','$1,350','$1,403'],['10 years','$1,700','$1,967'],['20 years','$2,400','$3,870'],['30 years','$3,100','$7,612'],['40 years','$3,800','$14,974']].map((r,i)=>(
                        <tr key={i} className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">{r[0]}</td><td className="text-slate-400 py-2 pr-4">{r[1]}</td><td className="font-bold py-2" style={{color:'#f0c842'}}>{r[2]}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-slate-500 text-xs mt-2">Based on $1,000 initial investment</p>
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">The Rule of 72</h2>
              <p className="text-slate-400 leading-relaxed mb-4">The Rule of 72 is a simple way to estimate how long it takes to double your money. Divide 72 by your annual interest rate.</p>
              <div className="result-box">
                <div className="space-y-2">
                  {[['4%','18 years to double'],['6%','12 years to double'],['7%','10.3 years to double'],['8%','9 years to double'],['10%','7.2 years to double'],['12%','6 years to double']].map((r,i)=>(
                    <div key={i} className="flex justify-between py-2 border-b text-sm" style={{borderColor:'rgba(240,200,66,0.05)'}}>
                      <span className="text-white font-bold">Interest Rate: {r[0]}</span>
                      <span style={{color:'#f0c842'}}>{r[1]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Why Starting Early Matters So Much</h2>
              <p className="text-slate-400 leading-relaxed mb-4">The single most important factor in compound interest is time. Here is the difference between starting at age 25 vs age 35 investing $300 per month at 7% annual return.</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {age:'Start at 25',contributed:'$144,000',value:'$878,570',extra:'40 years of growth'},
                  {age:'Start at 35',contributed:'$108,000',value:'$454,350',extra:'30 years of growth'},
                ].map((item,i)=>(
                  <div key={i} className="result-box">
                    <h3 className="font-bold mb-3 text-center" style={{color:'#f0c842'}}>{item.age}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-slate-400">Contributed</span><span className="text-white">{item.contributed}</span></div>
                      <div className="flex justify-between"><span className="text-slate-400">Final Value</span><span className="font-bold text-emerald-400">{item.value}</span></div>
                      <p className="text-slate-500 text-xs mt-2">{item.extra}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-slate-400 text-sm mt-4 leading-relaxed">Starting 10 years earlier results in almost double the final value despite only contributing $36,000 more. This is the power of compound interest.</p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Calculate Compound Interest Free</h2>
              <p className="text-slate-400 leading-relaxed mb-4">Use our free compound interest calculator to see exactly how your money grows over time with different interest rates and contribution amounts.</p>
              <Link href="/compound-interest" className="btn-primary inline-block px-6 py-3">Try the Free Compound Interest Calculator</Link>
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