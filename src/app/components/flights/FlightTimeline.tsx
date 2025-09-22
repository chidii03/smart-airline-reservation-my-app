import { Card, CardContent } from '@/app/components/ui/card'
import { Clock, Calendar, MapPin } from 'lucide-react'

interface TimelineEvent {
  time: string
  date: string
  location: string
  description: string
  type: 'departure' | 'arrival' | 'layover'
}

interface FlightTimelineProps {
  events: TimelineEvent[]
}

export default function FlightTimeline({ events }: FlightTimelineProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={index} className="flex gap-4">
              {/* Timeline line */}
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full ${
                  event.type === 'departure' ? 'bg-green-500' :
                  event.type === 'arrival' ? 'bg-blue-500' : 'bg-yellow-500'
                }`}></div>
                {index < events.length - 1 && (
                  <div className="w-0.5 h-16 bg-border flex-1"></div>
                )}
              </div>

              {/* Event content */}
              <div className="flex-1 pb-6">
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{event.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{event.location}</span>
                </div>

                <p className="text-sm text-muted-foreground">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}