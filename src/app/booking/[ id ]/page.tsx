// booking/[id]/page.tsx
import { notFound } from 'next/navigation';
import { apiClient } from '@/app/lib/api';
import BookingStepperWrapper from '@/app/components/booking/BookingStepperWrapper';
import { Flight } from '@/app/types/flight'; 

interface PageProps {
  params: { id: string };
}

export default async function BookingPage({ params }: PageProps) {
  const { id } = params;

  let flight: Flight | null = null;
  try {
    const response = await apiClient.getFlightById(id);
    flight = response.data;
  } catch (error) {
    console.error('Failed to fetch flight:', error);
  }

  if (!flight) {
    return notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <BookingStepperWrapper flight={flight} />
    </div>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = params;

  let flight: Flight | null = null;
  try {
    const response = await apiClient.getFlightById(id);
    flight = response.data;
  } catch (error) {
    console.error('Failed to fetch flight for metadata:', error);
    return {
      title: 'Booking | Flight Not Found',
    };
  }

  return {
    title: `Book Flight ${flight?.flightNumber} | ${flight?.origin} to ${flight?.destination}`,
  };
}