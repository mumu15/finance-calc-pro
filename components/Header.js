'use client'
import { useState, useEffect } from 'react'
import { useCurrency } from './CurrencyContext'

const CURRENCIES = [
  { code: 'USD', symbol: '$',   label: 'US Dollar'          },
  { code: 'EUR', symbol: '€',   label: 'Euro'               },
  { code: 'GBP', symbol: '£',   label: 'British Pound'      },
  { code: 'INR', symbol: '₹',   label: 'Indian Rupee'       },
  { code: 'PKR', symbol: '₨',   label: 'Pakistani Rupee'    },
  { code: 'AED', symbol: 'د.إ', label: 'UAE Dirham'         },
  { code: 'SAR', symbol: '﷼',   label: 'Saudi Riyal'        },
  { code: 'CAD', symbol: 'CA$', label: 'Canadian Dollar'    },
  { code: 'AUD', symbol: 'A$',  label: 'Australian Dollar'  },
  { code: 'SGD', symbol: 'S$',  label: 'Singapore Dollar'   },
  { code: 'MYR', symbol: 'RM',  label: 'Malaysian Ringgit'  },
  { code: 'NGN', symbol: '₦',   label: 'Nigerian Naira'     },
  { code: 'ZAR', symbol: 'R',   label: 'South African Rand' },
  { code: 'JPY', symbol: '¥',   label: 'Japanese Yen'       },
  { code: 'CNY', symbol: 'CN¥', label: 'Chinese Yuan'       },
  { code: 'BRL', symbol: 'R$',  label: 'Brazilian Real'     },
  { code: 'CHF', symbol: 'Fr',  label: 'Swiss Franc'        },
  { code: 'NZD', symbol: 'NZ$', label: 'New Zealand Dollar' },
  { code: 'MXN', symbol: 'MX$', label: 'Mexican Peso'       },
  { code: 'SEK', symbol: 'kr',  label: 'Swedish Krona'      },
]

