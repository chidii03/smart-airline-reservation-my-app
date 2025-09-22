export interface PaymentMethod {
  id: string
  type: 'credit-card' | 'debit-card' | 'paypal' | 'bank-transfer' | 'wallet'
  details: CreditCardDetails | PayPalDetails | BankTransferDetails | WalletDetails
  isDefault: boolean
  createdAt: string
}

export interface CreditCardDetails {
  cardNumber: string
  holderName: string
  expiryMonth: number
  expiryYear: number
  cvv: string
  brand: 'visa' | 'mastercard' | 'amex' | 'discover' | 'other'
  country: string
}

export interface PayPalDetails {
  email: string
  accountId: string
}

export interface BankTransferDetails {
  accountNumber: string
  routingNumber: string
  bankName: string
  accountHolder: string
  country: string
}

export interface WalletDetails {
  type: 'apple-pay' | 'google-pay' | 'samsung-pay'
  token: string
}

export interface Payment {
  id: string
  bookingId: string
  amount: number
  currency: string
  status: PaymentStatus
  method: PaymentMethod
  transactionId: string
  description: string
  createdAt: string
  updatedAt: string
  refundedAmount?: number
  failureReason?: string
  metadata?: Record<string, unknown>
}

export interface PaymentIntent {
  id: string
  amount: number
  currency: string
  status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'requires_capture' | 'canceled' | 'succeeded'
  clientSecret: string
  nextAction?: unknown
  paymentMethod?: string
}

export interface Refund {
  id: string
  paymentId: string
  amount: number
  currency: string
  reason: string
  status: 'pending' | 'succeeded' | 'failed' | 'canceled'
  createdAt: string
  processedAt?: string
}

export interface PaymentGateway {
  name: string
  supportedMethods: string[]
  supportedCurrencies: string[]
  fees: FeeStructure
  features: string[]
}

export interface FeeStructure {
  percentage: number
  fixed: number
  minAmount: number
  maxAmount: number
}

export interface CurrencyConversion {
  from: string
  to: string
  rate: number
  amount: number
  convertedAmount: number
  fee: number
  timestamp: string
}

export interface PaymentWebhook {
  id: string
  type: string
  data: unknown
  createdAt: string
  signature: string
}

export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded' | 'partially_refunded'
export type RefundStatus = 'pending' | 'completed' | 'failed' | 'canceled'