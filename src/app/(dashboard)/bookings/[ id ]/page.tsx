'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Download,
  Printer,
  Share2,
  Mail,
  Calendar,
  MapPin,
  Users,
  CreditCard,
  Plane,
  QrCode
} from 'lucide-react'

import { useBooking } from '@/app/hooks/useBookings'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent } from '@/app/components/ui/card'
import { Badge } from '@/app/components/ui/badge'
import { pdfGenerator } from '@/app/lib/pdf-generator'
import { formatCurrency, formatDate } from '@/app/lib/utils'

// Define passenger type
interface Passenger {
  firstName: string
  lastName: string
  type: string
  nationality: string
  frequentFlyerNumber?: string
}

export default function BookingDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const { booking: currentBooking, loading } = useBooking(id as string)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const handleDownloadPDF = async () => {
    if (!currentBooking) return
    
    setIsGeneratingPDF(true)
    try {
      // Convert arrivalDate to string if it's a Date object or number
      const arrivalDate = currentBooking.arrivalDate 
        ? new Date(currentBooking.arrivalDate).toISOString() 
        : '';
        
      // Map currentBooking to match PDFGenerator's expected format
      const bookingData = {
        bookingId: currentBooking.id || '',
        bookingDate: currentBooking.bookingDate || '',
        status: currentBooking.status || '',
        totalAmount: currentBooking.totalPrice || 0,
        currency: currentBooking.currency || 'USD',
        flight: {
          airline: String(currentBooking.airline || ''),
          flightNumber: String(currentBooking.flightNumber || ''),
          origin: String(currentBooking.departureAirport || ''),
          destination: String(currentBooking.arrivalAirport || ''),
          departure: currentBooking.departureDate || '',
          arrival: arrivalDate,
          duration: '' // You might need to calculate this
        },
        passengers: (currentBooking.passengersList || []).map((p: Passenger) => ({
          firstName: p.firstName,
          lastName: p.lastName,
          type: p.type,
          seat: '', // You might need to get this from your data
          baggage: '' // You might need to get this from your data
        })),
        payment: {
          method: currentBooking.paymentMethod?.type || 'Credit Card',
          transactionId: '', // You might need to get this from your data
          paidAt: currentBooking.bookingDate || ''
        },
        contact: {
          email: currentBooking.contactEmail || '',
          phone: currentBooking.contactPhone || ''
        }
      }

      const blob = await pdfGenerator.generateBookingConfirmation(bookingData)
      pdfGenerator.downloadPDF(blob, `booking-${currentBooking.id}.pdf`)
    } catch (error) {
      console.error('Failed to generate PDF:', error)
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Flight Booking Details',
          text: `Booking details for ${currentBooking?.airline} flight ${currentBooking?.flightNumber}`,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  if (!currentBooking) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking not found</h2>
        <Button onClick={() => router.push('/dashboard/bookings')}>
          Back to Bookings
        </Button>
      </div>
    )
  }

  const getStatusBadge = () => {
    const now = new Date()
    const departureDate = new Date(currentBooking.departureDate || '')
    
    if (currentBooking.status === 'cancelled') {
      return <Badge variant="destructive">Cancelled</Badge>
    }
    
    if (departureDate < now) {
      return <Badge variant="secondary">Completed</Badge>
    }
    
    return <Badge variant="success">Confirmed</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/dashboard/bookings')}
            className="flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Bookings
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Booking Details</h1>
            <p className="text-gray-600">Booking #{currentBooking.id}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
          >
            <Download className="w-4 h-4 mr-2" />
            {isGeneratingPDF ? 'Generating...' : 'PDF'}
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Flight Details Card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Plane className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{String(currentBooking.airline)}</h2>
                    <p className="text-gray-600">Flight {String(currentBooking.flightNumber)}</p>
                  </div>
                </div>
                {getStatusBadge()}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Route</p>
                      <p className="font-medium">
                        {String(currentBooking.departureAirport)} → {String(currentBooking.arrivalAirport)}
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
                        {formatDate(currentBooking.departureDate || '')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <Users className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Passengers</p>
                      <p className="font-medium">{currentBooking.passengers.length}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                      <CreditCard className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Paid</p>
                      <p className="font-medium text-green-600">
                        {formatCurrency(currentBooking.totalPrice)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Timeline */}
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">Booking Timeline</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Booking Created</span>
                    <span className="text-sm font-medium">
                      {formatDate(currentBooking.bookingDate)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Payment Status</span>
                    <Badge variant="success">Paid</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Confirmation Sent</span>
                    <span className="text-sm font-medium">
                      {formatDate(currentBooking.bookingDate)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Passenger Details Card */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Passenger Details</h3>
              <div className="space-y-4">
                {currentBooking.passengersList?.map((passenger: Passenger, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">
                        {passenger.firstName} {passenger.lastName}
                      </p>
                      <p className="text-sm text-gray-600">
                        {passenger.type} • {passenger.nationality}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Seat 12A</p>
                      <p className="text-sm text-gray-600">FF: {passenger.frequentFlyerNumber || 'N/A'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions Card */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Itinerary
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <QrCode className="w-4 h-4 mr-2" />
                  Boarding Pass
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Download Documents
                </Button>
                {currentBooking.status !== 'cancelled' && 
                 new Date(currentBooking.departureDate || '') > new Date() && (
                  <Button variant="outline" className="w-full justify-start text-red-600">
                    Cancel Booking
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Support Card */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Our support team is available 24/7 to assist you with your booking.
              </p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
                <Button variant="outline" className="w-full">
                  Live Chat
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Booking Summary Card */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Price Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Base Fare</span>
                  <span className="text-sm">
                    {formatCurrency((currentBooking.baseFare as unknown as number) || 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Taxes & Fees</span>
                  <span className="text-sm">
                    {formatCurrency((currentBooking.taxes as unknown as number) || 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Service Charge</span>
                  <span className="text-sm">
                    {formatCurrency((currentBooking.serviceCharge as unknown as number) || 0)}
                  </span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-green-600">
                      {formatCurrency(currentBooking.totalPrice)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}