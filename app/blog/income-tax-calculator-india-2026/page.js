import Header from '../../../components/Header'
import AdUnit from '../../components/AdUnit'
import Footer from '../../../components/Footer'
import Link from 'next/link'
import FaqSchema from '../../../components/FaqSchema'
import SchemaMarkup from '../../../components/SchemaMarkup';


export const metadata = {
 title: 'Income Tax Calculator India 2026-27: New vs Old Tax Regime',
 description: 'Calculate your income tax liability in India for FY 2026-27. Compare new vs old tax regime, tax slabs, deductions and take-home salary calculator.',
}

const faqs = [
 {
 "q": "What are the income tax slabs for FY 2026-27?",
 "a": "New regime: 0% up to ₹3L, 5% for ₹3-7L, 10% for ₹7-10L, 15% for ₹10-12L, 20% for ₹12-15L, 30% above ₹15L. Old regime: 0% up to ₹2.5L, 5% for ₹2.5-5L, 20% for ₹5-10L, 30% above ₹10L."
 },
 {
 "q": "Which is better — new or old tax regime?",
 "a": "The new regime is better if you have fewer deductions. The old regime is better if you have high deductions like HRA, 80C investments, home loan interest and NPS. If total deductions exceed ₹3.75 lakh the old regime typically saves more tax."
 },
 {
 "q": "What is the standard deduction for salaried employees in 2026?",
 "a": "The standard deduction for salaried employees is ₹75,000 under the new tax regime for FY 2026-27, increased from ₹50,000 in previous years."
 },
 {
 "q": "What is Section 87A rebate?",
 "a": "Section 87A provides a tax rebate of up to ₹25,000 under the new regime for individuals with taxable income up to ₹7 lakh. This effectively makes income up to ₹7 lakh tax-free under the new regime."
 },
 {
 "q": "How do I calculate TDS on salary?",
 "a": "TDS on salary is calculated by your employer based on your estimated annual income and deductions declared in Form 12BB. It is deducted monthly as annual tax liability divided by 12 months."
 }
]

