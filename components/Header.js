'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import CurrencySelector from './CurrencySelector'

const tools = [
  { name: 'Mortgage Calculator', href: '/mortgage-calculator', icon: '🏠' },
  { name: 'Loan Calculator', href: '/loan-calculator', icon: '💳' },
  { name: 'Compound Interest', href: '/compound-interest', icon: '📈' },
  { name: 'Savings Calculator', href: '/savings-calculator', icon: '🏦' },
  { name: 'Retirement Calculator', href: '/retirement-calculator', icon: '👴' },
  { name: 'Tax Calculator', href: '/tax-calculator', icon: '📋' },
  { name: 'Debt Payoff', href: '/debt-payoff-calculator', icon: '💰' },
  { name: 'Emergency Fund', href: '/emergency-fund-calculator', icon: '🚨' },
  { name: 'Budget Calculator', href: '/budget-calculator', icon: '📊' },
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
    <header className="sticky top-0 z-50 border-b" style={{ borderColor: "rgba(240,200,66,0.15)", background: 'rgba(3,7,18,0.97)', backdropFilter: 'blur(20px)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
              style={{ background: 'linear-gradient(135deg, #f0c842, #f5a623)', color: '#0a0f1e' }}>F</div>
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
                <svg className="w-4 h-4" style={{color:"#f0c842"}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                All Calculators
                <svg className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white transition-all text-sm"
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

            {/* 🌍 Currency Selector */}
            <CurrencySelector />

            <Link href="/mortgage-calculator"
              className="text-sm px-4 py-2 rounded-lg font-medium transition-all ml-1"
              style={{ background: 'linear-gradient(135deg, #f0c842, #f5a623)', color: '#0a0f1e' }}>
              Try Free →
            </Link>
          </nav>

          {/* Mobile: Currency + Hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <CurrencySelector />
            <button onClick={() => setMobileOpen(!mobileOpen)} className="text-slate-400 hover:text-white p-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden py-3 border-t" style={{ borderColor: "rgba(240,200,66,0.1)" }}>
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
            <div className="border-t pt-3 flex gap-2" style={{ borderColor: "rgba(240,200,66,0.1)" }}>
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
