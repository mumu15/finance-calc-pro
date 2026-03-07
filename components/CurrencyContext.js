'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const CURRENCY_DATA = {
  USD: { code: 'USD', symbol: '$',    locale: 'en-US', flag: '🇺🇸', name: 'US Dollar',         region: 'Americas',              defaults: { home: 400000,    loan: 25000,   income: 75000   } },
  CAD: { code: 'CAD', symbol: 'CA$',  locale: 'en-CA', flag: '🇨🇦', name: 'Canadian Dollar',    region: 'Americas',              defaults: { home: 650000,    loan: 30000,   income: 80000   } },
  BRL: { code: 'BRL', symbol: 'R$',   locale: 'pt-BR', flag: '🇧🇷', name: 'Brazilian Real',     region: 'Americas',              defaults: { home: 500000,    loan: 50000,   income: 80000   } },
  MXN: { code: 'MXN', symbol: 'MX$',  locale: 'es-MX', flag: '🇲🇽', name: 'Mexican Peso',       region: 'Americas',              defaults: { home: 3000000,   loan: 200000,  income: 350000  } },
  EUR: { code: 'EUR', symbol: '€',    locale: 'de-DE', flag: '🇪🇺', name: 'Euro',               region: 'Europe',                defaults: { home: 350000,    loan: 20000,   income: 65000   } },
  GBP: { code: 'GBP', symbol: '£',    locale: 'en-GB', flag: '🇬🇧', name: 'British Pound',      region: 'Europe',                defaults: { home: 300000,    loan: 20000,   income: 55000   } },
  CHF: { code: 'CHF', symbol: 'Fr',   locale: 'de-CH', flag: '🇨🇭', name: 'Swiss Franc',        region: 'Europe',                defaults: { home: 900000,    loan: 50000,   income: 120000  } },
  SEK: { code: 'SEK', symbol: 'kr',   locale: 'sv-SE', flag: '🇸🇪', name: 'Swedish Krona',      region: 'Europe',                defaults: { home: 4000000,   loan: 200000,  income: 550000  } },
  AUD: { code: 'AUD', symbol: 'A$',   locale: 'en-AU', flag: '🇦🇺', name: 'Australian Dollar',  region: 'Asia Pacific',          defaults: { home: 750000,    loan: 35000,   income: 85000   } },
  NZD: { code: 'NZD', symbol: 'NZ$',  locale: 'en-NZ', flag: '🇳🇿', name: 'New Zealand Dollar', region: 'Asia Pacific',          defaults: { home: 750000,    loan: 40000,   income: 75000   } },
  INR: { code: 'INR', symbol: '₹',    locale: 'en-IN', flag: '🇮🇳', name: 'Indian Rupee',       region: 'Asia Pacific',          defaults: { home: 8000000,   loan: 500000,  income: 1200000 } },
  SGD: { code: 'SGD', symbol: 'S$',   locale: 'en-SG', flag: '🇸🇬', name: 'Singapore Dollar',   region: 'Asia Pacific',          defaults: { home: 1200000,   loan: 80000,   income: 120000  } },
  MYR: { code: 'MYR', symbol: 'RM',   locale: 'ms-MY', flag: '🇲🇾', name: 'Malaysian Ringgit',  region: 'Asia Pacific',          defaults: { home: 600000,    loan: 50000,   income: 72000   } },
  JPY: { code: 'JPY', symbol: '¥',    locale: 'ja-JP', flag: '🇯🇵', name: 'Japanese Yen',       region: 'Asia Pacific',          defaults: { home: 50000000,  loan: 3000000, income: 5000000 } },
  CNY: { code: 'CNY', symbol: 'CN¥',  locale: 'zh-CN', flag: '🇨🇳', name: 'Chinese Yuan',       region: 'Asia Pacific',          defaults: { home: 3000000,   loan: 200000,  income: 200000  } },
  PKR: { code: 'PKR', symbol: '₨',    locale: 'ur-PK', flag: '🇵🇰', name: 'Pakistani Rupee',    region: 'Asia Pacific',          defaults: { home: 15000000,  loan: 1000000, income: 1500000 } },
  AED: { code: 'AED', symbol: 'د.إ',  locale: 'ar-AE', flag: '🇦🇪', name: 'UAE Dirham',         region: 'Middle East & Africa',  defaults: { home: 1500000,   loan: 100000,  income: 180000  } },
  SAR: { code: 'SAR', symbol: '﷼',    locale: 'ar-SA', flag: '🇸🇦', name: 'Saudi Riyal',        region: 'Middle East & Africa',  defaults: { home: 1200000,   loan: 80000,   income: 150000  } },
  NGN: { code: 'NGN', symbol: '₦',    locale: 'en-NG', flag: '🇳🇬', name: 'Nigerian Naira',     region: 'Middle East & Africa',  defaults: { home: 50000000,  loan: 5000000, income: 8000000 } },
  ZAR: { code: 'ZAR', symbol: 'R',    locale: 'en-ZA', flag: '🇿🇦', name: 'South African Rand', region: 'Middle East & Africa',  defaults: { home: 2000000,   loan: 150000,  income: 350000  } },
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

function makeValue(curCode, setCurrencyFn) {
  const cur = CURRENCY_DATA[curCode] || CURRENCY_DATA['USD']
  return {
    currency: cur,
    symbol: cur.symbol,
    fmt: makeFmt(cur),
    currencies: CURRENCIES,
    setCurrency: setCurrencyFn || (() => {}),
  }
}

const CurrencyContext = createContext(makeValue('USD', () => {}))

export function CurrencyProvider({ children }) {
  const [curCode, setCurCode] = useState('USD')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ffc_currency')
      if (saved && CURRENCY_DATA[saved]) { setCurCode(saved); return }
    } catch(e) {}

    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(data => {
        const detected = COUNTRY_TO_CURRENCY[data.country_code]
        if (detected && CURRENCY_DATA[detected]) setCurCode(detected)
      })
      .catch(() => {
        try {
          const lang = navigator.language || 'en-US'
          if (lang.startsWith('en-GB'))      setCurCode('GBP')
          else if (lang.startsWith('en-AU')) setCurCode('AUD')
          else if (lang.startsWith('en-IN')) setCurCode('INR')
          else if (/^(de|fr|it|es|nl|pt)/.test(lang)) setCurCode('EUR')
        } catch(e) {}
      })
  }, [])

  const setCurrency = (input) => {
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
