import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t mt-20 py-12" style={{ borderColor: 'rgba(240,200,66,0.1)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
                style={{ background: 'linear-gradient(135deg, #f0c842, #e6a817)', color: '#0a0f1e' }}>F</div>
              <span className="font-bold text-white text-lg">FinCalc<span style={{ color: '#f0c842' }}>Pro</span></span>
            </div>
            <p className="text-slate-500 text-sm">Professional financial calculators to help you make smarter money decisions.</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Calculators</h4>
            <ul className="space-y-2">
              <li><Link href="/mortgage-calculator" className="text-slate-500 text-sm hover:text-yellow-400 transition-colors">Mortgage Calculator</Link></li>
              <li><Link href="/loan-calculator" className="text-slate-500 text-sm hover:text-yellow-400 transition-colors">Loan Calculator</Link></li>
              <li><Link href="/compound-interest" className="text-slate-500 text-sm hover:text-yellow-400 transition-colors">Compound Interest</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Planning</h4>
            <ul className="space-y-2">
              <li><Link href="/savings-calculator" className="text-slate-500 text-sm hover:text-yellow-400 transition-colors">Savings Calculator</Link></li>
              <li><Link href="/retirement-calculator" className="text-slate-500 text-sm hover:text-yellow-400 transition-colors">Retirement Calculator</Link></li>
              <li><Link href="/tax-calculator" className="text-slate-500 text-sm hover:text-yellow-400 transition-colors">Tax Calculator</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Info</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-slate-500 text-sm hover:text-yellow-400 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-slate-500 text-sm hover:text-yellow-400 transition-colors">Contact</Link></li>
              <li><Link href="/privacy-policy" className="text-slate-500 text-sm hover:text-yellow-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-4" style={{ borderColor: 'rgba(240,200,66,0.1)' }}>
          <p className="text-slate-500 text-sm">© {year} FreeFinCalc.net. All rights reserved.</p>
          <p className="text-slate-600 text-xs">Results are estimates. Consult a financial advisor for professional advice.</p>
        </div>
      </div>
    </footer>
  )
}