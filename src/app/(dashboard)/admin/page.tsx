'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  Plane,
  DollarSign,
  TrendingUp,
  BarChart3,
  Settings,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import RecentBookings from '@/app/components/dashboard/RecentBookings'
import  RevenueChart  from '@/app/components/dashboard/RevenueChart'
import  UserActivity from '@/app/components/dashboard/UserActivity'

const adminStats = [
  {
    title: 'Total Users',
    value: '12,458',
    description: '+12% from last month',
    icon: <Users className="w-6 h-6" />,
    trend: 'up'
  },
  {
    title: 'Total Flights',
    value: '1,234',
    description: '+8% from last month',
    icon: <Plane className="w-6 h-6" />,
    trend: 'up'
  },
  {
    title: 'Revenue',
    value: '$245,231',
    description: '+15% from last month',
    icon: <DollarSign className="w-6 h-6" />,
    trend: 'up'
  },
  {
    title: 'Occupancy Rate',
    value: '78.5%',
    description: '+3.2% from last month',
    icon: <TrendingUp className="w-6 h-6" />,
    trend: 'up'
  }
]

const systemAlerts = [
  {
    id: 1,
    type: 'warning',
    message: 'High server load detected',
    time: '2 minutes ago',
    icon: <AlertTriangle className="w-4 h-4 text-yellow-600" />
  },
  {
    id: 2,
    type: 'success',
    message: 'Backup completed successfully',
    time: '1 hour ago',
    icon: <CheckCircle className="w-4 h-4 text-green-600" />
  },
  {
    id: 3,
    type: 'info',
    message: 'System update available',
    time: '3 hours ago',
    icon: <Settings className="w-4 h-4 text-blue-600" />
  }
]

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage your airline operations and monitor system performance</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {['overview', 'flights', 'users', 'analytics', 'settings'].map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? 'default' : 'ghost'}
            onClick={() => setActiveTab(tab)}
            className="flex-1 capitalize"
          >
            {tab}
          </Button>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.description}</p>
                  </div>
                  <div className="w-12 h-12 bg-airline-red-100 rounded-full flex items-center justify-center">
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analytics</CardTitle>
              <CardDescription>Monthly revenue performance</CardDescription>
            </CardHeader>
            <CardContent>
              <RevenueChart />
            </CardContent>
          </Card>

          {/* Recent Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Latest customer bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentBookings limit={10} />
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* System Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>Recent system notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start space-x-3">
                    <div className="w-6 h-6 flex items-center justify-center mt-0.5">
                      {alert.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{alert.message}</p>
                      <p className="text-xs text-gray-600">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common admin tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Plane className="w-4 h-4 mr-2" />
                  Add New Flight
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Users
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Generate Reports
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  System Settings
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* User Activity */}
          <Card>
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
              <CardDescription>Recent user actions</CardDescription>
            </CardHeader>
            <CardContent>
              <UserActivity limit={5} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* System Health */}
      <Card>
        <CardHeader>
          <CardTitle>System Health</CardTitle>
          <CardDescription>Current system status and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <p className="font-semibold">API</p>
              <p className="text-sm text-green-600">Operational</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <p className="font-semibold">Database</p>
              <p className="text-sm text-green-600">Operational</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <AlertTriangle className="w-4 h-4 text-yellow-600" />
              </div>
              <p className="font-semibold">Cache</p>
              <p className="text-sm text-yellow-600">Degraded</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <p className="font-semibold">Storage</p>
              <p className="text-sm text-green-600">Operational</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}