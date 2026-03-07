/**
 * FreeFinCalc.net — Fix CurrencyContext full object
 * node fix_currency_object.js
 *
 * Problem: mortgage-calculator uses:
 *   currency.defaults.home
 *   currency.defaults.loan
 *   currency.defaults.income
 *   currency.flag
 *   currency.name
 *   currency.code
 *
 * But new CurrencyContext returns currency as plain string 'USD'
 * Fix: restore currency as full object with all properties
 */

const fs = require('fs')

const fixed = `'use client'
import { createContext, useContext, useState } from 'react'

const CURRENCIES = {
  USD: { code: 'USD', symbol: '$',    flag: '🇺🇸', name: 'US Dollar',           locale: 'en-US', defaults: { home: 350000,  loan: 25000,  income: 6000  } },
  EUR: { code: 'EUR', symbol: '€',    flag: '🇪🇺', name: 'Euro',                 locale: 'de-DE', defaults: { home: 320000,  loan: 20000,  income: 5000  } },
  GBP: { code: 'GBP', symbol: '£',    flag: '🇬🇧', name: 'British Pound',        locale: 'en-GB', defaults: { home: 280000,  loan: 18000,  income: 4500  } },
  INR: { code: 'INR', symbol: '₹',    flag: '🇮🇳', name: 'Indian Rupee',         locale: 'en-IN', defaults: { home: 8000000, loan: 500000, income: 80000 } },
  PKR: { code: 'PKR', symbol: '₨',    flag: '🇵🇰', name: 'Pakistani Rupee',      locale: 'ur-PK', defaults: { home: 5000000, loan: 300000, income: 60000 } },
  AED: { code: 'AED', symbol: 'د.إ',  flag: '🇦🇪', name: 'UAE Dirham',           locale: 'ar-AE', defaults: { home: 1200000, loan: 80000,  income: 20000 } },
  SAR: { code: 'SAR', symbol: '﷼',    flag: '🇸🇦', name: 'Saudi Riyal',          locale: 'ar-SA', defaults: { home: 1000000, loan: 70000,  income: 18000 } },
  CAD: { code: 'CAD', symbol: 'CA$',  flag: '🇨🇦', name: 'Canadian Dollar',      locale: 'en-CA', defaults: { home: 500000,  loan: 30000,  income: 7000  } },
  AUD: { code: 'AUD', symbol: 'A$',   flag: '🇦🇺', name: 'Australian Dollar',    locale: 'en-AU', defaults: { home: 600000,  loan: 35000,  income: 8000  } },
  SGD: { code: 'SGD', symbol: 'S$',   flag: '🇸🇬', name: 'Singapore Dollar',     locale: 'en-SG', defaults: { home: 500000,  loan: 30000,  income: 8000  } },
  MYR: { code: 'MYR', symbol: 'RM',   flag: '🇲🇾', name: 'Malaysian Ringgit',    locale: 'ms-MY', defaults: { home: 400000,  loan: 25000,  income: 6000  } },
  NGN: { code: 'NGN', symbol: '₦',    flag: '🇳🇬', name: 'Nigerian Naira',       locale: 'en-NG', defaults: { home: 30000000,loan: 2000000,income: 400000} },
  ZAR: { code: 'ZAR', symbol: 'R',    flag: '🇿🇦', name: 'South African Rand',   locale: 'en-ZA', defaults: { home: 1500000, loan: 100000, income: 25000 } },
  JPY: { code: 'JPY', symbol: '¥',    flag: '🇯🇵', name: 'Japanese Yen',         locale: 'ja-JP', defaults: { home: 40000000,loan: 3000000,income: 500000} },
  CNY: { code: 'CNY', symbol: 'CN¥',  flag: '🇨🇳', name: 'Chinese Yuan',         locale: 'zh-CN', defaults: { home: 2000000, loan: 150000, income: 30000 } },
  BRL: { code: 'BRL', symbol: 'R$',   flag: '🇧🇷', name: 'Brazilian Real',       locale: 'pt-BR', defaults: { home: 400000,  loan: 30000,  income: 6000  } },
  CHF: { code: 'CHF', symbol: 'Fr',   flag: '🇨🇭', name: 'Swiss Franc',          locale: 'de-CH', defaults: { home: 700000,  loan: 40000,  income: 10000 } },
  NZD: { code: 'NZD', symbol: 'NZ$',  flag: '🇳🇿', name: 'New Zealand Dollar',   locale: 'en-NZ', defaults: { home: 650000,  loan: 40000,  income: 8000  } },
  MXN: { code: 'MXN', symbol: 'MX$',  flag: '🇲🇽', name: 'Mexican Peso',         locale: 'es-MX', defaults: { home: 2000000, loan: 150000, income: 25000 } },
  SEK: { code: 'SEK', symbol: 'kr',   flag: '🇸🇪', name: 'Swedish Krona',        locale: 'sv-SE', defaults: { home: 3000000, loan: 200000, income: 45000 } },
}

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

// Safe default value used during static prerender (no Provider)
const DEFAULT_CUR = CURRENCIES['USD']
const DEFAULT_VALUE = {
  currency:    DEFAULT_CUR,
  setCurrency: () => {},
  symbol:      DEFAULT_CUR.symbol,
  fmt:         makeFmt(DEFAULT_CUR),
}

const CurrencyContext = createContext(DEFAULT_VALUE)

export function CurrencyProvider({ children }) {
  const [code, setCode] = useState('USD')

  const cur = CURRENCIES[code] || CURRENCIES['USD']

  const value = {
    currency:    cur,           // full object: { code, symbol, flag, name, locale, defaults }
    setCurrency: setCode,       // accepts currency code string e.g. 'EUR'
    symbol:      cur.symbol,
    fmt:         makeFmt(cur),
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

// Export full list for Header currency picker
export { CURRENCIES }
`

