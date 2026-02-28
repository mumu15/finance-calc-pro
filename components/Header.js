'use client'
import { useState } from 'react'
import Link from 'next/link'

const tools = [
  { name: 'Mortgage', href: '/mortgage-calculator' },
  { name: 'Loan', href: '/loan-calculator' },
  { name: 'Compound Interest', href: '/compound-interest' },
  { name: 'Savings', href: '/savings-calculator' },
  { name: 'Retirement', href: '/retirement-calculator' },
  { name: 'Tax', href: '/tax-calculator' },
  { name: 'Debt Payoff', href: '/debt-payoff-calculator' },
  { name: 'Emergency Fund', href: '/emergency-fund-calculator' },
  { name: 'Budget', href: '/budget-calculator' },
  { name: 'Net Worth', href: '/net-worth-calculator' },
  { name: 'Rent vs Buy', href: '/rent-vs-buy-calculator' },
  { name: 'Inflation', href: '/inflation-calculator' },
  { name: 'Blog', href: '/blog' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="border-b sticky top-0 z-50" style={{ borderColor: 'rgba(240,200,66,0.15)', background: 'rgba(3,7,18,0.95)', backdropFilter: 'blur(10px)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-dark-950 font-bold text-xs" style={{ background: 'linear-gradient(135deg, #f0c842, #f5a623)' }}>F</div>
            <span className="font-bold text-white">FreeFinCalc<span style={{color:'#f0c842'}}>.net</span></span>
          </Link>
          <nav className="hidden md:flex items-center gap-1 overflow-x-auto max-w-3xl">
            {tools.map(tool => (
              <Link key={tool.href} href={tool.href} className="text-slate-400 hover:text-white text-xs px-2 py-2 rounded-lg hover:bg-white/5 transition-colors whitespace-nowrap">{tool.name}</Link>
            ))}
          </nav>
          <button onClick={() => setOpen(!open)} className="md:hidden text-slate-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        {open && (
          <div className="md:hidden py-4 border-t" style={{ borderColor: 'rgba(240,200,66,0.1)' }}>
            {tools.map(tool => (
              <Link key={tool.href} href={tool.href} onClick={() => setOpen(false)} className="block text-slate-400 hover:text-white text-sm px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">{tool.name}</Link>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
