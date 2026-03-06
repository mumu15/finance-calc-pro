import Header from '../../../components/Header'
import AdUnit from '../../components/AdUnit'
import Footer from '../../../components/Footer'
import Link from 'next/link'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
 title: 'Home Loan EMI Calculator Pakistan 2026: Banks, Rates and Guide',
 description: 'Calculate your home loan EMI in Pakistani Rupees. Compare HBL, UBL, Meezan Bank and MCB rates. Includes Islamic vs conventional loan guide for 2026.',
}

const faqs = [
 {
 "q": "What are current home loan rates in Pakistan 2026?",
 "a": "Home loan rates in Pakistan in 2026 range from 19% to 25% depending on the lender and product type. Conventional banks charge 20-24% while Islamic banks offer Diminishing Musharakah at comparable effective rates of 21-24%."
 },
 {
 "q": "Which banks offer the best home loan in Pakistan?",
 "a": "Top home loan providers in Pakistan include Meezan Bank (Islamic), HBL, UBL, MCB, Bank Alfalah and Askari Bank. Meezan Bank is the largest Islamic home finance provider. HBL and UBL offer competitive conventional rates."
 },
 {
 "q": "What is the maximum home loan tenure in Pakistan?",
 "a": "Most Pakistani banks offer home loans for up to 20 years. Some offer up to 25 years for select premium properties. The loan must be fully repaid before the borrower reaches age 60-65 depending on the bank."
 },
 {
 "q": "What documents do I need for a home loan in Pakistan?",
 "a": "You need CNIC, salary slips for 3-6 months, bank statements for 6-12 months, income tax returns, employment letter, property documents and valuation report. Self-employed borrowers need business financial statements."
 },
 {
 "q": "What is the difference between Islamic and conventional home loans in Pakistan?",
 "a": "Islamic home finance uses Diminishing Musharakah where the bank and customer jointly own the property and the customer gradually buys the bank's share. Conventional loans charge interest directly. Both have similar effective costs but Islamic financing is Shariah-compliant."
 }
]

