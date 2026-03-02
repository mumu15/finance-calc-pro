'use client'
import { createContext, useContext, useState, useEffect, useCallback } from 'react'

export const CURRENCIES = [
  // Americas
  { code:'USD', symbol:'$',   name:'US Dollar',          flag:'🇺🇸', locale:'en-US', region:'Americas',
    rate:1,     defaults:{ home:350000,  income:75000,  savings:10000,  loan:25000,  retirement:500000,  emergency:4000,  rent:2000,  debt:15000 } },
  { code:'CAD', symbol:'C$',  name:'Canadian Dollar',    flag:'🇨🇦', locale:'en-CA', region:'Americas',
    rate:1.36,  defaults:{ home:650000,  income:85000,  savings:15000,  loan:35000,  retirement:600000,  emergency:5000,  rent:2200,  debt:20000 } },
  { code:'BRL', symbol:'R$',  name:'Brazilian Real',     flag:'🇧🇷', locale:'pt-BR', region:'Americas',
    rate:5.0,   defaults:{ home:400000,  income:60000,  savings:10000,  loan:20000,  retirement:300000,  emergency:3000,  rent:2000,  debt:10000 } },
  { code:'MXN', symbol:'MX$', name:'Mexican Peso',       flag:'🇲🇽', locale:'es-MX', region:'Americas',
    rate:17.0,  defaults:{ home:2000000, income:300000, savings:80000,  loan:150000, retirement:1500000, emergency:40000, rent:12000, debt:80000 } },
  { code:'COP', symbol:'$',   name:'Colombian Peso',     flag:'🇨🇴', locale:'es-CO', region:'Americas',
    rate:3900,  defaults:{ home:400000000,income:40000000,savings:5000000,loan:20000000,retirement:200000000,emergency:4000000,rent:2000000,debt:10000000 } },

  // Europe
  { code:'GBP', symbol:'£',   name:'British Pound',      flag:'🇬🇧', locale:'en-GB', region:'Europe',
    rate:0.79,  defaults:{ home:280000,  income:40000,  savings:10000,  loan:15000,  retirement:300000,  emergency:4000,  rent:1500,  debt:12000 } },
  { code:'EUR', symbol:'€',   name:'Euro',               flag:'🇪🇺', locale:'de-DE', region:'Europe',
    rate:0.92,  defaults:{ home:300000,  income:45000,  savings:12000,  loan:15000,  retirement:350000,  emergency:4500,  rent:1200,  debt:12000 } },
  { code:'CHF', symbol:'Fr',  name:'Swiss Franc',        flag:'🇨🇭', locale:'de-CH', region:'Europe',
    rate:0.90,  defaults:{ home:800000,  income:100000, savings:30000,  loan:25000,  retirement:800000,  emergency:10000, rent:2500,  debt:20000 } },
  { code:'SEK', symbol:'kr',  name:'Swedish Krona',      flag:'🇸🇪', locale:'sv-SE', region:'Europe',
    rate:10.4,  defaults:{ home:3000000, income:500000, savings:100000, loan:150000, retirement:2500000, emergency:50000, rent:12000, debt:120000 } },
  { code:'NOK', symbol:'kr',  name:'Norwegian Krone',    flag:'🇳🇴', locale:'nb-NO', region:'Europe',
    rate:10.6,  defaults:{ home:4000000, income:600000, savings:150000, loan:200000, retirement:3000000, emergency:60000, rent:15000, debt:150000 } },
  { code:'DKK', symbol:'kr',  name:'Danish Krone',       flag:'🇩🇰', locale:'da-DK', region:'Europe',
    rate:6.9,   defaults:{ home:2500000, income:400000, savings:100000, loan:150000, retirement:2000000, emergency:40000, rent:10000, debt:100000 } },
  { code:'PLN', symbol:'zł',  name:'Polish Zloty',       flag:'🇵🇱', locale:'pl-PL', region:'Europe',
    rate:3.95,  defaults:{ home:500000,  income:70000,  savings:15000,  loan:30000,  retirement:400000,  emergency:7000,  rent:3000,  debt:20000 } },
  { code:'TRY', symbol:'₺',   name:'Turkish Lira',       flag:'🇹🇷', locale:'tr-TR', region:'Europe',
    rate:32.0,  defaults:{ home:5000000, income:500000, savings:100000, loan:200000, retirement:3000000, emergency:50000, rent:20000, debt:100000 } },

  // Asia Pacific
  { code:'AUD', symbol:'A$',  name:'Australian Dollar',  flag:'🇦🇺', locale:'en-AU', region:'Asia Pacific',
    rate:1.53,  defaults:{ home:750000,  income:90000,  savings:20000,  loan:30000,  retirement:600000,  emergency:7000,  rent:2500,  debt:20000 } },
  { code:'NZD', symbol:'NZ$', name:'New Zealand Dollar', flag:'🇳🇿', locale:'en-NZ', region:'Asia Pacific',
    rate:1.63,  defaults:{ home:700000,  income:70000,  savings:15000,  loan:25000,  retirement:500000,  emergency:6000,  rent:2200,  debt:18000 } },
  { code:'JPY', symbol:'¥',   name:'Japanese Yen',       flag:'🇯🇵', locale:'ja-JP', region:'Asia Pacific',
    rate:150.0, defaults:{ home:40000000,income:5000000,savings:1000000,loan:2000000,retirement:30000000,emergency:600000,rent:100000,debt:1500000 } },
  { code:'CNY', symbol:'¥',   name:'Chinese Yuan',       flag:'🇨🇳', locale:'zh-CN', region:'Asia Pacific',
    rate:7.24,  defaults:{ home:2000000, income:200000, savings:50000,  loan:100000, retirement:1500000, emergency:30000, rent:5000,  debt:60000 } },
  { code:'HKD', symbol:'HK$', name:'Hong Kong Dollar',   flag:'🇭🇰', locale:'zh-HK', region:'Asia Pacific',
    rate:7.82,  defaults:{ home:6000000, income:400000, savings:100000, loan:200000, retirement:3000000, emergency:50000, rent:18000, debt:150000 } },
  { code:'SGD', symbol:'S$',  name:'Singapore Dollar',   flag:'🇸🇬', locale:'en-SG', region:'Asia Pacific',
    rate:1.34,  defaults:{ home:800000,  income:80000,  savings:20000,  loan:30000,  retirement:600000,  emergency:8000,  rent:2500,  debt:25000 } },
  { code:'INR', symbol:'₹',   name:'Indian Rupee',       flag:'🇮🇳', locale:'en-IN', region:'Asia Pacific',
    rate:83.0,  defaults:{ home:7500000, income:800000, savings:200000, loan:500000, retirement:5000000, emergency:100000,rent:25000, debt:300000 } },
  { code:'PKR', symbol:'₨',   name:'Pakistani Rupee',    flag:'🇵🇰', locale:'ur-PK', region:'Asia Pacific',
    rate:278.0, defaults:{ home:20000000,income:1500000,savings:300000, loan:1000000,retirement:10000000,emergency:200000,rent:50000, debt:500000 } },
  { code:'BDT', symbol:'৳',   name:'Bangladeshi Taka',   flag:'🇧🇩', locale:'bn-BD', region:'Asia Pacific',
    rate:110.0, defaults:{ home:5000000, income:500000, savings:100000, loan:300000, retirement:3000000, emergency:60000, rent:20000, debt:200000 } },
  { code:'MYR', symbol:'RM',  name:'Malaysian Ringgit',  flag:'🇲🇾', locale:'ms-MY', region:'Asia Pacific',
    rate:4.7,   defaults:{ home:600000,  income:60000,  savings:15000,  loan:30000,  retirement:400000,  emergency:7000,  rent:2000,  debt:20000 } },
  { code:'THB', symbol:'฿',   name:'Thai Baht',          flag:'🇹🇭', locale:'th-TH', region:'Asia Pacific',
    rate:35.0,  defaults:{ home:3000000, income:300000, savings:50000,  loan:150000, retirement:2000000, emergency:40000, rent:15000, debt:100000 } },
  { code:'IDR', symbol:'Rp',  name:'Indonesian Rupiah',  flag:'🇮🇩', locale:'id-ID', region:'Asia Pacific',
    rate:15700, defaults:{ home:1000000000,income:100000000,savings:20000000,loan:50000000,retirement:500000000,emergency:15000000,rent:5000000,debt:30000000 } },
  { code:'PHP', symbol:'₱',   name:'Philippine Peso',    flag:'🇵🇭', locale:'en-PH', region:'Asia Pacific',
    rate:56.0,  defaults:{ home:3000000, income:500000, savings:100000, loan:200000, retirement:2000000, emergency:50000, rent:20000, debt:100000 } },
  { code:'VND', symbol:'₫',   name:'Vietnamese Dong',    flag:'🇻🇳', locale:'vi-VN', region:'Asia Pacific',
    rate:24500, defaults:{ home:2000000000,income:200000000,savings:30000000,loan:80000000,retirement:800000000,emergency:20000000,rent:8000000,debt:50000000 } },
  { code:'KRW', symbol:'₩',   name:'South Korean Won',   flag:'🇰🇷', locale:'ko-KR', region:'Asia Pacific',
    rate:1330,  defaults:{ home:500000000,income:50000000,savings:10000000,loan:20000000,retirement:300000000,emergency:6000000,rent:1500000,debt:15000000 } },

  // Middle East & Africa
  { code:'AED', symbol:'د.إ', name:'UAE Dirham',         flag:'🇦🇪', locale:'ar-AE', region:'Middle East & Africa',
    rate:3.67,  defaults:{ home:1500000, income:200000, savings:50000,  loan:100000, retirement:1000000, emergency:20000, rent:8000,  debt:60000 } },
  { code:'SAR', symbol:'﷼',   name:'Saudi Riyal',        flag:'🇸🇦', locale:'ar-SA', region:'Middle East & Africa',
    rate:3.75,  defaults:{ home:1000000, income:150000, savings:40000,  loan:80000,  retirement:800000,  emergency:18000, rent:6000,  debt:50000 } },
  { code:'QAR', symbol:'QR',  name:'Qatari Riyal',       flag:'🇶🇦', locale:'ar-QA', region:'Middle East & Africa',
    rate:3.64,  defaults:{ home:1200000, income:180000, savings:50000,  loan:90000,  retirement:900000,  emergency:20000, rent:8000,  debt:55000 } },
  { code:'KWD', symbol:'KD',  name:'Kuwaiti Dinar',      flag:'🇰🇼', locale:'ar-KW', region:'Middle East & Africa',
    rate:0.31,  defaults:{ home:120000,  income:18000,  savings:5000,   loan:10000,  retirement:100000,  emergency:2000,  rent:800,   debt:6000 } },
  { code:'EGP', symbol:'E£',  name:'Egyptian Pound',     flag:'🇪🇬', locale:'ar-EG', region:'Middle East & Africa',
    rate:30.0,  defaults:{ home:2000000, income:200000, savings:50000,  loan:100000, retirement:1000000, emergency:20000, rent:8000,  debt:60000 } },
  { code:'NGN', symbol:'₦',   name:'Nigerian Naira',     flag:'🇳🇬', locale:'en-NG', region:'Middle East & Africa',
    rate:1500,  defaults:{ home:50000000,income:5000000,savings:1000000,loan:2000000,retirement:30000000,emergency:600000,rent:200000,debt:1500000 } },
  { code:'KES', symbol:'KSh', name:'Kenyan Shilling',    flag:'🇰🇪', locale:'sw-KE', region:'Middle East & Africa',
    rate:130.0, defaults:{ home:10000000,income:1000000,savings:200000, loan:500000, retirement:5000000, emergency:100000,rent:50000, debt:300000 } },
  { code:'ZAR', symbol:'R',   name:'South African Rand', flag:'🇿🇦', locale:'en-ZA', region:'Middle East & Africa',
    rate:18.5,  defaults:{ home:1500000, income:300000, savings:50000,  loan:100000, retirement:1000000, emergency:20000, rent:12000, debt:80000 } },
  { code:'GHS', symbol:'₵',   name:'Ghanaian Cedi',      flag:'🇬🇭', locale:'en-GH', region:'Middle East & Africa',
    rate:12.5,  defaults:{ home:500000,  income:60000,  savings:10000,  loan:30000,  retirement:300000,  emergency:8000,  rent:3000,  debt:20000 } },
]

