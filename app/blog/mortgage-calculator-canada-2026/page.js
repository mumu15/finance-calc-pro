import Header from '../../../components/Header'
import AdUnit from '../../components/AdUnit'
import Footer from '../../../components/Footer'
import Link from 'next/link'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
 title: 'Mortgage Calculator Canada 2026: Monthly Payments, CMHC and RRSP',
 description: 'Calculate your Canadian mortgage payment in CAD. Includes CMHC insurance, First Home Savings Account, RRSP Home Buyers Plan and current rates for 2026.',
}

const faqs = [
 {
 "q": "What are current Canadian mortgage rates in 2026?",
 "a": "Canadian mortgage rates in 2026 range from approximately 4.5% to 6.5%. Five-year fixed rates from the Big Six banks average around 4.8-5.4%. Variable rates are typically linked to the Bank of Canada prime rate. Brokers and online lenders often offer lower rates than direct bank channels."
 },
 {
 "q": "What is CMHC mortgage insurance in Canada?",
 "a": "CMHC (Canada Mortgage and Housing Corporation) mortgage default insurance is required for high-ratio mortgages where the down payment is less than 20%. Premiums are 2.80% for 15-19.99% down, 3.10% for 10-14.99% down, and 4.00% for 5-9.99% down. The premium is added to your mortgage."
 },
 {
 "q": "What is the First Home Savings Account (FHSA) in Canada?",
 "a": "The FHSA allows first-time buyers to contribute up to $8,000 per year (lifetime limit $40,000) and deduct contributions from income like an RRSP. Withdrawals for a qualifying home purchase are tax-free like a TFSA. It combines the best features of both accounts."
 },
 {
 "q": "Can I use RRSP funds for a down payment in Canada?",
 "a": "Yes. The RRSP Home Buyers Plan allows first-time buyers to withdraw up to $35,000 ($70,000 per couple) from their RRSP for a home purchase. The amount must be repaid to the RRSP over 15 years. No tax is paid on the withdrawal if used within 90 days of closing."
 },
 {
 "q": "What is the stress test for Canadian mortgages?",
 "a": "Canadian lenders must qualify borrowers at the higher of either the contracted rate plus 2% or 5.25%. For example if your rate is 5% you must qualify at 7%. This stress test ensures borrowers can handle rate increases and has reduced maximum borrowing amounts significantly."
 }
]

