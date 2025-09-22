"use client"

import { useEffect, useState } from "react"
import Link from 'next/link'
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import BookingSummary from "@/app/components/booking/BookingSummary"
import { useBookings } from "@/app/store/bookingSlice"
import generateReceipt from "@/app/lib/pdf-generator"
import type { Booking } from "@/app/types/booking"
import { ReceiptData, BookingData } from "@/app/lib/pdf-generator"

// Helper function to map the Booking data to the required ReceiptData format
const mapBookingToReceiptData = (booking: Booking): ReceiptData => {
  // Assuming a simple price breakdown for the receipt
  const taxes = booking.totalPrice * 0.15; // 15% tax
  const subtotal = booking.totalPrice - taxes;
  const breakdown = [
    {
      description: "Flight Booking",
      amount: subtotal,
      quantity: 1,
      total: subtotal,
    },
    {
      description: "Taxes & Fees",
      amount: taxes,
      quantity: 1,
      total: taxes,
    },
  ];

  const bookingData: BookingData = {
    bookingId: booking.id,
    bookingDate: booking.bookingDate,
    status: booking.status,
    totalAmount: booking.totalPrice,
    currency: booking.currency || "USD",
    flight: {
      airline: booking.airline as string,
      flightNumber: booking.flightNumber as string,
      origin: booking.flight?.origin as string,
      destination: booking.flight?.destination as string,
      departure: booking.flight?.departureTime as string,
      arrival: booking.flight?.arrivalTime as string,
      duration: booking.flight?.duration as unknown as string,
    },
    passengers: booking.passengers.map(p => ({
      ...p,
      seat: booking.selectedSeats.find(s => s.passengerIndex === booking.passengers.indexOf(p))?.seatNumber || "N/A",
      baggage: "N/A", // This could be more detailed if the data was available
    })),
    payment: {
      method: booking.paymentMethod?.type || "N/A",
      transactionId: "N/A",
      paidAt: booking.updatedAt,
    },
    contact: {
      email: booking.contactEmail || "N/A",
      phone: booking.contactPhone || "N/A",
    }
  };

  return {
    receiptId: `REC-${booking.id}`,
    issueDate: new Date().toISOString(),
    booking: bookingData,
    breakdown,
    subtotal,
    tax: taxes,
    total: booking.totalPrice,
  };
};

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  
  // FIX: Use the useBookingStore hook to select the 'bookings' state, not the entire state
  const { bookings } = useBookings((state: { bookings: unknown }) => ({
    bookings: state.bookings
  }));

  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    if (bookingId && bookings) {
      // FIX: Ensure the item is found before setting the state
      const foundBooking = bookings.find((b: Booking) => b.id === bookingId) || null;
      setBooking(foundBooking);
    }
  }, [bookingId, bookings]);

  const handleDownloadReceipt = async () => {
    if (booking) {
      const receiptData = mapBookingToReceiptData(booking);
      // FIX: The generateReceipt function returns a Blob, not a string.
      const pdfBlob = await generateReceipt.generateReceipt(receiptData);
      
      const link = document.createElement("a");
      // FIX: Use URL.createObjectURL to create a valid URL from the Blob
      link.href = URL.createObjectURL(pdfBlob);
      link.download = `booking-receipt-${booking.id}.pdf`;
      link.click();
      // Clean up the URL object
      URL.revokeObjectURL(link.href);
    }
  };

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Booking Not Found</h1>
          <p className="text-gray-600">Please check your booking confirmation email.</p>
        </div>
      </div>
    )
  }

  // FIX: Add a check for booking.flight to prevent the type error
  if (!booking.flight) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Flight Details Missing</h1>
          <p className="text-gray-600">Flight information is not available for this booking.</p>
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
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">Your flight has been successfully booked</p>
          <p className="text-sm text-gray-500 mt-2">Confirmation #: {booking.id}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <BookingSummary 
            flight={booking.flight} 
            passengers={booking.passengers} 
            selectedSeats={booking.selectedSeats.map(s => s.seatNumber)} 
            totalPrice={booking.totalPrice} 
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-4">Next Steps</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• Check your email for booking confirmation</li>
              <li>• Complete online check-in 24 hours before departure</li>
              <li>• Arrive at the airport at least 2 hours before departure</li>
              <li>• Have your ID and travel documents ready</li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-lg p-6">
            <h3 className="font-semibold text-green-900 mb-4">Manage Your Booking</h3>
            <div className="space-y-3">
              <button
                onClick={handleDownloadReceipt}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
              >
                Download Receipt
              </button>
              <button className="w-full border border-green-600 text-green-600 py-2 px-4 rounded-md hover:bg-green-50 transition-colors">
                View Booking Details
              </button>
              <button className="w-full border border-green-600 text-green-600 py-2 px-4 rounded-md hover:bg-green-50 transition-colors">
                Add Special Requests
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <Link
            href="/flights"
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Book Another Flight
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
