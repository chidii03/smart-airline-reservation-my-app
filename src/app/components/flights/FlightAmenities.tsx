import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { 
  Wifi, 
  Utensils, 
  Tv, 
  Luggage, 
  Plug, 
  Snowflake,
  Wine
} from 'lucide-react'

interface Amenity {
  name: string
  icon: React.ComponentType<{ className?: string }>
  available: boolean
}

interface FlightAmenitiesProps {
  amenities: Amenity[]
}

export default function FlightAmenities({ amenities }: FlightAmenitiesProps) {
  const defaultAmenities: Amenity[] = [
    { name: 'Wi-Fi', icon: Wifi, available: true },
    { name: 'Meals', icon: Utensils, available: true },
    { name: 'Entertainment', icon: Tv, available: true },
    { name: 'Luggage', icon: Luggage, available: true },
    { name: 'Power Outlets', icon: Plug, available: true },
    { name: 'Air Conditioning', icon: Snowflake, available: true },
    { name: 'Refreshments', icon: Wine, available: true },
  ]

  const displayAmenities = amenities.length > 0 ? amenities : defaultAmenities

  return (
    <Card>
      <CardHeader>
        <CardTitle>Flight Amenities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {displayAmenities.map((amenity, index) => {
            const Icon = amenity.icon
            return (
              <div key={index} className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${amenity.available ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className={`text-sm ${amenity.available ? '' : 'text-muted-foreground line-through'}`}>
                  {amenity.name}
                </span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}