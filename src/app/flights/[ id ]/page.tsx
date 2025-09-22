'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import FlightDetail from '@/app/components/flights/FlightDetail'
import SeatMap from '@/app/components/flights/SeatMap'
import PricePrediction from '@/app/components/ai/PricePrediction'
import DelayIndicator from '@/app/components/ai/DelayIndicator'
import Recommendations from '@/app/components/ai/Recommendations'
import { apiClient } from '@/app/lib/api' 
import { Flight } from '@/app/types/flight'
import LoadingSpinner from '@/app/components/shared/LoadingSpinner'

export default function FlightDetailPage() {
  const params = useParams()
  const [flight, setFlight] = useState<Flight | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const response = await apiClient.getFlightById(params.id as string) 
        setFlight(response.data) 
      } catch (err: unknown) { 
        if (typeof err === 'object' && err !== null && 'message' in err) {
          setError((err as { message: string }).message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchFlight()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
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

  if (!flight) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Flight Not Found</h1>
          <p className="text-gray-600">The requested flight could not be found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FlightDetail flight={flight} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Seat Selection</h2>
              <SeatMap flight={flight} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">AI Predictions</h2>
              <div className="space-y-4">
                <PricePrediction flight={flight} />
                <DelayIndicator flight={flight} />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Travel Recommendations</h2>
              <Recommendations flight={flight} passengerCount={0} travelDates={{
                start: '',
                end: ''
              }} destination={''} />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 bg-gradient-to-r from-red-600 to-red-800 rounded-xl shadow-lg p-8 text-white"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Book Your Flight?</h2>
            <p className="mb-6">Secure your seats now with our best price guarantee</p>
            <a
              href={`/booking/${flight.id}`}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-red-700 bg-white hover:bg-gray-100 transition-colors"
            >
              Book Now
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}