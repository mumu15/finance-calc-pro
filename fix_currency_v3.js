/**
 * FreeFinCalc.net — CurrencyContext FINAL
 * 
 * Error: Cannot read properties of undefined (reading 'home')
 * at mortgage-calculator/page.js
 * 
 * Cause: Mortgage calc does: const { currency } = useCurrency()
 *        Then uses: currency.defaults.home
 *        But new context had currency = "USD" (string), not full object
 * 
 * Fix: currency = full object { code, symbol, defaults, ... }
 *      fmt and symbol still exposed at top level for other calculators
 * 
 * node fix_currency_v3.js
 */

const fs = require('fs')

const code = `'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const CURRENCY_DATA = {
  USD: { code: 'USD', symbol: '$',    locale: 'en-US', flag: '🇺🇸', name: 'US Dollar',         defaults: { home: 400000,    loan: 25000,   income: 75000   } },
  EUR: { code: 'EUR', symbol: '€',    locale: 'de-DE', flag: '🇪🇺', name: 'Euro',               defaults: { home: 350000,    loan: 20000,   income: 65000   } },
  GBP: { code: 'GBP', symbol: '£',    locale: 'en-GB', flag: '🇬🇧', name: 'British Pound',      defaults: { home: 300000,    loan: 20000,   income: 55000   } },
  CAD: { code: 'CAD', symbol: 'CA$',  locale: 'en-CA', flag: '🇨🇦', name: 'Canadian Dollar',    defaults: { home: 650000,    loan: 30000,   income: 80000   } },
  AUD: { code: 'AUD', symbol: 'A$',   locale: 'en-AU', flag: '🇦🇺', name: 'Australian Dollar',  defaults: { home: 750000,    loan: 35000,   income: 85000   } },
  INR: { code: 'INR', symbol: '₹',    locale: 'en-IN', flag: '🇮🇳', name: 'Indian Rupee',       defaults: { home: 8000000,   loan: 500000,  income: 1200000 } },
  AED: { code: 'AED', symbol: 'د.إ',  locale: 'ar-AE', flag: '🇦🇪', name: 'UAE Dirham',         defaults: { home: 1500000,   loan: 100000,  income: 180000  } },
  SAR: { code: 'SAR', symbol: '﷼',    locale: 'ar-SA', flag: '🇸🇦', name: 'Saudi Riyal',        defaults: { home: 1200000,   loan: 80000,   income: 150000  } },
  PKR: { code: 'PKR', symbol: '₨',    locale: 'ur-PK', flag: '🇵🇰', name: 'Pakistani Rupee',    defaults: { home: 15000000,  loan: 1000000, income: 1500000 } },
  NGN: { code: 'NGN', symbol: '₦',    locale: 'en-NG', flag: '🇳🇬', name: 'Nigerian Naira',     defaults: { home: 50000000,  loan: 5000000, income: 8000000 } },
  BRL: { code: 'BRL', symbol: 'R$',   locale: 'pt-BR', flag: '🇧🇷', name: 'Brazilian Real',     defaults: { home: 500000,    loan: 50000,   income: 80000   } },
  MXN: { code: 'MXN', symbol: 'MX$',  locale: 'es-MX', flag: '🇲🇽', name: 'Mexican Peso',       defaults: { home: 3000000,   loan: 200000,  income: 350000  } },
  ZAR: { code: 'ZAR', symbol: 'R',    locale: 'en-ZA', flag: '🇿🇦', name: 'South African Rand', defaults: { home: 2000000,   loan: 150000,  income: 350000  } },
  SGD: { code: 'SGD', symbol: 'S$',   locale: 'en-SG', flag: '🇸🇬', name: 'Singapore Dollar',   defaults: { home: 1200000,   loan: 80000,   income: 120000  } },
  MYR: { code: 'MYR', symbol: 'RM',   locale: 'ms-MY', flag: '🇲🇾', name: 'Malaysian Ringgit',  defaults: { home: 600000,    loan: 50000,   income: 72000   } },
  JPY: { code: 'JPY', symbol: '¥',    locale: 'ja-JP', flag: '🇯🇵', name: 'Japanese Yen',       defaults: { home: 50000000,  loan: 3000000, income: 5000000 } },
  CNY: { code: 'CNY', symbol: 'CN¥',  locale: 'zh-CN', flag: '🇨🇳', name: 'Chinese Yuan',       defaults: { home: 3000000,   loan: 200000,  income: 200000  } },
  CHF: { code: 'CHF', symbol: 'Fr',   locale: 'de-CH', flag: '🇨🇭', name: 'Swiss Franc',        defaults: { home: 900000,    loan: 50000,   income: 120000  } },
  SEK: { code: 'SEK', symbol: 'kr',   locale: 'sv-SE', flag: '🇸🇪', name: 'Swedish Krona',      defaults: { home: 4000000,   loan: 200000,  income: 550000  } },
  NZD: { code: 'NZD', symbol: 'NZ$',  locale: 'en-NZ', flag: '🇳🇿', name: 'New Zealand Dollar', defaults: { home: 750000,    loan: 40000,   income: 75000   } },
}

const COUNTRY_TO_CURRENCY = {
  US:'USD', CA:'CAD', AU:'AUD', NZ:'NZD',
  GB:'GBP', IE:'EUR', DE:'EUR', FR:'EUR', IT:'EUR', ES:'EUR',
  NL:'EUR', BE:'EUR', AT:'EUR', PT:'EUR', FI:'EUR', GR:'EUR',
  IN:'INR', PK:'PKR', AE:'AED', SA:'SAR', NG:'NGN',
  BR:'BRL', MX:'MXN', ZA:'ZAR', SG:'SGD', MY:'MYR',
  JP:'JPY', CN:'CNY', CH:'CHF', SE:'SEK', NO:'SEK', DK:'SEK',
}

export const CURRENCIES = Object.values(CURRENCY_DATA)

function makeFmt(cur) {
  return function fmt(amount) {
    if (amount === undefined || amount === null || isNaN(amount)) return cur.symbol + '0'
    try {
      return new Intl.NumberFormat(cur.locale, {
        style: 'currency',
        currency: cur.code,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(Number(amount))
    } catch {
      return cur.symbol + Math.round(Number(amount)).toLocaleString()
    }
  }
}

// Build the context value object
// currency = FULL OBJECT (so currency.defaults.home works in mortgage calc etc)
// symbol, fmt also exposed at top level for convenience
function makeValue(curCode, setCurrencyFn) {
  const cur = CURRENCY_DATA[curCode] || CURRENCY_DATA['USD']
  return {
    currency: cur,                        // full object: { code, symbol, locale, flag, name, defaults }
    symbol: cur.symbol,                   // shortcut: "$"
    fmt: makeFmt(cur),                    // always a function, never undefined
    currencies: CURRENCIES,               // array for currency picker
    setCurrency: setCurrencyFn || (() => {}),
  }
}

// SSR-safe default — every field populated, fmt is a real function
const USD = CURRENCY_DATA['USD']
const DEFAULT_VALUE = makeValue('USD', () => {})

const CurrencyContext = createContext(DEFAULT_VALUE)

export function CurrencyProvider({ children }) {
  const [curCode, setCurCode] = useState('USD')

  useEffect(() => {
    // 1. Restore saved user preference
    try {
      const saved = localStorage.getItem('ffc_currency')
      if (saved && CURRENCY_DATA[saved]) { setCurCode(saved); return }
    } catch(e) {}

    // 2. IP geolocation detection
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(data => {
        const detected = COUNTRY_TO_CURRENCY[data.country_code]
        if (detected && CURRENCY_DATA[detected]) setCurCode(detected)
      })
      .catch(() => {
        // 3. Fallback: browser language
        try {
          const lang = navigator.language || 'en-US'
          if (lang.startsWith('en-GB'))       setCurCode('GBP')
          else if (lang.startsWith('en-AU'))  setCurCode('AUD')
          else if (lang.startsWith('en-IN'))  setCurCode('INR')
          else if (/^(de|fr|it|es|nl|pt)/.test(lang)) setCurCode('EUR')
        } catch(e) {}
      })
  }, [])

  const setCurrency = (input) => {
    // Accept both string ("USD") and object ({ code: "USD", ... })
    const newCode = typeof input === 'object' ? input.code : input
    if (!CURRENCY_DATA[newCode]) return
    setCurCode(newCode)
    try { localStorage.setItem('ffc_currency', newCode) } catch(e) {}
  }

  return (
    <CurrencyContext.Provider value={makeValue(curCode, setCurrency)}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  return useContext(CurrencyContext)
}

export default CurrencyContext
`

fs.writeFileSync('components/CurrencyContext.js', code, 'utf8')
console.log('✅ components/CurrencyContext.js — FINAL FIX')
console.log('')
console.log('currency is now the FULL OBJECT:')
console.log('  currency.defaults.home  → 400000')
console.log('  currency.symbol         → "$"')
console.log('  currency.code           → "USD"')
console.log('  currency.defaults.loan  → 25000')
console.log('  symbol                  → "$"  (top-level shortcut)')
console.log('  fmt(amount)             → always a function')
console.log('  setCurrency("EUR")      → works')
console.log('  setCurrency({code:"EUR"}) → works')
