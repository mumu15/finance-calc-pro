import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import Link from 'next/link'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
  title: 'How to Build an Emergency Fund From Scratch (2026)',
  description: 'Learn how to build a fully funded emergency fund step by step. Find out how much you need and the best place to keep it.',
}

const faqs = [
  { q: 'How much should I have in an emergency fund?', a: 'Most financial experts recommend saving 3-6 months of essential living expenses. If you are self-employed or have variable income aim for 6-12 months of expenses.' },
  { q: 'Where should I keep my emergency fund?', a: 'Keep your emergency fund in a high-yield savings account that earns competitive interest while remaining easily accessible. Avoid investing it in stocks as the value can drop when you need it most.' },
  { q: 'How long does it take to build an emergency fund?', a: 'At $300 per month savings it takes about 10-17 months to save 3-6 months of a $1,000 monthly expense budget. The timeline depends on how much you can save each month.' },
  { q: 'Should I pay off debt or build an emergency fund first?', a: 'Build a small $1,000 starter emergency fund first. Then aggressively pay off high interest debt. Once high interest debt is paid off build your full 3-6 month emergency fund.' },
  { q: 'What counts as an emergency?', a: 'True emergencies are unexpected necessary expenses like job loss, medical bills, car repairs or home repairs. Planned expenses like vacations or holiday shopping are not emergencies.' },
]

export default function Post() {
  return (
    <>
      <FaqSchema faqs={faqs} />
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8"><Link href="/blog" className="text-sm hover:underline" style={{color:'#f0c842'}}>Back to Blog</Link></div>
        <article>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">How to Build an Emergency Fund From Scratch (2026)</h1>
          <p className="text-slate-400 text-sm mb-8">Updated February 2026 · 8 min read</p>
          <div className="result-box mb-8" style={{borderColor:'rgba(240,200,66,0.3)'}}>
            <h2 className="font-bold mb-2" style={{color:'#f0c842'}}>Quick Answer</h2>
            <p className="text-white">Save <strong>3-6 months of essential living expenses</strong> in a high-yield savings account. Start with a $1,000 starter fund then build to the full amount over time.</p>
          </div>
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">How Much Emergency Fund Do You Need?</h2>
              <div className="result-box">
                <div className="space-y-3">
                  {[
                    {situation:'Stable job, dual income household',amount:'3 months of expenses',risk:'Lower risk'},
                    {situation:'Single income household',amount:'4-6 months of expenses',risk:'Medium risk'},
                    {situation:'Self-employed or freelancer',amount:'6-12 months of expenses',risk:'Higher risk'},
                    {situation:'Commission-based income',amount:'6-12 months of expenses',risk:'Variable income'},
                  ].map((item,i)=>(
                    <div key={i} className="flex justify-between items-center py-2 border-b text-sm" style={{borderColor:'rgba(240,200,66,0.05)'}}>
                      <div><p className="text-white">{item.situation}</p><p className="text-slate-500 text-xs">{item.risk}</p></div>
                      <span className="font-bold ml-4" style={{color:'#f0c842'}}>{item.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Step by Step: Build Your Emergency Fund</h2>
              <div className="space-y-4">
                {[
                  {num:'1',title:'Calculate your monthly expenses',desc:'Add up all essential monthly expenses including rent or mortgage, utilities, groceries, insurance, minimum debt payments and transportation. This is your target monthly amount to multiply by 3-6.'},
                  {num:'2',title:'Open a dedicated high-yield savings account',desc:'Open a separate savings account specifically for your emergency fund. A high-yield savings account earns significantly more interest than a regular savings account. Keep it separate from spending money.'},
                  {num:'3',title:'Start with $1,000',desc:'Your first goal is a $1,000 starter emergency fund. This covers most minor emergencies and gives you a foundation to build on while paying off debt.'},
                  {num:'4',title:'Automate your savings',desc:'Set up an automatic transfer from your checking to your emergency fund on payday. Automating savings removes the temptation to spend the money and ensures consistent progress.'},
                  {num:'5',title:'Build to 3-6 months',desc:'Once high interest debt is paid off redirect those payments to your emergency fund until you reach your 3-6 month target. Most people can complete this in 1-2 years with focused effort.'},
                  {num:'6',title:'Only use it for real emergencies',desc:'Once built only touch your emergency fund for genuine unexpected emergencies. Replenish it as quickly as possible after using it.'},
                ].map((item,i)=>(
                  <div key={i} className="result-box flex gap-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0" style={{background:'rgba(240,200,66,0.15)',color:'#f0c842'}}>{item.num}</div>
                    <div><h3 className="text-white font-bold mb-2">{item.title}</h3><p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p></div>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Calculate Your Emergency Fund Target Free</h2>
              <p className="text-slate-400 leading-relaxed mb-4">Use our free emergency fund calculator to find out exactly how much you need and how long it will take to save it.</p>
              <Link href="/emergency-fund-calculator" className="btn-primary inline-block px-6 py-3">Try the Free Emergency Fund Calculator</Link>
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