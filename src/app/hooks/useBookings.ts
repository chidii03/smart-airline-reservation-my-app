'use client'

import { useState, useEffect, useCallback } from 'react'
import { apiClient } from '@/app/lib/api'
import { Booking, CreateBookingData, ApiBookingData } from '@/app/types/booking'
import { useAuth } from './useAuth'

interface UseBookingsReturn {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
  createBooking: (data: CreateBookingData) => Promise<Booking | null>;
  cancelBooking: (id: string) => Promise<boolean>;
  refreshBookings: () => void;
  getBookingById: (id: string) => Booking | undefined;
}



// This function maps the raw API data to a structured Booking object.
const mapApiDataToBooking = (data: ApiBookingData): Booking => ({
  id: data.id || '',
  reference: data.reference || '',
  userId: data.userId || '',
  flight: data.flight || null,
  passengers: data.passengers || [],
  selectedSeats: data.selectedSeats || [],
  baggageOptions: data.baggageOptions || [],
  insurance: data.insurance || null,
  totalPrice: data.totalPrice || 0,
  currency: data.currency || undefined,
  status: data.status as Booking['status'] || 'pending',
  paymentStatus: data.paymentStatus as Booking['paymentStatus'] || 'pending',
  paymentMethod: data.paymentMethod || undefined,
  createdAt: data.createdAt || new Date().toISOString(),
  updatedAt: data.updatedAt || new Date().toISOString(),
  departureDate: data.departureDate || undefined,
  returnDate: data.returnDate || undefined,
  specialRequests: data.specialRequests || undefined,
  contactEmail: data.contactEmail || undefined,
  contactPhone: data.contactPhone || undefined,
  bookingSource: data.bookingSource || undefined,
  loyaltyPointsEarned: data.loyaltyPointsEarned || undefined,
  cancellationReason: data.cancellationReason || undefined,
  cancellationFee: data.cancellationFee || undefined,
  arrivalDate: data.arrivalDate || new Date().toISOString(),
  bookingDate: data.bookingDate || new Date().toISOString(),
  airline: data.airline || 'Unknown',
  arrivalAirport: data.arrivalAirport || 'Unknown',
  flightNumber: data.flightNumber || 'Unknown',
  departureAirport: data.departureAirport || 'Unknown',
  baseFare: function (baseFare: unknown): import("react").ReactNode {
    throw new Error('Function not implemented.')
  },
  passengersList: [],
  serviceCharge: 0,
  taxes: 0
});

export function useBookings(): UseBookingsReturn {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchBookings = useCallback(async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await apiClient.getBookings(user.id);
      setBookings(response.data.map(mapApiDataToBooking));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const createBooking = useCallback(async (data: CreateBookingData): Promise<Booking | null> => {
    if (!user?.id) {
      setError('User not authenticated');
      return null;
    }

    try {
      setLoading(true);
      const apiBookingData = {
        flightId: data.flightId,
        userId: user.id,
        passengers: data.passengers.length,
        seatSelection: data.seats?.map(seat => seat.seatNumber) || [],
        bookingDate: data.bookingDate,
      };
      const response = await apiClient.createBooking(apiBookingData);
      const newBooking = mapApiDataToBooking(response.data);
      setBookings(prev => [...prev, newBooking]);
      setError(null);
      return newBooking;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create booking');
      return null;
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const cancelBooking = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      await apiClient.cancelBooking(id);
      setBookings(prev => prev.map(booking =>
        booking.id === id ? { ...booking, status: 'cancelled' } : booking
      ));
      setError(null);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cancel booking');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const getBookingById = useCallback((id: string): Booking | undefined => {
    return bookings.find(booking => booking.id === id);
  }, [bookings]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return {
    bookings,
    loading,
    error,
    createBooking,
    cancelBooking,
    refreshBookings: fetchBookings,
    getBookingById,
  };
}

export function useBooking(bookingId?: string) {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bookingId) {
      setLoading(false);
      return;
    }

    const fetchBooking = async () => {
      try {
        setLoading(true);
        const response = await apiClient.getBookingById(bookingId);
        if (response.data) {
          setBooking(mapApiDataToBooking(response.data));
        } else {
          setBooking(null);
        }
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch booking details');
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  return { booking, setBooking, loading, error };
}

export function useBookingActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateBooking = async (): Promise<boolean> => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setError(null);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update booking');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resendConfirmation = async (): Promise<boolean> => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setError(null);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend confirmation');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    updateBooking,
    resendConfirmation,
  };
}

export function useCurrentBooking() {
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);

  const completeBooking = useCallback((bookingData: Partial<Booking>) => {
    setCurrentBooking(prev => prev ? { ...prev, ...bookingData } : { ...bookingData, id: Date.now().toString() } as Booking);
  }, []);

  return { currentBooking, completeBooking };
}
