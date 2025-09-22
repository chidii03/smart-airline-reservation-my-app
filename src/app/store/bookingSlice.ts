// src/app/store/BookingSlice.ts
"use client";

import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/app/lib/api';
import { Booking, CreateBookingData, ApiBookingData } from '@/app/types/booking';
import { useAuth } from '../hooks/useAuth';

interface UseBookingsReturn {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
  createBooking: (data: CreateBookingData) => Promise<Booking | null>;
  cancelBooking: (id: string) => Promise<boolean>;
  refreshBookings: () => void;
}

interface UseBookingDetailsReturn {
  currentBooking: Booking | null;
  isLoading: boolean;
  error: string | null;
  getBooking: (id: string) => void;
}

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
  baseFare: function (): import("react").ReactNode {
    throw new Error('Function not implemented.');
  },
  taxes: 0,
  passengersList: [],
  serviceCharge: 0
});

// Hook for fetching all bookings
export function useBookings(p0: (state: { bookings: unknown; }) => { bookings: unknown; }): UseBookingsReturn {
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
  };
}

// New hook for fetching a single booking by ID
export function useBookingDetails(bookingId?: string): UseBookingDetailsReturn {
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getBooking = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      const response = await apiClient.getBookingById(id);
      if (response.data) {
        // Mocking additional data as it's not present in the type
        const mappedBooking = {
          ...mapApiDataToBooking(response.data),
          passengersList: response.data.passengers || [],
          baseFare: 250.00,
          taxes: 50.50,
          serviceCharge: 15.00,
          // Assuming these are part of the mock data from the backend
          airline: 'Sky Airlines',
          flightNumber: 'SA456',
          departureAirport: 'JFK',
          arrivalAirport: 'LAX',
          departureDate: '2025-10-15T10:00:00Z',
          bookingDate: '2025-09-21T12:00:00Z',
        };
        setCurrentBooking(mappedBooking as unknown as Booking);
      } else {
        setCurrentBooking(null);
      }
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch booking details');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (bookingId) {
      getBooking(bookingId);
    } else {
      setIsLoading(false);
    }
  }, [bookingId, getBooking]);

  return { currentBooking, isLoading, error, getBooking };
}
