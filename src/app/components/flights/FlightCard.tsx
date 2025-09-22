import { Card, CardContent } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Badge } from '@/app/components/ui/badge'
import { Flight } from '@/app/types/flight'
import { Plane, Clock, MapPin, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface FlightCardProps {
  flight: Flight
}

export default function FlightCard({ flight }: FlightCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          {/* Flight Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Plane className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold">{flight.airline}</span>
              <Badge variant="outline">{flight.flightNumber}</Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="font-semibold">{flight.origin}</span>
                </div>
                <p className="text-2xl font-bold">{flight.departureTime}</p>
                <p className="text-sm text-muted-foreground">{flight.departureTime}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="font-semibold">{flight.destination}</span>
                </div>
                <p className="text-2xl font-bold">{flight.arrivalTime}</p>
                <p className="text-sm text-muted-foreground">{flight.arrivalTime}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{flight.duration}</span>
              <ArrowRight className="w-4 h-4" />
              <span>{flight.aircraftType}</span>
            </div>
          </div>

          {/* Price & Action */}
          <div className="flex flex-col items-end gap-3">
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">${flight.price}</p>
              <p className="text-sm text-muted-foreground">per person</p>
            </div>
            
            <Button asChild>
              <Link href={`/flights/${flight.id}`}>
                Select Flight
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}