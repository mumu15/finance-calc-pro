import Header from '../../../components/Header'
import AdUnit from '../../components/AdUnit'
import Footer from '../../../components/Footer'
import Link from 'next/link'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
  title: 'Home Loan EMI Calculator India: How to Calculate Your EMI (2026)',
  description: 'Calculate your home loan EMI in India instantly. Includes SBI, HDFC and ICICI interest rates, stamp duty, Section 80C tax benefits and eligibility guide for 2026.',
}

const faqs = [
  {
    "q": "What is the current home loan interest rate in India 2026?",
    "a": "Home loan interest rates in India in 2026 range from 8.35% to 9.5% depending on the lender and your credit score. SBI offers rates from 8.5%, HDFC from 8.45% and ICICI from 8.75% for salaried borrowers with good credit."
  },
  {
    "q": "How is home loan EMI calculated in India?",
    "a": "EMI is calculated using the formula: EMI = P × r × (1+r)^n / [(1+r)^n - 1] where P is principal, r is monthly interest rate and n is number of months. For a ₹50 lakh loan at 8.5% for 20 years the EMI is approximately ₹43,391."
  },
  {
    "q": "What is the maximum home loan I can get in India?",
    "a": "Most banks offer home loans up to 75-90% of the property value. Your eligibility depends on income, credit score and existing obligations. Generally banks allow EMI to be up to 40-50% of your net monthly income."
  },
  {
    "q": "What tax benefits are available on home loans in India?",
    "a": "Under Section 80C you can claim deduction up to ₹1.5 lakh on principal repayment. Under Section 24(b) you can claim up to ₹2 lakh on interest paid per year for self-occupied property. First-time buyers get additional ₹1.5 lakh deduction under Section 80EEA."
  },
  {
    "q": "What documents are required for a home loan in India?",
    "a": "You need KYC documents (Aadhaar, PAN), income proof (salary slips, ITR for 2-3 years), bank statements for 6 months, property documents and employment proof. Self-employed borrowers need GST returns and balance sheets."
  }
]