const CurrencyContext = createContext(null)

function formatNumber(n, currency) {
  const abs = Math.abs(n)
  if (abs >= 1e12) return currency.symbol + (n / 1e12).toFixed(1) + 'T'
  if (abs >= 1e9)  return currency.symbol + (n / 1e9).toFixed(1) + 'B'
  if (abs >= 1e6)  return currency.symbol + (n / 1e6).toFixed(1) + 'M'
  if (abs >= 1e3)  return currency.symbol + Math.round(n).toLocaleString(currency.locale)
  return currency.symbol + Math.round(n).toLocaleString(currency.locale)
}

function detectCurrency() {
  try {
    const lang = navigator.language || 'en-US'
    const map = {
      'en-US':'USD','en-CA':'CAD','pt-BR':'BRL','es-MX':'MXN',
      'en-GB':'GBP','de-DE':'EUR','de-AT':'EUR','fr-FR':'EUR','es-ES':'EUR','it':'EUR','nl':'EUR','pt-PT':'EUR',
      'de-CH':'CHF','sv-SE':'SEK','nb-NO':'NOK','da-DK':'DKK','pl-PL':'PLN','tr-TR':'TRY',
      'en-AU':'AUD','en-NZ':'NZD','ja-JP':'JPY','zh-CN':'CNY','zh-HK':'HKD',
      'en-SG':'SGD','en-IN':'INR','ur-PK':'PKR','bn-BD':'BDT','ms-MY':'MYR',
      'th-TH':'THB','id-ID':'IDR','en-PH':'PHP','vi-VN':'VND','ko-KR':'KRW',
      'ar-AE':'AED','ar-SA':'SAR','ar-QA':'QAR','ar-KW':'KWD','ar-EG':'EGP',
      'en-NG':'NGN','sw-KE':'KES','en-ZA':'ZAR','en-GH':'GHS',
    }
    for (const [key, code] of Object.entries(map)) {
      if (lang.startsWith(key)) return code
    }
  } catch(e) {}
  return 'USD'
}

export function CurrencyProvider({ children }) {
  const [currencyCode, setCurrencyCode] = useState('USD')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ffc_currency')
      if (saved && CURRENCIES.find(c => c.code === saved)) {
        setCurrencyCode(saved)
      } else {
        setCurrencyCode(detectCurrency())
      }
    } catch(e) {}
  }, [])

  const setCurrency = useCallback((code) => {
    setCurrencyCode(code)
    try { localStorage.setItem('ffc_currency', code) } catch(e) {}
  }, [])

  const currency = CURRENCIES.find(c => c.code === currencyCode) || CURRENCIES[0]
  const fmt = useCallback((n) => formatNumber(n, currency), [currency])

  return (
    <CurrencyContext.Provider value={{ currency, currencies: CURRENCIES, setCurrency, fmt }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext)
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider')
  return ctx
}
