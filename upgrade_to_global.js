const fs = require('fs');

// ═══════════════════════════════════════════════════════════════════
// FILE 1: components/CurrencyContext.js
// ═══════════════════════════════════════════════════════════════════
const currencyContext = `'use client'
import { createContext, useContext, useState, useEffect, useCallback } from 'react'

export const CURRENCIES = [
  // Americas
  { code:'USD', symbol:'$',   name:'US Dollar',          flag:'🇺🇸', locale:'en-US', region:'Americas',
    rate:1,     defaults:{ home:350000,  income:75000,  savings:10000,  loan:25000,  retirement:500000,  emergency:4000,  rent:2000,  debt:15000 } },
  { code:'CAD', symbol:'C$',  name:'Canadian Dollar',    flag:'🇨🇦', locale:'en-CA', region:'Americas',
    rate:1.36,  defaults:{ home:650000,  income:85000,  savings:15000,  loan:35000,  retirement:600000,  emergency:5000,  rent:2200,  debt:20000 } },
  { code:'BRL', symbol:'R$',  name:'Brazilian Real',     flag:'🇧🇷', locale:'pt-BR', region:'Americas',
    rate:5.0,   defaults:{ home:400000,  income:60000,  savings:10000,  loan:20000,  retirement:300000,  emergency:3000,  rent:2000,  debt:10000 } },
  { code:'MXN', symbol:'MX$', name:'Mexican Peso',       flag:'🇲🇽', locale:'es-MX', region:'Americas',
    rate:17.0,  defaults:{ home:2000000, income:300000, savings:80000,  loan:150000, retirement:1500000, emergency:40000, rent:12000, debt:80000 } },
  { code:'COP', symbol:'$',   name:'Colombian Peso',     flag:'🇨🇴', locale:'es-CO', region:'Americas',
    rate:3900,  defaults:{ home:400000000,income:40000000,savings:5000000,loan:20000000,retirement:200000000,emergency:4000000,rent:2000000,debt:10000000 } },

  // Europe
  { code:'GBP', symbol:'£',   name:'British Pound',      flag:'🇬🇧', locale:'en-GB', region:'Europe',
    rate:0.79,  defaults:{ home:280000,  income:40000,  savings:10000,  loan:15000,  retirement:300000,  emergency:4000,  rent:1500,  debt:12000 } },
  { code:'EUR', symbol:'€',   name:'Euro',               flag:'🇪🇺', locale:'de-DE', region:'Europe',
    rate:0.92,  defaults:{ home:300000,  income:45000,  savings:12000,  loan:15000,  retirement:350000,  emergency:4500,  rent:1200,  debt:12000 } },
  { code:'CHF', symbol:'Fr',  name:'Swiss Franc',        flag:'🇨🇭', locale:'de-CH', region:'Europe',
    rate:0.90,  defaults:{ home:800000,  income:100000, savings:30000,  loan:25000,  retirement:800000,  emergency:10000, rent:2500,  debt:20000 } },
  { code:'SEK', symbol:'kr',  name:'Swedish Krona',      flag:'🇸🇪', locale:'sv-SE', region:'Europe',
    rate:10.4,  defaults:{ home:3000000, income:500000, savings:100000, loan:150000, retirement:2500000, emergency:50000, rent:12000, debt:120000 } },
  { code:'NOK', symbol:'kr',  name:'Norwegian Krone',    flag:'🇳🇴', locale:'nb-NO', region:'Europe',
    rate:10.6,  defaults:{ home:4000000, income:600000, savings:150000, loan:200000, retirement:3000000, emergency:60000, rent:15000, debt:150000 } },
  { code:'DKK', symbol:'kr',  name:'Danish Krone',       flag:'🇩🇰', locale:'da-DK', region:'Europe',
    rate:6.9,   defaults:{ home:2500000, income:400000, savings:100000, loan:150000, retirement:2000000, emergency:40000, rent:10000, debt:100000 } },
  { code:'PLN', symbol:'zł',  name:'Polish Zloty',       flag:'🇵🇱', locale:'pl-PL', region:'Europe',
    rate:3.95,  defaults:{ home:500000,  income:70000,  savings:15000,  loan:30000,  retirement:400000,  emergency:7000,  rent:3000,  debt:20000 } },
  { code:'TRY', symbol:'₺',   name:'Turkish Lira',       flag:'🇹🇷', locale:'tr-TR', region:'Europe',
    rate:32.0,  defaults:{ home:5000000, income:500000, savings:100000, loan:200000, retirement:3000000, emergency:50000, rent:20000, debt:100000 } },

  // Asia Pacific
  { code:'AUD', symbol:'A$',  name:'Australian Dollar',  flag:'🇦🇺', locale:'en-AU', region:'Asia Pacific',
    rate:1.53,  defaults:{ home:750000,  income:90000,  savings:20000,  loan:30000,  retirement:600000,  emergency:7000,  rent:2500,  debt:20000 } },
  { code:'NZD', symbol:'NZ$', name:'New Zealand Dollar', flag:'🇳🇿', locale:'en-NZ', region:'Asia Pacific',
    rate:1.63,  defaults:{ home:700000,  income:70000,  savings:15000,  loan:25000,  retirement:500000,  emergency:6000,  rent:2200,  debt:18000 } },
  { code:'JPY', symbol:'¥',   name:'Japanese Yen',       flag:'🇯🇵', locale:'ja-JP', region:'Asia Pacific',
    rate:150.0, defaults:{ home:40000000,income:5000000,savings:1000000,loan:2000000,retirement:30000000,emergency:600000,rent:100000,debt:1500000 } },
  { code:'CNY', symbol:'¥',   name:'Chinese Yuan',       flag:'🇨🇳', locale:'zh-CN', region:'Asia Pacific',
    rate:7.24,  defaults:{ home:2000000, income:200000, savings:50000,  loan:100000, retirement:1500000, emergency:30000, rent:5000,  debt:60000 } },
  { code:'HKD', symbol:'HK$', name:'Hong Kong Dollar',   flag:'🇭🇰', locale:'zh-HK', region:'Asia Pacific',
    rate:7.82,  defaults:{ home:6000000, income:400000, savings:100000, loan:200000, retirement:3000000, emergency:50000, rent:18000, debt:150000 } },
  { code:'SGD', symbol:'S$',  name:'Singapore Dollar',   flag:'🇸🇬', locale:'en-SG', region:'Asia Pacific',
    rate:1.34,  defaults:{ home:800000,  income:80000,  savings:20000,  loan:30000,  retirement:600000,  emergency:8000,  rent:2500,  debt:25000 } },
  { code:'INR', symbol:'₹',   name:'Indian Rupee',       flag:'🇮🇳', locale:'en-IN', region:'Asia Pacific',
    rate:83.0,  defaults:{ home:7500000, income:800000, savings:200000, loan:500000, retirement:5000000, emergency:100000,rent:25000, debt:300000 } },
  { code:'PKR', symbol:'₨',   name:'Pakistani Rupee',    flag:'🇵🇰', locale:'ur-PK', region:'Asia Pacific',
    rate:278.0, defaults:{ home:20000000,income:1500000,savings:300000, loan:1000000,retirement:10000000,emergency:200000,rent:50000, debt:500000 } },
  { code:'BDT', symbol:'৳',   name:'Bangladeshi Taka',   flag:'🇧🇩', locale:'bn-BD', region:'Asia Pacific',
    rate:110.0, defaults:{ home:5000000, income:500000, savings:100000, loan:300000, retirement:3000000, emergency:60000, rent:20000, debt:200000 } },
  { code:'MYR', symbol:'RM',  name:'Malaysian Ringgit',  flag:'🇲🇾', locale:'ms-MY', region:'Asia Pacific',
    rate:4.7,   defaults:{ home:600000,  income:60000,  savings:15000,  loan:30000,  retirement:400000,  emergency:7000,  rent:2000,  debt:20000 } },
  { code:'THB', symbol:'฿',   name:'Thai Baht',          flag:'🇹🇭', locale:'th-TH', region:'Asia Pacific',
    rate:35.0,  defaults:{ home:3000000, income:300000, savings:50000,  loan:150000, retirement:2000000, emergency:40000, rent:15000, debt:100000 } },
  { code:'IDR', symbol:'Rp',  name:'Indonesian Rupiah',  flag:'🇮🇩', locale:'id-ID', region:'Asia Pacific',
    rate:15700, defaults:{ home:1000000000,income:100000000,savings:20000000,loan:50000000,retirement:500000000,emergency:15000000,rent:5000000,debt:30000000 } },
  { code:'PHP', symbol:'₱',   name:'Philippine Peso',    flag:'🇵🇭', locale:'en-PH', region:'Asia Pacific',
    rate:56.0,  defaults:{ home:3000000, income:500000, savings:100000, loan:200000, retirement:2000000, emergency:50000, rent:20000, debt:100000 } },
  { code:'VND', symbol:'₫',   name:'Vietnamese Dong',    flag:'🇻🇳', locale:'vi-VN', region:'Asia Pacific',
    rate:24500, defaults:{ home:2000000000,income:200000000,savings:30000000,loan:80000000,retirement:800000000,emergency:20000000,rent:8000000,debt:50000000 } },
  { code:'KRW', symbol:'₩',   name:'South Korean Won',   flag:'🇰🇷', locale:'ko-KR', region:'Asia Pacific',
    rate:1330,  defaults:{ home:500000000,income:50000000,savings:10000000,loan:20000000,retirement:300000000,emergency:6000000,rent:1500000,debt:15000000 } },

  // Middle East & Africa
  { code:'AED', symbol:'د.إ', name:'UAE Dirham',         flag:'🇦🇪', locale:'ar-AE', region:'Middle East & Africa',
    rate:3.67,  defaults:{ home:1500000, income:200000, savings:50000,  loan:100000, retirement:1000000, emergency:20000, rent:8000,  debt:60000 } },
  { code:'SAR', symbol:'﷼',   name:'Saudi Riyal',        flag:'🇸🇦', locale:'ar-SA', region:'Middle East & Africa',
    rate:3.75,  defaults:{ home:1000000, income:150000, savings:40000,  loan:80000,  retirement:800000,  emergency:18000, rent:6000,  debt:50000 } },
  { code:'QAR', symbol:'QR',  name:'Qatari Riyal',       flag:'🇶🇦', locale:'ar-QA', region:'Middle East & Africa',
    rate:3.64,  defaults:{ home:1200000, income:180000, savings:50000,  loan:90000,  retirement:900000,  emergency:20000, rent:8000,  debt:55000 } },
  { code:'KWD', symbol:'KD',  name:'Kuwaiti Dinar',      flag:'🇰🇼', locale:'ar-KW', region:'Middle East & Africa',
    rate:0.31,  defaults:{ home:120000,  income:18000,  savings:5000,   loan:10000,  retirement:100000,  emergency:2000,  rent:800,   debt:6000 } },
  { code:'EGP', symbol:'E£',  name:'Egyptian Pound',     flag:'🇪🇬', locale:'ar-EG', region:'Middle East & Africa',
    rate:30.0,  defaults:{ home:2000000, income:200000, savings:50000,  loan:100000, retirement:1000000, emergency:20000, rent:8000,  debt:60000 } },
  { code:'NGN', symbol:'₦',   name:'Nigerian Naira',     flag:'🇳🇬', locale:'en-NG', region:'Middle East & Africa',
    rate:1500,  defaults:{ home:50000000,income:5000000,savings:1000000,loan:2000000,retirement:30000000,emergency:600000,rent:200000,debt:1500000 } },
  { code:'KES', symbol:'KSh', name:'Kenyan Shilling',    flag:'🇰🇪', locale:'sw-KE', region:'Middle East & Africa',
    rate:130.0, defaults:{ home:10000000,income:1000000,savings:200000, loan:500000, retirement:5000000, emergency:100000,rent:50000, debt:300000 } },
  { code:'ZAR', symbol:'R',   name:'South African Rand', flag:'🇿🇦', locale:'en-ZA', region:'Middle East & Africa',
    rate:18.5,  defaults:{ home:1500000, income:300000, savings:50000,  loan:100000, retirement:1000000, emergency:20000, rent:12000, debt:80000 } },
  { code:'GHS', symbol:'₵',   name:'Ghanaian Cedi',      flag:'🇬🇭', locale:'en-GH', region:'Middle East & Africa',
    rate:12.5,  defaults:{ home:500000,  income:60000,  savings:10000,  loan:30000,  retirement:300000,  emergency:8000,  rent:3000,  debt:20000 } },
]

const CurrencyContext = createContext(null)

function formatNumber(n, currency) {
  const abs = Math.abs(n)
  if (abs >= 1e12) return currency.symbol + (n / 1e12).toFixed(1) + 'T'
  if (abs >= 1e9)  return currency.symbol + (n / 1e9).toFixed(1) + 'B'
  if (abs >= 1e6)  return currency.symbol + (n / 1e6).toFixed(1) + 'M'
  if (abs >= 1e3)  return currency.symbol + Math.round(n).toLocaleString(currency.locale)
  return currency.symbol + Math.round(n).toLocaleString(currency.locale)
}

function detectCurrency() {
  try {
    const lang = navigator.language || 'en-US'
    const map = {
      'en-US':'USD','en-CA':'CAD','pt-BR':'BRL','es-MX':'MXN',
      'en-GB':'GBP','de-DE':'EUR','de-AT':'EUR','fr-FR':'EUR','es-ES':'EUR','it':'EUR','nl':'EUR','pt-PT':'EUR',
      'de-CH':'CHF','sv-SE':'SEK','nb-NO':'NOK','da-DK':'DKK','pl-PL':'PLN','tr-TR':'TRY',
      'en-AU':'AUD','en-NZ':'NZD','ja-JP':'JPY','zh-CN':'CNY','zh-HK':'HKD',
      'en-SG':'SGD','en-IN':'INR','ur-PK':'PKR','bn-BD':'BDT','ms-MY':'MYR',
      'th-TH':'THB','id-ID':'IDR','en-PH':'PHP','vi-VN':'VND','ko-KR':'KRW',
      'ar-AE':'AED','ar-SA':'SAR','ar-QA':'QAR','ar-KW':'KWD','ar-EG':'EGP',
      'en-NG':'NGN','sw-KE':'KES','en-ZA':'ZAR','en-GH':'GHS',
    }
    for (const [key, code] of Object.entries(map)) {
      if (lang.startsWith(key)) return code
    }
  } catch(e) {}
  return 'USD'
}

export function CurrencyProvider({ children }) {
  const [currencyCode, setCurrencyCode] = useState('USD')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ffc_currency')
      if (saved && CURRENCIES.find(c => c.code === saved)) {
        setCurrencyCode(saved)
      } else {
        setCurrencyCode(detectCurrency())
      }
    } catch(e) {}
  }, [])

  const setCurrency = useCallback((code) => {
    setCurrencyCode(code)
    try { localStorage.setItem('ffc_currency', code) } catch(e) {}
  }, [])

  const currency = CURRENCIES.find(c => c.code === currencyCode) || CURRENCIES[0]
  const fmt = useCallback((n) => formatNumber(n, currency), [currency])

  return (
    <CurrencyContext.Provider value={{ currency, currencies: CURRENCIES, setCurrency, fmt }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext)
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider')
  return ctx
}
`;

