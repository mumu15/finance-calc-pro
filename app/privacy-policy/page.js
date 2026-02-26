import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Privacy Policy – FreeFinCalc.net',
  description: 'Privacy Policy for FreeFinCalc.net — free online financial calculators.',
}

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
        <div className="space-y-6 text-slate-400 leading-relaxed">
          <p>Last updated: February 2026</p>
          <p>FreeFinCalc.net does not collect any personally identifiable information. All calculations are processed entirely in your browser and never sent to our servers.</p>
          <p>We use Google AdSense to display advertisements. Google may use cookies to serve personalized ads. You can opt out at Google Ads Settings.</p>
          <p>We may collect anonymous usage data such as page views through Google Analytics.</p>
          <p>Our calculators are for informational purposes only and do not constitute financial advice.</p>
          <p>Contact us at: <a href="/contact" className="text-yellow-400">contact page</a></p>
        </div>
      </main>
      <Footer />
    </>
  )
}