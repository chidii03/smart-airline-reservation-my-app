import { Flight } from '@/app/types/flight';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import Link from 'next/link';

interface DealListProps {
  deals: Flight[];
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price);
};

export default function DealList({ deals }: DealListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {deals.length > 0 ? (
        deals.map((flight) => (
          <Card key={flight.id} className="hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-lg font-semibold text-gray-900">{flight.airline}</div>
                <div className="text-2xl font-bold text-red-600">
                  {formatPrice(flight.price)}
                </div>
              </div>
              <div className="text-sm text-gray-500 mb-2">
                <span className="font-medium text-gray-700">From:</span> {flight.departureCity}
              </div>
              <div className="text-sm text-gray-500 mb-4">
                <span className="font-medium text-gray-700">To:</span> {flight.arrivalCity}
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-6">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {/* You may want to display a date range for the deal here */}
                Travel Period: Anytime
              </div>
              <Link href={`/flights/${flight.id}`} passHref>
                <Button className="w-full">View Deal</Button>
              </Link>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500">
          No special deals available at the moment.
        </div>
      )}
    </div>
  );
}