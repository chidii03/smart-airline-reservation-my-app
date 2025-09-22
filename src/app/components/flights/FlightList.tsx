// components/flights/FlightList.tsx
import { Flight } from '@/app/types/flight'
import FlightCard from './FlightCard'

interface FlightListProps {
  flights: Flight[]
  isLoading: boolean
  // Renamed the prop to 'onSelect' to match the parent component
  onSelect: (flight: Flight) => void
}

export default function FlightList({ flights, isLoading, onSelect }: FlightListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="animate-pulse bg-gray-200 rounded-lg p-6 h-32"></div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {flights.map(flight => (
        <div 
          key={flight.id} 
          // Changed the function call to use the corrected prop name
          onClick={() => onSelect(flight)}
          className="cursor-pointer"
        >
          <FlightCard flight={flight} />
        </div>
      ))}
    </div>
  )
}