const NAV = [
  {
    label: 'Mortgage & Home', icon: '🏠',
    tools: [
      { name: 'Mortgage Calculator',          href: '/mortgage-calculator'              },
      { name: 'Amortization Calculator',      href: '/amortization-calculator'          },
      { name: 'Refinance Calculator',         href: '/refinance-calculator'             },
      { name: 'Home Affordability',           href: '/home-affordability-calculator'    },
      { name: 'HELOC Calculator',             href: '/heloc-calculator'                 },
      { name: 'Property Tax Calculator',      href: '/property-tax-calculator'          },
      { name: 'Rent vs Buy Calculator',       href: '/rent-vs-buy-calculator'           },
      { name: 'Down Payment Calculator',      href: '/down-payment-calculator'          },
      { name: 'Mortgage Points Calculator',   href: '/mortgage-points-calculator'       },
      { name: 'Biweekly Mortgage',            href: '/biweekly-mortgage-calculator'     },
      { name: 'Extra Payment Calculator',     href: '/extra-payment-calculator'         },
      { name: 'Home Equity Calculator',       href: '/home-equity-calculator'           },
      { name: 'Home Buying Cost Calculator',  href: '/home-buying-cost-calculator'      },
      { name: 'Home Improvement Loan',        href: '/home-improvement-loan-calculator' },
      { name: 'Solar Payback Calculator',     href: '/solar-payback-calculator'         },
    ],
  },
  {
    label: 'Debt & Credit', icon: '💳',
    tools: [
      { name: 'Credit Card Payoff',           href: '/credit-card-payoff-calculator'          },
      { name: 'Minimum Payment Calculator',   href: '/credit-card-minimum-payment-calculator' },
      { name: 'Credit Utilization',           href: '/credit-utilization-calculator'          },
      { name: 'Debt Payoff Calculator',       href: '/debt-payoff-calculator'                 },
      { name: 'Debt Payoff Time',             href: '/debt-payoff-time-calculator'            },
      { name: 'Debt Avalanche Calculator',    href: '/debt-avalanche-calculator'              },
      { name: 'Debt Snowball Calculator',     href: '/debt-snowball-calculator'               },
      { name: 'Debt Consolidation',           href: '/debt-consolidation-calculator'          },
      { name: 'Balance Transfer Calculator',  href: '/balance-transfer-calculator'            },
      { name: 'Total Debt Calculator',        href: '/total-debt-calculator'                  },
      { name: 'Debt-to-Income Calculator',    href: '/debt-to-income-calculator'              },
      { name: 'Pay Off Debt vs Invest',       href: '/payoff-vs-invest-calculator'            },
    ],
  },
  {
    label: 'Loans', icon: '🏦',
    tools: [
      { name: 'Personal Loan Calculator',     href: '/personal-loan-calculator'    },
      { name: 'Student Loan Calculator',      href: '/student-loan-calculator'     },
      { name: 'Loan Comparison Calculator',   href: '/loan-comparison-calculator'  },
      { name: 'Loan Interest Calculator',     href: '/loan-interest-calculator'    },
      { name: 'Loan Payment Calculator',      href: '/loan-payment-calculator'     },
      { name: 'Business Loan Calculator',     href: '/business-loan-calculator'    },
      { name: 'SBA Loan Calculator',          href: '/sba-loan-calculator'         },
      { name: 'Equipment Loan Calculator',    href: '/equipment-loan-calculator'   },
      { name: 'APR Calculator',               href: '/apr-calculator'              },
      { name: 'Simple Interest Calculator',   href: '/simple-interest-calculator'  },
      { name: 'Interest Rate Calculator',     href: '/interest-rate-calculator'    },
    ],
  },
  {
    label: 'Retirement', icon: '🌅',
    tools: [
      { name: 'Retirement Calculator',         href: '/retirement-calculator'         },
      { name: '401k Calculator',               href: '/401k-calculator'               },
      { name: 'Roth IRA Calculator',           href: '/roth-ira-calculator'           },
      { name: 'Social Security Calculator',    href: '/social-security-calculator'    },
      { name: 'RMD Calculator',                href: '/rmd-calculator'                },
      { name: 'Pension Calculator',            href: '/pension-calculator'            },
      { name: 'Annuity Calculator',            href: '/annuity-calculator'            },
      { name: 'FIRE Calculator',               href: '/fire-calculator'               },
      { name: 'FIRE Retirement Calculator',    href: '/fire-retirement-calculator'    },
      { name: 'Retirement Savings Calculator', href: '/retirement-savings-calculator' },
    ],
  },
  {
    label: 'Tax & Salary', icon: '🧾',
    tools: [
      { name: 'Income Tax Calculator',        href: '/tax-calculator'                  },
      { name: 'Salary After Tax',             href: '/salary-after-tax-calculator'     },
      { name: 'Paycheck Calculator',          href: '/paycheck-calculator'             },
      { name: 'Capital Gains Tax',            href: '/capital-gains-tax-calculator'    },
      { name: 'Self-Employment Tax',          href: '/self-employment-tax-calculator'  },
      { name: 'Payroll Tax Calculator',       href: '/payroll-tax-calculator'          },
      { name: 'Tax Refund Calculator',        href: '/tax-refund-calculator'           },
      { name: 'Hourly to Salary',             href: '/hourly-to-salary-calculator'     },
      { name: 'Salary to Hourly',             href: '/salary-to-hourly-calculator'     },
      { name: 'Overtime Pay Calculator',      href: '/overtime-pay-calculator'         },
      { name: 'Commission Calculator',        href: '/commission-calculator'           },
      { name: 'Freelance Rate Calculator',    href: '/freelance-rate-calculator'       },
    ],
  },
  {
    label: 'Investing', icon: '📈',
    tools: [
      { name: 'Investment Return Calculator', href: '/investment-return-calculator'     },
      { name: 'Portfolio Growth Calculator',  href: '/portfolio-growth-calculator'      },
      { name: 'Portfolio Rebalancing',        href: '/portfolio-rebalancing-calculator' },
      { name: 'Dollar Cost Averaging',        href: '/dollar-cost-averaging-calculator' },
      { name: 'Passive Income Calculator',    href: '/passive-income-calculator'        },
      { name: 'Dividend Calculator',          href: '/dividend-calculator'              },
      { name: 'Stock Profit Calculator',      href: '/stock-profit-calculator'          },
      { name: 'Bond Yield Calculator',        href: '/bond-yield-calculator'            },
      { name: 'CD Calculator',               href: '/cd-calculator'                    },
      { name: 'Savings Goal Calculator',      href: '/savings-goal-calculator'          },
    ],
  },
  {
    label: 'Business', icon: '🏢',
    tools: [
      { name: 'Profit Margin Calculator',     href: '/profit-margin-calculator'         },
      { name: 'Break-Even Calculator',        href: '/break-even-calculator'            },
      { name: 'ROI Calculator',               href: '/roi-calculator'                   },
      { name: 'Business Valuation',           href: '/business-valuation-calculator'    },
      { name: 'Cash Flow Calculator',         href: '/cash-flow-calculator'             },
      { name: 'Working Capital Calculator',   href: '/working-capital-calculator'       },
      { name: 'Employee Cost Calculator',     href: '/employee-cost-calculator'         },
      { name: 'Startup Cost Calculator',      href: '/startup-cost-calculator'          },
      { name: 'Ecommerce Profit Calculator',  href: '/ecommerce-profit-calculator'      },
      { name: 'SaaS Metrics Calculator',      href: '/saas-metrics-calculator'          },
      { name: 'Invoice Calculator',           href: '/invoice-calculator'               },
      { name: 'Markup Calculator',            href: '/markup-calculator'                },
    ],
  },
  {
    label: 'Auto & More', icon: '🚗',
    tools: [
      { name: 'Car Loan Calculator',          href: '/car-loan-calculator'           },
      { name: 'Car Affordability Calculator', href: '/car-affordability-calculator'  },
      { name: 'Car Depreciation Calculator',  href: '/car-depreciation-calculator'   },
      { name: 'Lease vs Buy Calculator',      href: '/lease-vs-buy-calculator'       },
      { name: 'Fuel Cost Calculator',         href: '/fuel-cost-calculator'          },
      { name: 'Boat Loan Calculator',         href: '/boat-loan-calculator'          },
      { name: 'RV Loan Calculator',           href: '/rv-loan-calculator'            },
      { name: 'Truck Loan Calculator',        href: '/truck-loan-calculator'         },
      { name: 'Budget Planner',               href: '/budget-planner-calculator'     },
      { name: 'Net Worth Calculator',         href: '/net-worth-calculator'          },
      { name: 'Wedding Budget Calculator',    href: '/wedding-budget-calculator'     },
      { name: 'Currency Converter',           href: '/currency-converter'            },
    ],
  },
]

