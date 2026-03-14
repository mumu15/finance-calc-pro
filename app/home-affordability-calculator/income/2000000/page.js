import HomeAffordabilityIncomeClient from './Client';

export const metadata = {
  title: 'Home Affordability Calculator for $2M Income | FreeFinCalc',
  description: 'How much house can you afford on a $2M salary? Calculate your maximum home price, required down payment, and estimated monthly mortgage payment.',
  alternates: { canonical: 'https://www.freefincalc.net/home-affordability-calculator/income/2000000' },
};

export default function Page({ params }) {
  return <HomeAffordabilityIncomeClient params={params} />;
}
