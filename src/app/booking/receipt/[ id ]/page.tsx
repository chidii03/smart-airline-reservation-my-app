'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Printer, Download, Mail } from 'lucide-react'
import Receipt from '@/app/components/booking/Receipt'
import { useBooking } from '@/app/hooks/useBookings'
import pdfGenerator, { ReceiptData } from '@/app/lib/pdf-generator'
import { Booking } from '@/app/types/booking'
import { apiClient } from '@/app/lib/api'

// Helper function to create ReceiptData from Booking
const generateReceiptData = (booking: Booking): ReceiptData => {
  const subtotal = booking.totalPrice * 0.9
   const tax = booking.totalPrice * 0.1

  return {
    receiptId: `REC-${booking.id}`,
    issueDate: new Date().toISOString(),
    booking: {
      bookingId: booking.id,
      bookingDate: booking.bookingDate,
      status: booking.status,
      totalAmount: booking.totalPrice,
      currency: booking.currency || 'USD',
      flight: {
        airline: String(booking.airline ?? 'N/A'),
        flightNumber: String(booking.flightNumber ?? 'N/A'),
        origin: String(booking.departureAirport ?? 'N/A'),
        destination: String(booking.arrivalAirport ?? 'N/A'),
        departure: (booking.departureDate as string | undefined) ?? 'N/A',
        arrival: (booking.arrivalDate as string | undefined) ?? 'N/A',
        duration: 'N/A' 
      },
      passengers: booking.passengers.map(p => ({
        firstName: p.firstName,
        lastName: p.lastName,
        type: p.type,
        seat: p.seat || 'N/A',
        baggage: p.baggage || 'N/A'
      })),
      payment: {
        method: String(booking.paymentMethod ?? 'N/A'),
        transactionId: 'TXN-12345', 
        paidAt: new Date().toISOString()
      },
      contact: {
        email: booking.contactEmail || 'N/A',
        phone: booking.contactPhone || 'N/A'
      }
    },
    breakdown: [
      {
        description: `Flight from ${booking.departureAirport ?? 'N/A'} to ${booking.arrivalAirport ?? 'N/A'}`,
        quantity: booking.passengers.length,
        amount: subtotal,
        total: subtotal
      },
      {
        description: 'Taxes and Fees',
        quantity: 1,
        amount: tax,
        total: tax
      }
    ],
    subtotal,
    tax,
    total: booking.totalPrice
  }
}

export default function ReceiptPage() {
  const params = useParams()
  const bookingId = Array.isArray(params.id) ? params.id[0] : params.id
  const { booking: currentBooking, loading: isLoading, error } = useBooking(bookingId as string)

  const [notification, setNotification] = useState('')

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = async () => {
    if (currentBooking) {
      try {
        const receiptData = generateReceiptData(currentBooking)
        const pdfBlob = await pdfGenerator.generateReceipt(receiptData)
        const link = document.createElement('a')
        link.href = URL.createObjectURL(pdfBlob)
        link.download = `booking-receipt-${currentBooking.id}.pdf`
        link.click()
        URL.revokeObjectURL(link.href)
      } catch {
        setNotification('Failed to generate PDF. Please try again.')
      }
    }
  }

  const handleEmail = async () => {
    if (currentBooking) {
      setNotification('Receipt will be sent to your email address shortly.')
      try {
        apiClient.sendReceiptEmail(currentBooking.id, currentBooking.contactEmail)
        setNotification('Receipt sent successfully!')
      } catch {
        setNotification('Failed to send email. Please try again.')
      }
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading Receipt...</h1>
          <p className="text-gray-600">Please wait while we fetch your booking details.</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  if (!currentBooking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Receipt Not Found</h1>
          <p className="text-gray-600">Please check your booking confirmation.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Booking Receipt</h1>
          <div className="flex space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              <Printer className="h-4 w-4 mr-2" />
              Print
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </button>
            <button
              onClick={handleEmail}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <Mail className="h-4 w-4 mr-2" />
              Email
            </button>
          </div>
        </motion.div>

        {notification && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6"
          >
            {notification}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <Receipt booking={currentBooking as Booking} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 bg-blue-50 rounded-lg p-6"
        >
          <h3 className="font-semibold text-red-900 mb-4">Need Help?</h3>
          <p className="text-red-800 mb-4">
            If you have any questions about your booking or receipt, please contact our customer support team.
          </p>
          <div className="flex space-x-4">
            <a href="tel:+1234567890" className="text-red-600 hover:text-red-800">
              +1 (234) 567-890
            </a>
            <a href="mailto:support@airline.com" className="text-blue-600 hover:text-blue-800">
              Skjetairline@gmail..com
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
