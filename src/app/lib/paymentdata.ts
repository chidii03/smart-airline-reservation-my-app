export interface PaymentData {
  bookingId: string;
  amount: number;
  paymentMethod: string;
  currency?: string;
  email?: string;
  reference?: string;
  metadata?: Record<string, unknown>;
  callback_url?: string;
}