import scenarios from '../../../../data/ciScenarios'
export async function generateMetadata({ params }) {
  const sc = scenarios.find(x => x.slug === params.scenario)
  if (!sc) return { title: 'Compound Interest Calculator' }
  const mo = sc.rate / 100 / 12
  const n  = sc.years * 12
  const fv = sc.principal * Math.pow(1 + mo, n) + (sc.monthly > 0 ? sc.monthly * (Math.pow(1 + mo, n) - 1) / mo : 0)
  return {
    title: `Compound Interest: ${sc.name} — Calculator & Results`,
    description: `See how compound interest grows ${sc.name.toLowerCase()}. Starting $${sc.principal.toLocaleString()}, ${sc.monthly > 0 ? '$' + sc.monthly + '/mo contributions, ' : ''}${sc.rate}% return — final value ~$${Math.round(fv).toLocaleString()} after ${sc.years} years.`,` },
  }
}
export default function Layout({ children }) { return children }