export default function Header() {
  const { currency, setCurrency } = useCurrency()
  const [menuOpen, setMenuOpen]   = useState(false)
  const [expanded, setExpanded]   = useState(null)
  const [curOpen, setCurOpen]     = useState(false)
  const activeCur = CURRENCIES.find(c => c.code === currency) || CURRENCIES[0]

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    if (!menuOpen) setExpanded(null)
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <header style={{
        background: 'rgba(10,12,20,0.97)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(20px)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        height: '56px',
      }}>
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-base"
              style={{background:'#f0c842', color:'#0a0c14'}}>F</div>
            <span className="font-black text-white text-lg tracking-tight">FreeFinCalc</span>
          </a>

          {/* Right controls */}
          <div className="flex items-center gap-2">

            {/* Blog link — desktop only */}
            <a href="/blog"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition-colors">
              📖 Blog
            </a>

            {/* Currency picker */}
            <div className="relative">
              <button
                onClick={() => { setCurOpen(v => !v) }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold"
                style={{
                  background: 'rgba(240,200,66,0.1)',
                  border: '1px solid rgba(240,200,66,0.3)',
                  color: '#f0c842',
                }}>
                <span>{activeCur.symbol}</span>
                <span>{activeCur.code}</span>
                <span style={{fontSize:'7px', opacity:0.6}}>{curOpen ? '▲' : '▼'}</span>
              </button>

              {curOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setCurOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 z-50 rounded-2xl overflow-hidden"
                    style={{
                      background: '#0f1220',
                      border: '1px solid rgba(255,255,255,0.1)',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
                      width: '210px',
                      maxHeight: '280px',
                      overflowY: 'auto',
                    }}>
                    <div className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider"
                      style={{borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
                      Select Currency
                    </div>
                    {CURRENCIES.map(cur => (
                      <button
                        key={cur.code}
                        onClick={() => { setCurrency(cur.code); setCurOpen(false) }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-left hover:bg-white/5 transition-colors"
                        style={{color: currency === cur.code ? '#f0c842' : '#94a3b8'}}>
                        <span className="font-bold w-6 shrink-0 text-center">{cur.symbol}</span>
                        <span>{cur.code} — {cur.label}</span>
                        {currency === cur.code && <span className="ml-auto text-yellow-400">✓</span>}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Open menu"
              className="flex flex-col justify-center items-center w-10 h-10 rounded-xl gap-1.5 transition-all"
              style={{
                background: menuOpen ? 'rgba(240,200,66,0.12)' : 'rgba(255,255,255,0.06)',
                border: menuOpen ? '1px solid rgba(240,200,66,0.3)' : '1px solid rgba(255,255,255,0.08)',
              }}>
              <span style={{
                display:'block', width:'18px', height:'2px', borderRadius:'2px',
                background: menuOpen ? '#f0c842' : '#94a3b8',
                transition:'all 0.25s',
                transform: menuOpen ? 'translateY(5px) rotate(45deg)' : 'none',
              }} />
              <span style={{
                display:'block', width:'18px', height:'2px', borderRadius:'2px',
                background: menuOpen ? '#f0c842' : '#94a3b8',
                transition:'all 0.25s',
                opacity: menuOpen ? 0 : 1,
              }} />
              <span style={{
                display:'block', width:'18px', height:'2px', borderRadius:'2px',
                background: menuOpen ? '#f0c842' : '#94a3b8',
                transition:'all 0.25s',
                transform: menuOpen ? 'translateY(-5px) rotate(-45deg)' : 'none',
              }} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Hamburger drawer ────────────────────────────────────────────── */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40"
            style={{background:'rgba(0,0,0,0.65)', backdropFilter:'blur(4px)'}}
            onClick={() => setMenuOpen(false)} />

          {/* Right-side drawer */}
          <div className="fixed top-0 right-0 h-full z-50 flex flex-col"
            style={{
              width: 'min(380px, 100vw)',
              background: '#0c0f19',
              borderLeft: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '-20px 0 60px rgba(0,0,0,0.6)',
              overflowY: 'auto',
            }}>

            {/* Drawer top bar */}
            <div className="flex items-center justify-between px-5 py-4 shrink-0"
              style={{borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
              <div>
                <div className="text-white font-bold">All Calculators</div>
                <div className="text-slate-500 text-xs mt-0.5">124 free financial tools</div>
              </div>
              <button onClick={() => setMenuOpen(false)}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                style={{background:'rgba(255,255,255,0.06)', fontSize:'16px'}}>
                ✕
              </button>
            </div>

            {/* Quick links */}
            <div className="px-4 pt-4 pb-2 flex flex-wrap gap-2 shrink-0">
              {[
                {label:'🏠 Home',    href:'/'},
                {label:'📖 Blog',    href:'/blog'},
                {label:'About',      href:'/about'},
                {label:'Contact',    href:'/contact'},
              ].map(l => (
                <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white transition-all"
                  style={{background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.08)'}}>
                  {l.label}
                </a>
              ))}
            </div>

            {/* Category accordion */}
            <div className="px-4 pt-2 pb-8 flex-1">
              {NAV.map((cat, i) => (
                <div key={cat.label} className="mb-2">
                  <button
                    onClick={() => setExpanded(expanded === i ? null : i)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all"
                    style={{
                      background: expanded === i ? 'rgba(240,200,66,0.09)' : 'rgba(255,255,255,0.04)',
                      border: expanded === i ? '1px solid rgba(240,200,66,0.22)' : '1px solid rgba(255,255,255,0.06)',
                    }}>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{cat.icon}</span>
                      <div className="text-left">
                        <div className="text-sm font-bold"
                          style={{color: expanded === i ? '#f0c842' : '#e2e8f0'}}>
                          {cat.label}
                        </div>
                        <div className="text-xs text-slate-500">{cat.tools.length} calculators</div>
                      </div>
                    </div>
                    <span className="text-slate-500 text-xs transition-transform duration-200 inline-block"
                      style={{transform: expanded === i ? 'rotate(180deg)' : 'none'}}>▼</span>
                  </button>

                  {expanded === i && (
                    <div className="mt-1.5 px-1">
                      <div className="grid grid-cols-2 gap-1.5">
                        {cat.tools.map(tool => (
                          <a key={tool.href} href={tool.href}
                            onClick={() => setMenuOpen(false)}
                            className="px-3 py-2.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                            style={{
                              background: 'rgba(255,255,255,0.04)',
                              border: '1px solid rgba(255,255,255,0.06)',
                              lineHeight: '1.4',
                            }}>
                            {tool.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Drawer footer */}
            <div className="px-5 py-4 shrink-0"
              style={{borderTop:'1px solid rgba(255,255,255,0.07)'}}>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 text-xs">© 2026 FreeFinCalc.net</span>
                <div className="flex gap-4">
                  <a href="/privacy-policy" onClick={() => setMenuOpen(false)}
                    className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Privacy</a>
                  <a href="/terms" onClick={() => setMenuOpen(false)}
                    className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Terms</a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
