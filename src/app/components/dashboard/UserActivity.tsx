import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Badge } from '@/app/components/ui/badge'

// Define the type for the component props
interface UserActivityProps {
  limit: number;
}

const activities = [
  {
    id: 1,
    user: 'Sarah Johnson',
    action: 'booked a flight',
    target: 'EWR → LAX',
    time: '2 minutes ago',
    type: 'booking'
  },
  {
    id: 2,
    user: 'Michael Chen',
    action: 'cancelled booking',
    target: 'BK002',
    time: '15 minutes ago',
    type: 'cancellation'
  },
  {
    id: 3,
    user: 'System',
    action: 'sent reminder',
    target: 'Upcoming flights',
    time: '1 hour ago',
    type: 'notification'
  },
  {
    id: 4,
    user: 'Emily Rodriguez',
    action: 'updated profile',
    target: 'Personal information',
    time: '2 hours ago',
    type: 'update'
  },
  {
    id: 5,
    user: 'David Kim',
    action: 'completed payment',
    target: 'BK005',
    time: '3 hours ago',
    type: 'payment'
  }
]

export default function UserActivity({ limit }: UserActivityProps) {
  const getTypeVariant = (type: string) => {
    switch (type) {
      case 'booking': return 'success'
      case 'cancellation': return 'destructive'
      case 'notification': return 'secondary'
      case 'update': return 'outline'
      case 'payment': return 'default'
      default: return 'outline'
    }
  }

  // Slice the activities array to show only the number of activities specified by the `limit`
  const limitedActivities = activities.slice(0, limit);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {limitedActivities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg">
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{activity.user}</span>
                  <span className="text-muted-foreground">{activity.action}</span>
                </div>
                <p className="text-sm text-muted-foreground">{activity.target}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
              <Badge variant={getTypeVariant(activity.type)}>
                {activity.type}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
