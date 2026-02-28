import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

const calculators = [
  { title: 'Mortgage Calculator', description: 'Calculate your monthly mortgage payment, total interest and loan breakdown.', href: '/mortgage-calculator', icon: '🏠', color: 'from-yellow-500 to-amber-500' },
  { title: 'Loan Calculator', description: 'Calculate monthly payments and total interest for any personal or auto loan.', href: '/loan-calculator', icon: '💰', color: 'from-orange-500 to-yellow-500' },
  { title: 'Compound Interest Calculator', description: 'See how your investments grow over time with the power of compound interest.', href: '/compound-interest', icon: '📈', color: 'from-green-500 to-emerald-500' },
  { title: 'Savings Goal Calculator', description: 'Find out how long it will take to reach any savings goal.', href: '/savings-calculator', icon: '🎯', color: 'from-blue-500 to-cyan-500' },
  { title: 'Retirement Calculator', description: 'Plan your retirement and estimate how much you will have saved.', href: '/retirement-calculator', icon: '🏖️', color: 'from-purple-500 to-pink-500' },
  { title: 'Tax Calculator', description: 'Estimate your federal income tax and take-home pay for 2024.', href: '/tax-calculator', icon: '🧾', color: 'from-red-500 to-rose-500' },
  { title: 'Debt Payoff Calculator', description: 'Find out how long it will take to pay off your debt.', href: '/debt-payoff-calculator', icon: '💳', color: 'from-indigo-500 to-violet-500' },
  { title: 'Emergency Fund Calculator', description: 'Calculate exactly how much you need in your emergency fund.', href: '/emergency-fund-calculator', icon: '🛡️', color: 'from-teal-500 to-green-500' },
  { title: 'Monthly Budget Calculator', description: 'Plan your monthly budget using the 50/30/20 rule.', href: '/budget-calculator', icon: '💸', color: 'from-yellow-400 to-orange-400' },
  { title: 'Net Worth Calculator', description: 'Calculate your total net worth by entering your assets and liabilities.', href: '/net-worth-calculator', icon: '💼', color: 'from-emerald-500 to-teal-500' },
  { title: 'Rent vs Buy Calculator', description: 'Find out whether renting or buying a home makes more financial sense.', href: '/rent-vs-buy-calculator', icon: '🏡', color: 'from-blue-400 to-indigo-400' },
  { title: 'Inflation Calculator', description: 'See how inflation affects the purchasing power of money over time.', href: '/inflation-calculator', icon: '📉', color: 'from-red-400 to-rose-400' },
]

export default function Home() {
  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ background: 'rgba(240,200,66,0.1)', color: '#f0c842', border: '1px solid rgba(240,200,66,0.2)' }}>
            ✨ Free Financial Calculators — No Sign Up Required
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Free Online<br />
            <span style={{color:'#f0c842'}}>Financial Calculators</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
            Professional financial calculators for mortgages, loans, savings, retirement, debt payoff and more — completely free, instant results, no sign up required.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calc) => (
            <Link key={calc.href} href={calc.href}
              className="group result-box transition-all duration-300 hover:-translate-y-1">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${calc.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                {calc.icon}
              </div>
              <h2 className="text-white font-bold text-lg mb-2">{calc.title}</h2>
              <p className="text-slate-400 text-sm leading-relaxed">{calc.description}</p>
            </Link>
          ))}
        </div>
        <div className="mt-20 result-box text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Free Financial Calculators</h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-3xl mx-auto">
            FreeFinCalc.net provides free professional financial calculators for everyday money decisions. Whether you are buying a home, paying off debt, planning for retirement or building an emergency fund, our calculators give you instant accurate results with no sign up required.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
