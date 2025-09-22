'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart3,
  Users,
  Plane,
  DollarSign,
  TrendingUp,
  Calendar,
  Download,
  Filter
} from 'lucide-react'

// Define a type for the monthly revenue data to fix the 'any' error.
type MonthlyRevenueDataPoint = {
  month: string;
  revenue: number;
}

const RevenueChart = ({ data }: { data: MonthlyRevenueDataPoint[] }) => {
  const maxRevenue = Math.max(...data.map(d => d.revenue))
  return (
    <div className="flex items-end h-[200px] w-full gap-2">
      {data.map((d, index) => (
        <motion.div
          key={d.month}
          initial={{ height: 0 }}
          animate={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
          className="flex-1 bg-gradient-to-t from-red-500 to-red-400 rounded-lg shadow-md hover:from-red-600 hover:to-red-500 transition-colors duration-200"
          title={`${d.month}: $${d.revenue.toLocaleString()}`}
        />
      ))}
    </div>
  )
}

const BookingChart = () => {
  const mockData = [120, 150, 135, 180, 210, 195, 240, 220, 250, 260, 230, 270, 290, 310]
  const maxBookings = Math.max(...mockData)
  return (
    <div className="flex items-end h-[200px] w-full gap-2">
      {mockData.map((d, index) => (
        <motion.div
          key={index}
          initial={{ height: 0 }}
          animate={{ height: `${(d / maxBookings) * 100}%` }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
          className="flex-1 bg-gradient-to-t from-red-500 to-red-400 rounded-lg shadow-md hover:from-red-600 hover:to-red-500 transition-colors duration-200"
          title={`Day ${index + 1}: ${d} bookings`}
        />
      ))}
    </div>
  )
}

import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select'

const analyticsData = {
  overview: {
    totalRevenue: 1245231,
    totalBookings: 1234,
    activeUsers: 12458,
    occupancyRate: 78.5,
    revenueChange: 15.2,
    bookingsChange: 8.7,
    usersChange: 12.3,
    occupancyChange: 3.2
  },
  monthlyRevenue: [
    { month: 'Jan', revenue: 189000 },
    { month: 'Feb', revenue: 215000 },
    { month: 'Mar', revenue: 238000 },
    { month: 'Apr', revenue: 267000 },
    { month: 'May', revenue: 295000 },
    { month: 'Jun', revenue: 324000 },
    { month: 'Jul', revenue: 356000 },
    { month: 'Aug', revenue: 380000 },
    { month: 'Sep', revenue: 410000 },
    { month: 'Oct', revenue: 445000 },
    { month: 'Nov', revenue: 470000 },
    { month: 'Dec', revenue: 500000 }
  ],
  popularRoutes: [
    { route: 'JFK - LAX', bookings: 234, revenue: 189234 },
    { route: 'LAX - JFK', bookings: 198, revenue: 167890 },
    { route: 'ORD - MIA', bookings: 167, revenue: 134567 },
    { route: 'MIA - ORD', bookings: 145, revenue: 123456 },
    { route: 'SFO - SEA', bookings: 132, revenue: 112345 }
  ],
  customerDemographics: {
    ageGroups: [
      { group: '18-24', percentage: 12 },
      { group: '25-34', percentage: 28 },
      { group: '35-44', percentage: 24 },
      { group: '45-54', percentage: 18 },
      { group: '55+', percentage: 18 }
    ],
    regions: [
      { region: 'North America', percentage: 65 },
      { region: 'Europe', percentage: 20 },
      { region: 'Asia', percentage: 10 },
      { region: 'Other', percentage: 5 }
    ]
  }
}

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d')
  const [metric, setMetric] = useState('revenue')

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const StatCard = ({
    title,
    value,
    change,
    icon,
    isCurrency = false
  }: {
    title: string
    value: number
    change: number
    icon: React.ReactNode
    isCurrency?: boolean
  }) => (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
      className="transform hover:scale-[1.02] transition-transform duration-200"
    >
      <Card className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border-none">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{title}</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {isCurrency ? formatCurrency(value) : value.toLocaleString()}
              </p>
              <p className={`text-sm mt-2 font-semibold ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {change >= 0 ? '+' : ''}{change}% from last period
              </p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white shadow-lg">
              {icon}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-50 min-h-screen"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-500 mt-1">Comprehensive insights and business performance</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[150px] bg-white border-gray-300 rounded-lg shadow-sm">
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="ytd">Year to date</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="rounded-lg shadow-sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" className="rounded-lg shadow-sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Revenue"
            value={analyticsData.overview.totalRevenue}
            change={analyticsData.overview.revenueChange}
            icon={<DollarSign className="w-6 h-6" />}
            isCurrency
          />
          <StatCard
            title="Total Bookings"
            value={analyticsData.overview.totalBookings}
            change={analyticsData.overview.bookingsChange}
            icon={<Plane className="w-6 h-6" />}
          />
          <StatCard
            title="Active Users"
            value={analyticsData.overview.activeUsers}
            change={analyticsData.overview.usersChange}
            icon={<Users className="w-6 h-6" />}
          />
          <StatCard
            title="Occupancy Rate"
            value={analyticsData.overview.occupancyRate}
            change={analyticsData.overview.occupancyChange}
            icon={<TrendingUp className="w-6 h-6" />}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-none">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-gray-700" />
                  <CardTitle>{metric === 'revenue' ? 'Revenue Analytics' : 'Booking Trends'}</CardTitle>
                </div>
                <Select value={metric} onValueChange={setMetric}>
                  <SelectTrigger className="w-[150px] bg-white border-gray-300 rounded-lg shadow-sm">
                    <SelectValue placeholder="Select Metric" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="revenue">Revenue</SelectItem>
                    <SelectItem value="bookings">Bookings</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <CardDescription>
                {metric === 'revenue' ? 'Monthly revenue performance and trends' : 'Daily booking volume'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {metric === 'revenue' ? (
                <RevenueChart data={analyticsData.monthlyRevenue} />
              ) : (
                <BookingChart />
              )}
            </CardContent>
          </Card>

          {/* Popular Routes */}
          <Card className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-none">
            <CardHeader>
              <CardTitle>Popular Routes</CardTitle>
              <CardDescription>Top performing flight routes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.popularRoutes.map((route, index) => (
                  <motion.div
                    key={route.route}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <span className="w-8 h-8 bg-red-100 text-red-600 rounded-full font-medium flex items-center justify-center mr-3 text-sm shadow-md">
                        {index + 1}
                      </span>
                      <span className="font-medium text-gray-800">{route.route}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-800">{route.bookings} bookings</div>
                      <div className="text-sm text-green-600">
                        {formatCurrency(route.revenue)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Customer Demographics - Age */}
          <Card className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-none">
            <CardHeader>
              <CardTitle>Customer Age Groups</CardTitle>
              <CardDescription>Distribution of customers by age</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.customerDemographics.ageGroups.map((group) => (
                  <div key={group.group} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{group.group}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-40 bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-red-500 h-2.5 rounded-full shadow-inner"
                          style={{ width: `${group.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-8 text-right text-gray-700">
                        {group.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Customer Demographics - Region */}
          <Card className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-none">
            <CardHeader>
              <CardTitle>Customer Regions</CardTitle>
              <CardDescription>Distribution of customers by region</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.customerDemographics.regions.map((region) => (
                  <div key={region.region} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{region.region}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-40 bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-500 h-2.5 rounded-full shadow-inner"
                          style={{ width: `${region.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-8 text-right text-gray-700">
                        {region.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Metrics */}
        <Card className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-none">
          <CardHeader>
            <CardTitle>Key Performance Indicators</CardTitle>
            <CardDescription>Important business metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-red-500">78.5%</div>
                <p className="text-sm text-gray-600">Load Factor</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-red-500">92.3%</div>
                <p className="text-sm text-gray-600">On-time Performance</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-red-500">4.8/5</div>
                <p className="text-sm text-gray-600">Customer Satisfaction</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-red-500">15.2%</div>
                <p className="text-sm text-gray-600">Revenue Growth</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