export default function Post() {
 return (
 <>
 <FaqSchema faqs={faqs} />
 <Header />
      <SchemaMarkup breadcrumbs={[{"name":"Home","url":"https://freefincalc.net/"},{"name":"Blog","url":"https://freefincalc.net/blog"},{"name":"Income Tax Calculator India 2026","url":"https://freefincalc.net/blog/income-tax-calculator-india-2026"}]} includeReview={true} />
 <main className="max-w-4xl mx-auto px-4 py-12">
 <div className="mb-8"><Link href="/blog" className="text-sm hover:underline" style={{color:"#f0c842"}}>← Back to Blog</Link></div>
 <article>
 <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Income Tax Calculator India 2026-27: New vs Old Tax Regime</h1>
 <p className="text-slate-400 text-sm mb-8">March 2026 · 8 min read</p>
 <div className="result-box mb-8" style={{borderColor:"rgba(240,200,66,0.3)"}}>
 <h2 className="font-bold mb-2" style={{color:"#f0c842"}}>Quick Answer</h2>
 <p className="text-white">Under the <strong>new tax regime 2026</strong>, income up to ₹3 lakh is tax-free. The basic exemption is ₹3L, and a standard deduction of ₹75,000 is available. On ₹10 lakh income, new regime tax is approximately <strong> ₹54,600</strong> vs ₹1,17,000 in old regime.</p>
 </div>
 <div className="space-y-8">
 <section>
 <h2 className="text-2xl font-bold text-white mb-4">New vs Old Tax Regime Comparison 2026</h2>
 <p className="text-slate-400 leading-relaxed mb-4">Choosing the right regime can save you significant money. Here is the tax comparison at different income levels.</p>
 <div className="result-box mb-4">
 <div className="overflow-x-auto">
 <table className="w-full text-sm">
 <thead><tr className="border-b" style={{borderColor:"rgba(240,200,66,0.1)"}}><th className="text-left text-slate-400 py-2 pr-4">Annual Income</th><th className="text-left text-slate-400 py-2 pr-4">New Regime Tax</th><th className="text-left text-slate-400 py-2 pr-4">Old Regime Tax</th><th className="text-left text-slate-400 py-2 pr-4">Better Choice</th></tr></thead>
 <tbody>
 <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">₹5 Lakhs</td><td className="text-slate-300 py-2 pr-4">₹0</td><td className="text-slate-300 py-2 pr-4">₹12,500</td><td className="text-slate-300 py-2 pr-4">New Regime</td></tr>
 <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">₹7 Lakhs</td><td className="text-slate-300 py-2 pr-4">₹0 (87A rebate)</td><td className="text-slate-300 py-2 pr-4">₹25,000</td><td className="text-slate-300 py-2 pr-4">New Regime</td></tr>
 <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">₹10 Lakhs</td><td className="text-slate-300 py-2 pr-4">₹54,600</td><td className="text-slate-300 py-2 pr-4">₹1,17,000*</td><td className="text-slate-300 py-2 pr-4">Depends on deductions</td></tr>
 <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">₹12 Lakhs</td><td className="text-slate-300 py-2 pr-4">₹83,200</td><td className="text-slate-300 py-2 pr-4">₹1,40,400*</td><td className="text-slate-300 py-2 pr-4">Old if deductions over Rs 2L</td></tr>
 <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">₹15 Lakhs</td><td className="text-slate-300 py-2 pr-4">₹1,45,600</td><td className="text-slate-300 py-2 pr-4">₹2,10,600*</td><td className="text-slate-300 py-2 pr-4">Old if deductions over Rs 3L</td></tr>
 <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">₹20 Lakhs</td><td className="text-slate-300 py-2 pr-4">₹2,96,400</td><td className="text-slate-300 py-2 pr-4">₹3,37,200*</td><td className="text-slate-300 py-2 pr-4">Old if deductions over Rs 3.75L</td></tr>
 </tbody>
 </table>
 </div>
 </div>
 </section>
 <section>
 <h2 className="text-2xl font-bold text-white mb-4">Key Deductions Available in Old Tax Regime</h2>
 <p className="text-slate-400 leading-relaxed mb-4">The old tax regime allows multiple deductions that can significantly reduce your taxable income.</p>
 <div className="result-box mb-4">
 <div className="overflow-x-auto">
 <table className="w-full text-sm">
 <thead><tr className="border-b" style={{borderColor:"rgba(240,200,66,0.1)"}}><th className="text-left text-slate-400 py-2 pr-4">Section</th><th className="text-left text-slate-400 py-2 pr-4">Deduction</th><th className="text-left text-slate-400 py-2 pr-4">Maximum Amount</th></tr></thead>
 <tbody>
 <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">80C</td><td className="text-slate-300 py-2 pr-4">ELSS, PPF, EPF, LIC, home loan principal</td><td className="text-slate-300 py-2 pr-4">₹1,50,000</td></tr>
 <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">80D</td><td className="text-slate-300 py-2 pr-4">Health insurance premium</td><td className="text-slate-300 py-2 pr-4">₹25,000 (₹50,000 for senior)</td></tr>
 <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">24(b)</td><td className="text-slate-300 py-2 pr-4">Home loan interest (self-occupied)</td><td className="text-slate-300 py-2 pr-4">₹2,00,000</td></tr>
 <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">80CCD(1B)</td><td className="text-slate-300 py-2 pr-4">NPS additional contribution</td><td className="text-slate-300 py-2 pr-4">₹50,000</td></tr>
 <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">HRA</td><td className="text-slate-300 py-2 pr-4">House rent allowance</td><td className="text-slate-300 py-2 pr-4">Actual HRA or formula</td></tr>
 <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">LTA</td><td className="text-slate-300 py-2 pr-4">Leave travel allowance</td><td className="text-slate-300 py-2 pr-4">Actual travel cost</td></tr>
 </tbody>
 </table>
 </div>
 </div>
 </section>
 <section>
 <h2 className="text-2xl font-bold text-white mb-4">Calculate Your Tax Free</h2>
 <p className="text-slate-400 leading-relaxed mb-4">Use our free tax calculator — select ₹ Indian Rupee for accurate Indian tax calculations.</p>
 <a href="/tax-calculator" className="btn-primary inline-block px-6 py-3">Calculate Tax Free →</a>
 </section>

 <AdUnit slot="3248634657" />

 <section>
 <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
 <div className="space-y-4">{faqs.map((faq,i)=>(<div key={i} className="result-box"><h3 className="text-white font-bold mb-2">{faq.q}</h3><p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p></div>))}</div>
 </section>

 <section>
 <h2 className="text-2xl font-bold text-white mb-4">Related Calculators</h2>
 <div className="flex flex-wrap gap-3">
 <a href="/tax-calculator" className="hover:underline text-sm" style={{color:"#f0c842"}}>Tax Calculator</a>
 <a href="/budget-calculator" className="hover:underline text-sm" style={{color:"#f0c842"}}>Budget Calculator</a>
 <a href="/blog/home-loan-emi-calculator-india" className="hover:underline text-sm" style={{color:"#f0c842"}}>Home Loan EMI Calculator India</a>
 </div>
 </section>
 </div>
 </article>
 </main>
 <Footer />
 </>
 )
}
