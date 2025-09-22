import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Flight } from '@/app/types/flight'
import { Passenger } from '@/app/types/booking'
import { MapPin, Clock, Calendar, Users } from 'lucide-react'

interface BookingSummaryProps {
  flight: Flight
  passengers: Passenger[]
  selectedSeats: string[]
  totalPrice: number
}

export default function BookingSummary({ 
  flight, 
  passengers, 
  selectedSeats, 
  totalPrice 
}: BookingSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Flight Details */}
        <div className="space-y-4">
          <h3 className="font-semibold">Flight Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">From</span>
              </div>
              <p className="font-semibold">{flight.origin}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">To</span>
              </div>
              <p className="font-semibold">{flight.destination}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">Date</span>
              </div>
              <p>{flight.departureTime}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">Duration</span>
              </div>
              <p>{flight.duration}</p>
            </div>
          </div>
        </div>

        {/* Passengers */}
        <div className="space-y-3">
          <h3 className="font-semibold">Passengers</h3>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span>{passengers.length} passenger{passengers.length > 1 ? 's' : ''}</span>
          </div>
          {passengers.map((passenger, index) => (
            <div key={index} className="text-sm text-muted-foreground">
              {passenger.firstName} {passenger.lastName}
              {selectedSeats[index] && ` - Seat ${selectedSeats[index]}`}
            </div>
          ))}
        </div>

        {/* Price Breakdown */}
        <div className="space-y-2">
          <h3 className="font-semibold">Price Breakdown</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Base fare ({passengers.length} × ${flight.price})</span>
              <span>${flight.price * passengers.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes & Fees</span>
              <span>${(flight.price * 0.15 * passengers.length).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg pt-2 border-t">
              <span>Total</span>
              <span className="text-primary">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}