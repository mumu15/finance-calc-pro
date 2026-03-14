import HomeAffordabilityIncomeClient from './Client';

export const metadata = {
  title: 'Home Affordability Calculator for $140K Income | FreeFinCalc',
  description: 'How much house can you afford on a $140K salary? Calculate your maximum home price, required down payment, and estimated monthly mortgage payment.',
  alternates: { canonical: 'https://www.freefincalc.net/home-affordability-calculator/income/140000' },
};

export default function Page({ params }) {
  return <HomeAffordabilityIncomeClient params={params} />;
}
