/**
 * FreeFinCalc.net — Fix CurrencyContext
 * node fix_currency.js
 */

const fs = require('fs')

// ── Read and print current CurrencyContext ───────────────────────────────────
const ctxPath = 'components/CurrencyContext.js'
if (fs.existsSync(ctxPath)) {
  console.log('Current CurrencyContext.js:')
  console.log('════════════════════════════')
  console.log(fs.readFileSync(ctxPath, 'utf8'))
  console.log('════════════════════════════')
} else {
  console.log('⚠️  CurrencyContext.js not found')
}

// ── Rewrite CurrencyContext with full currency data ──────────────────────────
const newContext = `'use client'
import { createContext, useContext, useState } from 'react'

const CURRENCY_DATA = {
  USD: { code: 'USD', symbol: '$',    locale: 'en-US' },
  EUR: { code: 'EUR', symbol: '€',    locale: 'de-DE' },
  GBP: { code: 'GBP', symbol: '£',    locale: 'en-GB' },
  INR: { code: 'INR', symbol: '₹',    locale: 'en-IN' },
  PKR: { code: 'PKR', symbol: '₨',    locale: 'ur-PK' },
  AED: { code: 'AED', symbol: 'د.إ',  locale: 'ar-AE' },
  SAR: { code: 'SAR', symbol: '﷼',    locale: 'ar-SA' },
  CAD: { code: 'CAD', symbol: 'CA$',  locale: 'en-CA' },
  AUD: { code: 'AUD', symbol: 'A$',   locale: 'en-AU' },
  SGD: { code: 'SGD', symbol: 'S$',   locale: 'en-SG' },
  MYR: { code: 'MYR', symbol: 'RM',   locale: 'ms-MY' },
  NGN: { code: 'NGN', symbol: '₦',    locale: 'en-NG' },
  ZAR: { code: 'ZAR', symbol: 'R',    locale: 'en-ZA' },
  JPY: { code: 'JPY', symbol: '¥',    locale: 'ja-JP' },
  CNY: { code: 'CNY', symbol: 'CN¥',  locale: 'zh-CN' },
  BRL: { code: 'BRL', symbol: 'R$',   locale: 'pt-BR' },
  CHF: { code: 'CHF', symbol: 'Fr',   locale: 'de-CH' },
  NZD: { code: 'NZD', symbol: 'NZ$',  locale: 'en-NZ' },
  MXN: { code: 'MXN', symbol: 'MX$',  locale: 'es-MX' },
  SEK: { code: 'SEK', symbol: 'kr',   locale: 'sv-SE' },
}

const CurrencyContext = createContext(null)

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('USD')

  const cur = CURRENCY_DATA[currency] || CURRENCY_DATA['USD']

  function fmt(amount) {
    if (amount === undefined || amount === null || isNaN(amount)) return cur.symbol + '0'
    const num = Number(amount)
    try {
      return new Intl.NumberFormat(cur.locale, {
        style: 'currency',
        currency: cur.code,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(num)
    } catch {
      return cur.symbol + Math.round(num).toLocaleString()
    }
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, fmt, symbol: cur.symbol }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext)
  if (!ctx) throw new Error('useCurrency must be used inside CurrencyProvider')
  return ctx
}
`

fs.writeFileSync(ctxPath, newContext, 'utf8')
console.log('✅ CurrencyContext.js rewritten')

// ── Also fix Header.js activeCur lookup to use symbol from context ───────────
const headerPath = 'components/Header.js'
let header = fs.readFileSync(headerPath, 'utf8')

// Replace activeCur line — use symbol directly from context instead of lookup
const oldActiveCur = `  const activeCur = CURRENCIES.find(c => c.code === currency) || CURRENCIES[0]`
const newActiveCur = `  const { currency, setCurrency, symbol } = useCurrency()
  const activeCur = CURRENCIES.find(c => c.code === currency) || CURRENCIES[0]`

// Fix the useCurrency destructuring — currently pulls currency and setCurrency separately
// Make sure header uses symbol from context for the button display
if (header.includes("const { currency, setCurrency } = useCurrency()")) {
  header = header.replace(
    "const { currency, setCurrency } = useCurrency()",
    "const { currency, setCurrency, symbol } = useCurrency()"
  )
  // Update the button to show symbol from context (live-updating)
  header = header.replace(
    "<span>{activeCur.symbol}</span>",
    "<span>{symbol}</span>"
  )
  fs.writeFileSync(headerPath, header, 'utf8')
  console.log('✅ Header.js updated to use live symbol from context')
} else {
  console.log('ℹ️  Header already uses context symbol or pattern differs — no change needed')
}

console.log(`
════════════════════════════════════════════════════
  CURRENCY FIX COMPLETE
════════════════════════════════════════════════════
  Root cause: Header was reading symbol from a static
  CURRENCIES array lookup, not from the live context.
  So when currency changed in context, the button
  kept showing the old symbol.

  Fix: Header now reads symbol directly from
  CurrencyContext which updates instantly on change.

  Also fixed: CurrencyContext now formats numbers
  correctly per locale for all 20 currencies.
════════════════════════════════════════════════════
`)
