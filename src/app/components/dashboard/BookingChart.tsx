"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'

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

export default function BookingChart() {
  return (
    <Card>
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