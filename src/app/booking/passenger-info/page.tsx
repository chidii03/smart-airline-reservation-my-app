'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import PassengerForm from '@/app/components/booking/PassengerForm'
import BookingSummary from '@/app/components/booking/BookingSummary'
import { apiClient } from '@/app/lib/api'
import type { Flight } from '@/app/types/flight'
import type { Booking, Passenger } from '@/app/types/booking'
import { z } from 'zod'

// Define the schema for the data collected by the form
// This schema must match the one in the PassengerForm component
const formPassengerSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string(),
  dateOfBirth: z.string(),
  gender: z.enum(['male', 'female', 'other']),
  nationality: z.string(),
  passportNumber: z.string(),
  passportExpiry: z.string(),
})

type PassengerFormData = z.infer<typeof formPassengerSchema>

// Define a type for the booking store state
type BookingStoreState = {
  currentBooking: Booking | null;
  setFlight: (flightId: string) => void;
  updatePassenger: (data: { passengers: Passenger[], totalPrice: number }) => void;
};

// Replace the placeholder function with a correctly typed one using generics
function useBookingStore<T>(selector: (state: BookingStoreState) => T): T {
  // This is a mock implementation to satisfy the type-checker.
  const state: BookingStoreState = {
    currentBooking: null, // Placeholder value
    setFlight: (flightId) => { console.log(`Flight set: ${flightId}`); },
    updatePassenger: (data) => { console.log('Passengers updated:', data); }
  };
  return selector(state);
}

export default function PassengerInfoPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const flightId = searchParams.get('flightId')
  const passengerCount = parseInt(searchParams.get('passengers') || '1')

  // Access state and actions from the store correctly
  const { currentBooking, setFlight, updatePassenger } = useBookingStore(state => ({
    currentBooking: state.currentBooking,
    setFlight: state.setFlight,
    updatePassenger: state.updatePassenger,
  }));

  const [flight, setFlightState] = useState<Flight | null>(null)

  useEffect(() => {
    // Fetch flight details if they are not already in the booking state
    if (flightId && !currentBooking?.flight) {
      const fetchFlight = async () => {
        try {
          // Call the getFlightById method on the apiClient instance
          const flightData = await apiClient.getFlightById(flightId)
          setFlightState(flightData.data) // Assuming data is nested in a 'data' property
          // Optionally, set the flight in the Redux store as well
          setFlight(flightId)
        } catch (error) {
          console.error('Failed to fetch flight:', error)
        }
      }
      fetchFlight()
    }
  }, [flightId, currentBooking, setFlight])

const handlePassengerSubmit = (formData: PassengerFormData[]) => {
  // Map form data to the full Passenger type, adding missing fields
  const completedPassengers: Passenger[] = formData.map((p) => ({
    ...p,
    type: 'adult', // Assuming all passengers from this form are adults
    baggage: '', // Set baggage to an empty string to match the required type
    seat: '', // Set seat to an empty string to match the required type
    seatNumber: '', // Add seatNumber with a default value (empty string, null, or a default seat number)
    specialAssistance: false, // Default value
    dietaryRequirements: [], // Default value
    passportCountry: p.nationality, // Set passportCountry to nationality from the form
  }));

  // Update booking with passenger information
  updatePassenger({
    passengers: completedPassengers,
    totalPrice: flight ? flight.price * passengerCount : 0
  });

  // Navigate to payment page
  router.push(`/booking/payment?flightId=${flightId}&passengers=${passengerCount}`);
}

  const bookingFlight = currentBooking?.flight || flight

  if (!bookingFlight) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Flight Not Found</h1>
          <p className="text-gray-600">Please select a flight first.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Passenger Information</h1>
          <p className="text-gray-600 mt-2">Please provide details for all passengers</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <PassengerForm
                onSubmit={handlePassengerSubmit}
                passengerCount={passengerCount}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <BookingSummary
              flight={bookingFlight}
              passengers={currentBooking?.passengers || []} // Pass the passengers from state
              selectedSeats={[]} // Pass an empty array for now as seats are not yet selected
              totalPrice={bookingFlight.price * passengerCount}
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