fs.writeFileSync('components/CurrencyContext.js', fixed, 'utf8')
console.log('✅ CurrencyContext.js fixed')

// Also fix Header to use setCurrency(cur.code) correctly
// since setCurrency now expects a code string, not an object
const headerPath = 'components/Header.js'
let header = fs.readFileSync(headerPath, 'utf8')

// Header calls setCurrency(cur.code) which is already correct
// But it reads currency.code for the active check — need to fix that too
// Currently: currency === cur.code  (but currency is now an object)
// Fix: currency.code === cur.code

if (header.includes('currency === cur.code')) {
  header = header.replaceAll('currency === cur.code', 'currency.code === cur.code')
  console.log('✅ Header currency comparison fixed')
}

// Fix the button display — currently shows activeCur.symbol and activeCur.code
// activeCur is found by: CURRENCIES.find(c => c.code === currency)
// currency is now an object so we need currency.code
if (header.includes('CURRENCIES.find(c => c.code === currency)')) {
  header = header.replace(
    'CURRENCIES.find(c => c.code === currency)',
    'CURRENCIES.find(c => c.code === currency.code)'
  )
  console.log('✅ Header activeCur lookup fixed')
}

// Fix: const { currency, setCurrency, symbol } = useCurrency()
// setCurrency in header is called as setCurrency(cur.code) — that's correct
// but currency comparison needs .code

fs.writeFileSync(headerPath, header, 'utf8')

console.log(`
════════════════════════════════════════════════════
  CURRENCY CONTEXT FULLY FIXED
════════════════════════════════════════════════════
  currency is now a FULL OBJECT:
  {
    code:     'USD',
    symbol:   '$',
    flag:     '🇺🇸',
    name:     'US Dollar',
    locale:   'en-US',
    defaults: {
      home:   350000,   // home price default
      loan:   25000,    // loan default
      income: 6000,     // monthly income default
    }
  }

  All 20 currencies have correct regional defaults.

  mortgage-calculator can now safely use:
    currency.defaults.home   ✅
    currency.defaults.loan   ✅
    currency.defaults.income ✅
    currency.flag            ✅
    currency.name            ✅
    currency.code            ✅

  Static prerender safe — DEFAULT_VALUE is USD object.
════════════════════════════════════════════════════
`)
