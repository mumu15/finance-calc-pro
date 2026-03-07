/**
 * FreeFinCalc.net — Final CurrencyContext fix
 * Merges geolocation (ipapi.co) with correct API shape (fmt, symbol)
 *
 * Root cause of "TypeError: e is not a function":
 *   fix_currency_geo2.js removed `fmt` and `symbol` from context.
 *   All 124 calculators call `fmt(amount)` → undefined() → crash.
 *
 * Run: node fix_currency_final.js
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

function makeFmt(code) {
  const cur = CURRENCY_DATA[code] || CURRENCY_DATA['USD']
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

function makeValue(code) {
  const cur = CURRENCY_DATA[code] || CURRENCY_DATA['USD']
  return {
    currency: code,
    symbol: cur.symbol,
    fmt: makeFmt(code),
    currencyData: cur,
    currencies: CURRENCIES,
    setCurrency: () => {},
  }
}

// Safe SSR default — never undefined, fmt is always a function
const DEFAULT_VALUE = makeValue('USD')

const CurrencyContext = createContext(DEFAULT_VALUE)

export function CurrencyProvider({ children }) {
  const [code, setCode] = useState('USD')

  useEffect(() => {
    // 1. Check localStorage first (user preference)
    try {
      const saved = localStorage.getItem('ffc_currency')
      if (saved && CURRENCY_DATA[saved]) {
        setCode(saved)
        return
      }
    } catch(e) {}

    // 2. Detect via IP geolocation
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(data => {
        const detected = COUNTRY_TO_CURRENCY[data.country_code]
        if (detected && CURRENCY_DATA[detected]) setCode(detected)
      })
      .catch(() => {
        // 3. Fallback: browser language
        try {
          const lang = navigator.language || 'en-US'
          if (lang.startsWith('en-GB')) setCode('GBP')
          else if (lang.startsWith('en-AU')) setCode('AUD')
          else if (lang.startsWith('en-IN')) setCode('INR')
          else if (/^(de|fr|it|es|nl|pt)/.test(lang)) setCode('EUR')
        } catch(e) {}
      })
  }, [])

  const setCurrency = (newCode) => {
    if (!CURRENCY_DATA[newCode]) return
    setCode(newCode)
    try { localStorage.setItem('ffc_currency', newCode) } catch(e) {}
  }

  const value = {
    ...makeValue(code),
    setCurrency,
  }

  return (
    <CurrencyContext.Provider value={value}>
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
console.log('✅ components/CurrencyContext.js fixed')
console.log('')
console.log('What was wrong:')
console.log('  fix_currency_geo2.js removed fmt() and symbol from context.')
console.log('  All 124 calculators call fmt(amount) — undefined() → crash.')
console.log('  Minifier renamed it to e() → "TypeError: e is not a function"')
console.log('')
console.log('What is fixed:')
console.log('  ✓ fmt() always present and always a function (SSR-safe default)')
console.log('  ✓ symbol always present')
console.log('  ✓ Geolocation via ipapi.co (inside useEffect, never at render time)')
console.log('  ✓ localStorage preference saved/restored')
console.log('  ✓ Language fallback if geo fails')
console.log('  ✓ currencies array exported for currency picker UI')
console.log('')
console.log('Next step:')
console.log('  git add components/CurrencyContext.js')
console.log('  git commit -m "fix: restore fmt/symbol to CurrencyContext, add geolocation"')
console.log('  vercel --prod')
