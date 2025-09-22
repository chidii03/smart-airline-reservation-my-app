import { Booking, BookingStatus, PaymentStatus } from '@/app/types/booking';
import { mockFlights } from './mockFlights';
import { mockUsers } from './mockUser';
import { mockPassengers } from '@/app/data/mockUser'; // Note: Your mockUser.ts should now export this.

// Generate random booking references
const generateBookingReference = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Generate random dates in the past 6 months
const generateRandomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const sixMonthsAgo = new Date();
sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

export const mockBookings: Booking[] = [
  {
    // Fixes for Booking #1
    id: 'book-001',
    reference: generateBookingReference(), // Changed from bookingReference
    userId: mockUsers[0].id,
    flight: mockFlights[0], // Assumes a single flight per booking for simplicity
    passengers: [mockPassengers[0]],
    totalPrice: 1025.5, // Changed from totalAmount
    currency: 'USD',
    status: 'confirmed' as BookingStatus,
    paymentStatus: 'paid' as PaymentStatus, // Changed from 'completed'
    selectedSeats: [{ passengerIndex: 0, seatId: 'seat-A1', seatNumber: 'A1', price: 0 }],
    baggageOptions: [{ type: 'checked', weight: 23, price: 50, description: 'Checked bag', passengerIndex: 0 }],
    insurance: null,
    createdAt: generateRandomDate(sixMonthsAgo, new Date()).toISOString(),
    updatedAt: new Date().toISOString(),
    specialRequests: 'Vegetarian meal requested',
    contactEmail: mockUsers[0].email,
    contactPhone: mockUsers[0].phoneNumber,
    departureDate: mockFlights[0].departureTime.split('T')[0],
    returnDate: mockFlights[5].departureTime.split('T')[0], // Added for a round trip
    departureAirport: mockFlights[0].departureAirport,
    arrivalAirport: mockFlights[0].arrivalAirport,
    airline: mockFlights[0].airline,
    flightNumber: mockFlights[0].flightNumber,
    arrivalDate: '',
    bookingDate: '',
    passengersList: [],
    serviceCharge: 0,
    taxes: 0,
    baseFare: function (baseFare: unknown): import("react").ReactNode {
      throw new Error('Function not implemented.');
    }
  },
  {
    // Fixes for Booking #2
    id: 'book-002',
    reference: generateBookingReference(),
    userId: mockUsers[1].id,
    flight: mockFlights[2],
    passengers: [mockPassengers[1]],
    totalPrice: 550.0,
    currency: 'USD',
    status: 'completed' as BookingStatus,
    paymentStatus: 'paid' as PaymentStatus, // Changed from 'completed'
    selectedSeats: [{ passengerIndex: 0, seatId: 'seat-B5', seatNumber: 'B5', price: 0 }],
    baggageOptions: [],
    insurance: null,
    createdAt: generateRandomDate(sixMonthsAgo, new Date()).toISOString(),
    updatedAt: new Date().toISOString(),
    specialRequests: '',
    contactEmail: mockUsers[1].email,
    contactPhone: mockUsers[1].phoneNumber,
    departureDate: mockFlights[2].departureTime.split('T')[0],
    departureAirport: mockFlights[2].departureAirport,
    arrivalAirport: mockFlights[2].arrivalAirport,
    airline: mockFlights[2].airline,
    flightNumber: mockFlights[2].flightNumber,
    arrivalDate: '',
    bookingDate: '',
    passengersList: [],
    serviceCharge: 0,
    taxes: 0,
    baseFare: function (baseFare: unknown): import("react").ReactNode {
      throw new Error('Function not implemented.');
    }
  },
  {
    // Fixes for Booking #3
    id: 'book-003',
    reference: generateBookingReference(),
    userId: mockUsers[2].id,
    flight: mockFlights[3],
    passengers: [mockPassengers[2], mockPassengers[3]],
    totalPrice: 2350.75,
    currency: 'USD',
    status: 'confirmed' as BookingStatus,
    paymentStatus: 'paid' as PaymentStatus,
    selectedSeats: [
      { passengerIndex: 0, seatId: 'seat-C2', seatNumber: 'C2', price: 0 },
      { passengerIndex: 1, seatId: 'seat-C3', seatNumber: 'C3', price: 0 },
    ],
    baggageOptions: [],
    insurance: null,
    createdAt: generateRandomDate(sixMonthsAgo, new Date()).toISOString(),
    updatedAt: new Date().toISOString(),
    specialRequests: 'Anniversary celebration',
    contactEmail: mockUsers[2].email,
    contactPhone: mockUsers[2].phoneNumber,
    departureDate: mockFlights[3].departureTime.split('T')[0],
    returnDate: mockFlights[10].departureTime.split('T')[0],
    departureAirport: mockFlights[3].departureAirport,
    arrivalAirport: mockFlights[3].arrivalAirport,
    airline: mockFlights[3].airline,
    flightNumber: mockFlights[3].flightNumber,
    arrivalDate: '',
    bookingDate: '',
    passengersList: [],
    serviceCharge: 0,
    taxes: 0,
    baseFare: function (baseFare: unknown): import("react").ReactNode {
      throw new Error('Function not implemented.');
    }
  },
  {
    // Fixes for Booking #4
    id: 'book-004',
    reference: generateBookingReference(),
    userId: mockUsers[0].id,
    flight: mockFlights[15],
    passengers: [mockPassengers[0]],
    totalPrice: 375.25,
    currency: 'USD',
    status: 'cancelled' as BookingStatus,
    paymentStatus: 'refunded' as PaymentStatus,
    selectedSeats: [{ passengerIndex: 0, seatId: 'seat-D4', seatNumber: 'D4', price: 0 }],
    baggageOptions: [],
    insurance: null,
    createdAt: generateRandomDate(sixMonthsAgo, new Date()).toISOString(),
    updatedAt: new Date().toISOString(),
    specialRequests: '',
    contactEmail: mockUsers[0].email,
    contactPhone: mockUsers[0].phoneNumber,
    cancellationReason: 'Change of plans', // Added cancellationReason
    cancellationFee: 0, // Added cancellationFee
    departureDate: mockFlights[15].departureTime.split('T')[0],
    departureAirport: mockFlights[15].departureAirport,
    arrivalAirport: mockFlights[15].arrivalAirport,
    airline: mockFlights[15].airline,
    flightNumber: mockFlights[15].flightNumber,
    arrivalDate: '',
    bookingDate: '',
    passengersList: [],
    serviceCharge: 0,
    taxes: 0,
    baseFare: function (baseFare: unknown): import("react").ReactNode {
      throw new Error('Function not implemented.');
    }
  },
];