'use client'
import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/mortgage-calculator', label: 'Mortgage' },
  { href: '/loan-calculator', label: 'Loan' },
  { href: '/compound-interest', label: 'Compound Interest' },
  { href: '/savings-calculator', label: 'Savings' },
  { href: '/retirement-calculator', label: 'Retirement' },
  { href: '/tax-calculator', label: 'Tax' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="nav-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gold-400 rounded flex items-center justify-center text-navy-950 font-display font-black text-sm">
              F
            </div>
            <span className="font-display font-bold text-xl text-white">
              FinCalc<span className="text-gold-400">Pro</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-sm font-body transition-all duration-200 ${
                  pathname === link.href
                    ? 'bg-gold-400 text-navy-950 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-navy-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-slate-300 hover:text-white p-2"
            aria-label="Toggle menu"
          >
            <div className={`w-5 h-0.5 bg-current mb-1 transition-all ${open ? 'rotate-45 translate-y-1.5' : ''}`} />
            <div className={`w-5 h-0.5 bg-current mb-1 transition-all ${open ? 'opacity-0' : ''}`} />
            <div className={`w-5 h-0.5 bg-current transition-all ${open ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <nav className="md:hidden pb-4 border-t border-navy-800 mt-2 pt-4">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2 rounded-lg text-sm mb-1 transition-all ${
                  pathname === link.href
                    ? 'bg-gold-400 text-navy-950 font-bold'
                    : 'text-slate-300 hover:bg-navy-800 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
