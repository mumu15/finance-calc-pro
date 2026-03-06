/**
 * FreeFinCalc — FIX: Add CurrencyProvider to app/layout.js
 * Run: node fix_layout.js  (from project root)
 */
const fs = require('fs')

// ─── 1. Write the correct layout.js ───────────────────────────────
fs.writeFileSync('app/layout.js', `import './globals.css'
import { CurrencyProvider } from '../components/CurrencyContext'

export const metadata = {
  metadataBase: new URL('https://www.freefincalc.net'),
  title: { default: 'FreeFinCalc.net — Free Financial Calculators', template: '%s | FreeFinCalc.net' },
  description: 'Free professional financial calculators in 40+ currencies. Loans, debt, investing, salary, tax and more. Instant results. PDF download. No sign up.',
  keywords: ['free financial calculator','mortgage calculator','loan calculator','compound interest','debt payoff','salary calculator','tax calculator'],
  authors: [{ name: 'FreeFinCalc.net' }],
  robots: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  openGraph: { type: 'website', locale: 'en_US', url: 'https://www.freefincalc.net', siteName: 'FreeFinCalc.net' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet" />
      </head>
      <body>
        <CurrencyProvider>
          {children}
        </CurrencyProvider>
      </body>
    </html>
  )
}
`, 'utf8')
console.log('✅ app/layout.js — CurrencyProvider now wraps all pages')

