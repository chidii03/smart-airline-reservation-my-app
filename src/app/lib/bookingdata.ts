export interface Passenger {
  id: string;
  firstName: string;
  lastName: string;
  dob: string; // Date of birth in a string format like "YYYY-MM-DD"
  gender: 'male' | 'female' | 'other';
  contactInfo: {
    email: string;
    phone: string;
  };
  specialRequests?: string;
}

export interface SeatSelection {
  passengerId: string;
  seatNumber: string;
  class: 'economy' | 'business' | 'first';
}

export interface BaggageOption {
  passengerId: string;
  checkedBags: number;
  carryOnBags: number;
}

export interface PaymentData {
  bookingId: string;
  amount: number;
  currency: string;
  paymentMethod: 'credit_card' | 'debit_card' | 'paypal' | 'other';
  // Additional payment details could go here (e.g., tokenized card data)
}

export interface CreateBookingData {
  flightId: string;
  passengers: Passenger[];
  selectedSeats: SeatSelection[];
  baggageOptions: BaggageOption[];
  insurance: boolean;
}

// The data structure sent to the API to create a booking
export interface BookingData extends CreateBookingData {
  userId: string;
}

// The full booking object returned from the API
export interface Booking {
  id: string;
  reference: string;
  userId: string;
  flightId: string; // This should be the ID
  // It's common for a booking to also include the full flight details
  flight: {
    id: string;
    flightNumber: string;
    origin: string;
    destination: string;
    departureTime: string; // ISO 8601 string
    arrivalTime: string; // ISO 8601 string
    airline: string;
  };
  passengers: Passenger[];
  selectedSeats: SeatSelection[];
  baggageOptions: BaggageOption[];
  insurance: boolean;
  status: 'pending' | 'confirmed' | 'cancelled' | 'paid';
  createdAt: string; // ISO 8601 string
  updatedAt: string; // ISO 8601 string
}
