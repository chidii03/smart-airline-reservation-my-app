import { ReactNode } from 'react';

// Define the Seat interface first, as it's used by Flight
export interface Seat {
  id: string;
  row: string;
  column: string;
  cabinClass: 'business' | 'economy' | 'first';
  status: 'available' | 'occupied';
  price: number;
}

export interface Flight {
  origin: ReactNode;
  destination: ReactNode;
  id: string; // Changed to string for consistency with API calls
  flightNumber: string;
  airline: string;
  airlineCode: string;
  airlineLogo?: string;
  departureAirport: string;
  departureAirportCode: string;
  departureCity: string;
  departureCountry: string;
  arrivalAirport: string;
  arrivalAirportCode: string;
  arrivalCity: string;
  arrivalCountry: string;
  departureTime: string;
  arrivalTime: string;
  duration: number;
  stops: number;
  price: number;
  currency: string;
  totalSeats: number;
  availableSeats: number;
  aircraftType: string;
  aircraftRegistration: string;
  status: 'scheduled' | 'boarding' | 'departed' | 'arrived' | 'delayed' | 'cancelled';
  gate?: string;
  terminal?: string;
  baggageAllowance: {
    carryOn: number;
    checked: number;
  };
  amenities: {
    wifi: boolean;
    entertainment: boolean;
    powerOutlets: boolean;
    usbPorts: boolean;
    meals: boolean;
    drinks: boolean;
    extraLegroom: boolean;
  };
  operator: {
    name: string;
    code: string;
    iata: string;
    icao: string;
  };
  distance: number;
  fuelEfficiency: number;
  carbonEmissions: number;
  sustainabilityRating: number;
  onTimePerformance: number;
  lastUpdated: string;
  seats: Seat[]; // Correctly typed as an array of Seat objects
}

export interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  cabinClass?: 'economy' | 'premium' | 'business' | 'first';
  tripType?: 'one-way' | 'round-trip' | 'multi-city';
  directFlightsOnly?: boolean;
  maxStops?: number;
  maxPrice?: number;
  airlinePreferences?: string[];
  timePreferences?: {
    departure: {
      min: string;
      max: string;
    };
    arrival: {
      min: string;
      max: string;
    };
  };
}

export interface FlightFilterOptions {
  priceRange: [number, number];
  departureTime: string[];
  arrivalTime: string[];
  airlines: string[];
  stops: number[];
  duration: [number, number];
  aircraftTypes: string[];
  amenities: string[];
}

export interface FlightRoute {
  segments: FlightSegment[];
  totalDuration: number;
  totalDistance: number;
  totalPrice: number;
  layovers: Layover[];
}

export interface FlightSegment {
  flight: Flight;
  departure: Airport;
  arrival: Airport;
  duration: number;
  distance: number;
}

export interface Layover {
  airport: Airport;
  duration: number;
  terminal?: string;
}

export interface Airport {
  id: number;
  code: string;
  name: string;
  city: string;
  country: string;
  countryCode: string;
  timezone: string;
  latitude: number;
  longitude: number;
  terminals: Terminal[];
  amenities: AirportAmenities;
  popularity: number;
}

export interface Terminal {
  id: number;
  name: string;
  gates: string[];
  services: string[];
}

export interface AirportAmenities {
  lounges: boolean;
  shopping: boolean;
  dining: boolean;
  wifi: boolean;
  chargingStations: boolean;
  sleepingPods: boolean;
  showers: boolean;
  childrenPlayArea: boolean;
  medicalFacilities: boolean;
}

export interface FlightSearchResponse {
  flights: Flight[];
  filters: FlightFilterOptions;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  recommendations: FlightRecommendation[];
  priceInsights: PriceInsight[];
}

export interface FlightRecommendation {
  flight: Flight;
  reason: string;
  confidence: number;
  alternativeAirports?: string[];
}

export interface PriceInsight {
  currentPrice: number;
  typicalPrice: number;
  priceDifference: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  confidence: number;
  bestBookingTime: string;
  pricePrediction: PricePrediction[];
}

export interface PricePrediction {
  date: string;
  predictedPrice: number;
  confidence: number;
}

export interface FlightBookingRequest {
  flightId: number;
  passengers: Passenger[];
  contactInfo: ContactInfo;
  paymentMethod: PaymentMethod;
  preferences: BookingPreferences;
  loyaltyProgram?: LoyaltyProgram;
}

export interface Passenger {
  type: 'adult' | 'child' | 'infant';
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  passportNumber?: string;
  nationality: string;
  frequentFlyerNumber?: string;
  specialAssistance?: string[];
  mealPreference?: string;
  seatPreference?: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface PaymentMethod {
  type: 'credit_card' | 'debit_card' | 'paypal' | 'bank_transfer' | 'crypto';
  details: unknown;
  saveForFuture: boolean;
}

export interface BookingPreferences {
  seatSelection: boolean;
  extraLegroom: boolean;
  priorityBoarding: boolean;
  travelInsurance: boolean;
  newsletterSubscription: boolean;
}

export interface LoyaltyProgram {
  program: string;
  number: string;
  tier: string;
}

export interface Aircraft {
  id: string;
  type: string;
  model: string;
  capacity: number;
  speed: number;
  range: number;
  manufacturer: string;
  year: number;
}