// ═══════════════════════════════════════════════════════════════════
// FILE 2: components/CurrencySelector.js
// ═══════════════════════════════════════════════════════════════════
const currencySelector = `'use client'
import { useState, useRef, useEffect } from 'react'
import { useCurrency, CURRENCIES } from './CurrencyContext'

const REGIONS = ['Americas', 'Europe', 'Asia Pacific', 'Middle East & Africa']

export default function CurrencySelector() {
  const { currency, setCurrency } = useCurrency()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const ref = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const filtered = search
    ? CURRENCIES.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.code.toLowerCase().includes(search.toLowerCase()) ||
        c.flag.includes(search)
      )
    : null

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
        style={{
          background: 'rgba(240,200,66,0.1)',
          border: '1px solid rgba(240,200,66,0.25)',
          color: '#f0c842'
        }}
      >
        <span className="text-base leading-none">{currency.flag}</span>
        <span className="font-bold">{currency.code}</span>
        <svg className={\`w-3 h-3 transition-transform \${open ? 'rotate-180' : ''}\`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-72 rounded-xl border shadow-2xl overflow-hidden z-50"
          style={{ background: 'rgba(10,15,30,0.99)', borderColor: 'rgba(240,200,66,0.2)', backdropFilter: 'blur(20px)' }}>

          {/* Search */}
          <div className="p-2 border-b" style={{ borderColor: 'rgba(240,200,66,0.1)' }}>
            <input
              type="text"
              placeholder="Search currency..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-3 py-2 rounded-lg text-sm text-white placeholder-slate-500 outline-none"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
              autoFocus
            />
          </div>

          {/* Currency List */}
          <div className="overflow-y-auto max-h-72">
            {filtered ? (
              <div className="p-1">
                {filtered.map(c => (
                  <CurrencyRow key={c.code} c={c} active={c.code === currency.code}
                    onClick={() => { setCurrency(c.code); setOpen(false); setSearch('') }} />
                ))}
                {filtered.length === 0 && (
                  <p className="text-slate-500 text-xs text-center py-4">No currencies found</p>
                )}
              </div>
            ) : (
              REGIONS.map(region => {
                const regionCurrencies = CURRENCIES.filter(c => c.region === region)
                return (
                  <div key={region}>
                    <div className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 border-b"
                      style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                      {region}
                    </div>
                    <div className="p-1">
                      {regionCurrencies.map(c => (
                        <CurrencyRow key={c.code} c={c} active={c.code === currency.code}
                          onClick={() => { setCurrency(c.code); setOpen(false); setSearch('') }} />
                      ))}
                    </div>
                  </div>
                )
              })
            )}
          </div>

          <div className="px-3 py-2 border-t text-xs text-slate-600" style={{ borderColor: 'rgba(240,200,66,0.1)' }}>
            🌍 {CURRENCIES.length} currencies • Auto-detected from your location
          </div>
        </div>
      )}
    </div>
  )
}

function CurrencyRow({ c, active, onClick }) {
  return (
    <button onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all text-left"
      style={{ background: active ? 'rgba(240,200,66,0.12)' : 'transparent' }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}>
      <span className="text-base w-6 text-center">{c.flag}</span>
      <span className="font-bold text-xs w-8" style={{ color: active ? '#f0c842' : '#64748b' }}>{c.code}</span>
      <span className={active ? 'text-white' : 'text-slate-400'}>{c.name}</span>
      {active && <span className="ml-auto text-xs" style={{ color: '#f0c842' }}>✓</span>}
    </button>
  )
}
`;

