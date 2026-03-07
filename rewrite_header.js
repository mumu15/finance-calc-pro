/**
 * FreeFinCalc.net — Rewrite Header with Category Navigation
 * node rewrite_header.js
 */

const fs = require('fs')

const content = `'use client'
import { useState, useRef, useEffect } from 'react'
import { useCurrency } from './CurrencyContext'

const CURRENCIES = [
  { code: 'USD', symbol: '$',  label: 'US Dollar'       },
  { code: 'EUR', symbol: '€',  label: 'Euro'            },
  { code: 'GBP', symbol: '£',  label: 'British Pound'   },
  { code: 'INR', symbol: '₹',  label: 'Indian Rupee'    },
  { code: 'PKR', symbol: '₨',  label: 'Pakistani Rupee' },
  { code: 'AED', symbol: 'د.إ',label: 'UAE Dirham'      },
  { code: 'SAR', symbol: '﷼',  label: 'Saudi Riyal'     },
  { code: 'CAD', symbol: 'CA$',label: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', label: 'Australian Dollar'},
  { code: 'SGD', symbol: 'S$', label: 'Singapore Dollar'},
  { code: 'MYR', symbol: 'RM', label: 'Malaysian Ringgit'},
  { code: 'NGN', symbol: '₦',  label: 'Nigerian Naira'  },
  { code: 'ZAR', symbol: 'R',  label: 'South African Rand'},
  { code: 'JPY', symbol: '¥',  label: 'Japanese Yen'    },
  { code: 'CNY', symbol: 'CN¥',label: 'Chinese Yuan'    },
  { code: 'MXN', symbol: 'MX$',label: 'Mexican Peso'    },
  { code: 'BRL', symbol: 'R$', label: 'Brazilian Real'  },
  { code: 'CHF', symbol: 'Fr', label: 'Swiss Franc'     },
  { code: 'SEK', symbol: 'kr', label: 'Swedish Krona'   },
  { code: 'NZD', symbol: 'NZ$',label: 'New Zealand Dollar'},
]

const NAV = [
  {
    label: '🏠 Mortgage & Home',
    id: 'mortgage',
    tools: [
      { name: 'Mortgage Calculator',           href: '/mortgage-calculator'            },
      { name: 'Amortization Calculator',       href: '/amortization-calculator'        },
      { name: 'Refinance Calculator',          href: '/refinance-calculator'           },
      { name: 'Home Affordability',            href: '/home-affordability-calculator'  },
      { name: 'HELOC Calculator',              href: '/heloc-calculator'               },
      { name: 'Property Tax Calculator',       href: '/property-tax-calculator'        },
      { name: 'Rent vs Buy Calculator',        href: '/rent-vs-buy-calculator'         },
      { name: 'Down Payment Calculator',       href: '/down-payment-calculator'        },
      { name: 'Mortgage Points Calculator',    href: '/mortgage-points-calculator'     },
      { name: 'Biweekly Mortgage',             href: '/biweekly-mortgage-calculator'   },
      { name: 'Extra Payment Calculator',      href: '/extra-payment-calculator'       },
      { name: 'Home Equity Calculator',        href: '/home-equity-calculator'         },
      { name: 'Home Buying Cost Calculator',   href: '/home-buying-cost-calculator'    },
      { name: 'Home Improvement Loan',         href: '/home-improvement-loan-calculator'},
      { name: 'Solar Payback Calculator',      href: '/solar-payback-calculator'       },
    ],
  },
  {
    label: '💳 Debt & Credit',
    id: 'debt',
    tools: [
      { name: 'Credit Card Payoff',            href: '/credit-card-payoff-calculator'            },
      { name: 'Minimum Payment Calculator',    href: '/credit-card-minimum-payment-calculator'   },
      { name: 'Credit Utilization',            href: '/credit-utilization-calculator'            },
      { name: 'Debt Payoff Calculator',        href: '/debt-payoff-calculator'                   },
      { name: 'Debt Payoff Time',              href: '/debt-payoff-time-calculator'              },
      { name: 'Debt Avalanche Calculator',     href: '/debt-avalanche-calculator'                },
      { name: 'Debt Snowball Calculator',      href: '/debt-snowball-calculator'                 },
      { name: 'Debt Consolidation',            href: '/debt-consolidation-calculator'            },
      { name: 'Balance Transfer Calculator',   href: '/balance-transfer-calculator'              },
      { name: 'Total Debt Calculator',         href: '/total-debt-calculator'                    },
      { name: 'Debt-to-Income Calculator',     href: '/debt-to-income-calculator'                },
      { name: 'Pay Off Debt vs Invest',        href: '/payoff-vs-invest-calculator'              },
    ],
  },
  {
    label: '🏦 Loans',
    id: 'loans',
    tools: [
      { name: 'Personal Loan Calculator',      href: '/personal-loan-calculator'     },
      { name: 'Student Loan Calculator',       href: '/student-loan-calculator'      },
      { name: 'Loan Comparison Calculator',    href: '/loan-comparison-calculator'   },
      { name: 'Loan Interest Calculator',      href: '/loan-interest-calculator'     },
      { name: 'Loan Payment Calculator',       href: '/loan-payment-calculator'      },
      { name: 'Business Loan Calculator',      href: '/business-loan-calculator'     },
      { name: 'SBA Loan Calculator',           href: '/sba-loan-calculator'          },
      { name: 'Equipment Loan Calculator',     href: '/equipment-loan-calculator'    },
      { name: 'APR Calculator',                href: '/apr-calculator'               },
      { name: 'Simple Interest Calculator',    href: '/simple-interest-calculator'   },
      { name: 'Interest Rate Calculator',      href: '/interest-rate-calculator'     },
    ],
  },
  {
    label: '🌅 Retirement',
    id: 'retirement',
    tools: [
      { name: 'Retirement Calculator',         href: '/retirement-calculator'          },
      { name: '401k Calculator',               href: '/401k-calculator'                },
      { name: 'Roth IRA Calculator',           href: '/roth-ira-calculator'            },
      { name: 'Social Security Calculator',    href: '/social-security-calculator'     },
      { name: 'RMD Calculator',                href: '/rmd-calculator'                 },
      { name: 'Pension Calculator',            href: '/pension-calculator'             },
      { name: 'Annuity Calculator',            href: '/annuity-calculator'             },
      { name: 'FIRE Calculator',               href: '/fire-calculator'                },
      { name: 'FIRE Retirement Calculator',    href: '/fire-retirement-calculator'     },
      { name: 'Retirement Savings Calculator', href: '/retirement-savings-calculator'  },
    ],
  },
  {
    label: '🧾 Tax & Salary',
    id: 'tax',
    tools: [
      { name: 'Income Tax Calculator',         href: '/tax-calculator'                   },
      { name: 'Salary After Tax',              href: '/salary-after-tax-calculator'      },
      { name: 'Paycheck Calculator',           href: '/paycheck-calculator'              },
      { name: 'Capital Gains Tax',             href: '/capital-gains-tax-calculator'     },
      { name: 'Self-Employment Tax',           href: '/self-employment-tax-calculator'   },
      { name: 'Payroll Tax Calculator',        href: '/payroll-tax-calculator'           },
      { name: 'Tax Refund Calculator',         href: '/tax-refund-calculator'            },
      { name: 'Hourly to Salary',              href: '/hourly-to-salary-calculator'      },
      { name: 'Salary to Hourly',              href: '/salary-to-hourly-calculator'      },
      { name: 'Overtime Pay Calculator',       href: '/overtime-pay-calculator'          },
      { name: 'Commission Calculator',         href: '/commission-calculator'            },
      { name: 'Freelance Rate Calculator',     href: '/freelance-rate-calculator'        },
    ],
  },
  {
    label: '📈 Investing',
    id: 'investing',
    tools: [
      { name: 'Investment Return Calculator',  href: '/investment-return-calculator'     },
      { name: 'Portfolio Growth Calculator',   href: '/portfolio-growth-calculator'      },
      { name: 'Portfolio Rebalancing',         href: '/portfolio-rebalancing-calculator' },
      { name: 'Dollar Cost Averaging',         href: '/dollar-cost-averaging-calculator' },
      { name: 'Passive Income Calculator',     href: '/passive-income-calculator'        },
      { name: 'Dividend Calculator',           href: '/dividend-calculator'              },
      { name: 'Stock Profit Calculator',       href: '/stock-profit-calculator'          },
      { name: 'Bond Yield Calculator',         href: '/bond-yield-calculator'            },
      { name: 'CD Calculator',                 href: '/cd-calculator'                    },
      { name: 'Savings Goal Calculator',       href: '/savings-goal-calculator'          },
    ],
  },
  {
    label: '🏢 Business',
    id: 'business',
    tools: [
      { name: 'Profit Margin Calculator',      href: '/profit-margin-calculator'         },
      { name: 'Break-Even Calculator',         href: '/break-even-calculator'            },
      { name: 'ROI Calculator',                href: '/roi-calculator'                   },
      { name: 'Business Valuation',            href: '/business-valuation-calculator'    },
      { name: 'Cash Flow Calculator',          href: '/cash-flow-calculator'             },
      { name: 'Working Capital Calculator',    href: '/working-capital-calculator'       },
      { name: 'Employee Cost Calculator',      href: '/employee-cost-calculator'         },
      { name: 'Startup Cost Calculator',       href: '/startup-cost-calculator'          },
      { name: 'Ecommerce Profit Calculator',   href: '/ecommerce-profit-calculator'      },
      { name: 'SaaS Metrics Calculator',       href: '/saas-metrics-calculator'          },
      { name: 'Invoice Calculator',            href: '/invoice-calculator'               },
      { name: 'Markup Calculator',             href: '/markup-calculator'                },
    ],
  },
  {
    label: '🚗 Auto & More',
    id: 'auto',
    tools: [
      { name: 'Car Loan Calculator',           href: '/car-loan-calculator'              },
      { name: 'Car Affordability Calculator',  href: '/car-affordability-calculator'     },
      { name: 'Car Depreciation Calculator',   href: '/car-depreciation-calculator'      },
      { name: 'Lease vs Buy Calculator',       href: '/lease-vs-buy-calculator'          },
      { name: 'Fuel Cost Calculator',          href: '/fuel-cost-calculator'             },
      { name: 'Boat Loan Calculator',          href: '/boat-loan-calculator'             },
      { name: 'RV Loan Calculator',            href: '/rv-loan-calculator'               },
      { name: 'Truck Loan Calculator',         href: '/truck-loan-calculator'            },
      { name: 'Budget Planner',                href: '/budget-planner-calculator'        },
      { name: 'Net Worth Calculator',          href: '/net-worth-calculator'             },
      { name: 'Wedding Budget Calculator',     href: '/wedding-budget-calculator'        },
      { name: 'Currency Converter',            href: '/currency-converter'               },
    ],
  },
]

export default function Header() {
  const { currency, setCurrency } = useCurrency()
  const [openMenu, setOpenMenu]   = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState(null)
  const [curOpen, setCurOpen]     = useState(false)
  const headerRef = useRef(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handle(e) {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setOpenMenu(null)
        setCurOpen(false)
      }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  const activeCur = CURRENCIES.find(c => c.code === currency) || CURRENCIES[0]

  return (
    <header ref={headerRef}
      style={{
        background: 'rgba(10,12,20,0.95)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(20px)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}>

      {/* ── Desktop Nav ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 hidden lg:flex items-center gap-1 h-14">

        {/* Logo */}
        <a href="/" className="flex items-center gap-2 mr-4 shrink-0">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-black"
            style={{background:'#f0c842',color:'#0a0c14'}}>F</div>
          <span className="font-black text-white text-base tracking-tight">FreeFinCalc</span>
        </a>

        {/* Nav items */}
        <nav className="flex items-center gap-0.5 flex-1 overflow-x-auto">
          {NAV.map(item => (
            <div key={item.id} className="relative shrink-0">
              <button
                onMouseEnter={() => setOpenMenu(item.id)}
                onMouseLeave={() => setOpenMenu(null)}
                onClick={() => setOpenMenu(openMenu === item.id ? null : item.id)}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold transition-all"
                style={{
                  color: openMenu === item.id ? '#f0c842' : '#94a3b8',
                  background: openMenu === item.id ? 'rgba(240,200,66,0.08)' : 'transparent',
                }}>
                {item.label}
                <span style={{
                  fontSize:'8px',
                  transform: openMenu === item.id ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                  opacity: 0.5,
                }}>▼</span>
              </button>

              {/* Dropdown */}
              {openMenu === item.id && (
                <div
                  onMouseEnter={() => setOpenMenu(item.id)}
                  onMouseLeave={() => setOpenMenu(null)}
                  className="absolute top-full left-0 pt-1 z-50"
                  style={{minWidth:'220px'}}>
                  <div className="rounded-2xl overflow-hidden py-2"
                    style={{
                      background:'rgba(15,18,30,0.98)',
                      border:'1px solid rgba(255,255,255,0.1)',
                      boxShadow:'0 20px 60px rgba(0,0,0,0.6)',
                    }}>
                    {item.tools.map(tool => (
                      <a key={tool.href} href={tool.href}
                        className="flex items-center px-4 py-2 text-xs text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
                        {tool.name}
                      </a>
                    ))}
                    <div className="mx-4 mt-2 pt-2"
                      style={{borderTop:'1px solid rgba(255,255,255,0.06)'}}>
                      <a href="/" className="flex items-center px-0 py-1.5 text-xs font-semibold"
                        style={{color:'#f0c842'}}>
                        View all calculators →
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Blog link */}
          <a href="/blog"
            className="shrink-0 px-3 py-2 rounded-lg text-xs font-semibold transition-all text-slate-400 hover:text-white">
            📖 Blog
          </a>
        </nav>

        {/* Currency picker */}
        <div className="relative shrink-0 ml-2">
          <button
            onClick={() => setCurOpen(!curOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
            style={{
              background:'rgba(240,200,66,0.1)',
              border:'1px solid rgba(240,200,66,0.25)',
              color:'#f0c842',
            }}>
            {activeCur.symbol} {activeCur.code}
            <span style={{fontSize:'8px',opacity:0.6}}>▼</span>
          </button>
          {curOpen && (
            <div className="absolute top-full right-0 mt-1 rounded-2xl overflow-hidden z-50"
              style={{
                background:'rgba(15,18,30,0.98)',
                border:'1px solid rgba(255,255,255,0.1)',
                boxShadow:'0 20px 60px rgba(0,0,0,0.6)',
                width:'200px',
                maxHeight:'320px',
                overflowY:'auto',
              }}>
              {CURRENCIES.map(cur => (
                <button key={cur.code}
                  onClick={() => { setCurrency(cur.code); setCurOpen(false) }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-xs transition-colors text-left"
                  style={{
                    color: currency === cur.code ? '#f0c842' : '#94a3b8',
                    background: currency === cur.code ? 'rgba(240,200,66,0.08)' : 'transparent',
                  }}>
                  <span className="font-bold w-8">{cur.symbol}</span>
                  <span>{cur.code} — {cur.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile Nav ──────────────────────────────────────────────────── */}
      <div className="lg:hidden flex items-center justify-between px-4 h-14">
        <a href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-black"
            style={{background:'#f0c842',color:'#0a0c14'}}>F</div>
          <span className="font-black text-white text-base">FreeFinCalc</span>
        </a>
        <div className="flex items-center gap-2">
          {/* Currency quick */}
          <button
            onClick={() => setCurOpen(!curOpen)}
            className="px-2.5 py-1.5 rounded-lg text-xs font-bold"
            style={{background:'rgba(240,200,66,0.1)',border:'1px solid rgba(240,200,66,0.25)',color:'#f0c842'}}>
            {activeCur.symbol} {activeCur.code}
          </button>
          {/* Hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white transition-colors"
            style={{background:'rgba(255,255,255,0.05)'}}>
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile currency dropdown */}
      {curOpen && (
        <div className="lg:hidden px-4 pb-3">
          <div className="rounded-2xl overflow-hidden"
            style={{background:'rgba(15,18,30,0.98)',border:'1px solid rgba(255,255,255,0.1)',maxHeight:'200px',overflowY:'auto'}}>
            {CURRENCIES.map(cur => (
              <button key={cur.code}
                onClick={() => { setCurrency(cur.code); setCurOpen(false) }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-left"
                style={{color: currency === cur.code ? '#f0c842' : '#94a3b8',background: currency === cur.code ? 'rgba(240,200,66,0.08)' : 'transparent'}}>
                <span className="font-bold w-8">{cur.symbol}</span>
                <span>{cur.code} — {cur.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden px-4 pb-4 space-y-1 max-h-screen overflow-y-auto"
          style={{borderTop:'1px solid rgba(255,255,255,0.07)'}}>

          {/* Blog */}
          <a href="/blog"
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-slate-300 hover:text-white transition-colors"
            style={{background:'rgba(255,255,255,0.04)'}}>
            📖 Blog &amp; Guides
          </a>

          {NAV.map(item => (
            <div key={item.id}>
              <button
                onClick={() => setMobileExpanded(mobileExpanded === item.id ? null : item.id)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: mobileExpanded === item.id ? 'rgba(240,200,66,0.08)' : 'rgba(255,255,255,0.04)',
                  color: mobileExpanded === item.id ? '#f0c842' : '#94a3b8',
                }}>
                <span>{item.label}</span>
                <span style={{fontSize:'10px'}}>{mobileExpanded === item.id ? '▲' : '▼'}</span>
              </button>
              {mobileExpanded === item.id && (
                <div className="mt-1 ml-4 grid grid-cols-2 gap-1">
                  {item.tools.map(tool => (
                    <a key={tool.href} href={tool.href}
                      className="px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-white transition-colors"
                      style={{background:'rgba(255,255,255,0.03)'}}>
                      {tool.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

    </header>
  )
}
`

fs.writeFileSync('components/Header.js', content, 'utf8')

console.log(`
════════════════════════════════════════════════════
  HEADER REWRITTEN
════════════════════════════════════════════════════
  ✅ components/Header.js

  Desktop: 8 category dropdowns with hover menus
  Mobile:  hamburger with expandable categories
  Both:    currency picker

  Categories in header:
  🏠 Mortgage & Home   (15 tools)
  💳 Debt & Credit     (12 tools)
  🏦 Loans             (11 tools)
  🌅 Retirement        (10 tools)
  🧾 Tax & Salary      (12 tools)
  📈 Investing         (10 tools)
  🏢 Business          (12 tools)
  🚗 Auto & More       (12 tools)
  📖 Blog
════════════════════════════════════════════════════
`)
