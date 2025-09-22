import { Card, CardContent } from '@/app/components/ui/card'
import { MapPin, Navigation, Clock } from 'lucide-react'

interface FlightRouteProps {
  origin: string
  destination: string
  duration: string
  stops: number
}

export default function FlightRoute({ origin, destination, duration, stops }: FlightRouteProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <MapPin className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="font-semibold">{origin}</div>
              <div className="text-sm text-muted-foreground">Origin</div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-16 h-0.5 bg-primary"></div>
              <Navigation className="w-4 h-4 text-primary" />
              <div className="w-16 h-0.5 bg-primary"></div>
            </div>

            <div className="text-center">
              <MapPin className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="font-semibold">{destination}</div>
              <div className="text-sm text-muted-foreground">Destination</div>
            </div>
          </div>

          <div className="text-center">
            <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="font-semibold">{duration}</div>
            <div className="text-sm text-muted-foreground">
              {stops === 0 ? 'Non-stop' : `${stops} stop${stops > 1 ? 's' : ''}`}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}