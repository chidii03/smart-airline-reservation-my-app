// src/app/flights/search/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/app/components/ui/button';
import FlightList from '@/app/components/flights/FlightList';
import { useFlights } from '@/app/hooks/useFlights';
import { Flight } from '@/app/types/flight';

// Define the expected shape of the search parameters
interface SearchParams {
  origin?: string;
  destination?: string;
  departureDate?: string;
  returnDate?: string;
  passengers?: string;
}

export default function SearchFlightsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { filteredFlights, loading, searchFlights } = useFlights();
  const [, setFilters] = useState<SearchParams>({});

  useEffect(() => {
    const params: SearchParams = Object.fromEntries(searchParams.entries());
    setFilters(params);

    searchFlights({
      origin: params.origin || '',
      destination: params.destination || '',
      departureDate: params.departureDate || new Date().toISOString().split('T')[0],
      returnDate: params.returnDate,
      passengers: params.passengers ? parseInt(params.passengers, 10) : 1,
    });
  }, [searchParams, searchFlights]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20"> 
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Search Results</h2>
            <p className="text-gray-600">
              {filteredFlights.length} results found
            </p>
          </div>
        </div>

        {/* Flights List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <FlightList
            flights={filteredFlights}
            isLoading={loading}
            onSelect={(flight: Flight) => router.push(`/flights/${flight.id}`)}
          />

          {filteredFlights.length === 0 && !loading && (
            <div className="text-center w-full">
              <h3>No results found for the given search.</h3>
              <Button onClick={() => router.push('/flights')}>
                Back to Flights
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}