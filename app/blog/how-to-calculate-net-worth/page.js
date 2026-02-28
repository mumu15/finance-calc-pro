import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import Link from 'next/link'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
  title: 'How to Calculate Your Net Worth (And Why It Matters)',
  description: 'Learn how to calculate your net worth step by step. Find out what counts as an asset and liability and how to track your financial progress.',
}

const faqs = [
  { q: 'How do you calculate net worth?', a: 'Net worth equals total assets minus total liabilities. Add up everything you own that has value then subtract everything you owe. The result is your net worth which can be positive or negative.' },
  { q: 'What is a good net worth by age?', a: 'A common guideline is that your net worth should equal your age multiplied by your annual income divided by 10. For example a 40 year old earning $70,000 per year should aim for a net worth of $280,000.' },
  { q: 'What counts as an asset?', a: 'Assets include cash and savings, investment and retirement accounts, real estate equity, vehicles, business ownership and any other items of significant value you own outright or partially.' },
  { q: 'What counts as a liability?', a: 'Liabilities include mortgage balance, car loans, student loans, credit card debt, personal loans and any other amounts you owe to lenders.' },
  { q: 'How often should I calculate my net worth?', a: 'Calculate your net worth monthly or quarterly to track your financial progress. Seeing your net worth grow over time is highly motivating and helps you stay on track with financial goals.' },
]

export default function Post() {
  return (
    <>
      <FaqSchema faqs={faqs} />
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8"><Link href="/blog" className="text-sm hover:underline" style={{color:'#f0c842'}}>Back to Blog</Link></div>
        <article>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">How to Calculate Your Net Worth (And Why It Matters)</h1>
          <p className="text-slate-400 text-sm mb-8">Updated February 2026 · 8 min read</p>
          <div className="result-box mb-8" style={{borderColor:'rgba(240,200,66,0.3)'}}>
            <h2 className="font-bold mb-2" style={{color:'#f0c842'}}>Quick Answer</h2>
            <p className="text-white"><strong>Net Worth = Total Assets minus Total Liabilities.</strong> Add up everything you own then subtract everything you owe. Track it monthly to measure your financial progress.</p>
          </div>
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">What Counts as Assets and Liabilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {type:'Assets (What You Own)',color:'text-emerald-400',items:['Cash and checking accounts','Savings accounts','Investment accounts','Retirement accounts (401k, IRA)','Home equity','Car value','Business ownership','Valuable personal property']},
                  {type:'Liabilities (What You Owe)',color:'text-red-400',items:['Mortgage balance','Car loan balance','Student loan balance','Credit card debt','Personal loans','Medical debt','Any other money owed']},
                ].map((item,i)=>(
                  <div key={i} className="result-box">
                    <h3 className={item.color + ' font-bold mb-3'}>{item.type}</h3>
                    <ul className="space-y-1">{item.items.map((it,j)=>(<li key={j} className="text-slate-400 text-sm flex gap-2"><span className={item.color}>+</span>{it}</li>))}</ul>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Why Tracking Net Worth Matters</h2>
              <div className="space-y-3">
                {[
                  {title:'See your true financial picture',desc:'Income and expenses only show cash flow. Net worth shows your actual financial health including all assets and debts. It is the most complete measure of your financial situation.'},
                  {title:'Track progress over time',desc:'Seeing your net worth grow month over month is one of the most motivating things in personal finance. Even small increases show that your financial decisions are working.'},
                  {title:'Identify problem areas',desc:'Calculating net worth reveals exactly where your money is going and where debt is dragging you down. This clarity helps you prioritize where to focus financial improvement efforts.'},
                  {title:'Set meaningful goals',desc:'Knowing your current net worth lets you set specific goals like reaching $100,000 net worth or becoming debt free by a specific date. Concrete goals are far more actionable than vague ones.'},
                ].map((item,i)=>(
                  <div key={i} className="result-box"><h3 className="text-white font-bold mb-2">{item.title}</h3><p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p></div>
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Calculate Your Net Worth Free</h2>
              <p className="text-slate-400 leading-relaxed mb-4">Use our free net worth calculator to instantly calculate your net worth and track your progress over time.</p>
              <Link href="/net-worth-calculator" className="btn-primary inline-block px-6 py-3">Try the Free Net Worth Calculator</Link>
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