export default function Post() {
  return (
    <>
      <FaqSchema faqs={faqs} />
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8"><Link href="/blog" className="text-sm hover:underline" style={{color:'#f0c842'}}>← Back to Blog</Link></div>
        <article>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Home Loan EMI Calculator India: How to Calculate Your EMI (2026)</h1>
          <p className="text-slate-400 text-sm mb-8">March 2026 · 9 min read</p>
          <div className="result-box mb-8" style={{borderColor:'rgba(240,200,66,0.3)'}}>
            <h2 className="font-bold mb-2" style={{color:'#f0c842'}}>Quick Answer</h2>
            <p className="text-white">On a ₹50 lakh home loan at 8.5% for 20 years your EMI is approximately <strong &gt; ₹43,391 per month</strong>. Use our free EMI calculator to get the exact figure for your loan amount, rate and tenure.</p>
          </div>
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Home Loan EMI Chart — ₹ Lakhs (8.5% Rate)</h2>
              <p className="text-slate-400 leading-relaxed mb-4">Here is a quick reference EMI chart for common home loan amounts at 8.5% interest rate.</p>
              <div className="result-box mb-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b" style={{borderColor:'rgba(240,200,66,0.1)'}}><th className="text-left text-slate-400 py-2 pr-4">Loan Amount</th><th className="text-left text-slate-400 py-2 pr-4">10 Years</th><th className="text-left text-slate-400 py-2 pr-4">15 Years</th><th className="text-left text-slate-400 py-2 pr-4">20 Years</th><th className="text-left text-slate-400 py-2 pr-4">30 Years</th></tr></thead>
                    <tbody>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">₹20 Lakhs</td><td className="text-slate-300 py-2 pr-4">₹24,797</td><td className="text-slate-300 py-2 pr-4">₹19,693</td><td className="text-slate-300 py-2 pr-4">₹17,356</td><td className="text-slate-300 py-2 pr-4">₹15,365</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">₹30 Lakhs</td><td className="text-slate-300 py-2 pr-4">₹37,194</td><td className="text-slate-300 py-2 pr-4">₹29,539</td><td className="text-slate-300 py-2 pr-4">₹26,035</td><td className="text-slate-300 py-2 pr-4">₹23,047</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">₹50 Lakhs</td><td className="text-slate-300 py-2 pr-4">₹61,990</td><td className="text-slate-300 py-2 pr-4">₹49,231</td><td className="text-slate-300 py-2 pr-4">₹43,391</td><td className="text-slate-300 py-2 pr-4">₹38,446</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">₹75 Lakhs</td><td className="text-slate-300 py-2 pr-4">₹92,985</td><td className="text-slate-300 py-2 pr-4">₹73,847</td><td className="text-slate-300 py-2 pr-4">₹65,087</td><td className="text-slate-300 py-2 pr-4">₹57,669</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">₹1 Crore</td><td className="text-slate-300 py-2 pr-4">₹1,23,980</td><td className="text-slate-300 py-2 pr-4">₹98,463</td><td className="text-slate-300 py-2 pr-4">₹86,782</td><td className="text-slate-300 py-2 pr-4">₹76,892</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">₹1.5 Crore</td><td className="text-slate-300 py-2 pr-4">₹1,85,970</td><td className="text-slate-300 py-2 pr-4">₹1,47,694</td><td className="text-slate-300 py-2 pr-4">₹1,30,174</td><td className="text-slate-300 py-2 pr-4">₹1,15,338</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Top Home Loan Rates in India 2026</h2>
              <p className="text-slate-400 leading-relaxed mb-4">Compare current home loan interest rates from major Indian banks and HFCs.</p>
              <div className="result-box mb-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b" style={{borderColor:'rgba(240,200,66,0.1)'}}><th className="text-left text-slate-400 py-2 pr-4">Lender</th><th className="text-left text-slate-400 py-2 pr-4">Starting Rate</th><th className="text-left text-slate-400 py-2 pr-4">Processing Fee</th><th className="text-left text-slate-400 py-2 pr-4">Max Tenure</th></tr></thead>
                    <tbody>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">SBI Home Loan</td><td className="text-slate-300 py-2 pr-4">8.50%</td><td className="text-slate-300 py-2 pr-4">0.35% + GST</td><td className="text-slate-300 py-2 pr-4">30 years</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">HDFC Home Loan</td><td className="text-slate-300 py-2 pr-4">8.45%</td><td className="text-slate-300 py-2 pr-4">0.50% + GST</td><td className="text-slate-300 py-2 pr-4">30 years</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">ICICI Home Loan</td><td className="text-slate-300 py-2 pr-4">8.75%</td><td className="text-slate-300 py-2 pr-4">0.50% + GST</td><td className="text-slate-300 py-2 pr-4">30 years</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">Axis Bank</td><td className="text-slate-300 py-2 pr-4">8.75%</td><td className="text-slate-300 py-2 pr-4">1% + GST</td><td className="text-slate-300 py-2 pr-4">30 years</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">Kotak Mahindra</td><td className="text-slate-300 py-2 pr-4">8.65%</td><td className="text-slate-300 py-2 pr-4">0.50% + GST</td><td className="text-slate-300 py-2 pr-4">20 years</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">LIC Housing Finance</td><td className="text-slate-300 py-2 pr-4">8.50%</td><td className="text-slate-300 py-2 pr-4">0.25% + GST</td><td className="text-slate-300 py-2 pr-4">30 years</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">PNB Housing</td><td className="text-slate-300 py-2 pr-4">8.50%</td><td className="text-slate-300 py-2 pr-4">0.50% + GST</td><td className="text-slate-300 py-2 pr-4">30 years</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Section 80C and 24(b) Tax Benefits Explained</h2>
              <p className="text-slate-400 leading-relaxed mb-4">Home loans in India come with significant income tax benefits that effectively reduce your borrowing cost. Under Section 80C you can claim deduction up to ₹1.5 lakh per year on principal repayment. Under Section 24(b) you can claim up to ₹2 lakh per year on interest paid for a self-occupied property. Together these can save ₹1-1.5 lakh in taxes annually for someone in the 30% tax bracket — effectively reducing your net EMI burden significantly.</p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Calculate Your Home Loan EMI Free</h2>
              <p className="text-slate-400 leading-relaxed mb-4">Use our free mortgage calculator — select ₹ Indian Rupee from the currency menu for accurate EMI calculations.</p>
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
                <a href="/mortgage-calculator" className="hover:underline text-sm" style={{color:'#f0c842'}}>EMI Calculator</a>
            <a href="/loan-calculator" className="hover:underline text-sm" style={{color:'#f0c842'}}>Loan Calculator</a>
            <a href="/blog/what-is-compound-interest" className="hover:underline text-sm" style={{color:'#f0c842'}}>What is Compound Interest</a>
              </div>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
