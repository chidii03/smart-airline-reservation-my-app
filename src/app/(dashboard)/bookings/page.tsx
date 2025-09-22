'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Download, 
  Calendar,
  Plane,
  MapPin,
  User,
  CreditCard,
  MoreVertical
} from 'lucide-react'

import { useAuth } from '@/app/hooks/useAuth'
import { useBookings } from '@/app/hooks/useBookings'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Card, CardContent } from '@/app/components/ui/card'
import { Badge } from '@/app/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu'
import { formatCurrency, formatDate } from '@/app/lib/utils'
import { Booking } from '@/app/types/booking'

type BookingStatus = 'all' | 'upcoming' | 'completed' | 'cancelled'

export default function BookingsPage() {
  const { user } = useAuth()
  const { bookings, refreshBookings, cancelBooking, loading } = useBookings()
  const [statusFilter, setStatusFilter] = useState<BookingStatus>('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (user?.id) {
      refreshBookings()
    }
  }, [user, refreshBookings])

  const filteredBookings = bookings.filter(booking => {
    // Status filter
    if (statusFilter !== 'all') {
      const now = new Date()
      const departureDate = new Date(booking.departureDate || '')
      const arrivalDate = new Date(booking.arrivalDate || '')
      
      if (statusFilter === 'upcoming' && departureDate < now) return false
      if (statusFilter === 'completed' && arrivalDate > now) return false
      if (statusFilter === 'cancelled' && booking.status !== 'cancelled') return false
    }

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      return (
        String(booking.flightNumber).toLowerCase().includes(searchLower) ||
        String(booking.departureAirport).toLowerCase().includes(searchLower) ||
        String(booking.arrivalAirport).toLowerCase().includes(searchLower) ||
        String(booking.airline).toLowerCase().includes(searchLower)
      )
    }

    return true
  })

  const handleCancelBooking = async (bookingId: string) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      try {
        await cancelBooking(bookingId)
      } catch (error) {
        console.error('Failed to cancel booking:', error)
      }
    }
  }

  const getStatusBadge = (booking: Booking) => {
    const now = new Date()
    const departureDate = new Date(booking.departureDate || '')
    
    if (booking.status === 'cancelled') {
      return <Badge variant="destructive">Cancelled</Badge>
    }
    
    if (departureDate < now) {
      return <Badge variant="secondary">Completed</Badge>
    }
    
    return <Badge variant="success">Upcoming</Badge>
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
        <p className="text-gray-600">Manage your flight reservations and view booking history</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('all')}
              >
                All Bookings
              </Button>
              <Button
                variant={statusFilter === 'upcoming' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('upcoming')}
              >
                Upcoming
              </Button>
              <Button
                variant={statusFilter === 'completed' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('completed')}
              >
                Completed
              </Button>
              <Button
                variant={statusFilter === 'cancelled' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('cancelled')}
              >
                Cancelled
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    More Filters
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>This Month</DropdownMenuItem>
                  <DropdownMenuItem>Last 3 Months</DropdownMenuItem>
                  <DropdownMenuItem>This Year</DropdownMenuItem>
                  <DropdownMenuItem>Export Data</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plane className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search criteria' 
                  : 'Start by booking your first flight'
                }
              </p>
              <Button>
                Search Flights
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredBookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Flight Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {String(booking.airline)} - {String(booking.flightNumber)}
                          </h3>
                          <p className="text-gray-600">{formatDate(booking.bookingDate)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(booking)}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                              <DropdownMenuItem>Share Booking</DropdownMenuItem>
                              {booking.status !== 'cancelled' && new Date(booking.departureDate || '') > new Date() && (
                                <DropdownMenuItem 
                                  className="text-red-600"
                                  onClick={() => handleCancelBooking(booking.id)}
                                >
                                  Cancel Booking
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <MapPin className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Route</p>
                            <p className="font-medium">
                              {String(booking.departureAirport)} → {String(booking.arrivalAirport)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                            <Calendar className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Departure</p>
                            <p className="font-medium">
                              {String(booking.departureDate)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                            <User className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Passengers</p>
                            <p className="font-medium">{booking.passengers.length}</p>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                            <CreditCard className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Total Paid</p>
                            <p className="font-medium text-green-600">
                              {formatCurrency(booking.totalPrice)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:gap-3">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Receipt
                      </Button>
                      {booking.status !== 'cancelled' && new Date(booking.departureDate || '') > new Date() && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleCancelBooking(booking.id)}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Pagination */}
      {filteredBookings.length > 0 && (
        <div className="flex justify-center items-center gap-2 pt-4">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="default" size="sm">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      )}
    </div>
  )
}