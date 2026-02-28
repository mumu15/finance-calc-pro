import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import Link from 'next/link'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
  title: 'How Much Should I Save for Retirement? (2026 Guide)',
  description: 'Find out exactly how much you need to save for retirement. Includes the 4% rule, benchmarks by age and 401k contribution tips.',
}

const faqs = [
  { q: 'How much should I save for retirement?', a: 'A common guideline is to save 15% of your gross income for retirement including any employer match. The exact amount depends on your desired lifestyle, retirement age and other income sources like Social Security.' },
  { q: 'What is the 4% rule for retirement?', a: 'The 4% rule states you can safely withdraw 4% of your retirement savings each year without running out of money. To find your target retirement number multiply your desired annual income by 25.' },
  { q: 'How much should I have saved for retirement by age?', a: 'By age 30 aim for 1x your salary. By 40 aim for 3x. By 50 aim for 6x. By 60 aim for 8x. By retirement age 67 aim for 10x your salary saved.' },
  { q: 'What is the maximum 401k contribution for 2026?', a: 'The 401k contribution limit for 2026 is $23,500. Workers age 50 and older can contribute an additional $7,500 as a catch-up contribution for a total of $31,000.' },
  { q: 'What if I started saving for retirement late?', a: 'If you started late maximize your contributions immediately, take advantage of catch-up contributions if over 50, work a few extra years if possible and consider part-time work in early retirement to reduce withdrawal rate.' },
]

export default function Post() {
  return (
    <>
      <FaqSchema faqs={faqs} />
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8"><Link href="/blog" className="text-sm hover:underline" style={{color:'#f0c842'}}>Back to Blog</Link></div>
        <article>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">How Much Should I Save for Retirement? (2026 Guide)</h1>
          <p className="text-slate-400 text-sm mb-8">Updated February 2026 · 10 min read</p>
          <div className="result-box mb-8" style={{borderColor:'rgba(240,200,66,0.3)'}}>
            <h2 className="font-bold mb-2" style={{color:'#f0c842'}}>Quick Answer</h2>
            <p className="text-white">Save <strong>15% of your gross income</strong> for retirement. Use the 4% rule: multiply your desired annual retirement income by 25 to find your target savings number.</p>
          </div>
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">The 4% Rule — How Much Do You Need?</h2>
              <p className="text-slate-400 leading-relaxed mb-4">The 4% rule is the most widely used retirement planning guideline. It says you can withdraw 4% of your savings per year in retirement without running out of money over a 30 year retirement.</p>
              <div className="result-box">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b" style={{borderColor:'rgba(240,200,66,0.1)'}}><th className="text-left text-slate-400 py-2 pr-4">Annual Income Needed</th><th className="text-left py-2" style={{color:'#f0c842'}}>Retirement Savings Target (25x)</th></tr></thead>
                    <tbody>
                      {[['$30,000 per year','$750,000'],['$40,000 per year','$1,000,000'],['$50,000 per year','$1,250,000'],['$60,000 per year','$1,500,000'],['$80,000 per year','$2,000,000'],['$100,000 per year','$2,500,000']].map((r,i)=>(
                        <tr key={i} className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">{r[0]}</td><td className="font-bold py-2" style={{color:'#f0c842'}}>{r[1]}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Retirement Savings Benchmarks by Age</h2>
              <div className="space-y-3">
                {[
                  {age:'By Age 30',target:'1x your annual salary',example:'Earning $50,000: Save $50,000'},
                  {age:'By Age 35',target:'2x your annual salary',example:'Earning $60,000: Save $120,000'},
                  {age:'By Age 40',target:'3x your annual salary',example:'Earning $70,000: Save $210,000'},
                  {age:'By Age 50',target:'6x your annual salary',example:'Earning $80,000: Save $480,000'},
                  {age:'By Age 60',target:'8x your annual salary',example:'Earning $90,000: Save $720,000'},
                  {age:'By Age 67',target:'10x your annual salary',example:'Earning $90,000: Save $900,000'},
                ].map((item,i)=>(
                  <div key={i} className="result-box flex justify-between items-center">
                    <div><h3 className="text-white font-bold">{item.age}</h3><p className="text-slate-500 text-xs mt-1">{item.example}</p></div>
                    <div className="text-sm font-bold text-right" style={{color:'#f0c842'}}>{item.target}</div>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Calculate Your Retirement Savings Free</h2>
              <p className="text-slate-400 leading-relaxed mb-4">Use our free retirement calculator to see exactly how much you need and whether you are on track to meet your retirement goals.</p>
              <Link href="/retirement-calculator" className="btn-primary inline-block px-6 py-3">Try the Free Retirement Calculator</Link>
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