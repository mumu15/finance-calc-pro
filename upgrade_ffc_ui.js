const fs = require('fs');

// ── PREMIUM HEADER ────────────────────────────────────────────────────────────
const header = `'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

const tools = [
  { name: 'Mortgage Calculator', href: '/mortgage-calculator', icon: '🏠' },
  { name: 'Loan Calculator', href: '/loan-calculator', icon: '💳' },
  { name: 'Compound Interest', href: '/compound-interest', icon: '📈' },
  { name: 'Savings Calculator', href: '/savings-calculator', icon: '🏦' },
  { name: 'Retirement Calculator', href: '/retirement-calculator', icon: '👴' },
  { name: 'Tax Calculator', href: '/tax-calculator', icon: '📊' },
  { name: 'Debt Payoff', href: '/debt-payoff-calculator', icon: '💰' },
  { name: 'Emergency Fund', href: '/emergency-fund-calculator', icon: '🛡️' },
  { name: 'Budget Calculator', href: '/budget-calculator', icon: '📋' },
  { name: 'Net Worth', href: '/net-worth-calculator', icon: '💎' },
  { name: 'Rent vs Buy', href: '/rent-vs-buy-calculator', icon: '🏡' },
  { name: 'Inflation Calculator', href: '/inflation-calculator', icon: '📉' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b" style={{ borderColor: 'rgba(240,200,66,0.15)', background: 'rgba(3,7,18,0.97)', backdropFilter: 'blur(20px)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm text-dark-950"
              style={{ background: 'linear-gradient(135deg, #f0c842, #f5a623)' }}>F</div>
            <span className="font-bold text-white text-sm">
              FreeFinCalc<span style={{color:'#f0c842'}}>.net</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">

            {/* Tools Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1.5 text-slate-300 hover:text-white text-sm px-4 py-2 rounded-lg hover:bg-white/5 transition-all"
              >
                <svg className="w-4 h-4" style={{color:'#f0c842'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                All Calculators
                <svg className={\`w-3.5 h-3.5 transition-transform \${dropdownOpen ? 'rotate-180' : ''}\`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 rounded-xl border shadow-2xl overflow-hidden"
                  style={{ background: 'rgba(10,15,30,0.98)', borderColor: 'rgba(240,200,66,0.2)', backdropFilter: 'blur(20px)' }}>
                  <div className="p-2">
                    {tools.map(tool => (
                      <Link key={tool.href} href={tool.href}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white transition-all text-sm group"
                        style={{'--hover-bg':'rgba(240,200,66,0.1)'}}
                        onMouseEnter={e => e.currentTarget.style.background='rgba(240,200,66,0.08)'}
                        onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                        <span className="text-base">{tool.icon}</span>
                        <span>{tool.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/blog"
              className="text-slate-300 hover:text-white text-sm px-4 py-2 rounded-lg hover:bg-white/5 transition-all">
              Blog
            </Link>

            <Link href="/mortgage-calculator"
              className="text-sm px-4 py-2 rounded-lg font-medium transition-all ml-2 text-dark-950"
              style={{ background: 'linear-gradient(135deg, #f0c842, #f5a623)', color: '#0a0f1e' }}>
              Try Free →
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-slate-400 hover:text-white p-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden py-3 border-t" style={{ borderColor: 'rgba(240,200,66,0.1)' }}>
            <div className="grid grid-cols-2 gap-1 mb-3">
              {tools.map(tool => (
                <Link key={tool.href} href={tool.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all text-sm">
                  <span>{tool.icon}</span>
                  <span>{tool.name}</span>
                </Link>
              ))}
            </div>
            <div className="border-t pt-3 flex gap-2" style={{ borderColor: 'rgba(240,200,66,0.1)' }}>
              <Link href="/blog" onClick={() => setMobileOpen(false)}
                className="flex-1 text-center text-slate-300 hover:text-white text-sm px-3 py-2 rounded-lg hover:bg-white/5 transition-all">
                Blog
              </Link>
              <Link href="/mortgage-calculator" onClick={() => setMobileOpen(false)}
                className="flex-1 text-center text-sm px-3 py-2 rounded-lg font-medium transition-all"
                style={{ background: 'linear-gradient(135deg, #f0c842, #f5a623)', color: '#0a0f1e' }}>
                Try Free →
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
`;

fs.writeFileSync('components/Header.js', header, 'utf8');
console.log('✅ Premium header created!');

// ── TRUST BADGES + STATS BAR ON HOMEPAGE ─────────────────────────────────────
let homepage = fs.readFileSync('app/page.js', 'utf8');

// Check if already added
if (homepage.includes('Trust Badges')) {
  console.log('⏭️  Trust badges already exist on homepage');
} else {
  const trustSection = `
        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[
            { icon: '⚡', text: 'Instant Results' },
            { icon: '🔒', text: 'No Sign Up Required' },
            { icon: '💯', text: '100% Free Forever' },
            { icon: '🚫', text: 'No Ads' },
            { icon: '📱', text: 'Works on Mobile' },
          ].map((badge, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
              style={{ background: 'rgba(240,200,66,0.08)', border: '1px solid rgba(240,200,66,0.15)', color: '#94a3b8' }}>
              <span>{badge.icon}</span>
              <span>{badge.text}</span>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14 p-6 rounded-2xl border"
          style={{ background: 'rgba(240,200,66,0.03)', borderColor: 'rgba(240,200,66,0.1)' }}>
          {[
            { number: '12', label: 'Free Calculators', icon: '🧮' },
            { number: '50K+', label: 'Monthly Users', icon: '👥' },
            { number: '100%', label: 'Free Forever', icon: '💚' },
            { number: '4.9★', label: 'User Rating', icon: '⭐' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold text-white">{stat.number}</div>
              <div className="text-slate-500 text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

`;

  // Find the tools grid and insert before it
  const gridPatterns = [
    '<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">',
    '<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">',
    '<div className="grid grid-cols-1 md:grid-cols-3 gap-6">',
    '<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">',
  ];

  let replaced = false;
  for (const pattern of gridPatterns) {
    if (homepage.includes(pattern)) {
      homepage = homepage.replace(pattern, trustSection + '        ' + pattern);
      replaced = true;
      break;
    }
  }

  if (!replaced) {
    // Try to find any grid pattern
    homepage = homepage.replace(
      /(<div className="grid grid-cols)/,
      trustSection + '        $1'
    );
  }

  fs.writeFileSync('app/page.js', homepage, 'utf8');
  console.log('✅ Trust badges and stats bar added to homepage!');
}

console.log('\n🎉 All done!');
console.log('Run: git add . && git commit -m "Premium header and trust badges" && git push origin master:main');
