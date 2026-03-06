'use client'
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
        <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : '"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-72 rounded-xl border shadow-2xl overflow-hidden z-50"
          style={{ background: 'rgba(10,15,30,0.99)', borderColor: 'rgba(240,200,66,0.2)', backdropFilter: 'blur(20px)' }}>

          {/* Search */}
          <div className="p-2 border-b" style={{ borderColor: "rgba(240,200,66,0.1)' }}>
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

          <div className="px-3 py-2 border-t text-xs text-slate-600" style={{ borderColor: "rgba(240,200,66,0.1)' }}>
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
      <span className="font-bold text-xs w-8" style={{ color: active ? "#f0c842' : '#64748b' }}>{c.code}</span>
      <span className={active ? 'text-white' : 'text-slate-400'}>{c.name}</span>
      {active && <span className="ml-auto text-xs" style={{ color: "#f0c842' }}>✓</span>}
    </button>
  )
}
