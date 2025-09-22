"use client"

import { useState, ReactNode } from 'react'
import {
  DollarSign,
  Users,
  Plane,
  Ticket,
  MoreHorizontal,
  Search,
  Plus,
  FileText,
  Settings,
  BarChart3
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Badge } from '@/app/components/ui/badge'
import { Input } from '@/app/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line
} from 'recharts'
import { cn } from '@/app/lib/utils'

interface StatsCardProps {
  title: string
  value: string | number
  icon: ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

function StatsCard({ title, value, icon, trend, className }: StatsCardProps) {
  return (
    <Card className={cn('hover:shadow-lg transition-shadow', className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {trend && (
              <p className={cn(
                'text-xs font-medium',
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              )}>
                {trend.isPositive ? '+' : ''}{trend.value}% from last month
              </p>
            )}
          </div>
          <div className="p-3 rounded-lg bg-primary/10">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function BookingChart({ className }: { className?: string }) {
  const data = [
    { month: 'Jan', bookings: 45, revenue: 12500 },
    { month: 'Feb', bookings: 52, revenue: 14200 },
    { month: 'Mar', bookings: 48, revenue: 13800 },
    { month: 'Apr', bookings: 67, revenue: 18900 },
    { month: 'May', bookings: 73, revenue: 21500 },
    { month: 'Jun', bookings: 81, revenue: 24300 },
    { month: 'Jul', bookings: 95, revenue: 28500 },
    { month: 'Aug', bookings: 88, revenue: 26400 },
    { month: 'Sep', bookings: 76, revenue: 22800 },
    { month: 'Oct', bookings: 69, revenue: 20700 },
    { month: 'Nov', bookings: 62, revenue: 18600 },
    { month: 'Dec', bookings: 78, revenue: 23400 },
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Monthly Bookings & Revenue</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="bookings" fill="#8884d8" name="Bookings" />
            <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" name="Revenue ($)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

function RevenueChart({ className }: { className?: string }) {
  const revenueData = [
    { month: 'Jan', revenue: 12500, profit: 8500 },
    { month: 'Feb', revenue: 14200, profit: 9500 },
    { month: 'Mar', revenue: 13800, profit: 9200 },
    { month: 'Apr', revenue: 18900, profit: 12500 },
    { month: 'May', revenue: 21500, profit: 14500 },
    { month: 'Jun', revenue: 24300, profit: 16500 },
    { month: 'Jul', revenue: 28500, profit: 19500 },
    { month: 'Aug', revenue: 26400, profit: 18000 },
    { month: 'Sep', revenue: 22800, profit: 15500 },
    { month: 'Oct', revenue: 20700, profit: 14000 },
    { month: 'Nov', revenue: 18600, profit: 12500 },
    { month: 'Dec', revenue: 23400, profit: 16000 },
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Revenue & Profit Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#8884d8"
              strokeWidth={2}
              name="Revenue"
            />
            <Line
              type="monotone"
              dataKey="profit"
              stroke="#82ca9d"
              strokeWidth={2}
              name="Profit"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

function RecentBookings({ className }: { className?: string }) {
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

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'confirmed': return 'success'
      case 'pending': return 'warning'
      case 'cancelled': return 'destructive'
      default: return 'outline'
    }
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Bookings</CardTitle>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentBookings.map((booking) => (
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

function UserActivity({ className }: { className?: string }) {
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

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
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

function AdminPanel() {
  const [searchTerm, setSearchTerm] = useState('')

  const users = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@email.com',
      role: 'Admin',
      status: 'active',
      joinDate: '2023-01-15'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael@email.com',
      role: 'Agent',
      status: 'active',
      joinDate: '2023-02-20'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily@email.com',
      role: 'Agent',
      status: 'inactive',
      joinDate: '2023-03-10'
    },
    {
      id: 4,
      name: 'David Kim',
      email: 'david@email.com',
      role: 'Customer',
      status: 'active',
      joinDate: '2023-04-05'
    }
  ]

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>User Management</CardTitle>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.role === 'Admin' ? 'bg-purple-100 text-purple-800' :
                    user.role === 'Agent' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {user.role}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </TableCell>
                <TableCell>{user.joinDate}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>
                        {user.status === 'active' ? 'Deactivate' : 'Activate'}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function QuickActions() {
  const actions = [
    {
      title: 'Add Flight',
      description: 'Create new flight schedule',
      icon: Plus,
      action: () => console.log('Add Flight')
    },
    {
      title: 'Generate Report',
      description: 'Create financial reports',
      icon: FileText,
      action: () => console.log('Generate Report')
    },
    {
      title: 'Manage Users',
      description: 'User administration',
      icon: Users,
      action: () => console.log('Manage Users')
    },
    {
      title: 'System Settings',
      description: 'Configure system preferences',
      icon: Settings,
      action: () => console.log('System Settings')
    },
    {
      title: 'View Analytics',
      description: 'Business intelligence',
      icon: BarChart3,
      action: () => console.log('View Analytics')
    },
    {
      title: 'Flight Operations',
      description: 'Manage flights',
      icon: Plane,
      action: () => console.log('Flight Operations')
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {actions.map((action, index) => {
            const Icon = action.icon
            return (
              <Button
                key={index}
                variant="outline"
                className="h-auto py-4 flex flex-col items-center gap-2"
                onClick={action.action}
              >
                <Icon className="w-6 h-6" />
                <span className="font-semibold">{action.title}</span>
                <span className="text-xs text-muted-foreground">{action.description}</span>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>
      {/* Stats Cards Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value="$45,231.89"
          icon={<DollarSign className="h-4 w-4 text-primary" />}
          trend={{ value: 20.1, isPositive: true }}
        />
        <StatsCard
          title="Total Bookings"
          value="1,234"
          icon={<Ticket className="h-4 w-4 text-primary" />}
          trend={{ value: 18.5, isPositive: true }}
        />
        <StatsCard
          title="Active Users"
          value="2,350"
          icon={<Users className="h-4 w-4 text-primary" />}
          trend={{ value: -5.2, isPositive: false }}
        />
        <StatsCard
          title="Flights Scheduled"
          value="576"
          icon={<Plane className="h-4 w-4 text-primary" />}
          trend={{ value: 12.3, isPositive: true }}
        />
      </div>
      {/* Charts and Recent Activity Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <BookingChart className="col-span-4" />
        <RevenueChart className="col-span-3" />
      </div>
      {/* Recent Bookings and User Activity Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <RecentBookings className="col-span-4" />
        <UserActivity className="col-span-3" />
      </div>
      {/* Admin Panel and Quick Actions Section */}
      <div className="grid gap-4 lg:grid-cols-7">
        <div className="col-span-7 lg:col-span-5">
          <AdminPanel />
        </div>
        <div className="col-span-7 lg:col-span-2">
          <QuickActions />
        </div>
      </div>
    </div>
  )
}