// ─── 2. Safety-check: make sure CurrencyContext exists ────────────
if (!fs.existsSync('components/CurrencyContext.js')) {
  console.log('⚠  components/CurrencyContext.js not found — writing it now...')

  fs.writeFileSync('components/CurrencyContext.js', `'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const CURRENCIES = [
  { code:'USD', symbol:'$', name:'US Dollar' },
  { code:'EUR', symbol:'€', name:'Euro' },
  { code:'GBP', symbol:'£', name:'British Pound' },
  { code:'CAD', symbol:'CA$', name:'Canadian Dollar' },
  { code:'AUD', symbol:'A$', name:'Australian Dollar' },
  { code:'INR', symbol:'₹', name:'Indian Rupee' },
  { code:'AED', symbol:'AED', name:'UAE Dirham' },
  { code:'SGD', symbol:'S$', name:'Singapore Dollar' },
  { code:'CHF', symbol:'CHF', name:'Swiss Franc' },
  { code:'JPY', symbol:'¥', name:'Japanese Yen' },
  { code:'CNY', symbol:'¥', name:'Chinese Yuan' },
  { code:'MXN', symbol:'MX$', name:'Mexican Peso' },
  { code:'BRL', symbol:'R$', name:'Brazilian Real' },
  { code:'ZAR', symbol:'R', name:'South African Rand' },
  { code:'NGN', symbol:'₦', name:'Nigerian Naira' },
  { code:'KES', symbol:'KSh', name:'Kenyan Shilling' },
  { code:'SEK', symbol:'kr', name:'Swedish Krona' },
  { code:'NOK', symbol:'kr', name:'Norwegian Krone' },
  { code:'DKK', symbol:'kr', name:'Danish Krone' },
  { code:'NZD', symbol:'NZ$', name:'New Zealand Dollar' },
]

// Approximate rates vs USD (static fallback)
const RATES = {
  USD:1, EUR:0.92, GBP:0.79, CAD:1.36, AUD:1.53, INR:83.1,
  AED:3.67, SGD:1.34, CHF:0.89, JPY:149.5, CNY:7.24,
  MXN:17.1, BRL:4.97, ZAR:18.6, NGN:1540, KES:129,
  SEK:10.4, NOK:10.6, DKK:6.88, NZD:1.63,
}

// Map of TLD / locale hints → currency code
const TLD_MAP = {
  '.co.uk':'GBP', '.uk':'GBP', '.in':'INR', '.ca':'CAD',
  '.com.au':'AUD', '.au':'AUD', '.ae':'AED', '.sg':'SGD',
  '.ch':'CHF', '.jp':'JPY', '.cn':'CNY', '.mx':'MXN',
  '.br':'BRL', '.za':'ZAR', '.ng':'NGN', '.ke':'KES',
  '.se':'SEK', '.no':'NOK', '.dk':'DKK', '.nz':'NZD',
  '.de':'EUR', '.fr':'EUR', '.es':'EUR', '.it':'EUR',
  '.nl':'EUR', '.be':'EUR', '.at':'EUR', '.pt':'EUR',
}

function detectCurrency() {
  if (typeof window === 'undefined') return 'USD'
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
    if (tz.startsWith('Europe/')) return 'EUR'
    if (tz.startsWith('Asia/Kolkata') || tz.startsWith('Asia/Calcutta')) return 'INR'
    if (tz.startsWith('America/Toronto') || tz.startsWith('America/Vancouver')) return 'CAD'
    if (tz.startsWith('Australia/')) return 'AUD'
    if (tz.startsWith('Asia/Dubai')) return 'AED'
    if (tz.startsWith('Asia/Singapore')) return 'SGD'
    if (tz.startsWith('Asia/Tokyo')) return 'JPY'
    if (tz.startsWith('Asia/Shanghai') || tz.startsWith('Asia/Hong_Kong')) return 'CNY'
    if (tz.startsWith('America/Mexico_City')) return 'MXN'
    if (tz.startsWith('America/Sao_Paulo')) return 'BRL'
    if (tz.startsWith('Africa/Johannesburg')) return 'ZAR'
    if (tz.startsWith('Africa/Lagos')) return 'NGN'
    if (tz.startsWith('Africa/Nairobi')) return 'KES'
    if (tz.startsWith('Europe/Stockholm')) return 'SEK'
    if (tz.startsWith('Europe/Oslo')) return 'NOK'
    if (tz.startsWith('Europe/Copenhagen')) return 'DKK'
    if (tz.startsWith('Pacific/Auckland')) return 'NZD'
    if (tz.startsWith('Europe/London')) return 'GBP'
    if (tz.startsWith('Pacific/') || tz.startsWith('America/')) return 'USD'
    return 'USD'
  } catch { return 'USD' }
}

const CurrencyCtx = createContext(null)

export function CurrencyProvider({ children }) {
  const [code, setCode] = useState('USD')

  useEffect(() => {
    const saved = localStorage.getItem('ffc_currency')
    setCode(saved || detectCurrency())
  }, [])

  function setCurrency(c) {
    setCode(c)
    localStorage.setItem('ffc_currency', c)
  }

  const rate = RATES[code] || 1
  const sym  = CURRENCIES.find(c => c.code === code)?.symbol || '$'

  function fmt(usdValue) {
    if (usdValue === null || usdValue === undefined || isNaN(usdValue)) return '—'
    const v = usdValue * rate
    const absV = Math.abs(v)
    const formatted = absV >= 1_000_000
      ? (v / 1_000_000).toFixed(2) + 'M'
      : absV >= 1_000
      ? v.toLocaleString('en-US', { maximumFractionDigits: 0 })
      : v.toFixed(2)
    return sym + formatted
  }

  return (
    <CurrencyCtx.Provider value={{ code, currency: code, setCurrency, currencies: CURRENCIES, fmt, symbol: sym, rate }}>
      {children}
    </CurrencyCtx.Provider>
  )
}

export function useCurrency() {
  const ctx = useContext(CurrencyCtx)
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider')
  return ctx
}

export default CURRENCIES
`, 'utf8')
  console.log('✅ components/CurrencyContext.js — written')
} else {
  console.log('✅ components/CurrencyContext.js — already exists')
}

console.log(`
════════════════════════════════════════════
  ✅  FIX COMPLETE
════════════════════════════════════════════

  Root cause: CurrencyProvider was missing
  from app/layout.js so every page using
  useCurrency() threw an error.

  Fixed:
  ✓ app/layout.js  — now wraps children
    in <CurrencyProvider>
  ✓ CurrencyContext.js — verified / created

  Deploy:
  git add .
  git commit -m "Fix: add CurrencyProvider to layout.js"
  git push origin master:main
════════════════════════════════════════════
`)
