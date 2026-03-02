import Header from '../../../components/Header'
import AdUnit from '../../components/AdUnit'
import Footer from '../../../components/Footer'
import Link from 'next/link'
import FaqSchema from '../../../components/FaqSchema'

export const metadata = {
  title: 'Loan Calculator Nigeria 2026: Banks, Rates and How to Borrow Smart',
  description: 'Calculate your loan repayment in Nigerian Naira. Compare GTBank, Access Bank, Zenith and FirstBank rates. Includes NHF mortgage guide and savings tips for 2026.',
}

const faqs = [
  {
    "q": "What are the current personal loan rates in Nigeria 2026?",
    "a": "Personal loan interest rates in Nigeria in 2026 range from 25-35% per annum from commercial banks. Microfinance banks charge higher rates. NHF (National Housing Fund) mortgage rates are subsidised at 6% for eligible contributors."
  },
  {
    "q": "What is the NHF mortgage scheme in Nigeria?",
    "a": "The National Housing Fund is a federal government mortgage scheme administered by the Federal Mortgage Bank of Nigeria (FMBN). Contributors can access mortgage loans at 6% interest rate for up to 30 years. Contribution is 2.5% of monthly basic salary for formal sector workers."
  },
  {
    "q": "Which bank gives the easiest loan in Nigeria?",
    "a": "Digital and fintech lenders like Carbon, FairMoney, Branch and PalmCredit offer quick unsecured loans with minimal documentation. Traditional banks like GTBank QuickCredit, Access Bank PayDay Loan and Zenith Bank offer salary-based loans for existing customers."
  },
  {
    "q": "Can I get a mortgage in Nigeria without NHF?",
    "a": "Yes. Commercial banks like Stanbic IBTC, First Bank and Access Bank offer conventional mortgages at 18-25% interest rates. These are significantly more expensive than NHF loans but accessible without mandatory NHF contributions."
  },
  {
    "q": "How do I improve my chances of getting a loan in Nigeria?",
    "a": "Maintain a good credit score with the Credit Bureau. Have a verifiable source of income. Keep your debt-to-income ratio below 40%. Reduce existing loan obligations before applying. Long-term customers of a bank often get preferential treatment."
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Loan Calculator Nigeria 2026: Banks, Rates and How to Borrow Smart</h1>
          <p className="text-slate-400 text-sm mb-8">March 2026 · 8 min read</p>
          <div className="result-box mb-8" style={{borderColor:'rgba(240,200,66,0.3)'}}>
            <h2 className="font-bold mb-2" style={{color:'#f0c842'}}>Quick Answer</h2>
            <p className="text-white">Personal loan rates in Nigeria in 2026 range from <strong&gt;25% to 35% per annum</strong>. On a ₦5 million loan at 28% for 3 years your monthly repayment is approximately <strong>₦217,000</strong>. NHF mortgage rates are as low as <strong>6% per annum</strong>.</p>
          </div>
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Nigeria Loan Repayment Chart (28% Rate)</h2>
              <p className="text-slate-400 leading-relaxed mb-4">Monthly repayment guide for common loan amounts in Nigeria.</p>
              <div className="result-box mb-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b" style={{borderColor:'rgba(240,200,66,0.1)'}}><th className="text-left text-slate-400 py-2 pr-4">Loan Amount</th><th className="text-left text-slate-400 py-2 pr-4">1 Year</th><th className="text-left text-slate-400 py-2 pr-4">2 Years</th><th className="text-left text-slate-400 py-2 pr-4">3 Years</th><th className="text-left text-slate-400 py-2 pr-4">5 Years</th></tr></thead>
                    <tbody>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">₦500,000</td><td className="text-slate-300 py-2 pr-4">₦48,900</td><td className="text-slate-300 py-2 pr-4">₦28,400</td><td className="text-slate-300 py-2 pr-4">₦21,400</td><td className="text-slate-300 py-2 pr-4">₦15,700</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">₦1,000,000</td><td className="text-slate-300 py-2 pr-4">₦97,800</td><td className="text-slate-300 py-2 pr-4">₦56,800</td><td className="text-slate-300 py-2 pr-4">₦42,800</td><td className="text-slate-300 py-2 pr-4">₦31,400</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">₦2,000,000</td><td className="text-slate-300 py-2 pr-4">₦195,600</td><td className="text-slate-300 py-2 pr-4">₦113,600</td><td className="text-slate-300 py-2 pr-4">₦85,600</td><td className="text-slate-300 py-2 pr-4">₦62,800</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">₦5,000,000</td><td className="text-slate-300 py-2 pr-4">₦489,000</td><td className="text-slate-300 py-2 pr-4">₦284,000</td><td className="text-slate-300 py-2 pr-4">₦214,000</td><td className="text-slate-300 py-2 pr-4">₦157,000</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">₦10,000,000</td><td className="text-slate-300 py-2 pr-4">₦978,000</td><td className="text-slate-300 py-2 pr-4">₦568,000</td><td className="text-slate-300 py-2 pr-4">₦428,000</td><td className="text-slate-300 py-2 pr-4">₦314,000</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">NHF Mortgage vs Commercial Mortgage Comparison</h2>
              <p className="text-slate-400 leading-relaxed mb-4">The NHF scheme is by far the cheapest mortgage option in Nigeria for eligible contributors.</p>
              <div className="result-box mb-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b" style={{borderColor:'rgba(240,200,66,0.1)'}}><th className="text-left text-slate-400 py-2 pr-4">Feature</th><th className="text-left text-slate-400 py-2 pr-4">NHF Mortgage</th><th className="text-left text-slate-400 py-2 pr-4">Commercial Mortgage</th></tr></thead>
                    <tbody>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">Interest Rate</td><td className="text-slate-300 py-2 pr-4">6% per annum</td><td className="text-slate-300 py-2 pr-4">18-25% per annum</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">Maximum Loan</td><td className="text-slate-300 py-2 pr-4">₦15 million</td><td className="text-slate-300 py-2 pr-4">Up to ₦200 million</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">Maximum Tenure</td><td className="text-slate-300 py-2 pr-4">30 years</td><td className="text-slate-300 py-2 pr-4">20 years</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">Eligibility</td><td className="text-slate-300 py-2 pr-4">NHF contributors only</td><td className="text-slate-300 py-2 pr-4">Based on income</td></tr>
                      <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.05)'}}><td className="text-white py-2 pr-4">Monthly on ₦5M (20yr)</td><td className="text-slate-300 py-2 pr-4">₦35,827</td><td className="text-slate-300 py-2 pr-4">₦93,000-₦108,000</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Calculate Your Loan Repayment Free</h2>
              <p className="text-slate-400 leading-relaxed mb-4">Use our free loan calculator — select ₦ Nigerian Naira from the currency menu.</p>
              <a href="/loan-calculator" className="btn-primary inline-block px-6 py-3">Calculate Loan →</a>
            </section>

            <AdUnit slot="3248634657" />

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">{faqs.map((faq,i)=&gt;(<div key={i} className="result-box"><h3 className="text-white font-bold mb-2">{faq.q}</h3><p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p></div>))}</div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Related Calculators</h2>
              <div className="flex flex-wrap gap-3">
                <a href="/loan-calculator" className="hover:underline text-sm" style={{color:'#f0c842'}}>Loan Calculator</a>
            <a href="/savings-calculator" className="hover:underline text-sm" style={{color:'#f0c842'}}>Savings Calculator</a>
            <a href="/debt-payoff-calculator" className="hover:underline text-sm" style={{color:'#f0c842'}}>Debt Payoff Calculator</a>
              </div>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
