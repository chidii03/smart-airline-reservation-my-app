"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'

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

export default function RevenueChart() {
  return (
    <Card>
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