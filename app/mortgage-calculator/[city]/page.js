import MortgageCityClient from './Client';

export async function generateStaticParams() {
  const cities = ["new-york","los-angeles","chicago","houston","phoenix","philadelphia","san-antonio","san-diego","dallas","san-jose","austin","jacksonville","fort-worth","columbus","charlotte","indianapolis","san-francisco","seattle","denver","nashville","oklahoma-city","el-paso","washington-dc","las-vegas","louisville","memphis","portland","baltimore","milwaukee","albuquerque","tucson","fresno","sacramento","kansas-city","mesa","omaha","raleigh","colorado-springs","long-beach","virginia-beach","minneapolis","tampa","new-orleans","arlington","bakersfield","honolulu","anaheim","aurora","santa-ana","corpus-christi"];
  return cities.map(city => ({ city }));
}

export async function generateMetadata({ params }) {
  return {
    alternates: { canonical: `https://www.freefincalc.net/mortgage-calculator/${params.city}` },
  };
}

export default function Page({ params }) {
  return <MortgageCityClient params={params} />;
}
