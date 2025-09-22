import DealList from '@/app/components/flights/DealList';
import { apiClient } from '@/app/lib/api'; 
import { Flight } from '@/app/types/flight'; 

export default async function DealsPage() {
  const response = await apiClient.getSpecialDeals();
  const deals: Flight[] = response.data;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Special Flight Deals</h1>
        <p className="text-gray-600 mt-2">
          Exclusive offers and discounts on your next journey
        </p>
      </div>
      <DealList deals={deals} />
    </div>
  );
}

export const metadata = {
  title: 'Special Flight Deals | Airline',
  description: 'Discover exclusive flight deals and special offers for your next trip.',
};