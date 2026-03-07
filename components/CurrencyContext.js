'use client'
import { createContext, useContext, useState } from 'react'

const CURRENCY_DATA = {
  USD: { code: 'USD', symbol: '$',   locale: 'en-US' },
  EUR: { code: 'EUR', symbol: '€',   locale: 'de-DE' },
  GBP: { code: 'GBP', symbol: '£',   locale: 'en-GB' },
  INR: { code: 'INR', symbol: '₹',   locale: 'en-IN' },
  PKR: { code: 'PKR', symbol: '₨',   locale: 'ur-PK' },
  AED: { code: 'AED', symbol: 'د.إ', locale: 'ar-AE' },
  SAR: { code: 'SAR', symbol: '﷼',   locale: 'ar-SA' },
  CAD: { code: 'CAD', symbol: 'CA$', locale: 'en-CA' },
  AUD: { code: 'AUD', symbol: 'A$',  locale: 'en-AU' },
  SGD: { code: 'SGD', symbol: 'S$',  locale: 'en-SG' },
  MYR: { code: 'MYR', symbol: 'RM',  locale: 'ms-MY' },
  NGN: { code: 'NGN', symbol: '₦',   locale: 'en-NG' },
  ZAR: { code: 'ZAR', symbol: 'R',   locale: 'en-ZA' },
  JPY: { code: 'JPY', symbol: '¥',   locale: 'ja-JP' },
  CNY: { code: 'CNY', symbol: 'CN¥', locale: 'zh-CN' },
  BRL: { code: 'BRL', symbol: 'R$',  locale: 'pt-BR' },
  CHF: { code: 'CHF', symbol: 'Fr',  locale: 'de-CH' },
  NZD: { code: 'NZD', symbol: 'NZ$', locale: 'en-NZ' },
  MXN: { code: 'MXN', symbol: 'MX$', locale: 'es-MX' },
  SEK: { code: 'SEK', symbol: 'kr',  locale: 'sv-SE' },
}

function makeFmt(code) {
  const cur = CURRENCY_DATA[code] || CURRENCY_DATA['USD']
  return function fmt(amount) {
    if (amount === undefined || amount === null || isNaN(amount)) {
      return cur.symbol + '0'
    }
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

// Safe defaults used during static prerender (no Provider)
const DEFAULT_VALUE = {
  currency: 'USD',
  setCurrency: () => {},
  symbol: '$',
  fmt: makeFmt('USD'),
}

const CurrencyContext = createContext(DEFAULT_VALUE)

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('USD')
  const cur = CURRENCY_DATA[currency] || CURRENCY_DATA['USD']

  const value = {
    currency,
    setCurrency,
    symbol: cur.symbol,
    fmt: makeFmt(currency),
  }

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  // Returns DEFAULT_VALUE during static prerender (no Provider)
  // Returns live context value in browser
  return useContext(CurrencyContext)
}
