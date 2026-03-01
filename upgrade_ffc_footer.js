const fs = require('fs');

const footer = `import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t mt-16" style={{ borderColor: 'rgba(240,200,66,0.1)' }}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs"
                style={{ background: 'linear-gradient(135deg, #f0c842, #f5a623)', color: '#0a0f1e' }}>F</div>
              <span className="font-bold text-white text-sm">FreeFinCalc<span style={{color:'#f0c842'}}>.net</span></span>
            </Link>
            <p className="text-slate-500 text-xs leading-relaxed">Free personal finance calculators for mortgages, debt, retirement, budgeting and more.</p>
          </div>

          {/* Calculators */}
          <div>
            <h3 className="text-white font-bold text-sm mb-3">Calculators</h3>
            <ul className="space-y-2">
              {[
                ['Mortgage Calculator', '/mortgage-calculator'],
                ['Loan Calculator', '/loan-calculator'],
                ['Compound Interest', '/compound-interest'],
                ['Savings Calculator', '/savings-calculator'],
                ['Retirement Calculator', '/retirement-calculator'],
                ['Tax Calculator', '/tax-calculator'],
              ].map(([name, href]) => (
                <li key={href}><Link href={href} className="text-slate-500 hover:text-yellow-400 text-xs transition-colors">{name}</Link></li>
              ))}
            </ul>
          </div>

          {/* More Calculators */}
          <div>
            <h3 className="text-white font-bold text-sm mb-3">More Calculators</h3>
            <ul className="space-y-2">
              {[
                ['Debt Payoff Calculator', '/debt-payoff-calculator'],
                ['Emergency Fund', '/emergency-fund-calculator'],
                ['Budget Calculator', '/budget-calculator'],
                ['Net Worth Calculator', '/net-worth-calculator'],
                ['Rent vs Buy', '/rent-vs-buy-calculator'],
                ['Inflation Calculator', '/inflation-calculator'],
              ].map(([name, href]) => (
                <li key={href}><Link href={href} className="text-slate-500 hover:text-yellow-400 text-xs transition-colors">{name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-bold text-sm mb-3">Company</h3>
            <ul className="space-y-2">
              {[
                ['About Us', '/about'],
                ['Contact', '/contact'],
                ['Privacy Policy', '/privacy-policy'],
                ['Blog', '/blog'],
              ].map(([name, href]) => (
                <li key={href}><Link href={href} className="text-slate-500 hover:text-yellow-400 text-xs transition-colors">{name}</Link></li>
              ))}
            </ul>
            <div className="mt-4 p-3 rounded-xl text-xs text-slate-500 leading-relaxed" style={{background:'rgba(240,200,66,0.05)',border:'1px solid rgba(240,200,66,0.1)'}}>
              ⚠️ For educational purposes only. Not financial advice.
            </div>
          </div>
        </div>

        <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: 'rgba(240,200,66,0.1)' }}>
          <p className="text-slate-600 text-xs">© 2026 FreeFinCalc.net — All rights reserved</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="text-slate-600 hover:text-slate-400 text-xs transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="text-slate-600 hover:text-slate-400 text-xs transition-colors">Contact</Link>
            <Link href="/about" className="text-slate-600 hover:text-slate-400 text-xs transition-colors">About</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
`;

fs.writeFileSync('components/Footer.js', footer, 'utf8');
console.log('✅ Premium footer created for freefincalc.net!');
console.log('Run: git add . && git commit -m "Upgrade footer with premium multi-column layout" && git push origin master:main');
