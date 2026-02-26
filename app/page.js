import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { AdLeaderboard } from '../components/AdUnit'

const calculators = [
  {
    href: '/mortgage-calculator',
    icon: '🏠',
    title: 'Mortgage Calculator',
    description: 'Calculate monthly payments, total interest, and amortization schedule for your home loan.',
    tags: ['Home Buying', 'Monthly Payments', 'Amortization'],
    cta: 'Calculate Mortgage',
  },
  {
    href: '/loan-calculator',
    icon: '💳',
    title: 'Loan Calculator',
    description: 'Find your monthly payment and total cost for any personal, auto, or student loan.',
    tags: ['Personal Loan', 'Auto Loan', 'Monthly EMI'],
    cta: 'Calculate Loan',
  },
  {
    href: '/compound-interest',
    icon: '📈',
    title: 'Compound Interest Calculator',
    description: 'See how your investments grow over time with the power of compounding returns.',
    tags: ['Investing', 'Growth', 'Wealth Building'],
    cta: 'Calculate Growth',
  },
  {
    href: '/savings-calculator',
    icon: '💰',
    title: 'Savings Calculator',
    description: 'Plan your savings goals and see exactly how much you need to save each month.',
    tags: ['Savings Goals', 'Emergency Fund', 'Future Value'],
    cta: 'Plan Savings',
  },
  {
    href: '/retirement-calculator',
    icon: '🎯',
    title: 'Retirement Calculator',
    description: 'Calculate how much you need to retire comfortably and if you\'re on track.',
    tags: ['Retirement Planning', '401k', 'Pension'],
    cta: 'Plan Retirement',
  },
  {
    href: '/tax-calculator',
    icon: '📋',
    title: 'Tax Calculator',
    description: 'Estimate your federal income tax liability and effective tax rate for the year.',
    tags: ['Income Tax', 'Tax Brackets', 'Deductions'],
    cta: 'Calculate Tax',
  },
]

const stats = [
  { value: '6', label: 'Calculators' },
  { value: '100%', label: 'Free Forever' },
  { value: '< 1s', label: 'Instant Results' },
  { value: '0', label: 'Sign-ups Required' },
]

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-20 pb-24">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-5"
              style={{ background: 'radial-gradient(circle, #d4a017, transparent 70%)', transform: 'translate(200px, -200px)' }} />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-5"
              style={{ background: 'radial-gradient(circle, #173d78, transparent 70%)', transform: 'translate(-150px, 100px)' }} />
            {/* Grid lines */}
            <div className="absolute inset-0"
              style={{
                backgroundImage: 'linear-gradient(rgba(240,200,66,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(240,200,66,0.03) 1px, transparent 1px)',
                backgroundSize: '60px 60px'
              }} />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-navy-800 border border-gold-500/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-pulse" />
              <span className="text-gold-400 text-sm font-mono">Free · Accurate · Instant</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Professional<br />
              <span className="text-gold-400">Financial</span> Calculators
            </h1>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-10 font-body">
              Make smarter money decisions with instant, accurate calculations for mortgages, loans, investments, retirement, and more.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              {stats.map(s => (
                <div key={s.label} className="text-center">
                  <div className="font-mono text-3xl font-bold text-gold-400">{s.value}</div>
                  <div className="text-slate-500 text-sm mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ad unit - top of content */}
        <div className="max-w-4xl mx-auto px-4">
          <AdLeaderboard />
        </div>

        {/* Calculator Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-white mb-3 gold-accent mx-auto" style={{display:'inline-block'}}>
              Choose Your Calculator
            </h2>
            <p className="text-slate-400 mt-4">All calculators are free, no account required.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calculators.map((calc, i) => (
              <Link key={calc.href} href={calc.href}>
                <article className="calc-card rounded-2xl p-6 h-full cursor-pointer group" style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="text-4xl mb-4">{calc.icon}</div>
                  <h2 className="font-display text-xl font-semibold text-white mb-2 group-hover:text-gold-400 transition-colors">
                    {calc.title}
                  </h2>
                  <p className="text-slate-400 text-sm mb-4 leading-relaxed">{calc.description}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {calc.tags.map(tag => (
                      <span key={tag} className="text-xs bg-navy-700 text-slate-400 px-2 py-1 rounded-full border border-navy-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-gold-400 text-sm font-semibold">
                    {calc.cta}
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* Ad unit - mid content */}
        <div className="max-w-4xl mx-auto px-4">
          <AdLeaderboard />
        </div>

        {/* SEO Content Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="result-card">
            <h2 className="font-display text-2xl font-bold text-white mb-4">Why Use FinCalc Pro?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-400 text-sm leading-relaxed">
              <div>
                <h3 className="text-gold-400 font-semibold mb-2">Accurate & Up-to-Date</h3>
                <p>Our calculators use current formulas used by banks and financial institutions. All calculations follow standard financial mathematics to give you precise results.</p>
              </div>
              <div>
                <h3 className="text-gold-400 font-semibold mb-2">No Sign-Up Required</h3>
                <p>Use any calculator instantly — no account, no email, no data collection. Your financial data stays in your browser and is never sent to our servers.</p>
              </div>
              <div>
                <h3 className="text-gold-400 font-semibold mb-2">Mortgage Calculator</h3>
                <p>Calculate exactly what your monthly mortgage payment will be, total interest paid over the life of the loan, and view a full amortization schedule year by year.</p>
              </div>
              <div>
                <h3 className="text-gold-400 font-semibold mb-2">Retirement Planning</h3>
                <p>Our retirement calculator helps you determine if you're on track to retire comfortably, factoring in Social Security, inflation, and expected investment returns.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom ad */}
        <div className="max-w-4xl mx-auto px-4 pb-8">
          <AdLeaderboard />
        </div>
      </main>
      <Footer />
    </>
  )
}
