export interface BookingData {
  flightId: string;
  userId: string;
  passengers: number;
  seatSelection?: string[];
  bookingDate?: string;
}