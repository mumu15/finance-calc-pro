import HomeAffordabilityIncomeClient from './Client';

export const metadata = {
  title: 'Home Affordability Calculator for $300K Income | FreeFinCalc',
  description: 'How much house can you afford on a $300K salary? Calculate your maximum home price, required down payment, and estimated monthly mortgage payment.',
  alternates: { canonical: 'https://www.freefincalc.net/home-affordability-calculator/income/300000' },
};

export default function Page({ params }) {
  return <HomeAffordabilityIncomeClient params={params} />;
}