export default function Post() {
 return (
 <>
 <FaqSchema faqs={faqs} />
 <Header />
 <main className="max-w-4xl mx-auto px-4 py-12">
 <div className="mb-8"><Link href="/blog" className="text-sm hover:underline" style={{color:"#f0c842"}}>← Back to Blog</Link></div>
 <article>
 <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Home Loan EMI Calculator Pakistan 2026: Banks, Rates and Guide</h1>
 <p className="text-slate-400 text-sm mb-8">March 2026 · 8 min read</p>
 <div className="result-box mb-8" style={{borderColor:"rgba(240,200,66,0.3)"}}>
 <h2 className="font-bold mb-2" style={{color:"#f0c842"}}>Quick Answer</h2>
 <p className="text-white">On a PKR 50 lakh home loan at 22% for 15 years your monthly installment is approximately <strong>PKR 1,05,900</strong>. Meezan Bank's Diminishing Musharakah offers Islamic financing from <strong>21-23%</strong> effective rate.</p>
 </div>
 <div className="space-y-8">
 <section>
 <h2 className="text-2xl font-bold text-white mb-4">Pakistan Home Loan EMI Chart (22% Rate)</h2>
 <p className="text-slate-400 leading-relaxed mb-4">Monthly installment guide for common home loan amounts in Pakistan.</p>
 <div className="result-box mb-4">
 <div className="overflow-x-auto">
 <table className="w-full text-sm">
 <thead><tr className="border-b" style={{borderColor:"rgba(240,200,66,0.1)"}}><th className="text-left text-slate-400 py-2 pr-4">Loan Amount</th><th className="text-left text-slate-400 py-2 pr-4">10 Years</th><th className="text-left text-slate-400 py-2 pr-4">15 Years</th><th className="text-left text-slate-400 py-2 pr-4">20 Years</th></tr></thead>
 <tbody>
 <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">PKR 25 Lakhs</td><td className="text-slate-300 py-2 pr-4">₨ 57,200</td><td className="text-slate-300 py-2 pr-4">₨ 49,800</td><td className="text-slate-300 py-2 pr-4">₨ 46,500</td></tr>
 <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">PKR 50 Lakhs</td><td className="text-slate-300 py-2 pr-4">₨ 1,14,400</td><td className="text-slate-300 py-2 pr-4">₨ 99,600</td><td className="text-slate-300 py-2 pr-4">₨ 93,000</td></tr>
 <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">PKR 1 Crore</td><td className="text-slate-300 py-2 pr-4">₨ 2,28,800</td><td className="text-slate-300 py-2 pr-4">₨ 1,99,200</td><td className="text-slate-300 py-2 pr-4">₨ 1,86,000</td></tr>
 <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">PKR 2 Crore</td><td className="text-slate-300 py-2 pr-4">₨ 4,57,600</td><td className="text-slate-300 py-2 pr-4">₨ 3,98,400</td><td className="text-slate-300 py-2 pr-4">₨ 3,72,000</td></tr>
 <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">PKR 3 Crore</td><td className="text-slate-300 py-2 pr-4">₨ 6,86,400</td><td className="text-slate-300 py-2 pr-4">₨ 5,97,600</td><td className="text-slate-300 py-2 pr-4">₨ 5,58,000</td></tr>
 </tbody>
 </table>
 </div>
 </div>
 </section>
 <section>
 <h2 className="text-2xl font-bold text-white mb-4">Top Home Loan Banks in Pakistan 2026</h2>
 <p className="text-slate-400 leading-relaxed mb-4">Compare the leading home loan products available in Pakistan.</p>
 <div className="result-box mb-4">
 <div className="overflow-x-auto">
 <table className="w-full text-sm">
 <thead><tr className="border-b" style={{borderColor:"rgba(240,200,66,0.1)"}}><th className="text-left text-slate-400 py-2 pr-4">Bank</th><th className="text-left text-slate-400 py-2 pr-4">Type</th><th className="text-left text-slate-400 py-2 pr-4">Starting Rate</th><th className="text-left text-slate-400 py-2 pr-4">Max Tenure</th></tr></thead>
 <tbody>
 <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">Meezan Bank</td><td className="text-slate-300 py-2 pr-4">Islamic (DM)</td><td className="text-slate-300 py-2 pr-4">21%</td><td className="text-slate-300 py-2 pr-4">20 years</td></tr>
 <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">HBL</td><td className="text-slate-300 py-2 pr-4">Conventional</td><td className="text-slate-300 py-2 pr-4">21%</td><td className="text-slate-300 py-2 pr-4">20 years</td></tr>
 <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">UBL</td><td className="text-slate-300 py-2 pr-4">Conventional</td><td className="text-slate-300 py-2 pr-4">21.5%</td><td className="text-slate-300 py-2 pr-4">20 years</td></tr>
 <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">MCB Bank</td><td className="text-slate-300 py-2 pr-4">Conventional</td><td className="text-slate-300 py-2 pr-4">22%</td><td className="text-slate-300 py-2 pr-4">15 years</td></tr>
 <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">Bank Alfalah</td><td className="text-slate-300 py-2 pr-4">Both</td><td className="text-slate-300 py-2 pr-4">21-22%</td><td className="text-slate-300 py-2 pr-4">20 years</td></tr>
 <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.05)"}}><td className="text-white py-2 pr-4">Askari Bank</td><td className="text-slate-300 py-2 pr-4">Conventional</td><td className="text-slate-300 py-2 pr-4">22%</td><td className="text-slate-300 py-2 pr-4">20 years</td></tr>
 </tbody>
 </table>
 </div>
 </div>
 </section>
 <section>
 <h2 className="text-2xl font-bold text-white mb-4">Mera Pakistan Mera Ghar Scheme</h2>
 <p className="text-slate-400 leading-relaxed mb-4">The government of Pakistan offers subsidised home financing under Mera Pakistan Mera Ghar (MPMG) scheme through the State Bank. Loans up to PKR 6 million are available at subsidised rates of 5-7% for low-income first-time buyers. The scheme targets families with monthly income under PKR 100,000. Check with your bank whether this scheme is currently active and funded.</p>
 </section>
 <section>
 <h2 className="text-2xl font-bold text-white mb-4">Calculate Your Home Loan Installment Free</h2>
 <p className="text-slate-400 leading-relaxed mb-4">Use our free mortgage calculator — select PKR Pakistani Rupee from the currency menu.</p>
 <a href="/mortgage-calculator" className="btn-primary inline-block px-6 py-3">Calculate EMI Free →</a>
 </section>

 <AdUnit slot="3248634657" />

 <section>
 <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
 <div className="space-y-4">{faqs.map((faq,i)=>(<div key={i} className="result-box"><h3 className="text-white font-bold mb-2">{faq.q}</h3><p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p></div>))}</div>
 </section>

 <section>
 <h2 className="text-2xl font-bold text-white mb-4">Related Calculators</h2>
 <div className="flex flex-wrap gap-3">
 <a href="/mortgage-calculator" className="hover:underline text-sm" style={{color:"#f0c842"}}>Mortgage Calculator</a>
 <a href="/loan-calculator" className="hover:underline text-sm" style={{color:"#f0c842"}}>Loan Calculator</a>
 <a href="/savings-calculator" className="hover:underline text-sm" style={{color:"#f0c842"}}>Savings Calculator</a>
 </div>
 </section>
 </div>
 </article>
 </main>
 <Footer />
 </>
 )
}
