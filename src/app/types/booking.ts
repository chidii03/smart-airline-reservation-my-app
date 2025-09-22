// src/app/types/booking.ts

import { Flight } from './flight';

export interface Passenger {
  seatNumber: string;
  baggage: string;
  seat: string;
  id?: string;
  type: 'adult' | 'child' | 'infant';
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  nationality: string;
  passportNumber: string;
  passportExpiry: string;
  passportCountry: string;
  email: string;
  phone: string;
  specialAssistance: boolean;
  dietaryRequirements: string[];
  frequentFlyerNumber?: string;
  seatPreference?: 'window' | 'aisle' | 'middle';
}

export interface SeatSelection {
  passengerIndex: number;
  seatId: string;
  seatNumber: string;
  price: number;
}

export interface BaggageOption {
  type: 'carry-on' | 'checked';
  weight: number;
  price: number;
  description: string;
  passengerIndex: number;
}

export interface InsuranceOption {
  type: string;
  coverage: number;
  price: number;
  description: string;
}

export interface PaymentMethod {
  type: 'credit-card' | 'debit-card' | 'paypal' | 'bank-transfer';
  details: unknown;
}

// Define the shape of the data received from the API
export interface ApiBookingData {
  serviceCharge?: number;
  taxes?: number;
  baseFare?: number;
  id?: string;
  reference?: string;
  userId?: string;
  flight?: Flight | null;
  passengers?: Passenger[];
  selectedSeats?: SeatSelection[];
  baggageOptions?: BaggageOption[];
  insurance?: InsuranceOption | null;
  totalPrice?: number;
  currency?: string;
  status?: string;
  paymentStatus?: string;
  paymentMethod?: PaymentMethod;
  createdAt?: string;
  updatedAt?: string;
  departureDate?: string;
  returnDate?: string;
  specialRequests?: string;
  contactEmail?: string;
  contactPhone?: string;
  bookingSource?: 'web' | 'mobile' | 'agent';
  loyaltyPointsEarned?: number;
  cancellationReason?: string;
  cancellationFee?: number;
  arrivalDate?: string;
  bookingDate?: string;
  airline?: string;
  arrivalAirport?: string;
  flightNumber?: string;
  departureAirport?: string;
}


export interface Booking {
  passengersList: never[];
  serviceCharge: number;
  taxes: number;
  baseFare(baseFare: unknown): import("react").ReactNode;
  id: string;
  reference: string;
  userId: string;
  flight: Flight | null;
  passengers: Passenger[];
  selectedSeats: SeatSelection[];
  baggageOptions: BaggageOption[];
  insurance: InsuranceOption | null;
  totalPrice: number;
  currency?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'refunded' | 'failed';
  paymentMethod?: PaymentMethod;
  createdAt: string;
  updatedAt: string;
  departureDate?: string;
  returnDate?: string;
  specialRequests?: string;
  contactEmail?: string;
  contactPhone?: string;
  bookingSource?: 'web' | 'mobile' | 'agent';
  loyaltyPointsEarned?: number;
  cancellationReason?: string;
  cancellationFee?: number;
  arrivalDate: string | number | Date;
  bookingDate: string;
  airline: unknown;
  arrivalAirport: unknown;
  flightNumber: unknown;
  departureAirport: unknown;
}

export interface CreateBookingData {
  bookingDate: string;
  flightId: string;
  passengers: Omit<Passenger, 'id'>[];
  seats: SeatSelection[];
  baggage: BaggageOption[];
  insurance?: boolean;
  paymentMethod: PaymentMethod;
  contactInfo: {
    email: string;
    phone: string;
  };
  specialRequests: string;
}

export interface BookingSearchParams {
  userId?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  airline?: string;
  destination?: string;
  page: number;
  limit: number;
}

export interface BookingStats {
  total: number;
  confirmed: number;
  pending: number;
  cancelled: number;
  completed: number;
  revenue: number;
  averageBookingValue: number;
}

export interface BookingTimeline {
  status: string;
  timestamp: string;
  description: string;
  actor: string;
}

export interface CancellationPolicy {
  hoursBeforeDeparture: number;
  refundPercentage: number;
  fee: number;
  allowed: boolean;
}

export interface BookingReceipt {
  booking: Booking;
  paymentDetails: {
    method: string;
    transactionId: string;
    amount: number;
    currency: string;
    paidAt: string;
  };
  breakdown: {
    baseFare: number;
    taxes: number;
    fees: number;
    extras: number;
    discount: number;
    total: number;
  }; 
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type PaymentStatus = 'pending' | 'paid' | 'refunded' | 'failed';