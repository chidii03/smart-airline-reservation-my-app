import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Badge } from '@/app/components/ui/badge'
import { MoreHorizontal } from 'lucide-react'

// Define the type for the component props
interface RecentBookingsProps {
  limit: number;
}

const recentBookings = [
  {
    id: 'BK001',
    customer: 'Sarah Johnson',
    flight: 'EWR → LAX',
    date: '2024-01-15',
    status: 'confirmed',
    amount: 450
  },
  {
    id: 'BK002',
    customer: 'Michael Chen',
    flight: 'JFK → LHR',
    date: '2024-01-14',
    status: 'pending',
    amount: 890
  },
  {
    id: 'BK003',
    customer: 'Emily Rodriguez',
    flight: 'SFO → CDG',
    date: '2024-01-13',
    status: 'confirmed',
    amount: 720
  },
  {
    id: 'BK004',
    customer: 'David Kim',
    flight: 'LAX → NRT',
    date: '2024-01-12',
    status: 'cancelled',
    amount: 1250
  },
  {
    id: 'BK005',
    customer: 'Jessica Williams',
    flight: 'ORD → MIA',
    date: '2024-01-11',
    status: 'confirmed',
    amount: 380
  }
]

export default function RecentBookings({ limit }: RecentBookingsProps) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'confirmed': return 'success'
      case 'pending': return 'warning'
      case 'cancelled': return 'destructive'
      default: return 'outline'
    }
  }

  // Slice the bookings array to show only the number of bookings specified by the `limit`
  const limitedBookings = recentBookings.slice(0, limit);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Bookings</CardTitle>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {limitedBookings.map((booking) => (
            <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{booking.id}</span>
                  <Badge variant={getStatusVariant(booking.status)}>
                    {booking.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{booking.customer}</p>
                <p className="text-sm">{booking.flight}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">${booking.amount}</p>
                <p className="text-sm text-muted-foreground">{booking.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
