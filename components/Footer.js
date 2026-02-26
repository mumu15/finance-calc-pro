import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-navy-800 mt-20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-gold-400 rounded flex items-center justify-center text-navy-950 font-display font-black text-xs">F</div>
              <span className="font-display font-bold text-white">FinCalc<span className="text-gold-400">Pro</span></span>
            </div>
            <p className="text-slate-400 text-sm">Professional financial calculators to help you make smarter money decisions.</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Calculators</h4>
            <ul className="space-y-2">
              {[
                { href: '/mortgage-calculator', label: 'Mortgage Calculator' },
                { href: '/loan-calculator', label: 'Loan Calculator' },
                { href: '/compound-interest', label: 'Compound Interest' },
              ].map(l => (
                <li key={l.href}><Link href={l.href} className="text-slate-400 text-sm hover:text-gold-400 transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Planning</h4>
            <ul className="space-y-2">
              {[
                { href: '/savings-calculator', label: 'Savings Calculator' },
                { href: '/retirement-calculator', label: 'Retirement Calculator' },
                { href: '/tax-calculator', label: 'Tax Calculator' },
              ].map(l => (
                <li key={l.href}><Link href={l.href} className="text-slate-400 text-sm hover:text-gold-400 transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Info</h4>
            <ul className="space-y-2">
              <li><span className="text-slate-400 text-sm">All calculations are estimates only and not financial advice.</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">© {year} FinCalcPro. All rights reserved.</p>
          <p className="text-slate-600 text-xs">Results are estimates. Consult a financial advisor for professional advice.</p>
        </div>
      </div>
    </footer>
  )
}
