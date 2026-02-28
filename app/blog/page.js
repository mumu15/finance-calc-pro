import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const posts = [
  { slug: 'how-to-calculate-mortgage-payment', title: 'How to Calculate Your Monthly Mortgage Payment (2026)', description: 'Learn exactly how to calculate your monthly mortgage payment including principal, interest, taxes and insurance. Includes formula and real examples.', date: '2026-02-01' },
  { slug: 'how-to-pay-off-debt-fast', title: 'How to Pay Off Debt Fast: Snowball vs Avalanche (2026)', description: 'Discover the fastest strategies to pay off debt in 2026. Compare the debt snowball and debt avalanche methods and find out which saves more money.', date: '2026-02-03' },
  { slug: 'what-is-compound-interest', title: 'What is Compound Interest and How Does It Work? (2026)', description: 'Learn what compound interest is, how it works, and why it is the most powerful force in personal finance. Includes real examples and calculations.', date: '2026-02-05' },
  { slug: 'how-much-to-save-for-retirement', title: 'How Much Should I Save for Retirement? (2026 Guide)', description: 'Find out exactly how much you need to save for retirement. Includes the 4% rule, benchmarks by age and 401k contribution tips.', date: '2026-02-07' },
  { slug: 'how-to-build-emergency-fund', title: 'How to Build an Emergency Fund From Scratch (2026)', description: 'Learn how to build a fully funded emergency fund step by step. Find out how much you need and the best place to keep it.', date: '2026-02-09' },
  { slug: 'debt-snowball-vs-avalanche', title: 'Debt Snowball vs Debt Avalanche: Which is Better? (2026)', description: 'A detailed comparison of the two most popular debt payoff methods. Find out which pays off debt faster and saves more money.', date: '2026-02-11' },
  { slug: 'how-to-create-monthly-budget', title: 'How to Create a Monthly Budget That Actually Works (2026)', description: 'Learn how to create a realistic monthly budget using the 50/30/20 rule. Step by step guide for beginners.', date: '2026-02-13' },
  { slug: 'how-to-calculate-net-worth', title: 'How to Calculate Your Net Worth (And Why It Matters)', description: 'Learn how to calculate your net worth step by step. Find out what counts as an asset and liability and how to track your progress.', date: '2026-02-15' },
  { slug: 'rent-vs-buy-home', title: 'Renting vs Buying a Home: Which is Better in 2026?', description: 'Should you rent or buy a home in 2026? We compare the true costs of renting vs buying including all hidden costs most people forget.', date: '2026-02-17' },
  { slug: 'how-does-inflation-affect-savings', title: 'How Does Inflation Affect Your Savings? (2026 Guide)', description: 'Learn how inflation silently erodes your savings and what you can do to protect your money from rising prices in 2026.', date: '2026-02-19' },
  { slug: 'how-to-calculate-loan-payment', title: 'How to Calculate Loan Payments: Complete Guide (2026)', description: 'Learn how to calculate monthly loan payments for personal loans, car loans and student loans. Includes the formula and free calculator.', date: '2026-02-21' },
  { slug: 'how-to-lower-tax-bill', title: 'How to Lower Your Tax Bill Legally in 2026', description: 'Discover legal strategies to reduce your federal income tax bill in 2026. Includes deductions, credits and retirement account strategies.', date: '2026-02-23' },
]

export const metadata = {
  title: 'Personal Finance Blog | FreeFinCalc.net',
  description: 'Free personal finance guides covering mortgages, debt payoff, retirement, budgeting, investing and more. Expert advice updated for 2026.',
}

export default function Blog() {
  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Personal Finance Blog</h1>
          <p className="text-slate-400 text-lg">Free expert guides on mortgages, debt, retirement, budgeting and more — updated 2026</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={"/blog/" + post.slug}
              className="result-box transition-all duration-300 hover:-translate-y-1 group">
              <div className="text-xs mb-2" style={{color:'#f0c842'}}>{post.date}</div>
              <h2 className="text-white font-bold text-lg mb-2 group-hover:text-yellow-400 transition-colors">{post.title}</h2>
              <p className="text-slate-400 text-sm leading-relaxed">{post.description}</p>
              <div className="mt-4 text-sm font-medium" style={{color:'#f0c842'}}>Read article</div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