export default function Post() {
 return (
 <>
 <FaqSchema faqs={faqs} />
 <Header />
 <main className="max-w-4xl mx-auto px-4 py-12">
 <div className="mb-8"><Link href="/blog" className="text-sm hover:underline" style={{color:"#f0c842'}}>← Back to Blog</Link></div>
 <article>
 <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Mortgage Calculator Canada 2026: Monthly Payments, CMHC and RRSP</h1>
 <p className="text-slate-400 text-sm mb-8">March 2026 · 8 min read</p>
 <div className="result-box mb-8" style={{borderColor:"rgba(240,200,66,0.3)'}}>
 <h2 className="font-bold mb-2" style={{color:"#f0c842'}}>Quick Answer</h2>
 <p className="text-white">On a C$500,000 mortgage at 5.0% over 25 years your monthly payment is approximately <strong> C$2,908</strong>. Canada requires mortgage default insurance (CMHC) for down payments under 20%, which adds 2.8-4.0% to the mortgage.</p>
 </div>
 <div className="space-y-8">
 <section>
 <h2 className="text-2xl font-bold text-white mb-4">Canadian Mortgage Payment Chart (5.0% Rate)</h2>
 <p className="text-slate-400 leading-relaxed mb-4">Monthly payment guide for common Canadian mortgage amounts.</p>
 <div className="result-box mb-4">
 <div className="overflow-x-auto">
 <table className="w-full text-sm">
 <thead><tr className="border-b" style={{borderColor:"rgba(240,200,66,0.1)"}}><th className="text-left text-slate-400 py-2 pr-4">Mortgage Amount</th><th className="text-left text-slate-400 py-2 pr-4">20 Years</th><th className="text-left text-slate-400 py-2 pr-4">25 Years</th><th className="text-left text-slate-400 py-2 pr-4">30 Years</th></tr></thead>
 <tbody>
 <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">C$300,000</td><td className="text-slate-300 py-2 pr-4">C$1,979</td><td className="text-slate-300 py-2 pr-4">C$1,745</td><td className="text-slate-300 py-2 pr-4">C$1,610</td></tr>
 <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">C$400,000</td><td className="text-slate-300 py-2 pr-4">C$2,639</td><td className="text-slate-300 py-2 pr-4">C$2,327</td><td className="text-slate-300 py-2 pr-4">C$2,147</td></tr>
 <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">C$500,000</td><td className="text-slate-300 py-2 pr-4">C$3,299</td><td className="text-slate-300 py-2 pr-4">C$2,908</td><td className="text-slate-300 py-2 pr-4">C$2,684</td></tr>
 <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">C$600,000</td><td className="text-slate-300 py-2 pr-4">C$3,959</td><td className="text-slate-300 py-2 pr-4">C$3,490</td><td className="text-slate-300 py-2 pr-4">C$3,221</td></tr>
 <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">C$750,000</td><td className="text-slate-300 py-2 pr-4">C$4,948</td><td className="text-slate-300 py-2 pr-4">C$4,363</td><td className="text-slate-300 py-2 pr-4">C$4,026</td></tr>
 <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">C$1,000,000</td><td className="text-slate-300 py-2 pr-4">C$6,598</td><td className="text-slate-300 py-2 pr-4">C$5,817</td><td className="text-slate-300 py-2 pr-4">C$5,368</td></tr>
 </tbody>
 </table>
 </div>
 </div>
 </section>
 <section>
 <h2 className="text-2xl font-bold text-white mb-4">Canadian First Home Buyer Programs 2026</h2>
 <p className="text-slate-400 leading-relaxed mb-4">Canada offers several programs to help first-time home buyers.</p>
 <div className="result-box mb-4">
 <div className="overflow-x-auto">
 <table className="w-full text-sm">
 <thead><tr className="border-b" style={{borderColor:"rgba(240,200,66,0.1)"}}><th className="text-left text-slate-400 py-2 pr-4">Program</th><th className="text-left text-slate-400 py-2 pr-4">Benefit</th><th className="text-left text-slate-400 py-2 pr-4">Limit</th></tr></thead>
 <tbody>
 <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">First Home Savings Account (FHSA)</td><td className="text-slate-300 py-2 pr-4">Tax-deductible + tax-free withdrawal</td><td className="text-slate-300 py-2 pr-4">C$40,000 lifetime</td></tr>
 <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">RRSP Home Buyers Plan</td><td className="text-slate-300 py-2 pr-4">Tax-free RRSP withdrawal</td><td className="text-slate-300 py-2 pr-4">C$35,000 per person</td></tr>
 <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">First-Time Home Buyer Tax Credit</td><td className="text-slate-300 py-2 pr-4">Tax credit of $1,500</td><td className="text-slate-300 py-2 pr-4">All first-time buyers</td></tr>
 <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">GST/HST New Housing Rebate</td><td className="text-slate-300 py-2 pr-4">Partial GST rebate on new homes</td><td className="text-slate-300 py-2 pr-4">Homes under C$450,000</td></tr>
 <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">Home Buyers Plan (Repayment)</td><td className="text-slate-300 py-2 pr-4">Repay over 15 years</td><td className="text-slate-300 py-2 pr-4">No interest charged</td></tr>
 </tbody>
 </table>
 </div>
 </div>
 </section>
 <section>
 <h2 className="text-2xl font-bold text-white mb-4">Calculate Your Canadian Mortgage Free</h2>
 <p className="text-slate-400 leading-relaxed mb-4">Use our free mortgage calculator — select C$ Canadian Dollar from the currency menu.</p>
 <a href="/mortgage-calculator" className="btn-primary inline-block px-6 py-3">Calculate Mortgage →</a>
 </section>

 <AdUnit slot="3248634657" />

 <section>
 <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
 <div className="space-y-4">{faqs.map((faq,i)=>(<div key={i} className="result-box"><h3 className="text-white font-bold mb-2">{faq.q}</h3><p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p></div>))}</div>
 </section>

 <section>
 <h2 className="text-2xl font-bold text-white mb-4">Related Calculators</h2>
 <div className="flex flex-wrap gap-3">
 <a href="/mortgage-calculator" className="hover:underline text-sm" style={{color:"#f0c842'}}>Mortgage Calculator</a>
 <a href="/savings-calculator" className="hover:underline text-sm" style={{color:"#f0c842'}}>Savings Calculator</a>
 <a href="/retirement-calculator" className="hover:underline text-sm" style={{color:"#f0c842'}}>Retirement Calculator</a>
 </div>
 </section>
 </div>
 </article>
 </main>
 <Footer />
 </>
 )
}
