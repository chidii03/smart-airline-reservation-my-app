import { Flight } from '@/app/types/flight';

interface FlightDetailProps {
  flight: Flight;
}

export default function FlightDetail({ flight }: FlightDetailProps) {
  // A helper function to format duration from minutes to HH:mm
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {flight.airline} - Flight {flight.flightNumber}
      </h1>
      <p className="text-lg text-gray-500 mb-6">
        {flight.departureCity} ({flight.departureAirportCode}) to {flight.arrivalCity} ({flight.arrivalAirportCode})
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700">
        <div>
          <p className="text-sm font-semibold text-gray-500 uppercase">Departure</p>
          <p className="text-lg font-medium">{new Date(flight.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          <p className="text-sm">{new Date(flight.departureTime).toLocaleDateString()}</p>
          <p className="text-sm">{flight.departureAirport}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm font-semibold text-gray-500 uppercase">Duration</p>
          <p className="text-lg font-medium">{formatDuration(flight.duration)}</p>
          <div className="w-full h-1 bg-gray-200 rounded-full mt-1">
            <div className="h-1 bg-red-600 rounded-full" style={{ width: '100%' }}></div>
          </div>
          <p className="text-sm text-gray-400 mt-1">Direct Flight</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-500 uppercase">Arrival</p>
          <p className="text-lg font-medium">{new Date(flight.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          <p className="text-sm">{new Date(flight.arrivalTime).toLocaleDateString()}</p>
          <p className="text-sm">{flight.arrivalAirport}</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div className="flex flex-col items-center">
          <p className="text-2xl font-bold text-red-600">${flight.price}</p>
          <p className="text-sm text-gray-500">Price</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-2xl font-bold text-gray-900">{flight.totalSeats - flight.availableSeats}</p>
          <p className="text-sm text-gray-500">Seats Taken</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-2xl font-bold text-gray-900">{flight.aircraftType}</p>
          <p className="text-sm text-gray-500">Aircraft</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-2xl font-bold text-gray-900">{flight.status.charAt(0).toUpperCase() + flight.status.slice(1)}</p>
          <p className="text-sm text-gray-500">Status</p>
        </div>
      </div>
    </div>
  );
}