'use client'

import { useState } from 'react'
import { useRouter} from 'next/navigation'
import { motion } from 'framer-motion'
import { CreditCard, Shield } from 'lucide-react'
import PaymentForm, { type PaymentFormData } from '@/app/components/booking/PaymentForm'
import BookingSummary from '@/app/components/booking/BookingSummary'
import { useCurrentBooking } from '@/app/hooks/useBookings'
import { apiClient } from '@/app/lib/api'
import { Card, CardContent } from '@/app/components/ui/card'
import { PaymentMethod } from '@/app/types/booking'

export default function PaymentPage() {
  const router = useRouter()
  const { currentBooking, completeBooking } = useCurrentBooking();
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')

  const handlePaymentSubmit = async (paymentData: PaymentFormData) => {
    setProcessing(true)
    setError('')

    // Ensure we have a valid booking to process
    if (!currentBooking || !currentBooking.totalPrice) {
      setError('Booking information not available.');
      setProcessing(false);
      return;
    }

    try {
      // Assuming processPayment is a method on the apiClient and handles success/failure by throwing an error.
       apiClient.processPayment({
        amount: currentBooking.totalPrice,
        email: paymentData.email,
        cardNumber: paymentData.cardNumber,
        expiryDate: `${paymentData.expiryMonth}/${paymentData.expiryYear}`,
        cvv: paymentData.cvv,
        cardholderName: paymentData.cardHolder,
      });

      // If the processPayment call completes without an error, we assume success.
      // Call completeBooking from the hook, passing the required data.
      completeBooking({
        status: 'confirmed',
        paymentStatus: 'paid',
        paymentMethod: 'credit_card' as unknown as PaymentMethod, 
        contactEmail: paymentData.email
      });
      

      // Navigate to confirmation page
      router.push(`/booking/confirmation?bookingId=${currentBooking.id}`)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Payment processing failed')
    } finally {
      setProcessing(false)
    }
  }

  // Handle cases where booking data is not available
  if (!currentBooking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Booking Not Found</h1>
          <p className="text-gray-600">Please complete passenger information first.</p>
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
          <h1 className="text-3xl font-bold text-gray-900">Payment Information</h1>
          <p className="text-gray-600 mt-2">Secure payment with Paystack</p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6"
          >
            {error}
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="bg-white rounded-xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-6">
                  <CreditCard className="w-6 h-6 text-airline-red-600 mr-2" />
                  <h2 className="text-xl font-semibold">Payment Details</h2>
                </div>
                <PaymentForm
                  onSubmit={handlePaymentSubmit}
                  isLoading={processing}
                  totalAmount={currentBooking.totalPrice}
                />
              </CardContent>
            </Card>

            {/* Security Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6"
            >
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 text-red-600 mr-2" />
                    <span className="text-sm text-red-700">
                      Your payment information is encrypted and secure. We use Paystack for all transactions.
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Only render BookingSummary if the necessary data is available */}
          {currentBooking.flight && currentBooking.passengers && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-1 space-y-6"
            >
              <BookingSummary
                flight={currentBooking.flight}
                passengers={currentBooking.passengers}
                totalPrice={currentBooking.totalPrice}
                selectedSeats={currentBooking.selectedSeats.map(seat => seat.seatNumber)}
              />
              
              {/* Payment Security Badges */}
              <Card className="bg-white rounded-lg border">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Secure Payment</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center justify-center p-2 bg-gray-100 rounded">
                      <span className="text-xs font-medium">SSL Secure</span>
                    </div>
                    <div className="flex items-center justify-center p-2 bg-gray-100 rounded">
                      <span className="text-xs font-medium">PCI DSS</span>
                    </div>
                    <div className="flex items-center justify-center p-2 bg-gray-100 rounded">
                      <span className="text-xs font-medium">3D Secure</span>
                    </div>
                    <div className="flex items-center justify-center p-2 bg-gray-100 rounded">
                      <span className="text-xs font-medium">Paystack</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Support Information */}
              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Our support team is available 24/7 to assist you with your booking.
                  </p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium">+1 (555) 123-4567</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">Skyjetairline@gmail.com</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hours:</span>
                      <span className="font-medium">24/7</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
