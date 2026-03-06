'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TrustSection from '../../components/TrustSection'
import PdfDownload from '../../components/PdfDownload'
import { useCurrency } from '../../components/CurrencyContext'

export default function Calculator() {
  const { fmt } = useCurrency()
  const [faceValue, setFaceValue] = useState(1000)
  const [couponRate, setCouponRate] = useState(5)
  const [marketPrice, setMarketPrice] = useState(950)
  const [yearsToMaturity, setYearsToMaturity] = useState(10)
  const [payFreq, setPayFreq] = useState(2)

  const result = useMemo(() => {
    try {
      const annualCoupon  = faceValue * (couponRate / 100)
      const couponPayment = annualCoupon / payFreq
      const currentYield  = (annualCoupon / marketPrice * 100).toFixed(3) + '%'
      const n = yearsToMaturity * payFreq
      // YTM via Newton approximation
      let ytm = couponRate / 100 / payFreq
      for (let i = 0; i < 200; i++) {
        const pv = couponPayment * (1 - Math.pow(1+ytm,-n)) / ytm + faceValue * Math.pow(1+ytm,-n)
        const dPv = -couponPayment * n * Math.pow(1+ytm,-n-1) / ytm
                  + couponPayment * (1 - Math.pow(1+ytm,-n)) / (ytm*ytm)
                  - faceValue * n * Math.pow(1+ytm,-n-1)
        const delta = (pv - marketPrice) / dPv
        ytm -= delta
        if (Math.abs(delta) < 1e-10) break
      }
      const ytmAnnual = (ytm * payFreq * 100).toFixed(3) + '%'
      const premDisc  = marketPrice < faceValue ? 'Discount' : marketPrice > faceValue ? 'Premium' : 'Par'
      const totalReturn = (annualCoupon * yearsToMaturity + (faceValue - marketPrice))
      return { annualCoupon, currentYield, ytmAnnual, premDisc, totalReturn }
    } catch(e) { return null }
  }, [faceValue, couponRate, marketPrice, yearsToMaturity, payFreq])

  const pdfRows = result ? [
    { label: 'Annual Coupon Payment', value: result.annualCoupon !== undefined ? String(fmt(result.annualCoupon)) : '' },
    { label: 'Current Yield', value: result.currentYield !== undefined ? String(result.currentYield) : '' },
    { label: 'Yield to Maturity (YTM)', value: result.ytmAnnual !== undefined ? String(result.ytmAnnual) : '' },
    { label: 'Bond Trading At', value: result.premDisc !== undefined ? String(result.premDisc) : '' },
    { label: 'Total Return to Maturity', value: result.totalReturn !== undefined ? String(fmt(result.totalReturn)) : '' },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">📉</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Bond Yield Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate bond current yield, yield to maturity (YTM) and total return for any bond.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Face Value (Par Value)</label>
                  <span className="text-white font-bold text-sm">{fmt(faceValue)}</span>
                </div>
                <input type="range" min={100} max={1000000} step={100}
                  value={faceValue} onChange={e => setFaceValue(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Coupon Rate</label>
                  <span className="text-white font-bold text-sm">{`${couponRate}%`}</span>
                </div>
                <input type="range" min={0} max={20} step={0.25}
                  value={couponRate} onChange={e => setCouponRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Current Market Price</label>
                  <span className="text-white font-bold text-sm">{fmt(marketPrice)}</span>
                </div>
                <input type="range" min={50} max={200000} step={10}
                  value={marketPrice} onChange={e => setMarketPrice(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Years to Maturity</label>
                  <span className="text-white font-bold text-sm">{`${yearsToMaturity} yrs`}</span>
                </div>
                <input type="range" min={1} max={30} step={1}
                  value={yearsToMaturity} onChange={e => setYearsToMaturity(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Coupon Payment Frequency</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":1,"l":"Annual"},{"v":2,"l":"Semi-Annual"},{"v":4,"l":"Quarterly"}]).map(o => (
                    <button key={o.v} onClick={() => setPayFreq(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: payFreq === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: payFreq === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: payFreq === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Bond Yield Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Annual Coupon Payment</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.annualCoupon)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Current Yield</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.currentYield}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Yield to Maturity (YTM)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.ytmAnnual}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Bond Trading At</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.premDisc}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Return to Maturity</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalReturn)}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500 text-sm">Enter values above to see results</div>
              )}
            </div>
            <div className="p-3 rounded-xl text-xs text-slate-500 leading-relaxed"
              style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.05)'}}>
              Results are estimates for educational purposes only. Not financial or tax advice.
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Related Calculators</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

            <a href="/investment-return-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📈</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Investment Return</h3>
            </a>

            <a href="/compound-interest" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💹</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Compound Interest</h3>
            </a>

            <a href="/dividend-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💸</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Dividend Calculator</h3>
            </a>

            <a href="/roi-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💎</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">ROI Calculator</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is yield to maturity (YTM)?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">YTM is the total annualised return you earn if you buy a bond at its current price and hold it until maturity, assuming all coupon payments are reinvested at the same rate. It is the most comprehensive measure of a bond's return and accounts for both the coupon income and any capital gain or loss.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Why do bond prices fall when interest rates rise?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Bond prices and interest rates move inversely. When new bonds offer higher coupons, existing lower-coupon bonds become less attractive and must fall in price until their yield matches the market. A 1% rise in rates causes a roughly 1% drop per year of duration — a 10-year bond falls about 8-10%.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is the difference between current yield and YTM?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Current yield = annual coupon ÷ market price. It ignores the capital gain or loss at maturity. YTM includes that gain/loss spread over the remaining years. If you buy a $1,000 par bond for $950 with a 5% coupon, current yield is 5.26% but YTM is higher because you also gain $50 at maturity.</p>
            </div>
          </div>
        </div>

      </main>
      <TrustSection />
      <Footer />
    </>
  )
}