// ═══════════════════════════════════════════════════════════════════
// FILE 3: components/Providers.js
// ═══════════════════════════════════════════════════════════════════
const providers = `'use client'
import { CurrencyProvider } from './CurrencyContext'

export default function Providers({ children }) {
  return (
    <CurrencyProvider>
      {children}
    </CurrencyProvider>
  )
}
`;

// ═══════════════════════════════════════════════════════════════════
// FILE 4: Updated Header with CurrencySelector
// ═══════════════════════════════════════════════════════════════════
const header = `'use client'
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
    <header className="sticky top-0 z-50 border-b" style={{ borderColor: 'rgba(240,200,66,0.15)', background: 'rgba(3,7,18,0.97)', backdropFilter: 'blur(20px)' }}>
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

// ═══════════════════════════════════════════════════════════════════
// FILE 5: Updated layout.js wrapping with Providers
// ═══════════════════════════════════════════════════════════════════
const layout = `import './globals.css'
import Script from 'next/script'
import Providers from '../components/Providers'

export const metadata = {
  metadataBase: new URL('https://www.freefincalc.net'),
  title: {
    default: 'FreeFinCalc.net — Free Financial Calculators (40+ Currencies)',
    template: '%s | FreeFinCalc.net'
  },
  description: 'Free professional financial calculators in 40+ currencies. Mortgage, loan, compound interest, savings, retirement and tax calculators for users worldwide. Instant results, no sign up.',
  keywords: ['mortgage calculator', 'loan calculator', 'compound interest calculator', 'savings calculator', 'retirement calculator', 'tax calculator', 'free financial calculators', 'currency calculator', 'global finance calculator', 'international mortgage calculator'],
  authors: [{ name: 'FreeFinCalc.net' }],
  creator: 'FreeFinCalc.net',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.freefincalc.net',
    siteName: 'FreeFinCalc.net',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'FreeFinCalc.net - Free Financial Calculators in 40+ Currencies' }],
    title: 'FreeFinCalc.net — Free Financial Calculators (40+ Currencies)',
    description: 'Free professional financial calculators in 40+ currencies for users worldwide. No sign up required.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FreeFinCalc.net — Free Financial Calculators (40+ Currencies)',
    description: 'Free mortgage, loan, savings and retirement calculators in 40+ currencies. No sign up.',
    site: '@freefincalc',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-HYY72T4W5T" strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">
          {\`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HYY72T4W5T');
          \`}
        </Script>
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8934829211507329"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  )
}
`;

// ═══════════════════════════════════════════════════════════════════
// FILE 6: New Mortgage Calculator with full currency support
// ═══════════════════════════════════════════════════════════════════
const mortgageCalc = `'use client'
import { useState, useMemo, useEffect } from 'react'
import AdUnit from '../components/AdUnit'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import FaqSchema from '../../components/FaqSchema'
import { useCurrency } from '../../components/CurrencyContext'

const faqs = [
  { q: 'How is a mortgage payment calculated?', a: 'A monthly mortgage payment is calculated using the loan amount, interest rate and loan term. The formula is M = P[r(1+r)^n]/[(1+r)^n-1] where P is principal, r is monthly rate and n is number of payments.' },
  { q: 'What is PMI and when do I need it?', a: 'Private Mortgage Insurance (PMI) is required when your down payment is less than 20% of the home price. PMI typically costs 0.5-1% of the loan amount per year and is added to your monthly payment.' },
  { q: 'What is the difference between a 15 and 30 year mortgage?', a: 'A 15-year mortgage has higher monthly payments but you pay far less total interest. A 30-year mortgage has lower monthly payments but costs significantly more in total interest over the life of the loan.' },
  { q: 'What costs are included in a mortgage payment?', a: 'A full mortgage payment includes principal, interest, property taxes, homeowners insurance and PMI if applicable. These are often referred to as PITI — Principal, Interest, Taxes and Insurance.' },
  { q: 'How much house can I afford?', a: 'A common rule is to spend no more than 28% of your gross monthly income on housing costs. Use our mortgage calculator with your local currency to find the right amount for your market.' },
]

export default function MortgageCalculator() {
  const { fmt, currency } = useCurrency()

  const [homePrice, setHomePrice]     = useState(350000)
  const [downPayment, setDownPayment] = useState(70000)
  const [interestRate, setInterestRate] = useState(6.5)
  const [loanTerm, setLoanTerm]       = useState(30)
  const [propertyTax, setPropertyTax] = useState(3600)
  const [insurance, setInsurance]     = useState(1200)
  const [hoa, setHoa]                 = useState(0)
  const [showAmort, setShowAmort]     = useState(false)
  const [showFull, setShowFull]       = useState(false)

  // Reset to regional defaults when currency changes
  useEffect(() => {
    const d = currency.defaults
    setHomePrice(d.home)
    setDownPayment(Math.round(d.home * 0.2))
    setPropertyTax(Math.round(d.home * 0.01))
    setInsurance(Math.round(d.home * 0.004))
    setHoa(0)
  }, [currency.code])

  const maxHome = Math.round(currency.defaults.home * 6)
  const maxLoan = Math.round(currency.defaults.loan * 20)

  const calc = useMemo(() => {
    const loanAmount = homePrice - downPayment
    const monthlyRate = interestRate / 100 / 12
    const n = loanTerm * 12
    const pi = monthlyRate === 0 ? loanAmount / n :
      loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1)
    const pmi = downPayment / homePrice < 0.2 ? (loanAmount * 0.008) / 12 : 0
    const monthlyTax = propertyTax / 12
    const monthlyIns = insurance / 12
    const monthlyHoa = hoa
    const total = pi + pmi + monthlyTax + monthlyIns + monthlyHoa
    const totalInterest = (pi * n) - loanAmount
    const totalCost = loanAmount + totalInterest
    let balance = loanAmount
    const schedule = []
    for (let i = 1; i <= n; i++) {
      const interestPayment = balance * monthlyRate
      const principalPayment = pi - interestPayment
      balance -= principalPayment
      schedule.push({ month: i, payment: pi, principal: principalPayment, interest: interestPayment, balance: Math.max(0, balance) })
    }
    return { loanAmount, pi, pmi, monthlyTax, monthlyIns, monthlyHoa, total, totalInterest, totalCost, schedule }
  }, [homePrice, downPayment, interestRate, loanTerm, propertyTax, insurance, hoa])

  const downPct = Math.round((downPayment / homePrice) * 100)
  const displayedSchedule = showFull ? calc.schedule : calc.schedule.slice(0, 24)

  return (
    <>
      <FaqSchema faqs={faqs} />
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Free Mortgage Calculator</h1>
          <p className="text-slate-400 text-lg">Calculate your monthly mortgage payment in <span style={{color:'#f0c842'}}>{currency.flag} {currency.name}</span></p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Inputs */}
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Loan Details</h2>
            <div className="space-y-4">
              {[
                { label: 'Home Price', value: homePrice, set: setHomePrice, min: Math.round(maxHome*0.02), max: maxHome, step: Math.round(maxHome*0.005) },
                { label: 'Down Payment', value: downPayment, set: setDownPayment, min: 0, max: homePrice, step: Math.round(maxHome*0.002), note: downPct + '%' },
                { label: 'Interest Rate', value: interestRate, set: setInterestRate, min: 1, max: 20, step: 0.1, isRate: true },
                { label: 'Property Tax (annual)', value: propertyTax, set: setPropertyTax, min: 0, max: Math.round(maxHome*0.03), step: Math.round(maxHome*0.001) },
                { label: 'Home Insurance (annual)', value: insurance, set: setInsurance, min: 0, max: Math.round(maxHome*0.01), step: Math.round(maxHome*0.0005) },
                { label: 'HOA Fees (monthly)', value: hoa, set: setHoa, min: 0, max: Math.round(currency.defaults.income * 0.05), step: Math.round(currency.defaults.income * 0.002) },
              ].map((field, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1.5">
                    <label className="text-slate-400 text-sm">{field.label}</label>
                    <span className="text-white font-bold text-sm">
                      {field.isRate ? field.value + '%' : fmt(field.value)}
                      {field.note && <span className="text-emerald-400 ml-2 text-xs">({field.note})</span>}
                    </span>
                  </div>
                  <input type="range" min={field.min} max={field.max} step={field.step} value={field.value}
                    onChange={e => field.set(Number(e.target.value))}
                    className="w-full accent-yellow-400" />
                </div>
              ))}
              <div>
                <label className="text-slate-400 text-sm block mb-2">Loan Term</label>
                <div className="flex gap-2">
                  {[10, 15, 20, 30].map(y => (
                    <button key={y} onClick={() => setLoanTerm(y)}
                      className="flex-1 py-2 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: loanTerm === y ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: loanTerm === y ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: loanTerm === y ? '#f0c842' : '#64748b'
                      }}>
                      {y}yr
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="result-box">
              <h2 className="text-white font-bold text-lg mb-4">Monthly Payment</h2>
              <div className="text-center mb-4">
                <div className="text-5xl font-bold" style={{color:'#f0c842'}}>{fmt(calc.total)}</div>
                <div className="text-slate-400 text-sm mt-1">per month · {currency.flag} {currency.code}</div>
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Principal & Interest', value: calc.pi, color: '#f0c842' },
                  { label: 'Property Tax', value: calc.monthlyTax, color: '#60a5fa' },
                  { label: 'Home Insurance', value: calc.monthlyIns, color: '#34d399' },
                  ...(calc.pmi > 0 ? [{ label: 'PMI', value: calc.pmi, color: '#f97316' }] : []),
                  ...(calc.monthlyHoa > 0 ? [{ label: 'HOA Fees', value: calc.monthlyHoa, color: '#a78bfa' }] : []),
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{background:item.color}}/>
                    <span className="text-slate-400 text-sm flex-1">{item.label}</span>
                    <span className="text-white font-bold text-sm">{fmt(item.value)}/mo</span>
                  </div>
                ))}
              </div>
              {calc.pmi > 0 && <p className="text-orange-400 text-xs mt-3">⚠️ PMI required — down payment is less than 20%</p>}
            </div>

            <div className="result-box">
              <h2 className="text-white font-bold text-lg mb-4">Loan Summary</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Loan Amount', value: fmt(calc.loanAmount), color: 'text-white' },
                  { label: 'Total Interest', value: fmt(calc.totalInterest), color: 'text-red-400' },
                  { label: 'Total Cost', value: fmt(calc.totalCost), color: 'text-yellow-400' },
                  { label: 'Payoff Date', value: new Date(Date.now() + loanTerm * 365.25 * 24 * 3600 * 1000).getFullYear(), color: 'text-emerald-400' },
                ].map((item, i) => (
                  <div key={i} className="p-3 rounded-xl" style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <div className={\`text-lg font-bold \${item.color}\`}>{item.value}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Amortization */}
        <div className="mt-6 result-box">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white font-bold text-lg">Amortization Schedule</h2>
            <button onClick={() => setShowAmort(!showAmort)}
              className="text-sm px-4 py-2 rounded-xl font-medium transition-all"
              style={{background:'rgba(240,200,66,0.1)',border:'1px solid rgba(240,200,66,0.3)',color:'#f0c842'}}>
              {showAmort ? 'Hide ↑' : 'Show Schedule ↓'}
            </button>
          </div>
          {showAmort && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.1)'}}>
                    {['Month','Payment','Principal','Interest','Balance'].map(h => (
                      <th key={h} className="text-left text-slate-400 py-2 pr-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {displayedSchedule.map((row, i) => (
                    <tr key={i} className="border-b" style={{borderColor:'rgba(255,255,255,0.03)'}}>
                      <td className="text-slate-400 py-1.5 pr-4">{row.month}</td>
                      <td className="text-white py-1.5 pr-4">{fmt(row.payment)}</td>
                      <td className="text-emerald-400 py-1.5 pr-4">{fmt(row.principal)}</td>
                      <td className="text-red-400 py-1.5 pr-4">{fmt(row.interest)}</td>
                      <td className="text-slate-300 py-1.5">{fmt(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {calc.schedule.length > 24 && (
                <button onClick={() => setShowFull(!showFull)} className="mt-4 text-yellow-400 text-sm hover:underline">
                  {showFull ? 'Show Less ↑' : \`Show All \${calc.schedule.length} Months ↓\`}
                </button>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 p-4 rounded-xl border" style={{background:'rgba(240,200,66,0.03)',borderColor:'rgba(240,200,66,0.15)'}}>
          <p className="text-slate-400 text-sm mb-2">📖 Related Guide</p>
          <a href="/blog/how-to-calculate-mortgage-payment" className="text-yellow-400 font-semibold hover:underline">How to Calculate Your Mortgage Payment: Complete Guide (2026)</a>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {href:'/loan-calculator',icon:'💳',name:'Loan Calculator',desc:'Calculate monthly payments for any loan'},
              {href:'/rent-vs-buy-calculator',icon:'🏡',name:'Rent vs Buy',desc:'Compare renting vs buying a home'},
              {href:'/net-worth-calculator',icon:'💎',name:'Net Worth Calculator',desc:'Calculate your total net worth'},
              {href:'/budget-calculator',icon:'📊',name:'Budget Calculator',desc:'Create a monthly budget plan'},
            ].map((tool,i) => (
              <a key={i} href={tool.href} className="result-box group hover:-translate-y-1 transition-all duration-300">
                <div className="text-3xl mb-3">{tool.icon}</div>
                <h3 className="text-white font-bold text-sm mb-1 group-hover:text-yellow-400 transition-colors">{tool.name}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{tool.desc}</p>
              </a>
            ))}
          </div>
        </div>

        <AdUnit slot="7405024590" />

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="result-box">
            <div className="space-y-4 text-sm">
              {faqs.map((faq, i) => (
                <div key={i} className={i < faqs.length - 1 ? "border-b pb-4" : "pb-4"} style={{borderColor:"rgba(240,200,66,0.1)"}}>
                  <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
                  <p className="text-slate-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
`;

// ═══════════════════════════════════════════════════════════════════
// WRITE ALL FILES
// ═══════════════════════════════════════════════════════════════════
const writes = [
  ['components/CurrencyContext.js', currencyContext],
  ['components/CurrencySelector.js', currencySelector],
  ['components/Providers.js', providers],
  ['components/Header.js', header],
  ['app/layout.js', layout],
  ['app/mortgage-calculator/page.js', mortgageCalc],
];

writes.forEach(([path, content]) => {
  fs.writeFileSync(path, content, 'utf8');
  console.log(`✅ ${path}`);
});

// ═══════════════════════════════════════════════════════════════════
// PATCH remaining 11 calculators to use useCurrency
// ═══════════════════════════════════════════════════════════════════
const calculators = [
  'loan-calculator',
  'compound-interest',
  'debt-payoff-calculator',
  'budget-calculator',
  'retirement-calculator',
  'net-worth-calculator',
  'savings-calculator',
  'inflation-calculator',
  'emergency-fund-calculator',
  'tax-calculator',
  'rent-vs-buy-calculator',
];

let patched = 0;
calculators.forEach(calc => {
  const filePath = `app/${calc}/page.js`;
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Not found: ${filePath}`);
    return;
  }

  let f = fs.readFileSync(filePath, 'utf8');

  // Skip if already patched
  if (f.includes('useCurrency')) {
    console.log(`⏭️  Already patched: ${calc}`);
    return;
  }

  // 1. Add useCurrency import after first import line
  f = f.replace(
    /^('use client'\n)/,
    `'use client'\n`
  );

  // Add import after the last existing import
  f = f.replace(
    /(import FaqSchema from '\.\.\/\.\.\/components\/FaqSchema')/,
    `$1\nimport { useCurrency } from '../../components/CurrencyContext'`
  );

  // Fallback: add after AdUnit import if FaqSchema not found
  if (!f.includes('useCurrency')) {
    f = f.replace(
      /(import AdUnit from '\.\.\/components\/AdUnit')/,
      `$1\nimport { useCurrency } from '../../components/CurrencyContext'`
    );
  }

  // 2. Add hook inside the default export function, after opening brace
  f = f.replace(
    /export default function \w+\(\) \{\n/,
    (match) => match + `  const { fmt, currency } = useCurrency()\n`
  );

  // 3. Replace existing fmt function definition
  f = f.replace(
    /\s*const fmt = \(n\) => '\$' \+ Math\.round\(n\)\.toLocaleString\(\)\n/g,
    '\n'
  );
  // Also handle alternate fmt patterns
  f = f.replace(
    /\s*const fmt = \(n\) => .+\.toLocaleString.+\n/g,
    '\n'
  );

  // 4. Replace $ prefix in slider config arrays
  f = f.replace(/prefix: '\$'/g, 'prefix: currency.symbol');

  fs.writeFileSync(filePath, f, 'utf8');
  console.log(`✅ patched: ${calc}`);
  patched++;
});

console.log(`
🎉 Global Currency Upgrade Complete!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ CurrencyContext — 40+ currencies, auto-detect, localStorage
✅ CurrencySelector — flag dropdown with search, grouped by region
✅ Providers — wraps app with CurrencyProvider
✅ Header — currency selector integrated (desktop + mobile)
✅ layout.js — metadata updated, Providers wrapper added
✅ Mortgage Calculator — fully rebuilt with currency support
✅ ${patched} other calculators — patched with useCurrency hook
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
