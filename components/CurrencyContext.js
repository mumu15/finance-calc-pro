'use client'
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
