import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import Link from 'next/link'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
  title: 'How to Create a Monthly Budget That Actually Works (2026)',
  description: 'Learn how to create a realistic monthly budget using the 50/30/20 rule. Step by step guide for beginners with free budget calculator.',
}

const faqs = [
  { q: 'What is the 50/30/20 budget rule?', a: 'The 50/30/20 rule divides your after-tax income into three categories. 50% goes to needs like rent and groceries. 30% goes to wants like dining out and entertainment. 20% goes to savings and debt repayment.' },
  { q: 'How do I start a budget for the first time?', a: 'Start by tracking all income and expenses for one month. Then categorize your spending. Compare what you spent to the 50/30/20 guideline and adjust where needed.' },
  { q: 'What budgeting method works best?', a: 'The best budget is the one you will actually follow. The 50/30/20 rule works well for most people as a starting point. Zero-based budgeting and envelope budgeting are good alternatives.' },
  { q: 'How much should I spend on rent?', a: 'A common guideline is to spend no more than 30% of your gross monthly income on housing. In expensive cities many people spend more but try to keep it under 35% of gross income.' },
  { q: 'What should I do if my expenses exceed my income?', a: 'If expenses exceed income you must either increase income or decrease expenses. Look for ways to cut wants spending first, then needs. Consider a side hustle to increase income.' },
]

export default function Post() {
  return (
    <>
      <FaqSchema faqs={faqs} />
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8"><Link href="/blog" className="text-sm hover:underline" style={{color:'#f0c842'}}>Back to Blog</Link></div>
        <article>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">How to Create a Monthly Budget That Actually Works (2026)</h1>
          <p className="text-slate-400 text-sm mb-8">Updated February 2026 · 9 min read</p>
          <div className="result-box mb-8" style={{borderColor:'rgba(240,200,66,0.3)'}}>
            <h2 className="font-bold mb-2" style={{color:'#f0c842'}}>Quick Answer</h2>
            <p className="text-white">Use the <strong>50/30/20 rule</strong>: 50% of after-tax income on needs, 30% on wants and 20% on savings and debt. Track every dollar and adjust monthly.</p>
          </div>
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">The 50/30/20 Budget Rule Explained</h2>
              <div className="space-y-3">
                {[
                  {pct:'50%',cat:'Needs',color:'text-blue-400',examples:'Rent, mortgage, utilities, groceries, insurance, minimum debt payments, transportation to work'},
                  {pct:'30%',cat:'Wants',color:'text-purple-400',examples:'Dining out, entertainment, subscriptions, hobbies, clothing beyond basics, vacations'},
                  {pct:'20%',cat:'Savings and Debt',color:'text-emerald-400',examples:'Emergency fund, retirement accounts, extra debt payments, investments, savings goals'},
                ].map((item,i)=>(
                  <div key={i} className="result-box flex gap-4 items-start">
                    <div className="text-2xl font-bold w-16 text-center flex-shrink-0" style={{color:'#f0c842'}}>{item.pct}</div>
                    <div>
                      <h3 className={item.color + ' font-bold text-lg mb-1'}>{item.cat}</h3>
                      <p className="text-slate-400 text-sm">{item.examples}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Step by Step: Create Your First Budget</h2>
              <div className="space-y-4">
                {[
                  {num:'1',title:'Calculate your monthly take-home income',desc:'Add up all income after taxes including salary, freelance income, side hustle income and any other regular income sources. Use your average monthly income if it varies.'},
                  {num:'2',title:'List all monthly expenses',desc:'Go through your bank and credit card statements for the last 3 months. List every expense and calculate monthly averages for irregular expenses like car maintenance or clothing.'},
                  {num:'3',title:'Categorize as needs wants or savings',desc:'Sort every expense into needs, wants or savings and debt. Be honest — dining out is a want not a need even if you do it regularly.'},
                  {num:'4',title:'Compare to the 50/30/20 guideline',desc:'Calculate what percentage of your income goes to each category. If needs are above 50% look for ways to reduce fixed costs. If savings are below 20% cut wants spending.'},
                  {num:'5',title:'Set spending limits for each category',desc:'Create a spending limit for each category based on your income and goals. Start with the 50/30/20 rule and adjust based on your specific situation.'},
                  {num:'6',title:'Track and review monthly',desc:'Track your spending throughout the month. Review at month end and adjust the next month. Budgeting gets easier over time as it becomes a habit.'},
                ].map((item,i)=>(
                  <div key={i} className="result-box flex gap-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0" style={{background:'rgba(240,200,66,0.15)',color:'#f0c842'}}>{item.num}</div>
                    <div><h3 className="text-white font-bold mb-2">{item.title}</h3><p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p></div>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Create Your Budget Free</h2>
              <p className="text-slate-400 leading-relaxed mb-4">Use our free budget calculator to apply the 50/30/20 rule to your income and see exactly where your money should go each month.</p>
              <Link href="/budget-calculator" className="btn-primary inline-block px-6 py-3">Try the Free Budget Calculator</Link>
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