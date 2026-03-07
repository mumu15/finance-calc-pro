'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const CURRENCIES = [
  { code: 'USD', symbol: '$',  flag: '🇺🇸', name: 'US Dollar',         locale: 'en-US', defaults: { home: 400000, loan: 25000, income: 75000 } },
  { code: 'EUR', symbol: '€',  flag: '🇪🇺', name: 'Euro',               locale: 'de-DE', defaults: { home: 350000, loan: 20000, income: 65000 } },
  { code: 'GBP', symbol: '£',  flag: '🇬🇧', name: 'British Pound',      locale: 'en-GB', defaults: { home: 300000, loan: 20000, income: 55000 } },
  { code: 'CAD', symbol: 'C$', flag: '🇨🇦', name: 'Canadian Dollar',    locale: 'en-CA', defaults: { home: 650000, loan: 30000, income: 80000 } },
  { code: 'AUD', symbol: 'A$', flag: '🇦🇺', name: 'Australian Dollar',  locale: 'en-AU', defaults: { home: 750000, loan: 35000, income: 85000 } },
  { code: 'INR', symbol: '₹',  flag: '🇮🇳', name: 'Indian Rupee',       locale: 'en-IN', defaults: { home: 8000000, loan: 500000, income: 1200000 } },
  { code: 'AED', symbol: 'AED',flag: '🇦🇪', name: 'UAE Dirham',         locale: 'ar-AE', defaults: { home: 1500000, loan: 100000, income: 180000 } },
  { code: 'SAR', symbol: 'SAR',flag: '🇸🇦', name: 'Saudi Riyal',        locale: 'ar-SA', defaults: { home: 1200000, loan: 80000, income: 150000 } },
  { code: 'PKR', symbol: 'Rs', flag: '🇵🇰', name: 'Pakistani Rupee',    locale: 'en-PK', defaults: { home: 15000000, loan: 1000000, income: 1500000 } },
  { code: 'NGN', symbol: 'N',  flag: '🇳🇬', name: 'Nigerian Naira',     locale: 'en-NG', defaults: { home: 50000000, loan: 5000000, income: 8000000 } },
  { code: 'BRL', symbol: 'R$', flag: '🇧🇷', name: 'Brazilian Real',     locale: 'pt-BR', defaults: { home: 500000, loan: 50000, income: 80000 } },
  { code: 'MXN', symbol: 'MX$',flag: '🇲🇽', name: 'Mexican Peso',       locale: 'es-MX', defaults: { home: 3000000, loan: 200000, income: 350000 } },
  { code: 'ZAR', symbol: 'R',  flag: '🇿🇦', name: 'South African Rand', locale: 'en-ZA', defaults: { home: 2000000, loan: 150000, income: 350000 } },
  { code: 'SGD', symbol: 'S$', flag: '🇸🇬', name: 'Singapore Dollar',   locale: 'en-SG', defaults: { home: 1200000, loan: 80000, income: 120000 } },
  { code: 'MYR', symbol: 'RM', flag: '🇲🇾', name: 'Malaysian Ringgit',  locale: 'ms-MY', defaults: { home: 600000, loan: 50000, income: 72000 } },
  { code: 'JPY', symbol: 'JPY',flag: '🇯🇵', name: 'Japanese Yen',       locale: 'ja-JP', defaults: { home: 50000000, loan: 3000000, income: 5000000 } },
  { code: 'CNY', symbol: 'CNY',flag: '🇨🇳', name: 'Chinese Yuan',       locale: 'zh-CN', defaults: { home: 3000000, loan: 200000, income: 200000 } },
  { code: 'CHF', symbol: 'Fr', flag: '🇨🇭', name: 'Swiss Franc',        locale: 'de-CH', defaults: { home: 900000, loan: 50000, income: 120000 } },
  { code: 'SEK', symbol: 'kr', flag: '🇸🇪', name: 'Swedish Krona',      locale: 'sv-SE', defaults: { home: 4000000, loan: 200000, income: 550000 } },
  { code: 'NZD', symbol: 'NZ$',flag: '🇳🇿', name: 'New Zealand Dollar', locale: 'en-NZ', defaults: { home: 750000, loan: 40000, income: 75000 } },
]

const COUNTRY_TO_CURRENCY = {
  US:'USD', CA:'CAD', AU:'AUD', NZ:'NZD',
  GB:'GBP', IE:'EUR', DE:'EUR', FR:'EUR', IT:'EUR', ES:'EUR',
  NL:'EUR', BE:'EUR', AT:'EUR', PT:'EUR', FI:'EUR', GR:'EUR',
  IN:'INR', PK:'PKR', AE:'AED', SA:'SAR', NG:'NGN',
  BR:'BRL', MX:'MXN', ZA:'ZAR', SG:'SGD', MY:'MYR',
  JP:'JPY', CN:'CNY', CH:'CHF', SE:'SEK', NO:'SEK', DK:'SEK',
}

const DEFAULT = CURRENCIES[0]
const CurrencyContext = createContext({ currency: DEFAULT, setCurrency: () => {}, currencies: CURRENCIES })

export function CurrencyProvider({ children }) {
  const [currency, setCurrencyState] = useState(DEFAULT)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ffc_currency')
      if (saved) {
        const found = CURRENCIES.find(c => c.code === saved)
        if (found) { setCurrencyState(found); return }
      }
    } catch(e) {}

    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(data => {
        const code = COUNTRY_TO_CURRENCY[data.country_code]
        if (code) {
          const found = CURRENCIES.find(c => c.code === code)
          if (found) setCurrencyState(found)
        }
      })
      .catch(() => {
        const lang = navigator.language || 'en-US'
        if (lang.startsWith('en-GB')) setCurrencyState(CURRENCIES.find(c => c.code === 'GBP'))
        else if (lang.startsWith('en-AU')) setCurrencyState(CURRENCIES.find(c => c.code === 'AUD'))
        else if (lang.startsWith('en-IN')) setCurrencyState(CURRENCIES.find(c => c.code === 'INR'))
        else if (/^(de|fr|it|es|nl|pt)/.test(lang)) setCurrencyState(CURRENCIES.find(c => c.code === 'EUR'))
      })
  }, [])

  const setCurrency = (curr) => {
    setCurrencyState(curr)
    try { localStorage.setItem('ffc_currency', curr.code) } catch(e) {}
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, currencies: CURRENCIES }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  return useContext(CurrencyContext)
}

export default CurrencyContext
